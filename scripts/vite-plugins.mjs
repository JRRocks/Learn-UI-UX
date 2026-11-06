// Build plugins of Épreuves (vite.config.ts).
//
// contentIndex(): serves the light index of the content as `virtual:content/index`, and two small
//   chunks, `virtual:content/rules` (every flashcard) and `virtual:content/statements` (every
//   true/false statement). It evaluates src/content/all.ts with Vite's module runner, so the data
//   always matches the lessons: nothing to regenerate by hand when a lesson changes.
//
// serviceWorker(): writes dist/sw.js from src/sw.js, preceded by `const BUILD = { version, files }`:
//   every file of the build (precached on install) and an id that changes whenever one of them does
//   (so the browser installs the new worker and drops the caches of older builds).
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
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

/** Files of a folder, recursively, relative to it with forward slashes. */
function filesOf(dir) {
  let out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out = out.concat(filesOf(path).map((f) => `${name}/${f}`));
    else out.push(name);
  }
  return out;
}

export function serviceWorker() {
  let config;
  return {
    name: 'epreuves:service-worker',
    apply: 'build',
    enforce: 'post',
    configResolved(c) {
      config = c;
    },
    generateBundle(_, bundle) {
      const source = readFileSync(join(config.root, 'src/sw.js'), 'utf8');
      const hash = createHash('sha256').update(source);
      const built = Object.values(bundle)
        .filter((f) => f.fileName !== 'index.html' && !f.fileName.endsWith('.map'))
        .map((f) => f.fileName);
      const publicDir = config.publicDir && config.build.copyPublicDir ? config.publicDir : null;
      const copied = publicDir ? filesOf(publicDir) : [];
      for (const f of copied) hash.update(f).update(readFileSync(join(publicDir, f)));
      // index.html and the copied files keep their names: their content goes into the build id.
      const html = bundle['index.html'];
      if (!html || html.type !== 'asset') throw new Error('serviceWorker(): index.html absent du build');
      hash.update(String(html.source));
      const files = ['./', ...[...copied, ...built].sort().map((f) => `./${f}`)];
      hash.update(files.join('\n'));
      const version = hash.digest('hex').slice(0, 12);
      this.emitFile({
        type: 'asset',
        fileName: 'sw.js',
        source: `const BUILD = ${JSON.stringify({ version, files })};\n\n${source}`,
      });
      config.logger.info(`  sw.js : ${files.length} fichiers mis en cache à l’installation (version ${version})`);
    },
  };
}

/**
 * A deep link to a lesson, the markets or the anti-pattern catalog downloads its chunk along with the
 * app, instead of once the app has started and asked for it: index.html maps these routes to their
 * chunks and preloads the one the address names.
 */
export function deepLinks() {
  return {
    name: 'epreuves:deep-links',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_, { bundle }) {
        if (!bundle) return;
        const chunks = Object.values(bundle).filter((c) => c.type === 'chunk');
        const holding = (pattern) => chunks.find((c) => c.moduleIds.some((id) => pattern.test(id)))?.fileName;
        const map = {};
        for (const c of chunks) {
          const lesson = c.facadeModuleId?.match(/[\\/]src[\\/]content[\\/]modules[\\/]([^\\/]+)\.ts$/);
          if (lesson) map[`apprendre/${lesson[1]}`] = `./${c.fileName}`;
        }
        const cultures = holding(/[\\/]src[\\/]content[\\/]cultures[\\/]profiles\.ts$/);
        const catalog = holding(/[\\/]src[\\/]content[\\/]antipatterns\.ts$/);
        // Every market page reads the profiles, except the localisation lab.
        if (cultures) Object.assign(map, { cultures: `./${cultures}`, 'cultures/labo': null });
        if (catalog) map['ressources/anti-patterns'] = `./${catalog}`;
        const code =
          `(function(){var m=${JSON.stringify(map)};` +
          `var p=location.hash.replace(/^#\\/?/,'').split('?')[0].split('/'),k=p[0]+'/'+p[1];` +
          `var f=k in m?m[k]:m[p[0]];` +
          `if(!f)return;var l=document.createElement('link');l.rel='modulepreload';l.crossOrigin='';l.href=f;document.head.appendChild(l);})();`;
        return [{ tag: 'script', children: code, injectTo: 'head' }];
      },
    },
  };
}
