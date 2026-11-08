# The Talos Principle II · 本體白金 Roadmap

2026-11-08，模組 1.6.2，內容版本 `2026.11.08.5`。本體 60 獎盃（含白金），Road to Elysium 的 9 個 PS5 獎盃排除。本模組是新工具，沒有搬動舊 repo、攻略或既有 ID。

巨構沿路搭橋：東 7／北 9／南 11／最終 Utopia 1，共 28 段、97 塊，分別放在前進途中，沿用原 waypoint 勾選與完成收合；原有 31 個 waypoint、212 個謎題與玩家紀錄保留。位置及過橋去向直接展開，放塊順序隨「拒絕謎語」顯示；北側風扇後與南側爬升橋補上中途走位。23 段仍缺旋轉軸／方向／次數等細節，逐橋列明；Dystopia 替代出口的順序仍待查證，不套用 Utopia 順序。西側第一次救援核對為既有橋通道。來源覆核不是 PS5 實機驗收；使用者已授權此批 commit／push 與正式發布，結果以對應 Pages 流程為準。

UX 健檢（使用者已授權提交／推送，部署結果以對應 Pages 流程為準）：首屏整合下一個具體目標、待完成主步驟、風險與 PS5 備份入口；完成父項不再隱藏未完成子項，整個片段全部完成才自動收合。跨頁返回保留搜尋、篩選與閱讀位置。分歧頁分開顯示路線操作、實際獎盃與待查證遊戲旗標；PS5 手動備份紀錄與網站進度備份分別命名。三個特殊解法獎盃依 PS5／Steam 攻略改列可在終端重試；來源衝突仍標待查證。完整證據與驗收見根目錄 `TALOS2_UX_AUDIT_REPORT.md`。

截至 1.6.1，212 項謎題均已覆核：200 項完成來源逐步對照，12 項仍缺精確細節；來源對照不等於 PS5 實機驗收。下方 1.5.x 敘述保留作為歷程。

星星定位補強（2026-11-08 使用者已授權提交／推送，發布結果以對應 Pages 流程為準）：本體 24 顆星星新增 101 段起點、觀察站位、機關與途中地標說明，其中 100 段可對應地圖 P 點；E2 林中中繼柱平面落點未核實，不落假點。讀到星星會自動顯示同一條路線，手機可從「看位置」開圖；圖幅隨路線收近，區分領星雕像、追逐藍光與跳題 Spark。N2 金色環架、三座小人像、N3 柱頂 RGB 站位與遠端水中雕像加上地標；E2／S1 固定接點補可辨識外觀。另更正 S2 Question Block／Stowaway 原本配反的地圖位置。保留原 24 顆星星 ID 與收集計數，不為導航點新增完成欄位；詳細來源與限制見 `docs/RESEARCH.md`。

1.5.2 擴大檢查逐題攻略：212 項完成文字風險檢視，29 項已與來源逐步比對，其餘 183 項仍待逐步覆核，沒有宣稱全攻略已驗證或實機重現。另補強 E3-6、N2-3／8、S1-3／6／Aerial Warp 的搬運、換壓與繞行，修正終局第三／第四個 Dystopia 輪盤的分段，以及最後 Utopia 輪盤重複換物。查證頁按題目列出覆核層級與修正紀錄，不在遊玩頁新增反覆提示或操作。

1.5.1 修正 N2 正規 6 Reconnaissance 的搬運解說：明確區分入口壓板 A／內側壓板 B、空手穿紫屏與設備繞藍門的路線、鑽孔器與 RGB 換壓順序，以及蓄能器由藍改綠後才產生紅光。依原圖文與關鍵遊戲畫面核對，保留 `N2-main-6` 與既有進度；未宣稱 PS5 實機驗收。

城市三次到訪、博物館、島上基地及東／北／南／西／最終巨構新增 14 張原創示意圖，連同戶外共 26 張。31 個沿路目標依人物、終端、主線與撤離順序穿插於原題目之間；行走指引不受「拒絕謎語」遮蔽，完成仍自然收合。北側巨構與西側救援另立片段，保留全部已發布步驟與 212 個謎題 ID；北側舊題目深連結改由新片段承接。

桌面地圖預設由 300px 放大為約 400～520px，隨閱讀切換入口／核心範圍。室內圖表達通路或任務順序，不假造樓層座標。未核對的位置保留待查證，尤其北側撤離逐轉角、Cornelius 工作電腦座位、Act V 招募人物座標。Overload 修正至 E2 Lost Lab 讀 Schematic_108 後提醒，原先西側取得的敘述錯誤。

左列「遊玩 Roadmap」下提供 P0～P7，當前章節再列區域／劇情子分類，共 26 個閱讀片段。正文只渲染所選片段；全域搜尋顯示跨章節結果，點擊後進入對應片段。舊步驟、謎題與收集深連結仍可直接使用。「繼續下一步」由本片段往後找；「回到遊玩進度」依實際勾選／計數時保存的 `settings.playAnchor` 返回，不把提前閱讀視為完成。

