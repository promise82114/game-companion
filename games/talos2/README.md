# The Talos Principle II · 本體白金 Roadmap

2026-10-31，模組 1.0.0，攻略版本 `2026.10.31.1`。本體 60 獎盃（含白金），Road to Elysium 的 9 個 PS5 獎盃排除。本模組是新工具，沒有搬動舊 repo、攻略或既有 ID。

入口 `/game-companion/games/talos2/`，支援 `?view=roadmap`、`?view=trophies`、`?view=backup` 與 `#step-w2-backup` 等穩定深連結。Portal 由既有 build 自動列入。

2026-10-31 使用者已授權 commit、push 及正式發布。模組已接入既有 main 的 Pages 流程；部署結果以 [GitHub Actions](https://github.com/promise82114/game-companion/actions/workflows/deploy.yml) 為準。[正式測試入口](https://promise82114.github.io/game-companion/games/talos2/)；PS5 與真實 Google 的驗收仍由使用者執行。

## 使用與驗證

在 repo 根目錄執行：

```powershell
node games/talos2/verify.mjs
node scripts/verify.mjs
node scripts/verify-sync.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node server.mjs
$env:TEST_BASE_URL='http://127.0.0.1:4190/game-companion/'
node scripts/verify-talos2-browser.mjs
```

沿用 `scripts/browser-runtime.mjs` 的 Playwright／Edge；沒有產品依賴、lint／typecheck 套件或套件安裝。模組 verify 執行 Node 語法檢查、資料契約、步驟依賴、獎盃對照、同步衝突與合成 Drive 條件寫入回歸。瀏覽器測試只建立全新 context 與合成資料，不使用真實 Google。

## 檔案與資料

- `dist/data.js`：八階段、57 步驟、60 本體獎盃、三市長與查證來源。內容更新不得改已發布步驟 ID。
- `dist/roadmap/model.js`：可重用的步驟狀態、篩選、摘要與階段風險計算，不包含 Talos 專屬判斷。
- `dist/roadmap/store.js`：獨立 IndexedDB 與交易；`steps`、`trophies`、`backups`、`branches`、`settings` 分開保存。
- `dist/roadmap/sync.js`：手動同步 UI；沿用相同 GIS OAuth client 及 Drive appDataFolder adapter。
- `dist/shared/`：從 EDF 安全版本沿用。auth／adapter／envelope 未更動；sync-core 的群組改為 Roadmap 群組；sync-session 改成等待 IndexedDB 的非同步交易。
- `dist/app.js`、`index.html`、`style.css`：模組自己的畫面。沒有新增 SW，也不清理其他模組 cache。

原專案沒有共用獎盃模型或既有 IndexedDB，故新增此模組的交易儲存，不假稱曾沿用不存在的 API。資料庫 `game-companion.talos2.progress.v1`，store `records`，主記錄 `progress`；快照／匯入原文鍵分別以 `game-companion.talos2.snapshot.`／`game-companion.talos2.import.raw.` 開頭。Drive 檔名與 localStorage 同步 Base／pending／復原全部使用 `game-companion.talos2.` namespace，帳號 Base 另以 permissionId 的 SHA-256 隔離。

沒有既有 Talos 進度需要遷移。schema 1 保留未知欄位及未知步驟／獎盃 ID；版本不相容或損壞時停止，不用空資料覆蓋。可匯出原始記錄。匯入在寫入前保存兩端原文、顯示新增欄位與衝突、逐筆／批次選擇、下載復原包、手動確認，再以原始版本交易條件套用；過期或備份失敗停止。完整復原匯出含快照、匯入原文與本模組 sync 原文；復原包本身不直接覆寫，需將選定的 progress／sourceRaw 經一般匯入預覽。

Drive 保留每次 grant 合成檔驗證、strong If-Match、412、競爭測試、首次配對、三方衝突、過期預覽、同步期間新編輯與結果未知修訂核對。沒有自動登入／上傳；正式 Google 驗證仍須使用者在正式網域進行。

## 攻略限制

已確認／共識／待查證均逐步標記。三市長的前期條件、W2 區域流程與各結果分開記錄，不能以一個 W2 備份保證任意既有進度都能拿三盃。PS5 備份只記錄使用者手動確認，清單 JSON／Drive 不包含 PS5 存檔。

官方逐盃數字 ID 尚無可靠對照。`trophyRefs` 是網站自有的穩定英文名稱鍵，`officialId: null`，步驟 `trophyIds: []`；沒有把清單排序或第三方網站 ID 冒充官方 ID。所有本體獎盃均有名稱對照與手動狀態。完整證據、限制與測試見 [查證與整合報告](docs/RESEARCH.md)。
