# Cat Quest III · PS5 白金航海手帳

1.2.0補查：針對13件裝備及7個船部件建立20筆結論與未解問題。裝備現為85件多來源、1件細部單源、10件仍有差異；修正Long Island／Fort Tail同地異名、Antares可在Boss前取船體，以及人魚彈藥的前置異說。[本輪補查](docs/FOLLOWUP_AUDIT.md)。

以下1.1.0為前版紀錄：

1.1.0：原版96件裝備、13被動與4炮彈均已加入取得地點、提示、前置與步驟；83件裝備多來源對照、3件單源、10件有差異，均未PS5實機驗證。詳見[逐件研究與差異](docs/EQUIPMENT_RESEARCH.md)。

本機入口：<http://127.0.0.1:4190/game-companion/games/cat-quest-iii/>

三個主入口：遊玩路線、蒐集查漏、PS5獎盃。四階段19段路線；原版96件裝備、12組解謎、6隱藏物、8水點、3失物的取得／歸還、3書、5鑰匙、10魔法、11懸賞的擊倒／領賞，以及31個獨立跳盃紀錄。13船被動及4炮彈只是收錄清單，不是已核實金盃集合。

進度使用獨立 IndexedDB `game-companion.cat-quest-iii.progress.v1`；共用根目錄的交易儲存及跨分頁通知，沒有OAuth、Drive、SW、中央帳號或PSN存取。schema1 以 `steps`、`facts`、`trophies`、`counters`、`settings` 分開保存；屬於本專案對規格契約的選型，沒有複製其他遊戲進度。`facts` 共用路線與查漏紀錄；推薦清區次序不視為遊戲硬性前置。

右上「備份與還原」可匯出JSON、完整封存，匯入先保存兩端原文、逐筆選擇、下載復原備份並確認，再以預覽原文條件交易套用。未知項目保留並在資料頁列為待映射，不刪除來源缺少的本機項目。保存失敗會回復已保存畫面並提供重試；逐鍵撤銷拒絕覆蓋後續變更。備份不是PS5遊戲存檔。

使用 Node.js 24。在repo根目錄執行：

```powershell
node games/cat-quest-iii/prepare-data.mjs
node games/cat-quest-iii/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node server.mjs
# 另一終端，server已開啟時
node scripts/verify-cq3-browser.mjs
```

測試工具沿用 `scripts/browser-runtime.mjs`；必要時設 `PLAYWRIGHT_REQUIRE_FROM` 為本機Playwright的require起點。不安裝產品依賴。瀏覽器測試只建立新的context及合成資料，不操作現有profile。

資料由根規格 `cat-quest-iii_GAME_COMPANION_SPEC.md` 、`research.json` 及 `followup-research.json` 離線產生；各份hash寫入 `dist/data.json`。根規格仍為必要來源，不可刪除。名稱ID在此版建立後凍結。更新來源不得重編ID。

本模組遵循共通介面偏好28的14px緊湊字級。介面是可連續操作的攻略工具，採既有側欄、完成度方塊及清單；不套用行銷網站的一屏一節、大型主視覺或動畫版型。未核實位置的裝備不冒充終章掉落，集中於查漏清單；全部已收錄名稱可直接勾選；攻略詳細步驟可按需展開，來源差異在收合時仍可見。

限制及測試紀錄見 [實作報告](docs/IMPLEMENTATION.md)。本批已獲使用者授權提交、推送，沿既有main GitHub Pages流程發布；實機跳盃與PS5現版集合仍未驗收。
