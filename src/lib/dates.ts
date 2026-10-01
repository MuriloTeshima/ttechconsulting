const formatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'America/Sao_Paulo',
});

/** "12 de outubro de 2026". */
export function formatDate(iso: string | null | undefined) {
  return iso ? formatter.format(new Date(iso)) : '';
}
