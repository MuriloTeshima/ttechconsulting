import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { getCms } from '@/lib/cms';

/** Ativa o modo rascunho e abre a página pedida. Usado pelo botão "Pré-visualizar" do painel. */
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') ?? '';
  const secret = request.nextUrl.searchParams.get('secret');

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response('Link de pré-visualização inválido.', { status: 403 });
  }
  // Só caminhos internos, para o link não virar um redirecionamento aberto.
  if (!path.startsWith('/') || path.startsWith('//')) {
    return new Response('Caminho inválido.', { status: 400 });
  }

  // Além do segredo, exige um usuário logado no painel.
  const { user } = await (await getCms()).auth({ headers: request.headers });
  if (!user) {
    return new Response('Entre no painel para pré-visualizar rascunhos.', { status: 403 });
  }

  (await draftMode()).enable();
  redirect(path);
}
