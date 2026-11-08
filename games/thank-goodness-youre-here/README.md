# Thank Goodness You're Here! 白金 Roadmap

PS5 本體；模組版本 1.4.0、攻略版本 1.3.0，進度 schema 1。遊戲識別碼為 `thank-goodness-youre-here`；沒有改動既有遊戲或獎盃 ID。33 個獎盃完整映射到 8 階段、60 個可追蹤成果；原有 100 段操作說明與全部 ID 保留。13 組跨階段追蹤引用同一份紀錄，不重複建立進度。

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

## 精簡成果追蹤 · 2026-11-08

依 [本次 UX 任務](../../GAME_COMPANION_PROGRESSIVE_ROADMAP_UX.md) 完成實作；2026-11-08 使用者已授權本批 commit／push，沿用 main 分支既有 Pages 流程，部署結果以對應 GitHub Actions 為準。保留既有綠灰外框、字體、角色辨識圖及原生 JS；只調整本遊戲，沒有新增模式切換、共用進度系統、依賴或 schema 遷移。

### 架構與操作差異

`guide.json` 新增 `stage.milestones`，按原路線將 100 段說明分成 60 個成果，完整保留原 `steps`、`sections`、獎盃、tracker、來源與查證狀態。`roadmap.js` 是純呈現索引，從原 `stepDone`／`trophyEarned` 推導完成、部分紀錄與提醒，不保存另一份進度。

| 情境 | 改善前 | 目前 |
| --- | --- | --- |
| 追蹤粒度 | 100 個步驟都需勾選 | 49 個操作成果＋11 個直接沿用獎盃狀態的確認成果 |
| 海鷗到酒館 | 六處海鷗＋返回酒館，共 7 次 | 一個「巡完海鷗路線，回酒館聽新對話」，1 次；7 段原說明完整保留 |
| 地面蝸牛巡查 | 購物與六個地面候選位置，共 7 次 | 一個成果，1 次；最後跳井與鼴鼠道別另列下一成果 |
| Bish 魚販 | 每次回訪一個步驟 | 每次回訪仍一個成果；三次跨章互動與 0/3 計數保留，沒有把每條魚再拆成勾選 |
| 閱讀層級 | 章節 → 段落 → 步驟 → 操作 | 章節 → 成果 → 操作說明；原 28 個段落不再另包一層 |
| 新進度開頁 | 8 章全展開 | 預設只展開當前章；未來章可自由展開，不要求先完成早期章 |
| 已完成章節 | 已可收成標題與數量 | 維持單行摘要，增加「已完成」辨識；未完成離開前核對不會被當成全章完成 |
| 推進提醒 | 每章固定提醒，已完成項也重複出現 | 7 個特定路線檢查點只列待處理事項；清空後不顯示空清單 |

未完成成果直接顯示地點、時機、原操作、具體成功判定與必要風險／補救說明；一般移動不另勾選。完成後保留標題、原核取與「查看已完成細節」，可取消完成或暫時回看。展開只存在頁面記憶體；重整依進度推導，搜尋／切章不寫進度，也不因勾選自動跳下一章。閱讀錨點排除已關閉章節內的隱藏節點，避免平板收合後選錯錨點而跳動。

### 舊紀錄與同步相容

- 不改 100 個既有 step ID、33 個 trophy ID、schema 1、IndexedDB 名稱／版本、雲端檔名或同步群組。沒有中央狀態，也沒有讀寫其他遊戲。
- 一個操作成果以既有 ID 集合的 `stepDone` 全部為 true 才算完成。`ProgressStore.setSteps` 在同一個既有 readwrite transaction 重新讀取最新紀錄並一次寫入整組，只增加一次 revision；取消整組明確保存 false。其他項目、未知資料與各分頁新編輯保留。
- 舊紀錄只完成部分時顯示中間狀態及已記錄數，內文標出已記錄位置；不自動補齊、刪除或遷移。手動確認整個成果後才一次完成其餘紀錄。同步或舊版分頁送來部分取消時同樣恢復部分狀態，不自行把整組改回完成。
- 11 個「確認已跳盃」成果只使用現有 `trophyEarned`，不再要求另一個操作勾選。舊 `stepDone` 仍保留；若舊流程有紀錄而獎盃沒記錄，顯示「舊流程已記錄；請另確認實際跳盃」，不假造已跳盃。因此舊 100 步全完成而 0 獎盃的資料會顯示 49/60 成果、0/33 盃，並非資料遺失。
- 其餘操作成果與實際跳盃仍獨立。跨章計數維持原有 stepIds／分母；合併勾選會一次計入同組相關舊紀錄，重複視圖不另加計。計數是攻略路線檢查，不能當作已實測的遊戲必要次數。
- 匯入、初始化、三方合併、Base／pending、逐次 grant 合成條件寫入驗證及 If-Match 保護不變。初始化仍將底層 100 個已知步驟與 33 盃設 false；畫面從 0/60 成果重新開始。舊備份仍經相同差異預覽與復原下載程序還原。
- SW cache v10 納入 `roadmap.js`，清理仍只限本遊戲前綴。離線與重新整理使用相同成果推導。

