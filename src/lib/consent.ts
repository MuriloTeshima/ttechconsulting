export const CONSENT_KEY = 'ttech-consent';
export type ConsentChoice = 'granted' | 'denied';

export function consentState(choice: ConsentChoice) {
  return {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  };
}

/**
 * Consent Mode v2: tudo negado por padrão até o visitante escolher (LGPD).
 * Roda antes do GTM para que as tags respeitem o estado inicial.
 */
export const consentBootstrapScript = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{var c=localStorage.getItem('${CONSENT_KEY}');if(c==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}
`;
