import type { CSSProperties } from 'react';
import { CLINICS, type SiteContent } from '@/lib/content';
import { bookingHref, directionsHref } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { Icon } from './icons';
import { ClinicBadge } from './live/ClinicBadge';
import { SeasonHours } from './live/SeasonHours';
import { WeekStrip } from './live/WeekStrip';

/** Section 03: the Dua Hospital card. Badge, hours and week strip are neutral until hydrated. */
export function Clinics({ c, locale }: { c: SiteContent; locale: Locale }) {
  const t = c.clinics;
  const ur = locale === 'ur';
  return (
    <section id="clinic">
      <div className="wrap">
        <div className="sec-head">
          <div className="rv">
            <span className="overline">
              <span className="num">03</span>
              {t.overline}
            </span>
            <h2>{t.heading}</h2>
            <p className="lead">{t.lead}</p>
          </div>
        </div>
        <div className="cl-grid">
          {CLINICS.map((clinic, i) => {
            const name = ur ? clinic.nameUr : clinic.name;
            const address = clinic.address[locale];
            const landmark = clinic.landmark[locale];
            return (
              <article
                className="card clinic rv"
                key={clinic.id}
                style={i ? ({ '--d': `${i * 0.1}s` } as CSSProperties) : undefined}
              >
                <div className="cl-map">
                  <span className="label">{clinic.label[locale]}</span>
                  <svg className="road" preserveAspectRatio="none" viewBox="0 0 600 140" aria-hidden="true">
                    {i === 0 ? (
                      <>
                        <path d="M-10 104 C150 84 260 124 380 64 S560 34 620 54" stroke="#fff" strokeWidth="14" fill="none" />
                        <path d="M200 -10 L250 150" stroke="#fff" strokeWidth="10" fill="none" />
                      </>
                    ) : (
                      <>
                        <path d="M-10 36 C120 66 240 16 360 86 S520 126 620 96" stroke="#fff" strokeWidth="14" fill="none" />
                        <path d="M420 -10 L380 150" stroke="#fff" strokeWidth="10" fill="none" />
                      </>
                    )}
                  </svg>
                  <span className="shadow" />
                  <span className="pin" />
                </div>
                <div className="cl-body">
                  <div className="cl-top">
                    <div>
                      <h3>{name}</h3>
                      {!ur && (
                        <div className="ur" lang="ur">
                          {clinic.nameUr}
                        </div>
                      )}
                    </div>
                    <ClinicBadge clinic={clinic} locale={locale} />
                  </div>
                  <SeasonHours clinic={clinic} locale={locale} />
                  <WeekStrip clinic={clinic} locale={locale} />
                  <div className="cl-addr">
                    <Icon name="pin" />
                    <div>
                      {address}
                      <small>{landmark}</small>
                    </div>
                  </div>
                  <div className="cl-act">
                    <a className="btn btn-ghost" href={directionsHref(clinic.mapsQuery)} target="_blank" rel="noopener">
                      <Icon name="nav" />
                      {t.directions}
                    </a>
                    <a className="btn btn-pri wa-link" href={bookingHref(locale)} target="_blank" rel="noopener">
                      <Icon name="wa" />
                      {t.bookHere}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="holiday rv">
          <Icon name="cal" />
          {t.holiday}
        </div>
      </div>
    </section>
  );
}
