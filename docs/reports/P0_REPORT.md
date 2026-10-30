# P0｜EDF WB 舊專案只讀盤點

盤點日期：2026-10-31（Asia/Taipei）

需求基準：[`GAME_COMPANION_ARCHITECTURE.md`](../../GAME_COMPANION_ARCHITECTURE.md) v1.0，特別是第 6～10、13 節。

狀態：**P0 盤點完成，等待使用者審核；未開始 P1～P6。**

## 盤點結論與證據分類

舊站適合以獨立 HTML/CSS/JS 模組搬移，不需要先換框架或建後端。來源 `main` 與最新成功 Pages 部署均為 `766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2`。既有資料驗證通過，共 864 個收集項目、71 個關卡與 18 個推薦關卡。

**不能直接把舊站原封不動發布到 Game Companion 的正式路徑。** 同一 origin 會共用 localStorage 與 Cache Storage；沿用舊 Key、Drive 檔名及快取清除前綴，可能讀寫舊進度／備份或干擾舊站離線快取。既有同步有實用的時間戳合併與讀回檢查，但不符合新規格的三方合併、衝突選擇與手動同步契約；無 ETag 的寫入也未具備已證明的原子競爭保護。這些是後續階段的工作與閘門，本次沒有修正。

全文使用以下標記，避免把程式存在等同於正式驗收：

| 標記 | 意義 |
| --- | --- |
| `[原始碼確認]` | 在下列固定 SHA 的檔案中直接確認；不代表瀏覽器或外部服務已驗收 |
| `[實測確認]` | 本次執行的唯讀指令、HTTP GET 或純記憶體合成資料檢查 |
| `[待測試]` | 有實作或建議，但仍需後續隔離環境／經授權的整合測試 |
| `[未知]` | 本次未取得足以確認的設定、實際資料或服務行為 |

建議、風險推論與後續驗收條件會另外明示；不是已實作功能。

本次遵守的界線：

- 已讀 `G:\git\AGENTS.md`；`G:\git\game-companion\AGENTS.md` 不存在，舊 repo 及兩個 repo 相關子目錄亦未找到其他 `AGENTS.md`。
- 只讀 `G:\git\edfwb-checklist`、指定 GitHub repo、公開 Pages 靜態檔與 Google 官方文件；沒有讀取 `outputs/` 的私人備份／截圖內容。
- 沒有啟動網站、註冊 service worker、登入 Google、取得 Token，或讀取／寫入真實 localStorage、IndexedDB、Google Drive。
- 沒有執行會寫入 `dist/` 的資料產生器，沒有修改舊 repo、fetch、checkout、commit、push、部署或調整外部設定。
- Game Companion 開始時位於 `develop`，唯一未追蹤檔是使用者既有 `GAME_COMPANION_ARCHITECTURE.md`；本次僅新增本報告，不覆寫架構或進度文件。

## 1. Git、來源與部署版本

