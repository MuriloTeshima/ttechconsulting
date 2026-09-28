import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const root = process.cwd();

// Lidos uma vez por build; as imagens são geradas estaticamente.
const assets = Promise.all([
  readFile(join(root, 'src/assets/fonts/SpaceGrotesk-Medium.woff')),
  readFile(join(root, 'src/assets/fonts/SpaceGrotesk-SemiBold.woff')),
  readFile(join(root, 'public/TTechConsultingLogoWhite.svg')),
]);

/** Imagem Open Graph na identidade da marca: navy, logo oficial, Space Grotesk e padrão angular. */
export async function brandOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [medium, semiBold, logo] = await assets;
  const logoSrc = `data:image/svg+xml;base64,${logo.toString('base64')}`;
  const titleSize = title.length > 70 ? 56 : title.length > 45 ? 64 : 72;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 80px 60px',
        background: 'linear-gradient(135deg, #0b2747 0%, #071b33 60%)',
        color: '#FFFFFF',
        fontFamily: 'Space Grotesk',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -260,
          right: -160,
          width: 600,
          height: 600,
          border: '2px solid rgba(17,156,255,0.32)',
          borderRadius: 72,
          transform: 'rotate(45deg)',
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -320,
          right: 120,
          width: 460,
          height: 460,
          border: '2px solid rgba(54,215,255,0.14)',
          borderRadius: 56,
          transform: 'rotate(45deg)',
          display: 'flex',
        }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} width={238} height={74} alt="" />

      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 960 }}>
        <span
          style={{
            color: '#36D7FF',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginBottom: 22,
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{ fontSize: titleSize, fontWeight: 500, lineHeight: 1.08, letterSpacing: -2.5 }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.18)',
          paddingTop: 24,
          color: '#A7C1D8',
          fontSize: 22,
          fontWeight: 500,
        }}
      >
        <span>Tecnologia estratégica. Impacto real.</span>
        <span>Ribeirão Preto · atendimento remoto</span>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: 'Space Grotesk', data: medium, weight: 500, style: 'normal' },
        { name: 'Space Grotesk', data: semiBold, weight: 600, style: 'normal' },
      ],
    },
  );
}
