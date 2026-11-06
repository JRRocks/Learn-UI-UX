import { Pause, Play, RotateCcw } from 'lucide-react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { flushSync } from 'react-dom';
import type { Visual } from '../engine/types';
import { MOCK_ICONS } from './mockIcons';
import { MOCK_KIT } from './mockKit';

export type HotspotState = 'picked' | 'hit' | 'wrong' | 'missed';

export interface Mark {
  id: string;
  n: number;
  kind: 'hit' | 'miss';
}

/** What moves in a mock, for its « Rejouer » and « Mettre en pause » controls. */
export interface MotionInfo {
  /** At least one animation comes to an end: it can be replayed. */
  finite: boolean;
  /** An animation loops forever or lasts more than five seconds: it can be paused (WCAG 2.2.2). */
  long: boolean;
}

interface MockProps {
  visual: Visual;
  /** Hotspot mode: lays real buttons over the `[data-hotspot]` zones and reports activations. */
  onPick?: (id: string) => void;
  states?: Record<string, HotspotState | undefined>;
  /** Correction marks drawn around hotspots once the answer is revealed. */
  marks?: Mark[];
  /** CSS custom properties set on the host (slider previews). */
  vars?: Record<string, string>;
  className?: string;
  /**
   * « Rejouer » and « Mettre en pause » under an animated mock (default). A mock inside an option's
   * label leaves them to its player, which shows one set for all its mocks and drives `paused` and `replay`.
   */
  controls?: boolean;
  paused?: boolean;
  /** Each change restarts the animations. */
  replay?: number;
  onMotion?: (info: MotionInfo | null) => void;
}

const ATTR = /([a-zA-Z-:]+)="([^"]*)"/g;

/** The kit, and the frame reset that must come after it and before the visual's own rules. */
const KIT_CSS = `${MOCK_KIT}\n.mk-framed{background:transparent;border-radius:0;overflow:visible}\n`;

/**
 * Shared style sheets: the kit is parsed once for the whole page and adopted by every mock, and a
 * visual's own rules once per visual, instead of a copy of their text in each shadow root. Without
 * constructable style sheets (older browsers), `<style>` elements carry them.
 */
const SHARED_SHEETS =
  typeof CSSStyleSheet !== 'undefined' && 'replaceSync' in CSSStyleSheet.prototype && typeof ShadowRoot !== 'undefined' && 'adoptedStyleSheets' in ShadowRoot.prototype;
let kitSheet: CSSStyleSheet | null = null;
const ownSheets = new WeakMap<Visual, CSSStyleSheet>();

function sheet(css: string): CSSStyleSheet {
  const s = new CSSStyleSheet();
  s.replaceSync(css);
  return s;
}

function sheetsOf(visual: Visual): CSSStyleSheet[] {
  kitSheet ??= sheet(KIT_CSS);
  if (!visual.css) return [kitSheet];
  let own = ownSheets.get(visual);
  if (!own) ownSheets.set(visual, (own = sheet(visual.css)));
  return [kitSheet, own];
}

/** `<i data-icon="cart" class="x"></i>` → inline Lucide SVG. */
export function expandIcons(html: string): string {
  return html.replace(/<i\b([^>]*)><\/i>/g, (whole, attrs: string) => {
    const map = Object.fromEntries([...attrs.matchAll(ATTR)].map((m) => [m[1], m[2]]));
    const inner = map['data-icon'] && MOCK_ICONS[map['data-icon']];
    if (!inner) return whole;
    const cls = ['mk-ico', map.class].filter(Boolean).join(' ');
    const style = map.style ? ` style="${map.style}"` : '';
    const sw = map['data-stroke'] ?? '2';
    const label = map['aria-label'] ? ` role="img" aria-label="${map['aria-label']}"` : ' aria-hidden="true"';
    return `<svg class="${cls}"${style} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${label}>${inner}</svg>`;
  });
}

function frame(visual: Visual, html: string): string {
  if (visual.frame === 'browser')
    return `<div class="mk-browser"><div class="mk-browser-bar" aria-hidden="true"><b></b><b></b><b></b><span></span></div><div class="mk-screen">${html}</div></div>`;
  if (visual.frame === 'phone')
    return `<div class="mk-phone"><div class="mk-phone-status" aria-hidden="true"><span>9:41</span><i></i></div><div class="mk-screen">${html}</div></div>`;
  return html;
}

