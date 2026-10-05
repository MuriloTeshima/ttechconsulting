import type { Block, CollectionConfig, Field } from 'payload';
import { authenticated, publishedOrAuthenticated } from './shared/access';
import { projectTypeField, slug } from './shared/fields';
import { previewUrl } from './shared/preview';
import { revalidateHooks } from './shared/revalidate';

const rowTitleLabel = '/components/admin/RowTitleLabel#RowTitleLabel';
const blockAdmin = { components: { Label: rowTitleLabel } };

const questionBase: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'key',
        label: 'Identificador',
        type: 'text',
        required: true,
        admin: {
          width: '35%',
          description: 'Curto e único no quiz (ex.: erp, processos). Aparece nas respostas.',
        },
      },
      { name: 'question', label: 'Pergunta', type: 'text', required: true },
    ],
  },
  { name: 'help', label: 'Texto de apoio', type: 'textarea' },
  { name: 'required', label: 'Obrigatória', type: 'checkbox', defaultValue: true },
];

const recommendsField: Field = {
  name: 'recommends',
  label: 'Recomenda',
  type: 'text',
  admin: {
    description: 'Chaves das soluções (aba Soluções), separadas por vírgula. Ex.: portal-pedidos',
  },
};

const optionsField: Field = {
  name: 'options',
  label: 'Opções',
  type: 'array',
  required: true,
  minRows: 2,
  labels: { singular: 'Opção', plural: 'Opções' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', label: 'Texto', type: 'text', required: true },
        {
          name: 'points',
          label: 'Pontos',
          type: 'number',
          defaultValue: 0,
          admin: { width: '20%' },
        },
      ],
    },
    recommendsField,
  ],
};

const blocks: Block[] = [
  {
    slug: 'single',
    admin: blockAdmin,
    labels: { singular: 'Escolha única', plural: 'Escolha única' },
    fields: [...questionBase, optionsField],
  },
  {
    slug: 'multiple',
    admin: blockAdmin,
    labels: { singular: 'Múltipla escolha', plural: 'Múltipla escolha' },
    fields: [
      ...questionBase,
      optionsField,
      {
        name: 'maxSelections',
        label: 'Máximo de opções marcadas',
        type: 'number',
        min: 1,
        admin: { description: 'Vazio = sem limite.' },
      },
    ],
  },
  {
    slug: 'scale',
    admin: blockAdmin,
    labels: { singular: 'Escala de 1 a 5', plural: 'Escalas' },
    fields: [
      ...questionBase,
      {
        type: 'row',
        fields: [
          { name: 'minLabel', label: 'Rótulo do 1', type: 'text', required: true },
          { name: 'maxLabel', label: 'Rótulo do 5', type: 'text', required: true },
          {
            name: 'weight',
            label: 'Peso',
            type: 'number',
            defaultValue: 1,
            admin: { description: 'Pontos = (resposta − 1) × peso.' },
          },
        ],
      },
    ],
  },
  {
    slug: 'number',
    admin: blockAdmin,
    labels: { singular: 'Número', plural: 'Números' },
    fields: [
      ...questionBase,
      {
        type: 'row',
        fields: [
          { name: 'unit', label: 'Unidade', type: 'text', admin: { description: 'Ex.: pessoas' } },
          { name: 'placeholder', label: 'Exemplo no campo', type: 'text' },
        ],
      },
      {
        name: 'ranges',
        label: 'Faixas de pontuação',
        type: 'array',
        labels: { singular: 'Faixa', plural: 'Faixas' },
        admin: { description: 'A primeira faixa que contém o valor define os pontos.' },
        fields: [
          {
            type: 'row',
            fields: [
              { name: 'min', label: 'De', type: 'number' },
              { name: 'max', label: 'Até', type: 'number' },
              { name: 'points', label: 'Pontos', type: 'number', defaultValue: 0 },
            ],
          },
          recommendsField,
        ],
      },
    ],
  },
  {
    slug: 'text',
    admin: blockAdmin,
    labels: { singular: 'Texto livre', plural: 'Textos livres' },
    fields: [...questionBase, { name: 'placeholder', label: 'Exemplo no campo', type: 'text' }],
  },
];

