import type { Metadata } from 'next';
import { site } from '@/config/site';
import type { FaqItem } from '@/content/faq';

export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      locale: 'pt_BR',
      siteName: site.name,
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: index ? undefined : { index: false, follow: true },
  };
}

const organizationId = absoluteUrl('/#organization');

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': organizationId,
    name: site.name,
    legalName: site.legalName,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: absoluteUrl('/logo-ttech-consulting.png'),
    image: absoluteUrl('/opengraph-image'),
    email: site.email,
    ...(site.whatsapp ? { telephone: `+${site.whatsapp}` } : {}),
    taxID: site.cnpj,
    founder: { '@type': 'Person', name: site.founder },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: 'BR',
    },
    areaServed: [
      { '@type': 'City', name: site.city },
      { '@type': 'Country', name: 'Brasil' },
    ],
    knowsAbout: [
      'Desenvolvimento de sistemas web',
      'Automação de processos',
      'Integrações entre sistemas',
      'MVP',
      'Produtos digitais',
    ],
  };
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    provider: { '@id': organizationId },
    areaServed: { '@type': 'Country', name: 'Brasil' },
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Início', path: '/' }, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
