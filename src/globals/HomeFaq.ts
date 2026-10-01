import type { GlobalConfig } from 'payload';
import { anyone, authenticated } from '../collections/shared/access';
import { faqField } from '../collections/shared/fields';
import { revalidateGlobal } from '../collections/shared/revalidate';

export const HomeFaq: GlobalConfig = {
  slug: 'home-faq',
  label: 'Perguntas frequentes (home)',
  admin: { group: 'Site' },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [faqField('items', 'Perguntas')],
};
