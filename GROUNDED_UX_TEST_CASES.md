# Grounded 白金玩家情境測試

日期：2026-11-08。測試範圍：本機 1.1.2；新 Edge context、合成資料、阻擋外部請求。遊戲條件參考來源不等於實際 PS5 跳盃。測試實作沿用 `scripts/verify-grounded-browser.mjs`，沒有新測試框架。

## 操作、預期與驗收限制

| 情境 | 操作與預期 | P0 實際 | 修正後結果 |
|---|---|---|---|
| T01 首次 0/46 | 開總覽→第一步；0/46、三步全文、七章直達；讀取不修改進度，存檔資格提醒先出現 | 操作通過，缺資格提醒 | 網站測試通過 |
| T02 完成 Hedge/Haze | 只勾實驗室目標；不代填 PSN 或文件。相關收集與獎盃全完成才收斂，取消即還原 | 狀態隔離通過，Haze 未列相關文件 | 網站測試通過 |
| T03 缺一份已列 Ominent | 搜尋 Ominent→Recon Journal: Special Forces→待確認→示意圖→Haze 攻略；三處同 ID、狀態同步，地下文字可讀 | Ominent 0 筆，泛位置，無攻略反查 | 網站測試通過；非逐房精準導航 |
| T04 缺一份未列 Ominent | 搜尋 Recon Journal: Entomologist；顯示未收錄限制，不說已全收齊 | 0 筆空結果，需外部查找 | 全量查漏仍未通過；不補未查證項目 |
| T05 Report Card 99% | 合成全庫已取得、13 條件手勾，留一份 unknown；查漏包含 unknown；全勾不代填 Super Win | 有人工矩陣但無查漏入口 | 網站測試通過；遊戲全量對照仍未通過 |
| T06 蟻后／蜂箱前 | 在 Boss 章事前看到友好三蟻后、Baby Ant、PS5 版本限制；開蜂箱的環境改變與存檔提醒可見 | 只有籠統選擇提醒 | 網站測試通過；遊戲選擇與補跳未實機驗證 |
| T07 REMIX.R 前 | 看四前置的人工狀態、第一輪條件與 43 個非 NG+/非白金盃缺漏；先備份再確認；備份後別頁新編輯應阻擋 | 備份機制存在，未列第一輪明細 | 網站測試通過 |
| T08 NG+1 切換／保存 | 建立 NG+1→乳牙記 3→回第一輪→回 NG+1；base 步驟、條件、收集不被改寫，繼承類別沿用同世界紀錄 | 周目隔離通過；摘要仍 0/6 第一輪乳牙 | 網站測試通過 |
| T09 A 已打 Boss、B 未跳盃 | 合成 A trophy=true＋世界目標 done；切合成 B；B trophy=false，世界完成不等於所有玩家 PSN | 模型隔離通過；無多人管理 UI | 網站測試通過；不新增已移除的成員操作 |
| T10 白金收尾 | 合成 45 個實際已手動確認 trophy，白金保持未確認；UI 勾最後一盃成 46/46，不自動完成 NG+ 世界步驟 | 46 項存在，沒有自動授盃 | 網站測試通過；不是主機實測 |
| T11 匯出／重複匯入／錯誤 | 合成舊 1.0.0、未知欄位、歷史筆記／標記；保護式匯入兩次，worlds 不變；壞 JSON、錯遊戲、較新 schema、quota、下載失敗、過期預覽停寫 | 既有安全案例通過 | 網站測試通過 |
| T12 桌面／手機／跨頁 | 七頁×1440/768/390/320，零整頁橫向溢出；手機導覽關閉、鍵盤縮放／平移、雙頁競爭寫入保留雙端、收合焦點／捲動保留 | 通過 | 網站測試通過 |

所有完成／未知／未完成狀態均來自人工記錄。未實際在 PS5 取得全部 46 盃、沒有執行遊戲 REMIX.R、沒有將網站 JSON 當作 PS5 備份。

## 重現指令

```powershell
node games/grounded/verify.mjs
node scripts/verify.mjs
node scripts/verify-sync.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
$env:PORT='4193'; node server.mjs
# 另一個終端，沿用本機安裝的 Playwright 與新 Edge context
$env:TEST_BASE_URL='http://127.0.0.1:4193/game-companion/'
node scripts/verify-grounded-browser.mjs
```

P0 補充重現：忽略目錄 `outputs/grounded-audit/baseline.mjs`、`baseline.json`；基準／修正後 Roadmap 截圖與 inspector report 在 `outputs/grounded-audit/before/`、`after/`。其他情境截圖在 `outputs/grounded/audit-*.png`。這些是合成資料，非正式備份。

## 最終結果

最後一次完整 `verify-grounded-browser.mjs` exit 0。T01–T03、T05–T12 的網站可測範圍通過；T04 全量資料缺漏保留未通過，T03/T05/T06/T10 的主機／精確路線限制不因此解除。

新增查漏跳轉測試會等待第一個核對框完全位於視窗內；原置中定位曾使 y=-99，修正後 y=157。頁面定位與截圖等待兩次 frame；前後 Roadmap 三寬 inspector 0 FAIL／0 WARN，來源 lint 保留既有章節序號 1 WARN。
