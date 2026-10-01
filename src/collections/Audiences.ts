import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from './shared/access';
import { textList } from './shared/fields';
import { revalidateHooks } from './shared/revalidate';

export const Audiences: CollectionConfig = {
  slug: 'audiences',
  labels: { singular: 'Público', plural: 'Públicos' },
  orderable: true,
  admin: {
    group: 'Site',
    useAsTitle: 'title',
    description: 'Cards da seção "Para quem" na home.',
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateHooks,
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'description', label: 'Descrição', type: 'textarea', required: true },
    {
      name: 'icon',
      label: 'Ícone',
      type: 'select',
      required: true,
      options: [
        { value: 'services', label: 'Maleta (serviços)' },
        { value: 'health', label: 'Estetoscópio (saúde)' },
        { value: 'distribution', label: 'Caminhão (distribuição)' },
        { value: 'product', label: 'Foguete (produto)' },
      ],
    },
    textList('solutions', 'Soluções típicas'),
  ],
};
