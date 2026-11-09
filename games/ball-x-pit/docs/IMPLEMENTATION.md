# BALL x PIT 本機實作與驗證紀錄

日期：2026-11-09。模組 1.0.0、schema 1、資料 2026-11-09.1。2026-11-10 依授權將實作、資料與驗證文件整理為獨立提交，沿 main 的 GitHub Pages 流程發布。

## 盤點與技術取捨

開工已讀 `G:\git\AGENTS.md`、repo `AGENTS.md`、README、架構、模組契約及完整根規格；目標模組原先不存在，slug 沒有衝突。開工 Git 沒有 tracked／staged diff，僅四份既有未追蹤文件：`TALOS2_UX_AUDIT_TASK.md`、`a-space-for-the-unbound_GAME_COMPANION_SPEC.md`、`ball-x-pit_GAME_COMPANION_SPEC.md`、`docs/CHATGPT_PROJECT_INSTRUCTIONS.md`。工作期間另有並行工作新增其他遊戲／共用驗證行，全部保留，沒有替它們還原或提交。

沿用原生 HTML／CSS／ES modules、JSON、現有 root build／verify、Portal registry、Playwright／Edge，不換框架、不加產品或測試套件。盤點 Grounded／IRON RAIN／Talos 的 store／匯入後，使用根 `shared/roadmap-store.js` 及 Talos 既有純合併 core；不載入其同步 session、OAuth 或 adapter。來源直開模組 `dist/` 與發布 artifact 的相對路徑分開解析。

規格沒有強制使用 localStorage，且既有 repo 已有非同步交易 store，因此採獨立 IndexedDB，以防跨分頁覆蓋。修正共用 store 的 `driveProjectId` 缺省判斷，避免兩個 `undefined` 誤把純本機資料當雲端封裝；新 optional `exportSyncState:false` 讓本模組完整匯出不讀 localStorage，原模組預設行為不變。合成模型及瀏覽器測試涵蓋此差異。

設計採 `sites` 本機流程及 `design-taste-frontend` 應用介面檢查。抽到的稀疏問候式版型不適合密集矩陣，因此沿用 repo 的側欄、桌面內距及系統字體，不加入遠端字型。以真實的八層清單與矩陣表現產品特徵；中性色介面、綠色只用進度，無裝飾性圖表。基地示意是功能發展順序，不是地形或虛構座標。

## 資料與來源

規格內 64 獎盃、8 關、16 本體及6更新角色完整保留，沒有縮成樣本。`research/catalog-supplement.json` 是逐筆名稱／配方／建築事實整理；`research/character-advice.json` 是角色機制與明示推論的配裝方向。

| 類型 | 本體 | Regal | Shadow | Naturalist | 合計 |
| --- | ---: | ---: | ---: | ---: | ---: |
| 戰球 | 60 | 8 | 11 | 11 | 90 |
| Passive | 59 | 3 | 4 | 5 | 71 |
| 已收錄球／Passive 圖鑑 | 119 | 11 | 15 | 16 | 161 |

配方86組（69球進化、17被動進化），所有材料 ID 都有資料、依賴無循環。建築索引84筆包含6種資源地塊，故一般建築分母78；地塊另列，不當一般藍圖勾選。22角色各有配裝方向，5條一般技巧；均不冒充實測最佳配置。

