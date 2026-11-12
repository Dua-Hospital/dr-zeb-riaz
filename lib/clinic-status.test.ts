import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  clinicState,
  heroStatus,
  nextWorkingDay,
  karachiParts,
  formatDuration,
  formatClock,
  trackPercent,
} from './clinic-status.ts';

const ALL_BUT_SUN = [false, true, true, true, true, true, true] as const;
const HAYAT = { id: 'hayat', openMin: 660, closeMin: 1140, days: ALL_BUT_SUN } as const;
const DUA = { id: 'dua', openMin: 1140, closeMin: 1320, days: ALL_BUT_SUN } as const;
const BOTH = [HAYAT, DUA];
const MON = 1, SAT = 6, SUN = 0;

test('clinicState boundaries', () => {
  assert.deepEqual(clinicState(MON, 659, HAYAT), { kind: 'later', minsUntilOpen: 1 });
  assert.deepEqual(clinicState(MON, 660, HAYAT), { kind: 'open', closeMin: 1140 });
  assert.deepEqual(clinicState(MON, 1139, HAYAT), { kind: 'open', closeMin: 1140 });
  assert.deepEqual(clinicState(MON, 1140, HAYAT), { kind: 'done' });
  assert.deepEqual(clinicState(MON, 1139, DUA), { kind: 'later', minsUntilOpen: 1 });
  assert.deepEqual(clinicState(MON, 1140, DUA), { kind: 'open', closeMin: 1320 });
  assert.deepEqual(clinicState(MON, 1319, DUA), { kind: 'open', closeMin: 1320 });
  assert.deepEqual(clinicState(MON, 1320, DUA), { kind: 'done' });
});

test('clinicState sunday', () => {
  assert.deepEqual(clinicState(SUN, 700, HAYAT), { kind: 'closed-today' });
  assert.deepEqual(clinicState(SUN, 700, DUA), { kind: 'closed-today' });
});

test('heroStatus order', () => {
  assert.deepEqual(heroStatus(SUN, 1200, BOTH), { kind: 'none-today', nextDay: MON });
  assert.deepEqual(heroStatus(MON, 700, BOTH), { kind: 'open', clinic: 'hayat', closeMin: 1140 });
  assert.deepEqual(heroStatus(MON, 1200, BOTH), { kind: 'open', clinic: 'dua', closeMin: 1320 });
  assert.deepEqual(heroStatus(MON, 600, BOTH), { kind: 'next', clinic: 'hayat', minsUntilOpen: 60 });
  assert.deepEqual(heroStatus(MON, 1330, BOTH), { kind: 'closed', nextDay: 2 });
  assert.deepEqual(heroStatus(SAT, 1330, BOTH), { kind: 'closed', nextDay: MON });
});

test('heroStatus page left open across a boundary', () => {
  assert.deepEqual(heroStatus(SAT, 1319, BOTH), { kind: 'open', clinic: 'dua', closeMin: 1320 });
  assert.deepEqual(heroStatus(SAT, 1320, BOTH), { kind: 'closed', nextDay: MON });
  assert.deepEqual(heroStatus(SAT, 1439, BOTH), { kind: 'closed', nextDay: MON });
  assert.deepEqual(heroStatus(SUN, 0, BOTH), { kind: 'none-today', nextDay: MON });
});

test('karachiParts from UTC', () => {
  assert.deepEqual(karachiParts(new Date('2026-11-09T06:00:00Z')), { day: 1, minutes: 660 });
  assert.deepEqual(karachiParts(new Date('2026-11-07T20:30:00Z')), { day: 0, minutes: 90 });
});

test('formatDuration', () => {
  assert.equal(formatDuration(134, 'en'), '2h 14m');
  assert.equal(formatDuration(45, 'en'), '45m');
  assert.equal(formatDuration(60, 'en'), '1h');
  assert.equal(formatDuration(134, 'ur'), '2 گھنٹے 14 منٹ');
  assert.equal(formatDuration(45, 'ur'), '45 منٹ');
});

test('formatClock', () => {
  assert.equal(formatClock(660), '11 AM');
  assert.equal(formatClock(1140), '7 PM');
  assert.equal(formatClock(1170), '7:30 PM');
  assert.equal(formatClock(720), '12 PM');
});

test('trackPercent', () => {
  assert.equal(trackPercent(660), 0); // 11 AM
  assert.equal(trackPercent(1350), 100); // 10:30 PM
  assert.equal(trackPercent(1005), 50);
  assert.equal(trackPercent(300), 0);
  assert.equal(trackPercent(1430), 100);
  // Clinic boundaries land where the tick labels are drawn.
  assert.ok(Math.abs(trackPercent(720) - (60 / 690) * 100) < 1e-9); // 12 PM
  assert.ok(Math.abs(trackPercent(1290) - (630 / 690) * 100) < 1e-9); // 9:30 PM
});

// The real schedule (Nov 2026): Hayat Sat–Thu 12–5 PM (off Friday), Dua Mon–Sat 8–9:30 PM (off Sunday).
const HAYAT_REAL = { id: 'hayat', openMin: 720, closeMin: 1020, days: [true, true, true, true, true, false, true] } as const;
const DUA_REAL = { id: 'dua', openMin: 1200, closeMin: 1290, days: [false, true, true, true, true, true, true] } as const;
const REAL = [HAYAT_REAL, DUA_REAL];
const FRI = 5;

test('real schedule: a clinic works every day', () => {
  // Sunday: only Hayat.
  assert.deepEqual(heroStatus(SUN, 800, REAL), { kind: 'open', clinic: 'hayat', closeMin: 1020 });
  assert.deepEqual(clinicState(SUN, 800, DUA_REAL), { kind: 'closed-today' });
  assert.deepEqual(heroStatus(SUN, 1100, REAL), { kind: 'closed', nextDay: MON });
  // Friday: Hayat off, Dua evening only.
  assert.deepEqual(clinicState(FRI, 800, HAYAT_REAL), { kind: 'closed-today' });
  assert.deepEqual(heroStatus(FRI, 800, REAL), { kind: 'next', clinic: 'dua', minsUntilOpen: 400 });
  assert.deepEqual(heroStatus(FRI, 1289, REAL), { kind: 'open', clinic: 'dua', closeMin: 1290 });
  // Saturday night → Sunday (Hayat), which is tomorrow.
  assert.deepEqual(heroStatus(SAT, 1290, REAL), { kind: 'closed', nextDay: SUN });
  // Boundaries.
  assert.deepEqual(clinicState(MON, 719, HAYAT_REAL), { kind: 'later', minsUntilOpen: 1 });
  assert.deepEqual(clinicState(MON, 1019, HAYAT_REAL), { kind: 'open', closeMin: 1020 });
  assert.deepEqual(clinicState(MON, 1020, HAYAT_REAL), { kind: 'done' });
  assert.deepEqual(clinicState(MON, 1199, DUA_REAL), { kind: 'later', minsUntilOpen: 1 });
  assert.deepEqual(clinicState(MON, 1290, DUA_REAL), { kind: 'done' });
});

test('nextWorkingDay', () => {
  assert.equal(nextWorkingDay(MON, BOTH), 2);
  assert.equal(nextWorkingDay(SAT, BOTH), MON);
  assert.equal(nextWorkingDay(SAT, REAL), SUN);
  assert.equal(nextWorkingDay(3, []), 3);
});
