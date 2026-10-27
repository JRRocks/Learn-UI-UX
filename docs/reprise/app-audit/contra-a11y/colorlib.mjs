// Injected into the page: robust CSS color → sRGB (paint on canvas), luminance, contrast.
export const COLOR_JS = `
(() => {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  window.__rgb = (c) => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#000'; ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1); const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  window.__lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  window.__ratio = (a, b) => { const la = __lum(a), lb = __lum(b); return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05); };
  window.__blend = (fg, bg, a = fg[3]) => [fg[0] * a + bg[0] * (1 - a), fg[1] * a + bg[1] * (1 - a), fg[2] * a + bg[2] * (1 - a), 1];
  // effective background: walk up ancestors compositing translucent backgrounds
  window.__bgOf = (el) => { const stack = []; let e = el; while (e && e.nodeType === 1) { const c = __rgb(getComputedStyle(e).backgroundColor); if (c[3] > 0) { stack.push(c); if (c[3] >= 1) break; } e = e.parentElement || (e.getRootNode && e.getRootNode().host) || null; } let bg = [255, 255, 255, 1]; for (let i = stack.length - 1; i >= 0; i--) bg = __blend(stack[i], bg); return bg; };
})();
`;
