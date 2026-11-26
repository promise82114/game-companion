# 人中之龍８｜本體白金攻略

本機入口：<http://127.0.0.1:4190/game-companion/games/like-a-dragon-infinite-wealth/>。
在 repo 根目錄執行 `node scripts/build.mjs`、`node server.mjs`。

原生 HTML／CSS／ES modules，獨立 IndexedDB `game-companion.like-a-dragon-infinite-wealth.progress.v1`，schema 1；沒有 OAuth、Drive、Service Worker 或 PSN 連接。Portal 由 module.json 自動註冊。

- 14 章、100 個主線動作與 P01–P05 收尾；未完成全文展開，完成可回看，章節自由瀏覽。
- 保留 `chapter-01`～`chapter-13`、`chapter-finale`、`T01`～`T65`、`SS01`～`SS52`。這些不是 PSN 官方 ID。
- 支線、40 段羈絆、8 個迷宮分區、活動與16項計數；PSN跳盃獨立確認。
- 功能切換清除搜尋／篩選；獨立清單預設未完成，完成立即移出；深連結顯示已完成目標。
- 操作即存、跨分頁更新、逐鍵撤銷與失敗重試。備份與還原在右上；匯入先封存兩端原文、逐筆比較、下載並確認後條件交易套用。未知項目與欄位保留，來源缺項不刪本機。

來源：根目錄 `like-a-dragon-infinite-wealth_PLATINUM_GUIDE.md`，以 SHA256 固定離線產生資料；`node games/like-a-dragon-infinite-wealth/prepare-data.mjs` 重建。原稿中的「尚未授權開發」是研究交付時的歷史敘述，本次使用者已明確要求建置頁面。未變更攻略事實或補造地點。

驗證：`node games/like-a-dragon-infinite-wealth/verify.mjs`；根 `node scripts/verify.mjs`、`node scripts/build.mjs`、`node scripts/verify-site.mjs`；server啟動後 `node scripts/verify-lad8-browser.mjs`，只使用新 context 與合成進度。

沒有全90追憶、110攝影、317敵人的逐點庫；有門檻的項目明示遊戲內現值。未進行 PS5 實機跳盃驗收。2026-11-27 使用者已授權 commit／push 與既有 main Pages 發布，結果以對應提交的 Actions 及正式資源核對為準。詳見 [實作紀錄](docs/IMPLEMENTATION.md)。
