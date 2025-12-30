import { Reveal } from '../shared/Reveal';
import { videos } from '../../config/assets';

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
              <span className="text-xs font-medium tracking-[0.2em] text-white mb-4 md:mb-6 uppercase">Contact Us</span>
            </Reveal>
          </div>

          {/* Main Content */}
          <Reveal delay={0.2} className="flex flex-col justify-end flex-1 space-y-6 md:space-y-8 mt-12 md:mt-16 lg:mt-20 pb-8 md:pb-12">
            {/* Phone Number & Email */}
            <div className="text-white/90 text-base md:text-lg font-light space-y-1">
              <a href="mailto:hello@archinstudio.co" className="block hover:underline">hello@archinstudio.co</a>
              <a href="https://api.whatsapp.com/send?phone=5511947739339" target="_blank" className="block hover:underline">(11) 94773-9339</a>
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
                <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/tos" className="hover:text-white transition-colors">Terms of Service</a>
              </div>

              {/* Right Column */}
              <div className="flex flex-col space-y-1.5 md:items-end">
                Site by <a href="*" className="underline decoration-1 underline-offset-4 hover:text-white transition-colors">XX</a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}