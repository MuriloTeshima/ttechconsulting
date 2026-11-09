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
  // Copy before the push: gtag.js adds internal fields to the dataLayer object.
  const { event, ...params } = payload;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  // GA4 installed directly doesn't read GTM-style dataLayer events, so send through gtag.
  if (site.gaId && window.gtag) window.gtag('event', event, params);
}

/** Main conversion event: a click on any WhatsApp button. */
export function trackWhatsAppClick({ location, context }: { location: string; context: string }) {
  pushEvent({
    event: 'whatsapp_click',
    cta_location: location,
    service: context,
    page_path: window.location.pathname,
    ...readAttribution(),
  });
}

/** Contact form conversion. */
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

/** Click on a button that leads to the contact form. */
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

/** Quiz steps: start, each answered question and completion (lead). */
export function trackQuiz(
  event: 'quiz_start' | 'quiz_step' | 'quiz_complete',
  params: Record<string, string | number>,
) {
  pushEvent({
    event,
    page_path: window.location.pathname,
    ...params,
    ...readAttribution(),
  });
}