主要來源：[Wiki Balls](https://ballxpit.wiki.gg/wiki/Balls)、[Passives](https://ballxpit.wiki.gg/wiki/Passives)、[Buildings](https://ballxpit.wiki.gg/wiki/Buildings)、[Characters](https://ballxpit.wiki.gg/wiki/Characters)、[Levels](https://ballxpit.wiki.gg/wiki/Levels)、[Game Updates](https://ballxpit.wiki.gg/wiki/Game_Updates)。直接開頁403，本次資料是搜尋索引核對，`sourceRefs.access=search_index`；未繞過存取限制，也未宣稱讀取完整內頁。

六名更新角色另核對已讀官方 [Regal](https://blog.playstation.com/2026/01/26/ball-x-pit-the-regal-update-launches-today/)、[Shadow](https://blog.playstation.com/2026/04/20/ball-x-pit-shadow-update-arrives-april-27/)、[Naturalist](https://blog.playstation.com/2026/07/28/ball-x-pit-final-update-the-naturalist-arrives-august-6/) 公告；本體配方歸屬另讀 [Stevivor 球進化](https://stevivor.com/guides/ball-x-pit-ball-evolutions-guide-all-ball-combinations/)與[被動進化](https://stevivor.com/guides/ball-x-pit-passive-evolutions-guide-all-passive-combinations/)交叉核對。

規格的 Regal 配方列錯指 Naturalist 的 S8；實際改用 Game Updates／Balls 索引。Glacier、Sandstorm 等保留本體歸屬，更新只增加材料分支，不把產物誤搬到更新分母。Gear 僅能開放緊接下一層，不能把早期 Gear 當全域池。FUNGAL 排第四、GORY 第五，保留 Pit Lift 順序。

`Tormenters Mask`／`Tormentor’s Mask` 拼法衝突逐筆保留。Odiferous Shell 材料採 Wiki 的 Wretched Onion，與另一指南名稱不同，仍待實機核對。其他待查內容於畫面／資料來源頁明列，沒有填造成本或遊戲總量。

## 驗證

資料／整站檢查已實際通過：

- `node games/ball-x-pit/verify.mjs`：來源產物可重現、唯一ID、來源引用、材料完整與無循環、本體更新分組、64盃與128格、未知資料／錯誤版本、純本機及雲端封裝的共用store相容性。
- `node scripts/verify.mjs`：所有目前註冊模組必要資料／邏輯檢查通過。
- `node scripts/build.mjs`、`node scripts/verify-site.mjs`：完整10模組產物、658檔案、162本機連結通過；數字包含本次以外的並行新增模組，不表示本任務驗收其實機功能。
- `git diff --check`：通過。README／架構出現CRLF轉LF提示，沒有空白錯誤。
- design source lint：3檔、0 FAIL／0 WARN。
- 實際介面 inspector：1440／768／390三種寬度，0 FAIL／0 WARN；已人工檢視桌面、平板與手機截圖。修正平板邊距及總覽首層攻略位置。

專屬隔離瀏覽器已通過矩陣保存／取消、10名不同角色提示、PSN獎盃獨立、章節收合回看、藍圖與建造分離、86配方遞迴／分支、161圖鑑／119本體不推算Scholar、跨分頁交易、JSON解析前存原文、未知資料新context還原、下載失敗／quota／過期預覽停止、localStorage封鎖時仍可用IndexedDB及匯出、未來schema拒絕與損壞原文匯出、九頁×1440／768／390／320寬度、手機鍵盤及導覽。無pageerror、無外部請求、無SW／cache，其他遊戲合成儲存標記保持不變。

最後針對空備份不刪本機／未知紀錄，以及22角色配裝直達矩陣，再跑同一完整隔離回歸，亦全部通過。測試限定合成資料與全新 browser context；截圖／測試 artifact 位於 ignored `outputs/ball-x-pit/`。

沙箱內Edge啟動與迴路連線受限，經工具自動核可後改以沙箱外的全新臨時Edge測試，沒有關閉安全保護或使用現有profile。另因其他工作可能重建`_site`，使用ignored資料夾內固定副本（僅本模組及既有shared store／merge core）、127.0.0.1:4193驗證，不覆蓋其他工作。標準本機入口仍是root server的4190；測試伺服器在驗證後停止。

### 2026-11-10 發布前驗證

從 `main` 的 `60e89b7` 建立隔離工作樹，加入本模組、資料來源、共用儲存相容性修正與必要的 Portal／驗證接入。這份候選樹的 `verify.mjs`、`verify-sync.mjs`、`build.mjs` 與 `verify-site.mjs` 皆通過。產物涵蓋 8 個模組、646 個檔案與 144 個本機連結。

`verify-ball-x-pit-browser.mjs` 與 `verify-browser.mjs` 使用同一份產物及全新 Edge context 通過。前者涵蓋九頁、四種寬度、跨分頁及備份匯入。後者涵蓋 Portal 搜尋、Roadmap 分類、EDF 舊模組與同源資料隔離。發布結果見對應提交的 [GitHub Actions](https://github.com/promise82114/game-companion/actions/workflows/deploy.yml)。

## 待人工／實機／外部核對

- PS5 實際跳盃、更新角色是否計入 Conquered、War Room 自動通關、NG+ 例外。
- Encyclopedia 的其他類型（包含敵人）及真正本體總量；119筆球／Passive全勾不推導 Scholar。
- 建築成本／等級倍率、角色精確技能數值、Boss／敵群策略與完整 Gear 門檻。
- Wiki 完整內頁與上述名稱差異、Sword Breaker／Platinum Dumbbell 解鎖關卡。
- 22條配裝方向、基地配置及操作技巧在PS5的效果。示意沒有真實地形／格位，也沒有預填玩家進度。
- 真實 PSN、玩家存檔或正式備份仍待驗收。
