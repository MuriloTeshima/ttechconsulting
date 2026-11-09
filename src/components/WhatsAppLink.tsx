'use client';

import type { ComponentProps, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';
import { whatsappHref } from '@/lib/whatsapp';

type WhatsAppLinkProps = Omit<ComponentProps<'a'>, 'href' | 'children'> & {
  children?: ReactNode;
  /** Prefilled message; without it, the site's default message is used. */
  message?: string;
  /** Context sent to the dataLayer as `service` (e.g. the page's project type). */
  context?: string;
  /** Where the button sits on the page; sent to the dataLayer as cta_location. */
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
