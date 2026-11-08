# Grounded 庭院手帳

模組 1.1.2／schema 1，資料複查 2026-11-08。Grounded 本體，非 Grounded 2。採公開 PS4／PS5 清單，初始 0/46。繁中條件為本站摘要，英文名保留，網站 ID 不是 PSN 數字 ID。

從 repo 根執行：

```powershell
node games/grounded/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node server.mjs
node scripts/verify-grounded-browser.mjs
```

入口 `/game-companion/games/grounded/`。需要 HTTP 及建置後共用資源，不使用 file URL。無產品套件、後端、地圖服務、OAuth 或 SW。Pages 沿用 main workflow，1.0.0 已依授權發布；2026-11-04 使用者已授權提交／推送本次 1.1.1，部署結果以對應 GitHub Actions 為準。

## 功能與資料邊界

- 七階段、25 步 Roadmap；左側章節直達，每步依「步驟目標 → 完整體驗 → 白金需求」呈現。依 `docs/PROGRESSIVE_ROADMAP_UX.md`，未完成時全文可讀；目標、相關獎盃及收集全部勾完才縮成摘要，可暫時回看。取消任一事項就恢復全文，重要警告持續可見。沒有目標模式／瀏覽章節選單、耗時或自訂備註。四大實驗室可依裝備平行探索。
- `dist/roadmap-progress.js` 從現有進度推導事項數量、全完成與下一步，不寫入新完成旗標。閱讀回看只存在頁面記憶體，重整後重新依完成度收斂；搜尋可暫時顯示已完成內容。章節完成數與「返回遊玩進度」亦使用相同判斷，不代填任何進度。更新時在原位修改 DOM，保留焦點及閱讀位置，不自動捲至下一步。
- 46 盃與 Roadmap 內同名核取方塊共用原有獎盃進度，相關收集也可直接勾選並與收集頁／地圖互相反映；不跳離攻略。步驟、獎盃及收集仍各自確認，不互相代填。NG+ 兩盃在本體清單內。
- 53 個收集／事件／卡片項目，十種類別，三態、搜尋、區域／用途／查證篩選；每一分類皆為部分資料庫。第一輪普通乳牙 78、巨型 45、野外 SCA.B 51 是來源參考總量，不是本站清單數。未宣稱收錄完整或算出遊戲 100%。
- Super Win 13 條人工核對矩陣；官方確認 Gold Cards 不必要。條件與個人獎盃分開。版本例外、多人補跳與實機達成尚待驗證。
- 原創 SVG 庭院概念圖，11 區域群組、圖層／條件篩選、雙向清單連結、縮放、拖曳／方向按鈕／鍵盤平移。所有項目均為區域群組，精確座標為零；`regions[].anchor` 僅排版。手機地圖可橫向捲動，文字保留可讀尺寸。
- 個人標記、收集備註、世界／成員管理及總覽的共同遊玩規則／今日建議已移除。舊筆記、標記、多世界／成員欄位保存在原 schema 與完整備份中，不顯示或新增這些操作。
- 保留獨立周目與 NG+ 隨機乳牙計數。新增 NG+ 先下載備份並由使用者確認已在遊戲啟動 REMIX.R，原周目不刪除。原有跨周目繼承規則不變，下一步由實際未完成步驟推導；不再手動設定故事階段。
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

## 1.1.2 白金流程驗收

本次先完成 P0，再修正部分具名查漏：收集頁首可直達 Super Win 矩陣，各分類連到已收錄未完成項，包含 unknown 及必要性待查證項。保留原搜尋／清單順序，沒有為矩陣擠開收集操作；Ominent 的兩個已列項新增分組、地下文字位置與 Haze 攻略反查，Trudy Blues 補已確認取得方式與必要性。未收錄名稱仍可能無結果，不代表已全齊。

補上存檔資格提醒、Haze 破門／不同入口工具、Undershed Fuse 前置、開蜂箱與三蟻后卡片風險，以及 Apprentice／Daily 區別。PS5 蟻寶寶卡與補跳未實機驗證，不把 Super Win 的社群例外套為卡片獎盃免查條件。部分路線仍不足，已在介面標示待查證。

REMIX.R 頁及對應 Roadmap 步驟從既有紀錄列出第一輪未確認的 13 分類與 43 個非白金／非 NG+ 個人獎盃；不推論裝置已解鎖。NG+ 摘要改顯當輪普通乳牙人工計數，不再顯示第一輪 0/6。永久 inherited 四類仍共用同世界狀態，未改 bucket、schema、ID、匯入或寫入邏輯。

Haze 新增相關文件的勾選，可能讓舊的已完成步驟重新顯示全文；原目標勾選與既有進度均保留，不自動補齊文件。全部資料庫仍為 53 項部分清單；MIX.R 的 8 個名稱已列，路線未齊；網站不能獨立證明 Super Win。

報告：[白金驗收](../../GROUNDED_PLATINUM_AUDIT_REPORT.md)、[資料覆蓋](../../GROUNDED_DATA_COVERAGE.md)、[玩家情境](../../GROUNDED_UX_TEST_CASES.md)、[後續計畫](../../GROUNDED_FOLLOWUP_PLAN.md)。此版本已完成本機驗收；使用者已授權 commit／push，發布結果以對應 GitHub Actions 為準，真實 PS5 驗收限制不變。
