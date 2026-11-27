# 十款模組中文優先調整 · 2026-11-27

使用者授權處理中文優先盤點第 1～10 款，統一中文主位與原文次要對照。使用者於本批完成後授權 commit／push；main push 會自動觸發既有 GitHub Pages 流程，發布結果以對應 Actions 為準。新增翻譯不是已逐項核對官方中文的證明。

## 適用範圍

| 模組 | 版本 | 本批處理 |
| --- | --- | --- |
| BALL x PIT | 1.1.0 | 八層、角色、建築、戰球、被動、配方、獎盃及攻略關鍵字 |
| IRON RAIN | 1.5.0 | 任務、獎盃名稱／條件、武器、道具、PA-Gear、難度與資源用詞 |
| 靠左一些些 | 1.2.0 | 五章、48 盃、乾淨首輪警告及操作關鍵字 |
| Talos II | 1.7.0 | 謎題、區域、收集物、人物、導引；既有獎盃與遺物中文改放主位 |
| Mycopunk | 1.1.0 | 既有中英文資料重排；導覽、裝備、升級、效果、配裝、隱藏路徑與推薦 |
| EDF World Brothers | 1.2.0 | 圖鑑、系列、取得角色、任務武器與救出目標的中日文順序 |
| EDF World Brothers 2 | 1.2.0 | 同上，保留既有翻譯查證標示 |
| Thank Goodness You're Here! | 1.5.0 | 既有獎盃中文改放主位，補人物、店名與地點參考譯名 |
| DQ III HD-2D Remake | 1.3.0 | 補區域／攻略零星用詞，原文對照預設開啟 |
| 人中之龍８ | 1.3.0 | 補零星職業、地點、獎盃用詞，支線原文降為小字 |

Grounded、無双OROCHI Z、Cat Quest II／III 不在本批修改範圍。

## 顯示與資料原則

- 中文名稱與攻略為主，原文約 12px、正常字重，放後方或下一行。正文維持既有緊湊尺度，控制項仍保留點擊範圍。
- 原生選單保留中文在前、原文在後，option value、路由與分類識別不變。
- Mycopunk 沿用原有中文資料。原語言按鈕改為「原文對照：開／關」，關閉只隱藏原文，中文持續顯示。DQ3 的既有對照開關預設開啟。
- 新增譯名採本站參考翻譯，保留既有官方／社群資料的原始來源。少數專名採音譯；型號、等級、編號保留供辨識。不因翻譯更新提升位置／條件的查證等級。
- 文字用 textContent 或跳脫後的模板呈現；不翻譯玩家輸入、匯入原文、pre、textarea、URL、穩定 ID 或 HTML 屬性中的資料鍵。
- Talos II 的對話中文說明先呈現，遊戲原句獨立保留；玩家 PS5 備份筆記有明確保護，對照測試確認文字不被翻譯。
- 搜尋保留原名、中文及既有別名，指向同一項目。原始 catalog／JSON 名稱、條目順序、schema、namespace、關聯、玩家筆記與進度鍵不做翻譯遷移。

## 維護方式

七款有補譯需求的模組各自維護 `research/chinese-first.json`，執行 `node scripts/prepare-chinese-first.mjs` 產生追蹤的 `dist/chinese-first.js`。產物含來源 SHA-256；`scripts/verify.mjs` 檢查詞彙、主要名稱覆蓋與產物一致，過期則停止。

`shared/chinese-first.js` 僅處理顯示與搜尋，不存取玩家儲存。Mycopunk 的既有雙語節點在各次呈現時重排，保留互動節點。Thank Goodness You're Here! 的共用工具另產生於自己的 `dist/shared/` 並納入自身 SW cache，維持 scope 隔離；verifier 檢查副本一致。

EDF／Mycopunk 舊有搬移 hash 檢查對本次授權調整的樣式與呈現模板設明確例外，`source-manifest.json` 仍保留搬入前紀錄；原攻略資料與其他來源檔繼續核對。

## 驗證

使用 Node 24、既有 Playwright／Edge、合成資料與新 browser context，不使用正式備份或現有瀏覽器 profile。

- 全模組資料驗證、詞彙產物檢查、建置及網站產物檢查通過。
- `scripts/verify-chinese-first-browser.mjs`：十款功能頁面、中文主位、原文次要、雙語搜尋、320～2560px 版面與原文零縮排檢查。
- `scripts/verify-ui-preferences-browser.mjs`：八款共通操作回歸通過，包含勾完消失、撤銷與跨分頁保護。
- BALL x PIT、IRON RAIN、靠左一些些、Talos II、Mycopunk、Thank Goodness You're Here!、DQ3、人中之龍８原有完整隔離回歸通過；EDF 兩代另由共通操作與十款中文介面測試涵蓋。涵蓋各套件原有的撤銷、跨分頁、備份／匯入、未知欄位、儲存隔離及版面檢查。
- Talos II、Thank Goodness You're Here! 原有合成同步測試通過；後者也通過隔離 context 的 SW 離線重載，確認新增詞彙與共用工具已預快取。此結果不等於真實 Google 驗收。
- 舊測試中外文優先與原文預設隱藏的斷言依新規範更新；收集清單測試明確切「全部」再核對已取得項目。IRON RAIN 手機首列檢查改以實際 viewport 判斷，保留中文對照及來源提示後仍須在首個畫面看到清單。
- 主要名稱覆蓋、產物 SHA-256、原始來源 hash 與進度模型差異檢查通過；七款 model.js 僅更新 moduleVersion，未改變進度邏輯或 schema。

截圖與執行紀錄在忽略的 `outputs/chinese-first/`。尚未完成正式站人工驗收、逐名遊戲中文畫面校正或真實 Google／PSN 驗收。
