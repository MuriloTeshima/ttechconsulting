import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/analytics/JsonLd';
import { CheckList } from '@/components/sections/Blocks';
import { CTA } from '@/components/sections/CTA';
import { PageHero } from '@/components/sections/PageHero';
import { Process } from '@/components/sections/Process';
import { SectionIntro } from '@/components/sections/SectionIntro';
import { RelatedServices } from '@/components/sections/ServiceCards';
import { getService, services } from '@/content/services';
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo';

type Props = { params: Promise<{ servico: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ servico: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).servico);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: `${service.lead} ${service.short}`,
    path: `/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).servico);
  if (!service) notFound();
  const path = `/${service.slug}`;

  return (
    <main id="conteudo">
      <PageHero
        eyebrow={`SOLUÇÃO / ${service.title.toUpperCase()}`}
        title={service.lead}
        description={service.short}
        topic={service.topic}
        label={service.cta}
      >
        <div className="aside-label">SOFTWARE A SERVIÇO DA OPERAÇÃO</div>
        <div className="aside-rule" />
        <p>{service.suitable}</p>
        <div className="aside-index">TTECH / SOLUÇÕES</div>
      </PageHero>

      <section className="section">
        <div className="container detail-grid">
          <SectionIntro
            eyebrow="O DESAFIO"
            title="O que precisa mudar?"
            description={service.problem}
          />
          <div className="detail-deliveries">
            <span className="eyebrow">COMO AJUDAMOS</span>
            <h2>Uma primeira entrega com direção clara.</h2>
            <CheckList items={service.deliverables} />
          </div>
        </div>
      </section>

      <section className="section section-process">
        <div className="container">
          <SectionIntro eyebrow="NOSSA ABORDAGEM" title="Do entendimento ao uso real." light />
          <Process />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            eyebrow="OUTROS CAMINHOS"
            title="Soluções que podem fazer parte do projeto."
          />
          <RelatedServices exclude={service.slug} />
        </div>
      </section>
      <CTA topic={service.topic} label={service.cta} />
      <JsonLd
        data={[
          serviceSchema({ name: service.title, description: service.short, path }),
          breadcrumbSchema([
            { name: 'Soluções', path: '/solucoes' },
            { name: service.title, path },
          ]),
        ]}
      />
    </main>
  );
}
