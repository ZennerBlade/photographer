/* Hand-rolled service worker. The build (vite.config.ts) stamps the version and shell file list so each build gets a fresh cache. */
const VERSION = '__BUILD__';
const SHELL = '__SHELL__';
const SHELL_CACHE = `shell-${VERSION}`;
const IMG_CACHE = 'img-v1';
const SHELL_FILES = SHELL === '__SHELL__' ? [] : JSON.parse(SHELL);

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const shell = await caches.open(SHELL_CACHE);
    await shell.addAll(SHELL_FILES);
    self.skipWaiting();
    // Warm the photo cache in the background so the directory works offline; failures are ignored.
    const imgs = await caches.open(IMG_CACHE);
    const manifest = await fetch('./img-manifest.json').then((r) => r.json()).catch(() => []);
    await Promise.allSettled(manifest.map((u) => imgs.add(u)));
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== IMG_CACHE && k !== SHELL_CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./index.html').then((r) => r || caches.match('./'))));
    return;
  }
  const isImg = url.pathname.includes('/img/');
  e.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res.ok) (await caches.open(isImg ? IMG_CACHE : SHELL_CACHE)).put(req, res.clone());
      return res;
    } catch (err) {
      return hit || Response.error();
    }
  })());
});
