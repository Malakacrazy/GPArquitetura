import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../shared/Reveal';
import { blogUrlFor } from '../../sanity/client';
import { postMeta, readingMinutes } from './postMeta';

const toTop = () => window.scrollTo(0, 0);

/** One large story (arched image + text) and up to two smaller cards */
export function FeaturedStories({ posts }: { posts: any[] }) {
  const [lead, ...others] = posts;
  if (!lead) return null;

  return (
    <section className="bg-[var(--color-background)] px-6 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 lg:py-28">
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
        <Reveal>
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-primary)]">Seleção recente</span>
          <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl tracking-tight text-[var(--color-text-dark)]">
            Histórias em primeiro plano
          </h2>
        </Reveal>
        <a
          href="#arquivo"
          className="hidden md:inline-flex items-center gap-1 text-xs font-bold tracking-[0.15em] uppercase text-[var(--color-text-dark)] no-underline hover:text-[var(--color-primary)] transition-colors"
        >
          Ver todos os artigos <ArrowUpRight className="size-4" />
        </a>
      </div>

      <Reveal>
        <Link to={`/blog/${lead.slug.current}`} onClick={toTop} className="group grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-16 items-center no-underline">
          <div className="aspect-[4/3] overflow-hidden rounded-[16px] rounded-tr-[120px] md:rounded-tr-[180px] bg-[var(--color-accent)]">
            {lead.coverImage && (
              <img
                src={blogUrlFor(lead.coverImage).width(1400).url()}
                alt={lead.coverImage.alt || lead.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
              />
            )}
          </div>
          <div>
            <h6 className="text-2xl text-[var(--color-primary)]">02</h6>
            <h3 className="mt-4 text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-[var(--color-text-dark)] transition-colors duration-500 group-hover:text-[var(--color-primary)]">
              {lead.title}
            </h3>
            <p className="mt-6 max-w-md text-base md:text-lg font-light leading-relaxed text-[var(--color-text-muted)]">{lead.excerpt}</p>
            <p className="mt-6 text-xs tracking-[0.15em] uppercase text-[var(--color-text-dark)]">{postMeta(lead)}</p>
          </div>
        </Link>
      </Reveal>

      {others.length > 0 && (
        <div className="mt-14 md:mt-20 grid md:grid-cols-2 gap-10 md:gap-8">
          {others.map((post, index) => (
            <Reveal key={post._id} delay={index * 0.1}>
              <Link to={`/blog/${post.slug.current}`} onClick={toTop} className="group block no-underline">
                <div
                  className={`aspect-[16/10] overflow-hidden rounded-[16px] bg-[var(--color-accent)] ${
                    index % 2 === 1 ? 'rounded-br-[120px]' : ''
                  }`}
                >
                  {post.coverImage && (
                    <img
                      src={blogUrlFor(post.coverImage).width(1000).url()}
                      alt={post.coverImage.alt || post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="mt-5 flex items-center justify-between text-xs tracking-[0.1em] uppercase">
                  <span className="text-[var(--color-primary)]">{post.category}</span>
                  <span className="text-[var(--color-text-muted)] normal-case tracking-normal">
                    {readingMinutes(post.chars) ? `${readingMinutes(post.chars)} min` : ''}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl md:text-3xl tracking-tight text-[var(--color-text-dark)] transition-colors duration-500 group-hover:text-[var(--color-primary)]">
                  {post.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
