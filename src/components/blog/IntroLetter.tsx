import { Reveal } from '../shared/Reveal';
import { images } from '../../config/assets';

/** Editorial intro: static copy, edit here */
export function IntroLetter() {
  return (
    <section className="bg-white px-6 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 lg:py-28">
      <div className="grid lg:grid-cols-[1fr_3fr_1.4fr] gap-10 lg:gap-12 items-center">
        <Reveal>
          <span className="text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)]">O olhar da Studio</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-[var(--color-text-dark)] max-w-3xl">
            Projetar é escutar o que o espaço pode despertar em quem vive nele.
          </h2>
          <p className="mt-8 border-l border-[var(--color-primary)] pl-6 max-w-2xl text-base md:text-lg font-light leading-relaxed text-[var(--color-text-muted)]">
            Aqui compartilhamos processos, referências e bastidores da arquitetura emocional.
            Uma leitura calma para quem está pensando na própria casa.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="hidden lg:block">
          <img
            src={images.home.projects.interior}
            alt=""
            loading="lazy"
            className="aspect-[4/5] w-full rotate-2 object-cover rounded-[16px] rounded-tr-[100px] shadow-[0_20px_40px_-20px_rgba(44,48,56,0.35)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
