# Cat Quest II｜白金遊玩指引與 Game Companion 完整規格

研究／設計日期：2026-11-27（台灣）  
文件版本：1.0  
交付文件：`cat-quest-ii_GAME_COMPANION_SPEC.md`

## 1. 範圍與完成狀態

- 平台：PS5 執行 PS4 版；沿用先前已確認的平台。不是另行假定一份原生 PS5 獎盃表。
- 目標：本體白金，完整劇透。以單人＋AI 伙伴為預設，雙人不是獎盃必要條件。
- 本次授權：研究、AI 循環審查、遊玩 Roadmap、checklist 與私人控制台規格。尚未授權或執行網站開發。
- 選擇一般新遊戲；想輕鬆可選 Story。白金不要求高難度、NG+、Mew Game、每日任務或多人連線。
- 估計保留約 10–15 小時；熟悉路線可能更短，不能把影片約六小時當一般首次遊玩保證。
- 免費更新的機制更正納入；新增挑戰內容只作選讀，不為白金強迫打 Infinity Tomb 或 Mew Game。
- 此文件提供完整主流程、全獎盃條件、具名查漏表與工程契約；**不是所有地城的逐房間導航都已核實**，也尚未實機驗證。未核實的座標、秘密通道起點不補造。
- 本機 repo、存檔、目前遊戲版本號與個人進度皆未讀取。預設從新遊戲可用，但不宣稱使用者目前 0/20。

### 1.1 白金門檻與資料分母

| 項目 | 白金條件 | 本文件收錄 | 核實深度／限制 |
| --- | --- | --- | --- |
| 獎盃 | 20 座，含白金 | 20 座條件 | 全部條件已查；實際跳盃由玩家確認 |
| 支線 | 67 個完成 | 67 個具名條目 | 名稱清單已交叉核對；起點與建議等級以來源標示，非全任務逐句解法 |
| 地城 | 完成計數 73 | 73 個基準查漏條目＋額外內容說明 | 名稱索引已整理；名稱別名、入口與計數範圍仍有缺口，不能稱 73 個皆完整逐洞核實 |
| 裝備 | 101 件不同裝備 | 101 個原始清單條目＋7 個更新候選 | 101 名稱／部位已整理；固定出處只對部分核實，其餘不虛構掉落位置 |
| 法術 | 12 種 | 12 種名稱、地點、路線時機 | 12/12 地點可追蹤；不要求升到最高級 |
| 等級 | 99 | 數值欄位 | 是角色／隊伍等級，非裝備等級 |
| 金箱 | 無獨立全金箱獎盃 | 22 個來源列出的定位點 | 重要裝備來源及部分地城清洞條件；未宣稱更新後完整總量 |

獎盃門檻與世界完整總量必須分開。來源出現 108 件裝備等總量，但另有 Mew Game 裝備未必納入；本文件不把 108 宣稱為目前所有版本的完整總量。基準 101 清單是查漏工具，不把每件都設成 Fashionista Tails III 的逐件硬前置；更新後計數達標可有其他組合。若遊戲計數超過 73/101，保留實際值，不截斷，不報資料損壞。[S01–S05]

## 2. AI 循環審查與設計定案

### 第一輪：路線與頁面提案

- 將遊戲拆成六個遊玩階段，以能力解鎖與區域回訪作導航；清單提供詳細查漏。
- 主線途中完成附近、等級相近的支線，獲得經驗；與支線相關地城盡量一起處理。
- 不在取得水行、任務鑰匙之前要求全地圖掃乾淨。
- 主頁下一步整合在「遊玩路線」，不新增只有統計卡片的空首頁。

### 第二輪：反證與修正

| 原提案／資料陷阱 | 審查後採用 |
| --- | --- |
| 拿到水行立即要求金鑰匙 | 改成可提早嘗試的中後段支線；敵人過強先推主線和支線，再回來 |
| 開發者島直接拿金鑰匙 | 更正成 Hidden Key → Hidden Cave → 三個 Mimics → Golden Key |
| 主線結局警告等於永久錯過 | 通關後 Continue 可掃尾；提醒不要為查漏開新存檔或 NG+ |
| 一張地城完成框涵蓋全部獎勵 | 清洞、特別鑰匙、裝備取得各為不同事實，尤其 Ultimutt Stash |
| 影片在某箱拿某裝備就是固定出處 | 普通隨機箱只記候選來源；固定獎勵另列證據 |
| 73／101 就是版本完整總量 | 分開顯示獎盃門檻、已收錄數、已核實資料與個人已取得數 |
| 做精確互動地圖 | 目前缺可靠座標；先用大區、地標、文字定位，資料齊才考慮地圖 |
| 全部地城都塞主流程 | 路線只嵌當下相關項；完整名單留在查漏頁，兩者共用 ID |

已完成兩輪獨立研究／反證；沒有宣稱遊戲實測、程式開發或人工驗收完成。上述是本次產品決策。

## 3. 遊玩時先記住的規則

1. **支線先於該區最後掃洞。** 藍色驚嘆號是支線；做完交付再與 NPC／信箱互動，查看後續任務。系列每一個任務各計一次，不是一條系列才計一次。
2. **殺光看得到的怪物不等於清洞。** 一併拿箱子、怪物鎖箱及秘密支路；以遊戲 Dungeon Complete／入口狀態與計數核對。入口問號表示未探索，菱形表示仍有未完成內容。
3. **沒鑰匙、水行或任務前置時先離開。** 不用一直撞同一扇門；Roadmap 將這些集中到回訪卡。
4. **裝備重複取得是升級，不增加不同裝備件數。** 不需要把兩名角色各配一次才算，也不需要每件升滿。[S17]
5. **一個近戰、一個法杖是起步建議。** 遇抗性或傷害很低時換角色／武器；不要把一套 Build 視為保證可通關。
6. **晚期高等洞口不是練等硬門檻。** 150／200 是敵方危險提示，白金只要求等級 99；先完成其他收集和常用裝備升級再挑戰。
7. 每次取得新東西，只勾實際獲得的那個實體；路線完成、清洞、學法術、拿裝備、實際跳盃各自記錄。

## 4. 詳細遊玩 Roadmap

此處階段與步驟 ID 是控制台自訂，不是遊戲官方章節／任務編號。推薦等級僅是安排順序的參考。能自由前後閱讀，沒有網站上的強制解鎖。

每張步驟卡固定顯示「現在去哪 → 做什麼 → 順路項 → 離開前檢查 → 未完成怎麼補」。卡片勾選只記路線步驟，不連帶替玩家勾收藏。

### 階段 A｜開場、貓國與第一碎片

#### A01 `cq2-r-tutorial`｜Mewment Shores → Brave Cave → South Pawt

- 跟 Kirry 進 Brave Cave，完成教學戰鬥、讀石碑，確認法術選單已有 Flamepurr 與 Freezepaw。
- 跟隨後續引導使用 Kingsmarker，抵達 South Pawt 並完成到達對話。
- 當場提示：`Catventure Begins`；完成第一任務後核對實際跳盃。
- 離開前：新取得裝備照實勾；地城另以完整清洞狀態勾，不因走出另一出口就推定。
- 補救：法術選單缺少任一種時回教學石碑；不是要求重開。[S03、S04]

#### A02 `cq2-r-smiths`｜救出 Kit Cat，開放裝備與法術升級

- 先循主線到 Kit Cat 工坊，再追到 Seaside Cove 取得所需材料、救人並回訪工坊。
- 到 Arcane Headpawters 完成主線引導；開始把金錢投入正在用的防具與常用法術。
- 順路：South Pawt 三支線、Fishercat Village 三支線、Kit Cat 信箱系列。一次完成當前可接且適合等級的段落，不要求全部連續解鎖。
- Cave Grotto 的石碑可學 Furry Shield；把它放在早期路過時提醒，而非通關後才說漏法術。
- 檢查：休息存檔、是否能在選單裝備法術。若主線戰鬥變慢，先做附近藍色驚嘆號補等。[S02、S04、S06]

#### A03 `cq2-r-sigil`｜The Purrsecutor：King Sigil 島與補血

- 跟主線到 Lioner 所在島；先處理可擊敗的小兵，無法有效傷害 Lioner 時依劇情存活，等事件繼續，不在這裡硬耗。
- **回程前**讀島上 Healpaw 石碑，裝上補血再試用一次。
- 走 King Sigil 的路徑完成主要目標並回大陸。
- 順路提示：連同 Cave Grotto 法術，初期可累積到四種；達到時核對 Arcane Paws I，不固定要求某一步才跳。
- 補救：漏讀 Healpaw 可回訪；在查漏頁點該法術能定位 King Sigil 周邊。[S04、S06]

#### A04 `cq2-r-lionardo`｜Kingsblade 前置 → King Lionardo 試煉

- 按主線找 Kit Cat，完成戰鬥取得試煉鑰匙，前往東側 King Lionardo's Ruins／Trial。
- 試煉傳送路線依點亮的燈選路，擊敗末端敵人取得第一碎片。
- 當場提示：確認新 Royal Art：Pawer Rolling。這不是新法術，不計進 12 法術。
- 順路支線：Cat-Face Outlook／古代法師系列、Whiskerest、Catnip Farm；有進洞任務時順便清該洞，不為掃洞中斷主線。
- 本階段可能自然取得：Kinghood I、Furriend of the People I、Dungeon Master I、Fashionista Tails I。只是條件提示，不宣稱固定時點。[S04、S18]

### 階段 B｜進犬國、武器匠與第二碎片

#### B01 `cq2-r-cross-border`｜The First Kings → Lupus Empire

- 跟 Kit Cat 北行，從 Felingard's Statue／First Bridge 穿越，按劇情處理追兵並離開通道。
- 檢查 `The Lupus Empire` 是否實際跳盃。
- 前往 Hotto Doggo 工坊；主線要過 Wall of Lupus 時，到 Pound Town 按要求找回骨頭、交換餅乾再回城牆。
- 順路：Lightnyan 的戶外石碑，在 Pound Town 北側／Wall of Lupus 西側一帶；抵達犬國時即提醒讀取。
- 順路支線：Pound Town、Wall of Lupus 的吟遊詩人系列，能接就做；避免把尚未開放部分當遺漏。[S04、S06]

#### B02 `cq2-r-woofhauser`｜找 Hotto Doggo → 北方試煉

- 完成找回武器匠的主線，取得試煉鑰匙。
- 北側正路被擋時，找 Far-Fetched Cave 通路；進洞時讀 Forcewoofer 石碑，穿到試煉區。
- 按試煉事件完成 Wolfen 戰鬥，返回武器匠推進 The Kei-Nein，到 Throne of Lupus 完成碎片相關事件。
- 當場提示：確認 Pawer Smash；新版是翻滾後接攻擊，舊攻略寫隨機傷害增益已不適用。[S05、S18]
- 順路：Doge Town 家庭系列；有空可找 The Banished／沙漠入口附近的 Manapaw 石碑。
- 檢查：需要升級武器時回 Hotto Doggo，不能只升防具而忽略輸出。打不過先補同區支線。[S04、S06、S17]

### 階段 C｜返回貓國、燈塔三任務與水行

#### C01 `cq2-r-final-shard`｜The Final Shard → Purrn Cave

- 回 Kit Cat 工坊取得下一線索，前往 Catpital 北方 Purrn Cave。
- 避開尖刺、按主線目標找到傳送／石碑線索，跟後續目標到西方海岸。
- 現在跨海受阻是正常前置：下一步先找 Pawt Bay 燈塔總督。
- 順路：Laketown 系列、貓國尚未做完的早中期支線與 Whisk Cove 的 Purrserk 石碑。
- Pawt Cave 若未清，先顯示多入口提醒：有一處入口通往怪物箱，水行後由海面找其他入口；不要把同洞各入口建立成多個清洞框。[S04、S06、S19]

#### C02 `cq2-r-water-walking`｜Book → Artefact → Gift

