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
            <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)] mb-4 md:mb-6 uppercase">Our Vision</span>
            <h6 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] w-full text-white">
              We admire a future where businesses connect with customers in immersive, interactive virtual showrooms—experiences that go beyond reality and redefine engagement. This is the new frontier of digital transformation, and we’re building it today.
            </h6>
          </motion.div>
      </div>
    </section>
  );
}