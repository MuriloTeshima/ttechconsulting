import type { CollectionConfig } from 'payload';
import { projectTypes } from '@/lib/contact-schema';
import { authenticated } from './shared/access';

/** Dados enviados pelo visitante: só leitura no painel, como registro fiel do contato. */
const readOnly = { readOnly: true };

export const ContactLeads: CollectionConfig = {
  slug: 'contact-leads',
  labels: { singular: 'Contato do site', plural: 'Contatos do site' },
  defaultSort: '-createdAt',
  admin: {
    group: 'Captação',
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'projectType', 'status', 'createdAt'],
    listSearchableFields: ['name', 'email', 'company'],
    description:
      'Mensagens do formulário de contato. Ficam salvas mesmo se o aviso por e-mail falhar.',
  },
  access: {
    // Criados só pelo servidor, no envio do formulário (API local com overrideAccess).
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
      name: 'emailSent',
      label: 'Aviso por e-mail enviado',
      type: 'checkbox',
      defaultValue: false,
      admin: { ...readOnly, position: 'sidebar' },
    },
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
        {
          name: 'projectType',
          label: 'Tipo de projeto',
          type: 'select',
          required: true,
          options: projectTypes.map(({ value, label }) => ({ value, label })),
          admin: readOnly,
        },
      ],
    },
    { name: 'message', label: 'Mensagem', type: 'textarea', required: true, admin: readOnly },
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
