/**
 * Media Preloading Utility Module
 *
 * Handles preloading of images and videos during the initial page load.
 * Works with the Loader component to show loading progress and ensure
 * smooth playback once the page is revealed.
 *
 * @module utils/preloadMedia
 * @since 1.0.1
 *
 * Strategy:
 * - Preloads all critical images and videos in parallel
 * - Tracks progress for loading indicator
 * - Gracefully handles failures (logs warning, continues)
 * - Supports timeout fallback to prevent infinite loading
 *
 * Asset Source:
 * - Uses criticalAssets/pageSpecificAssets arrays from config/assets.ts
 * - Configured per-page to only load necessary assets
 *
 * @example
 * ```typescript
 * import { preloadMediaWithTimeout } from '../utils/preloadMedia';
 *
 * // In Loader component
 * preloadMediaWithTimeout(10000, (progress) => {
 *   setLoadingPercent(progress.percentage);
 * });
 * ```
 */
import { criticalAssets, pageSpecificAssets } from '../config/assets';

/**
 * Progress tracking object for preload operations
 */
export interface PreloadProgress {
  /** Number of assets loaded so far */
  loaded: number;
  /** Total number of assets to load */
  total: number;
  /** Percentage complete (0-100) */
  percentage: number;
}

/**
 * Callback function type for progress updates
 */
export type PreloadProgressCallback = (progress: PreloadProgress) => void;

/**
 * Preloads a single image by creating an Image element
 *
 * @param url - Image URL to preload
 * @returns Promise that resolves when image loads (or fails gracefully)
 * @private
 */
const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve();
    img.onerror = () => {
      console.warn(`Failed to preload image: ${url}`);
      // Resolve anyway to not block the loader
      resolve();
    };

    img.src = url;
  });
};

/**
 * Preload a single video (load enough data to start playing)
 */
const preloadVideo = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');

    // Set attributes for optimal preloading
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;

    const handleCanPlay = () => {
      cleanup();
      resolve();
    };

    const handleError = () => {
      console.warn(`Failed to preload video: ${url}`);
      cleanup();
      // Resolve anyway to not block the loader
      resolve();
    };

    const cleanup = () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.src = '';
      video.load();
    };

    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('error', handleError);

    video.src = url;
    video.load();
  });
};

/**
 * LAYER 1: Preload Critical Assets (Frontloader)
 * 
 * Loads all essential assets for:
 * - Navigation/Footer (shared)
 * - Homepage
 * - About, Portfolio, Contact pages
 * 
 * Excludes: Portfolio3D, Library (loaded on-demand)
 */
export const preloadCriticalAssets = async (
  onProgress?: PreloadProgressCallback
): Promise<void> => {
  const { images, videos } = criticalAssets;
  const allAssets = [...images, ...videos];
  const total = allAssets.length;
  let loaded = 0;

  const updateProgress = () => {
    loaded++;
    const percentage = Math.round((loaded / total) * 100);

    if (onProgress) {
      onProgress({ loaded, total, percentage });
    }
  };

  // Create promises
  const imagePromises = images.map(url =>
    preloadImage(url).then(updateProgress)
  );

  const videoPromises = videos.map(url =>
    preloadVideo(url).then(updateProgress)
  );

  await Promise.all([...imagePromises, ...videoPromises]);
};

/**
 * LAYER 1 with Timeout Fallback
 * Prevents infinite loading if assets fail
 */
export const preloadCriticalAssetsWithTimeout = async (
  timeoutMs: number = 10000,
  onProgress?: PreloadProgressCallback
): Promise<void> => {
  return Promise.race([
    preloadCriticalAssets(onProgress),
    new Promise<void>((resolve) => {
      setTimeout(() => {
        console.warn('Critical assets preload timeout reached');
        resolve();
      }, timeoutMs);
    }),
  ]);
};

/**
 * LAYER 2: Preload Page-Specific Assets
 * 
 * Called when user navigates to heavy pages:
 * - Portfolio3D: Heavy videos and case study images
 * 
 * @param page - Page identifier ('portfolio3d')
 */
export const preloadPageSpecificAssets = async (
  onProgress?: PreloadProgressCallback
): Promise<void> => {
  const { images, videos } = pageSpecificAssets.portfolio3d;
  const allAssets = [...images, ...videos];
  const total = allAssets.length;
  let loaded = 0;

  const updateProgress = () => {
    loaded++;
    const percentage = Math.round((loaded / total) * 100);

    if (onProgress) {
      onProgress({ loaded, total, percentage });
    }
  };

  // Create promises
  const imagePromises = images.map(url =>
    preloadImage(url).then(updateProgress)
  );

  const videoPromises = videos.map(url =>
    preloadVideo(url).then(updateProgress)
  );

  await Promise.all([...imagePromises, ...videoPromises]);
};

/**
 * LAYER 2 with Timeout Fallback
 */
export const preloadPageSpecificAssetsWithTimeout = async (
  timeoutMs: number = 10000,
  onProgress?: PreloadProgressCallback
): Promise<void> => {
  return Promise.race([
    preloadPageSpecificAssets(onProgress),
    new Promise<void>((resolve) => {
      setTimeout(() => {
        console.warn('Page-specific assets preload timeout reached');
        resolve();
      }, timeoutMs);
    }),
  ]);
};

/**
 * Utility: Check if assets are already cached
 */
export const areAssetsCached = (urls: string[]): boolean => {
  return urls.every(url => loadedAssets.has(url));
};

/**
 * Utility: Clear cache (useful for development)
 */
export const clearAssetCache = (): void => {
  loadedAssets.clear();
};