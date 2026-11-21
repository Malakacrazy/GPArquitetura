import { Link } from 'react-router-dom';
import { Reveal } from '../shared/Reveal';

/** Terracotta band: brand line + links back to the main site. `card` is the blue boxed version used inside articles */
export function CtaBand({ variant = 'band' }: { variant?: 'band' | 'card' }) {
  if (variant === 'card') {
    return (
      <section className="bg-[var(--color-background)] px-6 md:px-12 lg:px-16 xl:px-20 pb-12 md:pb-16">
        <Reveal className="bg-[var(--color-text-dark)] text-white p-8 md:p-12">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/70">Conheça o Studio</span>
          <h2 className="mt-4 text-3xl md:text-5xl leading-[1.1] tracking-tight">O espaço não é neutro. O projeto também não deveria ser.</h2>
          <p className="mt-5 text-base md:text-lg font-light leading-relaxed text-white/75">
            Pesquisas científicas relacionam fatores como iluminação, acústica e conforto ambiental ao bem-estar e à experiência humana.
          </p>
          <p className="mt-4 text-base md:text-lg font-light leading-relaxed text-white/75">
            No Studio Araci, unimos esse conhecimento à sensibilidade e à inteligência projetual para criar espaços que respeitam as necessidades de quem vive neles e ampliam as possibilidades de quem investe.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block rounded-full bg-[var(--color-primary)] px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[var(--color-primary)] hover:shadow-lg"
            >
              Fale com o Studio
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
    <section className="relative overflow-hidden bg-[var(--color-primary)] px-6 md:px-12 lg:px-16 xl:px-20 py-10 md:py-14 text-white">
      <div className="pointer-events-none absolute -right-40 top-[-6rem] w-[40rem] h-[40rem] md:w-[56rem] md:h-[56rem] rounded-full border border-white/25" />

      <div className="relative">
        <Reveal>
          <span className="block text-8xl leading-none" style={{ fontFamily: 'var(--font-heading)' }} aria-hidden="true">“</span>
        </Reveal>
        <Reveal delay={0.1} className="md:ml-[12%] max-w-4xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight">Quanto da sua rotina já estava desenhado na planta?</h2>
          <div className="mt-10 h-px w-24 bg-white/50" />
          <p className="mt-8 text-base md:text-lg font-light leading-relaxed text-white/90">
            Antes mesmo de uma rotina acontecer, o espaço já oferece caminhos, limites e possibilidades.
          </p>
          <p className="mt-4 text-base md:text-lg font-light leading-relaxed text-white/90">
            A luz que entra, a circulação entre os ambientes, os materiais e a maneira como percebemos cada detalhe influenciam nossa experiência cotidiana.
          </p>
          <p className="mt-4 text-base md:text-lg font-light leading-relaxed text-white/90">
            Aqui exploramos as conexões entre arquitetura, neurociência, comportamento e design de interiores. Ideias e descobertas para quem deseja viver melhor, transformar ambientes ou investir com mais inteligência.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block rounded-full bg-white px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase text-[var(--color-primary)] no-underline"
            >
              Fale com o Studio
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
