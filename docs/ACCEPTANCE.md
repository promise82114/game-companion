# 驗收結果與限制

日期：2026-10-31。EDF 兩款模組 1.1.0 已依使用者要求發布至正式網域；Mycopunk 1.0.0 已完成整合與本機驗證，使用者已授權本輪 commit／push，沿用 main 的 Pages workflow 發布。真實 Google Drive 測試由使用者上線後執行，本機合成測試不能代替它。

| 項目 | 實際結果與界線 |
| --- | --- |
| 來源內容／ID | verify 通過；WB 864 項／71 關，WB2 1,208 項／120 關；23 份攻略、翻譯、取得來源及原 CSS 的 LF hash 不變，OAuth 檔因 generation 保護另列可修改 |
| 兩款主要功能 | 隔離 Edge verify-browser 通過：勾選／取消、undo、重開、搜尋／篩選、DLC、收藏筆記、跨分頁、匯入、離線、390px、同 origin 遊戲隔離 |
| Mycopunk 來源與資料 | 來源 b708d98；549 個追蹤檔原始 hash 留存，534 個不需調整的檔案 hash 通過；842 項、660 個舊 ID、27 件裝備、837 筆格形、七條 Hidden Paths、來源與配裝求解檢查通過 |
| Mycopunk 瀏覽器 | 新 context／合成資料通過：入口／深連結／重整、收集／搜尋／空清單、跨分頁、逐筆差異／下載／確認、明確取消勾選、追蹤與舊筆記、未知欄位／ID、過期預覽／下載與配額失敗封鎖、損壞原文保留及備份後修復、鍵盤選擇、Worker 成功排入及 schema 2 匯出、320／390／768／1440px、舊站與 EDF Key 不讀寫；沒有外部服務請求 |
| 二代專屬功能 | 12 個既有入口分批通過；完整一輪 11 PASS／匯入 1 FAIL，修正日誌體積後 focused verify-content PASS，未將失敗隱藏成首次全綠 |
| 匯入與舊站保護 | 強制備份／差異／確認、未知資料、過期預覽、配額失敗；合成舊 Key／cache sentinel 保留；沒有讀取實際舊存檔 |
| 三方同步核心 | verify-sync 兩款 PASS：取消、筆記衝突、未知資料、首次配對、過期選擇、日誌整理與跨頁操作、同步中編輯、遺失回應復原、配額失敗、授權失效 |
| 同步實際瀏覽器 | verify-sync-browser 兩款 PASS：模擬 GIS／Drive、驗證閘門、Base／Local／Remote、逐筆／批次選擇、另一分頁同步中編輯、重讀復原、同名檔停止、帳號隔離、舊版分頁原文保護、手機表格 |
| 遠端競爭 | 合成 HTTP mock 驗證 stale 412、parallel 一勝一拒；忽略 If-Match 的 mock 被拒。真實 Google 尚未測試；每次授權需在獨立測試檔通過後才能寫新站進度 |
| 寫入保護 | 未驗證 adapter.write／公開非 GET request 均在 Token／網路前拒絕；已驗證 PATCH 必帶 strong If-Match；不存在無條件降級 |
| artifact | 目前本機 verify、build、verify-site 通過，含 Mycopunk 共 558 個網站檔／65 個本地引用；Mycopunk 自有資料檢查加入既有 workflow 的 verify 入口。原有同步 Node 回歸仍保留 |
| 發布 | 同步版 eb9e5dd 的 Actions 41126649205／Deployment 7448565975 成功；49 個正式資源 hash 與本機一致、四入口 200，記錄在 DRIVE_SYNC_REPORT.md |

尚未取得的證據：真實 OAuth／appDataFolder、新舊 API ETag 相容性、真實 If-Match 原子競爭、跨裝置使用、真實手機與非 Edge 瀏覽器。每次授權的實際檢查失敗會停止寫入；沒有用 mock 宣稱遠端問題已解決。

沒有切換舊站、修改舊 repo 或操作正式玩家備份。完整原文與歷史會占儲存空間；配額失敗停止同步／匯入，請定期下載 JSON。
