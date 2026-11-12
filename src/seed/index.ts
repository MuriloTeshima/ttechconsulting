import config from '@payload-config';
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical';
import path from 'path';
import { getPayload, type CollectionSlug, type Where } from 'payload';
import { toSlug } from '@/collections/shared/fields';
import { audiences } from './data/audiences';
import { clientLogos } from './data/clients';
import { faq } from './data/faq';
import { landingPages } from './data/landing-pages';
import { projects } from './data/projects';
import { posts } from './data/posts';
import { quizzes } from './data/quizzes';
import { services } from './data/services';

/**
 * Initial CMS content, taken from what used to live in the code.
 * Idempotent: skips documents that already exist. Usage: `yarn seed`.
 * Slugs are fixed (generateSlug: false) so no site URL changes.
 */
const payload = await getPayload({ config });
// A new object on every call: the Vercel Blob plugin marks the context during upload, and a
// shared context would make the following uploads get skipped silently.
const context = () => ({ disableRevalidate: true });
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
    context: context(),
    data: {
      ...service,
      // The quiz is linked further down, after the quizzes exist.
      quiz: undefined,
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
    context: context(),
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
    context: context(),
    // The image is uploaded in the panel; the seed only carries text.
    data: { ...project, image: undefined, tags: list(project.tags) },
  });
  created++;
}

for (const audience of audiences) {
  if (await exists('audiences', { title: { equals: audience.title } })) continue;
  await payload.create({
    collection: 'audiences',
    context: context(),
    data: { ...audience, solutions: list(audience.solutions) },
  });
  created++;
}

for (const logo of clientLogos) {
  if (await exists('client-logos', { name: { equals: logo.name } })) continue;
  const media = await payload.create({
    collection: 'media',
    context: context(),
    data: { alt: `Logo ${logo.name}` },
    filePath: path.resolve(process.cwd(), 'public', logo.src.replace(/^\//, '')),
  });
  await payload.create({
    collection: 'client-logos',
    context: context(),
    data: { name: logo.name, logo: media.id, scale: logo.scale ?? 1 },
  });
  created++;
}

const homeFaq = await payload.findGlobal({ slug: 'home-faq' });
if (!homeFaq.items?.length) {
  await payload.updateGlobal({ slug: 'home-faq', context: context(), data: { items: faq } });
  created++;
}

for (const title of ['Automação', 'Sistemas sob medida', 'Produto digital', 'Gestão e processos']) {
  if (await exists('categories', { title: { equals: title } })) continue;
  await payload.create({
    collection: 'categories',
    context: context(),
    data: { title, slug: toSlug(title) ?? title, generateSlug: false },
  });
  created++;
}

for (const { quiz: quizData, landingPages: lpSlugs, services: serviceSlugs } of quizzes) {
  let quizId: number;
  const existingQuiz = await payload.find({
    collection: 'quizzes',
    where: { slug: { equals: quizData.slug } },
    limit: 1,
  });
  if (existingQuiz.docs[0]) {
    quizId = existingQuiz.docs[0].id;
  } else {
    const quiz = await payload.create({
      collection: 'quizzes',
      context: context(),
      data: { ...quizData, generateSlug: false, _status: 'published' },
    });
    quizId = quiz.id;
    created++;
  }

  // Links the niche's landing pages to the quiz without overwriting a choice made in the panel.
  for (const lpSlug of lpSlugs) {
    const { docs } = await payload.find({
      collection: 'landing-pages',
      where: { slug: { equals: lpSlug } },
      depth: 0,
      limit: 1,
    });
    const page = docs[0];
    if (!page || page.quiz) continue;
    await payload.update({
      collection: 'landing-pages',
      id: page.id,
      context: context(),
      data: { quiz: quizId },
    });
    created++;
  }

  // Same for the related service pages.
  for (const serviceSlug of serviceSlugs) {
    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: serviceSlug } },
      depth: 0,
      limit: 1,
    });
    const service = docs[0];
    if (!service || service.quiz) continue;
    await payload.update({
      collection: 'services',
      id: service.id,
      context: context(),
      data: { quiz: quizId },
    });
    created++;
  }
}

const editorConfig = await editorConfigFactory.default({ config: payload.config });

for (const post of posts) {
  if (await exists('posts', { slug: { equals: post.slug } })) continue;
  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: { title: { equals: post.category } },
    depth: 0,
    limit: 1,
  });
  const cover = await payload.create({
    collection: 'media',
    context: context(),
    data: { alt: post.cover.alt },
    filePath: path.resolve(process.cwd(), 'src/seed/images/blog', post.cover.file),
  });
  await payload.create({
    collection: 'posts',
    context: context(),
    data: {
      title: post.title,
      slug: post.slug,
      generateSlug: false,
      publishedAt: post.publishedAt,
      category: categories[0]?.id,
      excerpt: post.excerpt,
      cover: cover.id,
      content: convertMarkdownToLexical({ editorConfig, markdown: post.content }),
      seo: post.seo,
      _status: 'published',
    },
  });
  created++;
}

payload.logger.info(`Seed concluído: ${created} registro(s) criado(s).`);
process.exit(0);