### 驗證與未查證內容

執行命令沿用下方「驗證」段。新增資料斷言覆蓋 60 成果完整依原序覆蓋 100 段、49/11 狀態來源、舊紀錄部分完成、檢查點只引用高風險項目；隔離瀏覽器增加整組單交易／儲存失敗回復、舊紀錄不自動補齊、跨視圖／跨分頁取消、完成後待處理提醒可見、四種寬度焦點／位置，以及跨裝置合成 Drive 的整組保存與初始化歸零。

2026-11-08 最終本機結果：根 `verify.mjs`（6 模組）、`verify-sync.mjs`、`build.mjs`、`verify-site.mjs` 通過；發布產物 622 檔、122 個本機連結。Thank Goodness 完整瀏覽器回歸 17 組、pageerror 0；根 `verify-browser.mjs` 的 Portal／四模組十寬度外框對照、EDF 兩作及同來源隔離亦通過。瀏覽器只用合成資料、新 contexts，並使用本次 `_site` 的獨立靜態快照，避免其他工作重建共用目錄干擾。技能 lint 及最終 1440／768／390px inspector 都為 0 FAIL／0 WARN，另檢查 320px 與完成／部分完成畫面。已查看全部 inspector 截圖。桌面新進度的預設頁長由約 23.5 螢幕降至 2.6 螢幕，主要來自未來章節預設收合，沒有刪除攻略。

提交前另以 HEAD 加上本批 12 檔建立隔離發布快照，排除其他工作的未提交變更；其資料／同步驗證、建置及產物檢查通過（620 檔、122 個本機連結）。Thank Goodness 執行資源逐檔與上述完整瀏覽器回歸的受測版本比對一致。

本次修改檔案：本模組 `dist/{guide.json,app.js,index.html,style.css,model.js,sw.js}`、新增 `dist/roadmap.js`、`module.json`、`verify.mjs`、本 README，以及根 `scripts/verify-thank-goodness-browser.mjs`；提交一併保留使用者提供的 `GAME_COMPANION_PROGRESSIVE_ROADMAP_UX.md`，供上方規格連結查閱。沒有修改雲端 adapter／core／session、根共用 store、其他遊戲或其文件。工作區另外存在的 Talos／Grounded 變更屬其他工作，保留原樣，不納入本批提交。

本次只改善 UX，沒有重新進行攻略文獻或 PS5 實機查證。原有 25 項 `unverified`、74 項 `consensus`、1 項 `verified` 的標記與原文完整保留，`lastVerifiedAt` 不冒用本次日期。以下仍需人工查證：

- 九處門是否涵蓋全部必要門、每門敲擊次數；七個蝸牛候選點的精確位置與跳井後回補性。
- 肉世界肉塊總數（不採「17」為確定值）、各收集完整條件及來源差異。
- Larry／Bobby／Nick 等回訪觸發旗標、固定次數與晚期能否補救；魚販各次完成反應與 PS5 實際跳盃。
- 蚯蚓是否必要（仍不計入五組森林動物分母）、原來標為待查證的屋頂／井道／工具取得路線。
- 第一次跳洞、肉世界離場與結局後，各事件實際不可逆程度；待查證的檢查點只作提醒，不硬阻擋主線。
- 真實 Google OAuth／Drive、個人手機觸控及 PS5 全白金流程；合成測試不代表正式 Google 或遊戲內容已驗收。

## 漸進式 Roadmap 收斂 · 1.3.0 歷史

2026-11-04 實作（模組 1.3.0、攻略 1.2.0，使用者已授權提交與推送，沿用 main Pages 發布流程，部署結果以對應提交的 GitHub Actions 為準）。依 [漸進收斂規則](../../docs/PROGRESSIVE_ROADMAP_UX.md) 與使用者本次直接實作授權，將既有 8 章、100 步按原路線分為 28 段，每段 1–7 步。`guide.json` 的 `stage.sections` 只新增標題及既有 `stepIds` 引用；不拆改原有步驟、順序、獎盃映射、警示或查證狀態。

