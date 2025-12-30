import { Navigation } from "../components/shared/Navigation";
import { ToS } from "../components/legal/ToS";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

export default function TermsOfServicePage() {
  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <SpeedInsights />
      <Analytics />
      <Navigation />
      <ToS />
    </div>
  );
}
