import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical';
import type { Payload } from 'payload';
import { toSlug } from '@/collections/shared/fields';
import { getCms } from '@/lib/cms';
import {
  CONTENT_GENERATED,
  eventSchema,
  eventSummary,
  excerptFrom,
  isValidApiKey,
  isValidSignature,
  postMarkdown,
  type IdealTrackContent,
} from '@/lib/idealtrack';

/**
 * IdealTrack webhook. Any non-2xx answer makes IdealTrack retry (up to 6 times in about an hour),
 * so only a failure worth retrying (our database or conversion) answers 5xx.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

/** A free slug: "titulo", then "titulo-2", "titulo-3"... (the post slug is unique). */
async function freeSlug(payload: Payload, title: string) {
  const base = toSlug(title) || 'conteudo-idealtrack';
  for (let n = 1; n < 50; n++) {
    const candidate = n === 1 ? base : `${base}-${n}`;
    const { totalDocs } = await payload.count({
      collection: 'posts',
      where: { slug: { equals: candidate } },
    });
    if (!totalDocs) return candidate;
  }
  return `${base}-${Date.now()}`;
}

async function createDraftPost(payload: Payload, content: IdealTrackContent) {
  const editorConfig = await editorConfigFactory.default({ config: payload.config });
  const markdown = postMarkdown(content);
  const post = await payload.create({
    collection: 'posts',
    draft: true,
    // Drafts don't change the public site, so there's nothing to revalidate.
    context: { disableRevalidate: true },
    data: {
      title: content.title,
      slug: await freeSlug(payload, content.title),
      generateSlug: false,
      excerpt: excerptFrom(markdown, content.title),
      content: convertMarkdownToLexical({ editorConfig, markdown }),
      _status: 'draft',
    },
  });
  return post.id;
}

export async function POST(request: Request) {
  const apiKey = process.env.IDEALTRACK_WEBHOOK_API_KEY;
  const secret = process.env.IDEALTRACK_WEBHOOK_SECRET;
  if (!apiKey || !secret) {
    console.error('[idealtrack] Webhook recebido sem IDEALTRACK_WEBHOOK_API_KEY/SECRET configurados');
    return json(503, { error: 'not_configured' });
  }

  // The signature covers the body exactly as it arrived, so it's read as text before parsing.
  const rawBody = await request.text();
  if (!isValidApiKey(request.headers.get('api-key'), apiKey)) {
    return json(401, { error: 'invalid_api_key' });
  }
  const signatureOk = isValidSignature({
    rawBody,
    timestamp: request.headers.get('x-idealtrack-timestamp'),
    signature: request.headers.get('x-idealtrack-signature'),
    secret,
  });
  if (!signatureOk) return json(401, { error: 'invalid_signature' });

  let parsed;
  try {
    parsed = eventSchema.safeParse(JSON.parse(rawBody));
  } catch {
    return json(400, { error: 'invalid_json' });
  }
  if (!parsed.success) return json(400, { error: 'invalid_event' });
  const event = parsed.data;

  const payload = await getCms();
  const { totalDocs } = await payload.count({
    collection: 'idealtrack-events',
    where: { eventId: { equals: event.eventId } },
  });
  if (totalDocs) return json(200, { status: 'duplicate' });

  try {
    let result: 'post-criado' | 'registrado' | 'formato-nao-suportado' = 'registrado';
    let postId: number | undefined;
    if (event.event === CONTENT_GENERATED && event.content) {
      if (event.content.format === 'markdown') {
        postId = await createDraftPost(payload, event.content);
        result = 'post-criado';
      } else {
        result = 'formato-nao-suportado';
      }
    }

    await payload.create({
      collection: 'idealtrack-events',
      data: {
        eventId: event.eventId,
        event: event.event,
        summary: eventSummary(event),
        result,
        post: postId,
        project: event.project?.name ?? undefined,
        prompt: event.content?.gap?.prompt ?? undefined,
        occurredAt: event.occurredAt ?? undefined,
        payload: JSON.parse(rawBody),
      },
    });
    return json(200, { status: 'ok', result, post: postId ?? null });
  } catch (error) {
    // A delivery processed at the same time by a retry hits the unique eventId: not an error.
    const { totalDocs: alreadySaved } = await payload.count({
      collection: 'idealtrack-events',
      where: { eventId: { equals: event.eventId } },
    });
    if (alreadySaved) return json(200, { status: 'duplicate' });
    console.error('[idealtrack] Falha ao processar evento', event.eventId, error);
    return json(500, { error: 'processing_failed' });
  }
}
