# BALL x PIT — Game Companion 實作規格（PS5）

- **文件日期**：2026-11-09；**狀態**：可交接之「有資料缺口草稿」，非已實機驗證的完整百科。
- **建議 slug**：`ball-x-pit`；檔名：`ball-x-pit_GAME_COMPANION_SPEC.md`。
- **平台**：PlayStation 5；**範圍**：本體＋2026 三次免費更新；不包含獨立付費 DLC；**目標**：白金優先兼顧完整體驗；允許完整劇透。
- **實際交付能力**：依關卡閱讀操作 Roadmap、128 格本體角色通關矩陣、64 座獎盃手動確認、基地建築/解鎖清單、戰球與 Passive 配方查詢、Encyclopedia 收集追蹤、搜尋篩選、單機持久化與安全 JSON 備份。
- **資料品質宣告**：64/64 獎盃英文名稱及條件已由兩個 PS5 獎盃站核對；8 關與 16 名本體角色已對照；免費更新官方公告已核對。完整戰球/Passive 配方、建築總表及圖鑑全量**尚未逐項核實**，不得將目前清單當作遊戲內 100%。本文件所列網站參照 ID 不是 PSN ID。

## 1. 範圍、覆蓋與優先級

| 類別 | 已知總量 | 本文件已整理 | 缺口 / 執行原則 |
|---|---:|---:|---|
| PS5 獎盃 | 64 | 64 名稱與條件 | 獎盃觸發邊界與更新後例外待實機 |
| 本體關卡 | 8 | 8 | 各關 Boss、敵群、精確 Gear 門檻待核對 |
| 本體獎盃角色 | 16 | 16 | 角色技能數值、完整解鎖成本待核對 |
| 角色×關卡 | 128 | 128 組可由 16×8 生成 | 使用者初始紀錄 0，不預填完成 |
| 免費更新角色 | 6 | 6 名稱及所屬更新 | 技能完整數值待核對 |
| 2026 免費更新 | 3 | 3 | 更新版精確配方及新增圖鑑總量待補 |
| 建築 | 官方未見總數 | 已列主要藍圖/房屋與獎盃建築 | 須逐項從 Wiki Buildings 與 Dexerto 對照後才宣稱全量 |
| 戰球 Evolution | 更新後總數待核 | 已列 Regal 可核對配方與特殊目標 | 需將 Wiki Balls/Evolutions 全量轉為可查詢資料 |
| Passive / Encyclopedia | 總量待核 | 特殊條件與部分配方 | 分本體/更新，不能虛構總數 |

**P0 必做**：上述 64 獎盃、128 格矩陣、八關 Roadmap、建築/角色解鎖、可核對配方與待查標示、Encyclopedia 追蹤、搜尋、備份與匯入。資料未核實的條目保留缺口；不能把 P0 偷縮成示範 5 筆。

**P1**：各角色 Build、更多配方實測技巧、基地配置示意（必須註明示意）、進階清理排序。

**不納入**：付費 DLC、PSN 自動同步、登入、中央跨遊戲資料、Google Drive（本次未指定，另行確認）、地圖虛構座標、NG+ 全階級重複通關矩陣。NG+ 攻略資訊可閱讀，但不作白金必要勾選。

## 2. 八關 Roadmap（以 Pit Lift 層級，不以 PSN 列表順序）

**操作共通原則**：每次進坑前查看角色與關卡是否已完成；首通優先解鎖下一層與新藍圖；每關首次由不同角色通關可提供 Gear；基地建造角色房屋以擴充可用角色；不要求先清空上一關。Gear 是由角色首次通關取得，特定跨層解鎖限制請見來源 S3。每關結束只勾該角色×該關，不自動勾 PSN 獎盃。

### R1 BONExYARD
- **時機/地點**：Pit Lift 第 1 層；開放後可直接進入，不強制完成前一層所有角色。
- **行動**：初始 The Warrior 首通；回基地建造第一座 Trophy；優先留意 Haunted House、Sheriff’s Office、Cozy Home 藍圖；開出更多角色後補刷。
- **離開前確認**：可用角色擴充，首通與初次 Fusion/Evolution。 通關後勾選角色×關卡，核對新藍圖與 Gear。
- **風險/補救**：藍圖屬掉落或首次通關獎勵，未拿到可回頭刷；不要誤標永久錯過。關卡詳細 Boss 解法與 Gear 門檻待 S3 核對；來源 S3/S4。

