import type { MetadataRoute } from 'next';
import { getSitemapEntries } from '@/lib/cms';
import { absoluteUrl } from '@/lib/seo';

// Atualizado a cada publicação no CMS (revalidação dos hooks das coleções).
const STATIC_PAGES = [
  { path: '/', priority: 1 },
  { path: '/solucoes', priority: 0.9 },
  { path: '/blog', priority: 0.8 },
  { path: '/projetos', priority: 0.7 },
  { path: '/sobre', priority: 0.7 },
  { path: '/contato', priority: 0.7 },
  { path: '/politica-de-privacidade', priority: 0.3 },
  { path: '/termos-de-uso', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries();
  // Páginas fixas usam a alteração mais recente do conteúdo como referência.
  const latest = entries.reduce(
    (max, entry) => (entry.updatedAt > max ? entry.updatedAt : max),
    '2026-09-28T00:00:00.000Z',
  );
  return [
    ...STATIC_PAGES.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified: new Date(latest),
      priority,
    })),
    ...entries.map(({ path, updatedAt, priority }) => ({
      url: absoluteUrl(path),
      lastModified: new Date(updatedAt),
      priority,
    })),
  ];
}
