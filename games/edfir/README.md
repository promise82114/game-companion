# IRON RAIN 作戰手帳

本機路徑 `/game-companion/games/edfir/`。PS4 本體 52 關、55 架 M.I.A. Drone 與 **44 盃（含白金）**，沒有加入 DLC。原需求的 45 盃與可查證清單不同，不創造第 45 項。

## 使用

可從任何任務開始。首頁選擇目前任務不會替先前關卡打勾；三種畢業目標只改推薦。Roadmap 直接定位任務、記錄完成與難度；完成預設收合，警示仍可見。Drone 勾選表示已成功完成任務並核對遊戲內回收登錄；與收集中心共用同一紀錄。55 架齊全只顯示條件追蹤，不會代填 Drone Buff。

1.1.0 已補 52 關的主要敵人、Boss／大型威脅、3–5 步具體攻略及各難度解鎖資料，共 631 筆來源表具名獎勵（263 武器、302 道具、63 外觀、3 PA-Gear；不表示 631 種互不重複裝備）。另外 16 筆疑似 DLC、刪除線或條件衝突項目另列，未納入本體。攻略適用範圍、無法擊破的事件敵人與重要警示直接呈現；完成收合不隱藏警示。

武器區分解鎖、實際購買／取得與資源目標。資料庫擴充為 **52 款武器（14 類）、20 道具、13 組外觀款式、4 PA-Gear** 與少量挑戰，仍是部分庫；外觀沒有逐色號拆分，不以部分庫計算全武器／全道具獎盃。44 款武器有完整四資源購買值，其餘缺失值保留未知。資源規劃器僅加總已知價格，以自己的刷取紀錄估算，零產出的資源不顯示虛假的場次。

## 儲存與備份

schema1，IndexedDB `game-companion.edfir.progress.v1`，沿用根共用交易 store。`missions`、`drones`、`trophies`、`weapons`、`equipment`、`resources`、`farmRuns`、`settings` 分別記錄；推導狀態不寫回人工確認。沒有 Service Worker 或另一份 localStorage 主進度。

匯入先 archive 兩端原文（含無效 JSON），然後驗證遊戲與 schema、選擇差異、下載原文復原備份並確認。套用以預覽原文作交易條件；另分頁編輯後須重新比較。未知頂層／項目欄位保留，來源原文亦可由完整備份還原。未來版本拒絕套用；schema0 交換草案若只有新增資源／裝備／實測群組缺失，可在保留原文後轉成 schema1。這不表示存在已發布 schema0 存檔。損壞進度不會被空白進度覆寫，仍可下載 records 原文。

Drive 直接引用既有 Talos 的 GoogleAuth、DriveAppData、非同步 SyncSession、setupSync 與合併核心。維持逐 grant 合成測試、strong If-Match、首次配對、三方衝突、Base/pending 及帳號隔離；儲存前綴／檔名均為 edfir。沒有新 OAuth 流程、自動上傳或降級覆寫。正式 Google 仍待使用者測試。

## 維護與驗證

`research/*.json` 保留查證資料；`scripts/prepare-data.mjs` 將原始目錄與兩份逐關資料、Drone 差異核對、裝備擴充合併到追蹤的 `dist/data/*.json`。保留既有 ID、名稱、別名及未知欄位，不根據關卡或 Drone 條件自動寫入已解鎖／已購買。`dist/guide.js` 只呈現文字、獎勵、查證範圍與候選路線，不操作進度。

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

逐關資料是公開來源比對與原創繁中整理，沒有 PS4 實機驗收。未核實英文者保留日文原名；來源未列 Boss 不等於實機證明沒有，部分來源只取得搜尋摘要或區段合頁，讀取方式保留於 sources。獎勵表的疑似錯字仍標示，服裝／任務表矛盾另列排除。忍者外觀的 Drone51／53 與 Aisha A2／A3 型號仍有差異，不以猜測補齊。正式連線狀況、Ensign 確切門檻、mysterious machine 精確位置、真實 PS4 跳盃與 Google 條件寫入仍待驗證。詳細盤點及階段結果見 [實作報告](docs/IMPLEMENTATION.md)。2026-11-08 使用者已授權 commit、push 與沿既有 main Pages 流程部署；實際部署結果以對應 GitHub Actions 為準。