### R2 SNOWYxSHORES
- **時機/地點**：Pit Lift 第 2 層；開放後可直接進入，不強制完成前一層所有角色。
- **行動**：推進第二層，找 Farm、Lumberyard、Stone Mine、Villa、Veteran’s Hut、Single Family Home、Adventurer’s Guild；開始資源生產與角色輪替。
- **離開前確認**：先建立穩定資源循環；Endless Mode 為推薦體驗。 通關後勾選角色×關卡，核對新藍圖與 Gear。
- **風險/補救**：藍圖屬掉落或首次通關獎勵，未拿到可回頭刷；不要誤標永久錯過。關卡詳細 Boss 解法與 Gear 門檻待 S3 核對；來源 S3/S4。

### R3 LIMINALxDESERT
- **時機/地點**：Pit Lift 第 3 層；開放後可直接進入，不強制完成前一層所有角色。
- **行動**：取得 Gold Mine、Bank、Magnet Factory、Mausoleum、Rocky Hill 等藍圖；開始安排多角色刷 Gear。
- **離開前確認**：黃金採集與角色解鎖並進。 通關後勾選角色×關卡，核對新藍圖與 Gear。
- **風險/補救**：藍圖屬掉落或首次通關獎勵，未拿到可回頭刷；不要誤標永久錯過。關卡詳細 Boss 解法與 Gear 門檻待 S3 核對；來源 S3/S4。

### R4 FUNGALxFOREST
- **時機/地點**：Pit Lift 第 4 層；開放後可直接進入，不強制完成前一層所有角色。
- **行動**：找 Laboratory、Iron Fortress、Mansion、Matchmaker、Abbey、Jeweler、Necromancer；檢查角色房屋是否已建。
- **離開前確認**：解鎖關鍵角色與可選雙角色機制。 通關後勾選角色×關卡，核對新藍圖與 Gear。
- **風險/補救**：藍圖屬掉落或首次通關獎勵，未拿到可回頭刷；不要誤標永久錯過。關卡詳細 Boss 解法與 Gear 門檻待 S3 核對；來源 S3/S4。

### R5 GORYxGRASSLANDS
- **時機/地點**：Pit Lift 第 5 層；開放後可直接進入，不強制完成前一層所有角色。
- **行動**：找 Theater、Monastery、Gemsmith、Antique Shop、Gambler’s Den；回頭清理早期關卡缺的角色通關。
- **離開前確認**：獎盃 10 人通關計數自然累積。 通關後勾選角色×關卡，核對新藍圖與 Gear。
- **風險/補救**：藍圖屬掉落或首次通關獎勵，未拿到可回頭刷；不要誤標永久錯過。關卡詳細 Boss 解法與 Gear 門檻待 S3 核對；來源 S3/S4。

### R6 SMOLDERINGxDEPTHS
- **時機/地點**：Pit Lift 第 6 層；開放後可直接進入，不強制完成前一層所有角色。
- **行動**：找 Captain’s Quarters、Stone Domain、Hidden Temple、War Room、Meditation Tent、Wishing Well；依 Gear 需求補刷。
- **離開前確認**：角色池擴充、派遣/建築強化；War Room 是否計入手動通關獎盃需核對。 通關後勾選角色×關卡，核對新藍圖與 Gear。
- **風險/補救**：藍圖屬掉落或首次通關獎勵，未拿到可回頭刷；不要誤標永久錯過。關卡詳細 Boss 解法與 Gear 門檻待 S3 核對；來源 S3/S4。

### R7 HEAVENLYxGATES
- **時機/地點**：Pit Lift 第 7 層；開放後可直接進入，不強制完成前一層所有角色。
- **行動**：找 Worker's Guild、Evolution Chamber、Relic Collector、Bag Maker、Carpenter、Falconry Hut、Unstable Tower；建造獎盃指定建築。
- **離開前確認**：配方、槽位與被動能力提升。 通關後勾選角色×關卡，核對新藍圖與 Gear。
- **風險/補救**：藍圖屬掉落或首次通關獎勵，未拿到可回頭刷；不要誤標永久錯過。關卡詳細 Boss 解法與 Gear 門檻待 S3 核對；來源 S3/S4。

