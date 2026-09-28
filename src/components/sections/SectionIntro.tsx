export function SectionIntro({
  eyebrow,
  title,
  description,
  light = false,
  as: Heading = 'h2',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={light ? 'section-intro light' : 'section-intro'}>
      <p className="eyebrow">{eyebrow}</p>
      <Heading>{title}</Heading>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
