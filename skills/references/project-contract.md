# 接入前的專案契約

先讀 `G:\git\AGENTS.md`、[repo AGENTS](../../AGENTS.md)、[README](../../README.md)、[架構](../../docs/ARCHITECTURE.md)、[模組契約](../../docs/MODULE_CONTRACT.md)，再讀目標及參考遊戲的 `module.json`、README 與更近的 AGENTS。規範以目前使用者指示及適用 AGENTS 為準。

## 選擇來源

- `games/{slug}/dist/` 是追蹤、可維護的網站來源；只有根 `_site/` 是可重建產物。從真正來源接入，不從 `_site/` 抄回。
- [shared/roadmap-store.js](../../shared/roadmap-store.js) 是目前直接共用的交易實作。各遊戲 `dist/shared/` 的同步群組／session 適配不同，不能因同名就當成完全相同 SDK。
- [build](../../scripts/build.mjs) 將 Talos 純 `sync-core.js` 發布為 `_site/shared/merge-core.js`，供 Grounded 差異比較；這沒有啟用 Grounded 雲端。
- 各模組保有自己的框架、資料及頁面。Portal 只列目錄，不讀玩家進度、不提供中央帳號或同步。
- 原 repo 只讀；`source-manifest.json` 保留搬入前 SHA／hash；`upstream/` 舊雲端實作不作新接入範本，也不發布。

## 穩定識別與隔離

新遊戲定義自己的 `gameId`、slug、語意 ID、schema 及 namespace。範圍包括主進度、快照、備份時間、損壞原文、匯入原文、同步 Base／pending／復原、BroadcastChannel 及 SW cache 清理前綴；不得讀寫其他遊戲或舊站資料。

攻略內容版本、`moduleVersion` 與進度 schema 分開管理；翻譯、名稱或排序不能改變既有 ID。單一 `revision` 不取代跨分頁交易／雲端修訂條件。未知 ID／欄位保留；不相容資料停止寫入並可匯出原文。

## 匯入、雲端與驗收

匯入先持久化兩端原文、顯示差異、下載復原包並由使用者確認，再以預覽條件寫入。下載／備份失敗、原文遺失或預覽過期即停止，不以清空資料排除錯誤。

新模組預設 `cloudWritesEnabled:false`。需要 Drive 時，本次 OAuth grant 的獨立合成檔須通過條件寫入、過期 412 與競爭測試，才允許進度寫入。每次 PATCH 保留 strong `If-Match`；採手動同步、帳號隔離、三方衝突與同步中新編輯保護。

只用合成資料與全新 browser context。資料、產物、瀏覽器、mock Drive、真實 Google 與 PS5 是不同證據；正式 Google 仍待使用者在正式網域驗證。網站 JSON／Drive 不含主機遊戲存檔。

本目錄不賦予 commit、push、部署、舊站切換或正式帳號操作授權。執行測試前確認腳本是否連外或寫資料，詳見[驗證參考](verification.md)。
