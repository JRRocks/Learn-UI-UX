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
  hits.forEach((h, i) => {
    const b = buttons[i];
    b.style.left = `${h.l}px`;
    b.style.top = `${h.t}px`;
    b.style.width = `${Math.max(0, h.r - h.l)}px`;
    b.style.height = `${Math.max(0, h.b - h.t)}px`;
    // The check badge sits on the corner, inside the zone when the mock's edge would cut it.
    const edge = h.t < 10 || (rtl ? h.l < 10 : base.offsetWidth - h.r < 10);
    b.toggleAttribute('data-badge-in', edge);
  });
}

/* ---------------------------------------------------------------- motion */

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
    return (
      `<style>${MOCK_KIT}\n.mk-framed{background:transparent;border-radius:0;overflow:visible}\n${visual.css ?? ''}</style>` +
      `<div class="mk-root${framed}" part="root"${dir}${lang}>${frame(visual, expandIcons(visual.html))}</div>`
    );
  }, [visual]);

  // Render the mock into its own shadow root so its CSS never leaks either way.
  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    root.innerHTML = markup;
    marksBefore.current = 'unknown';
    const info = readMotion(root.querySelector('.mk-root'));
    setMotion(info);
    motionRef.current?.(info);
  }, [markup]);

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
    if (marks?.length) host.setAttribute('data-revealed', '');
    else host.removeAttribute('data-revealed');
    const appearing = Boolean(marks?.length) && marksBefore.current === 'none';
    marksBefore.current = marks?.length ? 'shown' : 'none';

    let drawnSize = '';
    const sizeOf = () => `${base.offsetWidth}x${base.offsetHeight}`;
    const draw = (animate: boolean): SVGSVGElement | null => {
      root.querySelector('.mk-marks')?.remove();
      drawnSize = sizeOf();
      if (!marks?.length) return null;
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
    const animated = appearing && svg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
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
