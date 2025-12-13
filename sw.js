
const CACHE_NAME = 'mediguard-v1';
const STATIC_ASSETS = [
  './',
  'index.html',
  'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests (like CDN scripts) from aggressive caching if needed, 
  // but caching them is generally fine for offline support.
  
  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(event.request);
        
        // Cache successful GET requests
        if (event.request.method === 'GET' && networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }
        
        return networkResponse;
      } catch (error) {
        // Fallback to cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Offline fallback for navigation (SPA support)
        if (event.request.mode === 'navigate') {
            return caches.match('./') || caches.match('index.html');
        }
        
        throw error;
      }
    })()
  );
});
