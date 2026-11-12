import type { Clinic, SiteContent } from '@/lib/content';
import { activeSeason, clinicState, formatDuration, hoursFor, type ClinicHours } from '@/lib/clinic-status';
import type { Locale } from '@/lib/site';
import type { LiveState } from './useKarachiNow';

type Now = { day: number; minutes: number; month: number };

/** The clinic's hours for the season in force at `now` (spec §7.2). */
export function seasonHours(clinic: Clinic, now: Now): ClinicHours {
  return hoursFor(clinic, activeSeason(now.month, clinic.winterMonths));
}

/** One clinic's live label and dot state for the given Pakistan time (spec §7.3). */
export function clinicLabel(
  clinic: Clinic,
  now: Now,
  c: SiteContent,
  locale: Locale,
): { state: LiveState; text: string } {
  const s = clinicState(now.day, now.minutes, seasonHours(clinic, now));
  switch (s.kind) {
    case 'open':
      return { state: 'open', text: c.status.open };
    case 'later':
      return { state: 'later', text: c.status.later(formatDuration(s.minsUntilOpen, locale)) };
    case 'done':
      return { state: 'off', text: c.status.done };
    case 'closed-today':
      return { state: 'off', text: c.status.closedToday };
  }
}
