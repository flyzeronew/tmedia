# Design System

T.Media / TVBS World Taiwan 前端視覺設計規範。

---

## 色彩

| Token | 值 | 用途 |
| :--- | :--- | :--- |
| 強調紅 | `#e62320` | 首頁 hover 連結色、輪播圓點 active、標題分隔線、Footer 連結 hover |
| Header 黃 | `#F6EE33` | Header 背景（桌機與手機版共用） |
| Footer 黑 | `#151515` | Footer 背景 |
| 部落格紫 | `#7c3aed` | Blog Card hover 標題色、ESG 跑馬燈文字 |
| 跑馬燈底 | `#f3e8ff` | ESG 跑馬燈背景 |
| 邊框灰 | `#e5e7eb` | Card 邊框、Partner 卡片邊框 |
| 次要文字 | `#6b7280` | Card 描述文字、Partner 名稱 |
| 時間戳 | `#686868` | 新聞列表時間文字 |
| 文章 meta | `#9ca3af` | Blog 文章日期 |
| 新聞卡底 | `#f5f5f5` | 首頁 `.news_now2 .box` 背景 |
| 底線灰 | `#ddd` | 標題區分隔線、未 active 輪播圓點 |

---

## 字型

```css
/* 全域：內文 / 標題 */
font-family: "Georgia", "Noto Sans TC", "PingFang SC", serif;
font-size: 18px;
color: #000;

/* 時間戳、次要資訊 */
font-family: "Noto Sans TC", "PingFang SC", sans-serif;
```

- `Noto Sans TC` 透過 `@fontsource/noto-sans-tc`（400、700 weight）在本地載入
- `global.css` 設定基礎字級為 `18px`；博客文章標題 `2rem`

---

## 版面系統

### 全站容器寬度

所有主內容框（Header、首頁 frame、Footer）共用同一最大寬度：

```css
max-width: 1460px;
margin: 0 auto;
padding: 0 15px;
```

### 首頁雙欄佈局（`.pg-frame`）

```
┌─────────────────────────────────────── 1460px ───────────────────────────────────────┐
│  article.pg-article (1060px)                    │  aside.pg-aside (300px)            │
│  ┌───────────────────────────────────────────┐  │  ┌───────────────────────────────┐ │
│  │  Hero 輪播 (16:9)                         │  │  │  GPT 廣告 300×250             │ │
│  ├───────────────────────────────────────────┤  │  ├───────────────────────────────┤ │
│  │  Latest  ─────────────────────────────── │  │  │  GPT 廣告 300×250 / 300×600   │ │
│  │  [卡片] [卡片] [卡片]                     │  │  └───────────────────────────────┘ │
│  │  [卡片] [卡片] [卡片]  ← 3 欄            │  │                                    │
│  │  …（無限捲動）                            │  │                                    │
│  └───────────────────────────────────────────┘  │                                    │
└─────────────────────────────────────────────────┴────────────────────────────────────┘
```

欄間距：`gap: 0 100px`（≤1459px 時縮為 60px）

### 首頁 RWD 斷點

| 斷點 | 變化 |
| :--- | :--- |
| ≤1459px | article 改 `flex: 1`（彈性寬度），欄距縮為 60px |
| ≤1023px | 側欄隱藏，article 全寬；輪播標題縮至 24px |
| ≤767px | 新聞格改 2 欄 |
| ≤640px | 新聞格改水平排列（圖左 38% + 文右 60%） |
| ≤414px | 新聞標題 font-size 16px、時間戳 10px |

### 部落格格狀佈局

| Class | 欄數（桌機） | 欄數（≤640px） |
| :--- | :--- | :--- |
| `.headlines` | 2 欄 | 1 欄 |
| `.tips` | 3 欄 | 1 欄 |
| `.partners` | 4 欄 | 2 欄 |

---

## 元件

### Header

- 背景：`#F6EE33`（亮黃）；`position: sticky; top: 0; z-index: 1000`
- **桌機（≥1280px）**：`.logo_div`，Logo（100px）左對齊，社群圖示右對齊
- **手機（≤1279px）**：`.app_div`，僅顯示 Logo（85px），桌機列隱藏
- 社群圖示底色為 `#000` 圓形背景，hover 透明度降為 0.7
- Header 下方有一條細分隔線（`border-top: 1px solid rgba(0,0,0,0.12)`）

### Card（`/blog` 專用）

```
┌────────────────────────────┐
│  封面圖（180px 高）         │  ← object-fit: cover，圓角上半 8px
├────────────────────────────┤
│  標題 h3  1.25rem           │  ← hover 時變 #7c3aed
│  描述 p   #6b7280           │
└────────────────────────────┘
  邊框 1px #e5e7eb，圓角 8px
  hover：box-shadow 0 4px 12px rgba(0,0,0,0.1)
```

無 `href` 時渲染為 `<div>`（不可點擊）。

### 首頁新聞卡（`.news_now2`）

- 底色 `#f5f5f5`
- 圖片區 `aspect-ratio: 16/9`，hover 時圖片 `scale(1.04)` 放大（過渡 0.3s）
- 標題 `-webkit-line-clamp: 2`（2 行省略），高度固定 51px（桌機）
- 時間戳：右浮動，14px，`#686868`；≤640px 時改 block 排列

### Hero 輪播（`.vision`）

- 圖片 `aspect-ratio: 16/9`，caption 疊加在底部（`position: absolute; bottom: 0`）
- 漸層遮罩：`linear-gradient(to bottom, transparent, rgba(0,0,0,0.6) 35%, #000 100%)`
- 標題文字白色，單行截斷（`text-overflow: ellipsis`），桌機 30px / 手機 24px / 小手機 20px
- 箭頭按鈕：60px × 60px，`rgba(0,0,0,0.8)` 底色，置於輪播 top 40%
- 圓點：active 為 `#e62320`，非 active 為 `#ccc`

### Partner 卡片

- `flex-column`，圖示 64×64px（`object-fit: contain`）
- 邊框 `1px #e5e7eb`，圓角 8px
- 有連結時 hover 顯示 `box-shadow 0 4px 12px rgba(0,0,0,0.1)`

### Footer

- 背景 `#151515`，文字 `#ccc`
- Logo 以 `filter: brightness(0) invert(1)` 轉為白色，透明度 0.85
- 連結 `#aaa`，hover 變 `#e62320`
- 版權文字 12px，`#666`
- **≤1023px 時整個 Footer 隱藏（`display: none`）**

---

## 無限捲動 Loading 指示器

- 置中 flex 容器，預設 `display: none`，載入中切換為 `display: flex`
- 旋轉圈：36×36px，`border: 3px solid #ddd`，頂部 `border-top-color: #e62320`
- 動畫：`spin 0.75s linear infinite`

---

## 動態 / 過渡

| 元素 | 效果 | 時長 |
| :--- | :--- | :--- |
| Hero 輪播切換 | `transform: translateX` | 0.8s ease |
| 首頁新聞圖 hover | `scale(1.04)` | 0.3s |
| Card hover | `box-shadow` 淡入 | 0.2s |
| 社群圖示 hover | `opacity` | 0.2s |
| Footer 連結 hover | `color` | 0.2s |
| 輪播圓點色彩 | `background` | 0.2s |
