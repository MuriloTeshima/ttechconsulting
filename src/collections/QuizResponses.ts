import type { CollectionConfig } from 'payload';
import { authenticated } from './shared/access';

/** Data sent by the visitor: read-only in the panel, as a faithful record of the assessment. */
const readOnly = { readOnly: true };

export const QuizResponses: CollectionConfig = {
  slug: 'quiz-responses',
  labels: { singular: 'Resposta de quiz', plural: 'Respostas de quiz' },
  defaultSort: '-createdAt',
  admin: {
    group: 'Captação',
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'quizTitle', 'profile', 'status', 'createdAt'],
    listSearchableFields: ['name', 'email', 'company'],
    description: 'Leads dos diagnósticos. Atualize o status e anote o andamento de cada contato.',
  },
  access: {
    // Created only by the server when the quiz is completed (Local API with overrideAccess).
    create: () => false,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'novo',
      options: [
        { value: 'novo', label: 'Novo' },
        { value: 'em-contato', label: 'Em contato' },
        { value: 'qualificado', label: 'Qualificado' },
        { value: 'descartado', label: 'Descartado' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'notes', label: 'Anotações', type: 'textarea', admin: { position: 'sidebar' } },
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Nome', type: 'text', required: true, admin: readOnly },
        { name: 'email', label: 'E-mail', type: 'email', required: true, admin: readOnly },
        { name: 'phone', label: 'WhatsApp', type: 'text', required: true, admin: readOnly },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'company', label: 'Empresa', type: 'text', admin: readOnly },
        { name: 'role', label: 'Cargo', type: 'text', admin: readOnly },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'quizTitle', label: 'Quiz', type: 'text', required: true, admin: readOnly },
        { name: 'profile', label: 'Perfil', type: 'text', required: true, admin: readOnly },
        { name: 'score', label: 'Pontuação', type: 'number', required: true, admin: readOnly },
      ],
    },
    {
      name: 'quiz',
      label: 'Quiz (documento)',
      type: 'relationship',
      relationTo: 'quizzes',
      admin: readOnly,
    },
    {
      name: 'recommendations',
      label: 'Soluções recomendadas',
      type: 'text',
      admin: readOnly,
    },
    {
      name: 'answers',
      label: 'Respostas',
      type: 'array',
      admin: { ...readOnly, initCollapsed: false },
      labels: { singular: 'Resposta', plural: 'Respostas' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'question', label: 'Pergunta', type: 'text' },
            { name: 'answer', label: 'Resposta', type: 'text' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Origem da visita',
      admin: { initCollapsed: true },
      fields: [
        { name: 'pagePath', label: 'Página', type: 'text', admin: readOnly },
        { name: 'attribution', label: 'Campanha (UTMs)', type: 'json', admin: readOnly },
      ],
    },
  ],
};
