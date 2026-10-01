import type { Metadata, Viewport } from 'next';
import { Analytics } from '@/components/analytics/Analytics';
import { JsonLd } from '@/components/analytics/JsonLd';
import { site } from '@/config/site';
import { organizationSchema } from '@/lib/seo';
import { fontVariables } from '../fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Sistemas e automações em Ribeirão Preto | TTech Consulting',
    template: '%s | TTech Consulting',
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: site.name,
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#071B33',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
        <JsonLd data={organizationSchema()} />
        <Analytics />
      </body>
    </html>
  );
}
