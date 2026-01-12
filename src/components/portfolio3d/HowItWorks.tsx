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
import { motion } from "motion/react";
import { images } from "../../config/assets";

/**
 * Renders the process explanation and quote request section
 *
 * @returns How it works section JSX element
 */
export function HowItWorks() {
  return (
    <section className="bg-[var(--color-background)] text-[var(--color-text-dark)] px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16 overflow-hidden">
      <div className="mx-auto relative w-full">
        <span className="block text-xs font-medium tracking-[0.2em] text-[var(--color-primary)] mb-4 md:mb-6 uppercase">Como Funciona</span>

        <div className="flex flex-col gap-12 md:gap-20">
          {[
            {
              title: "Levantamento de Dados Técnicos",
              description: "O processo tem início com o envio, por parte do cliente, de todo o material técnico necessário para a construção da modelagem 3D — como plantas, cortes, fachadas e lista de especificações. Realizamos a leitura criteriosa desses documentos para garantir que todas as informações estejam completas e alinhadas antes do início da produção.",
              image: images.portfolio3d.howItWorks.technicalSpec
            },
            {
              title: "Modelagem 3D",
              description: "Após o entendimento aprofundado do projeto, iniciamos a criação da volumetria em 3D. Nesta etapa, alinhamos prazos e apresentamos o modelo para revisão, assegurando que o volume esteja aprovado antes de avançarmos para a produção das imagens, animações ou experiências imersivas.",
              image: images.portfolio3d.howItWorks.workProcess
            },
            {
              title: "Primeira Versão",
              description: "Com a volumetria validada, seguimos para a composição das cenas e da iluminação inicial, definindo enquadramentos e atmosferas que darão forma ao produto final.",
              image: images.portfolio3d.howItWorks.preview1
            },
            {
              title: "Segunda Versão",
              description: "A partir da aprovação da etapa anterior, desenvolvemos uma nova prévia com maior nível de detalhamento, incorporando ajustes de iluminação, texturas, mobiliário, elementos decorativos e, quando aplicável, o cenário externo.",
              image: images.portfolio3d.howItWorks.preview2
            },
            {
              title: "Versão Final",
              description: "Após a implementação dos comentários e ajustes solicitados pelo cliente, apresentamos a versão final do projeto, com os arquivos renderizados e preparados para entrega, prontos para uso em apresentações ou materiais de comunicação.",
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