'use client';

import { useEffect, useRef } from 'react';
import { site } from '@/config/site';

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      appearance?: 'always' | 'execute' | 'interaction-only';
      language?: string;
      callback?: (token: string) => void;
      'expired-callback'?: () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile() {
  scriptPromise ??= new Promise<TurnstileApi>((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject());
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('Turnstile indisponível'));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

type TurnstileProps = {
  /** Recebe o token quando o formulário não usa FormData (o quiz). */
  onToken?: (token: string) => void;
  /** Qualquer valor novo gera um token novo: cada token vale para um único envio. */
  resetSignal?: unknown;
};

/**
 * Verificação anti-robô da Cloudflare. Só aparece quando a Cloudflare desconfia do visitante;
 * no restante dos casos é invisível. Dentro de um <form>, o token vai no campo cf-turnstile-response.
 */
export function Turnstile({ onToken, resetSignal }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);

  useEffect(() => {
    onTokenRef.current = onToken;
  });

  useEffect(() => {
    if (!site.turnstileSiteKey) return;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;
        widgetRef.current = turnstile.render(containerRef.current, {
          sitekey: site.turnstileSiteKey,
          appearance: 'interaction-only',
          language: 'pt-br',
          callback: (token) => onTokenRef.current?.(token),
          'expired-callback': () => onTokenRef.current?.(''),
        });
      })
      // Sem o script (bloqueador, rede), o envio segue e o servidor decide.
      .catch(() => undefined);
    return () => {
      cancelled = true;
      if (widgetRef.current) window.turnstile?.remove(widgetRef.current);
      widgetRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (resetSignal === undefined || !widgetRef.current) return;
    onTokenRef.current?.('');
    window.turnstile?.reset(widgetRef.current);
  }, [resetSignal]);

  if (!site.turnstileSiteKey) return null;
  return <div ref={containerRef} className="turnstile" />;
}
