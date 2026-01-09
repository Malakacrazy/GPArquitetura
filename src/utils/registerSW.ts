/**
 * Service Worker Lifecycle Management
 *
 * This module is responsible for registering and unregistering the
 * Service Worker used by the application.
 *
 * The Service Worker enables:
 * - Offline capability
 * - Asset caching
 * - Faster repeat visits
 *
 * IMPORTANT:
 * - Service Workers ONLY work on secure origins (HTTPS or localhost)
 * - Registration must happen AFTER the window `load` event
 * - Browsers silently ignore Service Worker APIs when unsupported
 *
 * This file intentionally contains **defensive checks** to avoid
 * runtime errors in unsupported environments.
 *
 * @module services/registerSW
 * @since 1.0.0
 */

/**
 * Registers the application's Service Worker.
 *
 * Execution flow:
 * 1. Check if the browser supports Service Workers
 * 2. Wait until the window finishes loading
 * 3. Register `/sw.js`
 * 4. Log the registration scope for debugging
 * 5. Periodically ask the browser to check for updates
 *
 * Why updates are manual:
 * - Browsers do NOT automatically re-check the SW file frequently
 * - Calling `registration.update()` ensures new deployments are detected
 *
 * Side effects:
 * - Registers a long-lived background process
 * - Sets up a recurring timer (hourly)
 *
 * Failure modes:
 * - Registration may fail due to HTTPS issues
 * - `/sw.js` may be missing or misconfigured
 * - Browser may silently ignore registration in private modes
 *
 * @returns {void}
 */
export function registerServiceWorker(): void {
  // Guard clause:
  // Prevents execution in browsers/environments that do not support
  // the Service Worker API (older browsers, some embedded webviews).
  if ('serviceWorker' in navigator) {

    // The Service Worker MUST be registered after the page has fully loaded.
    // Registering too early can cause race conditions with asset loading.
    window.addEventListener('load', () => {

      // Attempt to register the Service Worker file.
      // The path `/sw.js` must be located at the site root to control the scope.
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {

          // Successful registration:
          // `registration.scope` tells us which URLs the SW controls.
          console.log(
            '✅ Service Worker registered successfully:',
            registration.scope
          );

          // Force periodic update checks.
          // This ensures users receive updated cached assets
          // even if they keep the site open for long periods.
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000); // Every 1 hour
        })

        // Registration failure:
        // Usually caused by HTTPS issues, invalid SW file,
        // or misconfigured headers.
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error);
        });
    });

  } else {
    // Explicit warning for unsupported browsers.
    // This avoids silent failures and aids debugging.
    console.warn('⚠️ Service Workers are not supported in this browser');
  }
}

/**
 * Unregisters ALL active Service Workers for this origin.
 *
 * This is primarily useful for:
 * - Debugging cache issues
 * - Resetting broken Service Worker states
 * - Development or hard resets
 *
 * Execution flow:
 * 1. Check Service Worker support
 * 2. Retrieve all active registrations
 * 3. Unregister each one individually
 *
 * ⚠️ WARNING:
 * - This removes offline support
 * - Cached assets will be discarded
 *
 * @returns {void}
 */
export function unregisterServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
  }
}
