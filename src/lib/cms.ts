import 'server-only';
import config from '@payload-config';
import { getPayload } from 'payload';
import { cache } from 'react';
import type * as P from '@/payload-types';
import type { PublicQuiz } from './quiz';
import { toPublicQuiz } from './quiz-scoring';
import type {
  Audience,
  ClientLogo,
  FaqItem,
  LandingPage,
  MediaImage,
  Post,
  PostSummary,
  Project,
  QuizInvite,
  Service,
  TitledText,
} from './content-types';

/**
 * Acesso ao conteúdo do CMS (API local do Payload, sobre o Drizzle/Postgres).
 * Converte os documentos para os tipos de src/lib/content-types.ts usados pelos componentes.
 * Consultas próprias fora das coleções podem usar `(await getCms()).db.drizzle` com o
 * esquema tipado em src/payload-generated-schema.ts.
 */
export const getCms = cache(() => getPayload({ config }));

const PUBLISHED = { _status: { equals: 'published' } } as const;

const texts = (items?: { text: string }[] | null) => (items ?? []).map((item) => item.text);
const titled = (items?: { title: string; text: string }[] | null): TitledText[] =>
  (items ?? []).map(({ title, text }) => ({ title, text }));
const faqs = (items?: { q: string; a: string }[] | null): FaqItem[] =>
  (items ?? []).map(({ q, a }) => ({ q, a }));

function toImage(media: number | P.Media | null | undefined): MediaImage | null {
  if (!media || typeof media === 'number' || !media.url) return null;
  return {
    url: media.url,
    alt: media.alt,
    width: media.width ?? 1200,
    height: media.height ?? 630,
  };
}

// Serviços

function toService(doc: P.Service): Service {
  return {
    slug: doc.slug,
    title: doc.title,
    seoTitle: doc.seoTitle,
    short: doc.short,
    lead: doc.lead,
    problem: doc.problem,
    deliverables: texts(doc.deliverables),
    suitable: doc.suitable,
    icon: doc.icon,
    projectType: doc.projectType,
    cta: doc.cta,
    examples: titled(doc.examples),
    faq: faqs(doc.faq),
  };
}

export const getServices = cache(async (): Promise<Service[]> => {
  const { docs } = await (
    await getCms()
  ).find({
    collection: 'services',
    sort: '_order',
    depth: 0,
    limit: 100,
  });
  return docs.map(toService);
});

export async function getService(slug: string) {
  return (await getServices()).find((service) => service.slug === slug) ?? null;
}

// Landing pages

function toLandingPage(doc: P.LandingPage): LandingPage {
  return {
    slug: doc.slug,
    segment: doc.segment,
    metaTitle: doc.metaTitle,
    shortBrand: Boolean(doc.shortBrand),
    metaDescription: doc.metaDescription,
    eyebrow: doc.eyebrow,
    title: doc.title,
    highlight: doc.highlight,
    description: doc.description,
    signalsTitle: doc.signalsTitle,
    signals: texts(doc.signals),
    problemTitle: doc.problemTitle,
    problemText: doc.problemText,
    pains: texts(doc.pains),
    solutionTitle: doc.solutionTitle,
    solutionText: doc.solutionText,
    deliverables: titled(doc.deliverables),
    note: doc.note ?? undefined,
    faq: faqs(doc.faq),
    ctaLabel: doc.ctaLabel,
    finalTitle: doc.finalTitle,
    finalText: doc.finalText,
    projectType: doc.projectType,
    whatsappMessage: doc.whatsappMessage,
    index: doc.index ?? true,
    quiz: toQuizInvite(doc.quiz),
  };
}

function toQuizInvite(quiz: P.LandingPage['quiz']): QuizInvite | null {
  if (!quiz || typeof quiz === 'number' || quiz._status !== 'published') return null;
  return {
    slug: quiz.slug,
    eyebrow: quiz.eyebrow,
    headline: quiz.headline,
    description: quiz.description,
    startLabel: quiz.startLabel,
    estimatedTime: quiz.estimatedTime ?? null,
  };
}

/** Landing pages publicadas (para rotas estáticas e sitemap). */
export const getLandingPages = cache(async (): Promise<LandingPage[]> => {
  const { docs } = await (
    await getCms()
  ).find({
    collection: 'landing-pages',
    where: PUBLISHED,
    sort: '_order',
    depth: 1,
    limit: 100,
  });
  return docs.map(toLandingPage);
});

/** Uma landing page; com `draft`, devolve a versão mais recente, mesmo não publicada. */
export const getLandingPage = cache(async (slug: string, draft = false) => {
  const { docs } = await (
    await getCms()
  ).find({
    collection: 'landing-pages',
    draft,
    where: draft ? { slug: { equals: slug } } : { and: [{ slug: { equals: slug } }, PUBLISHED] },
    depth: 1,
    limit: 1,
  });
  return docs[0] ? toLandingPage(docs[0]) : null;
});

// Home: projetos, públicos, logos e FAQ

export const getProjects = cache(async (): Promise<Project[]> => {
  const { docs } = await (
    await getCms()
  ).find({
    collection: 'projects',
    sort: '_order',
    depth: 0,
    limit: 100,
  });
  return docs.map((doc) => ({
    type: doc.type,
    title: doc.title,
    description: doc.description,
    tags: texts(doc.tags),
  }));
});

