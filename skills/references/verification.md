# 驗證命令與證據範圍

以下為現有入口的接入參考，工作目錄均為 repo 根 `G:\git\game-companion`，另有說明者除外。列出命令不表示本次技能整理重新執行了全部遊戲測試。

## 資料與發布產物

需 Node.js 24；執行前閱讀腳本以確認範圍及副作用。

```powershell
node scripts/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
```

- [verify.mjs](../../scripts/verify.mjs)：必要模組資料／契約、未知資料保留及隔離斷言，會呼叫模組檢查。本次盤點範圍為六款；整理期間此入口另有新遊戲接入變更，執行前確認當時清單。新增模組仍須擴充必要驗證。
- [build.mjs](../../scripts/build.mjs)：重建根 `_site/`，複製各 `dist/`、工具、共用資源並產生 Portal，只清除 repo 根 `_site/`。避免與其他工作同時重建共用輸出。
- [verify-site.mjs](../../scripts/verify-site.mjs)：檔案、HTML 本機連結、namespace、SW／Drive 保護及模組資源；ES module、Worker 和所有深連結的實際運作仍須瀏覽器證據。

| 模組 | 資料檢查命令 | 範圍／注意事項 |
| --- | --- | --- |
| EDF WB | `node games/edf-wb/verify.mjs` | Wiki、翻譯來源、ID、隔離 |
| EDF WB2 | `node scripts/verify.mjs` | 根腳本的 WB2 契約檢查；`games/edf-wb2/verify.mjs` 本身是瀏覽器測試 |
| Mycopunk | `node games/mycopunk/verify.mjs` | 含 `scripts/validate_site.mjs` 的資料、格形、求解器檢查 |
| Talos II | `node games/talos2/verify.mjs` | 資料、步驟、映射、合成同步等 |
| Thank Goodness | `node games/thank-goodness-youre-here/verify.mjs` | 100 步、33 盃、tracker、model／同步等 |
| Grounded | `node games/grounded/verify.mjs` | schema、周目、部分資料、矩陣、完成判斷等 |

## HTTP 與隔離瀏覽器

先 build，在一個終端啟動：

```powershell
node server.mjs
```

另開終端執行測試；明確設定網址可避開各腳本歷史預設埠差異：

```powershell
$env:TEST_BASE_URL='http://127.0.0.1:4190/game-companion/'
node scripts/verify-browser.mjs
```

`TEST_BASE_URL` 必須含 `/game-companion/` 及尾斜線。改埠時在 server 終端設 `PORT`，測試終端同步改網址。使用 [browser-runtime.mjs](../../scripts/browser-runtime.mjs) 的既有 Playwright；若安裝位置不同，`PLAYWRIGHT_REQUIRE_FROM` 指向可解析已安裝 Playwright 的 require 起點檔案，`BROWSER_CHANNEL` 預設 `msedge`。不為文件檢查自動安裝套件或下載瀏覽器。

| 驗證入口 | 主要範圍 |
| --- | --- |
| [verify-browser.mjs](../../scripts/verify-browser.mjs) | Portal registry、四模組外框十寬度對照、EDF 兩作及同來源隔離；不等於六遊戲完整回歸 |
| [verify-mycopunk-browser.mjs](../../scripts/verify-mycopunk-browser.mjs) | Mycopunk 入口／清單／備份／Worker／隔離及錯誤處理 |
| [verify-talos2-browser.mjs](../../scripts/verify-talos2-browser.mjs) | Talos 操作、收集／遺物、儲存／匯入及合成 Drive |
| [verify-talos2-navigation-browser.mjs](../../scripts/verify-talos2-navigation-browser.mjs) | Talos 路線、深連結、響應式／行走指引；盤點時包含其他工作未提交的星星導航回歸 |
| [verify-thank-goodness-browser.mjs](../../scripts/verify-thank-goodness-browser.mjs) | 100 步、tracker、收合／焦點、初始化、離線、跨分頁及合成 Drive |
| [verify-grounded-browser.mjs](../../scripts/verify-grounded-browser.mjs) | 周目／收集／地圖／矩陣、原位勾選、匯入及跨分頁 |
| [verify-upstream.mjs](../../scripts/verify-upstream.mjs) | EDF WB2 專屬測試 wrapper，目標是本 repo 的整合頁面 |

WB2 細項可由 wrapper 選取；檔名參數相對於 `games/edf-wb2/`：

```powershell
$env:TEST_URL='http://127.0.0.1:4190/game-companion/games/edf-wb2/'
node scripts/verify-upstream.mjs verify-content.mjs verify-character-accessories.mjs verify-linked-collection.mjs verify-mission-tabs.mjs
```

其他細項有 `verify-localization.mjs`、`verify-weapon-localization.mjs`、`verify-accessory-localization.mjs`、`verify-separated.mjs`、`verify-mission-modes.mjs`、`verify-favorites.mjs`。直接執行前檢查 cwd、URL、runtime 及範圍。wrapper 的名字不表示可執行 `upstream/` 舊自動同步 suite。

## Drive 合成驗證

```powershell
node scripts/verify-cloud-guard.mjs
node scripts/verify-sync.mjs
# server 已啟動且 TEST_BASE_URL 已設定
node scripts/verify-sync-browser.mjs
```

[verify-cloud-guard.mjs](../../scripts/verify-cloud-guard.mjs) 只證明 EDF adapter 未驗證時封鎖寫入；[verify-sync.mjs](../../scripts/verify-sync.mjs) 以 [fixtures/drive.mjs](../../scripts/fixtures/drive.mjs) 驗證 EDF merge／Journal／session／ETag；[verify-sync-browser.mjs](../../scripts/verify-sync-browser.mjs) 攔截 OAuth／Drive 驗證 EDF 瀏覽器流程。Talos 與 Thank Goodness 的非同步 store 適配另由各自資料及瀏覽器套件驗證。Mycopunk／Grounded 未接 Drive，不能由 EDF 測試代替新接入驗收。

新同步模組補齊：未驗證封鎖、缺／弱 ETag、忽略 If-Match、過期 412、競爭一勝一拒、切換帳號／重新 grant、首次配對、未知欄位、取消勾選、過期預覽、同步中新編輯及結果未知復原。真實 Google 的 OAuth origin、權限、CORS／ETag、跨裝置仍由使用者在正式網域驗證。

## 新頁面通過條件

依選用功能延伸既有測試，使用合成資料及新 context：空進度、取消、重整、兩分頁各改不同欄位、未知／損壞資料、另一遊戲與舊站 sentinel 保持不變。匯入另測復原包、未確認禁止套用、預覽後編輯及下載／儲存失敗。

UI 檢查桌面／平板／390px／320px、鍵盤、dialog Escape、焦點與捲動；章節／搜尋／地圖瀏覽不代填完成紀錄。使用 SW 時，另在允許 SW 的新 context 驗證快取更新與真正離線，不能只用 `serviceWorkers:'block'`。

本機輸出沿用 `outputs/`。不寫入正式玩家資料、憑證或 token。回報實際命令、結果與未測範圍；mock、靜態檢查及舊報告不替代真實服務／遊戲驗收。
