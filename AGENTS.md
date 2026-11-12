<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project instructions — Dr. Hasan Aziz site

A bilingual one-page site for a consultant physician in Multan: English at `/`, Urdu at `/ur/`. Fully static export, no backend, WhatsApp-only booking. Read `docs/design-guide.md` before any UI change and the spec in `docs/superpowers/specs/` before changing structure, copy or behaviour.

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
- **New or changed Urdu strings also go in `docs/urdu-review.md`.** Urdu uses Gulzar only, Western digits, `MBBS`/`FCPS` in Latin script, and Urdu letterforms (never Arabic `ه` `ي` `ك`).
- **Server components by default.** Add `'use client'` only for state, effects or browser APIs. `SiteContent` contains functions, so client islands take `locale` and call `getContent(locale)` themselves.
- **Exported HTML must never contain a live clinic status** — only the neutral "Open 7 days · see timings". Status is computed client-side in Asia/Karachi time through `lib/clinic-status.ts`.
- **Booking goes through `bookingHref()`** in `lib/links.ts` (WhatsApp, new tab, `rel="noopener"`). No `tel:` links and no "Call" text except the 1122 emergency line.
- **`REVIEWS` stays empty until real, permitted reviews exist.** The section, its nav link and its footer link hide themselves while the array is empty; never add sample quotes.
- **Static export only:** no server actions, route handlers, ISR, middleware or request-time APIs.
- **Styling stays in `app/globals.css`** using the brand tokens; RTL through logical properties plus `[dir=rtl]` overrides.

## Gotchas

- Value imports inside `lib/` use explicit `.ts` extensions so `node --test` can load them; type-only imports use `import type`.
- `app/globals.css` is one file with a block per section — extend it rather than adding a stylesheet.
- Motion is CSS keyframes plus four small JS islands (`Reveal`, `SmoothNav`, `BackToTop`, `ChatDemo`); keep the `prefers-reduced-motion` behaviour in spec §7.6.
- Images use `next/image` with fixed `width`/`height` and `unoptimized` (static export). The header logo and favicon are the "HA" monogram (`public/brand/dr-hasan-aziz-mark.svg`, `app/icon.svg`); no official doctor logo exists in the brand file yet.

## Where things are

- `lib/content.ts` copy and data · `lib/clinic-status.ts` status maths · `lib/links.ts` booking and directions · `lib/schema.ts` JSON-LD · `lib/scroll.ts` scroll maths · `lib/site.ts` site URL and WhatsApp number.
- `components/Page.tsx` composes the sections; `components/live/*` and `components/nav/*` are the client islands.
- Docs: `README.md`, `docs/design-guide.md`, `docs/superpowers/specs/`, `docs/superpowers/plans/`, `docs/design/mockup-v3.html`, `docs/urdu-review.md`.
