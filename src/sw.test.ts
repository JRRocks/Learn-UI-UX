import { afterEach, describe, expect, it, vi } from 'vitest';
import source from './sw.js?raw';

/** What the worker reads of an answer of the network or of its cache. */
interface Answer {
  ok: boolean;
  type: string;
  status: number;
}

interface FetchEvent {
  request: { method: string; url: string; mode: string };
  respondWith(answer: Promise<unknown>): void;
  waitUntil(work: Promise<unknown>): void;
}

const SCOPE = 'https://example.test/Learn-UI-UX/';
const page = (status: number): Answer => ({ ok: status >= 200 && status < 300, type: 'basic', status });

/**
 * Runs the worker's script (src/sw.js, as the build writes it after `const BUILD = …`) against a
 * fake browser: a cache that holds this build's copy of the page, unless `stored` is false, and the
 * network given. `open` asks the worker for the page, as a tab opening the app does.
 */
function worker(network: () => Promise<Answer>, { stored = true } = {}) {
  const listeners = new Map<string, (event: FetchEvent) => void>();
  const kept = page(200);
  const self = { location: new URL(`${SCOPE}sw.js`), addEventListener: (type: string, fn: (event: FetchEvent) => void) => listeners.set(type, fn) };
  const caches = { match: async (url: string) => (stored && url === SCOPE ? kept : undefined) };
  new Function('BUILD', 'self', 'caches', 'fetch', source)({ version: 'test', files: ['./', './assets/index-a1b2c3d4.js'] }, self, caches, network);
  return {
    kept,
    open(): Promise<unknown> {
      let answer: Promise<unknown> | undefined;
      listeners.get('fetch')?.({ request: { method: 'GET', url: SCOPE, mode: 'navigate' }, respondWith: (p) => (answer = p), waitUntil: () => {} });
      if (!answer) throw new Error('the worker let the page through');
      return answer;
    },
  };
}

describe('service worker: the page', () => {
  afterEach(() => vi.useRealTimers());

  it('comes from the network when it answers', async () => {
    const fresh = page(200);
    expect(await worker(async () => fresh).open()).toBe(fresh);
  });

  it('passes a redirect on, so that the browser follows the site to its new address', async () => {
    // A navigation leaves redirects to the browser: the network answers it with an opaque redirect.
    const moved: Answer = { ok: false, type: 'opaqueredirect', status: 0 };
    expect(await worker(async () => moved).open()).toBe(moved);
  });

  it('is this build’s copy when the network fails or answers with an error', async () => {
    const down = worker(() => Promise.reject(new TypeError('Failed to fetch')));
    expect(await down.open()).toBe(down.kept);
    for (const status of [404, 500, 503]) {
      const w = worker(async () => page(status));
      expect(await w.open(), String(status)).toBe(w.kept);
    }
  });

  it('waits 3 s for the network, then answers with this build’s copy', async () => {
    vi.useFakeTimers();
    const fresh = page(200);
    const slow = worker(() => new Promise((resolve) => setTimeout(() => resolve(fresh), 2500)));
    const answer = slow.open();
    await vi.advanceTimersByTimeAsync(2500);
    expect(await answer).toBe(fresh);

    const stalled = worker(() => new Promise(() => {}));
    let served: unknown;
    void stalled.open().then((res) => (served = res));
    await vi.advanceTimersByTimeAsync(2999);
    expect(served).toBeUndefined();
    await vi.advanceTimersByTimeAsync(1);
    expect(served).toBe(stalled.kept);
  });

  it('is the network’s answer, whatever it is, before this build is stored', async () => {
    const error = page(503);
    expect(await worker(async () => error, { stored: false }).open()).toBe(error);
  });
});
