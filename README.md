# Astro 練習專案

以 [Astro](https://astro.build) 6.x 建立的靜態網站練習專案，使用繁體中文介面。

## 技術棧

- **Astro 6.x** — 靜態網站框架
- **TypeScript** — strict 模式
- **pnpm** — 套件管理器
- **Fontsource** — 本地字型（Roboto、Roboto Flex、Noto Sans TC）

## 專案結構

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/          # 經 Vite 處理的靜態資源
│   ├── components/
│   │   ├── Card.astro
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro   # 共用版型，含 OG meta
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       ├── first-post.astro
│   │       └── second-post.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
└── package.json
```

## 常用指令

| 指令 | 說明 |
| :--- | :--- |
| `pnpm install` | 安裝相依套件 |
| `pnpm dev` | 啟動開發伺服器 `localhost:4321` |
| `pnpm build` | 建置正式版到 `./dist/` |
| `pnpm preview` | 本地預覽建置結果 |
| `pnpm astro check` | TypeScript 型別檢查 |
| `pnpm astro add <套件>` | 新增官方整合（如 react、tailwind）|
