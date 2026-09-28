import { getLandingPage, landingPages } from '@/content/landing-pages';
import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return landingPages.map((page) => ({ campanha: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ campanha: string }> }) {
  const page = getLandingPage((await params).campanha);
  return brandOgImage({
    eyebrow: page?.segment ?? 'TTech Consulting',
    title: page ? `${page.title} ${page.highlight}` : 'Sistemas, automações e produtos digitais.',
  });
}
