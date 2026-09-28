'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Dialog } from 'radix-ui';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { nav } from '@/config/site';
import { ContactLink } from '../ContactLink';
import { Logo } from '../Logo';

const links = [{ label: 'Início', href: '/' }, ...nav, { label: 'Contato', href: '/contato' }];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="menu-trigger" aria-label="Abrir menu">
        <Menu size={25} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay" />
        <Dialog.Content className="sheet-content mobile-panel" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">Menu de navegação</Dialog.Title>
          <div className="mobile-panel-head">
            <Logo />
            <Dialog.Close aria-label="Fechar menu">
              <X size={22} />
            </Dialog.Close>
          </div>
          <nav aria-label="Navegação móvel">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={close}>
                {link.label}
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </nav>
          <ContactLink location="menu" className="button button-blue" onClick={close}>
            Conversar sobre um projeto
          </ContactLink>
          <p>Ribeirão Preto · atendimento remoto</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
