import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'TTech',
    description: site.description,
    start_url: '/',
    display: 'browser',
    background_color: '#FFFFFF',
    theme_color: '#071B33',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
