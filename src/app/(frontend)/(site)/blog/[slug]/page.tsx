import type { Metadata } from 'next';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { JsonLd } from '@/components/analytics/JsonLd';
import { PreviewBanner } from '@/components/PreviewBanner';
import { CTA } from '@/components/sections/CTA';
import { site } from '@/config/site';
import { getPost, getPosts } from '@/lib/cms';
import { formatDate } from '@/lib/dates';
import { absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

// New posts published in the CMS open without a new build.
export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode();
  const post = await getPost((await params).slug, draft);
  if (!post) return {};
  const metadata = pageMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
  });
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { isEnabled: draft } = await draftMode();
  const post = await getPost((await params).slug, draft);
  if (!post) notFound();
  const path = `/blog/${post.slug}`;

  return (
    <main id="conteudo">
      {draft && <PreviewBanner path={path} />}
      <article className="post container">
        <Link href="/blog" className="back-link">
          <ArrowLeft size={17} /> Voltar ao blog
        </Link>
        <header className="post-header">
          <p className="post-meta">
            {post.category && <span>{post.category.title}</span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            )}
          </p>
          <h1>{post.title}</h1>
          <p className="post-lead">{post.excerpt}</p>
        </header>
        {post.cover && (
          <div className="post-cover">
            <Image
              src={post.cover.url}
              alt={post.cover.alt}
              width={post.cover.width}
              height={post.cover.height}
              sizes="(max-width: 960px) 100vw, 960px"
              priority
            />
          </div>
        )}
        <RichText data={post.content} className="prose" />
      </article>
      <CTA />
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.seoDescription,
            datePublished: post.publishedAt ?? undefined,
            url: absoluteUrl(path),
            image: post.cover?.url ?? absoluteUrl(`${path}/opengraph-image`),
            inLanguage: 'pt-BR',
            author: { '@type': 'Person', name: site.founder },
            publisher: { '@id': absoluteUrl('/#organization') },
          },
          breadcrumbSchema([
            { name: 'Blog', path: '/blog' },
            { name: post.title, path },
          ]),
        ]}
      />
    </main>
  );
}
