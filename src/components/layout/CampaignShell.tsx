import type { WhatsAppTopic } from '@/lib/whatsapp';
import { ContactLink } from '../ContactLink';
import { Logo } from '../Logo';
import { LegalBar } from './Footer';

/** Cabeçalho enxuto para landing pages: sem navegação que tire o foco da conversão. */
export function CampaignHeader({ topic, label }: { topic: WhatsAppTopic; label: string }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo priority />
        <ContactLink
          topic={topic}
          className="button button-dark campaign-header-cta"
          location="header"
        >
          {label}
        </ContactLink>
      </div>
    </header>
  );
}

export function CampaignFooter() {
  return (
    <footer className="footer campaign-footer">
      <div className="container">
        <div className="campaign-footer-top">
          <Logo light />
          <p>Tecnologia estratégica. Impacto real.</p>
        </div>
        <LegalBar />
      </div>
    </footer>
  );
}
