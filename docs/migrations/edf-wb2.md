# EDF WB2 搬移來源

- 舊 repo：[promise82114/edfwb2-checklist](https://github.com/promise82114/edfwb2-checklist)
- 分支／完整 SHA：`main`／`c49be804b91ce463bfb833b791edf468a80792dd`；本機 clean，與本次 ls-remote HEAD 相同。
- 原始逐檔 hash 見 `games/edf-wb2/source-manifest.json`。本次未查證舊 WB2 的最新 Pages 部署 SHA，不能只由 main 推定部署。
- 舊站：`https://promise82114.github.io/edfwb2-checklist/`；新路徑：`/game-companion/games/edf-wb2/`。
- 1,208 項：688 武器、313 角色版本、207 配件；120 關、36 推薦。預設本篇武器 515、角色 295；可見清單仍排除來源設定的 3 個獨立特典武器，原 ID／資料保留。

| 用途 | 舊識別 | 新識別 |
| --- | --- | --- |
| 主進度 | edfwb2-progress-v1 | game-companion.edf-wb2.progress.v1 |
| 快照 | edfwb2-snapshots-v1 | game-companion.edf-wb2.snapshots.v1 |
| 備份時間 | edfwb2-backup-time | game-companion.edf-wb2.backup-time |
| 原文備份 | 無 | game-companion.edf-wb2.import.{uuid} |
| SW cache | edfwb2-field-log-v23 | game-companion.edf-wb2.assets.v1 |
| Drive projectId | edfwb2-checklist | game-companion.edf-wb2 |
| Drive 檔名 | edfwb2-checklist.json | game-companion.edf-wb2.progress.v1.json |

`app:edfwb2-collection`、`schema:1` 相容保留，另加 `gameId:edf-wb2`、moduleVersion、revision。所有攻略 JS、翻譯、角色資格、取得來源與 CSS 保持來源內容，沒有重算 ID。

來源 repo 沒有 WB1 那樣的 `data/` 原始 JSON／完整重產腳本；它以 `dist/*.js` 維護資料，另有 `normalize-data.mjs`、`inspect_data.py` 及來源核對文件，均已搬入。`inspect_data.py` 會連外查 Wiki 且依賴 lxml，normalize 會寫 data；本次未執行，不能宣稱可從原始 Wiki 一鍵重建全部資料。

變更與 WB1 相同的隔離／無損匯入保護；二代專屬 UI 功能保留。驗證工具調整新測試 URL、Key、Playwright 環境起點及匯入確認操作；舊自動寫入 mock suite 放在 `upstream/verify-cloud.mjs`，當前 `verify-cloud.mjs` 驗證底層寫入封鎖。這不等於舊雲端同步 suite 已在新策略通過。
