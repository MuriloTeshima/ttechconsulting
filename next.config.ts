import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // No includeSubDomains/preload until every subdomain uses HTTPS.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  agentRules: false,
  // Only affects `next dev`: lets you test from a phone on the same Wi-Fi network.
  allowedDevOrigins: ['192.168.*.*'],
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // CMS images: local in dev (/api/media/file) and on Vercel Blob in production.
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/**' }],
    remotePatterns: [{ protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }],
  },
  experimental: {
    // 404 global: o app tem dois layouts raiz (site e painel do Payload).
    globalNotFound: true,
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  webpack: (webpackConfig) => {
    // Payload's generated files import .ts modules with a .js extension.
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    };
    return webpackConfig;
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Keep the panel and API out of search engines, even if some link reaches them.
      {
        source: '/:area(admin|api)/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  async redirects() {
    return [{ source: '/cases', destination: '/projetos', permanent: true }];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
