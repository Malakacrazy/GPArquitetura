/**
 * BlogPostPage
 *
 * Single blog post. Content comes from Sanity CMS (document type "post").
 * Includes BlogPosting + breadcrumb structured data and a CTA that links
 * back to the main site (portfolio / contact).
 *
 * @module pages/BlogPostPage
 * @route /blog/:slug
 */
import { Link, useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { Navigation } from '../components/shared/Navigation';
import { Footer } from '../components/shared/Footer';
import { PostCard } from '../components/blog/PostCard';
import { formatPostDate } from '../components/blog/formatPostDate';
import { blogUrlFor } from '../sanity/client';
import { usePost, useLatestPosts } from '../hooks/usePosts';
import { useSEO, createBlogPostingJsonLd, createBreadcrumbJsonLd } from '../hooks/useSEO';
import NotFoundPage from './NotFoundPage';

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="mt-10 mb-4 text-2xl md:text-3xl font-medium text-[var(--color-text-dark)]">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-8 mb-3 text-xl md:text-2xl font-medium text-[var(--color-text-dark)]">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 border-l-2 border-[var(--color-primary)] pl-6 italic text-[var(--color-text-dark)]">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="mb-5">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="mb-5 list-disc pl-6 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="mb-5 list-decimal pl-6 space-y-2">{children}</ol>,
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value?.href} className="text-[var(--color-primary)] underline underline-offset-4">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <img
          src={blogUrlFor(value).width(1200).url()}
          alt={value.alt || ''}
          loading="lazy"
          className="w-full h-auto"
        />
        {value.caption && (
          <figcaption className="mt-2 text-sm text-[var(--color-text-muted)]">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
};

export default function BlogPostPage() {
  const { slug = '' } = useParams();
  const { post, loading, error } = usePost(slug);
  const { posts: latest } = useLatestPosts(slug, 3);

  useSEO({
    title: post?.title || 'Blog',
    description: post?.excerpt || 'Artigo do blog da Studio Araci.',
    canonical: `/blog/${slug}`,
    ogType: 'article',
    ogImage: post?.coverImage ? blogUrlFor(post.coverImage).width(1200).height(630).fit('crop').url() : undefined,
    ogImageAlt: post?.coverImage?.alt || post?.title,
    noindex: !loading && !post,
    jsonLd: post
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            createBlogPostingJsonLd({
              title: post.title,
              description: post.excerpt,
              image: post.coverImage ? blogUrlFor(post.coverImage).width(1200).url() : undefined,
              slug,
              datePublished: post.publishedAt,
              dateModified: post._updatedAt,
            }),
            createBreadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
              { name: post.title, url: `/blog/${slug}` },
            ]),
          ].map(({ '@context': _ctx, ...node }: any) => node),
        }
      : undefined,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="animate-pulse text-[var(--color-text-muted)]">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-red-500">Não foi possível carregar o artigo. Tente novamente.</div>
      </div>
    );
  }

  if (!post) return <NotFoundPage />;

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <Navigation />

      <main>
        <article className="w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-28 md:pt-36 pb-12 md:pb-16">
          <header className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-primary)] no-underline"
            >
              ← Blog
            </Link>
            <h1 className="mt-6 text-3xl md:text-5xl font-medium tracking-tight text-[var(--color-text-dark)]">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              {[post.category, formatPostDate(post.publishedAt)].filter(Boolean).join(' · ')}
            </p>
          </header>

          {post.coverImage && (
            <img
              src={blogUrlFor(post.coverImage).width(1600).url()}
              alt={post.coverImage.alt || post.title}
              className="w-full max-w-5xl mx-auto mt-10 aspect-[16/9] object-cover"
            />
          )}

          <div className="max-w-3xl mx-auto mt-10 text-[var(--color-text-muted)] font-light text-base md:text-lg leading-8">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>

          <aside className="max-w-3xl mx-auto mt-16 border-t border-[var(--color-border-soft)] pt-10">
            <p className="text-xl md:text-2xl font-medium text-[var(--color-text-dark)]">
              Quer um projeto pensado para o seu jeito de viver?
            </p>
            <p className="mt-3 text-[var(--color-text-muted)] font-light">
              Conheça nosso <Link to="/portfolio" className="text-[var(--color-primary)] underline underline-offset-4">portfólio</Link>{' '}
              ou <Link to="/contact" className="text-[var(--color-primary)] underline underline-offset-4">fale com a Studio Araci</Link>.
            </p>
          </aside>
        </article>

        {latest.length > 0 && (
          <section className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-12 lg:py-16">
            <span className="block mb-8 md:mb-12 text-xs text-[var(--color-primary)] font-medium tracking-[0.2em] uppercase">
              Leia também
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
              {latest.map((p: any, index: number) => (
                <PostCard key={p._id} post={p} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
