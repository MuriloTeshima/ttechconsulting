import type { ProjectType } from '@/lib/contact-schema';
import { FormLink } from '../FormLink';

export function CTA({
  title = 'Existe um processo na sua empresa que pode funcionar melhor?',
  description = 'Conte como sua equipe trabalha hoje, onde está o retrabalho e o que você deseja melhorar. Vamos conversar sobre um primeiro passo possível.',
  projectType,
  label = 'Conversar sobre meu projeto',
}: {
  title?: string;
  description?: string;
  /** Tipo de projeto pré-selecionado no formulário. */
  projectType?: ProjectType;
  label?: string;
}) {
  return (
    <section className="cta-wrap container">
      <div className="cta-panel">
        <div className="cta-graphic" aria-hidden="true" />
        <div>
          <p className="eyebrow">VAMOS CONSTRUIR</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <FormLink projectType={projectType} location="final" className="button button-blue">
          {label}
        </FormLink>
      </div>
    </section>
  );
}
