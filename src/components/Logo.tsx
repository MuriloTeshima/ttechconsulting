import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo-ttech-consulting.png';

export function Logo({ light = false, priority = false }: { light?: boolean; priority?: boolean }) {
  return (
    <Link
      href="/"
      className={light ? 'wordmark wordmark-light' : 'wordmark'}
      aria-label="TTech Consulting — início"
    >
      <Image src={logo} alt="TTech Consulting" priority={priority} sizes="190px" />
    </Link>
  );
}