### R8 VASTxVOID
- **時機/地點**：Pit Lift 第 8 層；開放後可直接進入，不強制完成前一層所有角色。
- **行動**：推進本體終局；找 Warrior’s Guild、Hospital、Grand Museum、Capitolium、Marksman’s Guild、Wagon Factory、Party House、Ball House；再進入 128 格矩陣清理。
- **離開前確認**：完成遊戲與無限升級建築獎盃。 通關後勾選角色×關卡，核對新藍圖與 Gear。
- **風險/補救**：藍圖屬掉落或首次通關獎勵，未拿到可回頭刷；不要誤標永久錯過。關卡詳細 Boss 解法與 Gear 門檻待 S3 核對；來源 S3/S4。

### 收尾順序
1. 先確認全部八關已通關與最終通關獎盃；不足 Gear 時選未通關角色補刷已開關卡。
2. 依「最少未完成格數」安排 16 名角色的全八關；同時確保每關至少 10 名不同角色。
3. 建造全部獎盃指定建築、15 座住房、擴張基地 5 次、完成單次採集與累積資源門檻。
4. 在 Evolution/Passive 查詢器逐一做出指定配方；Scholar 只計**本體** Encyclopedia 項目，免費更新圖鑑另列推薦體驗。
5. 每座獎盃仍需在 PS5 跳出後獨立勾選；未跳出時保留「條件可能滿足」提醒，不自行推斷已取得。

## 3. 角色與矩陣

每個本體角色各有一座「完成全部八關」獎盃。下表房屋與出處是解鎖線索；藍圖為掉落，不代表首通必得。來源 S1/S4/S5。

| 本體角色 | 專屬獎盃 | 房屋/藍圖關卡 |
|---|---|---|

| The Warrior | True Warrior | 初始 |
| The Repentant | Repentance | Haunted House / BONExYARD |
| The Itchy Finger | Itch Scratched | Sheriff’s Office / BONExYARD |
| The Cogitator | Cogitated | Villa / SNOWYxSHORES |
| The Tactician | Master General | Captain’s Quarters / SMOLDERINGxDEPTHS |
| The Spendthrift | All Spent | Mansion / FUNGALxFOREST |
| The Embedded | Embedder | Veteran’s Hut / SNOWYxSHORES |
| The Radical | Radicalized | Campground / HEAVENLYxGATES |
| The Empty Nester | Golden Years | Single Family Home / SNOWYxSHORES |
| The Shade | Long Shadow | Mausoleum / LIMINALxDESERT |
| The Cohabitants | Unpacked | Cozy Home / BONExYARD |
| The Physicist | Gravity's Rainbow | Laboratory / FUNGALxFOREST |
| The Shieldbearer | Brick Breaker | Iron Fortress / FUNGALxFOREST |
| The Makeshift Sisyphus | Herculean | Rocky Hill / LIMINALxDESERT |
| The Flagellant | Masochist | Monastery / GORYxGRASSLANDS |
| The Juggler | Entertainer | Theater / GORYxGRASSLANDS |

**矩陣資料**：16 個角色 × 8 關 = 128 個唯一鍵 `(characterId, levelId)`；關卡 Conquered = 該關不同角色已完成數 ≥10；角色獎盃條件 = 該角色八關全完成。更新角色可另外列矩陣，但是否計入「10 different characters」須實機/多來源核對，**預設不以其通關代替本體角色專屬獎盃**。不要把「10 人通關」誤當作 10 次同角色通關。

**免費更新角色**：The Regal Update — The Falconer、The Carouser；The Shadow Update — The Tunneller、The Tiptoer；The Naturalist Update — The Ballbearer、The Hoary Hoarder。房屋依序 Falconry Hut（HEAVENLYxGATES）、Party House（VASTxVOID）、Stone Domain（SMOLDERINGxDEPTHS）、Hidden Temple（SMOLDERINGxDEPTHS）、Ball House（VASTxVOID）、Unstable Tower（HEAVENLYxGATES）。官方確認 The Ballbearer 雙倍戰球槽但無 Passive 槽；The Hoary Hoarder 兩個戰球槽但 Passive 槽倍增。來源 S4–S8。

## 4. PS5 64/64 獎盃對照（英文原名）

**查證等級**：下表名稱與英文條件均由 S1/S2 核對；實機觸發未驗證。所有獎盃都有獨立 `earned` 勾選，不由條件完成自動寫入。

| # | 獎盃 | 條件 / 關聯追蹤 |
|---:|---|---|

