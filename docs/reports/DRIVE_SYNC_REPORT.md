# EDF WB／WB2 Drive 同步安全報告

日期：2026-10-31（Asia/Taipei）；模組 1.1.0。

使用者授權完成同步、通過測試後啟用，並指定直接發布至已綁定網域，自行進行真實 Google 測試。因此不再要求 localhost Google 登入。**目前通過的是合成資料與隔離瀏覽器測試，尚無真實 Drive 測試成功證據。** 上線功能每次授權仍需以唯一名稱測試檔驗證條件寫入；失敗時不開放遊戲進度寫入。

## 已完成

- 沿用既有 Google OAuth Client、GIS Token Flow、drive.appdata scope 與 Drive appDataFolder；沒有新增登入服務、權限、帳號中心、後端或產品套件。
- 各模組保留獨立介面、資料、ID、Key、Cache、Drive projectId／檔名；Portal 只導航。Google Token 僅留記憶體。
- Base／Local／Remote 三方合併：單端修改自動合併、取消勾選／空筆記可傳播、雙端不同修改顯示衝突；沒有 Base 時明確首次配對。
- 衝突表顯示共同 Base、本機、雲端，逐筆或批次選擇；確認時重新下載核對 ID／ETag 與本機 stamp，預覽過期重新比較，不沿用舊選擇。
- 本機不可變操作日誌與含欄位版本的 checkpoint；日誌整理先保存 checkpoint 再移除已捕獲操作，整理不使未變更的預覽過期。同步 rebase 到最新本機，再以 expected-value 條件套用，期間編輯保留為 dirty，下一次手動同步。
- 對仍開啟的 1.0 新站分頁主 Key 改寫，另存完整原文 archive／pending，透過「比較舊分頁另存的進度」進行備份預覽；處理前停止雲端同步。不是掃描舊網站 Key。
- 每次 OAuth generation 的 runtime probe：唯一合成檔正確 ETag 更新、過期 ETag 必回 412、平行同 ETag 必一勝一拒、讀回勝方內容。授權過期、切換、斷線即清除 proof。
- 進度 PATCH 強制 strong If-Match；v3 header 無法取得時讀 v2 JSON etag，版本不一致／無強 ETag 停止。這項跨 API 相容性尚待真實測試，不作成功假設。
- 新增檔案先取得 ID，完整 pending 持久化後才連線寫入。網路中斷不盲目重送；下次先讀 syncRevision，已確認的修訂可復原本機提交。
- Base 以遊戲及 Drive permissionId 的 SHA-256 雜湊隔離，僅在遠端確認且本機保存成功後更新；不持久化 email 或 Token。首次配對／衝突／還原均不自動寫入舊備份。
- 同步使用每遊戲／帳號 Web Lock，避免同瀏覽器兩分頁同時發起交易；跨裝置由條件 PATCH 保護。無 Web Locks 時停止同步，仍能用本機清單與 JSON。
- 重複同名檔、Base 配對消失／改變、錯誤 project/game、未知來源、授權失效、配額不足皆停止，不任選檔案覆寫。
- 關閉背景自動上傳；只以「立即同步進度」發起。手動下載／還原走既有備份差異預覽。

## 使用與實際 Google 驗證

