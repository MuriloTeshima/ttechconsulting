import { z } from 'zod';
import { isValidPhone } from './phone';

export const projectTypes = [
  { value: 'sistema', label: 'Sistema sob medida' },
  { value: 'automacao', label: 'Automação ou integração' },
  { value: 'mvp', label: 'MVP ou produto digital' },
  { value: 'site', label: 'Site ou landing page' },
  { value: 'evolucao', label: 'Evolução de um sistema existente' },
  { value: 'outro', label: 'Outro' },
] as const;

export type ProjectType = (typeof projectTypes)[number]['value'];

export const isProjectType = (value: string): value is ProjectType =>
  projectTypes.some((type) => type.value === value);

/** id da seção do formulário; os botões de chamada apontam para ele. */
export const FORM_ID = 'formulario';

/** Evento de janela para um botão pré-selecionar o tipo de projeto no formulário da página. */
export const SELECT_PROJECT_EVENT = 'ttech:select-project';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome.').max(120, 'Use no máximo 120 caracteres.'),
  email: z.string().trim().toLowerCase().pipe(z.email('Informe um e-mail válido.')),
  phone: z.string().trim().refine(isValidPhone, 'Informe um WhatsApp com DDD.'),
  company: z.string().trim().max(120, 'Use no máximo 120 caracteres.').optional().default(''),
  projectType: z.enum(projectTypes.map((type) => type.value) as [ProjectType, ...ProjectType[]], {
    error: 'Escolha o tipo de projeto.',
  }),
  message: z
    .string()
    .trim()
    .min(10, 'Conte um pouco mais sobre o projeto.')
    .max(3000, 'Use no máximo 3.000 caracteres.'),
  consent: z.literal('on', { error: 'É preciso concordar para enviarmos uma resposta.' }),
});

export type ContactData = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactData;

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

/** Contato pedido antes do resultado do quiz. */
export const quizLeadSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome.').max(120, 'Use no máximo 120 caracteres.'),
  email: z.string().trim().toLowerCase().pipe(z.email('Informe um e-mail válido.')),
  phone: z.string().trim().refine(isValidPhone, 'Informe um WhatsApp com DDD.'),
  company: z.string().trim().max(120, 'Use no máximo 120 caracteres.').optional().default(''),
  role: z.string().trim().max(120, 'Use no máximo 120 caracteres.').optional().default(''),
  consent: z.literal(true, { error: 'É preciso concordar para ver o resultado.' }),
});

export type QuizLead = z.input<typeof quizLeadSchema>;

/** Estado do formulário antes da validação (a caixa de consentimento começa desmarcada). */
export type QuizLeadInput = Omit<QuizLead, 'consent'> & { consent: boolean };
