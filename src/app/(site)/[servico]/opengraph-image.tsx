import { getService, services } from '@/content/services';
import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting — Soluções';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((service) => ({ servico: service.slug }));
}

export default async function Image({ params }: { params: Promise<{ servico: string }> }) {
  const service = getService((await params).servico);
  return brandOgImage({
    eyebrow: service?.title ?? 'Soluções',
    title: service?.lead ?? 'Sistemas, automações e produtos digitais.',
  });
}
