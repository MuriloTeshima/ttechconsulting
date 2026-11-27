import type { CollectionConfig } from 'payload';
import { authenticated } from './shared/access';

const readOnly = { readOnly: true };

/**
 * Deliveries received from the IdealTrack webhook (/api/webhooks/idealtrack).
 * The unique eventId is what makes a repeated delivery be ignored.
 */
export const IdealTrackEvents: CollectionConfig = {
  slug: 'idealtrack-events',
  labels: { singular: 'Evento IdealTrack', plural: 'Eventos IdealTrack' },
  defaultSort: '-createdAt',
  admin: {
    group: 'Captação',
    useAsTitle: 'summary',
    defaultColumns: ['summary', 'result', 'post', 'createdAt'],
    listSearchableFields: ['summary', 'event', 'eventId'],
    description:
      'Envios do webhook do IdealTrack. "Conteúdo gerado" vira um rascunho em Blog → Posts; os demais eventos ficam só registrados aqui.',
  },
  access: {
    // Created only by the webhook route (Local API with overrideAccess).
    create: () => false,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'result',
      label: 'Resultado',
      type: 'select',
      required: true,
      options: [
        { value: 'post-criado', label: 'Rascunho criado' },
        { value: 'registrado', label: 'Só registrado' },
        { value: 'formato-nao-suportado', label: 'Formato não suportado' },
      ],
      admin: { ...readOnly, position: 'sidebar' },
    },
    {
      name: 'post',
      label: 'Rascunho no blog',
      type: 'relationship',
      relationTo: 'posts',
      admin: { ...readOnly, position: 'sidebar' },
    },
    { name: 'notes', label: 'Anotações', type: 'textarea', admin: { position: 'sidebar' } },
    { name: 'summary', label: 'Resumo', type: 'text', required: true, admin: readOnly },
    {
      type: 'row',
      fields: [
        { name: 'event', label: 'Evento', type: 'text', required: true, admin: readOnly },
        {
          name: 'eventId',
          label: 'ID do evento',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          admin: readOnly,
        },
        { name: 'project', label: 'Projeto', type: 'text', admin: readOnly },
      ],
    },
    {
      name: 'prompt',
      label: 'Pergunta que originou o conteúdo',
      type: 'text',
      admin: readOnly,
    },
    {
      name: 'occurredAt',
      label: 'Quando aconteceu',
      type: 'date',
      admin: { ...readOnly, date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'payload', label: 'Corpo recebido', type: 'json', required: true, admin: readOnly },
  ],
};
