import type { CollectionConfig } from 'payload';
import {
  anyone,
  authenticated,
  authenticatedOutsidePreview,
  isPreviewDeploy,
} from './shared/access';
import { revalidateHooks } from './shared/revalidate';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Arquivo', plural: 'Mídia' },
  admin: {
    group: 'Mídia',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    description: isPreviewDeploy
      ? 'Ambiente de preview: é possível enviar imagens novas, mas não apagar nem substituir as existentes, porque os arquivos são os mesmos da produção.'
      : undefined,
  },
  access: {
    read: anyone,
    create: authenticated,
    // Em preview, os arquivos são os mesmos da produção: bloquear evita apagá-los do site no ar.
    update: authenticatedOutsidePreview,
    delete: authenticatedOutsidePreview,
  },
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
