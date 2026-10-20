/**
 * HowItWorks Component (Portfolio 3D)
 *
 * Process explanation section showing the 5-step 3D visualization workflow.
 * Displays the complete production process from initial data collection to final delivery.
 *
 * @module components/portfolio3d/HowItWorks
 * @since 1.0.1
 *
 * Process Steps:
 * 1. Levantamento de Dados Técnicos (Technical Data Collection)
 *    - Client submits technical materials (plans, sections, facades, specifications)
 *    - Thorough review to ensure completeness before production
 * 2. Modelagem 3D (3D Modeling)
 *    - Create 3D volumetry based on technical documentation
 *    - Timeline alignment and volume approval before advancing
 * 3. Primeira Versão (First Draft)
 *    - Initial scene composition and lighting setup
 *    - Framing and atmosphere definition
 * 4. Segunda Versão (Second Draft)
 *    - Detailed preview with enhanced lighting, textures, furniture
 *    - Addition of decorative elements and exterior scenery
 * 5. Versão Final (Final Version)
 *    - Implementation of client feedback and adjustments
 *    - Final render files prepared for delivery
 *
 * Layout:
 * - Alternating image/text layout (zigzag pattern)
 * - Step numbers styled in primary color
 * - Images with 21:9 aspect ratio for cinematic effect
 * - Responsive grid that stacks on mobile
 *
 * Animation:
 * - Text slides in from left/right based on step index (alternating)
 * - Images scale up on viewport entry
 * - Staggered entrance with viewport trigger
 *
 * @example
 * ```tsx
 * <HowItWorks />
 * ```
 */
import { m as motion } from "motion/react";
import { images } from "../../config/assets";

/**
 * Renders the process explanation section for 3D visualization services
 *
 * @returns How it works section JSX element
 */
export function HowItWorks() {
  return (
    <section className="bg-[var(--color-background)] text-[var(--color-text-dark)] px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16 overflow-hidden">
      <div className="mx-auto relative w-full">
        <span className="block text-xs font-medium tracking-[0.2em] text-[var(--color-primary)] mb-4 md:mb-6 uppercase">Como Funciona</span>
        <h2 className="heading-sub text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] mb-8 md:mb-12">
          Da primeira informação à imagem final, cada etapa importa.
        </h2>

        <div className="flex flex-col gap-12 md:gap-20">
          {[
            {
              title: "Levantamento de Dados Técnicos",
              description: "Recebemos plantas, cortes, fachadas, especificações e referências do projeto. Analisamos a documentação para identificar as informações necessárias à modelagem e esclarecer dúvidas antes da produção.",
              image: images.portfolio3d.howItWorks.technicalSpec
            },
            {
              title: "Modelagem 3D",
              description: "Construímos a volumetria tridimensional com base nos arquivos fornecidos. A representação inicial permite avaliar proporções e configurações espaciais antes das imagens finais.",
              image: images.portfolio3d.howItWorks.workProcess
            },
            {
              title: "Primeira Versão",
              description: "Desenvolvemos enquadramentos e iluminação preliminar, organizando as cenas para apresentar a composição e orientar os primeiros ajustes.",
              image: images.portfolio3d.howItWorks.preview1
            },
            {
              title: "Segunda Versão",
              description: "Com as definições anteriores alinhadas, refinamos materiais, texturas, luz e elementos previstos na documentação. A representação ganha o detalhamento necessário à leitura do projeto.",
              image: images.portfolio3d.howItWorks.preview2
            },
            {
              title: "Versão Final",
              description: "Concluímos os ajustes acordados e finalizamos a renderização, preparando os arquivos nos formatos e nas condições estabelecidos na contratação.",
              image: images.portfolio3d.howItWorks.finalRenders
            }
          ].map((step, index) => (
            <div key={index} className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Text Content */}
              <motion.div 
                className="w-full lg:flex-[2] space-y-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-normal uppercase tracking-wide text-[var(--color-text-dark)] flex flex-row items-baseline gap-2 md:gap-4">
                  <span className="text-[var(--color-primary)] font-medium text-lg md:text-2xl">
                    0{index + 1}
                  </span>
                  <span>
                    {step.title}
                  </span>
                </h3>

                <p className="text-base md:text-lg lg:text-xl text-[var(--color-text-dark)]/70 leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </motion.div>

              {/* Image */}
              <motion.div 
                className="w-full lg:flex-[3]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}