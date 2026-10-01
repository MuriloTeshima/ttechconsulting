import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { PostSummary } from '@/lib/content-types';
import { formatDate } from '@/lib/dates';

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      {post.cover && (
        <div className="post-card-cover">
          <Image
            src={post.cover.url}
            alt={post.cover.alt}
            width={post.cover.width}
            height={post.cover.height}
            sizes="(max-width: 700px) 100vw, (max-width: 920px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="post-card-body">
        <p className="post-meta">
          {post.category && <span>{post.category.title}</span>}
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          )}
        </p>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <span className="text-link">
          Ler artigo <ArrowUpRight size={17} />
        </span>
      </div>
    </Link>
  );
}
