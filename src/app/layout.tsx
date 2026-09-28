import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@/components/analytics/Analytics';
import { JsonLd } from '@/components/analytics/JsonLd';
import { site } from '@/config/site';
import { organizationSchema } from '@/lib/seo';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'TTech Consulting | Sistemas, automações e produtos digitais',
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
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
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
