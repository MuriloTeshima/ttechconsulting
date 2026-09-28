import Link from 'next/link';
import {
  ArrowUpRight,
  Blocks,
  Layers3,
  MonitorSmartphone,
  RefreshCw,
  Workflow,
} from 'lucide-react';
import { services, type Service, type ServiceIcon } from '@/content/services';

const icons: Record<ServiceIcon, typeof Layers3> = {
  layers: Layers3,
  workflow: Workflow,
  blocks: Blocks,
  monitor: MonitorSmartphone,
  refresh: RefreshCw,
};

export function ServiceCards({ list = services }: { list?: Service[] }) {
  return (
    <div className="service-grid">
      {list.map((service, index) => {
        const Icon = icons[service.icon];
        return (
          <Link className="service-card" href={`/${service.slug}`} key={service.slug}>
            <div className="service-card-top">
              <span className="service-icon">
                <Icon size={25} strokeWidth={1.8} />
              </span>
              <span className="service-number">0{index + 1}</span>
            </div>
            <h3>{service.title}</h3>
            <p>{service.short}</p>
            <span className="text-link">
              Conhecer solução <ArrowUpRight size={17} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function RelatedServices({ exclude }: { exclude: string }) {
  return (
    <div className="related-grid">
      {services
        .filter((service) => service.slug !== exclude)
        .slice(0, 3)
        .map((service) => (
          <Link href={`/${service.slug}`} key={service.slug}>
            {service.title}
            <ArrowUpRight size={17} />
          </Link>
        ))}
    </div>
  );
}
