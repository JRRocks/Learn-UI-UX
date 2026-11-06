import { ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, pageTitle, usePageTitle } from '../app/router';
import { Mock } from '../components/Mock';
import { CULTURE_NAMES } from '../content/cultures';
import { LAB_LOCALES, type LabLocale } from '../content/cultures/lab';
import type { Visual } from '../engine/types';
import { MdInline, frenchSpacing } from '../lib/markdown';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

const base = (lang: string) => lang.toLowerCase().split('-')[0];

/**
 * « Libellé : valeur » as each language writes it: French puts a no-break space before the colon,
 * Chinese and Japanese use the full-width colon with no space, the others a plain colon.
 */
export function labelSeparator(lang: string): string {
  const b = base(lang);
  if (b === 'fr') return '\u00A0: ';
  if (b === 'zh' || b === 'ja') return '：';
  return ': ';
}

/** « japonais (Japon) »: the locale named in French, for the alternative text of the preview. */
function frenchName(l: LabLocale): string {
  return safe(() => new Intl.DisplayNames('fr', { type: 'language', languageDisplay: 'standard' }).of(l.locale) ?? l.label, l.label);
}

/** Why a much shorter text than English, by writing system. */
const COMPACT: Record<string, string> = {
  zh: 'Les sinogrammes condensent le sens',
  ja: 'Les kanji et les kana condensent le sens',
  ko: 'Le hangeul est un alphabet, mais ses lettres se regroupent en blocs syllabiques',
};

