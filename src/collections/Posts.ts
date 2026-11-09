import type { CollectionConfig } from 'payload';
import { authenticated, publishedOrAuthenticated } from './shared/access';
import { seoGroup, slug } from './shared/fields';
import { previewUrl } from './shared/preview';
import { revalidateHooks } from './shared/revalidate';

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
  versions: { drafts: true },
  defaultSort: '-publishedAt',
  admin: {
    group: 'Blog',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', '_status', 'publishedAt'],
    preview: (doc) => previewUrl(`/blog/${doc.slug}`),
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    ...revalidateHooks,
    beforeChange: [
      // Publish date is set automatically the first time the post is published.
      ({ data }) => {
        if (data._status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    slug(),
    {
      name: 'publishedAt',
      label: 'Data de publicação',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'relationship',
      relationTo: 'categories',
      admin: { position: 'sidebar' },
    },
    {
      name: 'excerpt',
      label: 'Resumo',
      type: 'textarea',
      required: true,
      maxLength: 220,
      admin: { description: 'Aparece na listagem do blog e como descrição no Google.' },
    },
    { name: 'cover', label: 'Imagem de capa', type: 'upload', relationTo: 'media' },
    { name: 'content', label: 'Conteúdo', type: 'richText', required: true },
    seoGroup(),
  ],
};
