import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { getCms } from '@/lib/cms';

/** Turns on draft mode and opens the requested page. Used by the panel's "Pré-visualizar" (preview) button. */
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') ?? '';
  const secret = request.nextUrl.searchParams.get('secret');

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response('Link de pré-visualização inválido.', { status: 403 });
  }
  // Internal paths only, so the link can't become an open redirect.
  if (!path.startsWith('/') || path.startsWith('//')) {
    return new Response('Caminho inválido.', { status: 400 });
  }

  // Besides the secret, it requires a user logged in to the panel.
  const { user } = await (await getCms()).auth({ headers: request.headers });
  if (!user) {
    return new Response('Entre no painel para pré-visualizar rascunhos.', { status: 403 });
  }

  (await draftMode()).enable();
  redirect(path);
}
