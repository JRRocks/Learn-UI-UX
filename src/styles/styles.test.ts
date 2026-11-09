import { describe, expect, it } from 'vitest';

// Vitest hands CSS files over empty, and the project has no Node types: the stylesheets are read
// through Node's own process object (Node 20.16+, as content.test.ts reads its environment).
type Fs = { readFileSync(path: URL, encoding: 'utf8'): string };
const node = (globalThis as { process?: { getBuiltinModule(id: 'node:fs'): Fs } }).process;
const read = (file: string): string => node!.getBuiltinModule('node:fs').readFileSync(new URL(`./${file}`, import.meta.url), 'utf8');

// The layouts follow the reader's default text size: their width breakpoints are in em, 1em being that
// size (16 px unless the reader changed it in the browser). A breakpoint in px gave the layout drawn
// for 760 px of 16 px text to 760 px of 32 px text, and the page ran past the screen.
describe('stylesheets', () => {
  it.each(['tokens.css', 'base.css', 'app.css'])('%s sets its width breakpoints in em', (file) => {
    const css = read(file);
    expect(css.length).toBeGreaterThan(500);
    const px = [...css.matchAll(/@(?:media|container)[^{]*?\((?:min|max)-width:\s*[\d.]+px\)/g)].map((m) => m[0]);
    expect(px).toEqual([]);
  });
});

/* ---------------------------------------------------------------- the palette, computed */

type Rgb = [number, number, number];

/** `oklch(L C H)` as linear sRGB, and whether a screen can show it without clipping. */
function oklch(L: number, C: number, H: number): { rgb: Rgb; inGamut: boolean } {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const rgb: Rgb = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return { rgb, inGamut: rgb.every((v) => v >= -0.0005 && v <= 1.0005) };
}

/** Relative luminance (WCAG 2.2), from linear sRGB clipped to the screen. */
const luminance = ([r, g, b]: Rgb): number => {
  const c = (v: number) => Math.min(1, Math.max(0, v));
  return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
};

const ratio = (a: Rgb, b: Rgb): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** The declarations of the first rule whose selector is `selector`, braces matched. */
function declarations(css: string, selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`tokens.css : règle « ${selector} » introuvable`);
  const open = css.indexOf('{', start);
  const close = css.indexOf('}', open);
  return Object.fromEntries([...css.slice(open + 1, close).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
}

function colour(tokens: Record<string, string>, name: string): { rgb: Rgb; inGamut: boolean } {
  let value = tokens[name];
  for (let hop = 0; hop < 5; hop++) {
    const ref = /^var\((--[\w-]+)\)$/.exec(value ?? '');
    if (!ref) break;
    value = tokens[ref[1]];
  }
  const m = /^oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)$/.exec(value ?? '');
  if (!m) throw new Error(`tokens.css : ${name} n’est pas une couleur oklch (« ${value} »)`);
  return oklch(Number(m[1]), Number(m[2]), Number(m[3]));
}

/** What is read as text, on the surface it is read on: 4.5:1 (WCAG 1.4.3). */
const TEXT: [string, string][] = [
  ['--ink', '--paper'],
  ['--ink', '--paper-2'],
  ['--ink', '--sheet'],
  ['--ink', '--stage'],
  ['--ink-2', '--paper'],
  ['--ink-2', '--paper-2'],
  ['--ink-2', '--sheet'],
  ['--ink-2', '--accent-wash'],
  ['--ink-3', '--paper'],
  ['--ink-3', '--paper-2'],
  ['--ink-3', '--sheet'],
  ['--on-accent', '--accent'],
  ['--on-action', '--action'],
  ['--accent-ink', '--paper'],
  ['--accent-ink', '--paper-2'],
  ['--accent-ink', '--sheet'],
  ['--accent-ink', '--accent-wash'],
  ['--on-accent-wash', '--accent-wash'],
  ['--ink', '--accent-wash'],
  ['--gold-ink', '--paper'],
  ['--gold-ink', '--gold-wash'],
  ['--ink', '--gold-wash'],
  ['--on-gold', '--gold'],
  ['--mark-ink', '--paper'],
  ['--mark-ink', '--paper-2'],
  ['--mark-ink', '--mark-wash'],
  ['--ink', '--mark-wash'],
  ['--ok-ink', '--paper'],
  ['--ok-ink', '--ok-wash'],
  ['--ink', '--ok-wash'],
  ['--partial-ink', '--paper'],
  ['--partial-ink', '--partial-wash'],
  ['--hero-fg', '--hero-bg'],
  ['--hero-bg', '--hero-fg'],
  ['--on-ink', '--ink'],
  ['--on-ink', '--mark-ink'],
  ['--on-ink', '--ok-ink'],
];

/** What is told apart as a shape (a control's edge, a meter, a mark, the focus ring): 3:1 (WCAG 1.4.11). */
const SHAPES: [string, string][] = [
  ['--control-border', '--paper'],
  ['--control-border', '--paper-2'],
  ['--control-border', '--sheet'],
  ['--meter', '--rule'],
  ['--meter', '--paper'],
  ['--meter', '--paper-2'],
  ['--accent', '--paper'],
  ['--accent', '--paper-2'],
  ['--accent', '--sheet'],
  ['--accent', '--accent-wash'],
  ['--mark', '--paper'],
  ['--mark', '--mark-wash'],
  ['--ok', '--paper'],
  ['--ok', '--ok-wash'],
  ['--focus', '--paper'],
  ['--focus', '--paper-2'],
  ['--focus', '--sheet'],
  ['--ink-3', '--paper-2'],
  ['--gold-ink', '--gold-wash'],
  ['--gold-on-ink', '--ink'],
  ['--heat-2', '--paper'],
];

// « Le contraste se calcule ; il ne s’estime pas à l’œil » (the lesson « Couleur et contraste »). Every
// pair of tokens the stylesheets rely on, in both themes: a colour changed in tokens.css is checked here
// before it reaches a screen.
describe('palette (tokens.css)', () => {
  const css = read('tokens.css');
  const light = declarations(css, ':root');
  const dark = { ...light, ...declarations(css, ":root[data-theme='dark']") };

  it.each([
    ['clair', light],
    ['sombre', dark],
  ])('thème %s : le texte tient 4,5:1 et les formes 3:1', (_name, tokens) => {
    const low = [
      ...TEXT.map(([fg, bg]) => [fg, bg, ratio(colour(tokens, fg).rgb, colour(tokens, bg).rgb), 4.5] as const),
      ...SHAPES.map(([fg, bg]) => [fg, bg, ratio(colour(tokens, fg).rgb, colour(tokens, bg).rgb), 3] as const),
    ]
      .filter(([, , r, min]) => r < min)
      .map(([fg, bg, r, min]) => `${fg} sur ${bg} : ${r.toFixed(2)} (< ${min})`);
    expect(low).toEqual([]);
  });

  it('every colour is one a screen can show (sRGB), so that no browser has to guess a nearest one', () => {
    for (const tokens of [light, dark]) {
      // The opaque colours: a shadow's (« oklch(… / 0.2) ») is mixed with what lies under it.
      const out = Object.keys(tokens).filter((name) => /^oklch\([\d. ]+\)$/.test(tokens[name]) && !colour(tokens, name).inGamut);
      expect(out).toEqual([]);
    }
  });

  it('the dark theme is written twice (the system’s choice, the learner’s): both copies say the same', () => {
    const system = css.slice(css.indexOf('@media (prefers-color-scheme: dark)'));
    expect(declarations(system, ":root:not([data-theme='light'])")).toEqual(declarations(css, ":root[data-theme='dark']"));
  });
});
