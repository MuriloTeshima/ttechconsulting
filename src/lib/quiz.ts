import type { ProjectType } from './contact-schema';

/**
 * Formato público do quiz, enviado ao navegador: só perguntas e opções.
 * Pontos, faixas e recomendações ficam no servidor (src/lib/quiz-scoring.ts).
 */

type QuestionBase = { key: string; question: string; help: string | null; required: boolean };

export type PublicQuestion =
  | (QuestionBase & { type: 'single'; options: string[] })
  | (QuestionBase & { type: 'multiple'; options: string[]; maxSelections: number | null })
  | (QuestionBase & { type: 'scale'; minLabel: string; maxLabel: string })
  | (QuestionBase & { type: 'number'; unit: string | null; placeholder: string | null })
  | (QuestionBase & { type: 'text'; placeholder: string | null });

export type PublicQuiz = {
  slug: string;
  title: string;
  segment: string;
  projectType: ProjectType;
  index: boolean;
  eyebrow: string;
  headline: string;
  description: string;
  startLabel: string;
  estimatedTime: string | null;
  questions: PublicQuestion[];
  leadTitle: string;
  leadDescription: string;
  askCompany: boolean;
  askRole: boolean;
  submitLabel: string;
  metaTitle: string;
  metaDescription: string;
};

export type QuizAnswerValue = string | string[] | number;
export type QuizAnswers = Record<string, QuizAnswerValue>;

export type QuizResult = {
  profile: { title: string; summary: string };
  solutions: { title: string; description: string }[];
  whatsappMessage: string;
};

/** Uma resposta está preenchida? (usado no navegador e no servidor) */
export function isAnswered(value: QuizAnswerValue | undefined) {
  if (value === undefined || value === null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'number') return Number.isFinite(value);
  return value.trim().length > 0;
}
