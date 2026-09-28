import type { MetadataRoute } from 'next';
import { landingPages } from '@/content/landing-pages';
import { services } from '@/content/services';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-09-28');
  const pages = [
    { path: '/', priority: 1 },
    { path: '/solucoes', priority: 0.9 },
    ...services.map((service) => ({ path: `/${service.slug}`, priority: 0.8 })),
    ...landingPages
      .filter((page) => page.index)
      .map((page) => ({ path: `/lp/${page.slug}`, priority: 0.8 })),
    { path: '/projetos', priority: 0.7 },
    { path: '/sobre', priority: 0.7 },
    { path: '/contato', priority: 0.7 },
    { path: '/politica-de-privacidade', priority: 0.3 },
    { path: '/termos-de-uso', priority: 0.3 },
  ];

  return pages.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
