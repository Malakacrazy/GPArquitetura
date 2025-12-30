import React from 'react';
import { Navigation } from "./components/Navigation";
import { ContactText } from "./components/ContactText";
import { ContactFooter } from "./components/ContactFooter";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <div className="page_wrap min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <SpeedInsights />
      <Analytics />
      <Navigation />
      <ContactText>
        <ContactFooter />
      </ContactText>
    </div>
  );
}