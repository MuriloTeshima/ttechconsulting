import { JsonLd } from '@/components/analytics/JsonLd';
import { ContactSection } from '@/components/contact/ContactSection';
import { PageHero } from '@/components/sections/PageHero';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contato',
  description:
    'Converse com a TTech Consulting pelo WhatsApp ou envie uma mensagem sobre sistemas, automações, MVPs e sites para a sua empresa.',
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
      <ContactSection
        location="contact"
        eyebrow="ANTES DA CONVERSA"
        title="Um pouco de contexto ajuda a começar melhor."
        description="Se puder, informe o tipo de empresa, quem utiliza o processo, como ele funciona hoje e o que você gostaria de melhorar."
      />
      <JsonLd data={breadcrumbSchema([{ name: 'Contato', path: '/contato' }])} />
    </main>
  );
}
