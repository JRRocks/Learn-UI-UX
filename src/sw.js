/* global BUILD */
// Service worker of Épreuves. The build writes it to dist/sw.js (scripts/vite-plugins.mjs) after a
// line `const BUILD = { version, files }`: the id of the build and every file it is made of.
// - install: every file is stored, so the app opens and works offline after a single visit;
// - activate: the files of this build are kept, and those of the previous build that this one no
//   longer has (a tab still showing the previous version can still open its lessons); older builds
//   are deleted, so the storage never grows from one deployment to the next;
// - the page comes from the network, so it is fresh, unless the network takes more than 3 s (slow or
//   stalled connection) or fails: this build's copy answers then. That copy is the one stored at
//   install, which names only files of this build; never a later answer of the network, which may
//   come from a newer build whose files are not stored (yet, or ever if its install fails). A
//   redirect is passed on, so the browser follows it: when the site moves to a new address, the
//   learners who have this worker reach it too;
// - files whose name holds a hash never change: stored copy first. Other files: network first;
// - a page asks whether this worker stores its files (src/main.tsx): if not, it keeps its lessons in
//   memory instead.
const PREFIX = 'epreuves-';
const CACHE = PREFIX + BUILD.version;
const PAGE_TIMEOUT = 3000;
const SCOPE = new URL('./', self.location).pathname;
const SHELL = new URL('./', self.location).href;
const FILES = new Set(BUILD.files.map((f) => new URL(f, self.location).href));
const isHashed = (pathname) => pathname.startsWith(`${SCOPE}assets/`);
const isPage = (pathname) => pathname === SCOPE || pathname === `${SCOPE}index.html`;

/**
 * The page fetched at install names only files of this build: a deployment, or a CDN still serving
 * the previous page, could otherwise pair this build's files with another build's page. Its
 * addresses are read as the page reads them, whatever the `base` of the build.
 */
async function checkPage(res) {
  const named = [...(await res.text()).matchAll(/[\w./-]*assets\/[\w.-]+/g)].map(([m]) => new URL(m, SHELL).href);
  const foreign = named.find((href) => !FILES.has(href));
  if (!named.length || foreign) throw new Error(`./ : page d’une autre version (${foreign ?? 'aucun fichier'})`);
}

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
            if (url.href === SHELL) await checkPage(res.clone());
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
        const old = await caches.open(previous);
        await Promise.all((await old.keys()).filter((req) => FILES.has(req.url)).map((req) => old.delete(req)));
      }
      await self.clients.claim();
    })(),
  );
});

/**
 * The app's page: fresh from the network, or this build's copy if the network fails, answers with an
 * error or takes too long. The network's answer is never stored: only this build's copy is sure to
 * name files that are all in the cache.
 *
 * A navigation leaves redirects to the browser: the network answers one with an opaque redirect,
 * passed on as it is, so the browser goes to the new address (a site moved to a custom domain or
 * renamed: every path of the old address redirects, this script included, so this worker could not
 * even be replaced; serving the copy instead would keep its learners at the old address for good).
 */
async function page(event) {
  const network = fetch(event.request);
  const kept = await caches.match(SHELL, { cacheName: CACHE });
  if (!kept) return network;
  const late = new Promise((resolve) => setTimeout(() => resolve(kept), PAGE_TIMEOUT));
  const answer = (res) => (res.ok || res.type === 'opaqueredirect' ? res : kept);
  return Promise.race([network.then(answer, () => kept), late]);
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

/**
 * Any other file of the app (manifest, icon): the network, else the stored copy. The page fetched
 * by a script rather than opened comes here too, and is not stored either (see `page`).
 */
async function fresh(event) {
  try {
    const res = await fetch(event.request);
    if (res.ok && !isPage(new URL(event.request.url).pathname)) {
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

// « Do you store this file? » (the entry script of a page): yes when it is a file of this build, all
// of which were stored at install.
self.addEventListener('message', (event) => {
  const url = event.data?.stores;
  if (typeof url === 'string') event.ports[0]?.postMessage(FILES.has(url));
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE)) return;
  if (request.mode === 'navigate' && isPage(url.pathname)) event.respondWith(page(event));
  else if (isHashed(url.pathname)) event.respondWith(stored(event));
  else event.respondWith(fresh(event));
});