| 1 | Legend of New Ballbylon | 取得其餘全部獎盃；獨立確認白金 |
| 2 | BONExYARD | 完成 BONExYARD；關卡首通 |
| 3 | SNOWYxSHORES | 完成 SNOWYxSHORES；關卡首通 |
| 4 | LIMINALxDESERT | 完成 LIMINALxDESERT；關卡首通 |
| 5 | GORYxGRASSLANDS | 完成 GORYxGRASSLANDS；關卡首通 |
| 6 | FUNGALxFOREST | 完成 FUNGALxFOREST；關卡首通 |
| 7 | SMOLDERINGxDEPTHS | 完成 SMOLDERINGxDEPTHS；關卡首通 |
| 8 | HEAVENLYxGATES | 完成 HEAVENLYxGATES；關卡首通 |
| 9 | VASTxVOID | 完成 VASTxVOID；關卡首通 |
| 10 | BONExYARD Conquered | 以 10 名不同角色完成 BONExYARD；矩陣衍生 |
| 11 | SNOWYxSHORES Conquered | 以 10 名不同角色完成 SNOWYxSHORES；矩陣衍生 |
| 12 | LIMINALxDESERT Conquered | 以 10 名不同角色完成 LIMINALxDESERT；矩陣衍生 |
| 13 | GORYxGRASSLANDS Conquered | 以 10 名不同角色完成 GORYxGRASSLANDS；矩陣衍生 |
| 14 | FUNGALxFOREST Conquered | 以 10 名不同角色完成 FUNGALxFOREST；矩陣衍生 |
| 15 | SMOLDERINGxDEPTHS Conquered | 以 10 名不同角色完成 SMOLDERINGxDEPTHS；矩陣衍生 |
| 16 | HEAVENLYxGATES Conquered | 以 10 名不同角色完成 HEAVENLYxGATES；矩陣衍生 |
| 17 | VASTxVOID Conquered | 以 10 名不同角色完成 VASTxVOID；矩陣衍生 |
| 18 | True Warrior | 使用 The Warrior 完成全部八關；矩陣衍生 |
| 19 | Repentance | 使用 The Repentant 完成全部八關；矩陣衍生 |
| 20 | Itch Scratched | 使用 The Itchy Finger 完成全部八關；矩陣衍生 |
| 21 | Cogitated | 使用 The Cogitator 完成全部八關；矩陣衍生 |
| 22 | Master General | 使用 The Tactician 完成全部八關；矩陣衍生 |
| 23 | All Spent | 使用 The Spendthrift 完成全部八關；矩陣衍生 |
| 24 | Embedder | 使用 The Embedded 完成全部八關；矩陣衍生 |
| 25 | Radicalized | 使用 The Radical 完成全部八關；矩陣衍生 |
| 26 | Golden Years | 使用 The Empty Nester 完成全部八關；矩陣衍生 |
| 27 | Long Shadow | 使用 The Shade 完成全部八關；矩陣衍生 |
| 28 | Unpacked | 使用 The Cohabitants 完成全部八關；矩陣衍生 |
| 29 | Gravity's Rainbow | 使用 The Physicist 完成全部八關；矩陣衍生 |
| 30 | Brick Breaker | 使用 The Shieldbearer 完成全部八關；矩陣衍生 |
| 31 | Herculean | 使用 The Makeshift Sisyphus 完成全部八關；矩陣衍生 |
| 32 | Masochist | 使用 The Flagellant 完成全部八關；矩陣衍生 |
| 33 | Entertainer | 使用 The Juggler 完成全部八關；矩陣衍生 |
| 34 | Evolution | 首次製作 Evolution |
| 35 | Fusion | 首次融合兩顆球 |
| 36 | Nosferatu | 製作 Nosferatu |
| 37 | Nuclear Bomb | 製作 Nuclear Bomb |
| 38 | Satan | 製作 Satan |
| 39 | Soul Reaver | 製作 Soul Reaver |
| 40 | Deadeye's Cross | 製作 Deadeye's Cross |
| 41 | Legion Slayer | 擊殺累積 100,000 敵人 |
| 42 | Riches | 累積取得 5,000 gold |
| 43 | Wheat Farmer | 累積取得 1,000 wheat |
| 44 | Woodcutter | 累積取得 1,000 wood |
| 45 | Stone Miner | 累積取得 1,000 stone |
| 46 | Gold Miner | 單次 harvest 採集 1,000 gold |
| 47 | Bountiful Harvest | 單次 harvest 採集 100 wheat |
| 48 | Deforestation | 單次 harvest 採集 100 wood |
| 49 | Boulder Breaker | 單次 harvest 採集 100 stone |
| 50 | City Planner | 收集 50 blueprints |
| 51 | Trophy | 建造一座 trophy 建築 |
| 52 | Monument | 建造可無限升級的建築 |
| 53 | Worker's Guild | 建造 Worker's Guild |
| 54 | Evolution Chamber | 建造 Evolution Chamber |
| 55 | Relic Collector | 建造 Relic Collector |
| 56 | Bag Maker | 建造 Bag Maker |
| 57 | Carpenter | 建造 Carpenter |
| 58 | Land Grabber | 擴張基地 5 次 |
| 59 | Structural Power | 建築提供任一屬性 +5 加成 |
| 60 | S Rank | 任一屬性 scaling 達 S |
| 61 | Neighborhood | 建造 15 座 housing structures |
| 62 | Fusion Evolution | 融合兩顆已進化戰球 |
| 63 | Scholar | 解鎖 Encyclopedia 每一筆本體項目 |
| 64 | Ballbylon Has Risen | 完成遊戲 |

