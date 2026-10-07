import { Link } from 'react-router-dom';
import { Reveal } from '../shared/Reveal';

/** Terracotta band: brand line + links back to the main site. `card` is the blue boxed version used inside articles */
export function CtaBand({ variant = 'band' }: { variant?: 'band' | 'card' }) {
  if (variant === 'card') {
    return (
      <section className="bg-[var(--color-background)] px-6 md:px-12 lg:px-16 xl:px-20 pb-12 md:pb-16">
        <Reveal className="bg-[var(--color-text-dark)] text-white p-8 md:p-12">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/70">Conheça a Studio</span>
          <h2 className="mt-4 text-3xl md:text-5xl leading-[1.1] tracking-tight">Tudo começa pelo que você sente.</h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg font-light leading-relaxed text-white/75">
            A Studio Araci cria projetos de arquitetura emocional e interiores. Vamos conversar sobre o seu?
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block rounded-full bg-[var(--color-primary)] px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[var(--color-primary)] hover:shadow-lg"
            >
              Fale com a Studio
            </Link>
            <Link
              to="/portfolio"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block rounded-full border border-white/70 px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[var(--color-text-dark)] hover:shadow-lg"
            >
              Ver portfólio
            </Link>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] px-6 md:px-12 lg:px-16 xl:px-20 py-20 md:py-28 text-white">
      <div className="pointer-events-none absolute -right-40 top-[-6rem] w-[40rem] h-[40rem] md:w-[56rem] md:h-[56rem] rounded-full border border-white/25" />

      <div className="relative">
        <Reveal>
          <span className="block text-8xl leading-none" style={{ fontFamily: 'var(--font-heading)' }} aria-hidden="true">“</span>
        </Reveal>
        <Reveal delay={0.1} className="md:ml-[12%] max-w-4xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight">Tudo começa pelo que você sente.</h2>
          <div className="mt-10 h-px w-24 bg-white/50" />
          <p className="mt-8 text-base md:text-lg font-light text-white/90">Vamos conversar sobre o seu projeto?</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block rounded-full bg-white px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase text-[var(--color-primary)] no-underline"
            >
              Fale com a Studio
            </Link>
            <Link
              to="/portfolio"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block rounded-full border border-white/70 px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase text-white no-underline"
            >
              Ver portfólio
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
