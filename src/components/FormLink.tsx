'use client';

import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { trackCtaClick } from '@/lib/analytics';
import { FORM_ID, projectTypeByTopic, SELECT_PROJECT_EVENT } from '@/lib/contact-schema';
import type { WhatsAppTopic } from '@/lib/whatsapp';

type FormLinkProps = Omit<ComponentProps<'a'>, 'href' | 'children'> & {
  children?: ReactNode;
  /** Contexto da página; define o tipo de projeto pré-selecionado no formulário. */
  topic?: WhatsAppTopic;
  /** Onde o botão está na página; enviado ao dataLayer como cta_location. */
  location?: string;
  icon?: boolean;
};

/**
 * Botão de chamada que leva ao formulário de contato.
 * Se a página já tem o formulário, rola até ele; senão, abre /contato com o tipo pré-selecionado.
 */
export function FormLink({
  children = 'Conversar sobre meu projeto',
  topic = 'geral',
  location = 'section',
  className = 'button button-blue',
  icon = true,
  onClick,
  ...props
}: FormLinkProps) {
  const projectType = projectTypeByTopic[topic] ?? '';
  const href = projectType ? `/contato?tipo=${projectType}#${FORM_ID}` : `/contato#${FORM_ID}`;

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        trackCtaClick({ location, projectType });
        onClick?.(event);
        const form = document.getElementById(FORM_ID);
        if (!form) return;
        event.preventDefault();
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${FORM_ID}`);
        if (projectType) {
          window.dispatchEvent(new CustomEvent(SELECT_PROJECT_EVENT, { detail: projectType }));
        }
      }}
      {...props}
    >
      {children}
      {icon && <ArrowRight size={17} aria-hidden="true" />}
    </a>
  );
}
