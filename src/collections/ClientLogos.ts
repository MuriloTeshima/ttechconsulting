import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from './shared/access';
import { revalidateHooks } from './shared/revalidate';

export const ClientLogos: CollectionConfig = {
  slug: 'client-logos',
  labels: { singular: 'Logo de cliente', plural: 'Logos de clientes' },
  orderable: true,
  admin: {
    group: 'Site',
    useAsTitle: 'name',
    description: 'Faixa de logos abaixo do hero. Use SVG na cor #1E1F21.',
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateHooks,
  fields: [
    { name: 'name', label: 'Empresa', type: 'text', required: true },
    { name: 'logo', label: 'Logo', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'scale',
      label: 'Ajuste de tamanho',
      type: 'number',
      defaultValue: 1,
      min: 0.5,
      max: 2,
      admin: {
        step: 0.05,
        description: 'Equilibra o peso visual entre logos. 1 = altura padrão.',
      },
    },
  ],
};