- 到 Pawt Bay Lighthouse 找總督，依序接 `Book of Water Walking`、`Artefact of Water Walking`、`Gift of Water Walking`。
- 追書頁、到 Bay Cave 取關鍵物，再回交付；最後進儀式入口，處理召喚敵人與 First Governor 戰鬥。
- 取得後在安全海岸踏上水面確認；這三個也計入 67 支線，不能只勾「水行」就漏掉任務數。
- 檢查 Royal Fur：前三項 Royal Arts 已學習時核對實際跳盃。
- **此時起才安排離島／金鑰匙回收。** 航行經驗不適用：本作這段是步行水面，不借用三代船隻系統。[S04、S18]

### 階段 D｜水行後的收集開放與主線後段

#### D01 `cq2-r-ocean-spells`｜先拿通過區域的法術

- 以接下來主線／支線地區為順序補戶外法術：Twin Towns 北方島的 Astropaw、西北 Drakoth's Vault 周邊島的 Cattrap。
- 前往 Throne of Lupus 一帶時進 Tomb of the Follower 讀 Gravi-ruff；後續打 Mimics／高等敵人可用來拉住敵人，仍須留意免疫、位移與敵方施法。
- Cactus Cave 的 Celestail 留到能安全清該區時再補，不為取得第 12 法術強迫此時打高等洞。
- 有水行也不代表所有洞門都已解鎖；先檢查個別任務／鑰匙。
- 檢查四／八法術門檻；未學到的每項可直接跳至法術清單。[S06]

#### D02 `cq2-r-golden-key`｜開發者島 → Hidden Cave → Golden Key

前置：已有水行；能應付約 Lv99 對手。75–80 僅是早期攻略作者建議，本文件建議以實際戰鬥承受度決定。**打得吃力就先進 D03、E 階段，再回來；不把此卡當主線前置。**

1. 地圖往東南找到 Founders Island II，依序與四名開發者接四個支線；顯示 999 是玩笑，無須練至999。
2. 最後 `This Is It!` 前先休息存檔，擊敗四名 Lv99 開發者。拉距離法杖射擊、短暫冰凍控速，避免四人近戰包圍；伙伴倒地時先把敵人帶開再救。
3. 完成對話，確認拿到 **Hidden Key** 與 Gentle Suit。這把尚不能開金箱。
4. 回 Felingard 的 Hidden Cave：Catnip Farm 東側／King Lionardo 試煉西側山區。用 Hidden Key 開內門。
5. 擊敗三個 Golden Mimics：不要貼臉換血，Gravi-ruff 配遠程與閃避；保留補血魔力。打完拾取 **Golden Key**。
6. 開 Hidden Cave 前段金箱，確認 The Architect；回開發者島開金箱，確認 Gentle Monocle。
7. 三件裝備各自勾取得；鑰匙分開記；實際開成功一個金箱後才確認金鑰匙旗標。

補救：若島上已無任務，先看是否已有 Hidden Key，去 Hidden Cave 核對；不要為重接島上任務重開遊戲。若尚打不過 Mimics，保留進度晚點再來。[S07、S08]

#### D03 `cq2-r-first-kings`｜First Kings 試煉 → Kings of Old

- 按主線跨海前往 Trial of the First Kings，讀題選對應答案、完成戰鬥取得最後碎片。
- 回工坊推進事件，進入異空間後按指引穿越，不將暫時失去能力當存檔損毀。
- 到 King's Paw 區域，完成 Cave Valor、Cave Mercy、Cave Virtue 的主線要求，再進下一個主線地點。
- 三洞各自確認清洞；劇情石碑與長廊只作主線地點，不擅自都加成 73 地城紀錄。
- 本段題目各版本文字與精確答案順序未逐題核實，保留遊戲題目可讀；若希望頁面直接顯示所有答案，屬 G06 補查項，不能自填一串藍／橘按鈕假裝核實。[S04]

#### D04 `cq2-r-lupus-tomb`｜回兩國探查 → King Lupus I

- 隨主線在兩座王城周邊探查，再回 Hotto Doggo 取得專屬主線鑰匙。
- Lupus 墓區正門不通時，按目標走旁邊 Unknown／Path to Lupus Tomb 通路，從中段出口進內側。
- 到石像完成主線互動，核對能力恢復與 Full Royal。Full Royal 為後來能力，不是 Royal Fur 額外要求第四項。
- 檢查：水行可正常使用；金鑰匙卡若尚未完成，仍保留待辦，不因本段完成而自動勾掉。[S04、S18]

### 階段 E｜支線補齊、兩國收復與結局

#### E01 `cq2-r-regional-quests`｜依聚落完成未完成支線

- 用第 6 節完整具名表，依「目前所在區域 → 鄰近聚落 → 任務系列」處理；可與主線穿插，這裡是最後總檢查。
- 優先查 Kit Cat／Hotto Doggo 的信箱，South Pawt、Cat-Face Outlook、Doge Town、Throne of Lupus、The Banished、Twin Towns、Founders Island II。
- 任務條件不符就看主線進度；不要靠反覆殺野怪等待出現。部分 NPC／接續位置會移動，精確起點有衝突的條目看清單備註。
- **Bat Cove 開門**：先完成 `The Doge Knight` 再回洞；清單顯示任務關聯。
- **Pawful Cave 墓碑**：做 `Tale of a Cat and a Dog` 時，利用場景陷阱或 Royal Damage，普通武器無效不表示傷害太低；不能誤指 Cattrap 法術就是必要場景陷阱。
- 達37／67時核對 Furriend of the People II／III。若未到67，列出剩餘具名任務，不只顯示一個進度條。[S09、S20、S21]

#### E02 `cq2-r-reclaim`｜Final Purreperations → Reclaim Felingard／Empire

- 回工坊完成準備，升當前武器、防具與主要補血／傷害法術；休息後往 Catpital。
- 完成 Lioner 的兩階段戰鬥，再按主線去 Throne of Lupus，通過尖刺區後戰 Wolfen。
- Wolfen 分身出現時辨識能實際造成傷害的本體，避免持續打無效目標。
- 出戰前提示：可以先做支線變強；尚有查漏不會因本段永久失去機會。
- 檢查：主線已顯示 The Eye of Eternity；記住晚期兩洞是在擊敗 Aelius 後解鎖，不是要求先清完所有支線。[S04、S22、S23]

#### E03 `cq2-r-aelius`｜The Eye of Eternity → Epilogue → Continue

- 按海面主線標記挑戰 Aelius，避開手部與眼部攻擊；一輪結束取得 Kingsblade 後，依遊戲提示換上／使用它完成後續戰鬥。
- 回 Mewment Shores 完成 Epilogue 對話，核對 Paws Together 實際跳盃。
- 回主選單選 **Continue** 進同一存檔查漏。先不要進 NG+ 或 Mew Game；白金不需要重跑。
- 離開前檢查：兩國地圖可繼續探索；已獲得的新裝備要自己勾。若裝備表少 Kingsblade，先核對主線實際是否拿到，不能只因路線打勾就推定。
- 補救：即使已看結局，仍用 Continue 掃尾。不要把舊攻略的劇情警告寫成必須備份才能補救的永久錯過。[S02、S04]

### 階段 F｜分區掃尾與白金確認

#### F01 `cq2-r-felingard-sweep`｜貓國與近海

- 完成貓國剩餘支線後，以南部 → 王城／湖區 → 西岸／Pawt → 北部森林的地理順序掃未完成洞。這是合理路線建議，非經過座標最短路演算法驗證。
- 看地圖問號與菱形對照具名表。Pawt Cave 找其他入口；秘密路徑不明就展開該洞已有提示／來源，不用全圖盲撞。
- 有金鑰匙後沿途開固定裝備金箱；金箱只有金錢也照實記，不強迫把它當新裝備。
- 補 Furry Shield／Purrserk 等遺漏法術，順便檢查水行後島上 Astropaw。
- 到 Cave of the Lion 前提示其解鎖條件與三件固定裝備；不因地城總數已73就略過缺裝備的此洞。[S19、S22、S25]

#### F02 `cq2-r-lupus-sweep`｜犬國、藏寶與島群

- 從城牆與 Pound Town 往 Doge Town、王城，再到 Pawasis／沙漠查漏。先把區內支線結清，再處理地城深處。
- **Ultimutt Stash → Hidden Stash**：到 Ultimutt 時先看入口第一支火炬，向其西南找秘密路，照紙條搜出 Hidden Stash 的鑰匙。清洞狀態不能代表已拿到這把鑰匙。
- 取鑰匙後到 Dog Barracks／Throne of Lupus 東南附近的 Hidden Stash 開封門；不與 Hidden Cave 混淆。
- **Tombstone Cave**：墓碑需陷阱／Royal Damage；不標有衝突的洞口等級。精確秘密箱通道尚未完整核實，見 G05，不偽造箭頭導航。
- **Troll Cave**：Doge Town 東側離島／Wall of Lupus 東北；三個金箱需開完才清洞，中間即使沒有敵人也不是已完成。
- **Drakoth 路線**：收 Mewment Shores 南島與 Throne of Lupus 西島群兩把專屬鑰匙，再進 Drakoth's Vault 開內門、拿完三件裝備；Golden Key 不能代替它們。可與西島群 Cattrap 一起處理。[S10–S14、S24]

#### F03 `cq2-r-hard-caves`｜兩個150洞與 Lonely Cave

- Aelius 勝利後開放 Cave of the Lion 與 Tomb of the Wolf。為方便本路線排在 Epilogue＋Continue 後，不代表開放硬條件是看完 Epilogue。
- Cave of the Lion：挑戰特殊敵人，確認 Purrsecutor Armor／Helm／Purrsecution 三件。
- Tomb of the Wolf：確認 Labrathor Vest／Helm／Pawlonijr 三件。
- Lonely Cave（Whiskerest 東北）：危險的高等刺蝟；先存檔、補血、升常用裝備，遠距＋控場嘗試。完成後確認 Jester Bee Cap／Suit／Zero Faith。
- 各洞內每個箱子都要處理；精確哪一個是怪物箱有來源衝突，不強寫方向。三件各自核對背包。
- 無需先練150或200。失敗就回去清支線、開固定裝備箱、升核心裝備；不用進 NG+ 讓敵人更強。[S22、S23、S26]

#### F04 `cq2-r-final-audit`｜最後查漏，不再漫無目的刷

依下列順序檢查：

- [ ] 主線含 Epilogue 已完成，Paws Together 已跳。
- [ ] 遊戲支線計數67；清單不足時先查支線表與信箱、開發者島、燈塔三任務。
- [ ] 遊戲地城計數至少73；清單差異可並存，查沒有符號／菱形與隱藏入口。
- [ ] 12個法術已學；不足直接看法術名，不靠不斷跑洞碰運氣。
- [ ] 不同裝備至少101；先查固定金箱、Drakoth／兩個150洞／Lonely Cave／任務獎勵，再查隨機池。
- [ ] 等級至少99；若不足，先做尚未完成支線和地城，最後才考慮額外刷等。
- [ ] 所有19個非白金獎盃都實際取得；最後確認 Pawlatinum。

例：73/73洞、67/67任務但100/101裝備時，不應叫玩家無差別重跑所有洞；先檢查是否漏了晚期固定裝備洞，或金箱、任務專屬品。已超過獎盃門檻但未跳時，先核對同一存檔、不同件數與PS獎盃列表，保留畫面證據；不先建議刪存檔／重開。

## 5. 全20座獎盃 checklist

中文條件為自行整理；名稱保留獎盃原文，未冒充官方繁中譯名。每項 `已跳盃` 都是獨立核取方塊，與推定條件分開。[S01、S27]

