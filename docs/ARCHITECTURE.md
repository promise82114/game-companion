# Game Companion 目前架構

2026-11-08 IRON RAIN 1.4.0 本機武器索引修正：新增 research/weapon-catalog.json，prepare-data 離線合併 360 款（本體312／DLC40／特典8），保留舊55款 ID；equipment sources／audit 提供逐類計數與名稱／成本證據。dist/model.js 的 arsenalProgress 僅從 platinumRequired 與 purchased 推導本體持有條件，不寫獎盃；dist/weapons.js 增加唯讀內容範圍篩選。維持 schema1、同一 weapons map、namespace／store／Drive／保護式匯入契約，沒有新增儲存系統。道具／外觀仍為部分庫；使用者已授權本批 commit／push，沿既有 main Pages 流程發布，結果以對應提交 Actions 為準。

2026-11-08 IRON RAIN 1.3.0：新增模組內 dist/weapons.js（緊湊清單與唯讀篩選）、dist/advice.js 與 research/advice-research.json → dist/data/advice.json（出擊需求、開局升級、刷取心得）。介面以白金為主，沿用 schema1／namespace／交易 store／Drive；舊目標與 unknown 狀態保留，武器 purchased 與 target 共用原紀錄，未新增平行配裝存檔。部分武器庫 55 款、其中 45 款成本完整；52 關／55 Drone／44 盃不變。使用者已授權連同白金 UI／checklist 沿 main Pages 合併發布，結果以對應提交 Actions 與正式資源核對為準。

2026-11-08 IRON RAIN 1.1.0 內容擴充：由原研究資料疊加兩份逐關研究、Drone audit 與裝備擴充，產生 52 關具體攻略／敵人／Boss、631 筆本體來源表獎勵與 16 筆隔離紀錄；部分裝備庫為 52 武器／20 道具／13 外觀款式。新 `dist/guide.js` 只負責安全文字及查證範圍呈現，不寫入進度；英文未核實時保留日文原名，既有 ID／schema1／namespace／共用 store／Drive 均不變。7 筆 Drone 複核中 6 筆以地標收斂，M32 高度衝突仍保留候選。詳細覆蓋與未驗證項目見 `games/edfir/docs/IMPLEMENTATION.md`。2026-11-08 使用者已授權本版 commit／push，沿 main Pages 流程部署；實際結果以對應 GitHub Actions 為準。

2026-11-08 IRON RAIN 1.0.0 本機新增：`games/edfir/` 原生 ES modules／JSON，`game-companion.edfir.progress.v1` 獨立 IndexedDB，沿用根 `shared/roadmap-store.js`。52 關任務、55 架 Drone 及 44 個 PS4 本體獎盃各自追蹤，Drone 與任務畫面讀同一份 map，條件推導不寫回獎盃。直接引用 Grounded 基礎 stylesheet、Talos 已有 OAuth／安全 adapter／非同步 sync-session／setupSync／merge core，未複製共用元件或重構既有模組。Drive 的遊戲／帳號 namespace、逐次 grant 驗證與條件寫入不變。沒有 SW。武器、道具與外觀為部分庫；原創路線流程圖不是實測地形圖，未核實欄位保留待查。詳細範圍見 `games/edfir/docs/IMPLEMENTATION.md`。本次未提交、推送或部署。

2026-11-08 Grounded 1.1.2 白金流程稽核：沿用 `roadmap-progress.js` 衍生分類待辦與第一輪 REMIX.R 核對，`model.js` 新增唯讀項目可見性供摘要／清單共用。沒有新增儲存旗標或改動 schema1／namespace／store／import。Ominent 分組與少量路線是靜態 metadata；已列 53 項仍為部分庫，不計算遊戲百分比。報告見根目錄 `GROUNDED_PLATINUM_AUDIT_REPORT.md`，本次使用者已授權 commit／push，沿用 main 的 Pages 流程；發布結果以對應 GitHub Actions 為準。

2026-11-04 Grounded 1.1.1 依 `docs/PROGRESSIVE_ROADMAP_UX.md` 採漸進式收斂：新 `roadmap-progress.js` 從現有步驟目標、獎盃及相關收集推導完整度；所有事項完成才精簡步驟，取消任一項即恢復全文。暫時回看只存於頁面記憶體，搜尋不改完成資料；原位 DOM 更新維持焦點／捲動，章節顯示完成數並可返回第一個未完成步驟。schema、進度欄位、ID、儲存及其他遊戲模組不變；2026-11-04 使用者已授權提交／推送本批，部署結果以對應 GitHub Actions 為準。

