import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting — Sobre a TTech';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandOgImage({
    eyebrow: 'Sobre a TTech',
    title: 'Tecnologia com direção, clareza e responsabilidade.',
  });
}
