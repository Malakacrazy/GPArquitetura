/**
 * AccordionItem Component (Portfolio 3D)
 *
 * Custom accordion component for expandable content sections.
 * Used primarily in the FAQ and process explanation sections.
 *
 * @module components/portfolio3d/AccordionItem
 * @since 1.0.0
 *
 * Features:
 * - Toggle open/close on click
 * - Animated chevron rotation
 * - Smooth height transition (max-height based)
 * - Touch event handling for mobile
 *
 * Styling:
 * - Primary color border bottom
 * - Uppercase title with hover color change
 * - Muted text for content
 *
 * Animation:
 * - 300ms height and opacity transition
 * - Chevron 180° rotation when open
 *
 * @example
 * ```tsx
 * <AccordionItem
 *   title="What is 3D rendering?"
 *   content="3D rendering is the process of..."
 *   defaultOpen={false}
 * />
 * ```
 */
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Props for the AccordionItem component
 */
interface AccordionItemProps {
  title: string;
  content: string;
  defaultOpen?: boolean;
}

/**
 * Renders an expandable accordion item
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