import Image from 'next/image';
import type { CSSProperties } from 'react';
import { getClientLogos } from '@/lib/cms';
import type { ClientLogo } from '@/lib/content-types';

const BASE_HEIGHT = 34;

function LogoSet({ logos, hidden = false }: { logos: ClientLogo[]; hidden?: boolean }) {
  return (
    <ul className="logo-set" aria-hidden={hidden || undefined}>
      {logos.map((logo) => {
        const height = Math.round(BASE_HEIGHT * (logo.scale ?? 1));
        return (
          <li key={logo.src}>
            <Image
              src={logo.src}
              alt={hidden ? '' : logo.name}
              width={Math.round(height * logo.ratio)}
              height={height}
              style={{ width: 'auto', height }}
              unoptimized
            />
          </li>
        );
      })}
    </ul>
  );
}

export async function LogoMarquee({
  title = 'Experiência construída em empresas como',
}: {
  title?: string;
}) {
  const logos = await getClientLogos();
  if (!logos.length) return null;
  return (
    <section className="logo-section" aria-label={title}>
      <div className="container logo-layout">
        <p className="logo-title">{title}</p>
        <div className="logo-marquee" style={{ '--marquee-duration': '32s' } as CSSProperties}>
          <div className="logo-track">
            <LogoSet logos={logos} />
            <LogoSet logos={logos} hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
