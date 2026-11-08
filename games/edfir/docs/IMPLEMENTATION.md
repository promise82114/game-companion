# EDFIR 架構盤點與驗收

日期：2026-11-08。開始時 `G:\git\game-companion\games\edfir\module.json` 不存在；本次先建立新模組契約，再讀取核對。入口 AGENTS、repo AGENTS、README、ARCHITECTURE 已讀取，沒有更深層適用 AGENTS。保留工作區既有 Talos II 修改，不提交、不推送、不部署。

## 1.3.0 合併發布授權 · 2026-11-08

使用者要求「commit、push 部署，這次白金介面、武器 checklist 跟出擊養成心得一起上」。本次將 1.2.0 UI 與 1.3.0 心得整批提交，沿既有 main push → Verify and deploy Game Companion → GitHub Pages 流程發布；不變更其他遊戲或既有未追蹤的 TALOS2_UX_AUDIT_TASK.md。以下「未 commit／push／部署」是先前本機實作階段紀錄。

提交前重新執行七模組資料、同步合成、建置／產物及全新 context 的 EDFIR 9 頁 × 4 寬度瀏覽器檢查；實際結果以工具輸出與對應提交 Actions 為準。發布後另核對正式靜態資源與新 context 畫面，不以 push 成功代替部署成功。正式 Google 與遊戲實機仍未驗收。

## 1.3.0 出擊需求、開局升級與刷取心得 · 2026-11-08

- 新增出擊與養成頁，從既有 52 關 recommendedEquipment／敵人／警示呈現需求；選任務只改 URL，不推定玩家裝備。沒有宣稱 52 關均已驗證具名雙槍或最佳配裝。
- 4 條開局路線、7 筆具名用途與踩雷提醒、5 條分階段刷取方法；來源為 Wiki 推薦／稼ぎ／各武器表與 GameFAQs 77192，2026-11-08 核對後自行整理繁中。心得、配法推論、解鎖與成本事實各自保存 basis／sourceIds；沒有 PS4 實機驗收。
- 新收 TF-Anger GD、PT-Linked Energy Blaster、PT-Linked Super Blaster，合計 55 武器、14 類；45 款成本完整。PT 紅 Gems 破折號維持 null，規劃器排除並提醒，未用 0 補齊。對應 M02／28／36 獎勵自動建立原有雙向關聯。
- 開局 Hard 繞路先列採購成本與對空／爆風／裝填限制；不想先碰 Hard 可讀 Drone 3／5 架方案。PT 不能裝填／換槍停射、B 版發射不能移動等缺點與用途一同呈現。
- 更正 Practice 只能試已購買武器，移除原始研究中 AW-Outrage「試射後再決定購買」錯誤。
- M13 為慢補素材；M35 紅 Gems、M46 黃 Gems／Credits、M47 藍 Gems、M52 Credits 均附前置／難度。Wiki 與 GameFAQs 的版本、評價、配裝及收益不同，不顯示固定時薪、不寫入個人估算。M38 連射器放置與 M41 DLC Master Shaman 刷法不作預設。
- route 持有 checkbox 共用 purchased；不改 unlocked 或 trophy earned。按鈕才把尚未持有武器加入既有 target；刷取預填只改表單任務／難度，不寫出假的時間與收益。schema1、namespace、store、Drive 及其他遊戲不變。
- 新增 dist/advice.js、research/advice-research.json 與產物 data/advice.json；沿 prepare-data 產生，資料／來源驗證及原有瀏覽器回歸延伸到 9 頁。module／catalog／equipment 為 1.3.0，Drone 內容版本維持 1.1.0。

資料、七模組、建置與產物驗證已通過。最終隔離 Edge 回歸通過 9 頁 × 1440／768／390／320px、心得選任務不寫進度、持有共用且不代填解鎖、明確加入預算、刷法預填不捏造收益、跨分頁、匯入保護與包含武器／裝備在內的完整新 context 還原；沒有其他遊戲儲存寫入、外部請求或頁面錯誤。

