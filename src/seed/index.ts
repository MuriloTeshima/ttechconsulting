import config from '@payload-config';
import path from 'path';
import { getPayload, type CollectionSlug, type Where } from 'payload';
import { toSlug } from '@/collections/shared/fields';
import { audiences } from './data/audiences';
import { clientLogos } from './data/clients';
import { faq } from './data/faq';
import { landingPages } from './data/landing-pages';
import { projects } from './data/projects';
import { services } from './data/services';

/**
 * Carga inicial do CMS com o conteúdo que existia no código.
 * Idempotente: pula documentos que já existem. Uso: `yarn seed`.
 * Os slugs vão fixos (generateSlug: false) para nenhuma URL do site mudar.
 */
const payload = await getPayload({ config });
const context = { disableRevalidate: true };
const list = (items: string[]) => items.map((text) => ({ text }));

async function exists(collection: CollectionSlug, where: Where) {
  const { totalDocs } = await payload.count({ collection, where });
  return totalDocs > 0;
}

let created = 0;

for (const service of services) {
  if (await exists('services', { slug: { equals: service.slug } })) continue;
  await payload.create({
    collection: 'services',
    context,
    data: {
      ...service,
      generateSlug: false,
      deliverables: list(service.deliverables),
    },
  });
  created++;
}

for (const page of landingPages) {
  if (await exists('landing-pages', { slug: { equals: page.slug } })) continue;
  await payload.create({
    collection: 'landing-pages',
    context,
    data: {
      ...page,
      generateSlug: false,
      signals: list(page.signals),
      pains: list(page.pains),
      _status: 'published',
    },
  });
  created++;
}

for (const project of projects) {
  if (await exists('projects', { title: { equals: project.title } })) continue;
  await payload.create({
    collection: 'projects',
    context,
    data: { ...project, tags: list(project.tags) },
  });
  created++;
}

for (const audience of audiences) {
  if (await exists('audiences', { title: { equals: audience.title } })) continue;
  await payload.create({
    collection: 'audiences',
    context,
    data: { ...audience, solutions: list(audience.solutions) },
  });
  created++;
}

for (const logo of clientLogos) {
  if (await exists('client-logos', { name: { equals: logo.name } })) continue;
  const media = await payload.create({
    collection: 'media',
    context,
    data: { alt: `Logo ${logo.name}` },
    filePath: path.resolve(process.cwd(), 'public', logo.src.replace(/^\//, '')),
  });
  await payload.create({
    collection: 'client-logos',
    context,
    data: { name: logo.name, logo: media.id, scale: logo.scale ?? 1 },
  });
  created++;
}

const homeFaq = await payload.findGlobal({ slug: 'home-faq' });
if (!homeFaq.items?.length) {
  await payload.updateGlobal({ slug: 'home-faq', context, data: { items: faq } });
  created++;
}

for (const title of ['Automação', 'Sistemas sob medida', 'Produto digital', 'Gestão e processos']) {
  if (await exists('categories', { title: { equals: title } })) continue;
  await payload.create({
    collection: 'categories',
    context,
    data: { title, slug: toSlug(title) ?? title, generateSlug: false },
  });
  created++;
}

payload.logger.info(`Seed concluído: ${created} registro(s) criado(s).`);
process.exit(0);
