import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from './shared/access';
import { revalidateHooks } from './shared/revalidate';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Arquivo', plural: 'Mídia' },
  admin: { group: 'Mídia', defaultColumns: ['filename', 'alt', 'updatedAt'] },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateHooks,
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'card', width: 768 },
      { name: 'hero', width: 1600 },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo',
      type: 'text',
      required: true,
      admin: { description: 'Descreve a imagem para leitores de tela e para o Google.' },
    },
  ],
};
