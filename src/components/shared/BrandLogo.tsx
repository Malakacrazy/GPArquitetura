/**
 * BrandLogo
 *
 * Studio Araci horizontal signature (symbol + wordmark + slogan).
 * Uses the display-scale raster below 400px and the print-scale one above,
 * per the brand manual (hairline strokes must not be downscaled too far).
 */
interface BrandLogoProps {
  /** Colourway: terracota on light grounds, branco on photos / dark grounds */
  tone?: 'terracota' | 'branco';
  className?: string;
}

export function BrandLogo({ tone = 'branco', className = 'w-32 md:w-40 lg:w-44' }: BrandLogoProps) {
  return (
    <img
      src={`/brand/horizontal-${tone}-sm.png`}
      srcSet={`/brand/horizontal-${tone}-sm.png 1x, /brand/horizontal-${tone}.png 2x`}
      alt="Studio Araci — tudo começa pelo que você sente"
      className={`block h-auto ${className}`}
    />
  );
}
