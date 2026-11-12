# Dr. Zeb Riaz Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Dr. Zeb Riaz's bilingual one-page booking site by copying the Dr. Hasan Aziz site and re-theming, re-writing and adapting it to one clinic with seasonal hours and an October-only Pink October band.

**Architecture:** Copy `../dr-hasan-aziz` (Next.js static export, one `app/globals.css`, all copy in `lib/content.ts`, pure logic in `lib/*.ts` tested with `node --test`, client islands for live status). Change the pure modules first under TDD (time/season, booking, content, schema), then the components that read them, then add the Pink October island.

**Tech Stack:** Next.js 16.4.3 (App Router, `output: 'export'`), React 19.2, TypeScript, Node 22.18+ (`node --test` runs `.ts` directly). No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-12-dr-zeb-riaz-site-design.md`. Template rules: `../dr-hasan-aziz/docs/design-guide.md`. Client facts: `docs/client-data.md`.

## Global Constraints

- No new dependencies. No Tailwind, CSS-in-JS, icon fonts or animation libraries. Icons are inline SVG in `components/icons.tsx`.
- One stylesheet: `app/globals.css`. Never a hex value inside a component; use CSS variables.
- All copy in `lib/content.ts`, `en` and `ur` with identical shape. Components hold no literal copy.
- Static export only: no server actions, route handlers, middleware, `headers()`/`cookies()`.
- Booking is WhatsApp only through `bookingHref()` in `lib/links.ts`, number `923358028888`, opened with `target="_blank" rel="noopener"`. No `tel:` links. The word "call" appears only with 1122.
- Never ship a live status or the Pink October band in exported HTML; both appear only after hydration.
- Pakistan time (`Asia/Karachi`) for every day, minute and month decision.
- Urdu: Gulzar only, Western digits, Urdu letterforms (`ہ ی ک`, never `ه ي ك`), MBBS/FCPS/MRCOG in Latin. Every new Urdu string is listed in `docs/urdu-review.md`.
- Copy never says "best", "No. 1", "guaranteed", "cure", "permanent" or `مستقل حل` (spec Z11).
- About copy builds authority from qualifications, experience and expertise only; the CEO role is a plain fact (spec Z6).
- Hours: winter 5:00–9:00 PM (`1020`–`1260`), summer 6:00–10:00 PM (`1080`–`1320`), Monday–Saturday, closed Sunday. Winter months default `[11, 12, 1, 2, 3]`.
- Colours: spec §5 token table, exactly.

## Review Focus

1. **Month boundary in Pakistan time:** `2026-10-31T19:30:00Z` is 1 November 00:30 in Karachi, so the season is winter and the Pink October band is off. Test in Task 2.
2. **Saturday after closing:** at Saturday 22:30 the next working day is Monday, not Sunday. Test in Task 2.
3. **Pending services leave no empty tab:** while Breast checks is pending, the Breast health tab must not render with zero cards, and the "See all" count matches the rendered cards. Test in Task 4.
4. **Exported HTML stays neutral:** `out/index.html` contains the neutral status text and neither "Open now" nor the Pink October heading. Check in Task 8.
5. **Season-dependent text agrees everywhere:** the hero pill, Today card, clinic card and JSON-LD all use the same season for one instant. Covered by all of them calling `activeSeason` (Task 2) and `hoursFor` (Task 2); schema test in Task 5.

---

### Task 1: Copy the template and set the brand foundation

**Files:**
- Create: everything copied from `../dr-hasan-aziz` except `.git/`, `node_modules/`, `.next/`, `out/`, `.freebuff/`, `docs/`, `serve.log`, `*.tsbuildinfo`
- Modify: `package.json` (`"name": "dr-zeb-riaz-landing"`), `app/globals.css` (token block, page background), `.gitignore` (add `.freebuff/`)
- Create: `public/brand/` from `docs/design/logo/` (`zeb-mark-full.svg`, `zeb-mark-reversed.svg`, `zeb-mark-small-full.svg`, `zeb-mark-small-reversed.svg`, `zeb-app-icon.svg`) and `public/brand/dua-hospital-logo.svg` (from `docs/client-assets/dua-logo/dua-hospital-logo.svg`, with its grey background `rect`s removed); `app/icon.svg` = `docs/design/logo/zeb-favicon.svg`
- Create: `public/images/dr-zeb-riaz-hero.jpg` (= `zeb-coat-cutout-white.jpg`), `dr-zeb-riaz-about.jpg` (= `zeb-coat-arms-crossed.jpg`), `dr-zeb-riaz-avatar.jpg` (= `zeb-headshot-white-square.jpg`)
- Delete: `public/brand/dr-hasan-aziz-mark.svg`, `public/images/dr-hasan-aziz-*.jpg` (after Task 7 stops referencing them; leave them until then)

**Interfaces:**
- Produces: CSS variables of spec §5 (`--b50 … --b900`, `--r50 … --r900`, `--c100 … --c700`, `--cream`, `--line`, `--g100`, `--g500`, `--g800`, `--p50 … --p900`, template semantic and remaining neutral variables unchanged).

- [ ] **Step 1:** `git init` in `dr-zeb-riaz`, copy the template files as listed, run `npm install`.
- [ ] **Step 2:** Run `npm test` and `npm run build`. Expected: all template tests pass and `out/index.html`, `out/ur/index.html` exist (baseline before any change).
- [ ] **Step 3:** Replace the token block at the top of `app/globals.css` with spec §5's values; set `--bg: var(--cream)` and `--line: #EFE5D6`. Keep variable names the template already uses so existing rules keep working.
- [ ] **Step 4:** Copy the brand and image files listed above.
- [ ] **Step 5:** Run `npm run build`. Expected: build succeeds.
- [ ] **Step 6:** Commit: `chore: copy Dr. Hasan Aziz template and apply Zeb brand tokens`.

