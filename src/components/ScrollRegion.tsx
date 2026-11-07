import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/** Does the box really scroll sideways? Its text may overflow it by 1/64 px: a width that rounds to its own. */
export const scrollsSideways = (box: { scrollWidth: number; clientWidth: number }): boolean => box.scrollWidth > box.clientWidth;

/**
 * `.table-scroll`: a table, or a chart, that scrolls sideways when the screen is too narrow for it.
 * While it really scrolls, it is a named region in the tab order, so that the keyboard scrolls it too
 * (WCAG 2.1.1). Otherwise it stays out of the tab order: browsers make any scrolling box a Tab stop,
 * even one a line of text overflows by 1/64 px (Comparer at 320 px), and that stop announced nothing.
 */
export function ScrollRegion({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrolls, setScrolls] = useState(false);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScrolls(scrollsSideways(el));
    measure();
    // The box changes width with the screen, its content with the data it shows.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    for (const child of el.children) ro.observe(child);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="table-scroll" tabIndex={scrolls ? 0 : -1} role={scrolls ? 'region' : undefined} aria-label={scrolls ? label : undefined}>
      {children}
    </div>
  );
}
