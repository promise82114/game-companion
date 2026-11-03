# The Talos Principle II · 本體白金 Roadmap

2026-11-04，模組 1.2.3，內容版本 `2026.11.04.2`。本體 60 獎盃（含白金），Road to Elysium 的 9 個 PS5 獎盃排除。本模組是新工具，沒有搬動舊 repo、攻略或既有 ID。

各區探索拆成可辨識的動作：進入失落實驗室、操作電腦開啟文字、下載兩位人物的錄音，以及碰觸戶外的過去人物光影。E1／E2 明示沒有光影，W2 明示先備份才進實驗室；P7 收尾核對採相同用語。

Purple 的位置改為考古花園，以中央塔電梯出口往左的方向與藤蔓舊磚牆、拱形開口、棕櫚樹及短階梯上方作為辨識地標，取代不準確的「博物館後方」。場景圖與查證限制保留於來源頁。

步驟與三市長追蹤只提供「未開始／完成」勾選，移除略過、不確定、已錯過的按鈕與下拉選單。舊狀態仍可讀取、匯出及同步；未完成的舊狀態顯示為未開始並納入下一步，使用者勾選時才更新該項，保留筆記與未知欄位。

上方「拒絕謎語」預設關閉，勾選一次就直接顯示各題解法與 SVG，不需逐題展開。八階段共 58 個主步驟，沿路排列 212 個可勾選解題項目：12 區全部 132 題正規／遺失／金門、序章 12 題與 3 道拼門、12 組橋樑、24 顆星星、巨構與終局、Miranda、文字冒險、Rand 測試及博物館可選謎題。212 是本網站拆分的追蹤數，不是遊戲官方謎題總數。

