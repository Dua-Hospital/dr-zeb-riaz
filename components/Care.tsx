import type { CSSProperties } from 'react';
import { visibleCare, visibleGroups, type SiteContent } from '@/lib/content';
import { bookingHref } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { Icon } from './icons';
import { CareTabs } from './CareTabs';

/**
 * Section 02: every confirmed care card is server-rendered (visible without JS); the tabs only
 * filter. Pending items and groups with no shown item are left out (spec §6.2).
 */
export function Care({ c, locale }: { c: SiteContent; locale: Locale }) {
  const t = c.care;
  const ur = locale === 'ur';
  const items = visibleCare();
  const groups = visibleGroups();
  const counts: Record<string, number> = { all: items.length };
  for (const g of groups) counts[g] = items.filter((x) => x.group === g).length;
  return (
    <section id="care">
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
          <CareTabs groups={['all', ...groups]} labels={t.groups} counts={counts} />
        </div>
        <div className="tx-grid" id="tx">
          {items.map((x, i) => (
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
              {/* The name in the other language under the title, as on Dr Hasan's site:
                  Urdu under English, English under Urdu. */}
              {ur ? (
                <span className="en" lang="en" dir="ltr">
                  {x.name}
                </span>
              ) : (
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
