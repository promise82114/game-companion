# Game Companion｜專案架構與 Codex 執行規格

> v1.0｜2026-10-31｜需求決策已確認；舊站技術細節待 P0 驗證  
> Repo：`promise82114/game-companion`  
> Pages：`https://promise82114.github.io/game-companion/`  
> **階段閘門：Codex 先執行 P0 只讀盤點，交付報告並等待確認；不得直接連做 P1～P6。**

## 1. 定位與 MVP

Game Companion 是跨平台遊戲攻略與進度管理工具箱，涵蓋 Checklist、Roadmap、進度追蹤與專屬工具，不限 PlayStation，可納入 PC、Steam、Switch、Xbox 等。

**MVP 成功定義：** 建立最小 Portal，讓 EDF WB Checklist 在新網址完整運作；保留既有功能、安全匯入舊進度，使用獨立 Google Drive 備份，完成驗證後才切換。EDF WB2 第二階段搬移。

**MVP 不做：** 不合併 PS Game Base／PS Store Sale；不建立後端、中央登入、中央同步中心；不製作 Roadmap 編輯器；不全面重寫 EDF WB；不立即搬 EDF WB2。

## 2. 已確認的 13 項決策

| # | 決策 |
|---|---|
| 1 | Game Companion、PS Game Base、PS Store Sale 依功能分開 |
| 2 | 每款遊戲一個獨立模組 |
| 3 | Game Companion 單一 Repository，多遊戲模組 |
| 4 | 獨立頁面式模組，各自保留 HTML/CSS/JS/UI |
| 5 | 各遊戲完全獨立管理 Google Drive 同步 |
| 6 | 同步期間允許繼續編輯，不得遺失變更 |
| 7 | 無法自動合併的衝突顯示差異，供逐筆或批次選擇 |
| 8 | EDF Checklist 原樣搬入，逐步整理 |
| 9 | EDF WB 先行，EDF WB2 第二階段 |
| 10 | 新 Repo 不合併舊 Git 歷史；舊 Repo 完整保留 |
| 11 | 最小 Portal + EDF WB 驗證 |
| 12 | 新舊站本機與雲端資料空間獨立，經明確匯入遷移 |
| 13 | 不限 PlayStation，保持跨平台彈性 |

## 3. 目錄與 URL（設計建議，P0 後可微調）

```text
game-companion/
├── AGENTS.md
├── README.md
├── portal/                      # 最小首頁／遊戲入口
├── games/
│   ├── edf-wb/                  # MVP：第一款搬移
│   ├── edf-wb2/                 # 第二階段
│   └── {game-slug}/             # 未來遊戲
├── shared/                      # 僅抽取經驗證需要共用的工具
├── docs/
│   ├── ARCHITECTURE.md
│   ├── MODULE_CONTRACT.md
│   ├── MIGRATION_PLAN.md
│   ├── ACCEPTANCE.md
│   ├── migrations/edf-wb.md
│   └── reports/P0_REPORT.md
└── .github/workflows/           # 測試與 Pages 部署
```

| 用途 | 規劃路徑 |
|---|---|
| Portal | `/game-companion/` |
| 遊戲目錄（後續） | `/game-companion/games/` |
| EDF WB | `/game-companion/games/edf-wb/` |
| EDF WB2 | `/game-companion/games/edf-wb2/` |
| 未來遊戲 | `/game-companion/games/{game-slug}/` |

遊戲路徑不綁平台。GitHub Pages 的 base path、深層網址重新整理及資源路徑須實測。示意目錄不代表立即建立所有檔案。

## 4. 平台／模組邊界

**Portal：** 首頁、遊戲目錄、導航、最小部署整合。**遊戲模組：** 自己的頁面、進度、Checklist／Roadmap、資料格式、Google OAuth／Drive 同步、匯入匯出、測試。

每款遊戲至少宣告穩定 `gameId`、`slug`、模組版本、進度 Schema 版本、獨立頁面入口、儲存識別及資料備份方式。不同遊戲可採不同技術，但新遊戲優先沿用已驗證模板。平台不直接讀寫遊戲內部進度；模組不得讀寫其他遊戲資料。

**重要：** 同一 `github.io` origin 下的不同路徑並非瀏覽器安全沙箱；localStorage／IndexedDB 隔離需依賴命名、程式限制與測試。先訂共用契約、保留現有同步實作；確認重複需求後才抽共用 SDK，避免遷移時全面重構。

