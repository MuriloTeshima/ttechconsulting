import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting — Blog';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandOgImage({ eyebrow: 'Blog', title: 'Ideias para operações mais organizadas.' });
}
