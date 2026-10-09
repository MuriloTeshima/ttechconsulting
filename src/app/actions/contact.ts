'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { getCms } from '@/lib/cms';
import { contactSchema, type ContactField, type ContactState } from '@/lib/contact-schema';
import { isEmailConfigured, sendLeadEmail } from '@/lib/emailjs';
import { isRateLimited } from '@/lib/rate-limit';
import { TURNSTILE_FIELD, verifyTurnstile } from '@/lib/turnstile';

const FIELDS: ContactField[] = [
  'name',
  'email',
  'phone',
  'company',
  'projectType',
  'message',
  'consent',
];
const MIN_FILL_TIME_MS = 3000;
function readContext(formData: FormData) {
  let attribution: Record<string, string> = {};
  try {
    const parsed = JSON.parse(String(formData.get('attribution') ?? '{}')) as Record<
      string,
      unknown
    >;
    attribution = Object.fromEntries(
      Object.entries(parsed)
        .filter(([, value]) => typeof value === 'string')
        .map(([key, value]) => [key.slice(0, 40), String(value).slice(0, 200)]),
    );
  } catch {
    // Atribuição é opcional.
  }
  return { pagePath: String(formData.get('pagePath') ?? '').slice(0, 200), attribution };
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? '')]),
  ) as ContactState['values'];

  // Anti-spam: campo invisível preenchido ou envio rápido demais indicam robô.
  // Respondemos sucesso para não dar pistas, mas nada é enviado.
  // Sem startedAt (JavaScript indisponível), o envio segue: o limite por IP continua valendo.
  const startedAt = Number(formData.get('startedAt'));
  const tooFast = startedAt > 0 && Date.now() - startedAt < MIN_FILL_TIME_MS;
  if (formData.get('website') || tooFast) {
    console.warn('[contato] Envio descartado pelo anti-spam', {
      honeypot: Boolean(formData.get('website')),
      tooFast,
    });
    return { status: 'success' };
  }

  const result = contactSchema.safeParse({ ...values, consent: values?.consent || undefined });
  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);
    return {
      status: 'error',
      message: 'Revise os campos destacados.',
      fieldErrors: Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
      ),
      values,
    };
  }

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  if (!(await verifyTurnstile(String(formData.get(TURNSTILE_FIELD) ?? ''), ip))) {
    return {
      status: 'error',
      message:
        'Não conseguimos confirmar o envio. Recarregue a página e tente de novo, ou fale pelo WhatsApp.',
      values,
    };
  }

  // Só envios válidos contam para o limite, para não punir quem corrige erros de preenchimento.
  if (isRateLimited(ip)) {
    console.warn('[contato] Limite de envios atingido', { ip });
    return {
      status: 'error',
      message: 'Muitas mensagens em pouco tempo. Aguarde alguns minutos ou fale pelo WhatsApp.',
      values,
    };
  }

  const context = readContext(formData);
  const { name, email, phone, company, projectType, message } = result.data;
  const cms = await getCms();

  // O contato fica salvo no painel antes do aviso por e-mail: se o EmailJS falhar, nada se perde.
  let leadId: number | undefined;
  try {
    const doc = await cms.create({
      collection: 'contact-leads',
      context: { disableRevalidate: true },
      data: {
        name,
        email,
        phone,
        company,
        projectType,
        message,
        ...context,
        status: 'novo',
        emailSent: false,
      },
    });
    leadId = doc.id;
  } catch (error) {
    console.error('[contato] Falha ao gravar o contato', error);
  }

  let emailSent = false;
  if (isEmailConfigured()) {
    try {
      await sendLeadEmail(result.data, context);
      emailSent = true;
    } catch (error) {
      console.error('[contato] Falha no envio do e-mail', error);
    }
  } else if (process.env.NODE_ENV === 'production') {
    console.error('[contato] EmailJS não configurado em produção');
  }

  if (leadId && emailSent) {
    await cms
      .update({
        collection: 'contact-leads',
        id: leadId,
        context: { disableRevalidate: true },
        data: { emailSent: true },
      })
      .catch((error) => console.error('[contato] Falha ao marcar o e-mail como enviado', error));
  }

  if (!leadId && !emailSent) {
    return {
      status: 'error',
      message: 'Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.',
      values,
    };
  }

  console.info('[contato] Contato registrado', {
    projectType: result.data.projectType,
    saved: Boolean(leadId),
    emailSent,
  });
  return { status: 'success' };
}
