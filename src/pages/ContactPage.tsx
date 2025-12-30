import { Navigation } from '../components/shared/Navigation';
import { ContactText } from '../components/contact/ContactText';
import { ContactFooter } from '../components/contact/ContactFooter';

export default function ContactPage() {
  return (
    <div className="page_wrap min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <Navigation />
      <ContactText>
        <ContactFooter />
      </ContactText>
    </div>
  );
}
