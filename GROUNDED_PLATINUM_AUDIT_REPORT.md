# Grounded 白金流程驗收

日期：2026-11-08（Asia/Taipei）。依 `GROUNDED_PLATINUM_UX_AUDIT.md`。對象為首次遊玩 0/46、目標 PS5 白金的玩家；採使用者已同意的公開 PS 清單，沒有另一份私人清單。

## P0 調查結論（修正前記錄）

**現況不能通過「只靠本站一路到白金」的完整驗收。** 46 獎盃均存在且有 Roadmap 對應，但 53 筆收集庫是部分資料；缺少全量文件、生物卡、地標、配方與實用路線。不能用網站全部勾選推論遊戲 100%。沒有發現目前測試範圍內的進度遺失或跨遊戲寫入。

P0 先於產品程式修改完成。本節保存原始發現；後續修正與測試另記於末節，不將原始缺陷改寫成原先正常。

## 架構與實測範圍

- 來源 `games/grounded/dist/`：原生 ES modules、`data.js` 靜態內容、`model.js` 周目／成員分界、`roadmap-progress.js` 推導完成度、`app.js` 同一套控制與清單、`map.js` 原創 SVG 區域圖。
- `shared/roadmap-store.js` 交易儲存與既有 merge core 沿用。DB `game-companion.grounded.progress.v1`，schema/schemaVersion 1；個人 trophies、周目 steps/conditions/collectibles、世界 inherited 分離。沒有 OAuth、SW、即時多人或 PSN 串接。
- `scripts/build.mjs` 發布 `_site` 至既有 GitHub Pages workflow。P0 時僅本機驗收；使用者後續已授權本批 commit／push，沿用 main 的 Pages 流程。
- 資料檢查：46 盃（1 白金、3 金、10 銀、32 銅）、7 章、25 步、53 收集、13 人工條件、11 示意區域；ID 唯一、既有關聯有效。具體覆蓋見 `GROUNDED_DATA_COVERAGE.md`。
- Edge/Playwright 全新 context、合成進度、攔截外部請求；本機 `http://127.0.0.1:4193/game-companion/games/grounded/`。沒有使用玩家 profile、正式備份或主機存檔。沙箱瀏覽器啟動失敗，改以獲准的隔離本機瀏覽器；沙箱／非沙箱 loopback 不互通，預覽改到 4193。
- 基準 `node games/grounded/verify.mjs`、既有 `scripts/verify-grounded-browser.mjs` 通過。另以忽略目錄下 `outputs/grounded-audit/baseline.mjs` 重現缺陷，證據為同目錄 `baseline.json`。
- UI 基準 inspector：1440/768/390 各 0 FAIL、0 WARN，圖片已檢視。保留庭院綠灰、系統字體、既有側欄和連續閱讀。允許 below-fold：使用者明定未完成全文展開。主要問題為查漏內容與入口，不是視覺重寫。

## 問題清單

