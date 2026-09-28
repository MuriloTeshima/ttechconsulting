import { MapPin } from 'lucide-react';
import { JsonLd } from '@/components/analytics/JsonLd';
import { ContactLink } from '@/components/ContactLink';
import { PageHero } from '@/components/sections/PageHero';
import { SectionIntro } from '@/components/sections/SectionIntro';
import { site } from '@/config/site';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contato',
  description:
    'Converse com a TTech Consulting pelo WhatsApp sobre sistemas, automações, MVPs e sites para a sua empresa.',
  path: '/contato',
});

export default function Contato() {
  return (
    <main id="conteudo">
      <PageHero
        eyebrow="CONTATO"
        title="Vamos conversar sobre o que sua empresa precisa construir?"
        description="Conte como o processo funciona hoje, onde existe retrabalho e qual resultado você espera alcançar. A conversa inicial ajuda a definir um primeiro passo possível."
      />
      <section className="section">
        <div className="container detail-grid">
          <div>
            <SectionIntro
              eyebrow="ANTES DA CONVERSA"
              title="Um pouco de contexto ajuda a começar melhor."
              description="Se puder, informe o tipo de empresa, quem utiliza o processo, como ele funciona hoje e o que você gostaria de melhorar."
            />
            <p className="location-line">
              <MapPin size={19} /> Ribeirão Preto · atendimento remoto
            </p>
          </div>
          <div className="contact-card">
            <span className="eyebrow">FALE COM A TTECH</span>
            <h2>Conte sobre o projeto.</h2>
            <p>Sistemas, automações, MVPs, sites profissionais e evolução de produtos digitais.</p>
            <ContactLink location="contact">Abrir conversa no WhatsApp</ContactLink>
            <p className="contact-email">
              Ou escreva para <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbSchema([{ name: 'Contato', path: '/contato' }])} />
    </main>
  );
}
