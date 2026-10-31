# Mycopunk 模組

Game Companion 的獨立 Mycopunk Field Guide，模組版本 1.0.0。入口為 `/game-companion/games/mycopunk/`，保留原攻略介面、27 件裝備介紹、842 筆收集項目（840 筆 Wiki／2 筆舊表相容資料）、七條 Hidden Paths、分級搭配與三欄配裝模擬器。

來源為 `promise82114/mycopunk-checklist` 的 `main`／`b708d9889fa08e642d496c5e1c67aa59bef45a75`。原說明保存在 [SOURCE_README.md](SOURCE_README.md)，搬入前每個檔案的 hash 記錄於 [source-manifest.json](source-manifest.json)，不更新成搬入後內容。沒有合併原 Git 歷史或修改舊 repo。

## 本機與驗證

在 Game Companion 根目錄執行：

```powershell
node scripts/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node server.mjs
node scripts/verify-mycopunk-browser.mjs
```

透過 HTTP 開啟 `http://127.0.0.1:4190/game-companion/games/mycopunk/`。`TEST_BASE_URL` 可指定另一個 Game Companion 根網址；Playwright／Edge 沿用平台既有工具，僅建立新 context、使用合成資料。此模組以 ES modules、JSON fetch 與 Worker 運作，不支援直接雙擊 HTML。

只驗證本模組可執行 `node games/mycopunk/verify.mjs`；原有完整資料、來源、格形與求解器檢查位於 `scripts/validate_site.mjs`，已將 `prototype/` 路徑改為 `dist/`。在本模組目錄可執行 `npm run check` 或 `node scripts/serve.mjs`（預設 18423）。無產品套件需要安裝。

## 進度與舊備份

- 新 namespace 為 `game-companion.mycopunk.`，主 Key 為 `game-companion.mycopunk.progress.v1`。舊站 `mycopunk-checklist:collection:v1` 與 `mycopunk-checklist:before-import:v1` 完全不讀寫。
- 沿用 `appId: mycopunk-checklist`、`schemaVersion: 1`、所有穩定 ID 與 `collected`／`tracked`／`note`／`updatedAt`；新站附加 gameId、moduleVersion、revision。revision 為本機變更計數，不是跨分頁交易保證。
- 先在舊站匯出 JSON，再到新站右上角「備份與還原」選擇匯入；各功能頁都可使用，Checklist 摘要也保留入口。兩端原文先存至本模組的獨立匯入紀錄，顯示逐筆差異；下載復原備份並明確確認後才可套用。可逐筆或批次選擇保留本機／使用來源，不再以新舊時間自動決定匯入結果。
- 來源未列出的本機記錄保留。未知 ID、未知欄位與舊筆記保留；同名頂層欄位以本機為準，來源的碰撞原文保存於匯入紀錄。一般匯出會包含可回復的原文 archives，匯入前下載另含本次兩端原文。
- 預覽之後有本機或另一分頁的新變更、原文紀錄遺失、備份失敗或配額不足時停止匯入。損壞主存檔保留並停用修改；可從來源說明下載原文，再以有效備份走相同預覽流程修復。
- 保留 10 MiB、10,000 筆與每筆舊筆記 5,000 字限制。格式不支援或記錄缺少必要欄位時明確拒絕，不猜測轉換。原文與未知資料會增加儲存空間，不自動清理；含大量歷史的復原檔可能超過一般匯入限制，請保留原檔。
- 沒有 OAuth、Google Drive、Service Worker 或新增離線保證。配裝選擇依原實作只留在本次開啟；配置匯出仍為 schema 2，與收集備份分開。其他遊戲的儲存不受影響。

命名與實際 Key 見 `dist/model.js` 及 [搬移與儲存契約](docs/MIGRATION.md)；快照與 SW cache 前綴僅保留命名，沒有建立原模組不存在的快照／SW 功能。

## 維護與限制

2026-11-01 接續調整（本批依使用者授權提交、推送並納入 main Pages 發布流程）：五項主功能改為固定左側選單，裝備分類可展開；720px 以下由「功能選單」開啟左側抽屜。抽屜使用原生 dialog 與同一份導覽節點，支援鍵盤、Escape、選完自動關閉及跨尺寸切換。右上仍提供遊戲目錄、語言、來源與備份。側欄及工作區沿用 EDF 的 244px／195px 與 1620px 上限，僅改 `companion-ui.css`、HTML 結構與導覽事件，不改原始 `styles.css`、攻略、資料或儲存 schema。

2026-11-01 介面調整：右上工具列固定提供遊戲目錄、語言切換、來源與查證及備份還原；收集備份沿用原 `exportCollection`／保護式匯入。配裝配置仍由配裝頁另行匯出。新增 `dist/companion-ui.css` 調整工具位置，來源 `styles.css`／資料與 manifest hash 不變；本批依使用者授權提交、推送並透過既有 main Pages 流程發布；部署結果以對應提交的 [GitHub Actions](https://github.com/promise82114/game-companion/actions/workflows/deploy.yml) 為準。

攻略、翻譯、資料 JSON、圖片、裝備 SVG、格形與求解器保持來源版本。Wiki 貢獻者署名、固定修訂與 CC BY-SA 4.0 授權仍在頁面與來源資料中。沒有為搬移更新外部攻略，也沒有進遊戲驗證效果、版本適用性或配裝資格。

Excel、翻譯、研究證據與匯入工具留在模組根及其子目錄，部署只複製 `dist/`。五個離線 Python 匯入器的順序與限制見 SOURCE_README（本模組路徑改為 `dist/`）；連外研究工具不由檢查或 CI 執行。本次搬移執行 Node 完整驗證與 hash 核對，未執行 Python 重建或重新抓取外部來源。
