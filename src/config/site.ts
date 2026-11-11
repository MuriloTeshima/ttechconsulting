function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return 'http://localhost:3000';
}

export const site = {
  name: 'TTech Consulting',
  legalName: 'Murilo Teshima Lira Consultoria em Tecnologia da Informação Ltda.',
  cnpj: '60.509.400/0001-59',
  tagline: 'Tecnologia estratégica. Impacto real.',
  description:
    'Desenvolvimento de sistemas web, automações, integrações e produtos digitais para empresas de Ribeirão Preto e de todo o Brasil.',
  region: 'Ribeirão Preto e região, SP',
  city: 'Ribeirão Preto',
  state: 'SP',
  email: 'contato@ttechcs.com.br',
  founder: 'Murilo Teshima Lira',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
  url: resolveSiteUrl(),
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? '',
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? '',
  /** Cloudflare Turnstile (anti-spam). Empty turns the widget off. */
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '',
} as const;

export const nav = [
  { label: 'Soluções', href: '/solucoes' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Sobre', href: '/sobre' },
] as const;
