/**
 * Minimal service worker: cache kun hashede byggfiler under /assets/.
 * API (/api/*), navigasjon og HTML caches ikke — unngår feil SPA-/bestillings-cache.
 */
const CACHE = 'oslolatte-assets-v0.1.0-0a8a26c';
function isAssetGet(request) {
  if (request.method !== 'GET') return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  if (url.pathname.startsWith('/api/')) return false;
  return url.pathname.startsWith('/assets/');
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  if (!isAssetGet(event.request)) return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          void caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(event.request)),
  );
});
