import { JsonLd } from '@/components/analytics/JsonLd';
import { ProjectCards } from '@/components/sections/Blocks';
import { CTA } from '@/components/sections/CTA';
import { PageHero } from '@/components/sections/PageHero';
import { SectionIntro } from '@/components/sections/SectionIntro';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Projetos de sistemas e automações',
  description:
    'Projetos próprios e demonstrativos que mostram como a TTech transforma processos e ideias em produtos digitais.',
  path: '/projetos',
});

export default function Projetos() {
  return (
    <main id="conteudo">
      <PageHero
        eyebrow="PROJETOS"
        title="Experiências digitais construídas para problemas concretos."
        description="Projetos próprios e demonstrativos que mostram como transformamos um processo ou uma ideia em produto digital."
      />
      <section className="section projects-page">
        <div className="container">
          <SectionIntro
            eyebrow="CAPACIDADE EM PRÁTICA"
            title="Cada projeto parte de um problema diferente."
            description="As decisões mudam de um projeto para outro, mas todos começam pelo problema e continuam evoluindo depois da entrega."
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