/** A pen-like loop around a box: slightly irregular, overshooting its start, hugging wide boxes. */
function loopPath(x: number, y: number, w: number, h: number, seed: number): string {
  const pad = 6;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const rx = w / 2 + pad;
  const ry = h / 2 + pad;
  // Superellipse exponent: rounder for small boxes, squarer for long lines of text.
  const e = Math.min(0.72, 0.35 + 0.08 * Math.log2(Math.max(1, w / Math.max(h, 1))) * 2);
  const start = -2.4 + (seed % 3) * 0.35;
  const sweep = Math.PI * 2 + 0.4;
  const steps = 64;
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = start + sweep * t;
    const c = Math.cos(a);
    const s = Math.sin(a);
    const jitter = 2.2 * Math.sin(a * 3 + seed) + 3.5 * t;
    const px = cx + Math.sign(c) * Math.abs(c) ** (1 - e) * (rx + jitter);
    const py = cy + Math.sign(s) * Math.abs(s) ** (1 - e) * (ry + jitter * 0.6);
    d += `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`;
  }
  return d;
}

/* ---------------------------------------------------------------- drawn controls */

/** Links, fields and buttons drawn in a mock depict another product: never followed, filled or tabbed to. */
const DRAWN_CONTROLS = 'a[href], button, input, select, textarea, summary, iframe, [tabindex], [contenteditable]';

/* ---------------------------------------------------------------- hotspot answer layer */

/** Accessible name of a zone: what it shows (WCAG 2.5.3), or `data-hotspot-name` when it shows no text. */
export function zoneName(zone: HTMLElement, n: number): string {
  const lines = (zone.dataset.hotspotName ?? zone.innerText ?? zone.textContent ?? '')
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  let text = lines.reduce((acc, l) => (!acc ? l : /[.:;!?,…]$/.test(acc) ? `${acc} ${l}` : `${acc}, ${l}`), '');
  if (!text)
    text = [...zone.querySelectorAll('[aria-label], img[alt]')]
      .map((el) => el.getAttribute('aria-label') ?? el.getAttribute('alt') ?? '')
      .filter(Boolean)
      .join(', ');
  if (text.length > 80) text = `${text.slice(0, 80).replace(/\s+\S*$/, '')}…`;
  return text ? `Zone ${n}\u00A0: ${text}` : `Zone ${n}`;
}

interface Box {
  l: number;
  t: number;
  r: number;
  b: number;
}

/**
 * Grow each zone's target towards 24 × 24 px (WCAG 2.5.8) and a few pixels beyond (more on touch
 * screens). A target never takes more than its half of the gap to a neighbouring zone, minus a
 * 1 px margin: two targets never overlap nor touch, so a target that stays under 24 px still meets
 * the spacing exception as far as the mock allows.
 */