export const getAudiences = cache(async (): Promise<Audience[]> => {
  const { docs } = await (
    await getCms()
  ).find({
    collection: 'audiences',
    sort: '_order',
    depth: 0,
    limit: 100,
  });
  return docs.map((doc) => ({
    title: doc.title,
    description: doc.description,
    icon: doc.icon,
    solutions: texts(doc.solutions),
  }));
});

export const getClientLogos = cache(async (): Promise<ClientLogo[]> => {
  const { docs } = await (
    await getCms()
  ).find({
    collection: 'client-logos',
    sort: '_order',
    depth: 1,
    limit: 100,
  });
  return docs.flatMap((doc) => {
    const image = toImage(doc.logo);
    if (!image) return [];
    return [
      {
        name: doc.name,
        src: image.url,
        ratio: image.width / image.height,
        scale: doc.scale ?? 1,
      },
    ];
  });
});

export const getHomeFaq = cache(async (): Promise<FaqItem[]> => {
  const doc = await (await getCms()).findGlobal({ slug: 'home-faq', depth: 0 });
  return faqs(doc.items);
});

// Blog

function toPostSummary(doc: P.Post): PostSummary {
  const category = doc.category && typeof doc.category === 'object' ? doc.category : null;
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    publishedAt: doc.publishedAt ?? null,
    category: category ? { title: category.title, slug: category.slug } : null,
    cover: toImage(doc.cover),
  };
}

export const getPosts = cache(async (): Promise<PostSummary[]> => {
  const { docs } = await (
    await getCms()
  ).find({
    collection: 'posts',
    where: PUBLISHED,
    sort: '-publishedAt',
    depth: 1,
    limit: 100,
  });
  return docs.map(toPostSummary);
});

export const getPost = cache(async (slug: string, draft = false): Promise<Post | null> => {
  const { docs } = await (
    await getCms()
  ).find({
    collection: 'posts',
    draft,
    where: draft ? { slug: { equals: slug } } : { and: [{ slug: { equals: slug } }, PUBLISHED] },
    depth: 2,
    limit: 1,
  });
  const doc = docs[0];
  if (!doc) return null;
  return {
    ...toPostSummary(doc),
    content: doc.content,
    seoTitle: doc.seo?.title || doc.title,
    seoDescription: doc.seo?.description || doc.excerpt,
  };
});

// Quizzes

/** Documento completo do quiz (com pontuação). Só para uso no servidor. */
export const getQuizDoc = cache(async (slug: string, draft = false) => {
  const { docs } = await (
    await getCms()
  ).find({
    collection: 'quizzes',
    draft,
    where: draft ? { slug: { equals: slug } } : { and: [{ slug: { equals: slug } }, PUBLISHED] },
    depth: 0,
    limit: 1,
  });
  return docs[0] ?? null;
});

/** Quiz no formato público, sem pontos nem recomendações. */
export async function getQuiz(slug: string, draft = false): Promise<PublicQuiz | null> {
  const doc = await getQuizDoc(slug, draft);
  return doc ? toPublicQuiz(doc) : null;
}

export const getQuizSlugs = cache(async () => {
  const { docs } = await (
    await getCms()
  ).find({
    collection: 'quizzes',
    where: PUBLISHED,
    select: { slug: true },
    depth: 0,
    limit: 100,
  });
  return docs.map((doc) => doc.slug);
});

// Sitemap

export type SitemapEntry = { path: string; updatedAt: string; priority: number };

/** Páginas vindas do CMS com a data real da última alteração. */
export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const cms = await getCms();
  const select = { slug: true, updatedAt: true } as const;
  const [services, landingPages, posts, quizzes] = await Promise.all([
    cms.find({ collection: 'services', select, sort: '_order', limit: 100, depth: 0 }),
    cms.find({
      collection: 'landing-pages',
      select,
      where: { and: [PUBLISHED, { index: { equals: true } }] },
      sort: '_order',
      limit: 100,
      depth: 0,
    }),
    cms.find({
      collection: 'posts',
      select,
      where: PUBLISHED,
      sort: '-publishedAt',
      limit: 1000,
      depth: 0,
    }),
    cms.find({
      collection: 'quizzes',
      select,
      where: { and: [PUBLISHED, { index: { equals: true } }] },
      limit: 100,
      depth: 0,
    }),
  ]);
  return [
    ...services.docs.map((doc) => ({
      path: `/${doc.slug}`,
      updatedAt: doc.updatedAt,
      priority: 0.8,
    })),
    ...landingPages.docs.map((doc) => ({
      path: `/lp/${doc.slug}`,
      updatedAt: doc.updatedAt,
      priority: 0.8,
    })),
    ...quizzes.docs.map((doc) => ({
      path: `/diagnostico/${doc.slug}`,
      updatedAt: doc.updatedAt,
      priority: 0.7,
    })),
    ...posts.docs.map((doc) => ({
      path: `/blog/${doc.slug}`,
      updatedAt: doc.updatedAt,
      priority: 0.6,
    })),
  ];
}