## 5. 資料與版本規則

分開管理平台版本、模組版本、進度 Schema 版本、攻略內容版本。已發布項目 ID 不得因排序、翻譯或顯示名稱任意變更；刪除／合併需有舊 ID 映射。未知欄位與無法對應項目不得靜默丟棄。進度備份須可辨識應用、遊戲、Schema、修訂與進度內容，具體格式由 P0 確認。遊戲 ID 不等於 PS Store 商品 ID；不同平台進度是否共用由遊戲模組決定。

## 6. EDF WB 首次匯入與隔離

**已確認：** 新站使用新的本機儲存命名空間、獨立 Drive 備份；舊站資料、備份及 Git 歷史保留不動。不可把舊 OAuth Token、Drive file ID 或同步 Base 直接當成新站有效同步狀態。

**建議流程：** (1) 偵測舊資料，必要時採舊站匯出／新站匯入；(2) 備份來源及新站現有資料；(3) 驗證 gameId/schema，轉換項目 ID、勾選、數量、備註；(4) 預覽總數、完成數及異常差異；(5) 使用者確認後寫入新命名空間；(6) 建立新同步基準與新 Drive 備份。新站已有資料時不得直接覆寫；首次匯入沒有共同 Base，不能假裝是三方合併。

**備份檔名建議：** `game-companion.edf-wb.progress.v1.json`；EDF WB2 類推。Drive 檔名不保證唯一，必須核對實際 file ID 與內容識別；遇同名或來源不明，停止寫入。

## 7. OAuth／Google Drive 同步安全契約

- 優先重用既有 OAuth／Drive 存取實作，但 Client、origin、scope、appDataFolder 可見性須 P0 實證；不同 Client 不應假設可讀舊備份。
- 不將 Token、Client Secret 或私密憑證提交公開 Repo。
- 各遊戲手動同步，獨立備份；Portal 不提供中央同步或直接修改遊戲備份。
- 使用 Base（上次共同基準）、Local、Remote 三方合併；單純時間戳或布林 OR 不足以處理取消勾選。
- 可安全合併的變更自動合併；真正衝突顯示本機／雲端差異，允許逐筆／批次選擇，未處理衝突不可靜默覆寫。
- 同步開始建立本機快照與變更序號；同步期間可繼續編輯；完成時重新檢查本機版本，保留同步期間新增變更，必要時顯示「有未同步變更」。
- 必須考慮多分頁、跨裝置、斷線、重整、帳號切換、格式不相容及重試。
- **Drive 遠端競爭寫入須技術驗證：** 讀取後再次檢查不等於原子性寫入。P0／P4 查證 API 實際條件更新能力；若不能保證，記錄風險與復原方案，不得宣稱完全安全。
- 還原與同步分開：還原前備份當前資料、預覽差異、使用者確認，不直接覆寫雲端。

## 8. 舊 Repo、來源版本與正式切換

來源 Repo：`https://github.com/promise82114/edfwb-checklist`。P0 讀取實際來源分支、完整 Commit SHA、Tags 與部署版本；**禁止猜測 SHA**。在 `docs/migrations/edf-wb.md` 記錄來源、舊 Key、Drive 識別、搬移差異及已知問題。新 Repo 只搬確認的穩定版本，不匯入舊 Commit 歷史。

測試期間舊站仍為主要進度來源。切換前再次匯入／比對最新進度；切換後新站為主要寫入端，舊站保留匯出與遷移說明，勿第一天強制轉址。舊 Repo 不得擅自封存、刪除或修改；封存前須先確認 Pages 最後部署。回復程式碼不等於回復資料，切回舊站前須保護新站期間產生的進度。

## 9. P0～P6 執行與驗收閘門

