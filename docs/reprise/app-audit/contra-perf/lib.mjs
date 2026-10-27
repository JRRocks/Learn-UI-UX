import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
const require = createRequire(import.meta.url);
export const { chromium } = require('playwright');
export const HERE = new URL('.', import.meta.url).pathname;
export async function server(root) {
  const child = spawn(process.execPath, [HERE + 'serve.mjs', root], { stdio: ['ignore', 'pipe', 'inherit'] });
  const port = await new Promise((ok, ko) => { child.stdout.once('data', (d) => ok(Number(String(d).trim()))); child.once('exit', (c) => ko(new Error('exit ' + c))); });
  const base = `http://127.0.0.1:${port}/`;
  return { base, port, child, ctl: async (q) => (await fetch(base + '__ctl?' + new URLSearchParams(q))).json(), log: async () => (await fetch(base + '__log')).json(), stop: () => child.kill('SIGTERM') };
}
export const SLOW4G = { offline: false, latency: 150, downloadThroughput: (1.6e6) / 8, uploadThroughput: (750e3) / 8 };
export const med = (a) => { const s = a.filter((x) => x != null && !Number.isNaN(x)).sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : null; };
// Page-side observers: FCP, LCP, long tasks, LoAF, app ready (#main-title present and not the boot splash).
export const OBS = `(() => {
  const P = (window.__m = { fcp: null, lcp: [], lt: [], loaf: [], ready: null, ev: [] });
  const po = (type, cb, o = {}) => { try { new PerformanceObserver((l) => l.getEntries().forEach(cb)).observe({ type, buffered: true, ...o }); } catch {} };
  po('paint', (e) => { if (e.name === 'first-contentful-paint') P.fcp = e.startTime; });
  po('largest-contentful-paint', (e) => P.lcp.push({ t: Math.round(e.startTime), tag: e.element ? e.element.tagName + '.' + (e.element.className || '') : null, size: e.size }));
  po('longtask', (e) => P.lt.push({ s: Math.round(e.startTime), d: Math.round(e.duration) }));
  po('long-animation-frame', (e) => P.loaf.push({ s: Math.round(e.startTime), d: Math.round(e.duration), block: Math.round(e.blockingDuration), style: Math.round(e.styleAndLayoutStart ? e.startTime + e.duration - e.styleAndLayoutStart : 0), scripts: (e.scripts || []).reduce((a, s) => a + s.duration, 0), forced: (e.scripts || []).reduce((a, s) => a + (s.forcedStyleAndLayoutDuration || 0), 0) }));
  po('event', (e) => P.ev.push({ name: e.name, s: Math.round(e.startTime), d: Math.round(e.duration), id: e.interactionId }), { durationThreshold: 16 });
  const mo = new MutationObserver(() => { if (!P.ready && document.getElementById('main-title')) { P.ready = Math.round(performance.now()); mo.disconnect(); } });
  mo.observe(document, { childList: true, subtree: true });
})();`;
