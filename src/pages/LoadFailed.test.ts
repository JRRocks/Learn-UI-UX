import { afterEach, describe, expect, it, vi } from 'vitest';
import { siteAnswers } from './LoadFailed';

/** What the check reads of an answer. */
type Answer = Pick<Response, 'type' | 'status'>;

const PAGE = 'https://example.test/Learn-UI-UX/#/apprendre/culture';

/** The page's address, and a network that answers each request with `answer`; returns the requests made. */
function network(answer: (init: RequestInit) => Promise<Answer>) {
  const requests: [string, RequestInit][] = [];
  vi.stubGlobal('location', { href: PAGE });
  vi.stubGlobal('fetch', (url: string, init: RequestInit) => {
    requests.push([url, init]);
    return answer(init);
  });
  return requests;
}

/** A connection that never answers: the request ends only when aborted. */
const stalled = (init: RequestInit) =>
  new Promise<Answer>((_, reject) => init.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError'))));

describe('reloading after a failed download: does the site answer?', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('asks for the page, fresh from the network, without following redirects', async () => {
    const requests = network(async () => ({ type: 'basic', status: 200 }));
    expect(await siteAnswers()).toBe(true);
    expect(requests).toHaveLength(1);
    expect(requests[0][0]).toBe(PAGE);
    expect(requests[0][1]).toMatchObject({ method: 'HEAD', cache: 'no-store', redirect: 'manual' });
  });

  it('says yes to any answer of the site, a redirect or a missing page included: the reload shows it', async () => {
    for (const answer of [{ type: 'opaqueredirect', status: 0 }, { type: 'basic', status: 404 }, { type: 'basic', status: 405 }] as Answer[]) {
      network(async () => answer);
      expect(await siteAnswers(), JSON.stringify(answer)).toBe(true);
    }
  });

  it('says no when the connection fails or the server errs: the reload would show an error page instead of the app', async () => {
    network(() => Promise.reject(new TypeError('Failed to fetch')));
    expect(await siteAnswers()).toBe(false);
    for (const status of [500, 502, 503]) {
      network(async () => ({ type: 'basic', status }));
      expect(await siteAnswers(), String(status)).toBe(false);
    }
  });

  it('gives up after 6 s on a stalled connection', async () => {
    vi.useFakeTimers();
    network(stalled);
    let answer: boolean | undefined;
    void siteAnswers().then((a) => (answer = a));
    await vi.advanceTimersByTimeAsync(5999);
    expect(answer).toBeUndefined();
    await vi.advanceTimersByTimeAsync(1);
    expect(answer).toBe(false);
  });

  it('stops its request when cancelled, as when the learner leaves the view: the answer is no', async () => {
    const requests = network(stalled);
    const cancel = new AbortController();
    const answer = siteAnswers(cancel.signal);
    cancel.abort();
    expect(await answer).toBe(false);
    expect(requests).toHaveLength(1);
    expect(requests[0][1].signal?.aborted).toBe(true);
  });

  it('asks nothing once cancelled', async () => {
    const requests = network(async () => ({ type: 'basic', status: 200 }));
    const cancel = new AbortController();
    cancel.abort();
    expect(await siteAnswers(cancel.signal)).toBe(false);
    expect(requests).toHaveLength(0);
  });
});
