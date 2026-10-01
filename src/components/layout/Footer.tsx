import Link from 'next/link';
import { site } from '@/config/site';
import { getServices } from '@/lib/cms';
import { FormLink } from '../FormLink';
import { Logo } from '../Logo';

export async function Footer() {
  // As quatro primeiras soluções, na ordem definida no CMS.
  const footerServices = (await getServices()).slice(0, 4);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo light />
            <p>
              Tecnologia estratégica.
              <br />
              Impacto real.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span>Soluções</span>
              {footerServices.map((service) => (
                <Link key={service.slug} href={`/${service.slug}`}>
                  {service.title}
                </Link>
              ))}
            </div>
            <div>
              <span>Institucional</span>
              <Link href="/projetos">Projetos</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/sobre">Sobre a TTech</Link>
              <Link href="/contato">Contato</Link>
            </div>
            <div>
              <span>Converse com a TTech</span>
              <p>Ribeirão Preto · atendimento remoto</p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <FormLink location="footer" className="footer-contact">
                Conversar sobre um projeto
              </FormLink>
            </div>
          </div>
        </div>
        <LegalBar />
      </div>
    </footer>
  );
}

export function LegalBar() {
  return (
    <div className="footer-bottom">
      <span>
        © {new Date().getFullYear()} TTech Consulting · {site.legalName} · CNPJ {site.cnpj}
      </span>
      <div>
        <Link href="/politica-de-privacidade">Privacidade</Link>
        <Link href="/termos-de-uso">Termos de uso</Link>
      </div>
    </div>
  );
}