2026-11-04 Grounded 1.1.0 操作簡化：七章節放入左側導覽，步驟依「目標、完整體驗、白金需求」完整展開；獎盃與相關收集在原處勾選，沿用同一筆進度與跨分頁更新。移除目標切換、內容區章節下拉、耗時、自訂備註、個人標記和世界／成員介面。schema、namespace、ID、交易與匯入保護不變；歷史資料完整保存，不做遷移或清除。此調整與 1.1.1 一同依使用者授權提交／推送，部署結果以對應 GitHub Actions 為準。

2026-11-04 Grounded 1.0.0 本機整合：原生 ES modules，`game-companion.grounded.progress.v1` 獨立 IndexedDB，`schemaVersion:1`；worlds 下以世界 UUID、玩家 UUID、周目 UUID／base 分離共同與個人進度。Talos 的交易 store 抽為根 `shared/roadmap-store.js` 單一來源，原預設 fresh／validator 不變；Talos 入口按 source／artifact 層級載入，Grounded 使用可配置 fresh／validator。build 另發布 `_site/shared/`，並從既有 Talos core 發布純合併函式。Grounded 不載入 OAuth／adapter、沒有 SW 或即時多人同步。匯入沿用兩端原文、差異選擇、下載確認及預覽條件寫入規則。53 項部分收集資料、七階段、46 盃、原創概念 SVG 與限制見 `games/grounded/README.md`。2026-11-04 使用者已授權提交／推送本批，沿用 main 的 Pages 流程；部署結果以對應 GitHub Actions 為準。

日期：2026-10-31；EDF 模組版本 1.1.0，Mycopunk 1.0.0，均納入 main 分支的靜態發布流程。

原始基準為 `GAME_COMPANION_ARCHITECTURE.md`。使用者後續「加速整合任務」明確改為一次連續實作 EDF WB／WB2，不需逐階段批准；資料保護、獨立模組及正式雲端／切換須確認的要求仍有效。原始規格與 P0 保留作歷史，不改寫成已驗收。

```text
portal/                         遊戲目錄 HTML/CSS 模板，不存取進度
games/{slug}/
  module.json                   遊戲識別、版本、入口與儲存契約
  source-manifest.json          搬入來源 SHA／逐檔原始 hash
  dist/                         該遊戲完整 HTML/CSS/JS、同步 adapter
  data/、scripts/               有來源提供時保留的攻略資料與產生器
  verify*.mjs、server.mjs        原遊戲驗證及預覽工具
  docs/                         原遊戲的來源／翻譯核對文件
  upstream/                     被安全版本取代的舊雲端程式／測試，不發布
scripts/                        建置、隔離與部署檢查、整合回歸
_site/                          可重建的 Pages artifact，不追蹤
docs/                           規範、遷移、驗收、報告
```

EDF 兩款沿用原生 HTML/CSS/JS，各自保留 `dist/shared/`。Mycopunk 模組版本 1.0.0，沿用自己的 ES modules、JSON、圖片與 Worker，不使用 EDF 的資料格式或同步程式。沒有平台共用進度 SDK；各模組的匯入保護程式隨模組一起維護，不把 Portal 變成同步中心。

Mycopunk 原 `prototype/` 對應到 `games/mycopunk/dist/`；Excel、localization、research 與離線產生器保留在模組內但不部署。原 appId、schema 及 ID 不改，新主 Key 為 `game-companion.mycopunk.progress.v1`，舊站 Key 不讀寫。匯入先保存兩端原文、逐筆／批次選差異、下載備份與確認；未知欄位與原文可匯出，過期預覽或備份失敗會停止。沒有 Google Drive 或 SW。

建置讀取 `games/*/module.json`，自動產生 Portal 遊戲列，將各模組 `dist/` 放到 `_site/games/{slug}/`。網站不用 router 或後端；GitHub Pages 根為 `_site`，路徑自然對應 `/game-companion/`。來源與工具不會被打包到網站。

