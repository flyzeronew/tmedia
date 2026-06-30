# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev          # dev server at localhost:4321
pnpm build        # build to ./dist/
pnpm preview      # preview the built site
pnpm astro check  # TypeScript / type-check
pnpm astro add <integration>  # add an official integration (e.g. react, tailwind)
```

## Architecture

**Static site** built with Astro 6.x, output mode `static` (default). No JS framework integration is configured yet. Package manager is **pnpm**. UI language is Traditional Chinese (zh-TW).

### Routing

File-based routing under `src/pages/`. Each `.astro` file maps directly to a URL:

- `src/pages/index.astro` → `/`
- `src/pages/blog/index.astro` → `/blog`
- `src/pages/blog/[slug].astro` → `/blog/:slug` (dynamic, if added)

Individual blog posts are currently plain `.astro` files (e.g. `first-post.astro`), not a content collection or MDX. There is no `getStaticPaths` yet.

### Data fetching

`src/pages/blog/index.astro` fetches from `https://api.esg.tvbs.app/api/index-data` at SSG build time (Node side, baked into static HTML). The response shape is typed via local interfaces in that file. Fetch errors are caught and logged; the page gracefully renders empty sections when data is unavailable.

### Layout & component hierarchy

Every page wraps its content in `BaseLayout.astro`, which:
- Imports `global.css`, `Header.astro`, and `Footer.astro`
- Accepts OG/meta props: `title` (required), `description`, `url`, `ogTitle`, `ogDescription`, `ogImage`, `ogUrl`
- Constrains `<main>` to `max-width: 900px`

`Header.astro` computes the active nav link via `navActive()`, using `Astro.url.pathname` with `class:list={{ act: navActive(href) }}`. Nav links: 首頁 (`/`), 關於 (`/about`), 部落格 (`/blog`).

`Card.astro` is the main reusable display component. Props: `title` (required), `description` (required), `href?`, `cover?`, `newTab?`. Renders as `<a>` when `href` is provided, `<div>` otherwise. Used for articles, headlines, tips, and impact items in the blog index.

### Styling

- Global resets and font stack (`Roboto`, `Noto Sans TC`) live in `src/styles/global.css`
- Component-scoped `<style>` blocks are used everywhere else (Astro scopes them automatically)
- Brand colour: `#7c3aed` (purple)
- Blog index grid layouts: `.headlines` = 2-col, `.tips` = 3-col, `.partners` = 4-col; all collapse to 1-col below 640 px

### Assets

- `public/` — static files served as-is (e.g. `favicon.svg`)
- `src/assets/` — assets processed by Astro/Vite (import in `.astro` files for optimisation)

### TypeScript

Extends `astro/tsconfigs/strict`. Types for Astro-specific globals (e.g. `Astro.props`, `Astro.url`) are generated into `.astro/types.d.ts` automatically on `dev`/`build`.
