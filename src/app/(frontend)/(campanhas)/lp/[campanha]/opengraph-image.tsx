import { getLandingPage, getLandingPages } from '@/lib/cms';
import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting';
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return (await getLandingPages()).map((page) => ({ campanha: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ campanha: string }> }) {
  const page = await getLandingPage((await params).campanha);
  return brandOgImage({
    eyebrow: page?.segment ?? 'TTech Consulting',
    title: page ? `${page.title} ${page.highlight}` : 'Sistemas, automações e produtos digitais.',
  });
}
