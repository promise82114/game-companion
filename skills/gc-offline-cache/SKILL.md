---
name: gc-offline-cache
description: 為 Game Companion 需要離線的模組接入或更新限定 scope 的 Service Worker、資源快取及版本清理，避免影響其他遊戲與玩家進度。
---

# 模組限定離線快取

先讀[專案契約](../references/project-contract.md)。目前 EDF 兩作與 Thank Goodness 有 SW；Mycopunk、Talos II、Grounded 及 Portal 沒有同類離線保證。只在需求包含離線時接入。

## 現有實作位置

- [WB sw.js](../../games/edf-wb/dist/sw.js)、[WB2 sw.js](../../games/edf-wb2/dist/sw.js)：模組自己的 CACHE／prefix，安裝資源、啟用時只清自己的舊版，scope 內 GET 網路優先及自己的 cache fallback。
- [Thank Goodness sw.js](../../games/thank-goodness-youre-here/dist/sw.js)：PREFIX／CACHE／ASSETS、origin／pathname scope 檢查，預快取離線資源並以 `ignoreSearch:true` fallback；現行 cache v11。
- 註冊及資源載入：[WB app](../../games/edf-wb/dist/app.js)、[WB2 app](../../games/edf-wb2/dist/app.js)、[Thank Goodness app](../../games/thank-goodness-youre-here/dist/app.js)／[index](../../games/thank-goodness-youre-here/dist/index.html)。
- [verify-site.mjs](../../scripts/verify-site.mjs) 檢查資源／prefix／scope；[verify-browser.mjs](../../scripts/verify-browser.mjs) 及 [Thank Goodness browser](../../scripts/verify-thank-goodness-browser.mjs) 有離線行為檢查。

## 接入步驟

1. 定義新模組自己 `game-companion.{slug}.assets.` 前綴、版本及註冊 scope，保持在自己的遊戲目錄。Portal 不註冊覆蓋全部遊戲的 SW。
2. 清點 HTML／CSS／script／JSON／SVG／Worker／共用 import 的實際相依，再決定快取策略。不要只複製別的 ASSETS；跨模組根 `shared/` 的依賴要明確處理及驗證，原無 SW 的遊戲不會因此自動離線。
3. 僅處理自己 origin／scope 的 GET；不攔截 OAuth、Drive 或其他遊戲。cache 查詢指定自己的 CACHE，禁止全 origin `caches.match` 撈到別的遊戲資源。
4. 攻略或程式資源改版時同步遞增版本及更新資源清單。activate 只刪相同專屬 prefix 的其他版本；不清 localStorage／IndexedDB、其他遊戲或舊站快取。
5. 依實際網路優先／預快取 fallback 策略設計更新行為。分開處理 query 導覽與缺少資源，避免以錯誤頁當成功快取；安裝失敗不能宣稱新版本可離線。
6. 本機以 HTTP、正式以支援 SW 的來源測試。首訪尚未安裝、無網路資料及雲端離線失敗要有明確訊息；離線可用不代表可以呼叫 Google 同步。

## 驗證方式

依[驗證參考](../references/verification.md)先 build／verify-site，再以**允許 Service Worker 的全新 context**測試。等待 SW ready／控制頁面後，離線並重開該模組，確認清單／攻略／本機勾選及必要圖像可用。

合成案例：同 origin 放另一遊戲 cache sentinel；更新自己的 CACHE 後 sentinel 不變、舊己方 cache 被清；query／深連結重整可讀、所有 ASSETS 存在且安裝成功、網路恢復可更新、缺資源明確失敗。使用 `serviceWorkers:'block'` 的一般 UI suite 不能代替這些證據。

## 限制

SW 不提供玩家資料備份，也不保證永久儲存；快取資源與 progress namespace 分開保護。Mycopunk 預留 cache prefix 不是既有 SW 功能；不要在功能盤點中標成已支援離線。