**風險**：累積擊殺/採集/藍圖數量在網站無自動讀取 PS5 存檔能力，只能手動確認或以遊戲顯示為準；不要憑站內勾選推算真正數值。單次 harvest 與累積採集分開記錄。`Scholar` 的 base game 限定不可混入更新項目。

## 5. 建築與藍圖資料（第一版索引）

來源 S3/S5/S9。以下為已定位的藍圖/建築，不代表全部建築數量。每筆需 `name`、`category`、`blueprintLevel`、`effect`、`source`、`verification`、`obtained`、`built`。藍圖取得與已建造分開；拆除建築不自動撤銷歷史獎盃。

| 層 | 已定位建築 / 藍圖 |
|---|---|

| BONExYARD | Clinic; Barracks; Shoemaker; Consulate; Schoolhouse; Gunsmith; Exorcist; Cozy Home; Sheriff's Office; Haunted House; Boneyard Trophy |
| SNOWYxSHORES | Farm; Lumberyard; Stone Mine; Watch Tower; Alchemist; Wheelwright; University; Veteran's Hut; Single Family Home; Villa; Snowy Trophy; Adventurer's Guild |
| LIMINALxDESERT | Gold Mine; Market; Spa; Military Academy; Diplomacy Hall; Archery Range; Bank; Magnet Factory; Rocky Hill; Mausoleum; Guild Hall; Desert Trophy |
| FUNGALxFOREST | Abbey; Jeweler; Necromancer; Matchmaker; Casino; Laboratory; Iron Fortress; Mansion |
| GORYxGRASSLANDS | Theater; Monastery; Gemsmith; Antique Shop; Gambler's Den |
| SMOLDERINGxDEPTHS | Captain's Quarters; Stone Domain; Hidden Temple; War Room; Meditation Tent; Wishing Well; Candle Maker; Smoldering Trophy |
| HEAVENLYxGATES | Worker's Guild; Carpenter; Bag Maker; Evolution Chamber; Relic Collector; Campground; Falconry Hut; Unstable Tower; Heavenly Trophy |
| VASTxVOID | Warrior's Guild; Hospital; Marksman's Guild; Grand Museum; Wagon Factory; Capitolium; Party House; Ball House; Void Trophy |

**注意**：FUNGALxFOREST 與 GORYxGRASSLANDS、SMOLDERINGxDEPTHS 的藍圖列表在本輪搜尋摘錄不完整；此表不可作全量覆蓋分母。Trophy 建築通常由該關首次通關授予，非一般掉落。無限升級建築可由 VASTxVOID 相關建築滿足；詳細材料成本/建造順序須從 S5/S9 逐項補核。優先建角色住房、經濟生產、增加選項與槽位的建築；精確最佳化順序屬推薦而非強制。

## 6. Evolution、Fusion、Passive、Encyclopedia

### 概念與 UI
- **Fusion**：兩顆球能力結合；**Evolution**：符合指定組合的具名新球；**Evolved Passive**：Passive 組合。三者分開標籤。
- 查詢器顯示名稱、類別、材料 ID 陣列、可替代材料、遞迴前置鏈、所屬更新、白金必要性、來源、查證狀態；不推測不存在的配方。
- 可從「Nosferatu」等獎盃直接跳到配方；已製作/圖鑑已解鎖的確認需分開，不以打開查詢頁代填進度。

