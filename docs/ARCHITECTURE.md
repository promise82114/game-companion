# Game Companion 目前架構

日期：2026-10-31；平台版本：1.0.0。

原始基準為 `GAME_COMPANION_ARCHITECTURE.md`。使用者後續「加速整合任務」明確改為一次連續實作 EDF WB／WB2，不需逐階段批准；資料保護、獨立模組及正式雲端／切換須確認的要求仍有效。原始規格與 P0 保留作歷史，不改寫成已驗收。

```text
portal/                         遊戲目錄 HTML/CSS 模板，不存取進度
games/{slug}/
  module.json                   遊戲識別、版本、入口與儲存契約
  source-manifest.json          搬入來源 SHA／逐檔原始 hash
  dist/                         該遊戲完整 HTML/CSS/JS、同步 adapter
  data/、scripts/               有來源提供時保留的攻略資料與產生器
  verify*.mjs、server.mjs        原遊戲驗證及預覽工具
  docs/                         原遊戲的來源／翻譯核對文件
  upstream/                     被安全版本取代的舊雲端程式／測試，不發布
scripts/                        建置、隔離與部署檢查、整合回歸
_site/                          可重建的 Pages artifact，不追蹤
docs/                           規範、遷移、驗收、報告
```

兩款遊戲沿用原生 HTML/CSS/JS，各自保留 `dist/shared/`。沒有平台共用進度 SDK；兩份小型匯入保護程式隨模組一起發布、各自維護。確認更多遊戲有相同需求後再考慮抽取，不把 Portal 變成同步中心。

建置讀取 `games/*/module.json`，自動產生 Portal 遊戲列，將各模組 `dist/` 放到 `_site/games/{slug}/`。網站不用 router 或後端；GitHub Pages 根為 `_site`，路徑自然對應 `/game-companion/`。來源與工具不會被打包到網站。

版本分為平台版本、moduleVersion、progressSchema 與原有 catalogVersion。既有項目 ID 與進度 app/schema 相容保留，新增 `gameId`、`moduleVersion`、`revision`。revision 是本機變更計數，**不是跨分頁交易或雲端修訂保證**。

進度、快照、匯入原文、Cache Storage 與 Drive 檔名皆按遊戲命名。SW 只攔截自己 scope 的 GET、只查自己的 cache、只清自己的版本前綴。Portal 不註冊 SW、不存取玩家儲存。

雲端現況：保留原 GIS OAuth 與 Drive appDataFolder 查找／讀取，使用新 projectId 與檔名；手動下載後轉入受保護的匯入預覽。自動同步、上傳及還原後上傳均未開放。adapter 的 `write()` 與非 GET `request()` 直接拒絕。完整三方同步與遠端競爭控制尚未完成，因此不宣稱可安全雲端同步。

GitHub workflow 驗證資料與每個必要模組，再建立並檢查完整 artifact，成功後才可部署。初次整合先完成本機驗證；後續依使用者明確授權完成 commit、push 與 GitHub Pages 首次發布，Actions 與正式 43 個網站資源驗證皆成功。發布證據見 `docs/reports/INTEGRATION_REPORT.md`。沒有改舊站或操作正式 Google 帳號，雲端寫入維持停用。
