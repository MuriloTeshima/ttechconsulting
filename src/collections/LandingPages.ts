import type { CollectionConfig } from 'payload';
import { authenticated, publishedOrAuthenticated } from './shared/access';
import { faqField, projectTypeField, slug, textList, titledTextList } from './shared/fields';
import { previewUrl } from './shared/preview';
import { revalidateHooks } from './shared/revalidate';

export const LandingPages: CollectionConfig = {
  slug: 'landing-pages',
  labels: { singular: 'Landing page', plural: 'Landing pages' },
  orderable: true,
  versions: { drafts: true },
  admin: {
    group: 'Campanhas',
    useAsTitle: 'segment',
    defaultColumns: ['segment', 'slug', '_status', 'updatedAt'],
    description:
      'Páginas de tráfego pago, publicadas em /lp/<slug>. Cada uma liga uma dor a uma oferta.',
    preview: (doc) => previewUrl(`/lp/${doc.slug}`),
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: revalidateHooks,
  fields: [
    {
      name: 'segment',
      label: 'Segmento',
      type: 'text',
      required: true,
      admin: {
        description: 'Ex.: Clínicas e saúde. Usado no painel e na imagem de compartilhamento.',
      },
    },
    slug('segment'),
    projectTypeField,
    {
      name: 'index',
      label: 'Aparecer no Google',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'shortBrand',
      label: 'Usar marca curta no título ("| TTech")',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Para títulos longos caberem em ~60 caracteres.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Topo',
          fields: [
            { name: 'eyebrow', label: 'Chamada acima do título', type: 'text', required: true },
            {
              type: 'row',
              fields: [
                { name: 'title', label: 'Título', type: 'text', required: true },
                {
                  name: 'highlight',
                  label: 'Final destacado do título',
                  type: 'text',
                  required: true,
                  admin: { description: 'Exibido em ciano. Ex.: "clínica."' },
                },
              ],
            },
            { name: 'description', label: 'Texto de apoio', type: 'textarea', required: true },
            { name: 'signalsTitle', label: 'Título dos sinais', type: 'text', required: true },
            textList('signals', 'Sinais'),
          ],
        },
        {
          label: 'Problema',
          fields: [
            { name: 'problemTitle', label: 'Título', type: 'text', required: true },
            { name: 'problemText', label: 'Texto', type: 'textarea', required: true },
            textList('pains', 'Dores'),
          ],
        },
        {
          label: 'Solução',
          fields: [
            { name: 'solutionTitle', label: 'Título', type: 'text', required: true },
            { name: 'solutionText', label: 'Texto', type: 'textarea', required: true },
            titledTextList('deliverables', 'O que entregamos'),
            {
              name: 'note',
              label: 'Observação',
              type: 'textarea',
              admin: { description: 'Opcional. Ex.: limites do escopo (clínicas).' },
            },
          ],
        },
        { label: 'Perguntas', fields: [faqField()] },
        {
          label: 'Chamada final',
          fields: [
            { name: 'ctaLabel', label: 'Texto dos botões', type: 'text', required: true },
            { name: 'finalTitle', label: 'Título final', type: 'text', required: true },
            { name: 'finalText', label: 'Texto final', type: 'textarea', required: true },
            {
              name: 'whatsappMessage',
              label: 'Mensagem do WhatsApp',
              type: 'textarea',
              required: true,
              admin: { description: 'Texto que já vem escrito ao abrir a conversa.' },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              label: 'Título no Google',
              type: 'text',
              required: true,
              admin: {
                description:
                  'O site acrescenta " | TTech Consulting" (ou " | TTech" com a marca curta). Total ideal: até 60 caracteres.',
              },
            },
            {
              name: 'metaDescription',
              label: 'Descrição no Google',
              type: 'textarea',
              required: true,
              maxLength: 160,
            },
          ],
        },
      ],
    },
  ],
};
