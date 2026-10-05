import { Link } from 'react-router-dom';
import { Reveal } from '../shared/Reveal';
import { blogUrlFor } from '../../sanity/client';
import { formatPostDate, postMeta } from './postMeta';

interface HeroProps {
  /** Latest post. Without it the hero shows the generic blog intro */
  post?: any;
}

/** Split hero: latest post on the left, arched image card on the right */
export function Hero({ post }: HeroProps) {
  const meta = post ? [postMeta(post), formatPostDate(post.publishedAt)].filter(Boolean).join(' · ') : '';

  return (
    <section id="home" className="relative overflow-hidden bg-[var(--color-background)]">
      {/* Soft background disc */}
      <div className="pointer-events-none absolute -top-24 -right-40 w-[34rem] h-[34rem] md:w-[46rem] md:h-[46rem] rounded-full bg-[var(--araci-nevoa-azul)]/50" />

      <div className="relative z-10 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center min-h-screen px-6 md:px-12 lg:px-16 xl:px-20 pt-28 md:pt-32 pb-12 md:pb-16">
        <div>
          <Reveal>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-primary)]">
              {post ? 'Blog · Último artigo' : 'Blog'}
            </span>
          </Reveal>

          <h1 className="sr-only">Blog Studio Araci — arquitetura emocional e interiores</h1>

          <Reveal delay={0.1}>
            <h2 className="mt-6 md:mt-8 text-5xl md:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-[var(--color-text-dark)]">
              {post ? post.title : 'Ideias, processos e bastidores'}
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 h-[2px] w-16 bg-[var(--color-primary)]" />
            <p className="mt-8 max-w-md text-lg md:text-xl font-light leading-relaxed text-[var(--color-text-muted)]">
              {post ? post.excerpt : 'Uma arquitetura que nasce do que você sente, contada com calma.'}
            </p>
            {post && (
              <>
                <p className="mt-6 text-xs tracking-[0.15em] uppercase text-[var(--color-text-dark)]">{meta}</p>
                <Link
                  to={`/blog/${post.slug.current}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="mt-8 inline-block text-xs font-bold tracking-[0.15em] uppercase text-[var(--color-primary)] no-underline border-b border-[var(--color-primary)] pb-1"
                >
                  Ler artigo →
                </Link>
              </>
            )}
          </Reveal>
        </div>

        {post && (
          <Reveal delay={0.15}>
            <Link
              to={`/blog/${post.slug.current}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group relative block"
              aria-label={post.title}
            >
              <div className="relative aspect-[4/5] md:aspect-[5/4] lg:aspect-[17/18] overflow-hidden rounded-[24px] rounded-tl-[140px] md:rounded-tl-[200px] bg-[var(--color-accent)] shadow-[0_30px_60px_-25px_rgba(44,48,56,0.35)]">
                {post.coverImage && (
                  <img
                    src={blogUrlFor(post.coverImage).width(1400).url()}
                    alt={post.coverImage.alt || post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                )}
              </div>
              {post.category && (
                <span className="absolute bottom-4 right-4 md:bottom-6 md:right-6 rounded-full bg-white/90 px-4 py-2 text-xs text-[var(--color-text-dark)] shadow-sm">
                  {post.category}
                </span>
              )}
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
