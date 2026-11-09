# BALL x PIT · Game Companion

2026-11-09，模組 1.0.0，進度 schema 1。PS5 本體與 Regal／Shadow／Naturalist 三次免費更新，白金優先兼顧完整體驗。2026-11-10 依授權沿 main 的 GitHub Pages 流程發布，結果以對應提交的 Actions 為準。[正式入口](https://promise82114.github.io/game-companion/games/ball-x-pit/)

## 功能與實際覆蓋

| 內容 | 本次收錄 |
| --- | --- |
| Roadmap | 八關，依 Pit Lift 實際順序，四類行動說明、任意跳章、完成收合與暫時回看 |
| 角色／通關 | 16 本體角色 × 8 關＝128 格；6 更新角色另列 48 格 |
| PS5 獎盃 | 64/64 英文名稱及條件，PSN 取得獨立手動確認 |
| 建築 | 78 座來源索引建築，藍圖／建造分開；6 種資源地塊另列 |
| 戰球／Passive | 90 戰球（21 基礎、69 進化）、71 Passive（54 基礎、17 進化） |
| 配方 | 86 組，含替代材料、遞迴前置與五個特殊獎盃目標 |
| Encyclopedia | 161 項球／Passive：本體119、Regal11、Shadow15、Naturalist16 |
| P1 | 22 角色機制與配裝方向、5 條技巧、基地發展順序示意、矩陣清理排序 |

以上是**本站來源覆蓋**。Encyclopedia 尚缺敵人等範疇，不能把 119 個本體球／Passive 當作 Scholar 完整分母；不顯示遊戲 100%。建築成本、等級倍率、Boss 策略、完整 Gear 門檻及 PS5 特殊觸發邊界仍待核實。Wiki 直接頁面 403；研究表明列為搜尋索引核對，沒有冒稱完整閱讀。配裝方向為依機制與配方推論，尚未實機驗證。

## 本機使用與驗證

在 repo 根目錄，使用現有 Node.js 24：

```powershell
node games/ball-x-pit/scripts/prepare-data.mjs
node scripts/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node server.mjs
```

開啟 [BALL x PIT 本機入口](http://127.0.0.1:4190/game-companion/games/ball-x-pit/)。啟動 server 後執行 `node scripts/verify-ball-x-pit-browser.mjs`；沿用 repo 現有 Playwright／Edge，可透過 `TEST_BASE_URL`、`PLAYWRIGHT_REQUIRE_FROM`、`BROWSER_CHANNEL` 設定環境。不會安裝新測試框架或使用現有 profile。

請透過 HTTP 使用；本模組的 ES modules／JSON 需要伺服器，不支援直接以 `file://` 開啟。

## 資料與保存契約

- `dist/` 是追蹤的網站來源；`scripts/prepare-data.mjs` 從根規格與 `research/` 產生 `dist/data/catalog.json`，全程離線。根規格也是必要資料來源。
- 內部 ID 使用穩定語義 slug，不冒用官方 PSN ID。圖鑑以 `ball:`／`passive:` 前綴區分類別；通關唯一鍵為 `characterId:levelId`。
- 獨立 DB `game-companion.ball-x-pit.progress.v1` 的 `records/progress` 保存 `clears`、`stepDone`、`blueprintObtained`、`buildingBuilt`、`recipeMade`、`encyclopediaUnlocked`、`trophyEarned`。
- 每筆為完成／未完成。矩陣與獎盃條件由既有 map 即時計算，不另存計數；搜尋、切章、展開、排序不寫入進度。
- 同一具體事實共用同一 map，Roadmap／建築與配方／圖鑑不建立重複狀態；「已製作」及「圖鑑已解鎖」則是不同事實。
- 沿用 `shared/roadmap-store.js`，每次更新在 readwrite transaction 讀最新版本，跨頁透過自己的 BroadcastChannel 更新。
- 匯入先 archive 兩端原文，才解析／驗證。未知欄位與未知項目保存；單端項目保留／新增，空清單不刪本機資料。兩端差異逐筆／批次選擇，下載兩端復原備份並確認後，以預覽原文條件寫入。
- 任何原文保存、下載、配額或版本錯誤，以及預覽過期，都停止套用。完整匯出包含 DB 全部 records；復原檔可選 `localRaw`／`sourceRaw`。巢狀完整備份中的歷史亦保留於匯入來源原文。
- 新模組沒有舊版進度格式，不猜測 schema0／未來版本的遷移；拒絕後原文仍可匯出。已存損壞進度不會以 fresh 覆寫。
- 所有快照、匯入原文與頻道使用遊戲前綴；沒有 localStorage 進度、OAuth、Drive、SW 或外部背景請求。

來源、技術取捨、測試與剩餘限制見 [實作與驗證紀錄](docs/IMPLEMENTATION.md)。
