import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { site } from '@/config/site';
import { consentBootstrapScript } from '@/lib/consent';
import { AttributionCapture } from './AttributionCapture';
import { ConsentBanner } from './ConsentBanner';

/**
 * Vercel Web Analytics mede visitas sem cookies, então roda fora do consentimento.
 * GA4, Google Ads e Meta Pixel ficam dentro do GTM, disparando em `form_submit`,
 * `whatsapp_click` e `cta_click`, e respeitam o Consent Mode.
 */
export function Analytics() {
  return (
    <>
      <AttributionCapture />
      <VercelAnalytics />
      {site.gtmId && (
        <>
          <Script id="consent-default" strategy="beforeInteractive">
            {consentBootstrapScript}
          </Script>
          <GoogleTagManager gtmId={site.gtmId} />
          <ConsentBanner />
        </>
      )}
    </>
  );
}
