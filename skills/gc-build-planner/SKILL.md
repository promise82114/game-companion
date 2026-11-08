---
name: gc-build-planner
description: 參考 Mycopunk 為 Game Companion 接入資料驅動的配裝推薦、六角格排放、Worker 求解與配置匯出，適用於具有明確格形、資格及版本規則的配裝工具。
---

# 配裝推薦與六角格求解

先讀[專案契約](../references/project-contract.md)及 [Mycopunk README](../../games/mycopunk/README.md)。這是 Mycopunk 專屬能力的重用指引；新遊戲須先提供自己的裝備、格形、資格與規則，不能只換名稱。

## 現有實作位置

- [recommendations.js](../../games/mycopunk/dist/recommendations.js)：`validateRecommendations`、`selectRankedUpgrades`、`routeCollection`、`renderRecommendations`；[recommendations.json](../../games/mycopunk/dist/data/recommendations.json) 保存來源、分級與搭配。
- [build-planner.js](../../games/mycopunk/dist/build-planner.js)：`createBuildPlanner`、`validateBuildRules`、`availableBuildUpgrades`、`buildBoardStage`、`setBuildQuantity`、`reorderBuildSelection`、`buildPackingPieces`、`renderBuildBoard`。內含三欄 UI、搜尋／已收集條件、拖曳／排序、面板設定與匯出。
- [build-solver.js](../../games/mycopunk/dist/build-solver.js)：`createBoard`、`orientations`、`enumeratePlacements`、`solvePacking`；區分 count／priority 目標與搜尋預算。
- [build-worker.js](../../games/mycopunk/dist/build-worker.js)：`requestId`／`input` → `requestId`／`result` 或 error；planner 在停用／換裝備時終止 worker 並排除過期回覆。
- [patterns.js](../../games/mycopunk/dist/patterns.js)、[build-rules.json](../../games/mycopunk/dist/data/build-rules.json)、[field-guide.json](../../games/mycopunk/dist/data/field-guide.json)、[catalogue.json](../../games/mycopunk/dist/data/catalogue.json)：六角格、擴格／旋轉／資格、來源版本與格形資料。
- [build-planner.css](../../games/mycopunk/dist/build-planner.css)、[recommendations.css](../../games/mycopunk/dist/recommendations.css)；[app.js](../../games/mycopunk/dist/app.js) 負責載入、選裝備與收集狀態銜接。

## 接入步驟

1. 分開定義推薦、合法資格、幾何求解與玩家已收集狀態。推薦要有來源／版本及分級意義；合法性依規則，不能因某項被推薦就略過資格驗證。
2. 定義座標系、棋盤尺寸／禁用格、真實 cells、旋轉解鎖、疊加情境與擴格軸。缺格形不以格數猜圖，跨面板／改形等未支援規則標示原因並排除。
3. 每份裝備以獨立 instance ID 追蹤份數與順位，物品 ID 仍共用收集清單。情境改變時保留選擇並標示失效份數，不無聲刪除。保留輸入上限與整數驗證。
4. 依產品語意選 count 或 priority；Mycopunk UI 使用 priority，先放高順位不保證裝入數量最多。把超出預算與已證明無法放入分開，顯示搜尋狀態／原因。
5. 複雜搜尋放 Worker，限制時間及節點，換裝備／重算／離頁終止舊 worker；同時比對 requestId、owner 與 active，避免舊結果覆蓋新選擇。
6. 配置匯出與收集進度備份分開命名／驗證。現有 layout 為 `appId:mycopunk-build-layout`、schemaVersion 2；draft 在記憶體，不承諾可重整保存或已有配置匯入。新遊戲需要持久化時另外設計備份與版本。

## 驗證方式

執行 `node games/mycopunk/verify.mjs`（含 [validate_site.mjs](../../games/mycopunk/scripts/validate_site.mjs)）及 `verify-mycopunk-browser.mjs`；新遊戲延伸自己的資料／瀏覽器入口，環境見[驗證參考](../references/verification.md)。

合成案例：合法格位／無重疊、旋轉去重、未知格形拒絕、擴格軸未選與順序、份數／資格限制、priority 及 count 目標、預算耗盡仍有合法結果、過期 Worker 不套用、失敗可重試、手機排序／鍵盤及匯出格式。推薦缺漏篩選僅讀 collected，不改玩家進度。

## 限制

排放結果不證明遊戲傷害或效果最佳，來源版本也不代表已在當前遊戲實機驗收。現行求解器的六角格、40 份限制、幾何例外與面板規則均須按新遊戲重新評估；不要以 UI 顯示成功掩蓋 unsupported 或 search-limit。
