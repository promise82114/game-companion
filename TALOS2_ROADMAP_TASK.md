# Game Companion｜The Talos Principle II 本體白金 Roadmap 整合任務

## 任務目標

在既有 Game Companion GitHub Pages 專案內，新增可重用的遊戲 Roadmap 功能，並將 **The Talos Principle II（PS5）本體白金攻略** 作為第一份實際資料整合。請直接盤點、實作、測試，不要只交付規劃報告。

- 目前使用者獎盃進度：0/69（PSN 顯示包含 DLC）。
- **本次只做本體白金**；DLC 尚未購買，排除 DLC Roadmap，且不將 DLC 獎盃計入白金完成率。
- 允許完整劇透；以低重跑成本、單周目可行性與高風險選擇預警為優先。
- 先核實本體獎盃實際數量及分類，**不要直接假設本體 60 個**。
- 不破壞其他遊戲的資料、路由、IndexedDB 與 Google Drive 同步。

## 執行前盤點

1. 讀取 README、AGENTS.md、現有架構文件與相關遊戲頁面。
2. 確認遊戲識別 ID、獎盃來源與 DLC 分類、進度儲存模型、資料遷移方式。
3. 確認現有 GitHub Pages 路由、共用 UI、同步衝突處理及測試流程。
4. 優先沿用現有功能；不自行建立第二套獎盃系統或 Google OAuth 流程。
5. 若已有 Roadmap 模型，延伸現有模型而非平行重建。

## Roadmap 內容與階段

| 階段 | 範圍 | 核心目標 |
|---|---|---|
| P0 | Calibration / New Jerusalem 序章 | Chicken、Signatory、Your Biggest Fan、Excellent、Museum、Doge 前置、出發前驗收 |
| P1 | E1 Grasslands Ring、E2 Wooded Plateau、E3 Eastern Wetlands | Doge 配對、Not What It Seems、Team Spirit、Single Rod、Just One Lap、Chasing the Light、一般解謎與探索 |
| P2 | N1 Desolate Island、N2 Flooded Valley、N3 Lost Marshes | Rand 私訊、Somnodrome 前置、區域解謎與探索 |
| P3 | New Jerusalem 回訪 | Sinner、Text Adventurer、Good Citizen、政治對話、離城驗收 |
| P4 | S1 Southern Coast、S2 Verdant Canyon、S3 Circular Oasis | The Hard Way、Rand 後續私訊、Archaeologist、主線與探索 |
| P5 | W1 Western Delta、W3 High Plain、W2 Anthropic Hills | 全區探索、W2 Lost Lab 風險、分歧前備份 |
| P6 | 市長選舉分歧 | A New Morality（Rand）、A New Beginning（Byron）、Balance（Hermanubis） |
| P7 | 黃金謎題與結局 | Puzzle Fiend、Renaissance Robot、Mnemosyne、錄音、Ab Aeterno、The Future、Break the Loop、Philosopher |

**注意：** 上表是規劃骨架，不代表所有事件的精確時機已核實。研究時必須確認每個步驟的章節、觸發條件、可否回頭補救及順序；發現錯誤時以可靠來源修正。

## 每個步驟的資料欄位

- `id`：跨版本穩定 ID。
- `stageId`、`order`、`title`、`description`。
- `location`、`trigger`、`prerequisites`、`actions`、`verification`。
- `trophyIds`：對應官方獎盃 ID；沒有則空陣列。
- `warningLevel`：`irreversible`（🔴）、`branch`（🟠）、`prepare`（🟡）、`recommended`（🔵）、`later`（⚪）。
- `missable`、`recovery`、`backupRecommended`。
- `sources`、`verificationStatus`：`confirmed`、`consensus`、`unverified`。
- 進度狀態獨立儲存：`not_started`、`completed`、`missed`、`skipped`、`unknown`。

## 內容詳細度要求

不得只寫「與 NPC 交談」「完成相關謎題」「選擇正確選項」。重要步驟須盡量提供：

