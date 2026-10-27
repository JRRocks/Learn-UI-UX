import { devServer } from './h.mjs';
const { server, close } = await devServer('.vite-cache-ssr');
try {
  const md = await server.ssrLoadModule('/src/lib/markdown.tsx');
  const c = await server.ssrLoadModule('/src/content/index.ts');
  const { createRequire } = await import('node:module');
  const req = createRequire('/home/user/Learn-UI-UX/package.json');
  const { renderToStaticMarkup } = req('react-dom/server');
  const React = req('react');
  const strip = (h) => h.replace(/<code[^>]*>[\s\S]*?<\/code>/g, '⟨code⟩').replace(/<[^>]+>/g, '').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  const hits = [];
  const check = (where, text) => {
    if (!text || typeof text !== 'string') return;
    const html = renderToStaticMarkup(React.createElement(md.Md, { text }));
    const t = strip(html);
    for (const m of t.matchAll(/[*`]/g)) hits.push(`${where}: …${t.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\n/g, ' ')}…`);
  };
  for (const m of c.MODULES) {
    for (const s of m.sections) {
      check(`${m.id}/${s.id}/body`, s.body);
      for (const e of s.examples ?? []) { check(`${m.id}/${s.id}/ex-bad`, e.badNote); check(`${m.id}/${s.id}/ex-good`, e.goodNote); }
    }
    for (const r of m.rules) { check(`${m.id}/rule-front`, r.front); check(`${m.id}/rule-back`, r.back); }
  }
  for (const e of c.EXERCISES) {
    check(`ex:${e.id}/prompt`, e.prompt); check(`ex:${e.id}/expl`, e.explanation); check(`ex:${e.id}/take`, e.takeaway); check(`ex:${e.id}/ctx`, e.context);
    for (const o of e.options ?? []) { check(`ex:${e.id}/opt`, o.label); check(`ex:${e.id}/why`, o.why); }
    for (const h of e.hotspots ?? []) check(`ex:${e.id}/hs`, h.why);
    for (const i of e.items ?? []) check(`ex:${e.id}/item`, i.label);
    for (const p of e.pairs ?? []) { check(`ex:${e.id}/l`, p.left); check(`ex:${e.id}/r`, p.right); }
    for (const cr of e.criteria ?? []) check(`ex:${e.id}/crit`, cr.why);
  }
  console.log(hits.length + ' leftover * or ` in rendered text');
  console.log(hits.slice(0, 40).join('\n'));
} finally { await close(); }
