# Game Companion｜整合報告

日期：2026-10-31（Asia/Taipei）。狀態：**兩款遊戲已整合並發布；後續加入具每次授權驗證門檻的手動 Drive 同步，真實 Google 尚待使用者於正式網域測試，舊站未切換。**

同步擴充的現況、測試、檔案與限制見 [DRIVE_SYNC_REPORT.md](DRIVE_SYNC_REPORT.md)。下方為初次整合與首發歷史，當時的「停用」不代表目前程式策略。

## UI 視覺優化（2026-10-31）

依使用者本次要求使用 design-taste-frontend 技能，採 Achromatic ledger（seed 1538520587，無重抽）。Portal 改為同框遊戲目錄；兩款手帳使用淺色上方分類列、統一數字與文字對比、白色清單與藍色收集進度。各模組新增自己的 `dist/notebook.css`／`notebook.js`，沒有中央 UI runtime 或框架遷移。

手機將進度總覽、完整資料說明、進階篩選與二代角色配件條件設為可展開區，保留搜尋、取得狀態與原始欄位。清單名稱改為可見 h1，補上跳至清單、鍵盤焦點、篩選摘要及選取狀態；設定、備份、錯誤與空資料狀態沿用原流程。SW 增列兩個視覺資源並升至各遊戲的 assets.v3，清理前綴不變。

- 資料與產物：`verify.mjs`、`build.mjs`、`verify-site.mjs` 通過，產物 54 個檔案、60 個本機資源連結。
- 隔離瀏覽器：`verify-browser.mjs` 通過兩遊戲的勾選、復原、重載、搜尋、DLC、跨分頁、匯入保護、未知資料保留、過期預覽封鎖、配額失敗、未驗證雲端封鎖、離線與舊 Key／cache 隔離；新增手機 disclosure、鍵盤篩選、跨斷點與空清單復原檢查。
- 二代既有 12 項 suite 中 10 項首輪通過；原本寫死舊版進度排列／手機展開狀態的斷言依新 UI 調整，重跑 `verify-separated.mjs`、`verify-mission-tabs.mjs` 與 `verify-character-accessories.mjs` 全數通過，保留資料與行為斷言。
- 視覺：Portal 與兩手帳均檢查 1440、768、390px，最終 0 FAIL；一代手機保留一個 12px 次要註記比例 WARN，二代與 Portal 無 WARN。另檢視分類、空收藏、DLC、設定、備份與雲端視窗。自評整體 7.5／10，主要限制是手機多欄表格仍需在表格內橫向滑動，以及遊戲識別仍以文字與 E1／E2 為主。

