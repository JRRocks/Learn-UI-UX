import { afterEach, describe, expect, it, vi } from 'vitest';

/**
 * The background download of a page that no service worker stores (`preloadContent`), in a fake
 * browser: the addresses the build writes into the page, a network that can drop while the browser
 * still says it is online, and the events that start the downloads again. The retries (15 s and
 * more) are held and fired by the test; idle moments and downloads take real, short times.
 */

const realSetTimeout = globalThis.setTimeout;
const realClearTimeout = globalThis.clearTimeout;

// `load` resolves at once with what is in memory; otherwise it runs this loader, which fails.
const absent = () => Promise.reject(new Error('absent'));

/** A fresh app (nothing in memory) in a fake browser. `answer` gives the status of each request, by its rank. */
async function start(answer: (rank: number, url: string) => 'ok' | 'down' | 404 = () => 'ok', { online = true } = {}) {
  vi.resetModules();
  const content = await import('./index');
  const { load } = await import('../lib/useLoad');

  const lessons = Object.fromEntries(content.MODULES.map((m) => [`apprendre/${m.id}`, `./assets/${m.id}.js`]));
  const files = {
    routes: { ...lessons, cultures: './assets/cultures.js', 'cultures/labo': null, 'ressources/anti-patterns': './assets/catalog.js' },
    rules: './assets/rules.js',
    statements: './assets/statements.js',
    fonts: ['./assets/italic.woff2', './assets/mono.woff2'],
  };
  const keyOf = new Map<string, string>([
    ...content.MODULES.map((m): [string, string] => [`./assets/${m.id}.js`, `module:${m.id}`]),
    ['./assets/cultures.js', 'cultures'],
    ['./assets/catalog.js', 'catalog'],
    ['./assets/rules.js', 'rules:*'],
    ['./assets/statements.js', 'statements'],
  ]);

  const listeners = new Map<string, Set<() => void>>();
  const on = (type: string, fn: () => void) => {
    if (!listeners.has(type)) listeners.set(type, new Set());
    listeners.get(type)?.add(fn);
  };
  const off = (type: string, fn: () => void) => void listeners.get(type)?.delete(fn);
  const fire = (type: string) => [...(listeners.get(type) ?? [])].forEach((fn) => fn());
  const browser = { onLine: online };
  const page = { visibilityState: 'visible', addEventListener: on, removeEventListener: off, fonts: [] as { status: string; load: () => Promise<void> }[] };
  const loadedFaces: string[] = [];
  page.fonts = ['italic', 'mono'].map((name) => {
    const face = {
      status: 'unloaded',
      load: async () => {
        loadedFaces.push(name);
        face.status = 'loaded';
      },
    };
    return face;
  });
  vi.stubGlobal('navigator', browser);
  vi.stubGlobal('window', { __contentFiles: files, addEventListener: on, removeEventListener: off });
  vi.stubGlobal('document', page);

  // The network: each request takes a few milliseconds; at most two are expected at a time.
  const requests: string[] = [];
  let active = 0;
  let peak = 0;
  vi.stubGlobal('fetch', async (url: string) => {
    const status = answer(requests.length, url);
    requests.push(url);
    peak = Math.max(peak, ++active);
    try {
      await new Promise((resolve) => realSetTimeout(resolve, 20));
      if (status === 'down') throw new TypeError('Failed to fetch');
      return new Response('// chunk', { status: status === 'ok' ? 200 : status });
    } finally {
      active--;
    }
  });

  // The retries: held until the test fires them.
  const retries = new Map<number, { fn: () => void; ms: number }>();
  let id = 0;
  vi.stubGlobal('setTimeout', (fn: () => void, ms = 0) => {
    if (ms < 1000) return realSetTimeout(fn, ms);
    retries.set(++id, { fn, ms });
    return id;
  });
  vi.stubGlobal('clearTimeout', (handle: unknown) => (typeof handle === 'number' && retries.has(handle) ? retries.delete(handle) : realClearTimeout(handle as never)));

  const inMemory = (key: string) => load(key, absent).then(() => true, () => false);
  /** Every part in memory and every face of the fonts loaded: the downloads are over. */
  const finished = async () => loadedFaces.length === page.fonts.length && (await Promise.all([...keyOf.values()].map(inMemory))).every(Boolean);
  return {
    ...content,
    load,
    browser,
    page,
    requests,
    keyOf,
    loadedFaces,
    peak: () => peak,
    retries,
    listening: () => ({ online: listeners.get('online')?.size ?? 0, visibilitychange: listeners.get('visibilitychange')?.size ?? 0 }),
    fire,
    /** Fires the one retry held, as the time passes. */
    later() {
      const [[handle, retry]] = retries;
      retries.delete(handle);
      retry.fn();
    },
    inMemory,
    finished,
  };
}

