import { createHmac, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';

/**
 * IdealTrack webhook: authentication, signature and payload mapping.
 * Kept free of Payload/Next imports so it can be tested in isolation.
 */

/** Deliveries older (or newer) than this are refused, so a captured delivery can't be replayed. */
export const MAX_CLOCK_SKEW_SECONDS = 300;

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function isValidApiKey(received: string | null, expected: string) {
  return typeof received === 'string' && safeEqual(received, expected);
}

/** HMAC-SHA256 of `<timestamp>.<raw body>`, sent as `sha256=<hex>` in X-IdealTrack-Signature. */
export function signPayload(timestamp: string, rawBody: string, secret: string) {
  return 'sha256=' + createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex');
}

export function isValidSignature({
  rawBody,
  timestamp,
  signature,
  secret,
  now = Date.now(),
}: {
  rawBody: string;
  timestamp: string | null;
  signature: string | null;
  secret: string;
  now?: number;
}) {
  if (!timestamp || !signature || !/^\d+$/.test(timestamp)) return false;
  const recent = Math.abs(now / 1000 - Number(timestamp)) <= MAX_CLOCK_SKEW_SECONDS;
  return recent && safeEqual(signature, signPayload(timestamp, rawBody, secret));
}

const referenceSchema = z.object({
  url: z.string().nullish(),
  title: z.string().nullish(),
  domain: z.string().nullish(),
});

const contentSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  body: z.string().min(1),
  format: z.string().default('markdown'),
  language: z.string().nullish(),
  gap: z.object({ id: z.string().nullish(), prompt: z.string().nullish() }).nullish(),
  references: z.array(referenceSchema).nullish(),
});

/** Only the fields we use are validated; anything else in the event is kept as-is in the log. */
export const eventSchema = z.object({
  event: z.string().min(1),
  eventId: z.string().min(1),
  occurredAt: z.string().nullish(),
  project: z.object({ name: z.string().nullish() }).nullish(),
  content: contentSchema.nullish(),
});

export type IdealTrackEvent = z.infer<typeof eventSchema>;
export type IdealTrackContent = z.infer<typeof contentSchema>;

export const CONTENT_GENERATED = 'content.generated';

/** Same limit as the post "Resumo" field. */
const EXCERPT_MAX = 220;

/** Plain text of a markdown line: no emphasis, links, inline code or images. */
function plainText(line: string) {
  return line
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:]+$/, '')}…`;
}

/** The title already becomes the post title, so a leading H1 in the body is dropped. */
function stripLeadingTitle(markdown: string) {
  return markdown.replace(/^\s*#\s+[^\n]*\n+/, '');
}

/** First real paragraph (not a heading, list, quote, table or code), as plain text. */
export function excerptFrom(markdown: string, fallback: string) {
  const paragraph = stripLeadingTitle(markdown)
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !/^(#|[-*+]\s|\d+\.\s|>|\||```)/.test(block));
  return truncate(plainText(paragraph ?? fallback) || fallback, EXCERPT_MAX);
}

function referencesSection(references: IdealTrackContent['references']) {
  const items = (references ?? [])
    .map((ref) => {
      const label = ref.title?.trim() || ref.domain?.trim() || ref.url?.trim();
      if (!label) return null;
      const text = ref.url ? `[${label}](${ref.url})` : label;
      const domain = ref.domain && ref.domain !== label ? ` (${ref.domain})` : '';
      return `- ${text}${domain}`;
    })
    .filter(Boolean);
  return items.length ? `\n\n## Referências\n\n${items.join('\n')}` : '';
}

/** Markdown for the post body: generated text without the repeated title, plus its references. */
export function postMarkdown(content: IdealTrackContent) {
  return stripLeadingTitle(content.body).trim() + referencesSection(content.references);
}

/** One-line description of the event for the panel list. */
export function eventSummary(event: IdealTrackEvent) {
  if (event.event === CONTENT_GENERATED && event.content) {
    return `Conteúdo gerado: ${event.content.title}`;
  }
  return event.event;
}
