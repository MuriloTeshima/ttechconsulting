/** Draft preview URL for a site page. */
export function previewUrl(path: string) {
  const params = new URLSearchParams({ path, secret: process.env.PREVIEW_SECRET ?? '' });
  return `/next/preview?${params.toString()}`;
}
