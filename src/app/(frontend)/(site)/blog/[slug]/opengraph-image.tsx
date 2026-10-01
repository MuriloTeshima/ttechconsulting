import { getPost, getPosts } from '@/lib/cms';
import { brandOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'TTech Consulting — Blog';
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  return brandOgImage({
    eyebrow: post?.category?.title ?? 'Blog',
    title: post?.title ?? 'Ideias para operações mais organizadas.',
  });
}
