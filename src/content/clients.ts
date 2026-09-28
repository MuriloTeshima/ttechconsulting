export type ClientLogo = {
  name: string;
  src: string;
  /** Proporção do viewBox do SVG (largura / altura). */
  ratio: number;
  /** Ajuste fino de altura para equilibrar o peso visual entre logos. */
  scale?: number;
};

/** Logos em public/clientes/, todos na cor #1E1F21. */
export const clientLogos: ClientLogo[] = [
  { name: 'Ideal Track', src: '/clientes/idealtrack.svg', ratio: 573 / 124 },
  { name: 'Votorantim Cimentos', src: '/clientes/votorantimcimentos.svg', ratio: 593 / 143 },
  { name: 'ScrumLaunch', src: '/clientes/scrumlaunch.svg', ratio: 345 / 160, scale: 1.35 },
  { name: 'Voepass', src: '/clientes/voepass.svg', ratio: 579 / 113, scale: 0.9 },
  { name: 'LegaleWeb', src: '/clientes/legaleweb.svg', ratio: 591 / 144 },
];
