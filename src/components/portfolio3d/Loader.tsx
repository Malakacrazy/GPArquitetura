/**
 * Loader Component
 *
 * Full-screen loading overlay with animated sunflower progress indicator.
 * Preloads media assets and displays loading progress before revealing content.
 *
 * @module components/portfolio3d/Loader
 * @since 1.0.1
 *
 * Animation Stages:
 * 1. 'loading' - Shows sunflower with progress circle and percentage
 * 2. 'centering' - Moves brand name to center of screen
 * 3. 'fading' - Curtain slides up to reveal page content
 *
 * Features:
 * - Animated sunflower petals with spring animation
 * - Circular progress indicator showing asset loading progress
 * - Brand name with gradient fill effect during loading
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
import { motion, AnimatePresence } from 'motion/react';
import { preloadPageSpecificAssetsWithTimeout } from '../../utils/preloadMedia';

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
    const hasLoadedBefore = sessionStorage.getItem('pageSpecificAssetsLoaded');

    if (hasLoadedBefore) {
      // Skip loading animation for subsequent page loads
      setProgress(100);
      return;
    }

    // Start preloading CRITICAL assets only
    preloadPageSpecificAssetsWithTimeout(10000, (progressData) => {
      // Update progress based on actual media loading
      setProgress(progressData.percentage);

      // Mark as loaded when complete
      if (progressData.percentage === 100) {
        sessionStorage.setItem('pageSpecificAssetsLoaded', 'true');
      }
    });

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []); // Empty dependency array to run only once on mount

  // Circle properties
  // Reduced radius to make room for petals within the same container
  const radius = 45;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Sunflower petals
  const totalPetals = 12;
  const petals = Array.from({ length: totalPetals }).map((_, i) => {
    // Calculate the progress range for this petal
    const petalProgressStart = (i / totalPetals) * 100;
    const petalProgressEnd = ((i + 1) / totalPetals) * 100;

    // Calculate how much of this petal should be visible
    let petalProgress = 0;
    if (progress >= petalProgressEnd) {
      petalProgress = 1; // Fully visible
    } else if (progress > petalProgressStart) {
      petalProgress = (progress - petalProgressStart) / (petalProgressEnd - petalProgressStart);
    }
    return {
      rotation: i * 30,
      petalProgress,
    };
  });

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

      <div className="absolute bottom-12 left-6 md:bottom-20 md:left-20 flex items-end gap-8 z-10 text-black">
        {/* Circle and Percentage */}
        <AnimatePresence>
          {animationStage === 'loading' && (
            <motion.div
              className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40"
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
            >
              {/* Sunflower SVG */}
              <svg
                height="100%"
                width="100%"
                className="absolute inset-0 overflow-visible"
                viewBox="0 0 120 120"
              >
                <g transform="translate(60, 60)">
                  {/* Petals */}
                  {petals.map((petal, i) => (
                    <g key={i} transform={`rotate(${petal.rotation}) translate(0, -45)`}>
                      <motion.ellipse
                        rx={8}
                        ry={20}
                        fill="#D97706" // Warm ochre/amber
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: petal.petalProgress,
                          opacity: petal.petalProgress
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeOut"
                        }}
                      />
                    </g>
                  ))}
                </g>

                {/* Progress Circles (Center of Sunflower) */}
                <g transform="rotate(-90, 60, 60)">
                  {/* Track */}
                  <circle
                    stroke="#78350F" // Dark brown track
                    strokeWidth={stroke}
                    strokeOpacity={0.2}
                    fill="#FFFBEB" // Very light warm background for center
                    r={normalizedRadius}
                    cx={60}
                    cy={60}
                  />
                  {/* Progress Indicator */}
                  <circle
                    stroke="#78350F" // Dark brown progress (seeds color)
                    strokeWidth={stroke + (progress / 100) * 2}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={60}
                    cy={60}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </g>
              </svg>
              <span className="absolute text-2xl md:text-3xl font-bold tracking-tighter text-[#78350F]">
                {Math.round(progress)}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text next to circle */}
        <div className="mb-4 block">
          <div className="text-xs md:text-xs tracking-widest leading-relaxed max-w-[200px] text-neutral-600 flex flex-col items-start">
            <div className="relative z-50">
              <motion.h1
                layout
                className={`inline-block origin-left whitespace-nowrap text-inherit font-inherit ${animationStage !== 'loading'
                  ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl z-[60]'
                  : 'text-base md:text-lg'
                  }`}
                animate={animationStage === 'fading' ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                style={progress < 100 ? {
                  backgroundImage: `linear-gradient(to right, #000000 ${progress}%, rgba(0,0,0,0.1) ${progress}%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                } : {
                  color: '#000000'
                }}
              >
                Giulia Parente
              </motion.h1>
            </div>
            <AnimatePresence>
              {animationStage === 'loading' && (
                <motion.div
                  className="font-bold uppercase"
                  initial={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Studio de Design<br />
                  & Arquitetura
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}