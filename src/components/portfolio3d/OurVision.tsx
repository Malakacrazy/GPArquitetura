/**
 * OurVision Component (Portfolio 3D)
 *
 * Vision statement section displaying the studio's philosophy on
 * architectural visualization as a storytelling tool.
 *
 * @module components/portfolio3d/OurVision
 * @since 1.0.0
 *
 * Layout:
 * - Full-width primary background color
 * - Right-aligned text content
 * - Large typography for statement
 *
 * Content:
 * - "Visão" label in accent color
 * - Long-form philosophy statement
 * - Emphasis on emotion and narrative
 *
 * Animation:
 * - Fade up on viewport entry
 * - 600ms duration with easeOut
 *
 * @example
 * ```tsx
 * <OurVision />
 * ```
 */
import { motion } from 'framer-motion';

/**
 * Renders the vision statement section
 *
 * @returns Vision section JSX element
 */
export function OurVision() {
  return (
    <section className="bg-[var(--color-primary)] text-white px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16 overflow-hidden">
      <div className="mx-auto relative w-full text-right">
          {/* Header */}
          <motion.div 
            className=""
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-xs font-medium tracking-[0.2em] text-white mb-4 md:mb-6 uppercase">Visão</span>
            <h2 className="heading-sub text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] w-full text-white">
              Não basta mostrar como será. É preciso comunicar o que foi pensado.
            </h2>
            <p className="mt-4 md:mt-6 ml-auto max-w-3xl text-base md:text-lg font-light text-white/80">
              A visualização arquitetônica torna o projeto mais tangível. Cada enquadramento ajuda a apresentar relações espaciais, escolhas estéticas e características dos ambientes antes da execução. Para clientes, arquitetos e investidores, é uma ferramenta para avaliar possibilidades, alinhar expectativas e comunicar propostas com maior precisão.
            </p>
          </motion.div>
      </div>
    </section>
  );
}