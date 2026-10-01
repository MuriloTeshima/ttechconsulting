import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting — Política de privacidade';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandOgImage({ eyebrow: 'Informações importantes', title: 'Política de privacidade' });
}