已檢視桌面／平板／手機首屏與整頁，以及 Hard 升級路線、M46 刷取心得展開截圖。出擊頁移除重複統計，手機可直接看需求與重要警示。design-taste inspect 0 FAIL／1 WARN（多條心得無法全部進首屏；保留快速段落連結與逐條展開）；截圖位於忽略的 outputs/edfir/advice-final/、advice-hard-route-*.png、advice-farm-route-*.png。自評設計 7／可用性 8／創意 6／內容 7，仍有逐關具名配裝及實機驗證缺口。所有遊戲事實仍保留來源／限制，測試不當作 PS4 或正式 Google 驗收。本批未 commit、push 或部署。

## 1.2.0 白金導向與 checklist · 2026-11-08

本批為本機 UI 調整，未 commit、push 或部署；1.1.0 發布授權與結果屬前一批。

- 移除三目標切換，首頁、推薦與清理提示以白金為主；仍可從任意目前任務開始。舊 settings.goal 保留原值並接受匯入，fresh 預設 platinum，schema1／namespace 不變。
- Drone 僅保留回收 checkbox，移除重複狀態選單；一般進度篩選為全部／未勾選／已勾選。舊 unknown 渲染為未勾選，只有使用者勾選時才寫 confirmed／missing，保留同筆未知欄位。查證不足與來源衝突仍呈現，不與玩家紀錄混淆。
- 武器以緊湊清單呈現，解鎖與持有分開勾選。完整條件、關聯任務／獎盃、四資源價格、來源與規劃勾選置於詳情，預設收合；獎盃／任務連入武器會展開對應詳情。
- 類型分類與持有計數、等級／解鎖方式／關聯任務／未持有／未解鎖／規劃中交集、英文日文別名與敵人搜尋、M1／M01 正規化、等級／Credits／名稱排序、空清單清除篩選。未知價格排序最後，不當作零。
- 手機進階篩選預設收合，桌面展開。暫存開合與篩選不寫進度；篩選中剛勾選的項目保留到下一次篩選，維持 checkbox 焦點、閱讀位置與取消操作。
- 新增 dist/weapons.js；只更改 EDFIR UI／fresh 預設值／版本、必要產物驗證與回歸。沒有更動其他遊戲、共用 store／OAuth／Drive 或攻略資料。版本 1.2.0，資料內容仍是 1.1.0 的部分庫。

驗證：資料與相容性、七模組驗證、同步合成檢查、建置／產物檢查均通過。隔離 Edge 回歸通過 8 頁 × 1440／768／390／320px、舊 goal／unknown 只讀不改寫、武器類型與篩選交集、英文日文別名與 M2 正規化、空結果恢復、手機進階篩選開合、checkbox 焦點保留、雙向 Drone、獎盃獨立、資源計算、跨分頁、備份失敗／quota／過期匯入保護、新 context 還原及損壞原文下載；沒有外部請求、頁面錯誤或其他遊戲資料寫入。僅使用合成資料與新 context。

視覺複核已檢視桌面／平板／手機首屏及整頁截圖；武器列桌面約 88px，首屏可開始閱讀多筆清單。修正平板進階欄位對齊與手機選擇後意外收合。design-taste inspect 為 0 FAIL／1 WARN：52 筆完整清單仍超出首屏，保留全清單與篩選而不隱藏資料。截圖與報告位於忽略的 outputs/edfir/weapons-accepted/。視覺自評：設計 7／可用性 8／創意 6／內容 7；內容仍受部分武器庫與實機查證限制。

## 1.1.0 發布授權 · 2026-11-08

使用者已明確要求「commit、push 部署」。本批只提交 EDFIR 模組、Portal 封面／接入、必要驗證及說明文件，沿既有 main 分支 GitHub Pages workflow 發布。提交前執行資料、合成同步、建置與產物檢查；隔離瀏覽器結果沿用本版已通過的合成回歸。實際 workflow 與正式站結果另行核對，不以 push 成功冒充部署成功。正式 Google 與 PS4 遊戲實測仍未驗收。以下保留先前實作與驗證紀錄。

## 1.1.0 內容擴充 · 2026-11-08

內容實作階段使用者要求優先複核 Drone 差異、補 52 關敵人／Boss／解鎖與具體攻略，再擴充裝備庫；當時尚未授權 commit、push 或部署，後續授權見下列發布紀錄。保留既有未提交 EDFIR 實作及其他工作的 Git 內容，未操作 stage 或分支。

