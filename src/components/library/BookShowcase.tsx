import { Book1 } from './Book1';
import { Book2 } from './Book2';
import { Book3 } from './Book3';
import { Book4 } from './Book4';
import { Book5 } from './Book5';
import { Book6 } from './Book6';

export function BookShowcase() {
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