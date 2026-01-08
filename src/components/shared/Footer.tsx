/**
 * Footer Component
 *
 * Site-wide footer with video background, contact information, business hours,
 * and legal links. Displays real-time open/closed status based on São Paulo timezone.
 *
 * @module components/shared/Footer
 * @since 1.0.0
 *
 * Features:
 * - Video background with responsive sizing
 * - Contact email and WhatsApp links
 * - Real-time business hours status (Open/Closed)
 * - Legal page links (Privacy Policy, Terms of Service)
 * - Responsive grid layout
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
import { Reveal } from '../shared/Reveal';
import { videos } from '../../config/assets';
import { contact, company, getBusinessStatus } from '../../config/contact';

export function Footer() {
  return (
    <section id="contact" className="relative min-h-screen bg-gray-900">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videos.footerBackground.mp4} type="video/mp4" />
          <source src={videos.footerBackground.webm} type="video/webm" />
        </video>
      </div>
      
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-8 md:pt-10 lg:pt-12 pb-16 md:pb-20 h-screen">
        <div className="w-full flex flex-col justify-between h-full">
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <Reveal>
              <span className="text-xs font-medium tracking-[0.2em] text-white mb-4 md:mb-6 uppercase">Entre em Contato</span>
            </Reveal>
          </div>

          {/* Main Content */}
          <Reveal delay={0.2} className="flex flex-col justify-end flex-1 space-y-6 md:space-y-8 mt-12 md:mt-16 lg:mt-20 pb-8 md:pb-12">
            {/* Phone Number & Email */}
            <div className="text-white/90 text-base md:text-lg font-light space-y-1">
              <a href={contact.email.url} className="block hover:underline">{contact.email.address}</a>
              <a href={contact.whatsapp.url} target="_blank" rel="noopener noreferrer" className="block hover:underline">{contact.whatsapp.display}</a>
            </div>

            {/* CTA */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white tracking-tighter">
                Vamos fazer do seu projeto uma experiência transformadora
              </h2>
            </div>
          </Reveal>

          {/* Footer Copyright */}
          <Reveal delay={0.4} className="w-full border-t border-white/20 pt-4 md:pt-6 text-xs font-medium tracking-widest uppercase text-white/70 -mb-8 md:-mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-y-8 gap-x-4">
              {/* Left Column */}
              <div className="flex flex-col space-y-1.5">
                <div>© {company.copyrightYear} Copyright {company.legalName}</div>
                <div>
                  {(() => {
                    const { isOpen, timeString } = getBusinessStatus();
                    return `${timeString}, Nós estamos ${isOpen ? 'Abertos' : 'Fechados'}`;
                  })()}
                </div>
              </div>

              {/* Center Column */}
              <div className="flex flex-col space-y-1.5 md:items-center">
                <a href="/privacy" className="hover:text-white transition-colors">Política de Privacidade</a>
                <a href="/tos" className="hover:text-white transition-colors">Termos de Uso</a>
              </div>

              {/* Right Column */}
              <div className="flex flex-col space-y-1.5 md:items-end">
                Site by <a href="https://github.com/Malakacrazy" className="underline decoration-1 underline-offset-4 hover:text-white transition-colors">Malakacrazy</a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}