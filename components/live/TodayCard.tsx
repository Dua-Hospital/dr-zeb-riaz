'use client';

import type { CSSProperties } from 'react';
import { CLINICS, getContent, type Clinic } from '@/lib/content';
import { TRACK_END, TRACK_START, formatClock, trackPercent, nextWorkingDay } from '@/lib/clinic-status';
import type { Locale } from '@/lib/site';
import { clinicLabel, seasonHours } from './clinicLabel';
import { dotClass, useKarachiNow } from './useKarachiNow';

/**
 * "Today at Dua Hospital": the 4 PM – 11 PM track with today's session for the season in
 * force, the Now marker and one status row (spec §3, §7.2). Before hydration the track shows
 * no session, so the exported HTML never states a season or a status.
 */
export function TodayCard({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const now = useKarachiNow();
  const sunday = now !== null && !CLINICS.some((x) => x.days[now.day]);
  const hours = now ? CLINICS.map((x) => seasonHours(x, now)) : [];
  const nextDay = now ? c.dayNames[(nextWorkingDay(now.day, hours) + 6) % 7] : '';
  const name = (x: Clinic) => (locale === 'ur' ? x.nameUr : x.name);
  const date =
    now &&
    new Date().toLocaleDateString(locale === 'ur' ? 'ur-PK-u-nu-latn' : 'en-GB', {
      timeZone: 'Asia/Karachi',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  // Tick labels at the session's real boundaries: opening anchors to the bar's start, closing to its end.
  const ticks = hours.flatMap((h) => [
    { m: h.openMin, edge: 'start' as const },
    { m: h.closeMin, edge: 'end' as const },
  ]);

  // `is-sunday` sits on an inner wrapper: React must not rewrite the `.rv`
  // element's className after Reveal has added `in` to it.
  return (
    <div className="card h-today rv" style={{ '--d': '.2s' } as CSSProperties} id="today">
      <div className="t-head">
        <h3>{c.today.heading}</h3>
        <span className="d">{date}</span>
      </div>
      <div className={sunday ? 'is-sunday' : undefined}>
        <div className="track">
          <div className="rail" />
          {hours.map((h) => (
            <div
              key={h.id}
              className="seg du"
              style={{
                left: `${trackPercent(h.openMin)}%`,
                width: `${trackPercent(h.closeMin) - trackPercent(h.openMin)}%`,
              }}
            >
              <span className="seg-t">{name(CLINICS.find((x) => x.id === h.id)!).split(' ')[0]}</span>
            </div>
          ))}
          {now && now.minutes >= TRACK_START && now.minutes <= TRACK_END && (
            <div
              className="now"
              style={{ left: `${trackPercent(now.minutes)}%` }}
              // U+200E (LTR mark) ensures Latin clock tokens remain correctly ordered in RTL.
              data-t={`${c.today.now} ‎${formatClock(now.minutes)}`}
            />
          )}
        </div>
        <div className="ticks">
          {ticks.map((t) => (
            <span key={t.m} className={t.edge} style={{ left: `${trackPercent(t.m)}%` }} dir="ltr">
              {formatClock(t.m)}
            </span>
          ))}
        </div>
        <div className="t-foot">
          {CLINICS.map((x) => {
            const live = now ? clinicLabel(x, now, c, locale) : null;
            const h = now ? seasonHours(x, now) : null;
            return (
              <div className="t-row" key={x.id}>
                <span className={dotClass(live ? live.state : 'off')} />
                <b className="t-name">{name(x)}</b>
                <span className="t-time" dir="ltr">
                  {h ? `${formatClock(h.openMin)} – ${formatClock(h.closeMin)}` : ''}
                </span>
                <span className="t-status">{live ? live.text : x.daysText[locale]}</span>
              </div>
            );
          })}
        </div>
        <div className="sunday">{c.status.noClinicNote(nextDay)}</div>
      </div>
    </div>
  );
}
