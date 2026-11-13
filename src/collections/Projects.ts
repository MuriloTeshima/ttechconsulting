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
    {
      name: 'problem',
      label: 'Problema',
      type: 'textarea',
      admin: { description: 'O que acontecia antes. Quando preenchido com a solução, o card mostra o antes e depois.' },
    },
    {
      name: 'solution',
      label: 'Solução',
      type: 'textarea',
      admin: { description: 'O que foi construído e como funciona, em uma ou duas frases.' },
    },
    {
      name: 'image',
      label: 'Imagem',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Captura de tela do projeto (proporção 16:10). Opcional.' },
    },
    {
      name: 'demoUrl',
      label: 'Link da demonstração',
      type: 'text',
      admin: { description: 'Endereço público da demo ou de um vídeo. Opcional.' },
    },
    {
      name: 'isDemo',
      label: 'Projeto demonstrativo',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Marca o card como projeto próprio/demonstrativo, e não como cliente.' },
    },
    textList('tags', 'Tags', false),
  ],
};
