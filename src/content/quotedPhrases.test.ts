import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Md, frenchSpacing, languageRuns } from '../lib/markdown';
import { ALL_MODULES } from './all';
import { ANTIPATTERNS } from './antipatterns';
import { LAB_LOCALES } from './cultures/lab';
import { CULTURE_PAIRS } from './cultures/pairs';
import { CULTURES } from './cultures/profiles';
import { QUOTED_PHRASES, QUOTED_SCRIPT } from './quotedPhrases';
import { CHEATSHEET, COMMANDS, GLOSSARY, HEURISTICS, PERSONAS, SEVERITY } from './resources';

/**
 * Every string of the content shown as French text. Left out: the mocks (their markup and their
 * alternative, a picture), the sources (the titles they quote have their language: QUOTED_TITLES), and
 * what is shown in its own language already (a market's formats, the lab's strings).
 */
function texts(v: unknown, where: string, out: [string, string][] = []): [string, string][] {
  if (typeof v === 'string') out.push([where, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => texts(x, `${where}[${i}]`, out));
  else if (v && typeof v === 'object')
    for (const [k, x] of Object.entries(v)) if (!['html', 'css', 'alt', 'url', 'id', 'sources', 'locale', 'lang', 'dir'].includes(k)) texts(x, `${where}.${k}`, out);
  return out;
}

const ALL = [
  ...texts(ALL_MODULES, 'modules'),
  ...texts(
    CULTURES.map(({ formats, ...c }) => ({ ...c, formats: formats.map((f) => f.label) })),
    'cultures',
  ),
  ...texts(CULTURE_PAIRS, 'pairs'),
  ...texts(LAB_LOCALES.map((l) => l.notes), 'lab'),
  ...texts(ANTIPATTERNS, 'catalog'),
  ...texts({ CHEATSHEET, COMMANDS, GLOSSARY, HEURISTICS, PERSONAS, SEVERITY }, 'resources'),
];

describe('passages quoted in another language (WCAG 3.1.2)', () => {
  it('gives its language to every Chinese, Japanese, Korean, Arabic or Persian letter of the text', () => {
    const missing = ALL.flatMap(([where, text]) =>
      languageRuns(frenchSpacing(text))
        .filter((r) => !r.lang && QUOTED_SCRIPT.test(r.text))
        .map((r) => `${where}: ${[...r.text.matchAll(new RegExp(QUOTED_SCRIPT.source, 'gu'))].map((m) => m[0]).join('')}`),
    );
    // Declare the phrase, with its language, in QUOTED_PHRASES.
    expect(missing).toEqual([]);
  });

  it('declares only phrases that the content quotes', () => {
    const all = ALL.map(([, t]) => frenchSpacing(t)).join('\n');
    expect(Object.keys(QUOTED_PHRASES).filter((p) => !all.includes(frenchSpacing(p)))).toEqual([]);
  });

  it('names each language with a well-formed tag', () => {
    for (const lang of new Set(Object.values(QUOTED_PHRASES))) expect(Intl.getCanonicalLocales(lang)).toEqual([lang]);
  });

  it('reads each phrase in its language, the longest one first, and sets apart one read right to left', () => {
    const html = renderToStaticMarkup(
      createElement(Md, {
        text: 'Un code reçu par SMS (« 获取验证码 », obtenir le code). Par son nom suivi de 様 : « 山田 花子 様 ». La flèche du bouton « متابعة ».',
      }),
    );
    expect(html).toContain('(« <span lang="zh-CN">获取验证码</span> », obtenir le code)');
    expect(html).toContain('suivi de <span lang="ja">様</span>');
    expect(html).toContain('<span lang="ja">山田 花子 様</span>');
    expect(html).toContain('<span lang="ar" dir="auto">متابعة</span>');
  });

  it('reads a German compound in German, where it splits at its own syllables', () => {
    const html = renderToStaticMarkup(createElement(Md, { text: '« Privacy settings » devient « Datenschutzeinstellungen », 24 lettres.' }));
    expect(html).toContain('<span lang="de">Datenschutzeinstellungen</span>');
  });

  it('leaves a text without a quoted phrase as it was', () => {
    expect(languageRuns('Écrire « 12 000 » et non « 12000 ».')).toEqual([{ text: 'Écrire « 12 000 » et non « 12000 ».' }]);
  });
});
