# 攝影與追憶逐筆資料查核

2026-11-27；模組1.1.0；資料2026-11-27.2。資料源為模組 `research/collectibles.json`，離線產生器將它與原稿分別記SHA256，發布產物不包含研究用原始網頁。

| 分類 | 分組 | 逐筆數 | 白金門檻 |
|---|---|---:|---:|
| 攝影 | 小日本15、威基基15、Anaconda10、Downtown／Chinatown／第五地區15、文化區／港灣公園15 | 夏威夷70 | 兩地合計30 |
| 攝影 | 酒吧區10、市中心15、北部／中華街15 | 異人町40 | 兩地合計30 |
| 追憶 | 異人町遊戲編號01～50 | 50 | 兩地合計70（另有30盃） |
| 追憶 | 神室町遊戲編號01～40 | 40 | 兩地合計70 |

每筆包含穩定ID、分類／原分組編號、城市／區域、本站繁中導覽名、原文名與別名、文字位置、取景或事件操作、最早章節、時段、前置、來源ID及查核日期。攝影ID採 `photo-{lj/wk/ac/dc/cp/bd/dt/ut}-{01…}`；追憶採 `memoir-{ijincho/kamurocho}-{01…}`，不與既有T／SS／章節ID混用。取得狀態都在既有schema1的objectives內，不增加平行存檔。

來源登錄C01～C14在資料檔與畫面「來源與範圍」完整列出，逐筆來源可直接開啟。主要交叉對照為 [PowerPyx攝影](https://www.powerpyx.com/like-a-dragon-infinite-wealth-all-photo-rally-locations/)、[RPG Site攝影](https://www.rpgsite.net/guide/15364-like-a-dragon-infinite-wealth-photo-rally-guide-where-to-find-all-camera-spots)、[CyricZ攝影](https://gamefaqs.gamespot.com/ps5/409974-like-a-dragon-infinite-wealth/faqs/81106/photo-rally)、[Gamepressure異人町](https://www.gamepressure.com/like-a-dragon-infinite-wealth/memoirs-of-a-dragon-in-yokohama/zc11208)、[Gamepressure神室町](https://www.gamepressure.com/like-a-dragon-infinite-wealth/memoirs-of-a-dragon-in-kamurocho/zd11209)、[PowerPyx追憶](https://www.powerpyx.com/like-a-dragon-infinite-wealth-memoirs-of-a-dragon-guide/)、CyricZ的[第8章](https://gamefaqs.gamespot.com/ps5/409974-like-a-dragon-infinite-wealth/faqs/81106/chapter-8-memoirs)、[第12章](https://gamefaqs.gamespot.com/ps5/409974-like-a-dragon-infinite-wealth/faqs/81106/chapter-12-memoirs)及[最終章](https://gamefaqs.gamespot.com/ps5/409974-like-a-dragon-infinite-wealth/faqs/81106/finale-memoirs)。

只整理遊戲物件、地點與條件的事實，位置與操作另以繁中編寫，沒有轉載來源圖片或長段原文。不是官方中文名稱翻譯庫；也不是PS5實機導航驗收。

已處理的差異與容易誤讀處：

- 神室町35／36／38：Gamepressure列第12章；CyricZ及PowerPyx均列第8章。採兩份一致的第8章，另列主線允許神室町自由探索的條件，保留來源差異提醒。
- 神室町40的前置是神室町39→異人町36，再白天回Four Shine；不要求匿名「追憶達N篇」冒充事件前置。
- 異人町37與神室町05／06放最終章；異人町50為第10章劇情，不造一個戶外可撿取點。神室町37／39為第12章劇情，自動取得仍需玩家核對，本站不自動代勾。
- 異人町43～47最早第10章，48／49最早第12章；臨終劇場逐段前置及覺醒3～9要求心／技／體三項皆達標。[CyricZ願望清單](https://gamefaqs.gamespot.com/ps5/409974-like-a-dragon-infinite-wealth/faqs/81106/the-bucket-list-mid-game-spoilers)與[Neoseeker臨終劇場](https://www.neoseeker.com/like-a-dragon-infinite-wealth/guides/Life_Links)提供能力與事件對照。
- 小日本08賭場：CyricZ的商店／攝影頁寫自信5，賭博頁寫3，其他攻略亦有4；不把單一數字當實機定論。條件寫明需通過門口自信檢定、保守建議5再訪，實際仍依遊戲。此為目前保留的精確門檻缺口，不影響點位收錄數。
- Downtown05 Cafe Soramame先完成SS22。酒吧區06拍二樓通道吉祥物，不把Ginsharin店名出現當作照片硬前置；位置、通道與店鋪劇情分開提醒。
- 「未列固定時段」代表查閱來源未提供固定時段，並非保證任何時段都出現；白天限定的宗教家、軌道車及Four Shine事件另標白天。
- 部分來源僅能提供街區與書本標記範圍，未加入杜撰的GPS／地圖精確座標；取景未登錄時以遊戲攝影圖示及清單為準。

資料兼容：舊版手填總數只保存為獨立核對參考，不能回推具名地點、不能和逐點數相加。摘要改由逐筆紀錄計算110／90完成率；PSN仍獨立確認。前置與章節只提示，不因本站沒打勾而鎖住後續內容。

介面沿用Achromatic ledger及既有字型／青色進度條，沒有新抽設計方向。主要問題是「目前區域還漏哪些點」：查漏列表緊湊顯示位置，詳情展開看解鎖／來源；路線選定一個區域後未完成項全文展開，完成保留名稱、已勾選框與回看。舊版的主線／支線／獎盃結構保留。
