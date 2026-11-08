---
name: gc-content-research
description: 為 Game Companion 遊戲頁面整理穩定資料 ID、中外文名稱、來源與查證狀態，接入既有資料產生及安全文字呈現流程，支援角色辨識圖與來源覆核。
---

# 資料來源、翻譯與查證呈現

先讀[專案契約](../references/project-contract.md)與參考模組 README。此 skill 支援內容維護的方法；使用者只要求搬移或加功能時，不順便改攻略、翻譯及已發布 ID。

## 現有實作位置

| 類型 | 來源 |
| --- | --- |
| 原文事實、翻譯來源／詞段與離線產生 | [WB wiki-facts](../../games/edf-wb/data/wiki-facts.json)、[localization-reference](../../games/edf-wb/data/localization-reference.json)、[localization-fallback](../../games/edf-wb/data/localization-fallback.json)、[build-data.mjs](../../games/edf-wb/scripts/build-data.mjs) |
| 翻譯對照與待核對說明 | [WB translations](../../games/edf-wb/dist/translations.js)、[參考翻譯](../../games/edf-wb/docs/reference-translations.md)；[WB2 translations](../../games/edf-wb2/dist/translations.js)、[localization-review](../../games/edf-wb2/docs/localization-review.md) |
| 雙語文字、安全跳脫與固定修訂／署名 | [Mycopunk wiki.js](../../games/mycopunk/dist/wiki.js) 的 `escapeHtml`／`dual`／`sourceAnchor`；[SOURCE_README](../../games/mycopunk/SOURCE_README.md) 與 [field-guide](../../games/mycopunk/dist/data/field-guide.json) |
| 中英獎盃來源對照 | [Talos trophy-names](../../games/talos2/dist/trophy-names.js)、[Thank Goodness guide](../../games/thank-goodness-youre-here/dist/guide.json)；[Exophase 對照](../../games/thank-goodness-youre-here/docs/EXOPHASE_TROPHY_NAMES.json) |
| 逐題／對話查證與缺口標記 | [Talos puzzle-audit](../../games/talos2/dist/puzzle-audit.js)、[mayor-research](../../games/talos2/dist/mayor-research.js)、[evidence.js](../../games/talos2/dist/roadmap/evidence.js)、[RESEARCH](../../games/talos2/docs/RESEARCH.md) |
| 部分清單與逐項來源 | [Grounded data.js](../../games/grounded/dist/data.js)、[覆蓋報告](../../GROUNDED_DATA_COVERAGE.md) |
| 名字旁角色辨識圖 | [Thank Goodness characters.js](../../games/thank-goodness-youre-here/dist/characters.js)、[characters.svg](../../games/thank-goodness-youre-here/dist/characters.svg)、[圖像來源／限制](../../games/thank-goodness-youre-here/docs/CHARACTER_PORTRAITS.md) |

## 接入步驟

1. 定義遊戲／平台／版本／本體或 DLC 範圍、穩定語意 ID 與可選外部識別欄位。翻譯和排序不作主鍵；第三方來源 ID 與官方 ID 分開，未查到就留未知。
2. 保留原文名稱／條件、來源 URL／修訂／查閱日期、本站摘要及查證狀態。各模組 status 值不同，先對照 validator 與 UI，不硬改成單一 enum。
3. 跨代沿用翻譯記錄匹配方式／原始來源；尚未遊戲畫面核對的名稱保留參考標示。攻略共識、單一來源／衝突與實機確認分開，更新文件日期不冒充逐項已重查。
4. 使用資料驅動呈現。原文與外部文字先 escape 或 textContent，再加入可信結構；外部連結保留來源識別。需角色圖時用名字別名表與完整詞邊界，先跳脫文字，裝飾圖排除朗讀及焦點，保留可搜尋原名。
5. 已有產生器時修改其事實／翻譯輸入再重建對應 dist，先讀產生範圍及 ID 演算法；不要同時手改產生檔導致下一次消失。離線驗證與連外研究／抓取分開，測試不自動執行研究工具。
6. 新增內容才查證所需來源、授權及限制；優先可核對的原始資料並記錄分歧。保留署名／授權，圖像用自有素材或合法引用，不重製攻略長文／第三方底圖。來源無法取得時明列缺口，不猜測完整性或繞過驗證。

## 驗證方式

跑模組資料 verify；WB 需要重建時在 `games/edf-wb/` 執行 `node scripts/build-data.mjs` 再 `node verify.mjs`。WB2 經 root `verify-upstream.mjs` 選 localization／weapon-localization／accessory-localization 細項。其他指令見[驗證參考](../references/verification.md)。

核對 ID／名稱映射、來源引用、翻譯組合、缺漏標記、查證狀態與已知資料覆蓋。瀏覽器測中外文搜尋、惡意 HTML 合成文字安全顯示、名字別名不誤命中、圖示不干擾核取與朗讀。資料改動另跑依賴它的 tracker、地圖、產物與 SW 更新檢查。

## 限制

來源查證不等於 PS5 跳盃、解法或版本效果已實測；資料庫大小不等於遊戲物件總量。Mycopunk 授權／固定修訂、Talos 待核實拼塊操作、Thank Goodness 互動次數及 Grounded 部分清單都須保留原限制。
