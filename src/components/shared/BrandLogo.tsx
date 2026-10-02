/**
 * BrandLogo
 *
 * Studio Araci lockup without the slogan: symbol above the wordmark, built
 * from the official `simbolo-*` and `nome-*` files (same pieces as the loader).
 */
interface BrandLogoProps {
  /** Colourway: terracota on light grounds, branco on photos / dark grounds */
  tone?: 'terracota' | 'branco';
  className?: string;
}

export function BrandLogo({ tone = 'branco', className = 'w-32 md:w-40 lg:w-44' }: BrandLogoProps) {
  return (
    <span role="img" aria-label="Studio Araci" className={`flex flex-col items-center gap-[7%] ${className}`}>
      <img
        src={`/brand/simbolo-${tone}-192.png`}
        alt=""
        aria-hidden="true"
        className="block w-[34%] h-auto"
      />
      <img
        src={`/brand/nome-${tone}-sm.png`}
        srcSet={`/brand/nome-${tone}-sm.png 1x, /brand/nome-${tone}.png 2x`}
        alt=""
        aria-hidden="true"
        className="block w-full h-auto"
      />
    </span>
  );
}
