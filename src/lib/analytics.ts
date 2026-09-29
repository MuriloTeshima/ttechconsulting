import { site } from '@/config/site';
import { readAttribution } from './attribution';

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function pushEvent(payload: DataLayerEvent) {
  if (typeof window === 'undefined') return;
  // Copia antes do push: o gtag.js acrescenta campos internos ao objeto do dataLayer.
  const { event, ...params } = payload;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  // GA4 instalado direto não lê eventos do dataLayer no formato do GTM; envia pelo gtag.
  if (site.gaId && window.gtag) window.gtag('event', event, params);
}

/** Evento principal de conversão: clique em qualquer botão de WhatsApp. */
export function trackWhatsAppClick({ location, topic }: { location: string; topic: string }) {
  pushEvent({
    event: 'whatsapp_click',
    cta_location: location,
    service: topic,
    page_path: window.location.pathname,
    ...readAttribution(),
  });
}

/** Conversão do formulário de contato. */
export function trackFormSubmit({
  location,
  projectType,
}: {
  location: string;
  projectType: string;
}) {
  pushEvent({
    event: 'form_submit',
    cta_location: location,
    service: projectType,
    page_path: window.location.pathname,
    ...readAttribution(),
  });
}

/** Clique em um botão que leva ao formulário de contato. */
export function trackCtaClick({
  location,
  projectType,
}: {
  location: string;
  projectType: string;
}) {
  pushEvent({
    event: 'cta_click',
    cta_location: location,
    service: projectType,
    page_path: window.location.pathname,
    ...readAttribution(),
  });
}
