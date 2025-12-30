import { Reveal } from './Reveal';

export const ContactFooter = () => {
  return (
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-8 md:pt-10 lg:pt-12 pb-16 md:pb-20">
        <div className="w-full flex flex-col justify-between h-full">
          {/* Footer Copyright */}
          <Reveal delay={0.4} margin="0px" amount={0.1} className="w-full border-t border-[var(--color-white)]/20 pt-4 md:pt-6 text-xs font-medium tracking-widest uppercase text-[var(--color-white)]/70 -mb-8 md:-mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-y-8 gap-x-4">
              {/* Left Column */}
              <div className="flex flex-col space-y-1.5">
                <div>© 2025 Copyright Giulia Parente</div>
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
                     return `${timeStr} São Paulo, We are ${isOpen ? 'Open' : 'Closed'}`;
                  })()}
                </div>
              </div>

              {/* Center Column */}
              <div className="flex flex-col space-y-1.5 md:items-center">
                <a href="https://exact-black-41882768.figma.site" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="https://gift-world-53852851.figma.site" className="hover:text-white transition-colors">Terms of Service</a>
              </div>

              {/* Right Column */}
              <div className="flex flex-col space-y-1.5 md:items-end">
                Site by <a href="https://mount-scrub-76614919.figma.site" className="underline decoration-1 underline-offset-4 hover:text-[var(--color-white)] transition-colors">XX</a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
  );
}