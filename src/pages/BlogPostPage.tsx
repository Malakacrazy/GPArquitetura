/**
 * BlogPostPage
 *
 * Single blog post, same editorial design as the blog page: split hero with
 * the arched cover, reading column with a meta gutter, related stories, CTA
 * band and newsletter. Content comes from the blog's Sanity project
 * (document type "post"). Includes BlogPosting + breadcrumb structured data.
 *
 * @module pages/BlogPostPage
 * @route /blog/:slug
 */
import { Link, useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { Lightbulb } from 'lucide-react';
import { Navigation } from '../components/shared/Navigation';
import { Footer } from '../components/shared/Footer';
import { PostCard } from '../components/blog/PostCard';
import { PostHero } from '../components/blog/PostHero';
import { CtaBand } from '../components/blog/CtaBand';
import { Newsletter } from '../components/blog/Newsletter';
import { blockText, headingId, splitIntro } from '../components/blog/postMeta';
import { blogUrlFor } from '../sanity/client';
import { usePost, useLatestPosts } from '../hooks/usePosts';
import { useSEO, createBlogPostingJsonLd, createBreadcrumbJsonLd, createFaqJsonLd } from '../hooks/useSEO';
import NotFoundPage from './NotFoundPage';

const pad = (n: number) => String(n).padStart(2, '0');

// Section headings get their number from the índice; on desktop it sits in the left gutter
const makePortableTextComponents = (toc: { id: string }[]) => ({
  ...portableTextComponents,
  block: {
    ...portableTextComponents.block,
    h2: ({ children, value }: any) => {
      const id = headingId(blockText(value));
      const number = toc.findIndex((item) => item.id === id) + 1;
      return (
        <div className="relative mt-16 mb-5">
          {number > 0 && (
            <div className="mb-3 lg:mb-0 lg:absolute lg:right-full lg:mr-8 lg:w-36 lg:pt-2">
              <span className="block text-3xl lg:text-4xl leading-none text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                {pad(number)}
              </span>
              <div className="hidden lg:block mt-3 h-px bg-[var(--color-border-soft)]" />
            </div>
          )}
          <h2 id={id} className="scroll-mt-24 text-3xl md:text-4xl leading-tight tracking-tight text-[var(--color-text-dark)]">
            {children}
          </h2>
        </div>
      );
    },
  },
});

const portableTextComponents = {
  block: {
    h2: ({ children, value }: any) => (
      <h2
        id={headingId(blockText(value))}
        className="mt-14 mb-5 scroll-mt-24 text-3xl md:text-4xl leading-tight tracking-tight text-[var(--color-text-dark)]"
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-10 mb-4 text-2xl md:text-3xl leading-tight text-[var(--color-text-dark)]">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote
        className="my-12 border-l border-[var(--color-primary)] pl-6 md:pl-8 text-2xl md:text-3xl leading-snug italic text-[var(--color-text-dark)]"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="mb-6">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="mb-6 list-disc pl-6 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="mb-6 list-decimal pl-6 space-y-2">{children}</ol>,
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value?.href} className="text-[var(--color-primary)] underline underline-offset-4">
        {children}
      </a>
    ),
  },
  types: {
    callout: ({ value }: any) => (
      <aside className="my-12 rounded-[16px] rounded-tr-[80px] border border-[var(--araci-baleia-azul)]/20 bg-[var(--araci-nevoa-azul)]/60 p-6 md:p-10 text-[var(--color-text-dark)] shadow-[0_20px_40px_-25px_rgba(44,48,56,0.35)]">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-white/70 text-[var(--araci-baleia-azul)]">
            <Lightbulb className="size-5" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--araci-baleia-azul)]">
            {value.label || 'Dica profissional'}
          </span>
        </div>
        <p className="whitespace-pre-line text-xl md:text-2xl leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>{value.text}</p>
      </aside>
    ),
    table: ({ value }: any) => {
      const [header, ...rows] = value.rows || [];
      if (!header) return null;
      return (
        <div className="my-10 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm md:text-base">
            <thead>
              <tr>
                {(header.cells || []).map((cell: string, i: number) => (
                  <th
                    key={i}
                    className="border-b border-[var(--color-primary)] px-4 py-3 text-xs font-bold tracking-[0.1em] uppercase text-[var(--color-text-dark)]"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row: any) => (
                <tr key={row._key}>
                  {(row.cells || []).map((cell: string, i: number) => (
                    <td key={i} className="border-b border-[var(--color-border-soft)] px-4 py-3 align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    image: ({ value }: any) => (
      <figure className="my-12">
        <img
          src={blogUrlFor(value).width(1200).url()}
          alt={value.alt || ''}
          loading="lazy"
          className="w-full h-auto rounded-[16px]"
        />
        {value.caption && (
          <figcaption className="mt-3 text-sm text-[var(--color-text-muted)]">{value.caption}</figcaption>
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
            ...(post.faq?.length ? [createFaqJsonLd(post.faq)] : []),
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

  const { intro, rest } = splitIntro(post.body);
  const toc = rest
    .filter((block: any) => block._type === 'block' && block.style === 'h2')
    .map((block: any) => ({ id: headingId(blockText(block)), text: blockText(block) }));

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <Navigation />
      <PostHero post={post} />

      <main>
        {/* 1. Opening paragraph + summary */}
        <article className="bg-[var(--color-background)] px-6 md:px-12 lg:px-16 xl:px-20 pt-6 md:pt-8 pb-8">
          <div>
            <div className="text-[var(--color-text-muted)] font-light text-base md:text-lg leading-[1.9]">
              <div className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-dark)]" style={{ fontFamily: 'var(--font-heading)' }}>
                <PortableText value={intro} components={portableTextComponents} />
              </div>

              {post.tldr?.length > 0 && (
                <section className="mt-10">
                  <h2 className="mb-4 text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-primary)]">Em resumo</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {post.tldr.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

            </div>
          </div>
        </article>

        {/* 2. Brand card, then índice, body, FAQ and references */}
        <CtaBand variant="card" />

        <div className="bg-[var(--color-background)] px-6 md:px-12 lg:px-16 xl:px-20 pb-8 md:pb-10">
          <div className="grid lg:grid-cols-[1fr_minmax(0,44rem)_1fr] gap-10 lg:gap-12">
            <div className="hidden lg:block" />
            <div className="text-[var(--color-text-muted)] font-light text-base md:text-lg leading-[1.9]">
              {toc.length > 1 && (
                <nav aria-label="Índice" className="mb-12">
                  <h2 className="mb-4 text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-primary)]">Índice</h2>
                  <ol className="space-y-3 text-sm md:text-base">
                    {toc.map((item: { id: string; text: string }, i: number) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="flex gap-4 text-[var(--color-text-dark)] no-underline hover:text-[var(--color-primary)] transition-colors">
                          <span className="text-xs text-[var(--color-primary)] pt-1">{pad(i + 1)}</span>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <PortableText value={rest} components={makePortableTextComponents(toc)} />

              {post.faq?.length > 0 && (
                <section className="mt-16">
                  <h2 id="perguntas-frequentes" className="mb-2 scroll-mt-24 text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-primary)]">
                    Perguntas frequentes
                  </h2>
                  {post.faq.map((item: any) => (
                    <div key={item._key}>
                      <h3 className="mt-8 mb-3 text-2xl md:text-3xl leading-snug text-[var(--color-text-dark)]">{item.question}</h3>
                      <p className="whitespace-pre-line text-base">{item.answer}</p>
                    </div>
                  ))}
                </section>
              )}

              {post.sources?.length > 0 && (
                <section className="mt-14">
                  <h2 id="fontes" className="mb-5 scroll-mt-24 text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-primary)]">
                    Fontes
                  </h2>
                  <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
                    {post.sources.map((source: any) => (
                      <li key={source._key}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="text-[var(--color-primary)] underline underline-offset-4"
                        >
                          {source.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="mt-14">
                <h2 id="recomendacoes" className="mb-5 scroll-mt-24 text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-primary)]">
                  Recomendações
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
                  {[
                    { to: '/3d-visualization', label: 'Visualização Arquitetônica' },
                    { to: '/portfolio', label: 'Portfólio' },
                  ].map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={() => window.scrollTo(0, 0)}
                        className="text-[var(--color-primary)] underline underline-offset-4"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--color-border-soft)] pt-8">
                <Link
                  to="/blog"
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--color-primary)] no-underline border-b border-[var(--color-primary)] pb-1"
                >
                  ← Voltar ao blog
                </Link>
                {post.category && (
                  <span className="text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)]">{post.category}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {latest.length > 0 && (
          <section className="bg-[var(--color-background)] px-6 md:px-12 lg:px-16 xl:px-20 pt-8 md:pt-10 pb-16 md:pb-24">
            <span className="block text-xs tracking-[0.2em] uppercase text-[var(--color-primary)]">Leia também</span>
            <h2 className="mt-3 mb-10 md:mb-14 text-4xl md:text-5xl tracking-tight text-[var(--color-text-dark)]">
              Mais histórias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
              {latest.map((p: any, index: number) => (
                <PostCard key={p._id} post={p} index={index} />
              ))}
            </div>
          </section>
        )}

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
