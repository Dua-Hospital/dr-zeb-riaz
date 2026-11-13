import type { CSSProperties } from 'react';
import { REVIEWS, type SiteContent } from '@/lib/content';
import { Icon } from './icons';

const GRADIENTS = [
  'linear-gradient(135deg,#5687C0,#03254F)',
  'linear-gradient(135deg,#71BF44,#447C28)',
  'linear-gradient(135deg,#2A67AF,#064188)',
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/** Section 05: patient reviews. Renders nothing until real reviews exist (spec D9). */
export function Reviews({ c }: { c: SiteContent }) {
  if (REVIEWS.length === 0) return null;
  const t = c.reviews;
  return (
    <section id="reviews">
      <div className="wrap">
        <div className="sec-head">
          <div className="rv">
            <span className="overline">
              <span className="num">05</span>
              {t.overline}
            </span>
            <h2>{t.heading}</h2>
          </div>
        </div>
        <div className="rv-grid">
          {REVIEWS.map((r, i) => (
            <article
              className={`card review${i === 0 ? ' big' : ''} rv`}
              key={`${r.name}-${i}`}
              style={i ? ({ '--d': `${i * 0.1}s` } as CSSProperties) : undefined}
            >
              <div className="stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Icon name="star" key={s} />
                ))}
              </div>
              <p>&ldquo;{r.quote}&rdquo;</p>
              <div className="who">
                <span className="avatar" style={{ background: GRADIENTS[i % GRADIENTS.length] }} aria-hidden="true">
                  {initials(r.name)}
                </span>
                <div>
                  <b>{r.name}</b>
                  <span>{r.condition}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
