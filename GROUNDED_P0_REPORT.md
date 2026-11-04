# Grounded P0 盤點與查證

日期：2026-11-04。規格：`docs/GROUNDED_PAGE_SPEC.md`。使用者確認尚未開始遊玩，採公開 PlayStation 清單；初始 0/46。

## 架構結論

- Talos II：原生 ES modules、靜態 `dist/`、獨立 IndexedDB；五個進度 map；交易內讀取最新值、跨分頁通知、原文存檔、預覽條件寫入。Mycopunk：原生模組及 JSON、localStorage、Worker，沒有 Drive／SW。不能將兩種 schema 混用。
- Portal 由 `scripts/build.mjs` 掃描 `module.json` 產生；Pages base 為 `/game-companion/`，直接路徑及重新整理不需要 router。
- 沒有現成中央 SDK。採用 Talos 的交易 store，抽至 `shared/roadmap-store.js` 單一維護來源，保留既有預設行為，Grounded 以配置提供 schema 驗證及 fresh。建置複製 shared 靜態資源；各模組仍獨立開啟 DB。
- 保留既有左導覽、頂部備份工具、章節選單、步驟核取及緊湊列表。視覺檢查採 design-taste-frontend app workflow；沿用既有色盤／系統字體與 244/195px 側欄、1620px 工作區；不換框架或套件。
- 新增 `games/grounded/{module.json,README.md,verify.mjs,dist/}`、共用 store、合成瀏覽器回歸、Portal 原創封面；修改 build／verify／verify-site 的註冊與 shared 發布。Talos 僅改 store 入口，預設資料契約不變。Mycopunk 不修改。
- 風險：共用 store 路徑、舊 Talos 預設驗證相容、IndexedDB quota、過期匯入、跨分頁新修改；需以原有測試及新隔離 context 驗證。沒有既有進度遷移／刪除。

## 查證結果及限制

1. 官方 Fully Yoked 1.4（2024-04-16）支援 PS4／PS5；可查到的最新官方修補為 1.4.7.4815（2025-05-12）。未取得 PS 商店當前 build，不宣稱所有平台號碼一致。
   - https://grounded.obsidian.net/news/grounded/fully-yoked
   - https://grounded.obsidian.net/news/grounded/grounded-patch-1471
2. 公開 PS 清單是 46 盃（1 白金、3 金、10 銀、32 銅）。REMIX.R 與 NG+ 再次結局包含在此清單，不能列為白金以外 DLC。名稱和條件以公開 PS 清單核對，穩定語意 ID 為網站 ID，並非官方 PSN 數字 ID。
   - https://www.playstationtrophies.org/game/grounded/print-list/
   - https://www.playstationtrophies.org/game/grounded-v2/print-list/
   - https://www.gamerguides.com/grounded/psn-trophies/overview
   - https://www.exophase.com/game/grounded-psn/trophies/
   部分頁面直接 open 回傳 403，僅使用搜尋索引已回傳的文字；沒有繞過限制。Underexposed 在來源出現「進入照片模式」與「拍照」差異，採明確警示且建議兩者都做。Science Rules 的舊 BURG.L 文案與 ASL 文案有差異，使用 ASL 並註明。
3. 官方明確：Gold Cards 自 1.4 起不再是 Report Card 100% 要求；進 NG+ 需完成 Broodmother、Mantis、Wasp Queen、JavaMatic。基地、物品、配方可繼承，普通乳牙位置隨機化。
4. 社群維基 Report Card 條件包含商店解鎖、生物卡、資料、地標、乳牙、MIX.R、SCA.B、Brainpower 及五個 Boss。社群數量：第一輪普通乳牙 78、巨型 45；SCA.B 野外 51（預設 4 不計收集）。這些總量僅作來源參考，逐項資料未齊時不生成假項目或顯示全收齊。
   - https://grounded.wiki.gg/wiki/Game_Report_Card
   - https://grounded.wiki.gg/wiki/SCA.B_Flavor_Schemes
5. 社群 NG+ 記載每輪普通乳牙 66，候選位置 219；不提供未查證座標、不生成 219 個必收點。細部繼承規則標示社群查證；採周目隔離，僅明確繼承項保留。實機未驗收。
   - https://grounded.wiki.gg/wiki/New_Game%2B
6. 官方 Shared Worlds 是遊戲自身雲端機制。本網站僅保存世界／成員標籤、共同清單與各成員手動 PSN 獎盃，不代表連線或可讀遊戲存檔。
   - https://grounded.obsidian.net/game
   - https://grounded.obsidian.net/cross-platform-support

## 安全實作邊界

- 進度 `game-companion.grounded.progress.v1`，所有原文、快照及通道均用 Grounded namespace；不新增 SW、OAuth 或雲端寫入。Drive adapter 可重用，但現有 sync-core 固定群組不適用多世界／周目／成員，P4 不草率套上整包覆寫。
- 世界、周目、玩家分開；schemaVersion、worldId、playerId、updatedAt、完成者及時間保留。三態收集不自動解鎖獎盃，Super Win 為人工條件矩陣，不冒充遊戲評分器。
- 匯入先保存兩端原文、逐欄差異選擇、下載復原包並確認；預覽過期／備份失敗停止，未知欄位保留。匯出完整可回復原文。
- SVG 僅原創概念區域，不取用第三方地圖。區域中心是畫面排版錨點，絕非收集品座標；未知精確位置用區域群組呈現。個人標記獨立保存，與查證資料分離。
- P1–P4 依序驗證：資料與模型 → 交易／備份行為 → 地圖連動／手機／鍵盤 → 周目與成員隔離；最後跑既有必要資料、同步、建置、產物與 Talos／Mycopunk 隔離瀏覽器回歸。測試全部使用新 context 與合成資料。
