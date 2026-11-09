import Script from 'next/script';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { site } from '@/config/site';
import { consentBootstrapScript } from '@/lib/consent';
import { AttributionCapture } from './AttributionCapture';
import { ConsentBanner } from './ConsentBanner';

/**
 * Vercel Web Analytics measures visits without cookies, so it runs outside consent.
 * GA4 (direct) and GTM respect Consent Mode: everything is denied until the visitor accepts in the banner.
 * Use direct GA4 or a GA4 tag inside GTM, never both, or events are counted twice.
 */
export function Analytics() {
  const googleTags = Boolean(site.gaId || site.gtmId);
  return (
    <>
      <AttributionCapture />
      <VercelAnalytics />
      {googleTags && (
        <>
          <Script id="consent-default" strategy="beforeInteractive">
            {consentBootstrapScript}
          </Script>
          {site.gaId && <GoogleAnalytics gaId={site.gaId} />}
          {site.gtmId && <GoogleTagManager gtmId={site.gtmId} />}
          <ConsentBanner />
        </>
      )}
    </>
  );
}
