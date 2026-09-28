import type { NextConfig } from 'next';

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
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [{ source: '/cases', destination: '/projetos', permanent: true }];
  },
};

export default nextConfig;