Thank Goodness You're Here!（2026-10-31 本機整合，模組 1.0.0）以獨立 JSON 定義 33 獎盃、8 階段、100 步與 13 組 tracker。其 schema 1 分開保存 `stepDone`／`trophyEarned`；IndexedDB `game-companion.thank-goodness-youre-here.progress.v1` 的 `state`／`archives` 提供交易與原文復原。沒有重用 EDF item hash 或增加中央狀態。Drive OAuth／adapter／envelope 沿用 EDF 版本，sync-core 的群組改為兩個進度 map，session 等待本模組的非同步儲存；Base／pending 按遊戲／帳號保存於自己的 localStorage 前綴。SW 只處理本模組 scope。攻略查證、保護式匯入、測試與實機限制見 `games/thank-goodness-youre-here/README.md`；發布沿用 main 的既有 Pages 流程；尚未完成真實 Google 驗收。

2026-11-02 新增 Thank Goodness「初始化紀錄」（模組 1.1.0，schema 仍為 1；使用者已授權提交、推送並沿用 main Pages 發布流程）：下載完整備份並確認後，在 IndexedDB 同一交易中保存初始化前快照並將已知步驟／獎盃寫為 `false`；用預覽原文條件阻擋過期操作。保留未知資料、歷史與既有同步 Base／pending，不刪 DB 或清除配對。歸零由既有手動三方同步傳遞，不自動上傳；同頁同步中禁止初始化。SW cache 遞增為 v5，清理前綴不變。

版本分為平台版本、moduleVersion、progressSchema 與原有 catalogVersion。既有項目 ID 與進度 app/schema 相容保留，新增 `gameId`、`moduleVersion`、`revision`。revision 是本機變更計數，**不是跨分頁交易或雲端修訂保證**。

進度、快照、匯入原文、Cache Storage 與 Drive 檔名皆按遊戲命名。SW 只攔截自己 scope 的 GET、只查自己的 cache、只清自己的版本前綴。Portal 不註冊 SW、不存取玩家儲存。

雲端沿用原 GIS Client、scope 與 Drive appDataFolder。模組內新增 sync-core（三方合併與本機操作日誌）、sync-session（帳號隔離 Base／pending／復原）並擴充既有 adapter。只有當次授權的合成測試檔驗證條件寫入後才能手動同步；每次 PATCH 必帶 strong If-Match，公開 request 只允許 GET。首次配對明確確認，衝突顯示 Base／Local／Remote 並逐筆或批次選擇。確認時重新讀取；結果未知先核對 syncRevision，不盲目重送。沒有背景同步。

本機以每筆不可變操作及帶欄位版本的 checkpoint 保存，跨分頁操作可回放。同步結果以起始 Local 再 rebase 到最新 Local，最後寫入使用 expected-value 條件保留其他分頁新變更。較舊新站分頁改寫主 Key 時另存原文並要求預覽匯入。測試入口 tools/sync-safety 只操作唯一名稱的合成檔，不載入玩家進度。真實 Drive 測試尚待使用者於正式網域執行，限制詳見同步報告。

GitHub workflow 驗證資料與每個必要模組，再建立並檢查完整 artifact，成功後才可部署。初次整合先完成本機驗證；後續依使用者明確授權完成 commit、push 與 GitHub Pages 首次發布，Actions 與正式 43 個網站資源驗證皆成功。發布證據見 `docs/reports/INTEGRATION_REPORT.md`。沒有改舊站或操作正式 Google 帳號。後續已依使用者授權加入具 runtime 驗證門檻的雲端功能；目前證據及發布狀態見 docs/reports/DRIVE_SYNC_REPORT.md。

## Talos II Roadmap · 2026-10-31 本機整合

`games/talos2/` 新增原生 ES module 畫面、靜態攻略與獨立 IndexedDB（schema 1）。八階段 57 步驟；本體 60 獎盃、DLC 9 排除。共用候選邏輯放在模組內 `dist/roadmap/`：狀態／篩選／風險計算與交易儲存皆不包含 Talos 專屬規則；遊戲內容、分支與前置在 `dist/data.js`。

既有模組沒有中央獎盃系統或 IndexedDB。本次新增本遊戲 DB `game-companion.talos2.progress.v1`，以 `records/progress` 儲存 `steps`、`trophies`、`backups`、`branches`、`settings`；快照、匯入原文也在該 DB。每次寫入在同一 readwrite transaction 讀取最新資料，匯入以預覽原文條件檢查，雲端套用在交易內 rebase，避免跨分頁覆蓋。內容版本獨立，未知資料保留，資料不相容時停止並可下載原文，不用新空資料覆蓋。

