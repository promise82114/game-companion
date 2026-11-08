---
name: gc-add-game
description: 在 Game Companion 新增獨立遊戲頁面，接入 module.json、Portal、功能導覽與發布驗證；適用於新遊戲模組或既有工具搬入本 repo。
---

# 新增獨立遊戲頁面

先讀[專案契約](../references/project-contract.md)。本 skill 負責模組邊界、入口與導覽；儲存、攻略、匯入、同步依實際需求選用[總目錄](../README.md)中的對應 skill。

## 現有實作位置

- [MODULE_CONTRACT](../../docs/MODULE_CONTRACT.md)、[骨架說明](../../templates/game-module/README.md)、[manifest 範例](../../templates/game-module/module.json.example)：必要欄位與目錄契約。
- [scripts/build.mjs](../../scripts/build.mjs)：遍歷 `games/*/module.json`、複製 dist、產生遊戲卡；`presentation` 保存工具類型及功能摘要，封面路徑由 slug 產生。
- [portal/index.html](../../portal/index.html)、[catalogue.js](../../portal/catalogue.js)、[portal.css](../../portal/portal.css)、[封面目錄](../../portal/covers)：入口搜尋／類型篩選與外觀。
- [Mycopunk app](../../games/mycopunk/dist/app.js)：`readUrl`／`navigate`／`setupNavigation`，query 導覽及同一側欄節點移入手機 dialog；[companion-ui.css](../../games/mycopunk/dist/companion-ui.css) 對齊工具列／側欄。
- [Talos navigation](../../games/talos2/dist/roadmap/navigation.js)：章節與片段 URL；[Thank Goodness index](../../games/thank-goodness-youre-here/dist/index.html) 提供功能導覽及備份／Drive 工具入口。

## 接入步驟

1. 決定穩定 slug、遊戲／平台／本體或 DLC 範圍、頁面功能、資料來源與 ID 規則。讀最接近需求的模組 README，選擇自己的技術與資料模型。
2. 建立 `games/{slug}/module.json`、README、`dist/index.html`、功能資源及真正可執行的模組驗證。沿用 manifest 欄位，`publicPath` 為 `games/{slug}/`；未接同步時 `cloudWritesEnabled:false`。
3. 提供相對資源引用與返回 Portal 的 `../../`。需 JSON fetch、ES modules 或 Worker 時以 HTTP 預覽；不要承諾直接雙擊 HTML 可用。
4. 功能選單、章節、閱讀／搜尋條件與完成進度分開。右上資料工具依該模組已提供的備份／同步能力呈現；手機 dialog 保留焦點限制、Escape 與切回桌面行為。
5. registry 會自動列入口，但卡片 `presentation` 與 `portal/covers/{slug}.svg` 仍需補齊；沒有舊站就省略 `legacyUrl`，不產生假連結。
6. 檢查並擴充 [verify.mjs](../../scripts/verify.mjs)、[verify-site.mjs](../../scripts/verify-site.mjs) 及 [deploy workflow](../../.github/workflows/deploy.yml) 的必要模組檢查。依新模組實際功能延伸瀏覽器測試，不靠空白 index 通過驗收。

## 驗證方式

依[驗證命令](../references/verification.md)執行新模組資料檢查，再跑根 verify／build／verify-site。用新 context 檢查 Portal 搜尋／篩選、封面、入口、`../../` 返回、直接網址／重整與子路徑資源；測手機選單、鍵盤、Escape、空資料及錯誤狀態。確認 Portal 不讀寫玩家儲存，新模組不碰其他遊戲 sentinel。

## 限制

模組註冊不賦予儲存或雲端能力；不要從 EDF 複製 app 再整包改名當作 Roadmap。搬移來源 hash 留在原 manifest，原 repo 不修改。開發、驗證及發布分別依本次授權處理。