| 已跳盃 | 穩定 ID 後綴（加 `cq2-tr-`） | 名稱 | 等級 | 條件／提示 |
| --- | --- | --- | --- | --- |
| [ ] | `pawlatinum` | Pawlatinum | 白金 | 其餘19座實際取得後確認 |
| [ ] | `kinghood-1` | Kinghood I | 銅 | 角色等級10 |
| [ ] | `kinghood-2` | Kinghood II | 銀 | 角色等級50 |
| [ ] | `kinghood-3` | Kinghood III | 金 | 角色等級99 |
| [ ] | `dungeon-1` | Dungeon Master I | 銅 | 清洞8 |
| [ ] | `dungeon-2` | Dungeon Master II | 銀 | 清洞38 |
| [ ] | `dungeon-3` | Dungeon Master III | 金 | 清洞73 |
| [ ] | `people-1` | Furriend of the People I | 銅 | 完成支線7 |
| [ ] | `people-2` | Furriend of the People II | 銀 | 完成支線37 |
| [ ] | `people-3` | Furriend of the People III | 金 | 完成支線67 |
| [ ] | `paws-together` | Paws Together | 金 | 主線與Epilogue完成 |
| [ ] | `arcane-1` | Arcane Paws I | 銅 | 學4種法術 |
| [ ] | `arcane-2` | Arcane Paws II | 銀 | 學8種法術 |
| [ ] | `arcane-3` | Arcane Paws III | 金 | 學12種法術 |
| [ ] | `fashion-1` | Fashionista Tails I | 銅 | 取得34件不同裝備 |
| [ ] | `fashion-2` | Fashionista Tails II | 銀 | 取得67件不同裝備 |
| [ ] | `fashion-3` | Fashionista Tails III | 金 | 取得101件不同裝備 |
| [ ] | `lupus` | The Lupus Empire | 金 | 經主線首次到犬國 |
| [ ] | `catventure` | Catventure Begins | 銅 | 完成開場第一任務 |
| [ ] | `royal-fur` | Royal Fur | 金 | 解鎖3項Royal Arts；與12法術不同 |

獎盃頁顯示「條件紀錄已達標／待核對實際跳盃」；若清單統計與玩家填的遊戲計數不同，並排顯示與提示對照，不擅自修改任一方。白金完成狀態只能以實際跳盃確認；進度頁可顯示已完成19/19條件，但不得自動打勾白金。

## 6. 支線67個：依任務系列查漏

每列一個真正的支線，完成交付後才勾。系列標題僅用來方便閱讀，不另外算一次完成數。表中階段為建議時機，等級為來源建議而非硬性進入條件；有些任務仍需主線解鎖。

資料校正：PlatGet表格實際只有66列，缺 `Return of the Cats`；本文件以其他清單與個別任務頁補回，**不是照表頭就宣稱已收齊67**。起點有移動／來源衝突的條目加註；不要以表內位置當GPS精確點。[S02、S03、S09、S28、S29]

### A起｜South Pawt

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Spell of the Cats | 10 | `cq2-sq-spell-of-the-cats` |
| [ ] | Curse of the Dogs | 12 | `cq2-sq-curse-of-the-dogs` |
| [ ] | Return of the Cats | 15 | `cq2-sq-return-of-the-cats` |

### A起｜古代法師，由Arcane Headpawters至Cat-Face Outlook

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | The Confurrsation of Secrets | 10 | `cq2-sq-the-confurrsation-of-secrets` |
| [ ] | The Ancient Realm | 13 | `cq2-sq-the-ancient-realm` |
| [ ] | The Order of the Emeowrald | 19 | `cq2-sq-the-order-of-the-emeowrald` |
| [ ] | The Purrotected Maze | 22 | `cq2-sq-the-purrotected-maze` |
| [ ] | Revenge of Furindelmeow | 25 | `cq2-sq-revenge-of-furindelmeow` |

### A起｜Fishercat Village

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Meat | 12 | `cq2-sq-meat` |
| [ ] | Meat Meat | 15 | `cq2-sq-meat-meat` |
| [ ] | Meat Meat Meeeaaat | 18 | `cq2-sq-meat-meat-meeeaaat` |

### A起｜Catnip Farm

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Rock, Paper, Scissors! | 15 | `cq2-sq-rock-paper-scissors` |

### A起｜Kit Cat信箱／Catpital周邊

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Case of the Missing Blueprint | 15 | `cq2-sq-case-of-the-missing-blueprint` |
| [ ] | Case of the Coded Note | 18 | `cq2-sq-case-of-the-coded-note` |
| [ ] | Case of the Secret Password | 20 | `cq2-sq-case-of-the-secret-password` |
| [ ] | Case of the Hidden Grudge | 22 | `cq2-sq-case-of-the-hidden-grudge` |
| [ ] | Case of the Missing Piece | 25 | `cq2-sq-case-of-the-missing-piece` |

### A至C｜Whiskerest

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Fur the Greater Good | 20 | `cq2-sq-fur-the-greater-good` |
| [ ] | Steal from the Rich | 25 | `cq2-sq-steal-from-the-rich` |
| [ ] | Give to the Poor | 30 | `cq2-sq-give-to-the-poor` |

### B起｜Pound Town與西南側接續NPC

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | The Lost Treasure | 25 | `cq2-sq-the-lost-treasure` |
| [ ] | Tale of a Cat and a Dog | 28 | `cq2-sq-tale-of-a-cat-and-a-dog` |
| [ ] | Pundora’s Box | 35 | `cq2-sq-pundora-s-box` |

### B起｜Wall of Lupus，Hotto Doggo工坊南方

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Prelude | 30 | `cq2-sq-prelude` |
| [ ] | The Second Movement | 32 | `cq2-sq-the-second-movement` |
| [ ] | Coda | 35 | `cq2-sq-coda` |

### C｜Laketown

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | The Spirit in the Lake | 30 | `cq2-sq-the-spirit-in-the-lake` |
| [ ] | Of Metals and Magic | 32 | `cq2-sq-of-metals-and-magic` |
| [ ] | Of Swords and the Worthy | 35 | `cq2-sq-of-swords-and-the-worthy` |

### C｜The Catpital

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Fur’s a Crowd | 35 | `cq2-sq-fur-s-a-crowd` |

### B至C｜Doge Town

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Fur the Son | 37 | `cq2-sq-fur-the-son` |
| [ ] | Fur the Mother | 40 | `cq2-sq-fur-the-mother` |
| [ ] | Fur the Furmily | 45 | `cq2-sq-fur-the-furmily` |

### C｜Pawt City／Pawt Bay燈塔

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Book of Water Walking | 50 | `cq2-sq-book-of-water-walking` |
| [ ] | Artefact of Water Walking | 52 | `cq2-sq-artefact-of-water-walking` |
| [ ] | Gift of Water Walking | 55 | `cq2-sq-gift-of-water-walking` |

### C至D｜Felingard Statue附近

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Rivals of a Kind | 50 | `cq2-sq-rivals-of-a-kind` |

### D至E｜Throne of Lupus

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Bad Propawganda | 55 | `cq2-sq-bad-propawganda` |
| [ ] | Bad Doggos | 60 | `cq2-sq-bad-doggos` |
| [ ] | The True Weapon | 65 | `cq2-sq-the-true-weapon` |
| [ ] | The Pawsitively Secret Contact | 70 | `cq2-sq-the-pawsitively-secret-contact` |
| [ ] | The Doge Knight | 70 | `cq2-sq-the-doge-knight` |
| [ ] | Skull of a Warrior | 80 | `cq2-sq-skull-of-a-warrior` |

### D至E｜Twin Towns

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | The Twin Delivery | 60 | `cq2-sq-the-twin-delivery` |
| [ ] | The Twin Delivery…again | 63 | `cq2-sq-the-twin-delivery-again` |
| [ ] | The Twin Caves | 65 | `cq2-sq-the-twin-caves` |
| [ ] | The Twin Caves…again | 65 | `cq2-sq-the-twin-caves-again` |

### D至E｜Purrmaha Beach → 犬國王城／Bat Cove → 回海灘

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Finding Purr-rivate Mewan | 65 | `cq2-sq-finding-purr-rivate-mewan` |
| [ ] | Tracking Purr-rivate Mewan | 67 | `cq2-sq-tracking-purr-rivate-mewan` |
| [ ] | Faking Purr-rivate Mewan | 70 | `cq2-sq-faking-purr-rivate-mewan` |
| [ ] | Rescuing Purr-rivate Mewan | 72 | `cq2-sq-rescuing-purr-rivate-mewan` |

### D至E｜Hotto Doggo信箱

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | The Pawlatinum Chef | 65 | `cq2-sq-the-pawlatinum-chef` |
| [ ] | The Power of the Horde | 70 | `cq2-sq-the-power-of-the-horde` |
| [ ] | Over the Limit | 80 | `cq2-sq-over-the-limit` |

### D至E｜The Pawasis／Bullet Heaven外接續

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Good Intentions | 70 | `cq2-sq-good-intentions` |
| [ ] | Bad Consequences | 73 | `cq2-sq-bad-consequences` |
| [ ] | Wooftopia | 75 | `cq2-sq-wooftopia` |

### E｜The Banished／Barkara Desert

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | The Young Pup | 80 | `cq2-sq-the-young-pup` |
| [ ] | The Talented Soldier | 85 | `cq2-sq-the-talented-soldier` |
| [ ] | The Magic User | 90 | `cq2-sq-the-magic-user` |
| [ ] | The Powerful One | 95 | `cq2-sq-the-powerful-one` |
| [ ] | The Dragonblood | 99 | `cq2-sq-the-dragonblood` |

### E至F｜North Watch

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | The Epic Staredown | 100 | `cq2-sq-the-epic-staredown` |

### D至E｜Founders Island II

| 完成 | 支線原名 | 參考等級 | 穩定 ID |
| --- | --- | --- | --- |
| [ ] | Accept This Now! | 999（玩笑標示） | `cq2-sq-accept-this-now` |
| [ ] | Deleting Data Now! | 999（玩笑標示） | `cq2-sq-deleting-data-now` |
| [ ] | Oh, You’re Gonna Get It Now! | 999（玩笑標示） | `cq2-sq-oh-you-re-gonna-get-it-now` |
| [ ] | This Is It! | 999（玩笑標示） | `cq2-sq-this-is-it` |

系列內可按實際任務接續顯示下一個，**不把所有相同聚落的任務強制排成同一條先後依賴**；例如王城不同NPC有各自任務。主線未解鎖而找不到任務時保留未完成，不設「不可取得」永久狀態。

已核實的具體補救例：

- `Curse of the Dogs`：South Pawt北的卷軸引導進Catpital Cave，探查洞內居民，出洞回報；後續為Return of the Cats。[S29]
- `Return of the Cats`：前項完成後找Not the Head Towncat，沿路護送、擊退兩次埋伏後交付。[S28]
- `The Order of the Emeowrald`：古代法師指向Paw's Cave，處理洞末敵人、拿任務箱回報。[S30]
- `Tale of a Cat and a Dog`：到Pawful Cave完成骷髏的身體相關事件，遇墓碑用陷阱／Royal Damage，回洞外對話。[S21]
- `The Pawsitively Secret Contact`：依指引入Pawasis Cave，翻滾穿過魔法圈、取箱，送往Cave of the Lion附近聯絡人；General's Mace為核對獎勵。[S31]

其餘任務本版提供具名、分區、系列與時機導航；沒有逐任務解謎答案的項目不展示「完整詳細解法」徽章。

## 7. 法術12種：位置與順路提示

ID一律 `cq2-sp-` 加下表後綴。實際讀石碑後勾；升級同法術不重複計數。[S06]

| 已學 | ID後綴 | 原名 | 何時提醒／位置 | 用途建議 |
| --- | --- | --- | --- | --- |
| [ ] | flamepurr | Flamepurr | A01，Brave Cave教學 | 近身範圍傷害 |
| [ ] | freezepaw | Freezepaw | A01，Brave Cave教學 | 控速，幫助拉距離 |
| [ ] | healpaw | Healpaw | A03，King Sigil島上戶外石碑 | 基礎補血，先裝上 |
| [ ] | furry-shield | Furry Shield | A02起，Cave Grotto | 防禦輔助 |
| [ ] | lightnyan | Lightnyan | B01，Pound Town北／Wall of Lupus西 | 另一屬性傷害選擇 |
| [ ] | forcewoofer | Forcewoofer | B02，Far-Fetched Cave | 戰鬥輔助／傷害，依遊戲說明搭配 |
| [ ] | manapaw | Manapaw | B02起，The Banished東／Barkara入口北附近戶外 | 魔力支援 |
| [ ] | purrserk | Purrserk | A後至C，Whisk Cove | 攻擊輔助；來源也拼Purrzerk |
| [ ] | astropaw | Astropaw | D01水行後，Twin Towns北方離島／The Long Road西北 | 離島收集 |
| [ ] | cattrap | Cattrap | D01水行後，Drakoth's Vault西側島上 | 場地法術；非墓碑必要的環境陷阱 |
| [ ] | gravi-ruff | Gravi-ruff | D01，Tomb of the Follower | 集中敵人，金鑰匙戰可用 |
| [ ] | celestail | Celestail | F02，Cactus Cave | 最後查漏，先確認戰力 |

