# Talos II Roadmap 查證與整合報告

日期：2026-10-31（Asia/Taipei）。本次只做 PS5 本體白金，允許劇透。本報告記錄本機與合成驗證，沒有進行遊戲實機測試或真實 Google 授權。2026-10-31 使用者已授權 commit、push 與正式部署，實際發布狀態以 GitHub Actions 為準。

## 已取得證據

### 2026-11-08 星星起點、遠距機關與跨題接線定位

玩家再次回報星星導引找不到位置。盤點確認：舊圖主要標領星雕像與跳題 Spark，沒有追逐起點、途中停靠與跨題觀察站位；僅把解法寫對，無法讓玩家在大地圖找到設備。本輪保留既有解法與進度，另外加入位置導引。

- 本體 24 條星星路線共 101 段，100 段有原創地圖 P 點。位置是已知地標旁的搜尋區或題內觀察站位，非實機量測座標；細線連到參考地標，藍虛線只表操作順序，未知段落不跨接虛線。
- 定位說明不受「拒絕謎語」開關遮蔽，完成星星後仍沿用原本收合。每段的「看位置」可直接選圖上 P 點；手機開啟地圖對話框，桌面沿用側欄圖。讀到星星時自動選路線，不要求每次手動切換。
- 跨題 Pandora 的相關正規／Lost 題內也有同一觀察點的入口，不必等到區域末端才查位置。由地圖轉到完整星星攻略後，可用瀏覽器返回原題；沒有另開收集進度。自然捲到頁尾及深連結的選圖時機另做回歸，避免仍停在上一顆星星。
- 星星路線暫時隱去無關收集物／橘紅 Spark，圖幅收近並放大 P 字號；區域總覽與正常收集圖保留。所有定位／選圖皆不寫進度，也不新增 101 個重複勾選。
- 比對十二區參考圖時確認 S2 Lost 位置配反。Question Block 在 Pandora 一側、Stowaway 在另一岸，已交換地圖坐標配對，保留兩個題目的既有 ID、解法與取得紀錄。

關鍵證據：

