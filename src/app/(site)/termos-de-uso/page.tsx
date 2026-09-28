import { site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Termos de uso',
  description: 'Termos de uso do site da TTech Consulting.',
  path: '/termos-de-uso',
});

export default function Termos() {
  return (
    <main id="conteudo" className="legal-page container">
      <p className="eyebrow">INFORMAÇÕES IMPORTANTES</p>
      <h1>Termos de uso</h1>
      <p>Este site apresenta informações institucionais e os serviços da TTech Consulting.</p>
      <h2>Serviços e propostas</h2>
      <p>
        As descrições representam possibilidades de atuação. Escopo, responsabilidades, prazos e
        valores são definidos em proposta específica após o entendimento da necessidade.
      </p>
      <h2>Projetos e resultados</h2>
      <p>
        Resultados dependem do contexto, da participação dos responsáveis e das condições de cada
        projeto. Conteúdos do site não substituem uma análise técnica.
      </p>
      <h2>Contato</h2>
      <p>
        Questões sobre o site podem ser enviadas para{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p>Atualizados em setembro de 2026.</p>
    </main>
  );
}
