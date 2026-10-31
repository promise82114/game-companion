# Mycopunk 搬移與儲存契約

日期：2026-10-31；模組 1.0.0；收集 schema 1。來源為 main／`b708d9889fa08e642d496c5e1c67aa59bef45a75`，原 repo 唯讀且不切換舊站。原始來源、署名、適用版本與研究限制見模組根的 SOURCE_README、research 及 source-manifest。

| 來源 | 新位置／處理 |
| --- | --- |
| `prototype/` | `dist/`；完整靜態頁面、ES modules、JSON、圖片與 Worker |
| `scripts/`、兩個研究工具的 prototype 路徑 | 改為 dist；不重抓資料或執行連外研究 |
| README | SOURCE_README 原文保留，另寫目前模組 README |
| Excel、localization、research | 模組內保留供離線驗證／維護；不部署 |
| `.git`、`.github`、未追蹤檔與輸出 | 不搬入 |

來源所有 hash 以搬入前內容計算；不得把適配後 hash 回填成來源基準。534 個不需適配的來源檔由 verify 強制核對，包括攻略 JSON、CSS、圖示、SVG 繪圖及求解器。

| 新 namespace Key／前綴 | 用途 |
| --- | --- |
| `game-companion.mycopunk.progress.v1` | 主要收集資料；appId 仍為 mycopunk-checklist，新增 gameId／moduleVersion／revision |
| `game-companion.mycopunk.before-import.v1` | 最近一次套用前的原始文字與對應 archive Key |
| `game-companion.mycopunk.import.{uuid}` | 每次有效預覽的來源原文、本機原文；記憶體狀態不同時另保留其文字 |
| `game-companion.mycopunk.backup-time` | 成功送出備份下載的時間，不代表能自動確認使用者已保存檔案 |
| `game-companion.mycopunk.corrupt.v1` | 首份無法讀取的主存檔原文；主 Key 本身也保留、不覆寫 |
| `game-companion.mycopunk.snapshots.` | 預留，原模組沒有快照功能 |
| `game-companion.mycopunk.assets.` | 預留，原模組沒有 SW 或 Cache Storage |

舊站 `mycopunk-checklist:collection:v1`／`mycopunk-checklist:before-import:v1` 不讀寫。遷移只接受使用者選檔；顯示完整記錄差異，下載包含兩端原文的復原備份並明確確認後套用。來源未提供的記錄不刪除，明確選用 false 可取消取得；未知欄位、未對應 ID、追蹤與舊筆記保留。頂層欄位碰撞以本機為準，兩端碰撞原文仍可由備份回復。

預覽比對本機原文與合併後記憶體狀態；有新變更便停止，不在確認時偷偷重新合併。原文紀錄遺失、下載或存檔失敗也停止。沿用瀏覽器 localStorage，沒有跨分頁原子交易保證；一般同時編輯仍依原有每筆時間處理，不是雲端三方同步。

一般收集備份會附原文 archives；匯入前下載另附本次 recoveryBundle。歷史資料占空間，不自動刪除；10 MiB 上限或未知格式不支援時明確拒絕，保留原始檔供回復。損壞資料只有通過同一個匯入備份流程後才會替換。

驗證入口：平台 `scripts/verify.mjs`、`scripts/verify-site.mjs`；模組 `verify.mjs`、`scripts/validate_site.mjs`；瀏覽器 `scripts/verify-mycopunk-browser.mjs`（從平台根執行）。只使用新 context 與合成資料；沒有操作正式備份、真實 Google 或現有瀏覽器 profile。
