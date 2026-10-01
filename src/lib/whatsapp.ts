import { site } from '@/config/site';

/** Mensagem padrão (seção 17 do documento de estratégia); landing pages definem a sua no CMS. */
export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Conheci a TTech pelo site e gostaria de conversar sobre um projeto para minha empresa.';

export function whatsappHref(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  const text = encodeURIComponent(message);
  return site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
