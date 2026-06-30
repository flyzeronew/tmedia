# T.Media — TVBS World Taiwan

TVBS World Taiwan 新聞網站前端，使用 Astro 6.x 建置的靜態網站。

## 技術棧

- **框架**：[Astro](https://astro.build/) 6.x（Static output）
- **套件管理**：pnpm
- **語言**：TypeScript（strict mode）
- **字型**：Noto Sans TC（via `@fontsource`）、Georgia

## 常用指令

| 指令 | 說明 |
| :--- | :--- |
| `pnpm install` | 安裝相依套件 |
| `pnpm dev` | 啟動開發伺服器 `localhost:4321` |
| `pnpm build` | 建置正式版到 `./dist/` |
| `pnpm preview` | 本地預覽建置結果 |
| `pnpm astro check` | TypeScript 型別檢查 |

## 專案結構

```
src/
├── layouts/
│   └── BaseLayout.astro     # 所有頁面共用的 HTML 殼層（含 GPT 廣告初始化）
├── components/
│   ├── Header.astro          # Logo + Threads 社群連結
│   ├── Footer.astro          # 頁尾元件
│   └── Card.astro            # 可複用卡片元件（/blog 區使用）
├── pages/
│   ├── index.astro           # 英文新聞首頁
│   ├── about.astro
│   └── blog/
│       ├── index.astro       # 中文 ESG 部落格列表（Build time fetch）
│       ├── first-post.astro
│       └── second-post.astro
├── styles/
│   ├── global.css            # 全域 reset 與字型
│   ├── layouts/base.css
│   ├── components/           # card / header / footer
│   └── pages/                # index / blog/index / blog/post
└── assets/                   # Vite 處理的靜態資源
```

## 頁面說明

### 首頁（`/`）

英文新聞入口，包含：

- **Hero 輪播**：6 張投影片，每 3 秒自動切換，支援上／下頁按鈕與圓點指示
- **最新新聞格狀列表**：3 欄排版，透過 `IntersectionObserver` 實作無限捲動，每次載入 9 筆
- **Google Publisher Tag（GPT）廣告**：側邊欄 300×250 / 300×600 版位

版面為雙欄：主內容區（1060 px）+ 右側欄（300 px），外框最大寬度 1460 px；1024 px 以下側欄隱藏。

### 部落格（`/blog`）

繁體中文 ESG 內容，資料於 SSG Build time 向 `https://api.esg.tvbs.app/api/index-data` 抓取一次，烤進靜態 HTML。API 不可用時各區塊靜默為空。
