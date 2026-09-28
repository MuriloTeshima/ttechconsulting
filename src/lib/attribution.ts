const STORAGE_KEY = 'ttech-attribution';
const PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
] as const;

export type Attribution = Partial<Record<(typeof PARAMS)[number] | 'landing_page', string>>;

/** Guarda os parâmetros de campanha do primeiro acesso da sessão. */
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const query = new URLSearchParams(window.location.search);
    const data: Attribution = {};
    for (const key of PARAMS) {
      const value = query.get(key);
      if (value) data[key] = value.slice(0, 200);
    }
    data.landing_page = window.location.pathname;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Armazenamento indisponível (modo privado, bloqueio de cookies): segue sem atribuição.
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}') as Attribution;
  } catch {
    return {};
  }
}