依 `docs/PROGRESSIVE_ROADMAP_UX.md` 的漸進式收斂規則：未完成主步驟、謎題與固定收集物直接顯示內容；完成後只保留標題與狀態，可臨時查看詳情，取消完成即恢復。臨時展開不寫入進度，重新載入後按完成狀態收斂；目標深連結會展開必要父項。主步驟勾選不代填子項，若尚有子項未勾會明示數量；下一步仍可找到它們。不可逆／分歧與特殊解法警示保留，收合也不自動捲往下一項。內容縮短時以原勾選位置維持視窗，必要尾部空間會在展開或換頁時釋放。

獎盃清單新增同一 Exophase 連結 ID 核對的 60 盃繁中說明與等級，附自有取得步驟、相關路線和特殊題完整操作。錄音、實驗室、光影、文字、遺物、社群閱讀、文字冒險及解題目標由既有紀錄衍生；不自動勾選實際獎盃。社群實讀數量另存 `settings['collection-text-SOCIAL']`，不混入終端文字。名稱／已發布進度 ID 不變。

十二個戶外區域提供原創 SVG 示意圖，逐張參照 Cognition 的地圖核對交通艙、塔、正規／Lost／黃金謎題、錄音、實驗室、光影與已知遺物候選點；不部署或嵌入原圖。桌面正文旁固定顯示，平板／手機也直接顯示行內圖，長頁可由常駐地圖按鈕開啟，可看全圖或放大捲動。閱讀到謎題／收集物時會標出對應位置，圖上標記可跳回該項；P7 黃金謎題也可切換對應區域地圖。線條與間距經簡化，不代表精確路徑、距離或高低差；上方沿用來源的抵達朝向，不等於北方，N 箭頭標示概略北向。

時間順序也調整為先提示再操作：E2 的 Seesaw／Loop、S1 Switcheroo、N2 Somnodrome 與 W2 備份均在相關區域題目之前；Doge 配對由 E2 起提示，不固定等 E3。第一件遺物與首座 Pandora 提前至 E1、首座 Sphinx 至 E2、第一個人物光影至 E3；全標準謎題的 120 題目標在 W2 先提醒，P7 保留收尾核對。

新增「收集清單」頁與 Roadmap 各區收集區塊。12 區分別顯示實驗室、Trevor／Lifthrasir 錄音、人物光影與星星的已收集／總數；固定追蹤共 80 項（12＋12＋12＋20＋24）。E1／E2 各 5 項，其餘每區 7 項；全部勾選才顯示該區已收齊。56 個新項目直接附中文位置、互動動作與來源位置圖，24 顆星星共用原解題進度，沒有重複保存。舊版已完成的區域不代填新收集。

文字在各區輸入實際數量，城市／巨構文字另有一欄；遺物依具名物品勾選，全域對照 30 份文字、10 件遺物的獎盃目標。這兩個數字不是遊戲全部物件總量，不列入固定 80 項或自動勾獎盃。遺物的 19 個攻略候選位置對應 14 個已列出的具名物品（非全遊戲總量），同一物品共用勾選與地圖取得標記；候選點不保證有物品，N1／W3 位置仍待查證，不能視為零。各區文字總量也未核實。

固定收集勾選沿用 `steps['collectible-'+id]`，遺物使用 `steps['artifact-'+artifactId]` 的原有狀態結構並附 `foundIn` 記錄勾選當下區域；手動計數沿用 `settings['collection-text-'+region]`／`settings['collection-artifact-'+region]`；schema、IndexedDB 與 Drive 協定不變，保護式匯入、跨分頁更新與手動同步沿用既有機制。

各區探索拆成可辨識的動作：進入失落實驗室、操作電腦開啟文字、下載兩位人物的錄音，以及碰觸戶外的過去人物光影。E1／E2 明示沒有光影，W2 明示先備份才進實驗室；P7 收尾核對採相同用語。

Purple 的位置改為考古花園，以中央塔電梯出口往左的方向與藤蔓舊磚牆、拱形開口、棕櫚樹及短階梯上方作為辨識地標，取代不準確的「博物館後方」。場景圖與查證限制保留於來源頁。

步驟與三市長追蹤只提供「未開始／完成」勾選，移除略過、不確定、已錯過的按鈕與下拉選單。舊狀態仍可讀取、匯出及同步；未完成的舊狀態顯示為未開始並納入下一步，使用者勾選時才更新該項，保留筆記與未知欄位。

