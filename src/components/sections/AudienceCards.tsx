import { BriefcaseBusiness, Rocket, Stethoscope, Truck } from 'lucide-react';
import { audiences, type AudienceIcon } from '@/content/audiences';

const icons: Record<AudienceIcon, typeof Rocket> = {
  services: BriefcaseBusiness,
  health: Stethoscope,
  distribution: Truck,
  product: Rocket,
};

export function AudienceCards() {
  return (
    <div className="audience-grid">
      {audiences.map((audience, index) => {
        const Icon = icons[audience.icon];
        return (
          <article className="audience-card" key={audience.title}>
            <div className="audience-card-top">
              <span className="service-icon">
                <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="audience-number">0{index + 1}</span>
            </div>
            <h3>{audience.title}</h3>
            <p>{audience.description}</p>
            <ul className="audience-solutions" aria-label={`Soluções para ${audience.title}`}>
              {audience.solutions.map((solution) => (
                <li key={solution}>{solution}</li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
