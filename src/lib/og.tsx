import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

/** Imagem Open Graph na identidade da marca (navy, cyan e padrão angular). */
export function brandOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: '#071B33',
        color: '#FFFFFF',
        position: 'relative',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -220,
          right: -140,
          width: 560,
          height: 560,
          border: '2px solid rgba(17,156,255,0.35)',
          transform: 'rotate(45deg)',
          display: 'flex',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <svg width="64" height="64" viewBox="0 0 64 64">
          <rect width="64" height="64" rx="13" fill="#0B2747" />
          <path d="M13 17h38v8H37v23h-9V25H13z" fill="#36D7FF" />
          <path d="M37 31h14v8H37" fill="#119CFF" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -2 }}>TTech</span>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 6 }}>CONSULTING</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 980 }}>
        <span
          style={{
            color: '#36D7FF',
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
            marginBottom: 24,
          }}
        >
          {eyebrow.toUpperCase()}
        </span>
        <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2.5 }}>
          {title}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.2)',
          paddingTop: 24,
          color: '#A7C1D8',
          fontSize: 22,
        }}
      >
        <span>Tecnologia estratégica. Impacto real.</span>
        <span>Ribeirão Preto · atendimento remoto</span>
      </div>
    </div>,
    ogSize,
  );
}
