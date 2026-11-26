# 實作與驗證紀錄

日期：2026-11-27；模組1.0.0；攻略基準2026-11-27；進度schema1。

工程契約：以14章主線動作回答「下一步做什麼」，章內保留原稿順路建議與警告，章末核對與PSN確認分開。主線100動作、52條支線、65盃、40段羈絆、兩迷宮8區與16項明示計數。沒有精確位置的攝影／追憶／圖鑑不建匿名清單。

路線／清單以相同 group／ID 讀寫；`steps`、`substories`、`trophies`、`objectives`、`counters`、`settings` 各自保存。從 DQ3 沿用經驗證的本機 model／保護式匯入流程，交易層直接使用 shared/roadmap-store.js；未引入中央進度或其他遊戲資料讀寫。快照、匯入原文及原始損壞資料僅在本遊戲 DB，沒有額外 localStorage、SW 或雲端。沒有搬移來源 repo，因此不建立偽造 source-manifest。

介面採 Achromatic ledger（seed 651993528）與既有網站字型、側欄和工具列契約；因長時閱讀，以中性色底、平面分隔、青色完成度條呈現。無限符號與夏威夷／日本雙城輪廓為原創 SVG。使用者要求完成度方塊與右上備份優先於設計技能的無工具列預設。所有數字來自實際資料／進度；初始零值不填假資料。

驗收涵蓋：資料來源hash、資料數量與唯一ID、隔離儲存、主線／PSN獨立、全文／收合／回看、跨分頁、精準撤銷、失敗重試、搜尋清除、深連結、匯入未知欄位與雙端原文、過期／壞檔／備份失敗停止、窄螢幕及1920／2560工具列對齊。

實際結果：`node scripts/verify.mjs`、`node scripts/build.mjs`、`node scripts/verify-site.mjs` 與 `git diff --check` 通過。`node scripts/verify-lad8-browser.mjs` 通過，使用兩個新 context、合成進度，驗證360／390／768／1440／1920／2560px、跨分頁逐鍵衝突、保存失敗重試、備份失敗、壞JSON／跨遊戲檔案拒絕、過期預覽、未知資料、全新context還原、P04八區原處勾選、章內共用羈絆與來源深連結；外部請求0。Windows沙箱內Edge crashpad啟動失敗，改以經工具審核允許的隔離Edge與loopback 4197完成，未使用既有profile。

設計檢查：lint與inspect均0 FAIL；inspect在1440／768／390px截圖已檢視。保留一項below-fold警告，因完整章節須連續閱讀，依使用者規範不裁切／分頁；lint的補零警告用於SS3與既有SS03等價搜尋，沒有裝飾編號。圖檔與量測位於不追蹤的 `outputs/lad8/`、`outputs/lad8-design/inspect/`。桌面閱讀區、摘要、側欄與工具列對齊；手機導覽收合、計數清楚、零值條長為零，沒有橫向溢出。

限制：未重新查證外部攻略、未實機遊玩、沒有 Google／PSN 外部驗收；內容依使用者提供的研究稿，來源查閱日期不代表本次另行連網查閱。2026-11-27 使用者已授權本批 commit／push 與既有 main Pages 發布；部署證據以對應提交 Actions 及正式站資源核對為準。
