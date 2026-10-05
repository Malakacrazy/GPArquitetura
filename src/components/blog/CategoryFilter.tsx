import { m as motion } from 'motion/react';
import { Button } from '../ui/button';

interface CategoryFilterProps {
  categories: string[];
  active: string | null;
  onChange: (category: string | null) => void;
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const options: { label: string; value: string | null }[] = [
    { label: 'Todos', value: null },
    ...categories.map((category) => ({ label: category, value: category })),
  ];

  return (
    <motion.section
      className="flex flex-wrap items-center justify-end gap-2 px-6 md:px-12 lg:px-16 xl:px-20 pt-8 pb-8"
      style={{ backgroundColor: 'var(--color-background)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h6 className="hidden md:block text-sm mr-2" style={{ color: 'var(--color-primary)' }}>Categoria:</h6>
      {options.map(({ label, value }) => {
        const isActive = active === value;
        return (
          <Button
            key={label}
            variant={isActive ? 'default' : 'ghost'}
            size="sm"
            aria-pressed={isActive}
            onClick={() => onChange(value)}
            style={isActive ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { color: 'var(--color-text-muted)' }}
          >
            <h6>{label}</h6>
          </Button>
        );
      })}
    </motion.section>
  );
}
