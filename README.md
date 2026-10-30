# Game Companion

跨平台遊戲的收集清單、攻略與進度工具。Portal 只提供遊戲目錄；每款遊戲保有自己的介面、資料與儲存，不需要中央帳號或後端。

目前包含 EDF World Brothers 與 EDF World Brothers 2。原有攻略、翻譯、ID、樣式、資料工具及專屬驗證保留在各模組。

## 本機使用

需要 Node.js 24，不需安裝產品套件。

```powershell
node scripts/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node server.mjs
```

開啟 [本機 Portal](http://127.0.0.1:4190/game-companion/)。`PORT` 可改埠。請透過 HTTP 使用，以驗證與 GitHub Pages 相同的路徑與離線快取；直接開啟模組 `dist/index.html` 也可使用本機功能，但 Portal 返回連結以部署網址為基準。

## 進度與雲端

- 新站不讀寫舊站 Key。請由舊站下載 JSON，再到對應模組的「備份與還原」選檔。
- 逐筆或批次選擇差異，下載來源與匯入前進度的備份、確認保存後才套用。預覽後有新編輯時必須重新比較。
- 未知項目保留；未知欄位及兩端原文也保存在可匯出的 `importHistory`／`recoveryBundle`。備份與歷史可能占用空間；儲存失敗會停止匯入，不清理使用者資料。
- Google Drive 保留各遊戲獨立的授權、檔名與下載入口。**所有雲端寫入目前停用**，尚未完成三方合併與原子競爭驗證；不會連接後自動上傳。正式寫入與舊站切換仍需另行確認。
- 瀏覽器資料可被清除，請定期下載 JSON。切換網址不等於資料已移轉。

## 驗證與部署

資料與發布產物：`node scripts/verify.mjs`、`node scripts/build.mjs`、`node scripts/verify-site.mjs`。

隔離瀏覽器回歸：啟動 server 後執行 `node scripts/verify-browser.mjs`；二代專屬工具執行 `node scripts/verify-upstream.mjs`。沿用來源的 Playwright 與 Edge；跨電腦可設定 `PLAYWRIGHT_REQUIRE_FROM` 指向已安裝 Playwright 的 require 起點，`TEST_BASE_URL`／`TEST_URL` 指向隔離測試網址。不會自動安裝測試套件。

`.github/workflows/deploy.yml` 先驗證兩個模組與 `_site/`，任一必要檢查失敗即停止；僅 main 的 push 或手動 main workflow 進入部署，PR 只驗證。Pages Source 需設為 GitHub Actions。輸出網址預計為：

- `/game-companion/`
- `/game-companion/games/edf-wb/`
- `/game-companion/games/edf-wb2/`

目前尚未 commit、push 或正式部署，詳見 [整合報告](docs/reports/INTEGRATION_REPORT.md)。

## 維護文件

- [目前架構](docs/ARCHITECTURE.md)
- [新增遊戲模組契約](docs/MODULE_CONTRACT.md)
- [資料遷移與回復](docs/MIGRATION_PLAN.md)
- [驗收結果與限制](docs/ACCEPTANCE.md)
- [原始需求基準](GAME_COMPANION_ARCHITECTURE.md) 與 [P0 歷史報告](docs/reports/P0_REPORT.md)
