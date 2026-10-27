// Dump current exercise ids/types and module/culture lists from the live content (SSR, read-only).
import { writeFileSync } from 'node:fs';
import { devServer } from './h.mjs';
const { server, close } = await devServer('.vite-cache-ssr');
try {
  const c = await server.ssrLoadModule('/src/content/index.ts');
  const s = await server.ssrLoadModule('/src/engine/session.ts');
  const out = {
    modules: c.MODULES.map((m) => ({ id: m.id, title: m.title, category: m.category })),
    exercises: c.EXERCISES.map((e) => ({ id: e.id, type: e.type, module: e.module, culture: e.culture, duel: s.isDuel(e), nOpts: e.options?.length, visual: e.options?.some?.((o) => o.visual) ?? false })),
    categories: c.CATEGORIES.map((x) => ({ id: x.id, title: x.title })),
  };
  writeFileSync('ids.json', JSON.stringify(out, null, 1));
  console.log(out.modules.length, 'modules', out.exercises.length, 'exercises');
} finally { await close(); }
