import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting — Sistemas, automações e produtos digitais';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return brandOgImage({
    eyebrow: 'Desenvolvimento de software para empresas',
    title: 'Sistemas e automações para a realidade da sua empresa.',
  });
}