export function hitBoxes(zones: Box[], width: number, height: number, pad: number, min = 24): Box[] {
  const near = (a: Box, b: Box, axis: 'x' | 'y') => (axis === 'x' ? a.t < b.b + pad && a.b > b.t - pad : a.l < b.r + pad && a.r > b.l - pad);
  const half = (gap: number) => Math.max(0, gap / 2 - 1);
  return zones.map((z, i) => {
    const others = zones.filter((_, j) => j !== i);
    const room = {
      l: Math.min(z.l, ...others.filter((o) => o.r <= z.l && near(z, o, 'x')).map((o) => half(z.l - o.r))),
      r: Math.min(width - z.r, ...others.filter((o) => o.l >= z.r && near(z, o, 'x')).map((o) => half(o.l - z.r))),
      t: Math.min(z.t, ...others.filter((o) => o.b <= z.t && near(z, o, 'y')).map((o) => half(z.t - o.b))),
      b: Math.min(height - z.b, ...others.filter((o) => o.t >= z.b && near(z, o, 'y')).map((o) => half(o.t - z.b))),
    };
    // Zones the mock draws over each other (not nested) do not grow into each other either.
    const inside = (a: Box, b: Box) => a.l <= b.l && a.t <= b.t && a.r >= b.r && a.b >= b.b;
    for (const o of others) {
      if (inside(o, z) || inside(z, o) || o.l >= z.r || z.l >= o.r || o.t >= z.b || z.t >= o.b) continue;
      const ox = Math.min(z.r, o.r) - Math.max(z.l, o.l);
      const oy = Math.min(z.b, o.b) - Math.max(z.t, o.t);
      if (oy <= ox) room[o.t + o.b < z.t + z.b ? 't' : 'b'] = 0;
      else room[o.l + o.r < z.l + z.r ? 'l' : 'r'] = 0;
    }
    const grow = (size: number, a: number, b: number): [number, number] => {
      const want = Math.max(pad, (min - size) / 2);
      let x = Math.min(want, Math.max(0, a));
      let y = Math.min(want, Math.max(0, b));
      const short = min - size - x - y;
      // One side is blocked: the other one makes up for it, within its own room.
      if (short > 0) {
        x = Math.min(Math.max(0, a), x + short);
        y = Math.min(Math.max(0, b), y + Math.max(0, min - size - x - y));
      }
      return [x, y];
    };
    const [gl, gr] = grow(z.r - z.l, room.l, room.r);
    const [gt, gb] = grow(z.b - z.t, room.t, room.b);
    return { l: z.l - gl, r: z.r + gr, t: z.t - gt, b: z.b + gb };
  });
}

/** The check badge of a chosen zone, with its white ring. */
const BADGE = 24;

/**
 * Points `offset` px outside a box's outline (negative: inside), along each edge's normal and
 * diagonally at the corners, so that a badge set there touches the outline all around. They are
 * sorted from the top end corner (top right in a left-to-right mock), both ways round.
 */
function outline(hit: Box, offset: number, rtl: boolean, step = 4): [number, number][] {
  const { l, r, t, b } = hit;
  const w = Math.max(0, r - l);
  const h = Math.max(0, b - t);
  const perimeter = 2 * (w + h);
  const corners = [0, w, w + h, 2 * w + h];
  const d = offset / Math.SQRT2;
  // From the top end corner: along the top edge, down the start edge, along the bottom, up the end edge.
  const at = (s: number): [number, number] => {
    let p: [number, number];
    if (s === 0) p = [r + d, t - d];
    else if (s === w) p = [l - d, t - d];
    else if (s === w + h) p = [l - d, b + d];
    else if (s === 2 * w + h) p = [r + d, b + d];
    else if (s < w) p = [r - s, t - offset];
    else if (s < w + h) p = [l - offset, t + s - w];
    else if (s < 2 * w + h) p = [l + s - w - h, b + offset];
    else p = [r + offset, b - (s - 2 * w - h)];
    return [rtl ? l + r - p[0] : p[0], p[1]];
  };
  const steps = new Set(corners);
  for (let s = step; s < perimeter; s += step) steps.add(s);
  return [...steps]
    .sort((a, c) => Math.min(a, perimeter - a) - Math.min(c, perimeter - c) || a - c)
    .map(at);
}

interface BadgeRoom {
  /** Text the mock draws: never hidden if any spot allows it. */
  text: Box[];
  /** Targets of the other zones (not nested in this one, nor around it): avoided when possible. */
  others: Box[];
  width: number;
  height: number;
  rtl: boolean;
}

/**
 * Where the check badge of a chosen zone sits (its center), so that it hides no drawn text and is
 * not cut by the mock's edge: on the zone's outline, else just outside it, else just inside it, each
 * time from the end corner (top right in a left-to-right mock) both ways round. A spot clear of the
 * other zones comes first, so that a badge never seems to belong to a neighbour; if every spot covers
 * some text, the one that covers the least.
 */
