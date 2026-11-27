# 中文優先試行 · Cat Quest II／III · 2026-11-27

依使用者要求補清楚共通介面偏好第 20 項，先套用 Cat Quest II 1.2.0 與 Cat Quest III 1.3.0。2026-11-27 使用者已授權本批 commit／push，沿既有 main GitHub Pages 流程發布；發布結果以對應提交 Actions 與正式資源核對為準，正式站人工驗收由使用者進行。

## 使用原則

- 有適用版本的遊戲內／官方繁中證據時優先還原；缺少證據時可用一致的社群或本站參考譯名，不能因此讓整類資料只顯示英文。
- 中文是主要名稱，原文放後方或下一行作次要對照；主清單維持 14px，原文 12px，不放大整頁。
- 搜尋支援原名、中譯與既有別名；用同一詞彙表呈現清單、關聯連結、路線與區域選單。
- 參考翻譯的性質集中於清單提示與資料頁說明；有語意歧義的對應才逐筆警示。翻譯不是地點／條件查證，不提高原攻略的證據等級。

完整規則見 [UI_PREFERENCES.md 第 20 項及補充](../UI_PREFERENCES.md)。

## 本批呈現

以下都是本站參考譯名，沒有宣稱與遊戲官方中文相同：

| 中文主名 | 原文次要對照 | 用途 |
| --- | --- | --- |
| 療癒之爪 | Healpaw | 法術清單、攻略與搜尋 |
| 南爪鎮 | South Pawt | Cat Quest II 開場地點與行進路線 |
| 火焰法師帽 | Fire Mage Hat | 裝備清單與相關取得提示 |
| 白金尋寶者 | Purrlatinum Seeker | Cat Quest III 獎盃名稱 |

- Cat Quest II：292 個實體、20 座獎盃的主要名稱皆可用繁中閱讀。
- Cat Quest III：211 個實體、31 座獎盃的主要名稱皆可用繁中閱讀。
- 區域、人物、首領、法術、裝備、支線、獎盃及行內關鍵字共用對照；原文小字可自然換行。深色側欄另保留足夠對比。
- 原生下拉選單使用中文在前、原文在後，保留原 option value，沒有改變分類或導航識別。
- 同一段文字內同詞重複出現時只在第一次附原文，減少雙語堆疊。

## 資料與維護

- 各模組的 `research/localization.json` 是可維護詞彙來源，`status:reference`；目前 `officialNames` 為空，沒有逐項確認的官方中文證據。少數專名採音譯或語意整理，仍需玩家畫面與官方用詞後續校正。
- 原 prepare-data 命令產生 `dist/localization.js`，內含來源 SHA-256。verifier 檢查產物與來源一致、中文覆蓋及主要名稱不殘留未翻譯英文字詞（羅馬等級除外）。
- `scripts/lib/prepare-chinese-glossary.mjs` 只在本機／CI 產生與驗證，不部署。`shared/chinese-text.js` 只處理顯示與搜尋，不保存進度。
- 原始 `data.json`、name／label、條目順序、ID、關聯及來源皆未修改。schema1、namespace、逐鍵撤銷、匯入保護與玩家資料維持原契約，不做翻譯遷移。
- 文字以 DOM textContent 建立；保護 URL、穩定 ID、匯入原文 pre 及輸入框，不將譯文解讀為 HTML。對已處理的名稱不重複插入原文。

## 驗證

使用 Node 24、既有 Playwright 與 Edge。瀏覽器只用合成資料及新 context，不使用正式備份或現有 profile。

```powershell
node games/cat-quest-ii/scripts/prepare-data.mjs
node games/cat-quest-iii/prepare-data.mjs
node scripts/verify.mjs
node scripts/build.mjs
node scripts/verify-site.mjs
node scripts/verify-cat-quest-localization-browser.mjs
node scripts/verify-cq2-browser.mjs
node scripts/verify-cq3-browser.mjs
```

- 全模組資料驗證、兩模組詞彙驗證、建置與發布產物檢查通過。
- 新語系回歸通過：逐類中文主名、原文較小字級、中文／原文搜尋結果一致、名稱覆蓋、參考譯名說明、安全文字處理、閱讀不寫進度、勾選／撤銷及 320／390／768／1440／1920／2560px 無水平溢出。
- 原 Cat Quest II、III 隔離瀏覽器回歸通過：原子進度、跨分頁／撤銷、保存失敗回復、匯入差異／原文備份／未知資料保留、焦點／鍵盤與響應式檢查。
- 已查看桌面及手機的路線／清單截圖。素材位於忽略的 `outputs/cat-quest-localization/`。

尚未以遊戲中文畫面逐名校正，也未完成 PS4／PS5 實機流程或正式站驗收；本批翻譯不是官方中文還原完成的證明。