- 未完成章節／段落／步驟預設完整呈現，可連續閱讀全部攻略並任意勾選；地點作為步驟標題，操作與時機留在內文。
- 完成一步，立即只留勾選、標題與必要風險標記；「查看詳情」可臨時回看完整操作及獨立獎盃勾選。回看不改進度，取消完成會恢復全文。
- 一段的全部已知步驟完成後，收起該段，只留標題與完成數；全章同理。判斷使用完整段落清單，不依搜尋結果或獎盃數計算。收起不代表已跳盃。
- 章節／段落選單可直接定位；「返回遊玩進度」前往全攻略第一個未完成步驟。「繼續下一步」保留原本從瀏覽章節往後找的規則。跳轉會開啟必要祖先；搜尋／篩選會展開符合內容，清除條件後恢復預設收斂。
- 以原位 DOM 更新與閱讀錨點補償減少勾選跳動；整段收起時將鍵盤焦點交回該段標題，不自動跳往下一步。臨時展開僅存在此頁記憶體，重整後依既有 `stepDone` 還原。

沿用各模組獨立介面，沒有共用中央 Roadmap 元件；本次只改 Thank Goodness。`stepDone`／`trophyEarned`、進度 schema、IndexedDB、匯入、初始化及手動 Drive 同步契約不變，`model.js` 只遞增模組版本。SW cache v9 保留原 namespace，離線也使用新版分段。真實 Google Drive、PS5 事件及個人裝置觸控手感仍待人工驗收。

介面維持現有綠灰 Framed sheet（技能 seed 167606527）；選用理由是既有外框及長時間單欄攻略，保留既有外框與字體。畫面回答「接下來還有哪段要做？」；辨識元素沿用角色小圖與路線分段，不新增裝飾或示範玩家資料。

本機驗證（2026-11-04）：資料驗證確認 28 段完整、唯一且依原序覆蓋 100 步；原攻略、獎盃、追蹤及來源逐項與 HEAD 比對不變。模組完整隔離瀏覽器回歸通過（17 組檢查，pageerror 0），含三層收合／回看／取消／重整／跨頁、搜尋／定位、1440／768／390px 勾選位置與焦點、原有備份／初始化／離線與合成 Drive 保護。技能 lint、三種寬度 inspector 均為 0 FAIL／0 WARN，已查看新進度與完成步驟截圖；完整長頁以多段及 viewport 截圖檢查，避免超出瀏覽器截圖高度限制。

## 獎盃中英名稱與計數

