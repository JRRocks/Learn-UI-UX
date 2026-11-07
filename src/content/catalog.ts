/**
 * The anti-pattern catalog, with its demo mocks, is its own chunk: downloaded when its tab opens
 * (src/pages/Resources.tsx), or in the background on a page that no service worker stores
 * (`preloadContent`, ./index.ts). Both keep it in memory under the same key of `load` ('catalog').
 */
import type { AntipatternEntry } from '../engine/types';

const file = import.meta.glob<{ ANTIPATTERNS?: AntipatternEntry[] }>('./antipatterns.ts');

export async function loadCatalog(): Promise<AntipatternEntry[]> {
  const [read] = Object.values(file);
  return read ? ((await read()).ANTIPATTERNS ?? []) : [];
}
