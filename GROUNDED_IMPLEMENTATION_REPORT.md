# Grounded 實作與驗證報告

## 1.1.2 白金流程稽核 · 2026-11-08

依 `GROUNDED_PLATINUM_UX_AUDIT.md` 先完成 P0 報告及 46 盃逐筆對照，再修正已重現的 Ominent 查找、Super Win 分類查漏入口、unknown 篩選、NG+ 乳牙摘要與第一輪未確認事項。補少量來源明確的前置／入口文字和蟻后卡片警示，保留仍待查證的路線；沒有大規模新增點位。

沒有更改 schema、穩定 ID、namespace、儲存／匯入／永久 inherited 分界，也沒有修改其他遊戲或共用 store。Haze 目標與文件仍獨立確認；新相關項可能使原先縮起的步驟重新展開，原有勾選不變。沿用既有閱讀收斂、備份與部署架構，使用者後續已授權 commit／push，沿用 main 的 Pages 流程；發布結果以對應 GitHub Actions 為準。

完整證據及未通過事項：[白金流程驗收](GROUNDED_PLATINUM_AUDIT_REPORT.md)、[資料覆蓋](GROUNDED_DATA_COVERAGE.md)、[情境測試](GROUNDED_UX_TEST_CASES.md)、[後續計畫](GROUNDED_FOLLOWUP_PLAN.md)。全量 99% 查漏、精確地圖與主機 46 盃仍未通過，不能以本機測試當作白金實機驗收。

## 1.1.1 漸進式收斂 · 2026-11-04

依使用者本次明確修改要求及 `docs/PROGRESSIVE_ROADMAP_UX.md`，修正 1.1.0 的「完成後仍一直顯示全文」：初始沒有必須點開的內容；一個步驟內的目標、相關獎盃與收集全數勾選後，才縮成名稱、狀態及事項計數。只完成目標、仍有未取得／待確認收集或獎盃時不收斂，不自動代填其他事項。這是閱讀呈現條件，不是新增遊戲獎盃或白金達成條件。

完成後可暫時回看，取消任一項就自動恢復全文。回看只存於頁面記憶體，重整重新依完成度判斷；搜尋暫時顯示完整內容而不改寫進度。不可逆／分歧警示在摘要外持續可見。章節導覽增加完成數，「返回遊玩進度」定位第一個尚未全部完成的步驟。

新增 Grounded 專用純衍生模組 `dist/roadmap-progress.js`，保留原有狀態與穩定 ID，不增加儲存旗標或遷移資料。進度更新在原位修改 DOM，步驟收合時焦點仍可操作，調整原處閱讀位置，不自動跳到下一步。其他遊戲正在進行的修改不包含在本次實作範圍。2026-11-04 使用者已授權 commit／push 本批 1.1.1，部署結果以對應 GitHub Actions 為準。

驗證通過：Grounded 單元／資料檢查、全專案 `verify.mjs`、build、verify-site、Grounded 隔離瀏覽器全回歸及 source lint。新增案例確認全新五個本章步驟均展開、只完成目標不收合、最後一項完成才收合、取消目標／收集／跨分頁獎盃即恢復全文、暫時回看／搜尋／章節跳轉不寫入進度、重整恢復收斂、原位 DOM 節點保留且勾選後焦點與垂直位置差小於 3px、重要警告可見及手機操作。既有匯入 quota／下載失敗／過期預覽／未知資料與 NG+ 保護亦通過。

完成／未完成混合狀態截圖：`outputs/grounded/progressive-desktop.png`、`progressive-mobile.png`；全新進度三寬度檢查在 `outputs/grounded/progressive-inspection/`。Inspector 延用完整閱讀長頁的 `below-fold` 例外，結果 0 FAIL／0 WARN；人工檢視確認初始沒有需要點開的攻略，完成摘要保留名稱、事項數與回看操作。

## 1.1.0 操作簡化 · 2026-11-04

依使用者後續指示，移除總覽的共同遊玩規則／今日建議，Roadmap 左側直接列出七章節。內容區不再顯示瀏覽章節或目標切換；25 步固定依「步驟目標、完整體驗、白金需求」全文顯示，完成後亦不收合。完整體驗文字是本站依既有內容整理的探索／閱讀建議，不增加遊戲達成條件、數量或位置。

原本跳頁的獎盃按鈕改成可直接勾選的名稱／條件清單，與獎盃頁共用原本狀態；同名獎盃出現在多步時即時互相反映。相關收集同樣可原處勾選，與三態收集頁、地圖連動。完成步驟不會自動代填獎盃或收集。

移除耗時、自訂備註、收集備註、地圖個人標記及世界／成員管理介面。schema／namespace／既有 ID、匯入保護和周目隔離不變；以合成 1.0.0 存檔驗證筆記、標記、額外世界／成員、未知欄位經操作和完整備份往返後仍保留，沒有既有資料遷移或刪除。本批調整與 1.1.1 一同依使用者授權 commit／push，部署結果以對應 GitHub Actions 為準。

本次驗證通過：`node scripts/verify.mjs`、`node scripts/build.mjs`、`node scripts/verify-site.mjs`（613 檔／121 個本機連結）、`node scripts/verify-grounded-browser.mjs`、設計 source lint 與 `git diff --check`。隔離瀏覽器涵蓋七頁 × 1440／768／390／320px、章節深連結／重整、手機鍵盤直達、同頁重複獎盃與兩分頁互相反映、收集三態、NG+、舊存檔完整備份往返，以及 quota／下載失敗／過期預覽／損壞原文保護；零外部請求與 page error。未修改其他遊戲的程式、共用 store 或雲端同步。

實際截圖位於 `outputs/grounded/streamlined-inspection/`，手機章節選單另存 `outputs/grounded/chapters-mobile.png`。設計 inspector 以 `--app --allow below-fold` 檢查三種寬度，結果 0 FAIL／0 WARN；`below-fold` 是依本次「全部展開、不收合」要求採用的明確閱讀例外。保留現有文字側欄、系統字體與色盤，警示用文字／語意色，不以色點增加閱讀噪音。下方保留 1.0.0 初次整合的歷史結果。

## 1.0.0 初次整合紀錄

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
