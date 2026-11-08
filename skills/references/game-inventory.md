# 六款遊戲功能與實作對照

盤點日期：2026-11-08；以目前入口、model、manifest、資料及驗證腳本交叉整理。本文件記錄本機實作，未重新驗收全部遊戲功能或查詢正式部署狀態。

本次範圍為下列六款。整理期間工作樹另出現 `games/edfir/`、封面及根建置／驗證腳本的接入變更，未納入本次功能盤點或修改；根驗證入口可能已包含該新模組，執行前應讀取當時版本。

## 能力矩陣

「有」表示存在本機實作，不代表真實服務或遊戲內效果已驗收。

| 能力 | EDF WB | EDF WB2 | Mycopunk | Talos II | Thank Goodness | Grounded |
| --- | --- | --- | --- | --- | --- | --- |
| 搜尋／篩選／收集進度 | 有 | 有 | 有 | 有 | 攻略／獎盃篩選 | 有，部分收集庫 |
| 額外內容可見性 | DLC／特典 | 季票／DLC／特典 | 裝備／品質分類 | 本體範圍 | 本體範圍 | 本體／周目規則 |
| 收藏／筆記 | 關卡 | 關卡 | tracked／note | 舊筆記保留，無編輯 UI | 無同類 UI | 舊筆記／標記保留，無編輯 UI |
| 分章 Roadmap／完成收合 | 無 | 無 | 無同類 Roadmap | 有，含子項 | 有，100 步獨立勾選 | 有，目標＋獎盃＋收集 |
| 獎盃獨立追蹤 | 無 | 無 | 無 | 本體 60 | 本體 33 | 本體 46 |
| 專屬追蹤 | 關卡候選／推薦 | 四欄裝備資格／關卡候選 | Hidden Paths／配裝 | 三市長／PS5 備份紀錄／文字計數 | 13 組跨章 tracker／路線檢查點 | Super Win／NG+／乳牙計數 |
| 地圖／圖解 | 無同類地圖 | 無同類地圖 | 六角格／路徑／裝備 SVG | 區域／室內圖、解法 SVG | 角色辨識 SVG | 區域概念圖、縮放平移 |
| 本機儲存 | localStorage＋Journal | localStorage＋Journal | localStorage | IndexedDB records | IndexedDB state／archives | IndexedDB records |
| 保護式 JSON 匯入／匯出 | 有 | 有 | 有 | 有 | 有，另有初始化 | 有，另有周目建立保護 |
| 手動 Drive／逐 grant 閘門 | 有 | 有 | 未接入 | 有 | 有 | 未接入 |
| SW 離線快取 | 有 | 有 | 無 | 無 | 有 | 無 |

## EDF World Brothers

[module.json](../../games/edf-wb/module.json)、[README](../../games/edf-wb/README.md)；模組 1.1.0／schema 1。

| 功能 | 現有實作位置與搜尋入口 |
| --- | --- |
| 武器／角色／配件、多語搜尋、分類／LV／版本／取得篩選、統計卡 | [app.js](../../games/edf-wb/dist/app.js)：`render`、`matchesSearch`、`weaponLevelStats`、`accessoryCategoryStats`；[data.js](../../games/edf-wb/dist/data.js)、[translations.js](../../games/edf-wb/dist/translations.js) |
| DLC／特典、來源聯集可見性、取消設定保留進度 | [content.js](../../games/edf-wb/dist/content.js)；app 的 `available`、`changeContent` |
| 武器 LV1–4／角色補收、來源提示、推薦／收藏／筆記 | [missions.js](../../games/edf-wb/dist/missions.js)、[mission-facts.js](../../games/edf-wb/dist/mission-facts.js)、[recommendations.js](../../games/edf-wb/dist/recommendations.js)、[acquisition.js](../../games/edf-wb/dist/acquisition.js)；app 的 `missionData`、`missionContent`、`renderFavorites`、`saveMissionNote` |
| 即時儲存、復原、最近 12 份快照、跨分頁日誌 | app 的 `persist`、`saveSnapshot`、`mergeLatest`；[sync-core.js](../../games/edf-wb/dist/shared/sync-core.js) 的 `Journal` |
| 差異匯入、復原、手動 Drive、離線 | [migration.js](../../games/edf-wb/dist/migration.js)、[cloud-sync.js](../../games/edf-wb/dist/cloud-sync.js)、[sw.js](../../games/edf-wb/dist/sw.js) |
| 離線資料產生器、穩定 ID 與翻譯來源 | [build-data.mjs](../../games/edf-wb/scripts/build-data.mjs)、[資料來源說明](../../games/edf-wb/docs/data-review.md) |

