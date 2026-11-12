import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/config/site';
import { getClientLogos } from '@/lib/cms';
import { WhatsAppLink } from '../WhatsAppLink';
import { TrustStrip } from './Blocks';

const LOGO_HEIGHT = 30;

function Portrait() {
  const { photo } = site.founderProfile;
  if (photo) {
    return (
      <Image
        className="founder-photo"
        src={photo}
        alt={`Foto de ${site.founder}`}
        width={560}
        height={680}
        sizes="(max-width: 920px) 70vw, 30vw"
      />
    );
  }
  // Until the photo arrives: monogram built from the brand's angular geometry.
  return (
    <div className="founder-monogram" aria-hidden="true">
      <span>MT</span>
    </div>
  );
}

/** Founder block: replaces the old "Sobre a TTech" text with a person, a voice and track record. */
export async function FounderSection({ location }: { location: string }) {
  const logos = await getClientLogos();
  const { role, linkedin } = site.founderProfile;

  return (
    <section className="section founder-section" aria-labelledby={`${location}-founder-title`}>
      <div className="container">
        <div className="founder-layout">
          <figure className="founder-portrait">
            <Portrait />
            <figcaption>
              <strong>{site.founder}</strong>
              <span>{role}</span>
            </figcaption>
          </figure>

          <div className="founder-copy">
            <h2 id={`${location}-founder-title`}>Você fala direto com quem vai construir.</h2>
            <p className="founder-lead">
              A TTech é conduzida por mim, Murilo. Antes de escrever qualquer linha de código, quero
              entender como sua equipe trabalha hoje, onde está o retrabalho e o que precisa mudar.
            </p>
            <p>
              Do primeiro diagnóstico à entrega, você conversa comigo, sem intermediários. Depois do
              lançamento, sigo acompanhando o uso e planejando a evolução junto com quem conhece a
              operação.
            </p>
            <div className="founder-actions">
              <WhatsAppLink location={`${location}-founder`} className="button button-dark">
                Falar comigo no WhatsApp
              </WhatsAppLink>
              {linkedin && (
                <a className="text-link" href={linkedin} target="_blank" rel="noopener noreferrer">
                  Ver perfil no LinkedIn <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        {logos.length > 0 && (
          <div className="founder-track">
            <p>Experiência construída em empresas como</p>
            <ul>
              {logos.map((logo) => {
                const height = Math.round(LOGO_HEIGHT * (logo.scale ?? 1));
                return (
                  <li key={logo.src}>
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={Math.round(height * logo.ratio)}
                      height={height}
                      style={{ width: 'auto', height }}
                      unoptimized
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <TrustStrip />
      </div>
    </section>
  );
}
