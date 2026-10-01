import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from './shared/access';
import { slug } from './shared/fields';
import { revalidateHooks } from './shared/revalidate';

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Categoria', plural: 'Categorias' },
  admin: { group: 'Blog', useAsTitle: 'title' },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateHooks,
  fields: [{ name: 'title', label: 'Nome', type: 'text', required: true }, slug()],
};
