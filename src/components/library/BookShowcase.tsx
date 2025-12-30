import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Book1 } from './Book1';
import { Book2 } from './Book2';
import { Book3 } from './Book3';
import { Book4 } from './Book4';
import { Book5 } from './Book5';
import { Book6 } from './Book6';

export function BookShowcase() {
  const location = useLocation();

  // Handle hash navigation - scroll to book when navigating with hash
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure the DOM is fully rendered
      const timeoutId = setTimeout(() => {
        const elementId = location.hash.substring(1); // Remove the '#'
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [location.hash]);

  return (
    <div className="px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16 bg-[var(--color-background)]">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-12">
          <Book1 />
          <Book2 />
          <Book3 />
          <Book4 />
          <Book5 />
          <Book6 />
        </div>
    </div>
  );
}