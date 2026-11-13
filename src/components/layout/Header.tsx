import Link from 'next/link';
import { nav } from '@/config/site';
import { FormLink } from '../FormLink';
import { WhatsAppIcon } from '../WhatsAppFloat';
import { WhatsAppLink } from '../WhatsAppLink';
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
          <FormLink className="button button-dark header-cta" location="header">
            Conversar sobre um projeto
          </FormLink>
          <WhatsAppLink location="header-mobile" className="header-whatsapp" icon={false}>
            <WhatsAppIcon size={18} />
            WhatsApp
          </WhatsAppLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
