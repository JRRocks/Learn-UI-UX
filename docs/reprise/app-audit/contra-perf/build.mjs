// Build an isolated copy with Vite's API (cacheDir in scratchpad, never the project's node_modules/.vite).
import { createRequire } from 'node:module';
const [root, outDir, configFile] = process.argv.slice(2);
const require = createRequire(root + '/package.json');
const vite = await import(require.resolve('vite'));
const t0 = performance.now();
await vite.build({ root, configFile: configFile || undefined, cacheDir: root + '/../.vite-cache', build: { outDir, emptyOutDir: true, reportCompressedSize: true, sourcemap: process.env.MAP === '1' }, logLevel: 'info' });
console.log('build ms', Math.round(performance.now() - t0));
