# Design guide

How the Dr. Zeb Riaz site looks, moves and behaves, and the rules to follow when changing it.
Audience: humans and AI agents editing the UI. Read this before touching a component or `app/globals.css`.

Sources of truth, in order:

1. `docs/superpowers/specs/2026-11-12-dr-zeb-riaz-site-design.md` — approved structure, tokens and decisions Z1–Z12.
2. `app/globals.css` — what the browser does today.
3. Figma "Dr Zeb Riaz — Branding" (`asnsGHyc0oMusfqvKTnzGt`) and `docs/design/zeb-identity.html` — the identity: logo, colours, type, applications.
4. This file — the condensed working rules.

The site is a copy of the Dr. Hasan Aziz site; its structure, class names and interaction rules carry over unless this guide says otherwise.

## Hard rules

- **No new dependencies.** Icons are inline SVG in `components/icons.tsx`; motion is CSS keyframes plus a little vanilla JS.
- **One stylesheet.** Everything lives in `app/globals.css`, one block per section, responsive rules near the end.
- **All copy in `lib/content.ts`**, both locales, identical shape (a unit test enforces it).
- **Static export.** No server actions, route handlers, middleware or request-time APIs.
- **Booking is WhatsApp only** through `bookingHref(locale, context?)` in `lib/links.ts`. No `tel:` links; "call" only for 1122.
- **Never ship live state in HTML.** The status, the season highlight and the Pink October band appear only after hydration.
- **No superlatives or cure claims** ("best", "No. 1", "guaranteed", "cure", "permanent", `مستقل حل`, `بہترین`). A test blocks them.
- **Authority from qualifications, experience and expertise.** Her CEO role is a plain fact (header, credentials, timeline, footer), never a narrative headline.

## Tokens

Use the CSS variables; never hard-code a hex value in a component.

| Group | Variables |
|---|---|
| Dua Blue | `--b50 #F3F6FA` … `--b600 #074EA2` (primary) `--b700` (hover) `--b800` (pressed) `--b900 #03254F` (navy: headings, final band, footer) |
| Zeb Rose | `--r50 #FCF2F5` `--r100 #F8E6EC` `--r200 #F0C9D6` `--r300 #E3A0B7` `--r500 #B8476F` `--r700 #7A2B48` `--r900 #3E1524` |
| Champagne | `--c100 #F5EDDF` `--c300 #E2CDA6` `--c500 #C9A46A` `--c700 #76592A` |
| Page | `--cream #FCF9F4` (`--bg`), `--line #EFE5D6` |
| Dua Green | `--g100`, `--g500 #71BF44` (live dots only), `--g800` |
| Pink October | `--p50 #FCE4EE` `--p500 #E0457B` `--p700 #C2185B` `--p900 #8E1A4A` |
| Semantic | `--err`, `--warn`, `--ok-*` as the template |

Colour usage:

- Page background cream; cards white with a `--line` border.
- **Blue 600 is the only primary button colour.** Rose is for overlines, numbered chips, icons and soft accents.
- **Champagne is never text** (it fails contrast). Use it for the rule under the name, the final-band arc, the logo seed and avatar ring.
- Pink October colours appear only in the October band.
- Focus ring: `outline: 2px solid var(--b400); outline-offset: 3px`.

## Logo

- Header: `public/brand/zeb-mark-full.svg` beside "Dr. Zeb Riaz" and "Owner & CEO · Dua Hospital".
- Footer: `zeb-mark-reversed.svg` on navy, plus the unchanged Dua Hospital logo (`dua-hospital-logo.svg`) in the bottom line.
- Below 48 px use `zeb-mark-small-*.svg`; the favicon is `app/icon.svg`.
- Never recolour, merge with the Dua logo, or put the ribbon inside the mark.

## Typography

Unchanged from the template: **Figtree** (English) and **Gulzar** (Urdu, `.ur`, RTL, line-height 2). Hero name `clamp(46px, 4.2vw + 14px, 76px)` with the surname in `--b600`.

Urdu rules: Gulzar only, never mixed with Figtree on one line; Western digits; MBBS/FCPS/MRCOG in Latin; Urdu letterforms (`ہ ی ک`). Add every new or changed Urdu string to `docs/urdu-review.md`.

## Sections and IDs

`#about` (01) · `#care` (02) · Pink October band (October only) · `#clinic` (03) · `#book` (04) · `#reviews` (05, hidden while empty) · `#faq` (06). Nav items live in `components/nav/items.ts`; footer numbers in `Footer.tsx`.

## Live behaviour

- `useKarachiNow()` → `{ day, minutes, month }` or `null` before hydration.
- Season: `activeSeason(month, clinic.winterMonths)`; hours: `hoursFor(clinic, season)`; label: `clinicLabel` / `seasonHours` in `components/live/clinicLabel.ts`.
- Today card: 4 PM – 11 PM track; no session drawn before hydration.
- Clinic card (`SeasonHours`): both seasons listed in static HTML; after hydration the active season is large and labelled.
- Pink October: `showPinkOctober(month, CARE)` — October **and** Breast checks confirmed.

## Motion

As the template, with two replacements: the ECG line under the name is now a champagne rule that draws in once (static under reduced motion), and the final band's ECG sweep is a slow champagne arc (off under reduced motion).

## Pre-ship checklist

- `npm test` passes.
- `npm run build` writes `out/index.html` and `out/ur/index.html`.
- `out/index.html` contains "Mon – Sat · see timings" and neither "Open now" nor "Early checks save lives".
- No `tel:` and no template leftovers (Hasan, Hayat) under `out/`.
- Check 1440, 820 and 390 widths in both locales: no horizontal scroll.
- Any new Urdu string is in `docs/urdu-review.md`.