### 本次新增與呈現

- `research/missions-01-26.json`、`missions-27-52.json`：52 關皆有主要敵人、Boss／大型威脅狀態、3–5 個具體操作步驟、裝備用途、攻略適用範圍、警示、逐難度來源表獎勵與欄位待查。來源沒有指定難度／人數時明示未知，沒有把 Disaster 後期流派冒充初到攻略。
- 631 筆來源表具名獎勵：武器 263、道具 302、外觀 63、PA-Gear 3。這是關卡／難度的獎勵列數，**不是互不重複裝備的遊戲總量**；不展開來源未列出的配色與數量變體。另有 16 筆疑似 DLC、銀鷲勳章、刪除線或條件衝突資料隔離於 excludedRewards，未納入本體資格或白金計數。
- `research/equipment-expansion.json`：在原 12 武器／2 道具／1 外觀上新增 40 武器／18 道具／12 外觀款式，合計 **52 武器（14 類）、20 道具、13 組外觀款式**。44 款武器有完整四資源購買值，缺失值維持 null。Normal／Hard 等表列資料改記「充分解鎖條件」，不冒稱最低難度；原 12 個 ID 與英文名保持不變，新增日文別名供獎勵連結。
- 未核英文名稱保留日文原名並註記。可由 D3 官方英文索引確認、且日文名稱完全一致的 18 組敵人名稱沿用對照；未知變體不自動套用。已核對 Attack Pod 為官方單數，Storm Ants 為官方複數。
- `dist/guide.js` 呈現戰鬥資料、步驟、按難度獎勵、排除資料、查證範圍、裝備名稱備援與 Drone 證據；不寫進度。相同難度的來源連結合併顯示，逐列來源仍保留在 JSON，避免重複連結遮住操作內容。搜尋涵蓋新增敵人、步驟及獎勵名稱。
- 嚴重警示留在收合區塊外：例如 M08／12 Gargant、M18 Hivecraft、M20 Beizal／Hivecraft 的不可擊破事件限制；M18 不可破壞受保護建物；M44 第一架與第二架 Gargant 處理不同；M51 禁用支援／載具／衛星兵器且不能單純等待；M52 禁載具與持續增援。
- moduleVersion／內容版本為 1.1.0，進度仍為 schema1、同一 namespace 與相同狀態模型。沒有變更共用 store、OAuth、Drive、匯入保護或其他遊戲程式。

### 7 筆 Drone 複核

| 任務 | 本次處理 | 仍待確認 |
| --- | --- | --- |
| M08 | 採高架旁凸起屋頂，取消顏色作必要線索 | 建築顏色、確切立面 |
| M11 | 採起點右側升降機**上方頂棚**，排除乘坐平台誤解 | 西南／東南羅盤描述仍有差異 |
| M19 | 保留 Reddit 東南→東北勘誤；採詳細來源共同的左前斷高架與垃圾袋 | 雷達方向尚未實機 |
| M26 | 採起點回頭、邊界藍車與斑馬線，不採有爭議的角落左右微調 | 最後向左或右的細節 |
| M28 | 採最靠邊界的起重機機座；不把進建築內列為必要操作 | 實際行走路線 |
| M32 | 核實物件是固定式起重機；**頂端／底座衝突仍未解**，兩個候選都保留 | 原始高度、拆除後落點與邊界 |
| M44 | 採船尾、下層、半沉水引擎，不混用觀看者左右與船體右舷 | 引擎序號、落腳點 |

`research/drone-audit.json` 保存逐來源理由與限制，產生器以 overlay 合併，沒有覆蓋原始研究紀錄。6 筆「地標收斂」不等於證實所有方位描述正確，更不等於 PS4 實機走查。M32 維持 conflict；其餘保留 pending 項目。TrueTrophies 本次回應 403，沒有宣稱重新讀取成功；使用可讀的 Wiki／GameFAQs／Reddit／Gameranx，並辨識 Gameranx 與其他攻略有引用關係，不能以網站數量當作獨立實測數量。

