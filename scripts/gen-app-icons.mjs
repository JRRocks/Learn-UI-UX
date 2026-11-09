// The PNG icons of the installed app (public/), drawn from public/favicon.svg:
//   icon-192.png, icon-512.png    the rounded tile, as browsers and Android show it ("any")
//   icon-maskable-512.png         a full-bleed square for Android's adaptive icons: the artwork,
//                                 scaled to 84 %, stays inside the circle of 80 % any launcher may cut
//   apple-touch-icon.png          the same full-bleed square, 180 px, for iOS home screens
// and desktop/app.ico, the icon of the Windows executable: the rounded tile at the nine sizes Windows
// asks for (16 to 256 px), each stored as a PNG.
// The Android launcher is drawn apart, as vectors (android/app/src/main/res/drawable): keep it in step.
// Run again after changing favicon.svg:  npm run icons
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const svg = readFileSync('public/favicon.svg', 'utf8');
// The tile is the first rect; the artwork is everything after it.
const tile = svg.match(/<rect [^>]*\/>/);
if (!tile) throw new Error('public/favicon.svg : rectangle de fond introuvable');
const fill = tile[0].match(/fill="([^"]+)"/)?.[1] ?? '#2442d9';
const art = svg.slice(svg.indexOf(tile[0]) + tile[0].length).replace(/<\/svg>\s*$/, '');
const square = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="${fill}"/><g transform="translate(16 16) scale(0.84) translate(-15 -16)">${art}</g></svg>`;

const icons = [
  ['icon-192.png', svg, 192],
  ['icon-512.png', svg, 512],
  ['icon-maskable-512.png', square, 512],
  ['apple-touch-icon.png', square, 180],
];

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const [name, source, size] of icons) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<body style="margin:0">${source.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body>`);
    await page.screenshot({ path: `public/${name}`, omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  }
  console.log(`${icons.length} icônes écrites dans public/`);

  // desktop/app.ico: a directory of entries (16 bytes each), then the PNG of each size.
  const sizes = [16, 20, 24, 32, 40, 48, 64, 128, 256];
  const pngs = [];
  for (const size of sizes) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<body style="margin:0">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body>`);
    pngs.push(await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } }));
  }
  const head = Buffer.alloc(6 + 16 * sizes.length);
  head.writeUInt16LE(0, 0); // reserved
  head.writeUInt16LE(1, 2); // an icon
  head.writeUInt16LE(sizes.length, 4);
  let offset = head.length;
  sizes.forEach((size, i) => {
    const at = 6 + 16 * i;
    head.writeUInt8(size === 256 ? 0 : size, at); // width (0 stands for 256)
    head.writeUInt8(size === 256 ? 0 : size, at + 1); // height
    head.writeUInt8(0, at + 2); // no palette
    head.writeUInt8(0, at + 3); // reserved
    head.writeUInt16LE(1, at + 4); // colour planes
    head.writeUInt16LE(32, at + 6); // bits per pixel
    head.writeUInt32LE(pngs[i].length, at + 8);
    head.writeUInt32LE(offset, at + 12);
    offset += pngs[i].length;
  });
  writeFileSync('desktop/app.ico', Buffer.concat([head, ...pngs]));
  console.log(`desktop/app.ico écrit (${sizes.join(', ')} px)`);
} finally {
  await browser.close();
}
