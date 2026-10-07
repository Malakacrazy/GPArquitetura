import { Link } from 'react-router-dom';
import { Reveal } from '../shared/Reveal';
import { blogUrlFor } from '../../sanity/client';
import { formatPostDate, readingMinutes } from './postMeta';

const AUTHOR = 'Giulia Parente';

/** Blue hero for a single post: meta column and headline, then the full-width cover with a caption bar */
export function PostHero({ post }: { post: any }) {
  const minutes = readingMinutes(post.chars);
  const meta = [
    { label: 'Texto', value: AUTHOR },
    { label: 'Publicado em', value: formatPostDate(post.publishedAt) },
    minutes ? { label: 'Leitura', value: `${minutes} min` } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <section id="home" className="bg-[var(--color-text-dark)] text-white px-6 md:px-12 lg:px-16 xl:px-20 pt-20 pb-10 md:pb-12">
        <div className="grid lg:grid-cols-[16rem_minmax(0,1fr)] gap-10 lg:gap-16">
          <Reveal>
            <Link
              to="/blog"
              onClick={() => window.scrollTo(0, 0)}
              className="block text-xs font-medium tracking-[0.2em] uppercase text-white/80 no-underline hover:text-white"
            >
              ← Voltar ao blog
            </Link>
            {post.category && (
              <p className="mt-8 flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase">
                <span className="size-3 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
                {post.category}
              </p>
            )}
            <div className="mt-6 h-px bg-white/40" />
            <dl className="mt-6 space-y-5">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-[0.65rem] tracking-[0.15em] uppercase text-white/60">{item.label}</dt>
                  <dd className="mt-1 text-sm">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.05] tracking-tight break-words">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-white/75">{post.excerpt}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {post.coverImage && (
        <figure className="bg-[var(--color-background)]">
          <img
            src={blogUrlFor(post.coverImage).width(2000).url()}
            alt={post.coverImage.alt || post.title}
            className="w-full h-[50vh] md:h-[65vh] max-h-[44rem] object-cover"
          />
        </figure>
      )}
    </>
  );
}
