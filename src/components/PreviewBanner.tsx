/** Banner shown in the CMS draft preview mode. */
export function PreviewBanner({ path }: { path: string }) {
  return (
    <div className="preview-banner" role="status">
      <span>Pré-visualização de rascunho: esta versão ainda não está publicada.</span>
      <a href={`/next/exit-preview?path=${encodeURIComponent(path)}`}>Sair da pré-visualização</a>
    </div>
  );
}
