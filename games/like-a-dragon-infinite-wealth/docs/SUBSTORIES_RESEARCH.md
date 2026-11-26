# 52條支線資料查核

日期：2026-11-27；模組1.2.0／資料2026-11-27.3。已整理SS01～SS52的觸發地點、最早章節、解鎖條件、步驟、完成判定及逐條來源；不是PS5實機驗收。中文短題是本站導覽描述，保留既有英文名稱與ID。

離線維護資料為 `research/substories.json`，由同目錄 `prepare-substories.mjs` 的人工整理事實產生；再由模組 `prepare-data.mjs` 合併進 `dist/data.json`，以獨立SHA256核對。沒有即時爬取、圖片搬運或複製攻略段落。

主要參照 [PowerPyx總表](https://www.powerpyx.com/like-a-dragon-infinite-wealth-substories-guide/)、[CyricZ第3章](https://gamefaqs.gamespot.com/ps5/409974-like-a-dragon-infinite-wealth/faqs/81106/chapter-3-substories)、[第4章](https://gamefaqs.gamespot.com/ps5/409974-like-a-dragon-infinite-wealth/faqs/81106/chapter-4-substories)、[關係支線](https://gamefaqs.gamespot.com/ps5/409974-like-a-dragon-infinite-wealth/faqs/81106/romance-substories)及[Neoseeker主線教學](https://www.neoseeker.com/like-a-dragon-infinite-wealth/walkthrough/Substories4)。其餘具體道館定位、教學入口、人物與條件來源均登錄於JSON的sources，每條sourceRefs可追溯；頁面「來源與範圍」亦完整列出。

採用與差異：

- SS03：PowerPyx總表誤列第2章，採CyricZ與主線一致的第3章；沿用原稿既有更正。
- SS11：逐項列迎賓、訂單、端菜及老闆姓名；較佳答法影響報酬，不把全對當成完成前提。
- SS23：先看Sunset Park與Harbor Park兩棵樹，再到Momo St. 聽情侶談話，不能只找Aina。
- SS26：補兩筆電答案、紅箱8931、東走道長椅下藍鑰匙及藍箱；六分時限與戰鬥扣秒不變，滿分是獎勵條件。
- SS29／30：投資US$3,000、10題分類、Lv27地面機與Lv29飛行機分開；SS30要真正夜間，黃昏不算。飛行戰先破充電裝置，再用槍擊本體。
- SS33：Neoseeker將清10堆垃圾、擊敗兩名Washbucklers後列為支線結算；島嶼其餘Day1～Day2強制教學另外提示，避免誤認必須發展到5星才能勾選。
- SS34：補Riverside Walk入口及地下第3層救援；不把30層或EX當作此條完成條件。
- SS35：第6章大道寺據點後能開始，後半要等白天，通常第7章再續；不是可連做完或永久錯過。
- SS38～42：道館與訓練師Rank分開列；SS41 Rank35是前段訊息，Rank40才續Joker。冠軍後普通RPG戰也打完才結算；隊伍等級建議不當成硬性角色等級限制。
- SS47～51：21種證照、8種本體行程、10名不同約會對象、Poundmates Silver消費階級、工坊Level4，各有專屬條件；不能挪用獎盃門檻。SS50是Chitose Buster Holmes，非隊友千歲。
- 關係對話人格：3／5／7分段採[玩家第一手回報](https://steamcommunity.com/app/2072450/discussions/0/797837596195618549/)，證據層級明示社群。資料列以對應人格7作最後事件準備，以遊戲提示為準；未聲稱本站實機驗收。每人三份禮物附購買店，禮物組英文保留以便核對。
- SS52：完成其餘五條關係支線；PowerPyx及[GamerGuides](https://www.gamerguides.com/like-a-dragon-infinite-wealth/guide/substories/relationship/substory-52-guide-surviving-paradise-like-a-dragon-infinite-wealth)與CyricZ對咖啡、啤酒先後順序不同。因此列出三種禮物但不強制表列順序，依酒保實際索取交付；最後離開再於白天回Revolve。

工程與驗證：

- 保留52個substories ID與schema1原進度；沒有新增重複完成欄位。章節與查漏以同一筆 `substories.SSxx.done` 讀寫，PSN仍獨立。
- 路線依當章主角列已可開始及可回補支線，依區域／系列選閱讀單元。查漏可依區域／最早可開始章節篩選；前置提供互跳核對，不鎖住內容也不自動完成。
- 資料檢查涵蓋52筆欄位、穩定ID、來源hash／引用、前置無循環、章節映射、關係禮物、特殊門檻；既有110攝影／90追憶維持。
- 隔離瀏覽器增加詳情、SS11路線共用勾選、完成收合與回看、前置互跳、區域／章節篩選、來源定位與360／390／768／1440長內容及表格檢查；原有跨分頁、逐鍵撤銷、失敗重試、保護式匯入與六寬度檢查仍通過。兩個新context、合成進度、外部請求0。

2026-11-27使用者已授權本批commit／push及既有main Pages發布，結果以對應提交Actions與正式資源核對為準。
