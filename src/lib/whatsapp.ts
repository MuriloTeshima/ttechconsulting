import { site } from '@/config/site';

/** Mensagens pré-preenchidas por contexto (seção 17 do documento de estratégia). */
export const whatsappMessages = {
  geral:
    'Olá! Conheci a TTech pelo site e gostaria de conversar sobre um projeto para minha empresa.',
  sistema: 'Olá! Gostaria de conversar sobre o desenvolvimento de um sistema para minha empresa.',
  automacao: 'Olá! Tenho um processo manual na minha empresa e gostaria de avaliar uma automação.',
  mvp: 'Olá! Tenho uma ideia de produto e gostaria de conversar sobre o desenvolvimento de um MVP.',
  site: 'Olá! Gostaria de conversar sobre a criação ou reformulação do site da minha empresa.',
  evolucao:
    'Olá! Gostaria de conversar sobre a manutenção e evolução de um sistema ou produto digital da minha empresa.',
  'lp-propostas':
    'Olá! Vi a página sobre automação de propostas e documentos e gostaria de avaliar uma automação para minha empresa.',
  'lp-clinicas':
    'Olá! Vi a página para clínicas e gostaria de conversar sobre a automação do atendimento e dos indicadores.',
  'lp-pedidos':
    'Olá! Vi a página sobre portal de pedidos e gostaria de organizar os pedidos da minha empresa.',
  'lp-ribeirao':
    'Olá! Sou de Ribeirão Preto e região e gostaria de conversar sobre o desenvolvimento de um sistema para minha empresa.',
} as const;

export type WhatsAppTopic = keyof typeof whatsappMessages;

export function whatsappHref(topic: WhatsAppTopic = 'geral') {
  const text = encodeURIComponent(whatsappMessages[topic]);
  return site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
