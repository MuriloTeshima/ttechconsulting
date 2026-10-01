import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import type { ProjectType } from '@/lib/contact-schema';
import { FormLink } from '../FormLink';

export function PageHero({
  eyebrow,
  title,
  description,
  projectType,
  label = 'Conversar sobre meu projeto',
  secondary,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  /** Tipo de projeto pré-selecionado no formulário. */
  projectType?: ProjectType;
  label?: string;
  secondary?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <section className="inner-hero">
      <div className="container inner-hero-grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-description">{description}</p>
          <div className="hero-actions">
            <FormLink projectType={projectType} location="hero">
              {label}
            </FormLink>
            {secondary && (
              <Link className="link-underline light" href={secondary.href}>
                {secondary.label}
                <ArrowRight size={17} />
              </Link>
            )}
          </div>
        </div>
        {children && <div className="inner-hero-aside">{children}</div>}
      </div>
    </section>
  );
}
