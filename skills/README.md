# Game Companion 功能 skill 目錄

用途：專案內部開發紀錄，供後續維護與新增模組參考；不加入網站或主要 README 的閱覽入口。

盤點日期：2026-11-08。涵蓋本次指定六個遊戲的本機實作；功能現況見[六款遊戲對照](references/game-inventory.md)。新增頁面時按需求選用，每個 skill 提供來源位置、接入步驟、驗證與限制。本次只整理文件，沒有抽取程式或修改現有功能。

## 從需求選擇 skill

| 新頁面需要什麼 | Skill | 建議參考 |
| --- | --- | --- |
| 建立模組、Portal 註冊、功能導覽與工具列 | [gc-add-game](gc-add-game/SKILL.md) | 模組契約、build、Mycopunk 導覽 |
| 清單搜尋／篩選、DLC 可見性、關卡補收／收藏／筆記 | [gc-checklist](gc-checklist/SKILL.md) | EDF 兩作、Mycopunk、Grounded |
| 章節攻略、下一步、完成收合、分歧／不可逆提醒 | [gc-roadmap](gc-roadmap/SKILL.md) | Talos II、Thank Goodness、Grounded |
| 獎盃獨立核取、跨章 tracker、去重計數、人工矩陣 | [gc-trophy-trackers](gc-trophy-trackers/SKILL.md) | 三款 Roadmap |
| 本機進度、跨分頁、周目與版本／損壞保護 | [gc-progress-storage](gc-progress-storage/SKILL.md) | 共用交易 store、各模組 model |
| JSON 備份、差異匯入、復原與保護式初始化 | [gc-backup-import](gc-backup-import/SKILL.md) | Thank Goodness、Mycopunk、EDF migration |
| 模組自己的手動 Google Drive 同步 | [gc-drive-sync](gc-drive-sync/SKILL.md) | EDF adapter、Talos 非同步 store |
| 地圖定位、清單連動、逐題解法與劇透控制 | [gc-maps-solutions](gc-maps-solutions/SKILL.md) | Talos II、Grounded、Hidden Paths |
| 配裝推薦、六角格排放、Worker 求解與配置匯出 | [gc-build-planner](gc-build-planner/SKILL.md) | Mycopunk |
| 中外文名稱、來源／查證狀態、角色辨識圖 | [gc-content-research](gc-content-research/SKILL.md) | EDF 產生器、各遊戲查證紀錄 |
| 模組限定 Service Worker 與離線更新 | [gc-offline-cache](gc-offline-cache/SKILL.md) | EDF 兩作、Thank Goodness |
| 資料、產物、隔離瀏覽器與合成同步回歸 | [gc-module-validation](gc-module-validation/SKILL.md) | 根 scripts、各模組 verify |

## 使用方式

可以將以下需求交給後續開發工作：

> 請依 `skills/gc-add-game/SKILL.md` 新增遊戲模組，並參考 `gc-roadmap`、`gc-progress-storage`、`gc-backup-import` 接入章節攻略、本機進度與備份。先讀所選 skill 指向的實作與限制，依新遊戲定義資料及 namespace。

這些 skills 隨 repo 維護；本次未安裝到使用者全域技能目錄，可直接指定上述檔案路徑讀取。每個 skill 先讀必要契約，再只讀本次功能需要的來源。

## 共用參考

- [專案接入契約](references/project-contract.md)：來源選擇、隔離與資料保護。
- [六款遊戲功能與來源對照](references/game-inventory.md)：專屬功能、尚未接入及歷史設計。
- [驗證命令與證據範圍](references/verification.md)：cwd、環境變數、測試入口與限制。

## 維護

功能路徑、儲存契約或行為改變時，更新對應 skill 與功能對照。來源連結搭配可搜尋的函式名稱，避免固定行號失效。以目前程式、manifest 及最新模組說明交叉確認；舊 README、`upstream/`、歷史發布授權與報告不能視為新功能已驗收或本次已獲發布授權。