export function badgeSpot(hit: Box, { text, others, width, height, rtl }: BadgeRoom, size = BADGE): { x: number; y: number } {
  const half = size / 2;
  const fits = ([x, y]: [number, number]) => x - half >= 0 && x + half <= width && y - half >= 0 && y + half <= height;
  const cover = (boxes: Box[], [x, y]: [number, number]) =>
    boxes.reduce((sum, q) => {
      const w = Math.min(q.r, x + half) - Math.max(q.l, x - half);
      const h = Math.min(q.b, y + half) - Math.max(q.t, y - half);
      return w > 0.5 && h > 0.5 ? sum + w * h : sum;
    }, 0);
  // On the outline (the choice ring runs 1 px outside the target), just outside it, just inside it.
  const tiers = [1, half + 1, -half].map((offset) => outline(hit, offset, rtl).filter(fits));
  for (const apart of [true, false])
    for (const spots of tiers)
      for (const s of spots) if (cover(text, s) === 0 && (!apart || cover(others, s) === 0)) return { x: s[0], y: s[1] };
  let best: { spot: [number, number]; covered: number } | null = null;
  for (const s of tiers.flat()) {
    const covered = cover(text, s);
    if (!best || covered < best.covered) best = { spot: s, covered };
  }
  if (best) return { x: best.spot[0], y: best.spot[1] };
  // A mock smaller than the badge: the end corner, as far inside as it goes.
  const clamp = (v: number, max: number) => Math.min(Math.max(v, half), Math.max(half, max - half));
  return { x: clamp(rtl ? hit.l : hit.r, width), y: clamp(hit.t, height) };
}

/** The text the mock draws, in layer coordinates: what a check badge must not hide. */
function drawnText(base: HTMLElement, box: DOMRect, scale: number): Box[] {
  const out: Box[] = [];
  const walker = document.createTreeWalker(base, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.textContent?.trim() || node.parentElement?.closest('.mk-hits, .mk-marks')) continue;
    range.selectNodeContents(node);
    for (const q of range.getClientRects())
      if (q.width > 0 && q.height > 0)
        out.push({ l: (q.left - box.left) / scale, t: (q.top - box.top) / scale, r: (q.right - box.left) / scale, b: (q.bottom - box.top) / scale });
  }
  return out;
}

function placeHits(base: HTMLElement, zones: HTMLElement[], buttons: HTMLButtonElement[]) {
  const box = base.getBoundingClientRect();
  // A scaled ancestor shrinks client rects but not the layer's own coordinates.
  const scale = base.offsetWidth ? box.width / base.offsetWidth : 1;
  const rects: Box[] = zones.map((z) => {
    const r = z.getBoundingClientRect();
    return { l: (r.left - box.left) / scale, t: (r.top - box.top) / scale, r: (r.right - box.left) / scale, b: (r.bottom - box.top) / scale };
  });
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const hits = hitBoxes(rects, base.offsetWidth, base.offsetHeight, coarse ? 8 : 4);
  const rtl = getComputedStyle(base).direction === 'rtl';
  const text = drawnText(base, box, scale);
  const contains = (a: Box, b: Box) => a.l <= b.l && a.t <= b.t && a.r >= b.r && a.b >= b.b;
  /** Badges already placed: two chosen zones never stack their badges. */
  const placed: Box[] = [];
  hits.forEach((h, i) => {
    const b = buttons[i];
    b.style.left = `${h.l}px`;
    b.style.top = `${h.t}px`;
    b.style.width = `${Math.max(0, h.r - h.l)}px`;
    b.style.height = `${Math.max(0, h.b - h.t)}px`;
    // The check badge rides the outline wherever it hides no text, never cut by the mock's edge.
    const others = hits.filter((_, j) => j !== i && !contains(rects[j], rects[i]) && !contains(rects[i], rects[j]));
    const spot = badgeSpot(h, { text, others: [...others, ...placed], width: base.offsetWidth, height: base.offsetHeight, rtl });
    placed.push({ l: spot.x - BADGE / 2, t: spot.y - BADGE / 2, r: spot.x + BADGE / 2, b: spot.y + BADGE / 2 });
    const badge = b.firstElementChild as HTMLElement | null;
    badge?.style.setProperty('left', `${spot.x - h.l}px`);
    badge?.style.setProperty('top', `${spot.y - h.t}px`);
  });
}

/* ---------------------------------------------------------------- motion */

/**
 * Only a mock whose own CSS or inline styles declare an animation can move (about 20 visuals out of
 * 600). The others never read their animations: each read forces a style pass, and a page of a
 * hundred mocks paid for a hundred of them.
 */
