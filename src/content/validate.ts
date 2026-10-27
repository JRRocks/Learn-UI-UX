import { MOCK_ICONS } from '../components/mockIcons';
import type { AntipatternEntry, CulturePair, CultureProfile, Exercise, ModuleContent, Source, Visual } from '../engine/types';
import { SOURCES } from './sources';

/**
 * Content checks shared by the test suite. Every function returns human-readable
 * problems ("where: what") so authors can fix them without reading the code.
 */

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CATEGORIES = ['fondations', 'evaluer', 'affiner', 'enrichir', 'corriger', 'construire', 'psychologie', 'culture'];

export function checkText(text: string | undefined, where: string, errors: string[], required = true) {
  if (text === undefined || text.trim() === '') {
    if (required) errors.push(`${where}: texte manquant`);
    return;
  }
  const withoutCode = text.replace(/`[^`]*`/g, '');
  if (/<\/?[a-z][^>]*>/i.test(withoutCode)) errors.push(`${where}: balise HTML brute hors \`code\` (le texte est rendu en Markdown, pas en HTML)`);
  if (/\b(option|réponse|version|proposition|choix|carte|image)\s+[A-F]\b/.test(withoutCode))
    errors.push(`${where}: référence à une option par sa lettre (les options sont mélangées à l'affichage)`);
}

export function checkSources(sources: Source[] | undefined, where: string, errors: string[]) {
  for (const s of sources ?? []) {
    if (typeof s === 'string' && !SOURCES[s]) errors.push(`${where}: source inconnue « ${s} » (clé absente de src/content/sources.ts)`);
    if (typeof s !== 'string' && !s.label) errors.push(`${where}: source sans label`);
  }
}

