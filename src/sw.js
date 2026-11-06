/* global BUILD */
// Service worker of Épreuves. The build writes it to dist/sw.js (scripts/vite-plugins.mjs) after a
// line `const BUILD = { version, files }`: the id of the build and every file it is made of.
// - install: every file is stored, so the app opens and works offline after a single visit;
// - activate: the files of this build are kept, and those of the previous build that this one no
//   longer has (a tab still showing the previous version can still open its lessons); older builds
//   are deleted, so the storage never grows from one deployment to the next;
// - the page comes from the network, so it is fresh, unless the network takes more than 3 s and a
//   stored copy exists (slow or stalled connection): the copy answers, the network updates it;
// - files whose name holds a hash never change: stored copy first. Other files: network first.
const PREFIX = 'epreuves-';
const CACHE = PREFIX + BUILD.version;
const PAGE_TIMEOUT = 3000;
const SCOPE = new URL('./', self.location).pathname;
const SHELL = new URL('./', self.location).href;
const isHashed = (pathname) => pathname.startsWith(`${SCOPE}assets/`);
const isPage = (pathname) => pathname === SCOPE || pathname === `${SCOPE}index.html`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        await Promise.all(
          BUILD.files.map(async (file) => {
            const url = new URL(file, self.location);
            const hashed = isHashed(url.pathname);
            // A hashed file stored by an earlier build is the same file: copy it rather than download it.
            const res = (hashed && (await caches.match(url.href))) || (await fetch(url.href, { cache: hashed ? 'default' : 'no-cache' }));
            if (!res.ok) throw new Error(`${file} : ${res.status}`);
            await cache.put(url.href, res);
          }),
        );
      } catch (error) {
        // Nothing half-stored: the next visit tries again from scratch.
        await caches.delete(CACHE);
        throw error;
      }
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Caches come in the order they were created: the last one before this build's is the previous build's.
      const ours = (await caches.keys()).filter((k) => k.startsWith(PREFIX));
      const previous = ours.filter((k) => k !== CACHE).at(-1);
      await Promise.all(ours.filter((k) => k !== CACHE && k !== previous).map((k) => caches.delete(k)));
      // The previous build keeps only the files this one no longer has: a tab still showing it finds
      // the others in this build's cache, so nothing is stored twice.
      if (previous) {
        const now = new Set(BUILD.files.map((f) => new URL(f, self.location).href));
        const old = await caches.open(previous);
        await Promise.all((await old.keys()).filter((req) => now.has(req.url)).map((req) => old.delete(req)));
      }
      await self.clients.claim();
    })(),
  );
});

/** The app's page: fresh from the network, or the stored copy if the network fails or takes too long. */
async function page(event) {
  const network = fetch(event.request).then((res) => {
    if (res.ok && (res.headers.get('content-type') ?? '').includes('text/html')) {
      const copy = res.clone();
      event.waitUntil(caches.open(CACHE).then((c) => c.put(SHELL, copy)));
    }
    return res;
  });
  // The network's answer still updates the copy when the copy was served first.
  event.waitUntil(network.catch(() => {}));
  const kept = await caches.match(SHELL);
  if (!kept) return network;
  const late = new Promise((resolve) => setTimeout(() => resolve(kept), PAGE_TIMEOUT));
  return Promise.race([network.then((res) => (res.ok ? res : kept), () => kept), late]);
}

/** A file whose name holds a hash: the stored copy, else the network (stored for next time). */
async function stored(event) {
  const hit = await caches.match(event.request);
  if (hit) return hit;
  const res = await fetch(event.request);
  if (res.ok) {
    const copy = res.clone();
    event.waitUntil(caches.open(CACHE).then((c) => c.put(event.request, copy)));
  }
  return res;
}

/** Any other file of the app (manifest, icon): the network, else the stored copy. */
async function fresh(event) {
  try {
    const res = await fetch(event.request);
    if (res.ok) {
      const copy = res.clone();
      event.waitUntil(caches.open(CACHE).then((c) => c.put(event.request, copy)));
    }
    return res;
  } catch (error) {
    const hit = await caches.match(event.request);
    if (hit) return hit;
    throw error;
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE)) return;
  if (request.mode === 'navigate' && isPage(url.pathname)) event.respondWith(page(event));
  else if (isHashed(url.pathname)) event.respondWith(stored(event));
  else event.respondWith(fresh(event));
});
