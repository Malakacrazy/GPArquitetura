/**
 * AccordionItem Component
 *
 * Expandable/collapsible content panel with animated chevron indicator.
 * Used for FAQ sections and service descriptions throughout the site.
 *
 * @module components/home/AccordionItem
 * @since 1.0.0
 *
 * Animation:
 * - Chevron rotates 180° when expanded
 * - Content slides down with opacity fade
 * - 300ms transition duration
 *
 * Styling:
 * - Bottom border separator
 * - Hover state changes title color to primary
 * - Touch-active state for mobile feedback
 *
 * @example
 * ```tsx
 * // Single accordion item
 * <AccordionItem
 *   title="Question or Service"
 *   content="Detailed explanation text"
 *   defaultOpen={false}
 * />
 *
 * // First item open by default
 * <AccordionItem
 *   title="First Item"
 *   content="This starts expanded"
 *   defaultOpen={true}
 * />
 * ```
 */
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Props for the AccordionItem component
 */
interface AccordionItemProps {
  /** Title text displayed in the button header */
  title: string;
  /** Content text revealed when expanded */
  content: string;
  /** Whether the item starts expanded (default: false) */
  defaultOpen?: boolean;
}

/**
 * Renders a single accordion item with toggle functionality
 *
 * @param props - Component props
 * @returns Accordion item JSX element
 */
export function AccordionItem({ title, content, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--color-primary)]/20 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onTouchStart={(e) => e.currentTarget.classList.add('touch-active')}
        onTouchEnd={(e) => e.currentTarget.classList.remove('touch-active')}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="text-xl md:text-2xl text-[var(--color-text-dark)] font-normal tracking-tight group-hover:text-[var(--color-primary)] transition uppercase">{title}</span>
        <ChevronDown 
          className={`h-6 w-6 text-[var(--color-text-dark)] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-lg font-light text-[var(--color-text-muted)] leading-relaxed">{content}</p>
      </div>
    </div>
  );
}