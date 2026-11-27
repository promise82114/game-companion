# Cat Quest II｜雙王白金手冊

PS5 執行 PS4 版、本體白金、完整劇透。提供六階段19步路線、67支線、73基準地城、12法術、101基準＋7更新裝備、22金箱文字索引及20座獨立PSN確認。

在 repo 根目錄執行：

```powershell
node games/cat-quest-ii/scripts/prepare-data.mjs
node games/cat-quest-ii/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node server.mjs
node scripts/verify-cq2-browser.mjs
```

使用 Node.js 24。Playwright 位置依根 README 設定 `PLAYWRIGHT_REQUIRE_FROM`，不安裝產品相依套件。[本機入口](http://127.0.0.1:4190/game-companion/games/cat-quest-ii/)。

四個功能為遊玩路線、查漏清單、獎盃、小訣竅與資料。切換功能或清單種類重設搜尋與篩選；查漏預設未完成，勾完立即移除。路線未完全文展開，完成內容可回看；內嵌收藏與查漏共用同一ID，清洞不代填裝備、鑰匙或跳盃。D02可延後，下一步先找未完必要步驟，再找可延後步驟。沒有精確地圖或雲端同步。

IndexedDB `game-companion.cat-quest-ii.progress.v1` 只保存本遊戲紀錄。沿用共用交易 store，逐鍵修訂處理同項寫入及撤銷衝突。匯入先封存兩端原文、逐筆比較、下載復原備份並確認；未知ID／欄位保留，較舊來源須額外確認，過期預覽停止。完整備份包含快照與匯入原文。網站JSON不是PS遊戲存檔。

資料由根目錄 `cat-quest-ii_GAME_COMPANION_SPEC.md` 離線產生，SHA256保存在data.json；此規格是持續使用的產生器輸入，不可刪除。來源33筆、缺口8筆在資料頁列出。全地城秘密路徑、所有裝備出處、全支線解法與現版世界總量仍未完整核實；未通過PS4／PS5遊戲實機驗收。

字級遵循共通偏好28：正文14px、次要13px、標題24／18／16px（手機頁標題22px），手機主要控件44px。以既有工具介面為優先，沒有套用宣傳頁的滿屏hero／動畫段落。

實作及驗證見 [IMPLEMENTATION.md](docs/IMPLEMENTATION.md)。2026-11-27 使用者已授權本批 commit／push，沿既有 main GitHub Pages 流程發布；結果以對應提交 Actions 與正式資源核對為準。
