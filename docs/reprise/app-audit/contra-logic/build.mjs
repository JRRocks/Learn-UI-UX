import { build, ROOT, DIR } from './h.mjs';
await build({
  root: ROOT,
  configFile: ROOT + '/vite.config.ts',
  cacheDir: DIR + '/.vite-cache',
  logLevel: 'warn',
  build: { outDir: DIR + '/dist', emptyOutDir: true },
});
console.log('built');