export const declaresMotion = (visual: Pick<Visual, 'css' | 'html'>): boolean => /animation/i.test(`${visual.css ?? ''}\n${visual.html}`);

function readMotion(base: Element | null): MotionInfo | null {
  const anims = base?.getAnimations?.({ subtree: true }) ?? [];
  let finite = false;
  let long = false;
  for (const a of anims) {
    const t = a.effect?.getComputedTiming();
    if (!t) continue;
    const end = Number(t.endTime);
    if (t.iterations === Infinity || !Number.isFinite(end)) long = true;
    else {
      finite = true;
      if (end > 5000) long = true;
    }
  }
  return finite || long ? { finite, long } : null;
}

/** Marks drawn as the answer is revealed wait until the learner can see them (after any scroll). */
function startWhenSeen(host: HTMLElement, svg: SVGSVGElement): () => void {
  svg.setAttribute('data-wait', '');
  let idle = 0;
  const start = () => {
    svg.removeAttribute('data-wait');
    stop();
  };
  const onScroll = () => {
    window.clearTimeout(idle);
    idle = window.setTimeout(start, 120);
  };
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      if (entry.intersectionRatio < 0.6 && entry.intersectionRect.height < window.innerHeight * 0.5) return;
      io.disconnect();
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    },
    { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
  );
  io.observe(host);
  const fallback = window.setTimeout(start, 1600);
  function stop() {
    io.disconnect();
    window.clearTimeout(idle);
    window.clearTimeout(fallback);
    window.removeEventListener('scroll', onScroll);
  }
  return stop;
}

