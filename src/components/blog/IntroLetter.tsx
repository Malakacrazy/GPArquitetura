import { Link } from 'react-router-dom';
import { Reveal } from '../shared/Reveal';
import { blogUrlFor } from '../../sanity/client';

/** Teaser for the investor article, which is a regular post managed in Sanity (category "Investidores") */
export function IntroLetter({ post }: { post?: any }) {
  if (!post) return null;

  return (
    <section className="bg-white px-6 md:px-12 lg:px-16 xl:px-20 py-8 md:py-12 lg:py-14">
      <div className="grid lg:grid-cols-[1fr_3fr_1.4fr] gap-8 lg:gap-12 items-center">
        <Reveal>
          <span className="text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)]">O olhar da Studio</span>
          <p className="mt-3 text-xs tracking-[0.15em] uppercase text-[var(--color-primary)]">Para investidores</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-[var(--color-text-dark)] max-w-3xl">
            {post.title}
          </h2>
          <p className="mt-6 border-l border-[var(--color-primary)] pl-6 max-w-2xl text-base md:text-lg font-light leading-relaxed text-[var(--color-text-muted)]">
            {post.excerpt}
          </p>
          <Link
            to={`/blog/${post.slug.current}`}
            onClick={() => window.scrollTo(0, 0)}
            className="mt-8 inline-block text-xs font-bold tracking-[0.15em] uppercase text-[var(--color-primary)] no-underline border-b border-[var(--color-primary)] pb-1"
          >
            Ler artigo →
          </Link>
        </Reveal>

        {post.coverImage && (
          <Reveal delay={0.2} className="hidden lg:block">
            <img
              src={blogUrlFor(post.coverImage).width(700).url()}
              alt={post.coverImage.alt || ''}
              loading="lazy"
              className="aspect-[4/5] w-full rotate-2 object-cover rounded-[16px] rounded-tr-[100px] shadow-[0_20px_40px_-20px_rgba(44,48,56,0.35)]"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
