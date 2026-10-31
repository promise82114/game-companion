# Talos II Roadmap 查證與整合報告

日期：2026-10-31（Asia/Taipei）。本次只做 PS5 本體白金，允許劇透。本報告記錄本機與合成驗證，沒有進行遊戲實機測試或真實 Google 授權。2026-10-31 使用者已授權 commit、push 與正式部署，實際發布狀態以 GitHub Actions 為準。

## 已取得證據

| 項目 | 結果／適用範圍 | 來源 |
| --- | --- | --- |
| PS5 分組 | 本體 60：1 白金、1 金、6 銀、52 銅；DLC 9，不計白金進度 | [Platinum Pursuit NPWR34440_00](https://platpursuit.com/games/NPWR34440_00/)、[TrueTrophies 原始清單公告](https://www.truetrophies.com/forum/viewthread.aspx?tid=188935)、[Exophase 分組](https://www.exophase.com/game/the-talos-principle-2-psn/trophies/) |
| 官方名稱 | 60 個本體名稱逐一建入，全部有 Roadmap 名稱對照。PC／Xbox 成就數不當作 PS5 獎盃數 | [PlayStationTrophies](https://www.playstationtrophies.org/game/the-talos-principle-2/print-list/)、[Talos Wiki](https://taloswiki.org/wiki/Achievements_(TTP2)) |
| Doge | 序章接受介紹；E1 同意資料分享並答七題；E3 配對學者。七題已取得完整攻略索引，UI 使用短英文辨識片段與繁中語意，供對照遊戲原文 | [XboxAchievements](https://www.xboxachievements.com/game/the-talos-principle-2/guide/)、[玩家問卷紀錄](https://steamcommunity.com/app/835960/discussions/0/4030220670872362258/)、[配對訊息逐字稿](https://taloswiki.org/wiki/Connecting_you_to_a_friend) |
| Rand 前置 | 博物館回報、N2 嘗試使用損壞機器、回城支持 Atal，以及必要時 S1 關係修補，均有攻略索引證據。尚未取得每封訊息的完整觸發表 | [A New Morality 攻略](https://www.xboxachievements.com/game/the-talos-principle-2/achievement/a-new-morality.html) |
| 三市長 | 分別列入公共社群、Hermanubis、Somnodrome、Rand、Cryer 與 VTOL 的分支條件。Act V Neith 公告／獎盃為使用者驗收點。前期旗標會影響結果 | 同上；[BlackTorito 三市長實錄](https://www.youtube.com/watch?v=OdvNsZHDZR4)（準備 01:34／02:40／03:50／04:58／07:07；Hermanubis 08:41、Rand 11:30、Byron 14:40、替代 15:26） |
| 兩種備份策略 | XboxAchievements／BlackTorito 準備法與 Hanni 的前期社群回覆法不同；Hanni 在正常 Somnodrome 後備份。本工具優先提示更早的 W2 Lost Lab 入口，不宣稱兩者可混用 | [全流程](https://www.xboxachievements.com/forum/topic/490227-full-walkthrough-all-achievements-in-one-playthrough/)、[Hanni](https://steamcommunity.com/sharedfiles/filedetails/?id=3069750588) |
| 特殊解法 | E2 正規 8 Seesaw、E2 Puzzle 8 附近 Lost Puzzle Loop、S1 正規 8 Switcheroo。來源對完成後重置補盃的可靠性不一致，保守列首次解題警示 | [XboxAchievements](https://www.xboxachievements.com/game/the-talos-principle-2/guide/)、[Hanni](https://steamcommunity.com/sharedfiles/filedetails/?id=3069750588) |
| 結局 | 全部黃金謎題後救 Miranda，與 Ab Aeterno／The Future 關聯；主結局選擇與三市長不是同一分歧 | [Talos Wiki](https://taloswiki.org/wiki/Achievements_(TTP2))、[GameSpot](https://www.gamespot.com/articles/the-talos-principle-2-ending-guide/1100-6519076/) |
| PS5 雲端 | PS Plus、Auto-Sync、手動上傳／下載與遊戲別同步設定有官方說明。網站不能驗證 PS5 檔案，也不能將 Xbox 刪除本機存檔方法套到 PS5 | [PlayStation 官方](https://www.playstation.com/en-ca/support/subscriptions/ps5-ps-plus-cloud-storage/) |

## 衝突與待查證

1. **三市長完整英文選項與 PS5 重現**：已建入可讀來源中的具體中文答法、NPC 與貼文標題，沒有宣稱其在任意前期狀態必然成功。所有分支保留 `unverified`。完整英文原文、精確配分及 PS5 目前版本的三結果還原仍需核對。單個 W2 備份無法補救更早旗標。
2. **Rand 每封私訊**：N2、S1 條件已有證據；N1–N3 其他訊息的精確出現時間仍待查證。沒有自行編造選單。
3. **城市時機**：Schuyler 的 Your Biggest Fan，Hanni 與 Xbox 攻略對回訪機會不同；Museum Explorer 也有是否只限第一次、需否操作謎題的衝突。優先序章驗收。Purple 的位置描述採博物館後方／Archeological Gardens 範圍，逐字選項待核對。
4. **Sinner**：第二次回城與具體爭論回覆有玩家實測；第三次可補說法不一致。不能對話時先做博物館主線，不保證一律有效。
5. **文字冒險**：Hanni 要成功結局，Xbox 攻略稱任意完成即可；本工具採成功結局的保守做法，補入來源衝突註記，不宣稱最小條件已實測。
6. **特殊解法重置**：PC 指南稱可重置、Xbox 攻略警告可能不跳；沒有 PS5 實測前不保證可補。
7. **Jeremy／Balance**：Steam 指南稱 Jeremy 無對應盃，但玩家討論有人回報可給 Balance。三路線 UI 仍以指定人物與實際跳盃分開核對，不拿 Jeremy 當 Hermanubis 成功。
8. **官方逐盃 ID**：公開 NPWR 分組可查；未取得官方數字對照。所有 `trophyIds` 留空，名稱鍵 `trophyRefs` 不偽裝官方 ID，這項驗收仍未完成。
9. **最終自動存檔**：PC 攻略描述的隱藏自動存檔未經 PS5 實測；登上最終 VTOL 前仍提示備份。
10. **探索細節**：本版提供區域探索帳、數量核對及關鍵錯過事件，沒有複製全遊戲每題逐步解答與所有收集點導航；不清楚的位置直接附來源，不填假點位。

存取情況：XboxAchievements、Neoseeker 部分正文 403；已使用可讀的搜尋索引取證。PSNProfiles 未取得可讀完整指南，沒有宣稱閱讀完成。BlackTorito 取得影片說明與時間章節，沒有聲稱逐幀比對英文對話。

## 本機實作與驗證

新增獨立模組，八階段 57 步驟；目前 6 `confirmed`、32 `consensus`、19 `unverified`。分類是內容來源可信程度，並非 PS5 或雲端實機驗收。所有本體獎盃均有名稱對照。

原 repo 三模組沒有共用獎盃模型、Roadmap 或 IndexedDB。新模組新增獨立 IndexedDB 主記錄，沿用既有 Google Auth／Drive adapter／envelope，並將 sync-session 的本機介面改為等待 IndexedDB 交易。其餘遊戲原始檔未修改。工作期間出現另一個 `thank-goodness-youre-here` 模組及相關共同驗證修改，本次保留該工作，僅加入 Talos 檢查，不把它算入本次交付。

已執行：

- `node scripts/verify.mjs`：全模組資料驗證通過，包含 Talos schema、來源／依賴、60 名稱對照與 Node 語法檢查。
- `node scripts/verify-sync.mjs`：既有 EDF 同步合成回歸通過。
- `node scripts/verify-browser.mjs`：既有 Portal／EDF 兩模組的隔離瀏覽器回歸通過，涵蓋舊 Key／cache 不動、同 origin 遊戲隔離、匯入、離線及 390px。
- Talos module verify：async 三方合併、首次配對、過期選擇、同步中編輯、未知回應修訂恢復、配額失敗、過期 412／競爭一勝一拒、錯誤伺服器及 grant 失效門檻通過。
- `node scripts/build.mjs`、`node scripts/verify-site.mjs`：完整靜態產物通過；正式部署狀態以 GitHub Actions 為準。
- `node scripts/verify-talos2-browser.mjs`：全新暫存 Edge context，合成資料。Portal／直接網址／重整、獎盃與步驟／備份分離、三分支獨立、階段確認、篩選、IndexedDB 跨分頁、匯入兩端原文／未知資料／過期／下載失敗／錯遊戲、合成 OAuth 與三方衝突、PATCH 期間的新 IDB 編輯保留／下次上傳、寫入回應遺失後只讀核對、損壞／未來 schema 不重設並可匯出原文、1440／768／390／320 無水平溢出、IDB 配額失敗停止、儲存 namespace 隔離通過。修正同頁 hash 導覽未展開詳情後再次通過。
- 設計 skill source lint 通過。警示符號／完成記號按任務要求保留；檢查器使用 emoji 例外。瀏覽器量測與人工畫面檢視記錄在忽略的 `outputs/talos2/`。

此專案沒有 TypeScript、產品套件或獨立的 lint/typecheck scripts，沒有新增依賴冒充既有檢查。沙箱 Edge 啟動失敗後，在沙箱外以全新暫存 profile 與僅 loopback 的測試伺服器完成；未使用既有瀏覽器 profile。正式 Google、PS5 遊戲存檔、上傳／下載、選舉結果皆未測，仍由使用者在正式網域與主機驗收。

資料遷移：沒有舊 Talos schema；內容更新不改進度 ID、不清空資料。未知欄位保留，匯入原文與快照另存，儲存失敗即停。PS5 備份確認與清單下載發起時間分開記錄，沒有宣稱下載檔案已落盤或 PS5 備份真的可還原。

## 本次變更檔案

- 模組契約／說明／回歸：`games/talos2/module.json`、`games/talos2/README.md`、`games/talos2/verify.mjs`、本報告。
- 頁面與靜態攻略：`games/talos2/dist/index.html`、`style.css`、`app.js`、`data.js`。
- 可重用 Roadmap 邏輯：`games/talos2/dist/roadmap/model.js`、`store.js`、`sync.js`。
- 沿用的同步元件：`games/talos2/dist/shared/google-auth.js`、`drive-appdata.js`、`progress-envelope.js`、`sync-core.js`、`sync-session.js`。前三者與 EDF 版本逐字一致。
- 納入既有必要檢查：`scripts/verify.mjs`、`scripts/verify-site.mjs`；新增 `scripts/verify-talos2-browser.mjs`。既有 `scripts/verify-browser.mjs` 的自動 Portal 數量檢查由並行工作更新，本次執行通過並保留。
- 根文件：`README.md`、`docs/ARCHITECTURE.md` 的 Talos 專節；保留另一遊戲的並行變更。

`_site/` 與 `outputs/talos2/` 是忽略的建置／驗證產物，未作為追蹤來源。`games/talos2/dist/` 是正式可維護網站來源，應保留。
