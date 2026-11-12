'use client';

import { CLINICS, getContent } from '@/lib/content';
import { formatClock, formatDuration, heroStatus } from '@/lib/clinic-status';
import type { Locale } from '@/lib/site';
import { dotClass, useKarachiNow, type LiveState } from './useKarachiNow';

/** The hero's live status pill (spec §7.2). Neutral until hydrated. */
export function StatusPill({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const now = useKarachiNow();
  const comma = c.status.comma;
  // c.days is Mon..Sun; status days are 0 = Sunday.
  const dayName = (d: number) => c.days[(d + 6) % 7];
  const nameOf = (id: string) => {
    const clinic = CLINICS.find((x) => x.id === id);
    return clinic ? (locale === 'ur' ? clinic.nameUr : clinic.name) : '';
  };

  let state: LiveState = 'off';
  let text = c.status.neutral;
  let where: string | null = null;

  if (now) {
    const s = heroStatus(now.day, now.minutes, CLINICS);
    switch (s.kind) {
      case 'none-today':
        text = c.status.noClinicToday;
        where = c.status.bookOn(dayName(s.nextDay));
        break;
      case 'open':
        state = 'open';
        text = c.status.seeing;
        where = nameOf(s.clinic) + comma + c.status.until(formatClock(s.closeMin));
        break;
      case 'next':
        state = 'later';
        text = c.status.next;
        where = nameOf(s.clinic) + comma + c.status.opensIn(formatDuration(s.minsUntilOpen, locale));
        break;
      case 'closed':
        text = c.status.closedNow;
        where = s.nextDay === (now.day + 1) % 7 ? c.status.bookTomorrow : c.status.bookOn(dayName(s.nextDay));
        break;
    }
  }

  return (
    <span className="pill-status">
      <span className={dotClass(state)} />
      <span>{text}</span>
      {where && <b>{c.status.lead + where}</b>}
    </span>
  );
}
