import { Blocks, Check, Code2, Database, Gauge, GitBranch, MapPin, RefreshCw } from 'lucide-react';
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

export function ProductVisual() {
  return (
    <div
      className="system-visual"
      role="img"
      aria-label="Processos transformados em sistemas, automações e produtos digitais"
    >
      <div className="sv-grid" />
      <div className="sv-header">
        <span>PROJETO DIGITAL</span>
        <span className="sv-plus">+</span>
      </div>
      <div className="sv-center">
        <span className="sv-center-mark">
          <Code2 size={33} strokeWidth={1.45} />
        </span>
        <div>
          <span>DA OPERAÇÃO AO SOFTWARE</span>
          <strong>Construir o que importa.</strong>
        </div>
      </div>
      <div className="sv-items">
        <div>
          <GitBranch size={19} />
          <span>Processos</span>
        </div>
        <div>
          <Blocks size={19} />
          <span>Sistemas</span>
        </div>
        <div>
          <Database size={19} />
          <span>Integrações</span>
        </div>
        <div>
          <Gauge size={19} />
          <span>Indicadores</span>
        </div>
      </div>
      <div className="sv-footer">
        <span>ENTREGAS EM ETAPAS</span>
        <span>
          <RefreshCw size={14} /> Construir · validar · evoluir
        </span>
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
