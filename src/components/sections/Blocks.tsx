import { Check, Code2, MapPin, RefreshCw } from 'lucide-react';
import { projects, type Project } from '@/content/projects';

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <span>
            <Check size={16} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function TrustStrip() {
  return (
    <div className="trust-strip">
      <div>
        <MapPin size={19} />
        <span>Ribeirão Preto · atendimento remoto</span>
      </div>
      <div>
        <Code2 size={19} />
        <span>Negócio, produto e engenharia</span>
      </div>
      <div>
        <RefreshCw size={19} />
        <span>Evolução após o lançamento</span>
      </div>
    </div>
  );
}

export function ProjectCards({ list = projects }: { list?: Project[] }) {
  return (
    <div className="project-grid">
      {list.map((project, index) => (
        <article className="project-card" key={project.title}>
          <div className="project-index">
            <span>{project.type}</span>
            <strong>0{index + 1}</strong>
          </div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
