import { getQuiz, getQuizSlugs } from '@/lib/cms';
import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting — Diagnóstico';
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return (await getQuizSlugs()).map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const quiz = await getQuiz((await params).slug);
  return brandOgImage({
    eyebrow: quiz ? `Diagnóstico gratuito · ${quiz.segment}` : 'Diagnóstico gratuito',
    title: quiz?.headline ?? 'Descubra onde sua operação perde tempo.',
  });
}