Google Auth、Drive adapter、progress envelope 與 EDF 安全版相同；Talos 的 sync-core 改群組，sync-session 等待非同步本機介面。Base／pending／復原仍保留既有遊戲與帳號隔離、逐 grant 合成檔條件寫入驗證、strong If-Match、三方衝突與結果未知復原。沒有新增 OAuth 流程、中央同步或 SW。正式 Google 仍未驗收。

官方逐盃數字 ID 尚未核實，`trophyIds` 留空，名稱對照使用獨立 `trophyRefs`，不假冒 PSN ID。PS5 備份僅記錄使用者確認；清單 JSON／Drive 不是遊戲存檔。詳見 `games/talos2/docs/RESEARCH.md`。

## 入口與 Roadmap 共用操作規則 · 2026-10-31

2026-11-01 使用者授權將 UI 改版提交、推送並納入既有 main 分支 Pages 發布流程，部署結果以對應提交的 GitHub Actions 為準。Portal 增加 `portal/covers/*.svg` 原創主題插畫及 `catalogue.js` 靜態篩選；build 只把目錄資源複製至 `_site/`，不讀取玩家儲存。遊戲 metadata 與既有模組註冊方式不變。

Talos II 與 Thank Goodness 保留各自原生畫面及資料模型，以相同的視覺 token 與操作順序對齊：左側功能頁、右上 Drive／備份還原、章節選單、本章提醒、搜尋與顯示條件、下一步、可展開步驟。手機以「功能選單」收合頁面導覽，章節保留完整名稱的原生 select。沒有新增共用進度 SDK、中央登入或同步服務。

切章是瀏覽操作，沒有先完成早期階段的門檻。Talos 只沿用 `settings.currentStage` 保存目前章節，保留既有確認歷史；Thank Goodness 以 URL hash 保存瀏覽章節，不增加進度欄位。兩款的下一步從目前章節往後找；提醒限於本章，完整攻略與前置仍可展開閱讀。匯入下載／差異確認、PS5 手動備份確認及 Drive 每次授權安全閘門維持原行為。進度 schema、ID、namespace、雲端 adapter 和攻略資料均未更動。

2026-11-01 後續介面調整（依使用者授權納入 main Pages 發布流程）：Mycopunk 以獨立 `companion-ui.css` 將語言、來源及備份還原放進常駐右上工具區，所有功能頁共用既有備份流程。兩款 Roadmap 的工作區與上方工具列在桌面上限為 1200px，於功能列右側置中。Talos 步驟改為標題／核取方塊完成，加上附近的略過、不確定、已錯過切換鈕；再次點選同一狀態回到未開始，交易內讀取最新狀態，保留筆記與未知欄位。市長路線與獎盃依舊獨立，沒有改 schema 或同步群組。Thank Goodness 的 CSS 變更同步將本模組 SW cache 遞增為 v3。

2026-11-03 Talos 1.2.1 依使用者要求將上段的多狀態操作簡化為未開始／完成，步驟與三市長路線皆使用核取方塊。舊狀態仍按 schema 1 保存與傳輸，未完成者在畫面顯示未開始並納入下一步，使用者操作時才更新該項。沒有資料遷移或清除；既有筆記、未知欄位與同步保護保留。逐題解法及劇透開關同樣沿用原有 `steps`／`settings` 群組。

2026-11-01 EDF 版面對齊（接續 `b9f5711`，本批依使用者授權提交、推送並納入 main Pages 發布流程）：依使用者更正，兩款 Roadmap 改用 EDF WB1／WB2 的實際規則，取代上一批的 1200px 置中限制。主內容與資料工具列最大 1620px，接在左側欄之後；側欄桌面 244px、721–1100px 為 195px、720px 以下改手機導覽。主內容水平內距依序為 64px（1500px 起）、46px（1101–1499px）、26px（721–1100px）、16px（720px 以下）。以隔離瀏覽器直接比較四款模組於十種視窗寬度的主內容位置、寬度、內距與側欄寬度，避免各自維護不同判斷。

Mycopunk 的五項主功能移入固定左側欄；裝備分類仍沿用原 directory，改為可展開區塊。720px 以下由「功能選單」開啟原生 modal dialog，將同一份側欄節點移入抽屜；支援焦點限制、Escape、選完功能收合及返回桌面時移回側欄。右上資料工具保持共用。沒有新增套件或資料欄位；Thank Goodness 的 SW cache 遞增為 v4，清理前綴不變。

