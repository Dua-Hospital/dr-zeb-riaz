# Dr. Zeb Riaz website — design spec

- **Date:** 2026-11-12
- **Status:** Design approved by the user in conversation. This spec is waiting for the user's review.
- **Template:** an exact copy of the Dr. Hasan Aziz site (`../dr-hasan-aziz`), restyled and re-written. Its spec (`docs/superpowers/specs/2026-11-06-dr-hasan-aziz-site-redesign-design.md` in that repo) and `docs/design-guide.md` apply unless this spec says otherwise.
- **Approved identity:**
  - Figma "Dr Zeb Riaz — Branding" (`asnsGHyc0oMusfqvKTnzGt`): pages Logo, Colour & Type, Applications.
  - Local: `docs/design/zeb-identity.html` (v0.4), `docs/design/brand-board.html`, logo files in `docs/design/logo/`.
- **Client facts:** `docs/client-data.md`. Every fact on the site comes from there.

## 1. Goal

A one-page, bilingual patient-booking site for **Dr. Zeb Riaz**, Consultant Gynaecologist & Obstetrician, **Owner & CEO of Dua Hospital, Multan**. A patient, including one with little education or technical skill, answers five questions in seconds:

1. Who is the doctor?
2. Can I trust her?
3. Does she treat my problem?
4. When can I see her, and where?
5. How do I book?

The look mixes Dua Hospital's authority (Dua Blue, navy, the cupped-hands idea) with a feminine identity of her own (Zeb Rose, champagne, cream).

### Success criteria
- At 1440px and 390px, the hero shows her name, qualifications, "Owner & CEO · Dua Hospital", the main conditions, today's status and a WhatsApp booking button without scrolling.
- Every booking button opens WhatsApp with a pre-filled message.
- Colours and type are exactly the tokens in section 5. Logos are the approved files in `docs/design/logo/`.
- English at `/`, Urdu at `/ur/` (right-to-left, same structure).
- `next build` produces a working static export. Lighthouse mobile: Accessibility ≥ 95, Performance ≥ 90.
- No invented facts: anything unconfirmed shows "to confirm" or is left out (section 10).

### Out of scope
- A booking system (WhatsApp only, behind one seam, as in the template).
- Pages for other Dua Hospital doctors or for the hospital itself.
- A separate Pink October campaign page.

## 2. Decisions

| # | Decision | Reason |
|---|---|---|
| Z1 | **Copy the Dr. Hasan Aziz codebase exactly**, then restyle and re-write. Same stack, file layout, rules and tests. | User's instruction. Proven, reviewed, and keeps both doctor sites consistent. |
| Z2 | **Brand direction "A3":** Dua Blue 600 stays the only primary action colour; navy for headings; Zeb Rose for her accents; champagne for fine details only (never text); cream page background. | Approved on the brand board. Blue keeps the Dua link; rose and champagne add the feminine authority the user asked for. |
| Z3 | **Fonts stay Figtree + Gulzar.** No new font. | Same as Dua. User asked for similar fonts. |
| Z4 | **Logo:** Dua-blue hand (left) and Zeb-rose hand (right), with thumbs, holding the Dua mother-and-baby drawing in navy, with a champagne seed. Below 48px use the simplified small mark. | Approved after several rounds. Keeps Dua identity, adds hers. |
| Z5 | **Dua endorsement everywhere.** Header, footer and every full lockup say "Owner & CEO · Dua Hospital". | "Never forget the Dua identity." |
| Z6 | **Authority comes from qualifications, experience and expertise.** Her CEO role is stated as a plain fact in the header lockup, the credentials strip, the qualifications timeline and the footer. No narrative lines about leading the hospital. | User's instruction. |
| Z7 | **She works only at Dua Hospital.** One clinic. | Client fact. |
| Z8 | **Seasonal hours:** winter 5:00–9:00 PM, summer 6:00–10:00 PM, Monday–Saturday, closed Sunday. The active season is chosen by date in Pakistan time. Default winter = 1 Nov – 31 Mar (to confirm). | Client fact; switch dates are an open item. |
| Z9 | **No Pink October strip above the header.** Breast health is a service card with the ribbon icon; an October-only band appears inside the page. | User rejected the header strip. |
| Z10 | **Booking is WhatsApp only** on `923358028888`. No "Call" buttons except the 1122 emergency line. | Template rule; client number. |
| Z11 | **No flyer superlatives or cure claims.** "Multan's best gynaecologist" and "permanent cure (مستقل حل)" never appear. | Dua voice rules; medical-advertising safety. |
| Z12 | **Reviews hidden until real reviews with permission exist.** | Template rule (D9). |