describe('everything in the background, on a dropped connection (a page that no service worker stores)', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('starts again on its own when the browser does not notice the drop, with the part that was being downloaded', async () => {
    // Four files arrive, then the connection drops for a while; the browser still says it is online.
    let down = false;
    const app = await start((rank) => {
      if (rank === 4) down = true;
      return down ? 'down' : 'ok';
    });
    await app.preloadContent();
    const cut = app.requests.slice(4);
    expect(cut.length).toBeGreaterThan(0);
    // The parts whose download failed were never imported: the browser has no failure to keep.
    for (const url of cut) expect(await app.inMemory(app.keyOf.get(url)!), url).toBe(false);
    // One retry is waiting, 15 s later, and one listener of each event, not one more.
    expect([...app.retries.values()].map((r) => r.ms)).toEqual([15_000]);
    expect(app.listening()).toEqual({ online: 1, visibilitychange: 1 });

    down = false;
    app.later();
    await vi.waitFor(async () => expect(await app.finished()).toBe(true), { timeout: 10_000, interval: 100 });
    expect(app.loadedFaces).toEqual(['italic', 'mono']);
    // The cut parts were downloaded again, then imported; nothing else twice; never more than two at a time.
    for (const url of cut) expect(app.requests.filter((r) => r === url), url).toHaveLength(2);
    expect(app.requests).toHaveLength(new Set(app.requests).size + cut.length);
    expect(app.peak()).toBeLessThanOrEqual(2);
    expect(app.retries.size).toBe(0);
    expect(app.listening()).toEqual({ online: 0, visibilitychange: 0 });
  }, 20_000);

  it('starts again at once when the page is shown again or the browser is back online, and only once', async () => {
    let down = true;
    const app = await start((rank) => (rank >= 2 && down ? 'down' : 'ok'));
    await app.preloadContent();
    expect(app.retries.size).toBe(1);

    // Shown again while the connection is still down: a try, which waits for the next retry (1 min).
    app.fire('visibilitychange');
    await vi.waitFor(() => expect(app.retries.size).toBe(1), { timeout: 5000 });
    expect([...app.retries.values()].map((r) => r.ms)).toEqual([60_000]);

    // Hidden: nothing. Back online: one try, and the other triggers are dropped.
    app.page.visibilityState = 'hidden';
    app.fire('visibilitychange');
    expect(app.retries.size).toBe(1);
    down = false;
    app.fire('online');
    expect(app.retries.size).toBe(0);
    expect(app.listening()).toEqual({ online: 0, visibilitychange: 0 });
    app.page.visibilityState = 'visible';
    app.fire('visibilitychange');
    app.fire('online');
    await vi.waitFor(async () => expect(await app.finished()).toBe(true), { timeout: 10_000, interval: 100 });
    expect(app.peak()).toBeLessThanOrEqual(2);
    expect(app.retries.size).toBe(0);
  }, 20_000);

  it('starts nothing offline, and nothing is requested until the browser is back online', async () => {
    const app = await start(undefined, { online: false });
    await app.preloadContent();
    expect(app.requests).toEqual([]);
    app.browser.onLine = true;
    app.fire('online');
    await vi.waitFor(async () => expect(await app.finished()).toBe(true), { timeout: 10_000, interval: 100 });
    expect(app.requests).toHaveLength(new Set(app.requests).size);
  }, 20_000);

  it('stops for good when the server no longer has the files of this version', async () => {
    const app = await start((rank) => (rank === 3 ? 404 : 'ok'));
    await app.preloadContent();
    const sent = app.requests.length;
    expect(app.retries.size).toBe(0);
    expect(app.listening()).toEqual({ online: 0, visibilitychange: 0 });
    await new Promise((resolve) => realSetTimeout(resolve, 300));
    expect(app.requests).toHaveLength(sent);
  }, 20_000);

  it('goes on when a part throws, here the fonts of a browser that cannot load them', async () => {
    const app = await start();
    Object.assign(app.page, { fonts: undefined });
    await app.preloadContent();
    for (const key of app.keyOf.values()) expect(await app.inMemory(key), key).toBe(true);
    expect(app.loadedFaces).toEqual([]);
    expect(app.retries.size).toBe(0);
  }, 20_000);

  it('downloads nothing already in memory', async () => {
    const app = await start();
    await app.loadModule('typography');
    await app.preloadContent();
    await vi.waitFor(async () => expect(await app.finished()).toBe(true), { timeout: 10_000, interval: 100 });
    expect(app.requests).not.toContain('./assets/typography.js');
  }, 20_000);
});
