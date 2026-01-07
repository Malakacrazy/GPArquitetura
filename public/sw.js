// Service Worker for GP Arquitetura
// Provides offline capability and asset caching with security hardening

const CACHE_VERSION = 'v1.0.2';
const CACHE_NAME = `gp-arquitetura-${CACHE_VERSION}`;
const METADATA_CACHE = `${CACHE_NAME}-metadata`;

// Cache expiration time (24 hours in milliseconds)
const CACHE_MAX_AGE = 24 * 60 * 60 * 1000;

// Security: Only cache resources from trusted origins
const TRUSTED_ORIGINS = [
  self.location.origin,
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
];

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/site.webmanifest',
  '/favicon.ico',
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first, fallback to network
  CACHE_FIRST: 'cache-first',
  // Network first, fallback to cache
  NETWORK_FIRST: 'network-first',
  // Network only (no caching)
  NETWORK_ONLY: 'network-only',
  // Cache only (no network)
  CACHE_ONLY: 'cache-only',
};

// Security: Check if origin is trusted
function isTrustedOrigin(url) {
  const origin = new URL(url).origin;
  return TRUSTED_ORIGINS.includes(origin);
}

// Security: Validate response headers before caching
function isResponseSafeToCache(response) {
  // Don't cache responses with Set-Cookie headers (may contain sensitive data)
  if (response.headers.has('Set-Cookie')) {
    return false;
  }

  // Don't cache responses with Cache-Control: no-store
  const cacheControl = response.headers.get('Cache-Control');
  if (cacheControl && cacheControl.includes('no-store')) {
    return false;
  }

  // Don't cache responses with sensitive content types
  const contentType = response.headers.get('Content-Type');
  if (contentType && (contentType.includes('application/json') || contentType.includes('text/plain'))) {
    // Skip caching API responses that might contain user data
    return false;
  }

  return true;
}

// Cache metadata management for integrity and expiration
async function getCacheMetadata(url) {
  try {
    const cache = await caches.open(METADATA_CACHE);
    const response = await cache.match(url);
    if (response) {
      return await response.json();
    }
  } catch (error) {
    console.warn('[SW] Failed to get cache metadata:', error);
  }
  return null;
}

