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
  // Sem includeSubDomains/preload até todos os subdomínios usarem HTTPS.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  agentRules: false,
  // Só afeta o `next dev`: permite testar pelo celular na mesma rede Wi-Fi.
  allowedDevOrigins: ['192.168.*.*'],
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Imagens do CMS: locais em dev (/api/media/file) e no Vercel Blob em produção.
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
    // Os arquivos gerados pelo Payload importam módulos .ts com extensão .js.
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    };
    return webpackConfig;
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [{ source: '/cases', destination: '/projetos', permanent: true }];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
