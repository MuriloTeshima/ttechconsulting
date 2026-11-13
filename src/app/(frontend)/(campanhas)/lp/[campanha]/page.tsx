import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { ArrowRight, CircleAlert } from 'lucide-react';
import { JsonLd } from '@/components/analytics/JsonLd';
import { ContactSection } from '@/components/contact/ContactSection';
import { FormLink } from '@/components/FormLink';
import { CampaignFooter, CampaignHeader } from '@/components/layout/CampaignShell';
import { CTA } from '@/components/sections/CTA';
import { FAQ } from '@/components/sections/FAQ';
import { FounderSection } from '@/components/sections/FounderSection';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { Process } from '@/components/sections/Process';
import { SectionIntro } from '@/components/sections/SectionIntro';
import { PreviewBanner } from '@/components/PreviewBanner';
import { QuizInviteSection } from '@/components/quiz/QuizInviteSection';
import { getLandingPage, getLandingPages } from '@/lib/cms';
import { faqSchema, pageMetadata, serviceSchema } from '@/lib/seo';

type Props = { params: Promise<{ campanha: string }> };

// New landing pages published in the CMS open without a new build.
export async function generateStaticParams() {
  return (await getLandingPages()).map((page) => ({ campanha: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode();
  const page = await getLandingPage((await params).campanha, draft);
  if (!page) return {};
  return pageMetadata({
    title: page.shortBrand ? `${page.metaTitle} | TTech` : page.metaTitle,
    description: page.metaDescription,
    path: `/lp/${page.slug}`,
    index: page.index,
    absoluteTitle: page.shortBrand,
  });
}

export default async function LandingPage({ params }: Props) {
  const { isEnabled: draft } = await draftMode();
  const page = await getLandingPage((await params).campanha, draft);
  if (!page) notFound();

  return (
    <>
      {draft && <PreviewBanner path={`/lp/${page.slug}`} />}
      <CampaignHeader projectType={page.projectType} label={page.ctaLabel} />
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
                <FormLink projectType={page.projectType} location="hero">
                  {page.ctaLabel}
                </FormLink>
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

        {page.quiz && <QuizInviteSection quiz={page.quiz} />}

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

        <FounderSection location="lp" />

        <section className="section faq-section">
          <div className="container">
            <FAQ items={page.faq} />
          </div>
        </section>

        <ContactSection
          projectType={page.projectType}
          whatsappMessage={page.whatsappMessage}
          location="lp-form"
        />

        <CTA
          title={page.finalTitle}
          description={page.finalText}
          projectType={page.projectType}
          label={page.ctaLabel}
        />

        <FormLink
          projectType={page.projectType}
          location="sticky"
          className="button button-blue lp-sticky-cta"
        >
          {page.ctaLabel}
        </FormLink>
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
