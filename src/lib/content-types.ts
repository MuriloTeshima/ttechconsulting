import type { ProjectType } from './contact-schema';

/**
 * Content shapes used by the site components.
 * The CMS layer (src/lib/cms.ts) converts Payload documents to these types.
 */

export type FaqItem = { q: string; a: string };

export type TitledText = { title: string; text: string };

export type ServiceIcon = 'layers' | 'workflow' | 'blocks' | 'monitor' | 'refresh';

export type Service = {
  /** Assessment invitation shown on the service page. */
  quiz?: QuizInvite | null;
  slug: string;
  title: string;
  /** Title for the browser tab and Google (the layout appends " | TTech Consulting"). */
  seoTitle: string;
  short: string;
  lead: string;
  problem: string;
  deliverables: string[];
  suitable: string;
  icon: ServiceIcon;
  /** Project type preselected in the form when the contact comes from this page. */
  projectType: ProjectType;
  cta: string;
  examples: TitledText[];
  faq: FaqItem[];
};

export type LandingPage = {
  slug: string;
  segment: string;
  metaTitle: string;
  /** Uses the short brand (" | TTech") in the title so it fits in ~60 characters. */
  shortBrand?: boolean;
  metaDescription: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  signalsTitle: string;
  signals: string[];
  problemTitle: string;
  problemText: string;
  pains: string[];
  solutionTitle: string;
  solutionText: string;
  deliverables: TitledText[];
  note?: string;
  faq: FaqItem[];
  ctaLabel: string;
  finalTitle: string;
  finalText: string;
  projectType: ProjectType;
  /** Prefilled WhatsApp message on this page. */
  whatsappMessage: string;
  /** Turns search engine indexing of the page on or off. */
  index: boolean;
  /** The niche's quiz, shown as an invitation on the page (only if published). */
  quiz: QuizInvite | null;
};

export type QuizInvite = {
  slug: string;
  eyebrow: string;
  headline: string;
  description: string;
  startLabel: string;
  estimatedTime: string | null;
};

export type Project = {
  type: string;
  title: string;
  description: string;
  tags: string[];
  problem?: string | null;
  solution?: string | null;
  image?: MediaImage | null;
  demoUrl?: string | null;
  isDemo?: boolean;
};

export type AudienceIcon = 'services' | 'health' | 'distribution' | 'product';

export type Audience = {
  title: string;
  description: string;
  icon: AudienceIcon;
  solutions: string[];
};

export type ClientLogo = {
  name: string;
  src: string;
  /** Logo aspect ratio (width / height). */
  ratio: number;
  /** Height fine-tuning to balance visual weight across logos. */
  scale?: number;
};

export type MediaImage = { url: string; alt: string; width: number; height: number };

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string | null;
  category: { title: string; slug: string } | null;
  cover: MediaImage | null;
};

export type Post = PostSummary & {
  /** Serialized Lexical editor state (rendered with <RichText />). */
  content: import('@/payload-types').Post['content'];
  seoTitle: string;
  seoDescription: string;
};
