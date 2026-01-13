/**
 * FAQ Component (Portfolio 3D)
 *
 * Comprehensive FAQ section with category filtering. Covers all aspects
 * of 3D visualization services including pricing, turnaround, and process.
 *
 * @module components/portfolio3d/FAQ
 * @since 1.0.1
 *
 * Categories:
 * - Common Questions (general inquiries)
 * - Interior/Exterior Rendering
 * - Architecture Animation
 * - Virtual Tour
 * - Product & Brand Visualization
 *
 * Layout:
 * - 2-column grid: Categories | Accordion
 * - Category buttons with active state styling
 * - Collapsible accordion items
 *
 * Animation:
 * - Category slide-in from left
 * - FAQ items staggered entrance (0.08s delay)
 * - Smooth category switching with AnimatePresence
 *
 * Styling:
 * - Rounded category buttons with hover states
 * - Blurred backdrop on accordion items
 * - Responsive grid (stacked on mobile)
 *
 * @example
 * ```tsx
 * <FAQ />
 * ```
 */
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { categories, faqs } from "../../config/faq";

export function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredFaqs = faqs.filter(faq => faq.category === selectedCategory);

  return (
    <section className="bg-[var(--color-background)] text-[var(--color-text-dark)] px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16 overflow-hidden">
      <div className="mx-auto relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {/* Left Column - Title and Categories */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-[var(--color-text-dark)] mb-6 md:mb-8 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight">
              FAQ
            </h2>

            {/* Category Buttons - Responsive Grid on mobile, vertical on desktop */}
            <div className="grid grid-cols-1 md:flex md:flex-row lg:flex-col gap-2 md:gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-5 lg:px-6 py-2.5 md:py-3 rounded-full text-center lg:text-left transition-all duration-300 text-sm md:text-base font-medium h-auto whitespace-normal leading-tight ${selectedCategory === category
                    ? "bg-[var(--color-primary)] text-white shadow-lg"
                    : "bg-transparent text-[var(--color-text-dark)]/60 hover:text-[var(--color-text-dark)] hover:bg-[var(--color-text-dark)]/5 border border-[var(--color-text-dark)]/20"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Column - FAQ Accordion */}
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3 md:space-y-4"
                >
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={`${selectedCategory}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.08,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        className="border border-[var(--color-text-dark)]/10 rounded-xl bg-[var(--color-text-dark)]/5 backdrop-blur-sm overflow-hidden hover:bg-[var(--color-text-dark)]/10 transition-colors duration-300"
                      >
                        <AccordionTrigger className="text-[var(--color-text-dark)] hover:text-[var(--color-text-dark)] px-4 md:px-5 lg:px-6 py-4 md:py-5 text-left hover:no-underline group">
                          <span className="flex items-center justify-between w-full gap-3 md:gap-4">
                            <span className="text-sm md:text-base lg:text-lg font-medium leading-snug">{faq.question}</span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-[var(--color-text-dark)]/70 px-4 md:px-5 lg:px-6 pb-4 md:pb-5 text-sm md:text-base leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}