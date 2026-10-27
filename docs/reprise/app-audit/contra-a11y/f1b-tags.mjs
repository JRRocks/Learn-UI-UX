import { launch, open, go } from './lib.mjs';
const b = await launch();
const { page, context } = await open(b);
await go(page, '/');
const r = await page.evaluate(async () => {
  const m = await import('/src/content/index.ts');
  const tags = {}; const semantic = [];
  for (const e of m.EXERCISES.filter((x) => x.type === 'hotspot')) {
    const doc = new DOMParser().parseFromString(`<div>${e.visual.html}</div>`, 'text/html');
    doc.querySelectorAll('[data-hotspot]').forEach((z) => { const t = z.tagName.toLowerCase(); tags[t] = (tags[t] ?? 0) + 1; if (!['div', 'span', 'p', 'strong', 'b', 'em', 'i', 'small', 'label'].includes(t)) semantic.push(`${e.id}:${t}`); });
  }
  return { tags, semantic };
});
console.log(JSON.stringify(r.tags), '\nsemantic zones:', r.semantic.join(', '));
await context.close();
await b.close();