### Task 2: Time, season and campaign logic

**Files:**
- Modify: `lib/clinic-status.ts`, `lib/clinic-status.test.ts`
- Create: `lib/campaign.ts`, `lib/campaign.test.ts`
- Modify: `components/live/useKarachiNow.ts`

**Interfaces:**
- Produces (in `lib/clinic-status.ts`):
  - `type ClinicId = 'dua'`
  - `type SeasonId = 'winter' | 'summer'`
  - `const WINTER_MONTHS: readonly number[] = [11, 12, 1, 2, 3]`
  - `interface SeasonalClinic { id: ClinicId; days: Week; seasons: Record<SeasonId, { openMin: number; closeMin: number }> }`
  - `karachiParts(instant: Date): { day: number; minutes: number; month: number }` (month 1–12)
  - `activeSeason(month: number, winterMonths?: readonly number[]): SeasonId`
  - `hoursFor(clinic: SeasonalClinic, season: SeasonId): ClinicHours`
  - `TRACK_START = 960` (4 PM), `TRACK_END = 1380` (11 PM)
  - unchanged: `ClinicHours`, `ClinicState`, `HeroStatus`, `clinicState`, `nextWorkingDay`, `heroStatus`, `formatDuration`, `formatClock`, `trackPercent`
- Produces (in `lib/campaign.ts`): `isPinkOctober(month: number): boolean`; `showPinkOctober(month: number, care: readonly { name: string; pending?: true }[]): boolean` (true only in October and when the item named `Breast checks` exists and is not pending)
- Produces: `useKarachiNow(): { day: number; minutes: number; month: number } | null`

- [ ] **Step 1: Write the failing tests** in `lib/clinic-status.test.ts` (replace the two-clinic tests; keep `formatDuration`/`formatClock` tests):

