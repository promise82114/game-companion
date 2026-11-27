# 裝備位置與地城通路補查

2026-11-27 本機1.1.1優先補查：Fursaken Cave加入來源記載的完整行進順序；Excalipurr補Laketown三連任務與領劍步驟，英文物品名配對仍保留候選；Bat Cove墓碑支路加入秘密路徑及待核實篩選，入口仍待查。來源87筆，26個地城提醒／16個秘密路徑提醒；沿用原ID與schema1。2026-11-27使用者已授權本批commit／push及既有main GitHub Pages發布；結果以對應Actions及正式資源核對為準。

## 1.1.1三項優先查證

- **Excalipurr（仍為候選）**：R02日文裝備表指湖區第三任務；新查閱[R53英文腳本](https://gamefaqs.gamespot.com/switch/239257-cat-quest-ii/faqs/78262)SF22～SF24確認三段英文任務和最後留下劍的情節，但沒有物品名。[R54影片](https://www.youtube.com/watch?v=cuk-aCbZ6yA)僅核對標題與說明，未查看獎勵畫面。新增前兩段任務關聯、第三段拾劍回話與背包核對提醒；不升格為英文物品已確認或PS4實測。
- **Fursaken Cave（文獻完整順序）**：[R52原攻略](https://www.trueachievements.com/game/Cat-Quest-II/walkthrough/3)搜尋索引回傳完整洞內段落；直接頁面403。自行整理入口雙火炬、東與東南支線、回退兩島及最後怪物箱順序。R26的箱位／掉落表獨立保留，未證實怪物箱就是北箱，不強行配對。Xbox文獻並非PS4驗收。
- **Bat Cove（入口仍待查）**：R31只確認Pawmas與Mafang Woofayne墓碑支路存在，搜尋未找到可靠起點。改納入秘密路徑篩選（15→16並非新發現另一洞），新增地城「通路仍有待核實」篩選，提醒三個裝備箱與墓碑支路分開核對。支路是否有獎勵或影響清洞也未證實。

資料版本2026-11-27.3；新增R52～R54，共87筆來源。裝備覆蓋維持72具名／35池／1候選，仍26洞提醒／47洞未補；全原ID、進度及PSN獨立確認不變。本機資料驗證、根verify、build、verify-site及完整隔離瀏覽器回歸均通過；新增三項在390／1440px截圖檢視，修正多任務關聯時取得地點誤用第一任務的問題。只使用合成資料與新context。以下為1.1.0歷史紀錄，舊缺口以本節更新為準。

2026-11-27 · 本機模組1.1.0／資料2026-11-27.2。沿用已發布的108裝備、73地城與全部原ID、schema1及獨立儲存；沒有新增平行收集紀錄。

## 覆蓋範圍

| 範圍 | 本批結果 | 不能據此宣稱 |
| --- | --- | --- |
| 108件裝備 | 72件有具名固定箱／任務／劇情／額外挑戰來源；35件僅列候選池；1件僅有待核實對應 | 不代表108件全部有保證出處、所有替代取得點或現版世界總量已完整核實 |
| 73基準地城 | 26個有通路、入口、鑰匙或獎勵回收提醒，其中15個涉及秘密路徑；其餘47個仍保留走法待查 | 不是73洞全逐房間導航，也未證明每洞秘密箱都已收齊 |
| 22個金箱索引 | 保留穩定ID、固定與候選區分，另補8項來源差異提醒 | 不把單次開箱紀錄當保證獎勵，不把這22點當世界完整金箱總數 |

「具名來源」只表示文獻指出可查找的箱／任務等目標，包含五件選讀Infinity Tomb裝備；**不是已經PS4實機驗收**。同件可能同時有固定來源、隨機池及尚待核實的替代任務。來源配對不足時標示候選，沒有憑日文名稱相近就升為保證獎勵。

## 來源與取捨

新資料以`research/locations.mjs`維護，只記遊戲事實與自行整理的短操作，沒有收錄整份第三方攻略、圖片或地圖。R01～R51逐筆連結、查閱方式與限制一併打包進`dist/data.json`。查證日期2026-11-27。

- [Famizou地城表](https://trozo.hateblo.jp/entry/Catquest2trozo)：實際開啟，採火炬／陷阱／傳送點等短地標；日文洞名與既有英文索引對照。沒有把表中的「無」批次改成73洞都保證沒有秘密。
- [Milpiri裝備表](https://milpiriblog.com/cat_quest_ii-equipments-parts)：實際開啟，提供任務或箱子來源。英文任務對應僅按系列／順序尚不足的資料保留`candidate`。
- [Milpiri金箱紀錄](https://milpiriblog.com/cat_quest_ii-golden_chests)與[Wiki金箱表](https://catquest2.fandom.com/wiki/Golden_Chest)：前者實際開啟、後者搜尋索引返回表格。部分內容不同，因此個別箱保留衝突；既有pool不因出現一次獎勵紀錄而改成fixed。
- Wiki各裝備、任務及地城：本批直接讀取部分頁面受402／robots限制，採搜尋索引回傳的正文或掉落表，來源註記明列「搜尋索引」，沒有假稱完整開頁或自行遊戲測試。
- [The Gentlebros的Ultimutt回覆](https://steamcommunity.com/app/914710/discussions/0/3338785229797428286/)：開發者指明是**進洞第一支火炬西南**；東側三石頭與箱子支路分開處理。
- [Mew World玩家更新整理](https://www.reddit.com/r/CatQuest/comments/i5xq0d)：BamBam／Mystery Meat普通箱方向與日文表對照，保留PS4版本位置待核對。

The Wayside用於尋找原始來源，未列為獨立第二次實測。一般刷裝／Build優劣、精確掉落率及舊版裝備數值未在本批新增，避免把跨版本差異混入取得導航。

## 仍待核實與已保留的衝突

- Excalipurr：日文表指向湖區第三任務，英文`Of Swords and the Worthy`配對仍標候選；沒有假稱已由PS4錄影確認。
- Fursaken Cave：已核對島嶼連接及東／西／北箱。北箱固定Skeleton King Armor；東西箱是Armor／Crown候選。完整起點、每個轉彎仍待核，不提供看似精確的南→東路線。
- Bat Cove：三件Doge Knight獎勵與任務開門已列；Pawmas／Mafang墓碑秘密分支的起點未核實。
- Pawlonijr：地城表東箱與單件頁怪物箱記載不一致；只列同洞固定取得，提示三箱全查。Purrsecutor箱型也維持提示，不強行消除舊缺口。
- Skeleton King Armor：Wiki明列Fursaken北箱；日文表另記犬國秘密洞。優先提供具名固定查找點，保留另一說待核。
- Jester Aee Cap左右方位、Purrsecutor島兩種Mace名稱，以及若干金箱的候選獎勵：逐箱保留差異。沒有把不同名稱靜默合併或改玩家ID。
- Tombstone Cave等級、Puggy／Pugger及Furrible別名、完整世界分母仍依原G01／G02缺口保留。

## 工程與驗證

`scripts/prepare-data.mjs`先依原規格產生基本catalog，再由`merge-locations.mjs`疊加本批資料；分別記錄spec與research SHA256。研究資料用顯式ID串接裝備、任務、鑰匙、地城與路線，不靠模糊名字配對新增進度。無效ID／來源／路線代號使產生器停止。

`dist/locations.js`只有讀取與呈現：路線內未完成提醒展開；查漏詳情內可讀取得方式與秘密路徑；地城相關裝備可原處勾選，仍讀寫原`entities`紀錄。新增具名來源、候選池、待核對應及秘密路徑查漏篩選，切功能重設。閱讀或查證狀態不代填取得、清洞、鑰匙或PSN。

資料驗證涵蓋research hash、全108件的來源／路線引用、72／35／1及26／15分組、關聯可解析與原數量。新增隔離瀏覽器情境涵蓋來源篩選、Chef Vest與Septencin雙向定位／原處記錄、候選池提示、Ultimutt清洞不代填鑰匙、未核實走法／箱型衝突、深連結清除及手機／桌面詳情。既有保存、撤銷、匯入與跨頁回歸持續執行。只使用合成進度與新context。

2026-11-27使用者已授權本批commit／push與既有main GitHub Pages發布，部署結果以對應提交Actions及正式資源核對為準。

本機驗證結果：專屬資料與舊版schema1備份相容檢查、根verify、build、verify-site、隔離瀏覽器完整回歸及新增位置／通路情境均通過。新增詳情在390／1440px截圖核對，四功能另以360／390／768／1024／1440／1920／2560px檢查無水平溢出與工具列對齊。