後五項順序可依實際路徑調整。新增法術與法術槽裝備是兩件事：取得後即使沒有裝上，也不應在清單中消失。

## 8. 地城查漏：73個基準條目

- 此處是可打勾的**具名查漏索引**，不是每洞都已核實的逐房間攻略。
- 73條目以CHR基準名單整理，位置與別名參照其他表／Wiki；來源拼法錯誤保留別名搜尋。不同攻略對劇情通道是否列入表有差異，不用73條目反推精確世界總量。
- Pugger Maze／Puggy Maze目前只設一個待核對的別名候選，不自行增加第二個已核實地城。若實機證明有兩個不同洞，新增ID並做遷移，不把現有紀錄任意拆分。
- 表中地標是文字定位；「初步定位」不能當已核實精確入口。通用清洞判準為清敵、開全部箱、檢查未完圖示；只有有證據的個別走法才另外顯示。
- CHR與其他資料的Furrible Purrison／Furrible Cave、Duo's Ruins／King Duos Ruins等列為候選別名，保留名稱核對旗標；不能單憑拼字相近靜默合併玩家已有不同項。

| 已清 | 地城名稱 | 建議階段 | 地標／前置／特殊檢查 | 穩定 ID |
| --- | --- | --- | --- | --- |
| [ ] | Barking Cave | B至F | Wall of Lupus西北（文字初步定位） | `cq2-dg-barking-cave` |
| [ ] | Bat Cove | E至F | 王城西側；The Doge Knight任務鑰匙 | `cq2-dg-bat-cove` |
| [ ] | Bay Cave | C | 水行任務Artefact相關 | `cq2-dg-bay-cave` |
| [ ] | Blue Cave | C至F | Puss Fields（文字初步定位） | `cq2-dg-blue-cave` |
| [ ] | Brave Cave | A | 教學兩法術；開場海岸 | `cq2-dg-brave-cave` |
| [ ] | Bullet Heaven | C至F | Throne of Lupus東側（文字初步定位） | `cq2-dg-bullet-heaven` |
| [ ] | Cactus Cave | F | Pawasis北；Celestail與金箱Zero Willpower | `cq2-dg-cactus-cave` |
| [ ] | Catpital Cave | A至F | Catpital湖區（文字初步定位） | `cq2-dg-catpital-cave` |
| [ ] | Cave Grotto | A | Catpital湖區；Furry Shield | `cq2-dg-cave-grotto` |
| [ ] | Cave Mercy | D至F | King's Paw離島（文字初步定位） | `cq2-dg-cave-mercy` |
| [ ] | Cave of the Lion | F | Puss Fields；擊敗Aelius後解鎖，三件Purrsecutor裝備 | `cq2-dg-cave-of-the-lion` |
| [ ] | Cave Peasy | B至F | Whiskerest附近（文字初步定位） | `cq2-dg-cave-peasy` |
| [ ] | Cave Valor | D至F | King's Paw離島（文字初步定位） | `cq2-dg-cave-valor` |
| [ ] | Cave Virtue | D至F | King's Paw離島（文字初步定位） | `cq2-dg-cave-virtue` |
| [ ] | Cursed Ruins | D至F | The Deep Forest（文字初步定位） | `cq2-dg-cursed-ruins` |
| [ ] | Decem Ruins | A至F | Cat-Face Outlook一帶（文字初步定位） | `cq2-dg-decem-ruins` |
| [ ] | Devigni Ruins | B至F | Doge Town西北（文字初步定位） | `cq2-dg-devigni-ruins` |
| [ ] | Drakoth's Vault | F | 王城西島；兩把Drakoth鑰匙，固定三裝備 | `cq2-dg-drakoth-s-vault` |
| [ ] | Duodecim Ruins | B至F | Doge Town西南（文字初步定位） | `cq2-dg-duodecim-ruins` |
| [ ] | Duo's Ruins | C至F | Whiskerest一帶；與King Duos Ruins名稱對應待核實 | `cq2-dg-duo-s-ruins` |
| [ ] | Empty Hole | B至F | Wall of Lupus北側（文字初步定位） | `cq2-dg-empty-hole` |
| [ ] | Far-fetched Cave | B | Doge Town北；北方通路與Forcewoofer | `cq2-dg-far-fetched-cave` |
| [ ] | Furrest Cave | A至F | Cat-Face Outlook一帶（文字初步定位） | `cq2-dg-furrest-cave` |
| [ ] | Furrible Purrison | D至F | 湖區；與Furrible Cave名稱對應待核實 | `cq2-dg-furrible-purrison` |
| [ ] | Fursaken Cave | D至F | The Deep Forest（文字初步定位） | `cq2-dg-fursaken-cave` |
| [ ] | Hidden Cave | D或E | Catnip Farm東；Hidden Key、3 Mimics、Golden Key、The Architect | `cq2-dg-hidden-cave` |
| [ ] | Hidden Stash | F | 王城東南／Dog Barracks附近；需Ultimutt鑰匙 | `cq2-dg-hidden-stash` |
| [ ] | Howling Maze | C至F | The Pawasis附近（文字初步定位） | `cq2-dg-howling-maze` |
| [ ] | King Lionardo's Trial | A | 貓國東北／北岸試煉；主線鑰匙；Ruins為來源別名 | `cq2-dg-king-lionardo-s-trial` |
| [ ] | King Sigil | A至F | Arcane Headpawters附近（文字初步定位） | `cq2-dg-king-sigil` |
| [ ] | King Woofhauser's Trial | B | 北方試煉區；走Far-Fetched通路；Ruins為別名 | `cq2-dg-king-woofhauser-s-trial` |
| [ ] | Lonely Cave | F | Whiskerest東北；高等刺蝟，三固定裝備 | `cq2-dg-lonely-cave` |
| [ ] | Mountain Cave | C至F | Blue Mountains（文字初步定位） | `cq2-dg-mountain-cave` |
| [ ] | Novem Ruins | A至F | 貓國北岸（文字初步定位） | `cq2-dg-novem-ruins` |
| [ ] | Octo Ruins | A至F | Catpital周邊（文字初步定位） | `cq2-dg-octo-ruins` |
| [ ] | Path to Lupus Tomb | D | 沙漠墓區；主線側路通道，Unknown為候選別名 | `cq2-dg-path-to-lupus-tomb` |
| [ ] | Paw's Cave | A至F | Catpital周邊（文字初步定位） | `cq2-dg-paw-s-cave` |
| [ ] | Pawasis Cave | D至F | The Pawasis附近（文字初步定位） | `cq2-dg-pawasis-cave` |
| [ ] | Pawful Cave | B至F | Pound Town附近（文字初步定位） | `cq2-dg-pawful-cave` |
| [ ] | Pawreign Cave | B至F | Twin Towns附近（文字初步定位） | `cq2-dg-pawreign-cave` |
| [ ] | Pawt Cave | C初訪／F回收 | Pawt City附近；多入口，水行後找通往怪物箱入口 | `cq2-dg-pawt-cave` |
| [ ] | Pugger Maze | F | 西方島群；Puggy／Pugger對應待核實 | `cq2-dg-pugger-maze` |
| [ ] | Purrcluded Cave | A至F | Cat-Face Outlook一帶（文字初步定位） | `cq2-dg-purrcluded-cave` |
| [ ] | Purrn Cave | C至F | Purrning Forest（文字初步定位） | `cq2-dg-purrn-cave` |
| [ ] | Puss Cave | B至F | Twin Towns附近（文字初步定位） | `cq2-dg-puss-cave` |
| [ ] | Quadecim Ruins | B至F | Wall of Lupus附近（文字初步定位） | `cq2-dg-quadecim-ruins` |
| [ ] | Quattor Ruins | D至F | Felingard湖區（文字初步定位） | `cq2-dg-quattor-ruins` |
| [ ] | Quindecim Ruins | D至F | The Pawasis北側（文字初步定位） | `cq2-dg-quindecim-ruins` |
| [ ] | Quinque Ruins | D至F | Pawt City西方海域（文字初步定位） | `cq2-dg-quinque-ruins` |
| [ ] | River Hole | A至F | Catpital周邊（文字初步定位） | `cq2-dg-river-hole` |
| [ ] | Riverside Cove | A至F | Catpital周邊（文字初步定位） | `cq2-dg-riverside-cove` |
| [ ] | Roverdose Maze | D至F | Throne of Lupus附近（文字初步定位） | `cq2-dg-roverdose-maze` |
| [ ] | Ruff Cove | B至F | Pound Town附近（文字初步定位） | `cq2-dg-ruff-cove` |
| [ ] | Sandy Pit | B至F | Doge Town周邊（文字初步定位） | `cq2-dg-sandy-pit` |
| [ ] | Saxim Ruins | B至F | Felingard湖區（文字初步定位） | `cq2-dg-saxim-ruins` |
| [ ] | Seaside Cove | A至F | Catpital湖區（文字初步定位） | `cq2-dg-seaside-cove` |
| [ ] | Sedecim Ruins | D至F | Throne of Lupus南方島（文字初步定位） | `cq2-dg-sedecim-ruins` |
| [ ] | Septem Ruins | A至F | Catpital周邊（文字初步定位） | `cq2-dg-septem-ruins` |
| [ ] | Septencin Ruins | B至F | Doge Town北側（文字初步定位） | `cq2-dg-septencin-ruins` |
| [ ] | Terrier-fying Tomb | D至F | The Pawasis附近（文字初步定位） | `cq2-dg-terrier-fying-tomb` |
| [ ] | Tomb of the Follower | D | Throne of Lupus附近；Gravi-ruff | `cq2-dg-tomb-of-the-follower` |
| [ ] | Tomb of the Wolf | F | 王城西側；擊敗Aelius後解鎖，三件Labrathor裝備 | `cq2-dg-tomb-of-the-wolf` |
| [ ] | Tombstone Cave | F | 沙漠南；墓碑用環境陷阱／Royal Damage；等級資料衝突 | `cq2-dg-tombstone-cave` |
| [ ] | Tres Ruins | D至F | Felingard湖區（文字初步定位） | `cq2-dg-tres-ruins` |
| [ ] | Triginta Ruins | D至F | The Pawasis西側（文字初步定位） | `cq2-dg-triginta-ruins` |
| [ ] | Troll Cave | F | Doge Town東島；三金箱開完才清洞 | `cq2-dg-troll-cave` |
| [ ] | Ultimutt Stash | F | Dog Barracks周邊／王城西南；找Hidden Stash鑰匙 | `cq2-dg-ultimutt-stash` |
| [ ] | Undecim Ruins | B至F | Pound Town附近（文字初步定位） | `cq2-dg-undecim-ruins` |
| [ ] | Undevinti Ruins | D至F | Throne of Lupus附近（文字初步定位） | `cq2-dg-undevinti-ruins` |
| [ ] | Unus Ruins | C至F | Whiskerest附近（文字初步定位） | `cq2-dg-unus-ruins` |
| [ ] | Whisk Cove | A至C | Eastpaw Beach；Purrserk | `cq2-dg-whisk-cove` |
| [ ] | Winding Cave | B至F | Wall of Lupus周邊（文字初步定位） | `cq2-dg-winding-cave` |
| [ ] | Wyvern Nest | D至F | Pound Town東南（文字初步定位） | `cq2-dg-wyvern-nest` |

### 8.1 另行辨識的劇情地點與額外內容

- Felingard's Statue／First Bridge：主線跨國導航，先作地點關聯，不在未核實計數時額外增加一個清洞分母。
- Trial of the First Kings：主線確定需要前往，但基準73索引的計數對應未完全釐清，先以`cq2-loc-trial-first-kings`作地點；不能為湊數刪其他洞。
- King Felingard's Tomb／King Lupus I 的主線墓區：與晚期Tomb of the Wolf不同，先作主線地點關聯；若後續核實可清洞，再新增或對應實體ID。
- 兩個Drakoth鑰匙試煉：先以`cq2-key-drakoth-south`、`cq2-key-drakoth-west`兩個鑰匙事實記錄；兩入口是否各算地城待核實，不因來源表格各一列就多算兩洞。
- Infinity Tomb：更新挑戰，預設從白金主線隱藏，可在「額外內容」顯示；不要求為73地城或101裝備去刷它。