逐題完成與主步驟、獎盃各自記錄；「繼續下一步」可回到已完成主步驟內尚未勾選的謎題。選擇與進度沿用 schema 1：`settings.showSolutions` 與 `steps['puzzle-'+id]`，不重建 IndexedDB、不改同步協定；舊版未知欄位仍保留。九面拼塊盤有字母格 SVG，Seesaw／Loop／Switcheroo 有桌面及手機流程圖。每題附查證來源；Ghosts of Atlantis 魔法師第二句已由[實際遊戲終端紀錄 03:59](https://www.youtube.com/watch?v=pB1VTo02kB4&t=239s)確認為 without being annihilated，補上原文並移除該題待查證。所有解法未經 PS5 逐題實測。

攻略步驟直接顯示操作與前置，不再逐步收合；來源、驗證與補救紀錄集中於「來源與查證」。步驟下的獎盃方塊可直接勾選，與獎盃清單及其他出現位置共用既有 `trophies` 狀態，不代填步驟完成。個人註記介面已移除，舊筆記仍隨原進度與備份保留。

右上「備份與還原」只保留本機 JSON 匯入／匯出、完整備份匯出與 Google Drive 同步入口。選檔後直接進既有差異預覽；保留兩端原文、下載復原包、確認與過期檢查。雲端沿用原本的手動同步及每次授權安全閘門，未新增單向無條件覆寫。

本體 60 盃依使用者提供的 Exophase 英文／繁中頁，以同一獎盃連結 ID 配對名稱。清單、攻略獎盃對照與三市長顯示「英文（繁中）」，攻略搜尋支援繁中名稱。`dist/trophy-names.js` 保存原文與來源日期；`exophaseId` 僅為來源識別，不冒充官方 PSN ID，進度鍵不變。

本次補強三市長：Doge 七題英文、Rand N1／S1 私訊、城市 Damien／Atal／Malduc 與簡報、W2 三條完整決策順序及 PS5 入口備份／還原。58 筆逐項選項分別標記英文證據與適用性；缺少原文直接顯示待查證，不用翻譯冒充英文。現有 57 步驟 ID、schema 1 與同步契約不變，合成 1.0.0 進度可繼續使用。

入口 `/game-companion/games/talos2/`，支援 `?view=roadmap`、`?view=trophies`、`?view=backup`、`#step-w2-backup` 與 `#puzzle-E2-main-8` 等穩定深連結。Portal 由既有 build 自動列入。

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

- `dist/data.js`：八階段、58 步驟、60 本體獎盃、三市長與查證來源。保留原 57 步驟 ID，新增 Prometheus 救援節點。
- `dist/puzzle-data.js`：212 個解題項目、順序、中文操作摘要、逐題來源與九面拼塊盤格形。
- `dist/roadmap/solutions.js`：逐題勾選與劇透控制、原創 SVG 呈現；關閉時不輸出解法 DOM。
- `dist/trophy-names.js`：本體 60 盃的來源中英名稱與統一顯示文字。
- `dist/mayor-research.js`：三市長逐項查證、來源衝突與 PS5 手動備份順序，以原 ID 補強資料。
- `dist/roadmap/evidence.js`：可重用原文／待查證／來源呈現，不增加進度欄位。
- `dist/roadmap/model.js`：可重用的步驟狀態、篩選、摘要與階段風險計算，不包含 Talos 專屬判斷。
- `dist/roadmap/store.js`：獨立 IndexedDB 與交易；`steps`、`trophies`、`backups`、`branches`、`settings` 分開保存。
- `dist/roadmap/sync.js`：手動同步 UI；沿用相同 GIS OAuth client 及 Drive appDataFolder adapter。
- `dist/shared/`：從 EDF 安全版本沿用。auth／adapter／envelope 未更動；sync-core 的群組改為 Roadmap 群組；sync-session 改成等待 IndexedDB 的非同步交易。
- `dist/app.js`、`index.html`、`style.css`：模組自己的畫面。沒有新增 SW，也不清理其他模組 cache。

原專案沒有共用獎盃模型或既有 IndexedDB，故新增此模組的交易儲存，不假稱曾沿用不存在的 API。資料庫 `game-companion.talos2.progress.v1`，store `records`，主記錄 `progress`；快照／匯入原文鍵分別以 `game-companion.talos2.snapshot.`／`game-companion.talos2.import.raw.` 開頭。Drive 檔名與 localStorage 同步 Base／pending／復原全部使用 `game-companion.talos2.` namespace，帳號 Base 另以 permissionId 的 SHA-256 隔離。

本次內容更新不需儲存遷移。schema 1 保留未知欄位及未知步驟／獎盃 ID；版本不相容或損壞時停止，不用空資料覆蓋。可匯出原始記錄。匯入在寫入前保存兩端原文、顯示新增欄位與衝突、逐筆／批次選擇、下載復原包、手動確認，再以原始版本交易條件套用；過期或備份失敗停止。完整復原匯出含快照、匯入原文與本模組 sync 原文；復原包本身不直接覆寫，需將選定的 progress／sourceRaw 經一般匯入預覽。

Drive 保留每次 grant 合成檔驗證、strong If-Match、412、競爭測試、首次配對、三方衝突、過期預覽、同步期間新編輯與結果未知修訂核對。沒有自動登入／上傳；正式 Google 驗證仍須使用者在正式網域進行。

## 攻略限制

已確認／共識／待查證均逐步標記。三市長的前期條件、W2 區域流程與各結果分開記錄，不能以一個 W2 備份保證任意既有進度都能拿三盃。PS5 備份只記錄使用者手動確認，清單 JSON／Drive 不包含 PS5 存檔。

官方逐盃數字 ID 尚無可靠對照。`trophyRefs` 是網站自有的穩定英文名稱鍵，`officialId: null`，步驟 `trophyIds: []`；沒有把清單排序或第三方網站 ID 冒充官方 ID。所有本體獎盃均有名稱對照與手動狀態。完整證據、限制與測試見 [查證與整合報告](docs/RESEARCH.md)。
