import type { Locale } from './site.ts';

export type ClinicId = 'hayat' | 'dua';
export type Week = readonly [boolean, boolean, boolean, boolean, boolean, boolean, boolean]; // Sun..Sat
export interface ClinicHours { id: ClinicId; openMin: number; closeMin: number; days: Week }

export type ClinicState =
  | { kind: 'closed-today' }
  | { kind: 'later'; minsUntilOpen: number }
  | { kind: 'open'; closeMin: number }
  | { kind: 'done' };

// `nextDay` is the next day (0 = Sunday) on which at least one clinic works.
export type HeroStatus =
  | { kind: 'none-today'; nextDay: number }
  | { kind: 'open'; clinic: ClinicId; closeMin: number }
  | { kind: 'next'; clinic: ClinicId; minsUntilOpen: number }
  | { kind: 'closed'; nextDay: number };

// The "Where is he today?" track spans the working day: an hour before the first clinic
// opens (Hayat, 12 PM) to an hour after the last one closes (Dua, 9:30 PM).
export const TRACK_START = 660; // 11 AM
export const TRACK_END = 1350; // 10:30 PM

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Day-of-week and minutes-since-midnight in Asia/Karachi, independent of the device time zone.
export function karachiParts(instant: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Karachi',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(instant);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return {
    day: WEEKDAYS.indexOf(get('weekday')),
    minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')),
  };
}

export function clinicState(day: number, minutes: number, clinic: ClinicHours): ClinicState {
  if (!clinic.days[day]) return { kind: 'closed-today' };
  if (minutes < clinic.openMin) return { kind: 'later', minsUntilOpen: clinic.openMin - minutes };
  if (minutes < clinic.closeMin) return { kind: 'open', closeMin: clinic.closeMin };
  return { kind: 'done' };
}

/** The next day (0 = Sunday) after `day` on which at least one clinic works; `day` itself if none do. */
export function nextWorkingDay(day: number, clinics: readonly ClinicHours[]): number {
  for (let d = 1; d <= 7; d++) {
    const next = (day + d) % 7;
    if (clinics.some((c) => c.days[next])) return next;
  }
  return day;
}

export function heroStatus(day: number, minutes: number, clinics: readonly ClinicHours[]): HeroStatus {
  if (!clinics.some((c) => c.days[day])) return { kind: 'none-today', nextDay: nextWorkingDay(day, clinics) };

  let next: { clinic: ClinicId; minsUntilOpen: number } | null = null;
  for (const c of clinics) {
    const s = clinicState(day, minutes, c);
    if (s.kind === 'open') return { kind: 'open', clinic: c.id, closeMin: s.closeMin };
    if (s.kind === 'later' && (!next || s.minsUntilOpen < next.minsUntilOpen)) {
      next = { clinic: c.id, minsUntilOpen: s.minsUntilOpen };
    }
  }
  if (next) return { kind: 'next', ...next };
  return { kind: 'closed', nextDay: nextWorkingDay(day, clinics) };
}

export function formatDuration(mins: number, locale: Locale): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const [hUnit, mUnit] = locale === 'ur' ? [' گھنٹے', ' منٹ'] : ['h', 'm'];
  const out: string[] = [];
  if (h > 0) out.push(`${h}${hUnit}`);
  if (m > 0 || h === 0) out.push(`${m}${mUnit}`);
  return out.join(' ');
}

export function formatClock(min: number): string {
  const h24 = Math.floor(min / 60);
  const m = min % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const suffix = h24 >= 12 ? 'PM' : 'AM';
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

export function trackPercent(min: number): number {
  const p = ((min - TRACK_START) / (TRACK_END - TRACK_START)) * 100;
  return Math.min(100, Math.max(0, p));
}