使用 skills：checklist、progress-storage、backup-import、drive-sync、offline-cache、content-research（名稱均帶 `gc-`）。限制：一代配件規則與二代品質／四欄資格不同；候選範圍非掉落率。README 的舊 Key、自動同步與舊網址屬來源歷史；現行契約見[遷移紀錄](../../docs/migrations/edf-wb.md)。

## EDF World Brothers 2

[module.json](../../games/edf-wb2/module.json)、[README](../../games/edf-wb2/README.md)；模組 1.1.0／schema 1。

| 功能 | 現有實作位置與搜尋入口 |
| --- | --- |
| 本篇／DLC 分頁、配件分類卡、多語／關卡代號搜尋 | [app.js](../../games/edf-wb2/dist/app.js)：`sectionItems`、`matchesSearch`、`weaponLevelStats`；[translations.js](../../games/edf-wb2/dist/translations.js) |
| 季票父子／半選、DLC／特典連動與排除條目 | [content.js](../../games/edf-wb2/dist/content.js)；app 的 `renderSettings`、`changeContent`、`available` |
| 角色各版本四欄裝備資格、多選交集 | [character-accessories.js](../../games/edf-wb2/dist/character-accessories.js)；app 的 `characterAccessoryCells` |
| 五種補收模式、重點查看、武器去重／角色獨立勾選、完成卡片暫留 | [missions.js](../../games/edf-wb2/dist/missions.js)、[acquisition.js](../../games/edf-wb2/dist/acquisition.js)；app 的 `missionData`、`visibleWeaponTargets`、`retainedKey` |
| 原始／推薦／我的最愛、每關筆記、復原與快照 | [recommendations.js](../../games/edf-wb2/dist/recommendations.js)；app 的 `renderFavorites`、`saveMissionNote`、`saveSnapshot` |
| 匯入、日誌、手動 Drive、離線 | [migration.js](../../games/edf-wb2/dist/migration.js)、[sync-core.js](../../games/edf-wb2/dist/shared/sync-core.js)、[cloud-sync.js](../../games/edf-wb2/dist/cloud-sync.js)、[sw.js](../../games/edf-wb2/dist/sw.js) |

使用 skills 同 EDF WB。保留排除內容 ID 以讀舊備份；`verify-cloud.mjs` 現行只轉入寫入閘門檢查，README 的自動上傳描述不作接入依據。現行契約見[遷移紀錄](../../docs/migrations/edf-wb2.md)。

## Mycopunk

[module.json](../../games/mycopunk/module.json)、[README](../../games/mycopunk/README.md)；模組 1.0.0／schemaVersion 1。

| 功能 | 現有實作位置與搜尋入口 |
| --- | --- |
| 首頁、27 件裝備介紹、雙語內容／語言切換、裝備 SVG | [app.js](../../games/mycopunk/dist/app.js)：`renderHome`、`renderGearProfile`、`readUrl`；[wiki.js](../../games/mycopunk/dist/wiki.js)、[equipment-art.js](../../games/mycopunk/dist/equipment-art.js)、[field-guide.json](../../games/mycopunk/dist/data/field-guide.json) |
| 842 筆收集、collected／tracked／note、品質／tag／取得篩選與排序 | [model.js](../../games/mycopunk/dist/model.js)：`filterUpgrades`、`sortUpgrades`；app 的 `writeRecord`；[catalogue.json](../../games/mycopunk/dist/data/catalogue.json) |
| 七條 Hidden Paths、六角格與路徑圖 | [hidden-paths.js](../../games/mycopunk/dist/hidden-paths.js)、[patterns.js](../../games/mycopunk/dist/patterns.js) |
| 分級搭配、來源比較、缺漏收集連動 | [recommendations.js](../../games/mycopunk/dist/recommendations.js)、[recommendations.json](../../games/mycopunk/dist/data/recommendations.json) |
| 三欄配裝、份數／順位、旋轉／擴格、Worker、schema 2 配置匯出 | [build-planner.js](../../games/mycopunk/dist/build-planner.js)、[build-solver.js](../../games/mycopunk/dist/build-solver.js)、[build-worker.js](../../games/mycopunk/dist/build-worker.js)、[build-rules.json](../../games/mycopunk/dist/data/build-rules.json) |
| 查證、備份／差異匯入、手機 dialog 側欄 | [migration.js](../../games/mycopunk/dist/migration.js)；app 的 `exportCollection`、`setupNavigation`；[companion-ui.css](../../games/mycopunk/dist/companion-ui.css) |

