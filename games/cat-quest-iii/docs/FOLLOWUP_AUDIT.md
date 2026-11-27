# 13件裝備與船部件第二輪補查

2026-11-27，模組1.2.0／資料2026-11-27.3。全數沿用schema1及既有ID；補查不修改玩家取得、路線完成或實際跳盃。

## 結果

針對上一版3件單源、10件有差異裝備及7個船部件，建立20筆補查紀錄。裝備現為85件多來源對照、1件細部單源、10件仍有獎勵／定位差異。這是對「可查取得路線」的判斷，不保證唯一掉落點、固定獎勵分配或PS5現版條件。

| 上次待核項 | 這次整合及仍未解內容 |
| --- | --- |
| Oinker Garments | S28逐段走法獨立支持S03的Twilight地表箱；升為多來源對照。北岸休息鳥東行再南轉，查左側樹叢；未實機核對每個轉彎。 |
| Rogue Claws | S34的25:17章節索引記錄Purvanna地表取得，與S03區域相符；細部「Golden Tower西南山間」仍只由S03支持，頁面保留此層限制。 |
| Spicy Vest | 新增S30由Sunset中央湖南行上岸、東轉再北行的守箱路線；S36另列Spiciest Squid解鎖。是否同箱未證，仍為細部單源，不新增Boss硬前置。 |
| Fire Mage Vest | S35新增Heartpurreak候選，沒有解決S03／S18／S24不同地城說法；保留三候選，不以多數決宣稱唯一位置。 |
| Fishercat Hat | S34、S35補Blue Catfish／Straits獎勵記錄；未解各魚固定帽／服與隨機分配差異。 |
| Fishercat Attire | S35補Rock／Sunset Catfish候選；未解固定分配。 |
| Purrmaid Helm | S35補水點記錄；仍不能保證指定水點必出。 |
| Purrmaid Vest | 補港口、Twin、Catuga候選說明；沒有排除隨機性。 |
| Tri-Claws | S30救援人魚後附近漣漪記錄支持先查此處；仍不保證唯一來源。 |
| Magical Glove | S07及S33支持高低石／Sunset五石查漏；與其他逐箱資料的獎勵分類仍有差異。 |
| Magical Punching Bag | S07及S29支持Watchcat與Long Island路線；與部分流程章節索引的獎勵不同，保留實際開箱核對。 |
| Magical Purse | S07支持Code／Sandy候選；不把解謎完成代勾為裝備已取得。 |
| Oinker Necklace | S28補地表箱的逐段走法；不據此否定S01敵人掉落的替代來源。 |

## 船部件修正

| 項目 | 結論 |
| --- | --- |
| Ship Hull + | S29明示Fort Tail就在Long Island內；原先「兩個地名互斥」為誤判，已修正。省略+號的文案仍提醒核對船選單階級。 |
| Ammo Capacity + | S28直接記Fort Wreck與+階級，原地名缺口補足；未將S16所寫++當成同一獎勵。 |
| Ammo Capacity ++ | S30記救援人魚清敵破門可開箱，S26寫八水點回報後。頁面現在先查救援當下，再查回報後，不一律強制先收八水點。前置差異仍標示。 |
| Ship Hull ++ | S32逐層流程先寫三樓側梯取箱，後才進四樓Boss；修正原先僅寫Boss後回程的限制。S34 03:50索引亦記Antares，S16敵船掉落仍未核。 |
| Firing Rate ++ | S31與獨立作者S37都支持入口岔路南側路徑；S38 38:58章節索引記同地城。補具體走法，保留S16隨機箱說法。 |
| Cannon Reload ++ | S33再支持Sunset西側四石路線，新增船上按數字命中與必要時下船補石的操作；不杜撰絕對方位。 |
| Super Cannonpaw | 沒找到第二份明確描述初始取得觸發的文字；維持單源。僅有名稱／配裝的來源不計作取得證據。 |

原版13被動及4炮彈仍為索引，不作已實機驗證的PS5金盃分母；金盃「全部」集合、更新裝備替代、平台版本差異未解，沒有提高為已驗收。

## 證據取得與呈現

新增S28～S38，逐筆登錄在 `followup-research.json`。Neoseeker正文403時只使用可讀的公開索引，沒有宣稱讀過圖片；YouTube只核對公開章節文字，沒有逐格觀看或把索引當作PS5畫面驗證。S35正文逐箱文字可讀，但內容與其他作者不同，按候選處理。S37只採用Firing Rate++可與S31對照的走法，不延伸採用同篇其他有差異的裝備內容。

每筆保存上一輪證據等級、本次結論、仍待核對內容與支持來源；「前置與取得步驟」可展開閱讀，重要差異仍在列表直接顯示。沒有為了減少未核數量而刪除相反證據。

離線產生器在原spec／research兩份hash之外增加followupHash；20筆目標ID及所有來源引用由verify檢查。原211事實、19步、31盃ID保持不變。

本次獲授權測試通過後commit／push及沿main GitHub Pages發布；部署結果以對應Actions與正式資源核對為準。未操作PS5、PSN、Google Drive或現有玩家profile。

## 本機驗證

資料、來源引用、followupHash、20筆範圍、初版全部ID、舊schema1匯入、整站verify／verify-sync／build／verify-site皆通過。隔離瀏覽器驗證新結論可見、未解警告保留、Boss前取箱及人魚非唯一前置、原有跨分頁撤銷與保護式匯入、320～2560px版面與鍵盤操作皆通過。手機衝突條目的新補查文字已視覺檢查；未使用真實玩家profile。
