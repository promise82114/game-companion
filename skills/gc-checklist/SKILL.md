---
name: gc-checklist
description: 為 Game Companion 遊戲頁面接入收集清單、搜尋篩選、內容可見性、關卡補收、收藏或筆記，沿用既有模組的穩定 ID 與進度語意。
---

# 收集清單與補收工具

先讀[專案契約](../references/project-contract.md)及[功能對照](../references/game-inventory.md)的目標遊戲段落。依資料類型選來源，避免把 EDF 代際規則套到其他遊戲。

## 現有實作位置

| 能力 | 來源與搜尋入口 |
| --- | --- |
| 多語／關卡代號搜尋、分類／LV／版本／取得篩選、統計卡 | [EDF WB app](../../games/edf-wb/dist/app.js)、[WB2 app](../../games/edf-wb2/dist/app.js)：`matchesSearch`、`sectionItems`、`weaponLevelStats`、`accessoryCategoryStats` |
| DLC／特典與季票父子設定 | [WB content](../../games/edf-wb/dist/content.js)、[WB2 content](../../games/edf-wb2/dist/content.js)；app 的 `available`、`changeContent` |
| WB2 角色版本四欄資格／多選交集 | [character-accessories.js](../../games/edf-wb2/dist/character-accessories.js)、app 的 `characterAccessoryCells` |
| 關卡補收、武器去重、角色獨立勾選、收藏／筆記 | WB2 app 的 `missionData`、`visibleWeaponTargets`、`missionContent`、`renderFavorites`、`saveMissionNote`；[missions](../../games/edf-wb2/dist/missions.js)、[recommendations](../../games/edf-wb2/dist/recommendations.js)、[acquisition](../../games/edf-wb2/dist/acquisition.js) |
| 品質／tag／tracked 與排序 | [Mycopunk model](../../games/mycopunk/dist/model.js)：`buildSearchIndex`、`filterUpgrades`、`sortUpgrades`；[app](../../games/mycopunk/dist/app.js)：`writeRecord` |
| 區域／三態／用途／查證／條件篩選 | [Grounded app](../../games/grounded/dist/app.js)：`filteredItems`、`collectionRow`；[model](../../games/grounded/dist/model.js)：`collectionState`、`collectionVisible` |
| 同物多候選點去重、區域計數 | [Talos artifacts](../../games/talos2/dist/roadmap/artifacts.js)、[collections](../../games/talos2/dist/roadmap/collections.js) |

## 接入步驟

1. 先定義穩定 item ID、原名／翻譯、分類、版本、取得條件與資料覆蓋範圍。把顯示文字與進度 key 分開。
2. 定義可見性、搜尋、統計各自的資料集合。DLC 停用只隱藏項目，保留取得／收藏／筆記；全清單統計和篩選結果數須標清楚，避免搜尋改變分母。
3. 清單、關卡小卡、攻略、地圖共用同一進度 ID／寫入入口。武器與角色分別確認；一個物品多候選點使用共同身分，不重複計數。
4. 關卡候選由自己的來源資料推導，保留未知／特殊條件。需要暫留剛完成卡片時沿用 EDF 的記憶體暫留做法；切視圖可清理，但不寫入備份。
5. 收藏及筆記只有需要時才接入進度、復原／快照、匯入與同步群組。Grounded／Talos 已移除筆記 UI，不能因歷史欄位存在就恢復介面。
6. 用 [progress-storage](../gc-progress-storage/SKILL.md) 及 [backup-import](../gc-backup-import/SKILL.md) 保存操作；由實際能力提供批次勾選與復原，不假定各來源都具備。

## 驗證方式

依[驗證參考](../references/verification.md)執行模組檢查及對應瀏覽器套件。EDF WB2 可用 `verify-upstream.mjs` 選 `verify-content.mjs`、`verify-character-accessories.mjs`、`verify-mission-modes.mjs`、`verify-linked-collection.mjs`、`verify-mission-tabs.mjs`、`verify-favorites.mjs`。

新增合成案例：名稱／代號搜尋、多條件交集、空結果與清除、DLC 關閉再開仍保留進度、取消勾選、跨視圖一致、來源不同版本、去重、筆記清空／重整／跨分頁、手機鍵盤操作。只讀篩選不代填完成狀態。

## 限制

候選占比不是掉落機率，本站清單比例不是遊戲達成度或獎盃分母。Grounded 53 筆為部分庫；Talos 手動計數與具名勾選有相容規則，不能直接相加。資料總量及資格必須依新遊戲查證。
