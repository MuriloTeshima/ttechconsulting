import { JsonLd } from '@/components/analytics/JsonLd';
import { CTA } from '@/components/sections/CTA';
import { PageHero } from '@/components/sections/PageHero';
import { Process } from '@/components/sections/Process';
import { SectionIntro } from '@/components/sections/SectionIntro';
import { ServiceCards } from '@/components/sections/ServiceCards';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Soluções de desenvolvimento para empresas',
  description:
    'Sistemas sob medida, automações, integrações, MVPs, sites profissionais e evolução de produtos digitais.',
  path: '/solucoes',
});

export default function Solucoes() {
  return (
    <main id="conteudo">
      <PageHero
        eyebrow="SOLUÇÕES"
        title="Software construído a partir do que sua empresa precisa resolver."
        description="Sistemas, automações e produtos digitais começam pelo entendimento do processo. A primeira entrega é definida para gerar valor sem tentar construir tudo de uma vez."
      />
      <section className="section section-services">
        <div className="container">
          <SectionIntro
            eyebrow="PONTOS DE PARTIDA"
            title="Escolha o problema. Nós ajudamos a definir a solução."
            description="Cada frente pode ser contratada como um projeto específico ou fazer parte de uma evolução maior."
          />
          <ServiceCards />
        </div>
      </section>
      <section className="section section-process">
        <div className="container">
          <SectionIntro
            eyebrow="NOSSA ABORDAGEM"
            title="Entender, direcionar, construir e evoluir."
            light
          />
          <Process />
        </div>
      </section>
      <CTA />
      <JsonLd data={breadcrumbSchema([{ name: 'Soluções', path: '/solucoes' }])} />
    </main>
  );
}
