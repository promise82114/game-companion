# Thank Goodness You're Here! 白金 Roadmap

PS5 本體；模組版本 1.1.1、攻略版本 1.0.0，進度 schema 1。新遊戲識別碼為 `thank-goodness-youre-here`；沒有改動既有遊戲或獎盃 ID。33 個獎盃完整映射到 8 階段、100 個步驟，13 組跨階段追蹤的子項直接引用同一步驟，不重複建立進度。

入口：`/game-companion/games/thank-goodness-youre-here/`。根目錄 `node scripts/build.mjs` 自動產生 Portal 入口，不需修改路由或集中登入。2026-10-31 使用者授權將本模組獨立 commit、push 並透過既有 main 分支 Pages 流程發布，排除其他未完成工作。[正式測試入口](https://promise82114.github.io/game-companion/games/thank-goodness-youre-here/)；部署結果以對應提交的 GitHub Actions 為準。

## 架構與資料

- `dist/guide.json`：可維護的攻略內容、33 獎盃、順序、警示、來源與每筆查證狀態；UI 不解析 Markdown。保留官方獎盃名稱，包括 `No Post on Thuesdays` 的原拼字。category 區分白金／主線／支線，沒有自行推測各盃的金銀銅等級。
- `dist/model.js`：本遊戲的 IndexedDB 交易與匯入保護。資料庫 `game-companion.thank-goodness-youre-here.progress.v1`，`state` 保存進度，`archives` 保存快照與兩端原文。既有 EDF／Mycopunk 沒有可共用的 IndexedDB／獎盃層，因此新增最小 adapter。
- 進度 `{app,gameId,platform,scope,schema,moduleVersion,revision,updatedAt,stepDone,trophyEarned}`；兩個 map 的值為 boolean，缺項代表未記錄。取消勾選會保存 false。未知 ID 與額外欄位保留。首次使用為 0/33，不覆寫既有資料，壞資料或未支援版本停止載入並可下載原文。
- 修改以 IndexedDB readwrite 交易重新讀取最新進度後改單一 map；BroadcastChannel 更新其他分頁。同步完成也在同一交易內 rebase 到最新本機資料，保留同步期間新編輯。
- `dist/shared/` 沿用 EDF 的 OAuth、進度 envelope、Drive adapter、三方合併與 session。OAuth／Drive adapter／envelope 與 EDF 原檔相同；sync-core 僅將群組改成 `stepDone`／`trophyEarned`，session 加上等待 IndexedDB refresh／checkpoint／commitSync。既有模組完全不改。
- 同步 Base／pending／結果未知復原資料沿用 localStorage，但只使用 `game-companion.thank-goodness-youre-here.sync.*`。每款遊戲／帳號的 Base 分開。Drive 名稱 `game-companion.thank-goodness-youre-here.progress.v1.json`，不是中央同步服務。
- 匯入先將兩端原文持久化，預覽重疊值的差異，要求下載復原檔並確認保存。單邊欄位保留；預覽過期、持久化或下載 API 失敗不套用。復原檔可直接選擇本機／來源端再走相同預覽流程。完整匯出包含所有 archives 與此 namespace 的 sync recovery；不包含 OAuth token。
- `dist/sw.js` 只快取本模組資源，只清自己的 `game-companion.thank-goodness-youre-here.assets.*` 前綴。Google OAuth 不做離線快取。新版本更新 ASSETS 或攻略時須遞增 CACHE 版本，確保離線內容一起更新。

## 初始化紀錄與下一輪遊玩

2026-11-02 新增（模組 1.1.0）：第一輪完成、準備再玩另一版本時，由右上「備份與還原」底部按「初始化紀錄」。使用者已授權本批功能、測試與文件提交及推送，沿用 main 的 Pages 發布流程；部署結果以對應提交的 GitHub Actions 為準。

1. 核對目前完成數，按「下載初始化前備份」，確認 JSON 已保存。
2. 勾選確認，再按「確認初始化紀錄」。下載或本機快照儲存失敗時停止；預覽後有其他分頁編輯，也會停止並要求重新開啟。
3. 已知 100 個步驟與 33 個獎盃會各自記為 `false`，回到第一章、清除搜尋與篩選。重新整理後仍可從零開始，跨階段追蹤會隨對應步驟歸零。
4. 若使用 Drive，先完成第一輪同步再初始化，之後按「立即同步進度」送出重設，其他裝置也要手動同步接收。初始化不自動上傳；首次配對若有差異，需核對後選擇要保留的本機重設結果。

初始化前原文快照與新進度在同一 IndexedDB 交易保存，任一寫入失敗都不重設。既有 archives、未知 ID／額外欄位、同步 Base／pending 與其他遊戲資料保留；不刪除資料庫或重建同步配對。明確的 `false` 可由既有三方同步傳遞，避免以「刪除紀錄」造成舊勾選回填。同頁同步處理中不能初始化。

需要回看第一輪時，以剛下載的 `thank-goodness-before-reset-*.json` 經原有匯入差異預覽、備份與確認流程還原。這是手帳紀錄的備份，不會重設或還原主機遊戲存檔。

本機驗證（2026-11-02）：資料／同步回歸、build／verify-site 及模組隔離瀏覽器均通過。新增測試涵蓋取消、下載失敗、快照配額失敗的交易回復、跨分頁過期預覽、100／33 歸零、未知欄位與 Base／pending 保留、重整與第一輪還原、1440／768／390px 確認視窗及鍵盤；以兩個獨立 browser contexts 與合成 Drive 驗證手動同步歸零、不自動上傳、不回填舊勾選。沒有操作正式玩家資料或真實 Google。

## 查證與限制

2026-11-03 閱讀調整（模組 1.1.1，使用者已授權提交與推送，沿用 main Pages 發布流程，部署結果以對應提交的 GitHub Actions 為準）：攻略與跨階段追蹤的每個步驟直接顯示操作、地點與觸發時機，本章離開前提醒亦直接顯示，省去逐項展開。逐步驗證方式、重複的錯過後說明及來源連結集中在「來源與查證」的「逐步查證紀錄」；主攻略保留容易錯過／不可逆與待查證警示，不將未查證內容升級為已確認。攻略原文、100 個步驟與 33 個獎盃映射、儲存及同步契約不變，SW cache 遞增至 v6。

本機驗證（2026-11-03）：根 verify／build／verify-site 與模組隔離瀏覽器回歸通過，pageerror 0。確認時機及本章提醒直接顯示、100 項查證資料移至查證頁且瀏覽不改進度，並回歸獨立勾選、備份、初始化、跨分頁與合成 Drive 同步。檢查 1440px／390px 截圖，四種測試寬度均無橫向溢出；未操作真實 Google 或玩家資料。

查閱日期 2026-10-31，代表文獻查證，非 PS5 實機驗收。完整來源連結與存取限制見 `dist/guide.json`，頁面「來源與查證」亦可讀。

- `verified`：PS5 33 項獎盃列表與白金條件的資料核對；不代表已測試跳盃。
- `consensus`：玩家攻略與流程交叉核對，尚待 PS5 遊玩驗收。
- `unverified`：有具體候選位置但來源單一或互有衝突，畫面明確顯示待查。

主要來源為 [Forgotten Lands](https://steamcommunity.com/sharedfiles/filedetails/?id=3303349698)、[The Fool](https://steamcommunity.com/sharedfiles/filedetails/?id=3302801903)、[PlatGet](https://platget.com/guides/thank-goodness-youre-here-trophy-guide/)、[Neoseeker](https://www.neoseeker.com/thank-goodness-youre-here/Walkthrough_Part_II) 與 Prima 的實機截圖攻略。PlatGet 直接頁面有驗證牆，只核對可讀搜尋索引；Steam 部分段落 WIP，另一頁有移除提示。YouTube 僅看作者章節，沒有假稱完整觀看。

原草稿已修正為：短結局 → 新開主線 → 首圈廣場 → 扳手／市場 → 螺絲起子 → Charlie 柵欄 → 肉世界／大派／豆罐 → 肥料前拜訪房屋 → 槌子／鴨子／花／炸鍋 → 牛奶／馬鈴薯 → 氣泡購物／蝸牛 → 末圈魚販／餐車／酒館／警察／豆罐 → 送湯／結局。

不將「22 可錯過」、「九門每門三下」、「17 肉塊」、「七蝸牛的全部精確位置」、酒館／警察固定次數當成已實測。森林列五組多來源共識，蚯蚓另列保守提醒，不沿用七隻的說法。重要斷點均附來源：離開接待室、第一次跳洞、首次貨架、Charlie 柵欄、肉世界、肥料袋、馬鈴薯、蝸牛跳井、送湯前。33/33 均有操作映射；所有 tracker 子項均連到獨立核取步驟。

人工仍需驗證 PS5 各事件實際跳盃、所有門與蝸牛位置、肉塊數量、回訪觸發旗標與錯過後可回訪性。約 3–6 小時只是來源估計；短結局另需約 15 分鐘並重新開局。

Drive 每次 OAuth grant 先建立獨立合成檔，驗證強 ETag、過期寫入 412、競爭一勝一拒與內容一致，才允許本遊戲進度寫入。mock 通過不能視為真實 Google 已通過；須由使用者在正式網域驗證 OAuth origin、權限、ETag／CORS 與跨裝置同步。

## 驗證

在 repo 根目錄：

```powershell
node games/thank-goodness-youre-here/verify.mjs
node scripts/verify.mjs
node scripts/verify-sync.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
$env:PORT='4193'; node server.mjs
# 另一終端；可設定 TEST_BASE_URL（含 /game-companion/）
node scripts/verify-thank-goodness-browser.mjs
```

沿用現有 Playwright／Edge，無新增測試框架或產品依賴。只用合成資料與全新 browser contexts。測試包含 33 盃映射、實際順序約束、分開勾選、取消勾選、跨頁交易、重整與離線、未知欄位、壞檔拒絕、備份可恢復、過期匯入、下載失敗、儲存交易失敗與 Drive 合成回歸。輸出在忽略追蹤的 `outputs/thank-goodness/`。

視覺檢查沿用 Portal 的 Segoe UI／微綠底色，以階段順序與檢查點為主，桌機／平板／手機均測。紅／橙警示符號依使用者要求保留；檢查器的 emoji 項為有意例外。其餘版面檢查無 FAIL；長清單文字靠左、計數靠右的空間屬閱讀用途。

2026-10-31 本機結果：新模組資料檢查、根 verify／build／verify-site、EDF 的 verify-sync、verify-browser、verify-sync-browser 及 Mycopunk 隔離瀏覽器皆通過。新模組隔離瀏覽器測試通過、pageerror 0；含缺 ETag／忽略條件的伺服器阻擋、壞進度原文下載。25 個單一來源或有爭議步驟標為 unverified，74 個為 consensus，1 個白金核對步驟為 verified；33 個獎盃列表資料另已核對。真實 Google 與 PS5 遊玩未驗收。

本次新增本模組的 manifest、README、資料驗證器、`dist/{index.html,style.css,guide.json,model.js,app.js,sw.js,cloud-config.js}` 與五個 shared 檔；新增 `scripts/verify-thank-goodness-browser.mjs`。根 `scripts/verify.mjs`／`verify-site.mjs` 接入必要模組檢查，`verify-browser.mjs` 將 Portal 寫死的三款改成依 registry 驗證完整入口；根 README／ARCHITECTURE 補上整合說明。其他遊戲來源未改動；其他未提交工作不納入本次發布。