export function checkVisual(v: Visual | undefined, where: string, errors: string[]) {
  if (!v) return;
  if (!v.html?.trim()) errors.push(`${where}: visual.html vide`);
  if (!v.alt?.trim()) errors.push(`${where}: visual.alt manquant (texte alternatif obligatoire)`);
  for (const m of v.html.matchAll(/data-icon="([^"]+)"/g))
    if (!MOCK_ICONS[m[1]]) errors.push(`${where}: icône inconnue « ${m[1]} » (voir src/components/mockIcons.ts)`);
  if (/<script\b/i.test(v.html)) errors.push(`${where}: <script> interdit dans une maquette`);
  if (/\son[a-z]+=/i.test(v.html)) errors.push(`${where}: attribut d'événement inline interdit (onclick…)`);
  if (/https?:\/\//.test(v.html + (v.css ?? '')) && !/xmlns="http:\/\/www\.w3\.org/.test(v.html))
    errors.push(`${where}: ressource externe interdite dans une maquette (tout doit être inline)`);
  const opened = (v.html.match(/<div\b/g) ?? []).length;
  const closed = (v.html.match(/<\/div>/g) ?? []).length;
  if (opened !== closed) errors.push(`${where}: ${opened} <div> ouvertes pour ${closed} fermées`);
}

function hotspotIds(html: string): string[] {
  return [...html.matchAll(/data-hotspot="([^"]+)"/g)].map((m) => m[1]);
}

export function checkExercise(ex: Exercise, moduleId: string, errors: string[]) {
  const w = `${moduleId} › ${ex.id}`;
  if (!KEBAB.test(ex.id)) errors.push(`${w}: id non kebab-case`);
  if (!ex.id.startsWith(`${moduleId}-`)) errors.push(`${w}: l'id doit commencer par « ${moduleId}- »`);
  if (![1, 2, 3].includes(ex.difficulty)) errors.push(`${w}: difficulty doit valoir 1, 2 ou 3`);
  checkText(ex.prompt, `${w}.prompt`, errors);
  checkText(ex.context, `${w}.context`, errors, false);
  checkText(ex.explanation, `${w}.explanation`, errors);
  checkText(ex.takeaway, `${w}.takeaway`, errors);
  if (ex.takeaway && ex.takeaway.length > 220) errors.push(`${w}: takeaway trop long (${ex.takeaway.length} > 220 caractères)`);
  checkSources(ex.sources, w, errors);
  checkVisual(ex.visual, `${w}.visual`, errors);

  switch (ex.type) {
    case 'choice':
    case 'multi': {
      const ids = ex.options.map((o) => o.id);
      if (ex.options.length < 2 || ex.options.length > 6) errors.push(`${w}: 2 à 6 options attendues`);
      if (new Set(ids).size !== ids.length) errors.push(`${w}: ids d'options en double`);
      const visuals = ex.options.filter((o) => o.visual).length;
      if (visuals && visuals !== ex.options.length) errors.push(`${w}: toutes les options doivent avoir un visuel, ou aucune`);
      // Only references to an option's position are a problem; left/right inside a mock (RTL lessons) is fine.
      if (
        !ex.fixedOrder &&
        /\b(version|option|maquette|proposition|image|carte|réponse)s? (de |à |du |en )?(gauche|droite|haut|bas)\b|\b(la|le) (première|premier|seconde|second|deuxième|troisième) (version|option|maquette|proposition|réponse)\b/i.test(
          ex.explanation,
        )
      )
        errors.push(`${w}.explanation: référence à la position d'une option (les options sont mélangées à l'affichage)`);
      ex.options.forEach((o, i) => {
        if (!o.label && !o.visual) errors.push(`${w}.options[${i}]: ni label ni visuel`);
        checkText(o.label, `${w}.options[${i}].label`, errors, false);
        checkText(o.why, `${w}.options[${i}].why`, errors, false);
        checkVisual(o.visual, `${w}.options[${i}].visual`, errors);
      });
      if (ex.type === 'choice' && !ids.includes(ex.answer)) errors.push(`${w}: answer « ${ex.answer} » absent des options`);
      if (ex.type === 'multi') {
        for (const a of ex.answers) if (!ids.includes(a)) errors.push(`${w}: answers contient « ${a} » absent des options`);
        if (ex.answers.length === 0) errors.push(`${w}: au moins une bonne réponse`);
        if (ex.answers.length === ex.options.length) errors.push(`${w}: il faut au moins une option fausse`);
      }
      break;
    }
    case 'truefalse':
      if (typeof ex.answer !== 'boolean') errors.push(`${w}: answer doit être true ou false`);
      break;
    case 'hotspot': {
      const present = hotspotIds(ex.visual.html);
      if (ex.hotspots.filter((h) => h.correct).length === 0) errors.push(`${w}: au moins un hotspot correct`);
      if (ex.hotspots.filter((h) => !h.correct).length === 0) errors.push(`${w}: au moins un hotspot leurre (correct: false)`);
      for (const h of ex.hotspots) {
        if (!present.includes(h.id)) errors.push(`${w}: hotspot « ${h.id} » absent du HTML (data-hotspot)`);
        checkText(h.why, `${w}.hotspots.${h.id}.why`, errors);
      }
      for (const p of present) if (!ex.hotspots.some((h) => h.id === p)) errors.push(`${w}: data-hotspot « ${p} » sans entrée dans hotspots`);
      if (new Set(present).size !== present.length) errors.push(`${w}: data-hotspot en double dans le HTML`);
      break;
    }
    case 'order':
      if (ex.items.length < 3) errors.push(`${w}: au moins 3 éléments à ordonner`);
      if (new Set(ex.items.map((i) => i.id)).size !== ex.items.length) errors.push(`${w}: ids en double`);
      break;
    case 'match': {
      if (ex.pairs.length < 3) errors.push(`${w}: au moins 3 paires`);
      if (new Set(ex.pairs.map((p) => p.id)).size !== ex.pairs.length) errors.push(`${w}: ids de paires en double`);
      if (new Set(ex.pairs.map((p) => p.right)).size !== ex.pairs.length) errors.push(`${w}: deux paires ont le même côté droit`);
      break;
    }
    case 'slider': {
      const [lo, hi] = ex.target;
      if (!(ex.min < ex.max)) errors.push(`${w}: min doit être < max`);
      if (lo > hi || lo < ex.min || hi > ex.max) errors.push(`${w}: target hors de [min, max]`);
      if (ex.ideal < lo || ex.ideal > hi) errors.push(`${w}: ideal hors de target`);
      if (ex.initial >= lo && ex.initial <= hi) errors.push(`${w}: la valeur initiale ne doit pas déjà être dans la cible`);
      if (!ex.visual.css?.includes('var(--')) errors.push(`${w}: le CSS du visuel doit utiliser var(--v) ou var(--n)`);
      checkText(ex.control, `${w}.control`, errors);
      break;
    }
    case 'grid': {
      const span = ex.scale.max - ex.scale.min + 1;
      if (ex.scale.labels.length !== span) errors.push(`${w}: scale.labels doit avoir ${span} libellés`);
      for (const c of ex.criteria) {
        if (c.expert < ex.scale.min || c.expert > ex.scale.max) errors.push(`${w}: score expert hors échelle pour ${c.id}`);
        checkText(c.why, `${w}.criteria.${c.id}.why`, errors);
      }
      break;
    }
  }
}

export function checkModule(m: ModuleContent, file: string): string[] {
  const errors: string[] = [];
  const w = m?.id ?? file;
  if (!m || !m.id) return [`${file}: export default manquant ou sans id`];
  if (!KEBAB.test(m.id)) errors.push(`${w}: id non kebab-case`);
  if (!file.endsWith(`/${m.id}.ts`)) errors.push(`${w}: le fichier doit s'appeler ${m.id}.ts`);
  if (!CATEGORIES.includes(m.category)) errors.push(`${w}: catégorie inconnue « ${m.category} »`);
  checkText(m.title, `${w}.title`, errors);
  checkText(m.summary, `${w}.summary`, errors);
  checkSources(m.sources, w, errors);
  if (!m.sections.length) errors.push(`${w}: aucune section`);
  const sectionIds = m.sections.map((s) => s.id);
  if (new Set(sectionIds).size !== sectionIds.length) errors.push(`${w}: ids de sections en double`);
  for (const s of m.sections) {
    if (!KEBAB.test(s.id)) errors.push(`${w}.sections.${s.id}: id non kebab-case`);
    checkText(s.title, `${w}.sections.${s.id}.title`, errors);
    checkText(s.body, `${w}.sections.${s.id}.body`, errors);
    s.examples?.forEach((e, i) => {
      if (!e.bad && !e.good) errors.push(`${w}.sections.${s.id}.examples[${i}]: ni bad ni good`);
      checkVisual(e.bad, `${w}.sections.${s.id}.examples[${i}].bad`, errors);
      checkVisual(e.good, `${w}.sections.${s.id}.examples[${i}].good`, errors);
    });
  }
  const ruleIds = m.rules.map((r) => r.id);
  if (new Set(ruleIds).size !== ruleIds.length) errors.push(`${w}: ids de règles en double`);
  for (const r of m.rules) {
    checkText(r.front, `${w}.rules.${r.id}.front`, errors);
    checkText(r.back, `${w}.rules.${r.id}.back`, errors);
  }
  const exIds = m.exercises.map((e) => e.id);
  if (new Set(exIds).size !== exIds.length) errors.push(`${w}: ids d'exercices en double`);
  for (const ex of m.exercises) checkExercise(ex, m.id, errors);
  return errors;
}

export function checkCultures(profiles: CultureProfile[], pairs: CulturePair[]): string[] {
  const errors: string[] = [];
  const ids = profiles.map((p) => p.id);
  if (new Set(ids).size !== ids.length) errors.push('cultures: ids en double');
  for (const p of profiles) {
    const w = `culture ${p.id}`;
    checkText(p.name, `${w}.name`, errors);
    checkText(p.summary, `${w}.summary`, errors);
    checkSources(p.sources, w, errors);
    checkVisual(p.visual, `${w}.visual`, errors);
    try {
      new Intl.DateTimeFormat(p.locale);
    } catch {
      errors.push(`${w}: locale invalide « ${p.locale} »`);
    }
    if (p.conventions.length < 6) errors.push(`${w}: au moins 6 conventions`);
    for (const c of p.conventions) {
      checkText(c.title, `${w}.conventions.title`, errors);
      checkText(c.body, `${w}.conventions.${c.title}`, errors);
    }
    if (p.adapt.do.length < 3 || p.adapt.dont.length < 3) errors.push(`${w}: au moins 3 « à faire » et 3 « à éviter »`);
  }
  for (const pair of pairs) {
    const w = `paire ${pair.id}`;
    if (!ids.includes(pair.a) || !ids.includes(pair.b)) errors.push(`${w}: culture inconnue`);
    checkVisual(pair.visualA, `${w}.visualA`, errors);
    checkVisual(pair.visualB, `${w}.visualB`, errors);
    checkText(pair.notes, `${w}.notes`, errors);
  }
  return errors;
}

export function checkAntipatterns(list: AntipatternEntry[], registryIds: string[]): string[] {
  const errors: string[] = [];
  const ids = list.map((a) => a.id);
  if (new Set(ids).size !== ids.length) errors.push('anti-patterns: ids en double');
  for (const id of registryIds) if (!ids.includes(id)) errors.push(`anti-patterns: règle « ${id} » du détecteur absente du catalogue`);
  for (const a of list) {
    const w = `anti-pattern ${a.id}`;
    checkText(a.name, `${w}.name`, errors);
    checkText(a.description, `${w}.description`, errors);
    checkText(a.fix, `${w}.fix`, errors);
    checkVisual(a.demo?.bad, `${w}.demo.bad`, errors);
    checkVisual(a.demo?.good, `${w}.demo.good`, errors);
  }
  return errors;
}
