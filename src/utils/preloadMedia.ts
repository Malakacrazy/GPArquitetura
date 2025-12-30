/**
 * Media preloading utility for the Architecture website
 * Preloads all images and videos during the loader phase
 *
 * Uses centralized asset configuration from src/config/assets.ts
 */

import { preloadImages, preloadVideos } from '../config/assets';

// Re-export for backward compatibility
export const IMAGE_URLS = preloadImages;
export const VIDEO_URLS = preloadVideos;

export interface PreloadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export type PreloadProgressCallback = (progress: PreloadProgress) => void;

/**
 * Preload a single image
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