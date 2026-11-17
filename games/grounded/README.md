# Grounded 庭院手帳

模組 1.5.0／schema 1，資料複查 2026-11-17。路線圖涵蓋 Grounded 本體。PS4／PS5 46 盃名稱採 BWIKI 用詞並保留英文，白金及部分收集項目使用本站繁中譯名。

從 repo 根執行：

```powershell
node games/grounded/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node server.mjs
node scripts/verify-grounded-browser.mjs
```

入口 `/game-companion/games/grounded/`。需要 HTTP 及建置後共用資源，不使用 file URL。無產品套件、後端、OAuth 或 SW。站內座標與文字索引可在本機建置使用，BWIKI 的原始互動地圖由玩家展開後載入，站內對應圖示保留 BWIKI 來源署名並由本站載入。Pages 沿用 main workflow。

## 功能與資料邊界

- 七階段、25 步遊玩路線圖。左側章節直達，各關鍵步驟並排顯示「先取得／準備」和「再前往」，窄螢幕依順序上下排列。依 `docs/PROGRESSIVE_ROADMAP_UX.md`，未完成時全文可讀；目標、相關獎盃及收集全部勾完才縮成摘要，可暫時回看。取消任一事項就恢復全文，重要警告持續可見。沒有目標模式／瀏覽章節選單、耗時或自訂備註。四大實驗室可依裝備平行探索。
- `dist/roadmap-progress.js` 從現有進度推導事項數量、全完成與下一步，不寫入新完成旗標。閱讀回看只存在頁面記憶體，重整後重新依完成度收斂；搜尋可暫時顯示已完成內容。章節完成數與「返回遊玩進度」亦使用相同判斷，不代填任何進度。更新時在原位修改 DOM，保留焦點及閱讀位置，不自動捲至下一步。
- 路線圖、收集清單與獎盃清單共用同一份紀錄，可直接勾選並篩出未取得項目。步驟、收集與 PSN 跳盃分別確認。
- 路線圖列出各區晶片交回後可購買的重點科技。開局的鍛造站在預設商店，霧靄超級晶片開放熔爐，黑蟻丘、沙盒、樹樁與奧美能磁碟接續不同階段的武防升級。
- 第一輪 100% 收集清單有 11 個分類分頁、共 569 個核對列，每頁最多 24 筆，涵蓋 78 顆普通乳牙、45 顆巨型乳牙、51 個野外 SCA.B、108 個地標、68 張目標生物卡及 64 筆商店條目，也含庭院資料、晶片、防守、首領、腦力與結局。資料頁的潦草筆記列作 99% 查漏對照。切換到 NG+ 時，固定位置普通乳牙的勾選仍記在第一輪。遊戲報告卡為最終判準。
- 路線圖的 100% 查漏提供 13 條超級勝利條件，並能逐類展開本站已收錄項目。版本例外、多人補跳與實機達成尚待驗證。
- 武器頁收錄 88 筆武器、工具與箭矢，含持握方式、連段傷害、武器及傷害類型、元素、暈眩和水下可用性。防具的 22 套及 6 件探索散件分兩頁表格，依階級降序比較階級、減免、單件／套裝／光滑鍛造效果。兩頁可搜尋及篩選。
- 異變頁整理 41 項 Grounded 本體異變的中英文名稱、效果及解鎖門檻，可按用途篩選。推薦頁收錄初期、中期及後期裝備，以及七個場合的核心兩格和加選異變；名稱可跳到對應圖鑑。這些頁面可直接瀏覽，無需遊玩進度。
- 100% 點位地圖採 MapGenie 庭院 113 的 418 個來源座標，以北朝上的座標圖呈現。可按分類、名稱定位，點位與清單互跳，並支援縮放、拖曳與鍵盤操作。共用座標的地標、任務或收集列分開核對。無固定位置的生物、商店與腦力，以及尚未對上逐點座標的資料，保留在清單。
- 怪物頁可按中英文、類型、傷害欄與弱抗性搜尋。BWIKI 提供 67 種、14 欄，數值缺漏與矛盾標示為待查證。
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

