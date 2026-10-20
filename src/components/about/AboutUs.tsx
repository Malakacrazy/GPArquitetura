/**
 * AboutUs Component
 *
 * Three-paragraph narrative section explaining the studio's origin,
 * philosophy, and approach to emotional architecture design.
 *
 * @module components/about/AboutUs
 * @since 1.0.0
 *
 * Content Structure:
 * 1. Origin story - addressing modern compact apartment challenges
 * 2. Focus - neuroarchitecture and emotional experience
 * 3. Essence - transforming spaces into emotional sanctuaries
 *
 * Animation:
 * - Each paragraph fades in and slides up on scroll
 * - Staggered delays (0, 0.2s, 0.4s)
 * - Triggers when 100px before viewport
 *
 * @example
 * ```tsx
 * <AboutUs />
 * ```
 */
import { motion } from 'framer-motion';

/**
 * Renders the About Us narrative section
 *
 * @returns About us content JSX element
 */
export function AboutUs() {
  return (
    <section className="bg-[var(--color-background)] text-[var(--color-text-muted)] px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-0 md:pt-8 lg:pt-12 xl:pt-16 pb-0 md:-mb-6">
      <div className="relative mx-auto w-full">
        <div className="text-base md:text-lg font-light space-y-6 md:space-y-8 leading-relaxed text-justify">
          <motion.p 
            className=""
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            A maneira como habitamos e utilizamos os imóveis está em constante mudança. Apartamentos compactos exigem soluções inteligentes. Novas rotinas transformam a relação com a casa. E unidades destinadas à locação precisam conciliar atratividade, funcionalidade e escolhas adequadas ao investimento. A arquitetura encontra, nesse cenário, a oportunidade de criar respostas que vão além da aparência.
          </motion.p>
          <motion.p 
            className=""
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Para nós, projetar começa pela compreensão do contexto. A luz que atravessa o ambiente, os caminhos que percorremos, as proporções, os materiais e os hábitos cotidianos revelam necessidades que nem sempre estão evidentes na primeira conversa. É dessa leitura que nasce uma direção capaz de unir técnica e identidade.
          </motion.p>
          <motion.p 
            className=""
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            Nossa atuação parte do encontro entre sensibilidade e estrutura. Em cada proposta, investigamos as condições do imóvel e seus objetivos para desenvolver soluções coerentes com a finalidade, o orçamento previsto e as pessoas que irão utilizá-lo. Seja uma residência ou uma unidade voltada ao mercado imobiliário, cada decisão precisa encontrar sua razão de existir.
          </motion.p>
          <motion.p
            className=""
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
            O Studio Araci nasceu da trajetória de Giulia Parente e de seu desejo de exercer uma arquitetura mais atenta à relação entre pessoas e ambientes. O nome carrega a imagem da aurora, o instante em que a luz começa a revelar novas possibilidades. Essa ideia acompanha nossa forma de criar: observar antes de intervir, compreender antes de desenhar e encontrar beleza naquilo que faz sentido.
          </motion.p>
        </div>
      </div>
    </section>
  );
}