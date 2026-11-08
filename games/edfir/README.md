# IRON RAIN 作戰手帳

本機路徑 `/game-companion/games/edfir/`。PS4 本體 52 關、55 架 M.I.A. Drone 與 **44 盃（含白金）**。任務與白金計算排除 DLC；武器圖鑑顯示全部收錄內容，明確區分本體、DLC 與特典。原需求的 45 盃與可查證清單不同，不創造第 45 項。

## 使用

可從任何任務開始。首頁選擇目前任務不會替先前關卡打勾；首頁以白金畢業為主，不再顯示其他目標切換。Roadmap 直接定位任務、記錄完成與難度；完成預設收合，警示仍可見。Drone 勾選表示已成功完成任務並核對遊戲內回收登錄；與收集中心共用同一紀錄。55 架齊全只顯示條件追蹤，不會代填 Drone Buff。

1.1.0 已補 52 關的主要敵人、Boss／大型威脅、3–5 步具體攻略及各難度解鎖資料，共 631 筆來源表具名獎勵（263 武器、302 道具、63 外觀、3 PA-Gear；不表示 631 種互不重複裝備）。另外 16 筆疑似 DLC、刪除線或條件衝突項目另列，未納入本體。攻略適用範圍、無法擊破的事件敵人與重要警示直接呈現；完成收合不隱藏警示。

1.2.0 將進度操作簡化為勾選／取消勾選；舊版目標與 Drone unknown 紀錄仍可讀取與匯出，畫面讀取不會改寫舊值。查證不足的攻略欄位仍明確標示，與玩家勾選分開。

武器改為緊湊 checklist，解鎖／持有可直接勾選，詳細取得條件、價格、用途、來源與資源目標按需展開。類型、等級、解鎖方式、關聯任務、未持有、未解鎖與規劃中可交叉篩選；搜尋包含英文／日文別名、敵人及 M1／M01，並提供等級／價格／名稱排序。手機將進階篩選預設收合；篩選中剛勾選的武器暫留，重新篩選才移除，保持焦點與捲動位置。這些檢視設定不寫入進度。

1.3.0 新增「出擊與養成」：52 關既有裝備需求集中呈現，另有 4 條開局升級路線、7 筆具名武器用途／踩雷提醒，以及 5 條按階段與資源分類的刷取心得。首頁、關卡、武器與資源規劃器均可連入。開局包含 M02 Hard → TF-Anger GD → M01 Hard → AW-Furious 2，以及 3／5／11 架 Drone 的選項。Hard 繞路屬可選升級，兩把 48,000 Credits 各自仍需購買，不當作零成本開局。

刷取將 M13 補素材與後期 M35／46／47／52 分開，標明難度、前置裝備與限制。只從自己的 farmRuns 計算實測，不將來源秒數／收入帶入估算；路線可預填任務／難度，但收益維持 0、須手填。修正 AW-Outrage 的買前 Practice 試射錯誤：只能買到後測試。

1.4.0 修正武器庫不完整：**360 款武器（14 類）＝本體 312＋Golden Storm DLC 40＋特典 8**。本體逐類數量與 Wiki 總數及 GameFAQs 英文清單交叉核對；原有 55 款 ID 與進度保留。圖鑑預設全部，可按內容範圍及既有條件交叉篩選。Complete Arsenal 條件固定顯示本體實際持有／312，DLC 與特典不影響分母，不會代勾 PSN 獎盃。獎盃可一鍵開啟尚未持有的本體武器。

武器區分解鎖、實際購買／取得與資源目標。283 款具完整四資源成本，77 款仍有缺欄；來源破折號不當作零。277 款有英文名稱對照，83 款維持日文及待核提示，不自行翻譯冒充官方名稱。逐筆附解鎖、等級、來源與表列證據；用途尚未查證者明示缺口。資源規劃器只加總完整已知價格，以自己的刷取紀錄估算，零產出的資源不顯示虛假的場次。

**20 道具、13 組外觀款式、4 PA-Gear** 與少量挑戰維持原資料；道具／外觀仍是部分庫，外觀沒有逐色號拆分，不計算全道具完成率。武器名稱清單補齊不表示整份白金攻略已完成實機驗收。

## 儲存與備份

