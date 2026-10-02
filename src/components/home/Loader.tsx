/**
 * Loader Component
 *
 * Full-screen loading overlay with spinning Studio Araci symbol and progress bar.
 * Preloads media assets and displays loading progress before revealing content.
 *
 * @module components/home/Loader
 * @since 1.0.1
 *
 * Animation Stages:
 * 1. 'loading' - Spinning symbol, wordmark image and hairline progress bar
 * 2. 'centering' - Holds the completed state briefly
 * 3. 'fading' - Curtain slides up to reveal page content
 *
 * Features:
 * - Brand symbol rotating once every 3.2s
 * - Hairline progress bar showing asset loading progress
 * - Wordmark rendered as an image so the brand typeface stays exact
 * - Smooth curtain reveal transition
 * - Prevents scrolling during load
 *
 * @example
 * ```tsx
 * <AnimatePresence>
 *   {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
 * </AnimatePresence>
 * ```
 */
import { useEffect, useState } from 'react';
import { m as motion, AnimatePresence } from 'motion/react';
import { preloadCriticalAssetsWithTimeout } from '../../utils/preloadMedia';

/**
 * Props for the Loader component
 */
interface LoaderProps {
  /** Callback fired when loading completes and exit animation finishes */
  onLoadingComplete?: () => void;
}

export function Loader({ onLoadingComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [animationStage, setAnimationStage] = useState<'loading' | 'centering' | 'fading'>('loading');

  // Sequence management
  // We use a separate effect for the sequence to avoid cleanup issues when state changes
  useEffect(() => {
    if (progress === 100) {
      const centerTimer = setTimeout(() => {
        setAnimationStage('centering');

        // Nested timeouts to ensure sequence
        const fadeTimer = setTimeout(() => {
          setAnimationStage('fading');

          const completeTimer = setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
          }, 1200); // Wait for curtain slide (0.8s + 0.2s delay + buffer)

        }, 1200); // Wait for centering
      }, 100); // Small buffer after hitting 100%

      return () => {
        clearTimeout(centerTimer);
        // Note: inner timers might need cleanup if unmounted, but since this component
        // controls its own unmounting via onLoadingComplete, it's safer this way than
        // the previous dependency array issue.
      };
    }
  }, [progress, onLoadingComplete]);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Check if we are already done (session storage)
    const hasLoadedBefore = sessionStorage.getItem('criticalAssetsLoaded');

    if (hasLoadedBefore) {
      // Skip loading animation for subsequent page loads
      setProgress(100);
      return;
    }

    // Start preloading CRITICAL assets only
    preloadCriticalAssetsWithTimeout(10000, (progressData) => {
      // Update progress based on actual media loading
      setProgress(progressData.percentage);

      // Mark as loaded when complete
      if (progressData.percentage === 100) {
        sessionStorage.setItem('criticalAssetsLoaded', 'true');
      }
    });

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []); // Empty dependency array to run only once on mount

  // Re-enable scrolling as soon as fading starts - don't wait for unmount
  useEffect(() => {
    if (animationStage === 'fading') {
      document.body.style.overflow = 'unset';
    }
  }, [animationStage]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1, delay: 1 } }}
    >
      {/* Background Curtain */}
      <motion.div
        className="absolute inset-0 bg-[var(--color-background)] pointer-events-auto"
        initial={{ y: 0 }}
        animate={{ y: animationStage === 'fading' ? '-100%' : '0%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      />

      {/* Spinning symbol, wordmark image and hairline progress bar */}
      <motion.div
        role="status"
        aria-live="polite"
        aria-label={`Carregando ${Math.round(progress)}%`}
        className="relative z-10 flex flex-col items-center gap-6 md:gap-8"
        animate={animationStage === 'fading' ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <img
          src="/brand/simbolo-terracota-192.png"
          alt="Símbolo do Studio Araci"
          className="w-14 h-14 md:w-20 md:h-20 animate-[spin_3.2s_linear_infinite]"
        />
        <img
          src="/brand/nome-terracota-sm.png"
          srcSet="/brand/nome-terracota-sm.png 1x, /brand/nome-terracota.png 2x"
          alt="Studio Araci"
          className="w-40 md:w-56 h-auto"
        />
        <img
          src="/brand/slogan-terracota-sm.png"
          srcSet="/brand/slogan-terracota-sm.png 1x, /brand/slogan-terracota.png 2x"
          alt="Tudo começa pelo que você sente"
          className="w-64 md:w-80 h-auto -mt-2"
        />
        <div className="w-44 md:w-56 h-px bg-[var(--araci-duna-suave)] overflow-hidden">
          <div
            className="h-px bg-[var(--color-primary)] transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          Carregando · {Math.round(progress)}%
        </span>
      </motion.div>
    </motion.div>
  );
}