```ts
const DUA = { id: 'dua', days: [false, true, true, true, true, true, true],
  seasons: { winter: { openMin: 1020, closeMin: 1260 }, summer: { openMin: 1080, closeMin: 1320 } } } as const;

test('karachiParts returns the Pakistan month', () => {
  assert.deepEqual(karachiParts(new Date('2026-10-31T19:30:00Z')), { day: 0, minutes: 30, month: 11 });
});
test('activeSeason with the default months', () => {
  assert.deepEqual([1,2,3,4,5,6,7,8,9,10,11,12].map((m) => activeSeason(m)),
    ['winter','winter','winter','summer','summer','summer','summer','summer','summer','summer','winter','winter']);
});
test('activeSeason with custom months', () => { assert.equal(activeSeason(4, [10, 11, 12, 1, 2, 3, 4]), 'winter'); });
test('hoursFor', () => {
  assert.deepEqual(hoursFor(DUA, 'winter'), { id: 'dua', days: DUA.days, openMin: 1020, closeMin: 1260 });
  assert.deepEqual(hoursFor(DUA, 'summer'), { id: 'dua', days: DUA.days, openMin: 1080, closeMin: 1320 });
});
test('winter boundaries', () => {
  const w = hoursFor(DUA, 'winter');
  assert.deepEqual(clinicState(1, 1019, w), { kind: 'later', minsUntilOpen: 1 });
  assert.deepEqual(clinicState(1, 1020, w), { kind: 'open', closeMin: 1260 });
  assert.deepEqual(clinicState(1, 1259, w), { kind: 'open', closeMin: 1260 });
  assert.deepEqual(clinicState(1, 1260, w), { kind: 'done' });
});
test('summer boundaries', () => {
  const s = hoursFor(DUA, 'summer');
  assert.deepEqual(clinicState(1, 1079, s), { kind: 'later', minsUntilOpen: 1 });
  assert.deepEqual(clinicState(1, 1080, s), { kind: 'open', closeMin: 1320 });
  assert.deepEqual(clinicState(1, 1320, s), { kind: 'done' });
});
test('Sunday and Saturday night', () => {
  const w = hoursFor(DUA, 'winter');
  assert.deepEqual(heroStatus(0, 1100, [w]), { kind: 'none-today', nextDay: 1 });
  assert.deepEqual(heroStatus(6, 1350, [w]), { kind: 'closed', nextDay: 1 });
});
test('track spans 4 PM to 11 PM', () => {
  assert.equal(trackPercent(960), 0);
  assert.equal(trackPercent(1380), 100);
  assert.equal(trackPercent(1170), 50);
});
```

And `lib/campaign.test.ts`:

```ts
test('Pink October only in October', () => {
  assert.deepEqual([9, 10, 11].map(isPinkOctober), [false, true, false]);
});
test('band needs confirmed breast checks', () => {
  assert.equal(showPinkOctober(10, [{ name: 'Breast checks', pending: true }]), false);
  assert.equal(showPinkOctober(10, [{ name: 'Breast checks' }]), true);
  assert.equal(showPinkOctober(11, [{ name: 'Breast checks' }]), false);
  assert.equal(showPinkOctober(10, []), false);
});
```

- [ ] **Step 2:** Run `npm test`. Expected: the new tests FAIL (`activeSeason`, `hoursFor`, `isPinkOctober`, `showPinkOctober` not exported; `month` missing).
- [ ] **Step 3:** Implement the Interfaces above. `karachiParts` adds `month: 'numeric'` to the `Intl.DateTimeFormat` options. `activeSeason` is `winterMonths.includes(month) ? 'winter' : 'summer'`. Update the track comment for 4 PM–11 PM. `useKarachiNow` returns the full `karachiParts` result.
- [ ] **Step 4:** Run `npm test`. Expected: these tests PASS (content and schema tests may still fail until Tasks 4–5; that is expected now).
- [ ] **Step 5:** Commit: `feat: seasonal hours and Pink October month logic`.

### Task 3: Site config and booking seam

**Files:**
- Modify: `lib/site.ts`, `lib/links.ts`, `lib/links.test.ts`

**Interfaces:**
- Produces: `WHATSAPP_NUMBER = '923358028888'`; `SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drzebriaz.pk'` (placeholder, open item 5); `bookingHref(locale: Locale, context?: 'breast-check'): string`; `directionsHref` unchanged.

