'use client';

import type { ComponentProps, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';
import { whatsappHref, type WhatsAppTopic } from '@/lib/whatsapp';

type WhatsAppLinkProps = Omit<ComponentProps<'a'>, 'href' | 'children'> & {
  children?: ReactNode;
  topic?: WhatsAppTopic;
  /** Onde o botão está na página; enviado ao dataLayer como cta_location. */
  location?: string;
  icon?: boolean;
};

export function WhatsAppLink({
  children = 'Conversar no WhatsApp',
  topic = 'geral',
  location = 'section',
  className = 'button button-blue',
  icon = true,
  onClick,
  ...props
}: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappHref(topic)}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        trackWhatsAppClick({ location, topic });
        onClick?.(event);
      }}
      {...props}
    >
      {children}
      {icon && <ArrowUpRight size={17} aria-hidden="true" />}
    </a>
  );
}
