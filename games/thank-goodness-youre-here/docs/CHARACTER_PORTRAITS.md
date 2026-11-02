# 攻略角色小圖

2026-11-03，模組 1.1.2。使用者已授權提交與推送，沿用 main Pages 發布流程；部署結果以對應提交的 GitHub Actions 為準。

依使用者選定的「極簡」程度，以共用 SVG symbol 繪製 19 組黑白辨識圖，於名字旁以 24px 顯示。保留輪廓、帽子、髮型、眼鏡或鬍鬚等辨識特徵；這是攻略用重繪示意，不是官方角色立繪。

## 名字與外觀依據

查閱日期均為 2026-11-03。公開攻略的截圖只用於確認外形，不因此更改事件條件或將待查證步驟升級為已確認。參考原圖只存於忽略追蹤的 `outputs/thank-goodness/character-references/`，不納入網站。

| 名字／別名 | 辨識特徵 | 圖像依據 |
| --- | --- | --- |
| Mother Megg | 高髮髻、圍裙 | [奶油店內外截圖][roadmap] |
| Colin | 頭頂短髮、圓眼鏡、店員圍裙 | [奶油店內截圖，字幕直接稱 Colin][roadmap] |
| Larry | 禿頭、寬臉、長鼻、毛衣領 | [酒館內截圖][roadmap]、[發行商訪談截圖][pub] |
| Ronny | 側分白髮、圓眼鏡、蝴蝶結 | [酒館內截圖][roadmap]、[發行商訪談截圖][pub] |
| Charlie | 小帽、側分頭髮、圓眼、蝴蝶結 | [廣場脫困截圖][roadmap] |
| Jasper | 頂部少量頭髮、大鼻、鬍子 | [河岸槌子事件截圖][roadmap] |
| Marge | 工作帽、捲髮、圍裙 | [炸鍋修好截圖][roadmap] |
| Bish | 白帽、垂下的八字鬍、蝴蝶結 | [官方魚販截圖][bish] |
| Sam | 小紙帽、大圓鼻、肉販圍裙 | [肉店截圖][sam] |
| Big Ron／Ron | 頭頂髮束、橫向鬍子、圍裙 | [巨大派截圖][roadmap]、[酒館群像][gathering] |
| Nick | 小帽、分瓣鬍子、外套 | [磚牆與二手家具店截圖][roadmap] |
| Rog | 特別高的大頭、頭頂髮束、大眼、蝴蝶結 | [酒館群像中 Big Ron 左側人物][gathering]；依截圖畫輪廓，未採用文字介紹中與畫面不符的圓頭／眼鏡描述 |
| Brigadier | 橫向軍帽、羽飾、鬍子、斜肩帶 | [巷內垃圾箱截圖][brigadier] |
| Polly | 蓬鬆髮型、圓眼鏡、項鍊 | [Polly／Paul 屋內截圖][roadmap] |
| Paul | 頭頂與兩側少量頭髮、八字鬍、襯衫領 | [Polly／Paul 屋內截圖][roadmap] |
| Frank | 有毛邊的連帽外套、年輕臉形 | [河岸釣魚截圖][roadmap] |
| Graham | 窗內人物的帽沿、鼻子與臉部輪廓 | [有臉花朵旁的房屋窗戶截圖][roadmap]；窗內細節有限，為簡化辨識示意，精確造型仍待實機核對 |
| Sue | 頭飾、分線髮型與背面輪廓 | [花園右上蝸牛旁截圖][roadmap]；採背影，不補畫參考中看不到的五官 |
| Bobby | 警察亭輪廓 | 對應攻略既有「Bobby 警察亭」與互動地點，使用場所辨識圖；不是已核實的警察面貌或亭子精細立面 |

[roadmap]: https://beyondthefoggate.com/guides/thank-goodness-youre-here-trophy-guide/
[pub]: https://store.epicgames.com/ja/news/thank-goodness-youre-here-interview-northern-england-sketch-show
[bish]: https://thankgoodness-assets.panicfiles.com/tgyh-screenshot-08-bishes-fishes.png
[sam]: https://cdn.staticneo.com/ew/4/40/Thank-goodness-youre-here-sams-ham-1.jpg
[gathering]: https://nerdswithmics.com/2024/08/18/eeh-by-gum-thank-goodness-youre-here-is-actually-the-greatest-organised-crime-drama-of-our-time-and-you-cant-convince-me-otherwise-luv/
[brigadier]: https://kotaku.com/thank-goodness-youre-here-guide-walkthrough-1851633756

## 呈現與資料隔離

- `dist/characters.js` 保存名字／別名對照並安全跳脫原文，只替完整英文名字加顯示標記。`Big Ron`／`Ron` 共用，`Ronny` 獨立；不匹配 `Ronald`、`Nickname` 等單字片段。
- `dist/characters.svg` 共用 19 個 symbol，CSS 固定 24px。圖示為裝飾，`aria-hidden` 且不能獨立取得焦點，名字仍是原本可搜尋、可朗讀的文字。攻略標題、操作、地點、時機、章節提醒、追蹤與相關獎盃說明／跳轉地點沿用相同呈現。
- 原生章節選單、獎盃官方名稱、來源標題與匯出資料保持文字。頭像載入失敗時，名字與勾選仍可使用。
- 沒有新增玩家進度欄位，`guide.json`、既有 ID、IndexedDB、Drive 與其他遊戲不改。模組版本 1.1.2，schema 1；SW cache v7 納入兩個本機素材，沿用原本清理前綴。
- 以既有資料檢查與隔離瀏覽器回歸驗證別名、文字跳脫、圖示載入、搜尋、點名字勾選、獎盃獨立、手機換行、離線素材及原有資料保護；僅使用合成資料與新 context。Graham 精確外觀仍需人工核對。

## 本機驗證結果

2026-11-03：根 `verify`、`build`、`verify-site` 與 Thank Goodness 完整隔離瀏覽器回歸通過，pageerror 0。19 個 SVG symbol 均在全新 context 實際載入；1440px／390px 搜尋結果截圖已人工檢查，名字與小圖共同換行、沒有橫向溢出。回歸包含點名字切換步驟、獎盃獨立、跨分頁、備份還原、初始化與合成 Drive；v7 離線 cache 亦確認包含角色程式及 SVG。

沿用 design-taste-frontend 的 app 檢查，1440／768／390px 均無溢出、console error 或 FAIL。原本短章節的桌面閱讀留白有 `unused-canvas` WARN；沿用已對齊 EDF 的版面，沒有為新增小圖改動全站內容寬度。既有紅／橙風險符號依使用者原要求保留。
