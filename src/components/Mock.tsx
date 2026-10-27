import { useEffect, useLayoutEffect, useMemo, useRef, type CSSProperties } from 'react';
import type { Visual } from '../engine/types';
import { MOCK_ICONS } from './mockIcons';
import { MOCK_KIT } from './mockKit';

export type HotspotState = 'picked' | 'hit' | 'wrong' | 'missed';

export interface Mark {
  id: string;
  n: number;
  kind: 'hit' | 'miss';
}

interface MockProps {
  visual: Visual;
  /** Hotspot mode: makes `[data-hotspot]` zones focusable and reports activations. */
  onPick?: (id: string) => void;
  states?: Record<string, HotspotState | undefined>;
  /** Correction marks drawn around hotspots once the answer is revealed. */
  marks?: Mark[];
  /** CSS custom properties set on the host (slider previews). */
  vars?: Record<string, string>;
  className?: string;
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

export function Mock({ visual, onPick, states, marks, vars, className }: MockProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pickRef = useRef(onPick);
  pickRef.current = onPick;
  const interactive = Boolean(onPick);

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
    const zones = root.querySelectorAll<HTMLElement>('[data-hotspot]');
    zones.forEach((el, i) => {
      if (interactive) {
        el.tabIndex = 0;
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label', `Zone ${i + 1}`);
      }
    });
  }, [markup, interactive]);

  // Delegate clicks and keyboard activation on hotspots.
  useEffect(() => {
    const root = hostRef.current?.shadowRoot;
    if (!root || !interactive) return;
    const zoneOf = (e: Event) => (e.target as Element | null)?.closest?.('[data-hotspot]') as HTMLElement | null;
    const onClick = (e: Event) => {
      const z = zoneOf(e);
      if (z) {
        e.preventDefault();
        pickRef.current?.(z.dataset.hotspot as string);
      }
    };
    const onKey = (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key !== 'Enter' && ke.key !== ' ') return;
      const z = zoneOf(e);
      if (z) {
        ke.preventDefault();
        pickRef.current?.(z.dataset.hotspot as string);
      }
    };
    root.addEventListener('click', onClick);
    root.addEventListener('keydown', onKey);
    return () => {
      root.removeEventListener('click', onClick);
      root.removeEventListener('keydown', onKey);
    };
  }, [markup, interactive]);

  // Reflect hotspot states.
  useEffect(() => {
    const root = hostRef.current?.shadowRoot;
    if (!root) return;
    root.querySelectorAll<HTMLElement>('[data-hotspot]').forEach((el) => {
      const s = states?.[el.dataset.hotspot as string];
      if (s) el.dataset.state = s;
      else delete el.dataset.state;
      if (interactive) el.setAttribute('aria-pressed', String(s === 'picked'));
    });
  }, [markup, states, interactive]);

  // Draw correction marks, and keep them aligned when the mock resizes.
  useEffect(() => {
    const host = hostRef.current;
    const root = host?.shadowRoot;
    const base = root?.querySelector<HTMLElement>('.mk-root');
    if (!host || !root || !base) return;
    if (marks?.length) host.setAttribute('data-revealed', '');
    else host.removeAttribute('data-revealed');

    const draw = (animate: boolean) => {
      root.querySelector('.mk-marks')?.remove();
      if (!marks?.length) return;
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
    };

    draw(true);
    const ro = new ResizeObserver(() => draw(false));
    ro.observe(base);
    return () => ro.disconnect();
  }, [markup, marks]);

  // Slider values.
  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host || !vars) return;
    for (const [k, v] of Object.entries(vars)) host.style.setProperty(k, v);
  }, [vars]);

  return (
    <div
      ref={hostRef}
      className={['mock', className].filter(Boolean).join(' ')}
      role={interactive ? 'group' : 'img'}
      data-interactive={interactive ? '' : undefined}
      aria-label={visual.alt}
      style={visual.height ? ({ '--mk-min-h': `${visual.height}px` } as CSSProperties) : undefined}
    />
  );
}
