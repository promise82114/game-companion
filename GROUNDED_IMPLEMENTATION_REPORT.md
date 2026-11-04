# Grounded 實作與驗證報告

日期：2026-11-04。模組 1.0.0，進度 schema／schemaVersion 1。已建立可由既有 GitHub Pages 流程建置的可用版本；2026-11-04 使用者已授權 commit／push，沿用 main 的 Pages 流程；部署結果以對應 GitHub Actions 為準。使用者原有 `docs/GROUNDED_PAGE_SPEC.md` 保持原文。

## 階段交付

| 階段 | 可用功能 | 資料／功能界線 |
| --- | --- | --- |
| P0 | 架構、路由、資料契約、版本／獎盃／Super Win／NG+／Shared World 查證 | 見 `GROUNDED_P0_REPORT.md`；部分直接存取 403，僅使用已取得索引文字，未繞過限制 |
| P1 | Portal 註冊、8 功能頁、七階段 25 步 Roadmap、46 獎盃、保存、備註、完成時間／成員 | 初始 0/46；PSN 狀態手動確認，獎盃不由步驟代填；完整體驗／白金均可任意切章 |
| P2 | 十類收集、53 個具名項目、三態、搜尋／區域／用途／查證篩選、13 條 Super Win 核對矩陣 | 全部分類皆標資料庫未齊；78／45／51 僅為來源參考總量，不生成假項目、不宣稱遊戲 100% |
| P3 | 原創 SVG 概念庭院、11 區域群組、圖層、縮放／拖曳／方向鍵、清單雙向連動、個人標記／備註 | 精確座標零筆。群組錨點是畫面排版，並非收集品座標；沒有第三方底圖、圖磚或圖片 |
| P4 基礎 | 多世界、本機成員、個人獎盃／強化筆記、獨立周目、REMIX.R 前備份確認、NG+ 隨機乳牙記錄 | 沒有遊戲連線、即時多人同步或 Grounded Drive 寫入；不把隨機候選當必收點 |
| 驗證 | 資料／模型、隔離瀏覽器、安全匯入、舊模組回歸、手機、Pages 產物 | 真實 PS4／PS5 跳盃、遊戲存檔繼承與正式網域仍待人工驗收 |

53 項組成：普通乳牙 6、巨型乳牙 5、SCA.B 8、BURG.L 晶片 6、文件 5、錄音 2、特殊配方 2、地標 4、Boss 生物卡 7、MIX.R 8。錄音的分類及精確位置未完全核實，標 `unverified` 並不設白金必要連結。其他分類也只代表已核對子集；不能以本站完成數當成遊戲總完成數。

## 重用與資料安全

- Talos 原交易 store 抽至 `shared/roadmap-store.js`，只有 fresh／validator 配置鉤子；Talos 保留原預設行為、DB、schema、key、同步 adapter、資料 ID 與攻略。入口按 source checkout／Pages artifact 層級載入同一份實作。Mycopunk 程式及資料未修改。
- Grounded 使用既有純 merge／resolve core，build 從 Talos 來源發佈 `_site/shared/merge-core.js`。沒有複製維護另一套雲端系統、中央登入、同步或框架。
- 只有 `game-companion.grounded.progress.v1` 寫入新進度；原文及快照、通道也以本遊戲前綴隔離。測試只用合成資料和全新暫存 browser context。
- 每次修改在交易內讀最新值；世界／成員／周目已被其他分頁切換時停止舊畫面操作。兩分頁修改不同項可共存。
- 匯入先保存兩端原文、顯示差異、下載備份並確認，再以預覽原文做交易條件寫入。過期、quota、下載發起失敗皆停止。未知欄位及原文可由完整備份復原；不相容 schema 不用空進度覆蓋。
- 世界中的故事階段、步驟、條件、一般收集位置、個人標記和隨機乳牙依周目隔離；SCA.B／巨型乳牙／配方／生物卡採世界繼承紀錄。個人獎盃及強化筆記依玩家隔離，新世界不承接其他世界資料。
- 建立 NG+ 前下載備份並確認遊戲已啟動 REMIX.R，網站保留全部舊周目。這是清單建立流程，不會操作或備份遊戲存檔。

