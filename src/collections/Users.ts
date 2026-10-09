import type { CollectionConfig } from 'payload';
import { site } from '@/config/site';
import { authenticated } from './shared/access';

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuário', plural: 'Usuários' },
  admin: { useAsTitle: 'email', group: 'Administração' },
  auth: {
    // Bloqueia a conta por 15 minutos depois de 5 senhas erradas seguidas.
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    cookies: { secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' },
    forgotPassword: {
      // O link usa a URL pública do site: o Payload não conhece o domínio sem `serverURL`.
      generateEmailSubject: () => `Redefinição de senha · ${site.name}`,
      generateEmailHTML: (args) => {
        const url = new URL(`/admin/reset/${args?.token ?? ''}`, site.url).toString();
        const name = escapeHtml(String(args?.user?.name || args?.user?.email || ''));
        return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:24px;background:#f4f6f9;font-family:Arial,sans-serif;color:#071b33">
    <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;padding:32px">
      <p style="margin:0 0 16px">Olá${name ? `, ${name}` : ''}.</p>
      <p style="margin:0 0 24px">Recebemos um pedido para redefinir a senha do painel do site ${escapeHtml(site.name)}. O link vale por 1 hora.</p>
      <p style="margin:0 0 24px">
        <a href="${url}" style="display:inline-block;background:#0e8ef0;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:bold">Redefinir senha</a>
      </p>
      <p style="margin:0;font-size:13px;color:#5b6b80">Se você não pediu a redefinição, ignore este e-mail: a senha atual continua valendo.</p>
    </div>
  </body>
</html>`;
      },
    },
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [{ name: 'name', label: 'Nome', type: 'text' }],
};
