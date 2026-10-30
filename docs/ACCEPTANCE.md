# 整合驗收與限制

日期：2026-10-31。本機整合驗收後，已依使用者授權完成 Game Companion Pages 發布；這不代表舊站切換或正式雲端寫入的 Go/No-Go。

| 項目 | 證據／狀態 |
| --- | --- |
| Portal 與兩款入口 | Edge 實際點擊、1440／768／390px；可用、無水平溢出 |
| 來源內容與 ID | 兩款 catalog 唯一性、來源 manifest 的 LF 正規化 hash；攻略、翻譯、取得來源、CSS 相同 |
| 主要 EDF 操作 | 勾選／取消／undo／重整、搜尋／篩選、DLC、配件、關卡、收藏筆記；整合 browser suite 通過 |
| 二代專屬功能 | 原有翻譯、配件資格、DLC 連動、關卡模式、武器／角色連動、頁籤／筆記與備份工具；實際結果詳見整合報告 |
| 舊站資料保護 | fresh context 放入舊 Key／cache 合成 sentinel，新模組勾選／匯入／SW 啟動後均保留 |
| 匯入保護 | 未選差異／未下載確認不可寫主進度；來源與目前原文先保存；未知項目／欄位保留，預覽過期及備份配額失敗停止 |
| 兩款獨立性 | 各自新 Key、Drive config、SW prefix；Portal 不讀進度；Node 與產物隔離檢查通過 |
| Drive 讀取／寫入 | 模擬 GIS 與 GET，核對新檔名；UI 停用與底層 request/write 封鎖均通過。未登入真實 Google，正式可用性未知 |
| 離線／路徑 | 本機模擬 `/game-companion/games/{slug}/`，直接進入／重整、SW 離線重開通過；正式 Pages 三個入口與靜態資源 GET 已驗證，正式瀏覽器 SW 行為未另測 |
| 建置／artifact | Node verify、build、verify-site 通過；44 個網站檔與必要相對連結完整；原工具、upstream、Git metadata 未發布 |
| 正式部署／切換 | Game Companion 首次 commit／push／Pages 發布成功，43 個正式網站資源與產物一致；原 Pages 已為 workflow 模式，無需更改設定。舊站未切換、仍保留 |

尚未通過：真實 OAuth 控制台設定／appDataFolder 可見性、三方 Base 合併、逐筆／批次「雲端同步」衝突、同步中競爭寫入、條件 PATCH 原子性、跨裝置正式雲端與逆向回復到舊站。匯入差異選擇已實作，不等於雲端三方同步已完成。

因此本機收集與明確 JSON 遷移可以使用，雲端寫入不得開放。後續必須以獨立測試來源證明原子競爭保護及同步不遺失編輯，並取得正式寫入與切換確認。一般跨分頁沿用時間戳合併，未宣稱跨頁交易安全。

瀏覽器測試使用現有 Playwright／Edge、合成進度、新 context；來源中的較早工具未全部視為同等有效的現行驗收，逐一執行範圍列在整合報告。沒有用 mock 結果替代正式 Google 測試。
