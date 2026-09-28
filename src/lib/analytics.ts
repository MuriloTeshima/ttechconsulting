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
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
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
