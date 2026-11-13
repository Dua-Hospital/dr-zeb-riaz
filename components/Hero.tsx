import { DOCTOR, visibleCare, type SiteContent } from '@/lib/content';
import { bookingHref } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { Icon } from './icons';
import { InfoStrip } from './InfoStrip';
import { PortraitCard } from './PortraitCard';
import { StatusPill } from './live/StatusPill';
import { TodayCard } from './live/TodayCard';

/** The trace under the name: flat, the mother's beat, then the baby's three faster beats. */
const BEAT = 'M0 23 H110 l8 -4 l8 4 h12 l8 -17 l11 32 l8 -21 l7 6 h44 l5 -8 l5 14 l4 -6 h10 l5 -8 l5 14 l4 -6 h10 l5 -8 l5 14 l4 -6 H500';

/** The hero bento: main card, portrait, today card and the info strip (spec §3). */
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
            {/* Two heartbeats: one slower beat (the mother), then three quick small ones (the baby).
                Dua blue into Zeb rose, like the two hands of the mark. A soft trace stays put; a bright
                pulse runs along it, each beat ripples as it passes, and the line ends in a heart
                that beats when the pulse arrives. Timings in globals.css follow the path's length. */}
            <svg className="beat" viewBox="0 0 522 46" aria-hidden="true">
              <defs>
                <linearGradient id="beat-g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="500" y2="0">
                  <stop offset="0.2" style={{ stopColor: 'var(--b600)' }} />
                  <stop offset="0.5" style={{ stopColor: 'var(--r500)' }} />
                </linearGradient>
              </defs>
              <path className="base" d={BEAT} pathLength={1} stroke="url(#beat-g)" />
              <path className="run" d={BEAT} pathLength={1} stroke="url(#beat-g)" />
              <circle className="rip rip-m" cx="146" cy="6" r="3" />
              <circle className="rip rip-b1" cx="221" cy="15" r="2.4" />
              <circle className="rip rip-b2" cx="245" cy="15" r="2.4" />
              <circle className="rip rip-b3" cx="269" cy="15" r="2.4" />
              <path className="heart" d="M511 30c-6-4-9-7-9-11a4.5 4.5 0 0 1 9 0a4.5 4.5 0 0 1 9 0c0 4-3 7-9 11z" />
              <circle className="dot" r="4" style={{ offsetPath: `path("${BEAT}")` }} />
            </svg>
            {locale === 'ur' ? (
              <div className="h-echo" lang="en" dir="ltr">
                {h.echo}
              </div>
            ) : (
              <div className="h-ur ur" lang="ur">
                {h.echo}
              </div>
            )}
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
              <a href="#care">
                {h.seeAll(String(visibleCare().length))}
                <Icon name="arrow" />
              </a>
            </div>
            <div className="h-ctas">
              <a className="btn btn-pri wa-link" href={bookingHref(locale)} target="_blank" rel="noopener">
                <Icon name="wa" />
                {h.ctaBook}
                <Icon name="arrow" className="arr" />
              </a>
              <a className="btn btn-ghost" href="#clinic">
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