使用者後續已授權本輪 commit、push 與 GitHub Pages 發布，於正式站自行測試 UI；發布使用既有 main workflow，可由 [Pages workflow](https://github.com/promise82114/game-companion/actions/workflows/deploy.yml) 核對對應提交的執行結果。發布前重跑 `verify.mjs`、`verify-sync.mjs`、`build.mjs`、`verify-site.mjs`，皆通過。原 repo、攻略／翻譯／ID、`source-manifest.json` 與實際 Google 帳號未操作；真實 Drive 驗收狀態不變。

## 後續授權與首次發布紀錄

使用者在整合交付後明確要求「commit push 發布到 github page」，已據此發布 Game Companion，沒有擴大為正式 Google Drive 寫入或舊站切換。以下第 1～7 節保留初次整合時點的範圍、測試與限制；本節為後續發布現況。

- 首發程式提交：`9e2d328e06a9d008aa0655ff614041d31348e842`，`feat(platform): 整合 EDF WB 與 WB2 並加入隔離備份與 Pages 發布`；111 個檔案。在 develop 提交，atomic fast-forward 推送到遠端 develop 與 main，沒有強制推送或合併舊 repo 歷史。
- GitHub Actions：[41118057049](https://github.com/promise82114/game-companion/actions/runs/41118057049)，main／上述 SHA，completed／success。Linux 上的資料驗證、build、verify-site、artifact 上傳與 deploy 全部成功。
- GitHub Deployment：`7447371570`，github-pages 環境，對應上述 SHA，狀態 success。原 Pages 已使用 workflow 模式，沒有修改後台來源設定。
- 正式網址：[Portal](https://promise82114.github.io/game-companion/)、[EDF WB](https://promise82114.github.io/game-companion/games/edf-wb/)、[EDF WB2](https://promise82114.github.io/game-companion/games/edf-wb2/)。全部 43 個 HTML／JS／CSS 以 HTTP GET 檢查為 200，LF 正規化 SHA-256 與本機產物全數相符；沒有執行正式網頁 JS、存取玩家儲存或 Google。
- 發布前重新執行 verify、build、verify-site 與 Drive guard，皆通過；stage 僅包含指定來源與文件，未含 outputs、_site、測試備份或憑證。暫存格式檢查的五項訊息為來源保留的 Markdown 換行尾空白／檔尾空行，未為消除訊息修改攻略原檔或來源 hash。
- 本次發布補記另以文件提交推送，網站程式與雲端寫入封鎖不變。之後的 main 部署可由 [Pages workflow](https://github.com/promise82114/game-companion/actions/workflows/deploy.yml) 核對最新 SHA／結果。

依據 `GAME_COMPANION_ARCHITECTURE.md`、`P0_REPORT.md` 與使用者後續「加速整合任務」執行。後者已授權連續整合兩款遊戲，取代逐階段等待；獨立儲存、未知資料保留及正式雲端／切換須確認的要求保留。原架構文件及 P0 歷史紀錄沒有改寫。

## 1. 已完成的整合內容

- 原生 HTML/CSS 的 Game Companion Portal，可直接進入 EDF WB 與 EDF WB2；各模組提供返回目錄連結與舊站連結。沒有中央帳號、後端、同步中心或新產品套件。
- `games/edf-wb/`、`games/edf-wb2/` 保留各自完整 `dist/`、資料來源、工具與文件；部署時才將 dist 內容映射到 `/game-companion/games/{slug}/`。原有 EDF 介面與操作工具沿用，只加必要導航、隔離與匯入／雲端安全狀態。
- 每款 `module.json` 宣告穩定 gameId、slug、moduleVersion、progressSchema、入口與獨立備份識別；Portal 清單由 manifest 產生，沒有讀取玩家進度。
- localStorage 的進度、快照、備份時間、損壞備份及匯入原文全部換新 namespace；SW cache 名、清理前綴、查找與 fetch scope 各自隔離，Portal 不註冊 SW。
- 明確 JSON 匯入：來源／目標先存原文、逐筆／批次選差異、下載復原備份、確認後套用；預覽後新增編輯或備份失敗會停止。來源的 false／空筆記可以明確選擇，不用布林 OR 假裝三方合併。
- 未知 ID／記錄、已知記錄附加欄位及來源原文保留。未知頂層／envelope 與碰撞內容可從 importHistory、獨立 import 原文及 recoveryBundle 回復；已知 UI 只顯示認得的遊戲內容。重複的「匯入前歷史」不再巢狀複製，原歷史仍在主陣列，記錄以 currentHistoryLength／archiveKey 關聯；獨立原文及下載復原包保留完整兩端。
- 各遊戲的 GIS OAuth、Drive appDataFolder 查找／下載、scope 與記憶體 Token 實作保留，使用新的 projectId／檔名。改為手動讀取，下載後走同一個受保護預覽；沒有連接後自動上傳或還原後上傳。
- **所有雲端寫入封鎖**：UI 不開放同步上傳；Drive adapter 的 write 與非 GET request 會在取得 Token／網路前拒絕。不能只切 config 就解除。舊同步程式與 mock suite 保存在 upstream，不放入網站產物。
- 新增 module contract、遷移／驗收文件、Roadmap 模組骨架、建置與必要回歸，沒有為整合改攻略、翻譯、項目 ID 或引入統一框架。

## 2. 來源版本與實際檔案

| 遊戲 | 來源分支／完整 SHA | 搬入來源檔 |
| --- | --- | ---: |
| EDF WB | main／`766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2` | 28 |
| EDF WB2 | main／`c49be804b91ce463bfb833b791edf468a80792dd` | 43 |

兩個本機來源工作樹／暫存區起始均無變更，WB2 遠端 HEAD 與本機 SHA 一致。舊 repo 不修改、不搬 .git 歷史；舊 .github 發布 workflow、.gitignore 與 .openai hosting 識別未複製為新站設定。保留來源 SHA 與原檔 hash 於各 `source-manifest.json`，額外提供 sha256LF 避免 Windows／Linux 換行差異使 CI 誤判；不是把修改後內容更新成來源基線。

| 範圍 | 主要新增／修改 |
| --- | --- |
| Portal | portal/index.html、portal/portal.css；根 scripts/build.mjs 產生實際入口 |
| 各遊戲來源 | dist 全部、原 README／來源核對文件／資料工具與 verify 工具；完整清單見附錄及 source-manifest.json |
| 各遊戲最小修改 | dist/app.js、index.html、sw.js、cloud-config.js、cloud-sync.js、shared/drive-appdata.js |
| 各遊戲新增 | dist/migration.js、migration.css、module.json、source-manifest.json、upstream/ 原同步／Drive 實作；WB2 另保留原 verify-cloud.mjs |
| 驗證調整 | WB1 verify 的新檔名斷言；WB2 測試 URL／Key／環境與匯入 UI 操作；當前 verify-cloud 改驗證寫入封鎖 |
| 平台工具 | scripts/verify.mjs、verify-site.mjs、verify-browser.mjs、verify-upstream.mjs、verify-cloud-guard.mjs、approve-test-import.mjs、browser-runtime.mjs、根 server.mjs |
| 部署 | .github/workflows/deploy.yml、.gitattributes、.gitignore；_site 為忽略的可重建產物 |
| 規範與文件 | README、AGENTS、docs/ARCHITECTURE.md、MODULE_CONTRACT.md、MIGRATION_PLAN.md、ACCEPTANCE.md、migrations/edf-wb.md、edf-wb2.md、templates/game-module/、本報告 |

既有未追蹤的 `GAME_COMPANION_ARCHITECTURE.md` 及 `docs/reports/P0_REPORT.md` 保留。沒有 stage、commit、push、切換分支或修改來源 repo。實際逐檔清單附於文末。

## 3. 功能與測試結果

執行環境：Windows、Node v24.22.1、Git 2.56.0.windows.4、既有 Playwright runtime 與 headless Microsoft Edge。所有瀏覽器操作使用新 context 與合成資料；Google 回應為 mock，沒有使用實際 profile／玩家備份／Google 帳號。

| 檢查 | 實際結果與界線 |
| --- | --- |
| node scripts/verify.mjs | PASS；WB1 864 唯一項目／71 關，WB2 1,208 唯一項目／120 關；25 份攻略／翻譯／CSS 等原檔內容以 LF 正規化 hash 驗證不變；無損驗證器、舊新 envelope、錯遊戲拒絕及寫入封鎖 |
| WB1 原 verify.mjs | PASS；455 武器、209 角色版本、200 配件、18 推薦；一代來源、翻譯、DLC OR、V01、配件空白列與跨遊戲隔離 |
| node scripts/build.mjs | PASS；完整產生兩模組與 Portal，不需要產品套件安裝／框架編譯 |
| node scripts/verify-site.mjs | PASS；44 個發布檔、47 個本地引用，必要相對資源及 cache manifest 完整，沒有 upstream、工具或 Git／hosting metadata 混入 |
| node scripts/verify-browser.mjs | PASS；兩款選取／取消、undo、重開、搜尋／篩選、DLC、配件、關卡、收藏／筆記、跨分頁、JSON 下載／匯入差異、未知資料、配額失敗與過期預覽保護、雲端 GET／底層寫入封鎖、離線與 390px；另驗證同 origin 兩款共存不互改 |
| 特殊未知輸入 | PASS；未知物件、null、JSON 的 __proto__ Key 與已知 entry 的 count/custom 均保留，文字以 textContent 顯示，不注入 HTML |
| 舊站保護 | PASS；在隔離 context 佈置兩款舊進度／快照／備份時間 Key 與舊 cache sentinel，經新站操作與 SW 啟動後不變；這不是讀取真實舊存檔 |
| Drive guard | PASS；兩款直接呼叫 write、PATCH request 皆在取 Token／連線前拒絕；UI disabled 不是唯一防線 |
| JS 語法 | 69 份 JS/MJS 檢查通過；沒有以建置取代真實瀏覽器回歸 |
| Portal 設計檢查 | lint 0 FAIL／0 WARN；inspect 1440／768／390px 為 0 FAIL／1 WARN。WARN 為 unused-canvas，但實際是 1100px 置中欄，1440px 左右各 170px，截圖無不對稱留白，故保留。已檢視桌面與手機截圖 |

二代執行的 12 個驗證入口全部 PASS：

| 工具 | 涵蓋 |
| --- | --- |
| verify-localization.mjs | 角色繁中與搜尋 |
| verify-weapon-localization.mjs | 武器翻譯、型號與清單 |
| verify-accessory-localization.mjs | 配件完整名稱、LV 與參考來源 |
| verify-character-accessories.mjs | 各角色版本的四欄配件資格及篩選 |
| verify-content.mjs | 18 個內容選項、170 額外可見武器、104／120 關、設定／收藏保留、跨頁／備份／手機／離線 |
| verify-separated.mjs | 本篇／DLC 分頁、分母、LV、保存與手機 |
| verify-mission-modes.mjs | 五種補收模式、角色與武器、候選／篩選 |
| verify-linked-collection.mjs | 武器與角色獨立勾選、暫留、收藏及 undo |
| verify-mission-tabs.mjs | 36 推薦、搜尋／頁籤、筆記／清空／undo、legacy 備份、既有 reconcile、鍵盤與手機 |
| verify-favorites.mjs | 收藏、候選、共享篩選、筆記／備份、跨頁及手機 |
| verify.mjs | 完整基本操作、保存、下載／合併／還原、損壞存檔、儲存失敗、直接 HTML 與離線 |
| verify-cloud.mjs | 當前政策的底層寫入封鎖；不是原自動同步測試通過 |

其中匯入相關工具已調整為實際操作差異選擇、下載與確認 UI；不以測試開關跳過保護。最後的匯入歷史調整另複查 DLC 與收藏備份工具。較早的 verify-default-missing、verify-enhancements、verify-levels、verify-missions 保留但本次未全面重跑，不宣稱所有歷史工具都已驗收。WB1 沒有相同數量的原瀏覽器工具，已用兩款共用的整合測試覆蓋主要功能；其不適用的二代配件資格不當作一代功能。

測試結果與截圖位於忽略的 `outputs/integration/`、各模組 `outputs/` 及 `.taste-skill/portal/`，只含合成測試資料，不加入部署或 Git。Portal 採 editorial-greeting 方向，seed 701319605，依現有產品採 Segoe UI 與低彩度綠，使用兩個真實遊戲入口，不放虛構數字或圖片；保留置中欄並省去沒有內容的側欄／KPI。

## 4. 本機資料與 Google Drive 相容狀態

| 用途 | EDF WB | EDF WB2 |
| --- | --- | --- |
| gameId | edf-wb | edf-wb2 |
| 主進度 Key | game-companion.edf-wb.progress.v1 | game-companion.edf-wb2.progress.v1 |
| 其他本機資料 | 同前綴 snapshots.v1、backup-time、import.{uuid}、progress.v1-damaged-* | 各自 edf-wb2 前綴 |
| SW cache | game-companion.edf-wb.assets.v1 | game-companion.edf-wb2.assets.v1 |
| 新 Drive projectId | game-companion.edf-wb | game-companion.edf-wb2 |
| 新 Drive 檔名 | game-companion.edf-wb.progress.v1.json | game-companion.edf-wb2.progress.v1.json |
| 進度相容 | 保留 app:edfwb-collection／schema:1 | 保留 app:edfwb2-collection／schema:1 |

raw 進度新增 gameId、moduleVersion、revision，catalogVersion 不再被重建成目前日期。revision 僅本機計數，不是全域同步修訂或交易。原持有狀態、收藏、內容設定、關卡筆記保留；兩款沒有持有數量欄位，外來 count 等會作附加資料保留，不能假造舊站有該功能。

支援明確選檔匯入自己的舊 raw／舊 projectId envelope，以及自己的新 envelope；錯遊戲與錯版本拒絕。Drive 讀取只找新名稱、核對新 projectId，同名多份停止。舊 Token、file ID 與同步狀態不搬入；沒有操作真實 appDataFolder。

保留來源的公開 OAuth Client ID、drive.appdata scope、記憶體 Token、到期與讀取錯誤處理，但 Client 的允許 origin／Cloud Console／真實帳號可見性未驗證。**真實 Drive 上傳、下載與跨裝置相容性仍未知**；mock 只證明程式的控制流程與封鎖。

## 5. GitHub Pages 部署狀態

本機 `_site/` 的三個預定入口、相對引用、直接進入／重整、SW scope、離線及窄螢幕檢查通過。新增 workflow 的依序閘門為資料驗證 → build → artifact 驗證 → 上傳完整 artifact → main 部署；任一步失敗不進入 deploy。PR 不部署。

**沒有 commit／push／觸發 Actions／變更 GitHub Pages 設定或正式發布。** Pages 後台須使用 GitHub Actions；在取得後續 Git 操作授權並推送 main 後，仍需核對實際 run、部署 SHA 與正式三個網址。本次不能把本機 build 成功說成正式部署成功，也未變更兩個舊站入口。

本機重現：

```powershell
node scripts/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node server.mjs
# 開啟 http://127.0.0.1:4190/game-companion/
```

有既有 Playwright／Edge 的環境可再執行 `node scripts/verify-browser.mjs` 與 `node scripts/verify-upstream.mjs`。其他環境先設定 PLAYWRIGHT_REQUIRE_FROM；本機測試工具並未轉成產品依賴，CI 目前執行 Node 資料與 artifact 檢查，沒有自動跑 Edge suite。

## 6. 未完成與限制

1. 完整雲端三方 Base/Local/Remote、真正雲端衝突逐筆／批次選擇、同步中變更序號重整與多裝置競爭驗證尚未完成；雲端寫入已停用，沒有以舊 LWW 當成完成品。
2. media PATCH 的 If-Match 原子性、瀏覽器可讀 ETag 與首次建立唯一性未實證；不宣稱競爭寫入已解決。未來必須使用獨立測試來源，缺少證明就維持 fail closed，正式寫入仍需使用者確認。
3. 本機一般跨分頁延用逐項時間戳合併；同項同毫秒、裝置時鐘偏差與跨頁原子交易未宣稱解決。匯入有過期預覽檢查，但它不等於跨裝置交易。
4. 完整原文／歷史、快照會占 localStorage；不自動清使用者資料。配額不足或超過 5 MiB 匯入上限時停止，需保留下載備份另行處理。快照 12 筆不是外部備份。
5. WB2 來源沒有 WB1 那樣的完整 raw data JSON／全量產生器；已保留實際存在的 dist 資料、normalize-data.mjs、inspect_data.py 與核對文件，不虛構可從 Wiki 一鍵重產。連外 Wiki 工具及會重寫資料的產生器本次未執行。
6. 沒有重查攻略真實性／所有翻譯與掉落表，也沒有其他瀏覽器／真實手機／正式 Google／正式 CDN 驗收。這些來源限制與本次新增回歸分開記錄。
7. 沒有最終匯入真實玩家進度、逆向寫回舊站或正式切換。切換前仍應以舊站最新備份再次比對；回復程式碼不會回復資料。

## 7. 後續 Roadmap 遊戲新增流程

依 `docs/MODULE_CONTRACT.md` 與 `templates/game-module/`，新增 games/{slug}、自己的 manifest／入口／資料來源與測試。Roadmap 先定穩定 stepId、章節、依賴、完成／略過／筆記及 Schema；不拿 EDF 清單 ID 或遊戲規則當共用格式。

選適合該遊戲的技術，產物放模組 dist；僅在需要時加入模組自己的編譯工具。Portal 自動讀 manifest 產生入口，沒有舊站的遊戲不生成假舊站連結。補上必要模組驗證與隔離 browser case，再執行完整 artifact 檢查，避免破壞既有兩款。

本機與雲端識別仍須獨立；沒有雲端需求就不要加入 OAuth。未驗證的同步不得發布成可寫狀態，也不為第三款遊戲先建立中央 SDK。

## 附錄：實際檔案清單

下表由工作區與來源 manifest 比對產生；「沿用」允許 CRLF→LF 的換行正規化，沒有改攻略內容或 ID。_site、outputs、.taste-skill 為忽略產物，不列入來源變更。

| 檔案 | 狀態 |
| --- | --- |
| `.gitattributes` | 新增 |
| `.github/workflows/deploy.yml` | 新增 |
| `.gitignore` | 新增 |
| `AGENTS.md` | 新增 |
| `README.md` | 修改既有 |
| `docs/ACCEPTANCE.md` | 新增 |
| `docs/ARCHITECTURE.md` | 新增 |
| `docs/MIGRATION_PLAN.md` | 新增 |
| `docs/MODULE_CONTRACT.md` | 新增 |
| `docs/migrations/edf-wb.md` | 新增 |
| `docs/migrations/edf-wb2.md` | 新增 |
| `docs/reports/INTEGRATION_REPORT.md` | 新增 |
| `games/edf-wb/README.md` | 搬入後最小調整 |
| `games/edf-wb/data/localization-fallback.json` | 搬入沿用 |
| `games/edf-wb/data/localization-reference.json` | 搬入沿用 |
| `games/edf-wb/data/wiki-facts.json` | 搬入沿用 |
| `games/edf-wb/dist/acquisition.js` | 搬入沿用 |
| `games/edf-wb/dist/app.js` | 搬入後最小調整 |
| `games/edf-wb/dist/character-accessories.js` | 搬入沿用 |
| `games/edf-wb/dist/cloud-config.js` | 搬入後最小調整 |
| `games/edf-wb/dist/cloud-sync.js` | 搬入後最小調整 |
| `games/edf-wb/dist/content.js` | 搬入沿用 |
| `games/edf-wb/dist/data.js` | 搬入沿用 |
| `games/edf-wb/dist/details.js` | 搬入沿用 |
| `games/edf-wb/dist/index.html` | 搬入後最小調整 |
| `games/edf-wb/dist/migration.css` | 新增 |
| `games/edf-wb/dist/migration.js` | 新增 |
| `games/edf-wb/dist/mission-facts.js` | 搬入沿用 |
| `games/edf-wb/dist/missions.js` | 搬入沿用 |
| `games/edf-wb/dist/recommendations.js` | 搬入沿用 |
| `games/edf-wb/dist/shared/drive-appdata.js` | 搬入後最小調整 |
| `games/edf-wb/dist/shared/google-auth.js` | 搬入沿用 |
| `games/edf-wb/dist/shared/progress-envelope.js` | 搬入沿用 |
| `games/edf-wb/dist/style.css` | 搬入沿用 |
| `games/edf-wb/dist/sw.js` | 搬入後最小調整 |
| `games/edf-wb/dist/translations.js` | 搬入沿用 |
| `games/edf-wb/dist/usability.css` | 搬入沿用 |
| `games/edf-wb/docs/data-review.md` | 搬入沿用 |
| `games/edf-wb/docs/reference-translations.md` | 搬入沿用 |
| `games/edf-wb/module.json` | 新增 |
| `games/edf-wb/scripts/build-data.mjs` | 搬入沿用 |
| `games/edf-wb/server.mjs` | 搬入沿用 |
| `games/edf-wb/source-manifest.json` | 新增 |
| `games/edf-wb/upstream/cloud-sync.js` | 新增 |
| `games/edf-wb/upstream/drive-appdata.js` | 新增 |
| `games/edf-wb/verify.mjs` | 搬入後最小調整 |
| `games/edf-wb2/README.md` | 搬入後最小調整 |
| `games/edf-wb2/dist/acquisition.js` | 搬入沿用 |
| `games/edf-wb2/dist/app.js` | 搬入後最小調整 |
| `games/edf-wb2/dist/character-accessories.js` | 搬入沿用 |
| `games/edf-wb2/dist/cloud-config.js` | 搬入後最小調整 |
| `games/edf-wb2/dist/cloud-sync.js` | 搬入後最小調整 |
| `games/edf-wb2/dist/content.js` | 搬入沿用 |
| `games/edf-wb2/dist/data.js` | 搬入沿用 |
| `games/edf-wb2/dist/details.js` | 搬入沿用 |
| `games/edf-wb2/dist/index.html` | 搬入後最小調整 |
| `games/edf-wb2/dist/migration.css` | 新增 |
| `games/edf-wb2/dist/migration.js` | 新增 |
| `games/edf-wb2/dist/missions.js` | 搬入沿用 |
| `games/edf-wb2/dist/recommendations.js` | 搬入沿用 |
| `games/edf-wb2/dist/shared/drive-appdata.js` | 搬入後最小調整 |
| `games/edf-wb2/dist/shared/google-auth.js` | 搬入沿用 |
| `games/edf-wb2/dist/shared/progress-envelope.js` | 搬入沿用 |
| `games/edf-wb2/dist/style.css` | 搬入沿用 |
| `games/edf-wb2/dist/sw.js` | 搬入後最小調整 |
| `games/edf-wb2/dist/translations.js` | 搬入沿用 |
| `games/edf-wb2/dist/usability.css` | 搬入沿用 |
| `games/edf-wb2/docs/accessory-localization.md` | 搬入沿用 |
| `games/edf-wb2/docs/google-drive-sync.md` | 搬入沿用 |
| `games/edf-wb2/docs/localization-review.md` | 搬入沿用 |
| `games/edf-wb2/docs/weapon-localization.md` | 搬入沿用 |
| `games/edf-wb2/inspect_data.py` | 搬入沿用 |
| `games/edf-wb2/module.json` | 新增 |
| `games/edf-wb2/normalize-data.mjs` | 搬入沿用 |
| `games/edf-wb2/server.mjs` | 搬入沿用 |
| `games/edf-wb2/source-manifest.json` | 新增 |
| `games/edf-wb2/upstream/cloud-sync.js` | 新增 |
| `games/edf-wb2/upstream/drive-appdata.js` | 新增 |
| `games/edf-wb2/upstream/verify-cloud.mjs` | 新增 |
| `games/edf-wb2/verify-accessory-localization.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-character-accessories.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-cloud.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-content-support.mjs` | 搬入沿用 |
| `games/edf-wb2/verify-content.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-default-missing.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-enhancements.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-favorites.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-levels.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-linked-collection.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-localization.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-mission-modes.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-mission-tabs.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-missions.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-separated.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify-weapon-localization.mjs` | 搬入後最小調整 |
| `games/edf-wb2/verify.mjs` | 搬入後最小調整 |
| `portal/index.html` | 新增 |
| `portal/portal.css` | 新增 |
| `scripts/approve-test-import.mjs` | 新增 |
| `scripts/browser-runtime.mjs` | 新增 |
| `scripts/build.mjs` | 新增 |
| `scripts/verify-browser.mjs` | 新增 |
| `scripts/verify-cloud-guard.mjs` | 新增 |
| `scripts/verify-site.mjs` | 新增 |
| `scripts/verify-upstream.mjs` | 新增 |
| `scripts/verify.mjs` | 新增 |
| `server.mjs` | 新增 |
| `templates/game-module/README.md` | 新增 |
| `templates/game-module/module.json.example` | 新增 |
