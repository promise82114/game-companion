# 96件裝備與船藍圖取得資料

目前1.2.0／資料2026-11-27.3：第二輪20項補查已整合，詳見[補查結論](FOLLOWUP_AUDIT.md)。以下保留前版紀錄，不代表目前仍為83／3／10分類。


2026-11-27 · 模組1.1.0／資料2026-11-27.2。schema1、namespace、所有211個事實及19步／31盃ID不變。

## 覆蓋與證據語意

96件裝備全部具有地點、取得提示、操作核對、適用前置、來源及路線連結。原版固定名稱數量為24頭／24身／17近戰／10遠程／21飾品；不代表現版完整裝備總數。

83件多來源對照、3件單源、10件來源有差異。「多來源」是公開文字對地城／任務／獎勵種類相符，並非每個轉彎、箱子樓層或掉落率都被兩份影像證明，更不是PS5實機驗收。部分轉彎只由單篇攻略提供，保留細部待核提示；未讀取／複製攻略圖片，沒有編造座標。

「單源／細部待核」目前為Oinker Garments、Rogue Claws、Spicy Vest。仍可依候選路線找，未把單一來源冒充已確認的精確座標。

## 保留的差異

| 項目 | 處理 |
| --- | --- |
| Fire Mage Vest | S03列Fire Pi-rat Hideout；S18列Lovepurr Cave；S24列Heartpurreak Cave。三個候選明列，不強行指定唯一地城。 |
| Fishercat Hat／Attire | 取得任務相符，逐魚固定箱與隨機分配說法不同；趕魚後以實際箱內容核對。 |
| Purrmaid Helm／Vest／Tri-Claws | 電話水點流程相符，固定水點與隨機說法不一；列優先查找水點，不聲稱只有一個掉落點。 |
| 三種Magical飾品 | 各石頭獎勵與隨機性說法不一；採有用候選點，解謎完成、開箱與裝備取得分開。 |
| Oinker Necklace | 地表箱與Oinker掉落兩說保留，未保證只打一場即可取得。 |

Purrivateer裝備等來源同時記錄多個同名箱，可能是重複取得後升級；保留多條可查路線，不把同名重複項計成新種類。原名稱（含英文拼字）及ID不重編。

## 船藍圖

13被動與4炮彈均有取得提示、前置及原路線互跳。新增清理順序：早期近岸鎖箱／破門堡→主線遺跡回程箱→Heartpurreak／Sunset四石／人魚結案→後段海戰。不是要求玩家硬按推薦順序解鎖。

- Cannon Reload +：Ruined Castle 首樓隱藏房。
- Firing Rate +：Orion 第三樓；Firing Rate ++：Heartpurreak 清怪後箱，保留S16隨機箱差異。
- Ship Hull ++：Antares 第三樓下梯回第二樓鎖房；S16敵船掉落說另列。
- Ammo Capacity ++：人魚結案後查身後箱；S23未標階級，S16列Fort Wreck，故仍待核對。
- Ship Hull +：Long Island 鎖箱引出船戰；S16列Fort Tail的差異保留。
- Cannon Reload ++：Sunset西側四藍石獎勵，保留S16隨機箱說法。
- Cannon Power +／++、Pawer Boost、兩個海戰被動及炮彈：對應Fort Purricade、Centauri、Lonely Isle及各自Boss／敵船。
- Ammo Capacity +：北部河道破門堡有S25支持，Fort Wreck名稱及+／++文案仍需核對。

來源把炮彈與被動集合混列、部分名稱省略+號；頁面維持分組，不將17或13宣告為已驗證PS5金盃分母，不會因本站清單全勾自動代填Ship Mewster。

## 來源與重建

維護資料在 `research.json`，逐筆以既有ID合入；`prepare-data.mjs`保留規格與補充資料SHA256。`identity-baseline-1.0.json`是修改前ID集合，verify逐一比對，避免資料重排使舊進度失聯。

S01／S03／S07／S15／S16沿用原規格來源。新增S17～S22為Neoseeker的頭部／身體／近戰／遠程／飾品／船部件清單；部分正文403或不可擷取，採公開搜尋索引文字，沒有宣稱讀過圖片。S23為TenOunceCan的寶箱筆記（作者自述清單未完整），S24為ミルピリ身體裝備，S25為Siliconera船升級，S26為Papo de Platina白金攻略（正文擷取失敗，採公開索引），S27為攻略空間裝備。完整URL及限制已整合到網站來源頁。

本次只補查並整合攻略，未操作真實玩家資料、PSN、Google Drive，本批已獲使用者授權commit／push及既有main Pages發布；部署結果另核對。

## 驗證結果

本機資料／來源關聯、96／13／4覆蓋、初版ID完整比對、舊schema1備份保留、整站verify／build／verify-site皆通過。新browser context回歸通過：96件連續清單、子類搜尋與勾選移除、衝突警告、前置步驟、來源入口、裝備／船部件回路線、跨分頁及撤銷、安全匯入、保存失敗與新context還原。320／390／768／1024／1440／1920／2560px無水平溢出；手機衝突條目與桌面船清單截圖已檢視。鍵盤Tab可達跳到攻略連結，Enter可將焦點移至正文。
