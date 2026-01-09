/**
 * Service Worker Registration Utility
 *
 * Handles registration and lifecycle management of the service worker
 * for offline capability, caching, and PWA functionality.
 *
 * @module utils/registerSW
 * @since 1.0.0
 *
 * Features:
 * - Automatic service worker registration
 * - Periodic update checks (every hour)
 * - Update notification handling
 * - Graceful fallback for unsupported browsers
 *
 * @example
 * ```typescript
 * import { registerServiceWorker } from '../utils/registerSW';
 *
 * // In main.tsx or App.tsx
 * registerServiceWorker();
 * ```
 */

/**
 * Registers the service worker for offline capability and caching
 *
 * Sets up the service worker with automatic update checking and
 * handles the installation lifecycle. Logs status messages for debugging.
 */
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered successfully:', registration.scope);

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000); // Check every hour

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;

            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available
                  console.log('🔄 New service worker available');

                  // You can show a notification to the user here
                  // For now, we'll auto-activate it
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error);
        });

      // Handle controller change (new SW activated)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Service Worker controller changed');
        // Optionally reload the page to use the new service worker
        // window.location.reload();
      });
    });
  } else {
    console.warn('⚠️ Service Workers are not supported in this browser');
  }
}

/**
 * Unregisters all service workers
 *
 * Useful for debugging or when disabling PWA functionality.
 * Removes all registered service workers from the browser.
 */
export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
  }
}
