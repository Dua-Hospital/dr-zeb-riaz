import { DOCTOR, type SiteContent } from '@/lib/content';
import { bookingHref } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { Icon } from './icons';
import { InfoStrip } from './InfoStrip';
import { PortraitCard } from './PortraitCard';
import { StatusPill } from './live/StatusPill';
import { TodayCard } from './live/TodayCard';

const ECG = 'M0 23 H170 l12 -4 l10 4 h18 l10 -20 l14 40 l10 -26 l8 6 h40 l10 -5 l10 5 H500';

/** The hero bento: main card, portrait, "Where is he today?" and the info strip (spec §3.2). */
export function Hero({ c, locale }: { c: SiteContent; locale: Locale }) {
  const h = c.hero;
  const name = locale === 'ur' ? DOCTOR.nameUr : DOCTOR.name;
  const cut = name.lastIndexOf(' ');
  return (
    <div className="hero">
      <div className="wrap">
        <div className="bento">
          <div className="card h-main rv">
            <StatusPill locale={locale} />
            <div className="overline h-over">{h.overline}</div>
            <h1 className="h-name">
              {name.slice(0, cut + 1)}
              <span>{name.slice(cut + 1)}</span>
            </h1>
            <svg className="ecg" viewBox="0 0 500 46" aria-hidden="true">
              <path d={ECG} />
              <circle className="dot" r="5" />
            </svg>
            <div className="h-ur ur" lang="ur">
              {h.urLine}
            </div>
            <p className="h-statement">
              <strong>
                {h.lineStrong[0]}
                <br />
                {h.lineStrong[1]}
              </strong>{' '}
              {h.lineRest}
            </p>
            <div className="h-conds">
              {h.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
              <a href="#treatments">
                {h.seeAll}
                <Icon name="arrow" />
              </a>
            </div>
            <div className="h-ctas">
              <a className="btn btn-pri wa-link" href={bookingHref(locale)} target="_blank" rel="noopener">
                <Icon name="wa" />
                {h.ctaBook}
                <Icon name="arrow" className="arr" />
              </a>
              <a className="btn btn-ghost" href="#clinics">
                <Icon name="clock" />
                {h.ctaTimings}
              </a>
            </div>
            <p className="h-note">{h.note}</p>
          </div>

          <PortraitCard c={c} locale={locale} />
          <TodayCard locale={locale} />
          <InfoStrip c={c} locale={locale} />
        </div>
      </div>
    </div>
  );
}
