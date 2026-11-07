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
