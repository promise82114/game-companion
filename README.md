# Game Companion

跨平台遊戲的收集清單、攻略與進度工具。Portal 只提供遊戲目錄；每款遊戲保有自己的介面、資料與儲存，不需要中央帳號或後端。

目前包含 EDF World Brothers、EDF World Brothers 2、Mycopunk、The Talos Principle II 與 Thank Goodness You're Here!。原有攻略、翻譯、ID、樣式、資料工具及專屬驗證保留在各模組。Mycopunk 提供雙語攻略、升級收集、Hidden Paths 與配裝模擬，沒有新增雲端或 SW。

2026-10-31 入口與 Roadmap 介面改版：遊戲目錄提供原創 SVG 主題插畫、功能摘要、搜尋與工具類型篩選；兩款新 Roadmap 對齊功能導覽、右上 Drive／備份、章節直達、搜尋與下一步。章節可以直接切換，提醒依目前瀏覽章節呈現，早期步驟不會被自動填寫或強制完成。2026-11-01 使用者已授權提交與推送本批 UI／文件，並透過既有 main 分支 Pages 流程發布至正式站；部署結果以對應提交的 [GitHub Actions](https://github.com/promise82114/game-companion/actions/workflows/deploy.yml) 為準。詳見 [介面驗證報告](docs/reports/UI_UX_REPORT.md)。

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
- Google Drive 沿用原 Google Client／scope，各遊戲與帳號的 Base、檔名及同步獨立。連接後先按「驗證 Drive 寫入安全」，通過本次授權的獨立合成檔條件寫入測試，才能手動同步。首次配對與三方衝突須確認；同步中新增編輯保留為未同步變更。沒有自動上傳。
- 使用者已要求直接發布至綁定網域自行測試；尚未取得真實 Drive 通過證據。可先使用 [獨立測試入口](https://promise82114.github.io/game-companion/sync-safety/)，不會讀寫遊戲備份；遊戲內仍需驗證當次授權。詳見 [同步報告](docs/reports/DRIVE_SYNC_REPORT.md)。
- 瀏覽器資料可被清除，請定期下載 JSON。切換網址不等於資料已移轉。

## 驗證與部署

同步合成回歸：`node scripts/verify-sync.mjs`；隔離瀏覽器同步：`node scripts/verify-sync-browser.mjs`。兩者不代表真實 Google 已通過。

資料與發布產物：`node scripts/verify.mjs`、`node scripts/build.mjs`、`node scripts/verify-site.mjs`。

隔離瀏覽器回歸：啟動 server 後執行 `node scripts/verify-browser.mjs`；二代專屬工具執行 `node scripts/verify-upstream.mjs`。沿用來源的 Playwright 與 Edge；跨電腦可設定 `PLAYWRIGHT_REQUIRE_FROM` 指向已安裝 Playwright 的 require 起點，`TEST_BASE_URL`／`TEST_URL` 指向隔離測試網址。不會自動安裝測試套件。

Mycopunk 的原始資料／格形／求解器驗證已加入 `scripts/verify.mjs`。其隔離瀏覽器檢查執行 `node scripts/verify-mycopunk-browser.mjs`，沿用 `TEST_BASE_URL`。本機入口為 `/game-companion/games/mycopunk/`；舊站 JSON 需經新站差異預覽、下載復原備份與確認後匯入。詳見 [Mycopunk 模組說明](games/mycopunk/README.md)。

Mycopunk 已完成整合及本機驗證，納入既有 main 分支的 Pages 發布流程；各次部署結果可由 GitHub Actions 核對。

`.github/workflows/deploy.yml` 先驗證各必要模組與 `_site/`，任一必要檢查失敗即停止；僅 main 的 push 或手動 main workflow 進入部署，PR 只驗證。Pages Source 需設為 GitHub Actions。輸出網址為：

- `/game-companion/`
- `/game-companion/games/edf-wb/`
- `/game-companion/games/edf-wb2/`
- `/game-companion/games/mycopunk/`
- `/game-companion/games/talos2/`
- `/game-companion/games/thank-goodness-youre-here/`

已發布至 [Game Companion](https://promise82114.github.io/game-companion/)，包含 [EDF WB](https://promise82114.github.io/game-companion/games/edf-wb/) 與 [EDF WB2](https://promise82114.github.io/game-companion/games/edf-wb2/)。發布證據與功能限制見 [整合報告](docs/reports/INTEGRATION_REPORT.md)；Drive 已提供具每次授權驗證門檻的手動同步；舊站入口未切換。

Mycopunk 整合版入口：[Mycopunk Field Guide](https://promise82114.github.io/game-companion/games/mycopunk/)。

## Talos II 本體白金 Roadmap

2026-10-31 新增 `/game-companion/games/talos2/`：八階段、57 步驟、本體 60 獎盃（DLC 9 排除），提供不可逆警示、三市長獨立追蹤與手動 PS5 備份註記。進度使用本遊戲獨立 IndexedDB；Drive 沿用既有安全 adapter 及每次授權驗證門檻。沒有修改原遊戲模組或替網站備份冒充 PS5 遊戲存檔。

建置與資料驗證沿用上述命令；隔離瀏覽器執行 `node scripts/verify-talos2-browser.mjs`，`TEST_BASE_URL` 可設定本機網址。詳見 [Talos 模組](games/talos2/README.md) 與 [攻略查證／驗證報告](games/talos2/docs/RESEARCH.md)。官方逐盃數字 ID、部分英文對話與 PS5 分支重現仍待查證，已在介面標示。已接入 main 的 Pages 發布流程；部署結果以 [GitHub Actions](https://github.com/promise82114/game-companion/actions/workflows/deploy.yml) 為準。[正式測試入口](https://promise82114.github.io/game-companion/games/talos2/)。

## 維護文件

Thank Goodness You're Here! 已整合並納入 main 的 Pages 發布流程：[模組說明](games/thank-goodness-youre-here/README.md)。[正式測試入口](https://promise82114.github.io/game-companion/games/thank-goodness-youre-here/)包含 PS5 本體 33 獎盃、8 階段、100 個獨立步驟與 13 組跨階段追蹤。IndexedDB 分開保存攻略與獎盃狀態，Drive 沿用既有安全同步核心。執行 `node scripts/verify-thank-goodness-browser.mjs` 驗證新模組；真實 PS5 跳盃與正式 Google Drive 尚待人工驗收。

- [目前架構](docs/ARCHITECTURE.md)
- [新增遊戲模組契約](docs/MODULE_CONTRACT.md)
- [資料遷移與回復](docs/MIGRATION_PLAN.md)
- [驗收結果與限制](docs/ACCEPTANCE.md)
- [Thank Goodness 正式站 Drive 同步驗收清單](docs/THANK_GOODNESS_DRIVE_ACCEPTANCE_CHECKLIST.md)
- [原始需求基準](GAME_COMPANION_ARCHITECTURE.md) 與 [P0 歷史報告](docs/reports/P0_REPORT.md)