逐項 `sourceUrls`／查證狀態在 `dist/data.js`。武器與防具資料依 [BWIKI 武器](https://wiki.biligame.com/grounded/武器)、[護甲](https://wiki.biligame.com/grounded/护甲)、[官方 1.3 水下武器更新](https://grounded.obsidian.net/news/grounded/update-1-3) 整理，查證範圍見各頁來源。部分來源 403，僅使用已取得搜尋索引文字，沒有繞過來源存取限制。混合兩代條目只核對 Grounded 段落。報告卡、晶片與生物來源為 [BWIKI 報告卡](https://wiki.biligame.com/grounded/游戏报告卡)、[資料頁](https://wiki.biligame.com/grounded/数据页)、[地標](https://wiki.biligame.com/grounded/地标)、[科學商店](https://wiki.biligame.com/grounded/科学商店)、[生物](https://wiki.biligame.com/grounded/生物)，並以 [Grounded Wiki 報告卡](https://grounded.wiki.gg/wiki/Game_Report_Card) 對照例外。點位取自 [MapGenie 庭院](https://mapgenie.io/grounded/maps/yard) 的公開地圖資料，保存識別碼與平面投影所需座標，詳情連回供應者。原始互動圖由 [BWIKI 地圖](https://wiki.biligame.com/grounded/互动地图) 提供，乳牙、配色、防守、實驗室和工作站圖示取自該頁並存於 `dist/map-icons/`。其他分類使用站內文字標記。遊戲圖像依 [Microsoft 遊戲內容使用規則](https://www.xbox.com/en-us/developers/rules) 與 [Obsidian 玩家創作規範](https://www.obsidian.net/legal/ip-use) 使用，權利歸原權利人。位置文字為本站摘要。

詳見根目錄 `GROUNDED_P0_REPORT.md`、`GROUNDED_IMPLEMENTATION_REPORT.md`。

## 1.1.2 白金流程驗收（歷史）

本次先完成 P0，再修正部分具名查漏：收集頁首可直達 Super Win 矩陣，各分類連到已收錄未完成項，包含 unknown 及必要性待查證項。保留原搜尋／清單順序，沒有為矩陣擠開收集操作；Ominent 的兩個已列項新增分組、地下文字位置與 Haze 攻略反查，Trudy Blues 補已確認取得方式與必要性。未收錄名稱仍可能無結果，不代表已全齊。

補上存檔資格提醒、Haze 破門／不同入口工具、Undershed Fuse 前置、開蜂箱與三蟻后卡片風險，以及 Apprentice／Daily 區別。PS5 蟻寶寶卡與補跳未實機驗證，不把 Super Win 的社群例外套為卡片獎盃免查條件。部分路線仍不足，已在介面標示待查證。

REMIX.R 頁及對應 Roadmap 步驟從既有紀錄列出第一輪未確認的 13 分類與 43 個非白金／非 NG+ 個人獎盃；不推論裝置已解鎖。NG+ 摘要改顯當輪普通乳牙人工計數，不再顯示第一輪 0/6。永久 inherited 四類仍共用同世界狀態，未改 bucket、schema、ID、匯入或寫入邏輯。

Haze 新增相關文件的勾選，可能讓舊的已完成步驟重新顯示全文；原目標勾選與既有進度均保留，不自動補齊文件。全部資料庫仍為 53 項部分清單；MIX.R 的 8 個名稱已列，路線未齊；網站不能獨立證明 Super Win。

報告：[白金驗收](../../GROUNDED_PLATINUM_AUDIT_REPORT.md)、[資料覆蓋](../../GROUNDED_DATA_COVERAGE.md)、[玩家情境](../../GROUNDED_UX_TEST_CASES.md)、[後續計畫](../../GROUNDED_FOLLOWUP_PLAN.md)。此版本已完成本機驗收；使用者已授權 commit／push，發布結果以對應 GitHub Actions 為準，真實 PS5 驗收限制不變。
