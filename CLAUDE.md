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

## Architecture

**Static site** built with Astro 6.x, output mode `static`. No JS framework. Package manager is **pnpm**.

The site has two distinct sections with different languages and layouts:

- **Homepage (`/`)** — English-language news portal (TVBS World Taiwan)
- **Blog (`/blog`)** — Traditional Chinese (zh-TW) ESG content, data fetched from external API at build time

### Layout & component hierarchy

Every page uses `BaseLayout.astro`, which imports `global.css`, `base.css`, `Header.astro`, and injects a Google Publisher Tag (GPT) ad script. **`Footer.astro` is not imported by `BaseLayout`** — it is a standalone component not yet wired up.

`Header.astro` renders the T.Media logo (external URL at `cc.t.media`) and a Threads social link. There are no nav links.

`Card.astro` — Props: `title` (required), `description` (required), `href?`, `cover?`, `newTab?`. Renders as `<a>` when `href` is provided, `<div>` otherwise. Used only in the `/blog` section.

### Homepage (`src/pages/index.astro`)

Two-column layout: `article.pg-article` (1060 px) + `aside.pg-aside` (300 px sidebar). Frame max-width is 1460 px. Sidebar hides below 1024 px.

Features implemented with client-side TypeScript `<script>` blocks:
- **Hero carousel** — 6 hardcoded slides, auto-advances every 3 s, prev/next buttons, dot indicators
- **Infinite scroll** — latest news grid (3-col, collapses at breakpoints) backed by `mockPool` array embedded in the page as `<script type="application/json">`, loaded 9 items at a time via `IntersectionObserver`

Both `newsItems` and `mockPool` are hardcoded arrays in the page file. The homepage does **not** fetch from an API.

**GPT ads** — `BaseLayout` initialises Google Publisher Tag (GPT) with PPID derived from the `_ga` cookie via `crypto.subtle.digest`. Each ad slot uses `is:inline` scripts with `detectmob()` to decide which slot to display.

### Blog section (`src/pages/blog/`)

`blog/index.astro` fetches from `https://api.esg.tvbs.app/api/index-data` at SSG build time. Response shape is typed with local interfaces. Sections rendered: 頭條, 焦點新聞, 永續焦點文章, 影響力, 永續小知識, 合作夥伴. Fetch errors are caught; sections render empty on failure.

Individual blog posts are plain `.astro` files (`first-post.astro`, `second-post.astro`). No content collections or `getStaticPaths`.

### Styling

Each component and page imports its own CSS file explicitly — there is no global CSS injection through the layout beyond `global.css` and `base.css`.

- `src/styles/global.css` — resets, font stack (`Georgia`, `Noto Sans TC` via `@fontsource`)
- `src/styles/layouts/base.css` — `main` margin only; no max-width set here
- `src/styles/components/` — `card.css`, `header.css`, `footer.css`
- `src/styles/pages/` — `index.css`, `blog/index.css`, `blog/post.css`

Brand colours: `#e62320` (red) for homepage active/accent elements; `#7c3aed` (purple) for blog marquee only.

Homepage responsive breakpoints: sidebar hidden at ≤1023 px; news grid → 2-col at ≤767 px; news grid → horizontal card at ≤640 px; single-col at ≤414 px.

Blog index grid: `.headlines` = 2-col, `.tips` = 3-col, `.partners` = 4-col; all collapse to 1-col below 640 px.

### Assets

- `public/` — static files served as-is
- `src/assets/` — assets processed by Vite (e.g. `threads-logo.jpg` imported via `astro:assets` in `Header.astro`)
- Logo and favicon are external URLs pointing to `cc.t.media`

### TypeScript

Extends `astro/tsconfigs/strict`. Types are generated into `.astro/types.d.ts` on `dev`/`build`.
