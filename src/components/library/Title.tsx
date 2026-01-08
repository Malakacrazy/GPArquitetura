/**
 * Title Component (Library)
 *
 * Page header for the library section displaying "Inspirações" label.
 *
 * @module components/library/Title
 * @since 1.0.0
 *
 * Layout:
 * - Full-width with horizontal padding
 * - Top padding only (content follows below)
 * - Background matches page color
 *
 * Animation:
 * - Reveal fade from right
 * - 800ms duration
 *
 * @example
 * ```tsx
 * <Title />
 * ```
 */
import { Reveal } from '../shared/Reveal';

/**
 * Renders the library page title section
 *
 * @returns Title section JSX element
 */
export function Title() {
  return (
    <section className="pt-8 md:pt-12 lg:pt-16 px-6 md:px-12 lg:px-16 xl:px-20" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="flex justify-between items-start">
        <Reveal variant="fadeRight" duration={0.8}>
          <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-primary)] mb-4 md:mb-6 font-bold uppercase">Inspirações</span>
        </Reveal>
      </div>
    </section>
  );
}