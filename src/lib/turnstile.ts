import 'server-only';

/**
 * Verificação do Cloudflare Turnstile nos formulários.
 * Sem TURNSTILE_SECRET_KEY a verificação fica desligada e valem só o honeypot e o limite por IP.
 */
const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export const TURNSTILE_FIELD = 'cf-turnstile-response';

export const isTurnstileEnabled = () => Boolean(process.env.TURNSTILE_SECRET_KEY);

export async function verifyTurnstile(token: string | null | undefined, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip && ip !== 'local') body.set('remoteip', ip);

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(8000),
    });
    const result = (await response.json()) as { success: boolean; 'error-codes'?: string[] };
    if (!result.success) console.warn('[turnstile] Token recusado', result['error-codes']);
    return result.success;
  } catch (error) {
    // Falha da Cloudflare não pode derrubar a captação: o envio segue com as demais proteções.
    console.error('[turnstile] Falha na verificação; envio liberado', error);
    return true;
  }
}
