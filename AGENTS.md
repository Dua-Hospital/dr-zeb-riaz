<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project instructions — Dr. Zeb Riaz site

A bilingual one-page site for Dr. Zeb Riaz, consultant gynaecologist and obstetrician, Owner & CEO of Dua Hospital, Multan: English at `/`, Urdu at `/ur/`. Fully static export, no backend, WhatsApp-only booking. Read `docs/design-guide.md` before any UI change and the spec in `docs/superpowers/specs/` before changing structure, copy or behaviour.

## Commands

```bash
npm test        # node --test over lib/*.test.ts
npm run build   # static export to out/
npm run dev     # local dev server
```

Node 22.18+ is required (native TypeScript type-stripping). Run `npm test` after logic or content changes, and `npm run build` after UI, content or config changes; both `out/index.html` and `out/ur/index.html` must exist.

## Invariants

- **No new dependencies.** No Tailwind, component library, icon font, animation library or test framework.
- **All copy and data live in `lib/content.ts`**, for both `en` and `ur`, with identical shape. Components hold no literal copy: add the string to `SiteContent` and both dictionaries.
- **New or changed Urdu strings also go in `docs/urdu-review.md`.** Urdu uses Gulzar only, Western digits, `MBBS`/`FCPS`/`MRCOG` in Latin script, and Urdu letterforms (never Arabic `ه` `ي` `ك`).
- **Server components by default.** Add `'use client'` only for state, effects or browser APIs. `SiteContent` contains functions, so client islands take `locale` and call `getContent(locale)` themselves.
- **Exported HTML must never contain a live clinic status, a season highlight or the Pink October band** — only the neutral "Mon – Sat · see timings" and both seasons' hours. Status, season and the October band are computed client-side in Asia/Karachi time (`lib/clinic-status.ts`, `lib/campaign.ts`).
- **No superlatives or cure claims** in either language; a content test blocks them. Authority comes from qualifications, experience and expertise; the CEO role is a plain fact.
- **Care items marked `pending: true` stay hidden** until the client confirms them; never remove the flag without confirmation recorded in `docs/client-data.md`.
- **Booking goes through `bookingHref()`** in `lib/links.ts` (WhatsApp, new tab, `rel="noopener"`). No `tel:` links and no "Call" text except the 1122 emergency line.
- **`REVIEWS` stays empty until real, permitted reviews exist.** The section, its nav link and its footer link hide themselves while the array is empty; never add sample quotes.
- **Static export only:** no server actions, route handlers, ISR, middleware or request-time APIs.
- **Styling stays in `app/globals.css`** using the brand tokens; RTL through logical properties plus `[dir=rtl]` overrides.

## Gotchas

- Value imports inside `lib/` use explicit `.ts` extensions so `node --test` can load them; type-only imports use `import type`.
- `app/globals.css` is one file with a block per section — extend it rather than adding a stylesheet.
- Motion is CSS keyframes plus four small JS islands (`Reveal`, `SmoothNav`, `BackToTop`, `ChatDemo`); keep the `prefers-reduced-motion` behaviour in spec §7.6.
- Images use `next/image` with fixed `width`/`height` and `unoptimized` (static export). Logos: `public/brand/zeb-mark-*.svg` (approved Zeb mark), `public/brand/dua-hospital-logo.svg` (unchanged Dua master logo, footer endorsement), favicon `app/icon.svg`.

## Where things are

- `lib/content.ts` copy and data · `lib/clinic-status.ts` time, seasons and status maths · `lib/campaign.ts` Pink October · `lib/links.ts` booking and directions · `lib/schema.ts` JSON-LD · `lib/scroll.ts` scroll maths · `lib/site.ts` site URL and WhatsApp number.
- `components/Page.tsx` composes the sections; `components/live/*` and `components/nav/*` are the client islands.
- Docs: `README.md`, `docs/design-guide.md`, `docs/client-data.md`, `docs/superpowers/specs/`, `docs/superpowers/plans/`, `docs/design/` (identity, brand board, logo files), `docs/urdu-review.md`.
