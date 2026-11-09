import 'server-only';

// Simple per-instance limit; on serverless it resets with every new instance.
const buckets = new Map<string, number[]>();

/** Records an attempt and says whether the key went over the limit within the time window. */
export function isRateLimited(key: string, { max = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((time) => now - time < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  return recent.length > max;
}
