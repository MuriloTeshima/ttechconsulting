import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, CircleAlert } from 'lucide-react';
import { JsonLd } from '@/components/analytics/JsonLd';
import { ContactLink } from '@/components/ContactLink';
import { CampaignFooter, CampaignHeader } from '@/components/layout/CampaignShell';
import { TrustStrip } from '@/components/sections/Blocks';
import { CTA } from '@/components/sections/CTA';
import { FAQ } from '@/components/sections/FAQ';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { Process } from '@/components/sections/Process';
import { SectionIntro } from '@/components/sections/SectionIntro';
import { getLandingPage, landingPages } from '@/content/landing-pages';
import { faqSchema, pageMetadata, serviceSchema } from '@/lib/seo';

type Props = { params: Promise<{ campanha: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return landingPages.map((page) => ({ campanha: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getLandingPage((await params).campanha);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/lp/${page.slug}`,
    index: page.index,
  });
}

export default async function LandingPage({ params }: Props) {
  const page = getLandingPage((await params).campanha);
  if (!page) notFound();

  return (
    <>
      <CampaignHeader topic={page.topic} label={page.ctaLabel} />
      <main id="conteudo" className="campaign-page">
        <section className="inner-hero lp-hero">
          <div className="container inner-hero-grid">
            <div>
              <p className="eyebrow">{page.eyebrow}</p>
              <h1>
                {page.title} <em>{page.highlight}</em>
              </h1>
              <p className="hero-description">{page.description}</p>
              <div className="hero-actions">
                <ContactLink topic={page.topic} location="hero">
                  {page.ctaLabel}
                </ContactLink>
                <a className="link-underline light" href="#como-funciona">
                  Ver como funciona <ArrowRight size={17} />
                </a>
              </div>
            </div>
            <div className="inner-hero-aside">
              <div className="aside-label">{page.signalsTitle}</div>
              <div className="aside-rule" />
              <ul className="lp-signals">
                {page.signals.map((signal) => (
                  <li key={signal}>
                    <CircleAlert size={18} aria-hidden="true" />
                    {signal}
                  </li>
                ))}
              </ul>
              <div className="aside-index">TTECH / {page.segment.toUpperCase()}</div>
            </div>
          </div>
        </section>

        <LogoMarquee />

        <section className="section section-problem">
          <div className="container problem-grid">
            <div>
              <p className="eyebrow">O PROBLEMA</p>
              <h2>{page.problemTitle}</h2>
              <p>{page.problemText}</p>
            </div>
            <div className="problem-list">
              {page.pains.map((pain, index) => (
                <div key={pain}>
                  <span>0{index + 1}</span>
                  <p>{pain}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-services" id="como-funciona">
          <div className="container">
            <SectionIntro
              eyebrow="A SOLUÇÃO"
              title={page.solutionTitle}
              description={page.solutionText}
            />
            <div className="lp-grid">
              {page.deliverables.map((item, index) => (
                <article className="service-card" key={item.title}>
                  <div className="service-card-top">
                    <span className="service-number">0{index + 1}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            {page.note && <p className="scoped-note">{page.note}</p>}
          </div>
        </section>

        <section className="section section-process">
          <div className="container">
            <SectionIntro
              eyebrow="COMO TRABALHAMOS"
              title="Não começamos pelo código. Começamos pelo processo."
              description="Cada etapa aproxima a solução do que a operação realmente precisa."
              light
            />
            <Process />
          </div>
        </section>

        <section className="section trust-section">
          <div className="container">
            <SectionIntro
              eyebrow="QUEM CONDUZ"
              title="Visão de negócio com capacidade de execução técnica."
              description="A TTech Consulting é conduzida por Murilo Teshima Lira e combina experiência em desenvolvimento de software, integrações, infraestrutura e produtos digitais. Cada projeto começa pela compreensão da operação e segue com comunicação clara e acompanhamento próximo."
            />
            <TrustStrip />
          </div>
        </section>

        <section className="section faq-section">
          <div className="container">
            <FAQ items={page.faq} />
          </div>
        </section>

        <CTA
          title={page.finalTitle}
          description={page.finalText}
          topic={page.topic}
          label={page.ctaLabel}
        />

        <ContactLink
          topic={page.topic}
          location="sticky"
          className="button button-blue lp-sticky-cta"
        >
          {page.ctaLabel}
        </ContactLink>
      </main>
      <CampaignFooter />
      <JsonLd
        data={[
          serviceSchema({
            name: page.metaTitle,
            description: page.metaDescription,
            path: `/lp/${page.slug}`,
          }),
          faqSchema(page.faq),
        ]}
      />
    </>
  );
}
