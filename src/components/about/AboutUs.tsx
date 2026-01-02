import { motion } from 'framer-motion';

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
            Com a mudança no sistema imobiliário brasileiro dos últimos anos, existe uma grande oferta de apartamentos compactos que necessitam de inteligência projetual, funcionalidade e sensibilidade emocional. O Studio Giulia Parente surgiu da necessidade de resolver as dores dos espaços contemporâneos, como a sensação de que “minha casa não me acolhe”. Esse incômodo é resultado de anos de desconforto silencioso, rotinas frustrantes e sensação de que algo está errado, sem saber o que é. Nosso objetivo é transformar a relação das pessoas com o espaço, se utilizando dos princípios da estética emocional brasileira (incorporação da nossa luz tropical, nossa cultura de acolhimento e nossa maneira única de habitar espaços).
          </motion.p>
          <motion.p 
            className=""
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            O foco do Studio Giulia Parente é a neuroarquitetura e a experiência emocional profunda. Nosso processo prioriza sensações, bem-estar e a maneira como as pessoas vivem em seus espaços. Criamos espaços que abraçam e confortam, que reduzem a ansiedade, estimulando a reconexão com os ciclos naturais e se utilizando de funcionalidades que facilitam o dia a dia, promovemos a saúde mental integrada ao espaço, explorando a sensação de “este lugar é meu”.
          </motion.p>
          <motion.p 
            className=""
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            Buscamos entender como as pessoas escolhem os espaços, como se sentem em cada ambiente e como se relacionam com ele. A essência do Studio Giulia Parente reside na sua capacidade de ir além do design, tocando as emoções e a vida de quem habita os espaços que projetamos. Com isso,  transformamos espaços em santuários de emoções, onde cada detalhe é uma homenagem ao seu bem-estar, família e sua história. Sentir a diferença é viver onde você se sente em casa.
          </motion.p>
        </div>
      </div>
    </section>
  );
}