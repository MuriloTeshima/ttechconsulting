import type { Access } from 'payload';

export const anyone: Access = () => true;

export const authenticated: Access = ({ req }) => Boolean(req.user);

/** Visitors only read published documents; logged-in users also see drafts. */
export const publishedOrAuthenticated: Access = ({ req }) =>
  req.user ? true : { _status: { equals: 'published' } };
