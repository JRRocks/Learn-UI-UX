import { Link } from '../app/router';
import { EXERCISES } from '../content';
import { CULTURE_COMMON_LABEL, CULTURE_NAMES, CULTURE_REGIONS, HOME_CULTURE, REGIONS_ORDER } from '../content/cultures';
import { CULTURE_COMMON, inCulture } from '../engine/session';
import { count } from '../lib/french';

const sizeOf = (cultureId?: string) => EXERCISES.filter((e) => inCulture(e, cultureId)).length;

function Quiz({ id, name }: { id?: string; name: string }) {
  const n = sizeOf(id);
  if (!n) return null;
  return (
    <li>
      <Link to={`/session?mode=culture${id ? `&id=${id}` : ''}`} className="quiz-chip" aria-label={`S’entraîner : ${name}, ${count(n, 'épreuve', 'épreuves')}`}>
        {name}
        <span className="quiz-chip-n" aria-hidden="true">
          {n}
        </span>
      </Link>
    </li>
  );
}

/**
 * The culture exercises one market at a time: the learner's own market first, then the foreign
 * ones by region, then what no single market holds (the frameworks, the comparisons) and the lot.
 * A market without exercises is left out.
 */
export function CountryQuizzes() {
  const foreign = Object.keys(CULTURE_NAMES).filter((id) => id !== HOME_CULTURE);
  const regions = REGIONS_ORDER.map((region) => ({ region, ids: foreign.filter((id) => CULTURE_REGIONS[id] === region) })).filter((r) => r.ids.length);
  return (
    <dl className="quizzes">
      <div className="quizzes-row">
        <dt>Ton marché</dt>
        <dd>
          <ul>
            <Quiz id={HOME_CULTURE} name={CULTURE_NAMES[HOME_CULTURE]} />
          </ul>
        </dd>
      </div>
      <div className="quizzes-row quizzes-row--group">
        <dt>Pays étrangers</dt>
        <dd>
          <dl className="quizzes">
            {regions.map(({ region, ids }) => (
              <div key={region} className="quizzes-row">
                <dt>{region}</dt>
                <dd>
                  <ul>
                    {ids.map((id) => (
                      <Quiz key={id} id={id} name={CULTURE_NAMES[id]} />
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </dd>
      </div>
      <div className="quizzes-row">
        <dt>Ensemble</dt>
        <dd>
          <ul>
            <Quiz id={CULTURE_COMMON} name={CULTURE_COMMON_LABEL} />
            <Quiz name="Tous les pays mêlés" />
          </ul>
        </dd>
      </div>
    </dl>
  );
}
