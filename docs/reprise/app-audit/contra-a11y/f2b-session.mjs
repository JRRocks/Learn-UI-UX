import { launch, open, go, missed, SHOTS, save } from './lib.mjs';
const b = await launch();
const probe = () => {
  let el = document.activeElement; let root = document;
  while (el && el.shadowRoot && el.shadowRoot.activeElement) { root = el.shadowRoot; el = el.shadowRoot.activeElement; }
  if (!el || el === document.body) return { body: true };
  // option tiles: the visible focus indicator is on the .option label (radio is visually hidden)
  let tgt = el;
  if (el.classList?.contains('visually-hidden') && el.closest('.option')) tgt = el.closest('.option');
  const r = tgt.getBoundingClientRect();
  const label = (el.getAttribute('aria-label') || tgt.textContent || el.value || '').replace(/\s+/g, ' ').trim().slice(0, 40);
  const pts = [];
  for (const fx of [0.1, 0.5, 0.9]) for (const fy of [0.1, 0.5, 0.9]) pts.push([r.left + r.width * fx, r.top + r.height * fy]);
  let visible = 0, inView = 0; const covers = new Set();
  for (const [x, y] of pts) {
    if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
    inView++;
    const hit = root.elementFromPoint(x, y);
    if (hit && (hit === tgt || tgt.contains(hit) || hit.contains?.(tgt) || (root !== document && hit === root.host))) visible++;
    else if (hit) { const c = hit.closest('.task-actions, .player-top, .toasts'); covers.add(c ? c.className.split(' ')[0] : hit.tagName.toLowerCase() + '.' + String(hit.className).split(' ')[0]); }
  }
  return { label, tag: el.tagName.toLowerCase(), y: Math.round(r.top), h: Math.round(r.height), inView, visible, covers: [...covers] };
};
async function walk(name, { width, height, id, max = 80, reveal = false, shift = false }) {
  const { page, context } = await open(b, { width, height, storage: missed([id]) });
  await go(page, '/session?mode=mistakes');
  await page.waitForTimeout(400);
  if (reveal) {
    // answer anything then validate to show correction
    await page.evaluate(() => { document.querySelectorAll('.segmented').forEach((g) => g.querySelector('button')?.click()); document.querySelectorAll('.match-row select').forEach((s) => { s.value = s.options[1].value; s.dispatchEvent(new Event('change', { bubbles: true })); }); });
    await page.waitForTimeout(200);
    await page.click('.task-actions .btn-primary').catch(() => {});
    await page.waitForTimeout(700);
    await page.evaluate(() => document.querySelector('.task-prompt')?.focus());
  }
  const hidden = []; let n = 0; let shot = false;
  for (let i = 0; i < max; i++) {
    await page.keyboard.press(shift ? 'Shift+Tab' : 'Tab');
    await page.waitForTimeout(60);
    const p = await page.evaluate(probe);
    if (p.body) continue;
    n++;
    if (p.inView > 0 && p.visible === 0) { hidden.push(`${p.tag} "${p.label}" y=${p.y} under ${p.covers.join(',')}`); if (!shot) { shot = true; await page.screenshot({ path: `${SHOTS}/f2-${name}.png` }); } }
    if (p.label.startsWith('Quitter') && i > 3) break;
  }
  await context.close();
  return `${name} ${width}x${height} ${id}${reveal ? ' (after correction)' : ''}: stops=${n} fullyHidden=${hidden.length}\n   ${hidden.slice(0, 10).join('\n   ')}`;
}
const out = [];
out.push(await walk('grid-1280x900', { width: 1280, height: 900, id: 'heuristics-grid-booking' }).catch((e) => 'grid err ' + e.message));
out.push(await walk('match-390x740', { width: 390, height: 740, id: 'modes-match-surfaces' }).catch((e) => 'match err ' + e.message));
out.push(await walk('hotspot-1280x720', { width: 1280, height: 720, id: 'modes-operate-hotspot' }));
out.push(await walk('hotspot-390x740', { width: 390, height: 740, id: 'craft-floor-form-hotspot' }));
save('f2b-session.txt', out.join('\n'));
console.log(out.join('\n'));
await b.close();
