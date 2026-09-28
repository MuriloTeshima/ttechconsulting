import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import { site } from '@/config/site';
import { consentBootstrapScript } from '@/lib/consent';
import { AttributionCapture } from './AttributionCapture';
import { ConsentBanner } from './ConsentBanner';

/**
 * GTM é a única tag carregada no código. GA4, Google Ads e Meta Pixel
 * são configurados dentro do GTM, disparando no evento `whatsapp_click`.
 */
export function Analytics() {
  return (
    <>
      <AttributionCapture />
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
