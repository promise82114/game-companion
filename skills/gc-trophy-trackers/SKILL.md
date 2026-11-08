---
name: gc-trophy-trackers
description: 為 Game Companion 接入獎盃獨立確認、跨章多步 tracker、候選點去重、分歧與人工核對矩陣，明確區分攻略完成、遊戲條件及實際跳盃。
---

# 獎盃與衍生追蹤

先讀[專案契約](../references/project-contract.md)。清單、攻略與地圖引用同一份進度，計數由紀錄推導，實際跳盃由使用者獨立確認。

## 現有實作位置

| 類型 | 來源與入口 |
| --- | --- |
| 跨章 tracker／多步驟獎盃 | [Thank Goodness guide](../../games/thank-goodness-youre-here/dist/guide.json) 的 `trackers`、獎盃 `progress.stepIds`；[app](../../games/thank-goodness-youre-here/dist/app.js)、[model](../../games/thank-goodness-youre-here/dist/model.js) 的 `stepDone`／`trophyEarned` |
| 獎盃摘要與獨立狀態 | [Talos trophies](../../games/talos2/dist/roadmap/trophies.js) 的 `trophyProgress`；[trophy-guide-data](../../games/talos2/dist/trophy-guide-data.js)、[trophy-names](../../games/talos2/dist/trophy-names.js) |
| 多個候選點共用身分 | [Talos artifacts](../../games/talos2/dist/roadmap/artifacts.js)：`artifactProgressId`、`artifactForCandidate`、`artifactCounts`；[collections](../../games/talos2/dist/roadmap/collections.js) |
| 三市長與手動主機備份 | [Talos data](../../games/talos2/dist/data.js)、[mayor-research](../../games/talos2/dist/mayor-research.js)、[ux-safety](../../games/talos2/dist/ux-safety.js)、[app](../../games/talos2/dist/app.js) 的 branches／backups 操作 |
| Super Win／第一輪查漏、NG+ 與當輪計數 | [Grounded data](../../games/grounded/dist/data.js) 的 `superWinConditions`／`ngRules`；[roadmap-progress](../../games/grounded/dist/roadmap-progress.js) 的 `remixReview`；[model](../../games/grounded/dist/model.js) 的 `collectionBucket`；[app](../../games/grounded/dist/app.js) 的 `matrixHtml`／`ngHtml` |

## 接入步驟

1. 明列平台、本體／DLC 範圍、獎盃穩定 ID、官方名稱／翻譯及來源。沒有可靠官方數字 ID 時保持未知；第三方來源識別碼另存，不能冒充 PSN ID。
2. 將 tracker 定義為現有 step／item ID 的引用集合。同一操作在攻略、tracker、獎盃細節中重複呈現時，共用同一核取入口；不同種類進度不互相代填。
3. 以完整引用集合計分母、以實際已確認進度計分子，去重並檢查未知 ID。搜尋只改顯示，不改分母；手動計數標示為人工紀錄。
4. 同物多候選位置分開保存物品身分與位置身分。Talos 具名遺物與舊手動數量不相加，目標摘要取兩者較大值；這是該模組相容規則，新遊戲另定。
5. 條件矩陣、離開前核對、分歧路線與實際獎盃分別保存。缺少前置或未查證條件保留提醒，不能用「全勾選」保證解鎖。
6. 新周目需要自己的作用域與明確繼承規則；新增前備份／確認，保留舊周目，詳見 [progress-storage](../gc-progress-storage/SKILL.md)。主機備份只記使用者手動確認與路線順序。

## 驗證方式

跑相應模組 verify 及隔離瀏覽器套件，見[驗證參考](../references/verification.md)。新增合成案例：跨章同 ID 多處顯示只計一次、取消同步更新所有視圖、步驟完成不代勾獎盃、獎盃完成不代填步驟、未知項目保留、候選點去重、舊數量相容、周目繼承與獨立計數。

## 限制

Grounded 每類都是部分庫，矩陣不是遊戲百分比；Gold Cards 不列作 Super Win 必需。Talos 文字 30／遺物 10 為獎盃目標，不是全部物件總量。Thank Goodness tracker 為攻略檢查，不能證明必要互動次數。網站備份不包含 PS5 存檔；PS5 真實跳盃及分歧重現仍須實機驗收。
