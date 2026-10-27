// Vite dev server (no HMR, no watch) on a free port; writes URL to server-url.txt.
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const ROOT = '/home/user/Learn-UI-UX';
const OUT = new URL('./server-url.txt', import.meta.url);
const req = createRequire(`${ROOT}/package.json`);
const { createServer } = await import(pathToFileURL(req.resolve('vite')).href);
const server = await createServer({ root: ROOT, server: { port: 0, host: '127.0.0.1', hmr: false, watch: null }, logLevel: 'error', clearScreen: false });
await server.listen();
const { port } = server.httpServer.address();
const url = `http://127.0.0.1:${port}/`;
writeFileSync(OUT, url);
console.log(`READY ${url} pid=${process.pid}`);
const stop = async () => { await server.close(); process.exit(0); };
process.on('SIGTERM', stop);
process.on('SIGINT', stop);
