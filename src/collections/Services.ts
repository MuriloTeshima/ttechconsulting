import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from './shared/access';
import { faqField, projectTypeField, slug, textList, titledTextList } from './shared/fields';
import { revalidateHooks } from './shared/revalidate';

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Serviço', plural: 'Serviços' },
  orderable: true,
  admin: {
    group: 'Site',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Páginas de solução. A ordem aqui é a ordem dos cards no site.',
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateHooks,
  fields: [
    { name: 'title', label: 'Nome do serviço', type: 'text', required: true },
    slug(),
    projectTypeField,
    {
      name: 'icon',
      label: 'Ícone',
      type: 'select',
      required: true,
      admin: { position: 'sidebar' },
      options: [
        { value: 'layers', label: 'Camadas (sistemas)' },
        { value: 'workflow', label: 'Fluxo (automações)' },
        { value: 'blocks', label: 'Blocos (MVP)' },
        { value: 'monitor', label: 'Tela (sites)' },
        { value: 'refresh', label: 'Ciclo (evolução)' },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Conteúdo',
          fields: [
            {
              name: 'lead',
              label: 'Título da página (h1)',
              type: 'text',
              required: true,
            },
            {
              name: 'short',
              label: 'Resumo',
              type: 'textarea',
              required: true,
              admin: { description: 'Aparece no card do serviço e abaixo do título.' },
            },
            {
              name: 'suitable',
              label: 'Para quem é',
              type: 'textarea',
              required: true,
            },
            { name: 'problem', label: 'O desafio', type: 'textarea', required: true },
            textList('deliverables', 'Como ajudamos (entregas)'),
            titledTextList('examples', 'Exemplos do que construímos'),
            faqField(),
            {
              name: 'cta',
              label: 'Texto do botão',
              type: 'text',
              required: true,
              defaultValue: 'Conversar sobre meu projeto',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              label: 'Título no Google',
              type: 'text',
              required: true,
              maxLength: 41,
              admin: {
                description:
                  'Até 41 caracteres; o site acrescenta " | TTech Consulting" e o total fica em ~60.',
              },
            },
          ],
        },
      ],
    },
  ],
};
