import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting — Sobre a TTech';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandOgImage({
    eyebrow: 'Sobre a TTech',
    title: 'Software sob medida, feito com quem conhece a operação.',
  });
}
