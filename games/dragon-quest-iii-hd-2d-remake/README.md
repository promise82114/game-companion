# 勇者鬥惡龍III HD-2D Remake

PS5 本體白金本機攻略，版本基準 1.1.1.0。原生 HTML／CSS／ES modules，不新增產品套件、OAuth、Drive 或 Service Worker。

模組 1.1.0 改為中文優先：地名、163 種討伐與 57 種友善物種、技能及常用道具提供中文對照，右上「英文對照」可顯示原名；中文、英文、別名都能搜尋。技能與部分裝備含說明譯名，尚未全部核對台灣官方字串，來源與差異保留於資料管理頁。每張路線卡先讀一句目標，再看編號走法與完成標準；關鍵道具少量粗體、補充與原文降級。原有 schema、namespace、ID 與已勾進度不變。

1.1.1 依閱讀回饋縮小一級字體、收緊行距與段落間隔，保留目標、標題、粗體關鍵詞及補充資訊的層級。正文 15px、主要標題 18.5–19px、目標 16.5–17px；勾選與按鈕操作尺寸維持。

從 repo 根目錄啟動：

```powershell
node games/dragon-quest-iii-hd-2d-remake/prepare-data.mjs
node scripts/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node server.mjs
```

入口：[本機攻略](http://127.0.0.1:4190/game-companion/games/dragon-quest-iii-hd-2d-remake/)。Portal 同時提供入口。伺服器只綁定 127.0.0.1:4190；換埠、瀏覽器或清除站點資料前先下載 JSON，另個來源需要手動匯入。

## 日常操作

- 路線共 4 階段、11 個行進段落、38 步驟；目前段落內未完成內容全文展開，已完成可回看。跳章與閱讀不改進度；「繼續遊玩」依實際主線勾選定位，可另存章節書籤。
- 收藏提供 110 小徽章、121 友善個體、163 討伐、135 種去重技能（66 咒文／69 特技）、24 兌獎、11 競技場、7 願望與 7 類試煉備料。各分類預設未完成，完成後立即移除，可撤銷或切換全部反勾。
- 沿路收藏、願望、競技場與清單共用同一 ID。PS5 42 座獎盃獨立手動確認；條件達標只提示待確認，不自動授盃。
- 計數依遊戲手動更新，可超過獎盃門檻，不從收藏勾選累加；在手供品與已交付分開記錄。
- 一般切功能重設搜尋與篩選。具體條目的深連結可讓已完成目標可見；「清除定位」恢復預設。

## 保存與備份

資料庫 `game-companion.dragon-quest-iii-hd-2d-remake.progress.v1`，schema 1，`records/progress` 保存主紀錄。快照、匯入原文與損壞資料下載均限同一 DB；不讀寫其他遊戲、舊站或 localStorage。

沿用根 `shared/roadmap-store.js` 的交易、原文條件比較、checkpoint、archive 和 BroadcastChannel。使用 `steps`、`collectibles`、`trophies`、`skills`、`objectives`、`counters`、`supplies`、`settings` 八個 map。每次操作交易內讀最新值，只更新指定鍵，並以 `keyRevision` 阻擋同鍵後寫／ABA 撤銷。撤銷另一鍵不影響並行編輯。

匯出提供帶格式／遊戲／平台／版本的進度 JSON 和完整原始封存。匯入先保存兩端原文再解析與驗證，逐筆選擇，來源缺項不刪本機；未知 ID、欄位保留。下載復原包並確認保存後才套用，交易內以預覽原文再次比較。來源較舊的項目需額外核對確認。下載失敗、預覽過期、錯遊戲、壞 JSON、非支援 schema 都不套用。完整封存匯入的歷史原文保存在本次來源封存內，不把外部資料庫 key 寫進本機 DB。JSON 不是 PS5 存檔。

## 驗證

```powershell
node games/dragon-quest-iii-hd-2d-remake/verify.mjs
# server 已啟動後
node scripts/verify-dq3-browser.mjs
```

沿用 repo 的 Playwright／Edge 及 `PLAYWRIGHT_REQUIRE_FROM`／`TEST_BASE_URL`／`BROWSER_CHANNEL`。只用新 context 與合成資料，截圖在忽略的 `outputs/dq3/`。來源、驗證證據與限制見 [IMPLEMENTATION.md](docs/IMPLEMENTATION.md)。2026-11-23 使用者已授權 commit／push，沿既有 main Pages 流程發布，部署結果以對應提交 Actions 為準。[正式測試入口](https://promise82114.github.io/game-companion/games/dragon-quest-iii-hd-2d-remake/)。PS5 逐點實機與跳盃未驗收。
