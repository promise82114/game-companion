---
name: gc-module-validation
description: 為 Game Companion 新增頁面或接入功能選擇並擴充既有資料、產物、隔離瀏覽器與合成同步驗證，明確區分測試覆蓋及正式 Google／PS5 驗收。
---

# 模組驗證與交付

先讀[專案契約](../references/project-contract.md)。具體命令、工作目錄、URL／runtime 設定及各套件範圍集中在[驗證參考](../references/verification.md)，依本次變更選用，不以多跑無關測試代替覆蓋缺口。

## 現有實作位置

- [scripts/verify.mjs](../../scripts/verify.mjs)：根必要模組資料檢查，含 EDF validator／來源不變條件並呼叫其他模組 verify。
- [scripts/build.mjs](../../scripts/build.mjs)、[verify-site.mjs](../../scripts/verify-site.mjs)：registry／靜態產物／本機連結／隔離與資源檢查。
- [browser-runtime.mjs](../../scripts/browser-runtime.mjs)：既有 Playwright require 與瀏覽器配置；[server.mjs](../../server.mjs) 以 `/game-companion/` 提供 `_site`。
- [verify-browser.mjs](../../scripts/verify-browser.mjs)：Portal、外框及 EDF／同來源隔離；[verify-upstream.mjs](../../scripts/verify-upstream.mjs) 啟動本 repo WB2 細項測試。
- [Mycopunk](../../scripts/verify-mycopunk-browser.mjs)、[Talos](../../scripts/verify-talos2-browser.mjs)、[Talos navigation](../../scripts/verify-talos2-navigation-browser.mjs)、[Thank Goodness](../../scripts/verify-thank-goodness-browser.mjs)、[Grounded](../../scripts/verify-grounded-browser.mjs)：各自隔離瀏覽器驗證。
- [fixtures/drive.mjs](../../scripts/fixtures/drive.mjs)、[verify-sync.mjs](../../scripts/verify-sync.mjs)、[verify-sync-browser.mjs](../../scripts/verify-sync-browser.mjs)、[verify-cloud-guard.mjs](../../scripts/verify-cloud-guard.mjs)：合成同步及閘門；[workflow](../../.github/workflows/deploy.yml) 為必要檢查／發布流程。

## 接入步驟

1. 先看 git status／diff／cached diff 及未追蹤檔，辨識其他工作。列出本次功能的資料產生端、使用端、儲存、build、SW／Worker 與外部服務，選能驗證其行為的現有入口。
2. 新模組提供自己的資料／行為斷言，接入根 verify 及必要 artifact 檢查，視 workflow 現況補必要步驟。build 自動列 manifest 不代表該模組已有完整測試。
3. 優先延伸既有 Node assert／fixture／Playwright，不新增永久框架。只驗證行為與資料不變條件，避免把產生文字或實作細節照抄成斷言。
4. 用合成資料、新 context 及自己的本機測試網址。不同裝置用不同 context；同裝置跨分頁用同 context 的兩頁。存入其他遊戲及舊站 sentinel 後驗證目標操作不改它們，不使用正式 profile／storageState。
5. 根 verify 通過再 build／verify-site，檢查自己的遊戲路徑、共用資源、相對連結及來源檔不發布。避免其他工作同時重建 `_site/`；需要隔離快照時保留其相依與相同 base path。
6. 以明確 TEST_BASE_URL 跑相應瀏覽器套件，檢查空／錯誤狀態、重整、鍵盤／手機、焦點／捲動、跨視圖及跨分頁。需要 SW 時使用允許 SW 的 context；需要 Drive 時使用攔截 OAuth／Drive 的 fixture，另外測本模型的非同步適配。
7. 只改文件／skill 時，檢查格式、相對連結、命令入口、敘述與現行實作一致及 diff；不需為此重建網站或重跑全部遊戲瀏覽器。

## 驗證方式

依功能組合選測：清單檢查分母／可見性／取消；Roadmap 檢查完成／部分／回看／舊狀態；儲存測競爭／未知／損壞；匯入測復原／過期／備份失敗；地圖測定位不寫完成；配裝測幾何／預算／Worker 過期；Drive 測條件能力／帳號隔離／rebase；SW 測更新／離線／cache sentinel。

新 UI 至少涵蓋桌面、平板、390px／320px及鍵盤，必要時查看實際截圖。詳細案例由對應功能 skill 提供。測試輸出沿用忽略的 `outputs/`；成功後若無新變更或未解疑慮，完成交付，不重複無關檢查。

## 交付與限制

回報變更、實際命令／結果、未測部分與限制。靜態檢查、產物、瀏覽器、mock Drive、真實 Google、PS5 是不同證據；自動測試不能宣稱真實 Google／遊戲內跳盃已驗收。既有授權不自動適用本次 commit／push／部署；依使用者本次明確指示處理。