| 項目 | 結果與證據 |
| --- | --- |
| 指定來源 | `[實測確認]` [promise82114/edfwb-checklist](https://github.com/promise82114/edfwb-checklist)，公開 repo；GitHub repo API 回傳 `default_branch: main`、`archived: false` |
| 本機來源 | `[實測確認]` `G:\git\edfwb-checklist`；目前 `main...origin/main` |
| 完整 SHA | `[實測確認]` `766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2`；本機 `git log -1`、遠端 `git ls-remote`、Actions 與 Deployment 一致 |
| 最新提交 | `[實測確認]` `fix(localization): 補上武器別名對照與中文詞段組合依據`，2026-10-23 20:28:52 +08:00 |
| 工作樹／暫存區 | `[實測確認]` `git --no-optional-locks ... status --short --branch` 僅顯示分支；`diff`、`diff --cached`、`ls-files --others --exclude-standard` 無輸出，沒有已追蹤變更或未忽略的未追蹤檔。忽略的 `outputs/` 存在，未盤點內容；不宣稱不存在忽略檔 |
| 分支 | `[實測確認]` 本機 `main`、`develop`；本機 `develop` 為 `ee07514` 的初始提交。遠端 HEAD 指向 `main`，所查詢的遠端 `develop` 無 ref；不應以本機 `develop` 作搬移基準 |
| Tags | `[實測確認]` 本機 `git tag --list`、遠端 tags refs 與 GitHub tags API 均為空，沒有可用 Tag |
| 最新成功部署 | `[實測確認]` [Actions run 39953634964](https://github.com/promise82114/edfwb-checklist/actions/runs/39953634964)，`main`／上述 SHA，`completed: success` |
| Deployment | `[實測確認]` [7278184506](https://api.github.com/repos/promise82114/edfwb-checklist/deployments/7278184506)，環境 `github-pages`；[狀態](https://api.github.com/repos/promise82114/edfwb-checklist/deployments/7278184506/statuses) 為 `success`，2026-10-23 20:29:17 +08:00，指向下列正式網址 |
| 正式靜態內容 | `[實測確認]` [舊站](https://promise82114.github.io/edfwb-checklist/) 的 `index.html`、`sw.js` 與 HTML 直接引用的 17 個 JS/CSS，共 19 檔，GET 均為 HTTP 200；CRLF 正規化為 LF 後的 SHA-256 全部與本機來源相符。這不代表使用者既存 service worker 一定已更新 |
| Pages 後台設定 | `[未知]` 未帶帳號的 `GET /repos/promise82114/edfwb-checklist/pages` 回 404，不能據此判定 Pages 未啟用；實際部署由上述 Actions、Deployment 與 HTTP 內容交叉確認。後台權限／其他限制未讀取 |

後續搬移建議固定使用此完整 SHA，並在獲准進入後續階段後記入 `docs/migrations/edf-wb.md`；P0 沒有建立該檔或搬入來源歷史。

## 2. 技術、建置、入口與資源路徑

`[原始碼確認]` 這是原生 JavaScript 靜態網站，沒有 `package.json`、lockfile、第三方 Node 套件或框架編譯流程。`dist/` 是已追蹤的正式網站內容，不是可任意刪除的暫存目錄。

| 範圍 | 檔案與責任 |
| --- | --- |
| 網站入口 | `dist/index.html`：繁中單頁介面、清單與各 dialog；頁內切換，不使用 history router |
| 介面與進度 | `dist/app.js`：清單、關卡、設定、勾選、收藏、筆記、localStorage、匯出入、復原與儲存介面 |
| 樣式 | `dist/style.css`、`dist/usability.css` |
| 攻略與清單 | `dist/data.js`、`details.js`、`translations.js`、`acquisition.js`、`content.js`、`mission-facts.js`、`recommendations.js`、`character-accessories.js` 為產生器輸出；`dist/missions.js` 在載入時組合關卡候選 |
| 同步 | `dist/cloud-config.js`、`cloud-sync.js`、`shared/google-auth.js`、`shared/drive-appdata.js`、`shared/progress-envelope.js`；這裡的 `shared/` 是舊模組內部程式，不等於新平台共用 SDK |
| 離線 | `dist/sw.js`；`app.js:358` 以 `./sw.js` 註冊，`file:` 不註冊，註冊失敗被 catch 忽略 |
| 來源資料 | `data/wiki-facts.json`、`localization-reference.json`、`localization-fallback.json`，包含攻略事實、翻譯來源與參考翻譯 |
| 資料產生 | `scripts/build-data.mjs:1–81`，讀本地 JSON 並寫入上述八個 `dist` 檔，不連外；**P0 未執行** |
| 本機預覽 | `server.mjs`，Node 內建 HTTP/fs/path，根為 `dist`，預設 `127.0.0.1:4181`，可透過 `PORT` 改埠；不是正式後端 |
| 驗證與文件 | `verify.mjs`；`README.md`、`docs/data-review.md`、`docs/reference-translations.md` |

`[原始碼確認]` HTML 的本地 JS/CSS、首頁連結與 service worker 預載使用相對路徑。沒有必須重寫的 `/edfwb-checklist/...` 絕對資源路徑；Wiki 與 Google URL 是外部來源。複製整個 `dist` 內容到新模組目錄，有望保留相對引用與 script 順序。證據：`dist/index.html:3–5,29`、`dist/sw.js:2`、`dist/app.js:358`。

`[待測試]` 新 `/game-companion/` base path、`/games/edf-wb/` 尾斜線、直接開啟／重新整理、手機版、SW scope／離線更新均未在新站測試；相對路徑的原始碼證據不能代替此驗收。現有頁面也沒有獨立每項／每關 URL 的深層路由契約。

## 3. 功能盤點

以下功能存在性為 `[原始碼確認]`，資料數量另由本次 `verify.mjs` `[實測確認]`。操作介面本次未重新執行，舊 README 的瀏覽器驗證記錄不算本次實測。

| 功能 | 舊站行為／界線 | 主要證據 |
| --- | --- | --- |
| 武器 | 本篇 310、全內容 455，91 系列；依名稱／LV 分項；另有 DLC 分頁、出處角色提示與 Wiki | `app.js:46–57,61–66,155–174,347–356`；`verify.mjs` |
| 角色 | 本篇 186、全內容 209；α／β／γ、無印及五個 V01 分開，DLC／特典受設定控制 | `app.js:30–45,61–66`；`build-data.mjs:29–40` |
| 配件 | 200 個名稱＋LV＋型別組合，攻擊／回復／移動／耐久；僅收錄攻略有數值組合 | `app.js:48–58`；`build-data.mjs:58–59` |
| 一代裝備界線 | 不提供二代角色四欄配件資格；相關 UI 殘留但隱藏，資料為空設定 | `app.js:14–19,175`；`character-accessories.js` |
| 搜尋／篩選 | 中日文、系列、分類、LV／版本、出處角色、M／EX 代號、已取得／未取得；預設未取得 | `app.js:137–174,289,300–303,356` |
| 統計／批次 | 本篇與 DLC 分開分母；武器 LV、配件分類卡；批次勾選目前可見項目需確認 | `app.js:50–58,154,339` |
| 使用者設定 | 20 個內容選項，DLC 全選／部分選；關閉只影響可見性，不刪取得進度；共用武器採來源 OR | `app.js:20–23,126–136,360–375`；`content.js`；`verify.mjs` |
| 關卡工具 | M01–60、EX01–11，共 71；武器 LV1–4／角色補收、候選占比、排序、只看可補收、重點查看、18 關推薦 | `app.js:176–288`；`missions.js`、`recommendations.js` |
| 收藏／筆記 | 每關收藏、我的最愛分頁、每關最多 5000 字筆記；會存檔及備份 | `app.js:103–114,229–245,322–323`；`index.html:22` |
| 進度操作 | 勾選即存、明確取消勾選、記憶體 undo；一般操作將 undo 限為 30 步，但匯入分支單獨 push 未套用同一裁切 | `app.js:106–125,132–136,296,338` |
| 備份／還原 | raw JSON／雲端 envelope 可匯入；預覽取得數與未知項目數、合併／替換、本機快照；並非逐筆差異介面 | `app.js:69–101,294–296,340–343` |
| 多分頁／離線 | storage event 與逐項時間戳合併；HTTP 下的 SW 離線快取 | `app.js:118,344,358`；`sw.js` |
| 雲端 | Google Drive appDataFolder；連接後預設自動同步，亦提供手動比較／同步、合併／還原 | `index.html:26`；`cloud-sync.js` |

`[原始碼確認]` 沒有每件物品的持有數量、物品備註或任務完成／難度通關進度欄位；收藏和關卡筆記不等於任務通關。架構中的「數量」目前可比對項目總數／完成數，不能假設有舊持有數量可搬。若外部備份實際帶有額外欄位，必須保留並列為異常，不能沿用舊驗證器直接刪除。

`[原始碼確認]` 攻略內容有既有不確定性：候選角色名單是攻略推算而非掉落率；DLC 早期分布、逐型號／逐難度掉落表、部分繁中參考翻譯尚未實機核對。參考翻譯有 101 個收集項目／46 個不重複名稱；這是舊文件與來源資料的限制，不應歸為搬移新缺陷。證據：`docs/data-review.md`、`docs/reference-translations.md`。本次未重查遊戲或 Wiki 事實。

## 4. 本機資料、Schema、ID 與清除行為

### 4.1 儲存位置與版本

| 識別 | `[原始碼確認]` 格式與用途 |
| --- | --- |
| `edfwb-progress-v1` | 主要 JSON 進度 |
| `edfwb-snapshots-v1` | 最多 12 筆 `{at,label,data}`；自動快照間隔超過 10 分鐘，另在批次勾選／匯入／雲端 reconcile 前保存 |
| `edfwb-backup-time` | 一般 JSON 下載備份的毫秒時間字串；雲端匯出不會經過該按鈕的 META 更新 |
| `edfwb-progress-v1-damaged-{Date.now()}` | 主存檔解析失敗後，後續 persist 嘗試保留原始字串；不是永久保證的外部備份 |
| IndexedDB／sessionStorage | 在發布原始碼中未找到使用，沒有應用自訂 DB／store 可列 |
| 同步 Base／file ID／Token | 沒有持久化 localStorage Key；同步狀態與授權僅存在記憶體 |
| Cache Storage | `edfwb-field-log-v3`，屬網站資源快取，不是玩家進度備份 |

證據：`app.js:2,68–124,294–296,340`、`cloud-sync.js:5–16`、`shared/google-auth.js:18–52`、`sw.js:1–4`。localStorage/IndexedDB 結論範圍為本次固定 SHA 的程式，沒有讀取使用者實際瀏覽器內容。

`[原始碼確認]` 進度 raw JSON 的契約如下（示意型別，不是真實玩家資料）：

```text
{
  app: "edfwb-collection",
  schema: 1,
  catalogVersion: "2026-10-23",
  updatedAt: 毫秒時間戳,
  entries:      { [itemId]:      { owned: boolean,    updatedAt: number } },
  favorites:    { [missionCode]: { favorite: boolean, updatedAt: number } },
  content:      { [contentId]:   { enabled: boolean,  updatedAt: number } },
  missionNotes: { [missionCode]: { text: string,      updatedAt: number } }
}
```

`favorites`、`content`、`missionNotes` 在舊備份可缺省；驗證器刻意刪除缺省欄位，供匯入保留目前內容。明確的 `false`／空筆記有時間戳，不能當成沒有記錄。export 額外加 `exportedAt`，一般下載檔名為 `edfwb-progress-YYYY-MM-DD_HH-MM-SS.json`。外層雲端 envelope 見第 6 節。

`[原始碼確認]` 沒有獨立平台版本／模組版本／revision／gameId 欄位；catalog 中有 `game: edfwb`，進度以 `app`、Schema、catalogVersion 識別。`catalogVersion` 是攻略核對日期；`validate()` 用當前 `fresh()` 重建，不保留／比對輸入 catalogVersion。新規格的版本與修訂契約尚待後續定義。

### 4.2 穩定 ID 與匯入語意

`[原始碼確認]` `scripts/build-data.mjs:7,37,46,59` 的規則：

```text
wb1-{kind 第一字元}-{SHA256(JSON.stringify(keys)) 的前 16 個 hex 字元}
characters keys = [日文名稱, 版本]
weapons    keys = [日文名稱, LV 數字]
accessories keys = [日文名稱, LV 數字, 型別]
```

收藏／筆記使用 `M01`～`M60`、`EX01`～`EX11`。內容選項包括 `character-{menuId}`、`alternate-set`、`mission-pack`。ID 不依排序或中文名稱；**修正日文名稱、LV、版本、型別仍可能改 ID**，須保留舊 ID 映射。現有 864 個 ID 唯一性通過驗證。

`[原始碼確認]` `validate()` 嚴格檢查 app/schema、布林與非負有限時間戳、筆記長度；一般匯入檔案限 5 MiB。手動「合併」將任一已取得／收藏／啟用項目設 true 並用現在時間寫入，筆記用較新時間戳；它不是三方合併，也不會傳遞來源的取消勾選。替換會對完整 catalog 重建 owned，缺漏者設 false；缺省的可選群組保留目前資料。證據：`app.js:69–99,296,341–343`。

`[實測確認]` 本次在 Node VM 擷取真正 `fresh/validate`，以純合成資料加入未知 ID、頂層額外欄位、entry 的 `count/note` 與舊 catalogVersion：未知 ID 計數為 1 但不保留；額外欄位不保留；catalogVersion 變成 `2026-10-23`。這是資料正規化行為，不是本次改寫真實進度。

風險：手動匯入雖提醒未知項目會略過，但未知欄位沒有相應保留；`load()` 也只取驗證後的 data，之後 persist 可能把無法識別的內容排除。雲端 `read()` 對未知 ID 會停止同步，對未知頂層／entry 欄位則沒有同等防護。新遷移器不可直接把現有 `validate()` 當作無損轉換器。

### 4.3 快照、清除與復原

`[原始碼確認]` 程式沒有 localStorage 全清／整庫刪除流程；「清除篩選」只改 UI。主要淘汰行為是快照只留 12 筆、匯入替換、undo、逐筆時間戳覆蓋，以及驗證器的欄位／項目過濾。損壞主存檔讀取時嘗試用最近可驗證快照恢復；沒有可用快照則用空狀態並顯示錯誤。

`[原始碼確認]` 本機匯入的 `requireSnapshot` 預設 false，快照寫入失敗後仍可能繼續；雲端套用／reconcile 則要求先成功存快照。`load()` 不把 `unknown` 當成損壞；快照也不是版本歷史或外部可回復備份。證據：`app.js:100–124,296,379–403`。

`[待測試]` 瀏覽器配額、損壞存檔、快照失敗、跨分頁相同毫秒修改、替換／undo 後與其他裝置重新同步的資料回復。切回舊網址不會自動保住新站產生的進度，必須有獨立匯出與映射流程。

## 5. Google OAuth

| 項目 | 確認結果與限制 |
| --- | --- |
| Client ID 來源 | `[原始碼確認]` `dist/cloud-config.js:1–6` 內公開的 Web OAuth Client ID；註解／README 表示與其他 Side Projects 共用。本報告不重複抄錄完整值；檔內沒有 Client Secret |
| scope | `[原始碼確認]` 僅 `https://www.googleapis.com/auth/drive.appdata`；`include_granted_scopes: false`，callback 核對 scope |
| 流程 | `[原始碼確認]` 動態載入 `https://accounts.google.com/gsi/client`，GIS `initTokenClient`／`requestAccessToken`，由使用者 click 啟動；初次／切換通常要求 `select_account`；沒有自訂 redirect URI 或後端 code exchange |
| Token | `[原始碼確認]` `GoogleAuth` 私有記憶體欄位，不存 localStorage／sessionStorage／檔案；Bearer 只用於 Drive request，重新整理後需重新連接 |
| 到期與錯誤 | `[原始碼確認]` 檢查 `expires_in`、到期 timer、`connected`；401 invalidate；GIS 載入 15 秒與授權 120 秒逾時、popup／拒絕／scope 錯誤訊息 |
| 中斷／帳號切換 | `[原始碼確認]` disconnect 清記憶體，不呼叫 Google revoke、不刪進度；adapter 的 session counter 阻止部分舊非同步結果繼續套用；不是遠端請求撤銷，也沒有帳號專屬本機 namespace |
| Authorized origins／測試使用者 | `[未知]` 未讀 Google Cloud Console，無法確認 Client 所屬專案、核准 origin、OAuth 發布狀態、測試使用者與 Drive API 啟用設定 |
| 正式／本機授權 | `[待測試]` 新舊 Pages URL 同為 `https://promise82114.github.io` origin，但不能據此宣稱目前 Client 設定可用；localhost 不同 scheme／host／port 也須核對 |

證據：`dist/shared/google-auth.js:4–52`、`dist/shared/drive-appdata.js:7–16`、`dist/cloud-sync.js:7–12,38,82–88`。

[Google token model 官方文件](https://developers.google.com/identity/oauth2/web/guides/use-token-model) 說明 browser token client 與使用者觸發重新取 Token 的模式；[Web OAuth 官方設定](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow) 說明 origin mismatch。這些文件不能證明此 Client 的實際控制台設定。

`[未知]` 新 Client／不同 Cloud project 是否看得到舊 appDataFolder，沒有實證；[Google appDataFolder 官方說明](https://developers.google.com/workspace/drive/api/guides/appdata) 僅支持應用專屬、使用者與其他 Drive app 無法一般存取的界線。本次不假設不同 Client 能共用或完全隔離。建議首次遷移走舊站 JSON 匯出，避免以跨 Client 讀舊雲端作前提；不搬 Token、file ID 或記憶體同步狀態。

## 6. Google Drive 檔案與錯誤處理

`[原始碼確認]` `dist/cloud-config.js` 使用：

```text
projectId = edfwb-checklist
fileName  = edfwb-checklist.json
scope     = drive.appdata
```

雲端 JSON envelope 為 `{schemaVersion:1, updatedAt:ISO字串, projectId, data:上述進度}`。`shared/progress-envelope.js:4–7` 驗證外層版本、projectId、時間與內層進度；沒有額外 revision、共同 Base 或獨立 gameId。

| 操作 | `[原始碼確認]` 實作 |
| --- | --- |
| 查找 | `DriveAppData.find():19–31`，Drive v3 `files.list`；`spaces=appDataFolder`，名稱完全比對且 `trashed=false`；每頁 100 並讀 nextPageToken |
| 同名檔 | 累積所有頁後大於一份即 `duplicate` 停止；不任意挑第一份 |
| file ID | 每次查找取得實際 ID，read 後只放在記憶體 `remote.file`；無硬編碼／本機持久 file ID。寫入前核對 expected ID/version |
| 下載 | `read():33–41`，檔案 metadata size 與下載字串長度限制、`alt=media`、讀完再取 metadata 比對 version；回傳 media ETag |
| 建立 | `write():50–54`，multipart POST，JSON MIME、`parents:['appDataFolder']`、設定檔名；不保證名稱唯一的原子建立 |
| 更新 | `write():42–49`，重新 find 比對 ID/version，再 media PATCH；**僅 expected ETag 存在才加 If-Match** |
| 寫後確認 | `cloud-sync.js:63–71` 重新下載並比對 fingerprint，不一致視為 conflict 再合併重試 |
| 網路／錯誤 | 每請求 20 秒 AbortController，包含讀 body；401 授權失效、403 permission、412 conflict、429／一般 HTTP／斷線提示 |
| 重試 | adapter 單次 sync 最多 3 次 conflict 嘗試；一般 drive／conflict 錯誤可能延後 60 秒、定時器或下一次事件重試；不是指數退避，也未使用 Retry-After。duplicate／invalid／permission 等會暫停 |
| 刪除／雲端版本復原 | 沒有刪檔、trash、revisions API、遠端歷史備份／回滾功能；不可假設 Drive 自動版本可由現有 UI 取回 |

`[未知]` 真實帳號中的檔案數、file ID、內容、版本與備份健康度；**沒有為了盤點而連線讀正式 appDataFolder**。`[待測試]` 新獨立備份的建立／下載／更新、同名處理、格式不相容、401／403／412／429／timeout、帳號切換與重試。

**競爭寫入結論：** `[原始碼確認]` 目前存在「find/version 檢查」與「PATCH」之間的競爭窗口；沒有 ETag 時仍會 PATCH。寫後讀回只能發現部分競爭，無法復原已被覆蓋且不在此快照裡的他方資料。兩個裝置同時發現無檔，也可能各自 POST 後產生同名檔。這是程式流程導出的風險，不是本次操作正式 Drive 復現的事故。

`[未知]` 此 v3 media PATCH 路徑的 If-Match 是否確實原子拒絕過期寫入、GET 的 ETag 是否可由瀏覽器 CORS 讀取、是否適用於被更新的同一版本。[官方 files.update 參考](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/update) 可確認 PATCH media 介面，但本次未取得足以證明上述整套條件的文件／服務實測。不能把其他 Google API 的 ETag 規則套成 Drive 已驗證保證。P4 必須使用獨立測試來源驗證舊 ETag 的競爭寫入確實回 412；若不能保證，須提出限制與可回復方案再審核，不能宣稱完全安全。

## 7. 同步、衝突、同步中編輯與多分頁

| 新規格要求 | 舊站事實與差距 |
| --- | --- |
| 各遊戲手動同步 | `[原始碼確認]` 雲端需使用者連接，但連接後 `cloudAuto` 預設 checked，5 秒 idle、每分鐘、online、visible 時自動 sync；可關閉並手動同步。與新規格手動策略不同（`index.html:26`、`cloud-sync.js:35,82–105`） |
| Base／Local／Remote 三方合併 | `[原始碼確認]` 無共同 Base。`synced` 僅記憶體 fingerprint，用於 dirty 狀態；`remote` 是當次下載資料，不能當三方 Base（`cloud-sync.js:5–16,63–73`） |
| 取消勾選 | `[原始碼確認]` 自動 reconcile 比較逐筆 `updatedAt`，保留顯式 false；本機時間相同保留 local。可表達取消，不是布林 OR；但裝置時鐘偏差／同時間衝突沒有辨識（`app.js:382–398`） |
| 真正衝突與逐筆／批次選擇 | `[原始碼確認]` 沒有欄位衝突清單、共同 Base 差異或選擇介面；現有「合併／還原」針對整份已下載資料，只有摘要與確認。手動 merge 的 OR 語意又與自動 LWW 不同 |
| 同步中繼續編輯 | `[原始碼確認]` busy 只停雲端控制，清單可繼續操作；讀遠端後 reconcile 最新 local，再以 `get()` 的拷貝及 fingerprint 上傳，完成時 dirty 比較並排後續同步。不會直接用送出的快照覆蓋目前整個 state |
| 同步變更序號／保證不遺失 | `[待測試]` 沒有單調變更序號／操作佇列；snapshot 與 dirty 機制存在，但仍需驗證 await 各階段編輯、相同項目時間衝突、儲存失敗。不能僅憑這段程式判定新契約通過 |
| 多分頁 | `[原始碼確認]` `mergeLatest()` 與 storage event 合併較新項目；每頁 cloud adapter 獨立，沒有 BroadcastChannel、Web Locks 或共同同步鎖。localStorage 讀改寫不是跨頁交易（`app.js:118,344`、`cloud-sync.js:102`） |
| 跨裝置／遠端競爭 | `[待測試]` 有 ID/version、條件 ETag 與讀回，但不構成全面保證；詳見第 6 節，還需雙裝置與雙分頁測試 |
| 斷線／重整 | `[原始碼確認]` 本機立即存、offline 顯示、online 排同步；重整後 Token、remote、fingerprint 均消失。持久化 Base／未完成衝突恢復不存在 |
| 還原與同步分開 | `[原始碼確認]` 替換需確認且先快照；但 restore 完會 schedule，若自動同步開啟會把結果再同步雲端。與新規格「還原不直接覆寫雲端」有差距（`cloud-sync.js:92–99`） |
| 帳號切換 | `[原始碼確認]` session 保護非同步結果但 local 仍同一份；新連接預設自動合併／同步，可能把目前本機資料帶往另一個帳號。`[待測試]` 需明確帳號切換預覽與保護，不可把 session counter 視為資料隔離 |

結論：可保留 GoogleAuth、Drive adapter、envelope 與遊戲儲存介面的拆分方式，逐步修補；沒有證據支持直接宣稱舊同步已符合 P4。不得把重新連接後的 fingerprint 當共同 Base，更不能把首次匯入當已有 Base 的同步。

## 8. 測試證據、既有缺陷與缺少案例

### 8.1 本次實際執行

| 檢查 | 結果／重現方式／限制 |
| --- | --- |
| Git 只讀基線 | `[實測確認]` `git --no-optional-locks -C G:/git/edfwb-checklist status --short --branch`、`diff`、`diff --cached`、`ls-files --others --exclude-standard`；SHA、branch、tags、ls-remote。部分 sandbox 命令無法正常存取舊 repo 工作樹，改以獲准的相同只讀命令完成，沒有修改 Git 設定 |
| 既有資料驗證 | `[實測確認]` 在舊 repo 執行 `node verify.mjs`，exit 0、`passed:true`；Node `v24.22.1`、Git `2.56.0.windows.4`。先讀腳本確認僅 readFile/assert/vm，無網路／檔案寫入／真實存檔存取 |
| 驗證輸出 | `[實測確認]` `items:864, weapons:455, characters:209, accessories:200, missions:71, recommended:18`；檢查唯一 ID、一代來源、owner mapping、翻譯來源、關卡分布、DLC OR、V01、配件空白列、備份驗證及跨遊戲拒絕 |
| 合成資料相容性 | `[實測確認]` Node VM 載入 catalog／missions／content／envelope，從 `app.js` 的 `const fresh=` 到 `function snapshots()` 擷取實際驗證器；送入合成未知 ID／欄位／舊 catalogVersion，assert 確認第 4 節的過濾行為。沒有替代實作、沒有瀏覽器、沒有進度寫入；未留下測試檔 |
| 部署版本 | `[實測確認]` GitHub 公開 API GET repo／tags／deployments／statuses／actions runs，與 ls-remote 交叉確認；公開 Pages API 404 的限制如第 1 節 |
| 正式靜態資源 | `[實測確認]` GET `index.html`、`sw.js` 與 HTML 中相對 `.js/.css` 引用的去重集合；共 19 檔，HTTP 200，UTF-8 文字 CRLF→LF 後 SHA-256 與本機相同；只在記憶體比較，沒有執行下載的 JS |

本次正式資源比對的代表性 SHA-256（LF 正規化）：

```text
index.html            6d3b9e12c1305a7a3571af3cf407a14196cb8cd010dcf80a14920a3f18a09987
app.js                42f2f94757a2b457daef131030d6ae19a9188427a5055d2cb7f1725e712af5fe
cloud-sync.js         e7e2a91de17f659ece9263bc734f9ef9fe156353cfdf03aead52de0e750b4d09
sw.js                 5bcb8b69c94d2ea220ea1407a415767baa438124da5028e0358e5bfa8694341d
shared/drive-appdata.js f92d7ff0c8251003aa1356a7fdc5a7619e10ad497a6ff09c1c05ed327db089c5
```

上述驗證不涵蓋真實 OAuth、Drive、手機瀏覽器、新 base path 或使用者既有 SW。沒有執行 `build-data.mjs`、server、瀏覽器勾選／匯入／還原，沒有新部署。

### 8.2 舊測試紀錄與現存差距

`[原始碼確認]` `README.md`／`docs/data-review.md` 記錄 2026-10-23 的桌面搜尋、勾選、undo、重開、DLC、收藏筆記、JSON 匯出、跨分頁、離線與 390px 手機檢查。這是來源文件的歷史紀錄，本次未重現；同文件明言真實 OAuth／Drive 未驗證。

`[原始碼確認]` `verify.mjs` 執行資料檔與實際 `fresh/validate`，但沒有執行整個 app、`reconcile`、`GoogleAuth`、`DriveAppData` 或 `cloud-sync.js` 的完整流程；SW 僅有 manifest 字串檢查。沒有自動瀏覽器或同步競爭測試，也沒有部署前執行 verify 的 CI 閘門。

既有程式行為／缺口與新遷移回歸應分開記錄：

- `[原始碼確認]` 未知欄位／項目過濾、非三方 LWW、無衝突選擇、無 ETag 仍寫入、手動 restore 可引發自動上傳、本機匯入快照失敗可繼續，都是這個來源版本的行為；不是本次新增回歸。
- `[待測試]` 相同毫秒修改、跨裝置時鐘偏差、多分頁讀改寫競爭、同步中新增編輯、斷線在上傳成功但讀回失敗、重整／授權失效、帳號切換、同名首次建立與異常重試。
- `[待測試]` raw/envelope 的舊新 ID／欄位無損匯入、來源與目標皆非空、未知欄位隔離保存、預覽與逐筆差異、快照／下載失敗、損壞資料、切回舊站前保護新進度。
- `[待測試]` 新 Pages 入口直接開啟／重整／尾斜線、所有必要資源、手機／鍵盤／觸控、SW 新舊快取共存與更新失敗、任一模組檢查失敗時不發布不完整 artifact。

## 9. 遷移風險與處理建議

以下「嚴重度」是影響評估；「阻擋時點」指未解決前不可跨過的後續閘門，不代表 P0 必須提前修程式。

| 風險 | 證據分類／原因 | 嚴重度與阻擋時點 | 建議 |
| --- | --- | --- | --- |
| 舊 localStorage 被新站共用 | `[原始碼確認]` 主要 Key／SNAP／META／damaged 前綴與 cloud storage listener 固定，URL 路徑不隔離 origin 儲存 | 高；同 origin 可操作的新模組公開前 | 全部使用新 game namespace；保留唯讀舊來源偵測，經明確匯入才寫新 Key；實測舊 Key 不變 |
| 舊 Drive 備份誤覆寫 | `[原始碼確認]` 原 config 仍指 `edfwb-checklist.json`／舊 projectId；一旦授權且自動同步就可能寫入 | 高；新模組任何 Google 連接前 | 新檔名、projectId、內容 game/schema 識別；不搬舊 file ID／Token；P4 前禁止真實授權，寫入另需明確批准 |
| Cache Storage 互相干擾 | `[原始碼確認]` `sw.js:1–4` 用 origin 共用名稱與 `edfwb-field-log-` 清除前綴，還以全域 `caches.match` fallback | 高；同 origin 註冊新 SW 前 | 新專屬 cache 名／清除前綴、scope 與限定 cache 查找；不得刪舊前綴。新舊版本共存需實測 |
| 未知資料丟失／來源版本被重建 | `[實測確認]` validate 丟未知項目／欄位並重設 catalogVersion；目前資料沒有 count／物品 note | 高；P3 匯入驗收前 | 先完整備份 raw，再分已知／未知欄位與 ID，保留未對應資料、顯示差異，拒絕無解釋損失 |
| 無 Base 的 LWW 被當作安全同步 | `[原始碼確認]` 無共同 Base；equal timestamp 留本機，筆記整欄取新，無衝突 UI | 高；P4 驗收前 | 真正 Base/Local/Remote、逐筆／批次選擇與取消操作；首次匯入另處理，不偽造 Base |
| 遠端競爭覆寫與同名建立 | `[原始碼確認]` version check 與 write 分離、ETag 選配、POST 非唯一建立；真實原子條件 `[未知]` | 高；P4/P5 Go 前 | 獨立測試檔證明條件更新與 412；否則設安全停止／限制與回復方案並交使用者審核 |
| 同步中編輯／多頁競爭 | `[原始碼確認]` 有 snapshot/dirty 與 storage event，但無變更序號／跨頁鎖；結果 `[待測試]` | 高；P4/P5 前 | 建立變更序號、重新檢查本機版本與未同步提示；合成雙頁／雙裝置時序測試 |
| 還原或帳號切換觸發上傳 | `[原始碼確認]` restore schedule、連接後 auto sync；本機不按帳號隔離 | 高；P4 前 | 還原與上傳分離，手動同步政策，帳號切換需預覽與明確選擇 |
| OAuth 可見性／設定假設 | `[未知]` Cloud Console／Client 間 appDataFolder 可見性未實證 | 中高；P4 連線測試前 | 核對 origin/scope/Client project；先採 JSON 遷移，不以讀到舊 Drive 為前提 |
| ID 因日文事實修正改變 | `[原始碼確認]` hash 輸入為日文名稱＋版本／LV／型別 | 中高；P3 與未來攻略更新前 | 搬移先凍結 ID，修正提供舊新映射與數量對照，不重排／重新推定 ID |
| 新 base path／離線錯版 | `[待測試]` 相對資源有利搬移，但新 URL／SW 未測 | 中；P2/P5 前 | 測直接開啟與重整、必要資源完整性、SW 升級與離線；失敗不發布 |
| 發布未驗證資料／回復只還程式 | `[原始碼確認]` workflow 直接發布 dist，無測試 job；無遠端歷史復原 UI | 高；P1 部署設計及 P5/P6 | 新站加必要模組與資料檢查；切換前後分別保護資料，回復計畫包含新站期間進度 |

## 10. 最小搬移方案與 P1 前待確認事項

### 10.1 後續建議範圍（僅規劃，未執行）

| 階段 | 最小檔案範圍與建議 | 安全／驗收閘門 |
| --- | --- | --- |
| P1 | 在新 repo 建最小 Portal、入口與 `.github/workflows/`，補已要求的架構／模組／遷移／驗收文件；Portal 原始碼位置可為 `portal/`，Pages artifact 根必須對應 `/game-companion/` | 只發布通過檢查的 Portal；不連帶複製舊 workflow 的「直接上傳根 dist」假設，不建立中央同步 |
| P2 | 固定上述 SHA，把舊 `dist/` **內容**帶到 `games/edf-wb/`，保留 HTML/CSS/JS 與內部 shared 結構、載入順序；不匯入舊 `.git` 歷史。沒有編譯需求，無需先改框架 | 路徑修改依實際驗證最小化；不能讓原 Key／Drive 設定的副本在正式共用 origin 操作 |
| P2 的必要基線來源 | 保留對應 `data/*.json`、`scripts/build-data.mjs`、`verify.mjs`、README／資料核對文件的遊戲內副本，或在後續模組契約選定的位置保留；避免只搬生成檔而失去可維護來源 | 若放遊戲內，產生器相對 `../dist/`、verify 的 `dist/` 與 server 根路徑需依新布局調整；P0 不先建立這些目錄／工具 |
| P2 安全前置涉及的原檔 | 新副本 `app.js` 的 KEY/SNAP/META/damaged、`cloud-sync.js` 的 storage listener、`cloud-config.js` 的 project/file 識別、`sw.js` 的 cache namespace／cleanup | 這些跨到 P3/P4 邊界，須在下列決策中選擇提前做最小隔離，或限制 P2 僅在隔離來源測試；不能默默原樣公開 |
| P3（待該階段核准） | 定義新本機 namespace／遊戲識別、獨立備份、無損匯入與差異預覽；保留舊 raw/envelope 輸入相容與原始來源備份 | 舊、新進度皆有備份；空／非空目標、取消／筆記／未知 ID/欄位無未解釋差異；不能以現有 OR merge 取代首次遷移設計 |
| P4（待該階段核准） | 保留可重用 adapter 分層，補手動策略、Base/Local/Remote、衝突、同步中編輯、帳號及競爭保護，獨立 Drive 識別 | 真實雲端操作另需明確批准；先用獨立測試來源，不以正式備份測試 |
| P5/P6（另行核准） | 回歸、Go/No-Go、最終匯入與正式切換 | 切換前舊站仍為主來源；程式與資料都有復原方案，不提前封存或轉址 |

P1/P2 **不必先改**清單內容、翻譯、項目 ID、搜尋／篩選／關卡演算法、CSS 風格，亦不應抽平台共用同步 SDK。OAuth Client 是否重用需設定核對，不因新路徑自動換 Client。部署先採完整靜態 artifact，不把不同遊戲資料或同步狀態合併。

禁止修改／操作範圍：整個舊 `edfwb-checklist` repo、舊站 localStorage 與 Cache Storage、真實 Google Drive 備份及其 file ID、舊 Pages 設定／入口、舊 Git 歷史與 repo 封存狀態。P0 不建立 Portal、模組程式或未來階段的實作檔。

### 10.2 請在進入 P1 前確認

1. **來源版本：** 是否以已部署的 `766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2` 作後續搬移基準；正式切換前仍要重新核對來源與最新玩家進度。
2. **P2 公開範圍與隔離時點：** 建議 P1 先只有 Portal；P2 模組先在獨立 localhost origin（不同埠）、停用任何真實 Google 連接下驗證，待 P3/P4 隔離完成才公開可操作模組。若要求 P2 即在正式新 URL 完整測試，必須核准將最小 localStorage／cache／Drive 識別隔離前置；這是階段邊界問題，不是原樣搬移就能安全解決。
3. **後續識別候選：** `gameId: edf-wb`、新 namespace 例如 `game-companion.edf-wb.*`、Drive 檔名依規格候選 `game-companion.edf-wb.progress.v1.json`，另定獨立 projectId／envelope game/schema/revision；目前全是提案，沒有生效。
4. **首次遷移途徑：** 建議以舊站 JSON 匯出／新站預覽匯入為主要可回復途徑；同 origin 偵測舊 Key 可作輔助唯讀入口，不能默默匯入／覆寫或搬 OAuth 狀態。
5. **同步差距處理：** 新規格的手動同步、三方合併、衝突選擇、還原分離與競爭驗證保留為 P4 必做；既有 LWW 不是通過驗收。Client/origin/appDataFolder 設定及獨立測試來源待 P4 前核對；正式寫入仍需額外批准。

目前沒有證據支持正式切換的 Go。上述待測試事項可在獲准的後續階段處理，不要求為完成 P0 操作正式資料。**本報告交付後停止，等待使用者確認，才可開始 P1。**

## 固定版本證據索引

以下 GitHub 連結固定到實際盤點 SHA，可在工作區之外核對檔案與行號；正文的來源相對路徑均指這個版本。

| 證據 | 連結 |
| --- | --- |
| 入口／UI | [dist/index.html](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/dist/index.html) |
| 本機資料與功能 | [dist/app.js](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/dist/app.js) |
| 雲端策略 | [dist/cloud-sync.js](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/dist/cloud-sync.js) |
| 公開設定 | [dist/cloud-config.js](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/dist/cloud-config.js) |
| OAuth | [shared/google-auth.js](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/dist/shared/google-auth.js) |
| Drive | [shared/drive-appdata.js](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/dist/shared/drive-appdata.js) |
| Envelope | [shared/progress-envelope.js](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/dist/shared/progress-envelope.js) |
| 快取 | [dist/sw.js](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/dist/sw.js) |
| 產生器／ID | [scripts/build-data.mjs](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/scripts/build-data.mjs) |
| 驗證 | [verify.mjs](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/verify.mjs) |
| 部署 | [.github/workflows/deploy.yml](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/.github/workflows/deploy.yml) |
| 歷史驗證與資料限制 | [README.md](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/README.md)、[docs/data-review.md](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/docs/data-review.md)、[docs/reference-translations.md](https://github.com/promise82114/edfwb-checklist/blob/766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2/docs/reference-translations.md) |
