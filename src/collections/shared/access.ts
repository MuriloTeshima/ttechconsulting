import type { Access } from 'payload';

export const anyone: Access = () => true;

export const authenticated: Access = ({ req }) => Boolean(req.user);

/** Visitantes só leem documentos publicados; usuários logados também veem rascunhos. */
export const publishedOrAuthenticated: Access = ({ req }) =>
  req.user ? true : { _status: { equals: 'published' } };

/**
 * Deploys de preview da Vercel usam o mesmo Vercel Blob da produção e uma cópia do banco.
 * Apagar ou substituir um arquivo no preview apagaria o arquivo usado pelo site de produção.
 */
export const isPreviewDeploy = process.env.VERCEL_ENV === 'preview';

/** Usuário logado, exceto em deploys de preview. */
export const authenticatedOutsidePreview: Access = ({ req }) =>
  !isPreviewDeploy && Boolean(req.user);
