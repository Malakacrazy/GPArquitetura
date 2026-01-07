// Service Worker for GP Arquitetura
// Provides offline capability and asset caching

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `gp-arquitetura-${CACHE_VERSION}`;

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

// Determine caching strategy based on request
function getCachingStrategy(request) {
  const url = new URL(request.url);

  // Cache static assets (images, fonts, videos)
  if (url.pathname.match(/\.(png|jpg|jpeg|webp|gif|svg|ico|woff|woff2|ttf|otf|mp4|webm)$/)) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // Cache JS and CSS files
  if (url.pathname.match(/\.(js|css)$/)) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // Network first for API calls (Sanity CMS)
  if (url.hostname.includes('sanity.io')) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // Network first for analytics
  if (url.hostname.includes('google-analytics.com') ||
      url.hostname.includes('googletagmanager.com') ||
      url.hostname.includes('contentsquare.net')) {
    return CACHE_STRATEGIES.NETWORK_ONLY;
  }

  // Network first for HTML pages
  if (request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // Default: network first
  return CACHE_STRATEGIES.NETWORK_FIRST;
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
          if (cacheName !== CACHE_NAME) {
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

// Cache first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
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

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, falling back to cache:', request.url);

    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
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
