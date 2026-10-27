const PROJECT = '/home/user/Learn-UI-UX';
const C = '/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad/app-audit/contra-design';
const vite = await import(PROJECT + '/node_modules/vite/dist/node/index.js');
await vite.build({ root: PROJECT, configFile: PROJECT + '/vite.config.ts', cacheDir: C + '/.vite-cache-build', logLevel: 'warn', build: { outDir: C + '/dist', emptyOutDir: true } });
console.log('built');
