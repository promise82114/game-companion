# 地圖底圖、收集清單與防守事件

2026-11-19；模組 1.9.0。進度 schema、已發布收集 ID、namespace 與共用收集紀錄不變。

## 底圖與對位

- BWIKI 原頁在本次直接存取時被安全策略限制，沒有繞過；採本站既有座標來源 [MapGenie Yard](https://mapgenie.io/grounded/maps/yard) 的公開 map 113 / tile set 121 / Retro simple-v1 設定。
- 比對來源的 Original 與 Retro 底圖，選擇上庭院器物輪廓較清楚的 Retro。64 張 256×256 PNG（zoom 11，x/y 1016～1023）合計 360,820 bytes，組成 2048×2048 的底圖；每張 URL、大小與 SHA-256 在 `MAP_BASEMAP.json`。
- SVG 底圖切片與 418 個既有點位共用 Web Mercator 投影。移除原有只畫網格的背景、線性緯度換算及獨立 BWIKI iframe，不新增地圖框架或遠端執行依賴。
- 橡樹、樹籬、沙坑、魔多克城堡、樹樁及咖啡機保存來源座標與底圖像素對照。資料驗證防止座標軸、方向、尺度和圖層改動造成偏移；瀏覽器另驗證縮放／拖曳後標記相對底圖位置不變。
- 原圖透過 CSS 提亮以便閱讀；沒有重新繪製或製造未查證地形。這是庭院俯視底圖，不代表洞穴、實驗室走廊或高低層的可通行路徑。選點後直接列所在位置類型與抵達路線，缺少層級資料時明示未核對。
- 底圖、點位與圖示均由本站提供；保留 MapGenie、BWIKI 及 Obsidian／Xbox Game Studios 來源署名。單張切片缺失時顯示載入錯誤，點位與勾選仍可操作。

## 收集清單

桌面把名稱／勾選和說明分成左右欄，右欄配置較多寬度；手機恢復直向。位置、工具、抵達與入口文字保持全展開，將標題與說明同段、來源連結並排，減少重複堆疊。569 個核對列維持原 ID、全部顯示與尚未取得預設。地圖、清單及路線圖共用原進度與撤銷流程。

## 防守資料與界線

- 8 台 MIX.R／超級 MIX.R 的主要敵人依 [Grounded Wiki MIX.Rs 的 Grounded 本體分區](https://grounded.wiki.gg/wiki/MIX.Rs) 與 [BWIKI MIX.R](https://wiki.biligame.com/grounded/MIX.R) 交叉參照，不採 Grounded 2 的來襲波次。
- JavaMatic 另列 [O.R.C. 來襲重型生物](https://grounded.fandom.com/wiki/JavaMatic) 與三點防守重點；本表是主要敵人對照，不宣稱所有種類、固定波次或數量。
- 「準備難度（攻略評估）」是依敵人、空襲、毒氣／爆炸與守點數量整理的編輯建議，並非遊戲機器介面的原始難度指標；後者未取得逐台可核對資料，保持明確區分。NG+ 入注效果、遊戲模式與隊伍人數會改變體感。
- 敵人連到本站弱點／抗性表，與原有收集勾選分開；搜尋涵蓋敵人原文與繁中名稱、準備內容。

## 驗證命令

```powershell
node games/grounded/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node scripts/verify-grounded-map-browser.mjs
node scripts/verify-grounded-browser.mjs
```

瀏覽器僅使用新 context 和合成進度。驗證涵蓋實際 PNG 解碼、底圖／點位同步縮放拖曳、跨分頁勾選與取消、未取得篩選及撤銷、寬欄清單、敵人互跳、五種寬度、外站請求隔離及缺圖仍可勾選。這些不等於遊戲內三維路線或機器難度已實測。
