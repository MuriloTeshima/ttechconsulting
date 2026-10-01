import { MapPin, MessageCircle } from 'lucide-react';
import { FORM_ID, type ProjectType } from '@/lib/contact-schema';
import { WhatsAppLink } from '../WhatsAppLink';
import { SectionIntro } from '../sections/SectionIntro';
import { ContactForm } from './ContactForm';

export function ContactSection({
  eyebrow = 'FALE COM A TTECH',
  title = 'Conte sobre o projeto.',
  description = 'Preencha o formulário com o contexto do seu processo e respondemos pelo e-mail ou WhatsApp informado. Se preferir uma conversa mais rápida, chame direto no WhatsApp.',
  projectType,
  whatsappMessage,
  location,
  id = FORM_ID,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Tipo de projeto pré-selecionado no formulário. */
  projectType?: ProjectType;
  /** Mensagem do atalho de WhatsApp; sem ela, usa a mensagem padrão. */
  whatsappMessage?: string;
  location: string;
  id?: string;
}) {
  return (
    <section className="section contact-section" id={id}>
      <div className="container contact-layout">
        <div className="contact-intro">
          <SectionIntro eyebrow={eyebrow} title={title} description={description} />
          <div className="contact-alt">
            <span className="contact-alt-icon">
              <MessageCircle size={20} />
            </span>
            <div>
              <strong>Prefere conversar agora?</strong>
              <WhatsAppLink
                message={whatsappMessage}
                context={projectType}
                location={`${location}-whatsapp`}
                className="text-link"
              >
                Abrir conversa no WhatsApp
              </WhatsAppLink>
            </div>
          </div>
          <p className="location-line">
            <MapPin size={19} /> Ribeirão Preto · atendimento remoto
          </p>
        </div>
        <div className="contact-form-card">
          <ContactForm location={location} defaultProjectType={projectType} />
        </div>
      </div>
    </section>
  );
}
