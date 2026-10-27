import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.json': 'application/json' };
/** Static server whose port survives stop/start, to simulate going offline on the same origin. */
export function staticServer(root) {
  let server = null;
  const sockets = new Set();
  let port = 0;
  let dir = root;
  const log = [];
  const handler = async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = normalize(join(dir, path.endsWith('/') ? path + 'index.html' : path));
    log.push(path);
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-cache' });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end('not found');
    }
  };
  return {
    log,
    setRoot(r) { dir = r; },
    async start() {
      server = createServer(handler);
      server.on('connection', (s) => { sockets.add(s); s.on('close', () => sockets.delete(s)); });
      await new Promise((r) => server.listen(port, '127.0.0.1', r));
      port = server.address().port;
      return `http://127.0.0.1:${port}/`;
    },
    async stop() {
      if (!server) return;
      for (const s of sockets) s.destroy();
      await new Promise((r) => server.close(r));
      server = null;
    },
  };
}
