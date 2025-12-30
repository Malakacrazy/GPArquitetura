import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { preloadMediaWithTimeout } from '../utils/preloadMedia';

interface LoaderProps {
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

    // Check if we are already done (e.g. dev HMR)
    if (progress === 100) return;

    // Start preloading all media assets
    preloadMediaWithTimeout(10000, (progressData) => {
      // Update progress based on actual media loading
      setProgress(progressData.percentage);
    }).then(() => {
      // Ensure we hit 100% when done
      setProgress(100);
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
  const petals = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i * 30) * (Math.PI / 180); // Convert to radians
    return {
      rotation: i * 30,
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
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: i * 0.05,
                        duration: 0.5,
                        type: "spring"
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
          <div className="text-[12px] md:text-xs tracking-widest leading-relaxed max-w-[200px] text-neutral-600 flex flex-col items-start">
            <div className="relative z-50">
              <motion.h1
                layout
                className={`inline-block origin-left whitespace-nowrap text-inherit font-inherit ${
                   animationStage !== 'loading' 
                   ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl z-[60]' 
                   : ''
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
              Architecture &<br />
              Design Studio
            </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}