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
        title="Software sob medida, feito com quem conhece a operação."
        description="A TTech Consulting é uma empresa de desenvolvimento conduzida por Murilo Teshima Lira, em Ribeirão Preto. Cada projeto junta visão de produto e engenharia, e é construído junto com quem conhece o dia a dia do negócio."
      />
      <section className="section">
        <div className="container detail-grid">
          <SectionIntro
            eyebrow="NOSSA FORMA DE PENSAR"
            title="Antes de desenvolver, precisamos entender."
            description="Primeiro entendemos o processo, quem participa dele e o resultado que a empresa espera. A tecnologia vem depois, para organizar a operação e reduzir o trabalho manual."
          />
          <div className="detail-deliveries">
            <span className="eyebrow">O QUE NOS ORIENTA</span>
            <h2>O que você pode esperar de nós.</h2>
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
            description="A experiência com aplicações web, automações e infraestrutura permite cuidar do projeto inteiro, do desenvolvimento à publicação e à evolução."
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
