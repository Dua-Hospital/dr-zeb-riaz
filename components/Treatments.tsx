import type { CSSProperties } from 'react';
import { TREATMENTS, TREATMENT_GROUPS, type SiteContent } from '@/lib/content';
import { bookingHref } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { Icon } from './icons';
import { TreatmentTabs } from './TreatmentTabs';

/** Section 02: all 21 cards are server-rendered (visible without JS); the tabs only filter. */
export function Treatments({ c, locale }: { c: SiteContent; locale: Locale }) {
  const t = c.treatments;
  const ur = locale === 'ur';
  const counts: Record<string, number> = { all: TREATMENTS.length };
  for (const g of TREATMENT_GROUPS) counts[g] = TREATMENTS.filter((x) => x.group === g).length;
  return (
    <section id="treatments">
      <div className="wrap">
        <div className="sec-head">
          <div className="rv">
            <span className="overline">
              <span className="num">02</span>
              {t.overline}
            </span>
            <h2>{t.heading}</h2>
            <p className="lead">{t.lead}</p>
          </div>
          <TreatmentTabs groups={['all', ...TREATMENT_GROUPS]} labels={t.groups} counts={counts} />
        </div>
        <div className="tx-grid" id="tx">
          {TREATMENTS.map((x, i) => (
            <div
              className="card tx rv"
              key={x.name}
              style={{ '--d': `${(i % 4) * 0.05}s` } as CSSProperties}
              data-c={x.group}
            >
              <span className="ic">
                <Icon name={x.icon} />
              </span>
              <b>{ur ? x.nameUr : x.name}</b>
              {!ur && (
                <span className="ur" lang="ur">
                  {x.nameUr}
                </span>
              )}
              <p>{ur ? x.blurbUr : x.blurb}</p>
            </div>
          ))}
          <div className="card ask rv">
            <span className="ic">
              <Icon name="chat" />
            </span>
            <div>
              <b>{t.ask.title}</b>
              <span>{t.ask.body}</span>
            </div>
            <a className="btn wa-link" href={bookingHref(locale)} target="_blank" rel="noopener">
              <Icon name="wa" />
              {t.ask.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