### 剩餘內容缺口

- 52 關已完成來源層的補齊；未完成目前 PS4 版本、全部難度／多人縮放、每波數量與遊戲內逐筆跳盃驗收。來源敵人表未列 Boss 不等於已證實無 Boss。
- 部分獨立 Wiki 頁無法讀取，改用實際可讀的區段合頁／補充攻略；M32／36 有來源只取得搜尋摘要。sources 的 readVia 與 fieldSources 保留讀取範圍，沒有假稱全部獨立頁成功。
- M04 チューベローズ上下身、M15 ベレー的任務獎勵與服裝收集數表有差異，已隔離。M17 星號、M24／25／48 疑似原文字誤保留原名與提示，未猜改。
- 忍者外觀解鎖門檻有 Drone51／53 衝突、Aisha 有 A2／A3 型號衝突，均保留 issues，沒有新增假確認項目。武器／道具／外觀庫仍不完整；外觀以款式列示，沒有宣稱逐配色全量資料。
- M32 Drone 原始高度、其他 6 筆殘留方位限制、正式 Google、現行 PSN 連線、Ensign 確切門檻與 mysterious machine 精確位置仍待查。

### 本次驗證

- `node games/edfir/scripts/prepare-data.mjs`：通過並產生 52／55／44 與 52 武器，保留既有 ID，來源別名及獎勵引用皆有效。
- `node games/edfir/verify.mjs`：新增逐關內容覆蓋、631 本體獎勵／16 排除、14 類武器、未知名稱／價格、7 筆複核／M32 候選、HTML 安全顯示與原 ID 保留斷言；原 schema、匯入與非同步合成 Drive 檢查維持通過。
- `node scripts/verify.mjs`、`node scripts/build.mjs`、`node scripts/verify-site.mjs`：必要資料與七模組產物通過，新增 guide.js 依賴驗證。
- `node scripts/verify-edfir-browser.mjs`：全新 Edge context、合成資料通過；新增 52 關步驟／獎勵顯示、M18／20 關鍵警示、DLC 排除、M32 兩候選、日文名稱與擴庫後原進度／匯入／跨分頁／四尺寸回歸。沒有頁面錯誤或外部請求，不寫入其他遊戲。
- 為避免其他工作使用的 4192 測試站與 `_site` 重建干擾，瀏覽器使用 `outputs/edfir/site` 完整產物快照與僅綁定 127.0.0.1:4197 的獨立 server。沒有關閉其他人的 server。測試使用新暫存 profile，不使用正式玩家 profile 或備份。
- 已檢視 M18 桌面、M52 手機、M32 候選及日文武器手機截圖。改良長標籤欄寬與重複來源呈現；原風格保持。Roadmap inspect：0 FAIL／1 WARN（52 關完整攻略超出首屏），保留完整閱讀與任務／區段直達，沒有以隱藏未完成步驟消除長清單警告。截圖僅存忽略的 outputs/edfir，非攻略素材。

## P0 盤點