## 實際檢查

| 指令／檢查 | 結果 |
| --- | --- |
| `node games/grounded/verify.mjs` | PASS：46 盃且 1／3／10／32 分級、唯一 ID、25 步前置／關聯、53 項來源、無假座標、模型隔離、未知資料及語法 |
| `node scripts/verify.mjs` | PASS：所有必要遊戲模組資料驗證，包含 Grounded 與 Talos 原有保護 |
| `node scripts/verify-sync.mjs` | PASS：原同步三方合併、412／競爭、grant、quota、結果未知等合成回歸 |
| `node scripts/build.mjs` | PASS：6 模組，Portal 新入口、原創封面、共用模組均產生 |
| `node scripts/verify-site.mjs` | PASS：613 檔、122 個本機 HTML 連結，Pages `/game-companion/` base path |
| `node scripts/verify-grounded-browser.mjs` | PASS：P1／P2／P3／P4、安全匯入、跨分頁、新 context 完整備份往返、損壞原文匯出、8 頁 × 4 寬度 |
| `node scripts/verify-talos2-browser.mjs` | PASS：原有 Talos 操作、匯入／同步、跨分頁、資料隔離與畫面回歸 |
| `node scripts/verify-mycopunk-browser.mjs` | PASS：原有導航、收集、匯入保護、Worker、跨分頁、四寬度及隔離回歸 |
| `node scripts/verify-browser.mjs` | PASS：Portal 六模組／三個 Roadmap、既有 EDF 功能與同源隔離 |
| design-taste-frontend `lint.mjs`／`inspect.mjs --app` | PASS：0 FAIL、0 WARN；1440／768／390 實際瀏覽器截圖人工檢視 |
| `git diff --check` | PASS |

隔離瀏覽器使用現有 Playwright／Edge，`TEST_BASE_URL=http://127.0.0.1:4191/game-companion/`。預設沙箱 Edge profile 無法啟動，改以獲准的獨立暫存 Edge profile 及僅監聽 localhost 的伺服器驗證；沒有使用現有瀏覽器 profile、正式備份或真實帳號。Grounded 測試觀察到的 DB 僅本遊戲一個、localStorage／cache 空、外部請求零、page errors 零。

主要截圖及機器報告放在被忽略的 `outputs/grounded/`；設計報告在 `outputs/grounded/inspection/report.json`。桌面下一步／備份及四項摘要可見，手機有功能選單、兩欄摘要與完整控制；320px 亦無頁面溢位。地圖手機標籤放大並可橫向捲動，長清單獨立捲動。

視覺選擇：沿用既有 Game Companion 系統字體、色盤、244／195px 導覽與 1620px 工作區；skill 抽出的無文字 icon rail 與需求不符，採現有文字導覽。保留規格指定的五色文字警示符號，lint 註記此唯一使用者指定例外。人工檢視重點為下一步一鍵可達、真實 0 值、資料不齊標記、窄螢幕可讀及地圖群組不冒充座標；沒有增加照片或外部素材。

## 未完成資料與後續

1. 持續以可追溯來源補齊乳牙、SCA.B、資料、錄音、生物卡與地標全清單；完整前保持 `complete:false`。版本衝突先標示，不以目標數硬填。
2. 若取得合法且可靠的事實性位置資料，再加入精確點位及來源；目前 `mapPoint` 留空。NG+ 候選資料尚未建立，只有獨立計數／個人標記。
3. PS4／PS5 安裝 build、Underexposed 文案差異、多人個別跳盃、Report Card 版本例外及實際繼承需遊戲驗收。網站測試不代表遊戲已驗收。
4. 未來接入 Drive 須適配多世界／成員／周目逐項三方衝突及誤勾復原，並保留本次 OAuth grant 合成檔條件寫入／過期 412／競爭測試；完成前 `cloudWritesEnabled:false`。本次不操作真實 Google。
5. 已接入現有 Pages workflow 的建置及必要驗證，2026-11-04 已取得使用者 commit／push 授權，沿用 main 的 Pages 發布流程。部署結果需核對對應 GitHub Actions 和正式 URL，不以本機測試代替發布證據。
