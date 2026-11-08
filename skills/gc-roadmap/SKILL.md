---
name: gc-roadmap
description: 為 Game Companion 接入分章攻略、下一步導引、完成收合、原位勾選與風險提醒，支援步驟與子項獨立追蹤，保留已發布 ID。
---

# 分章攻略與完成收合

先讀[專案契約](../references/project-contract.md)、[漸進式 UX 規則](../../docs/PROGRESSIVE_ROADMAP_UX.md)，再依目前程式與最新使用者要求選擇追蹤粒度。

## 現有實作位置

- Talos：[data.js](../../games/talos2/dist/data.js) 定義步驟／前置／警示；[navigation.js](../../games/talos2/dist/roadmap/navigation.js) 的 `sectionUrl`／`resolveSection`；[attention.js](../../games/talos2/dist/roadmap/attention.js) 的 `needsAttention`／`nextAction`；[completion.js](../../games/talos2/dist/roadmap/completion.js) 的 `revealedItems`／`isCompact`。
- Talos 沿路敘事：[story-data.js](../../games/talos2/dist/story-data.js)、[story.js](../../games/talos2/dist/roadmap/story.js) 的 `routeItemsForStep`，將故事站點與謎題穿插，主步驟完成仍可找到未完成子項。
- Thank Goodness：[guide.json](../../games/thank-goodness-youre-here/dist/guide.json)、[roadmap.js](../../games/thank-goodness-youre-here/dist/roadmap.js) 的 `RoadmapProgress.create`，現行 **100 個 step 一對一映射**；[app.js](../../games/thank-goodness-youre-here/dist/app.js) 的 `pendingChecks`、`stageDone`、`expandedSteps` 與閱讀錨點。
- Grounded：[roadmap-progress.js](../../games/grounded/dist/roadmap-progress.js) 的 `stepProgress`／`nextPendingStep`；[app.js](../../games/grounded/dist/app.js) 的 `syncRoadmap`／`updateChapterCounts`，目標、相關獎盃與收集全完成才收合。
- 共通外觀參考各模組 `index.html`／CSS；功能導覽參考 [add-game](../gc-add-game/SKILL.md)。

## 接入步驟

1. 依遊玩順序定義章節、穩定 step ID、地點／操作／時機／前置、成功判斷、警示、來源與補救。需要逐步獨立核取時保留粒度，不依版面方便合併多個操作。
2. 選定一套完成語意：Thank Goodness 看單一 `stepDone`；Talos 導引檢查主步驟及子項；Grounded 收合須目標＋獎盃＋收集全完成。讓章節數、收合與下一步共用目標模組的判斷，不混用三套規則。
3. 從現有進度推導完成與待辦，不另存章節完成旗標。步驟、子項、實際跳盃各自確認。瀏覽章節可自由切換，不自動完成前章或硬性封鎖未來章。
4. 未完成內容可直接閱讀；完成後保留標題、核取與必要風險，提供暫時回看。展開狀態留在記憶體；搜尋／深連結可展開相關內容，清除後回到完成度推導。
5. 更新採原位 DOM 或等效的焦點／閱讀位置保護。收合正在操作的區塊時選定可見焦點目標，不因勾選自動捲下一步／下一章。非同步或跨分頁更新沿用同一更新路徑。
6. 離開前提醒只列相關待辦，待查證不升級為硬門檻。分歧與 PS5 備份紀錄依遊戲獨立定義，詳見 [trophy-trackers](../gc-trophy-trackers/SKILL.md)。

## 驗證方式

執行目標模組 verify 及 `verify-talos2-browser.mjs`／`verify-talos2-navigation-browser.mjs`、`verify-thank-goodness-browser.mjs` 或 `verify-grounded-browser.mjs`，命令環境見[驗證參考](../references/verification.md)。

合成案例涵蓋全新／部分／全完成、完成後取消任一子項、舊非 completed 狀態、搜尋開啟完成內容、重新整理、URL／返回、跨分頁與匯入後重算。測 320／390／768／1440px、核取前後焦點及閱讀位置，並確認瀏覽不代填進度。

## 限制

Thank Goodness 1.4.0 的 60 成果合併已被 1.4.1 還原；不要照歷史 README 恢復整組完成。Talos 目前工作中的星星導航另見[盤點註記](../references/game-inventory.md)，不作穩定新增 API 範本。