### 8.2 地城卡的真正完成定義

玩家能查名稱、地標、任務／鑰匙限制與已核實的特殊提醒，能直接勾清洞，能從相關裝備回到這一洞。沒有詳細走法時寫明「位置索引可用，逐房間走法尚未收錄」，不以通用「貼牆走」代替全部洞的正式攻略。

地城清洞框**不自動勾**該洞裝備／法術／鑰匙。可展示「清洞後請核對以下3件裝備」的共用勾選列；這些是同一實體，不是另一份副本。

## 9. 裝備 checklist：101個基準條目＋更新項目

每件只有一個「已取得」框，不需要紀錄全裝備等級。清單主要用途是拿背包逐名對照最後缺的幾件，不是要求每次隨機掉落都開網頁登記。

原始101從早期名單與部位表對照；更正明顯拼字錯誤，以已知異名搜尋。同一物品如Cat Soldier Helm／Helmet、Pawtimate／Pawtimate Armor、Hawt Dog／Hawt Dawg，不能建立兩件紀錄。`The Dragonmaler`為舊攻略筆誤，搜尋導向The Dragonmaker。

表內「未逐件核實」代表目前未收錄可靠的特定出處，不代表一定隨機掉落。不得因沒有資料就標成某一座洞的保證獎勵。各裝備名稱／部位為遊戲事實索引；完整掉落池與數值Build非本版已完成範圍。[S02、S06、S15、S32、S33]

