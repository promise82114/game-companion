# 共通操作調整與驗證 · 2026-11-19

本批依使用者選定的八款遊戲差異調整，採用 [最新共通介面偏好](../UI_PREFERENCES.md)。切換主要功能重設搜尋與篩選；收集清單預設未取得。保留 Talos II 的區域片段及各模組既有表格捲動取捨，沒有套用先前已被修正的差異判定。

## 範圍

| 模組 | 版本 | 本批調整 |
| --- | --- | --- |
| EDF World Brothers | 1.1.1 | 撤銷比對操作後完整紀錄及 changeId，寫入沿用條件式 journal，拒絕覆蓋同項目的後續變更 |
| EDF World Brothers 2 | 1.1.1 | 同上 |
| IRON RAIN | 1.4.1 | 一般撤銷、未持有勾完立即移除、收集清單未完成預設、統計直達缺項 |
| Mycopunk | 1.0.1 | 收集撤銷、未蒐集預設、摘要查漏入口、本機 Web Lock 串行編輯 |
| Talos II | 1.6.9 | 一般撤銷、未取得獎盃預設、區域收集總覽狀態篩選、項目移除後焦點接續 |
| Thank Goodness You're Here! | 1.4.2 | 一般撤銷、即時重新套用未完成篩選、切換功能重設條件、重要警告保持可見、未完成追蹤群組展開 |
| BALL x PIT | 1.0.1 | 一般撤銷、未完成預設、未完成藍圖／建造核對展開、總覽查漏連結、焦點接續 |
| 無双OROCHI Z | 1.0.1 | 單項／熟練度／批次撤銷、未完成預設與已完成檢視、統計查漏入口、右上備份、手機收合導覽、功能切換重設 |

Grounded 鍛造功能及相關檢查由原工作另批提交（`1c4f009`），本批沒有修改其程式；不將其變更與本批視為同一批完成項目。

## 資料保護與實作取捨

- 沿用各模組自己的 namespace、schema、既有項目 ID、匯入保護與手動同步；沒有加入新登入、背景上傳或資料遷移。
- 新撤銷歷史只存於本次頁面記憶體，最多 30 筆。重新載入後不保留撤銷歷史，但進度仍由原 store 保存。
- `shared/progress-undo.js` 僅處理操作差異及條件還原，不保存或同步進度。每次操作在原交易內擷取實際修改前後值，撤銷只還原該次涉及的紀錄。
- 布林／數值紀錄沒有逐項版本，因此新撤銷採保守修訂檢查：出現其他新進度時，即使變更在別項，也可能拒絕撤銷，避免「改掉再改回」後誤蓋新紀錄。自身連續撤銷可接續；無實質變更的重複事件不會破壞撤銷鏈。失敗交易不加入歷史。
- EDF 沿用既有逐筆 `changeId` 及條件式 journal；遇到後續更新會保留紀錄並顯示撤銷停止。不更動同步核心或 OAuth／Drive adapter。
- Thank Goodness 需要原 scope 內的離線資源，因此 `dist/progress-undo.js` 與共用 helper 維持逐位元相同的本機副本；新增檢查會比對兩者。SW 納入此檔，不擴大攔截範圍；EDF 與 Thank Goodness 的 SW cache 版本已遞增。

## 驗證

使用本機 Node 24 與既有 Playwright／Edge，瀏覽器資料均為合成資料及新 context；沒有使用正式備份或既有 profile。

```powershell
node scripts/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node scripts/verify-sync.mjs
node scripts/verify-ui-preferences-browser.mjs
node scripts/verify-browser.mjs
```

- 根資料／模組驗證、建置、產物檢查與 EDF 合成同步回歸通過。
- 新增八模組隔離回歸覆蓋一般撤銷、未取得預設、勾選即篩除、統計入口、焦點接續、警告可見及手機導覽；包含 EDF 另一分頁取消後再勾回的撤銷阻擋，以及新 store 修訂變更／未知欄位保留。390／320px 檢查水平溢出。
- 原整合瀏覽器回歸通過：EDF 兩款操作、跨分頁、匯入／未知資料／過期預覽、配額、離線、手機及同來源隔離。該腳本的錯遊戲匯入檢查增加等待讀檔完成，避免在錯誤訊息尚未出現時斷言。
- 新增 helper 檢查確保 Thank Goodness 離線副本與共用檔一致。

尚未執行真實 Google Drive 或 PSN／主機流程驗收；本機檢查不代表外部服務或遊戲內容已驗收。2026-11-19 使用者已授權本批 commit／push，沿用既有 main 分支的 GitHub Pages 流程發布；部署結果以對應提交的 GitHub Actions 為準。
