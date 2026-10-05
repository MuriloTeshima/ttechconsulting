import 'server-only';

// Limite simples por instância do servidor; em serverless ele reinicia a cada nova instância.
const buckets = new Map<string, number[]>();

/** Registra uma tentativa e informa se a chave passou do limite na janela de tempo. */
export function isRateLimited(key: string, { max = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((time) => now - time < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  return recent.length > max;
}
