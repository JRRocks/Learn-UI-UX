import { launch, open, go, seeded, missed, SHOTS, save } from './lib.mjs';
const b = await launch();
// returns coverage info for the deepest focused element
const probe = () => {
  let el = document.activeElement; let root = document;
  while (el && el.shadowRoot && el.shadowRoot.activeElement) { root = el.shadowRoot; el = el.shadowRoot.activeElement; }
  if (!el || el === document.body) return { body: true };
  const r = el.getBoundingClientRect();
  const vw = innerWidth, vh = innerHeight;
  const label = (el.getAttribute('aria-label') || el.textContent || el.value || '').replace(/\s+/g, ' ').trim().slice(0, 40);
  if (r.width === 0 || r.height === 0) return { label, tag: el.tagName, zero: true };
  const pts = [];
  for (const fx of [0.1, 0.5, 0.9]) for (const fy of [0.1, 0.5, 0.9]) pts.push([r.left + r.width * fx, r.top + r.height * fy]);
  let visible = 0, inView = 0; const covers = new Set();
  for (const [x, y] of pts) {
    if (x < 0 || y < 0 || x >= vw || y >= vh) continue;
    inView++;
    let hit = root.elementFromPoint ? root.elementFromPoint(x, y) : document.elementFromPoint(x, y);
    if (hit && (hit === el || el.contains(hit) || hit.contains?.(el))) visible++;
    else if (hit) { const c = hit.closest('.tabbar, .topbar, .task-actions, .player-top, .toasts'); covers.add(c ? c.className.split(' ')[0] : hit.tagName.toLowerCase() + '.' + String(hit.className).split(' ')[0]); }
  }
  return { label, tag: el.tagName.toLowerCase(), y: Math.round(r.top), h: Math.round(r.height), inView, visible, covers: [...covers] };
};
async function walk(name, { width, height, hash, storage, shift = false, max = 120, setup }) {
  const { page, context } = await open(b, { width, height, storage });
  await go(page, hash);
  if (setup) await setup(page);
  await page.waitForTimeout(400);
  const hidden = []; const partial = []; let n = 0; const seen = new Set();
  for (let i = 0; i < max; i++) {
    await page.keyboard.press(shift ? 'Shift+Tab' : 'Tab');
    await page.waitForTimeout(60);
    const p = await page.evaluate(probe);
    if (p.body) continue;
    const key = `${p.tag}:${p.label}:${p.y}`;
    n++;
    if (p.inView > 0 && p.visible === 0) { hidden.push(`${p.tag} "${p.label}" y=${p.y} h=${p.h} under ${p.covers.join(',')}`); if (hidden.length === 1) await page.screenshot({ path: `${SHOTS}/f2-${name}.png` }); }
    else if (p.inView === 0) hidden.push(`${p.tag} "${p.label}" OUT OF VIEW y=${p.y}`);
    else if (p.visible < p.inView) partial.push(`${p.tag} "${p.label}" ${p.visible}/${p.inView} under ${p.covers.join(',')}`);
    if (seen.has(key) && i > 5) break; seen.add(key);
  }
  await context.close();
  return `${name} (${width}x${height} ${hash}${shift ? ' Shift+Tab' : ''}): stops=${n} fullyHidden=${hidden.length} partial=${partial.length}\n   hidden: ${hidden.slice(0, 8).join('\n           ')}${partial.length ? '\n   partial: ' + partial.slice(0, 4).join('\n            ') : ''}`;
}
const out = [];
const S = seeded();
out.push(await walk('entrainement-390', { width: 390, height: 740, hash: '/entrainement', storage: S }));
out.push(await walk('cultures-390', { width: 390, height: 740, hash: '/cultures', storage: S }));
out.push(await walk('progression-390', { width: 390, height: 740, hash: '/progression', storage: S }));
out.push(await walk('modes-390', { width: 390, height: 740, hash: '/apprendre/modes', storage: S }));
out.push(await walk('home-640x450', { width: 640, height: 450, hash: '/', storage: S }));
out.push(await walk('progression-640x450-shift', { width: 640, height: 450, hash: '/progression', storage: S, shift: true, setup: async (p) => { await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.evaluate(() => document.querySelector('.danger-zone button')?.focus()); } }));
out.push(await walk('progression-1280x800', { width: 1280, height: 800, hash: '/progression', storage: S }));
out.push(await walk('entrainement-1280x800', { width: 1280, height: 800, hash: '/entrainement', storage: S }));
save('f2-obscured.txt', out.join('\n'));
console.log(out.join('\n'));
await b.close();
