# Game Companion 目前架構

日期：2026-10-31；EDF 模組版本 1.1.0，Mycopunk 1.0.0，均納入 main 分支的靜態發布流程。

原始基準為 `GAME_COMPANION_ARCHITECTURE.md`。使用者後續「加速整合任務」明確改為一次連續實作 EDF WB／WB2，不需逐階段批准；資料保護、獨立模組及正式雲端／切換須確認的要求仍有效。原始規格與 P0 保留作歷史，不改寫成已驗收。

```text
portal/                         遊戲目錄 HTML/CSS 模板，不存取進度
games/{slug}/
  module.json                   遊戲識別、版本、入口與儲存契約
  source-manifest.json          搬入來源 SHA／逐檔原始 hash
  dist/                         該遊戲完整 HTML/CSS/JS、同步 adapter
  data/、scripts/               有來源提供時保留的攻略資料與產生器
  verify*.mjs、server.mjs        原遊戲驗證及預覽工具
  docs/                         原遊戲的來源／翻譯核對文件
  upstream/                     被安全版本取代的舊雲端程式／測試，不發布
scripts/                        建置、隔離與部署檢查、整合回歸
_site/                          可重建的 Pages artifact，不追蹤
docs/                           規範、遷移、驗收、報告
```

EDF 兩款沿用原生 HTML/CSS/JS，各自保留 `dist/shared/`。Mycopunk 模組版本 1.0.0，沿用自己的 ES modules、JSON、圖片與 Worker，不使用 EDF 的資料格式或同步程式。沒有平台共用進度 SDK；各模組的匯入保護程式隨模組一起維護，不把 Portal 變成同步中心。

Mycopunk 原 `prototype/` 對應到 `games/mycopunk/dist/`；Excel、localization、research 與離線產生器保留在模組內但不部署。原 appId、schema 及 ID 不改，新主 Key 為 `game-companion.mycopunk.progress.v1`，舊站 Key 不讀寫。匯入先保存兩端原文、逐筆／批次選差異、下載備份與確認；未知欄位與原文可匯出，過期預覽或備份失敗會停止。沒有 Google Drive 或 SW。

建置讀取 `games/*/module.json`，自動產生 Portal 遊戲列，將各模組 `dist/` 放到 `_site/games/{slug}/`。網站不用 router 或後端；GitHub Pages 根為 `_site`，路徑自然對應 `/game-companion/`。來源與工具不會被打包到網站。

Thank Goodness You're Here!（2026-10-31 本機整合，模組 1.0.0）以獨立 JSON 定義 33 獎盃、8 階段、100 步與 13 組 tracker。其 schema 1 分開保存 `stepDone`／`trophyEarned`；IndexedDB `game-companion.thank-goodness-youre-here.progress.v1` 的 `state`／`archives` 提供交易與原文復原。沒有重用 EDF item hash 或增加中央狀態。Drive OAuth／adapter／envelope 沿用 EDF 版本，sync-core 的群組改為兩個進度 map，session 等待本模組的非同步儲存；Base／pending 按遊戲／帳號保存於自己的 localStorage 前綴。SW 只處理本模組 scope。攻略查證、保護式匯入、測試與實機限制見 `games/thank-goodness-youre-here/README.md`；發布沿用 main 的既有 Pages 流程；尚未完成真實 Google 驗收。

版本分為平台版本、moduleVersion、progressSchema 與原有 catalogVersion。既有項目 ID 與進度 app/schema 相容保留，新增 `gameId`、`moduleVersion`、`revision`。revision 是本機變更計數，**不是跨分頁交易或雲端修訂保證**。

進度、快照、匯入原文、Cache Storage 與 Drive 檔名皆按遊戲命名。SW 只攔截自己 scope 的 GET、只查自己的 cache、只清自己的版本前綴。Portal 不註冊 SW、不存取玩家儲存。

雲端沿用原 GIS Client、scope 與 Drive appDataFolder。模組內新增 sync-core（三方合併與本機操作日誌）、sync-session（帳號隔離 Base／pending／復原）並擴充既有 adapter。只有當次授權的合成測試檔驗證條件寫入後才能手動同步；每次 PATCH 必帶 strong If-Match，公開 request 只允許 GET。首次配對明確確認，衝突顯示 Base／Local／Remote 並逐筆或批次選擇。確認時重新讀取；結果未知先核對 syncRevision，不盲目重送。沒有背景同步。

本機以每筆不可變操作及帶欄位版本的 checkpoint 保存，跨分頁操作可回放。同步結果以起始 Local 再 rebase 到最新 Local，最後寫入使用 expected-value 條件保留其他分頁新變更。較舊新站分頁改寫主 Key 時另存原文並要求預覽匯入。測試入口 tools/sync-safety 只操作唯一名稱的合成檔，不載入玩家進度。真實 Drive 測試尚待使用者於正式網域執行，限制詳見同步報告。

GitHub workflow 驗證資料與每個必要模組，再建立並檢查完整 artifact，成功後才可部署。初次整合先完成本機驗證；後續依使用者明確授權完成 commit、push 與 GitHub Pages 首次發布，Actions 與正式 43 個網站資源驗證皆成功。發布證據見 `docs/reports/INTEGRATION_REPORT.md`。沒有改舊站或操作正式 Google 帳號。後續已依使用者授權加入具 runtime 驗證門檻的雲端功能；目前證據及發布狀態見 docs/reports/DRIVE_SYNC_REPORT.md。

## Talos II Roadmap · 2026-10-31 本機整合

`games/talos2/` 新增原生 ES module 畫面、靜態攻略與獨立 IndexedDB（schema 1）。八階段 57 步驟；本體 60 獎盃、DLC 9 排除。共用候選邏輯放在模組內 `dist/roadmap/`：狀態／篩選／風險計算與交易儲存皆不包含 Talos 專屬規則；遊戲內容、分支與前置在 `dist/data.js`。

既有模組沒有中央獎盃系統或 IndexedDB。本次新增本遊戲 DB `game-companion.talos2.progress.v1`，以 `records/progress` 儲存 `steps`、`trophies`、`backups`、`branches`、`settings`；快照、匯入原文也在該 DB。每次寫入在同一 readwrite transaction 讀取最新資料，匯入以預覽原文條件檢查，雲端套用在交易內 rebase，避免跨分頁覆蓋。內容版本獨立，未知資料保留，資料不相容時停止並可下載原文，不用新空資料覆蓋。

Google Auth、Drive adapter、progress envelope 與 EDF 安全版相同；Talos 的 sync-core 改群組，sync-session 等待非同步本機介面。Base／pending／復原仍保留既有遊戲與帳號隔離、逐 grant 合成檔條件寫入驗證、strong If-Match、三方衝突與結果未知復原。沒有新增 OAuth 流程、中央同步或 SW。正式 Google 仍未驗收。

官方逐盃數字 ID 尚未核實，`trophyIds` 留空，名稱對照使用獨立 `trophyRefs`，不假冒 PSN ID。PS5 備份僅記錄使用者確認；清單 JSON／Drive 不是遊戲存檔。詳見 `games/talos2/docs/RESEARCH.md`。