async function setCacheMetadata(url, metadata) {
  try {
    const cache = await caches.open(METADATA_CACHE);
    const data = JSON.stringify(metadata);
    await cache.put(url, new Response(data, {
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (error) {
    console.warn('[SW] Failed to set cache metadata:', error);
  }
}

// Check if cached response is still valid
async function isCacheValid(url) {
  const metadata = await getCacheMetadata(url);
  if (!metadata) {
    return false;
  }

  // Check expiration
  const now = Date.now();
  if (now - metadata.timestamp > CACHE_MAX_AGE) {
    console.log('[SW] Cache expired for:', url);
    return false;
  }

  return true;
}

// Compute integrity hash for response
async function computeIntegrityHash(response) {
  try {
    const buffer = await response.clone().arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    console.warn('[SW] Failed to compute integrity hash:', error);
    return null;
  }
}

// Verify cached response integrity
async function verifyCacheIntegrity(url, response) {
  const metadata = await getCacheMetadata(url);
  if (!metadata || !metadata.integrityHash) {
    // No integrity hash stored, can't verify
    return true;
  }

  const currentHash = await computeIntegrityHash(response);
  if (currentHash !== metadata.integrityHash) {
    console.warn('[SW] Cache integrity check failed for:', url);
    // Remove corrupted cache
    const cache = await caches.open(CACHE_NAME);
    await cache.delete(url);
    await caches.open(METADATA_CACHE).then(c => c.delete(url));
    return false;
  }

  return true;
}

// Determine caching strategy based on request
function getCachingStrategy(request) {
  const url = new URL(request.url);

  // Security: Don't cache untrusted origins
  if (!isTrustedOrigin(request.url)) {
    return CACHE_STRATEGIES.NETWORK_ONLY;
  }

  // Cache static assets (images, fonts, videos)
  if (url.pathname.match(/\.(png|jpg|jpeg|webp|gif|svg|ico|woff|woff2|ttf|otf|mp4|webm)$/)) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // Cache JS and CSS files
  if (url.pathname.match(/\.(js|css)$/)) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // Network only for API calls (Sanity CMS) - don't cache user data
  if (url.hostname.includes('sanity.io')) {
    return CACHE_STRATEGIES.NETWORK_ONLY;
  }

  // Network only for analytics
  if (url.hostname.includes('google-analytics.com') ||
      url.hostname.includes('googletagmanager.com') ||
      url.hostname.includes('contentsquare.net')) {
    return CACHE_STRATEGIES.NETWORK_ONLY;
  }

  // Network first for HTML pages
  if (request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // Default: network only (safer)
  return CACHE_STRATEGIES.NETWORK_ONLY;
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      console.log('[SW] Skip waiting');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Keep current cache and metadata cache
          if (cacheName !== CACHE_NAME && cacheName !== METADATA_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - handle requests with appropriate strategy
self.addEventListener('fetch', (event) => {
  const strategy = getCachingStrategy(event.request);

  if (strategy === CACHE_STRATEGIES.NETWORK_ONLY) {
    // Don't cache, just fetch
    return;
  }

  if (strategy === CACHE_STRATEGIES.CACHE_FIRST) {
    event.respondWith(cacheFirst(event.request));
  } else if (strategy === CACHE_STRATEGIES.NETWORK_FIRST) {
    event.respondWith(networkFirst(event.request));
  } else if (strategy === CACHE_STRATEGIES.CACHE_ONLY) {
    event.respondWith(cacheOnly(event.request));
  }
});

// Cache first strategy with security checks
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    // Security: Check cache validity and integrity
    const isValid = await isCacheValid(request.url);
    if (!isValid) {
      console.log('[SW] Cache expired, fetching fresh:', request.url);
      // Cache expired, fetch from network
      return fetch(request).catch(() => cachedResponse);
    }

    const isIntact = await verifyCacheIntegrity(request.url, cachedResponse);
    if (!isIntact) {
      console.warn('[SW] Cache integrity failed, fetching fresh:', request.url);
      // Integrity check failed, fetch from network
      return fetch(request).catch(() => {
        return new Response('Resource integrity check failed', {
          status: 500,
          statusText: 'Integrity Check Failed'
        });
      });
    }

    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    // Cache successful GET responses only (Cache API doesn't support POST, PUT, etc.)
    if (networkResponse.ok && request.method === 'GET') {
      // Security: Validate response before caching
      if (isResponseSafeToCache(networkResponse)) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, networkResponse.clone());

        // Store metadata with integrity hash
        const integrityHash = await computeIntegrityHash(networkResponse);
        if (integrityHash) {
          await setCacheMetadata(request.url, {
            timestamp: Date.now(),
            integrityHash: integrityHash,
            url: request.url
          });
        }
      } else {
        console.log('[SW] Response not safe to cache:', request.url);
      }
    }

    return networkResponse;
  } catch (error) {
    console.error('[SW] Fetch failed for:', request.url, error);

    // Return offline page if available
    const offlineResponse = await caches.match('/offline.html');
    if (offlineResponse) {
      return offlineResponse;
    }

    // Return basic offline response
    return new Response('Offline - Please check your internet connection', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Network first strategy with security checks
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful GET responses only (Cache API doesn't support POST, PUT, etc.)
    if (networkResponse.ok && request.method === 'GET') {
      // Security: Validate response before caching
      if (isResponseSafeToCache(networkResponse)) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, networkResponse.clone());

        // Store metadata with integrity hash
        const integrityHash = await computeIntegrityHash(networkResponse);
        if (integrityHash) {
          await setCacheMetadata(request.url, {
            timestamp: Date.now(),
            integrityHash: integrityHash,
            url: request.url
          });
        }
      } else {
        console.log('[SW] Response not safe to cache:', request.url);
      }
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, falling back to cache:', request.url);

    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      // Security: Verify cache integrity before serving fallback
      const isValid = await isCacheValid(request.url);
      if (!isValid) {
        console.warn('[SW] Cached fallback expired for:', request.url);
        // Cache expired, but network failed - serve stale with warning
        console.warn('[SW] Serving stale cache due to network failure');
      }

      const isIntact = await verifyCacheIntegrity(request.url, cachedResponse);
      if (!isIntact) {
        console.error('[SW] Cached fallback integrity check failed for:', request.url);
        // Don't serve corrupted cache even if network fails
        throw new Error('Cache integrity check failed');
      }

      return cachedResponse;
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineResponse = await caches.match('/offline.html');
      if (offlineResponse) {
        return offlineResponse;
      }
    }

    throw error;
  }
}

// Cache only strategy
async function cacheOnly(request) {
  return await caches.match(request);
}

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});
