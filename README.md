# Dr. Hasan Aziz — Official Website

Bilingual (English + Urdu) one-page website for **Dr. Hasan Aziz**, Consultant Physician & Medical Specialist (MBBS, FCPS Medicine), Multan.

The page answers a patient's questions in one scroll: who the doctor is, whether he treats their problem, where and when he sits, and how to book. Booking is a single WhatsApp message.

## What it is built with

| | |
|---|---|
| Framework | Next.js 16.4 (App Router), React 19.2, TypeScript |
| Styling | one hand-written `app/globals.css`, with the Figma brand tokens as CSS custom properties |
| Output | fully static — `output: 'export'`, `trailingSlash: true`; `next build` writes plain HTML/CSS/JS to `out/` |
| Dependencies | none beyond Next/React: no Tailwind, component library, icon font, animation library or test framework |
| Pages | `/` English (LTR, Figtree) · `/ur/` Urdu (RTL, Gulzar) |
| Booking | WhatsApp only, through `bookingHref()` in `lib/links.ts` |
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

**Clinics** — at least one clinic works every day. Hayat is closed on Friday; Dua is closed on Sunday.

| Clinic | id | Session | Hours | Days |
|---|---|---|---|---|
| Hayat Medical Center | `hayat` | Daytime | 12:00 PM – 5:00 PM | Saturday – Thursday (off Friday) |
| Dua Hospital | `dua` | Evening | 8:00 PM – 9:30 PM | Monday – Saturday (off Sunday) |

**Treatments** — 21, in five filter groups: Everyday 5, Long-term 6, Heart & brain 3, Stomach & liver 4, Chest 3.

**Reviews** — `REVIEWS` ships as an empty array. While it is empty the section, its nav link and its footer link are all omitted, so no invented patient quotes ever reach production.

## How the live status works

Every "open now" label comes from `lib/clinic-status.ts`, which reads the day and minute in **Asia/Karachi** (not the visitor's device clock) and reduces both clinics to `closed-today | later | open | done`. `components/live/useKarachiNow.ts` returns `null` until the client mounts and re-checks every 60 seconds.

Consequence, and it is deliberate: **the exported HTML must never contain a live status.** Build-time HTML, search engines and no-JS visitors get the neutral "Open 7 days · see timings" text from `lib/content.ts`.

## Project layout

| Path | Responsibility |
|---|---|
| `app/layout.tsx` | root metadata, Figtree + Gulzar via `next/font`, theme colour |
| `app/page.tsx`, `app/ur/page.tsx` | per-locale metadata (canonical, hreflang, OG/Twitter) and the page shell |
| `app/sitemap.ts`, `app/robots.ts`, `app/icon.svg`, `app/not-found.tsx` | static SEO and system routes |
| `components/Page.tsx` | composes the sections in order for a locale and injects the JSON-LD |
| `components/*.tsx` | the sections: `Header`, `Hero`, `PortraitCard`, `InfoStrip`, `About`, `Treatments`, `Clinics`, `Booking`, `Reviews`, `Faq`, `FinalCta`, `Footer`, `MobileDock`, `icons` |
| `components/live/*` | client islands for live status: status pill, today card, clinic badge, week strip |
| `components/nav/*` | client islands for the menu, reveal-on-scroll, smooth scrolling and back-to-top |
| `lib/content.ts` | all copy and data, `en` + `ur` |
| `lib/clinic-status.ts` | pure Pakistan-time status maths and formatting |
| `lib/links.ts` | `bookingHref`, `directionsHref` — the single booking seam |
| `lib/schema.ts` | JSON-LD graph: one `Physician`, one `MedicalClinic` per clinic |
| `lib/scroll.ts` | easing, scroll duration and progress-ring maths |
| `lib/site.ts` | `SITE_URL`, `WHATSAPP_NUMBER`, `Locale` |
| `lib/*.test.ts` | unit tests for the modules above |
| `app/globals.css` | the whole stylesheet, one block per section |

## Configuration

- **Domain:** `SITE_URL` in `lib/site.ts`. Canonical URLs, `hreflang`, JSON-LD ids, the sitemap and robots all derive from it; override per build with `NEXT_PUBLIC_SITE_URL`.
- **WhatsApp number:** `WHATSAPP_NUMBER` in `lib/site.ts` (`923336489392`).

## Images

| File | Used by |
|---|---|
| `public/images/dr-hasan-aziz-about.jpg` | hero portrait (`PortraitCard`) and the final CTA avatar |
| `public/images/dr-hasan-aziz-consultation.jpg` | About section photo and the WhatsApp chat avatar |
| `public/images/dr-hasan-aziz-hero.jpg` | not referenced yet; only the unused `--photo` custom property points at it |

The header logo and favicon are a "HA" monogram in brand Blue 600 with a Green 500 dot (`public/brand/dr-hasan-aziz-mark.svg`, `app/icon.svg`). Swap both files if an official doctor logo is made.

## Before launch

1. Confirm the "HA" monogram with the client, or swap in an official doctor logo.
2. Add real patient reviews, with permission, to `REVIEWS` — the section appears on its own once the array is non-empty.
3. Confirm the fee and the walk-in policy; the FAQ currently answers both with "to confirm".
4. Have a native speaker review the Urdu copy; the outstanding strings are listed in `docs/urdu-review.md`.

## Documentation

- `docs/superpowers/specs/2026-11-06-dr-hasan-aziz-site-redesign-design.md` — approved design spec and decisions D1–D10.
- `docs/superpowers/plans/2026-11-06-dr-hasan-aziz-site-redesign.md` — the implementation plan the site was built from.
- `docs/design/mockup-v3.html` — the approved visual mockup.
- `docs/design-guide.md` — tokens, type, spacing, motion, RTL and accessibility rules for anyone changing the UI.
- `docs/urdu-review.md` — every Urdu string awaiting a native speaker.
