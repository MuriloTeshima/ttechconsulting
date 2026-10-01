import type { Access } from 'payload';

export const anyone: Access = () => true;

export const authenticated: Access = ({ req }) => Boolean(req.user);

/** Visitantes só leem documentos publicados; usuários logados também veem rascunhos. */
export const publishedOrAuthenticated: Access = ({ req }) =>
  req.user ? true : { _status: { equals: 'published' } };
