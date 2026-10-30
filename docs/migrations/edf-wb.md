# EDF WB 搬移來源

- 舊 repo：[promise82114/edfwb-checklist](https://github.com/promise82114/edfwb-checklist)
- 分支／完整 SHA：`main`／`766e4ba5fa1535ac78bc0559cba57c8c3bb6b7b2`。
- P0 已確認此 SHA 的成功 Pages 部署；本次搬入的逐檔原始 hash 見 `games/edf-wb/source-manifest.json`。
- 舊站：`https://promise82114.github.io/edfwb-checklist/`；新路徑：`/game-companion/games/edf-wb/`。
- 864 項：455 武器、209 角色版本、200 配件；71 關、18 推薦。攻略、翻譯、ID、CSS 未修改。

| 用途 | 舊識別 | 新識別 |
| --- | --- | --- |
| 主進度 | edfwb-progress-v1 | game-companion.edf-wb.progress.v1 |
| 快照 | edfwb-snapshots-v1 | game-companion.edf-wb.snapshots.v1 |
| 備份時間 | edfwb-backup-time | game-companion.edf-wb.backup-time |
| 原文備份 | 無 | game-companion.edf-wb.import.{uuid} |
| SW cache | edfwb-field-log-v3 | game-companion.edf-wb.assets.v1 |
| Drive projectId | edfwb-checklist | game-companion.edf-wb |
| Drive 檔名 | edfwb-checklist.json | game-companion.edf-wb.progress.v1.json |

`app: edfwb-collection`、`schema:1` 相容保留，另加 `gameId:edf-wb`、moduleVersion、revision。舊 raw／舊 envelope 只經明確選檔匯入；Google 讀取只接受新 projectId。沒有讀舊 Key 或讀／寫舊 Drive。

變更：新增遷移預覽／備份保護、保存未知資料、更換 namespace 與 cache scope、新 Drive 讀取介面及 adapter 寫入封鎖；原自動雲端 adapter 保留於 upstream 不發布。完整同步尚未完成，不能稱雲端遷移驗收通過。

資料產生器與 `data/*.json` 完整保留；在模組根執行 `node scripts/build-data.mjs` 會重寫攻略產物，僅在有授權的資料維護時使用。本次沒有重產、改翻譯或重算 ID。驗證 `verify.mjs` 只調整新備份檔名斷言。
