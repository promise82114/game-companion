# Game Companion｜Thank Goodness You're Here! 白金 Roadmap 匯入任務

## 目標
將《Thank Goodness You're Here!》PS5 本體獎盃（0/33）的白金攻略整合進既有 GitHub Pages 專案，支援依遊戲流程閱讀、警示與獨立勾選進度。**先盤點現有程式與資料結構，優先沿用，不另造一套管理系統。**

## 工作方式
1. 閱讀 README、AGENTS.md、現有遊戲資料、路由、獎盃模型、IndexedDB 與 Google Drive 同步實作。
2. 找出現有 Roadmap/Checklist 的可重用元件，列出需新增的最小資料欄位。
3. 將本文件的獎盃與階段草稿轉成專案既有格式；不應直接把 Markdown 解析成不可維護的硬編碼 UI。
4. 驗證來源、觸發順序、錯過風險與獎盃條件；未查證內容標記 `unverified`，不可自行補造。
5. 完成畫面、持久化與基本測試，最後執行現有 build/test 指令並回報結果。

## 遊戲基本資料
- 名稱：Thank Goodness You're Here!
- 平台：PS5（請核對專案現有遊戲識別碼）
- 範圍：本體；不納入 DLC
- 初始進度：0/33（不得覆蓋使用者已有的實際進度）
- 目標：白金 `Barnsworth's Best`
- 估計：4–6 小時，約 1 輪可完成；依攻略及版本重新核實
- 劇透：允許

## 資料模型建議（按既有架構調整）
- gameId、platform、scope、guideVersion、lastVerifiedAt
- stages：id、title、order、description、checkpoint、steps
- steps：id、order、location、trigger、action、verification、trophyIds、warningLevel、missable、recovery、sourceRefs、verificationStatus
- trophies：id、officialName、description、category、earned（獎盃進度應獨立存放）
- trackers：跨階段重複互動（魚販、警察亭、酒館、郵筒、關閉的門、老鼠、森林動物、蝸牛等）
- 進度：`stepDone` 與 `trophyEarned` 分開，保留原有 IndexedDB / Drive 同步和衝突處理方式
- 警示：🔴 不可逆／容易錯過；🟠 分歧／建議備份；🟡 提前準備；🔵 推薦體驗；⚪ 可延後
- 每筆具體攻略需有查證狀態：`verified` / `consensus` / `unverified`，重要風險不得只靠未查證內容下結論

## 完整獎盃清單（33）
Barnsworth's Best; In For A Penny; Open For Business; Cream of the Crop; Enough For Everyone; Milk Shy No More; Still at Large; Breakfast In Bed; Thank Goodness it's Over!; Patience is a Virtue; Spill the Beans; Done Up Like a Kipper; Friend of the Forest; No Post on Thuesdays; Bobby Knocker; Cheek to Cheek; The Rat Pack; Mole Supper; A Lovely Pair; Think F.A.S.T.; A Fine Mess; Lights Out; The Beans are on the Windowsill!; The People's Princess; Visit Barnsworth; Everything Must Go; Final Form; Ménage à trois; The Ol' One Two; Tough Tatties; Green Fingers; Shell Shocked; Sick as a Fig.

## 初版遊玩階段草稿（**順序與細節待逐項查證**）

### 00｜接待室與假結局
- `Patience is a Virtue`：在接待室等待，確認等待時間及觸發方式。
- `Bobby Knocker`：確認接待室是否存在必要的敲門計數。
- `Visit Barnsworth`：離開接待室。
- 🔴 離開前驗收所有不可回頭的互動。

### 01｜第一次探索小鎮
- 記錄廣場、商店、公園的門與郵筒位置。
- `A Lovely Pair`：割草事件。
- `Sick as a Fig`：Ronny 互動。
- `In For A Penny`：Charlie 事件。
- 🟡 開始記錄酒館 Larry、警察 Bobby 的跨階段對話。

