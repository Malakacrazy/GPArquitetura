/**
 * BlogPage
 *
 * Blog listing page, laid out as an editorial magazine: split hero with the
 * latest post, intro, featured stories, offset grid, call-to-action band and
 * a filterable archive. Posts are managed in the blog's Sanity project
 * (document type "post"). Posts are numbered newest first (01 = latest).
 *
 * @module pages/BlogPage
 * @route /blog
 */
import { Navigation } from '../components/shared/Navigation';
import { Footer } from '../components/shared/Footer';
import { Hero } from '../components/blog/Hero';
import { IntroLetter } from '../components/blog/IntroLetter';
import { FeaturedStories } from '../components/blog/FeaturedStories';
import { FieldNotes } from '../components/blog/FieldNotes';
import { CtaBand } from '../components/blog/CtaBand';
import { Archive } from '../components/blog/Archive';
import { usePosts } from '../hooks/usePosts';
import { useSEO, SEO_CONFIG, createBreadcrumbJsonLd } from '../hooks/useSEO';

export default function BlogPage() {
  const { posts, loading, error } = usePosts();

  useSEO({
    ...SEO_CONFIG.blog,
    ogImage: 'https://studioaraci.com.br/images/hero-about-us-bg.webp',
    jsonLd: createBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
    ]),
  });

  // Page layout: 1 hero, 3 featured, 4 offset grid, then the full archive
  const [hero, ...afterHero] = posts;
  const featured = afterHero.slice(0, 3);
  const notes = afterHero.slice(3, 7);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <Navigation />
      <Hero post={hero} />

      <main>
        <IntroLetter />

        {loading && <p className="px-6 md:px-12 lg:px-16 xl:px-20 py-16 text-[var(--color-text-muted)]">Carregando artigos...</p>}
        {error && <p className="px-6 md:px-12 lg:px-16 xl:px-20 py-16 text-red-500">Não foi possível carregar os artigos. Tente novamente.</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="px-6 md:px-12 lg:px-16 xl:px-20 py-16 text-xl md:text-2xl font-light text-[var(--color-text-muted)]">
            Em breve, novos artigos por aqui.
          </p>
        )}

        <FeaturedStories posts={featured} />
        <FieldNotes posts={notes} firstNumber={featured.length + 2} />
        <CtaBand />
        {posts.length > 0 && <Archive posts={posts} />}
      </main>

      <Footer />
    </div>
  );
}