/** The same checkout card for any locale, laid out with logical properties so RTL mirrors itself. */
function cartVisual(l: LabLocale): Visual {
  const money = (n: number) => new Intl.NumberFormat(l.locale, { style: 'currency', currency: l.currency }).format(n);
  const delivery = new Date();
  delivery.setDate(delivery.getDate() + 3);
  const date = new Intl.DateTimeFormat(l.locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(delivery);
  const qty = new Intl.NumberFormat(l.locale).format(1);
  const s = l.strings;
  const sep = labelSeparator(l.lang);
  return {
    alt: `Récapitulatif de panier en ${frenchName(l)}, mis en page ${l.dir === 'rtl' ? 'de droite à gauche' : 'de gauche à droite'}.`,
    dir: l.dir,
    lang: l.lang,
    html: `<div class="lab-cart">
  <p class="lab-title">${esc(s.title)}</p>
  <div class="lab-item">
    <div class="mk-img lab-thumb" style="--ratio:1"></div>
    <div class="lab-item-text"><p class="mk-strong">${esc(s.item)}</p><p class="mk-small mk-muted">${esc(s.qty)}${sep}${qty}</p></div>
    <p class="mk-price">${esc(money(l.price))}</p>
  </div>
  <div class="mk-divider"></div>
  <div class="lab-line"><span>${esc(s.subtotal)}</span><span class="mk-price">${esc(money(l.price))}</span></div>
  <div class="lab-line"><span>${esc(s.shipping)}</span><span>${esc(s.free)}</span></div>
  <div class="lab-line lab-total"><span>${esc(s.total)}</span><span class="mk-price">${esc(money(l.price))}</span></div>
  <p class="mk-small mk-muted">${esc(s.delivery)}${sep}${esc(date)}</p>
  <span class="mk-btn mk-btn--block">${esc(s.pay)} <i data-icon="arrow-right" class="lab-arrow"></i></span>
  <p class="mk-small mk-muted lab-returns"><i data-icon="refresh-cw" style="--ico:14px"></i> ${esc(s.returns)}</p>
</div>`,
    css: `.lab-cart { display: flex; flex-direction: column; gap: 12px; padding: 18px; max-width: 380px; margin-inline: auto; }
.lab-title { font-size: 19px; font-weight: 700; }
.lab-item { display: flex; align-items: center; gap: 12px; }
.lab-thumb { width: 56px; flex: none; }
.lab-item-text { flex: 1; min-width: 0; }
.lab-line { display: flex; justify-content: space-between; gap: 12px; }
.lab-total { font-weight: 700; font-size: 16px; }
.lab-returns { display: flex; align-items: center; gap: 6px; }
[dir="rtl"] .lab-arrow { transform: scaleX(-1); }
.lab-cart:lang(ar), .lab-cart:lang(hi) { line-height: 1.7; }`,
  };
}

const sampleDate = new Date(2026, 9, 27, 14, 30);

export function Lab() {
  const [locale, setLocale] = useState('ja-JP');
  const l = LAB_LOCALES.find((x) => x.locale === locale) ?? LAB_LOCALES[0];
  const en = LAB_LOCALES.find((x) => x.locale === 'en-US')!;
  const visual = useMemo(() => cartVisual(l), [l]);
  const length = (x: LabLocale) => Object.values(x.strings).join('').length;
  const ratio = length(l) / length(en);
  const culture = l.culture ? { id: l.culture, name: CULTURE_NAMES[l.culture] ?? l.culture } : undefined;
  usePageTitle(pageTitle('Labo de localisation', 'Cultures'));

  const plural = safe(() => {
    const pr = new Intl.PluralRules(l.locale);
    return [0, 1, 2, 5, 21].map((n) => `${n} → ${pr.select(n)}`).join(' · ');
  }, '—');
  const weekStart = safe(() => {
    const loc = new Intl.Locale(l.locale) as Intl.Locale & { getWeekInfo?: () => { firstDay: number }; weekInfo?: { firstDay: number } };
    const info = loc.getWeekInfo?.() ?? loc.weekInfo;
    if (!info) return 'Non exposé par ce navigateur';
    const day = new Date(2026, 9, 25 + (info.firstDay % 7)); // 25 Oct 2026 is a Sunday
    return new Intl.DateTimeFormat(l.locale, { weekday: 'long' }).format(day);
  }, '—');

  const facts: [string, string][] = [
    ['Date longue', safe(() => new Intl.DateTimeFormat(l.locale, { dateStyle: 'full' }).format(sampleDate), '—')],
    ['Date courte', safe(() => new Intl.DateTimeFormat(l.locale, { dateStyle: 'short' }).format(sampleDate), '—')],
    ['Heure', safe(() => new Intl.DateTimeFormat(l.locale, { timeStyle: 'short' }).format(sampleDate), '—')],
    ['Nombre', safe(() => new Intl.NumberFormat(l.locale).format(12345678.9), '—')],
    ['Prix', safe(() => new Intl.NumberFormat(l.locale, { style: 'currency', currency: l.currency }).format(l.price), '—')],
    ['Pourcentage', safe(() => new Intl.NumberFormat(l.locale, { style: 'percent', maximumFractionDigits: 1 }).format(0.255), '—')],
    ['Il y a 3 jours', safe(() => new Intl.RelativeTimeFormat(l.locale, { numeric: 'auto' }).format(-3, 'day'), '—')],
    ['Liste', safe(() => new Intl.ListFormat(l.locale, { type: 'conjunction' }).format(l.dir === 'rtl' ? ['أ', 'ب', 'ج'] : ['A', 'B', 'C']), '—')],
    ['Catégories de pluriel', plural],
    ['Premier jour de la semaine', weekStart],
    ['Calendrier hégirien', l.locale.startsWith('ar') ? safe(() => new Intl.DateTimeFormat(`${l.locale}-u-ca-islamic-umalqura`, { dateStyle: 'long' }).format(sampleDate), '—') : '—'],
  ];

  return (
    <div className="page">
      <Link to="/cultures" className="back">
        <ArrowLeft aria-hidden="true" /> Cultures
      </Link>
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          Labo de localisation
        </h1>
        <p className="lead">
          <MdInline text="Le même récapitulatif de panier, rendu avec l’API `Intl` du navigateur : formats, longueur des textes, sens de lecture. Change de langue et observe ce qui bouge." />
        </p>
      </header>

      <div className="field" style={{ maxWidth: '22rem' }}>
        <label htmlFor="lab-locale">Langue et région</label>
        <select id="lab-locale" className="select" value={locale} onChange={(e) => setLocale(e.target.value)}>
          {LAB_LOCALES.map((x) => (
            <option key={x.locale} value={x.locale} lang={x.lang}>
              {x.label} — {x.locale}
            </option>
          ))}
        </select>
      </div>

      <div className="lab">
        <section className="section" aria-label="Aperçu localisé">
          <div className="stage">
            <Mock key={l.locale} visual={visual} />
          </div>
          <p className="small muted">
            Longueur des textes{'\u00A0'}: <strong className="num">{Math.round(ratio * 100)}{'\u00A0'}%</strong> de l’anglais.
            {ratio > 1.15 && frenchSpacing(' Prévois de la place : boutons et libellés doivent pouvoir s’allonger.')}
            {ratio < 0.7 &&
              frenchSpacing(
                ` ${COMPACT[base(l.lang)] ?? 'Le texte est bien plus court qu’en anglais'} : il compte bien moins de caractères. Ne fige pas les largeurs sur la version anglaise.`,
              )}
          </p>
        </section>
        <section className="section" aria-labelledby="lab-facts">
          <h2 id="lab-facts">Ce que donne <code>{l.locale}</code></h2>
          <dl className="lab-facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd lang={l.lang} dir="auto">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="md" style={{ paddingInlineStart: '1.2em' }}>
            {l.notes.map((n, i) => (
              <li key={i}>
                <MdInline text={n} />
              </li>
            ))}
          </ul>
          {culture && (
            <Link to={`/cultures/${culture.id}`} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
              Profil{'\u00A0'}: {culture.name}
            </Link>
          )}
        </section>
      </div>
    </div>
  );
}
