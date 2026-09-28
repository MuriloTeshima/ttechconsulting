import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting — Soluções';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandOgImage({
    eyebrow: 'Soluções',
    title: 'Software construído a partir do que sua empresa precisa resolver.',
  });
}
