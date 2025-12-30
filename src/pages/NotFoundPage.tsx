import { NotFoundPage } from "./components/NotFoundPage";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <SpeedInsights />
      <Analytics />
      <NotFoundPage />
    </div>
  );
}
