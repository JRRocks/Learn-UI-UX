import { launch, open, go, missed, save, AXE } from './lib.mjs';
const b = await launch();
const out = [];
for (const id of ['modes-operate-hotspot', 'craft-floor-dashboard-hotspot']) {
  const { page, context } = await open(b, { storage: missed([id]) });
  await go(page, '/session?mode=mistakes');
  await page.waitForSelector('.mock[data-interactive]');
  await page.waitForTimeout(400);
  // zones: tag, role, label, text
  const zones = await page.evaluate(() => {
    const host = document.querySelector('.mock[data-interactive]');
    return { alt: host.getAttribute('aria-label'), zones: [...host.shadowRoot.querySelectorAll('[data-hotspot]')].map((z) => ({ tag: z.tagName.toLowerCase(), role: z.getAttribute('role'), label: z.getAttribute('aria-label'), text: z.textContent.replace(/\s+/g, ' ').trim().slice(0, 90) })) };
  });
  out.push(`== ${id}\nmock alt: ${zones.alt}`);
  for (const z of zones.zones) out.push(`  <${z.tag} role=${z.role} aria-label="${z.label}"> text="${z.text}"`);
  // CDP full AX tree, keep buttons and their children
  const cdp = await context.newCDPSession(page);
  const { nodes } = await cdp.send('Accessibility.getFullAXTree');
  const byId = new Map(nodes.map((n) => [n.nodeId, n]));
  const btns = nodes.filter((n) => n.role?.value === 'button' && /^Zone/.test(n.name?.value ?? ''));
  for (const n of btns) {
    const kids = (n.childIds ?? []).map((c) => byId.get(c)).filter(Boolean);
    const kidDesc = kids.map((k) => `${k.role?.value}${k.ignored ? '(ignored)' : ''}:"${(k.name?.value ?? '').slice(0, 40)}"`).join(', ');
    const pressed = (n.properties ?? []).find((p) => p.name === 'pressed')?.value?.value;
    out.push(`  AX button "${n.name.value}" pressed=${pressed} children=[${kidDesc}]`);
  }
  // accessible names of all exposed nodes that include the zone texts? check if any StaticText under the buttons is non-ignored
  const texts = [];
  const walk = (nid, inBtn) => { const n = byId.get(nid); if (!n) return; const isBtn = n.role?.value === 'button' && /^Zone/.test(n.name?.value ?? ''); if (inBtn && !n.ignored && (n.role?.value === 'StaticText')) texts.push(n.name?.value); (n.childIds ?? []).forEach((c) => walk(c, inBtn || isBtn)); };
  walk(nodes[0].nodeId, false);
  out.push(`  non-ignored StaticText inside zone buttons: ${texts.length} ${JSON.stringify(texts.slice(0, 6))}`);
  // axe on the mock
  await page.addScriptTag({ content: AXE });
  const r = await page.evaluate(async () => { const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }); return r.violations.map((v) => `${v.id}(${v.impact}) x${v.nodes.length}: ${v.nodes.slice(0, 3).map((n) => JSON.stringify(n.target)).join(' ')}`); });
  out.push('  axe: ' + r.join('\n       '));
  // playwright aria snapshot of the mock
  out.push('  ariaSnapshot:\n' + (await page.locator('.mock[data-interactive]').ariaSnapshot()).split('\n').map((l) => '    ' + l).join('\n'));
  await context.close();
}
save('f1-hotspot-ax.txt', out.join('\n'));
console.log(out.join('\n'));
await b.close();
