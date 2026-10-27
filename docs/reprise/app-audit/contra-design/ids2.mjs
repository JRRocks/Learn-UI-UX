import { writeFileSync } from 'node:fs';
import { devServer } from './h.mjs';
const { server, close } = await devServer('.vite-cache-ssr');
try {
  const c = await server.ssrLoadModule('/src/content/index.ts');
  const grids = c.EXERCISES.filter((e) => e.type === 'grid').map((e) => ({ id: e.id, tol: e.tolerance ?? 1, scale: e.scale, criteria: e.criteria.map((x) => ({ id: x.id, label: x.label, expert: x.expert })) }));
  writeFileSync('grids.json', JSON.stringify(grids, null, 1));
  console.log(JSON.stringify(grids.map((g) => [g.id, g.tol, g.scale.min, g.scale.max, g.criteria.map((x) => x.expert).join(',')])));
} finally { await close(); }
