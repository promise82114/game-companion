# Grounded 庭院手帳

模組 1.0.0／schema 1，資料查證 2026-11-04。Grounded 本體，非 Grounded 2。採公開 PS4／PS5 清單，初始 0/46。繁中條件為本站摘要，英文名保留，網站 ID 不是 PSN 數字 ID。

從 repo 根執行：

```powershell
node games/grounded/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node server.mjs
node scripts/verify-grounded-browser.mjs
```

入口 `/game-companion/games/grounded/`。需要 HTTP 及建置後共用資源，不使用 file URL。無產品套件、後端、地圖服務、OAuth 或 SW。Pages 沿用 main workflow，2026-11-04 使用者已授權 commit／push，沿用 main 的 Pages 流程；部署結果以對應 GitHub Actions 為準。

## 功能與資料邊界

- 七階段、25 步 Roadmap；完整體驗／白金模式、任意切章、關聯獎盃／收集、前置參考、警示、完成時間／成員與備註。四大實驗室可依裝備平行探索。耗時沒有可靠基準，直接標示而不造數字。
- 46 盃依成員獨立記錄，故事和收集不會代填 PSN。NG+ 兩盃在本體清單內。
- 53 個收集／事件／卡片項目，十種類別，三態、搜尋、區域／用途／查證篩選；每一分類皆為部分資料庫。第一輪普通乳牙 78、巨型 45、野外 SCA.B 51 是來源參考總量，不是本站清單數。未宣稱收錄完整或算出遊戲 100%。
- Super Win 13 條人工核對矩陣；官方確認 Gold Cards 不必要。條件與個人獎盃分開。版本例外、多人補跳與實機達成尚待驗證。
- 原創 SVG 庭院概念圖，11 區域群組、圖層／條件篩選、雙向清單連結、縮放、拖曳／方向按鈕／鍵盤平移。所有項目均為區域群組，精確座標為零；`regions[].anchor` 僅排版。手機地圖可橫向捲動，文字保留可讀尺寸。
- 個人標記在本周目獨立保存，由點圖或數字指定示意位置、圖層、名稱、筆記及完成狀態，不計入查證項目數。
- 多世界、本機成員、獨立周目。故事階段、步驟、一般位置／資料、條件核對、個人標記、NG+ 隨機乳牙計數依周目分開。SCA.B、巨型乳牙、生物卡、配方依已核對繼承規則在同世界共用；個人獎盃與強化筆記依玩家分開。新增 NG+ 先下載備份並由使用者確認已在遊戲啟動 REMIX.R，原周目不刪除。
- 網站不讀取遊戲 Shared World、不即時共享。Drive adapter 已盤點，但多世界 schema 尚未接入 sync-session；`cloudWritesEnabled:false`，沒有整包 last-write-wins。

## 共用及保存契約

`shared/roadmap-store.js` 是從 Talos 抽出的單一交易實作，Talos 保留原 fresh／validate 預設；Grounded 以配置提供 fresh／validator。每次寫入在 IndexedDB 交易內讀最新值，BroadcastChannel 通知僅在本遊戲前綴。編輯會驗證世界／周目／成員未被另一分頁切換。建置發布 `_site/shared/`。

差異比較使用既有 Talos `sync-core.js` 的 merge／resolve，build 複製為 `_site/shared/merge-core.js`，不另寫同步或引入登入。Grounded 不啟用其 Journal／雲端流程。

DB `game-companion.grounded.progress.v1` 的 `records/progress` 保存 `gameId`、`schema`、`schemaVersion`、`revision`、`updatedAt`、`worlds` 與設定。世界內 `worldId`、成員 `playerId` 為穩定 UUID。快照 `snapshot.*`、匯入原文 `import.raw.*` 及通道均以 `game-companion.grounded.` 開頭，無 localStorage 或快取。

匯入順序：選檔 → 保存兩端原文 → 驗證遊戲及 schema → 逐筆差異選擇 → 下載復原包 → 使用者確認可讀已保存 → 同一交易比對預覽原文後寫入。上限 20 MB；解析錯誤、quota、下載失敗、預覽過期皆停止，不清空資料。

可匯入進度 JSON、完整備份中的 progress、兩端原文包中的 localRaw。完整備份的其他 archives 不盲目覆蓋當前 DB，而是連同來源檔原文保存在本次 archive；可再從完整備份取出。一般匯出包含未知進度欄位，完整匯出另含全部快照、兩端原文及損壞資料。瀏覽器只能發起下載，須實際開檔確認。

新增資料保留穩定語意 ID，不以排序／翻譯作索引。新 schema 不自動降級或歸零；目前沒有既有資料遷移。

## 來源與版權

逐項 `sourceUrls`／查證狀態在 `dist/data.js`；來源頁可直接開啟。部分來源 403，僅使用已取得搜尋索引文字，沒有繞過或下載圖片。混合兩代條目只核對 Grounded 段落。版圖、封面、標記以 SVG 基本形狀自行創作，未使用或描摹第三方底圖。位置文字為本站摘要，不重製攻略長文。

詳見根目錄 `GROUNDED_P0_REPORT.md`、`GROUNDED_IMPLEMENTATION_REPORT.md`。
