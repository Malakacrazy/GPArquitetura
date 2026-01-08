/**
 * Media Preloading Utility Module
 *
 * Handles preloading of images and videos during the initial page load.
 * Works with the Loader component to show loading progress and ensure
 * smooth playback once the page is revealed.
 *
 * @module utils/preloadMedia
 * @since 1.0.0
 *
 * Strategy:
 * - Preloads all critical images and videos in parallel
 * - Tracks progress for loading indicator
 * - Gracefully handles failures (logs warning, continues)
 * - Supports timeout fallback to prevent infinite loading
 *
 * Asset Source:
 * - Uses preloadImages/preloadVideos arrays from config/assets.ts
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
import { preloadImages, preloadVideos } from '../config/assets';

/**
 * Array of image URLs to preload
 * @deprecated Use preloadImages from config/assets.ts directly
 */
export const IMAGE_URLS = preloadImages;

/**
 * Array of video URLs to preload
 * @deprecated Use preloadVideos from config/assets.ts directly
 */
export const VIDEO_URLS = preloadVideos;

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
 * Preload all media assets with progress tracking
 */
export const preloadAllMedia = async (
  onProgress?: PreloadProgressCallback
): Promise<void> => {
  const allAssets = [...IMAGE_URLS, ...VIDEO_URLS];
  const total = allAssets.length;
  let loaded = 0;

  const updateProgress = () => {
    loaded++;
    const percentage = Math.round((loaded / total) * 100);

    if (onProgress) {
      onProgress({
        loaded,
        total,
        percentage,
      });
    }
  };

  // Create promises for all assets
  const imagePromises = IMAGE_URLS.map(url =>
    preloadImage(url).then(updateProgress)
  );

  const videoPromises = VIDEO_URLS.map(url =>
    preloadVideo(url).then(updateProgress)
  );

  // Wait for all assets to load (or fail gracefully)
  await Promise.all([...imagePromises, ...videoPromises]);
};

/**
 * Preload media with a timeout fallback
 * If media takes too long to load, the loader will complete anyway
 */
export const preloadMediaWithTimeout = async (
  timeoutMs: number = 10000, // 10 second max
  onProgress?: PreloadProgressCallback
): Promise<void> => {
  return Promise.race([
    preloadAllMedia(onProgress),
    new Promise<void>((resolve) => {
      setTimeout(() => {
        console.warn('Media preload timeout reached');
        resolve();
      }, timeoutMs);
    }),
  ]);
};