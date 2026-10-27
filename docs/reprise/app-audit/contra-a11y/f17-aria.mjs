import { launch, open, go, AXE, missed } from './lib.mjs';
const b = await launch();
const { page, context } = await open(b);
const runAxe = async (rules) => { if (!(await page.evaluate(() => typeof window.axe !== 'undefined'))) await page.addScriptTag({ content: AXE }); return page.evaluate(async (rules) => { const r = await window.axe.run(document, { runOnly: rules, resultTypes: ['violations', 'incomplete'] }); const f = (l) => l.map((v) => `${v.id}(${v.impact}) x${v.nodes.filter((n) => !n.target.some(Array.isArray)).length} ${v.nodes.slice(0, 2).map((n) => n.html.slice(0, 80)).join(' || ')}`); return { v: f(r.violations), i: f(r.incomplete) }; }, rules); };
await go(page, '/cultures/comparer?a=fr&b=cn');
await page.waitForTimeout(800);
console.log('compare axe:', JSON.stringify(await runAxe(['aria-prohibited-attr', 'heading-order', 'scrollable-region-focusable']), null, 1));
const notes = await page.evaluate(() => [...document.querySelectorAll('.dim-note')].slice(0, 2).map((n) => n.textContent.slice(0, 60)));
console.log('dim-note text shows values:', JSON.stringify(notes));
await go(page, '/ressources/aide-memoire');
await page.waitForTimeout(500);
const res = await page.evaluate(() => [...document.querySelectorAll('section.cheat')].map((s) => { const ids = s.getAttribute('aria-labelledby'); const ok = ids.split(/\s+/).every((id) => document.getElementById(id)); return `${JSON.stringify(ids)} resolves=${ok}`; }));
console.log('cheat sections:', res.join('\n  '));
// Chrome AX: role of a cheat section with spaces in id
const cdp = await context.newCDPSession(page);
const { nodes } = await cdp.send('Accessibility.getFullAXTree');
const regions = nodes.filter((n) => n.role?.value === 'region').map((n) => n.name?.value);
console.log('AX regions on aide-memoire:', JSON.stringify(regions));
await go(page, '/ressources/liens');
await page.waitForTimeout(500);
console.log('liens sections:', await page.evaluate(() => [...document.querySelectorAll('section[aria-labelledby]')].map((s) => `${s.getAttribute('aria-labelledby')} resolves=${s.getAttribute('aria-labelledby').split(/\s+/).every((id) => document.getElementById(id))}`).join(' | ')));
// pair page heading order
const pairs = await page.evaluate(async () => { const m = await import('/src/content/cultures/index.ts'); return Object.keys(m); });
console.log('cultures exports:', pairs.join(','));
await go(page, '/cultures');
await page.waitForSelector('.toc-list a[href*="/cultures/paire/"]');
const pairLinks = await page.evaluate(() => [...document.querySelectorAll('.toc-list a[href*="/cultures/paire/"]')].map((a) => a.getAttribute('href').replace('#', '')));
let skips = [];
for (const h of pairLinks) {
  await go(page, h);
  await page.waitForTimeout(300);
  const hs = await page.evaluate(() => [...document.querySelectorAll('main h1, main h2, main h3, main h4')].map((x) => x.tagName));
  const firstAfterH1 = hs[1];
  if (firstAfterH1 === 'H3') skips.push(h);
}
console.log(`pair pages: ${pairLinks.length}, with h1 → h3 skip: ${skips.length} e.g. ${skips.slice(0, 3).join(', ')}`);
await go(page, pairLinks[0]);
console.log('pair axe:', JSON.stringify(await runAxe(['heading-order'])));
await context.close();
// session player-xp
{
  const { page, context } = await open(b, { storage: missed(['modes-operate-hotspot']) });
  await go(page, '/session?mode=mistakes');
  await page.addScriptTag({ content: AXE });
  const r = await page.evaluate(async () => { const r = await window.axe.run(document.querySelector('.player-top'), { runOnly: ['aria-prohibited-attr'], resultTypes: ['violations', 'incomplete'] }); return { v: r.violations.map((v) => v.id + ':' + v.nodes[0].html), i: r.incomplete.map((v) => v.id + ':' + v.nodes[0].html) }; });
  console.log('player-xp axe:', JSON.stringify(r));
  await context.close();
}
await b.close();
