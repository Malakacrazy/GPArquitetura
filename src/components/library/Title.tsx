import { Reveal } from '../shared/Reveal';

export function Title() {
  return (
    <section className="pt-8 md:pt-12 lg:pt-16 px-6 md:px-12 lg:px-16 xl:px-20" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="flex justify-between items-start">
        <Reveal variant="fadeRight" duration={0.8}>
          <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-primary)] mb-4 md:mb-6 font-bold uppercase">Library</span>
        </Reveal>
      </div>
    </section>
  );
}