import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function NotFound() {
  return (
    <>
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
    </>
  );
}
