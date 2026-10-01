import { JsonLd } from '@/components/analytics/JsonLd';
import { PostCard } from '@/components/blog/PostCard';
import { CTA } from '@/components/sections/CTA';
import { PageHero } from '@/components/sections/PageHero';
import { getPosts } from '@/lib/cms';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Blog sobre sistemas, automações e processos',
  description:
    'Artigos sobre automação de processos, sistemas sob medida e produtos digitais para empresas que querem operar com mais controle.',
  path: '/blog',
});

export default async function Blog() {
  const posts = await getPosts();
  return (
    <main id="conteudo">
      <PageHero
        eyebrow="BLOG"
        title="Ideias para operações mais organizadas."
        description="Conteúdo prático sobre automação, sistemas e produtos digitais para empresas que querem reduzir trabalho manual e crescer com mais controle."
      />
      <section className="section blog-section">
        <div className="container">
          {posts.length ? (
            <div className="post-grid">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <p className="eyebrow">EM BREVE</p>
              <h2>Os primeiros artigos estão a caminho.</h2>
              <p>
                Enquanto isso, conte para a gente qual processo da sua empresa poderia funcionar
                melhor.
              </p>
            </div>
          )}
        </div>
      </section>
      <CTA />
      <JsonLd data={breadcrumbSchema([{ name: 'Blog', path: '/blog' }])} />
    </main>
  );
}
