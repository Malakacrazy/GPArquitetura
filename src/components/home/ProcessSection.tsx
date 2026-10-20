/**
 * ProcessSection Component
 *
 * Six-step process overview explaining the studio's architectural workflow.
 * Features numbered cards with hover animations on a warm primary background.
 *
 * @module components/home/ProcessSection
 * @since 1.0.0
 *
 * Process Steps:
 * 1. Briefing Emocional - Initial client consultation
 * 2. Levantamento in loco - On-site property assessment
 * 3. Estudo Preliminar - Preliminary design study
 * 4. Anteprojeto - Technical specifications
 * 5. Pré-executivo - Final review and material lists
 * 6. Executivo & Obras - Construction documents
 *
 * Animation:
 * - Staggered reveal animations (0.1s delay per card)
 * - Hover effects: border highlight, number lift, text color change
 *
 * Layout:
 * - 3-column grid on large screens
 * - 2-column on medium
 * - Single column on mobile
 *
 * @example
 * ```tsx
 * <ProcessSection />
 * ```
 */
import { Reveal } from '../shared/Reveal';

/**
 * Renders the six-step design process section
 *
 * @returns Process section JSX element
 */
export function ProcessSection() {
  return (
    <section className="bg-[var(--color-primary)] text-white px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16 overflow-hidden">
      <div className="mx-auto relative w-full">
          {/* Header */}
          <div className="mb-8 md:mb-12 lg:mb-16 max-w-4xl">
            <Reveal>
              <span className="text-xs font-medium tracking-[0.2em] text-white mb-4 md:mb-6 uppercase">Processos</span>
              <h2 className="heading-sub text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1]">
                Um bom projeto não começa pela obra. Começa pelas decisões certas.
              </h2>
              <p className="mt-4 md:mt-6 text-base md:text-lg font-light text-white/80 max-w-3xl">
                Antes de definir formas e acabamentos, compreendemos o contexto. Nosso processo organiza cada escolha, da primeira conversa ao detalhamento técnico, com critério e coerência.
              </p>
            </Reveal>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-10 lg:gap-x-12 gap-y-10 md:gap-y-12">
            {/* Step 1 */}
            <Reveal delay={0.1} className="group">
              <div className="border-t border-white/20 pt-6 md:pt-8 transition-all duration-700 group-hover:border-[var(--color-accent)]">
                <div className="mb-4 md:mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-thin text-white/20 transition-colors duration-700 group-hover:text-[var(--color-accent)] select-none">(01)</span>
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Briefing Emocional</span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  Escutamos o cliente e identificamos prioridades, expectativas e necessidades. Consideramos a finalidade do imóvel, seu perfil de ocupação e o que cada ambiente precisa oferecer.
                </p>
              </div>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={0.2} className="group">
              <div className="border-t border-white/20 pt-6 md:pt-8 transition-all duration-700 group-hover:border-[var(--color-accent)]">
                <div className="mb-4 md:mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-thin text-white/20 transition-colors duration-700 group-hover:text-[var(--color-accent)] select-none">(02)</span>
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Levantamento no local</span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  Analisamos medidas, instalações e características arquitetônicas. Reconhecemos limitações, oportunidades de aproveitamento e pontos que exigem atenção.
                </p>
              </div>
            </Reveal>

            {/* Step 3 */}
            <Reveal delay={0.3} className="group">
              <div className="border-t border-white/20 pt-6 md:pt-8 transition-all duration-700 group-hover:border-[var(--color-accent)]">
                <div className="mb-4 md:mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-thin text-white/20 transition-colors duration-700 group-hover:text-[var(--color-accent)] select-none">(03)</span>
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Estudo Preliminar</span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  Investigamos soluções de layout, circulação, materiais e iluminação. As primeiras definições estabelecem a direção conceitual e orientam o desenvolvimento.
                </p>
              </div>
            </Reveal>

            {/* Step 4 */}
            <Reveal delay={0.4} className="group">
              <div className="border-t border-white/20 pt-6 md:pt-8 transition-all duration-700 group-hover:border-[var(--color-accent)]">
                <div className="mb-4 md:mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-thin text-white/20 transition-colors duration-700 group-hover:text-[var(--color-accent)] select-none">(04)</span>
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Anteprojeto</span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  Refinamos a organização dos ambientes e as principais escolhas estéticas e funcionais, aproximando o desenho dos objetivos identificados.
                </p>
              </div>
            </Reveal>

            {/* Step 5 */}
            <Reveal delay={0.5} className="group">
              <div className="border-t border-white/20 pt-6 md:pt-8 transition-all duration-700 group-hover:border-[var(--color-accent)]">
                <div className="mb-4 md:mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-thin text-white/20 transition-colors duration-700 group-hover:text-[var(--color-accent)] select-none">(05)</span>
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Pré-executivo</span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  Consolidamos especificações de acabamentos, mobiliário, marcenaria, marmoraria e demais componentes previstos, preparando as informações para o detalhamento técnico.
                </p>
              </div>
            </Reveal>

            {/* Step 6 */}
            <Reveal delay={0.6} className="group">
              <div className="border-t border-white/20 pt-6 md:pt-8 transition-all duration-700 group-hover:border-[var(--color-accent)]">
                <div className="mb-4 md:mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-thin text-white/20 transition-colors duration-700 group-hover:text-[var(--color-accent)] select-none">(06)</span>
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Executivo e Obras</span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  Reunimos desenhos, vistas e orientações para a execução do projeto pelos profissionais responsáveis, conforme os serviços e responsabilidades contratados.
                </p>
              </div>
            </Reveal>
          </div>
      </div>
    </section>
  );
}