# Dr. Zeb Riaz — Official Website

Bilingual (English + Urdu) one-page website for **Dr. Zeb Riaz**, Consultant Gynaecologist & Obstetrician (MBBS, FCPS Obs & Gynae, MRCOG UK), **Owner & CEO of Dua Hospital, Multan**.

The page answers a patient's questions in one scroll: who the doctor is, whether she treats their problem, when she sees patients at Dua Hospital, and how to book. Booking is a single WhatsApp message.

Built from the Dr. Hasan Aziz site (same stack and rules), restyled with the Zeb identity: Dua Blue for authority, Zeb Rose for her, champagne for fine detail.

## What it is built with

| | |
|---|---|
| Framework | Next.js 16.4 (App Router), React 19.2, TypeScript |
| Styling | one hand-written `app/globals.css`, brand tokens as CSS custom properties |
| Output | fully static — `output: 'export'`, `trailingSlash: true`; `next build` writes plain HTML/CSS/JS to `out/` |
| Dependencies | none beyond Next/React |
| Pages | `/` English (LTR, Figtree) · `/ur/` Urdu (RTL, Gulzar) |
| Booking | WhatsApp only, through `bookingHref()` in `lib/links.ts` (`923358028888`) |
| Content | every string and data record in `lib/content.ts`, typed and mirrored for both locales |

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # unit tests (node --test runs the .ts files directly)
npm run build   # static export into out/
npm start       # npx serve out
```

Node 22.18+ is needed so `node --test` can run the TypeScript files without a build step.

## Site data

**Clinic** — Dua Hospital only. Monday to Saturday, closed Sunday.

| Season | Months (default, to confirm) | Hours |
|---|---|---|
| Winter | November – March | 5:00 PM – 9:00 PM |
| Summer | April – October | 6:00 PM – 10:00 PM |

The active season is chosen by the month in Pakistan time (`activeSeason` in `lib/clinic-status.ts`, months in `WINTER_MONTHS`).

**Care** — 15 services in five groups: Fertility 5, Pregnancy 3, Periods & hormones 3, Women's health 3, Breast health 1. Items marked `pending: true` (PCOS, Breast checks) are hidden until the client confirms them; tabs and counts follow automatically.

**Reviews** — `REVIEWS` ships empty. While it is empty the section and its links are omitted.

**Pink October** — an October-only band between Care and Clinic (`components/live/PinkOctober.tsx`). It appears after page load only when the Pakistan-time month is October **and** Breast checks is confirmed (`showPinkOctober` in `lib/campaign.ts`).

## How the live status works

`lib/clinic-status.ts` reads the day, minute and month in **Asia/Karachi**, picks the season's hours and reduces them to `closed-today | later | open | done`. `components/live/useKarachiNow.ts` returns `null` until the client mounts and re-checks every 60 seconds. **The exported HTML never contains a live status, a season highlight or the Pink October band**: it shows the neutral "Mon – Sat · see timings" and both seasons' hours.

## Project layout

| Path | Responsibility |
|---|---|
| `app/` | layout, metadata, English and Urdu pages, sitemap, robots, favicon |
| `components/Page.tsx` | composes the sections for a locale and injects the JSON-LD |
| `components/*.tsx` | `Header`, `Hero`, `PortraitCard`, `InfoStrip`, `About`, `Care`, `Clinics`, `Booking`, `Reviews`, `Faq`, `FinalCta`, `Footer`, `MobileDock`, `icons` |
| `components/live/*` | client islands: status pill, today card, clinic badge, season hours, week strip, Pink October |
| `components/nav/*` | menu, reveal-on-scroll, smooth scrolling, back-to-top |
| `lib/content.ts` | all copy and data, `en` + `ur` |
| `lib/clinic-status.ts` | Pakistan time, seasons, status maths |
| `lib/campaign.ts` | Pink October rules |
| `lib/links.ts` | `bookingHref`, `directionsHref` — the single booking seam |
| `lib/schema.ts` | JSON-LD: one `Physician`, one `MedicalClinic` with seasonal hours |
| `lib/site.ts` | `SITE_URL`, `WHATSAPP_NUMBER`, `Locale` |

## Brand assets

| File | Use |
|---|---|
| `public/brand/zeb-mark-full.svg` | header logo |
| `public/brand/zeb-mark-reversed.svg` | footer logo (navy) |
| `public/brand/zeb-mark-small-*.svg`, `zeb-app-icon.svg`, `app/icon.svg` | small sizes, app icon, favicon |
| `public/brand/dua-hospital-app-icon.svg` | the Dua Hospital logo (master v2, App icon) beside Dua Hospital in the footer |
| `public/images/dr-zeb-riaz-hero.jpg` / `-about.jpg` / `-avatar.jpg` | portrait, About photo, chat and final-band avatar |

Design sources: Figma "Dr Zeb Riaz — Branding" (`asnsGHyc0oMusfqvKTnzGt`), `docs/design/zeb-identity.html`, `docs/design/brand-board.html`.

## Before launch

1. Confirm 0335 8028888 is on WhatsApp, and whose number it is.
2. Confirm Dua Hospital's current address and get a Google Maps link.
3. Confirm the winter/summer switch dates (`WINTER_MONTHS`).
4. Native-speaker review of every Urdu string in `docs/urdu-review.md`.
5. Production domain: `https://drzebriaz.com` (`SITE_URL` in `lib/site.ts`), served by Vercel.

Content to confirm (hidden or "to confirm" until then): infertility training wording, whether IUI/IVF are done at Dua Hospital, PCOS and breast checks, fee and walk-in policy, real reviews, years of experience.

## Documentation

- `docs/superpowers/specs/2026-11-12-dr-zeb-riaz-site-design.md` — approved design spec.
- `docs/superpowers/plans/2026-11-12-dr-zeb-riaz-site.md` — implementation plan.
- `docs/design-guide.md` — tokens, logo, type, layout and behaviour rules for anyone changing the UI.
- `docs/client-data.md` — every client fact and its source.
- `docs/urdu-review.md` — every Urdu string awaiting a native speaker.
