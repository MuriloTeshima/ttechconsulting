import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { fontVariables } from './fonts';
import './(frontend)/globals.css';

// 404 for URLs that match no route. Needed because the app has two
// root layouts (site and Payload panel), so there's no single layout to build the page from.
export const metadata: Metadata = {
  title: 'Página não encontrada | TTech Consulting',
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body>
        <Header />
        <main id="conteudo" className="container notfound">
          <p className="eyebrow">Página não encontrada</p>
          <h1>Este caminho não existe.</h1>
          <p>Volte para a página inicial ou conheça nossas soluções.</p>
          <Link className="button button-dark" href="/">
            Voltar ao início
          </Link>
        </main>
        <Footer />
      </body>
    </html>
  );
}
