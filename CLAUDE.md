# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev          # dev server at localhost:4321
pnpm build        # build to ./dist/
pnpm preview      # preview the built site
pnpm astro check  # TypeScript / type-check
pnpm astro add <integration>  # add an official integration
```

There is no test suite or linter configured in this repo.

## Architecture

**Static site** built with Astro 6.x, output mode `static`. No JS framework. Package manager is **pnpm** (see `pnpm-workspace.yaml`; `sharp` and `esbuild` are pre-approved native builds).

The site is currently a **single English-language news homepage** (T.Media / TVBS World Taiwan) at `/`. There used to be a Traditional Chinese `/blog` section and boilerplate pages (`about`, etc.) — these were removed (see git history: "chore: remove blog section", "chore: remove unused boilerplate pages"). `src/pages/index.astro` is the only page.

### Layout & component hierarchy

Every page uses `BaseLayout.astro`, which imports `global.css`, `base.css`, `Header.astro`, and injects GTM and GPT scripts, plus the GoTop button.

- **`Footer.astro` and `Card.astro` are orphaned** — not imported by `BaseLayout` or any page. `Footer.astro` links to `/about`, `/privacy`, `/terms`, none of which exist. Don't assume either renders on the live site; treat them as unwired components if asked to modify site chrome.
- `Header.astro` renders the T.Media logo (external URL at `cc.t.media`) and a Threads social link. Desktop logo bar (`.logo_div`) shows at ≥1280 px; mobile bar (`.app_div`) shows at ≤1279 px. No nav links.

### Homepage (`src/pages/index.astro`)

Two-column layout: `article.pg-article` (1060 px) + `aside.pg-aside` (300 px sidebar). Frame max-width is 1460 px. Sidebar hides below 1024 px. All content (`heroSlides`, `mockPool`, `newsItems`) is hardcoded in the page file — **the homepage does not fetch from an API.**

Features implemented with client-side TypeScript `<script>` blocks:
- **Hero carousel** (`.vision`) — hardcoded slides via **Swiper.js** (Navigation, Pagination, Autoplay modules, 3s autoplay, loop). `opacity: 0` on `.vision` before init prevents FOUC; revealed in `on.init` callback. Pagination uses custom `owl-dot` class rendered via `renderBullet`. Each slide always shows a `.video-play-icon` overlay.
- **Infinite scroll** — `#newsList` (3-col grid, collapses at breakpoints) backed by the `mockPool` array embedded in the page as `<script type="application/json" id="mockPool">`, appended 9 items at a time (`buildCard`, plain DOM/innerHTML — not Astro components) via an `IntersectionObserver` on `#scrollTrigger`, with an 800 ms simulated-latency `setTimeout` and a spinner (`#scrollLoading`).
- **Sidebar sticky** — `is:inline` script pins `.r_box` to `position: fixed; bottom: 0` once the article column outgrows the viewport past the header; saves `left`/`width` from `aside.getBoundingClientRect()` before switching to fixed, resets on resize.
- **`videoId` field** — `newsItems` entries carry an optional `videoId`; when set, a `.video-play-icon` overlay is rendered on that card's image (see `8e4edf4`). `heroSlides` don't carry `videoId` — they always show the icon unconditionally.

**Hover effects** — `.overlay-color` div inside each `.img` container darkens image on hover; image itself scales `1.04`. Title colour transitions to `#e62320` on hover.

**Mobile featured articles** — every 6th article (`nth-child(6n+1)`) keeps the full PC image layout at ≤640 px.

**Trending section** — hardcoded 5-item list, duplicated (not shared) in two places:
- `aside.pg-aside` (desktop ≥1024 px, `.Trending.sidebar_div`)
- `article.pg-article` after the carousel (mobile ≤1023 px, `.Trending.sidebar_div.trending-mobile`)
- Uses the `.title_div` / `.title_line` header pattern (shared with "Latest"). First item has `class="play"` for the `/play2.svg` icon.

**GPT ads** — `BaseLayout` initialises Google Publisher Tag with a PPID derived from the `_ga` cookie via `crypto.subtle.digest`. Each ad slot (`news_tvbs_com_tw_pc_index_list1/2` in the sidebar) uses `is:inline` scripts with `detectmob()` to decide whether to display, based on viewport width and slot naming convention (`_pc_` / `_m_`).

**GTM** — `GTM-PDXVLNL6` injected in `<head>` and noscript iframe in `<body>`, both in `BaseLayout.astro`.

**GoTop button** — fixed bottom-right in `BaseLayout.astro`, shows after 300 px scroll, smooth-scrolls with `easeInOutCubic` over 600 ms via `requestAnimationFrame`. Image from `cc.t.media/2017news/prd/images/gotop.png`.

### Styling

Each component and page imports its own CSS file explicitly — there is no global CSS injection through the layout beyond `global.css` and `base.css`.

- `src/styles/global.css` — resets, font stack (`Georgia`, `Noto Sans TC` via `@fontsource`), base font-size `18px`
- `src/styles/layouts/base.css` — `main` margin only; no max-width set here
- `src/styles/components/` — `card.css`, `header.css`, `footer.css` (for the orphaned components above)
- `src/styles/pages/index.css` — all homepage layout/component CSS (~600 lines)

`design.md` at the repo root documents the full design system (colour tokens, layout breakpoints, component specs, transition timings) — consult it before changing visual styling instead of re-deriving values from CSS.

Brand colours: `#e62320` (red, accent/hover/active), `#F6EE33` (header background), `#151515` (footer background, currently unused live).

**Section title pattern** (`.title_div` / `.title_line`): `.title_div` uses `background-image: url('/title_line.png')` at bottom instead of a `border-bottom`. `.title_line` has `border-bottom: 3px solid #e62320` with `margin-bottom: -2px` to overlap the background image line.

Homepage responsive breakpoints: sidebar hidden at ≤1023 px; news grid → 2-col at ≤767 px; news grid → horizontal card at ≤640 px; single-col at ≤414 px; header desktop/mobile split at 1280 px.

### Assets

- `public/` — static files served as-is (includes `title_line.png`, `play2.svg`)
- `src/assets/` — assets processed by Vite (e.g. `threads-logo.jpg` imported via `astro:assets` in `Header.astro`)
- Logo and favicon are external URLs pointing to `cc.t.media`

### TypeScript

Extends `astro/tsconfigs/strict`. Types are generated into `.astro/types.d.ts` on `dev`/`build`.

### Important conventions

- **Do not auto commit/push** — always wait for explicit instruction from the user.
