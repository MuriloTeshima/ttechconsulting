import { WhatsAppLink } from './WhatsAppLink';

export function WhatsAppFloat() {
  return (
    <WhatsAppLink
      location="floating"
      className="whatsapp-float"
      icon={false}
      aria-label="Conversar com a TTech no WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </WhatsAppLink>
  );
}

/** WhatsApp glyph, shared by the floating button and the mobile header. */
export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.29.6 4.53 1.74 6.5L3 29l6.66-1.74A12.97 12.97 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.7c-1.95 0-3.87-.52-5.54-1.52l-.4-.24-3.95 1.03 1.06-3.85-.26-.4A10.66 10.66 0 0 1 5.35 16c0-5.9 4.8-10.7 10.7-10.7 5.88 0 10.66 4.8 10.66 10.7 0 5.9-4.78 10.7-10.67 10.7Zm5.86-8c-.32-.16-1.9-.94-2.2-1.04-.29-.11-.5-.16-.72.16-.21.32-.83 1.04-1.01 1.26-.19.21-.37.24-.7.08-.31-.16-1.35-.5-2.57-1.59-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.53-.72-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.43 5.44 4.8.76.33 1.35.53 1.81.67.76.24 1.46.2 2 .12.61-.09 1.9-.78 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.14-.29-.22-.61-.38Z" />
    </svg>
  );
}