| 已取得 | 名稱 | 部位 | 已核實的優先核對位置／限制 | 穩定 ID |
| --- | --- | --- | --- | --- |
| [ ] | Arcane Mage Hat | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-arcane-mage-hat` |
| [ ] | Arcane Mage Vest | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-arcane-mage-vest` |
| [ ] | Arcane Staff | 法杖 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-arcane-staff` |
| [ ] | Bard Hat | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-bard-hat` |
| [ ] | Bard Lute | 法杖 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-bard-lute` |
| [ ] | Bard Vest | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-bard-vest` |
| [ ] | Blue Mage Hat | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-blue-mage-hat` |
| [ ] | Blue Mage Vest | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-blue-mage-vest` |
| [ ] | Bone-raiser | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-bone-raiser` |
| [ ] | Cat Rags | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-cat-rags` |
| [ ] | Cat Soldier Armor | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-cat-soldier-armor` |
| [ ] | Cat Soldier Helm | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-cat-soldier-helm` |
| [ ] | Cat Soldier Sword | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-cat-soldier-sword` |
| [ ] | Catnip Bravo Jumper | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-catnip-bravo-jumper` |
| [ ] | Catnip Bravo Mask | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-catnip-bravo-mask` |
| [ ] | Catventurer Blade | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-catventurer-blade` |
| [ ] | Catventurer Hat | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-catventurer-hat` |
| [ ] | Catventurer Vest | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-catventurer-vest` |
| [ ] | Chef Hat | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-chef-hat` |
| [ ] | Chef Vest | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-chef-vest` |
| [ ] | Crimson Armor | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-crimson-armor` |
| [ ] | Crimson Edge | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-crimson-edge` |
| [ ] | Crimson Helm | 頭 | Catnip Farm附近金箱 | `cq2-eq-crimson-helm` |
| [ ] | Dog Rags | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-dog-rags` |
| [ ] | Dog Soldier Armor | 身體 | Return of the Cats獎勵之一 | `cq2-eq-dog-soldier-armor` |
| [ ] | Dog Soldier Helmet | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-dog-soldier-helmet` |
| [ ] | Dog Soldier Sword | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-dog-soldier-sword` |
| [ ] | Doge Knight Armor | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-doge-knight-armor` |
| [ ] | Doge Knight Cowl | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-doge-knight-cowl` |
| [ ] | Dragonfire | 近戰武器 | Quinque Ruins西側金箱 | `cq2-eq-dragonfire` |
| [ ] | Dragonfrost | 近戰武器 | Catpital東北金箱 | `cq2-eq-dragonfrost` |
| [ ] | Dragonvoid | 近戰武器 | Barkara Desert金箱 | `cq2-eq-dragonvoid` |
| [ ] | Drakoth Armor | 身體 | F02；Drakoth's Vault固定三裝備之一 | `cq2-eq-drakoth-armor` |
| [ ] | Drakoth Helmet | 頭 | F02；Drakoth's Vault固定三裝備之一 | `cq2-eq-drakoth-helmet` |
| [ ] | Dumbbell | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-dumbbell` |
| [ ] | Elder Mage Beard | 頭 | Barkara北側入口附近金箱 | `cq2-eq-elder-mage-beard` |
| [ ] | Elder Mage Robes | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-elder-mage-robes` |
| [ ] | Elder Stick | 法杖 | Arcane Headpawters南側金箱 | `cq2-eq-elder-stick` |
| [ ] | Excalipurr | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-excalipurr` |
| [ ] | Fire Mage Hat | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-fire-mage-hat` |
| [ ] | Fire Mage Vest | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-fire-mage-vest` |
| [ ] | Fire Staff | 法杖 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-fire-staff` |
| [ ] | General’s Mace | 近戰武器 | The Pawsitively Secret Contact任務獎勵 | `cq2-eq-general-s-mace` |
| [ ] | Gentle Monocle | 頭 | D02；開發者島金箱 | `cq2-eq-gentle-monocle` |
| [ ] | Gentle Suit | 身體 | D02；開發者島This Is It!任務獎勵 | `cq2-eq-gentle-suit` |
| [ ] | Healing Staff | 法杖 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-healing-staff` |
| [ ] | Ice Mage Hat | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-ice-mage-hat` |
| [ ] | Ice Mage Vest | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-ice-mage-vest` |
| [ ] | Ice Staff | 法杖 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-ice-staff` |
| [ ] | Invisibility Fur Coat | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-invisibility-fur-coat` |
| [ ] | Jester Aee Cap | 頭 | King's Paw西側金箱 | `cq2-eq-jester-aee-cap` |
| [ ] | Jester Aee Mace | 近戰武器 | Pawt Cave北出口附近金箱 | `cq2-eq-jester-aee-mace` |
| [ ] | Jester Aee Suit | 身體 | Saxim Ruins附近金箱 | `cq2-eq-jester-aee-suit` |
| [ ] | Jester Bee Cap | 頭 | F03；Lonely Cave固定獎勵 | `cq2-eq-jester-bee-cap` |
| [ ] | Jester Bee Mace | 近戰武器 | The Purrsecutor島金箱 | `cq2-eq-jester-bee-mace` |
| [ ] | Jester Bee Suit | 身體 | F03；Lonely Cave固定獎勵 | `cq2-eq-jester-bee-suit` |
| [ ] | Knight Armor | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-knight-armor` |
| [ ] | Knight Axe | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-knight-axe` |
| [ ] | Knight Helm | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-knight-helm` |
| [ ] | Labrathor Helm | 頭 | F03；Tomb of the Wolf固定獎勵 | `cq2-eq-labrathor-helm` |
| [ ] | Labrathor Vest | 身體 | F03；Tomb of the Wolf固定獎勵 | `cq2-eq-labrathor-vest` |
| [ ] | Lightning Staff | 法杖 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-lightning-staff` |
| [ ] | Mewlder Wand | 法杖 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-mewlder-wand` |
| [ ] | Ninja Hood | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-ninja-hood` |
| [ ] | Ninja Katana | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-ninja-katana` |
| [ ] | Ninja Shroud | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-ninja-shroud` |
| [ ] | Old Master Body | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-old-master-body` |
| [ ] | Old Master Head | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-old-master-head` |
| [ ] | Old Master Mace | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-old-master-mace` |
| [ ] | Pawlonijr | 法杖 | F03；Tomb of the Wolf固定獎勵 | `cq2-eq-pawlonijr` |
| [ ] | Pawple Katana | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-pawple-katana` |
| [ ] | Pawple Ninja Hood | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-pawple-ninja-hood` |
| [ ] | Pawple Ninja Shroud | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-pawple-ninja-shroud` |
| [ ] | Pawtimate Armor | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-pawtimate-armor` |
| [ ] | Purrsecution | 近戰武器 | F03；Cave of the Lion固定獎勵 | `cq2-eq-purrsecution` |
| [ ] | Purrsecutor Armor | 身體 | F03；Cave of the Lion固定獎勵 | `cq2-eq-purrsecutor-armor` |
| [ ] | Purrsecutor Helm | 頭 | F03；Cave of the Lion固定獎勵 | `cq2-eq-purrsecutor-helm` |
| [ ] | Ranger Axe | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-ranger-axe` |
| [ ] | Ranger Cap | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-ranger-cap` |
| [ ] | Ranger Vest | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-ranger-vest` |
| [ ] | Scout Armor | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-scout-armor` |
| [ ] | Scout Helmet | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-scout-helmet` |
| [ ] | Scout Sword | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-scout-sword` |
| [ ] | Skeleton King Armor | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-skeleton-king-armor` |
| [ ] | Skeleton King Crown | 頭 | Deep Forest金箱；另有其他來源 | `cq2-eq-skeleton-king-crown` |
| [ ] | Storm Armor | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-storm-armor` |
| [ ] | Storm Helm | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-storm-helm` |
| [ ] | Stormbringer | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-stormbringer` |
| [ ] | The Architect | 法杖 | D02；Hidden Cave前段金箱 | `cq2-eq-the-architect` |
| [ ] | The Bataxe | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-the-bataxe` |
| [ ] | The Dragonmaker | 近戰武器 | F02；Drakoth's Vault固定三裝備之一 | `cq2-eq-the-dragonmaker` |
| [ ] | The Hawt Dog | 近戰武器 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-the-hawt-dog` |
| [ ] | The Kingsblade | 近戰武器 | E03；The Eye of Eternity事件 | `cq2-eq-the-kingsblade` |
| [ ] | White Mage Hat | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-white-mage-hat` |
| [ ] | White Mage Robes | 身體 | The Order of the Emeowrald獎勵之一 | `cq2-eq-white-mage-robes` |
| [ ] | Wraith Armor | 身體 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-wraith-armor` |
| [ ] | Wraith Helm | 頭 | 特定出處未逐件核實；先對照背包，不填假位置 | `cq2-eq-wraith-helm` |
| [ ] | Wraith Mace | 近戰武器 | Excavation Site金箱 | `cq2-eq-wraith-mace` |
| [ ] | Zero Courage | 身體 | Cathulu附近金箱 | `cq2-eq-zero-courage` |
| [ ] | Zero Faith | 近戰武器 | F03；Lonely Cave固定獎勵 | `cq2-eq-zero-faith` |
| [ ] | Zero Willpower | 頭 | Cactus Cave金箱 | `cq2-eq-zero-willpower` |

### 9.1 更新項目獨立列出，不把它們偽裝成原始101

| 已取得 | 名稱 | 部位 | 範圍／路線決策 | ID |
| --- | --- | --- | --- | --- |
| [ ] | Bam Bam Hammer | 近戰武器 | 更新物品；精確取得點待查，遇到可記 | `cq2-eq-bam-bam-hammer` |
| [ ] | Dark Old Master Axe | 近戰武器 | Infinity Tomb更新挑戰；白金不強制 | `cq2-eq-dark-old-master-axe` |
| [ ] | Dark Old Master Body | 身體 | Infinity Tomb更新挑戰；白金不強制 | `cq2-eq-dark-old-master-body` |
| [ ] | Dark Old Master Head | 頭 | Infinity Tomb更新挑戰；白金不強制 | `cq2-eq-dark-old-master-head` |
| [ ] | Dark Old Master Mace | 近戰武器 | Infinity Tomb更新挑戰；白金不強制 | `cq2-eq-dark-old-master-mace` |
| [ ] | Dark Old Master Staff | 法杖 | Infinity Tomb更新挑戰；白金不強制 | `cq2-eq-dark-old-master-staff` |
| [ ] | Mystery Meat | 近戰武器 | 更新物品；精確取得點待查，遇到可記 | `cq2-eq-mystery-meat` |

本文件共列108個具名裝備條目；**不等於更新後完整裝備總量已核實**。Wiki另列First King系列／Kingsblade II等Mew Game相關物品，本版只在額外內容說明，不要求為了白金收齊。若未來加入新裝備，另加穩定ID，保留這108項已有紀錄，不因新增資料改寫白金門檻。

### 9.2 最後缺裝備時怎樣查

1. 裝備頁先選「未取得」，分類頭／身體／武器／法杖，對照背包原名或別名。
2. 固定出處已核實的項目優先：兩把鑰匙的Drakoth套裝、兩個Aelius後洞、Lonely Cave、金鑰匙三件與金箱專屬品。
3. 再回支線清單核對任務獎勵。查任務完成不代表網站自動勾獎勵。
4. 只在剩隨機池項目時針對已查明的池找來源；本版未逐件核實者顯示「待查出處」與來源入口，不宣稱重進任何洞就能刷新新箱。

## 10. 金箱22個定位索引

它們是裝備與少數地城清洞的輔助清單，**不是第六種白金全收集獎盃**。全部需要Golden Key；有些是隨機傳說池／金錢，開箱不自動勾某件裝備。本表按S16列出的22個位置整理，精確畫面座標與目前版本完整總量未核實。

| 已開 | 地區／地標 | 固定物品或內容類型 | ID |
| --- | --- | --- | --- |
| [ ] | 貓國／Hidden Cave | The Architect | `cq2-gc-felingard-hidden-cave` |
| [ ] | 貓國／The Purrsecutor島 | Jester Bee Mace | `cq2-gc-purrsecutor-island` |
| [ ] | 貓國／Catpital東北 | Dragonfrost | `cq2-gc-catpital-northeast` |
| [ ] | 貓國／Deep Forest | Skeleton King Crown | `cq2-gc-deep-forest` |
| [ ] | 海域／Cathulu附近 | Zero Courage | `cq2-gc-cathulu` |
| [ ] | 貓國／Arcane Headpawters南方 | Elder Stick | `cq2-gc-arcane-south` |
| [ ] | 海域／Quinque Ruins西方 | Dragonfire | `cq2-gc-quinque-west` |
| [ ] | 貓國／Pawt Cave北側出口附近 | Jester Aee Mace | `cq2-gc-pawt-north` |
| [ ] | 貓國／Saxim Ruins附近 | Jester Aee Suit | `cq2-gc-saxim` |
| [ ] | 東南島／Founders Island II | Gentle Monocle | `cq2-gc-founders` |
| [ ] | King's Paw西方 | Jester Aee Cap | `cq2-gc-kings-paw-west` |
| [ ] | 貓國／Catnip Farm附近 | Crimson Helm | `cq2-gc-catnip` |
| [ ] | 貓國／Purrmaha Beach | 隨機傳說池；不保證新物品 | `cq2-gc-purrmaha` |
| [ ] | 貓國／Felingard Lake | 隨機傳說池；不保證新物品 | `cq2-gc-felingard-lake` |
| [ ] | 貓國／Whiskerest | 隨機傳說池；不保證新物品 | `cq2-gc-whiskerest` |
| [ ] | 犬國／Cactus Cave | Zero Willpower | `cq2-gc-cactus` |
| [ ] | 犬國／Barkara Desert | Dragonvoid | `cq2-gc-barkara` |
| [ ] | 犬國／Barkara北側入口附近 | Elder Mage Beard | `cq2-gc-barkara-north` |
| [ ] | 犬國／Excavation Site | Wraith Mace | `cq2-gc-excavation` |
| [ ] | 犬國／Wall of Lupus | 隨機傳說池；不保證新物品 | `cq2-gc-wall` |
| [ ] | 犬國／Far-Fetched Sands附近Kingsmarker | 隨機傳說池；不保證新物品 | `cq2-gc-far-fetched-marker` |
| [ ] | 犬國／Dog Barracks | 隨機傳說池；不保證新物品 | `cq2-gc-barracks` |

Troll Cave另有三個只出金錢的金箱，放在該洞清洞卡中；未把這22筆表格誤稱世界所有金箱總數。若要逐箱記，可使用`cq2-gc-troll-1/2/3`，位置對應待實機補核，不能填不存在的東／西／北座標。

## 11. 小訣竅與Build：短、可換、順路取得

### 前期：先讓戰鬥順，不追終局神裝

- 近戰角色用短連段補魔，再閃避；另一名拿法杖補足遠程與不同傷害類型。
- Healpaw先確保會用，常用傷害法術選一兩個升級，避免把錢平均灑到用不到的東西。
- Kit Cat升防具／頭部，Hotto Doggo升武器，Arcane Temple升法術。重複裝備也會升既有那件。[S17]
- 看紅色範圍離開再輸出；被圍時先移動，不為救伙伴站著硬吃傷害。
- 新版防禦條會吸收傷害並在不受攻擊時慢慢恢復，拉開距離有實際作用；持續跑會加速，移動不用全程滾。[S05]

### 中後期：金鑰匙路線取得後的施法支援

- Gentle Suit＋Gentle Monocle＋The Architect是可考慮的減耗組合，三件就在D02鏈上。
- 使用Gravi-ruff限制敵人移動，再配合遠程與閃避；不要把它寫成「所有Boss永久無法行動」。
- 裝備等級與被動都要看，低等新裝不一定勝過目前主力。不要為了照抄套裝犧牲生存。
- Mewlder Wand等極端減血裝不列一般白金必備；先以穩定為主。

### 最後掃尾

- Lv99通常會隨支線與清洞累積；先清未完成內容，再評估是否真的需要專門刷等。
- 不要求練滿級、全裝備升滿、全額外模式或每日上線。
- 不能以網站清單已勾滿，替代遊戲計數或PS獎盃跳盃確認。

## 12. 私人控制台：四個主要頁面

技術定位：Windows本機瀏覽器；繁體中文；既有repo優先，無既有工程才預設Vue3＋TypeScript＋Vite。這是交接規格，本次沒有建立網站。

| 主要頁面 | 使用者能做什麼 | 必須如何確認完成 |
| --- | --- | --- |
| 遊玩路線 | 選六階段、閱讀步驟、勾進度；當下看順路收藏／風險／回訪；回到下一步 | 未完全文展開，勾完收合；回訪卡能直達同一個地城或物品，紀錄相通 |
| 查漏清單 | 支線／地城／法術／裝備／金箱分頁籤；按區域與分類篩選、搜尋、勾選 | 預設未完成，勾掉即移出；結果連續呈現；關聯跳轉可找到目標；缺資料明示 |
| 獎盃 | 20座門檻與條件進度、實際跳盃確認；點缺項看清單 | 達門檻僅提示，跳盃框不自動改；白金也需確認 |
| 小訣竅與資料 | 看短Build、疑難、來源與覆蓋缺口；開備份／匯入工具 | 能從卡片查證來源；匯出可還原；不把研究紀錄塞滿遊玩頁 |

不設獨立NPC頁、材料製作頁、每日／週期頁、開放世界任務追蹤服務、帳號系統或虛構互動地圖。未來若取得可靠地圖座標，可作查漏頁的視圖，不先建空頁。

### 12.1 路線與回鍋導航

- 頂部提供「繼續下一步」、六階段索引、目前完成數與保存狀態。
- 下一步以最早尚未完成的必要路線步驟為基礎，搭配前置旗標；D02金鑰匙允許延後，不因它未完阻斷D03。
- 已完成可展開重讀；目前閱讀章節可任選。`readingStepId`、展開狀態、`completed`三者獨立。
- 步驟完成後僅收合本步；未完成子項預設展開。保留該階段仍需知道的金鑰匙／入口提醒。
- 「本區仍缺」顯示具名收藏，共用原實體勾選。必要的跨區回收如金鑰匙、Pawt入口會在相關時機再次出現。
- 不靠裝備清單是否勾滿判斷玩家已通關；主線／能力旗標由實際紀錄確認。

### 12.2 清單、篩選與焦點

- 主要功能切換時清搜尋並套用目標功能預設；查漏頁切換不同清單頁籤視作不同清單功能，亦清搜尋與預設未完成。同一清單內勾選不重置條件。
- 進階深連結可明示`entityId`與臨時定位條件，確保目標在當前狀態可見；提示「已定位此項」，離開後不偷偷改全站預設。
- 支線按區域／系列，地城按大區／地標，裝備按部位，法術12項直接列。金箱按大區，分類總數可點擊查漏。
- 搜尋涵蓋原名、已知異名、中文功能／地標詞；未核實繁中名稱不當官方名稱。
- 67／73／108筆不需要分頁，也通常不需要虛擬化；一次列完符合條件的結果。
- 勾選移出後焦點移至鄰近下一列，最後一列可回上一列或結果標題；畫面不跳頁首。提供可鍵盤觸及的撤銷提示。
- 桌面一項一列、必要表頭固定；手機收成緊湊直列，名稱、勾選、地標可見，詳細來源按需展開。
- 空結果：「沒有符合條件的未完成項目」＋清除條件／看全部，不誤稱白金已完成。
- 真正資料空缺：「這項走法尚未收錄」＋已知地標／補查來源，不放假的完成徽章。

### 12.3 個人紀錄範圍

- 所有清單預設二元未完成／完成；只等級與遊戲計數用數值。
- 不新增每件裝備等級、所有箱子位置筆記、每個NPC關係或多世界管理。
- 允許一個全局「回鍋備忘」短文字，例如人在何地、下次去哪；不在每個子項加筆記欄。
- 網站不讀PS帳號、不解析存檔、不自動同步PSN。個人遊戲存檔與此控制台JSON備份是不同資料。

## 13. 資料契約：遊戲內容、功能與個人紀錄分開

### 13.1 共用遊戲資料

建議資料型別（名稱可適配repo，不要求為這份規格重構）：

```ts
type Evidence = 'official' | 'cross-checked' | 'source-stated' | 'index-only' | 'inferred' | 'unverified';
type EntityKind = 'sideQuest' | 'dungeon' | 'spell' | 'equipment' | 'goldChest' | 'key' | 'royalArt' | 'location';
type SourceRef = { sourceId: string; supports: string; evidence: Evidence };
type GameEntity = {
  id: string;
  kind: EntityKind;
  name: string;
  nameZh?: string; // 未核實翻譯須另附標籤
  aliases: string[];
  regionId?: string;
  locationText?: string;
  suggestedPhaseIds: string[];
  relatedEntityIds: string[];
  prerequisites: Array<{ entityId: string; fact: 'completed' | 'obtained' | 'available' }>;
  sources: SourceRef[];
  dataQuality: { name: Evidence; location: Evidence; walkthrough: Evidence };
  scope: 'base-reference' | 'free-update' | 'optional-mode' | 'unresolved';
};
type RoadmapStep = {
  id: string;
  phaseId: string;
  title: string;
  requiredForRoute: boolean;
  prerequisites: string[];
  instructions: string[];
  checkBeforeLeaving: string[];
  warnings: string[];
  recovery: string[];
  relatedEntityIds: string[];
  relatedTrophyIds: string[];
  sources: SourceRef[];
};
```

- 所有表中的ID是候選首版穩定ID，實作前先核對repo是否已發布；已發布的以既有為準並建立對照，不重編。
- `scope=base-reference`表示原始查漏參考表，不表示目前每一件是達門檻的唯一組合，也不代表該來源已覆蓋所有版本。
- 金箱獎勵用`rewardMode: fixed | pool | gold | unknown`與候選物品ID表示；只有`fixed`才顯示保證物品，不自動記取得。
- 來源衝突保留`conflicts[]`與缺口ID；不要把來源中所有文字合併成確定敘述。
- 無可靠座標不填`x/y`；地圖沒有資料時不呈現精確標記。
- 基準ID與別名的對照表應顯式存在。Pugger／Puggy等未定別名，不可默默合併既有兩筆玩家紀錄。

### 13.2 個人進度

```ts
type ProgressFact = {
  entityId: string;
  fact: 'completed' | 'obtained' | 'popped';
  value: boolean;
  revision: number;
  updatedAt: string;
  mutationId: string;
};
type PersonalProgress = {
  schemaVersion: number;
  gameId: 'cat-quest-ii';
  catalogVersion: string;
  facts: ProgressFact[];
  playerLevel: number | null;
  reportedCounters: { sideQuests: number | null; dungeons: number | null; equipment: number | null };
  returnNote: string;
};
```

- 個人資料不用混進共用資料JSON；程式不能把作者的已完成進度放成預設。
- Roadmap、地城用completed；裝備／法術／鑰匙用obtained；獎盃用popped，各自只接受適用fact。
- 「曾學到水行」與「目前劇情階段能使用水行」可以分開：解鎖歷史不因主線暫時剝奪能力被改成未取得。能力當前可用性若無可靠推定，就直接顯示主線提示，不自動覆寫取得框。
- 遊戲回報計數是玩家填的核對資訊，不與網站具名勾選混成一個值。若有差異顯示「網站紀錄／遊戲回報」，提供逐名核對。
- 閱讀位置、展開狀態、搜尋／篩選置於獨立UI狀態；閱讀不可寫入completed。
- 未知舊ID必須保存並警告，不能直接丟棄；需要修復對應時先預覽變動。

### 13.3 跨頁共用與條件推定

- 地城卡、裝備出處卡、Roadmap嵌入列都以同一entityId讀寫單一紀錄。
- 關聯只是導覽；清洞不能自動記裝備，支線不能自動記固定獎勵，條件達標不能自動記跳盃。
- 獎盃條件顯示清單統計；總量未知／衝突時不得用整個catalog大小當門檻。
- 白金門檻顯示上限100%，旁邊原始數值可超標；參考清單完成率則以其已收錄集合為分母並標名稱，不能叫世界100%。

## 14. 保存、備份、匯入與撤銷

### 14.1 保存與跨分頁

- 沿用repo成熟儲存機制；新工程建議用IndexedDB事務處理紀錄與版本，不必新增伺服器。
- 操作立即保存。必須在持久化成功後顯示「已保存」，或若採樂觀UI，失敗時精確回滾／保留明確未保存提示。不能刷新後才發現剛剛全沒存。
- 使用逐紀錄revision與事務檢查，跨分頁同步可用BroadcastChannel發變更通知；**通知本身不是鎖**，寫入仍由儲存事務驗證。
- 另一分頁已更新同項時，重新載入該項、顯示衝突，不整份回寫舊進度。

### 14.2 精準撤銷

- 一般勾選、數值變更與批次修改記一個mutation，保存受影響欄位的before/after及寫後revision。
- 撤銷時，在一個事務中驗證所有受影響欄位仍是該mutation寫下的版本，才反向修改；有任一衝突就整次拒絕並提示重新核對。
- 只反轉本次差異，不還原全資料快照，不覆蓋不同項目後來的變更。
- 批次勾選先告知數量及範圍，例如目前搜尋結果8項；批次不跨種類偷勾獎盃或裝備。

### 14.3 匯出／匯入／還原

- JSON包住schemaVersion、gameId、catalogVersion、exportedAt、個人進度。介面明示這是控制台紀錄，不是PS遊戲存檔。
- 匯出前使用當前已提交資料，下載時間命名備份；讀取失敗不交一份空檔假裝成功。
- 匯入流程：保留原檔 → 解析 → schema與gameId驗證 → 檢查重複／未知ID、非法數值與版本 → 預覽新增／變更／刪除／衝突 → 提供先下載現況備份 → 明確確認 → 在事務中套用。
- 預覽記住當前revision；確認時若本機資料已被別頁更動，停止並重新預覽。舊檔不能靜默蓋新資料。
- 首版可先只支援「替換個人紀錄」一種模式，但預覽必須列清會變未完成的項目；未知ID與無法遷移資料阻擋，不悄悄略過。
- 明確過期或衝突的備份先停止，讓使用者選擇重新匯出／核對；需要日後支援合併時再做逐項選擇，不以任意新時間戳當最新事實。
- 舊schema先產出遷移候選、副本驗證後再確認套用；程式更新不可清空既有進度。
- 資料損毀時保留原始資料與可匯出的原始備份，不自動初始化蓋掉；提供恢復指引。

## 15. 工程邊界與建議模組

- 本次未讀repo。真正開工先讀適用AGENTS.md、README、既有架構與遊戲模組契約、若存在的docs/UI_PREFERENCES.md。不存在須據實回報，不假裝已讀。
- 只改Cat Quest II模組；若需改共用邏輯，先盤點其他遊戲影響，避免破壞已發布模組與ID。
- 不要求公開部署、登入、雲端、付費API或外部收發資料；未提供授權的本機路徑不要猜。
- 進度功能不依賴外站即時存活；核心攻略與索引打包本機使用，來源連結僅作查證。
- 不下載重製整份第三方攻略或地圖當內容；共用資料保存必要遊戲事實、自己整理的攻略與出處，圖片若未核實授權則先連結來源。
- 不複製玩家存檔進repo；測試以合成進度、隔離瀏覽器資料庫執行。

可能結構（是邏輯建議，遵從既有repo調整）：

```text
【Cat Quest II 模組根目錄】/
  data/      路線、實體、獎盃、關聯、來源、缺口、別名
  views/     路線、查漏、獎盃、小訣竅與資料
  state/     進度儲存、UI狀態、mutation與撤銷
  validation/  catalog驗證、備份schema、資料遷移
  tests/     跨頁紀錄、保存、撤銷、匯入與遷移
