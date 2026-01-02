import { Reveal } from '../shared/Reveal';

export function ProcessSection() {
  return (
    <section className="bg-[var(--color-primary)] text-white px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16 overflow-hidden">
      <div className="mx-auto relative w-full">
          {/* Header */}
          <div className="mb-8 md:mb-12 lg:mb-16 max-w-4xl">
            <Reveal>
              <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)] mb-4 md:mb-6 uppercase">Processos</span>
              <h6 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1]">
                Entregamos projetos arquitetônicos emocionais e criativos para o seu projeto.
              </h6>
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
                  Primeiro contato com o cliente. Através da escuta profunda coletamos o máximo de informações para entender as dores, os desejos e a personalidade. Com isso, conseguimos mapear sua rotina, suas necessidades emocionais e seu estilo de vida.
                </p>
              </div>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={0.2} className="group">
              <div className="border-t border-white/20 pt-6 md:pt-8 transition-all duration-700 group-hover:border-[var(--color-accent)]">
                <div className="mb-4 md:mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-thin text-white/20 transition-colors duration-700 group-hover:text-[var(--color-accent)] select-none">(02)</span>
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Levantamento <span className= "italic">in loco</span></span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  Visita ao imóvel que receberá a transformação, levantando seus potenciais e pontos de atenção. Com o levantamento conseguimos compreender visualmente o que o espaço pode receber e como se adequará as necessidades levantadas durante o Briefing.
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
                  Nesta etapa damos início ao processo criativo do projeto, focando no visual e os serviços que deverão ser realizados. Aqui escolhemos os tipos de materiais, layout e iluminação básica.
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
                  Seguimos para a etapa mais técnica onde focamos na especificação de materiais, detalhamento de ambientes e escopo de projeto.
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
                  Últimas revisões do projeto, onde todos os materiais estão especificados e separados em um lista detalhada de acabamentos, móveis soltos, marcenaria, equipamentos e marmoraria.
                </p>
              </div>
            </Reveal>

            {/* Step 6 */}
            <Reveal delay={0.6} className="group">
              <div className="border-t border-white/20 pt-6 md:pt-8 transition-all duration-700 group-hover:border-[var(--color-accent)]">
                <div className="mb-4 md:mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-thin text-white/20 transition-colors duration-700 group-hover:text-[var(--color-accent)] select-none">(06)</span>
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Executivo & Obras</span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  Versão final do projeto contemplando todos os desenhos técnicos, imagens, vistas detalhadas para que os profissionais contratados para os serviços possam seguir durante a obra.
                </p>
              </div>
            </Reveal>
          </div>
      </div>
    </section>
  );
}