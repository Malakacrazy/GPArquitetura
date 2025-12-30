import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function WorkWithUs() {
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (value: string) => {
    return value.includes('@') && value.includes('.');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value.length > 0) {
      setShowError(!validateEmail(value));
    } else {
      setShowError(false);
    }
  };

  const handleSignUp = () => {
    if (validateEmail(email)) {
      setShowSuccess(true);
      setEmail('');
      setShowError(false);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      setShowError(true);
    }
  };

  const isInvalid = showError && email.length > 0;

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
              <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-primary)] font-bold uppercase">Careers</span>
              <h6 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[var(--color-text-dark)] font-light leading-[1.1]">
                We're always looking for talented individuals who are passionate about architecture and design.
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
                Get notified when a new <span className="underline">job gets posted</span>
              </h6>
              <div className="mb-3 md:mb-4">
                <div className="flex gap-2 md:gap-3">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`flex-1 min-w-0 px-3 py-2 md:px-4 md:py-3 border-none rounded bg-white/50 text-[var(--color-text-dark)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 text-lg ${
                      isInvalid ? 'ring-1 ring-red-500 focus:ring-red-500' : 'focus:ring-[var(--color-primary)]'
                    }`}
                  />
                  <button
                    className="px-4 py-2 md:px-6 md:py-3 bg-white/80 hover:bg-[var(--color-accent)] text-[var(--color-text-dark)] hover:text-white transition-colors duration-300 rounded uppercase tracking-wider text-sm md:text-lg whitespace-nowrap"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </button>
                </div>
                {isInvalid && (
                  <p className="text-xs text-red-500 mt-1">
                    Please enter a valid email address
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
                        Successfully signed up! We'll notify you when the time comes.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="text-xs text-white/70">
                By signing up, you consent to receive marketing emails from <h1 className="inline text-xs">Giulia Parente</h1> and agree to our <a href="https://exact-black-41882768.figma.site" className="underline hover:text-white transition-colors">Privacy Policy</a>.
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
                At our studio, we foster a collaborative environment where ideas flourish and every team member has the opportunity to make a meaningful impact. We believe in investing in our people through continuous learning, mentorship, and career development.
              </motion.p>
              <motion.p 
                className="text-xl md:text-2xl" 
                style={{ color: 'var(--color-text-dark)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                There are no roles open at this time.
              </motion.p> 
              <motion.p 
                className="text-base md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              >
                We're always interested in meeting talented professionals. Send us your portfolio and resume, and we'll keep you in mind for future opportunities.
              </motion.p>
            </div>
          </div>
      </div>
    </section>
  );
}