| 階段 | 工作 | 交付／驗收 |
|---|---|---|
| **P0** | 唯讀盤點 EDF WB：Git、功能、資料、OAuth、Drive、同步、測試、部署 | `docs/reports/P0_REPORT.md`，附證據與未知事項；使用者核准後才 P1 |
| **P1** | 建立最小 Portal、遊戲入口與 Pages 部署骨架 | 新站首頁、路由、部署可測；不得提前改舊站 |
| **P2** | EDF WB 原樣搬入，僅修必要路徑／建置 | 新網址直接開啟、重新整理、舊功能回歸通過 |
| **P3** | 本機進度隔離、備份、匯入與差異預覽 | 無未解釋資料遺失，可回復；使用者核准 |
| **P4** | 新 OAuth／Drive 備份相容、三方合併、衝突、同步中編輯 | 異常及競爭情境驗證；使用者核准 |
| **P5** | 跨裝置、資料、部署與回復回歸測試 | Go/No-Go 報告；阻擋性問題清零 |
| **P6** | 最終匯入、正式切換、舊站保留及觀察 | 使用者明確核准後執行，保留回復路徑 |

**每階段只做該階段工作；完成後提交變更清單、測試證據、已知風險、待確認事項，停止等待核准。** P0、P3、P4、P6 必須人工確認。任何正式雲端寫入、部署切換、舊站封存須額外明確批准。

## 10. P0 只讀盤點清單

1. Git：來源分支、工作樹狀態、完整 SHA、Tags、Pages 部署版本（無法確認則標未知）。
2. 建置：HTML／CSS／JS、套件、入口、`dist/`、Actions、資源路徑、建置方式。
3. 功能：角色、武器、任務、搜尋、篩選、統計、匯入／匯出、專屬操作與測試。
4. 本機資料：localStorage Keys、IndexedDB DB／store、Schema、進度 ID、備註、同步 Base、清除邏輯。
5. OAuth：Client ID 來源、scope、origin／redirect、Token 保存及失效處理（不輸出實際 Token）。
6. Drive：appDataFolder 查找、建立、更新、檔名、file ID、同名檔、錯誤重試。
7. 同步：Base／Local／Remote、衝突清單、批次選擇、同步期間編輯、多分頁、遠端競爭控制。
8. 測試：既有腳本、可安全執行的測試、既有缺陷、缺少的驗收案例。
9. 遷移風險：新舊 Key、OAuth、Drive 誤覆寫、base path、資料回復。
10. 最小搬移方案：P1/P2 必須修改的檔案、禁止修改範圍、風險與待決事項。

每項結論標示 `[原始碼確認]`、`[實測確認]`、`[待測試]` 或 `[未知]`，附檔案位置或證據。P0 不得修改舊站；任何可能寫檔、連線修改真實 Drive 或改變部署的測試均須先取得同意。

## 11. MVP 驗收門檻

- [ ] 舊站主要功能在新站全部可用；已知舊缺陷與新回歸缺陷分開記錄。
- [ ] 直接開啟與重新整理新網址、手機版、靜態資源正常。
- [ ] 舊進度 ID、完成數、數量、備註無未解釋差異。
- [ ] 新站不修改舊站本機資料及 Drive 備份。
- [ ] 新站獨立 Drive 上傳／下載／衝突逐筆及批次選擇可用。
- [ ] 同步中繼續編輯、取消勾選、斷線、重整不遺失進度。
- [ ] 多分頁、雙裝置及遠端競爭寫入已測試；未解安全風險不得假裝通過。
- [ ] 備份還原及切回舊站流程有測試證據。
- [ ] GitHub Pages 建置可重複，必要模組失敗時不發布不完整版本。
- [ ] 使用者核准 P6 Go/No-Go 後才切換正式入口。

## 12. 待 P0 確認（不得先當作事實）

- EDF WB 現有技術、建置方式、實際功能與測試覆蓋。
- 舊站本機儲存 Key／DB、資料格式、既有匯出能力。
- 舊站 OAuth Client、scope、Drive 備份檔名與 file ID 行為。
- 既有同步是否真的具備三方合併、同步期間編輯及競爭寫入保護。
- GitHub Pages 目前部署 SHA、舊站最終唯讀／轉址的實作方式。
- 新站正式上線觀察期（暫建議 14 天，尚未確認）。

## 13. Codex 第一個任務（僅 P0）

請先閱讀本文件。**本次只執行 P0：只讀分析 `promise82114/edfwb-checklist`，產出 `docs/reports/P0_REPORT.md` 草案**，逐項對應第 10 節清單，列出證據、差距、風險、建議的最小搬移方案與 P1 前需確認事項。若目前工作區無法存取舊 Repo，先說明需要何種唯讀存取，不得假裝已檢查。不得建立或修改應用程式、不得操作真實進度與雲端備份、不得推送或部署。完成 P0 後停止，等待使用者審核。