使用 skills：add-game、checklist、progress-storage、backup-import、maps-solutions、build-planner、content-research。限制：配裝 draft 僅本次開頁記憶體，配置與收集備份分開；缺格形／跨面板幾何不猜測。需 HTTP、JSON fetch、Worker；無 OAuth、Drive、SW 或新增離線保證，預留 prefix 不表示功能存在。授權及離線匯入器見 [SOURCE_README](../../games/mycopunk/SOURCE_README.md)。

## The Talos Principle II

[module.json](../../games/talos2/module.json)、[README](../../games/talos2/README.md)；模組 1.6.1／schema 1。

| 功能 | 現有實作位置與搜尋入口 |
| --- | --- |
| 八階段／60 主步驟、章節／片段／深連結、風險與下一步 | [data.js](../../games/talos2/dist/data.js)、[navigation.js](../../games/talos2/dist/roadmap/navigation.js)、[attention.js](../../games/talos2/dist/roadmap/attention.js)、[app.js](../../games/talos2/dist/app.js) |
| 完成收合、臨時回看、主步驟完成仍檢查子項 | [completion.js](../../games/talos2/dist/roadmap/completion.js)；attention 的 `needsAttention`／`nextAction` |
| 212 解題項目、拒絕謎語開關、解法 SVG、來源覆核 | [puzzle-data.js](../../games/talos2/dist/puzzle-data.js)、[solutions.js](../../games/talos2/dist/roadmap/solutions.js)、[puzzle-audit.js](../../games/talos2/dist/puzzle-audit.js) |
| 城市／巨構沿路站點、分次到訪、故事拓樸圖 | [story-data.js](../../games/talos2/dist/story-data.js)、[story-maps.js](../../games/talos2/dist/story-maps.js)、[story.js](../../games/talos2/dist/roadmap/story.js) |
| 固定 80 收集、共用星星進度、文字計數、14 遺物／19 候選點去重 | [collection-data.js](../../games/talos2/dist/collection-data.js)、[collections.js](../../games/talos2/dist/roadmap/collections.js)、[artifacts.js](../../games/talos2/dist/roadmap/artifacts.js) |
| 區域／室內 SVG、面板／手機 dialog、雙向定位 | [region-maps.js](../../games/talos2/dist/region-maps.js)、[maps.js](../../games/talos2/dist/roadmap/maps.js)；app 的 `updateMapSelection` |
| 本體 60 盃、中英名稱／摘要、三市長路線、PS5 手動備份紀錄 | [trophy-names.js](../../games/talos2/dist/trophy-names.js)、[trophies.js](../../games/talos2/dist/roadmap/trophies.js)、[mayor-research.js](../../games/talos2/dist/mayor-research.js)、[ux-safety.js](../../games/talos2/dist/ux-safety.js) |
| IndexedDB、保護式匯入、手動 Drive | [store.js](../../games/talos2/dist/roadmap/store.js)、[共用 store](../../shared/roadmap-store.js)、[sync.js](../../games/talos2/dist/roadmap/sync.js)；app 的匯入 UI |

使用 skills：roadmap、checklist、trophy-trackers、maps-solutions、progress-storage、backup-import、drive-sync、content-research。未核實精確座標／總量／操作保留待查證，舊多狀態仍保存，現行 UI 用未開始／完成。沒有 SW；不把 PS5 手動紀錄當主機存檔。

盤點時另有未提交星星導航修改，包含未追蹤的 `games/talos2/dist/star-navigation-data.js`、`games/talos2/dist/roadmap/stars.js` 及相關已追蹤差異。本目錄只將既有地圖／解法連動列作參考，未將新增星星路線 API 列為穩定範本。使用受影響檔案前先檢查工作樹與目前提交的差異。

