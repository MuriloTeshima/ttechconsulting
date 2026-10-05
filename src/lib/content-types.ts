import type { ProjectType } from './contact-schema';

/**
 * Formatos de conteúdo consumidos pelos componentes do site.
 * O CMS (src/lib/cms.ts) converte os documentos do Payload para estes tipos.
 */

export type FaqItem = { q: string; a: string };

export type TitledText = { title: string; text: string };

export type ServiceIcon = 'layers' | 'workflow' | 'blocks' | 'monitor' | 'refresh';

export type Service = {
  slug: string;
  title: string;
  /** Título da aba e do Google (o layout acrescenta " | TTech Consulting"). */
  seoTitle: string;
  short: string;
  lead: string;
  problem: string;
  deliverables: string[];
  suitable: string;
  icon: ServiceIcon;
  /** Tipo de projeto pré-selecionado no formulário quando o contato vem desta página. */
  projectType: ProjectType;
  cta: string;
  examples: TitledText[];
  faq: FaqItem[];
};

export type LandingPage = {
  slug: string;
  segment: string;
  metaTitle: string;
  /** Usa a marca curta (" | TTech") no título, para caber em ~60 caracteres. */
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
  /** Mensagem pré-preenchida do WhatsApp nesta página. */
  whatsappMessage: string;
  /** Liga/desliga a indexação da página pelos buscadores. */
  index: boolean;
  /** Quiz do nicho, exibido como convite na página (só se estiver publicado). */
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

export type Project = { type: string; title: string; description: string; tags: string[] };

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
  /** Proporção do logo (largura / altura). */
  ratio: number;
  /** Ajuste fino de altura para equilibrar o peso visual entre logos. */
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
  /** Estado serializado do editor Lexical (renderizado com <RichText />). */
  content: import('@/payload-types').Post['content'];
  seoTitle: string;
  seoDescription: string;
};