1. 確切地圖、NPC、謎題或事件名稱。
2. 何時觸發、需要先完成什麼。
3. 具體對話選項（官方英文原文，必要時附繁中解釋）。
4. 對應獎盃、完成後如何確認。
5. 錯過後是否能回頭補、需重跑多少內容。
6. 需要備份時，何時上傳、何時還原、如何防止雲端覆蓋。
7. 查證來源與可靠程度。

**三市長分歧是最高優先級。** 必須完整查證從 Doge、Rand 私訊、城市政治對話、社群回覆、Somnodrome 到選舉結果的前置與精確選項。不可只給 W2 最後幾句對話，也不可保證單一 W2 備份必然能拿到三個獎盃。

## UI 與互動

### 遊戲詳情 Roadmap 頁

- 顯示本體白金進度、目前階段、下一步、下一個不可逆風險及下一個備份點。
- 階段可展開／收合，步驟可勾選並查看完整操作、來源及對應獎盃。
- 🔴 與 🟠 在實際流程中顯著顯示；階段切換前提醒未完成的不可逆事項，允許使用者確認後略過。
- 可篩選：未完成、易錯過、備份、推薦、已完成。
- 三位市長各自獨立追蹤，清楚顯示分歧前置條件與還原路線。
- 支援桌面與手機，不讓長篇攻略擠壓主要操作區。

### 資料與同步

- Roadmap 靜態內容與使用者進度分離；資料更新不得清除已完成狀態。
- 獎盃進度可對應到 Roadmap，但不能把「獎盃已取得」直接視為整個備份／對話步驟已完成。
- 沿用既有 IndexedDB、Google Drive appDataFolder 與手動同步邏輯；保留既有衝突策略。
- PS5 備份狀態只能由使用者手動確認，不可宣稱網站實際驗證雲端存檔。
- 不寫死 Talos II 專屬邏輯在共用 UI 中。

## PS5 存檔安全

- 提醒使用者 PS Plus 雲端存檔、自動同步及手動上傳／下載的覆蓋風險。
- 區分「建議備份節點」與「實際已備份」。
- 不建議未經驗證的刪檔、覆蓋或還原操作。
- 如 W2 分歧備份無法保證三個結果，必須如實標示前置限制及替代方案。

## 攻略查證

優先：PSNProfiles、PowerPyx、PlayStationTrophies、官方資料、Steam 社群與實測攻略。

參考：
- https://www.xboxachievements.com/forum/topic/490227-full-walkthrough-all-achievements-in-one-playthrough/
- https://www.neoseeker.com/the-talos-principle-2/walkthrough

**前述 ChatGPT 對話屬待驗證草稿，不可直接視為權威。** 尤其要核實：本體獎盃數、Doge 七題、Rand 私訊、城市 NPC 時機、Somnodrome、W2 備份點、選舉結果、特殊解法可重試性、黃金謎題與結局。無法查證的資料標記 `unverified`，不得編造。

## 實作與驗收

- [ ] 本體與 DLC 正確區隔，白金完成率不含 DLC。
- [ ] Roadmap 階段及細部步驟可以使用，且資料有來源與查證狀態。
- [ ] 不可逆、分歧、備份提醒清楚且位置正確。
- [ ] 三市長路線各自追蹤，明確顯示前置條件及還原方式。
- [ ] 獎盃 ID 關聯正確；不會把備份步驟誤判為完成。
- [ ] 手動進度重整後保留，並符合既有 Google Drive 同步規則。
- [ ] 不影響其他遊戲或既有資料。
- [ ] 桌面與手機可操作。
- [ ] 完成現有 lint、typecheck、test、build（依專案實際指令）。

## 交付物

1. 可運作的 Roadmap 頁面與 Talos II 本體資料。
2. 攻略查證報告（確認／共識／待查證，列出來源）。
3. 變更檔案清單與必要的資料遷移說明。
4. 測試／建置結果及未解風險。

## Codex 執行原則

請讀取本檔與 AGENTS.md 後直接開工。優先交付可用的完整垂直切片，再補細節；不要只產出另一份需求分析文件。對安全、資料破壞、不可逆選擇等問題保持保守。若外部資料來源無法連線，先完成可驗證的架構與內容，將其餘項目標示待查證，不要憑空填寫。除真正阻塞的重大決策外，自行選擇符合現有架構的實作方案。
