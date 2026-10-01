'use client';

import type { ComponentProps, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';
import { whatsappHref } from '@/lib/whatsapp';

type WhatsAppLinkProps = Omit<ComponentProps<'a'>, 'href' | 'children'> & {
  children?: ReactNode;
  /** Mensagem pré-preenchida; sem ela, usa a mensagem padrão do site. */
  message?: string;
  /** Contexto enviado ao dataLayer como `service` (ex.: tipo de projeto da página). */
  context?: string;
  /** Onde o botão está na página; enviado ao dataLayer como cta_location. */
  location?: string;
  icon?: boolean;
};

export function WhatsAppLink({
  children = 'Conversar no WhatsApp',
  message,
  context = 'geral',
  location = 'section',
  className = 'button button-blue',
  icon = true,
  onClick,
  ...props
}: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappHref(message)}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        trackWhatsAppClick({ location, context });
        onClick?.(event);
      }}
      {...props}
    >
      {children}
      {icon && <ArrowUpRight size={17} aria-hidden="true" />}
    </a>
  );
}
