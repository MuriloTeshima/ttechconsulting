import Link from 'next/link';
import { nav } from '@/config/site';
import { ContactLink } from '../ContactLink';
import { Logo } from '../Logo';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo priority />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ContactLink className="button button-dark header-cta" location="header">
            Conversar sobre um projeto
          </ContactLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
