import { slugField, type ArrayField, type Field } from 'payload';
import { projectTypes } from '@/lib/contact-schema';

/** Turns text into a slug while keeping the word: "Automação" → "automacao". */
export function toSlug(value: unknown) {
  if (typeof value !== 'string') return undefined;
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const slug = (useAsSlug = 'title') =>
  slugField({
    useAsSlug,
    position: 'sidebar',
    slugify: ({ valueToSlugify }) => toSlug(valueToSlugify),
  });

/** List of plain texts (e.g. deliverables, signs, pain points). */
export const textList = (name: string, label: string, required = true): ArrayField => ({
  name,
  label,
  type: 'array',
  required,
  minRows: required ? 1 : 0,
  labels: { singular: 'Item', plural: 'Itens' },
  fields: [{ name: 'text', label: 'Texto', type: 'text', required: true }],
});

/** List of blocks with a title and text (e.g. examples, landing page deliverables). */
export const titledTextList = (name: string, label: string): ArrayField => ({
  name,
  label,
  type: 'array',
  required: true,
  minRows: 1,
  labels: { singular: 'Item', plural: 'Itens' },
  admin: { initCollapsed: true },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'text', label: 'Texto', type: 'textarea', required: true },
  ],
});

export const faqField = (name = 'faq', label = 'Perguntas frequentes'): ArrayField => ({
  name,
  label,
  type: 'array',
  labels: { singular: 'Pergunta', plural: 'Perguntas' },
  admin: { initCollapsed: true },
  fields: [
    { name: 'q', label: 'Pergunta', type: 'text', required: true },
    { name: 'a', label: 'Resposta', type: 'textarea', required: true },
  ],
});

export const projectTypeField: Field = {
  name: 'projectType',
  label: 'Tipo de projeto no formulário',
  type: 'select',
  required: true,
  defaultValue: 'sistema',
  options: projectTypes.map(({ value, label }) => ({ value, label })),
  admin: {
    position: 'sidebar',
    description: 'Pré-selecionado no formulário quando o contato vem desta página.',
  },
};

/** SEO fields for a page: title (up to ~60 characters) and description (up to ~155). */
export const seoGroup = (): Field => ({
  name: 'seo',
  label: 'SEO',
  type: 'group',
  fields: [
    {
      name: 'title',
      label: 'Título no Google',
      type: 'text',
      maxLength: 60,
      admin: { description: 'Até 60 caracteres. Sem ele, usa o título do post.' },
    },
    {
      name: 'description',
      label: 'Descrição no Google',
      type: 'textarea',
      maxLength: 160,
      admin: { description: 'Até 155 caracteres. Sem ela, usa o resumo do post.' },
    },
  ],
});
