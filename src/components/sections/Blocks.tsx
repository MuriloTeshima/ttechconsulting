import Image from 'next/image';
import { ArrowUpRight, Check, Code2, MapPin, RefreshCw } from 'lucide-react';
import { getProjects } from '@/lib/cms';
import type { Project } from '@/lib/content-types';

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

export async function ProjectCards({ list }: { list?: Project[] }) {
  const projects = list ?? (await getProjects());
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article className="project-card" key={project.title}>
          {project.image && (
            <Image
              className="project-shot"
              src={project.image.url}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(max-width: 700px) 100vw, (max-width: 920px) 50vw, 33vw"
            />
          )}
          <div className="project-body">
            <div className="project-index">
              <span>{project.type}</span>
              {project.isDemo && <em>Projeto demonstrativo</em>}
            </div>
            <h3>{project.title}</h3>
            {project.problem && project.solution ? (
              <dl className="project-story">
                <div>
                  <dt>Antes</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>O que foi construído</dt>
                  <dd>{project.solution}</dd>
                </div>
              </dl>
            ) : (
              <p>{project.description}</p>
            )}
            <div className="project-foot">
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {project.demoUrl && (
                <a
                  className="text-link"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver demonstração <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
