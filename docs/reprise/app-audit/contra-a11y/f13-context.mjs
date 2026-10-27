import { launch, open, go, missed, focused } from './lib.mjs';
import { readFileSync } from 'node:fs';
const idx = JSON.parse(readFileSync('./ex-index.json', 'utf8'));
const withCtx = idx.filter((e) => e.context);
console.log('exercises with context:', withCtx.length, 'of', idx.length, 'types:', JSON.stringify(withCtx.reduce((a, e) => ((a[e.type] = (a[e.type] ?? 0) + 1), a), {})));
const b = await launch();
const ex = withCtx.find((e) => e.type === 'choice') ?? withCtx[0];
const { page, context } = await open(b, { storage: missed([ex.id]) });
await go(page, '/session?mode=mistakes');
await page.waitForTimeout(300);
const info = await page.evaluate(() => {
  const head = document.querySelector('.task-head');
  const kids = [...head.children].map((k) => `${k.tagName.toLowerCase()}.${k.className}${k === document.activeElement ? ' (FOCUSED)' : ''}`);
  const ctx = document.querySelector('.task-context');
  const refs = [...document.querySelectorAll('[aria-describedby],[aria-labelledby]')].map((e) => `${e.tagName}:${e.getAttribute('aria-describedby') ?? ''}|${e.getAttribute('aria-labelledby') ?? ''}`);
  return { kids, ctxId: ctx?.id || null, ctxText: ctx?.textContent.slice(0, 120), refs };
});
console.log(ex.id, JSON.stringify(info, null, 1));
// sample context text to judge whether it is needed to answer
const samples = await page.evaluate(async () => { const m = await import('/src/content/index.ts'); return m.EXERCISES.filter((e) => e.context).slice(0, 6).map((e) => `${e.id}: CONTEXT="${e.context.slice(0, 140)}" PROMPT="${e.prompt.slice(0, 80)}"`); });
console.log(samples.join('\n'));
await context.close();
await b.close();
