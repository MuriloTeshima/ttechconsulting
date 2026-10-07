import type { MetadataRoute } from 'next';
import { getSitemapEntries } from '@/lib/cms';
import { absoluteUrl } from '@/lib/seo';

// Gerado a cada requisição: na Vercel, a revalidação sob demanda dos hooks do CMS não chega a
// esta rota, e o conteúdo novo só aparecia depois de até uma hora. São poucas consultas leves.
export const dynamic = 'force-dynamic';

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
