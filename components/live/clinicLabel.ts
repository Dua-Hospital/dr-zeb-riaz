import type { Clinic, SiteContent } from '@/lib/content';
import { clinicState, formatDuration } from '@/lib/clinic-status';
import type { Locale } from '@/lib/site';
import type { LiveState } from './useKarachiNow';

/** One clinic's live label and dot state for the given Pakistan time (spec §7.2). */
export function clinicLabel(
  clinic: Clinic,
  now: { day: number; minutes: number },
  c: SiteContent,
  locale: Locale,
): { state: LiveState; text: string } {
  const s = clinicState(now.day, now.minutes, clinic);
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
