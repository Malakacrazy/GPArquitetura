/**
 * BlogPage
 *
 * Blog listing page. Posts are managed in Sanity CMS (document type "post").
 *
 * @module pages/BlogPage
 * @route /blog
 */
import { Navigation } from '../components/shared/Navigation';
import { Footer } from '../components/shared/Footer';
import { PostCard } from '../components/blog/PostCard';
import { usePosts } from '../hooks/usePosts';
import { useSEO, SEO_CONFIG, createBreadcrumbJsonLd } from '../hooks/useSEO';

export default function BlogPage() {
  const { posts, loading, error } = usePosts();

  useSEO({
    ...SEO_CONFIG.blog,
    ogImage: 'https://studioaraci.com.br/images/hero-bg.webp',
    jsonLd: createBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
    ]),
  });

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <Navigation />

      <main>
        <section className="w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-28 md:pt-36 pb-8 md:pb-12">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-primary)]">Blog</span>
          <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-text-dark)] max-w-4xl">
            Arquitetura emocional, reforma e interiores
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--color-text-muted)] font-light max-w-2xl">
            Ideias, processos e bastidores dos projetos da Studio Araci.
          </p>
        </section>

        <section className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-12 lg:py-16">
          {loading && <p className="text-[var(--color-text-muted)]">Carregando artigos...</p>}
          {error && <p className="text-red-500">Não foi possível carregar os artigos. Tente novamente.</p>}
          {!loading && !error && posts.length === 0 && (
            <p className="text-[var(--color-text-muted)]">Em breve, novos artigos por aqui.</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {posts.map((post: any, index: number) => (
              <PostCard key={post._id} post={post} index={index} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
