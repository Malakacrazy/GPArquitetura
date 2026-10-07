import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../shared/Reveal';
import { formatMonthYear } from './postMeta';

const PAGE_SIZE = 5;

/** Full list of posts with category pills, 5 per page */
export function Archive({ posts }: { posts: any[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category).filter(Boolean))).sort() as string[],
    [posts]
  );
  const filtered = category ? posts.filter((post) => post.category === category) : posts;
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const selectCategory = (value: string | null) => {
    setCategory(value);
    setPage(1);
  };

  return (
    <section id="arquivo" className="bg-[var(--araci-areia-clara)]/40 px-6 md:px-12 lg:px-16 xl:px-20 py-8 md:py-12 lg:py-14">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
        <Reveal>
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-primary)]">Arquivo</span>
          <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-[var(--color-text-dark)]">Todos os artigos</h2>
          <p className="mt-6 max-w-sm text-base font-light leading-relaxed text-[var(--color-text-muted)]">
            Percorra os textos por tema.
          </p>
          {categories.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {[null, ...categories].map((value) => {
                const active = category === value;
                return (
                  <button
                    key={value ?? 'todos'}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectCategory(value)}
                    className={`rounded-full border px-4 py-2 text-xs font-bold tracking-[0.1em] uppercase transition-colors ${
                      active
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                        : 'border-[var(--color-text-dark)]/30 text-[var(--color-text-dark)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                    }`}
                  >
                    {value ?? 'Todos'}
                  </button>
                );
              })}
            </div>
          )}
        </Reveal>

        <div>
        <ul className="border-t border-[var(--color-text-dark)]">
          {visible.map((post) => (
            <li key={post._id} className="border-b border-[var(--color-border-soft)]">
              <Link
                to={`/blog/${post.slug.current}`}
                onClick={() => window.scrollTo(0, 0)}
                className="group grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3.5rem_1fr_9rem_7rem_1.5rem] items-center gap-x-4 gap-y-1 py-6 md:py-7 no-underline"
              >
                <h6 className="text-xl md:text-2xl text-[var(--color-primary)]">{String(posts.indexOf(post) + 1).padStart(2, '0')}</h6>
                <span className="text-xl md:text-2xl text-[var(--color-text-dark)] transition-colors duration-300 group-hover:text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {post.title}
                </span>
                <span className="hidden md:block text-sm text-[var(--color-text-muted)]">{post.category}</span>
                <span className="text-xs md:text-sm text-[var(--color-text-muted)] md:text-left">{formatMonthYear(post.publishedAt)}</span>
                <ArrowUpRight className="hidden md:block size-4 text-[var(--color-primary)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </li>
          ))}
        </ul>

        {pageCount > 1 && (
          <nav aria-label="Paginação do arquivo" className="mt-8 flex items-center gap-2">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`Página ${n}`}
                aria-current={n === page ? 'page' : undefined}
                onClick={() => setPage(n)}
                className={`size-10 rounded-full border text-xs font-bold transition-colors ${
                  n === page
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                    : 'border-[var(--color-text-dark)]/30 text-[var(--color-text-dark)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {n}
              </button>
            ))}
          </nav>
        )}
        </div>
      </div>
    </section>
  );
}
