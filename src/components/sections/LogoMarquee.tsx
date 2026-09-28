import Image from 'next/image';
import type { CSSProperties } from 'react';
import { clientLogos } from '@/content/clients';

const BASE_HEIGHT = 34;

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="logo-set" aria-hidden={hidden || undefined}>
      {clientLogos.map((logo) => {
        const height = Math.round(BASE_HEIGHT * (logo.scale ?? 1));
        return (
          <li key={logo.src}>
            <Image
              src={logo.src}
              alt={hidden ? '' : logo.name}
              width={Math.round(height * logo.ratio)}
              height={height}
              unoptimized
            />
          </li>
        );
      })}
    </ul>
  );
}

export function LogoMarquee({
  title = 'Experiência construída em empresas como',
}: {
  title?: string;
}) {
  return (
    <section className="logo-section" aria-label={title}>
      <div className="container logo-layout">
        <p className="logo-title">{title}</p>
        <div className="logo-marquee" style={{ '--marquee-duration': '32s' } as CSSProperties}>
          <div className="logo-track">
            <LogoSet />
            <LogoSet hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