- [ ] **Step 1: Write the failing tests** (replace the template's message tests):

```ts
const text = (href: string) => decodeURIComponent(href.split('?text=')[1]);
test('english message', () => {
  const h = bookingHref('en');
  assert.ok(h.startsWith('https://wa.me/923358028888?text='));
  assert.equal(text(h), 'Assalam o Alaikum. I would like to book an appointment with Dr. Zeb Riaz at Dua Hospital.\nName:\nProblem:');
});
test('breast-check context', () => {
  assert.equal(text(bookingHref('en', 'breast-check')),
    'Assalam o Alaikum. I would like to book an appointment with Dr. Zeb Riaz at Dua Hospital for a breast check.\nName:\nProblem:');
});
test('urdu message names her and keeps the context', () => {
  const plain = text(bookingHref('ur')); const breast = text(bookingHref('ur', 'breast-check'));
  assert.ok(plain.includes('ڈاکٹر زیب ریاض') && plain.includes('دعا ہسپتال'));
  assert.notEqual(plain, breast);
  assert.ok(!/[هيك]/.test(plain + breast));
});
```

- [ ] **Step 2:** Run `npm test`. Expected: FAIL (old number and name).
- [ ] **Step 3:** Implement. Urdu template: `السلام علیکم۔ مجھے دعا ہسپتال میں ڈاکٹر زیب ریاض سے {breast: 'بریسٹ چیک اپ کے لیے '}اپوائنٹمنٹ چاہیے۔\nنام:\nمسئلہ:` (add both lines to `docs/urdu-review.md` in Task 8).
- [ ] **Step 4:** Run `npm test`. Expected: links tests PASS.
- [ ] **Step 5:** Commit: `feat: booking seam for Dr. Zeb Riaz`.

### Task 4: Content and data

**Files:**
- Modify: `lib/content.ts`, `lib/content.test.ts`

**Interfaces:**
- Consumes: `SeasonalClinic`, `SeasonId`, `WINTER_MONTHS` (Task 2).
- Produces:
  - `DOCTOR = { name: 'Dr. Zeb Riaz', nameUr: 'ڈاکٹر زیب ریاض' }`
  - `interface Clinic extends SeasonalClinic { name; nameUr; label: Both; address: Both; landmark: Both; mapsQuery: string; hoursText: Record<SeasonId, string>; daysText: Both; winterMonths: readonly number[] }`
  - `CLINICS: readonly Clinic[]` (one entry, `id: 'dua'`)
  - `type CareGroup = 'fertility' | 'pregnancy' | 'periods' | 'women' | 'breast'`; `CARE_GROUPS: readonly CareGroup[]` in that order
  - `interface Treatment { icon: IconName; name; nameUr; blurb; blurbUr; group: CareGroup; pending?: true }`; `CARE: readonly Treatment[]` (all 15)
  - `visibleCare(): readonly Treatment[]` (excludes `pending`); `visibleGroups(): readonly CareGroup[]` (groups with ≥ 1 visible item, in `CARE_GROUPS` order)
  - `SiteContent` keeps the template's shape, renaming `treatments` → `care` and changing: `info[].target: '#clinic' | '#care' | '#about' | 'whatsapp'`; `hero.seeAll: Text` (count); `portrait.creds: { title: string; where: string }[]` (replaces the degree/spec fields); `clinics.otherSeason: Record<SeasonId, Text>` (label + hours of that season, e.g. `otherSeason.summer('6:00 PM – 10:00 PM')`); `status.opensAtIn: (clock: string, duration: string) => string`; `pinkOctober: { overline: string; heading: string; body: string; cta: string }`; `care.groups: Record<'all' | CareGroup, string>`.
  - `IconName` gains `'baby' | 'egg' | 'pregnant' | 'drop' | 'calendar' | 'uterus' | 'ribbon' | 'shield' | 'pill'` (drawn in Task 6).

- [ ] **Step 1: Write the failing tests** (replace template tests `21 treatments`, `clinics`, `About Me label`, `neutral status`; keep the shape, Urdu-letter, stale-data and call-1122 tests, updating the stale list):

```ts
test('15 care items in 5 groups', () => {
  assert.deepEqual(CARE_GROUPS, ['fertility', 'pregnancy', 'periods', 'women', 'breast']);
  assert.deepEqual(CARE.map((t) => t.name), [
    'Female infertility', 'Male infertility & low sperm count', 'Fertility medicines', 'IUI', 'IVF',
    'Pregnancy check-ups', 'Pregnancy complications', 'Normal delivery & C-section',
    'Irregular periods', 'Period pain', 'PCOS',
    'Uterine prolapse', 'Leucorrhoea (discharge)', 'Urine infection',
    'Breast checks',
  ]);
  assert.deepEqual(CARE.filter((t) => t.pending).map((t) => t.name), ['PCOS', 'Breast checks']);
});
test('pending items and empty groups are hidden', () => {
  assert.equal(visibleCare().length, 13);
  assert.deepEqual(visibleGroups(), ['fertility', 'pregnancy', 'periods', 'women']);
  assert.equal(en.hero.seeAll(String(visibleCare().length)), 'See all 13 →');
});
test('one clinic with seasonal hours', () => {
  assert.equal(CLINICS.length, 1);
  const [dua] = CLINICS;
  assert.deepEqual([...dua.days], [false, true, true, true, true, true, true]);
  assert.deepEqual(dua.seasons, { winter: { openMin: 1020, closeMin: 1260 }, summer: { openMin: 1080, closeMin: 1320 } });
  assert.deepEqual(dua.hoursText, { winter: '5:00 PM – 9:00 PM', summer: '6:00 PM – 10:00 PM' });
  assert.deepEqual([...dua.winterMonths], [11, 12, 1, 2, 3]);
  assert.ok(dua.address.en.includes('Bank Plaza') && dua.address.en.includes('Sher Shah Road'));
});
test('authority copy', () => {
  assert.equal(en.about.heading, 'Trained in Pakistan and the UK. Specialised in fertility and pregnancy.');
  assert.deepEqual(en.portrait.creds.map((c) => c.title), ['MBBS', 'FCPS', 'MRCOG (UK)', 'Owner & CEO']);
  assert.ok(!/leads Dua|sees you herself/i.test(JSON.stringify(en.about)));
});
test('no superlatives or cure claims', () => {
  for (const bad of [/\bbest\b/i, /\bno\.? ?1\b/i, /guarantee/i, /\bcure/i, /permanent/i, /مستقل حل/, /بہترین/]) {
    assert.ok(!bad.test(allText), `found ${bad}`);
  }
});
test('no template leftovers', () => {
  for (const stale of ['Hasan', 'حسن عزیز', 'Hayat', 'حیات', '3336489392', 'Physician', 'tel:']) {
    assert.ok(!allText.includes(stale), `found stale text: ${stale}`);
  }
});
test('neutral status and season text', () => {
  assert.equal(en.status.neutral, 'Mon – Sat · see timings');
  assert.equal(en.clinics.otherSeason.summer('6:00 PM – 10:00 PM'), 'Summer: 6:00 PM – 10:00 PM');
  assert.equal(en.clinics.otherSeason.winter('5:00 PM – 9:00 PM'), 'Winter: 5:00 PM – 9:00 PM');
  assert.equal(en.status.opensAtIn('5 PM', '2h 14m'), 'Opens at 5 PM · in 2h 14m');
  assert.equal(en.status.seeing, 'Seeing patients now');
  assert.equal(en.status.until('9 PM'), 'until 9 PM');
});
```

(`allText` includes `CARE` and `CLINICS` instead of `TREATMENTS`.)

- [ ] **Step 2:** Run `npm test`. Expected: content tests FAIL.
- [ ] **Step 3:** Rewrite `lib/content.ts`. English copy is exactly spec §3 (hero, info strip, About text and fact tiles, timeline, visit steps, clinic heading and lead, FAQ questions, emergency note, final band, footer line) and §7.5 (Pink October). Care blurbs: one short line each in the template's tone, no claims. Urdu: care names from `docs/client-data.md`; all other Urdu written in the template's style.
- [ ] **Step 4:** Run `npm test`. Expected: content tests PASS; schema tests may fail until Task 5.
- [ ] **Step 5:** Commit: `feat: Dr. Zeb Riaz content, care list and clinic data`.

### Task 5: Structured data

**Files:**
- Modify: `lib/schema.ts`, `lib/schema.test.ts`

**Interfaces:**
- Consumes: `CLINICS`, `DOCTOR`, `visibleCare()`, `getContent` (Task 4).
- Produces: `buildPageSchema(locale: Locale)` returning one `Physician` and one `MedicalClinic`.

- [ ] **Step 1: Write the failing tests:**

```ts
const graph = buildPageSchema('en')['@graph'];
test('one physician, one clinic', () => {
  const doc = graph.find((n) => n['@type'] === 'Physician');
  assert.equal(doc.name, 'Dr. Zeb Riaz');
  assert.deepEqual(doc.medicalSpecialty, ['Obstetric', 'Gynecologic']);
  assert.equal(graph.filter((n) => n['@type'] === 'MedicalClinic').length, 1);
  assert.ok(!JSON.stringify(graph).includes('telephone'));
});
test('seasonal opening hours', () => {
  const clinic = graph.find((n) => n['@type'] === 'MedicalClinic');
  const hours = clinic.openingHoursSpecification.map((h) => [h.opens, h.closes]);
  assert.deepEqual([...new Set(hours.map(String))].sort(), ['17:00,21:00', '18:00,22:00']);
  for (const h of clinic.openingHoursSpecification) assert.ok(!h.dayOfWeek.includes('Sunday'));
});
test('services are the visible care items', () => {
  const doc = graph.find((n) => n['@type'] === 'Physician');
  assert.equal(doc.availableService.length, visibleCare().length);
});
```

(Match the template's existing property names for the graph and services; adjust the access paths above if the template nests them differently, keeping the assertions.)

- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3:** Implement. Each season gets one `openingHoursSpecification` entry per working day with `validFrom`/`validThrough` as month-day strings derived from `winterMonths` (`--11-01` … `--03-31` for winter, `--04-01` … `--10-31` for summer). `worksFor` is the Dua Hospital clinic node.
- [ ] **Step 4:** Run `npm test`. Expected: all `lib/` tests PASS.
- [ ] **Step 5:** Commit: `feat: JSON-LD for Dr. Zeb Riaz and Dua Hospital`.

### Task 6: Live islands for one clinic

**Files:**
- Modify: `components/live/StatusPill.tsx`, `components/live/TodayCard.tsx`, `components/live/ClinicBadge.tsx`, `components/live/WeekStrip.tsx`, `components/live/clinicLabel.ts`
- Modify: `components/icons.tsx` (new icon names from Task 4)

**Interfaces:**
- Consumes: `useKarachiNow()` with `month`, `activeSeason`, `hoursFor`, `CLINICS[0]`, `TRACK_START`/`TRACK_END` (Task 2); `c.status`, `c.today` (Task 4).
- Produces: `clinicLabel(clinic: Clinic, now: { day; minutes; month }, c, locale)` that resolves the season internally.

- [ ] **Step 1:** In every island compute `const hours = hoursFor(clinic, activeSeason(now.month, clinic.winterMonths))` and pass `hours` (not the clinic) to `clinicState`/`heroStatus`. Ticks in `TodayCard` come from `hours`. Rename the template's "Where is he today?" heading via content (`c.today.heading`).
- [ ] **Step 2:** Status pill per spec §7.3: Sunday → `noClinicToday` + `bookOn(<next day>)`; open → `seeing` + `until(formatClock(closeMin))`; later → `opensAtIn(formatClock(openMin), formatDuration(...))`; done → `closedNow` + `bookTomorrow`, or `bookOn(<next day>)` when `nextWorkingDay` is not tomorrow (Saturday → Monday).
- [ ] **Step 3:** Add the new icons to `components/icons.tsx` in the template's style (24 viewBox, 2px stroke, round caps, `currentColor`); `ribbon` follows the ribbon used on `docs/design/brand-board.html`.
- [ ] **Step 4:** Run `npm test` and `npm run build`. Expected: PASS; exported `out/index.html` contains `Mon – Sat · see timings` and not `Open now`.
- [ ] **Step 5:** Commit: `feat: live status for one clinic with seasonal hours`.

### Task 7: Sections, logo and styles

**Files:**
- Modify: `components/Header.tsx`, `Hero.tsx`, `PortraitCard.tsx`, `InfoStrip.tsx`, `About.tsx`, `Treatments.tsx` → rename `Care.tsx`, `TreatmentTabs.tsx` → rename `CareTabs.tsx`, `Clinics.tsx`, `Booking.tsx`, `ChatDemo.tsx`, `Faq.tsx`, `FinalCta.tsx`, `Footer.tsx`, `MobileDock.tsx`, `Page.tsx`, `components/nav/items.ts`
- Modify: `app/globals.css`, `app/layout.tsx` (theme colour `#074EA2`, metadata), `app/page.tsx`, `app/ur/page.tsx`

**Interfaces:**
- Consumes: everything from Tasks 2–6; `visibleCare()`, `visibleGroups()`.

- [ ] **Step 1:** Header and footer use the logo: `<img src="/brand/zeb-mark-full.svg">` (header) and `zeb-mark-reversed.svg` (footer, navy band) beside the name, with the "Owner & CEO · Dua Hospital" line; the footer bottom line includes `/brand/dua-hospital-logo.svg` at 24px. Anchors become `#about`, `#care`, `#clinic`, `#book`, `#faq` (and `nav/items.ts`, footer numbers).
- [ ] **Step 2:** Hero: remove the ECG SVG and its CSS; add the champagne rule (`.rule`, 80×3px, `--c500`, draws in once over 600ms, static under reduced motion). Chips come from content; the "See all" chip uses `c.hero.seeAll(String(visibleCare().length))`.
- [ ] **Step 3:** PortraitCard renders `c.portrait.creds` (4 items) under `dr-zeb-riaz-hero.jpg`; About uses `dr-zeb-riaz-about.jpg`; ChatDemo and FinalCta use `dr-zeb-riaz-avatar.jpg`. Remove the old `dr-hasan-aziz-*` files and mark.
- [ ] **Step 4:** Care: tabs and counts from `visibleGroups()`/`visibleCare()`; the dark "Don't see your problem?" card stays last.
- [ ] **Step 5:** Clinics renders the single clinic card: current-season hours large (`hoursText[season]`, neutral render shows winter and summer lines both), `c.clinics.otherSeason(...)` for the other season, Mon–Sun strip, address and landmark, Directions and Book.
- [ ] **Step 6:** FinalCta: replace the ECG sweep with a slow champagne arc (one SVG arc, `--c500`, 1.5px; animation off under reduced motion).
- [ ] **Step 7:** CSS per spec §5 usage rules: cream page, white cards with `--line` borders, overlines and icons in `--r500`, soft buttons `--r100`/`--r700`; remove ECG classes. Check the impeccable detector: `"C:/Users/saadq/.claude/skills/impeccable/scripts/impeccable" detect app components` and fix contrast findings.
- [ ] **Step 8:** Run `npm test` and `npm run build`. Expected: PASS; `grep -c "Hasan" -r out/` prints 0 for every file.
- [ ] **Step 9:** Commit: `feat: Dr. Zeb Riaz sections, logo and styles`.

### Task 8: Pink October band, docs and final verification

**Files:**
- Create: `components/live/PinkOctober.tsx`
- Modify: `components/Page.tsx` (insert between Care and Clinics), `app/globals.css` (one `/* ==== PINK OCTOBER ==== */` block + responsive rules)
- Create: `docs/urdu-review.md`, `docs/design-guide.md` (from the template's, edited for Zeb: tokens, logo rules, one clinic, seasons, Pink October)
- Modify: `README.md` (from the template's, edited: name, number, clinic data, seasons, images, before-launch list = spec §10)

**Interfaces:**
- Consumes: `showPinkOctober` (Task 2), `useKarachiNow` (Task 2), `CARE` (Task 4), `bookingHref(locale, 'breast-check')` (Task 3), `c.pinkOctober` (Task 4).
- Produces: `PinkOctober({ locale }: { locale: Locale })` client component.

- [ ] **Step 1:** Implement `PinkOctober`: returns `null` when `now` is `null` or `!showPinkOctober(now.month, CARE)`. Otherwise a band with the ribbon icon, `c.pinkOctober` texts and a `--p700` button linking to `bookingHref(locale, 'breast-check')`.
- [ ] **Step 2:** Write `docs/urdu-review.md` listing every Urdu string from `lib/content.ts` and `lib/links.ts`, grouped by section, each marked "unreviewed".
- [ ] **Step 3:** Write `README.md` and `docs/design-guide.md` as listed.
- [ ] **Step 4:** Run `npm test`. Expected: all tests PASS.
- [ ] **Step 5:** Run `npm run build`, then check the export:
  - `out/index.html` and `out/ur/index.html` exist.
  - `out/index.html` contains `Mon – Sat · see timings`, and contains neither `Open now` nor `Early checks save lives`.
  - No `tel:` and no `Hasan` anywhere under `out/`.
- [ ] **Step 6:** Browser check with `npm start` (serves `out/`): both locales at 1440, 820 and 390; no horizontal scroll; header, tabs, FAQ, menu and back-to-top by keyboard; compare against the Figma "Applications" page. To see the band: locally remove `pending` from Breast checks and replace `now.month` with `10` in `PinkOctober.tsx`, rebuild, check both locales at 1440 and 390, then revert both edits (`git diff` on those two files must be empty before committing).
- [ ] **Step 7:** Commit: `feat: Pink October band, docs and launch checklist`.
