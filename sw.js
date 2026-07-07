const CACHE = 'farkle-v9';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './apple-touch-icon.png',
  './favicon.png',
  './icon-192.png',
  './icon-512.png',
  './table-oak.jpeg',
  './table-wood.jpeg',
  './table-felt.jpeg',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async c => {
      // add individually so an optional miss (e.g. a texture) doesn't abort install
      await Promise.all(CORE.map(u => c.add(u).catch(() => {})));
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const isNav = req.mode === 'navigate' || req.url.endsWith('/index.html');

  if (isNav){
    // network-first for the page itself so new deploys show up immediately
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // cache-first for everything else (three.js modules, textures, icons)
  e.respondWith(
    caches.match(req).then(hit =>
      hit ||
      fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')){
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
    )
  );
});
