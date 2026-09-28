import Image from 'next/image';
import Link from 'next/link';

export function Logo({ light = false, priority = false }: { light?: boolean; priority?: boolean }) {
  return (
    <Link
      href="/"
      className={light ? 'wordmark wordmark-light' : 'wordmark'}
      aria-label="TTech Consulting — início"
    >
      <Image
        src={light ? '/TTechConsultingLogoWhite.svg' : '/TTechConsultingLogoColor.svg'}
        alt="TTech Consulting"
        width={595}
        height={185}
        priority={priority}
        unoptimized
      />
    </Link>
  );
}
