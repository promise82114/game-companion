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

版本分為平台版本、moduleVersion、progressSchema 與原有 catalogVersion。既有項目 ID 與進度 app/schema 相容保留，新增 `gameId`、`moduleVersion`、`revision`。revision 是本機變更計數，**不是跨分頁交易或雲端修訂保證**。

進度、快照、匯入原文、Cache Storage 與 Drive 檔名皆按遊戲命名。SW 只攔截自己 scope 的 GET、只查自己的 cache、只清自己的版本前綴。Portal 不註冊 SW、不存取玩家儲存。

雲端沿用原 GIS Client、scope 與 Drive appDataFolder。模組內新增 sync-core（三方合併與本機操作日誌）、sync-session（帳號隔離 Base／pending／復原）並擴充既有 adapter。只有當次授權的合成測試檔驗證條件寫入後才能手動同步；每次 PATCH 必帶 strong If-Match，公開 request 只允許 GET。首次配對明確確認，衝突顯示 Base／Local／Remote 並逐筆或批次選擇。確認時重新讀取；結果未知先核對 syncRevision，不盲目重送。沒有背景同步。

本機以每筆不可變操作及帶欄位版本的 checkpoint 保存，跨分頁操作可回放。同步結果以起始 Local 再 rebase 到最新 Local，最後寫入使用 expected-value 條件保留其他分頁新變更。較舊新站分頁改寫主 Key 時另存原文並要求預覽匯入。測試入口 tools/sync-safety 只操作唯一名稱的合成檔，不載入玩家進度。真實 Drive 測試尚待使用者於正式網域執行，限制詳見同步報告。

GitHub workflow 驗證資料與每個必要模組，再建立並檢查完整 artifact，成功後才可部署。初次整合先完成本機驗證；後續依使用者明確授權完成 commit、push 與 GitHub Pages 首次發布，Actions 與正式 43 個網站資源驗證皆成功。發布證據見 `docs/reports/INTEGRATION_REPORT.md`。沒有改舊站或操作正式 Google 帳號。後續已依使用者授權加入具 runtime 驗證門檻的雲端功能；目前證據及發布狀態見 docs/reports/DRIVE_SYNC_REPORT.md。
