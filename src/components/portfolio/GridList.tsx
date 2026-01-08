/**
 * GridList Component
 *
 * View toggle controls for switching between grid and list display modes
 * on the Portfolio page. Provides visual feedback for current selection.
 *
 * @module components/portfolio/GridList
 * @since 1.0.0
 *
 * View Modes:
 * - Galeria (Grid): Masonry-style card layout
 * - Lista (List): Horizontal card list
 *
 * Styling:
 * - Active button: Primary background color
 * - Inactive button: Ghost variant with muted text
 * - Icons: 4x4 size with left margin
 *
 * @example
 * ```tsx
 * const [isGridView, setIsGridView] = useState(true);
 * <GridList isGridView={isGridView} setIsGridView={setIsGridView} />
 * ```
 */
import { Grid, List } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

/**
 * Props for the GridList component
 */
interface GridListProps {
  /** Current view mode (true = grid, false = list) */
  isGridView: boolean;
  /** Callback to change view mode */
  setIsGridView: (isGrid: boolean) => void;
}

/**
 * Renders the view mode toggle buttons
 *
 * @param props - Component props
 * @returns Toggle button group JSX element
 */
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
        <h6 className="text-sm" style={{ color: 'var(--color-primary)' }}>Modo:</h6>
        <Button
          variant={isGridView ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setIsGridView(true)}
          className={!isGridView ? '' : ''}
          style={isGridView ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { color: 'var(--color-text-muted)' }}
        >
          <h6>Galeria</h6>
          <Grid className="size-4 ml-2" />
        </Button>
        <Button
          variant={!isGridView ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setIsGridView(false)}
          className={isGridView ? '' : ''}
          style={!isGridView ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { color: 'var(--color-text-muted)' }}
        >
          <h6>Lista</h6>
          <List className="size-4 ml-2" />
        </Button>
      </div>
    </motion.section>
  );
}
