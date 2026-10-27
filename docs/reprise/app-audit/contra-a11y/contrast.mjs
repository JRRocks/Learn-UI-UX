// Composite-aware contrast helper run in page: renders element to pixel colors via computed styles.
export const pageContrastFns = `
window.__parse = (c) => { const ctx = document.createElement('canvas').getContext('2d'); ctx.fillStyle = '#000'; ctx.fillStyle = c; const s = ctx.fillStyle; if (s.startsWith('#')) { const n = parseInt(s.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255, 1]; } const m = s.match(/[\\d.]+/g).map(Number); return [m[0], m[1], m[2], m[3] ?? 1]; };
window.__lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
window.__ratio = (a, b) => { const la = __lum(a), lb = __lum(b); return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05); };
window.__blend = (fg, bg) => { const a = fg[3]; return [fg[0] * a + bg[0] * (1 - a), fg[1] * a + bg[1] * (1 - a), fg[2] * a + bg[2] * (1 - a), 1]; };
`;
