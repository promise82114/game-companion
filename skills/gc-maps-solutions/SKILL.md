---
name: gc-maps-solutions
description: 為 Game Companion 接入原創 SVG 區域或拓樸圖、清單雙向定位、逐題解法與劇透控制，保留共用進度並明示座標及來源限制。
---

# 地圖、行走指引與解法

先讀[專案契約](../references/project-contract.md)。先區分區域概念圖、拓樸圖、候選位置及經確認座標，選擇符合資料證據的呈現。

## 現有實作位置

- Talos 區域圖：[region-maps.js](../../games/talos2/dist/region-maps.js) 定義 nodes／paths／north／source；[maps.js](../../games/talos2/dist/roadmap/maps.js) 的 `mapSvg`、`regionMapHtml`、`mapLocateButton`、`mapNodeMatches`／`mapNodeDone`。
- Talos 城市／室內拓樸：[story-maps.js](../../games/talos2/dist/story-maps.js)、[story-data.js](../../games/talos2/dist/story-data.js)、[story.js](../../games/talos2/dist/roadmap/story.js) 的 `routeItemsForStep`；[app.js](../../games/talos2/dist/app.js) 管面板／dialog、閱讀定位與手動選擇。
- Talos 解法：[puzzle-data.js](../../games/talos2/dist/puzzle-data.js)、[solutions.js](../../games/talos2/dist/roadmap/solutions.js) 的 `puzzleHtml`／`puzzleProgressId`；開關為 `settings.showSolutions`。
- Grounded：[data.js](../../games/grounded/dist/data.js) 的 regions／collectibles；[map.js](../../games/grounded/dist/map.js) 的 `mapSvg`／`bindMap`；[app.js](../../games/grounded/dist/app.js) 的 `mapHtml`／`focusItem`，提供群組、圖層、條件、縮放、拖曳與鍵盤平移。
- Mycopunk 路徑／六角格：[hidden-paths.js](../../games/mycopunk/dist/hidden-paths.js) 的 `validateHiddenPaths`／`renderPathDiagram`；[patterns.js](../../games/mycopunk/dist/patterns.js) 的座標正規化及旋轉。

## 接入步驟

1. 定義圖類型、來源及查證狀態。以地標、入口朝向、方位、區域關係描述；未核實落點維持未知，不以排版座標宣稱精確遊戲座標。
2. 資料層列出地圖節點 ID、對應穩定進度 target、可選候選點／共同物品 ID、標籤與位置摘要。重複候選點參考 [artifacts.js](../../games/talos2/dist/roadmap/artifacts.js) 共用物品進度，不因地圖新增一份 collected。
3. 使用原創 SVG／基本形狀呈現，保留來源連結及方向／非比例註記。長標籤與手機尺寸要可讀；縮放／平移、圖層篩選不寫完成狀態。
4. 清單的定位按鈕只切地圖／選節點，節點可反向跳清單或攻略。保留直接網址、重整、手動選擇與自動閱讀定位的優先順序；手機 modal 支援 Escape、焦點與關閉返回。
5. 將行走線索與解題內容分開組織。逐題完成用既有 `puzzle-`／等效 ID，主步驟／星星／獎盃不互相代填。關閉劇透時不輸出解法 DOM；必要行走指引仍可閱讀。
6. 跨分頁、匯入或同步更新時重讀同一進度，更新已開啟面板／dialog 的取得標記；避免背景刷新覆蓋手動選擇。

## 驗證方式

資料檢查節點／target／候選物品的引用、唯一性、已知座標合法性及來源；跑目標模組 verify 及[對應瀏覽器](../references/verification.md)。Talos 同時用主套件與導航套件，Grounded 用其地圖／清單回歸，Mycopunk 用格形及 Hidden Paths 驗證。

新增合成案例：雙向定位／深連結、各區域／圖層篩選、未知位置不產生假落點、共用物品取消同步、手機 dialog 開啟時收到跨分頁變更、鍵盤／觸控／縮放不溢出。比較瀏覽前後進度，確認定位不改完成；關閉劇透時找不到解法節點。

## 限制

Grounded 精確座標為零，regions anchor 只供排版；Talos 距離、高低差及部分位置待查證。盤點時 Talos 星星導航另有未提交工作，見[功能對照](../references/game-inventory.md)；本 skill 不將 `activeStarRoute` 等新增路線 API 當穩定介面，也不將其修改視為已驗收。不要重製第三方底圖或自行補齊缺漏路線。