### 已核對的 Regal 更新配方（S8）
| 產物 | 材料 | 類別 |
|---|---|---|
| Landslide | Stone + Earthquake | Evolved Ball |
| Steel | Stone + Iron | Evolved Ball |
| Catapult | Stone + Egg Sac | Evolved Ball |
| Brimstone | (Stone 或 Poison) + Burn | Evolved Ball；分支需 UI 支援 |
| Banished Flame | Dark + Burn | Evolved Ball |
| Fireworks | Egg Sac + Burn | Evolved Ball |
| Laser Cutter | (Laser (Vertical) 或 Laser (Horizontal)) + Steel | Evolved Ball |
| Glacier | Stone + Freeze | 額外 Evolution combo |
| Sandstorm | Stone + Wind | 額外 Evolution combo |
| Grotesque Artillery | Turret + Hand Fan | Evolved Passive |
| Deadeye's Impaler | Gracious Impaler + Deadeye's Cross | Evolved Passive |

### 特殊白金目標
| 目標 | 目前可核對內容 | 待補 |
|---|---|---|
| Nosferatu | 須製作該進化；第三方配方指南指出涉及 Vampire Lord、Spider Queen、Mosquito King | 逐階材料與更新版條件二次核對 |
| Nuclear Bomb | 須製作 | 完整前置鏈待查 |
| Satan | 須製作 | 完整前置鏈待查 |
| Soul Reaver | 須製作 | 完整前置鏈待查 |
| Deadeye's Cross | Diamond Hilted Dagger + Sapphire Hilted Dagger + Ruby Hilted Dagger + Emerald Hilted Dagger（S10） | 各 dagger 前置鏈待查 |

**三次更新內容**：Regal（2026-01-26）新增 2 角色、8 balls、3 passives、3 buildings、Endless Mode；Shadow（2026-04-27）新增 2 角色、11 balls、passives 與新建築；Naturalist（2026-08-06）新增 2 角色、11 balls、5 passives。Shadow 的 Time、Venom、Erosion、Time Bomb、Timestop、Warp、Sniper 等為官方公開例子；Naturalist 的 Lightning Bug、Mosquito Kingdom 等為官方公開例子。**例子不等於全量**。

**Encyclopedia**：至少區分 base-game / regal / shadow / naturalist；原名與類型需逐筆核對 S10/S11/S12。`Scholar` 只針對 base-game entries，更新圖鑑為推薦體驗。若來源未確認總數，顯示「本站已收錄 N 項／已勾選 M 項」，不得顯示「遊戲 100%」。不要假定建築屬 Encyclopedia；S9 說明建築不在圖鑑。

## 7. 頁面與操作規格

- 首頁：目前推薦下一步、白金獎盃進度、128 格完成數、八關入口、最近未完成事項；無存檔時顯示「從 BONExYARD 開始」，可直接跳任一章。
- Roadmap：每層卡片包含「現在去哪、做什麼、離開前檢查、錯過怎麼補救」；未完成內容展開，完成項縮為標題與計數，整章完成仍可回看；取消完成恢復原文，收合不改資料。
- 矩陣：手機先選關卡/角色再勾選；桌面可切換行列檢視；同一 `(character,level)` 只有一筆進度；更新角色另組；可依未完成、差幾格、已開放排序。
- 獎盃：全部 64 筆可搜尋、篩選「未取得／已取得／白金必要／條件可能已達成」；PSN 跳盃手動勾選。
- 配方：搜尋產物/材料，遞迴顯示來源與材料分支，明示來源待查；無配方資料顯示「尚未核實」，不能顯示不存在。
- 建築：依關卡/房屋/經濟/功能/獎盃分類，分開勾「取得藍圖」與「已建造」。
- Encyclopedia：只對已收錄、可核對的條目計數；本體與免費更新分組。
- 備份：匯出 JSON、預覽匯入差異、保護兩端原文、使用者確認後才寫入；損壞/舊版/過期預覽需可取消且不丟原文。
- 空資料/載入/錯誤：顯示空清單原因、待查數量、資料版本；localStorage 不可用或容量不足顯示明確錯誤與 JSON 匯出選項；無任何進度不隱藏完整攻略。

## 8. 資料模型與進度隔離

建議文件內參照 ID（非官方 ID）：`level:bonexyard`、`character:warrior`、`clear:warrior:bonexyard`、`trophy:true-warrior`、`building:haunted-house`、`ball:stone`、`recipe:steel`、`encyclopedia:base:stone`。**最終 schema、ID、儲存 API 由 Codex 盤點 repo 後定案**，保護已發布 ID。

