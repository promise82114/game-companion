# 入口與兩款 Roadmap 介面驗證

實作日期：2026-10-31；發布整合：2026-11-01（Asia/Taipei）。使用者已授權提交、推送本批 UI 與文件，並直接發布至正式站試用。開始前四份 Markdown 的保存提交 `51d2c4a` 隨本次發布一併納入。部署結果以對應提交的 [GitHub Actions](https://github.com/promise82114/game-companion/actions/workflows/deploy.yml) 為準。

## 使用情境與方向

使用者希望不同遊戲的操作習慣一致，可從後面章節開始使用；提醒保留，普通瀏覽不需反覆確認。入口需要讓人認出遊戲與工具內容。

設計技能採 `framed-sheet`，seed `1783821664`，保留既有 Segoe UI／Microsoft JhengHei 與綠灰色；沒有重抽。淡色外框、白色工作區、低彩度選取狀態作為共用結構。目錄屬可篩選遊戲物件的 app home，依 app-screen 規則檢查。卡片中的封面是使用者要求的遊戲識別，沒有以裝飾性功能圖示取代內容。

產品盤點：

- 五款獨立手帳，不設中央進度。
- EDF 一、二代的方塊角色、救出／收集及關卡工具。
- Mycopunk 的機器人、真菌、升級與配裝。
- Talos II 的機器人、建築與解謎場景。
- Barnsworth 的小鎮、商店與小個子主角。
- 兩款 Roadmap 各八階段，總步驟分別為 57／100。
- 步驟與實際獎盃獨立，60／33 個本體獎盃。
- Talos 的三市長分歧與 PS5 手動備份註記。
- Thank Goodness 的十三組跨階段追蹤。
- 玩家可只看後期章節；章節選擇不能冒充完成進度。

想法：把五款遊戲各自的場景做成同一套 SVG 手帳封面，把攻略路線做成可以直接翻章的手帳。入口的實際互動是遊戲搜尋／工具類型篩選；Roadmap 的主要工作是選章、找下一步、勾選或查閱。

## 實際改動

- Portal：五張 600 × 360 原創 SVG、完整遊戲名稱、功能摘要、遊戲搜尋、收集／白金類型篩選與無結果提示。無額外產品依賴，沒有讀寫玩家儲存。
- 兩款 Roadmap：功能頁導覽、右上 Drive／備份還原、進度摘要、完整章節選單、本章提醒、搜尋／篩選、下一步的位置一致。手機可展開功能選單，44px 操作區保留。
- Talos：移除切章的阻擋對話框；只更新目前章節，不改早期步驟與既有確認歷史。三市長詳情預設收合，也可從「分歧追蹤」直接開啟。新增搜尋、待查證篩選及右上備份視窗，舊 `?view=backup` 入口仍保留。
- Thank Goodness：目前章節依正在瀏覽的選擇顯示；下一步從選定章節起找。整章離開提醒收合，步驟內的風險與查證標記保留。
- Thank Goodness SW cache 從 v1 升為 v2，只清本模組自己的舊 cache。攻略資料、進度 schema、穩定 ID、來源 manifest 與雲端安全程式沒有變更。
- 產物檢查器增加 query／hash 路徑支援，仍驗證本機目標存在及限制在 `_site/` 內。

## 圖像來源

`portal/covers/{edf-wb,edf-wb2,mycopunk,talos2,thank-goodness-youre-here}.svg` 全部是本次直接繪製的向量插畫，沒有下載外部圖片或使用官方封面。頁尾明示「本站繪製的遊戲主題 SVG 插畫」。沒有待替換的假玩家進度、數字或樣本內容。

## 版面檢查與回看

已以全新隔離瀏覽器檢查改版前後的 1440、768、390px 畫面，並回看三種尺寸的首屏與全頁 contact sheets。功能回歸另含 320px。所有資料皆為合成測試資料，不使用既有瀏覽器 profile 或正式備份。

| 畫面 | 改版前 FAIL／WARN | 最終 FAIL／WARN |
| --- | --- | --- |
| Portal | 0／2 | 0／1 |
| Talos II | 0／0 | 0／0 |
| Thank Goodness | 0／1 | 0／1 |

保留的量測提醒：Portal 的五款遊戲採捲動書架，首屏以兩款封面為主，可立即用類型篩選直達兩款 Roadmap；不把五款同時塞入小縮圖。Thank Goodness 的 `unused-canvas` 來自靠左的長篇攻略文字與靠右計數；實際卡片與欄位都貼齊工作區，不把文字拉開或強迫填滿整行。原有紅／橙風險符號是攻略狀態，依既有要求保留，以 `--allow emoji` 檢查；其餘量測沒有 FAIL。source lint 最終為 0 FAIL、0 WARN。

ROUND 1

Seen in one second: 入口的遊戲插畫，以及兩款 Roadmap 一致的白色工作區。
Idea (one sentence): 遊戲場景成為封面，攻略成為可直接翻章的手帳。
Live thing: 類型／搜尋篩選、章節直達、從本章開始的下一步。
Layout words by section: portal=書架 / roadmap=章節與步驟 / branches=展開追蹤。
Scores: design 7.2 · usability 7.4 · creativity 7.2 · content 8.0 → overall 7.3
Caps applied: app-screen 規則，不套用行銷頁的攝影／動畫門檻。
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. 390px 的頁面導覽與工具推低步驟（兩款 mobile-fold）：功能頁改成可展開選單、縮小進度摘要，搜尋／篩選／下一步並排。
2. 兩款章節選單與提醒順序不同（兩款 desktop-fold）：統一選章、提醒、搜尋、步驟的閱讀順序。
3. SVG 的 HTML height 屬性讓手機封面過高（portal mobile-page-01）：設為 width:100%、height:auto，保持 5:3 比例。

ROUND 2

Seen in one second: 每款遊戲的封面識別；Roadmap 的目前章節與步驟。
Idea (one sentence): 共用手帳外框承接不同遊戲場景，章節選擇與進度記錄分開。
Live thing: 搜尋與類型組合可縮到單一遊戲，Roadmap 可直接從後期章節開始。
Layout words by section: portal=書架 / roadmap=章節清單 / trackers=可展開路線。
Scores: design 7.6 · usability 8.2 · creativity 7.3 · content 8.0 → overall 7.7
Caps applied: app-screen 規則；沒有假資料或未接線按鈕。
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Portal 首屏仍無法同時呈現五款完整封面；保留書架與可直接篩選的入口，詳上方量測理由。
2. Talos 手機的狀態選單需另起一列；保留完整狀態文字與觸控寬度，不壓成圖示。
3. 長篇攻略仍需捲動；章節直達、搜尋與下一步已可定位，不為縮短頁面刪減攻略內容。

## 驗證結果

通過：

- `node scripts/verify.mjs`：五款模組資料、來源保護、既有 ID、獎盃／步驟／同步核心契約。
- `node scripts/build.mjs` 與 `node scripts/verify-site.mjs`：五款完整產物，590 檔案、102 個本機連結。
- `node scripts/verify-sync.mjs`：EDF 合成同步回歸。
- `TEST_BASE_URL=http://127.0.0.1:4198/game-companion/` 下的 `verify-browser.mjs`、`verify-talos2-browser.mjs`、`verify-thank-goodness-browser.mjs`、`verify-mycopunk-browser.mjs`。
- 新增的回歸涵蓋：目錄組合篩選／無結果、後期章節直接開始、重整保留章節、下一步不跳回早期、早期進度不代填、手機選單收合、共用位置的備份下載。
- 既有匯入原文保護、未知欄位、過期預覽、下載失敗、交易失敗、跨分頁、離線、合成 Drive 條件寫入與衝突測試維持通過。

畫面與量測檔放在忽略追蹤的 `.taste-skill/{before,final}/`、`outputs/ui/` 及各模組的 outputs。2026-11-01 發布前重新執行資料／合成同步、build、產物與 Portal／EDF／兩款 Roadmap 隔離瀏覽器回歸。正式 Google 與 PS5 實機尚未驗收；正式站檢查僅讀取網站資源與全新 context 的合成進度，不操作正式遊戲存檔。

## 2026-11-01 後續易用性調整

以下是 `f9180a2` 發布後的後續介面修改。使用者已於 2026-11-01 授權將本批修改與文件 commit、push 並直接部署至正式站；部署結果以對應提交的 [GitHub Actions](https://github.com/promise82114/game-companion/actions/workflows/deploy.yml) 為準。

- Mycopunk：遊戲目錄、語言、來源與查證、備份還原固定在頁面頂端工具區；備份最靠右，各功能頁皆可開啟。備份視窗沿用原匯出及保護式匯入，配裝配置依舊在配裝頁另行匯出。原 `styles.css` 與 534 個來源保護檔不變，新增 `companion-ui.css`。
- 兩款 Roadmap：工作區及上方資料工具列最大 1200px，於左側導覽以外的可用區置中。1920px 全新 context 實測兩者寬度均為 1200px、左緣 x=480，工具列與內容外緣一致。窄螢幕保留原響應式內距。
- Talos：移除步驟列尾的五選一下拉選單；點標題或勾選可完成，「略過／不確定／已錯過」改為標題附近的直接切換按鈕。同一個狀態再點一次回到未開始，`aria-pressed` 表達選取，畫面重繪後保留鍵盤焦點。狀態切換在既有交易內使用最新資料計算，筆記不被清除，獎盃與市長追蹤不連動。
- Thank Goodness SW cache 升為 v3，繼續只清自己的舊版本前綴。沒有增加 namespace、改 schema、改攻略或操作原 repo。

沿用 `framed-sheet` 方向與既有字體／遊戲識別，這次屬既有介面元件調整，沒有重抽方向或增加圖像。驗證與圖片位於 `.taste-skill/refinement-{before,after}/`、`outputs/ui-refinement/`。

通過 `verify.mjs`、`build.mjs`、`verify-site.mjs`（591 檔、104 本機連結），以及 Mycopunk、Talos、Thank Goodness 的既有隔離瀏覽器回歸。新增回歸驗證各頁可開備份、匯出原文保留、語言與來源工具、狀態鍵盤切換／取消／重整、可點標題完成、筆記保留與 1920px 閱讀寬度。320／390／768／1440px 無橫向溢出；既有未知資料、過期匯入、下載／儲存失敗、跨分頁、離線與合成 Drive 回歸保持通過。

三種尺寸的版面量測皆 0 FAIL；Talos 0 WARN，Thank Goodness 保留先前長篇清單的 1 個 `unused-canvas` 提醒。Mycopunk 前後皆保留原首頁的 4 個警告：原有小型大寫標籤、原品牌底色、4.4:1 的既有輔助文字及大字首頁標題。此次只調整工具元件，保留既有主體視覺；新工具列沿用字體，沒有新增字體警告。

ROUND 1 — 後續調整

Seen in one second: Mycopunk 右上資料工具與 Talos 標題旁的狀態操作。
Idea (one sentence): 把常用操作放在讀者正在看的地方，長篇攻略限制於固定閱讀寬度。
Live thing: 各頁備份入口、點標題完成、直接切換與取消步驟狀態。
Layout words by section: Mycopunk=工具列與索引 / roadmap=限寬章節清單。
Scores: design 7.5 · usability 8.4 · creativity 7.1 · content 8.0 → overall 7.7
Caps applied: app-screen 元件調整，原攻略視覺維持既有樣式。
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. 新 Mycopunk 工具列一開始引入第三種字體（desktop-fold）：改為繼承原字體，重驗後回到原有兩種。
2. Mycopunk 手機導覽較長（mobile-fold）：資料工具以可換行觸控列呈現，維持 44px 點選高度。
3. Talos 狀態操作比單一關閉的下拉選單多占一列（mobile-fold）：接受此閱讀密度，交換為免開選單、免移到列尾的一次點選。

## 2026-11-01 EDF 寬度與左側導覽對齊

接續已發布的 `b9f5711`。使用者指定兩款 Roadmap 直接跟隨 EDF WB1／WB2 的寬度規則，並要求 Mycopunk 主選單改放左側。使用者已授權將本批修改與文件 commit、push，並透過既有 main Pages 流程部署至正式站；部署結果以本批對應提交的 GitHub Actions 為準。

EDF 兩款的主內容最大寬度皆為 1620px，接在固定側欄後方，超過上限時保留右側空間。兩款 Roadmap 的主內容、上方資料工具列及側欄均已改成相同規則，取代上一批的 1200px 置中設定。

| 視窗寬度 | 側欄 | 主內容左右內距 |
| --- | --- | --- |
| 1500px 起 | 244px | 64px |
| 1101–1499px | 244px | 46px |
| 721–1100px | 195px | 26px |
| 720px 以下 | 手機導覽、內容左緣歸零 | 16px |

Mycopunk 五項主功能移入固定左側欄，選取項目有底色；裝備分類保留於可展開區塊。720px 以下由左側開啟原生 dialog，使用同一份導覽，不複製按鈕或 ID。開啟時聚焦目前功能，Escape 或選完功能即關閉；回到桌面時移回固定側欄。遊戲目錄、語言、來源、備份仍在右上資料工具區。Thank Goodness SW cache 改為 v4。所有進度 schema、namespace、攻略、來源 hash 與原 repo 保持不變。

通過：

- `verify.mjs`、`build.mjs`、`verify-site.mjs`（591 檔、104 個本機連結）與 `git diff --check`。
- Portal／EDF、Talos、Thank Goodness、Mycopunk 的隔離瀏覽器回歸；沿用合成資料，不讀取既有瀏覽器 profile。
- 新增四款模組於 1920／1500／1440／1100／900／768／721／720／390／320px 的實際版面比較：主內容左緣、寬度、max-width、margin、左右內距、側欄寬度與橫向溢出。兩款 Roadmap 與兩款 EDF 完全一致。
- Mycopunk 驗證主選單不在上排、五項按鈕直排、平板主選單位於分類之前、手機抽屜焦點／Escape／鍵盤選頁／收合與跨尺寸移回，以及原配裝 Worker、進度、匯入保護、備份、資料隔離。

畫面與量測位於 `.taste-skill/edf-alignment-{before,after,final}/`；手機抽屜與平板補圖位於 `outputs/mycopunk/`。最終三尺寸量測均 0 FAIL：Talos 0 WARN，Thank Goodness 保留長清單短文字的 1 個 unused-canvas 提醒；Mycopunk 保留既有首頁小型大寫標籤、品牌底色、輔助文字 4.4:1 與大標題共 4 個 WARN。此次導覽輔助文字已提高對比。靜態 lint 的 emoji 提醒來自既有品牌星號與勾選／關閉符號，保留其識別與既有語意；backdrop-filter 提醒實際是 `none`，用來取消來源 CSS 的模糊效果。

ROUND 2 — EDF 對齊

Seen in one second: 左側主功能與右側工作區，換遊戲時導覽位置一致。
Idea (one sentence): 用 EDF 的實際版面規則統一工作區，讓常用功能在固定位置直接可見。
Live thing: 左側功能切換、可展開分類與支援鍵盤的手機抽屜。
Layout words by section: 固定側欄 / 共用資料工具列 / 攻略與裝備工作區。
Scores: design 7.8 · usability 8.7 · creativity 7.1 · content 8.0 → overall 7.9
Caps applied: 沿用 framed-sheet（seed 1783821664），元件與響應式調整，沒有重抽方向或新增圖像；主體攻略與 Mycopunk 原首頁視覺維持既有樣式。
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. 平板繼承來源 flex order，主選單掉到側欄底部（mycopunk/tablet-fold）：明確重設順序，並新增實際位置回歸。
2. 195px 側欄的底部文字太靠螢幕邊（mycopunk、talos2/tablet-fold）：側欄水平內距改為 18px，主內容寬度仍與 EDF 相同。
3. Mycopunk 平板品牌副標擠成碎行（mycopunk/tablet-fold）：英中副標上下排列，保留完整名稱並重拍三尺寸。