2026-11-03 新增（模組 1.2.0，攻略 1.1.0，使用者已授權提交與推送，沿用 main Pages 發布流程，部署結果以對應提交的 GitHub Actions 為準）。33 個獎盃以「英文｜繁中」並列於攻略、追蹤、獎盃清單與白金目標，並可用兩種名稱搜尋。依使用者提供的 [英文列表](https://www.exophase.com/game/thank-goodness-you-re-here-psn/trophies/) 與 [繁中列表](https://www.exophase.com/game/thank-goodness-you-re-here-psn/trophies/zh-TW/)，用一般瀏覽器讀取並以相同獎盃連結的 Exophase 數字 ID 核對。保留來源的「週餓不送信」「臉難中打」等原字樣，未由簡中轉換或自行翻譯。[33 項核對紀錄](docs/EXOPHASE_TROPHY_NAMES.json)保留兩頁網址、查閱日期與對照。Exophase ID 只用於來源核對，不是 PSN ID，也不取代已發布的 t00–t32。

12 個在多個步驟提及的獎盃，於每一處名稱後顯示全域計數；計數直接由該獎盃列明的 stepDone 推導，不因目前章節、搜尋／篩選或重複出現而改變分母。勾選加一、取消扣一，重整、跨分頁、匯入、初始化及手動同步後依現有步驟狀態重算；不額外保存另一份計數，也不自動改寫 trophyEarned。已跳盃與步驟滿格仍是獨立狀態。

| 獎盃 | 類型／分母 | 計數範圍與限制 |
| --- | --- | --- |
| Done Up Like a Kipper／魚滿盆滿 | 互動／3 | 依三次魚販互動的攻略勾選計算；實際跳盃仍需手動確認。 |
| Friend of the Forest／森林之友 | 動物／5 | 計算五組動物的攻略項目；蚯蚓是否必要仍待查證，另列提醒，不加入此分母。 |
| No Post on Thuesdays／週餓不送信 | 郵筒／6 | 計算六處郵筒的攻略勾選；不讀取遊戲內判定。 |
| Bobby Knocker／警察，快開門 | 路線檢查／9 | 這是攻略列出的九處檢查進度，並非已實測的必要敲門次數；沿途其他關門也應檢查。 |
| Cheek to Cheek／親密接觸 | 互動／3 | 依三次餐車互動的攻略勾選計算；實際跳盃仍需手動確認。 |
| The Rat Pack／鼠群 | 鼠群／3 | 計算三組老鼠的攻略項目；每組需聽到合唱。 |
| Mole Supper／鼴鼠大餐 | 流程步驟／2 | 記錄收到與取消邀請兩個事件；不是需要兩次晚餐或重複拍打的意思。 |
| Think F.A.S.T.／臉難中打 | 回訪檢查／6 | 這是六次路線回訪的檢查進度，未證實固定互動次數；只勾已聽完新對話的項目。 |
| The People's Princess／全民公主 | 流程步驟／2 | 記錄首次經過管道與最後打破紀念盤；不是兩趟管道就會跳盃，也不推定重走管道的固定次數。 |
| Everything Must Go／一個不剩 | 開店檢查／4 | 計算四個店面變化的路線檢查；不包含另一獎盃的窮困男子豆罐事件，也不代表固定購買或拍打次數。 |
| The Ol' One Two／連兩中 | 回訪檢查／7 | 這是七次路線回訪的檢查進度，並非已證實的必要敲亭次數；出現丟蛋把戲後再手動記錄獎盃。 |
| Shell Shocked／極度驚嚇 | 蝸牛／7 | 計算攻略列出的七個蝸牛檢查項目；部分位置仍待實機核對，先巡完地面再跳井。 |

森林動物只計五組，蚯蚓保守提醒不加入；Nick 的開店進度不含另一個豆罐獎盃事件。路線／回訪計數代表攻略檢查項目，未升級為已證實的遊戲內必要次數。紀念盤的兩個流程事件也不代表兩次經過即可跳盃。肉塊與花朵仍為原本的整段操作步驟，沒有逐物件勾選，因此不捏造肉塊／花朵分母。

此批僅新增攻略 metadata 與顯示，100 步的操作、順序、既有警示與查證狀態不變。儲存 schema／namespace、IndexedDB／Drive 邏輯及其他遊戲維持原樣；舊版備份可直接沿用原有匯入保護流程。SW cache 遞增為 v8，名字與計數可隨攻略離線使用。真實 PS5 跳盃與 Google Drive 仍須人工驗收。

本機驗證（2026-11-03）：根 verify／build／verify-site、模組完整隔離瀏覽器回歸通過，pageerror 0。新增檢查涵蓋 33 盃依 Exophase ID 對照、繁中搜尋、12 組計數的跨章／搜尋範圍／取消勾選／重整／跨分頁一致性、蚯蚓與未知項目排除、Nick 的豆罐不誤計、滿格與跳盃獨立；原有匯入、初始化與合成 Drive 回歸亦通過。攻略與獎盃清單於 1440／768／390px 無橫向溢出，已查看桌面與手機截圖；只使用合成進度及新 contexts。

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

2026-11-03 角色小圖（模組 1.1.2，使用者已授權提交與推送，沿用 main Pages 發布流程，部署結果以對應提交的 GitHub Actions 為準）：19 組極簡 SVG 辨識圖放在英文名字旁，以 24px 顯示，攻略、跨階段追蹤與相關說明共用名字對照。`Big Ron`／`Ron` 共用頭像，`Ronny` 獨立。Bobby 使用警察亭，Sue 保留參考中的背影，Graham 窗內造型仍待實機核對；[角色外觀來源與限制](docs/CHARACTER_PORTRAITS.md)有逐一紀錄。名字仍是原文，圖示不影響搜尋、輔助朗讀與核取操作。攻略資料與進度／同步邏輯不變，SW cache v7 包含本機圖示及對照程式。

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

視覺檢查沿用 Portal 的 Segoe UI／微綠底色，以階段順序與檢查點為主，桌機／平板／手機均測。1.4.0 保留原綠灰 Framed sheet 方向，將風險改以文字與底色表達；不再需要初版紅／橙 emoji 的檢查例外。長清單文字靠左、計數靠右，維持原有閱讀習慣。

2026-10-31 本機結果：新模組資料檢查、根 verify／build／verify-site、EDF 的 verify-sync、verify-browser、verify-sync-browser 及 Mycopunk 隔離瀏覽器皆通過。新模組隔離瀏覽器測試通過、pageerror 0；含缺 ETag／忽略條件的伺服器阻擋、壞進度原文下載。25 個單一來源或有爭議步驟標為 unverified，74 個為 consensus，1 個白金核對步驟為 verified；33 個獎盃列表資料另已核對。真實 Google 與 PS5 遊玩未驗收。

本次新增本模組的 manifest、README、資料驗證器、`dist/{index.html,style.css,guide.json,model.js,app.js,sw.js,cloud-config.js}` 與五個 shared 檔；新增 `scripts/verify-thank-goodness-browser.mjs`。根 `scripts/verify.mjs`／`verify-site.mjs` 接入必要模組檢查，`verify-browser.mjs` 將 Portal 寫死的三款改成依 registry 驗證完整入口；根 README／ARCHITECTURE 補上整合說明。其他遊戲來源未改動；其他未提交工作不納入本次發布。
