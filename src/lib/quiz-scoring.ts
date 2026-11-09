import 'server-only';
import type { Quiz } from '@/payload-types';
import { isAnswered, type PublicQuiz, type QuizAnswers, type QuizResult } from './quiz';

type Question = Quiz['questions'][number];

/** Converts the CMS document to the public shape, without points or recommendations. */
export function toPublicQuiz(doc: Quiz): PublicQuiz {
  return {
    slug: doc.slug,
    title: doc.title,
    segment: doc.segment,
    projectType: doc.projectType,
    index: doc.index ?? true,
    eyebrow: doc.eyebrow,
    headline: doc.headline,
    description: doc.description,
    startLabel: doc.startLabel,
    estimatedTime: doc.estimatedTime ?? null,
    questions: doc.questions.map((q) => {
      const base = {
        key: q.key,
        question: q.question,
        help: q.help ?? null,
        required: q.required ?? true,
      };
      switch (q.blockType) {
        case 'single':
          return { ...base, type: 'single', options: q.options.map((o) => o.label) };
        case 'multiple':
          return {
            ...base,
            type: 'multiple',
            options: q.options.map((o) => o.label),
            maxSelections: q.maxSelections ?? null,
          };
        case 'scale':
          return { ...base, type: 'scale', minLabel: q.minLabel, maxLabel: q.maxLabel };
        case 'number':
          return {
            ...base,
            type: 'number',
            unit: q.unit ?? null,
            placeholder: q.placeholder ?? null,
          };
        case 'text':
          return { ...base, type: 'text', placeholder: q.placeholder ?? null };
      }
    }),
    leadTitle: doc.leadTitle,
    leadDescription: doc.leadDescription,
    askCompany: doc.askCompany ?? true,
    askRole: doc.askRole ?? true,
    submitLabel: doc.submitLabel,
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
  };
}

const splitKeys = (value?: string | null) =>
  (value ?? '')
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean);

type Scored = {
  points: number;
  recommends: string[];
  /** Answer as readable text, for the panel and the email. */
  display: string;
};

/** Validates and scores one answer. Throws with a friendly message if it's invalid. */
function scoreAnswer(q: Question, value: QuizAnswers[string] | undefined): Scored | null {
  if (!isAnswered(value)) {
    if (q.required ?? true) throw new Error('Responda esta pergunta para continuar.');
    return null;
  }
  switch (q.blockType) {
    case 'single': {
      const option = q.options.find((o) => o.label === value);
      if (!option) throw new Error('Opção inválida.');
      return {
        points: option.points ?? 0,
        recommends: splitKeys(option.recommends),
        display: option.label,
      };
    }
    case 'multiple': {
      if (!Array.isArray(value)) throw new Error('Resposta inválida.');
      const chosen = q.options.filter((o) => value.includes(o.label));
      if (chosen.length !== new Set(value).size) throw new Error('Opção inválida.');
      if (q.maxSelections && chosen.length > q.maxSelections) {
        throw new Error(`Escolha no máximo ${q.maxSelections} opções.`);
      }
      return {
        points: chosen.reduce((sum, o) => sum + (o.points ?? 0), 0),
        recommends: chosen.flatMap((o) => splitKeys(o.recommends)),
        display: chosen.map((o) => o.label).join('; '),
      };
    }
    case 'scale': {
      const n = Number(value);
      if (!Number.isInteger(n) || n < 1 || n > 5) throw new Error('Escolha um valor de 1 a 5.');
      return { points: (n - 1) * (q.weight ?? 1), recommends: [], display: `${n} de 5` };
    }
    case 'number': {
      const n = Number(value);
      if (!Number.isFinite(n) || n < 0 || n > 1_000_000)
        throw new Error('Informe um número válido.');
      const range = (q.ranges ?? []).find(
        (r) => (r.min == null || n >= r.min) && (r.max == null || n <= r.max),
      );
      return {
        points: range?.points ?? 0,
        recommends: splitKeys(range?.recommends),
        display: q.unit ? `${n} ${q.unit}` : String(n),
      };
    }
    case 'text': {
      if (typeof value !== 'string' || value.length > 1000) {
        throw new Error('Use no máximo 1.000 caracteres.');
      }
      return { points: 0, recommends: [], display: value.trim() };
    }
  }
}

export type ScoredQuiz = QuizResult & {
  score: number;
  answers: { question: string; answer: string }[];
};

/**
 * Validates all answers and works out the score, profile and recommended solutions.
 * Returns errors per question (key → message) when there are invalid answers.
 */
export function scoreQuiz(
  doc: Quiz,
  answers: QuizAnswers,
): { ok: true; result: ScoredQuiz } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  let score = 0;
  const recommended = new Set<string>();
  const summary: { question: string; answer: string }[] = [];

  for (const q of doc.questions) {
    try {
      const scored = scoreAnswer(q, answers[q.key]);
      if (!scored) continue;
      score += scored.points;
      scored.recommends.forEach((key) => recommended.add(key));
      summary.push({ question: q.question, answer: scored.display });
    } catch (error) {
      errors[q.key] = (error as Error).message;
    }
  }
  if (Object.keys(errors).length) return { ok: false, errors };

  // The profile with the highest minimum score the total reaches wins.
  const profiles = [...doc.results].sort((a, b) => a.minScore - b.minScore);
  const profile = profiles.filter((p) => score >= p.minScore).pop() ?? profiles[0]!;
  const solutions = (doc.solutions ?? [])
    .filter((s) => recommended.has(s.key))
    .map(({ title, description }) => ({ title, description }));

  return {
    ok: true,
    result: {
      score,
      profile: { title: profile.title, summary: profile.summary },
      solutions,
      whatsappMessage: `${doc.whatsappMessage} Meu resultado: ${profile.title}.`,
      answers: summary,
    },
  };
}
