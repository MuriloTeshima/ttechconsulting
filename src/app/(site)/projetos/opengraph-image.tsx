import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting — Projetos';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandOgImage({
    eyebrow: 'Projetos',
    title: 'Experiências digitais construídas para problemas concretos.',
  });
}