## Thank Goodness You're Here!

[module.json](../../games/thank-goodness-youre-here/module.json)、[README](../../games/thank-goodness-youre-here/README.md)；模組 1.4.1／schema 1。

| 功能 | 現有實作位置與搜尋入口 |
| --- | --- |
| 八階段／100 步獨立核取、當前章優先、未來章自由展開、完成收合 | [guide.json](../../games/thank-goodness-youre-here/dist/guide.json)、[roadmap.js](../../games/thank-goodness-youre-here/dist/roadmap.js)：`RoadmapProgress.create`；[app.js](../../games/thank-goodness-youre-here/dist/app.js)：`expandedSteps`、`stageDone` |
| 地點／操作／時機、動態離開前提醒、搜尋與返回遊玩進度 | guide 的 `routeChecks`；app 的 `pendingChecks`、閱讀錨點 |
| 33 盃獨立確認、中英名稱、13 組跨章 tracker／多步計數 | guide 的 `trophies`／`trackers`；app 的 `trophyNameHtml`；[model.js](../../games/thank-goodness-youre-here/dist/model.js)：`toggle` |
| 英文角色名字旁 SVG、別名、安全跳脫 | [characters.js](../../games/thank-goodness-youre-here/dist/characters.js)、[characters.svg](../../games/thank-goodness-youre-here/dist/characters.svg) |
| 交易／跨分頁、完整備份、差異匯入、初始化前下載／確認／快照 | model 的 `ProgressStore`、`applyImport`、`resetProgress`；app 的對應 UI |
| 手動 Drive、模組限定離線 | [sync-session.js](../../games/thank-goodness-youre-here/dist/shared/sync-session.js)、[sw.js](../../games/thank-goodness-youre-here/dist/sw.js) |

使用 skills：roadmap、trophy-trackers、progress-storage、backup-import、drive-sync、offline-cache、content-research。1.4.0 的 60 成果屬歷史；現行一對一映射原 100 step ID，步驟與獎盃分開，不互相代填，SW v11。tracker 不證明遊戲互動次數或實際跳盃。

## Grounded

[module.json](../../games/grounded/module.json)、[README](../../games/grounded/README.md)；模組 1.1.2／schema 1。

| 功能 | 現有實作位置與搜尋入口 |
| --- | --- |
| 七階段／25 步、章節直達、目標／完整體驗／白金需求、完成收合 | [data.js](../../games/grounded/dist/data.js)、[roadmap-progress.js](../../games/grounded/dist/roadmap-progress.js)：`stepProgress`、`nextPendingStep`；[app.js](../../games/grounded/dist/app.js)：`syncRoadmap` |
| 53 筆部分收集庫、十類、三態、多種篩選、Ominent 具名分組 | data 的 `collectibles`／`categories`；app 的 `filteredItems`／`collectionRow` |
| Super Win 13 條人工矩陣、46 盃、分類查漏／第一輪未確認摘要 | app 的 `matrixHtml`／`remixPendingHtml`；roadmap-progress 的 `conditionItems`／`remixReview` |
| 庭院原創概念圖、11 區群組、圖層／條件篩選、雙向定位、縮放平移 | [map.js](../../games/grounded/dist/map.js)：`mapSvg`、`bindMap`；app 的 `mapHtml` |
| 獨立周目、NG+ 建立保護、跨周目四類繼承、當輪乳牙人工計數 | [model.js](../../games/grounded/dist/model.js)：`addRun`、`collectionBucket`、`collectionVisible`；app 的 `ngHtml` |
| 共用交易 store、世界／周目／玩家作用域檢查、匯入原文與完整復原 | [共用 store](../../shared/roadmap-store.js)、model 的 `config`／`importData`；app 的 `update`／`preview` |

使用 skills：roadmap、checklist、trophy-trackers、maps-solutions、progress-storage、backup-import。每類皆為部分資料庫，精確座標為零，區域 anchor 只供排版；矩陣不推算遊戲百分比，Gold Cards 不列為 Super Win 必需。世界／成員管理、標記與筆記 UI 已移除，歷史欄位保留；無 Drive、SW、Shared World 讀取或即時多人共享。