| 範圍 | 實際核對與來源 |
| --- | --- |
| 十二區相對位置 | 逐張檢視 [Cognition 原作者區域圖](https://steamcommunity.com/sharedfiles/filedetails/?id=3090253536)，只摘錄地標關係與搜尋區；不部署或嵌入原圖。 |
| N2 追逐起點 | [Mystery Manor N2 第 2 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_2/flooded_2.htm) 的起點段落及 Talos_2_1136.jpg：混凝土支架內有大型金色環架。補上 3 號→水壩→往 4 號岔路及岸邊找回光團的方法。 |
| N2 三座機關 | [N2 第 4 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_4/flooded_4.htm) 與 [Mauritsio 實玩指南](https://steamcommunity.com/sharedfiles/filedetails/?id=3067666650) 支持 1 號入口右岔、面南看 4 號左路後再走 Y 左支、過橋後塔右側小島。相對方向同時核對參考圖，避免把面南的左手邊畫成畫面左邊。 |
| N3 固定 RGB | [N3 第 2 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_2/north_3_2.htm) 與 Talos_2_1361.jpg：由 5 號入口看紅光源上方的柱頂設備，圖上只標 2／3／5 的觀察站位，不假造 RGB 柱底落點。 |
| N3 追逐起點 | [N3 第 3 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_3/north_3_3.htm) 與區域圖支持戶外支線遠端的水中人像；改明圖上 6 號右上方搜尋區，移除「7 號入口旁」式誤導。 |
| E2 接點外觀 | [Wiki E2](https://taloswiki.org/wiki/Wooded_Plateau#Star_monuments) 原始解法圖 1～3 與 [Graves 實玩指南](https://eip.gg/guides/the-talos-principle-2-east-2-star-statue-puzzles/)：白色裂岩頂、帶直立缺口與水平金屬線的混凝土柱、3 號前帶橢圓孔的楔形構造。中間柱的外觀與回溯方法可確認，平面落點仍待查證。 |
| E3 接點 | [Wiki E3](https://taloswiki.org/wiki/Eastern_Wetlands#Star_monuments) 的高柱、Straton 構造、戶外岩頂連線順序；補 3 號、7 號光影旁高柱與 6 號觀察站位。 |
| S1 接點 | [Wiki S1](https://taloswiki.org/wiki/Southern_Coast#Star_monuments) 原始解法圖 01／02：2 號終點下方銅牆、對岸薄岩層疊的紅岩尖頂，以及 4 號拱孔一側的觀察角度。 |
| S2、S3、W1、W2、W3 | 重新讀取既有各星星的 Mystery Manor／Wiki 來源位置段落；補上 Lost 背側峽谷、題內高台、石耳接點、牆洞與交通軌道的觀察／搜尋地標，不混用其他指南的搬設備替代解法。 |

驗證沿用既有 `verify.mjs` 及導航瀏覽器腳本：涵蓋 24 條 × 桌面／手機、每個可定位 P 點（100 × 2 次）、來源／未知落點不造點、沒有新進度欄位、沒有水平溢出，以及原有城市／巨構與匯入／mock Drive 回歸。結果檔位於 `outputs/talos2/stars/result.json`，原始研究參考只存在忽略的輸出資料夾。

剩餘限制：E2 林中中繼柱的精確平面落點、W1 上軌道的逐段岩石落點仍待查證。P 點區分搜尋區與觀察站位，不能當作測量座標或直接可走的路線；未進行 PS5 逐條實機驗收。2026-11-08 使用者已授權本輪 commit／push，沿用 main 的 Pages 流程；發布結果以對應 GitHub Actions 為準。

### 2026-11-08 剩餘 183 項逐步來源覆核（1.6.1）

接續下節 1.5.2 的 29 項，本輪先閱讀 N2、N3 尚未對照的 22 項，再逐題閱讀其他 161 項的現有操作與來源正文／拼塊截圖，檢查設備取得、遞孔／本人繞行、交換台物品、壓板接手、換色、光源與接收器、操作先後和終點狀態。合計 **212 項已做來源覆核，200 項有完整流程對照、12 項仍缺拼塊精確轉向，0 項尚未覆核**。這是公開攻略與畫面對照，不是 PS5 逐題實機通關，也沒有驗收真實 Google。

固定 ID 清單存於 puzzle-audit.js 的 reviewedIds；完整對照與細節缺口分開計數，新增題目不因有來源／做過文字檢視而自動視為已覆核。查證頁逐項列來源、已覆核或仍有缺口；不在每個遊玩題目塞固定覆核冗言。

**N2／N3 優先**：逐步重讀 [N2 第 1 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_1/flooded_1.htm) 至第 4 頁及 [N3 第 1 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_1/north_3_1.htm) 至第 4 頁，同區金門題另讀 Wiki 完整解法。N2 Absorption 補清 A／B 充滿與接手，Wellspring 分開紫屏內外連接器及兩窗路徑，Balance of Force 分開先選兩接收器、上方塊、開風扇與爬梯離開。N3 Possibilities 說清蓄能器會落地充藍；The Wall 分開兩側交換；Prison 明列三個方塊與四根連接器的取得／回收；Twice 明列門 1～4 與兩台干擾器接手；Up and Down、Propulsion、Elegance 分開扇葉、鑽孔器與孔洞消失前後。Pandora 三處準備也放回正規 2／3／5 當下，退出／重置後需恢復三段連線。上輪已更正的 N2-6 等 29 項維持原 ID 與路線。

本輪其他具體修正／補漏：

| 項目 | 核對結果與處理 |
| --- | --- |
| N3-4 Prison | 原作者 connector 3／4 表述混用；直接看 Talos_2_1380.jpg／1381.jpg 確認交換與方塊頂藍光配置。改統一採 [RagingTasmanian 完整路線](https://www.neoseeker.com/the-talos-principle-2/guides/Prison_Puzzle)：紅光中繼先換方塊、第三根改藍光，三塊回收後翻柵欄，再重建終點供電。 |
| BOOT-4 Static Pressure | [序章第 2 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/01_Calibration/callibration_2.htm)：人站風扇上的方塊，手中方塊放地面風扇板才升高；原摘要誤寫上層板。 |
| E3-4 Refraction | Wiki 完整解法要求首台先藍入紅出開門，第二台還須選藍接收器；兩者補回。 |
| E3-7 Backward Propagation | 第二台不是只選藍光源，還須接紅接收器，讓後續踩板能啟動自持。 |
| N1-6 Two-Body Problem | [第 3 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_3/desolated%20island_3.htm)：方塊移板 2、身體踩紅光源前板 3，再遞連接器，不能將兩板混為一板。 |
| S2-7 Delivery | [第 5 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_5/south_2_5.htm)：設備吸上牆後，先關風扇使旁邊屏障開，再取扇葉換壓。 |
| S2-8 Step and Release | 同頁：蓄能器選紅光源後，自己踩右板等充滿；左板由持續干擾的設備維持。 |
| S3-2 Passageway | [第 1 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/14_South_3/South_3_1/south_3_1.htm)：轉盤改入口／出口後，B 先恢復第一藍門，C 才能帶到內側接手。 |
| W1 Lost Jailbreak | Wiki 完整九步：第三房板上中繼先驅動平台，自己踩第四房板等平台到盡頭，再搬外側供電連接器到平台。 |
| W2 gold Hollow | Wiki 有兩套路線；統一採完整第二套，連接器先隔紫屏接紅光源，紅啟動器才有中繼輸入。 |
| W1 Prometheus | [區域路線](https://taloswiki.org/wiki/Western_Delta#Star_monuments)：另讀 [原作者 Elements 起點段](https://mysterymanor.net/walkthroughs/Talos_Principle_2/16_West_1/West_1_3/west_1_3.htm)：起點先開風扇，連接器驅動藍色平台，玩家跳上平台搭風升空再向上跳碰光；此準備也放回 W1-6 開頭。接著解完題，再追題外、終端、交通軌道與雕像。 |
| W2 Prometheus | [原作者第 5 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_5/west_2_5.htm)：展開風扇、階梯、峽谷；最後跳中崖外光團才會上送，不是任意跳下就到像旁。 |
| Miranda | [原作者迷宮](https://mysterymanor.net/walkthroughs/Talos_Principle_2/21_Free_Miranda/free_miranda.htm)：補高柵欄方塊前向左找通道，才到雕像房取可用方塊。 |

其他一般／Lost／金門題逐一比對 sources.json 所存 Wiki 正文（非 TODO、提示或影片搜尋連結）與原作者 75 頁公開圖文快取；提示不足者另讀原作者對應段落，例如 N1 High Ground、S3 Transfer／Convolution、W2 Slide／Two of Three、W3 Alternator／Hexahedral Stacking。未把不同作者中途設備配置混接。S1-8 另外重讀 [Gamepressure 不保留連線圖文](https://www.gamepressure.com/the-talos-principle-2/how-to-solve-switcheroo-puzzle/zc11118)，確認最後升高才選紅光源與接收器的既有特殊盃路線，補入逐題來源。

**其他追蹤項目**：12 區共 24 顆星的接點／開關／光團路徑逐一對照區域 Wiki 與原作者正文；N1 字母板另讀 GameSpot，S1 六根柱子座標另讀 EIP。12 座橋的選塊順序逐段對照。東／北側三色門、南側五銷與 Miranda 讀原作者完整段落；三部文字冒險重讀 Item Level 的全部選項，Atlantis 先前影片核對的 without 更正保留，沒有恢復文章的 with 誤植。Rand 測試維持原作者「測試後回話」路線。博物館三間展示題重讀 Wiki 完整解法；序章三面＋博物館六面拼塊，重新觀看九張原遊戲截圖，比對盤面尺寸、四格形狀與數量；既有九張原創字母格均相符，沒有發布來源圖片。

**保留待查證（12 項）**：E1／E2／E3／N1／N2／S1／S2／S3／W1／W2／W3 的 bridge，加 MEGA-S-pins。來源有選塊順序、指出哪些需旋轉，沒有逐一列固定旋轉次數；明示依當下綠色可放置預覽確認，不能把「轉」解讀成固定按一次。N3 bridge 的八塊原文皆直接放置，不列此缺口。來源頁的「待逐步覆核」與「已覆核但缺細節」已分開，不再拿 0 項未覆核表示沒有不確定性。城市地圖／分支及收集總量等既有待查證不因本輪解題覆核而取消。

內容 2026.11.08.4、模組 1.6.1；所有 212 個題目 ID、60 主步驟、schema 1、IndexedDB、備份及 Drive 契約保持相容。全模組資料／同步合成檢查、建置、產物（619 檔／121 本機連結）、Talos 完整隔離瀏覽器與導航六寬回歸通過。另以新 context 核對 59 項（含 N2／N3 全項、歷次修正與待查證題）的桌面／手機解法、來源分類與零溢出；網站測試不代替遊戲實機通關。正式發布依本次 main 提交的 Pages 結果。


### 2026-11-08 全表風險檢視與逐步來源覆核（1.5.2）

使用者擔心 N2-6 之外仍有漏步。逐一閱讀本體 212 個追蹤項目的現有操作文字，檢視紫屏／孔洞搬運、壓板換物、蓄能換色、反相／轉換器來源與前後設備狀態；**這只是全表文字風險檢視，不能當成 212 題都已與來源完整核對或實機通關**。本輪選出 29 項逐步比對原作者圖文／Wiki 正文，精確 ID 存於 `dist/puzzle-audit.js`；其餘 183 項仍待逐步覆核。既有 TEXT-atlantis 的 confirmed 僅有其中英文句子的畫面證據，也不因此把整題所有步驟算進這份逐步覆核清單。

本次新增修正共九項，分類如下：

| 題目 | 發現與處理 |
| --- | --- |
| E3-6 Hidden | 「移到紫屏另一側」容易誤導抱設備穿屏；依 [rev 6765](https://taloswiki.org/index.php?title=Hidden&oldid=6765) 補明沿走廊／藍門繞行，再搬兩件設備壓終點兩板。 |
| N2-3 Crossing | 蓄能器與方塊需分兩趟搭風取回；換色前要由內側干擾器接手開門，依 [原作者第 1 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_1/flooded_1.htm) 展開。 |
| N2-8 Remember | 送設備跨紫屏時須先疊方塊＋蓄能器再踩內風扇板；搬走蓄能器後要重新開門，再用轉向接收器／連接器接手，依 [第 4 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_4/flooded_4.htm) 補齊。 |
| S1-3 Through the Wall | 「利用孔和兩台傳送器搬運」不足以操作；依 [rev 4687](https://taloswiki.org/index.php?title=Through_the_Wall&oldid=4687) 分開隔孔回收兩台、留戶外中繼與攜鑽孔器繞行。 |
| S1-6 Translocator | 交替換壓的概括不足；依 [rev 4412](https://taloswiki.org/index.php?title=Translocator&oldid=4412) 與 [原作者第 4 頁](https://mysterymanor.net/walkthroughs/Talos_Principle_2/12_South_%201/South_1_4/south_1_page_4.htm) 補三塊板的換物及高台先後。 |
| S1 Lost Aerial Warp | 舊五句略過扇葉跨藍門、第二方塊回收及兩座外風扇；依同一作者第 4 頁分配 F1～F4、A～C、H1／H2 的攻略辨識標記，展開同一路線，沒有把不同攻略的中段配置混接。 |
| FINAL-d3 | 第四個總輪盤被寫在綠門開啟／兩身體會合之前；依 [終局原作者](https://mysterymanor.net/walkthroughs/Talos_Principle_2/22_Free_Athena/free_athena_1.htm) 將 RGB 產綠、隔孔遞連接器與原身體過門放回本段。 |
| FINAL-d4 | 接續前段已開綠門，只處理兩身體、方塊及托盤疊高至第五個總輪盤，避免重複前段工作。 |
| FINAL-u4 | 本頁順序已在 U2 將 RGB 換回反相器、U3 已替啟動器供藍；原文要求再換一次互相矛盾，改為保留藍線移啟動器到最後門。 |

其他疑似問題沒有憑通用規則硬改：N3 Transmission 的抱干擾器從屋頂孔落下，以及 S2 Other Side 的重力穿孔，原作者確有這些特殊操作；不能只用「孔通常拿來遞設備」判錯。W3 Mobile Instruments 依同一圖文走托盤托起方塊＋連接器，沒有混入早期翻出謎題的漏洞路線。29 項來源對照包含九項新增修正、上輪 N2-6 與其餘 19 項核對；未發現差異的項目不改成成功保證。

修正數九項包含漏步／易誤讀與終局順序矛盾，不表示九題原本都必然無解，也不把其餘 183 項宣稱安全。查證頁移除「0 項仍有缺漏」的誤導性總結，改為分開顯示全表文字檢視、29 項來源逐步對照、183 項待覆核；逐題列狀態與本輪修正原因。未在遊玩頁添加重複提醒或新操作。覆核資料與玩家進度完全分離；所有題目／步驟 ID、schema、IndexedDB 與 Drive 契約不變。

驗證：全模組 `verify.mjs`、建置、產物（619 檔／121 本機連結）、Talos 完整隔離瀏覽器及導航六寬回歸均通過；新增覆核紀錄唯一性／有效 ID、未來新題不自動標為已覆核、來源頁總數與逐題層級一致的回歸。一次性新 context 逐一開啟九項修正於 1440／390px，操作清單與來源完整顯示，沒有水平溢出或 page error。這些是資料與網站功能檢查，不能代替遊戲解法驗證。

### 2026-11-08 N2 正規 6 Reconnaissance 解說修正（1.5.1）

使用者實際遊玩指出解法不清楚。舊四句摘要省略先空手穿紫屏拿鑽孔器、搬 RGB 時必須經小房藍門→藍光源房→內側側門、兩塊壓板換物的順序，且沒有說清單一藍輸入尚不能產紅；不是單憑舊資料宣稱遊戲路線失效。已以相同 `N2-main-6` 改為逐步操作，A／B 明示為網站辨識標記。

依 [Dick Leeuw／Louis Koot 實玩圖文](https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_3/flooded_3.htm) 與 [Talos Wiki 房間配置 rev 5324](https://taloswiki.org/index.php?title=Reconnaissance&oldid=5324) 核對。瀏覽器直接觀看前者 `Talos_2_1229.jpg`（轉換器小房與雙紫屏）、`Talos_2_1236.jpg`（RGB 壓內板、直接選藍光源）、`Talos_2_1243.jpg`（綠蓄能器供 RGB 產紅、普通連接器另接終點藍），沒有複製或發布圖片。

本版維持原作者的 RGB 壓內側 B、鑽孔器壓入口 A 配置；Neoseeker 搜尋摘要另有普通連接器壓 B、再供 RGB 的解法，但正文 403，沒有把兩套中途配置混接。新增本題查證日期與來源，維持共識標記；未在 PS5 實機操作，也沒有猜測控制器按鍵。schema、儲存、同步與其他題目內容不變。

先前 `ac9846c` 的 1.5.0 發布已於本輪查詢確認 Actions 成功、正式站實際為 1.5.0；不再沿用 11/5 當時排隊的結論。

本輪通過 `scripts/verify.mjs`、`scripts/build.mjs`、`scripts/verify-site.mjs`（618 檔／121 本機連結）與一次性隔離瀏覽器檢查（1440／390px）：解法關閉時不輸出操作 DOM、開啟顯示十步與來源、原 ID 完成後收合／重載仍保留、獎盃不代填、頁面無錯誤／水平溢出。沒有新增鏡像文案的永久測試或改動 renderer。

### 2026-11-05 城市回訪、巨構行走指引與預設地圖放大（1.5.0）

內容 `2026.11.05.1`。使用者授權實作、測試、commit、push 與正式部署。保留已發布 58 個主步驟及全部 212 題的 ID，新增北側巨構／西側救援兩步，共 60 步、26 片段；沒有調整 schema 1、IndexedDB、匯入或 Drive adapter。31 個路標以 `steps[waypoint-ID]` 沿用既有狀態保存；父項不代填，舊完成也不自動填新路標。

**東側路線**：依 [Dick Leeuw／Louis Koot 東側上篇](https://mysterymanor.net/walkthroughs/Talos_Principle_2/06_Megastructure_East/megastructure_east_1.htm)、[下篇](https://mysterymanor.net/walkthroughs/Talos_Principle_2/06_Megastructure_East/megastructure_east_2.htm) 的逐段文字與遊戲畫面核對入口大廳四側口；L1 的 NOEMA-01 去程 Melville 使用中，回程才讀 Rust；L2 Byron 與 R1 水池 NOEMA-2 是盡頭，R2 等遠端開門後才深入。畫面 `Talos_2_757.jpg` 可辨識面向電梯的四口關係。入口／中央區分圖，中央按照同一攻略綠→紅→藍，完成仍須進三色門讀 NOEMA-03，再回 L1、VTOL、基地交通艙 N1。橋塊已提供，不誤導回戶外收拼塊。

**其餘巨構**：同作者 [北側上篇](https://mysterymanor.net/walkthroughs/Talos_Principle_2/10_Megastructure_North/Structure_North_1/mega_north_1.htm)、[下篇](https://mysterymanor.net/walkthroughs/Talos_Principle_2/10_Megastructure_North/Structure_North_2/mega_north_2.htm) 確認正前階梯的 Door override、Byron 自行啟動紅光、玩家藍／綠、事故後撤離再回城；[南側上篇](https://mysterymanor.net/walkthroughs/Talos_Principle_2/15_Megastructure_South/megastructure_south_1.htm)、[下篇](https://mysterymanor.net/walkthroughs/Talos_Principle_2/15_Megastructure_South/megastructure_south_2.htm) 確認入口右終端／左空井、電梯／纜車、先拉正面拉桿出現 0/5、Yaqut 操作攻略第 4 銷、5/5 再拉並原路離開。五銷仍共用原解題項目，不冒充新增五個已發布謎題 ID。[西側救援與回城](https://mysterymanor.net/walkthroughs/Talos_Principle_2/19_Megastructure_West/megastructure_west_1.htm) 與 [最終流程](https://mysterymanor.net/walkthroughs/Talos_Principle_2/22_Free_Athena/free_athena_1.htm) 分開，避免把救 Byron 與雙世界八輪盤混在一起。室內圖僅畫拓樸／流程；沒有未核實的北向、完整平面與樓層比例。

**城市與基地**：以 [Cognition 城市圖](https://steamcommunity.com/sharedfiles/filedetails/?id=3090253536) 的三次到訪標記核對 Purple、Rand、Cornelius、Schuyler、Damien、Atal、Malduc、Neith 與城市地標；直接觀看作者圖，未下載、部署或複製圖像。[初訪圖文](https://mysterymanor.net/walkthroughs/Talos_Principle_2/02_New_Jerusalem_1/jerusalem_1_1.htm) 補 Josephus／Melville 停電／塔上左轉 Doge 與簡報、館內 Rand 終端，及基地與 VTOL 的區別。[第二次回訪](https://mysterymanor.net/walkthroughs/Talos_Principle_2/10_Megastructure_North/Structure_North_2/new_jerusalem_2.htm) 核對先向 Neith 要工作終端許可、Notes／Rec_final_2，再 Thecla、城市探索與政治對話，最後簡報登機。該作者走 Helga 配對，不能把其個別代碼當成 Rand 路線通用答案；本版只標位置。Act V 的 `Talos_2_3098.jpg` 與 `Talos_2_3100.jpg` 可辨識 Melville 花圃涼亭、Yaqut 環形階梯，但不足以鎖定城市座標，所以只在流程圖與文字提醒黃色三角，城市圖不落假點。基地將交通艙／VTOL、Golden Gate／星星神殿分開辨識，不把 24 星誤寫成黃金門條件。

**更正舊結論**：本報告 1.4.0 區段與舊版獎盃摘要將 Overload 放在西側，是錯誤。查閱 [SuperSoluce 作者 E2 圖文](https://video-game-guide-walkthrough.supersoluce.com/solution/the-talos-principle-2-guide-walkthrough/collectibles/tp2-lost-labs/lost-lab-wooded-plateau-east-2/) 明列最深處首台終端 Schematic_108、Miranda 幻象後跳 Overload；已移至 E2 的主步驟、獎盃取得條件及驗收文字。西側仍有劇情過載，但不把它當該獎盃的首次觸發。

**呈現與驗證**：沿用 design-taste-frontend 的既有 app 樣式、字型與色彩；桌面原 300px 地圖改為 clamp(400px,31vw,520px)，平板／手機直接顯示行內圖，仍有常駐 modal。14 張新增圖加戶外 12 張共 26 張；圖層隨路標／解題閱讀切換，手動選圖不立即被觀察器改回。行走指引即使關閉「拒絕謎語」也顯示，設備解法仍由開關控制；路標完成可收合／回看、保留焦點與未知資料、支援下一步與深連結。

新增回歸 `scripts/verify-talos2-navigation-browser.mjs`：六寬 1440／1280／1024／768／390／320 無溢出、行內地圖尺寸、14 張 SVG 標籤邊界、分次 NPC、未知位置不落點、三色題完成後仍返回終端、北側舊題深連結、路標收合／取消／焦點／重載／未知欄位保留、手機定位與 Escape，全部通過。既有 Talos 瀏覽器回歸通過，含合成匯入／同步／配額／跨分頁隔離。Source lint 0 FAIL／0 WARN。正式發布以本次 commit 的 Pages 結果為準；所有測試均為合成資料及新 context，不是 PS5 或真實 Google 驗收。

本輪最終檢查：`node scripts/verify.mjs`、`node scripts/verify-sync.mjs`、`node scripts/build.mjs`、`node scripts/verify-site.mjs`（618 檔／121 本機連結）、既有 Talos 完整瀏覽器回歸及新增導航回歸全部通過。東側頁三寬設計 inspector 為 0 FAIL／0 WARN，已檢視桌面、平板、手機截圖與長頁閱讀圖。

**保留待查證**：北側完整撤離轉角／樓層、南側四份文字與每台終端的逐一對照、Cornelius 工作電腦房內座位、工地精確入口、Act V Melville／Yaqut 地理座標、早期限定事件能否在 Act V 補拿；各次回訪人物／同行條件不保證跨分支通用。

### 2026-11-04 獎盃條件、分章與漸進式收斂、區域 SVG（模組 1.4.0）

內容版本 `2026.11.04.4`。本輪使用者明確要求實作分章、完成收合與地圖，故依本輪指示直接實作，取代 `docs/PROGRESSIVE_ROADMAP_UX.md` 第 7 節的第一階段唯讀流程；沿用該文件核心互動與驗收規則。只改 Talos 模組，沒有將其他遊戲轉成共用框架。

**獎盃條件**：一般 in-app browser 正常讀取使用者提供的 [Exophase 繁中清單](https://www.exophase.com/game/the-talos-principle-2-psn/trophies/zh-TW/)，按同一 `/trophy/` 連結 ID 配對原有中英名稱。60 盃說明逐字保存，等級核對為 1 白金／1 金／6 銀／52 銅；DLC 9 排除。說明原文與自有攻略摘要分開保存於 `trophy-guide-data.js`，官方 PSN 數字 ID 仍為 null。三個特殊題 Seesaw、Loop、Switcheroo 的既有完整操作也在獎盃頁直接呈現，沒有將未查明的重置補拿條件改成保證。

衍生計數包含兩種錄音各 12、實驗室 12、光影 20、文字目標 30、遺物目標 10、第一件／第一個的 1、三部文字冒險、120 個標準謎題、12 個黃金謎題、24 顆星星及白金所需其餘 59 盃。標準 120 採 [Hanni 親自遊玩指南](https://steamcommunity.com/sharedfiles/filedetails/?id=3069750588)明列的 main＋lost 定義（96＋24），不是僅將介面正規的 96 題當作全部條件。社群手動實讀數另計 10，避免混入終端文字。任何進度計數都不自動授予或勾選實際獎盃。

**順序調整**：從 E1 先說明第一件遺物 Discovery／首座 Pandora；E2 提醒首座 Sphinx，並將 Doge 學者配對提醒提前到 E2 起（不同指南的具體區域仍有衝突，不固定等 E3）；E3 第 2 題前第一個 Future Cat 對應 Remnants of the Past，全部 20 個才是 Mnemosyne。Seesaw／Loop、Switcheroo、N2 調查、W2 入口備份均放在相關區域前；前導文字區分「先閱讀提醒」與「事件出現時操作」，不要求尚未觸發的私訊先完成才解題。W2 也提醒最後一個標準題可能取得 Puzzle Fiend，P7 是驗收。Overload 在西側巨構救援後的過載／回城節點標示，不再僅於最終收集階段出現。

**地圖查證**：找到作者 [Cognition 的十二區完整地圖指南](https://steamcommunity.com/sharedfiles/filedetails/?id=3090253536)，一般瀏覽器逐一開啟 E1、E2、E3、N1、N2、N3、S1、S2、S3、W1、W2、W3 的實際地圖，核對交通艙、橋、塔、謎題編號、實驗室、T／L 音訊終端、光影、雕像及既有 19 個遺物候選點。每張來源圖 URL 保存於 `region-maps.js`，查證日期 2026-11-04。作者說明地圖依抵達朝向配置，不是統一正北；亦說明物品已在前區取得後，替代出現點不再顯示。這比籠統寫成隨機出現更明確。

網站自行用線段、圓點與文字畫 SVG，摘錄地標事實與相對關係，沒有部署原圖、重用作者圖示或地形背景。距離、轉彎、高低差與未列小徑未逐一測量，不當成精確導航或 GPS。圖上包含十二區全部 132 個謎題位置、24 座雕像、56 個固定收集點、19 個已知遺物候選點、24 個可選 Spark 參考點與十二個戶外文字終端參考點；後兩者不宣稱涵蓋全部文字內容，也不納入固定 80 項。N1／W3 遺物位置和每區文字總量仍待查證；本輪沒有新增城市／巨構地圖或宣稱 PS5 實機走完所有路線。

**介面與相容**：`navigation.js` 將原 58 個主步驟一對一分到 24 個片段。當前章節與片段保存為閱讀位置，實際勾選／區域計數另記 `settings.playAnchor`；前看不代填。搜尋只呈現跨章節結果，選中再進該片段。主步驟、謎題、固定收集完成後收斂，臨時展開只用記憶體 Set；取消完成復原，舊 skipped／unknown／missed 仍顯示未開始。重要警告不因完成而消失，父項完成不代填子項，尚缺數量可見；深連結與下一步可展開目標及父項。勾選位置在重繪後保留；頁尾收合時用必要尾部空間避免視窗被文件高度夾回，展開／導覽會釋放。

桌面地圖固定於正文右側，手機使用常駐按鈕與原生 modal；具全圖／放大、鍵盤定位選單、標記跳轉及閱讀位置高亮。P7 黃金清單也能切換相應區域。沿用既有品牌、字型及框架色，沒有重新抽取樣式或新增套件。IndexedDB、schema 1、所有已發布 ID、Auth／Drive adapter、手動同步及保護式匯入不變；新增設定由原三方同步群組傳遞，未自動上傳。

十二張示意圖另依來源羅盤加入概略 N 箭頭，不宣稱精密測角。變更來源 lint 0 FAIL／0 WARN；Roadmap 三寬 inspector 0 FAIL／0 WARN，獎盃頁 0 FAIL／1 WARN（unused-canvas）。保留該警告的理由：取得步驟採單欄閱讀並限制行長，避免寬螢幕把中文段落拉成難以追讀的長行。桌面、平板、手機截圖已逐一檢視，固定地圖、片段導航與閱讀欄的邊界一致；數量由同一份進度衍生，沒有展示用假資料。

資料與隔離瀏覽器回歸涵蓋：24 片段各步驟唯一／58 ID 保留、來源說明與等級、衍生總量、提醒先於區域、十二張圖與全部目標有效、未完成直接閱讀、父／子勾選收合／取消／臨時展開不寫進度、單題與整區收合的畫面座標穩定、閱讀與遊玩返回點分離、跨章搜尋／深連結、桌面固定圖、手機全圖／放大／Escape／標記跳回、P7 地圖切換、獎盃搜尋／篩選／收集連動，以及原有未知資料、匯入、跨分頁、配額與合成同步防護。測試仍只使用全新 context 與合成資料；實際 Google 與 PS5 未驗收。

### 2026-11-04 區域收集數量與位置（模組 1.3.0）

內容版本 `2026.11.04.3`。將抽象探索提醒改成各區直接可勾選的清單，另加「收集清單」總覽。依 [Hanni 的親自遊玩圖文](https://steamcommunity.com/sharedfiles/filedetails/?id=3069750588)逐項擷取 56 個固定項目的位置、種類與第一張對應位置圖，再以自有中文摘要整理；每項保存來源與圖片 URL，沒有將外站圖片複製到部署產物。來源一致性標為 `consensus`，沒有宣稱逐張重走轉角或 PS5 實測。

| 固定類型 | 各區數量 | 全域數量 |
| --- | --- | ---: |
| 失落實驗室 | 每區 1 | 12 |
| Trevor 錄音 | 每區 1 | 12 |
| Lifthrasir 錄音 | 每區 1 | 12 |
| 人物光影 | E1／E2 無，其餘每區 2 | 20 |
| 星星 | 每區 2，共用既有解題勾選 | 24 |

固定追蹤共 80 項；E1／E2 各 5 項，其餘每區 7 項。區域確認由這些勾選衍生，不額外增加確認操作；不自動完成主步驟或獎盃，也不從舊版區域完成推算已取得物品。W2 實驗室仍直接顯示進入前先備份警示。錄音檔名編號可能受收集順序影響，沒有將指南編號當作固定辨識條件。

文字與遺物以各區實際數量手動記錄，文字另有城市／巨構欄。30 份文字、10 件人類遺物是獎盃目標，不能當作遊戲總量；不計入固定 80 項。各區文字總量尚未核實。Hanni 提供 19 個遺物候選位置，指南註明出現位置可能變動，不能把候選點數當成本區必有數量。額外核對 [Game of Guides／SuperSoluce 的作者攻略索引](https://video-game-guide-walkthrough.supersoluce.com/solution/the-talos-principle-2-guide-walkthrough/collectibles/tp2-human-artifacts/)，其區域索引同樣沒有 N1／W3；這只能證明現有指南未列，不能證明遊戲沒有。兩區仍明示「位置待查證」，允許記錄實際發現數量。

新資料放在 `collection-data.js`，呈現／衍生統計放在 `roadmap/collections.js`。沿用 schema 1 的 `steps['collectible-'+id]` 與 `settings['collection-text-'+region]`／`settings['collection-artifact-'+region]`。星星直接沿用 `steps['puzzle-'+id]`。IndexedDB、Auth／Drive adapter、namespace、保護式匯入及同步群組均未變，沒有資料遷移或自動雲端寫入。

資料驗證涵蓋 12 區／56 新項目／19 候選點、唯一來源圖片、每區數量、固定合計 80、衍生收齊與手動計數隔離。隔離瀏覽器涵蓋勾選／重整／鍵盤焦點、區域及全域合計、星星雙向連動、負數拒絕、保護式匯入後保留新欄位、深連結與下一步回到未收集項目。1440／768／390／320px 無水平溢出，桌面、平板、手機截圖已檢視；來源 lint 與三寬 inspector 均為 0 FAIL／0 WARN。測試只使用全新 context 與合成進度；PS5 逐點導航與真實 Google Drive 未驗收。

### 2026-11-04 區域探索動作說明（模組 1.2.3）

內容版本 `2026.11.04.2`。原句把 Lost Lab、終端、錄音與「過去顯現」合併成抽象待辦，沒有解釋辨識方式與操作。各區改為逐項說明：Lost Lab 是場外實驗室、不是 Lost 1／2 謎題；進入探索。終端是電腦，操作並逐份開啟文字檔。錄音在終端選單下載，Trevor／Lifthrasir 每區各一份。過去顯現改稱過去人物光影，靠近碰觸觸發對話。

核對 [Hanni 的收集清單與終端操作說明](https://steamcommunity.com/sharedfiles/filedetails/?id=3069750588)、[Wiki 的光影說明](https://taloswiki.org/wiki/Remnants_of_the_past)與既有 Xbox 指南可讀索引。光影從 E3 起才出現；E1／E2 明示不用找，其餘 10 區各兩處。使用半透明人物光影描述，不將不同來源的紫／紅或藍／橘顏色寫成唯一辨識條件。E1 另採 Hanni 的塔左側、Prometheus 雕像附近作實驗室定位；W2 排除一般「先進實驗室」指示，先備份再進。沒有自行指定未核對的 PS5 按鍵。

P7 收集核對採同一組動詞，既有步驟／獎盃 ID、進度、IndexedDB 與同步實作不變；沒有把這次術語與動作說明宣稱為所有戶外收集點的完整導航或 PS5 實機驗收。

全模組資料、建置、產物與 Talos 隔離瀏覽器回歸通過；另以全新 context 核對 E1／E2 無光影、E3 碰觸人物影像、W2 先備份才進實驗室，以及四區於 1440／390px 無水平溢出。E1、W2 手機畫面已人工檢視；測試只用合成進度。

### 2026-11-04 Purple 位置更正（模組 1.2.2）

內容版本 `2026.11.04.1`。依使用者實際遊玩回饋，撤掉 Purple 的「博物館後方」位置，改成 **Archaeological Gardens（考古花園）**。原敘述沿用 Hanni 的 behind the museum，缺乏可辨識路徑，不足以帶玩家找到 NPC。

重新讀取來源並以一般瀏覽器直接檢視 [Hanni 的遊戲場景圖](https://images.steamusercontent.com/ugc/2158973210210926694/C333728F9FDA833F84EDDAB95BD96076D8D566BF/)：可見藤蔓舊磚牆、拱形開口、棕櫚樹與短階梯，Purple 在階梯上方。以這些可見地標重寫步驟；另以 [Xbox 指南的可讀索引](https://www.xboxachievements.com/game/the-talos-principle-2/guide/)提供中央塔電梯出口向左、城市西側的方向，[FreedSquare4945 的玩家指南](https://www.trueachievements.com/a407930/excellent-achievement)支持考古花園名稱與明確給保留／更換聲音建議。兩站正文仍不可讀，未繞過存取限制，也沒有將搜尋索引冒充逐幀路線核對。

`purple` 步驟與獎盃 ID 保留；來源加入實際場景圖與玩家指南，位置／操作標為攻略共識，PS5 英文逐字與回訪補拿仍未實測。沒有更動任何玩家進度、IndexedDB 或同步機制。

全模組資料、建置、產物及 Talos 隔離瀏覽器回歸通過；另以全新 context 核對 Purple 的地標指引、舊敘述移除、來源圖連結，以及 1440／390px 無水平溢出，手機畫面已人工檢視。僅使用合成進度，沒有操作正式個人資料。

### 2026-11-03 二態完成勾選／Atlantis 實際畫面核對（模組 1.2.1）

內容版本 `2026.11.03.5`。依使用者要求，步驟移除略過、不確定、已錯過操作，三市長路線也由多狀態選單改為完成核取方塊。只顯示「未開始／完成」，以核取方塊或標題切換；重繪保留鍵盤焦點，步驟與分支仍各自記錄。

保留 schema 1、舊狀態 enum、ID 及所有未知欄位，不批次改寫舊進度。舊 `missed`／`skipped`／`unknown` 顯示為未開始並納入下一步／未完成篩選，勾選後才寫 `completed`、取消勾選才寫 `not_started`。匯入與 Drive 仍能保留舊狀態原文及附加欄位；IndexedDB、namespace、Auth／Drive adapter 及保護式同步未改。

**Ghosts of Atlantis 原文已確認**：直接以一般瀏覽器播放 [Game Guides Channel 的實玩影片](https://www.youtube.com/watch?v=pB1VTo02kB4&t=239s)，略過廣告後檢視 03:49 的底部可選句與 03:59 的終端已選取紀錄。完整文字為「Then find another way to witness the Sublime without being annihilated.」。畫面確認是 **without**，因此 [Item Level](https://itemlevel.net/the-talos-principle-2-all-text-adventures-solution-text-adventurer-achievement/) 的 with 是誤植。已補入該步詳細解法、加入帶時間來源、移除 `pending` 並將該題標為 `confirmed`；逐字畫面核對限這一句，其餘選項鏈仍為既有攻略摘要。不是僅依搜尋結果或其他文章推斷，也不是 PS5 實機驗收。新加入的 212 個解題項目目前沒有未補內容，既有三市長與 PS5 的未核實項目仍保留。

本輪資料與瀏覽器回歸加入：三種舊狀態可保留、顯示未開始、下一步不跳過；步驟與分支的勾選／取消／重整／鍵盤焦點；舊筆記與未知欄位保留；Atlantis 原文、時間來源與待查證標記移除。全模組資料、合成同步、建置、產物與 Talos 隔離瀏覽器檢查通過，使用全新 context 與合成進度。真實 Google Drive 與 PS5 未測。

變更來源 lint 與 1440／768／390px inspector 均為 0 FAIL／0 WARN；桌面步驟及手機市長路線畫面已人工檢視，320px 解法與清單無水平溢出。

### 2026-11-03 全本體逐題路線／拒絕謎語（模組 1.2.0）

內容版本 `2026.11.03.4`。依使用者補充的「本體全部謎題、沿路知道現在解什麼與怎麼解」，新增 `dist/puzzle-data.js` 與 `dist/roadmap/solutions.js`，將逐題清單接回既有 Roadmap，另增 `prometheus-rescue` 主步驟，保留原 57 個已發布 ID。目前八階段 58 主步驟，212 個可獨立勾選的解題項目；這是工具拆分數，不宣稱官方共有 212 題。

| 範圍 | 項目數 | 來源與查證方式 |
| --- | ---: | --- |
| 12 區正規、遺失與金門 | 132 | 各區 8＋2＋1；[Talos Wiki](https://taloswiki.org/wiki/The_Talos_Principle_2) 逐題條目與 revision、[Dick Leeuw／Louis Koot 的完整實玩圖文](https://mysterymanor.net/walkthroughs/Talos_Principle_2/talos_2_index.htm)，來源 URL 保存在每題資料中 |
| 序章與拼門 | 15 | 12 題操作摘要、3 面四格拼門排法，對照 Wiki 條目與遊戲畫面 |
| 橋樑、星星 | 36 | 12 組橋樑的分段順序、24 顆星星的路線／光線／開關；每組分開記錄 |
| 巨構、Miranda、終局 | 16 | 東巨構 3、北巨構 2、南巨構插銷 1、Miranda 1、最終入口及八輪盤 9，依圖文實玩順序銜接 |
| 城市與博物館 | 13 | 3 部文字冒險、Rand 終端測試、3 個重現展示謎題、6 面可選拼塊盤 |

新增九面拼塊盤的字母格 SVG，依原始遊戲畫面的分塊重繪；每個字母四格，資料測試檢查完整覆蓋及四向連通。另為 Seesaw、Loop、Switcheroo 製作原創連線／搬運示意，窄螢幕改直式；不是宣稱等比例場地平面圖。沒有將外站遊戲截圖複製到部署來源。

重點查證與修正：

- Seesaw 採 Wiki Alternative solution（rev 4641）的同一連接器、切換兩側鑽孔；Loop 採另一 Alternative solution（rev 4642）的方塊一趟與落地後改孔。對應獎盃風險始終可見，關閉解法仍保留提醒。
- Switcheroo 一般 Wiki 解法使用 Keep Connections，不適合 The Hard Way。本版改採 [Gamepressure 的獎盃解法](https://www.gamepressure.com/the-talos-principle-2/how-to-solve-switcheroo-puzzle/zc11118)：先搬設備，最後才接紅光，不按保留連線。未進行 PS5 跳盃實測。
- Above 的圖文把 Driller 誤稱 Gravshifter，依圖 2309／2312／2313 確認是鑽孔器；Transfer 的一處 red receiver 依圖 2213 確認為紅光源；Imprisoned 的 red inverter 以紅輸入、藍輸出的實際關係說明。修正理由保留於各題 `researchNote`。
- High Ground 補上第三身體與雙托盤疊高的完整順序，依 [Luke Lawrie 實玩攻略](https://www.gamepur.com/guides/how-to-solve-high-ground-puzzle-in-the-talos-principle-2-n1-puzzle-4)；S1 Sphinx 採 [EIP Graves 實玩解法](https://eip.gg/guides/the-talos-principle-2-south-1-star-statue-puzzles/) 的面向與欄列座標。
- 三部文字冒險依 [Margareth 的逐項成功路線](https://itemlevel.net/the-talos-principle-2-all-text-adventures-solution-text-adventurer-achievement/) 以自有中文摘要；Ghosts of Atlantis 魔法師第二句的 with／without 疑似誤字沒有可靠畫面核對，整題標 `unverified`，題旁及解法中直接顯示待查證。
- Rand 博物館測試採圖文實玩及[開發者回覆所在的終端討論](https://steamcommunity.com/app/835960/discussions/0/3936769163102066579/)，回答到模擬結束後回報 Rand，沒有編造必勝選項。
- [博物館 Wiki](https://taloswiki.org/wiki/Museum_of_the_Simulation)（rev 5128）與六張 solved arranger 畫面確認是六面可選拼塊盤；未採其他攻略的「五面」記述。

原有主步驟潤飾為地點、目標與動作，移除抽象的「帳／核對」措辭及夾雜的設備英文，保留必須逐字對照的分支選項與終端指令。橋樑編號／旋轉及 A、B、C 設備命名只在上方說明一次。

「拒絕謎語」預設關閉，關閉時解法與 SVG 不輸出到 DOM；開啟後直接顯示，不增加逐題收合。使用既有 `settings.showSolutions` 與 `steps['puzzle-'+id].status` 保存，主步驟、獎盃與分支獨立。「繼續下一步」會找到主步驟內未勾選的題目，支援 `#puzzle-E2-main-8` 深連結。沒有更動 schema、IndexedDB、namespace、匯入／同步元件與 Google 寫入門檻；舊筆記與未知資料仍保留。

本輪全模組資料、合成同步、建置與產物檢查通過。Talos 隔離瀏覽器回歸通過，新增 212 題完整呈現、預設無解法 DOM、鍵盤開關與焦點、偏好／逐題進度重整、已完成主步驟內的未完成題目、繼續／深連結、名稱搜尋、九面拼塊 SVG、1440／768／390／320px 解法無水平溢出；既有匯入／跨分頁／合成 OAuth／CAS／損壞資料與配額防護亦通過。測試僅用合成資料與全新 context。

設計 skill 的變更來源 lint、1440／768／390px inspector 皆為 0 FAIL／0 WARN；人工檢視上方開關、桌面／手機獎盃解法與最大 8 × 8 拼塊盤。最後補上西側巨構救 Byron、過載與 Act V 回城的轉場，來源同表內圖文流程；內容與程式最終建置後重跑資料、產物及隔離瀏覽器回歸通過。

限制：以上是攻略內容查證與網站行為測試，未在 PS5 逐題重現，也未驗收真實 Google Drive。Ghosts of Atlantis 上述一句英文、既有三市長的部分英文／適用性、PS5 分支與備份還原、官方 PSN 數字 ID 仍待查證。舊報告下方「沒有全題解答」描述只適用初版，已由本節範圍取代；每個收集物點位的全地圖導航不屬於本輪謎題解法。

### 2026-11-03 精簡備份工具／移除個人註記（模組 1.1.1）

依使用者要求移除加註記按鈕、筆記顯示與編輯對話框；未清除 `steps[id].note`，舊筆記仍可匯出、匯入及同步。右上「備份與還原」僅含本機 JSON 匯入／匯出、完整備份匯出與雲端 Google Drive 同步入口，移除 PS5、IndexedDB 與攻略來源說明。攻略證據仍保留在獨立「來源與查證」頁，`?view=backup` 舊連結仍有效。

本機匯入使用按鈕開啟選檔，讀到檔案後關閉工具視窗並進入原本的差異預覽；兩端原文、下載確認、未知資料與過期防護不變。雲端入口切到原本同步視窗，不疊加工具視窗，不新增登入、傳輸格式或無條件寫入。IndexedDB、schema、ID、namespace、Auth／Drive adapter／sync 實作均未修改。

全模組資料、建置、產物檢查與隔離瀏覽器回歸通過。新增驗證註記介面不存在、舊筆記仍出現在兩種匯出、實際選檔按鈕、工具視窗不含無關說明、本機匯入與雲端入口不疊加視窗，以及三種寬度的工具版面。所有資料與 Google 服務均為合成，未使用正式個人資料。

變更來源 lint 為 0 FAIL／0 WARN，主畫面三種寬度的 inspector 亦為 0 FAIL／0 WARN。備份視窗另以隔離 Playwright 比較 1440／768／390px 改版前後畫面並操作所有按鈕；手機完整顯示兩區工具，無水平溢出。

### 2026-11-03 攻略閱讀與行內獎盃（模組 1.1.0）

依使用者回饋，移除每步「操作、前置與來源」收合，直接顯示操作、必要觸發與前置連結。移除一般步驟重複的完成確認、錯過／復原、無對照獎盃提示及官方 ID 註解；完整驗證、復原內容與逐項來源仍可於「來源與備份」的查證紀錄閱讀。不可逆／待查證狀態、PS5 備份操作與重要分支指引保留；備份操作文字中的按鈕名稱與新介面對齊。

步驟獎盃改為可點擊方塊，與清單共用 `progress.trophies[id].earned`，同一獎盃多處出現時一致更新；重繪以出現位置保留鍵盤焦點。步驟、備份、分支仍各自記錄。原本常駐的空白筆記欄改為標題旁「加註記」，以對話框明確儲存／取消，沿用 `steps[id].note`；既有內容保留，空白時不佔攻略內容區。沒有修改 schema、namespace、IndexedDB 或 Drive 同步實作。

相關資料、全模組驗證、建置與隔離瀏覽器回歸通過；新增直接讀取、行內／清單雙向勾選、同盃兩處、重整、鍵盤焦點、註記儲存／取消／舊筆記保留與集中來源的驗證。瀏覽器一律使用新 context 與合成資料，真實 Google／PS5 未測。變更範圍為本模組畫面、版本與文件，以及既有 Talos 瀏覽器回歸。

變更來源 lint 及最終建置的設計量測皆為 0 FAIL／0 WARN；1440／768／390 截圖人工檢視完成，320px 亦無水平溢出。既有側欄、章節與操作系統沿用。序章由約 3 屏變成 4.4 屏是直接顯示的攻略內容，省去每步展開；移除空筆記框後，較第一輪展開版 4.8 屏縮短。

### 2026-11-03 獎盃繁中名稱（模組 1.0.2）

以一般瀏覽器讀取使用者提供的 [Exophase 英文頁](https://www.exophase.com/game/the-talos-principle-2-psn/trophies/) 與 [繁中頁](https://www.exophase.com/game/the-talos-principle-2-psn/trophies/zh-TW/)，兩頁 69 盃皆可按相同 `/trophy/` 連結配對。本次僅納入本體 60 盃，DLC 9 盃仍不納入；名稱逐字保存於 `dist/trophy-names.js`，不是自行翻譯。一般 HTTP 與 headless Edge 未能讀取清單，改用 in-app browser 正常讀取，未繞過網站驗證。

新增 `nameZhTW`、`nameCheckedAt` 與來源 `exophaseId` metadata；`officialName`、既有獎盃 ID／步驟 ID、schema、IndexedDB 與 Drive 同步不變。`exophaseId` 是第三方來源連結 ID，官方 `officialId` 仍為 null。名稱查證日期與原攻略日期分開，不將這次補名當成三市長實機驗證。內容／模組版本統一由 `data.js` 宣告，市長補強不覆寫版本。

清單、攻略的獎盃對照與三市長路線顯示「英文（繁中）」，攻略搜尋包含關聯獎盃的中英名稱。沿用原顯示樣式，長名稱可換行、核取方塊不壓縮。驗證包含 60 盃名稱完整對照、來源 ID 唯一、進度 ID 不變、中文搜尋、勾選後重整與手機版面；測試均用合成資料與新 context。

本輪 `scripts/verify.mjs`、build、site 產物檢查與 Talos 瀏覽器回歸均通過；1440／768／390／320px 雙語清單無水平溢出。變更來源 lint 為 0 FAIL／0 WARN，瀏覽器設計量測為 0 FAIL／1 WARN（既有主面板的 44px 上下留白，保留跨遊戲一致內距）；六張桌面／平板／手機截圖與手機 320px 畫面已人工檢視。未變更同步實作，未操作真實 PS5／Google 資料。

### 1.0.1 三市長補強（攻略 2026.10.31.2）

新增 58 筆選項查證列，沿用全部 57 個已發布步驟 ID。英文逐字、中文操作方向、人物／版本適用性分開標示；選項無原文時 `english: null`，頁面直接顯示「英文原文待查證」。以下是本輪取得的證據，並不代表 PS5 三結果已實機重現。

| 範圍 | 本輪查證與處理 | 證據 |
| --- | --- | --- |
| Doge 七題 | 六題後追加祈禱題，補齊七條英文。法文指南漏列懲罰題；宇宙題的 full／fully 轉錄不同，明示差異。配對學者以 Rand 身份確認，不能照「第二／第五項」硬選；時機記 E2–E3 | [問卷逐字稿](https://taloswiki.org/wiki/Permission_to_share_your_personal_data)、[玩家紀錄](https://steamcommunity.com/app/835960/discussions/0/4030220670872362258/)、[PS5 指南](https://www.psthc.fr/unjeu/the-talos-principle2-ps5/guide-trophees.htm) |
| Rand 前置 | 博物館 exercise 後回報；N1 Desolate Island 中途接受組織邀請；N2 嘗試故障機器；簡報後 S1 關係訊息維護關係。精確解題數、完整私訊英文與最晚期限仍未知 | [全流程搜尋索引](https://www.xboxachievements.com/forum/topic/490227-full-walkthrough-all-achievements-in-one-playthrough/)、[選舉攻略搜尋索引](https://www.xboxachievements.com/game/the-talos-principle-2/achievement/a-new-morality.html) |
| 城市回訪 | 分開列 Damien、Atal、Malduc 與塔內四次簡報回覆；三條簡報短英文可讀，第二條 good on／good of 不一致，保留中文方向與待查證 | 同上；[Hanni](https://steamcommunity.com/sharedfiles/filedetails/?id=3069750588) |
| W2 原文 | 入機、甦醒、Cryer 準備／延後及終端指令可見實際截圖；修正原簡述批次檔名。聯絡人截圖是 Helga，因此對 Rand 的適用性仍標待查證 | [獨立遊戲實錄與截圖](https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_3/west_2_3.htm)；頁面選項逐條連到對應 JPG |
| 三分支流程 | 列出公共貼文、入機前／後、Rand 六次道德回應、Cryer、最後 VTOL、Act V 公告與跳盃核對；缺英文者不反向翻譯填補。舊版轉載的分支標籤與新版相反，只採兩條可對照的結尾文字 | Xbox 選舉攻略、PS5 指南；[歷史轉載](https://gamepretty.com/the-talos-principle-2-100-achievement-guide/)（不採其分支配對） |
| 備份還原 | 本頁採 W2 入口 A；A 只是筆記，並非額外雲端槽。先停遊戲別 Auto-Sync、關閉遊戲、核對時間再上傳；分支後關閉遊戲，下載入口 A 到主機，勿反向上傳分支覆蓋唯一 A。若唯一早期雲端無法保留，先停止覆蓋 | [PlayStation 官方](https://www.playstation.com/en-ca/support/subscriptions/ps5-ps-plus-cloud-storage/)；路線節點由全流程／PS5 指南支持 |

建議順序 Rand → 還原 A → Hermanubis → 還原 A → Byron 續玩，是本工具讓高前置風險先暴露的操作建議，來源沒有規定固定先後。Hanni 的出機後備份及早期社群策略是另一套流程，不混用。所有分支仍為 `unverified`，共用準備清單不宣稱每項都是所有玩法的硬性條件。

來源獨立性：Xbox 全流程與成就頁同作者，且引用 BlackTorito；PS5 指南也致謝 BlackTorito，不能計成三次獨立實測。獨立截圖支持文字存在，不自動證明選舉結果。BlackTorito 影片頁面／章節可讀，但本環境未取得可播放影格，未逐幀驗證。

本輪檢查：全模組 `scripts/verify.mjs`、`scripts/verify-sync.mjs`、build、site 產物檢查、Talos 隔離瀏覽器回歸均通過。新增瀏覽器案例確認合成 1.0.0 schema 1 的完成狀態、筆記與未知欄位可保留，七題／待查證原文／正確終端檔名可讀，390px 新攻略不溢出。設計量測 1440／768／390 為 0 FAIL、0 WARN；既有風險 emoji 為任務指定符號，source lint 的既有命中保留，新增元件未命中。真實 Google 與 PS5 上傳／還原未測。

本輪修改：`dist/mayor-research.js`、`dist/roadmap/evidence.js`（新增）；`dist/data.js`、`dist/app.js`、`dist/style.css`；`module.json`、模組 README、本報告、模組 verify、`scripts/verify-site.mjs`、`scripts/verify-talos2-browser.mjs`。沒有修改 IndexedDB schema、進度 ID 或 Auth／Drive／sync 實作。下文保留首版整合記錄；內容細節以本節為準。

| 項目 | 結果／適用範圍 | 來源 |
| --- | --- | --- |
| PS5 分組 | 本體 60：1 白金、1 金、6 銀、52 銅；DLC 9，不計白金進度 | [Platinum Pursuit NPWR34440_00](https://platpursuit.com/games/NPWR34440_00/)、[TrueTrophies 原始清單公告](https://www.truetrophies.com/forum/viewthread.aspx?tid=188935)、[Exophase 分組](https://www.exophase.com/game/the-talos-principle-2-psn/trophies/) |
| 官方名稱 | 60 個本體名稱逐一建入，全部有 Roadmap 名稱對照。PC／Xbox 成就數不當作 PS5 獎盃數 | [PlayStationTrophies](https://www.playstationtrophies.org/game/the-talos-principle-2/print-list/)、[Talos Wiki](https://taloswiki.org/wiki/Achievements_(TTP2)) |
| Doge | 序章接受介紹；E1 同意資料分享並答七題；E3 配對學者。七題已取得完整攻略索引，UI 使用短英文辨識片段與繁中語意，供對照遊戲原文 | [XboxAchievements](https://www.xboxachievements.com/game/the-talos-principle-2/guide/)、[玩家問卷紀錄](https://steamcommunity.com/app/835960/discussions/0/4030220670872362258/)、[配對訊息逐字稿](https://taloswiki.org/wiki/Connecting_you_to_a_friend) |
| Rand 前置 | 博物館回報、N2 嘗試使用損壞機器、回城支持 Atal，以及必要時 S1 關係修補，均有攻略索引證據。尚未取得每封訊息的完整觸發表 | [A New Morality 攻略](https://www.xboxachievements.com/game/the-talos-principle-2/achievement/a-new-morality.html) |
| 三市長 | 分別列入公共社群、Hermanubis、Somnodrome、Rand、Cryer 與 VTOL 的分支條件。Act V Neith 公告／獎盃為使用者驗收點。前期旗標會影響結果 | 同上；[BlackTorito 三市長實錄](https://www.youtube.com/watch?v=OdvNsZHDZR4)（準備 01:34／02:40／03:50／04:58／07:07；Hermanubis 08:41、Rand 11:30、Byron 14:40、替代 15:26） |
| 兩種備份策略 | XboxAchievements／BlackTorito 準備法與 Hanni 的前期社群回覆法不同；Hanni 在正常 Somnodrome 後備份。本工具優先提示更早的 W2 Lost Lab 入口，不宣稱兩者可混用 | [全流程](https://www.xboxachievements.com/forum/topic/490227-full-walkthrough-all-achievements-in-one-playthrough/)、[Hanni](https://steamcommunity.com/sharedfiles/filedetails/?id=3069750588) |
| 特殊解法 | E2 正規 8 Seesaw、E2 Puzzle 8 附近 Lost Puzzle Loop、S1 正規 8 Switcheroo。來源對完成後重置補盃的可靠性不一致，保守列首次解題警示 | [XboxAchievements](https://www.xboxachievements.com/game/the-talos-principle-2/guide/)、[Hanni](https://steamcommunity.com/sharedfiles/filedetails/?id=3069750588) |
| 結局 | 全部黃金謎題後救 Miranda，與 Ab Aeterno／The Future 關聯；主結局選擇與三市長不是同一分歧 | [Talos Wiki](https://taloswiki.org/wiki/Achievements_(TTP2))、[GameSpot](https://www.gamespot.com/articles/the-talos-principle-2-ending-guide/1100-6519076/) |
| PS5 雲端 | PS Plus、Auto-Sync、手動上傳／下載與遊戲別同步設定有官方說明。網站不能驗證 PS5 檔案，也不能將 Xbox 刪除本機存檔方法套到 PS5 | [PlayStation 官方](https://www.playstation.com/en-ca/support/subscriptions/ps5-ps-plus-cloud-storage/) |

## 衝突與待查證

1. **三市長完整英文選項與 PS5 重現**：本輪已補齊決策順序及部分逐字英文，但 Rand 道德對話、公共貼文、城市人物與部分追問尚缺完整英文。資料逐項留空並標待查證。西區幻象的中立／肯定答法、Byron Founder／Goal 貼文題名亦有衝突。精確配分及 PS5 目前版本三結果仍未實測；所有分支保留 `unverified`。
2. **Rand 每封私訊**：N1 邀請、N2 操作、簡報後 S1 關係修補已有文獻定位；精確觸發旗標、訊息完整原文、所有時序分支與期限仍待查證。沒有自行編造選單。
3. **城市時機**：Schuyler 的 Your Biggest Fan，Hanni 與 Xbox 攻略對回訪機會不同；Museum Explorer 也有是否只限第一次、需否操作謎題的衝突。優先序章驗收。Purple 的位置描述採博物館後方／Archeological Gardens 範圍，逐字選項待核對。
4. **Sinner**：第二次回城與具體爭論回覆有玩家實測；第三次可補說法不一致。不能對話時先做博物館主線，不保證一律有效。
5. **文字冒險**：Hanni 要成功結局，Xbox 攻略稱任意完成即可；本工具採成功結局的保守做法，補入來源衝突註記，不宣稱最小條件已實測。
6. **特殊解法重置**：PC 指南稱可重置、Xbox 攻略警告可能不跳；沒有 PS5 實測前不保證可補。
7. **Jeremy／Balance**：Steam 指南稱 Jeremy 無對應盃，但玩家討論有人回報可給 Balance。三路線 UI 仍以指定人物與實際跳盃分開核對，不拿 Jeremy 當 Hermanubis 成功。
8. **官方逐盃 ID**：公開 NPWR 分組可查；未取得官方數字對照。所有 `trophyIds` 留空，名稱鍵 `trophyRefs` 不偽裝官方 ID，這項驗收仍未完成。
9. **最終自動存檔**：PC 攻略描述的隱藏自動存檔未經 PS5 實測；登上最終 VTOL 前仍提示備份。
10. **探索細節**：本版提供區域探索帳、數量核對及關鍵錯過事件，沒有複製全遊戲每題逐步解答與所有收集點導航；不清楚的位置直接附來源，不填假點位。

存取情況：XboxAchievements、Neoseeker 部分正文 403；已使用可讀的搜尋索引取證。PSNProfiles 未取得可讀完整指南，沒有宣稱閱讀完成。BlackTorito 取得影片說明與時間章節，沒有聲稱逐幀比對英文對話。

## 本機實作與驗證

新增獨立模組，八階段 57 步驟；目前 6 `confirmed`、32 `consensus`、19 `unverified`。分類是內容來源可信程度，並非 PS5 或雲端實機驗收。所有本體獎盃均有名稱對照。

原 repo 三模組沒有共用獎盃模型、Roadmap 或 IndexedDB。新模組新增獨立 IndexedDB 主記錄，沿用既有 Google Auth／Drive adapter／envelope，並將 sync-session 的本機介面改為等待 IndexedDB 交易。其餘遊戲原始檔未修改。工作期間出現另一個 `thank-goodness-youre-here` 模組及相關共同驗證修改，本次保留該工作，僅加入 Talos 檢查，不把它算入本次交付。

已執行：

- `node scripts/verify.mjs`：全模組資料驗證通過，包含 Talos schema、來源／依賴、60 名稱對照與 Node 語法檢查。
- `node scripts/verify-sync.mjs`：既有 EDF 同步合成回歸通過。
- `node scripts/verify-browser.mjs`：既有 Portal／EDF 兩模組的隔離瀏覽器回歸通過，涵蓋舊 Key／cache 不動、同 origin 遊戲隔離、匯入、離線及 390px。
- Talos module verify：async 三方合併、首次配對、過期選擇、同步中編輯、未知回應修訂恢復、配額失敗、過期 412／競爭一勝一拒、錯誤伺服器及 grant 失效門檻通過。
- `node scripts/build.mjs`、`node scripts/verify-site.mjs`：完整靜態產物通過；正式部署狀態以 GitHub Actions 為準。
- `node scripts/verify-talos2-browser.mjs`：全新暫存 Edge context，合成資料。Portal／直接網址／重整、獎盃與步驟／備份分離、三分支獨立、階段確認、篩選、IndexedDB 跨分頁、匯入兩端原文／未知資料／過期／下載失敗／錯遊戲、合成 OAuth 與三方衝突、PATCH 期間的新 IDB 編輯保留／下次上傳、寫入回應遺失後只讀核對、損壞／未來 schema 不重設並可匯出原文、1440／768／390／320 無水平溢出、IDB 配額失敗停止、儲存 namespace 隔離通過。修正同頁 hash 導覽未展開詳情後再次通過。
- 設計 skill source lint 通過。警示符號／完成記號按任務要求保留；檢查器使用 emoji 例外。瀏覽器量測與人工畫面檢視記錄在忽略的 `outputs/talos2/`。

此專案沒有 TypeScript、產品套件或獨立的 lint/typecheck scripts，沒有新增依賴冒充既有檢查。沙箱 Edge 啟動失敗後，在沙箱外以全新暫存 profile 與僅 loopback 的測試伺服器完成；未使用既有瀏覽器 profile。正式 Google、PS5 遊戲存檔、上傳／下載、選舉結果皆未測，仍由使用者在正式網域與主機驗收。

資料遷移：沒有舊 Talos schema；內容更新不改進度 ID、不清空資料。未知欄位保留，匯入原文與快照另存，儲存失敗即停。PS5 備份確認與清單下載發起時間分開記錄，沒有宣稱下載檔案已落盤或 PS5 備份真的可還原。

## 本次變更檔案

- 模組契約／說明／回歸：`games/talos2/module.json`、`games/talos2/README.md`、`games/talos2/verify.mjs`、本報告。
- 頁面與靜態攻略：`games/talos2/dist/index.html`、`style.css`、`app.js`、`data.js`。
- 可重用 Roadmap 邏輯：`games/talos2/dist/roadmap/model.js`、`store.js`、`sync.js`。
- 沿用的同步元件：`games/talos2/dist/shared/google-auth.js`、`drive-appdata.js`、`progress-envelope.js`、`sync-core.js`、`sync-session.js`。前三者與 EDF 版本逐字一致。
- 納入既有必要檢查：`scripts/verify.mjs`、`scripts/verify-site.mjs`；新增 `scripts/verify-talos2-browser.mjs`。既有 `scripts/verify-browser.mjs` 的自動 Portal 數量檢查由並行工作更新，本次執行通過並保留。
- 根文件：`README.md`、`docs/ARCHITECTURE.md` 的 Talos 專節；保留另一遊戲的並行變更。

`_site/` 與 `outputs/talos2/` 是忽略的建置／驗證產物，未作為追蹤來源。`games/talos2/dist/` 是正式可維護網站來源，應保留。

## 2026-11-04 · 遺物候選點與物品共用紀錄

重新閱讀 [Hanni 收集攻略](https://steamcommunity.com/sharedfiles/filedetails/?id=3069750588) 的 Human Artifacts 段落，來源明示遺物從預設位置中變動且列表不完整；既有 19 點的標題、區域、位置原文及圖片連結保留。Scenario 配對整理為五組共用身分：Tricycle E1／E2、Unknown Machine E1／E2、Anchor N2／N3、Van N3／S1、Arcade Machine S1／S2；其餘九種各一個已列候選點，共 14 個網站具名項目，不能當成遊戲全部物品總量。N1／W3 缺漏仍待查證。

共用勾選是使用者要求的工具紀錄規則，沒有聲稱 PS5 本輪每一點必然出生。介面直接標示候選點不保證有物品，並顯示已在他區記錄取得、此處不用再找；同物品的圖上替代點也標為已取得。新進度使用原 steps 群組，不重建 DB。舊手動件數保留，不推斷物品身分；與新具名勾選取較大值作獎盃核對進度、不相加。匯入與合成 Drive 有保存新取得紀錄、取消狀態仍可沿原同步機制傳遞的回歸證據，實際 Google／PS5 驗收未完成。