schema1，IndexedDB `game-companion.edfir.progress.v1`，沿用根共用交易 store。`missions`、`drones`、`trophies`、`weapons`、`equipment`、`resources`、`farmRuns`、`settings` 分別記錄；推導狀態不寫回人工確認。沒有 Service Worker 或另一份 localStorage 主進度。

匯入先 archive 兩端原文（含無效 JSON），然後驗證遊戲與 schema、選擇差異、下載原文復原備份並確認。套用以預覽原文作交易條件；另分頁編輯後須重新比較。未知頂層／項目欄位保留，來源原文亦可由完整備份還原。未來版本拒絕套用；schema0 交換草案若只有新增資源／裝備／實測群組缺失，可在保留原文後轉成 schema1。這不表示存在已發布 schema0 存檔。損壞進度不會被空白進度覆寫，仍可下載 records 原文。

Drive 直接引用既有 Talos 的 GoogleAuth、DriveAppData、非同步 SyncSession、setupSync 與合併核心。維持逐 grant 合成測試、strong If-Match、首次配對、三方衝突、Base/pending 及帳號隔離；儲存前綴／檔名均為 edfir。沒有新 OAuth 流程、自動上傳或降級覆寫。正式 Google 仍待使用者測試。

## 維護與驗證

`research/weapon-catalog.json` 保存完整武器索引、14 類逐類計數、英文對照依據、來源欄位證據與舊 ID 對照。產生器離線疊加這份已查證資料；不在建置時抓取網站。原始來源文字與暫存解析檔只放忽略的 `outputs/edfir/`，不發布。DLC／特典進度仍用同一 weapons map；進度 scope 的 base 契約表示白金範圍，不限制圖鑑收藏。

`research/*.json` 保留查證資料；`scripts/prepare-data.mjs` 將原始目錄與兩份逐關資料、Drone 差異核對、裝備擴充合併到追蹤的 `dist/data/*.json`。保留既有 ID、名稱、別名及未知欄位，不根據關卡或 Drone 條件自動寫入已解鎖／已購買。`research/advice-research.json` 經同一產生器輸出 `dist/data/advice.json`；`dist/advice.js` 負責心得與唯讀條件呈現。武器持有共用 purchased，只有明確點擊才加入既有 target 預算，不另建配裝存檔。`dist/weapons.js` 負責武器 checklist 與唯讀篩選；`dist/guide.js` 只呈現文字、獎勵、查證範圍與候選路線，不操作進度。

```powershell
node games/edfir/scripts/prepare-data.mjs
node games/edfir/verify.mjs
node scripts/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node server.mjs
node scripts/verify-edfir-browser.mjs
```

基礎 UI 直接引用 Grounded 已有 stylesheet，本模組覆寫只包含 EDFIR 需要的畫面。引用既有模組程式不會開啟其資料庫；artifact 檢查確認依賴存在。若未來獨立抽共用來源，應另行評估，不藉本任務重構原遊戲。

## 查證限制

所有名稱／條件與路線附來源。英文 PS4 獎盃保留特殊的霰彈槍項目名稱，不以 Steam 別名取代。7 筆 Drone 已重新比對：M08／11／19／26／28／44 依共同地標收斂，但部分方位／顏色／引擎序號仍未核實；**M32 頂端／底座高度衝突未解**，保留兩個候選與逐來源理由。路線 SVG 是原創流程圖，不是地形圖或實測座標。

逐關資料是公開來源比對與原創繁中整理，沒有 PS4 實機驗收。未核實英文者保留日文原名；來源未列 Boss 不等於實機證明沒有，部分來源只取得搜尋摘要或區段合頁，讀取方式保留於 sources。獎勵表的疑似錯字仍標示，服裝／任務表矛盾另列排除。忍者外觀的 Drone51／53 與 Aisha A2／A3 型號仍有差異，不以猜測補齊。正式連線狀況、Ensign 確切門檻、mysterious machine 精確位置、真實 PS4 跳盃與 Google 條件寫入仍待驗證。詳細盤點及階段結果見 [實作報告](docs/IMPLEMENTATION.md)。前次 1.3.0 已依授權發布；2026-11-08 使用者已授權 1.4.0 commit／push，沿既有 main Pages 流程發布，實際結果以對應提交 Actions 為準。