| ID | 類型／優先 | 重現／資料位置 | 影響與 P0 處置 |
|---|---|---|---|
| G01 | 資料缺漏／高 | `data.js` 53 項；文件 5、錄音 2、生物卡 7、地標 4 | 無法完整查漏 99%；所有分類仍須明示部分收錄。全量擴充列後續，不臆造數量或點位。 |
| G02 | 已重現缺陷／高 | 收集頁搜尋 Ominent → 0；`data-recon-special`、`data-snapshot-3` 已存在 | 遊戲內 Data 分組無法搜尋。可安全補既有資料分組、入口文字與反查，保留 ID／進度。 |
| G03 | 已重現缺陷／高 | 收集頁先出現 53 列，最後才是 13 條件；沒有分類直達按鈕 | 99% 缺漏只能自行捲動比對。可把矩陣提前、加分類待辦與來源入口；人工確認不代填 PSN。 |
| G04 | 已重現缺陷／中 | 全新資料建立 NG+1，收集摘要仍 0/6 普通乳牙；milk 篩選實際 0 列 | 周目摘要與清單不一致。改為本輪獨立計數入口；不改第一輪資料或繼承策略。 |
| G05 | 資料缺漏／高 | `ant-queens` 僅泛稱選擇後果；`gotta-peep-them-all` 沒有蟻寶寶提示 | 舊 PS5 攻略主張友好三蟻后保全卡片；現 Wiki 對 Super Win 排除 baby cards。必須分開 Gotta Peep 與 Super Win，提供保守友好路線，PS5 補跳／排除條件保留待實機核對。 |
| G06 | 資料缺漏／高 | Haze 僅防毒、Undershed 僅跟隨引導、Wasp 僅依提示開啟 | 缺必要入口物資／Fuse／開箱觸發。可補來源明確的少量步驟；其餘迷宮／Boss 完整打法仍不足。 |
| G07 | 資料缺漏／高 | `ngHtml()` 只有四個主步驟已記錄／未記錄 | 不是遊戲啟動條件驗證，也未列未完成第一輪分類及個人獎盃。加入唯讀待辦與標籤，保留手動建立下一輪與過期備份保護。 |
| G08 | 待查證／高 | Data 錄音 `requiredFor:[]`、卻在來源頁籠統排除必要性 | All Data 是社群必要分類；已確定項目可補關聯，仍未知項保留待查證。禁止把未知當作可略過。 |
| G09 | UX 建議／中 | status 僅 missing/obtained/unknown | 「未取得」不包含待確認，不利查漏。加「未完成（含待確認）」衍生篩選，不重寫三態。 |
| G10 | 資料缺漏／高 | `no-more-homework` 僅完成任務清單；無逐任務資料 | 補明確 Apprentice 與 Daily 區別及來源，100 項逐筆仍未建庫。 |
| G11 | 資料缺漏／高 | SVG 點的是 11 區域群組，無個別圖釘；地下只文字層級 | 不具精準導航／房間入口能力。現有告知誠實；維持無座標，不大量補未核實點位。 |
| G12 | 待查證／中 | 全部 steps verification 預設 verified；Trophy remedy 通用 | 摘要／PSN 文案已核對不等於逐步可獨立遊玩。對仍缺入口與打法者標示路線待查證；46 盃跳盃、多人補跳、主機版本均未實機驗收。 |
| G13 | 資料缺漏／高 | 0/46 第一個目標未提示遊戲存檔是否允許獎盃 | 添加標準生存／檢查獎盃停用提示；不能靠網站勾選修復遊戲模式。 |
| G14 | 待查證／中 | `carryCategories` 令 mega/scab/creature/recipe 共用 inherited | 這四類各輪顯示同一筆永久紀錄；文件／地標／任務另輪清空。遊戲 NG+ Data 是否所有細項保留、各成員舊備份選擇仍須完整實機查證，不能擅自 migration。 |

## 六段流程判定（P0）

1. 開局／Oak：可直接找到下一步，初始 0/46，未完成全文展開；缺存檔資格提醒。
2. 四大實驗室：目標與獎盃可獨立確認，Hedge 完成不會代填資料；路線不足，Haze 缺破門必要工具。
3. Upper／Undershed：順序合理，Fuse 與工具前置不夠具體，非完整導航。
4. Boss／蟻后：獎盃均涵蓋；蟻后卡片風險及開蜂箱機制缺漏，仍須外部攻略。
5. JavaMatic／結局／99%：結局與 Super Win 分開確認，沒有假百分比；部分資料庫無法給出所有缺漏。
6. REMIX.R／NG+1：備份、預覽原文條件、各周目保存已有保護；缺第一輪具名未完待辦，乳牙摘要錯誤。NG+2 以上不是白金必要條件，不新增此負擔。

## 規則來源與證據限制

2026-11-08 重新開啟／搜尋，未沿用聊天結論。403 頁僅採回傳搜尋索引，不繞過驗證。均為內容摘要與引用連結，沒有抓取地圖／圖像／長文。

