// Minimal GitHub-Pages-like static server: gzip, Cache-Control: max-age=600, ETag/304.
// Control endpoint: /__ctl?root=<dir>&navDelay=<ms>&down=0|1 ; /__log returns and clears the request log.
import { createServer } from 'node:http';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { join, extname, normalize, resolve } from 'node:path';
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json' };
const st = { root: resolve(process.argv[2]), navDelay: 0, down: 0, hang: 0 };
const log = [];
const memo = new Map();
const srv = createServer((req, res) => {
  const u = new URL(req.url, 'http://h');
  if (u.pathname === '/__ctl') { for (const [k, v] of u.searchParams) st[k] = k === 'root' ? resolve(v) : Number(v); res.end(JSON.stringify(st)); return; }
  if (u.pathname === '/__log') { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(log.splice(0))); return; }
  const nav = req.headers['sec-fetch-mode'] === 'navigate';
  log.push({ t: Date.now(), p: u.pathname, mode: req.headers['sec-fetch-mode'] || null, dest: req.headers['sec-fetch-dest'] || null });
  if (st.down) { req.socket.destroy(); return; }
  const go = () => {
    let p = normalize(decodeURIComponent(u.pathname)).replace(/^\/+/, '');
    if (!p || p.endsWith('/')) p += 'index.html';
    const f = join(st.root, p);
    if (!f.startsWith(st.root) || !existsSync(f) || statSync(f).isDirectory()) { res.statusCode = 404; res.end('404'); log.push({ p: u.pathname, status: 404 }); return; }
    const key = f + statSync(f).mtimeMs;
    let e = memo.get(key);
    if (!e) { const raw = readFileSync(f); e = { raw, gz: TYPES[extname(f)] && extname(f) !== '.woff2' ? gzipSync(raw, { level: 9 }) : null, etag: '"' + createHash('sha1').update(raw).digest('hex').slice(0, 16) + '"' }; memo.set(key, e); }
    res.setHeader('content-type', TYPES[extname(f)] || 'application/octet-stream');
    res.setHeader('cache-control', 'max-age=600');
    res.setHeader('etag', e.etag);
    res.setHeader('vary', 'Accept-Encoding');
    if (req.headers['if-none-match'] === e.etag) { res.statusCode = 304; res.end(); return; }
    const gz = e.gz && /gzip/.test(req.headers['accept-encoding'] || '');
    const body = gz ? e.gz : e.raw;
    if (gz) res.setHeader('content-encoding', 'gzip');
    res.setHeader('content-length', body.length);
    res.end(body);
  };
  if (nav && st.hang) return; // lie-fi: request accepted, no response ever
  if (nav && st.navDelay) setTimeout(go, st.navDelay); else go();
});
srv.listen(0, '127.0.0.1', () => console.log(srv.address().port));
process.on('SIGTERM', () => { srv.close(); process.exit(0); });
