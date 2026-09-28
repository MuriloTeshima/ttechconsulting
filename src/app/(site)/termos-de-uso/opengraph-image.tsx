import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting — Termos de uso';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandOgImage({ eyebrow: 'Informações importantes', title: 'Termos de uso' });
}