```

不得將這棵建議樹說成已存在的路徑。

## 16. 分階段實作與可觀察驗收

| 階段 | 依賴與工作 | 完成證據 |
| --- | --- | --- |
| P0盤點 | 讀repo規範、目前模組與ID；列資料缺口與既有差異 | 盤點報告；知道哪些可重用，沒有動其他遊戲紀錄 |
| P1資料 | 將本文件表格轉catalog；穩定ID、別名、來源、門檻、品質欄位；補高風險G項 | 唯一ID、引用、數量驗證；待核實資料無假的完成徽章 |
| P2保存 | 個人紀錄模型、單一寫入、失敗提示、跨分頁、撤銷、JSON備份／還原 | 隔離環境通過持久化與衝突情境 |
| P3遊玩 | 六階段路線＋嵌入共用清單＋返回進度 | 從A到F可讀可勾；任意閱讀不改完成 |
| P4查漏 | 全支線、基準地城、裝備、法術、金箱；搜尋篩選、獎盃關聯 | 所有資料實際呈現與互通，無佔位、無分頁阻斷 |
| P5交付 | 小訣竅／來源／缺口頁；桌機手機鍵盤；本機啟動說明 | 實際啟動、驗收截圖或記錄；報清尚未完成內容 |

P1不可用捏造座標或掉落填缺口；P3可先做互動骨架，但不能因此宣稱完整攻略上線。P2的關鍵資料安全要先驗證，才把真實紀錄交給P3/P4操作。

### 16.1 必要自動驗證

1. Catalog：ID唯一、所有ref可解析、20獎盃分布1白金8金5銀6銅、67個支線、12法術、101基準裝備＋7更新條目，73基準地城條目；分母不能從catalog大小推導。重複／未核實別名測試不能產生兩件同裝備。
2. 資料變更與撤銷：單次、批次、取消、後續不同項改動、同項跨分頁衝突；同項衝突安全拒絕，其他項後續變更保留。
3. 持久化與匯入：寫入失敗、刷新還原、不同gameId、舊schema、未知ID、損毀檔、過期預覽、相同檔往返還原；真實進度不作破壞測試。
4. 導覽：閱讀／完成分離、深連結讓已完成目標仍可見、主要功能重置篩選、同功能修改保留條件、未完成列移除後焦點合理。

### 16.2 人工可觀察情境

| 情境 | 使用者動作 | 預期可觀察結果 |
| --- | --- | --- |
| 邊玩邊勾 | 在A03勾Healpaw | 法術頁立即顯示已學，路線步驟與跳盃框不被自動勾 |
| 提前閱讀 | 直接看F03再按返回進度 | 仍返回實際第一個未完步驟，不標A至E已完成 |
| 中途延後金鑰匙 | D02未完成，改做D03 | D03可正常閱讀／記錄，下一步與回訪卡保留D02 |
| 跨功能查漏 | 搜裝備後切獎盃，再回裝備 | 搜尋清除，預設未取得；點獎盃缺項深連結則明示定位條件 |
| 勾完立即移出 | 未完成篩選勾某洞 | 該列移出，頁面不跳頂，焦點留鄰近列，撤銷可還原 |
| 重要事實分離 | 勾Ultimutt清洞 | Hidden Stash鑰匙仍待確認，Hidden Stash不變完成 |
| 誤把升級當新件 | 對同裝備再次操作 | 仍只有一件；不增加Fashionista條件件數 |
| 來源衝突 | 開Pugger項 | 看得到別名對應待核實提示，不出現兩個保證不同地城 |
| 計數超分母 | 遊戲回報地城74、裝備103 | 保留74／門檻73及103／門檻101，不報錯、不假稱世界100% |
| 條件達標 | 填Lv99／勾12法術 | 顯示待確認跳盃，PS獎盃確認框仍由人操作 |
| 保存失敗 | 模擬資料庫寫入拒絕 | 明顯未保存或精準回滾；刷新不假裝已持久化 |
| 兩分頁撤銷 | 甲改A，乙改B，甲撤銷A | B保留；若乙也改A，撤銷安全拒絕 |
| 還原 | 匯入同遊戲備份 | 先看到差異與備份入口，確認後套用；預覽後另頁更新則停止 |
| 回鍋 | 關閉重開網站 | 所有已提交進度還在；點繼續回到遊玩位置與下一步 |
| 手機鍵盤 | 窄螢幕操作、Tab與空白勾選 | 無被裁切的重要文字／控件；勾列移出後焦點可預期 |

## 17. 待研究缺口與阻塞範圍

| ID | 缺什麼／影響 | 補查方式 | 阻塞什麼 |
| --- | --- | --- | --- |
| G01 | Puggy／Pugger、Furrible與Duo等別名，以及劇情通道的實際清洞計數對應 | 對照PS4版實機洞口名、地圖與清洞計數前後；保留截圖證據 | 阻塞宣稱「原始地城逐一完整核實」；不阻塞追蹤索引與UI |
| G02 | 各平台更新完整地城／裝備總量，108並非確定所有模式完整總量 | 官方補丁、目前PS4版裝備清單與Mew Game範圍分開比對 | 阻塞世界100%分母；不阻塞固定白金門檻 |
| G03 | 大部分裝備的逐件固定出處或隨機池尚未逐一核實 | 查個別物品與地城掉落表，對照PS4錄影／實測 | 阻塞「任一缺裝備都能精確導航出處」的功能完成聲明 |
| G04 | 67任務的全部精確開放前置、移動NPC接續位置與個別解法 | 逐任務頁、PS4流程影片與實機任務標記；先處理會卡進度的任務 | 不阻塞全名checklist；阻塞全支線逐步解謎完成聲明 |
| G05 | 73基準洞的全部秘密箱精確起點／完整路徑未齊；Tombstone等級衝突 | 每洞截圖或錄影，記位置、操作、出口／箱狀態；不靠一般貼牆建議充數 | 不阻塞已核實特殊提醒；阻塞全逐洞導航聲明 |
| G06 | First Kings試煉題目、全部解答與正式主線編號尚未逐題核實 | PS4版錄影逐題核對與Wiki個別任務 | 阻塞直接答案按鈕；不阻塞其他主流程 |
| G07 | 22個金箱定位表的精確坐標、額外金箱總量與部分地標細節 | 開箱錄影與實機位置；確認是否固定或隨機 | 阻塞精確互動地圖與全金箱世界100%；不阻塞文字索引 |
| G08 | 使用者實際版本號、背包語言、已取得進度與repo契約未知 | 開工讀repo；玩家邊玩核對；非必要不要求先人工填完 | 不阻塞研究交付；實作前必須核對repo規範 |

本次不需要使用者把上述缺口逐一回答；後續研究由AI補查，遇到真實平台／範圍重大歧異才集中詢問。不可因不阻塞UI就把內容不足宣稱已完成。

## 18. 研究來源與可信度

統一查閱日期：2026-11-27。沒有本次遊戲實機測試。「索引」指搜尋服務返回頁面內容，並非完整頁面可開啟；Fandom有部分頁面讀取限制。跨平台攻略只作內容參考，獎盃門檻以PS4列表核對。

| ID | 名稱／連結 | 使用與證據範圍 |
| --- | --- | --- |
| S01 | [The Wayside：PS4獎盃列表](https://thewayside.no/trophies/games/trophy:NPWR18608_00) | 實際開頁；20座名稱／等級／門檻，與其他表交叉核對；非官方獎盃API |
| S02 | [PlatGet：Cat Quest 2 Trophy Guide](https://platget.com/guides/cat-quest-2-trophy-guide/) | 實際開頁／表格；單周目、Continue、門檻與位置；支線實際66列，金鑰匙戰鬥順序有錯，已更正，不整段照搬 |
| S03 | [CHRsuperstar：CatQuest II Guide](https://chrsuperstar.com/catquest2/en/) | 實際開頁；67支線／73洞的名字索引；其101裝備含更新替換，不能作原始版本完整名單 |
| S04 | [Gamer Walkthroughs：主線](https://gamerwalkthroughs.com/cat-quest-2/) | 實際開頁；主線地點與流程；編號13後跳15，且把水行三支線混入，因此不用它編號作官方ID |
| S05 | [PlayStation.Blog：Mew World免費更新](https://blog.playstation.com/2020/08/07/cat-quest-ii-embraces-the-mew-world-with-a-new-free-update/) | 官方發行方2020-08-07文章，實際開頁；Pawer Smash改版、防禦條、加速與地圖等級提示 |
| S06 | [Knoef：Cat Quest II Trophy Guide](https://knoef.info/trophy-guides/ps4-guides/cat-quest-ii-trophy-guide/) | 實際開頁；早期原始裝備索引、12法術位置、先支線後清洞；不可沿用其永久回不去措辭與舊Royal Art描述 |
| S07 | [Prima Games：Founders Island II與Golden Key](https://primagames.com/gaming/cat-quest-2-guide-how-to-unlock-all-golden-chests-and-beat-founders-island-ii) | 實際開頁；早期PC實測、四開發者及三Mimics所在位置與獎勵鏈；建議等級非硬條件 |
| S08 | [Cat Quest 2 Wiki：Hidden Cave](https://catquest2.fandom.com/wiki/Hidden_Cave) | 頁面索引；位置、三Mimics與Golden Key，與Prima交叉核對 |
| S09 | [Cat Quest 2 Wiki：Side Quests](https://catquest2.fandom.com/wiki/Side_Quests) | 頁面索引；系列分組與South Pawt第三任務；只用於內容事實，不複製劇情對話 |
| S10 | [Cat Quest 2 Wiki：Ultimutt Stash](https://catquest2.fandom.com/wiki/Ultimutt_Stash) | 頁面索引；Hidden Stash鑰匙來源 |
| S11 | [The Gentlebros：Ultimutt紙條第二段回覆](https://steamcommunity.com/app/914710/discussions/0/3338785229797428286/) | 實際開頁；開發者2019-11-16親答：入口第一火炬西南 |
| S12 | [Cat Quest 2 Wiki：Hidden Stash](https://catquest2.fandom.com/wiki/Hidden_Stash) | 頁面索引；王城東南，內門需要Ultimutt鑰匙 |
| S13 | [Cat Quest 2 Wiki：Troll Cave](https://catquest2.fandom.com/wiki/Troll_Cave) | 頁面索引；三個金錢金箱需開完才清洞 |
| S14 | [Cat Quest 2 Wiki：Drakoth’s Vault](https://catquest2.fandom.com/wiki/Drakoth%E2%80%99s_Vault) | 頁面索引；兩把專屬鑰匙與三件固定裝備 |
| S15 | [Cat Quest 2 Wiki：Equipment](https://catquest2.fandom.com/wiki/Equipment) | 頁面索引；套裝名稱、部位與更新系列；完整總量未核實 |
| S16 | [Cat Quest 2 Wiki：Golden Chest](https://catquest2.fandom.com/wiki/Golden_Chest) | 頁面索引；22定位點與固定／隨機池，無精確座標 |
| S17 | [Cat Quest 2 Wiki：Upgrades](https://catquest2.fandom.com/wiki/Upgrades) | 頁面索引；重複品升級，工坊分類 |
| S18 | [Cat Quest 2 Wiki：Royal Arts](https://catquest2.fandom.com/wiki/Royal_Arts) | 頁面索引；前三能力與Full Royal時機，與官方更新核對Pawer Smash |
| S19 | [Cat Quest 2 Wiki：Pawt Cave](https://catquest2.fandom.com/wiki/Pawt_Cave) | 頁面索引；多入口與怪物箱入口；內文誤寫Cave Peasy，位置慎用並交叉核對 |
| S20 | [Cat Quest 2 Wiki：Tombstone](https://catquest2.fandom.com/wiki/Tombstone) | 頁面索引；只受環境陷阱／Royal Damage |
| S21 | [Cat Quest 2 Wiki：Tale of a Cat and a Dog](https://catquest2.fandom.com/wiki/Tale_of_a_Cat_and_a_Dog) | 頁面索引；Pawful Cave、墓碑機制與任務回報 |
| S22 | [Cat Quest 2 Wiki：Cave of the Lion](https://catquest2.fandom.com/wiki/Cave_of_the_Lion) | 頁面索引；Aelius後解鎖，三件固定裝備；單件頁對箱子類型有衝突，未硬寫 |
| S23 | [Cat Quest 2 Wiki：Tomb of the Wolf](https://catquest2.fandom.com/wiki/Tomb_of_the_Wolf) | 頁面索引；Aelius後解鎖，Labrathor三件；頁面Empire欄錯標Felingard，不沿用 |
| S24 | [The Wayside：Trophy Guide](https://thewayside.no/guides/trophies/cat-quest-ii) | 實際開頁；索引型交叉參考，來源廣但非本次實機證據 |
| S25 | [Cat Quest 2 Wiki：Dungeons](https://catquest2.fandom.com/wiki/Dungeons) | 頁面索引；兩國具名地城，非精確完整計數驗證 |
| S26 | [Cat Quest 2 Wiki：Lonely Cave](https://catquest2.fandom.com/wiki/Lonely_Cave) | 頁面索引；Lv200、刺蝟與三件固定裝備 |
| S27 | [PlayStationTrophies：Asia列表](https://www.playstationtrophies.org/game/cat-quest-ii-asia/print-list/) | 搜尋索引返回20座門檻；直接頁面403，未假稱完整開頁讀取 |
| S28 | [Cat Quest 2 Wiki：Return of the Cats](https://catquest2.fandom.com/wiki/Return_of_the_Cats) | 頁面索引；第三任務、South Pawt／Lv15、Dog Soldier Armor，補齊66列缺項 |
| S29 | [Cat Quest 2 Wiki：Curse of the Dogs](https://catquest2.fandom.com/wiki/Curse_of_the_Dogs) | 頁面索引；前後任務與Catpital Cave流程 |
| S30 | [Cat Quest 2 Wiki：The Order of the Emeowrald](https://catquest2.fandom.com/wiki/The_Order_of_the_Emeowrald) | 頁面索引；Paw’s Cave流程與White Mage Robes |
| S31 | [Cat Quest 2 Wiki：The Pawsitively Secret Contact](https://catquest2.fandom.com/wiki/The_Pawsitively_Secret_Contact) | 頁面索引；主線／任務前置與General’s Mace獎勵 |
| S32 | [攻略空間.Puki：裝備](https://kouryakukuukan-puki.com/catquest2-equipment/) | 實際開頁；日文原始裝備分類／出處參考，舊版數值不直接套現版 |
| S33 | [ミルピリブログ：裝備與入手方法](https://milpiriblog.com/cat_quest_ii-equipments-parts) | 實際開頁，2024文章；日文裝備與更新分類對照，未核實跨語對應不硬填官方繁中名稱 |

### 證據使用原則與已知衝突

官方更新優先處理機制改版；遊戲內名稱與PS4版錄影優先處理現版本位置；不同社群攻略互相引用不能視為多次獨立實測。某資料查到名字，不代表路徑與機率也已查完。

本次未取得可靠的可重用精確世界座標，未建立假互動地圖。個別洞的隱藏路徑可在後續研究逐一補上；保持來源與支持的結論一對一，不能用全站首頁連結掩蓋資料缺口。

## 19. 可交給Codex的開工指令

以下是**之後使用者明確要求實作時**可貼給Codex的完整指令；本次交付仍停在研究與規劃。

```text
請實作《Cat Quest II》本機私人Game Companion控制台。

