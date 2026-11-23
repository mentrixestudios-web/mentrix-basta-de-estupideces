const CACHE_NAME = 'basta-de-estupideces-v2.1.0';

const PRECACHE_ASSETS = [
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
  '/images/portada.jpg',
  '/images/carla.jpg',
  '/images/natalia.jpg',
  '/images/paulina.jpg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Precache warning:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Purgando caché obsoleta:', key);
            return caches.delete(key);
          }
          return null;
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Exclude chrome-extension, non-http, and live dev servers
  if (!url.protocol.startsWith('http')) return;

  // 1. NAVIGATION REQUESTS (HTML / Root): Always NETWORK-FIRST
  // This guarantees user always gets latest index.html with up-to-date chunk hashes
  const isNavigation = request.mode === 'navigate' ||
                       request.destination === 'document' ||
                       url.pathname === '/' ||
                       url.pathname.endsWith('.html');

  if (isNavigation) {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, copy);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback
          return caches.match(request).then((cached) => {
            return cached || caches.match('/index.html') || caches.match('/');
          });
        })
    );
    return;
  }

  // 2. STATIC ASSETS & AUDIO: Stale-while-revalidate with HTML-leak protection
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const contentType = networkResponse.headers.get('content-type') || '';
            
            // CRITICAL: If requesting a JS or CSS asset but received HTML (Cloudflare 404 redirect),
            // DO NOT cache it! That would poison the cache with HTML inside JS chunks.
            const isJsOrCss = url.pathname.endsWith('.js') || url.pathname.endsWith('.css');
            if (isJsOrCss && contentType.includes('text/html')) {
              console.warn('[SW] Rejected caching HTML served for asset:', url.pathname);
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
