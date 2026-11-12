import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CARE, CARE_GROUPS, CLINICS, REVIEWS, getContent, visibleCare, visibleGroups } from './content.ts';

// Every string in a value; functions are called with sample arguments so their text is checked too.
function leaves(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (typeof value === 'function') return [String(value('X', 'Y'))];
  if (Array.isArray(value)) return value.flatMap(leaves);
  if (value && typeof value === 'object') return Object.values(value).flatMap(leaves);
  return [];
}

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return typeof value;
}

const en = getContent('en');
const ur = getContent('ur');
const all = [en, ur, CLINICS, CARE];
const allText = [JSON.stringify(all), ...leaves(all)].join('\n');

test('15 care items in 5 groups', () => {
  assert.deepEqual(CARE_GROUPS, ['fertility', 'pregnancy', 'periods', 'women', 'breast']);
  assert.deepEqual(CARE.map((t) => t.name), [
    'Female infertility', 'Male infertility & low sperm count', 'Fertility medicines', 'IUI', 'IVF',
    'Pregnancy check-ups', 'Pregnancy complications', 'Normal delivery & C-section',
    'Irregular periods', 'Period pain', 'PCOS',
    'Uterine prolapse', 'Leucorrhoea (discharge)', 'Urine infection',
    'Breast checks',
  ]);
  const counts: Record<string, number> = {};
  for (const t of CARE) counts[t.group] = (counts[t.group] ?? 0) + 1;
  assert.deepEqual(counts, { fertility: 5, pregnancy: 3, periods: 3, women: 3, breast: 1 });
  assert.deepEqual(CARE.filter((t) => t.pending).map((t) => t.name), ['PCOS', 'Breast checks']);
  for (const t of CARE) assert.ok(t.nameUr && t.blurb && t.blurbUr, `${t.name} has all text`);
});

test('pending items and empty groups are hidden', () => {
  assert.equal(visibleCare().length, 13);
  assert.ok(visibleCare().every((t) => !t.pending));
  assert.deepEqual(visibleGroups(), ['fertility', 'pregnancy', 'periods', 'women']);
  assert.equal(en.hero.seeAll(String(visibleCare().length)), 'See all 13 →');
  assert.ok(ur.hero.seeAll('13').includes('13'));
});

test('one clinic with seasonal hours', () => {
  assert.equal(CLINICS.length, 1);
  const [dua] = CLINICS;
  assert.equal(dua.id, 'dua');
  assert.deepEqual([...dua.days], [false, true, true, true, true, true, true]);
  assert.deepEqual(dua.seasons, { winter: { openMin: 1020, closeMin: 1260 }, summer: { openMin: 1080, closeMin: 1320 } });
  assert.deepEqual(dua.hoursText, { winter: '5:00 PM – 9:00 PM', summer: '6:00 PM – 10:00 PM' });
  assert.deepEqual([...dua.winterMonths], [11, 12, 1, 2, 3]);
  assert.ok(dua.address.en.includes('Bank Plaza') && dua.address.en.includes('Sher Shah Road'));
  assert.equal(dua.mapsQuery, 'Dua Hospital Bank Plaza Sher Shah Road Garden Town Multan');
});

test('authority copy', () => {
  assert.equal(en.about.heading, 'Trained in Pakistan and the UK. Specialised in fertility and pregnancy.');
  assert.deepEqual(en.portrait.creds.map((c) => c.title), ['MBBS', 'FCPS', 'MRCOG (UK)', 'Owner & CEO']);
  assert.deepEqual(en.about.facts.map((f) => f.value), ['MRCOG (UK)', 'FCPS']);
  assert.ok(!/leads Dua|sees you herself/i.test(JSON.stringify(en.about)));
});

test('hero copy', () => {
  assert.equal(en.hero.overline, 'Consultant Gynaecologist & Obstetrician');
  assert.deepEqual(en.hero.lineStrong, ['Pregnancy. Fertility.', "Women's health."]);
  assert.equal(en.hero.lineRest, "One specialist, from trying to conceive to your baby's first week.");
});

test('no superlatives or cure claims', () => {
  for (const bad of [/\bbest\b/i, /\bno\.? ?1\b/i, /guarantee/i, /\bcure/i, /permanent/i, /مستقل حل/, /بہترین/]) {
    assert.ok(!bad.test(allText), `found ${bad}`);
  }
});

test('no template leftovers', () => {
  for (const stale of ['Hasan', 'حسن عزیز', 'Hayat', 'حیات', '3336489392', 'Consultant Physician', 'کنسلٹنٹ فزیشن', 'tel:']) {
    assert.ok(!allText.includes(stale), `found stale text: ${stale}`);
  }
});

test('the only call is 1122', () => {
  const calls = [
    ...leaves(en).filter((s) => /\bcall\b/i.test(s)),
    ...leaves(ur).filter((s) => s.includes('کال کر')),
  ];
  assert.ok(calls.length > 0);
  for (const s of calls) assert.ok(s.includes('1122'), `call without 1122: ${s}`);
});

test('reviews ship empty', () => {
  assert.equal(REVIEWS.length, 0);
});

test('urdu uses Urdu letters, not Arabic ones', () => {
  assert.ok(!allText.includes('ه'), 'Arabic heh U+0647');
  assert.ok(!allText.includes('ي'), 'Arabic yeh U+064A');
  assert.ok(!allText.includes('ك'), 'Arabic kaf U+0643');
  assert.ok(!/[٠-٩۰-۹]/.test(allText), 'Western digits only');
});

test('en and ur have the same shape', () => {
  assert.deepEqual(shape(en), shape(ur));
  assert.equal(en.dir, 'ltr');
  assert.equal(ur.dir, 'rtl');
});

test('status and season text', () => {
  assert.equal(en.status.neutral, 'Mon – Sat · see timings');
  assert.equal(en.clinics.otherSeason.summer('6:00 PM – 10:00 PM'), 'Summer: 6:00 PM – 10:00 PM');
  assert.equal(en.clinics.otherSeason.winter('5:00 PM – 9:00 PM'), 'Winter: 5:00 PM – 9:00 PM');
  assert.equal(en.status.opensAtIn('5 PM', '2h 14m'), 'Opens at 5 PM · in 2h 14m');
  assert.equal(en.status.seeing, 'Seeing patients now');
  assert.equal(en.status.until('9 PM'), 'until 9 PM');
  assert.equal(en.status.bookOn('Monday'), 'Book now for Monday');
  assert.ok(ur.status.until('9 PM').includes('9 PM'));
  assert.ok(ur.status.opensAtIn('5 PM', '2 گھنٹے').includes('5 PM'));
  assert.ok(ur.clinics.otherSeason.summer('6:00 PM – 10:00 PM').includes('6:00 PM'));
});

test('pink october copy', () => {
  assert.equal(en.pinkOctober.heading, 'Early checks save lives.');
  assert.equal(en.pinkOctober.cta, 'Book a breast check');
});

test('full day names for booking prompts', () => {
  assert.deepEqual(en.dayNames, ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  assert.equal(ur.dayNames.length, 7);
  assert.equal(en.status.bookOn(en.dayNames[0]), 'Book now for Monday');
});
