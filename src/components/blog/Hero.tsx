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
      {/* Blue logo symbol as watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-32 w-[30rem] h-[30rem] md:w-[42rem] md:h-[42rem] bg-[var(--araci-baleia-azul)]/20"
        style={{
          maskImage: "url('/brand/simbolo-branco.png')",
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskImage: "url('/brand/simbolo-branco.png')",
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] 2xl:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 lg:items-stretch px-6 md:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 pb-10 md:pb-12">
        <div className="lg:pt-20">
          <Reveal>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-primary)]">
              {post ? 'Blog · Último artigo' : 'Blog'}
            </span>
          </Reveal>

          <h1 className="sr-only">Blog Studio Araci — arquitetura emocional e interiores</h1>

          <Reveal delay={0.1}>
            <h2 className="mt-6 md:mt-8 text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl break-words leading-[1.05] tracking-tight text-[var(--color-text-dark)]">
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
          <Reveal delay={0.15} className="order-first lg:order-none lg:relative">
            <Link
              to={`/blog/${post.slug.current}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group relative block lg:absolute lg:inset-0"
              aria-label={post.title}
            >
              <div className="relative aspect-[4/5] md:aspect-[5/4] lg:aspect-auto lg:h-full overflow-hidden rounded-[24px] rounded-tl-[140px] md:rounded-tl-[200px] bg-[var(--color-accent)] shadow-[0_30px_60px_-25px_rgba(44,48,56,0.35)]">
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