## 3. Page structure (English, `/`)

Same order and section components as the template. Differences only:

1. **Header** (sticky): horizontal lockup (mark + "Dr. Zeb Riaz" + "Owner & CEO · Dua Hospital"), links About, Care, Clinic, How to book, Questions, اردو, and "Book on WhatsApp". No campaign strip above it.
2. **Hero (bento):**
   - **Main card:** live status pill; overline "Consultant Gynaecologist & Obstetrician"; H1 "Dr. Zeb Riaz" (surname in Dua Blue); Urdu name; champagne rule (replaces the template's ECG line).
   - **Hero line:**
     > **Pregnancy. Fertility. Women's health.**
     > One specialist, from trying to conceive to your baby's first week.
   - **Chips:** Infertility · IUI & IVF · Pregnancy care · Normal & C-section · Irregular periods · Period pain · "See all <n> →" (`#care`, n computed from rendered care items).
   - **Buttons:** "Book on WhatsApp" (primary), "Clinic timings" (ghost, `#clinic`).
   - **Portrait card:** `zeb-coat-cutout-white.jpg`; name plate "Dr. Zeb Riaz / Consultant Gynaecologist, Multan" + Urdu name; credentials strip: MBBS (Army Medical College) · FCPS (Obs & Gynae, CPSP) · MRCOG (UK) · Owner & CEO, Dua Hospital.
   - **Today card:** one clinic. A track from 4 PM to 11 PM with today's segment for the current season and a "Now" marker; one status row. Sunday shows "Closed today (Sunday)".
   - **Info strip (4):** "Mon – Sat / Closed Sunday" (→ `#clinic`); "Evenings / Winter 5–9 PM · Summer 6–10 PM" (→ `#clinic`); "Female doctor / Private consultations" (→ `#about`); "Book in 1 message / WhatsApp. No forms." (WhatsApp).
3. **01 About** (`#about`)
   - **Heading:** "Trained in Pakistan and the UK. Specialised in fertility and pregnancy."
   - **Text:** "Dr. Zeb Riaz is a consultant gynaecologist and obstetrician in Multan. She is a Fellow of the College of Physicians & Surgeons Pakistan in Obstetrics & Gynaecology (FCPS) and a Member of the Royal College of Obstetricians & Gynaecologists, UK (MRCOG), with further training in infertility and IVF." Then: "She treats infertility in both partners, cares for women through pregnancy and delivery, and manages period and hormone problems."
   - **Authority rule:** the About copy rests on qualifications, experience and expertise only. No "leads", "still sees you herself" or similar narrative lines. Her CEO role appears as a plain fact (credentials strip, timeline, footer), not as the About headline.
   - **Fact tiles:** "MRCOG (UK) / Royal College membership" and "FCPS / Obs & Gynae specialist". If the client confirms years of experience (open item 11), a third tile "<n>+ years / In obstetrics & gynaecology" is added.
   - **Qualifications timeline:** MBBS — Army Medical College, Rawalpindi · FCPS (Obstetrics & Gynaecology) — CPSP · MRCOG — Royal College of Obstetricians & Gynaecologists, UK · Infertility training — Australian Infertility IVF and Genetics (wording to confirm) · Owner & CEO (Current) — Dua Hospital, Multan.
   - **"Your visit, step by step":** Before: book on WhatsApp · Bring: old reports, scans and medicines · During: a private, one-to-one consultation · After: a clear written plan.
   - **Photo:** `zeb-coat-arms-crossed.jpg`.
4. **02 Care** (`#care`): filter tabs with counts and 15 cards (section 6.2), then a dark "Don't see your problem? Ask on WhatsApp" card.
5. **Pink October band** (October only, section 7.5): between Care and Clinic.
6. **03 Clinic & timings** (`#clinic`)
   - **Heading:** "One hospital. Every evening but Sunday." Lead: "Dr. Zeb sees patients at Dua Hospital, Monday to Saturday."
   - **One clinic card:** drawn map header labelled "Evening"; name in English and Urdu; live badge; big hours for the current season with the other season below ("Summer: 6:00 – 10:00 PM"); Mon–Sun strip with Sunday greyed and today ringed; address; "Directions" and "Book here".
   - **Holiday note:** "On public holidays, timings can change. Send a message before you come."
7. **04 How to book:** as template; chat demo uses her name and the square headshot.
8. **05 Patient reviews:** hidden while `REVIEWS` is empty (Z12).
9. **06 Questions:**
   - How do I book?
   - What are the timings in winter and summer?
   - Can my husband come too? (Yes; she also treats male infertility.)
   - Is the consultation private?
   - Are IUI and IVF done at Dua Hospital? (to confirm)
   - What should I bring?
   - What is the fee? (to confirm)
   - **Emergency note:** "Heavy bleeding, severe pain, or your baby moving less? Don't wait for a message. Call 1122 or go to the nearest emergency."
10. **Final call to action:** navy band, square headshot, "Ready when you are. Book your visit.", "Dr. Zeb Riaz · Owner & CEO, Dua Hospital · Monday to Saturday", Book button. A thin champagne arc replaces the template's ECG sweep.
11. **Footer** (navy): horizontal lockup reversed, qualifications, Urdu name, Book button; "On this page"; "Clinic" with both seasons' hours and Directions; "Help" with the 1122 note; bottom line "© 2026 Dr. Zeb Riaz · Owner & CEO, Dua Hospital, Multan" with the small Dua logo.
12. **Mobile dock** (≤ 760px): "Timings" (→ `#clinic`) and "Book on WhatsApp".

### Urdu page (`/ur/`)
Same as the template: same sections, `dir="rtl"`, Gulzar at the brand Urdu sizes, Western digits, MBBS/FCPS/MRCOG in Latin script, never two fonts on one line. Service names in Urdu come from her flyers (`docs/client-data.md`); every new Urdu string goes into `docs/urdu-review.md`.

## 4. Responsive behaviour

As the template (1180 / 1080 / 760 / 420 breakpoints). The Care grid is 4 → 3 → 2 columns. The Pink October band stacks below 760px.

## 5. Brand tokens

Replaces the template's token block in `app/globals.css`. Values match the Figma "Zeb Brand" variables (their web code syntax is the CSS name).

| Group | Variables |
|---|---|
| Dua Blue | `--b50 #F3F6FA` `--b100 #E1EAF4` `--b200 #BFD1E7` `--b400 #5687C0` `--b600 #074EA2` (primary) `--b700 #064188` (hover) `--b800 #04346D` (pressed) `--b900 #03254F` (navy: headings) |
| Zeb Rose | `--r50 #FCF2F5` `--r100 #F8E6EC` `--r200 #F0C9D6` `--r300 #E3A0B7` `--r500 #B8476F` `--r700 #7A2B48` `--r900 #3E1524` |
| Champagne | `--c100 #F5EDDF` `--c300 #E2CDA6` `--c500 #C9A46A` `--c700 #76592A` |
| Neutral | `--n0 #FFFFFF` `--cream #FCF9F4` `--line #EFE5D6` `--n500 #6B6F74` `--n600 #50545A` `--n900 #231F20` (keep the template's other neutrals) |
| Dua Green | `--g100 #E5F3DD` `--g500 #71BF44` (live dots only) `--g800 #34631E` |
| Pink October | `--p50 #FCE4EE` `--p500 #E0457B` `--p700 #C2185B` `--p900 #8E1A4A` |
| Semantic | as template (`--err`, `--warn`, `--ok-*`) |

Usage rules (in addition to the template's):
- Page background `--cream`; cards white with a `--line` border.
- Blue 600 is the only primary button colour. Rose is for overlines, icons, soft buttons (`--r100` bg, `--r700` text) and the "Zeb" accents.
- Champagne is never text (fails contrast); only rules, the logo seed, rings and fine borders.
- Pink October colours appear only inside the October band and the Breast health card icon.
- Focus ring stays `--b400`.

Type: unchanged from the template (Figtree, Gulzar, same scale). The hero name keeps `clamp(46px, 4.2vw + 14px, 76px)`, surname in `--b600`.

## 6. Content and data

### 6.1 Single source of truth
As template: all copy in `lib/content.ts` for both locales, identical shape, enforced by the unit test. `lib/site.ts`: `WHATSAPP_NUMBER = '923358028888'`, `SITE_URL` placeholder until the domain is known (overridable with `NEXT_PUBLIC_SITE_URL`).

Data shapes that change:
```ts
type ClinicId = 'dua';
interface Season { id: 'winter' | 'summer'; openMin: number; closeMin: number }
interface Clinic {
  id: ClinicId; name: string; nameUr: string;
  seasons: { winter: Season; summer: Season };   // winter 1020–1260, summer 1080–1320
  winterMonths: readonly number[];               // default [11, 12, 1, 2, 3] (to confirm)
  days: Week;                                    // [false, true, true, true, true, true, true]
  address: string; addressUr: string; mapsQuery: string;
}
type CareGroup = 'fertility' | 'pregnancy' | 'periods' | 'women' | 'breast';
interface Treatment { icon: IconName; name: string; nameUr: string; blurb: string; blurbUr: string; group: CareGroup; pending?: true }   // pending = not yet confirmed by the client
```

### 6.2 Care (15)

| Group | Services |
|---|---|
| Fertility (5) | Female infertility · Male infertility & low sperm count · Fertility medicines · IUI · IVF |
| Pregnancy (3) | Pregnancy check-ups · Pregnancy complications · Normal delivery & C-section |
| Periods & hormones (3) | Irregular periods · Period pain · PCOS *(to confirm)* |
| Women's health (3) | Uterine prolapse · Leucorrhoea (discharge) · Urine infection |
| Breast health (1) | Breast checks *(to confirm)*, ribbon icon |

Items marked *to confirm* carry `pending: true` and are not rendered until the client confirms them (then the flag is removed). Tab counts and the "See all" chip are computed from the rendered items, so at launch the page may show 12 services, not 15. New icons are added to `components/icons.tsx` in the template's style (24 viewBox, 2px stroke).

### 6.3 Logo and images
- `public/brand/`: `zeb-mark-full.svg`, `zeb-mark-reversed.svg`, `zeb-mark-small-*.svg`, `zeb-app-icon.svg`; `app/icon.svg` = `zeb-favicon.svg`; the small Dua logo for the footer endorsement from `docs/client-assets/dua-logo/`.
- `public/images/`: `dr-zeb-riaz-hero.jpg` (cut-out white coat), `dr-zeb-riaz-about.jpg` (arms crossed), `dr-zeb-riaz-avatar.jpg` (square headshot). The casual blue-suit photo is not used.

### 6.4 SEO
- JSON-LD: one `Physician` (medicalSpecialty Obstetric, Gynecologic; `worksFor` Dua Hospital) and one `MedicalClinic` (Dua Hospital) with `openingHoursSpecification` for both seasons (`validFrom`/`validThrough`).
- Title: "Dr. Zeb Riaz — Gynaecologist & Obstetrician in Multan | Dua Hospital". Canonical, `hreflang`, sitemap and robots as template.

## 7. Behaviour

### 7.1 Time
As template: Pakistan time via `karachiParts`; status only on the client; static HTML ships the neutral "Mon – Sat · see timings".

### 7.2 Season
New pure function `activeSeason(month: number, clinic): Season` in `lib/clinic-status.ts`. Status, the Today card track, the clinic card's big hours and the JSON-LD all read from it. Static HTML shows both seasons' hours in text; the client highlights the active one.

### 7.3 Clinic status
Template states (`closed-today | later | open | done`) for the single clinic, using the active season's hours. Hero pill: Sunday → "Closed today (Sunday) · Book now for Monday"; open → "Seeing patients now · until 9 PM"; later → "Opens at 5 PM · in 2h 14m"; done → "Closed for today · Book now for tomorrow" (Saturday → Monday).

### 7.4 Booking seam
`bookingHref(locale, context?)` → `https://wa.me/923358028888?text=…`:
> Assalam o Alaikum. I would like to book an appointment with Dr. Zeb Riaz at Dua Hospital.
> Name:
> Problem:

Urdu template on `/ur/`. The October band passes context "breast check" to add "for a breast check".

### 7.5 Pink October band
- New client island `components/live/PinkOctober.tsx`. Renders nothing in static HTML; after hydration it shows the band only when the Pakistan-time month is October (`isPinkOctober(month)` in `lib/`).
- Content: ribbon icon, overline "Pink October", heading "Early checks save lives.", one line "Book a breast check with Dr. Zeb at Dua Hospital this October.", button "Book a breast check" (`--p700` background, white text).
- Rendered only when the Breast checks item is not `pending`; otherwise it never renders.

### 7.6 Interactions and motion
As template, except: the ECG line and ECG sweep are replaced by the champagne rule (draws in once, 600ms; static under reduced motion) and a slow champagne arc in the final band (off under reduced motion). The back-to-top ring stays Blue 600 and turns Green 500 at the bottom.

## 8. Architecture

- **Setup:** copy `../dr-hasan-aziz` into this folder without `.git`, `node_modules`, `.next`, `out`, `.freebuff` or its `docs/` (this repo keeps its own docs). `git init`, then `npm install`.
- **Stack, rules and file layout:** unchanged (Next.js 16 static export, React 19, TypeScript, one `app/globals.css`, no new dependencies, copy only in `lib/content.ts`).
- **Changes from the template:**
  - `app/globals.css`: new token block (section 5); cream page; champagne rule and arc instead of ECG styles; Pink October band block.
  - `lib/content.ts`: her content, one clinic with seasons, 15 care items in 5 groups.
  - `lib/clinic-status.ts`: single clinic, `activeSeason`, track 4 PM–11 PM; `isPinkOctober`.
  - `lib/site.ts`: WhatsApp number, site URL placeholder.
  - `lib/schema.ts`: Physician + MedicalClinic as in 6.4.
  - `components/`: `TodayCard` and `WeekStrip` for one clinic; `Clinics` renders one card; `Hero` drops the ECG; new `live/PinkOctober.tsx`; `Header`/`Footer` use the logo lockups; `icons.tsx` gains the care icons and the ribbon.
  - Update `README.md` and `docs/design-guide.md` for Dr. Zeb (copied from the template, then edited).

## 9. Testing

As template (`node --test` on `lib/*.test.ts`, no new dependency), plus:
- `activeSeason`: every month; boundary months for the default (Oct → summer, Nov → winter, Mar → winter, Apr → summer).
- Clinic status at boundary minutes for both seasons (16:59, 17:00, 20:59, 21:00; 17:59, 18:00, 21:59, 22:00), Sunday, Saturday after closing → Monday.
- `isPinkOctober` for September, October, November.
- `bookingHref` with and without the breast-check context, both locales.
- Content tests from the template: identical shape for `en` and `ur`, no Arabic letterforms, Western digits, no `tel:` links, no "best" or "cure" wording in either locale.
- Build: `out/index.html` and `out/ur/index.html` exist; exported HTML contains no live status and no Pink October band.
- Manual: 1440 / 820 / 390 in both locales against the Figma Applications page; keyboard pass; reduced motion.

## 10. Open items

### Before launch (blocking)
1. Confirm 0335 8028888 is on WhatsApp, and whether it is hers or the front desk's.
2. Confirm Dua Hospital's current address (Bank Plaza, Sher Shah Road) and a Google Maps link.
3. Season switch dates (default winter 1 Nov – 31 Mar).
4. Native-speaker review of all Urdu strings (`docs/urdu-review.md`), including the logo's Urdu title line.
5. Domain name for `SITE_URL`.

### Content to confirm (non-blocking; hidden or "to confirm" until then)
6. Exact wording of the infertility training (Australian Infertility IVF and Genetics).
7. Whether IUI and IVF are performed at Dua Hospital or arranged with a partner team.
8. PCOS, menopause and breast checks as listed services (breast checks also gate the Pink October band).
9. Consultation fee and walk-in policy.
10. Real patient reviews with permission.
11. Optional: years of experience, PMDC number, deliveries performed.
