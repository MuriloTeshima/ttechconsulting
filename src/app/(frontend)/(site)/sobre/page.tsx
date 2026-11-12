import { JsonLd } from '@/components/analytics/JsonLd';
import { CheckList } from '@/components/sections/Blocks';
import { FounderSection } from '@/components/sections/FounderSection';
import { CTA } from '@/components/sections/CTA';
import { PageHero } from '@/components/sections/PageHero';
import { SectionIntro } from '@/components/sections/SectionIntro';
import { ServiceCards } from '@/components/sections/ServiceCards';
import { getServices } from '@/lib/cms';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Sobre a TTech, em Ribeirão Preto',
  description:
    'A TTech Consulting é uma empresa de desenvolvimento de software conduzida por Murilo Teshima Lira, em Ribeirão Preto.',
  path: '/sobre',
});

export default async function Sobre() {
  const services = await getServices();
  return (
    <main id="conteudo">
      <PageHero
        eyebrow="SOBRE A TTECH"
        title="Tecnologia com direção, clareza e responsabilidade."
        description="A TTech Consulting é uma empresa de desenvolvimento conduzida por Murilo Teshima Lira, em Ribeirão Preto. Unimos visão de produto, engenharia e proximidade para construir soluções compatíveis com a realidade de cada negócio."
      />
      <section className="section">
        <div className="container detail-grid">
          <SectionIntro
            eyebrow="NOSSA FORMA DE PENSAR"
            title="Antes de desenvolver, precisamos entender."
            description="Começamos pelo processo, pelas pessoas e pelo resultado esperado. A tecnologia entra como meio para organizar a operação, reduzir esforço e abrir novas possibilidades."
          />
          <div className="detail-deliveries">
            <span className="eyebrow">O QUE NOS ORIENTA</span>
            <h2>Uma parceria construída para evoluir.</h2>
            <CheckList
              items={[
                'Clareza nas decisões e prioridades',
                'Comunicação próxima com quem conhece a operação',
                'Engenharia preparada para manutenção',
                'Entregas em etapas compreensíveis',
                'Transparência sobre riscos, limites e próximos passos',
              ]}
            />
          </div>
        </div>
      </section>
      <section className="section section-services">
        <div className="container">
          <SectionIntro
            eyebrow="ATUAÇÃO"
            title="Software, integrações e produtos digitais."
            description="Nossa experiência combina aplicações web, automações, infraestrutura e evolução de produtos para enxergar o projeto de ponta a ponta."
          />
          <ServiceCards list={services.slice(0, 3)} />
        </div>
      </section>
      <FounderSection location="sobre" />
      <CTA />
      <JsonLd data={breadcrumbSchema([{ name: 'Sobre', path: '/sobre' }])} />
    </main>
  );
}
