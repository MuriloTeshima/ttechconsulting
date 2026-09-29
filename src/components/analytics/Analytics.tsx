import Script from 'next/script';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { site } from '@/config/site';
import { consentBootstrapScript } from '@/lib/consent';
import { AttributionCapture } from './AttributionCapture';
import { ConsentBanner } from './ConsentBanner';

/**
 * Vercel Web Analytics mede visitas sem cookies, então roda fora do consentimento.
 * GA4 (direto) e GTM respeitam o Consent Mode: tudo negado até o visitante aceitar no banner.
 * Use GA4 direto ou uma tag GA4 dentro do GTM, não os dois, para não contar em dobro.
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