靜態內容：`levels`、`characters`、`trophies`、`buildings`、`balls`、`passives`、`recipes`、`encyclopedia`、`roadmapSteps`、`sourceRefs`；每筆有 `verification`（source_checked/multi_source/conflict/pending）、`contentSet`、`sourceIds`。玩家資料：`clears`、`stepDone`、`blueprintObtained`、`buildingBuilt`、`recipeMade`、`encyclopediaUnlocked`、`trophyEarned`，以及資料版本。`trophyEarned` 不由衍生條件自動設為 true。

進度只用完成/未完成，沒有筆記、評分、多狀態管理。矩陣衍生計數不另存；路線步驟若與具體收集/建造/通關是同一事實，關聯同一筆進度。搜尋、切換章節、閱讀、收合都不修改完成紀錄。

## 9. Codex 工程交接與邊界

1. 開工讀 `G:\git\AGENTS.md`、repo/目標範圍 AGENTS.md、README、`docs/ARCHITECTURE.md`、`docs/MODULE_CONTRACT.md`、既有 `module.json`（若有），檢查工作樹修改與 slug 唯一性。
2. repo 根目錄 `G:\git\game-companion`，模組預期 `games/ball-x-pit/`，包含 module.json、README、`dist/index.html`、資料/驗證工具；以 repo 當前契約為準。`games/*/dist` 為追蹤網站來源，不可刪；`_site` 才可重建。沿用當前 GitHub Pages base path。
3. Portal 只提供遊戲入口，遊戲獨立頁面、進度、備份；不新增中央登入/同步，不換框架，不重構其他遊戲。
4. 先盤點現有安全匯入與儲存候選，不能虛構 API。所有進度、快照、備份時間、損壞備份、匯入原文、雲端配對、SW cache（若使用）按遊戲隔離；不得讀寫舊站或其他遊戲資料。
5. 保護式匯入：保留兩端原文、顯示差異、下載備份並確認；未知資料保留；預覽過期或備份失敗立即停止；不能用空資料覆寫。新模組雲端寫入預設關閉；Drive 本次不納入。若未來納入，沿用 OAuth grant 隔離合成檔、條件寫入、412 過期與競爭測試，正式 Google 驗證由使用者在正式網域執行。
6. 依 scripts 執行資料驗證、建置、產物與隔離 browser context 測試，使用合成資料，不用正式備份、玩家存檔或現有 browser profile。
7. 舊 repo 搬移來源只讀；`source-manifest.json` 保留搬入前證據，不改成新 hash；`upstream/` 不部署。
8. 不擅自 commit、push、部署、切換舊站或寫入真實外部資料。歷史文件與其他遊戲授權不構成本次授權。
9. 已查證的 64 獎盃與矩陣不可縮成樣本；資料缺口以「待查」顯示並提供具體核實任務。若全量資料可於本機研究補齊，應直接完成，不因草稿列缺口就跳過。

## 10. 可觀察驗收情境

- 新玩家開站直接看完整 BONExYARD 路線，無需勾完上一章即可跳到 VASTxVOID。
- 勾選 The Warrior × BONExYARD 後，矩陣、該關完成數、該角色完成數同步變動；重新整理仍保留。
- 同一格取消勾選，所有衍生數回退；不會把 `True Warrior` PSN 獎盃改成未取得。
- Roadmap 步驟完成即收合說明；取消完成還原；純收合不改玩家資料。
- 10 名不同角色同關通關顯示「Conquered 條件可能達成」，獎盃不自動取得。
- 建築藍圖取得不等於已建造；拆除不自動抹掉已取得獎盃。
- Scholar 只看本體圖鑑；未知總量不顯示遊戲內 100%。
- 匯出/匯入能保留未知欄位；匯入預覽過期、損壞 JSON、備份失敗不破壞原紀錄。
- 手機可操作矩陣、配方、搜尋、勾選與回看；其他遊戲資料完全不受影響。
- 實際測試尚未執行；Codex 必須回報真實執行結果與剩餘外部/實機驗證。

## 11. 來源、衝突、待辦（2026-11-09 查閱）

