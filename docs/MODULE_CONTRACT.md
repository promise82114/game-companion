# 遊戲模組與新增流程

每款遊戲使用 `games/{slug}/`，slug 只用小寫英數及連字號，不綁平台或 PS Store 商品 ID。Portal 不依賴遊戲內部 Schema，也不讀取進度。

## 必要檔案

```text
games/{slug}/
  module.json
  README.md
  dist/index.html
  dist/                         完整可直接發布的資源
  verify.mjs                    或明確記載的驗證入口
  docs/                         資料來源、版本、操作與限制
```

`module.json` 欄位：

| 欄位 | 契約 |
| --- | --- |
| gameId／slug | 穩定且唯一；目前兩者相同 |
| title | Portal 顯示名稱 |
| description | 可選；遊戲目錄的工具說明，缺少時沿用既有收集手帳文案 |
| moduleVersion | 模組程式版本 |
| progressSchema | 進度 Schema 版本，與攻略內容版本分開 |
| entry | 目前靜態打包契約為 `dist/index.html` |
| publicPath | `games/{slug}/` |
| storagePrefix | 完全獨立，例如 `game-companion.{slug}.` |
| driveProjectId／driveFileName | 遊戲自己的備份識別；名稱不代表唯一檔案 |
| cloudWritesEnabled | 新模組預設 false；true 必須搭配 cloudSafety 與已驗證的底層保護，不能單獨解除封鎖 |
| cloudSafety | EDF 使用 per-grant-conditional-probe；授權、遊戲／帳號隔離、Base、衝突、編輯保護與條件寫入缺一不可 |
| legacyUrl／sourceCommit | 搬移來源可填；新遊戲沒有舊站時可省略 legacyUrl |

新增模組時複製結構而不是把 EDF app 改名當成 Roadmap。不同遊戲可有不同框架，但編譯結果必須落在該模組的 `dist/`；在 artifact 建立前執行該模組自己的建置與驗證。不要發布其他遊戲失敗時的半份網站。

## 開發步驟

1. 建立模組 README、穩定 gameId、資料來源與項目 ID 規則。Roadmap 先定義步驟／章節、依賴、完成狀態與筆記，不借用 EDF 的 item hash。
2. 宣告本機儲存與備份格式；版本轉換須有來源備份、預覽與復原。未知欄位／項目保留原文或可回復隔離資料，禁止無聲丟棄。
3. 提供自己的頁面與返回 Portal 的相對連結 `../../`，資源引用相對於模組根。無雲端需求就不要載入 OAuth；需要時由模組獨立實作。
4. 若用 SW，scope 留在自己的目錄，cache 命名及版本清除前綴必須獨立；不可清 origin 全部 cache／storage。
5. 增加資料／行為回歸與 `scripts/verify.mjs` 的必要模組檢查，再執行 build／verify-site。模組 registry 自動產生入口，新增無舊站遊戲不應產生假舊站連結。
6. 隔離瀏覽器測試新舊存檔共存、直接網址／重整、手機與鍵盤、空資料／錯誤／備份回復。真實外部寫入另行授權。

目前深入驗證明列 EDF 兩款與 Mycopunk；`scripts/verify.mjs` 會執行各模組的必要資料檢查，Mycopunk 另有 `scripts/verify-mycopunk-browser.mjs` 檢查自己的路徑、Worker、資料隔離及匯入保護。新增遊戲要擴充此驗證清單，不能只新增 manifest 就聲稱該模組已驗收。目前 workflow 沒有 Node 以外的產品依賴；需要框架時限定在模組內管理，不要求其他遊戲更換技術。
