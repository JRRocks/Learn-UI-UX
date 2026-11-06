// Build plugins of Épreuves (vite.config.ts).
//
// contentIndex(): serves the light index of the content as `virtual:content/index`, and two small
//   chunks, `virtual:content/rules` (every flashcard) and `virtual:content/statements` (every
//   true/false statement). It evaluates src/content/all.ts with Vite's module runner, so the data
//   always matches the lessons: nothing to regenerate by hand when a lesson changes.
import { join, sep } from 'node:path';
import { runnerImport } from 'vite';

const KEYS = ['index', 'rules', 'statements'];
const PREFIX = 'virtual:content/';

export function contentIndex() {
  let root = process.cwd();
  /** @type {Promise<{ data: Record<string, unknown>, files: string[] }> | null} */
  let generated = null;
  const generate = () =>
    (generated ??= runnerImport(join(root, 'src/content/all.ts'), { root, logLevel: 'error' }).then(
      ({ module, dependencies }) => ({ data: module.GENERATED, files: [join(root, 'src/content/all.ts'), ...dependencies] }),
      (error) => {
        generated = null;
        throw error;
      },
    ));
  const isContent = (file) => file.startsWith(join(root, 'src/content') + sep) || file.startsWith(join(root, 'src/engine') + sep);

  return {
    name: 'epreuves:content-index',
    configResolved(config) {
      root = config.root;
    },
    resolveId(id) {
      if (id.startsWith(PREFIX) && KEYS.includes(id.slice(PREFIX.length))) return `\0${id}`;
    },
    async load(id) {
      if (!id.startsWith(`\0${PREFIX}`)) return;
      const { data, files } = await generate();
      for (const f of files) this.addWatchFile(f);
      // JSON.parse of a string reads faster than the same data written as a JavaScript literal.
      return `export default JSON.parse(${JSON.stringify(JSON.stringify(data[id.slice(PREFIX.length + 1)]))});`;
    },
    // A lesson changed (dev server): write the index again, and reload what imports it.
    hotUpdate({ file, modules }) {
      if (!isContent(file)) return;
      generated = null;
      const graph = this.environment.moduleGraph;
      const virtual = KEYS.map((k) => graph.getModuleById(`\0${PREFIX}${k}`)).filter(Boolean);
      for (const m of virtual) graph.invalidateModule(m);
      return [...modules, ...virtual];
    },
    // Same in `vite build --watch`.
    watchChange(id) {
      if (isContent(id)) generated = null;
    },
  };
}
