# 無双OROCHI Z（PS3）

武將、劇本、特技與鍊成素材收集手帳。介面使用繁中，參考資料集中在「資料來源與判定」。

## 本機開啟

在 Game Companion 根目錄使用 Node.js 24：

```powershell
node scripts/build.mjs
node server.mjs
```

開啟 [本機遊戲入口](http://127.0.0.1:4190/game-companion/games/musou-orochi-z/) 或從 Portal 搜尋「OROCHI」。共用儲存模組由發布產物的相對路徑載入，因此請透過 HTTP 開啟。

- **全武將**以勢力分組，一人一列。桌面左側是熟練度，右側是武器與特技。拖曳熟練度滑桿時會在服裝及壁紙門檻吸附，繼續拖即可離開。鍵盤與數字欄可精確調到每一點。熟練度未記錄時顯示 0。武器與特技可逐項勾選、全勾／全取消，或撤銷最近一筆批次。壁紙以全武將已取得推算。
- **全關卡**按勢力及模式排列，外傳在對應章節下方。點選關卡方格可切換激難通關紀錄，點「條件」可查看開啟條件及待查項目。
- **全特技**從武將特技勾選推算，可由待習得名單跳回武將。**全鍊成素材**預設展開未取得卡片的出處與條件，勾選後自動收合，可點標題再展開。
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
