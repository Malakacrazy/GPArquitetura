/**
 * BlogPage
 *
 * Blog listing page. Follows the Portfolio page layout: full-screen hero,
 * filter bar, featured post and a grid of posts. Posts are managed in the
 * blog's Sanity project (document type "post").
 *
 * @module pages/BlogPage
 * @route /blog
 */
import { useMemo, useState } from 'react';
import { Navigation } from '../components/shared/Navigation';
import { Footer } from '../components/shared/Footer';
import { Hero } from '../components/blog/Hero';
import { CategoryFilter } from '../components/blog/CategoryFilter';
import { PostCard } from '../components/blog/PostCard';
import { usePosts } from '../hooks/usePosts';
import { useSEO, SEO_CONFIG, createBreadcrumbJsonLd } from '../hooks/useSEO';

export default function BlogPage() {
  const { posts, loading, error } = usePosts();
  const [category, setCategory] = useState<string | null>(null);

  useSEO({
    ...SEO_CONFIG.blog,
    ogImage: 'https://studioaraci.com.br/images/hero-about-us-bg.webp',
    jsonLd: createBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
    ]),
  });

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post: any) => post.category).filter(Boolean))).sort() as string[],
    [posts]
  );
  const visiblePosts = category ? posts.filter((post: any) => post.category === category) : posts;
  const [featured, ...rest] = visiblePosts;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <Navigation />
      <Hero />

      <main>
        {categories.length > 1 && (
          <CategoryFilter categories={categories} active={category} onChange={setCategory} />
        )}

        <section
          className={`px-6 md:px-12 lg:px-16 xl:px-20 pb-12 md:pb-16 lg:pb-24 ${categories.length > 1 ? '' : 'pt-12 md:pt-16'}`}
          style={{ backgroundColor: 'var(--color-background)' }}
        >
          {loading && <p className="text-[var(--color-text-muted)]">Carregando artigos...</p>}
          {error && <p className="text-red-500">Não foi possível carregar os artigos. Tente novamente.</p>}
          {!loading && !error && posts.length === 0 && (
            <p className="text-xl md:text-2xl font-light text-[var(--color-text-muted)] max-w-xl">
              Em breve, novos artigos por aqui.
            </p>
          )}

          {featured && (
            <div className="mb-12 md:mb-16 lg:mb-24">
              <PostCard post={featured} featured />
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
              {rest.map((post: any, index: number) => (
                <PostCard key={post._id} post={post} index={index} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
