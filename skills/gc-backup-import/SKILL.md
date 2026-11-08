---
name: gc-backup-import
description: 為 Game Companion 接入 JSON 備份、兩端原文保存、逐筆差異匯入、復原包或初始化前保護，保留未知資料並拒絕過期預覽及備份失敗後的寫入。
---

# 備份、差異匯入與復原

先讀[專案契約](../references/project-contract.md)。接入須同時追到解析端、預覽 UI、原文保存、下載與實際儲存寫入，不能只複製按鈕或 parser。

## 現有實作位置

- EDF：[WB migration](../../games/edf-wb/dist/migration.js)、[WB2 migration](../../games/edf-wb2/dist/migration.js) 的 `preview`／`EDF_MIGRATION`；各 app 的 `validate`、`saveSnapshot`、`EDF_CHECKLIST_STORAGE`，原有來源格式與 envelope 轉入目前 namespace。
- Mycopunk：[migration.js](../../games/mycopunk/dist/migration.js) 的 `createImportReview`／`withRecovery`；[model.js](../../games/mycopunk/dist/model.js) 的 `parseCollection`／`makeBackup`；[app.js](../../games/mycopunk/dist/app.js) 的 `exportCollection`。原文包含 persisted 及必要的 memory 副本。
- Thank Goodness：[model.js](../../games/thank-goodness-youre-here/dist/model.js) 的 `parse`、`importPlan`、`applyImport`、`exportData`、`resetData`／`resetProgress`；[app.js](../../games/thank-goodness-youre-here/dist/app.js) 的備份／差異／初始化 UI。
- Talos：[app.js](../../games/talos2/dist/app.js) 的備份與匯入 UI；[shared store](../../shared/roadmap-store.js) 的 `stamp`、`archive`、`update(fn, expected)`、`exportAll`。
- Grounded：[app.js](../../games/grounded/dist/app.js) 的 `preview`、`renderReview`、`importReady`；[model.js](../../games/grounded/dist/model.js) 的 `importData`。

## 接入步驟

1. 列出目標支援格式：純進度、雲端 envelope、完整匯出或 recoveryBundle；明列各自可還原的部分。保留檔案大小、欄位型別及遊戲／平台／schema 驗證，不把不同格式直接整包覆蓋。
2. 在產生可套用的預覽前持久化本機／來源兩端原文；必要時另保護記憶體中尚未持久化的進度。保存失敗就停止，不能用解析後的物件取代唯一原文副本。
3. 對聯集 ID／欄位比較。單邊資料保留；來源缺欄位不代表刪除。重疊差異逐筆或批次選擇，false／空筆記是明確值，不因 falsy 丟失。未知項目保留或以可復原 archive 保存碰撞原文。
4. 先下載包含當次兩端原文的復原包，再由使用者確認已保存／可讀；按鈕 disabled 之外，寫入函式也檢查下載、確認及所有選擇完成。下載 API 成功只表示發起下載，不保證磁碟檔案可讀。
5. 套用時重新比對預覽原文／stamp 及必要 archive。預覽後有編輯、原文遺失、下載／quota／交易失敗均停止，要求重新比較；採交易或目標模型的條件寫入。
6. 完整匯出含未知資料、快照、匯入原文與自己 namespace 的同步復原。明列復原入口：Thank Goodness 可選 recoveryBundle 的 localRaw／sourceRaw；Talos 要選定 progress／sourceRaw 再匯入；Grounded `importData` 支援 progress 與 localRaw，其他 archives 連同來源原文保存。不能承諾所有完整包均可直接一鍵覆寫。
7. 只有要求初始化時，參考 Thank Goodness：下載＋確認＋stamp，單一交易保存前快照並將已知 ID 設 false，未知資料及 sync Base／pending 保留。不要刪 DB、清配對或自動上傳。

## 驗證方式

跑目標模組資料及隔離瀏覽器套件，詳見[驗證參考](../references/verification.md)。用新 context、合成資料測新／舊格式、其他遊戲拒絕、false／空字串、未知 ID／欄位、來源少欄位、復原包可讀、未下載／未確認／選擇未齊禁止套用。

另測預覽後本頁／他頁編輯、取消後選第二檔、原文遺失、下載失敗、quota 與 transaction abort；原資料保留。初始化測快照可復原、只歸零已知項、未知值／同步狀態保留、操作中新編輯使預覽失效。

## 限制

各模組上限不同：Mycopunk 10 MiB、Thank Goodness parser 5 MiB、Grounded 檔案 20 MB，接入前讀實際判斷，不能統一宣稱。累積完整歷史可能超過一般匯入限制，須說明復原方式並保留原檔。網站備份不是 PS5 遊戲存檔。
