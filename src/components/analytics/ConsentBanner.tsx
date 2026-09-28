'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { CONSENT_KEY, consentState, type ConsentChoice } from '@/lib/consent';

const CHANGE_EVENT = 'ttech-consent-change';

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

function readChoice() {
  try {
    return localStorage.getItem(CONSENT_KEY) ?? 'pending';
  } catch {
    return 'pending';
  }
}

function saveChoice(choice: ConsentChoice) {
  window.gtag?.('consent', 'update', consentState(choice));
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Sem armazenamento: a escolha vale só para esta visita.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function ConsentBanner() {
  // No servidor devolve 'unset' para não renderizar o banner no HTML estático.
  const choice = useSyncExternalStore(subscribe, readChoice, () => 'unset');
  if (choice !== 'pending') return null;

  return (
    <div
      className="consent-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Preferências de cookies"
    >
      <p>
        Usamos cookies para medir o desempenho do site e das campanhas. Você pode aceitar ou
        recusar. <Link href="/politica-de-privacidade">Política de privacidade</Link>
      </p>
      <div>
        <button
          type="button"
          className="button consent-decline"
          onClick={() => saveChoice('denied')}
        >
          Recusar
        </button>
        <button type="button" className="button button-blue" onClick={() => saveChoice('granted')}>
          Aceitar
        </button>
      </div>
    </div>
  );
}