/** « Rejouer » for animations that end, « Mettre en pause » for loops and anything longer than five seconds. */
export function MotionControls({
  info,
  paused,
  onPause,
  onReplay,
  many = false,
}: {
  info: MotionInfo;
  paused: boolean;
  onPause: () => void;
  onReplay: () => void;
  many?: boolean;
}) {
  return (
    <div className="mock-motion">
      {info.finite && (
        <button type="button" className="btn btn-ghost small" onClick={onReplay}>
          <RotateCcw aria-hidden="true" /> {many ? 'Rejouer les animations' : 'Rejouer l’animation'}
        </button>
      )}
      {info.long && (
        <button type="button" className="btn btn-ghost small" onClick={onPause}>
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}{' '}
          {paused ? (many ? 'Reprendre les animations' : 'Reprendre l’animation') : many ? 'Mettre en pause les animations' : 'Mettre en pause'}
        </button>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- mock */

export function Mock({ visual, onPick, states, marks, vars, className, controls = true, paused, replay, onMotion }: MockProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pickRef = useRef(onPick);
  pickRef.current = onPick;
  const motionRef = useRef(onMotion);
  motionRef.current = onMotion;
  const interactive = Boolean(onPick);
  const [motion, setMotion] = useState<MotionInfo | null>(null);
  const [ownPaused, setOwnPaused] = useState(false);
  const [ownReplay, setOwnReplay] = useState(0);
  const isPaused = controls ? ownPaused : Boolean(paused);
  const replayToken = controls ? ownReplay : (replay ?? 0);
  /** Were the marks absent before? Only marks appearing on a reveal are drawn « au stylo ». */
  const marksBefore = useRef<'unknown' | 'none' | 'shown'>('unknown');

  const markup = useMemo(() => {
    const dir = visual.dir ? ` dir="${visual.dir}"` : '';
    const lang = visual.lang ? ` lang="${visual.lang}"` : '';
    const framed = visual.frame && visual.frame !== 'none' ? ' mk-framed' : '';
    // Without shared sheets, the kit gets its own <style>: the same text in every mock, which the
    // browser parses once for the whole page, instead of once per mock with the visual's rules.
    const styles = SHARED_SHEETS ? '' : `<style>${KIT_CSS}</style>${visual.css ? `<style>${visual.css}</style>` : ''}`;
    return `${styles}<div class="mk-root${framed}" part="root"${dir}${lang}>${frame(visual, expandIcons(visual.html))}</div>`;
  }, [visual]);

  // Render the mock into its own shadow root so its CSS never leaks either way.
  const moves = useMemo(() => declaresMotion(visual), [visual]);
  const reported = useRef<MotionInfo | null>(null);
  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    if (SHARED_SHEETS) root.adoptedStyleSheets = sheetsOf(visual);
    root.innerHTML = markup;
    marksBefore.current = 'unknown';
    const info = moves ? readMotion(root.querySelector('.mk-root')) : null;
    setMotion(info);
    // A still mock tells its player nothing, unless it replaces one that moved.
    if (info || reported.current) motionRef.current?.(info);
    reported.current = info;
  }, [markup, moves, visual]);

  // Drawn controls stay out of the tab order; in a picture (role="img") they are inert altogether.
  useLayoutEffect(() => {
    const root = hostRef.current?.shadowRoot;
    if (!root) return;
    root.querySelectorAll<HTMLElement>(DRAWN_CONTROLS).forEach((el) => {
      if (el.closest('.mk-hits')) return;
      el.tabIndex = -1;
      el.inert = !interactive;
    });
  }, [markup, interactive]);

  // Never follow a drawn link or submit a drawn form, even after the correction (logic-10).
  useEffect(() => {
    const root = hostRef.current?.shadowRoot;
    if (!root) return;
    const onClick = (e: Event) => {
      const target = e.target as Element | null;
      const hit = target?.closest?.<HTMLElement>('.mk-hit');
      if (hit) {
        e.preventDefault();
        // A listener in a shadow root gets no event priority from React: render now, so that a
        // second activation right after this one sees the updated choice.
        flushSync(() => pickRef.current?.(hit.dataset.for as string));
      } else if (target?.closest?.(DRAWN_CONTROLS)) e.preventDefault();
    };
    const onSubmit = (e: Event) => e.preventDefault();
    // A held Enter on a zone would toggle it on every repeat.
    const onKey = (e: Event) => {
      const k = e as KeyboardEvent;
      if (k.repeat && (k.key === 'Enter' || k.key === ' ') && (k.target as Element | null)?.closest?.('.mk-hit')) k.preventDefault();
    };
    root.addEventListener('click', onClick);
    root.addEventListener('submit', onSubmit);
    root.addEventListener('keydown', onKey);
    return () => {
      root.removeEventListener('click', onClick);
      root.removeEventListener('submit', onSubmit);
      root.removeEventListener('keydown', onKey);
    };
  }, [markup]);

  // Hotspots: one real button per zone, laid over it and named after what it shows. The zone
  // itself keeps its own semantics (list, navigation, table) and its own colors.
  useLayoutEffect(() => {
    const root = hostRef.current?.shadowRoot;
    const base = root?.querySelector<HTMLElement>('.mk-root');
    if (!root || !base || !interactive) return;
    const zones = [...root.querySelectorAll<HTMLElement>('[data-hotspot]')];
    const layer = document.createElement('div');
    layer.className = 'mk-hits';
    const badge = `<span class="mk-hit-badge" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${MOCK_ICONS.check}</svg></span>`;
    const buttons = zones.map((zone, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mk-hit';
      b.dataset.for = zone.dataset.hotspot as string;
      b.setAttribute('aria-label', zoneName(zone, i + 1));
      b.setAttribute('aria-pressed', 'false');
      b.innerHTML = badge;
      layer.appendChild(b);
      return b;
    });
    base.appendChild(layer);
    const place = () => placeHits(base, zones, buttons);
    place();
    const ro = new ResizeObserver(place);
    ro.observe(base);
    zones.forEach((z) => ro.observe(z));
    root.addEventListener('scroll', place, true);
    return () => {
      ro.disconnect();
      root.removeEventListener('scroll', place, true);
      layer.remove();
    };
  }, [markup, interactive]);

  // Reflect hotspot states: chosen zones on their buttons, the correction on the zones.
  useEffect(() => {
    const root = hostRef.current?.shadowRoot;
    if (!root) return;
    root.querySelectorAll<HTMLElement>('[data-hotspot]').forEach((el) => {
      const s = states?.[el.dataset.hotspot as string];
      if (s && s !== 'picked') el.dataset.state = s;
      else delete el.dataset.state;
    });
    root.querySelectorAll<HTMLElement>('.mk-hit').forEach((b) => b.setAttribute('aria-pressed', String(states?.[b.dataset.for as string] === 'picked')));
  }, [markup, states, interactive]);

  // Draw correction marks, and keep them aligned when the mock resizes.
  useEffect(() => {
    const host = hostRef.current;
    const root = host?.shadowRoot;
    const base = root?.querySelector<HTMLElement>('.mk-root');
    if (!host || !root || !base) return;
    const appearing = Boolean(marks?.length) && marksBefore.current === 'none';
    marksBefore.current = marks?.length ? 'shown' : 'none';
    // No marks: nothing to measure nor to keep aligned (most mocks, which never get any).
    if (!marks?.length) {
      host.removeAttribute('data-revealed');
      root.querySelector('.mk-marks')?.remove();
      return;
    }
    host.setAttribute('data-revealed', '');

    let drawnSize = '';
    const sizeOf = () => `${base.offsetWidth}x${base.offsetHeight}`;
    const draw = (animate: boolean): SVGSVGElement => {
      root.querySelector('.mk-marks')?.remove();
      drawnSize = sizeOf();
      const box = base.getBoundingClientRect();
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('class', 'mk-marks');
      svg.setAttribute('aria-hidden', 'true');
      for (const m of marks) {
        const el = root.querySelector<HTMLElement>(`[data-hotspot="${CSS.escape(m.id)}"]`);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const x = r.left - box.left;
        const y = r.top - box.top;
        const g = document.createElementNS(svgNS, 'g');
        g.setAttribute('class', `${m.kind}${animate ? ' draw' : ''}`);
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', loopPath(x, y, r.width, r.height, m.n));
        g.appendChild(path);
        const bx = Math.max(10, x - 4);
        const by = Math.max(10, y - 4);
        const dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('cx', String(bx));
        dot.setAttribute('cy', String(by));
        dot.setAttribute('r', '9');
        const label = document.createElementNS(svgNS, 'text');
        label.setAttribute('x', String(bx));
        label.setAttribute('y', String(by + 4));
        label.setAttribute('text-anchor', 'middle');
        label.textContent = String(m.n);
        g.append(dot, label);
        svg.appendChild(g);
      }
      base.appendChild(svg);
      svg.querySelectorAll('path').forEach((p) => p.style.setProperty('--len', String(Math.ceil(p.getTotalLength()))));
      return svg;
    };

    const svg = draw(appearing);
    const animated = appearing && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    const stopWaiting = animated ? startWhenSeen(host, svg) : () => {};
    // ResizeObserver also reports the size it starts with: redraw only on a real change (logic-26).
    const ro = new ResizeObserver(() => {
      if (sizeOf() !== drawnSize) draw(false);
    });
    ro.observe(base);
    return () => {
      ro.disconnect();
      stopWaiting();
    };
  }, [markup, marks]);

  // Pause: every animation of the mock holds still, including those a hover starts.
  useEffect(() => {
    hostRef.current?.toggleAttribute('data-paused', isPaused);
  }, [isPaused, markup]);

  // Replay: switching the animations off for one style pass starts them again from the beginning.
  const replayed = useRef(replayToken);
  useEffect(() => {
    const host = hostRef.current;
    if (!host || replayed.current === replayToken) return;
    replayed.current = replayToken;
    host.setAttribute('data-restart', '');
    void host.shadowRoot?.querySelector('.mk-root')?.getBoundingClientRect();
    host.removeAttribute('data-restart');
  }, [replayToken]);

  // Slider values.
  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host || !vars) return;
    for (const [k, v] of Object.entries(vars)) host.style.setProperty(k, v);
  }, [vars]);

  return (
    <>
      <div
        ref={hostRef}
        className={['mock', className].filter(Boolean).join(' ')}
        role={interactive ? 'group' : 'img'}
        data-interactive={interactive ? '' : undefined}
        aria-label={visual.alt}
        style={visual.height ? ({ '--mk-min-h': `${visual.height}px` } as CSSProperties) : undefined}
      />
      {controls && motion && (
        <MotionControls
          info={motion}
          paused={ownPaused}
          onPause={() => setOwnPaused((p) => !p)}
          onReplay={() => {
            setOwnPaused(false);
            setOwnReplay((r) => r + 1);
          }}
        />
      )}
    </>
  );
}