- [官方 Fully Yoked 1.4，2024-04-16](https://grounded.obsidian.net/news/grounded/fully-yoked)：PS4/PS5、四項 REMIX.R 前置、既有物品／基地／配方保留、普通乳牙隨機、Gold Cards 不要求。官方條件可信，PS5 當前安裝版本未知。
- [官方 1.4.3，2024-06-18](https://grounded.obsidian.net/news/grounded/grounded-patch-143)：NG+ 乳牙／BURG.L 計數、客戶端兩盃與 PS5 NG+ 存檔修補；不能推論所有 PSN 補跳都已正常。
- [官方 hotfix 1.4.7.4815，2025-05-12](https://grounded.obsidian.net/news/grounded/grounded-patch-1471)：已核對的修補基準，不聲稱已讀取使用者主機版本。
- [PS 公開清單](https://www.playstationtrophies.org/game/grounded/trophies/)、[Gamer Guides 對照](https://www.gamerguides.com/grounded/psn-trophies/overview)：46 名稱、等級、文字條件逐筆比較。Science Rules 的 ASL/BURG.L 與 Underexposed 的進入/拍照有文案差異。
- [PS5 攻略](https://www.psthc.fr/unjeu/grounded-ps5/guide-trophees.htm)：蟻后友好／毒害對卡片的路線風險。其 Super Win 敘述與現 Wiki 不同，不能不分版本照搬。
- [Report Card 社群索引](https://grounded.wiki.gg/wiki/Super_Win)：13 條件、Baby/Gold/Dimensional 卡例外與兩份 NG+ 配方例外。這是社群規則，非主機實測。
- [NG+ 社群索引](https://grounded.wiki.gg/wiki/New_Game%2B)：故事／世界事件重置、永久物件與部分資料保留、當輪普通乳牙 66／候選 219。候選不等於必生點。
- [Grounded Data](https://grounded.wiki.gg/wiki/Data_Items_%28Grounded%29)、[Haze Lab](https://grounded.wiki.gg/wiki/Haze_Lab)：Ominent 具名項位置、霧區入口及 Fuse 前置；精確房內點位未全面核實。
- [BURG.L 任務](https://grounded.wiki.gg/wiki/BURG.L_Quests)、[乳牙](https://grounded.wiki.gg/wiki/Milk_Molars_%28Grounded%29)、[SCA.B](https://grounded.wiki.gg/wiki/SCA.B_Flavor_Schemes)、[MIX.R](https://grounded.wiki.gg/wiki/MIX.Rs)、[Brawny Boy Bin](https://grounded.wiki.gg/wiki/Brawny_Boy_Bin)：只採 Grounded 第一代條目；數量、分類覆蓋另表，不產生假項目。

## P1 安全修正範圍

只修改 Grounded 內容／查漏入口及既有測試；schema、ID、namespace、繼承 bucket、三態與 import/store 不變。大規模全量資料、精確地圖、多人介面、migration 不在此次安全修正內。所有讀取與切換必須不寫完成旗標。修正後結果將補於此處。

## P1 修正結果

模組 1.1.2，schema 仍為 1。14 項發現中：6 項完成低風險修正、5 項部分改善、3 項保留待辦。沒有宣稱整體白金驗收通過。

| 問題 | 結果與程式位置 |
|---|---|
| G02 已修正（已列子集） | `data.js` 補 Ominent 兩筆與 Trudy Blues 的 metadata／文字取得方式；`app.js` 分組可搜尋、篩選，清單可反查 Haze 攻略。沒有新增假資料；全量 Ominent 仍受 G01 限制。 |
| G03 已修正入口 | 收集頁首「Super Win／99% 查漏」直達矩陣；每類顯示本站已收錄與未完成數，可查 unknown／未取得。保留原清單／搜尋順序，沒有把長矩陣搬到搜尋前。Boss 連至獨立攻略紀錄，Shop 明示晶片不是商品購買完成。 |
| G04 已修正 | `model.js` 的唯讀 `collectionVisible` 統一清單／摘要可見性；NG+ 普通乳牙摘要改當輪計數入口。第一輪固定位置不混入。 |
| G07 已修正 | `roadmap-progress.js` 從第一輪 conditions、當前成員永久 trophies 衍生待辦；REMIX.R 步驟及 NG+ 頁一致，跨分頁新勾選也反映。不當成遊戲開門判定，不強迫填滿才允許已啟動遊戲的玩家建新輪。 |
| G09 已修正 | 加「未完成（含待確認）」篩選；查漏不排除必要性待查證項，清空結果明示不代表全收齊。 |
| G13 已修正 | 開局目標在遊戲操作前提醒確認存檔未停用獎盃；網站不能偵測或修復遊戲模式。 |
| G05 部分改善 | 三蟻后友好路線、卡片風險、Royal Arrangements 不要求殺死，以及 Super Win 例外的區別已呈現；PS5 當前版本跳盃與補救仍待實機。 |
| G06 部分改善 | 補 Haze 主門炸彈／水管工具、Undershed Fuse、蜂巢提示→睡眠→入口。Wasp/Undershed/感染育母仍標待查證，迷宮／召喚與裝備詳細路線未齊。 |
| G08 部分改善 | Trudy Blues 已核對必要性與主入口房間桌上位置；另一錄音仍待查證且列入 Data 查漏，不將未知當可略過。 |
| G10 部分改善 | 明確標示 100 Apprentice，區分 Daily，提供來源；未新增 100 個任務或商店全商品資料。 |
| G12 部分改善 | Science Rules/Underexposed 都標文案來源差異；關鍵缺路線標待查證。一般獎盃的各種補跳與主機條件仍未驗證。 |
| G01/G11/G14 未改 | 全量收集與精準地圖缺漏保留；世界永久 inherited 的歷史語意維持現有規則，任何 bucket/schema 遷移先提方案。 |

Haze 增加七個相關 Data 勾選，可能讓原本縮起的步驟重新展開；原目標及既有收集狀態沒有改寫。這是閱讀完整度重新推導，不是進度遺失。保留既有歷史筆記、標記、額外世界／成員及未知欄位。

畫面驗收發現新查漏入口若沿用「區塊置中」，第一個核對框會在視窗外（桌面實測 y=-99）。已改為大段落起點定位，小項目仍沿用置中；新增檢查要求第一個核對框完全可見，重測 y=157。截圖等待定位完成與兩次繪製 frame，避免把尚未繪製的空白誤判成通過。

## 最終測試結果

- `node games/grounded/verify.mjs` 通過：新增未取得／unknown 查漏、43 個第一輪獎盃集合、第一輪矩陣讀取、NG+ 可見性、資料全勾不授予 PSN、唯讀推導不修改進度。
- `node scripts/verify-grounded-browser.mjs` 最後一次完整回歸通過：新增白金情境＋既有閱讀／匯入／安全檢查；詳見 `GROUNDED_UX_TEST_CASES.md`。合成 45/46 以 UI 確認最後一盃成 46/46；沒有宣稱在主機實際取得。
- 新增情境包含 0/46、Hedge/Haze 獨立文件、Ominent→地圖→攻略、99%／unknown、第一輪清單、NG+ 過期備份阻擋、原輪不變、當輪乳牙數、A/B 獎盃分離、重複匯入、無效 JSON。既有舊版／未知資料、錯遊戲／新 schema、quota、下載失敗、過期匯入、損壞原文、跨分頁競爭皆通過。
- 七頁 × 1440/768/390/320px 無整頁橫向溢出；合成 context 零外部請求、零 page error、只使用 Grounded DB，沒有 localStorage/cache 污染。
- `node scripts/verify.mjs`、`node scripts/verify-sync.mjs` 執行時通過；未修改共用 store／merge core 或其他遊戲。工作目錄另有其他並行任務的 Talos／Thank Goodness 變更，未納入本次修正。
- build／verify-site 通過，檢查時為 622 檔、122 個本機 HTML 連結、6 模組。數字含工作目錄的其他模組，不代表本次新增數。
- Grounded `git diff --check` 通過。來源 lint：0 FAIL／1 WARN（既有 01–07 章節序號，保留為已要求的章節定位，不移除）。Roadmap inspector 前後三寬均 0 FAIL／0 WARN；allow below-fold 理由不變。
- 已逐張檢視前後 Roadmap 三寬，以及修正後收集、矩陣、NG+ 三寬截圖：原字體、色盤、側欄與表單保持；手機單欄、查漏按鈕與警示可讀，定位不再落在區塊中段。沒有重新抽風格／整頁改版。

## 未通過與交付邊界

完整免外部搜尋的 0→46、任意缺漏的 99% 定位、全部必要分類逐項查漏、精準分層地圖及真實 PS5／多人跳盃仍未通過；部分不確定的遊戲資料已明示待查證。完整資料、路線與主機實測的下一步列在 `GROUNDED_FOLLOWUP_PLAN.md`。

驗收未對玩家既有存檔、Drive 或 PSN 進行寫入。使用者後續已授權本批 commit／push，沿用既有 GitHub Pages 流程；發布狀態以對應 GitHub Actions 為準，網站部署不代表遊戲資料完整或 PS5 實機驗收通過。
