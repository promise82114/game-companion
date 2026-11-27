# 靠左一些些｜A Little to the Left

2026-11-27 模組 1.1.0：原列 **39／39 題**的配置內容已補齊為本機圖文，包含 **104 張圖解、8 種月曆貼紙圖案、15 組可播放操作示範**。資料版本 2026-11-27.2。原有進度 ID／schema 不變；來源畫面核對與 PS5 實機驗收分開。

PS5 本體白金的獨立本機攻略模組。五章共 79 個**編輯導航單元**、108 個本站解法紀錄、200 個操作核對及 48 座獎盃；不是宣稱官方有 79 關或 108 顆星。付費 DLC、Archive 及節慶題不加入白金分母。

在 repo 根目錄執行：

```powershell
node scripts/build.mjs
node server.mjs
```

開啟 <http://127.0.0.1:4190/game-companion/games/a-little-to-the-left/>。4190 已占用時先確認是否為既有 server；可用 `$env:PORT='4198'; node server.mjs` 改埠，但不同埠的瀏覽器進度互不相通。搬移前先匯出 JSON。

## 日常操作

- 「繼續整理」依實際未完成解法返回題目；自由閱讀後章不會改寫前章進度。
- 左側主線下可直接選章；同章未完成內容直接展開，已完成題可回看／反勾。操作核對與解法紀錄獨立。
- 「解法查漏」「獎盃與收尾」預設未完成，勾完立即移出，提供撤銷。獎盃只由玩家確認，未由解法／計數自動授予。
- 提示與跳關收尾分別以實際確認 No Squint Hint／No Mess Left Behind 為前置；不推薦刪 PS5 存檔。
- 每日整理提供自然日期與選用調日期兩路線；星數、連續數與主機遊戲日期由玩家輸入，記錄時間獨立保存。未知計數顯示「尚未確認」，可清空；逐階徽章仍缺 PS5 資料，目前只可確認全部徽章。
- 右上固定提供 JSON 匯出、匯入與完整封存。匯入先封存兩端原文，逐筆選差異，下載兩端復原備份並確認，再條件交易套用；較舊來源另行確認，過期／下載失敗停止。來源缺少項不刪本機。

## 資料與相容性

原生 ES modules／JSON，沿用根 `shared/roadmap-store.js`，無產品依賴、OAuth、Drive、SW 或帳號。

- `gameId: alttl`，schema／schemaVersion 皆為 1。
- IndexedDB：`game-companion.alttl.progress.v1`；`records/progress` 保存七個獨立 map：`steps`、`solutions`、`trophies`、`events`、`badges`、`counters`、`settings`。
- 快照：`game-companion.alttl.snapshot.*`；原文：`game-companion.alttl.import.raw.*`；BroadcastChannel：`game-companion.alttl.progress`。不讀寫其他遊戲或舊站 key；不使用 localStorage。
- 各次操作交易內讀最新值，以 `keyRevision` 精準撤銷，避免覆蓋另一分頁後續操作。儲存失敗回到已保存值，常駐提示可重試；壞資料停止寫入，完整封存保留損壞原文。
- 沒有舊版可遷移，本次未修改既有遊戲 schema。未知 ID／欄位與兩端原文保留；未知重大版本停止。本契約依既有 repo map 進度模型對接規格中的概念型別，不提供另一套平行存檔。
- `prepare-data.mjs` 從根規格與 `research.json` 離線產生 `dist/data.json`；`specSha256` 固定原始輸入。根規格及 research 不可當成產物刪除。

## 內容限制

原列 39 題全部有可放大的本機完成圖／操作圖與繁中表格，答案不依賴外站：月曆逐圖案日期、抽屜逐格、十五顆燈泡、掛板逐工具、九宮格兩解、十七件寶石編號、七組開關、十一幕回顧及七階段套盒。貓食罐十步用原始九罐局面重放驗證；花瓶另含八張實玩旋轉面／缺口畫面，時間點 00:14～00:56，補上只看正面不足的問題。

普通／色彩輔助外觀分開查看，共用原解法進度；動畫按「播放步驟示範」才播放，可停止。放大視窗支援原始尺寸、內部捲動、Escape 與關閉後焦點返回。來源作者與原始段落逐圖署名；原圖 SHA256、處理後 SHA256、來源 URL 及影片時間點記在 `layout-assets.json`，所有實際閱讀資源位於 `dist/layouts/`。

PS5 目前安裝版、控制器鍵位、官方選關數、總星槽數、逐階每日徽章與日期刷新尚待實機核對。橙色火柴舊文的配方差異保留明示，照實際成色確認。步驟與英文別名可搜尋，不冒充官方繁中名稱；未用 AI 圖猜落點。

## 配置資料的維護

`layout-guides.mjs` 是 39 題的繁中操作表／圖號／覆蓋資料；`layout-assets.json` 為圖片來源與 hash；`extra-layout-references.json` 為花瓶影片畫面的來源／秒數。這些檔案與 `dist/layouts/` 都是維護來源，不可當成可刪產物。

一般 build／verify 只讀本機，不連網。需要重建圖片時才手動執行：

```powershell
node games/a-little-to-the-left/research-layouts.mjs --download
node games/a-little-to-the-left/capture-layout-video.mjs
node games/a-little-to-the-left/prepare-layout-assets.mjs
node games/a-little-to-the-left/prepare-data.mjs
```

前兩個指令唯讀連線至限定的公開圖文／影片；研究原文與原圖暫存於忽略的 `outputs/alttl/references/`。圖片處理沿用既有工具 runtime 的 sharp；不新增產品套件。影音擷取使用全新暫存 Edge context，驗證／逾時即停止，不使用既有 profile。已保存素材會重用；來源更動應重新人工核對，不僅改 hash 冒充已驗證。

## 驗證

```powershell
node games/a-little-to-the-left/prepare-data.mjs
node games/a-little-to-the-left/verify.mjs
node scripts/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node scripts/verify-alttl-browser.mjs
```

瀏覽器沿用 `scripts/browser-runtime.mjs` 的 Playwright／Edge，全新 context 與合成資料，封鎖外部請求與 SW。可設 `TEST_BASE_URL`（含 `/game-companion/` 與尾斜線）。結果與限制見 [實作紀錄](docs/IMPLEMENTATION.md)。


## 2026-11-27 中文優先調整

本機依共通介面偏好第20項，名稱、導航與攻略以中文為主，原文放後方或下一行小字對照；新增名稱為本站參考譯名，未逐項核對遊戲官方中文。原名、ID、schema與進度鍵保留，搜尋涵蓋中文及原文。

本模組詞彙維護於 `research/chinese-first.json`，修改後從 repo 根目錄執行 `node scripts/prepare-chinese-first.mjs`；資料驗證會檢查產物是否過期。

共用隔離檢查：`node scripts/verify-chinese-first-browser.mjs`。範圍、維護與驗證限制見[十款調整紀錄](../../docs/reports/CHINESE_FIRST_ALIGNMENT_20261127.md)。使用者已授權本批 commit／push；main push 將自動觸發既有 Pages 流程，結果以對應 Actions 為準。
