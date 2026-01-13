/**
 * WorkWithUs Component
 *
 * Careers section with job notification signup form and studio culture
 * description. Allows visitors to subscribe for job opening notifications.
 *
 * @module components/about/WorkWithUs
 * @since 1.0.0
 *
 * Features:
 * - Email subscription form with validation
 * - Real-time email validation feedback
 * - Success message with animated checkmark
 * - Privacy policy link and consent text
 * - Responsive two-column layout
 *
 * Form States:
 * - Empty: No validation messages
 * - Invalid: Red ring and error message
 * - Success: Green checkmark with confirmation
 * - Auto-clear success after 3 seconds
 *
 * Animation:
 * - Form slides in from right
 * - Text content slides in from left
 * - Success message animates in/out
 *
 * @example
 * ```tsx
 * <WorkWithUs />
 * ```
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**
 * Zod validation schema for the newsletter signup form
 */
const newsletterSchema = z.object({
  email: z.string().email('Por favor, insira um endereço de e-mail válido').min(1, 'Email é obrigatório')
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

/**
 * Renders the careers/work with us section
 *
 * @returns Work with us section JSX element
 */
export function WorkWithUs() {
  const [showSuccess, setShowSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    mode: 'onChange',
    defaultValues: {
      email: ''
    }
  });

  const email = watch('email');

  const onSubmit = (data: NewsletterFormData) => {
    console.log('Newsletter signup:', data);
    // TODO: Add API call to subscribe to newsletter
    setShowSuccess(true);
    reset();
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const isInvalid = errors.email && email.length > 0;

  return (
    <section className="bg-[var(--color-background)] px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16">
      <div className="relative w-full mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-12 lg:gap-16 mb-6 md:mb-8 lg:mb-12">
            <motion.div 
              className="max-w-4xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-primary)] font-bold uppercase">Trabalhe Conosco</span>
              <h6 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[var(--color-text-dark)] font-light leading-[1.1]">
                Estamos sempre em busca de profissionais talentosos e apaixonados por arquitetura e design.
              </h6>
            </motion.div>
            
            {/* Newsletter Signup */}
            <motion.div 
              className="lg:flex-1 p-6 md:p-8 lg:p-10 rounded-lg" 
              style={{ backgroundColor: 'var(--color-primary)' }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <h6 className="mb-4 md:mb-6 text-white text-base md:text-lg">
                Seja notificado quando uma nova <span className="underline">vaga for publicada</span>
              </h6>
              <form onSubmit={handleSubmit(onSubmit)} className="mb-3 md:mb-4">
                <div className="flex gap-2 md:gap-3">
                  <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                    className={`flex-1 min-w-0 px-3 py-2 md:px-4 md:py-3 border-none rounded bg-white/50 text-[var(--color-text-dark)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 text-lg ${
                      isInvalid ? 'ring-1 ring-red-500 focus:ring-red-500' : 'focus:ring-[var(--color-primary)]'
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 md:px-6 md:py-3 bg-white/80 hover:bg-[var(--color-accent)] text-[var(--color-text-dark)] hover:text-white transition-colors duration-300 rounded uppercase tracking-wider text-sm md:text-lg whitespace-nowrap"
                  >
                    Inscreva-se
                  </button>
                </div>
                {isInvalid && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email?.message}
                  </p>
                )}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div 
                      className="flex items-center gap-2 mt-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </motion.div>
                      <p className="text-xs text-green-400">
                        Inscrição bem-sucedida. Entraremos em contato quando chegar a sua hora.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
              <div className="text-xs text-white/70">
                Ao se inscrever, você concorda em receber e-mails de marketing da <h1 className="inline text-xs">Giulia Parente Arquitetura</h1> e concorda com nossa <a href="/privacy" className="underline hover:text-white transition-colors">Política de Privacidade</a>.
              </div>
            </motion.div>
          </div>
          
          <div className="md:col-span-9">
            <div className="space-y-6 md:space-y-8 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              <motion.p 
                className="text-base md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Em nosso estúdio, promovemos um ambiente colaborativo onde as ideias florescem e cada membro da equipe tem a oportunidade de causar um impacto significativo. Acreditamos no investimento em nosso pessoal por meio de aprendizado contínuo, orientação e desenvolvimento de carreira.
              </motion.p>
              <motion.p 
                className="text-xl md:text-2xl" 
                style={{ color: 'var(--color-text-dark)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                Não há vagas disponíveis no momento.
              </motion.p> 
              <motion.p 
                className="text-base md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              >
                Estamos sempre interessados em conhecer profissionais talentosos. Envie-nos seu portfólio e currículo, e o manteremos em consideração para oportunidades futuras.
              </motion.p>
            </div>
          </div>
      </div>
    </section>
  );
}