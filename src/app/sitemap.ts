import type { MetadataRoute } from 'next';
import { getSitemapEntries } from '@/lib/cms';
import { absoluteUrl } from '@/lib/seo';

// Generated on every request: on Vercel, on-demand revalidation from the CMS hooks doesn't reach
// this route, and new content took up to an hour to show. It's only a few light queries.
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
  // Fixed pages use the most recent content change as their date.
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
