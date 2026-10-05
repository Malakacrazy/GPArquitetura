import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../shared/Reveal';
import { blogUrlFor } from '../../sanity/client';

const toTop = () => window.scrollTo(0, 0);

// Mobile order is the DOM order (0,1,2,3,4); from md up, items are split in three offset columns
const ORDER = ['order-1', 'order-2', 'order-3', 'order-4', 'order-5'];

function Note({ post, number, tall, order }: { post: any; number: number; tall?: boolean; order: string }) {
  return (
    <Reveal className={order}>
      <Link to={`/blog/${post.slug.current}`} onClick={toTop} className="group block no-underline">
        <div className={`${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'} overflow-hidden rounded-[16px] bg-[var(--color-accent)]`}>
          {post.coverImage && (
            <img
              src={blogUrlFor(post.coverImage).width(900).url()}
              alt={post.coverImage.alt || post.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
          )}
        </div>
        <div className="mt-4 flex items-baseline justify-between">
          <h6 className="text-xl text-[var(--color-primary)]">{String(number).padStart(2, '0')}</h6>
          <span className="text-xs tracking-[0.1em] uppercase text-[var(--color-text-muted)]">{post.category}</span>
        </div>
        <h3 className="mt-3 text-xl md:text-2xl leading-snug text-[var(--color-text-dark)] transition-colors duration-500 group-hover:text-[var(--color-primary)]">
          {post.title}
        </h3>
        <div className="mt-5 h-px bg-[var(--color-border-soft)]" />
      </Link>
    </Reveal>
  );
}

/** Offset three-column grid with up to four posts and a call-to-action tile */
export function FieldNotes({ posts, firstNumber }: { posts: any[]; firstNumber: number }) {
  if (posts.length === 0) return null;
  const [a, b, c, d] = posts;
  const n = (i: number) => firstNumber + i;

  return (
    <section className="bg-[var(--color-background)] px-6 md:px-12 lg:px-16 xl:px-20 pb-16 md:pb-24 lg:pb-28">
      <div className="flex flex-col gap-10 md:grid md:grid-cols-3 md:gap-8">
        <div className="contents md:flex md:flex-col md:gap-12">
          {a && <Note post={a} number={n(0)} order={ORDER[0]} />}
          {d && <Note post={d} number={n(3)} order={ORDER[3]} />}
        </div>
        <div className="contents md:flex md:flex-col md:gap-12 md:pt-24">
          {b && <Note post={b} number={n(1)} tall order={ORDER[1]} />}
        </div>
        <div className="contents md:flex md:flex-col md:gap-12">
          {c && <Note post={c} number={n(2)} order={ORDER[2]} />}
          <Reveal className={ORDER[4]}>
            <Link
              to="/portfolio"
              onClick={toTop}
              className="group flex flex-col justify-between min-h-[14rem] rounded-[16px] rounded-tr-[110px] bg-[var(--color-text-dark)] p-8 text-white no-underline"
            >
              <span className="text-xs tracking-[0.15em] uppercase text-white/70">Portfólio</span>
              <span className="mt-8 text-2xl md:text-3xl leading-snug">Veja os projetos que contam essas histórias.</span>
              <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold tracking-[0.15em] uppercase">
                Abrir portfólio <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
