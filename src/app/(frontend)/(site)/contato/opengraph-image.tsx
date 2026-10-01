import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting — Contato';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandOgImage({
    eyebrow: 'Contato',
    title: 'Vamos conversar sobre o que sua empresa precisa construir?',
  });
}
