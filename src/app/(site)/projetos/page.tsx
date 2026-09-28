import { JsonLd } from '@/components/analytics/JsonLd';
import { ProjectCards } from '@/components/sections/Blocks';
import { CTA } from '@/components/sections/CTA';
import { PageHero } from '@/components/sections/PageHero';
import { SectionIntro } from '@/components/sections/SectionIntro';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Projetos',
  description:
    'Projetos e soluções que mostram como a TTech transforma processos, ideias e jornadas em produtos digitais.',
  path: '/projetos',
});

export default function Projetos() {
  return (
    <main id="conteudo">
      <PageHero
        eyebrow="PROJETOS"
        title="Experiências digitais construídas para problemas concretos."
        description="Projetos próprios e soluções demonstrativas que mostram como transformamos processos, ideias e jornadas em produtos digitais."
      />
      <section className="section projects-page">
        <div className="container">
          <SectionIntro
            eyebrow="CAPACIDADE EM PRÁTICA"
            title="Do fluxo operacional à experiência do usuário."
            description="Cada projeto exige decisões diferentes. O ponto em comum é construir uma solução coerente com o problema e preparada para evoluir."
          />
          <ProjectCards />
          <p className="scoped-note">
            Projetos de clientes e experiências profissionais são publicados apenas quando há
            autorização e respeito aos acordos de confidencialidade.
          </p>
        </div>
      </section>
      <CTA />
      <JsonLd data={breadcrumbSchema([{ name: 'Projetos', path: '/projetos' }])} />
    </main>
  );
}