- 路由：build 自動讀取 games/*/module.json，dist 是維護來源；預覽 /game-companion/games/edfir/，可依 Pages 根目錄配置呈現 /games/edfir/。
- 既有 Roadmap：Grounded / Talos / Thank Goodness 的遊戲畫面各自維護；完成收合、暫時回看、未知狀態皆從進度推導。沒有可以不帶遊戲規則直接套用的中央 Roadmap 元件。
- 儲存：沿用 shared/roadmap-store.js 的 IndexedDB records / progress、交易中讀最新值、expected-value 匯入及 BroadcastChannel。每款獨立 namespace，不建立平行 localStorage 進度。
- 共用程式：直接引用既有 Talos 的合併 core、非同步 sync-session、GoogleAuth、DriveAppData、setupSync；不另實作 OAuth、無條件覆寫或中央登入。樣式引用 Grounded 已有介面，再補本模組排版。
- 獎盃：已取得是獨立人工確認，條件推導不得寫回 earned。Drone 與任務共用同一 drones map。
- 匯入：兩端原文先 archive，再驗證、顯示逐欄差異、下載兩端備份、確認及以預覽原文條件套用；保留未知 ID / 欄位。
- 地圖：既有 Talos / Grounded 地圖包含專屬遊戲規則，不能直接套用。EDFIR 以地標路線資料產生原創流程示意圖，不複製地圖圖片或假造測量座標。
- UI：沿用 244 / 195px 側欄、1620px 內容與 720px 手機選單。以任務及收集操作為主，不另加閱讀／遊玩模式。

## 最小差異與檔案

- 新增 games/edfir/{module.json,README.md,verify.mjs,dist/*,docs/*,research/*}。
- 新增 portal/covers/edfir.svg；scripts/build.mjs 只加目錄 metadata；scripts/verify.mjs 與 verify-site.mjs 加必要模組驗證；新增隔離瀏覽器回歸。
- 不更改共用 store / cloud 實作、不改既有遊戲資料或 ID。程式依賴既有模組可發布程式，artifact 驗證檢查其連結；日後抽共用應另行評估。

## 資料模型與階段

- missions：M01–M52 穩定本地 ID、英文名稱、stage、enemies、boss、difficulty、unlockRefs、droneId、equipment、trophyRefs、warnings、sources、verification。未知內容為 null / 空陣列並呈現待查證。
- trophies：官方 PS4 名稱與條件、本地 ID（不是 PSN 數字 ID）、grade、category、操作、online、multiplayer、missable、missionRefs、weaponRefs、cost、sources。
- drones：M01–M52 + P01–P03、路線步驟、地標、gear、障礙物、來源及衝突狀態。
- progress schema1：missions / drones / trophies / weapons / equipment / resources / farmRuns / settings。人工確認與推導分開；武器 unlocked / purchased 分別儲存。
- P1：任務、難度、三種目標、44 盃獨立確認、版本驗證及備份／Drive。
- P2：55 架文字路線、完成任務後確認回收、任務／總覽共用狀態、原創路線示意圖。
- P3：可擴充裝備 schema；只納入查證過的資料，不用空殼筆數冒充完整武器庫。
- P4：有效 ID 的任務／獎盃／武器雙向參照。
- P5：資源缺口、玩家實測收益及估算；未知價格排除並提醒。
- P6：手機／篩選／原創示意圖、跨分頁及手動 Drive；正式 Google 與真實 PS4 跳盃由使用者另行驗收。

## 規格更正與風險

PS4 本體清單實際共 44 盃（32 銅、7 銀、4 金、1 白金），不是「44 加白金」。不虛構第 45 盃。來源：https://www.playstationtrophies.org/game/earth-defense-force-iron-rain/trophies/ 、https://www.truetrophies.com/game/Earth-Defense-Force-Iron-Rain/trophies 。Steam 成就名稱可能不同，不混用。

風險：匯入與跨分頁需防覆蓋；同源儲存必須只讀寫 edfir 前綴；未核實攻略不能呈現為已確認。完成任務不等於回收 Drone，回收條件不等於 PSN 跳盃。沒有官方實機跳盃或 Google 授權測試證據時不宣稱通過。

## 1.0.0 可驗收結果（歷史基準；現況以上方 1.1.0 為準）

| 階段 | 已實作 | 剩餘待辦／限制 |
| --- | --- | --- |
| P0 | 架構盤點、獨立 module 契約、資料模型、來源與欄位驗證 | 沒有大規模重構共用架構 |
| P1 | 52 關名稱／編號、直接定位、任意起點、難度完成、完成收合、警示常駐、下一關、三目標、44 盃獨立標記、自動儲存、保護式匯入／匯出與 schema0 草案遷移 | 逐關敵人／Boss、完整獎勵、裝備與戰術仍未完成查證；區段是導航分組，不是官方劇情章節；難度紀錄不區分線上／離線，不能代替線上跳盃 |
| P2 | 55 架文字路線、方向、地標、Gear 建議、障礙資訊與來源、Practice 獨立區塊、篩選、任務／收集中心同筆狀態、已回收自動收合 | M08／11／19／26／28／32／44 有來源差異；所有路線尚未實機走查；55 架只推導條件，不自動取得 Drone Buff |
| P3 | 12 款武器（11 款有完整購買資源）、2 道具、1 外觀、4 PA-Gear、Mercenary 及 3 高難目標；解鎖／購買分別記錄 | 武器／道具／外觀是部分庫；未查證價格留 null，不計算全收集率 |
| P4 | 收錄資料的任務→武器、武器→任務、武器↔獎盃、任務↔Drone；獎盃的關聯任務可直達 | 尚未收錄資料沒有假關聯；非已驗證的全遊戲關聯網 |
| P5 | Credits／三色 Gems、目標武器缺口、自己的總場次／總時間／總收益、依實測平均估算 | 目標目前僅支援收錄武器；道具／外觀完整購買規劃待擴充；未知價格不計入確定缺口，零收益不虛構場次 |
| P6 | 55 張原創路線流程 SVG、手機選單、搜尋／篩選、4 寬度、跨分頁、沿用手動 Drive 閘門 | 流程 SVG 不是地形圖／實測座標；正式 Google、目前 PSN 連線與真實跳盃待使用者驗收 |

### 實際驗證

- `node games/edfir/verify.mjs`：通過 52／55／44 數量、唯一 ID、來源、分級、DLC 排除、雙向參照、狀態分離、未知欄位、版本／遊戲隔離、預算與零收益估算。另以 EDFIR 資料形狀通過既有非同步 session 的合成首次配對、三方衝突、過期預覽、412、pending 與同步中新編輯保留。
- `node scripts/verify.mjs`：七個模組的必要資料檢查通過；既有 Talos 工作區變更沒有被此任務還原。
- `node scripts/verify-sync.mjs`：既有 EDF adapter 合成條件寫入／競爭／授權失效檢查通過；EDFIR 直接引用同一安全實作，沒有新增弱化版本。
- `node scripts/build.mjs`、`node scripts/verify-site.mjs`：通過七模組產物及本機連結、boot 動態共用依賴檢查。
- `node scripts/verify-edfir-browser.mjs`：全新 Edge context、僅合成資料，通過 8 頁面 × 1440／768／390／320px、任意起點、完成收合／回看、Drone 雙向與55齊全不代填獎盃、武器／預算、跨分頁、匯入兩端原文、備份失敗／quota／過期預覽、完整備份在新 context 還原、損壞原文下載、鍵盤與手機功能選單。沒有頁面錯誤或外部請求；只建立 edfir DB，其他遊戲 sentinel 保持不變。
- Windows sandbox 的 Edge 啟動／本機網路受限，瀏覽器改在 sandbox 外以全新暫存 profile 驗證，測試 server 僅綁定 127.0.0.1；未使用真實玩家 profile、備份或 Google token。
- design-taste-frontend 使用 `achromatic-ledger`、`--keep palette,type`；保留既有 Game Companion 側欄與右上工具列作品牌約束，以任務矩陣、Drone 路線與自己的數據為主。首頁 inspect 1440／768／390px：修正短面板拉高後 0 FAIL／0 WARN；320px select 最小寬度與手機選單在功能回歸中修正。截圖位於忽略的 `outputs/edfir/`，不是攻略來源。
- 最終 Drone 頁 inspect：0 FAIL／1 WARN（55 筆完整清單無法全數放在首屏）。保留需求要求的完整清單與篩選，已回收條目自動收合；這項清單長度警告不以隱藏資料處理。已檢視桌面／手機截圖，桌面文字與流程圖分欄、手機逐段堆疊，沒有溢位或遮擋。視覺自評：設計 7／可用性 8／創意 6／內容 6，內容分數受逐關戰術及部分資料庫缺口限制，不當成內容驗收通過。

### 後續順序

1. 逐關核對敵人／Boss／各難度解鎖與戰術，優先從玩家目前任務與 7 筆 Drone 差異開始；不將空欄解讀為沒有。
2. 擴充武器／道具／外觀完整清單與資源規劃，維持穩定 ID、來源與「實際購買／取得」判定；本庫全勾不代表全武器獎盃。
3. 核實 mysterious machine 位置、Ensign 條件，以及個別線上／離線模式需求。
4. 取得遊戲實測證據後再增加精確地形圖；正式網域與 Google 驗收需後續部署授權，本次未 commit／push／部署。