- **S1** Exophase PS5 64 獎盃與條件：https://www.exophase.com/game/ball-x-pit-psn/trophies/ （名稱/門檻；已開啟）
- **S2** PlayStationTrophies PS5 64 獎盃交叉核對：https://www.playstationtrophies.org/game/ball-x-pit/trophies/ （已由搜尋結果核對；本輪未取得完整內頁）
- **S3** Wiki Levels / Pit：https://ballxpit.wiki.gg/wiki/Levels （關卡、Gear、藍圖；搜尋索引已取得，但直接開頁 403）
- **S4** Wiki Characters：https://ballxpit.wiki.gg/wiki/Characters （角色與房屋；搜尋索引已取得，但直接開頁 403）
- **S5** Wiki Buildings：https://ballxpit.wiki.gg/wiki/Buildings （房屋、建築效果；搜尋索引已取得，直接開頁受限）
- **S6** PlayStation Blog Regal：https://blog.playstation.com/2026/01/26/ball-x-pit-the-regal-update-launches-today/ （官方，已開啟）
- **S7** PlayStation Blog Shadow：https://blog.playstation.com/2026/04/20/ball-x-pit-shadow-update-arrives-april-27/ （官方，已開啟）
- **S8** PlayStation Blog Naturalist：https://blog.playstation.com/2026/07/28/ball-x-pit-final-update-the-naturalist-arrives-august-6/ （官方，已開啟）
- **S9** Dexerto Buildings：https://www.dexerto.com/wikis/ball-x-pit/all-buildings-in-ball-x-pit/ （建築資料及圖鑑不含建築；搜尋索引）
- **S10** Wiki Passives：https://ballxpit.wiki.gg/wiki/Passives （Passive 配方，索引；直接開頁受限）
- **S11** Wiki Game Updates：https://ballxpit.wiki.gg/wiki/Game_Updates （Regal 具名配方；索引；直接開頁受限）
- **S12** Steam 官方更新訊息：https://steamcommunity.com/app/2062430/allnews/ （更新內容交叉核對；搜尋索引）

**來源衝突/限制**：PSN 列表順序 GORYxGRASSLANDS 早於 FUNGALxFOREST，但 Wiki 層級是 FUNGAL 第四、GORY 第五；採實際 Pit Lift 層級。Wiki 直接開啟回 403，故只能把索引可見資料視為「來源索引已核對」，不能冒充已完整閱讀全表。官方「final free update」不表示未來不會再更新；以本文件日期為界。第三方 30–35 小時估時不保證個人進度。

**待辦與阻擋性**：平台/版本/範圍已確定，**不阻擋建立模組與已核對 P0 資料**。全量 Evolution、Passive、Encyclopedia 與建築缺口會阻擋「宣稱全量完成」，但不阻擋以清楚缺口狀態交付功能；Codex 應先用可開啟來源/必要的人工核實補齊，不可填造。PS5 更新角色是否計入 Conquered、War Room 自動通關是否計入、特殊獎盃觸發時機、NG+ 例外需實機驗證；不據此自動授予獎盃。正式 PSN 存檔無讀取授權，無法自動核對。

## 12. 交接開工指令

```text
請依 G:\git\game-companion\ball-x-pit_GAME_COMPANION_SPEC.md，完成《BALL x PIT》在 Game Companion 的本次實作範圍與本機驗證。

先讀適用的 AGENTS.md、README、架構與模組契約，確認工作樹既有修改，並盤點現有模組可沿用的實作。以 MD 的已確認需求及目前程式為依據，必要時核對資料來源；技術建議若與現況不符，採符合需求與 repo 規範的做法並記錄原因。

請直接完成規格列為本次必做的內容、必要資料整理、介面、進度保存、備份匯入，以及相關資料／建置／產物／隔離瀏覽器檢查。範圍有列入的其他功能一併完成，不擅自縮成示範頁或少量樣本；盤點後在同一工作流程繼續實作，不停在計畫或報告。一般可逆操作與例行技術選擇自行處理，不必逐階段等待我確認。

資料缺口不得編造，也不得假裝完整；可先以待查呈現的部分繼續完成。只有遇到會實質改變需求、造成資料破壞，或確實需要新增授權的阻擋事項才詢問，並繼續完成不受影響的部分。保留既有遊戲、已發布 ID、玩家資料與隔離／同步保護。

完成後更新必要文件，回報實際完成範圍、資料覆蓋、驗證結果、尚待人工／實機／外部驗證的項目，以及本機開啟方式。這次先完成本機實作與驗證，不 commit、不 push、不部署。
```
