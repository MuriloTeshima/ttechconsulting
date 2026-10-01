import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from './shared/access';
import { textList } from './shared/fields';
import { revalidateHooks } from './shared/revalidate';

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Projeto', plural: 'Projetos' },
  orderable: true,
  admin: {
    group: 'Site',
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'updatedAt'],
    description: 'Publique apenas projetos com autorização e respeito à confidencialidade.',
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateHooks,
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    {
      name: 'type',
      label: 'Tipo',
      type: 'text',
      required: true,
      admin: { description: 'Ex.: PLATAFORMA WEB, AUTOMAÇÃO.' },
    },
    { name: 'description', label: 'Descrição', type: 'textarea', required: true },
    textList('tags', 'Tags', false),
  ],
};
