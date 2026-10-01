/** URL do modo de pré-visualização (rascunhos) de uma página do site. */
export function previewUrl(path: string) {
  const params = new URLSearchParams({ path, secret: process.env.PREVIEW_SECRET ?? '' });
  return `/next/preview?${params.toString()}`;
}
