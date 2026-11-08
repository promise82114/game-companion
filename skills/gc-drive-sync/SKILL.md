---
name: gc-drive-sync
description: 為 Game Companion 模組接入獨立手動 Google Drive 同步，沿用逐 OAuth grant 合成驗證、strong If-Match、三方合併、帳號隔離與競爭編輯保護。
---

# 手動 Drive 同步

先讀[專案契約](../references/project-contract.md)、[同步報告](../../docs/reports/DRIVE_SYNC_REPORT.md)及目標儲存介面。此能力目前在 EDF 兩作、Talos II、Thank Goodness 接入；Mycopunk／Grounded 尚未接入。

## 現有實作位置

| 層次 | 參考來源 |
| --- | --- |
| OAuth／grant 世代 | [EDF google-auth.js](../../games/edf-wb/dist/shared/google-auth.js) |
| 條件寫入與逐 grant 合成驗證 | [drive-appdata.js](../../games/edf-wb/dist/shared/drive-appdata.js)：`DriveAppData`、`verifySafety`、`write` |
| 備份 envelope／project 驗證 | [progress-envelope.js](../../games/edf-wb/dist/shared/progress-envelope.js) |
| 三方合併／衝突／rebase | [EDF sync-core](../../games/edf-wb/dist/shared/sync-core.js)、[Talos sync-core](../../games/talos2/dist/shared/sync-core.js)、[Thank Goodness sync-core](../../games/thank-goodness-youre-here/dist/shared/sync-core.js) |
| 配對、Base／pending、結果未知復原 | [EDF sync-session](../../games/edf-wb/dist/shared/sync-session.js)、[Talos 非同步 session](../../games/talos2/dist/shared/sync-session.js)、[Thank Goodness session](../../games/thank-goodness-youre-here/dist/shared/sync-session.js) |
| 模組 UI／儲存銜接 | [EDF cloud-config](../../games/edf-wb/dist/cloud-config.js)、[cloud-sync](../../games/edf-wb/dist/cloud-sync.js)；[Talos setupSync](../../games/talos2/dist/roadmap/sync.js)；[Thank Goodness app](../../games/thank-goodness-youre-here/dist/app.js) |
| 獨立安全驗證入口 | [tools/sync-safety](../../tools/sync-safety)、[驗收清單](../../docs/THANK_GOODNESS_DRIVE_ACCEPTANCE_CHECKLIST.md) |

## 接入步驟

1. 確認需要雲端且已有安全備份／復原、本機穩定 schema。分配獨立 projectId、檔名、namespace、帳號 identity；新模組先維持 `cloudWritesEnabled:false`，manifest 開關本身不授予安全寫入能力。
2. 依實際模型配置 merge groups：EDF 為 entries／favorites／content／missionNotes；Talos 為 steps／trophies／backups／branches／settings；Thank Goodness 為 stepDone／trophyEarned。Grounded 多世界結構與 Mycopunk records 需自己的適配及回歸，不能直接選其中一套群組。
3. 對照 session 實際讀取的 local 介面及同步／非同步契約，接入 validate、get／refresh、stamp／sequence、checkpoint、commitSync。IndexedDB 使用等待儲存的 session，不能把 Promise 當成進度資料。
4. 每次新 grant 先對獨立唯一合成檔執行 `verifySafety`，通過 strong ETag／條件成功、過期 412、競爭一勝一拒及內容核對才解鎖進度寫入。換帳號／grant／中斷時重設舊 proof 及 pending UI；adapter 層也必須拒絕未驗證寫入。
5. 同步只由明確操作啟動。首次配對需確認；衝突顯示 Base／Local／Remote 供選擇，確認時重新讀取並拒絕過期。同步期間新編輯以 rebase／expected-value 保留；取消勾選及空字串要能傳遞。
6. PATCH 每次必帶 strong `If-Match`；沒有可信條件能力就封鎖。逾時等結果未知時保留 pending、核對 `syncRevision`，不能盲目重送。檔名不保證唯一，保留既有選檔／配對與重複檔案處理。
7. 完成目標模組的合成競爭與 UI 回歸後，才能依專案閘門啟用。正式 Google 測試由使用者在正式網域執行，記錄結果及限制，mock 通過不標成已驗收。

## 驗證方式

依[驗證參考](../references/verification.md)跑 `verify-cloud-guard.mjs`、`verify-sync.mjs`、`verify-sync-browser.mjs` 及目標模組 verify／瀏覽器套件。根 EDF 套件不會自動驗證新遊戲 adapter；在既有 fixture 及目標測試加入新模型情境。

必測：未驗證阻擋、缺／弱 ETag、忽略 If-Match、412、競爭、不同帳號／重新 grant、首次配對／衝突取消、未知資料、false／空筆記、儲存失敗、同步中新編輯與結果未知核對。只用合成資料及新 context，不使用正式備份或 profile。

## 限制

禁止降級為無條件覆寫、自動背景上傳或中央登入／同步。`upstream/` 舊自動同步不適用；`verify-cloud.mjs` 的舊說明不代表當前完整同步覆蓋。Token 只留記憶體，不寫入日誌、文件或復原包。現有 OAuth 設定不代表新來源 origin 已通過正式授權。