上方「拒絕謎語」預設關閉，勾選一次就直接顯示各題解法與 SVG，不需逐題展開。八階段共 58 個主步驟，沿路排列 212 個可勾選解題項目：12 區全部 132 題正規／遺失／金門、序章 12 題與 3 道拼門、12 組橋樑、24 顆星星、巨構與終局、Miranda、文字冒險、Rand 測試及博物館可選謎題。212 是本網站拆分的追蹤數，不是遊戲官方謎題總數。

逐題完成與主步驟、獎盃各自記錄；「繼續下一步」可回到已完成主步驟內尚未勾選的謎題。選擇與進度沿用 schema 1：`settings.showSolutions` 與 `steps['puzzle-'+id]`，不重建 IndexedDB、不改同步協定；舊版未知欄位仍保留。九面拼塊盤有字母格 SVG，Seesaw／Loop／Switcheroo 有桌面及手機流程圖。每題附查證來源；Ghosts of Atlantis 魔法師第二句已由[實際遊戲終端紀錄 03:59](https://www.youtube.com/watch?v=pB1VTo02kB4&t=239s)確認為 without being annihilated，補上原文並移除該題待查證。所有解法未經 PS5 逐題實測。

未完成攻略直接顯示操作與前置，完成後按上述規則收斂；來源、驗證與補救紀錄集中於「來源與查證」。步驟下的獎盃方塊可直接勾選，與獎盃清單及其他出現位置共用既有 `trophies` 狀態，不代填步驟完成。個人註記介面已移除，舊筆記仍隨原進度與備份保留。

右上「備份與還原」只保留本機 JSON 匯入／匯出、完整備份匯出與 Google Drive 同步入口。選檔後直接進既有差異預覽；保留兩端原文、下載復原包、確認與過期檢查。雲端沿用原本的手動同步及每次授權安全閘門，未新增單向無條件覆寫。

本體 60 盃依使用者提供的 Exophase 英文／繁中頁，以同一獎盃連結 ID 配對名稱。清單、攻略獎盃對照與三市長顯示「英文（繁中）」，攻略搜尋支援繁中名稱。`dist/trophy-names.js` 保存原文與來源日期；`exophaseId` 僅為來源識別，不冒充官方 PSN ID，進度鍵不變。

本次補強三市長：Doge 七題英文、Rand N1／S1 私訊、城市 Damien／Atal／Malduc 與簡報、W2 三條完整決策順序及 PS5 入口備份／還原。58 筆逐項選項分別標記英文證據與適用性；缺少原文直接顯示待查證，不用翻譯冒充英文。現有 57 步驟 ID、schema 1 與同步契約不變，合成 1.0.0 進度可繼續使用。

入口 `/game-companion/games/talos2/`，支援 `?view=roadmap&stage=P1&section=E2`、`?view=collectibles`、`?view=trophies`、`?view=backup`、`#step-w2-backup`、`#puzzle-E2-main-8`、`#collection-region-E1` 與 `#collectible-e1-lab` 等穩定深連結。Portal 由既有 build 自動列入。

2026-10-31 使用者已授權 commit、push 及正式發布。模組已接入既有 main 的 Pages 流程；部署結果以 [GitHub Actions](https://github.com/promise82114/game-companion/actions/workflows/deploy.yml) 為準。[正式測試入口](https://promise82114.github.io/game-companion/games/talos2/)；PS5 與真實 Google 的驗收仍由使用者執行。

## 遺物共用勾選與常駐獎盃 · 2026-11-04

模組 1.4.1；使用者已授權本批提交與推送，沿用 main 的 Pages 流程，部署結果以對應 GitHub Actions 為準。依使用者回饋，步驟完成後只收起說明，獎盃名稱、攻略計數與實際獎盃勾選保留於外側；三者繼續各自記錄。

19 個既有候選點新增明確的 `artifactId`，物品表 `humanArtifacts` 定義 14 個網站內穩定身分；三輪車、不明機器、船錨、廂型車與大型電玩機台的兩處候選點各共用一筆紀錄。清單直接說明「候選位置不保證有物品」，取得後顯示已在何區記錄、此處不用再找。任一區勾選或取消，其他區、收集總覽及十二區 SVG 使用相同狀態；地圖以綠色與勾號呈現，手機地圖開啟中收到跨分頁變更也會更新。既有候選點 ID、深連結與位置原文不變。

具名勾選只計一次，不加入固定 80 項，也不自動勾獎盃。舊版各區手動件數原樣保留在「手動紀錄（舊進度／清單外物品）」；舊數字無法推定哪些物品已取得，因此不代勾，也不與具名勾選相加。獎盃目標顯示取「已勾選種類數」與「手動總數」較大值，頁面並列兩者供核對；要補記清單外物品時，手動數字應填實際總件數（含已勾選者）。

本次沒有資料遷移、改寫舊件數、修改共用 IndexedDB store 或 Drive adapter。新身分使用既有 `steps` 群組，可由原交易、保護式匯入與手動三方同步保存；未知物品／欄位繼續保留。`dist/roadmap/artifacts.js` 集中物品進度鍵、已取得判斷與相容計數，供收集清單與地圖共用，避免從顯示名稱臨時推導 ID。

候選點及 Scenario 配對重新比對 [Hanni 原攻略](https://steamcommunity.com/sharedfiles/filedetails/?id=3069750588) 的 Human Artifacts 段落（2026-11-04）；該段明示位置隨遊戲而異且清單不完整。這是網站紀錄的共用規則，未新增固定出生保證或宣稱已在 PS5 驗證；N1／W3 的位置缺漏仍保留。

本機驗證：具名身分配對、替代點去重、舊手動件數保留、不代勾獎盃、E1／E2 勾選與取消／重整／跨分頁，以及手機已開啟地圖的即時標記皆通過；完整瀏覽器回歸另確認新遺物紀錄與未知欄位可經保護式匯入及合成 Drive 保存。1440／768／390／320px 無橫向溢出，已查看桌面／平板／手機截圖；技能 lint 與三寬度 inspector 為 0 FAIL／0 WARN。真實 Google 與 PS5 仍未驗收。手動地圖定位會維持到使用者再次捲動，避免被自動閱讀定位覆蓋。

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

- `dist/data.js`：八階段、60 步驟、60 本體獎盃、三市長與查證來源。保留原 57 步驟 ID，新增 Prometheus 救援節點。
- `dist/puzzle-audit.js`：固定文字檢視／已覆核 ID、完整對照與細節缺口分類、歷次修正紀錄；新題目不會自動繼承覆核狀態，不寫入玩家進度。
- `dist/puzzle-data.js`：212 個解題項目、順序、中文操作摘要、逐題來源與九面拼塊盤格形。
- `dist/collection-data.js`：12 區、56 個固定收集項目、14 個已列具名遺物與 19 個候選位置、來源圖片連結。
- `dist/roadmap/artifacts.js`：物品共用身分、原有步驟狀態鍵與舊件數相容計數，供清單及地圖共用。
- `dist/roadmap/collections.js`：區域勾選、共用星星進度、固定 80 項及手動計數的衍生合計與查證頁。
- `dist/story-data.js`、`dist/story-maps.js`、`dist/roadmap/story.js`：城市／巨構查證來源、分次到訪與室內拓樸圖、穿插解題的逐站進度。
- `dist/region-maps.js`、`dist/roadmap/maps.js`：逐區地標／來源資料、原創 SVG、定位與地圖面板。
- `dist/trophy-guide-data.js`、`dist/roadmap/trophies.js`：60 盃繁中說明、自有取得摘要與衍生計數。
- `dist/roadmap/navigation.js`、`dist/roadmap/completion.js`：26 個片段的穩定分組與只影響呈現的臨時展開。
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

## 1.6.1 逐題來源覆核（2026-11-08）

接續上輪 29 項，剩餘 183 項已全部閱讀現有操作並逐步比對來源。合計 212 項：200 項有完整流程對照；12 項的拼塊選取順序已對照，但來源未逐一列固定旋轉次數，保留待查證（十一座戶外橋與南側巨構五銷，N3 橋不在其中）。可依綠色預覽放置，不把「轉」當成固定按一次。沒有 PS5 逐題實機驗收。

優先展開 N2／N3 的換色、換壓、交換台與跨紫屏搬運；N3 Pandora 準備回到第 2／3／5 題當下。另修正序章 Static Pressure、E3 Refraction／Backward Propagation、N1 Two-Body Problem、S2 Delivery／Step and Release、S3 Passageway、W1 Jailbreak、W2 Hollow 及兩處星星／Miranda 的漏步或歧義。完整項目與來源見 [查證紀錄](docs/RESEARCH.md)。所有 ID、schema 1、IndexedDB、匯入與 Drive 不變。

## 攻略限制

已確認／共識／待查證均逐步標記。三市長的前期條件、W2 區域流程與各結果分開記錄，不能以一個 W2 備份保證任意既有進度都能拿三盃。PS5 備份只記錄使用者手動確認，清單 JSON／Drive 不包含 PS5 存檔。

官方逐盃數字 ID 尚無可靠對照。`trophyRefs` 是網站自有的穩定英文名稱鍵，`officialId: null`，步驟 `trophyIds: []`；沒有把清單排序或第三方網站 ID 冒充官方 ID。所有本體獎盃均有名稱對照與手動狀態。完整證據、限制與測試見 [查證與整合報告](docs/RESEARCH.md)。

新路線回歸：本機 server 啟動後執行 `node scripts/verify-talos2-navigation-browser.mjs`，沿用既有 Edge／Playwright、新 context 與合成進度，包含六種寬度、標籤邊界、舊深連結與關閉解法時的行走指引。
