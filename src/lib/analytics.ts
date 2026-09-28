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