### 02｜商店、市場、魚販與地下區域
- `A Fine Mess`：Keri 的貨架。
- `The Rat Pack`：收集所有唱歌老鼠，逐一核對數量及位置。
- `No Post on Thuesdays`：逐一核對郵筒。
- `Bobby Knocker`：逐一核對指定關閉的門。
- `Done Up Like a Kipper`：魚販第一輪互動。
- `Cheek to Cheek`：服務人員第一輪互動。
- 🔴 離開階段前核對跨階段互動。

### 03｜Charlie、肉店與派
- `Lights Out`：Charlie 的特定時機互動。
- `Final Form`：Sam 的肉塊。
- `Enough For Everyone`：製作大派。
- `The Beans are on the Windowsill!`：Brigadier Bean Tin 事件。
- 🟡 魚販及服務人員後續互動。

### 04｜回訪廣場、店面與花園
- `Everything Must Go`：Nick 的新商店。
- `Ménage à trois`：Polly 與 Paul 的住處。
- `Cream of the Crop`：番茄。
- `Green Fingers`：Graham 的園藝事件。
- `Open For Business`：修理炸鍋。
- `Friend of the Forest`：森林生物全收集。
- 🟡 每次劇情變化後回訪酒館、警察亭、魚販及其他重複互動。

### 05｜紀念盤、馬鈴薯與飲茶
- `The People's Princess`：紀念盤。
- `Tough Tatties`：Marge 與馬鈴薯；確認必須等待的對話。
- `Milk Shy No More`：喝茶。
- `Still at Large`：罪犯事件。
- `Think F.A.S.T.`：Larry 的飲料對話。
- `The Ol' One Two`：Bobby 的特技。

### 06｜花園、井與最終跨階段清理
- `Shell Shocked`：Sue 的蝸牛；核對全部位置及可回訪性。
- `Mole Supper`：鼴鼠事件。
- `Done Up Like a Kipper`：魚販後續互動，直到實際跳盃。
- `Cheek to Cheek`：服務人員後續互動，直到實際跳盃。
- 🔴 進入結局前核對所有跨階段獎盃。

### 07｜湯、豆罐與結局
- `Spill the Beans`：倒地男子與豆罐事件。
- `Breakfast In Bed`：買湯事件。
- `Thank Goodness it's Over!`：完成結局。
- `Barnsworth's Best`：確認其他 32 個獎盃已跳出後取得。

## UI 驗收
- 可依階段展開詳細操作與地點、時機、驗證方式。
- 每個操作有核取方塊，獎盃取得另有獨立核取方塊，不能互相自動推定。
- 顯示操作完成數、獎盃完成數、當前階段、下一個不可逆檢查點。
- 跨階段收集器可展開顯示每一個子項，不只顯示總數。
- 未查證資料顯示提示；不可逆警示必須有來源或明確標示待查。
- 重新整理、離線、手動 Google Drive 同步後不遺失或錯誤覆蓋進度。
- 保持現有網站的響應式版面、命名、路由與部署方式。

## 查證來源候選（先確認可存取及內容）
- PSNProfiles / PlayStationTrophies / PowerPyx 的獎盃攻略
- https://platget.com/guides/thank-goodness-youre-here-trophy-guide/
- https://www.youtube.com/watch?v=bhqlRxpX8iU
- Steam 社群指南與官方遊戲資訊

## 不可直接採信的舊稿細節
前一版對話曾提及「22 個可錯過獎盃」、「9 扇門」、「6 個郵筒」、「7 隻蝸牛」、酒館／警察亭／魚販的固定互動次數，以及若干精確觸發順序。這些都必須核對來源後才標記已確認；**不可將這些數字當成已實測事實**。

## 交付
- 列出實際修改檔案、資料 schema、來源及查證狀態。
- 回報 33 個獎盃的映射完整性、各階段警示及跨階段追蹤覆蓋率。
- 附上 build/test 結果與仍待人工遊玩驗證的項目。
- 不新增無必要的後端、登入或第二套同步系統。
