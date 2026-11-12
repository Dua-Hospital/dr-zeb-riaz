'use client';

import type { CSSProperties } from 'react';
import { CLINICS, getContent, type Clinic } from '@/lib/content';
import { TRACK_END, TRACK_START, formatClock, trackPercent, nextWorkingDay } from '@/lib/clinic-status';
import type { Locale } from '@/lib/site';
import { clinicLabel } from './clinicLabel';
import { dotClass, useKarachiNow } from './useKarachiNow';

// Tick labels sit at the real clinic boundaries (open and close times), placed by minutes —
// not spread evenly — so they line up with the bars. Opening times anchor to the bar's start,
// closing times to its end, so a short bar's two labels don't overlap.
const TICKS = CLINICS.flatMap((x) => [
  { m: x.openMin, edge: 'start' as const },
  { m: x.closeMin, edge: 'end' as const },
]).sort((a, b) => a.m - b.m);
const SEG_CLASS: Record<string, string> = { hayat: 'hy', dua: 'du' };

/** "Where is he today?": the 9 AM – 11 PM track, the Now marker and one row per clinic (spec §7.3). */
export function TodayCard({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const now = useKarachiNow();
  const sunday = now !== null && !CLINICS.some((x) => x.days[now.day]); // no clinic works today
  const nextDay = now ? c.days[(nextWorkingDay(now.day, CLINICS) + 6) % 7] : '';
  const name = (x: Clinic) => (locale === 'ur' ? x.nameUr : x.name);
  const date =
    now &&
    new Date().toLocaleDateString(locale === 'ur' ? 'ur-PK-u-nu-latn' : 'en-GB', {
      timeZone: 'Asia/Karachi',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

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
          {CLINICS.map((x) => (
            <div
              key={x.id}
              className={`seg ${SEG_CLASS[x.id] ?? ''}`}
              style={{
                left: `${trackPercent(x.openMin)}%`,
                width: `${trackPercent(x.closeMin) - trackPercent(x.openMin)}%`,
              }}
            >
              <span className="seg-t">{name(x).split(' ')[0]}</span>
            </div>
          ))}
          {now && now.minutes >= TRACK_START && now.minutes <= TRACK_END && (
            <div
              className="now"
              style={{ left: `${trackPercent(now.minutes)}%` }}
              // U+200E (LTR mark) ensures Latin clock tokens remain correctly ordered in RTL.
              data-t={`${c.today.now} \u200E${formatClock(now.minutes)}`}
            />
          )}
        </div>
        <div className="ticks">
          {TICKS.map((t) => (
            <span key={t.m} className={t.edge} style={{ left: `${trackPercent(t.m)}%` }} dir="ltr">
              {formatClock(t.m)}
            </span>
          ))}
        </div>
        <div className="t-foot">
          {CLINICS.map((x) => {
            const live = now ? clinicLabel(x, now, c, locale) : null;
            return (
              <div className="t-row" key={x.id}>
                <span className={dotClass(live ? live.state : 'off')} />
                <b className="t-name">{name(x).split(' ')[0]}</b>
                <span className="t-time" dir="ltr">
                  {formatClock(x.openMin)} – {formatClock(x.closeMin)}
                </span>
                <span className="t-status">{live?.text}</span>
              </div>
            );
          })}
        </div>
        <div className="sunday">{c.status.noClinicNote(nextDay)}</div>
      </div>
    </div>
  );
}
