'use client';

import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { trackCtaClick } from '@/lib/analytics';
import { FORM_ID, SELECT_PROJECT_EVENT, type ProjectType } from '@/lib/contact-schema';

type FormLinkProps = Omit<ComponentProps<'a'>, 'href' | 'children'> & {
  children?: ReactNode;
  /** Project type preselected in the form. */
  projectType?: ProjectType;
  /** Where the button sits on the page; sent to the dataLayer as cta_location. */
  location?: string;
  icon?: boolean;
};

/**
 * Call-to-action button that leads to the contact form.
 * If the page already has the form, it scrolls to it; otherwise it opens /contato with the type preselected.
 */
export function FormLink({
  children = 'Conversar sobre meu projeto',
  projectType,
  location = 'section',
  className = 'button button-blue',
  icon = true,
  onClick,
  ...props
}: FormLinkProps) {
  const href = projectType ? `/contato?tipo=${projectType}#${FORM_ID}` : `/contato#${FORM_ID}`;

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        trackCtaClick({ location, projectType: projectType ?? '' });
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
