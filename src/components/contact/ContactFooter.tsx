/**
 * ContactFooter Component
 *
 * Footer section for the contact page displaying copyright, business hours,
 * legal links, and site credits.
 *
 * @module components/contact/ContactFooter
 * @since 1.0.0
 *
 * Layout:
 * - 3-column grid on desktop
 * - Stacked on mobile
 * - Border-top separator
 *
 * Content:
 * - Copyright notice (2025)
 * - Real-time São Paulo business hours
 * - Open/Closed status indicator
 * - Privacy Policy and Terms links
 * - Site credits
 *
 * Business Hours Logic:
 * - Mon-Fri: 9am-6pm (São Paulo timezone)
 * - Auto-calculates open/closed status
 *
 * Animation:
 * - Reveal with 0.4s delay
 *
 * @example
 * ```tsx
 * <ContactText>
 *   <ContactFooter />
 * </ContactText>
 * ```
 */
import { Reveal } from '../shared/Reveal';

/**
 * Renders the contact page footer with business info
 *
 * @returns Footer JSX element
 */
export const ContactFooter = () => {
  return (
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-8 md:pt-10 lg:pt-12 pb-16 md:pb-20">
        <div className="w-full flex flex-col justify-between h-full">
          {/* Footer Copyright */}
          <Reveal delay={0.4} margin="0px" amount={0.1} className="w-full border-t border-[var(--color-white)]/20 pt-4 md:pt-6 text-xs font-medium tracking-widest uppercase text-[var(--color-white)]/70 -mb-8 md:-mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-y-8 gap-x-4">
              {/* Left Column */}
              <div className="flex flex-col space-y-1.5">
                <div>© 2025 Copyright Giulia Parente Arquitetura</div>
                <div>
                  {(() => {
                     const date = new Date();
                     const formatter = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', hour: 'numeric', minute: 'numeric', hour12: true, weekday: 'short' });
                     const parts = formatter.formatToParts(date);
                     const timeStr = parts.filter(p => p.type !== 'weekday' && p.type !== 'literal' || p.value === ':' || p.value === ' ').map(p => p.value).join('').trim();
                     const spHour = parseInt(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', hour: 'numeric', hour12: false }).format(date));
                     const day = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short' }).format(date);
                     // Open Mon-Fri (not Sat/Sun), 9am-6pm
                     const isWorkday = day !== 'Sat' && day !== 'Sun';
                     const isOpen = isWorkday && spHour >= 9 && spHour < 18;
                     return `${timeStr} São Paulo, Nós estamos ${isOpen ? 'Abertos' : 'Fechados'}`;
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
                Site by <a href="https://github.com/Malakacrazy" className="underline decoration-1 underline-offset-4 hover:text-[var(--color-white)] transition-colors">Malakacrazy</a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
  );
}