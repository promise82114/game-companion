---
name: gc-progress-storage
description: 為 Game Companion 接入獨立本機進度、跨分頁更新、IndexedDB 交易或既有操作日誌，涵蓋版本相容、損壞原文保護與周目作用域。
---

# 本機進度與跨分頁

先讀[專案契約](../references/project-contract.md)。先決定目標資料模型，再選相符儲存介面；不能只複製 key 或把 `revision` 當成交易鎖。

## 現有實作位置

| 儲存模型 | 來源與可用介面 |
| --- | --- |
| EDF localStorage 操作日誌 | [WB app](../../games/edf-wb/dist/app.js)／[WB2 app](../../games/edf-wb2/dist/app.js) 的 `fresh`、`validate`、`mergeLatest`、`persist`、`EDF_CHECKLIST_STORAGE`；[sync-core](../../games/edf-wb/dist/shared/sync-core.js) 的 `Journal`／`preserveConcurrent` 寫入選項 |
| Mycopunk localStorage | [model](../../games/mycopunk/dist/model.js) 的 `emptyCollection`、`validateCollection`、`parseCollection`、`mergeCollections`；[app](../../games/mycopunk/dist/app.js) 的 `readStorage`／`writeRecord`。這是讀取合併後保存，不具 IndexedDB 交易保證 |
| 共用 IndexedDB records store | [shared/roadmap-store.js](../../shared/roadmap-store.js)：`createStore(config, core, onChange)`；`open`、`get`、`raw`、`stamp`、`update`、`checkpoint`、`archive`、`exportAll`、`commitSync`、`close` |
| Talos 的 source／artifact 路徑 wrapper | [roadmap/store.js](../../games/talos2/dist/roadmap/store.js)，使用共用 store 預設的 steps／trophies／backups／branches／settings |
| Grounded 自訂 validator／fresh | [model](../../games/grounded/dist/model.js) 的 `config`、`validateProgress`、`world`／`run`／`player`、`collectionBucket`；[app](../../games/grounded/dist/app.js) 的作用域檢查 `update` |
| Thank Goodness boolean maps | [model.js](../../games/thank-goodness-youre-here/dist/model.js) 的 `ProgressStore`：state／archives、`transact`、`toggle`、`commitSync`；與共用 records store 的資料庫布局不同 |

## 接入步驟

1. 定義自己 fresh／validator／schema，列出每一 map 與值型別、未知欄位保留規則、完整 namespace 清單及備份格式。空白初始值只用於不存在的資料，壞檔不能視同未使用。
2. 需要交易的新 Roadmap 可參考 `createStore`。先確認 `core.clone`／`rebase` 與自訂 `fresh`／`validateProgress` 相容；未配置 validator 時會套 Talos 預設群組，不能直接用於任意 schema。
3. `await open()` 後再讀資料；共用 store 的 `get`／`stamp`／`update` 為非同步，`update(fn, expected)` 在同一 readwrite transaction 讀最新值、驗證、寫入。callback 內維持同步變更，別加入等待網路的工作。
4. 本機修改只改當次目標欄位，保留其他資料。長時間預覽在套用時帶原文條件；同步用 `commitSync(start, merged)` rebase 保留期間新增的編輯。使用 EDF 時保留 Journal 回放／checkpoint，不退回整包 localStorage 覆寫。
5. BroadcastChannel／storage 事件只通知自己的 namespace；收到通知重新讀取並更新 UI。儲存失敗反映錯誤，損壞原文可匯出；不要清 DB 或覆寫 fresh。
6. 周目資料先決定世界／玩家／周目歸屬與繼承分類。Grounded 寫入會再次比對作用域，跨分頁切換時拒絕原操作；新增周目走備份／確認並保留舊資料。
7. 驗證 source 及 `_site` 的共享相對 import，讀取 [build](../../scripts/build.mjs) 的共用資源發布規則；新 adapter 不應複製一份 store 造成分岔。

## 驗證方式

依[驗證參考](../references/verification.md)跑目標資料及瀏覽器測試。合成案例：兩分頁同時改不同欄位皆保留、同欄位符合所選衝突語意、取消明確保存 false／未完成、預覽後他頁編輯被拒絕、未知欄位完整匯出、quota／transaction abort 不覆蓋舊進度、schema 不相容可取回原文。周目另測切換時拒絕過期操作與繼承分類。

## 限制

Mycopunk 的本機 revision 與讀取合併不是跨分頁原子交易；若新頁面需要更強保證須另外設計及驗證。Grounded 現行 UI 沒有世界／成員管理、個人標記或筆記編輯；保留 schema 不表示應新增這些功能。儲存接入不自動包含 Drive 或備份 UI。