正式獨立入口：[Drive 獨立競爭測試](https://promise82114.github.io/game-companion/sync-safety/)。可選 WB 或 WB2，載入服務、Google 授權，再按建立獨立測試檔並驗證。此頁不載入 app／玩家進度、不讀取遊戲備份；結果可下載，只有去識別 proof 與狀態，沒有 Token。

遊戲內操作：雲端進度 → 連接 Google → 驗證 Drive 寫入安全 → 立即同步 → 首次配對／衝突確認。測試頁 proof 不跨分頁傳遞；遊戲內也須對當次 grant 驗證。通過後才開放該頁的手動同步，重整後重新連接與驗證。

每次驗證建立一個 game-companion.{gameId}.sync-safety-test.{uuid}.json，保留作核對、不自動刪除；只含 synthetic marker。這些檔位於 appDataFolder，不會出現在一般檔案清單。實作測試過程沒有使用真實帳號或正式備份。

## 驗證證據

| 指令／範圍 | 結果 |
| --- | --- |
| node scripts/verify-sync.mjs | 兩款 PASS；純合併、日誌／整理穩定 stamp、跨頁編輯、首次配對、衝突、過期預覽、上傳中編輯、遺失回應復原、配額、v2 ETag fallback、stale412／parallelCAS、拒絕不安全 mock、grant 失效 |
| node scripts/verify-sync-browser.mjs | 兩款隔離 Edge PASS；mock GIS／HTTP Drive、每次授權閘門、首次配對、實際逐筆／批次 UI、過期選擇、另一分頁同步中編輯、401／帳號隔離、重複檔停止、舊分頁原文、390px；outputs/sync/browser-result.json 與截圖僅為本機產物 |
| node scripts/verify-browser.mjs | 兩款主要操作／匯入／未知資料／快照／離線／手機／遊戲隔離與合成舊 Key／cache sentinel PASS |
| WB2 12 個既有入口 | 11 個於整輪 PASS；verify-content 初次 FAIL：多次匯入歷史在 journal 與全量標記重複造成配額不足。改小型非密碼學內容標記、無條件操作不複製 expected、大日誌提早整理後，focused verify-content PASS；保留備份保護，未降低配額檢查 |
| verify／build／verify-site／verify-cloud-guard | PASS；23 份不可變內容 LF hash、50 個 artifact 檔、56 個本地引用；未驗證 adapter 寫入與公開非 GET 仍被封鎖 |
| 真實 Google OAuth／遠端競爭 | 未執行，依使用者指示改由正式網域上線後測試；不得由上述 mock 推定已驗收 |

## 儲存與相容性

既有新站 progress.v1 主 Key 相容保留，首次啟動用其內容建立日誌。schema／app／攻略 ID 不變；moduleVersion 1.1.0，storageVersion 2 僅本機。舊 raw JSON／envelope 仍經明確匯入，未知資料與兩端原文保留。新站雲端 envelope 新增 syncRevision／baseRevision，journalSignature／storageVersion 不上傳。

所有下列 Key 都加上 game-companion.{gameId}. 前綴：journal.checkpoint.v1、journal.op.{uuid}、journal.external.archive.{uuid}、journal.external.pending、sync.base.{identityHash}、sync.pending.{identityHash}、sync.recovery.{uuid}；原進度、快照、import 原文仍獨立。各模組 SW assets.v2 只清自己的 prefix。帳號切換不清掉其他帳號 Base／pending。

原文、歷史、快照與同步復原紀錄占用 localStorage；未知資料不自動刪除。大資料可能達到瀏覽器配額，屆時停止操作並要求下載備份。操作已進日誌但主 mirror 寫入失敗時會報錯，原文與日誌可復原；不宣稱瀏覽器多 Key 具有資料庫交易性。

## 實際新增／修改檔案

兩個 games/edf-wb、games/edf-wb2 都修改 module.json、README、dist/app.js、cloud-config.js、cloud-sync.js、index.html、migration.js／migration.css、shared/drive-appdata.js、shared/google-auth.js、sw.js；新增 dist/shared/sync-core.js 與 sync-session.js。原 Google Client／scope 不變，Auth 僅加入 generation。原始 upstream 不修改、不發布。

平台修改 portal/index.html、scripts/build.mjs、verify.mjs、verify-site.mjs、verify-browser.mjs、.github/workflows/deploy.yml；新增 scripts/fixtures/drive.mjs、verify-sync.mjs、verify-sync-browser.mjs、tools/sync-safety/index.html／test.js。WB2 verify-content.mjs 增加匯入成功斷言，避免只從後續數量推斷失敗。

文件同步更新根 README、AGENTS、docs/ARCHITECTURE.md、ACCEPTANCE.md、MIGRATION_PLAN.md、MODULE_CONTRACT.md、migrations/edf-wb.md／edf-wb2.md、INTEGRATION_REPORT.md 與 templates/game-module/README.md。本報告為新增；P0、原始規格、來源 manifest、攻略、翻譯與 ID 不改寫。

## 限制與後續

- 真實 Drive 是否支援此路徑的 strong ETag／If-Match，需由正式網域 probe 回報。失敗只影響雲端可寫性，本機遊戲與 JSON 可用；不能為了通過改成無條件 PATCH。
- 跨裝置同時首次建立不同 ID，Drive 檔名沒有唯一約束；可能留下兩份新檔，之後會偵測重複並停止，不聲稱已消除此競爭。
- 遠端成功後讀回只能證明該次確認，不代表後續無其他寫入。下一次同步重新讀取；有新修訂依 Base 比較。結果未知保留 pending 與兩端資料。
- 同一筆在多分頁同時編輯按日誌 (clock,id) 決定順序，未知資料保留；沒有宣稱任意時鐘偏差、瀏覽器儲存故障、惡意腳本或整體資料庫交易已解決。
- 沒有自動刪除測試檔、同名檔或舊備份，沒有改舊 repo／切換舊網址，也未用正式存檔做實驗。
- 新增 Roadmap 遊戲照 MODULE_CONTRACT 建獨立模組／ID／Schema／namespace，預設關閉雲端；需要同步時才納入同等回歸及授權驗證，不建立中央 SDK。

## 發布證據

本次發布進行中；完成後補記提交、Actions、Deployment 與正式網站產物核對。歷史首發見 INTEGRATION_REPORT.md。
