'use server';

import { draftMode, headers } from 'next/headers';
import { z } from 'zod';
import { getCms, getQuizDoc } from '@/lib/cms';
import { quizLeadSchema, type QuizLead, type QuizLeadInput } from '@/lib/contact-schema';
import { isEmailConfigured, sendLeadEmail } from '@/lib/emailjs';
import type { QuizAnswers, QuizResult } from '@/lib/quiz';
import { scoreQuiz } from '@/lib/quiz-scoring';
import { isRateLimited } from '@/lib/rate-limit';
import { verifyTurnstile } from '@/lib/turnstile';

export type QuizSubmission = {
  slug: string;
  answers: QuizAnswers;
  lead: QuizLeadInput;
  /** Momento em que o quiz começou (anti-spam). */
  startedAt: number;
  /** Campo invisível: preenchido só por robôs. */
  website?: string;
  /** Token do Cloudflare Turnstile. */
  turnstileToken?: string;
  pagePath: string;
  attribution: Record<string, string>;
};

export type QuizSubmitState =
  | { status: 'success'; result: QuizResult }
  | {
      status: 'error';
      message: string;
      fieldErrors?: Partial<Record<keyof QuizLead, string>>;
      questionErrors?: Record<string, string>;
    };

const MIN_FILL_TIME_MS = 8000;

const cleanAttribution = (input: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(input ?? {})
      .filter(([, value]) => typeof value === 'string')
      .slice(0, 20)
      .map(([key, value]) => [key.slice(0, 40), value.slice(0, 200)]),
  );

export async function submitQuiz(input: QuizSubmission): Promise<QuizSubmitState> {
  const lead = quizLeadSchema.safeParse(input.lead);
  if (!lead.success) {
    const { fieldErrors } = z.flattenError(lead.error);
    return {
      status: 'error',
      message: 'Revise os campos destacados.',
      fieldErrors: Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
      ),
    };
  }

  const { isEnabled: draft } = await draftMode();
  const quiz = await getQuizDoc(input.slug, draft);
  if (!quiz) return { status: 'error', message: 'Este diagnóstico não está disponível.' };

  const scored = scoreQuiz(quiz, input.answers ?? {});
  if (!scored.ok) {
    return {
      status: 'error',
      message: 'Algumas respostas precisam ser revisadas.',
      questionErrors: scored.errors,
    };
  }
  const { score, answers, ...result } = scored.result;

  // Pré-visualização de rascunho: mostra o resultado sem gravar nem avisar.
  if (draft) return { status: 'success', result };

  // Anti-spam: devolve o resultado normalmente, mas não grava nada.
  const tooFast = input.startedAt > 0 && Date.now() - input.startedAt < MIN_FILL_TIME_MS;
  if (input.website || tooFast) {
    console.warn('[quiz] Envio descartado pelo anti-spam', {
      honeypot: Boolean(input.website),
      tooFast,
    });
    return { status: 'success', result };
  }

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  if (!(await verifyTurnstile(input.turnstileToken, ip))) {
    return {
      status: 'error',
      message:
        'Não conseguimos confirmar o envio. Recarregue a página e tente de novo, ou fale pelo WhatsApp.',
    };
  }
  if (isRateLimited(`quiz:${ip}`)) {
    return {
      status: 'error',
      message: 'Muitos envios em pouco tempo. Aguarde alguns minutos ou fale pelo WhatsApp.',
    };
  }

  const data = lead.data;
  const attribution = cleanAttribution(input.attribution);
  const pagePath = String(input.pagePath ?? '').slice(0, 200);

  // A resposta fica salva no painel mesmo que o aviso por e-mail falhe.
  try {
    await (
      await getCms()
    ).create({
      collection: 'quiz-responses',
      context: { disableRevalidate: true },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        role: data.role,
        quiz: quiz.id,
        quizTitle: quiz.title,
        profile: result.profile.title,
        score,
        recommendations: result.solutions.map((s) => s.title).join('; '),
        answers,
        pagePath,
        attribution,
        status: 'novo',
      },
    });
  } catch (error) {
    console.error('[quiz] Falha ao gravar resposta', error);
    return {
      status: 'error',
      message: 'Não foi possível concluir agora. Tente novamente em instantes.',
    };
  }

  if (isEmailConfigured()) {
    const message = [
      `Diagnóstico: ${quiz.title}`,
      `Perfil: ${result.profile.title} (${score} pontos)`,
      result.solutions.length
        ? `Soluções indicadas: ${result.solutions.map((s) => s.title).join('; ')}`
        : '',
      data.role ? `Cargo: ${data.role}` : '',
      '',
      ...answers.map((a) => `${a.question}\n→ ${a.answer}`),
    ]
      .filter((line, i, all) => line || all[i - 1])
      .join('\n');
    try {
      await sendLeadEmail(
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          projectType: quiz.projectType,
          message,
          consent: 'on',
        },
        { pagePath, attribution },
      );
    } catch (error) {
      console.error('[quiz] Resposta gravada, mas o aviso por e-mail falhou', error);
    }
  }

  console.info('[quiz] Resposta registrada', { quiz: quiz.slug, profile: result.profile.title });
  return { status: 'success', result };
}