export const Quizzes: CollectionConfig = {
  slug: 'quizzes',
  labels: { singular: 'Quiz', plural: 'Quizzes' },
  versions: { drafts: true },
  admin: {
    group: 'Captação',
    useAsTitle: 'title',
    defaultColumns: ['title', 'segment', 'slug', '_status', 'updatedAt'],
    description: 'Diagnósticos interativos publicados em /diagnostico/<slug>.',
    preview: (doc) => previewUrl(`/diagnostico/${doc.slug}`),
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    ...revalidateHooks,
    beforeValidate: [
      ({ data }) => {
        // Identificadores repetidos misturariam as respostas de perguntas diferentes.
        const keys = (data?.questions ?? []).map((q: { key?: string }) => q.key?.trim());
        const repeated = keys.filter((key: string, i: number) => key && keys.indexOf(key) !== i);
        if (repeated.length) {
          throw new Error(
            `Identificadores de pergunta repetidos: ${[...new Set(repeated)].join(', ')}`,
          );
        }
        return data;
      },
    ],
  },
  fields: [
    { name: 'title', label: 'Nome do quiz', type: 'text', required: true },
    slug(),
    {
      name: 'segment',
      label: 'Nicho',
      type: 'text',
      required: true,
      admin: { position: 'sidebar', description: 'Ex.: Empresas com ERP.' },
    },
    projectTypeField,
    {
      name: 'index',
      label: 'Aparecer no Google',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Abertura',
          fields: [
            { name: 'eyebrow', label: 'Chamada acima do título', type: 'text', required: true },
            { name: 'headline', label: 'Título', type: 'text', required: true },
            { name: 'description', label: 'Texto de apoio', type: 'textarea', required: true },
            {
              type: 'row',
              fields: [
                {
                  name: 'startLabel',
                  label: 'Texto do botão',
                  type: 'text',
                  required: true,
                  defaultValue: 'Começar diagnóstico',
                },
                {
                  name: 'estimatedTime',
                  label: 'Tempo estimado',
                  type: 'text',
                  defaultValue: 'Leva cerca de 2 minutos',
                },
              ],
            },
          ],
        },
        {
          label: 'Perguntas',
          fields: [
            {
              name: 'questions',
              label: 'Perguntas',
              type: 'blocks',
              labels: { singular: 'Pergunta', plural: 'Perguntas' },
              required: true,
              minRows: 1,
              blocks,
              admin: { initCollapsed: true },
            },
          ],
        },
        {
          label: 'Soluções',
          description: 'O que o diagnóstico pode recomendar, conforme as respostas.',
          fields: [
            {
              name: 'solutions',
              label: 'Soluções',
              type: 'array',
              admin: { initCollapsed: true, components: { RowLabel: rowTitleLabel } },
              labels: { singular: 'Solução', plural: 'Soluções' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'key',
                      label: 'Chave',
                      type: 'text',
                      required: true,
                      admin: { width: '30%', description: 'Usada no campo "Recomenda".' },
                    },
                    { name: 'title', label: 'Título', type: 'text', required: true },
                  ],
                },
                { name: 'description', label: 'Descrição', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Resultados',
          description:
            'Perfis por pontuação: vale o perfil com a maior pontuação mínima que o total atinge.',
          fields: [
            {
              name: 'results',
              label: 'Perfis de resultado',
              type: 'array',
              admin: { components: { RowLabel: rowTitleLabel } },
              required: true,
              minRows: 1,
              labels: { singular: 'Perfil', plural: 'Perfis' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'title', label: 'Título do perfil', type: 'text', required: true },
                    {
                      name: 'minScore',
                      label: 'Pontuação mínima',
                      type: 'number',
                      required: true,
                      defaultValue: 0,
                      admin: { width: '25%' },
                    },
                  ],
                },
                { name: 'summary', label: 'Texto do resultado', type: 'textarea', required: true },
              ],
            },
            {
              name: 'whatsappMessage',
              label: 'Mensagem do WhatsApp no resultado',
              type: 'textarea',
              required: true,
              admin: { description: 'O perfil obtido é acrescentado automaticamente ao final.' },
            },
          ],
        },
        {
          label: 'Contato',
          description: 'Pedido antes de mostrar o resultado.',
          fields: [
            {
              name: 'leadTitle',
              label: 'Título',
              type: 'text',
              required: true,
              defaultValue: 'Seu diagnóstico está pronto.',
            },
            {
              name: 'leadDescription',
              label: 'Texto',
              type: 'textarea',
              required: true,
              defaultValue: 'Informe seus dados para ver o resultado e as recomendações.',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'askCompany',
                  label: 'Pedir empresa',
                  type: 'checkbox',
                  defaultValue: true,
                },
                { name: 'askRole', label: 'Pedir cargo', type: 'checkbox', defaultValue: true },
              ],
            },
            {
              name: 'submitLabel',
              label: 'Texto do botão',
              type: 'text',
              required: true,
              defaultValue: 'Ver meu resultado',
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
                description: 'O site acrescenta " | TTech Consulting". Total ideal: até 60.',
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