規格文件：cat-quest-ii_GAME_COMPANION_SPEC.md（本文件完整內容）。
repo路徑：【待填：Cat Quest II模組所在repo絕對路徑】。
未提供路徑時先由目前工作目錄與repo文件確認，不能虛構D:\或其他實際存在路徑。

平台是PS5相容遊玩的PS4版，目標本體白金、完整劇透；單人可完成。
本次開工範圍為四主要頁：遊玩路線、查漏清單、獎盃、小訣竅與資料。
六階段Roadmap嵌入順路支線／法術／裝備／地城提醒；67支線、73基準地城索引、
101基準裝備＋7更新條目、12法術、22金箱定位與20獎盃均需實際可用。
保留本文件對逐洞走法、完整世界總量、裝備出處與別名的缺口；
不可把未核實資料補造或把索引當完整逐房間攻略。

開工先讀適用AGENTS.md、README、既有架構、模組契約，及若存在的docs/UI_PREFERENCES.md。
回報不存在／無法讀取的文件；先盤點既有功能、已發布ID與資料遷移，再修改。
遵從既有工程，無既有選型才採Vue3＋TypeScript＋Vite與合適本機儲存。
只處理Cat Quest II，不改其他遊戲的進度、不清空資料、不為規格強制共用層重構。

依本文件P0至P5連續完成實作、必要研究補查、測試、修正及人工可觀察驗收。
進度、閱讀、展開狀態分離；Roadmap、清洞、物品取得、法術、鑰匙與實際跳盃是不同事實。
跨頁同實體共用ID。條件達標只提示，不能自動宣稱跳盃。
查漏預設未完成、勾完移出、一次呈現符合條件結果、主要功能切換重設搜尋篩選。
操作即保存且失敗明示，逐項revision與事務確保跨分頁一致；撤銷只反轉本次修改，
衝突安全拒絕，不能寫回整份舊快照。
JSON匯出／匯入需驗證、保護原檔、差異預覽、提供現況備份、明確確認與防止預覽過期。
測試使用合成資料及隔離環境，不在真實個人進度做破壞操作。

金鑰匙必須正確呈現為：水行→開發者島→Hidden Key→Hidden Cave三Mimics→Golden Key。
水行後打不過可延後，不阻斷主線。結局後Continue可查漏。
Ultimutt鑰匙、兩把Drakoth鑰匙與Golden Key分開記。
不要求NG+、Mew Game、Infinity Tomb、公開部署、登入、雲端或付費API。
重大超範圍／資料風險／不可逆外部操作先確認，其餘在授權內連續完成。

交付本機啟動方式、實際通過的測試與驗收證據、內容覆蓋率、未完成項與具體補查方式。
不可把靜態示意、佔位資料、無法點選或未驗證的模組宣稱完成。
```

## 20. 本文件交付檢查

- [x] 已沿用PS5相容PS4版，不反覆詢問既有決策。
- [x] 六階段流程含何時拿法術、支線、鑰匙、晚期固定裝備與獎盃核對。
- [x] 列出20獎盃、67支線、12法術、73基準地城、101基準裝備與更新項。
- [x] 修正支線66列缺項與金鑰匙鏈錯誤，未拿版本總量代替門檻。
- [x] 路線／收藏／跳盃分離，同實體跨頁共用；保存、撤銷、備份與匯入有可觀察規格。
- [x] AI兩輪審查已記錄；來源、資料衝突與待補缺口可查。
- [ ] 全地城秘密路徑、全部裝備出處、世界總量與逐題解答尚未完全核實。
- [ ] 尚未實作控制台、未讀本機repo、未執行遊戲實機驗證。
