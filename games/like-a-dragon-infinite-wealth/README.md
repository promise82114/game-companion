# 人中之龍８｜本體白金攻略

本機入口：<http://127.0.0.1:4190/game-companion/games/like-a-dragon-infinite-wealth/>。
在 repo 根目錄執行 `node scripts/build.mjs`、`node server.mjs`。

原生 HTML／CSS／ES modules，獨立 IndexedDB `game-companion.like-a-dragon-infinite-wealth.progress.v1`，schema 1；沒有 OAuth、Drive、Service Worker 或 PSN 連接。Portal 由 module.json 自動註冊。

- 14 章、100 個主線動作與 P01–P05 收尾；未完成全文展開，完成可回看，章節自由瀏覽。
- 保留 `chapter-01`～`chapter-13`、`chapter-finale`、`T01`～`T65`、`SS01`～`SS52`。這些不是 PSN 官方 ID。
- 支線、40 段羈絆、8 個迷宮分區、活動與16項計數；PSN跳盃獨立確認。
- 1.1.0 新增110攝影（夏威夷70／異人町40）及90追憶（異人町50／神室町40）具名逐點庫，附繁中位置、取景／事件操作、章節／時段／前置與逐筆來源。路線依章節、城市及區域選擇閱讀單元，未完成全文展開；查漏清單可依區域及可開始章節篩選。
- 1.2.0 補齊52條支線詳細攻略：觸發地點、最早章節／前置、操作步驟、完成條件與逐條來源；另列餐廳訂單、逃脫答案及密碼、關係禮物與購買地點。章節按區域／系列選閱讀單元，已可開始的早期支線亦可回補；查漏預設未完成並可篩區域／章節。前置可互跳、完成度共用原有SS01～SS52。
- 功能切換清除搜尋／篩選；獨立清單預設未完成，完成立即移出；深連結顯示已完成目標。
- 操作即存、跨分頁更新、逐鍵撤銷與失敗重試。備份與還原在右上；匯入先封存兩端原文、逐筆比較、下載並確認後條件交易套用。未知項目與欄位保留，來源缺項不刪本機。

來源：根目錄 `like-a-dragon-infinite-wealth_PLATINUM_GUIDE.md` 、`research/collectibles.json` 與 `research/substories.json`，各自以 SHA256 固定離線資料；`node games/like-a-dragon-infinite-wealth/prepare-data.mjs` 重建。原稿保留研究時的範圍敘述；新增逐點庫的查核與來源異說見[收集資料查核](docs/COLLECTIBLES_RESEARCH.md)。中文收集名與支線短題為本站導覽描述，不冒充官方譯名；支線資料來源與異說見[支線查核](docs/SUBSTORIES_RESEARCH.md)。

逐點勾選採既有 `objectives` map 的獨立穩定ID，schema與資料庫不變。1.0版的 `counters.photos`／`counters.memoirs` 保留為遊戲內手填總數；不與逐點完成數相加，不猜測哪幾點已完成。匯入舊備份缺少新ID時不刪本機逐點紀錄，未知資料與原文同樣保留。

驗證：`node games/like-a-dragon-infinite-wealth/verify.mjs`；根 `node scripts/verify.mjs`、`node scripts/build.mjs`、`node scripts/verify-site.mjs`；server啟動後 `node scripts/verify-lad8-browser.mjs`，只使用新 context 與合成進度。

逐點攝影與追憶已全數列入；沒有317敵人完整圖鑑、配方或寶箱位置庫。仍未進行 PS5 實機跳盃驗收，來源門檻異說明示於項目。1.0版已依使用者授權發布；2026-11-27使用者已授權1.1.0增補commit／push與既有main Pages發布；結果以對應提交Actions及正式資源核對為準。詳見 [實作紀錄](docs/IMPLEMENTATION.md)。

2026-11-27：1.2.0支線增補已在本機完成及驗證，2026-11-27使用者已授權本批commit／push及既有main Pages發布，結果以對應提交Actions與正式資源核對為準；既有schema1存檔直接沿用。


## 2026-11-27 中文優先調整

本機依共通介面偏好第20項，名稱、導航與攻略以中文為主，原文放後方或下一行小字對照；新增名稱為本站參考譯名，未逐項核對遊戲官方中文。原名、ID、schema與進度鍵保留，搜尋涵蓋中文及原文。

本模組詞彙維護於 `research/chinese-first.json`，修改後從 repo 根目錄執行 `node scripts/prepare-chinese-first.mjs`；資料驗證會檢查產物是否過期。

共用隔離檢查：`node scripts/verify-chinese-first-browser.mjs`。範圍、維護與驗證限制見[十款調整紀錄](../../docs/reports/CHINESE_FIRST_ALIGNMENT_20261127.md)。使用者已授權本批 commit／push；main push 將自動觸發既有 Pages 流程，結果以對應 Actions 為準。
