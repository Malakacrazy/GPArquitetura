import { Reveal } from './Reveal';

export function ProcessSection() {
  return (
    <section className="bg-[var(--color-primary)] text-white px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-6 md:py-8 lg:py-12 xl:py-16 2xl:py-20 overflow-hidden">
      <div className="mx-auto relative w-full">
          {/* Header */}
          <div className="mb-8 md:mb-12 lg:mb-16 max-w-4xl">
            <Reveal>
              <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)] mb-4 md:mb-6 uppercase">Process of Work</span>
              <h6 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light leading-[1.1]">
                We provide brilliant ideas and architectural designs for your project.
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
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Sketch Design</span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  We kick off with a site visit and creative consultation to define your vision, style, and functional needs. We'll also uncover new opportunities and potential limitations. Based on this, we craft a series of hand-drawn design sketches to provide an initial visual concept that reflects your brief. Through collaboration and refinement, we shape the concept to align with your goals, timeline, and budget.
                </p>
              </div>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={0.2} className="group">
              <div className="border-t border-white/20 pt-6 md:pt-8 transition-all duration-700 group-hover:border-[var(--color-accent)]">
                <div className="mb-4 md:mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-thin text-white/20 transition-colors duration-700 group-hover:text-[var(--color-accent)] select-none">(02)</span>
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Design Development</span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  Here we take the initial sketches and fill in all the glorious details, including building material selections, inside-to-outside interfaces, floor plans, layouts, indicative joinery design and spatial flow. Our team will craft detailed digital 2D drawings and a 3D model that bring the look, feel and layout of your home to life.
                </p>
              </div>
            </Reveal>

            {/* Step 3 */}
            <Reveal delay={0.3} className="group">
              <div className="border-t border-white/20 pt-6 md:pt-8 transition-all duration-700 group-hover:border-[var(--color-accent)]">
                <div className="mb-4 md:mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-thin text-white/20 transition-colors duration-700 group-hover:text-[var(--color-accent)] select-none">(03)</span>
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Development Application</span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  Not all projects will require a development application with Council. If yours does, we will coordinate the entire process, including sourcing input from Town Planners, gathering documentation and information from consultants, preparing and submitting the application, and managing information requests and follow-ups with Council.
                </p>
              </div>
            </Reveal>

            {/* Step 4 */}
            <Reveal delay={0.4} className="group">
              <div className="border-t border-white/20 pt-6 md:pt-8 transition-all duration-700 group-hover:border-[var(--color-accent)]">
                <div className="mb-4 md:mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-thin text-white/20 transition-colors duration-700 group-hover:text-[var(--color-accent)] select-none">(04)</span>
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Interior Design</span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  Here we craft an interior design concept that creates flow, contrast and balance with the architectural design and overall vision of your home. Our interior design team will develop a 3D model of your home and include all the details from joinery, cabinetry and storage to hard finishes, fixtures and fittings.
                </p>
              </div>
            </Reveal>

            {/* Step 5 */}
            <Reveal delay={0.5} className="group">
              <div className="border-t border-white/20 pt-6 md:pt-8 transition-all duration-700 group-hover:border-[var(--color-accent)]">
                <div className="mb-4 md:mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-thin text-white/20 transition-colors duration-700 group-hover:text-[var(--color-accent)] select-none">(05)</span>
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Building approval plans + documentation</span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  All architectural projects require Building Approval from a private certifier before construction can begin. Our team will advise, guide, coordinate and manage all your building approval plans and applications, including coordinating consultants, creating documentation packages, managing information requests and following up on the progress of requisite approvals.
                </p>
              </div>
            </Reveal>

            {/* Step 6 */}
            <Reveal delay={0.6} className="group">
              <div className="border-t border-white/20 pt-6 md:pt-8 transition-all duration-700 group-hover:border-[var(--color-accent)]">
                <div className="mb-4 md:mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-thin text-white/20 transition-colors duration-700 group-hover:text-[var(--color-accent)] select-none">(06)</span>
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-normal mb-3 md:mb-4 tracking-tight uppercase">Construction plans + documentation</span>
                <p className="text-white/70 leading-relaxed text-base md:text-lg font-light group-hover:text-white transition-colors duration-500 text-justify">
                  With all the design details finalised and building approvals squared away, we turn our attention to creating construction plans, drawings and documents that will guide your builders and tradespeople in bringing the intended designs to life. We'll collaborate and coordinate with the entire team to ensure every element is fully resolved and communicated in detail.
                </p>
              </div>
            </Reveal>
          </div>
      </div>
    </section>
  );
}