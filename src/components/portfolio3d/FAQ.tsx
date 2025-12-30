import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const categories = [
  "COMMON QUESTIONS",
  "INTERIOR/EXTERIOR RENDERING",
  "ARCHITECTURE ANIMATION",
  "VIRTUAL TOUR",
  "PRODUCT & BRAND VISUALIZATION"
];

const faqs = [
  // COMMON QUESTIONS
  {
    category: "COMMON QUESTIONS",
    question: "What services do you offer?",
    answer: "We specialize in high-end 3D visualization services including photorealistic interior and exterior renderings, architectural animations, virtual tours, and product visualization. Our work helps architects, developers, and brands present their projects with cinematic quality and emotional impact."
  },
  {
    category: "COMMON QUESTIONS",
    question: "How much do your services cost?",
    answer: "Pricing depends on several factors including project complexity, number of deliverables, timeline, and whether a 3D model already exists. We provide customized quotes within 24 hours of receiving your project requirements. Contact us for a detailed estimate."
  },
  {
    category: "COMMON QUESTIONS",
    question: "What is your typical turnaround time?",
    answer: "• Still renderings (5-15 images): 3-4 weeks\n• Still renderings (15-20 images): 4-6 weeks\n• Animations and virtual tours: 4-8 weeks\n• Rush services available with additional fees"
  },
  {
    category: "COMMON QUESTIONS",
    question: "What information do I need to provide to get started?",
    answer: "We need:\n\n• Architectural plans, elevations, or sections\n• 3D model (if available) in formats like FBX, SketchUp, Revit, OBJ, or DWG\n• Material and finish specifications\n• Reference images for desired mood and style\n• Camera angles or viewpoints you want\n• Landscape plans (if applicable)\n\nWe'll provide a detailed checklist after you place your order."
  },
  {
    category: "COMMON QUESTIONS",
    question: "What file formats do you work with?",
    answer: "We accept most industry-standard formats including 3ds Max, FBX, SketchUp, Revit, ArchiCAD, IFC, OBJ, and DWG. We primarily work in 3ds Max with Corona or V-Ray renderers."
  },
  {
    category: "COMMON QUESTIONS",
    question: "What are your working hours?",
    answer: "We operate from 9:00 AM to 6:00 PM, Monday through Friday. We're available for international clients across different time zones."
  },
  {
    category: "COMMON QUESTIONS",
    question: "Do you work with international clients?",
    answer: "Absolutely. We work with clients globally including North America, Europe, Middle East, and Asia-Pacific regions."
  },
  {
    category: "COMMON QUESTIONS",
    question: "How do you ensure confidentiality?",
    answer: "We sign NDAs at the start of each project and maintain strict data security protocols. All project files are stored on secure, offline servers and access is tightly controlled."
  },

  // INTERIOR/EXTERIOR RENDERING
  {
    category: "INTERIOR/EXTERIOR RENDERING",
    question: "What's the difference between interior and exterior rendering?",
    answer: "Exterior renderings showcase the building's facade, surroundings, and context within the environment. Interior renderings focus on indoor spaces, highlighting design, layout, furnishings, materials, and spatial relationships."
  },
  {
    category: "INTERIOR/EXTERIOR RENDERING",
    question: "How photorealistic are your renderings?",
    answer: "Our renderings combine technical accuracy with artistic storytelling. We use precise measurements and material specifications while adding atmospheric lighting, composition, and emotion to create compelling visuals that feel authentic and engaging."
  },
  {
    category: "INTERIOR/EXTERIOR RENDERING",
    question: "Can you create renderings if I don't have a 3D model?",
    answer: "Yes. If you don't have a 3D model, we can create one from your architectural drawings. This will add to the timeline and cost, but we'll provide everything needed for stunning final renderings."
  },
  {
    category: "INTERIOR/EXTERIOR RENDERING",
    question: "How many revision rounds are included?",
    answer: "We typically include:\n\n• 2-3 camera angle options per view for selection\n• Two draft revision rounds for feedback and refinements\n• Final high-resolution delivery (5000px)\n\nAdditional revisions beyond this scope may incur extra fees."
  },
  {
    category: "INTERIOR/EXTERIOR RENDERING",
    question: "What resolution are the final renderings?",
    answer: "Final images are delivered in 4K-5K resolution (typically 5000px) as JPEG files. Higher resolutions are available upon request."
  },
  {
    category: "INTERIOR/EXTERIOR RENDERING",
    question: "Can you adjust renderings after they're completed?",
    answer: "Yes, we can make changes after completion. The number of included revisions is specified in our service agreement, and additional modifications may involve extra charges."
  },
  {
    category: "INTERIOR/EXTERIOR RENDERING",
    question: "How do you handle lighting and time of day?",
    answer: "We can render your project in various lighting conditions - golden hour, daytime, twilight, night, or overcast. We'll discuss your preferences and marketing needs to choose the most impactful presentation."
  },
  {
    category: "INTERIOR/EXTERIOR RENDERING",
    question: "Can you create aerial/bird's-eye view renderings?",
    answer: "Yes, we specialize in aerial renderings that show your project from elevated perspectives, perfect for understanding site context, spatial relationships, and large-scale developments."
  },

  // ARCHITECTURE ANIMATION
  {
    category: "ARCHITECTURE ANIMATION",
    question: "What types of architectural animations do you create?",
    answer: "We create:\n\n• Cinematic fly-throughs and walk-throughs\n• Drone-style aerial tours\n• Interior camera paths\n• Product reveal animations\n• Time-lapse sequences (day-to-night transitions)\n• Animated site development sequences"
  },
  {
    category: "ARCHITECTURE ANIMATION",
    question: "How long does an animation take to produce?",
    answer: "Typical timeline for animations is 4-8 weeks depending on duration, complexity, and number of scenes. Shorter promotional clips (30-60 seconds) may be completed faster."
  },
  {
    category: "ARCHITECTURE ANIMATION",
    question: "What length of animation can you produce?",
    answer: "We typically produce animations ranging from 30 seconds to 3 minutes. Longer animations are possible and will be quoted based on scope."
  },
  {
    category: "ARCHITECTURE ANIMATION",
    question: "What format will the final animation be delivered in?",
    answer: "Animations are delivered as high-quality video files (typically 1920px or 4K resolution) in MP4 or MOV format. We can accommodate specific format requirements."
  },
  {
    category: "ARCHITECTURE ANIMATION",
    question: "Can you add music, voiceover, or text to the animation?",
    answer: "Yes, we can integrate background music, professional voiceover narration, text overlays, and branded elements. These services may involve additional costs."
  },
  {
    category: "ARCHITECTURE ANIMATION",
    question: "How much does an architectural animation cost?",
    answer: "Animation pricing varies significantly based on duration, complexity, camera movements, scene changes, and special effects. Contact us for a detailed quote based on your specific requirements."
  },
  {
    category: "ARCHITECTURE ANIMATION",
    question: "Can you show different design options in one animation?",
    answer: "Yes, we can create animations that showcase multiple material options, color schemes, or design alternatives, giving you flexibility in presentations."
  },

  // VIRTUAL TOUR
  {
    category: "VIRTUAL TOUR",
    question: "What is a virtual tour?",
    answer: "A virtual tour is an interactive, immersive experience that allows viewers to explore a space at their own pace. Users can navigate through rooms, look around in 360 degrees, and experience the design as if they were physically present."
  },
  {
    category: "VIRTUAL TOUR",
    question: "What's the difference between a virtual tour and an animation?",
    answer: "An animation is a pre-recorded video with a fixed camera path. A virtual tour is interactive - viewers control where they go and what they look at, creating a personalized exploration experience."
  },
  {
    category: "VIRTUAL TOUR",
    question: "What technology do you use for virtual tours?",
    answer: "We create 360-degree panoramas that can be combined into interactive walkthroughs. These are viewable on desktop, mobile, and VR headsets, accessible through web browsers without special software."
  },
  {
    category: "VIRTUAL TOUR",
    question: "How long does it take to create a virtual tour?",
    answer: "Virtual tours typically require 4-6 weeks depending on the number of spaces, interactive elements, and overall project complexity."
  },
  {
    category: "VIRTUAL TOUR",
    question: "Can virtual tours be used for marketing?",
    answer: "Absolutely. Virtual tours are powerful marketing tools that:\n\n• Allow remote viewing for international clients\n• Provide 24/7 access to your project\n• Increase engagement and time spent with your content\n• Work seamlessly on websites and social media\n• Reduce the need for physical showroom visits"
  },
  {
    category: "VIRTUAL TOUR",
    question: "Can you add interactive hotspots or information?",
    answer: "Yes, we can integrate interactive elements like clickable hotspots, product information, dimension callouts, material details, and links to additional content."
  },
  {
    category: "VIRTUAL TOUR",
    question: "What's the cost of a virtual tour?",
    answer: "Virtual tour pricing depends on the number of viewpoints, level of interactivity, and project size. Contact us for a customized quote."
  },

  // PRODUCT & BRAND VISUALIZATION
  {
    category: "PRODUCT & BRAND VISUALIZATION",
    question: "What is product visualization?",
    answer: "Product visualization is the creation of photorealistic 3D images or animations of products. This replaces traditional photography with digital content that offers complete creative control and unlimited variation possibilities."
  },
  {
    category: "PRODUCT & BRAND VISUALIZATION",
    question: "What types of products can you visualize?",
    answer: "We can visualize virtually any product including:\n\n• Furniture and home decor\n• Lighting fixtures and appliances\n• Consumer electronics\n• Luxury goods and jewelry\n• Packaging and branded materials\n• Industrial and commercial products"
  },
  {
    category: "PRODUCT & BRAND VISUALIZATION",
    question: "What are the advantages over traditional product photography?",
    answer: "3D product visualization offers:\n\n• Complete creative control - adjust materials, lighting, and environment instantly\n• Cost-effective - no physical prototypes, locations, or crew needed\n• Unlimited variations - easily show different colors, materials, or configurations\n• Perfect consistency - maintain brand standards across all imagery\n• Pre-production marketing - create marketing materials before manufacturing"
  },
  {
    category: "PRODUCT & BRAND VISUALIZATION",
    question: "Can you create 360-degree product views?",
    answer: "Yes, we create interactive 360-degree spins that allow customers to examine products from every angle, perfect for e-commerce and digital catalogs."
  },
  {
    category: "PRODUCT & BRAND VISUALIZATION",
    question: "Do you create lifestyle or contextual product shots?",
    answer: "Absolutely. We can place products in beautifully crafted environments and lifestyle settings that tell your brand story and connect emotionally with your audience."
  },
  {
    category: "PRODUCT & BRAND VISUALIZATION",
    question: "Can you create packshot renderings for e-commerce?",
    answer: "Yes, we create clean, professional packshot renderings with perfect lighting and neutral backgrounds, ideal for online stores, catalogs, and marketing materials."
  },
  {
    category: "PRODUCT & BRAND VISUALIZATION",
    question: "What if I need to make changes to the product design?",
    answer: "That's the beauty of 3D - adjustments are fast and cost-effective compared to reshooting photography. We can quickly modify materials, colors, dimensions, or features."
  },
  {
    category: "PRODUCT & BRAND VISUALIZATION",
    question: "How do you ensure brand consistency?",
    answer: "We work closely with your brand guidelines to ensure every detail - from materials and colors to lighting and mood - aligns perfectly with your brand identity and vision."
  },
  {
    category: "PRODUCT & BRAND VISUALIZATION",
    question: "What's the typical timeline for product visualization?",
    answer: "• 5-15 product images: 2-3 weeks\n• 15-20+ product images: 3-4 weeks\n• Animations or complex scenes: 4-6 weeks"
  },
  {
    category: "PRODUCT & BRAND VISUALIZATION",
    question: "Can you create a library of 3D product models?",
    answer: "Yes, we can develop a comprehensive library of your products in 3D, which can then be quickly repurposed for different marketing campaigns, configurations, and presentations."
  }
];

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
              Frequently Asked Questions
            </h2>

            {/* Category Buttons - Responsive Grid on mobile, vertical on desktop */}
            <div className="grid grid-cols-1 md:flex md:flex-row lg:flex-col gap-2 md:gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-5 lg:px-6 py-2.5 md:py-3 rounded-full text-center lg:text-left transition-all duration-300 text-sm md:text-base font-medium h-auto whitespace-normal leading-tight ${
                    selectedCategory === category
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