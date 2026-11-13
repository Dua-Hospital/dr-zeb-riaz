import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  activeSeason,
  clinicState,
  formatClock,
  formatDuration,
  heroStatus,
  hoursFor,
  karachiParts,
  nextWorkingDay,
  trackPercent,
} from './clinic-status.ts';

const DUA = {
  id: 'dua',
  days: [false, true, true, true, true, true, true],
  seasons: { winter: { openMin: 1020, closeMin: 1260 }, summer: { openMin: 1080, closeMin: 1320 } },
} as const;
const SUN = 0, MON = 1, SAT = 6;

test('karachiParts returns the Pakistan day, minutes and month', () => {
  assert.deepEqual(karachiParts(new Date('2026-11-09T06:00:00Z')), { day: MON, minutes: 660, month: 11 });
  // 31 Oct 19:30 UTC is already Sunday 1 Nov 00:30 in Multan.
  assert.deepEqual(karachiParts(new Date('2026-10-31T19:30:00Z')), { day: SUN, minutes: 30, month: 11 });
});

test('activeSeason with the default months', () => {
  assert.deepEqual(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => activeSeason(m)),
    ['winter', 'winter', 'winter', 'summer', 'summer', 'summer', 'summer', 'summer', 'summer', 'summer', 'winter', 'winter'],
  );
});

test('activeSeason with custom months', () => {
  assert.equal(activeSeason(4, [10, 11, 12, 1, 2, 3, 4]), 'winter');
  assert.equal(activeSeason(5, [10, 11, 12, 1, 2, 3, 4]), 'summer');
});

test('hoursFor', () => {
  assert.deepEqual(hoursFor(DUA, 'winter'), { id: 'dua', days: DUA.days, openMin: 1020, closeMin: 1260 });
  assert.deepEqual(hoursFor(DUA, 'summer'), { id: 'dua', days: DUA.days, openMin: 1080, closeMin: 1320 });
});

test('winter boundaries (5–9 PM)', () => {
  const w = hoursFor(DUA, 'winter');
  assert.deepEqual(clinicState(MON, 1019, w), { kind: 'later', minsUntilOpen: 1 });
  assert.deepEqual(clinicState(MON, 1020, w), { kind: 'open', closeMin: 1260 });
  assert.deepEqual(clinicState(MON, 1259, w), { kind: 'open', closeMin: 1260 });
  assert.deepEqual(clinicState(MON, 1260, w), { kind: 'done' });
});

test('summer boundaries (6–10 PM)', () => {
  const s = hoursFor(DUA, 'summer');
  assert.deepEqual(clinicState(MON, 1079, s), { kind: 'later', minsUntilOpen: 1 });
  assert.deepEqual(clinicState(MON, 1080, s), { kind: 'open', closeMin: 1320 });
  assert.deepEqual(clinicState(MON, 1319, s), { kind: 'open', closeMin: 1320 });
  assert.deepEqual(clinicState(MON, 1320, s), { kind: 'done' });
});

test('Sunday and Saturday night', () => {
  const w = hoursFor(DUA, 'winter');
  assert.deepEqual(clinicState(SUN, 1100, w), { kind: 'closed-today' });
  assert.deepEqual(heroStatus(SUN, 1100, [w]), { kind: 'none-today', nextDay: MON });
  assert.deepEqual(heroStatus(SAT, 1350, [w]), { kind: 'closed', nextDay: MON });
  assert.deepEqual(heroStatus(MON, 1000, [w]), { kind: 'next', clinic: 'dua', minsUntilOpen: 20 });
  assert.equal(nextWorkingDay(SAT, [w]), MON);
});

test('track spans 4 PM to 11 PM', () => {
  assert.equal(trackPercent(960), 0);
  assert.equal(trackPercent(1380), 100);
  assert.equal(trackPercent(1170), 50);
  assert.equal(trackPercent(300), 0);
  assert.equal(trackPercent(1430), 100);
});

test('formatDuration', () => {
  assert.equal(formatDuration(134, 'en'), '2h 14m');
  assert.equal(formatDuration(45, 'en'), '45m');
  assert.equal(formatDuration(60, 'en'), '1h');
  assert.equal(formatDuration(134, 'ur'), '2 گھنٹے 14 منٹ');
  assert.equal(formatDuration(45, 'ur'), '45 منٹ');
});

test('formatClock', () => {
  assert.equal(formatClock(1020), '5 PM');
  assert.equal(formatClock(1320), '10 PM');
  assert.equal(formatClock(1170), '7:30 PM');
  assert.equal(formatClock(720), '12 PM');
});
