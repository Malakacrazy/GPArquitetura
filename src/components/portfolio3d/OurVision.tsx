import { motion } from 'framer-motion';

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
            <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)] mb-4 md:mb-6 uppercase">Visão</span>
            <h6 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] w-full text-white">
              A visualização arquitetônica, para nós, vai além da representação estética. É uma ferramenta de narrativa, capaz de traduzir conceitos, sensações e intenções do projeto antes mesmo de ele se tornar físico. Por meio de imagens cuidadosamente construídas, buscamos despertar emoções, facilitar a compreensão dos espaços e criar uma conexão genuína entre o cliente e o ambiente que está por vir.
            </h6>
          </motion.div>
      </div>
    </section>
  );
}