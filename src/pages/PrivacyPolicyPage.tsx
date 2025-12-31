import { Navigation } from "../components/shared/Navigation";
import { PrivacyPolicy } from "../components/legal/PrivacyPolicy";
import { useSEO, SEO_CONFIG } from '../hooks/useSEO';

export default function PrivacyPolicyPage() {
  // Apply SEO settings for Privacy Policy page
  useSEO(SEO_CONFIG.privacy);

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <Navigation />
      <PrivacyPolicy />
    </div>
  );
}
