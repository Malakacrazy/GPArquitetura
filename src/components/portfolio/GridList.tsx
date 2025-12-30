import { Grid, List } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface GridListProps {
  isGridView: boolean;
  setIsGridView: (isGrid: boolean) => void;
}

export function GridList({ isGridView, setIsGridView }: GridListProps) {
  return (
    <motion.section 
      className="flex items-center gap-4 px-6 md:px-12 lg:px-16 xl:px-20 pt-8 pb-8"
      style={{ backgroundColor: 'var(--color-background)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 ml-auto">
        <h6 className="text-sm" style={{ color: 'var(--color-primary)' }}>View:</h6>
        <Button
          variant={isGridView ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setIsGridView(true)}
          className={!isGridView ? '' : ''}
          style={isGridView ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { color: 'var(--color-text-muted)' }}
        >
          <h6>Grid</h6>
          <Grid className="size-4 ml-2" />
        </Button>
        <Button
          variant={!isGridView ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setIsGridView(false)}
          className={isGridView ? '' : ''}
          style={!isGridView ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { color: 'var(--color-text-muted)' }}
        >
          <h6>List</h6>
          <List className="size-4 ml-2" />
        </Button>
      </div>
    </motion.section>
  );
}
