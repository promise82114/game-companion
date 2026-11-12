# 無双OROCHI Z（PS3）

武將、劇本、特技與鍊成素材收集手帳。繁中名稱採攻略用語與暫譯，可用日文名稱搜尋。

## 本機開啟

在 Game Companion 根目錄使用 Node.js 24：

```powershell
node scripts/build.mjs
node server.mjs
```

開啟 [本機遊戲入口](http://127.0.0.1:4190/game-companion/games/musou-orochi-z/) 或從 Portal 搜尋「OROCHI」。共用儲存模組由發布產物的相對路徑載入，因此請透過 HTTP 開啟。

- **全武將**可按勢力、名稱與完成狀態篩選。熟練度以輸入或滑桿回填，數字在確認輸入後儲存，清空可恢復未記錄。武器與特技分別全勾／全取消，可撤銷最近一筆批次。勾選「已可操作」才計一般壁紙。
- **全關卡**只記激難。章節與外傳可直接展開，逐關列開啟條件與來源，有分歧的條件標待查。
- **全特技**從武將特技勾選推算，可由待習得名單跳回武將。**全鍊成素材**可在素材與出處關卡間互跳。
- **備份與匯入**提供 JSON 匯出、原文保存、逐筆比較與雙端復原下載。確認下載已保存後才套用。若在其他分頁改過進度，請重新比較。
- 「服裝未達標」包含特殊三名的 PS3 獎盃攻略門檻。三人沒有額外服裝或一般武將壁紙。

## 維護

資料存於 `dist/catalog.json`，遊戲進度另存 `game-companion.musou-orochi-z.progress.v1`。新增資料沿用穩定 ID 與來源註記。內容與例外見[資料與驗證紀錄](docs/IMPLEMENTATION.md)。

```powershell
node games/musou-orochi-z/verify.mjs
node scripts/verify.mjs
node scripts/verify-sync.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
# 另開 server.mjs 後執行
node scripts/verify-musou-orochi-z-browser.mjs
```
