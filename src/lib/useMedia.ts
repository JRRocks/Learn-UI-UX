import { useCallback, useSyncExternalStore } from 'react';

/** The phones held upright, at the finger: where the action of a screen stays in a bar at its bottom (app.css). */
export const PHONE_DOCK = '(min-width: 20em) and (max-width: 39.99875em) and (min-height: 30rem) and (pointer: coarse)';

/** Whether a media query holds, kept live (a phone turned sideways, a window resized). */
export function useMedia(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
