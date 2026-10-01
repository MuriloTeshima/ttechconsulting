import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/lib/content-types';
import { SectionIntro } from './SectionIntro';

export function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-layout">
      <SectionIntro eyebrow="Perguntas frequentes" title="Clareza antes de começar." />
      <div className="faq-list">
        {items.map((item) => (
          <details className="faq-item" name="faq" key={item.q}>
            <summary className="faq-question">
              {item.q}
              <ChevronDown size={18} aria-hidden="true" />
            </summary>
            <p className="faq-answer">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
