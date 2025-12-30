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
            Our architecture firm is dedicated to creating innovative and sustainable spaces that enhance the way people live, work, and interact. With over a decade of experience, we've established ourselves as leaders in contemporary design, blending functionality with aesthetic excellence.
          </motion.p>
          <motion.p 
            className=""
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            We believe that great architecture goes beyond just buildings—it's about creating experiences and environments that inspire. Our approach combines cutting-edge design techniques with timeless principles, ensuring that every project we undertake is both beautiful and practical.
          </motion.p>
          <motion.p 
            className=""
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            From residential homes to commercial complexes, our portfolio showcases a diverse range of projects that reflect our commitment to quality, innovation, and client satisfaction. We work closely with our clients to understand their vision and bring it to life through thoughtful, creative design solutions.
          </motion.p>
        </div>
      </div>
    </section>
  );
}