2026-11-03 Thank Goodness 閱讀調整（模組 1.1.1，使用者已授權提交與推送，沿用 main Pages 發布流程，部署結果以對應提交的 GitHub Actions 為準）：攻略與追蹤的步驟直接顯示地點及觸發時機，本章提醒不再折疊。逐步驗證方式、錯過後說明與來源連結集中於既有「來源與查證」頁的查證紀錄，主攻略保留容易錯過／不可逆與待查證警示。只改呈現方式，攻略資料、步驟／獎盃 ID、schema、namespace、IndexedDB 與 Drive 同步邏輯均不變；本模組 SW cache 遞增為 v6，清理前綴不變。

2026-11-03 Thank Goodness 角色小圖（模組 1.1.2，使用者已授權提交與推送，沿用 main Pages 發布流程，部署結果以對應提交的 GitHub Actions 為準）：新增模組內 `characters.js` 名字／別名對照與 `characters.svg` 的 19 個共用辨識圖，在攻略文字中的英文角色名字旁以 24px 呈現。原文安全跳脫，完整名字比對，圖示排除於輔助朗讀與焦點順序；名字仍可搜尋及操作核取。沒有新增進度欄位、修改攻略 JSON 或觸及其他遊戲，schema／namespace／IndexedDB／Drive 邏輯不變；SW cache v7 納入兩個本機素材，清理前綴不變。造型依據與人工核對限制見模組 `docs/CHARACTER_PORTRAITS.md`。

2026-11-03 Thank Goodness 中英名稱與計數（模組 1.2.0、攻略 1.1.0，使用者已授權提交與推送，沿用 main Pages 發布流程，部署結果以對應提交的 GitHub Actions 為準）：33 盃新增依 Exophase 同一獎盃連結 ID 核對的 `nameZhTW`，保留 `officialName` 與既有 t00–t32；來源核對紀錄在模組 `docs/EXOPHASE_TROPHY_NAMES.json`。12 個多步驟獎盃於攻略 metadata 明列 `progress.stepIds`／標籤／限制，由 UI 直接從現有 `stepDone` 計算並同步更新所有出現位置，不另存計數或改寫 `trophyEarned`。排除動物的蚯蚓保守提醒、Nick 另一獎盃的豆罐步驟；回訪／路線標籤不表示已證實的必要互動次數。IndexedDB、schema、namespace、Drive 及其他遊戲邏輯不變，SW cache v8 保留原清理前綴。

2026-11-04 Thank Goodness 漸進式收斂（模組 1.3.0、攻略 1.2.0，使用者已授權提交與推送，沿用 main Pages 發布流程，部署結果以對應提交的 GitHub Actions 為準）：既有 8 章、100 步新增 28 段 sections metadata，以既有 stepIds 按原順序分組。未完成內容完整呈現，完成步驟收起說明，全段／全章完成後只留標題與計數，可臨時回看；搜尋、段落定位與返回遊玩進度不代填完成狀態。閱讀展開只保存在頁面記憶體，步驟／段落收斂從 stepDone 推導；跨分頁、匯入、初始化與手動同步沿用原進度事件更新原位 DOM。schema、namespace、IndexedDB 與 Drive 實作未改，model 僅遞增 moduleVersion，SW cache v9 保留原清理前綴。詳見模組 README。

## BALL x PIT · 2026-11-09 本機新增

`games/ball-x-pit/` 模組1.0.0，原生ES modules／JSON，獨立 `game-companion.ball-x-pit.progress.v1` IndexedDB，schema1的七個布林map分開保存通關、路線檢查、藍圖、建造、配方、圖鑑及PSN手動獎盃。衍生計數不存檔、不自動授予獎盃。16×8本體格與6更新角色的48格隔離；圖鑑只計已收錄球／Passive，不以119本體項目推導Scholar。

沿用根 `shared/roadmap-store.js` 與既有純合併core，沒有載入Drive或SW。store補上缺省Drive ID不拆封裝的判斷，以及可選 `exportSyncState:false` 供純本機模組不讀localStorage；既有預設不變。匯入先archive兩端原文，單端未知資料保留、兩端差異確認、下載備份、expected原文交易阻擋過期預覽。研究JSON與根規格離線產生catalog；78建築／6資源地塊、90球、71Passive、86配方、22角色推論配裝及資料限制見模組README／docs。根build自動加入Portal，verify與verify-site明列必要檢查。2026-11-10 依授權沿 main 的 Pages 流程發布，結果以對應提交的 Actions 為準。
