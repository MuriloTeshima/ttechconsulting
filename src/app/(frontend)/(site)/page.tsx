import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/analytics/JsonLd';
import { ContactSection } from '@/components/contact/ContactSection';
import { FormLink } from '@/components/FormLink';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { DiagnosticPicker } from '@/components/quiz/DiagnosticPicker';
import { AudienceCards } from '@/components/sections/AudienceCards';
import { ProjectCards } from '@/components/sections/Blocks';
import { CTA } from '@/components/sections/CTA';
import { FAQ } from '@/components/sections/FAQ';
import { FounderSection } from '@/components/sections/FounderSection';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { MethodCard } from '@/components/sections/MethodCard';
import { Process } from '@/components/sections/Process';
import { SectionIntro } from '@/components/sections/SectionIntro';
import { ServiceCards } from '@/components/sections/ServiceCards';
import { getHomeFaq } from '@/lib/cms';
import { faqSchema } from '@/lib/seo';

export const metadata = {
  title: { absolute: 'Sistemas e automações em Ribeirão Preto | TTech Consulting' },
  alternates: { canonical: '/' },
};

const problems = [
  'Informações espalhadas entre planilhas e mensagens',
  'Equipe executando tarefas repetitivas',
  'Sistemas que não se comunicam',
  'Falta de indicadores confiáveis',
  'Clientes sem visibilidade sobre solicitações e entregas',
];

export default async function Home() {
  const faq = await getHomeFaq();
  return (
    <main id="conteudo">
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              DESENVOLVIMENTO DE SOFTWARE PARA EMPRESAS
            </p>
            <h1>
              Sistemas e automações para a realidade da sua <em>empresa.</em>
            </h1>
            <p className="hero-description">
              Desenvolvemos plataformas web, ferramentas internas, integrações e produtos digitais
              que reduzem trabalho manual e ajudam empresas a crescer com mais controle.
            </p>
            <div className="hero-actions">
              <FormLink location="hero">Conversar sobre meu projeto</FormLink>
              <WhatsAppLink location="hero" className="link-underline light">
                Chamar no WhatsApp
              </WhatsAppLink>
            </div>
          </div>
          <MethodCard />
        </div>
        <div className="container hero-trust">
          <span>TECNOLOGIA COM DIREÇÃO</span>
          <span>Estratégia, produto, engenharia e proximidade.</span>
          <span className="hero-trust-line" />
        </div>
      </section>

      <LogoMarquee />

      <section className="section section-problem">
        <div className="container problem-grid">
          <div>
            <p className="eyebrow">PROCESSOS QUE PEDEM EVOLUÇÃO</p>
            <h2>Processos improvisados limitam o crescimento da operação.</h2>
            <p>
              Planilhas paralelas, informações duplicadas e tarefas repetitivas consomem o tempo da
              equipe. A TTech transforma esses processos em soluções digitais mais organizadas e
              fáceis de acompanhar.
            </p>
          </div>
          <div className="problem-list">
            {problems.map((problem, index) => (
              <div key={problem}>
                <span>0{index + 1}</span>
                <p>{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DiagnosticPicker />

      <section className="section section-services" id="solucoes">
        <div className="container">
          <div className="section-heading-row">
            <SectionIntro
              eyebrow="O QUE CONSTRUÍMOS"
              title="Da necessidade do negócio a uma solução pronta para evoluir."
              description="Entendemos a operação, definimos prioridades e construímos a primeira versão com foco no que realmente precisa funcionar."
            />
            <Link className="text-link" href="/solucoes">
              Todas as soluções <ArrowUpRight size={18} />
            </Link>
          </div>
          <ServiceCards />
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

      <section className="section audience-section">
        <div className="container audience-layout">
          <SectionIntro
            eyebrow="PARA QUEM"
            title="Tecnologia para operações que precisam avançar."
            description="Trabalhamos com empresas que precisam digitalizar processos, conectar ferramentas ou criar um novo produto."
          />
          <AudienceCards />
        </div>
      </section>

      <section className="section projects-section">
        <div className="container">
          <div className="section-heading-row">
            <SectionIntro
              eyebrow="PROJETOS E CAPACIDADE"
              title="Produtos digitais construídos para problemas concretos."
              description="Exemplos de aplicações, automações e experiências digitais que demonstram nossa forma de transformar necessidades em software."
            />
            <Link className="text-link" href="/projetos">
              Conhecer projetos <ArrowUpRight size={18} />
            </Link>
          </div>
          <ProjectCards />
        </div>
      </section>

      <FounderSection location="home" />

      <section className="section faq-section">
        <div className="container">
          <FAQ items={faq} />
        </div>
      </section>
      <CTA />
      <ContactSection location="home-form" />
      <JsonLd data={faqSchema(faq)} />
    </main>
  );
}
