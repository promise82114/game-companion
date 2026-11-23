# 勇者鬥惡龍III HD-2D Remake｜PS5 Game Companion 開發規格

研究查閱日：2026-11-23（台灣）。目標為 PS5 本體白金，包含通關後的 Cloudsgate Citadel、Xenlon、Temple of Trials 和 Grand Dragon。版本基準為 Square Enix 已公告的 PS5 1.1.1.0（2025-08-29），包含 1.1.0.0 的機制調整。台灣繁中介面為主，保留英文地名、技能與獎盃原名供對照。若繁中名稱尚未核實，顯示英文原名或明標暫譯。PS5 玩家目前進度未知，預設新紀錄從空白開始，可直接跳章或補登。攻略揭露謎題答案、事件觸發、Boss 名稱和實際操作，省略劇情敘述。

## 1. 站點與玩家操作

| 主要頁面 | 玩家能做什麼 | 預設和驗收 |
| --- | --- | --- |
| Roadmap（首頁） | 從「繼續遊玩」定位下一個主線動作，依分段查看操作、順路收藏、獎盃條件和離開前檢查 | 首次只有第一主線階段展開。選定某段後，當段未完成步驟與必須子項展開，完成項收為一列。自由跳看時「繼續遊玩」仍按實際完成紀錄定位。可選擇已知遊玩階段建立閱讀書籤，無隱含批次勾選。 |
| 收藏 | 用小徽章、友善怪物、討伐圖鑑與達標型收藏切頁籤，查離開某區前還缺什麼 | 預設未完成。各類別各自顯示分母及對應遊戲目標。同地多件各自一列，顯示進入條件、時段與排查操作。收藏完成後即移出當前未完成結果，保留合理捲動位置及焦點。 |
| 獎盃 | 在 PS5 確認跳盃後手動勾選，查看各盃條件、關聯流程、缺項和補救 | 預設未取得，顯示已確認數／42。可切全部／已取得或篩選主線、條件、收藏、破關後。當本站追蹤已滿足時可顯示「待確認跳盃」，不直接改為取得。 |
| 建議攻略 | 查開局配隊、何時轉職、不同階段練等、關鍵裝備、試煉準備、打不動時調整方式 | 預設配隊與階段建議，頁首有主題索引，相關建議可跳回 Roadmap 及指定收藏。實戰取捨和版本差異直接顯示。 |
| 資料管理／來源 | 下載 JSON、預覽匯入差異、還原以及查證資料 | 放在站點次要導覽。來源附適用版本及證據。當無有效資料、保存失敗、匯入版本不支援，各自有可理解的狀態訊息與可行返回路徑。 |

桌面可使用頂部導覽與章節索引，窄螢幕讓地點、操作、勾選、尋路與限制同列或自然換行。橫向資料表在手機端改用緊湊列。版面重點為目前操作、當區收藏與下一站。每頁主功能切換時清除搜尋及重設預設篩選。頁內勾選、更新資料保留搜尋。深連結可以覆蓋一次預設條件，例如獎盃「缺的小徽章」指向未取得且指定章節，或指定已取得項時讓目標可見並顯示清除定位。無結果時顯示「此區已查完」或「搜尋無符合項目」等相符訊息並提供重設。

### Roadmap 實作細則

- 導覽順序採可實際走通的建議路線。需前置條件的支線以關聯標明，並用「順路做」「回來再做」呈現。例如遇到需要晚間或後期鑰匙的友善怪物，指向能回訪的階段，毋須當場耗時間。六顆球等可交換順序的區塊，以各自取得狀態共同判定進入下一階段。
- 每個步驟卡使用「現在去哪 → 照做 → 怎樣算完成 → 離開前」。切換地點前先顯示可順手完成的條件獎盃與相關收藏。收藏列放在同卡，清單與 Roadmap 的勾選直接同步。
- 依本文件逐列資料建立 `firstPracticalStepId` 和視需要的 `returnStepIds`。優先匹配實際到訪階段、時段和鑰匙等限制。配到章節的列仍要在明確的「前往該地」子段落顯示。只在後期可取的同名地點列掛在後期回收站，首訪可提供提示連結。一般討伐敵人從所列刷怪區掛到最早合理遭遇步驟，稀有／有條件個別提示。每一必收項至少有一個可操作 Roadmap 入口。
- 主線續玩只依 `requiredForRoute` 和手動勾選完成判斷，離開前查漏不阻擋繼續。收合狀態、閱讀位置、收藏與跳盃互不連動。醒目警告在相應動作上方顯示，也可在收合摘要重現。清單上勾選收藏不完成其章節，章節完成也不完成收藏。
- 新進度以開始冒險為首頁。回鍋時可先選章，手動快速補登已完成主線節點。若玩家完成結局仍缺收集，顯示「繼續破關後」與「有 N 件可回收」的不同入口。

### 收藏與門檻

| 類別 | 網站追蹤 | 遊戲確認 |
| --- | --- | --- |
| 小徽章 | 110 個地點的二元記錄。另列兌獎節點及下一個獎勵。 | 取得 110 枚後向亞里亞罕井中的 Morgan Minimann 領完獎勵。 |
| 友善怪物 | 121 個個體逐隻勾。以物種與固定出現點／觸發對照。顯示時段、道具、招募門檻；個體暱稱受捕獲順序影響，不能以暱稱對列。 | 對照收留總數，逐區用 Animal Instinct 複查時間、接近方式與空間前置。 |
| 討伐圖鑑 | 163 個條目，按圖鑑編號及可遭遇地區搜尋。遇到但逃跑不勾；條件出現的敵人有額外說明。 | 遊戲 Misc. → Info → Defeated Monster List，至少打倒過一次。 |
| 挖寶及裝備門檻 | 分別記錄世界閃光點計數 100、寶箱計數 100、相異物品種類 250。附下方補量操作與按區域可用地點索引。 | 以遊戲各計數／PS5 跳盃為準。 |
| 指定交付及條件道具 | 以步驟記錄魔法鑰匙、最終鑰匙、寶珠、裝備任務、指定試煉道具。個別交付狀態與庫存數量分開。 | 在遊戲確認取得、交付或交換完成，未確定的庫存顯示待核對。 |

討伐圖鑑與友善怪物分別使用 `enemy-` 和 `fm-` 前綴，即使物種相同也保持兩筆不同紀錄。小徽章即使出現在寶箱、閃光點或秘密地點，取得徽章只更新該徽章的狀態。站點無法觀察遊戲實際計數，門檻記錄由玩家根據實際遊戲記錄手動同步，支援非負整數、更新時間和撤銷。超過獎盃門檻可照實輸入。不得從手動勾選累加到又手動輸入的遊戲計數。普通戰鬥勝場、金屬怪、金錢亦採同一路徑。

### 門檻補量攻略

- **世界閃光點／寶箱**：走主線、掃友善怪物與徽章時一併撿世界地圖的發亮點，並打開沿途地城與城鎮寶箱。世界閃光點與「可進入的秘密地點」為不同概念，秘密地點內依實際容器收取。若還差寶箱，優先掃未搜透的 Dreamer's Tower、Skyfell Tower、Pyramid、Tower of Transcendence，後面補 Maw of the Necrogond、Tower of Rubiss、Zoma's Citadel；每層用盜賊的 Nose for Treasure 找剩餘寶物，再用 Snoop 找近處位置。掃最終鑰匙門時也可順手補齊。站點為每個區域提供「已巡一遍」選填核對，遊戲計數維持獨立。
- **相異 250 種物品**：在 Misc. → Info 查看種類數。沿途先拿箱、罐、桶、櫃、地面物和書架，並領徽章／競技場獎勵。留至少一件各異的武器、防具、飾品和消耗品。後期若差額，依序逛亞里亞罕、Reeve、Romaria、Ibis、Portoga、Baharata；再逛 Kol、Damdara、Rimuldar、Cloudsgate Citadel 找裝備袋裡缺少的品名，先買便宜品，每輪查看計數。測試商店補量時僅靠遊戲計數驗證。攻略對物品曾取得後售出是否仍算有差異，先保留一份可避免回購。該項顯示「遊戲回報 x／250」，總可取得種類與資格仍有不確定性，不拿全物品約數當獎盃分母。
- **戰鬥數、金屬怪、金錢**：先完成全圖鑑和職業能力，將練等與勝場同時推進。遇到金屬怪優先用確定會心能力，剩餘再按攻略頁練等點補；金錢在採購試煉裝備前查看條件。各自保留實際跳盃勾選。
- 資料來源：相關獎盃表與條件見 S03–S06。GameFAQs 裝備表可供商店對照，版本差異以 S02 為準。

## 2. Roadmap｜從開局到 PS5 白金

卡片以遊玩順序編排。必做步驟、白金支線及可選回訪使用各自的完成紀錄。每張卡片的「順路」以地點與解鎖條件連接收藏清單原項目，顯示此刻可取得的缺項，並列出需要夜間、鑰匙、船、拉之鏡或 Ramia 的待回訪項。卡片列出的獎盃是 PS5 確認提示，實際跳盃須到獎盃列手動確認。下列英文原名可直接拿去比對地圖與資料，大區名稱僅為介面分類。

### 一、三把鑰匙之前｜從 Aliahan 到取得船

| 步驟 ID／地點 | 直接照做 | 完成檢查／順路 |
| --- | --- | --- |
| dq3-r01-start · Aliahan | 完成開局問答，進城向國王領物資，至 Patty's Place 組隊。可直接選現成隊員，或去二樓建自訂角色。建議帶僧侶、盜賊與魔物使。第一次走出城鎮到原野。 | 確認 **Join the Party**、**Adventure Underway**。城堡、夜間民宅收獎牌 #1–2，進井拜訪 Mini Medal Manor，之後可用 Zoom 回去領獎。可另建一位備用商人留在酒館。 |
| dq3-r02-wipe · Aliahan 早期可選白金支線 | 若要提前解全滅盃，先手動存檔並調到能團滅的難度。到原野戰鬥讓全隊陣亡，選 **Continue From a Church**，確認獎盃後可讀回手動存檔保住金錢與進度。 | 確認 **Undoing Death**。Dracky Quest 的 1 HP 保護會阻止正常團滅，可隨時回補。 |
| dq3-r03-thief-key · Reeve／Shrine of the Plains／Dreamer's Tower | 在 Reeve 找北方屋內 NPC 取得線索，經 Shrine of the Plains 或 Promontory Passage 進塔地下，爬到塔頂 4F 找老人拿 Thief's Key。 | 確認盜賊鑰匙。Shrine of the Plains #3、塔內 #4–5，2F 東北樓梯支線有 Boomerang，地下鎖門有 Hardwood Headwear，可為後期留著。需要拉之鏡的友善魔物留待回訪。 |
| dq3-r04-promise · Reeve／Little Shrine／Path of Promise | 用盜賊鑰匙進 Reeve 東北屋找老人拿 Wrecking Ball；經 Little Shrine 到 Path of Promise，以炸彈清除牆並往傳送門前進。Shrine of Promise 遇 Monty 後招募史萊姆，再出來抵達 Romaria 地區。 | 世界地圖、第一隻友善魔物、**The World Awaits**。Little Shrine #6。若路上跌到地下，依地圖找樓梯回主路。 |
| dq3-r05-crown · Romaria／Khoryv／Skyfell Tower | 先進 Romaria 見國王，北上經 Khoryv 到 Skyfell Tower 打 Robbin' 'Ood，拿 Golden Crown。回去同意暫任 Romaria 國王，隨即去競技場找原國王交還。 | **Dishonourable Defeat**、**Regal Ruler**。Romaria 一帶 #7–8、#10、Khoryv #11–12、Skyfell Tower 4F #13。競技場 Rank 1–2 在 Romaria，可等友善魔物較多再補。 |
| dq3-r06-norvik · Norvik／Faerie Village／Underground Lake | 到沉睡的 Norvik，往西訪 Faerie Village 北屋與女王交談，再往西南的湖洞，走到盡頭拿 Dreamstone。回女王處換 Wakey Dust，再回 Norvik 解除沉睡。 | **Wakey-Wakey, Rise and Shiiine**。獎牌 #14–17。村裡的商店留到有 Mod Rod；日後可回來採買神殿用補給。 |
| dq3-r07-asham · Asham | 西北商店向抬價商販買一件便宜貨，可先拒絕三次壓價；夜間把男性隊員放第一位，找西側一帶門口女子並一路答應，結束後出屋。 | **Rip-Off Merchant**、**Puffection**。想留金可先存檔、跳盃後讀回。Asham 的 #26–27 等 Magic Key 再開。區域秘密地點有 #18。 |
| dq3-r08-magic-key · Ibis／Pyramid | 先在 Ibis 補藥；Ibis Palace 外圍西北小入口一路到 Meteorite Bracer。進 Pyramid 正門避開 1F 地上的陷阱，循東側往 2F，再上 3F 先按最右端、再按最左端石鈕。打 Ripper of the Rift 並開門後箱子。 | **Ripper Ripped**、Magic Key。順路 Ibis #21–23、Pyramid #24–25；Ibis 王座 #23 要夜間。Magic Key 到手可補 Asham #26–27、夜間 Ibis 寶庫 #28、Aliahan 城堡鎖房。Ibis 有競技場 Rank 3–4，須先完成 Romaria。沙漠沿途另掛 Nordy's Grotto #19、Desert Shrine #20。 |
| dq3-r09-golden-claws · Pyramid 地下白金支線 | 先恢復隊伍、帶足藥或料理。走 Pyramid 主入口左側的小口，往西北檢查左邊破損雕像露出密道，下去開石棺拿 Golden Claws。高遇敵率下原路走出金字塔；可等隊伍變強或切 Dracky Quest 再來。 | **Finders Keepers** 要拿爪並順利離開。地下魔法受限，準備藥品與非施法回血；拾取武器不等於完成。 |
| dq3-r10-portoga · Romarian Outpost／Portoga／Nordy's Grotto | 帶 Magic Key 通過 Romarian Outpost 地下鎖門，進 Portoga 見國王領 Royal Missive。回到 Asham 以東洞窟，交信給 Nordy 開東側通路，前往 Baharata。 | 確認已抵 Baharata。Romarian Outpost #9、Portoga #29–30、西 Baharata 秘密地點 #31；東出口後可留意普通敵人 Metal Slime，首次打倒符合條件的金屬史萊姆可確認 **Metallic Masher**。 |
| dq3-r11-black-pepper · Baharata／Kidnapper's Cave／Alltrades Abbey | 觸發 Baharata 胡椒店事件後去北偏東洞窟，在地下打倒四名手下，拉開關救出兩人，撤出時擊敗第二次 Robbin' 'Ood。回 Baharata 西南胡椒店找 Gopal，再到 Alltrades Abbey 入口附近找行商人領 Black Pepper。回 Portoga 把 Black Pepper 交給國王。 | **Double Defeat**、**Sea Legs**。Baharata #32–33、洞 B1 #34，B2 西北四個箱子有 Elfin Elixir，為試煉留著。取胡椒時先登記 Alltrades 的 Zoom。 |
| dq3-r12-change-vocations · Alltrades Abbey／Tower of Transcendence／Mur | 可在拿船前後走支線。隊員 Lv20 可轉職，勇者維持原職。到北方 Tower of Transcendence，5F 從繩索中央旗幟旁落下，再落一次到 2F 平台取 Words of Wisdom，以它或使用 Lv20 Gadabout 轉賢者。另到 Mur 東北商店側門、樓上、櫃檯依序交談，取得 Ortega's Helm。 | 有轉職則確認 **Juggling Jobs**；實際轉賢者才確認 **Sage Advice**。別同時把三個正式隊員都降回 Lv1。路上 Wayfarer's Inn #38，Mur 區域及店屋 #35、#39、塔 #40，Alltrades #36–37。頭盔要留作 Heroic Headwear；Mur 訪談後可回 Aliahan 家與母親交談，為可選回訪。 |

### 二、船與六顆寶珠｜可並行的海路

先啟動商人城，再取 Ultimate Key。其餘分支以下表順序較好接；若已完成任一分支，可直接確認該路線步驟。第一次遇到地點就登記 Zoom，航行時沿海收 Sparkly Spots、敵人圖鑑及海上秘密地點。短程回訪可快速清理缺項；週期與戰鬥只在遊戲內推進。

| 步驟 ID／地點 | 直接照做 | 完成檢查／順路 |
| --- | --- | --- |
| dq3-r13-town-start · Merchantburg | 帶預備商人從 Portoga 向西航行，到世界地圖東側大陸東岸的開拓地，跟居民對話派商人留下；回城把隊伍補滿，再一路跑其他珠路線，每隔幾站回城交談。 | 避免用主要輸出或輔助離隊；若未見城鎮變化，先推進其他寶珠與主線。可航經 Portoga Lighthouse、Lozamii、Persistence、Grimland、Shrine of the Dwarf；最後一處可先登記 Zoom，方便日後鍛造頭盔。 |
| dq3-r14-ultimate-key · Lanson／Edina／Shallows Shrine | 從 Lanson 商店備 Fading Jenny（有 Fade 亦可）。Edina 城門前隱形，進去解地下推石取得 Bottomless Pot。到世界圖北方中央海域凸出礁石使用，入浮上的 Shallows Shrine 開箱。 | 確認 Ultimate Key、祭壇北側 #48。Edina #45、Lanson #44。若想照攻略解 Edina 推石，由入口視角標記左／中／右三石：左↑1→2、中→1、左↑5←1↑1、右↓1、中←3↑1→2↑5→1↑1、右↑1←4↑1→2↑6。卡住可離開房間再試。 |
| dq3-r15-green · Theddon | 先白天開武器店屋頂的寶箱取 Night Light，讓時間可切到夜間；夜間回村，持 Ultimate Key 打開北牢房、與囚犯說話並擊敗 Dying Fires，再領綠珠。 | **綠珠**、**Playing with the Dead**。Theddon #43、南方秘密地點 #42；進牢前存檔，若只看見破村先確認時間。 |
| dq3-r16-red · Pirates' Den | 大陸南端登陸，移開建築外可推的石像，走地下樓梯拿紅珠。 | **紅珠**。#55–57；牢房白天可進，夜間有需要拉之鏡的一隻友善魔物，等拿鏡再回。 |
| dq3-r17-blue · Lanson／Gaia's Navel | 找 Lanson 北建築 NPC 開單人試煉，帶能自補且有單體輸出的隊員進 Gaia's Navel，準備回復、火／風減傷與狀態對策。接近藍珠會觸發 Chiromancer 與 Madvlad 的戰鬥，勝後開箱再離開。 | **藍珠**、**Chiromassacre**、#63。先注意排除其他隊友支援的假設；借用 Thief Padfoot，或帶 Musk 對付特定友善魔物，詳各列。深處藍色礦晶留待頭盔支線。 |
| dq3-r18-purple · Jipang／Orochi's Lair | 從 Jipang 向東進洞窟打第一戰，追進傳送門回 Jipang；補 HP/MP 並存檔後，在屋裡觸發第二戰。勝後開箱取紫珠。 | **紫珠**、**Orochi Ousted**。Jipang 神社與宅邸 #46–47、洞 B2 #64；確認至少第二戰已結束、珠已入包。 |
| dq3-r19-echo · Fifer's Spire 可選 | 海路到 Fifer's Spire，爬到 5F，於中央旗幟旁從繩索落到 3F，開箱拿 Echo Flute；可用它確認附近是否有珠。 | 此路直接補 #61–62、Cannibox 類友善魔物及武器；已有完整六珠定位可跳過長塔路線，但回頭仍要補收藏。 |
| dq3-r20-mirror · Teleportal Shrine／Manoza／Manoza Cave | Ultimate Key 開 Teleportal Shrine；走東側傳送門至 Wayfarer's Chapel，再向西去 Manoza。城堡走側門，取得監牢提示後到東南的 Manoza Cave；從 B2 指定洞口落到 B3 取 Ra's Mirror。夜間回 Manoza 城堡，由東北側上屋頂往下到臥室，對睡著的國王使用鏡，擊敗 Boss Troll。 | **Mirror, Mirror…**、第一把 Mod Rod、Elfin Elixir。Manoza #65–69，競技場 Rank 5–7。拉之鏡補收 Reeve、Dreamer's Tower、Path of Promise、Norvik、Pyramid、Persistence、Pirates' Den、Manoza、Teleportal Shrine、西 Romaria 島與東北海域等地之偽裝個體，以收藏列時段為準。 |
| dq3-r21-yellow · Merchantburg | 城鎮有領主宅及劇院後，白天與商人對話，夜間回城接近西南方三人；旅店過夜、傳送去別處再回。到西南牢房找商人，然後回宅邸查椅子後方。 | **黃珠**。若沒有夜晚集會，先確認城鎮階段、商人對話及其他珠進度。劇院離場開價可拒絕。城鎮商店後期可買 Epic Apron。遊戲內城名取自留下的商人，可同時以 Merchantburg 與 Immigrant Town 索引。 |
| dq3-r22-ghost · Grimland／Ghost Ship／Olivia's Promontory | 先決定是否用 Mod Rod 到 Faerie Village 購物。到 Grimland 把第一把 Mod Rod 換 Boatman's Bone，在地圖追蹤 Ghost Ship，登船取南方發光點的 Lovers' Locket。從 Olivia's Promontory 乘船向西遇阻擋時用墜飾通過，進 Shrine of Shackles 與西南方對象交談，再取東南方 Mountaincleaver。 | 幽靈船 B1 #70、鎖鏈祠堂 #71；船上 Tenda 要夜間。Mod Rod 可於 Alefgard 的 Cantlin 競技場 Rank 8 再拿，未購物仍可回補。 |
| dq3-r23-silver · Mt. Necrogond／Maw of the Necrogond | 在火山頂打 Garboyle，用 Mountaincleaver 開路，穿 Maw of the Necrogond，到出口外的 Necrogond Shrine 找人取珠。 | **銀珠**、**Grudge Match**。火山頂擊敗後再上一次可找 Bernie；洞坑室與祠堂 #72–73，長洞先補道具。 |
| dq3-r24-ramia · Shrine of the Everbird | 六珠到齊後到南方冰島上的 Shrine of the Everbird，逐顆放在祭台。 | **Everbird Awakened**、可飛行。祠內 #53 隨時可補，飛行後可補高台／封閉區域 #74–77 及友善魔物。 |

### 三、Baramos 到 Zoma｜兩項鍛造支線在這段完成

| 步驟 ID／地點 | 直接照做 | 完成檢查／順路 |
| --- | --- | --- |
| dq3-r25-baramos · Baramos's Lair／Aliahan | 乘 Ramia 到 Necrogond Shrine 西北要塞。從東塔上屋頂轉中央塔，經東南塔繞回，再沿路穿過王座房去東側出口打 Baramos。勝後回 Aliahan 與國王及母親對話，走下樓直到能重新出城。 | **Baramos Bested**。B1 東北牢房 #78、王座骸骨 #79，外圍東北水邊夜間有 Armstrong，東南塔瀑布後有 Headsman's Axe。補強支線可去 Portoga 東南碼頭找 NPC 領 Siren's Sword。 |
| dq3-r26-alefgard · Castle of the Dragon Queen／Pit of Giaga | Ramia 飛進環形山區城堡，見 Dragon Queen 拿 Sphere of Light，將它放進備戰隊員隨身道具。再飛到 Baramos's Lair 以東的 Pit of Giaga，進入後抵達 West Tantegel Harbour。 | **Deeper Underground**。城堡後彩窗 #80、港口 #81。城門三個時段可收 Spellie（日）、Meddie（黃昏）、Bobo（夜）。同座城通關後是天界入口。 |
| dq3-r27-alefgard-tour · Tantegel／Damdara／Cantlin／Shrine of the Spirit／Kol | Tantegel 城堡取 Sunstone，南方 Shrine of the Spirit 二樓取 Staff of Rain；去 Kol 溫泉南側地面取 Faerie Flute。途經 Damdara 馬廄找 Orichalcum、Cantlin 西側房屋二樓檢查展示的 Broken Blade。 | 先配齊兩個彩虹水滴零件與妖精笛，邊走照收藏區篩選清單補 #82–96。Cantlin Rank 8 拿第二把 Mod Rod／Rank 9 有 3 Elfin Elixirs；去 Rimuldar 可補 Words of Wisdom，其武器店也售試煉用 Flame Armour。可選 Galen's House 取 Lyre of Ire、Craggy Cave、Talontear Tunnel 迷宮支線；後者無法用法術，底層有 Hero's Shield、#100、友善魔物及圖鑑敵人。 |
| dq3-r28-forge-sword · Kol／Jipang | 有 Orichalcum、Broken Blade 後，找 Kol 道具店二樓鍛冶師，回 Jipang 井旁白衣 NPC 所在的屋內找 Forging Hammer，再回 Kol 交材料。 | Sword of Kings 入包，跳 **Stately Sword**；收藏與東試煉指向同一裝備。 |
| dq3-r29-forge-helm · Quagmire Cave／Reeve／Gaia's Navel／Shrine of the Dwarf | 若還沒拿 Ortega's Helm，先補 Mur 支線。到 Quagmire Cave 東南方找有提示的 NPC，Reeve 東北屋二樓找老人拿第二顆 Wrecking Ball，回 Lanson 單人進 Gaia's Navel，循 B1 東南→B2 東北→B3 中庭往南；在礦晶牆用 Wrecking Ball 取 Zenithium。到宮祠交給矮人鍛造。 | Auroral Helm 入包，跳 **Heroic Headwear**。Quagmire Cave 另有 #97、Sabrine。 |
| dq3-r30-rubiss · Tower of Rubiss／Sanctum | 帶 Faerie Flute 進塔。偏轉地板以橘色箭頭為「上」，3F 北窗跳出去由後方再上到 5F；擊敗 Soul of Baramos 及其同伴後在石像前吹笛拿 Sacred Amulet。拿它和 Sunstone、Staff of Rain 去 Sanctum 找神官換 Rainbow Drop。 | **The Almighty**。塔 3F #98、4F Auroral Armour、5F Elfin Elixir；Sanctum #99。離開前確認 Rainbow Drop 已入包。 |
| dq3-r31-zoma · Rimuldar／Zoma's Citadel | 在 Rimuldar 西北岬用 Rainbow Drop 造橋。城堡 1F 打 Stone Guardians，查看王座背後開關往下；B4 寶物室取 Sage's Stone 交給快手隊員做群補。依序擊敗關底一連串首領，遇 Zoma 優先用 Sphere of Light。勝後走出 Talontear Tunnel，回 Tantegel 城堡見國王，看完製作名單保存通關檔。 | **Rainbow, Rainbow**、**Seeds of Salvation**。B3 分主路和落坑區，兩隻友善魔物各在一路，兩枚獎牌 #101–102。最終連戰各場之間可撤出補給後再回。若已走到通關畫面，下一步載入通關資料，保留一個獨立存檔。 |

### 四、通關後｜七願、競技場、試煉與清尾

| 步驟 ID／地點 | 直接照做 | 完成檢查／順路 |
| --- | --- | --- |
| dq3-r32-heavens · Castle of the Dragon Queen／??? | 載入通關檔，到龍后城後方光點入天界。先收東北方秘密地點的 Alloy，再走 ??? 迷宮；金字塔房左上出口接續，右上是教堂支路。經地下湖、石像房和監牢往 Cloudsgate Citadel。 | 迷宮內獎牌 #103–105、Scales 與 Oozebeth，王城池旁 Mendy 和 #106。此處有練等與新圖鑑敵人，詳建議攻略。 |
| dq3-r33-riddles · Cloudsgate Citadel 可選 | 東北房找 NPC 接謎語。第一題白天去 Theddon 東南屋，領 Beast Claw；第二題 Cantlin 中西屋南方花圃找 Dark Robe；第三題 Lozamii 東屋望遠鏡旁找 Sage's Stone。每拿一個回去讀下一題。另開 Cloudsgate 王座背後寶箱。 | 可拿第二顆 Sage's Stone 與 Heavenly Helm 等裝備。謎底只顯示地點與操作，沒有額外獎盃要求。 |
| dq3-r34-xenlon · Citadel Tower | 順塔到頂打 Xenlon，依許願進度在 **35／25／15** 回合內勝出（第三個願望起維持 15）。可先選 Rubiss's Sword 強化輸出，再選新競技場與空白願望，三者順序可依當前瓶頸更換。其餘依次補 Ortega、髮色、Guns 'n' Buns，全部其他選項許過才選 More Guns 'n' Buns。 | 七個不同願望各只有一個勾選，別為重複 book 重打。**Farewell, Mortal** 等實際確認。Citadel Tower #107–108、Frantico、Destructiball、Elevating Shoes。普通勝利但超回合上限時可以再次挑戰。 |
| dq3-r35-arena · Romaria／Ibis／Manoza／Cantlin／Jipang | 依序清 Rank 1–2、3–4、5–7、8–9，最後進 Xenlon 願望開啟的 Jipang 井完成 Rank 10–11。招募同物種可增強競技場所用個體，選編隊詳建議攻略。 | **Monster Champion** 在 Rank 11。Rank 8 可取回 Mod Rod，Rank 9 有 3 Elfin Elixirs；高階獎金可補試煉必需和 **Much Ado about Money**。 |
| dq3-r36-trials · Temple of Trials | 許 Xenlon 空白願望後，騎 Ramia 往 Aliahan 北方海上光點。南邊確認至少救援 100 隻合條件個體；東邊依序展示 Sword of Kings、Auroral Helm、Gringham Whip、Mod Rod；西邊逐批交付七種指定裝備／道具；北西爪／迴旋鏢、北東斧／杖，兩處各到守關戰連打兩批 Pandora's Boxes。 | 五個火台點亮，確認北門已開。西邊會收走物品；數量、商店與戰鬥細節在建議攻略。東邊 Gringham Whip 可拿 105 枚獎牌換，或由北東武器試煉新增箱取得。北西、北東分別可補 #109、#110 與個別友善魔物。 |
| dq3-r37-grand · Temple of Trials 北門 | 開北門後先收友善版 Xenwrong，再於戰前保留一個獨立手動存檔；回滿隊伍才進，目標 **20 回合內**擊敗 Grand Dragon。若想保留遊戲內同檔可重打，控制在 11–20 回合，10 回合內會停止再戰。 | Grand Medal 入包，確認 **Grand Designs**；勝後沒拿到獎牌可再挑戰。只計第一次打贏會漏掉回合條件。若選擇讀回舊檔，PS5 跳盃確認與該存檔的 Grand Medal 取得狀態仍分別紀錄。 |
| dq3-r38-cleanup · 依數量與地點收尾 | 到 Mini Medal Manor 找 Morgan Minimann 領到最終 110 枚獎勵（**Many a Medal**）；在 Monty 確認救援缺項；比對 Misc → Info 的敵人、道具種類與獲勝數；逐人核對職業技能，在同一存檔保留有已學技能的角色。 | 逐一核對實際跳盃，最後確認 **A Legend Is Born**。部分條件已達卻未正常跳盃時，可在更新後開 Misc → Info 觸發重新判定。差一種圖鑑敵人時先核對「陷阱怪／低機率／敵方召喚／夜間／後日談」類缺項。 |

**Roadmap 資料來源鍵對應**：主路關卡、房間與隊伍流程以 [RPG Site HD-2D 實走路線](https://www.rpgsite.net/guide/16522-dragon-quest-iii-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-friendly-monsters-step-by-step-guide) 與 [GameWith 主線](https://gamewith.jp/dq3hd2d/463230) 為基礎；條件獎盃對照 [PS5 Exophase](https://www.exophase.com/game/dragon-quest-iii-hd-2d-remake-psn/trophies/) 及 [Dayngls 訣竅](https://daynglsgameguides.com/2024/11/14/dragon-quest-iii-hd-2d-remake-trophy-guide-roadmap/)；六珠依賴對照 [GameWith 珠路線](https://gamewith.jp/dq3hd2d/473307)，七願與必要回合對照 [GameWith 通關後路線](https://gamewith.jp/dq3hd2d/473253)，Rank 8 的獎勵對照 [Realm of Darkness Cantlin](https://www.realmofdarkness.net/dq/hd2d-dq3-cantlin/)；試煉與版本以 [GameWith Grand Dragon](https://gamewith.jp/dq3hd2d/474828)、[GAMEX 更新後試煉準備](https://gamex.jp/dq3-hd2d/guides/trials) 及 [Square Enix 官方更新](https://www.dragonquest.jp/roto-trilogy/dq3/update/index.html) 交叉核對。查閱 2026-11-23。

### Roadmap 的完成條件與跨表連結

站點把「主線」「白金支線」和「通關後」做成同一頁不同階段。六顆寶珠的六卡用各自的 ID，進下一階段只核對六顆是否入手。技術上可用父步驟展開子卡，父卡只從必要子項推導摘要，避免額外保存一個可能不一致的完成值。

- 首次開局如已有存檔，可選一個最近遊玩點作為書籤，並個別補登已完成卡。「繼續主線」只掃描主線關卡。前置已有標示但玩家可自由瀏覽、勾選、登錄現有進度。寶珠分支的 Chart 顯示鎖在最後鑰匙、拉之鏡或船的原因。白金首頁次區同時顯示可立即完成的支線和當前收藏數。
- `dq3-r02-wipe`、`dq3-r06-norvik`、`dq3-r07-asham`、`dq3-r09-golden-claws`、`dq3-r12-change-vocations`、`dq3-r19-echo`、`dq3-r28-forge-sword`、`dq3-r29-forge-helm` 為本篇中插入的白金或可選支線。`dq3-r05-crown` 王位獎盃單列為白金子項，故事遊玩可跳到金字塔。鍛造兩件在後期東側試煉需要。地區打完卻未完成同區支線時，明列回收入口。
- `dq3-r36-trials` 子步驟固定 `trial-south`、`trial-east`、`trial-west`、`trial-northwest`、`trial-northeast`。東側缺 Gringham Whip 時提供北東箱入口；西側每樣道具可勾交付和記備料數。兩處武器路線按規則提供裝備組合和補救。完成五項後提示北門和 Xenwrong。
  - **西北走法**：先在入口核對全員武器種類。從西北傳送點出發，再走能接到四箱房的西北傳送點。四箱房先走南側傳送點取 mm-109，回來走北側去東半部。東半部往東傳送下樓，在三箱區取中間的 Conqueror’s Axe 可留給另一邊，右側傳送點落地後往西找 fm-119。回主線走東南傳送點過機關到守關。
  - **東北走法**：入口東側樓梯可撿 Sage’s Stone。回入口一帶改走北路下樓，東北三箱中最下方為 mm-110。由北側上樓後先找西側 Duplic Hat 及西北方的 fm-120，再走西北樓梯去推石機關。西北機關初步按左石↑←、右石↑→↓、中石→↑←，再向出口清出通路。各箱及守關的 Pandora’s Box 抗性與戰法見建議攻略。
- `dq3-r34-xenlon` 子項固定 `wish-trials`、`wish-arena`、`wish-sword`、`wish-ortega`、`wish-style`、`wish-book`、`wish-book-final`。每次只勾實領願望，按前置提示最後一本。視覺上保留想先開競技場、試煉或強化裝備的選擇。
- `dq3-r35-arena` 用 `arena-01` 至 `arena-11` 共享清單；初訪該地顯示已開級別與建議回訪，遊戲按級順序解鎖。Roadmap、競技場清單與獎盃都用相同紀錄。
- 下表列小徽章第一個合理回收錨點。每卡還要用所列地點分組，不能將同一大區所有物件堆在章節末尾。有時段、鑰匙或指定入口的列以收藏表條件為準。

| Roadmap ID 後綴（加 `dq3-`） | 徽章編號（加 `mm-`） |
| --- | --- |
| r01-start・r03-thief-key・r04-promise | 001–002／003–005／006 |
| r05-crown・r06-norvik・r07-asham | 007–008、010–013／014–017／018 |
| r08-magic-key・r10-portoga・r11-black-pepper・r12-change-vocations | 019–028／009、029–031／032–034／035–040 |
| r13-town-start・r14-ultimate-key・r15-green | 041、054、058／044–045、048–052／042–043 |
| r16-red・r17-blue・r18-purple・r19-echo | 055–057／063／046–047、064／061–062 |
| r20-mirror・r22-ghost・r23-silver・r24-ramia | 065–069／059–060、070–071／072–073／053、074–077 |
| r25-baramos・r26-alefgard・r27-alefgard-tour | 078–079／080–081／082–096、100 |
| r29-forge-helm・r30-rubiss・r31-zoma | 097／098–099／101–102 |
| r32-heavens・r34-xenlon | 103–106／107–108 |
| trial-northwest・trial-northeast（`dq3-r36-trials` 子卡） | 109／110 |

各階段未查完的友善個體設「前往本區缺項」按鈕。若頁籤條件無法直接從 phase 名稱對映，先以收藏的英文地點與招募前置對照。如 `Merchantburg` 和資料裡的 `Immigrant Town` 是同一地區，`Shallow Shrine` 和 `Shallows Shrine` 做為別名搜尋。所有別名解析到一個地點 ID。討伐怪物有多區域時可在各參考地點展示，仍只保存一個圖鑑條目。

| Roadmap ID 後綴（加 `dq3-`） | 友善怪物編號（加 `fm-`） |
| --- | --- |
| r04-promise・r05-crown・r06-norvik | 001／002–004、006–008／005、009–010 |
| r07-asham・r08-magic-key・r10-portoga | 011–012／013–015／016–018 |
| r11-black-pepper・r12-change-vocations | 019–022／023–027 |
| r13-town-start・r14-ultimate-key・r15-green | 028–030、032–033、035–038、049–050／031、034、042–044、047–048／039–041 |
| r16-red・r17-blue・r18-purple・r19-echo | 051–052／057–058／045–046、059／054–056 |
| r20-mirror・r21-yellow・r22-ghost・r23-silver | 060–073、085／084／053、074–075／076–079 |
| r24-ramia・r25-baramos・r26-alefgard | 080–083／086／087–089 |
| r27-alefgard-tour・r29-forge-helm・r30-rubiss・r31-zoma | 090–104、109／105／106–108／110–112 |
| r32-heavens・r34-xenlon・r36-trials・r37-grand | 113–116／117／118–120／121 |

在取得拉之鏡前可見的偽裝個體，首訪卡可連回上表指定的回收卡，例如 Reeve 對應 fm-064。馴獸師、魔物使與魔物大師作為 Monster Wrangler 的搜尋詞，主介面採核實的台灣譯名；北西／西北、北東／東北同樣互通。

| 時點 | 可直接顯示的獎盃確認（加 `tr-`） |
| --- | --- |
| 開局／全滅支線／出發祠堂 | r01-start：02、39。r02-wipe：41。r04-promise：03。 |
| Romaria、Norvik、Asham | r05-crown：04、40。r06-norvik：33。r07-asham：36、37。 |
| 金字塔至出海 | r08-magic-key：05。r09-golden-claws：42。r11-black-pepper：06、07。r12-change-vocations：31、32、38。 |
| 六寶珠、Baramos 和 Alefgard | r15-green：10。r17-blue：09。r18-purple：08。r20-mirror：11。r23-silver：12。r24-ramia：13。r25-baramos：14。r26-alefgard：15。 |
| 鍛造、彩虹橋與破關 | r28-forge-sword：35。r29-forge-helm：34。r30-rubiss：16。r31-zoma 的造橋子項：17，結局存檔子項：18。 |
| 七願、競技、試煉 | r34-xenlon：23。r35-arena：26。r37-grand：22，並核對討伐最後幾個條目、北門友善個體。 |
| 全程累積到最後查漏 | r38-cleanup：01、19、20、21、24、25、27、28、29、30。其餘首次打倒金屬怪、轉職與採購里程碑可沿路提前確認，使用原獎盃 ID。 |

列表中所有獎盃關聯可從獎盃頁反向導航。已手動確認跳盃的列，回到 Roadmap 時只呈現已確認標記，不更改正文動作或遊戲進度。

## 3. 收藏與全技能資料

以下表格是本次實作的可匯入資料來源。以表內 ID 作為存檔與深連結的固定鍵。逐項查漏分為小徽章、友善怪物、討伐圖鑑、咒文與特技；競技場與試煉的對應子項由 Roadmap 與攻略共用。獎盃達標的手動統計與補量流程見第 1 節。介面標記可取得條件；劇情僅保留觸發位置。

### 小徽章（110 個固定地點）

在 Aliahan 下井拜訪 Mini Medal Manor，後續可從 Zoom 清單傳送（PS5 1.1.0.0）。每遇到寶箱、抽屜、木桶、壺或懷疑有地面拾取點，手動調查。找不到時用盜賊的 Nose for Treasure 查當前區域有無剩餘物品，再用 Snoop 找閃光；兩招都無法單獨篩出徽章。集滿 110 枚後回找 Morgan Minimann 並領完最後一份獎勵，再到 PS5 核對 Many a Medal。遊戲沒有編列這 110 枚的編號，下表是本站固定 ID，可直接對照 RPG Site 流程編號與 100% Guides 影片時間索引。

| 累積枚數 | 獎勵（英文原名） |
|---|---|
| 2 | Thorn Whip |
| 3 | Leather Dress |
| 5 | Garter |
| 8 | Edged Boomerang |
| 12 | Silver Platter |
| 15 | Prayer Ring |
| 20 | Strength Ring |
| 23 | Scholar’s Specs |
| 27 | Agility Ring |
| 30 | Staff of Resurrection |
| 35 | Weightlifter’s Belt |
| 40 | Agility Gilet |
| 50 | Dragontail Whip |
| 60 | Stealth Suit |
| 65 | Flametang Boomerang |
| 70 | Mercury’s Bandana |
| 75 | Scourge Whip |
| 80 | Dragon Claws |
| 85 | Astraea’s Abacus |
| 90 | Dragon Robe |
| 95 | Blessed Bikini |
| 100 | Goddess Shield |
| 105 | Gringham Whip |
| 110 | Exotoga |

| ID | 區域／解鎖階段 | 地點 | 調查位置與條件 |
|---|---|---|---|
| mm-001 | Aliahan／出發 | Aliahan Castle | 東南房間左側木桶。 |
| mm-002 | Aliahan／出發 | Aliahan | 夜間進城東民宅，查 2F 抽屜。 |
| mm-003 | Aliahan／出發 | Shrine of the Plains | 西側木桶。 |
| mm-004 | Aliahan／出發 | Dreamer's Tower | 2F 中央偏南房的寶箱。 |
| mm-005 | Aliahan／出發 | Dreamer's Tower | 3F 螺旋梯東側、中央偏南房的寶箱。 |
| mm-006 | Aliahan／出發 | Little Shrine | 調查壺。 |
| mm-007 | Romaria、Khoryv／Norvik | Romaria | 城鎮西側房屋的壺。 |
| mm-008 | Romaria、Khoryv／Norvik | Romaria Castle | 東南庭院噴水池旁。 |
| mm-009 | Romaria、Khoryv／Norvik | Romaria Outpost | 入口附近的壺。 |
| mm-010 | Romaria、Khoryv／Norvik | Romaria 周邊 | 從羅馬利亞往東北，山脈東側的樹形秘密地點。 |
| mm-011 | Romaria、Khoryv／Norvik | Khoryv | 酒館後房的木桶。 |
| mm-012 | Romaria、Khoryv／Norvik | Khoryv | 墓園最右側墓碑。 |
| mm-013 | Romaria、Khoryv／Norvik | Skyfell Tower | 4F 左側寶箱。 |
| mm-014 | Romaria、Khoryv／Norvik | Norvik | 旅館 2F，掛在牆上的袋子。 |
| mm-015 | Romaria、Khoryv／Norvik | Faerie Village | 村西側大石頭後方。 |
| mm-016 | Romaria、Khoryv／Norvik | Faerie Village | 道具店東南方，壺南側的盆栽。 |
| mm-017 | Romaria、Khoryv／Norvik | Underground Lake | B1 東北死路的寶箱。 |
| mm-018 | Asham、Ibis／金字塔 | Asham 周邊 | 城北偏西，丘陵上的秘密地點。 |
| mm-019 | Asham、Ibis／金字塔 | Nordy's Grotto | 調查木桶。 |
| mm-020 | Asham、Ibis／金字塔 | Desert Shrine | 調查壺。 |
| mm-021 | Asham、Ibis／金字塔 | Ibis | 西南側墓碑。 |
| mm-022 | Asham、Ibis／金字塔 | Ibis | 武器店內東南角的壺。 |
| mm-023 | Asham、Ibis／金字塔 | Ibis Castle | 夜間調查王座。 |
| mm-024 | Asham、Ibis／金字塔 | Pyramid | 1F 西側寶箱。 |
| mm-025 | Asham、Ibis／金字塔 | Pyramid | 走到金字塔最頂端調查。 |
| mm-026 | Asham、Ibis／Magic Key 回收 | Asham | 舞台所在建築的後房，打開有鎖的門。需 Magic Key。 |
| mm-027 | Asham、Ibis／Magic Key 回收 | Asham | 西北角上鎖建築內，調查藍色地磚。需 Magic Key。 |
| mm-028 | Asham、Ibis／Magic Key 回收 | Ibis Castle | 王城上鎖寶物庫裡的寶箱。需 Magic Key。 |
| mm-029 | Portoga、Baharata／取船前 | Portoga | 商店後方的乾草堆。 |
| mm-030 | Portoga、Baharata／取船前 | Portoga | 燈塔旁階梯下的房間，調查壺。 |
| mm-031 | Portoga、Baharata／取船前 | Baharata 周邊 | 西南方小沙漠的秘密地點。 |
| mm-032 | Portoga、Baharata／取船前 | Baharata | 南側石碼頭西側，柱子的左邊。 |
| mm-033 | Portoga、Baharata／取船前 | Baharata | 旅館的櫃子。 |
| mm-034 | Portoga、Baharata／取船前 | Kidnapper's Cave | B1 北側中央的寶箱。 |
| mm-035 | Alltrades Abbey、Mur／轉職塔 | Mur 周邊 | 村西北秘密地點，東南角岩石的東側。 |
| mm-036 | Alltrades Abbey、Mur／轉職塔 | Alltrades Abbey | B1 教堂後方。 |
| mm-037 | Alltrades Abbey、Mur／轉職塔 | Alltrades Abbey | 1F 右上雕像的轉角附近。 |
| mm-038 | Alltrades Abbey、Mur／轉職塔 | Wayfarer's Inn | 右邊的梳妝櫃。 |
| mm-039 | Alltrades Abbey、Mur／轉職塔 | Mur | 商店建築 2F 的左側壺。 |
| mm-040 | Alltrades Abbey、Mur／轉職塔 | Tower of Transcendence | 3F，走南側階梯找。 |
| mm-041 | 上層世界外海／取得船 | Persistence 周邊 | 西側只能由海上靠近的孤立沙灘，進秘密地點。 |
| mm-042 | Theddon、Lanson、Edina、Jipang／最終鑰匙前 | Theddon 周邊 | 鎮南靠海處的秘密地點。 |
| mm-043 | Theddon、Lanson、Edina、Jipang／最終鑰匙前 | Theddon | 鎮東北的毒沼。 |
| mm-044 | Theddon、Lanson、Edina、Jipang／最終鑰匙前 | Lanson | 上鎖建築東側死巷。 |
| mm-045 | Theddon、Lanson、Edina、Jipang／最終鑰匙前 | Edina | 東庭院的西南角，位於戶外。 |
| mm-046 | Theddon、Lanson、Edina、Jipang／最終鑰匙前 | Jipang | 神社建築內的壺。 |
| mm-047 | Theddon、Lanson、Edina、Jipang／最終鑰匙前 | Jipang Palace | 宮殿東側房間的壺。 |
| mm-048 | Theddon、Lanson、Edina、Jipang／最終鑰匙前 | Shallow Shrine | 寶箱北方的方形地磚。 |
| mm-049 | 上層世界／Ultimate Key 回收 | Mur | 商店內進上鎖房間。需 Ultimate Key。 |
| mm-050 | 上層世界／Ultimate Key 回收 | Romaria Castle | 西塔的上鎖房間，找水槽旁。需 Ultimate Key。 |
| mm-051 | 上層世界／Ultimate Key 回收 | Teleportal Shrine | 中央水池旁。 |
| mm-052 | 上層世界／Ultimate Key 回收 | Olivia's Promontory | 兩個傳送點之間。 |
| mm-053 | Lozamii、Pirate’s Den、Persistence／寶珠巡迴 | Shrine of the Everbird | 梯子底端的東北側。 |
| mm-054 | Lozamii、Pirate’s Den、Persistence／寶珠巡迴 | Lozamii | 北側花圃。 |
| mm-055 | Lozamii、Pirate’s Den、Persistence／寶珠巡迴 | Pirate's Den | 北側房間的木桶。 |
| mm-056 | Lozamii、Pirate’s Den、Persistence／寶珠巡迴 | Pirate's Den | 地下室東側牢房，白天容易進去。 |
| mm-057 | Lozamii、Pirate’s Den、Persistence／寶珠巡迴 | Pirate's Den 周邊 | 據點西北的秘密地點內，西出口附近路中央。 |
| mm-058 | Lozamii、Pirate’s Den、Persistence／寶珠巡迴 | Persistence | 北側屋內的壺。 |
| mm-059 | Grimland、Fifer’s Spire／寶珠巡迴 | Grimland | 西南火把旁的寶箱。 |
| mm-060 | Grimland、Fifer’s Spire／寶珠巡迴 | Grimland | 北側屋內的抽屜。 |
| mm-061 | Grimland、Fifer’s Spire／寶珠巡迴 | Fifer's Spire 周邊 | 塔西北遠處的秘密地點，靠近西北大石。 |
| mm-062 | Grimland、Fifer’s Spire／寶珠巡迴 | Fifer's Spire | 迷宮最深處 3F。 |
| mm-063 | Lanson／Gaia’s Navel 單人試煉 | Gaia's Navel | 單人試煉末端，藍色寶珠旁的寶箱。 |
| mm-064 | Jipang／Orochi’s Lair | Orochi's Lair | B2 西側的寶箱。 |
| mm-065 | Manoza／Ra’s Mirror | Wayfarer's Chapel 周邊 | 教堂西北的路底秘密地點，找東北側樹。 |
| mm-066 | Manoza／Ra’s Mirror | Manoza | 東北側墓碑。 |
| mm-067 | Manoza／Ra’s Mirror | Manoza Castle | 廚房內的木桶。 |
| mm-068 | Manoza／Ra’s Mirror | Manoza | 牢獄內的壺。 |
| mm-069 | Manoza／Ra’s Mirror | Manoza Cave | B2 按主通道順序開第八箱；周圍有擬態怪。 |
| mm-070 | Ghost Ship／Shrine of Shackles | Ghost Ship | B1 寶物室。 |
| mm-071 | Ghost Ship／Shrine of Shackles | Shrine of Shackles | 西北側壺。 |
| mm-072 | Necrogond／最後寶珠 | Maw of the Necrogond | L2 有洞穴陷坑的大房間，找中央巨石的東南側。 |
| mm-073 | Necrogond／最後寶珠 | Necrogond Shrine | 神殿內男子身後。 |
| mm-074 | 上層世界／Ramia | Aliahan 島西側 | 搭 Ramia 到秘密地點，找東面大石南側。 |
| mm-075 | 上層世界／Ramia | Manoza 西側 | 搭 Ramia 到秘密地點，找東側大石附近。 |
| mm-076 | 上層世界／Ramia | Persistence 北側 | 搭 Ramia 到秘密地點，找袋子東南方的樹旁。 |
| mm-077 | 上層世界／Ramia | 大森林西南側 | 森林大陸西南靠山的秘密地點，找東南岩石附近。 |
| mm-078 | Baramos’s Lair／龍后城 | Baramos's Lair | B1 東北側牢房。 |
| mm-079 | Baramos’s Lair／龍后城 | Baramos's Lair | 調查王座上的骷髏。 |
| mm-080 | Baramos’s Lair／龍后城 | Castle of the Dragon Queen | 城堡後方中央彩繪玻璃窗前。 |
| mm-081 | Alefgard／Tantegel 與北部及內海 | West Tantegel Harbor | 最北邊伸出的碼頭盡頭。 |
| mm-082 | Alefgard／Tantegel 與北部及內海 | Tantegel 周邊 | 城西北森林內的秘密地點，調查中央大樹。 |
| mm-083 | Alefgard／Tantegel 與北部及內海 | Galen's House | 調查抽屜。 |
| mm-084 | Alefgard／Tantegel 與北部及內海 | Tantegel | 通往城堡的拱門左側。 |
| mm-085 | Alefgard／Tantegel 與北部及內海 | Tantegel Castle | 東北側用餐室內的木桶。 |
| mm-086 | Alefgard／Tantegel 與北部及內海 | Alefgard 北部群島 | 北側島鏈的西北島，進秘密地點找西北岩石旁。 |
| mm-087 | Alefgard／Tantegel 與北部及內海 | Alefgard 內海 | 內海東南端無出口水道的岩形秘密地點。 |
| mm-088 | Alefgard／Tantegel 與北部及內海 | Sanctum 島西南方 | 海上秘密地點內。 |
| mm-089 | Alefgard／Craggy Cave、Damdara、Cantlin | Craggy Cave | B2 東南側死路。 |
| mm-090 | Alefgard／Craggy Cave、Damdara、Cantlin | Damdara | 最東側馬廄內。 |
| mm-091 | Alefgard／Craggy Cave、Damdara、Cantlin | Cantlin | 城鎮西北角。 |
| mm-092 | Alefgard／Craggy Cave、Damdara、Cantlin | Shrine of the Spirit | 地毯正中央。 |
| mm-093 | Alefgard／Craggy Cave、Damdara、Cantlin | Cantlin 周邊 | 鎮北沙漠的東南側，靠山秘密地點。 |
| mm-094 | Alefgard／Rimuldar、Kol、Rubiss、Sanctum | Rimuldar 周邊 | 鎮西北的秘密地點。 |
| mm-095 | Alefgard／Rimuldar、Kol、Rubiss、Sanctum | Rimuldar | 由後方入口繞進牢房。 |
| mm-096 | Alefgard／Rimuldar、Kol、Rubiss、Sanctum | Kol | 溫泉下水入口處。 |
| mm-097 | Alefgard／Rimuldar、Kol、Rubiss、Sanctum | Quagmire Cave | 洞窟最南端的死路。 |
| mm-098 | Alefgard／Rimuldar、Kol、Rubiss、Sanctum | Tower of Rubiss | 3F 中央瓦礫附近。 |
| mm-099 | Alefgard／Rimuldar、Kol、Rubiss、Sanctum | Sanctum | 祭司左側地面。 |
| mm-100 | Alefgard／Rimuldar、Kol、Rubiss、Sanctum | Talontear Tunnel | B3 東北角的寶箱。 |
| mm-101 | Alefgard／Zoma’s Citadel | Zoma's Citadel | 1F 王座前地面。 |
| mm-102 | Alefgard／Zoma’s Citadel | Zoma's Citadel | B4 寶物室。 |
| mm-103 | 破關後／天界迷宮 | ??? | 通關後迷宮內的金字塔樣式樓層，西南側寶箱。 |
| mm-104 | 破關後／天界迷宮 | ??? | 通關後迷宮內的地下湖樣式樓層，東北死路。 |
| mm-105 | 破關後／天界迷宮 | ??? | 通關後迷宮的監牢樓層，西北側牢房。 |
| mm-106 | 破關後／雲上城與塔 | Cloudsgate Citadel | 城堡下層的壺。 |
| mm-107 | 破關後／雲上城與塔 | Citadel Tower | 2F 左邊的寶箱。 |
| mm-108 | 破關後／雲上城與塔 | Citadel Tower | 4F 南側的寶箱。 |
| mm-109 | 破關後／Temple of Trials | Temple of Trials | 西北試煉（爪、迴力鏢），通過西北傳送點到四箱區，走南邊傳送點，開抵達處的寶箱。 |
| mm-110 | 破關後／Temple of Trials | Temple of Trials | 東北試煉（斧、杖），走北路下樓，往東北三個寶箱，徽章在最下方一箱。 |

來源（2026-11-23 查閱）：[RPG Site 徽章位置與獎勵](https://www.rpgsite.net/guide/16518-dragon-quest-iii-hd-2d-rem-all-mini-medals-locations)、[GameFAQs PS5 徽章獎盃](https://gamefaqs.gamespot.com/ps5/466973-dragon-quest-iii-hd-2d-remake/faqs/81593/many-a-medal)、[100% Guides 110 個地點的實機影片時間索引](https://www.youtube.com/watch?v=hHtYE5Rl19M)、[Square Enix 更新公告](https://www.square-enix-games.com/en_GB/documents/dragon-quest-iii-hd-2d-remake-update-notice)。覆蓋 110/110 個來源條目、24 個兌換門檻。第 109、110 枚依 RPG Site 流程與 GameFAQs 的西北、東北順序，其他網站編號可不同。mm-100 地下三樓（B3）以 PS5 GameFAQs 標法對照，RPG Site 地點指南寫 3F。

### 友善魔物（121 個固定收服點）

- 建議自開局維持一名現職 Monster Wrangler（馴獸師，譯名供搜尋）在出戰隊伍。帶現職馴獸師時，通常直接接近互動即可，時段、通行需求與 Ra’s Mirror 偽裝仍要滿足。聽聲音逃跑用盜賊 Padfoot，見到人逃跑用 Fade 或 Fading Jenny，聞到氣味逃跑用 Musk。單人試煉前，把有用的道具放進實際出戰者身上。怪物跑掉時重進區域再接近。
- Animal Instinct 可查現在這張圖、鄰接區域與時段。若來源的時段記載不同，先按表內首選時段到場，再用 Animal Instinct 查是否需等待，最後在該區域外推進時間再進場。
- 以「地點＋物種」辨識同一收服點，綽號是依同種魔物的個人收服順序分配，不能以綽號當 ID。表列綽號僅供搜尋。清單搜尋一個綽號時，顯示同種的所有候選點。去鬥技場找 Monty 以物種核對已收幾隻，NPC 畫面只能協助辨別缺哪一種，不能代替本站的位置紀錄。
- 收服時立刻勾選對應收服點；即使已打倒同種敵人，也要到指定地點互動。最後一筆 fm-121 位於通關後試煉深處。

| ID | 區域／解鎖階段 | 物種 | 綽號搜尋例 | 地點 | 調查位置 | 時段／條件 |
|---|---|---|---|---|---|---|
| fm-001 | Romaria、Khoryv／Norvik | Slime | Splatrick | Shrine of Promise | 走完 Path of Promise 後，在神殿外自動加入。 | 劇情自動 |
| fm-002 | Romaria、Khoryv／Norvik | Spiked Hare | Harry | Romaria | 鎮中噴水池東北側。 | 夜間；無馴獸師用 Padfoot |
| fm-003 | Romaria、Khoryv／Norvik | Antgobbler | Gobblebert | Romaria 周邊 | 城北山間峽谷，通往 Khoryv 的窄路東側秘密地點。 | — |
| fm-004 | Romaria、Khoryv／Norvik | Prestidigitator | Trixie | Khoryv 周邊 | 村西出到半島盡頭，進樹形秘密地點。 | 黃昏至夜間優先 |
| fm-005 | Romaria、Khoryv／Norvik | Spiked Hare | Hornbert | Norvik 周邊 | Norvik 往西南、通妖精村一帶，沿海森林的岩形秘密地點。 | 白天 |
| fm-006 | Romaria、Khoryv／Norvik | Cumaulus | Cloud | Khoryv 周邊 | 東北雪岸的岩形秘密地點。 | 時段有出入；先試夜間 |
| fm-007 | Romaria、Khoryv／Norvik | Healslime | Healie | Khoryv | 旅館附近、鎮東南大樹旁。 | 黃昏 |
| fm-008 | Romaria、Khoryv／Norvik | Bubble Slime | Bub | Skyfell Tower | 2F 東側寶箱附近的神像房。 | — |
| fm-009 | Romaria、Khoryv／Norvik | Raven Lunatic | Edgar | Faerie Village | 村西南側。 | 夜間；無馴獸師用 Musk |
| fm-010 | Romaria、Khoryv／Norvik | Antgobbler | Antony | Underground Lake | B1 走東南出口下 B2，找 B2 東側。 | — |
| fm-011 | Asham、Ibis／金字塔 | Restless Armour | Arthur | Asham 周邊 | 遠離城鎮的南側海岬岩形秘密地點。 | 夜間 |
| fm-012 | Asham、Ibis／金字塔 | Bag O' Laughs | Smiley | Asham | 城西北、議價武器店附近。 | 白天；無馴獸師用 Musk |
| fm-013 | Asham、Ibis／金字塔 | Healslime | Fixer | Ibis 周邊 | Ibis 西北沙漠綠洲的秘密地點。 | 黃昏 |
| fm-014 | Asham、Ibis／金字塔 | Mummy | Mumsy | Ibis | 教堂外。 | 夜間；無馴獸師用 Padfoot |
| fm-015 | Asham、Ibis／金字塔 | Bubble Slime | Anjellica | Ibis Castle | 2F 西側王座房一帶。 | 夜間 |
| fm-016 | Portoga、Baharata／取船前 | Prestidigitator | Hoodini | Portoga 周邊 | 城北偏西，越過山脈的黃樹秘密地點。 | 無馴獸師用 Musk |
| fm-017 | Portoga、Baharata／取船前 | Seaslime | Marin | Portoga | 碼頭東端。 | 夜間；無馴獸師用 Fading Jenny |
| fm-018 | Portoga、Baharata／取船前 | Cumaulus | Fluffy | Olivia’s Promontory 周邊 | 海岬西南、山旁的岩形秘密地點。 | — |
| fm-019 | Portoga、Baharata／取船前 | Overtoad | Ribbert | Baharata | 黑胡椒商人所在一帶，找鎮西南出口旁草地。 | 先試夜間 |
| fm-020 | Portoga、Baharata／取船前 | Raven Lunatic | Allan | Baharata 周邊 | 鎮東南半島上的秘密地點。 | 無馴獸師用 Musk |
| fm-021 | Portoga、Baharata／取船前 | Mushroom Mage | Mush | Kidnapper’s Cave 周邊 | 洞窟西北方秘密地點。 | 夜間 |
| fm-022 | Portoga、Baharata／取船前 | Cannibox | Lecter | Kidnapper’s Cave | 從入口一直往西，進第三間房。 | 無馴獸師用 Padfoot |
| fm-023 | Alltrades Abbey、Mur／轉職塔 | Restless Armour | Percival | Alltrades Abbey 周邊 | 神殿東南遠處的秘密地點。 | 夜間 |
| fm-024 | Alltrades Abbey、Mur／轉職塔 | Whackanape | King Strong | Mur 周邊 | 村西北的秘密地點。 | 時段有出入，先試夜間，沒出現再試白天；無馴獸師用 Padfoot |
| fm-025 | Alltrades Abbey、Mur／轉職塔 | Slime | Slimon | Alltrades Abbey | 神殿建物東北側。 | 夜間；無馴獸師用 Padfoot |
| fm-026 | Alltrades Abbey、Mur／轉職塔 | Shell Slime | Shella | Mur | 村東北碼頭。 | — |
| fm-027 | Alltrades Abbey、Mur／轉職塔 | Catula | Alutac | Tower of Transcendence | 從西側階梯到 2F。 | 無馴獸師用 Musk |
| fm-028 | 上層世界外海／取得船 | Mushroom Mage | Schroominger | Portoga 外海 | 燈塔西南側的秘密地點。 | 船 |
| fm-029 | 上層世界外海／取得船 | Man O' War | Jellie | Asham 外海 | 城西的孤立沙灘秘密地點。 | 船 |
| fm-030 | 上層世界外海／取得船 | Handsome Crab | Snapper | 西北大陸外海 | 大環形山區以東的冰山形秘密地點。 | 船；先試夜間 |
| fm-031 | 上層世界外海／取得船 | Seaslime | Schwimmer | Edina 外海 | 城西北海上的岩形秘密地點。 | 船；無馴獸師用 Musk |
| fm-032 | 上層世界外海／取得船 | Whackanape | Joe | Wayfarer’s Shrine 外海 | 祠堂北側的秘密地點。 | 船 |
| fm-033 | 上層世界外海／取得船 | Firn Fiend | Frosty | 世界地圖西南外海 | 西南冰島以西的冰山形秘密地點。 | 船、黃昏 |
| fm-034 | 上層世界外海／取得船 | Healslime | Healiza | Lanson 外海 | Lanson 所在島東南海面的岩石群。 | 船；時段有出入，先試黃昏 |
| fm-035 | 上層世界外海／取得船 | Man O' War | Sting | Reeve 外海 | Reeve 北邊海上的岩形秘密地點。 | 船、黃昏 |
| fm-036 | 上層世界外海／取得船 | Walking Corpse | Hel | 東北大陸海灣 | 海灣迷宮的毒沼附近秘密地點。 | 船、夜間 |
| fm-037 | 上層世界外海／取得船 | Wyrtle | Zippy | 東方外海 | 兩個東側大陸之間海上的岩形秘密地點。 | 船 |
| fm-038 | 上層世界外海／取得船 | Mermaniac | Mercurio | 東北大陸北側外海 | 雪地半島北側海上岩石群。 | 船、夜間；無馴獸師用 Musk |
| fm-039 | 上層世界／Theddon | Heedoo Voodoo | Whodoo | Theddon 周邊 | 城西過河後的秘密地點。 | 夜間；無馴獸師用 Musk |
| fm-040 | 上層世界／Theddon | Walking Corpse | Hades | Theddon | 鎮東北的建物地下室。 | 夜間優先 |
| fm-041 | 上層世界／Theddon | Bag O' Laughs | Sir Laugh-a-Lot | Theddon | 城鎮旅館內。 | 白天；無馴獸師用 Padfoot |
| fm-042 | 上層世界／Lanson | Cureslime | Curie | Lanson | 鎮東北角，神殿東邊。 | 黃昏 |
| fm-043 | 上層世界／Edina | Imp | Forker | Edina | 城堡東北側房間。 | 夜間；過守衛另備 Fade 或 Fading Jenny |
| fm-044 | 上層世界／Edina | Cumaulus | Rainey | Edina | 屋頂東側。 | 白天；過守衛另備 Fade 或 Fading Jenny |
| fm-045 | 上層世界／Jipang | Catula | Luna | Jipang | 城鎮東北側；先黃昏到場，若未出現等入夜再查。 | 黃昏／夜間資料有出入；無馴獸師用 Fading Jenny |
| fm-046 | 上層世界／Jipang | Overtoad | Amphoebe | Jipang | 鎮東南側稻田。 | 夜間 |
| fm-047 | 上層世界／Ultimate Key 回收 | Slime | Torijammer | Aliahan Castle | 城堡監牢，從公主東側過衛兵房往南下樓，找右側牢房。 | Ultimate Key |
| fm-048 | 上層世界／Ultimate Key 回收 | Metal Slime | Steelie | Romaria Outpost | 地下走廊中段開鎖往南，在傳送點東北側。 | Ultimate Key |
| fm-049 | 寶珠巡迴／Lozamii | Wyrtle | Turgon | Lozamii | 城鎮西北小島。 | 夜間 |
| fm-050 | 寶珠巡迴／Lozamii | Handsome Crab | Pinchy | Lozamii | 城鎮東小島，屋外。 | 黃昏 |
| fm-051 | 寶珠巡迴／Pirate’s Den | Imp | Prongley | Pirate’s Den | 據點西北房間。 | 白天 |
| fm-052 | 寶珠巡迴／Pirate’s Den | Rampage | Baatholomewe | Pirate’s Den 周邊 | 據點以北遠處、山脈南側，森林靠沙漠邊緣的秘密地點。 | 白天 |
| fm-053 | 寶珠巡迴／Grimland、Fifer’s Spire | Rampage | Ramsdale | Grimland | 鎮西北側。 | 時段若受限先試夜間；無馴獸師用 Fading Jenny |
| fm-054 | 寶珠巡迴／Grimland、Fifer’s Spire | Hoodlum | Hoodwink | Fifer’s Spire 周邊 | 塔／湖西北側的綠洲秘密地點，查西北大石。 | — |
| fm-055 | 寶珠巡迴／Grimland、Fifer’s Spire | Lump Shaman | Manny | 東方大陸交界 | 兩個東側大陸之間陸橋正南，岩形秘密地點。 | 先試夜間 |
| fm-056 | 寶珠巡迴／Grimland、Fifer’s Spire | Cannibox | Yum-yum | Fifer’s Spire | 5F 從旗幟附近的中央橫繩落下，抵達末端寶箱區。 | — |
| fm-057 | Lanson／Gaia’s Navel 單人試煉 | Overtoad | Croaker | Gaia’s Navel 周邊 | 從 Lanson 開單人試煉，入洞前在西側進秘密地點。 | 單人；無馴獸師用 Padfoot |
| fm-058 | Lanson／Gaia’s Navel 單人試煉 | Restless Armour | Bedivere | Gaia’s Navel | B1 支路。 | 單人；無馴獸師用 Musk，入洞前放進出戰者包包 |
| fm-059 | Jipang／Orochi’s Lair | Magmalice | Alice | Orochi’s Lair | 走到洞窟南側死路。 | — |
| fm-060 | Manoza／Ra’s Mirror | Heedoo Voodoo | Youdoo | Wayfarer’s Chapel 周邊 | 教堂西北、路底秘密地點。 | 先試黃昏 |
| fm-061 | Manoza／Ra’s Mirror | Minidemon | Lucy | Manoza Castle | 從東北梯上到頂部後跳下一層，往西走屋頂／花園。 | 先試白天；無馴獸師用 Musk |
| fm-062 | Manoza／Ra’s Mirror | Rockbomb | Rocky | Manoza Cave | B2 中央的寶箱區附近。 | 無馴獸師用 Fading Jenny；另一來源標 B1，B2 找不到可回查 B1 西半部 |
| fm-063 | 上層世界／Ra’s Mirror 返訪 | Minidemon | Balam | Persistence | 與東側的馬互動，揭穿偽裝。 | Ra’s Mirror、夜間 |
| fm-064 | 上層世界／Ra’s Mirror 返訪 | Bag O' Laughs | Chortley | Reeve | 找馬旁男孩，揭穿偽裝。 | Ra’s Mirror、夜間 |
| fm-065 | 上層世界／Ra’s Mirror 返訪 | Rockbomb | Blasty | Norvik | 調查旅館西邊的男子。 | Ra’s Mirror |
| fm-066 | 上層世界／Ra’s Mirror 返訪 | Crone Ranger | Hagatha | Dreamer’s Tower | 找旅館附近的人。 | Ra’s Mirror |
| fm-067 | 上層世界／Ra’s Mirror 返訪 | Prestidigitator | Maggie | Path of Promise | B1 找陷坑旁男子。 | Ra’s Mirror |
| fm-068 | 上層世界／Ra’s Mirror 返訪 | Imp | Shellvey | Pyramid | 3F 西北樓梯附近找女孩。 | Ra’s Mirror |
| fm-069 | 上層世界／Ra’s Mirror 返訪 | Mermaniac | Merida | Romaria 外海 | 城西小島的秘密地點，找樹旁女子。 | Ra’s Mirror、船 |
| fm-070 | 上層世界／Ra’s Mirror 返訪 | Silhouette | Silly | Teleportal Shrine | 與水池旁祭司互動。 | Ra’s Mirror；先試夜間 |
| fm-071 | 上層世界／Ra’s Mirror 返訪 | Imp | Damon | Teleportal Shrine 外海 | 從神殿往東到東北大陸外海岩石群，對秘密地點的貓使用鏡子。 | Ra’s Mirror、船 |
| fm-072 | 上層世界／Ra’s Mirror 返訪 | Lump Shaman | Genghis | Pirate’s Den | 北側左邊房間裡的女子。 | Ra’s Mirror、夜間 |
| fm-073 | 上層世界／Ra’s Mirror 返訪 | Mummy | Imhopep | Manoza | 墓園找男子。 | Ra’s Mirror、夜間 |
| fm-074 | Ghost Ship／幽靈船 | Squidzilla | Tenda | Ghost Ship | 船上最北端。 | 若沒出現先試夜間 |
| fm-075 | Ghost Ship／幽靈船 | Walking Corpse | Grim | Ghost Ship | B1 東北側。 | 無馴獸師用 Padfoot |
| fm-076 | Necrogond／最後寶珠 | Magmalice | Bernie | Mt. Necrogond | 擊倒 Garboyle 之後到山頂找。 | — |
| fm-077 | Necrogond／最後寶珠 | Troll | Trevor | Maw of the Necrogond | L2 東側房間。 | 無馴獸師用 Musk |
| fm-078 | Necrogond／最後寶珠 | Mimic | Death | Maw of the Necrogond | L3 南側死路。 | — |
| fm-079 | Necrogond／最後寶珠 | Shell Slime | Oozey | Necrogond Shrine | 神殿東北側。 | 夜間 |
| fm-080 | 上層世界／Ramia | Boreal Serpent | Boris | Khoryv 周邊 | 村東北雪地半島上的秘密地點。 | Ramia |
| fm-081 | 上層世界／Ramia | Mimic | Famine | Ibis 周邊 | 城東高地的秘密地點。 | Ramia；先試夜間 |
| fm-082 | 上層世界／Ramia | Elysium Bird | Beaker | Aliahan 周邊 | 本島西側的秘密地點。 | Ramia；無馴獸師用 Fading Jenny |
| fm-083 | 上層世界／Ramia | Restless Armour | Galahad | Persistence 周邊 | 城北的秘密地點。 | Ramia |
| fm-084 | 上層世界／Ra’s Mirror 後段返訪 | Goodybag | Jules | Merchantburg | 城鎮發展完成後，找噴水池北面男子。 | Ra’s Mirror、夜間 |
| fm-085 | 上層世界／Ra’s Mirror 後段返訪 | Hoodlum | Hoodunnit | 大森林 | 密林大陸北偏東秘密地點，找中央大樹附近男子。 | Ra’s Mirror；先試白天 |
| fm-086 | Baramos’s Lair／龍后城 | Armful | Armstrong | Baramos’s Lair | 魔王城東北靠水死路。 | 夜間 |
| fm-087 | Baramos’s Lair／龍后城 | Ursa Major | Bobo | Castle of the Dragon Queen | 城堡西側。 | 夜間 |
| fm-088 | Baramos’s Lair／龍后城 | Prestidigitator | Spellie | Castle of the Dragon Queen | 城堡東側。 | 白天；無馴獸師用 Fading Jenny |
| fm-089 | Baramos’s Lair／龍后城 | Cureslime | Meddie | Castle of the Dragon Queen | 城堡西側。 | 黃昏；無馴獸師用 Padfoot |
| fm-090 | Alefgard／Tantegel 與北部 | Slime | Gootrude | Tantegel 周邊 | 城東北山旁岩形秘密地點。 | 無馴獸師用 Musk |
| fm-091 | Alefgard／Tantegel 與北部 | Shell Slime | Spiner | Galen’s House | 屋外西側草地。 | 無馴獸師用 Musk |
| fm-092 | Alefgard／Tantegel 與北部 | She-Slime | Shiela | Tantegel Castle | 王城後方花園西側。 | — |
| fm-093 | Alefgard／環島航線 | Wyrtoise | Torgon | Alefgard 西北外海 | 西北大陸北方的較小島，進秘密地點。 | 船 |
| fm-094 | Alefgard／環島航線 | Elysium Bird | Cronus | Alefgard 東部外海 | 東北與東南大陸之間的小島，對秘密地點的小孩使用鏡子。 | Ra’s Mirror、船 |
| fm-095 | Alefgard／環島航線 | Squidzilla | Inky | Alefgard 內海 | 內海東南端無出口水道的岩形秘密地點。 | 船 |
| fm-096 | Alefgard／環島航線 | Seaslime | Shelley | Alefgard 西南大陸 | 靠西一帶的河道岩形秘密地點，橋的前方。 | 船 |
| fm-097 | Alefgard／Craggy Cave、Damdara | Armful | Armadeus | Craggy Cave | 從 B1 西北側樓梯抵達 B2 西北房間。 | 無馴獸師用 Musk |
| fm-098 | Alefgard／Craggy Cave、Damdara | Green Dragon | Green Giant | Craggy Cave 周邊 | 洞窟東南半島的秘密地點，找修女。 | Ra’s Mirror |
| fm-099 | Alefgard／Craggy Cave、Damdara | Chimaera | Polly | Damdara 周邊 | 城西南沙漠的綠洲秘密地點。 | 無馴獸師用 Fading Jenny |
| fm-100 | Alefgard／Craggy Cave、Damdara | Hocus-Poker | Mike | Damdara | 城鎮西南角，與女子互動。 | Ra’s Mirror |
| fm-101 | Alefgard／Cantlin、Rimuldar、Kol | Minidemon | Lilith | Cantlin | 城西建物南側，藏在指示牌後方。 | 無馴獸師用 Fading Jenny |
| fm-102 | Alefgard／Cantlin、Rimuldar、Kol | Gold Digger（舊稱 Gold Golem） | Goldirox | Alefgard 東大陸 | Rimuldar 以南，東部大陸南側平原的秘密地點。 | — |
| fm-103 | Alefgard／Cantlin、Rimuldar、Kol | Chimaera | Buddy | Rimuldar | 過橋後到鎮西北角房屋旁。 | — |
| fm-104 | Alefgard／Cantlin、Rimuldar、Kol | Silhouette | Casper | Kol | 在井裡找男人。 | Ra’s Mirror |
| fm-105 | Alefgard／Quagmire Cave、Rubiss、Zoma’s Citadel | Crone Ranger | Sabrina | Quagmire Cave | 洞窟中段東側找男 NPC。 | Ra’s Mirror |
| fm-106 | Alefgard／Quagmire Cave、Rubiss、Zoma’s Citadel | Mermaniac | Triton | Tower of Rubiss | 1F 西南鎖門附近找男 NPC。 | Ra’s Mirror；開門需 Ultimate Key |
| fm-107 | Alefgard／Quagmire Cave、Rubiss、Zoma’s Citadel | Chimaera | Slinky | Tower of Rubiss | 4F 中央房間，走箭頭地板上方的通路。 | — |
| fm-108 | Alefgard／Quagmire Cave、Rubiss、Zoma’s Citadel | She-Slime | Abigoo | Sanctum | 主廳西北角。 | 無馴獸師用 Fading Jenny |
| fm-109 | Alefgard／Quagmire Cave、Rubiss、Zoma’s Citadel | Goodybag | Pearl | Talontear Tunnel | B1 東北角。 | 無馴獸師用 Fading Jenny |
| fm-110 | Alefgard／Quagmire Cave、Rubiss、Zoma’s Citadel | Infernal Serpent | Soaron | Zoma’s Citadel 周邊 | 通往城堡路上的東南方秘密地點。 | 無馴獸師用 Musk |
| fm-111 | Alefgard／Quagmire Cave、Rubiss、Zoma’s Citadel | Liquid Metal Slime | Quicksilver | Zoma’s Citadel | B3 大陷坑房。 | 無馴獸師用 Fading Jenny |
| fm-112 | Alefgard／Quagmire Cave、Rubiss、Zoma’s Citadel | Soaring Scourger | Sky | Zoma’s Citadel | B3 主路分岔的西南死路。 | — |
| fm-113 | 破關後／天界迷宮 | Metal Slime | Alloy | ??? 天界小地圖 | 從龍后城光柱進入天界後，找岩形秘密地點。 | 通關存檔；無馴獸師用 Fading Jenny |
| fm-114 | 破關後／天界迷宮 | Green Dragon | Scales | ??? 天界迷宮 | 第 3 段熔岩地形內，走到北側中央的空地。 | 通關存檔 |
| fm-115 | 破關後／天界迷宮 | She-Slime | Oozebeth | ??? 天界迷宮 | 監牢樣式的區段，找最東側牢房。 | 通關存檔；無馴獸師用 Musk |
| fm-116 | 破關後／雲上城與塔 | Cureslime | Mendy | Cloudsgate Citadel | 城堡東南噴水池旁。 | 通關後 |
| fm-117 | 破關後／雲上城與塔 | Franticore | Frantico | Citadel Tower | 4F。 | 通關後；無馴獸師用 Musk |
| fm-118 | 破關後／Temple of Trials | Slime | Goobert | Temple of Trials | 入口南側，傳送點之前。 | Xenlon 願望開試煉 |
| fm-119 | 破關後／Temple of Trials | Baramonster | Barry Moss | Temple of Trials | 西北試煉的傳送迷宮，抵達東半部後，下樓到三個寶箱，進最右傳送點，再往西的側房。 | Xenlon 願望開試煉 |
| fm-120 | 破關後／Temple of Trials | Great Keeper | Goldie | Temple of Trials | 東北試煉，走北門下樓後再過北門，往西找到北向樓梯，到下一組圓梯附近。 | Xenlon 願望開試煉 |
| fm-121 | 破關後／Temple of Trials | Xenlon | Xenwrong | Temple of Trials | 各試煉通過後走北邊最終路段。 | 完成五項試煉後 |

來源（2026-11-23 查閱）：[RPG Site 121 個收服點](https://www.rpgsite.net/guide/16519-dragon-quest-iii-hd-2d-re-all-friendly-monster-locations)、[RPG Site 所有篇章的地圖區域／行進路線](https://www.rpgsite.net/guide/16522-dragon-quest-iii-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-friendly-monsters-step-by-step-guide)、[PS5 GameFAQs 的收服條件表與物種對照](https://gamefaqs.gamespot.com/ps5/466973-dragon-quest-iii-hd-2d-remake/faqs/81633/miscellaneous)、[Dot Esports](https://dotesports.com/dragon-quest/news/dragon-quest-3-hd-2d-remake-friendly-monster-rescue-list)、[Gamer Guru 實機片段與物種索引](https://www.youtube.com/watch?v=bQnDYbVT-No)、[Dragon Quest Wiki 的 Gold Digger 版本別名](https://dragon-quest.org/wiki/Gold_digger)。已收錄／查證 121 個位置，個別時段或樓層有差異者附第二個查找條件。Dot Esports 表內缺地下湖 B2 的 Antgobbler，因此不單獨作為 121 筆分母。名稱可依遊戲語系新增別名，既有 ID 保持不變。

### 擊敗魔物圖鑑（163 項）

獎盃 Mate of the Monsters 要求補完遊戲內擊敗魔物名單：每個條目至少實際打倒一次，遺漏用 PS5 的 Misc. → Info → Defeated Monster List 查號碼。大地圖和迷宮途中至少打一場新編號的敵人，尤其是金屬系、箱型敵人、只出現在個別迷宮的怪物。表列地點是實際能查漏的代表地點，部分有多個區域可打。表中的「區域／階段」可讓 Roadmap 顯示順路提示，敵人遇敵紀錄以玩家手動確認。enemy-### 使用遊戲內圖鑑編號。

| ID | 區域／階段 | 英文原名 | 可查漏地點 | 補充 |
|---|---|---|---|---|
| enemy-001 | Aliahan／出發 | Slime | Aliahan 周邊、Promontory Passage、Dreamer’s Tower | — |
| enemy-002 | Aliahan／出發 | Stark Raven | Aliahan 周邊、Promontory Passage、Dreamer’s Tower | — |
| enemy-003 | Aliahan／出發 | Bunicorn | Aliahan 周邊、Promontory Passage、Dreamer’s Tower | — |
| enemy-004 | Aliahan／出發 | Antnibbler | Aliahan 周邊、Promontory Passage、Dreamer’s Tower | — |
| enemy-005 | Aliahan／出發 | Batterfly | Aliahan 東側野外、Dreamer’s Tower、Path of Promise | — |
| enemy-006 | Aliahan／出發 | Toady | Aliahan 東側野外、Dreamer’s Tower | — |
| enemy-007 | Aliahan／出發 | Bubble Slime | Aliahan 東側野外、Promontory Passage、Dreamer’s Tower | — |
| enemy-008 | Aliahan／出發 | Prestidigitator | Aliahan 東側野外、Dreamer’s Tower、Path of Promise | — |
| enemy-009 | Aliahan／出發 | Waspion | Aliahan 東側野外、Dreamer’s Tower、Path of Promise | — |
| enemy-010 | Aliahan／出發 | Healslime | Aliahan 東側野外、Romaria 周邊、Khoryv 周邊 | — |
| enemy-011 | Aliahan／出發 | Spiked Hare | Aliahan 東側野外、Path of Promise、Romaria 周邊 | — |
| enemy-012 | Aliahan／出發 | Antgobbler | Path of Promise | — |
| enemy-013 | Aliahan／出發 | Killerpillar | Path of Promise、Romaria 周邊、Khoryv 周邊 | — |
| enemy-014 | Romaria、Khoryv／Norvik | Toxic Toad | Romaria 周邊、Portoga 周邊 | — |
| enemy-015 | Romaria、Khoryv／Norvik | Vladdy | Romaria 周邊、Khoryv 周邊、Skyfell Tower 周邊 | — |
| enemy-016 | Romaria、Khoryv／Norvik | Putrefido | Romaria 周邊、Khoryv 周邊、Skyfell Tower 周邊 | — |
| enemy-017 | Romaria、Khoryv／Norvik | Scornet | Khoryv 周邊、Skyfell Tower 周邊、Skyfell Tower | — |
| enemy-018 | Romaria、Khoryv／Norvik | Crabid | Khoryv 周邊、Skyfell Tower 周邊、Skyfell Tower | — |
| enemy-019 | Romaria、Khoryv／Norvik | Restless Armour | Romaria 周邊、Khoryv 周邊、Skyfell Tower 周邊 | — |
| enemy-020 | Romaria、Khoryv／Norvik | Cumaulus | Skyfell Tower、Norvik 周邊、Asham 周邊 | — |
| enemy-021 | Romaria、Khoryv／Norvik | Funghoul | Skyfell Tower、Asham 周邊、Ibis 沙漠 | — |
| enemy-022 | Romaria、Khoryv／Norvik | Illerpillar | Skyfell Tower、Norvik 周邊、Asham 周邊 | — |
| enemy-023 | Romaria、Khoryv／Norvik | Raven Lunatic | Norvik 周邊、Portoga 周邊 | — |
| enemy-024 | Romaria、Khoryv／Norvik | Bullmustiff | Norvik 周邊、Underground Lake、Asham 周邊 | — |
| enemy-025 | Romaria、Khoryv／Norvik | Shade | Norvik 周邊、Pyramid、Lanson 周邊 | — |
| enemy-026 | Romaria、Khoryv／Norvik | Morphean Mushroom | Underground Lake、Portoga 周邊、Lanson 周邊 | — |
| enemy-027 | Romaria、Khoryv／Norvik | Drac the Vlad | Underground Lake、Asham 周邊、Portoga 周邊 | — |
| enemy-028 | Romaria、Khoryv／Norvik | Betterfly | Underground Lake、Asham 周邊、Ibis 沙漠 | — |
| enemy-029 | Asham、Ibis／金字塔 | Vampire Cat | Asham 周邊、Ibis 沙漠、Baharata 周邊 | — |
| enemy-030 | Asham、Ibis／金字塔 | Jackanape | Asham 周邊、Baharata 周邊、Lanson 周邊 | — |
| enemy-031 | Asham、Ibis／金字塔 | Crabber Dabber Doo | Asham 周邊、Ibis 沙漠、Baharata 周邊 | — |
| enemy-032 | Asham、Ibis／金字塔 | Mummy Boy | Asham 周邊、Ibis 沙漠、Pyramid | — |
| enemy-033 | Asham、Ibis／金字塔 | Grillerpillar | Asham 周邊、Ibis 沙漠、Pyramid | — |
| enemy-034 | Asham、Ibis／金字塔 | Overtoad | Pyramid、Mur 周邊、Jipang 周邊 | — |
| enemy-035 | Asham、Ibis／金字塔 | Bag o' Laughs | Pyramid、Kidnapper’s Cave | — |
| enemy-036 | Asham、Ibis／金字塔 | Mummy | Pyramid、Lanson 周邊、Gaia’s Navel | — |
| enemy-037 | Asham、Ibis／金字塔 | Cannibox | Pyramid 1F 西側、Kidnapper’s Cave | 開啟箱型敵人所在寶箱並實際打倒；友善同種收服無效。 |
| enemy-038 | Portoga、Baharata／取船前 | Lump Wizard | Portoga 周邊 | — |
| enemy-039 | Portoga、Baharata／取船前 | Mushroom Mage | Baharata 周邊、Mur 周邊、Gaia’s Navel | — |
| enemy-040 | Portoga、Baharata／取船前 | Rumble Bee | Baharata 周邊、Kidnapper’s Cave、Mur 周邊 | — |
| enemy-041 | Portoga、Baharata／取船前 | Rottenweiler | Baharata 周邊、Mur 周邊、Yggdrasil Tree 周邊 | — |
| enemy-042 | Portoga、Baharata／取船前 | Lump Mage | Baharata 周邊、Kidnapper’s Cave、Alltrades Abbey 周邊 | — |
| enemy-043 | Portoga、Baharata／取船前 | Hell Niño | Baharata 周邊、Yggdrasil Tree 周邊 | — |
| enemy-044 | Portoga、Baharata／取船前 | Antguzzler | Baharata 周邊、Alltrades Abbey 周邊、Mur 周邊 | — |
| enemy-045 | Portoga、Baharata／取船前 | Walking Corpse | Baharata 周邊、Alltrades Abbey 周邊、Mur 周邊 | — |
| enemy-046 | Portoga、Baharata／取船前 | Catula | Baharata 周邊、Kidnapper’s Cave、Alltrades Abbey 周邊 | — |
| enemy-047 | Portoga、Baharata／取船前 | Hoodie | Baharata 周邊、Kidnapper’s Cave、Alltrades Abbey 周邊 | — |
| enemy-048 | 上層世界外海／取得船 | Seaslime | 上層世界外海、Lozamii 周邊、Pirate’s Den 周邊 | — |
| enemy-049 | 上層世界外海／取得船 | Man o' War | 上層世界外海、Ghost Ship、Alefgard 海上 | — |
| enemy-050 | 上層世界外海／取得船 | Merman | 上層世界外海 | — |
| enemy-051 | 上層世界外海／取得船 | King Squid | 上層世界外海 | — |
| enemy-052 | 上層世界外海／取得船 | Handsome Crab | 上層世界外海、Lozamii 周邊、Pirate’s Den 周邊 | — |
| enemy-053 | 上層世界外海／取得船 | Mermaniac | 上層世界外海、Merchantburg 周邊、Persistence 周邊 | — |
| enemy-054 | 上層世界外海／取得船 | Hades Condor | 上層世界外海、Merchantburg 周邊、Rimland 周邊 | — |
| enemy-055 | 上層世界外海／取得船 | Dread Admiral | Tower of Transcendence、上層世界外海 | 塔裡可先解；航海時可補。 |
| enemy-056 | 上層世界外海／取得船 | Wyrtle | 上層世界外海、Manoza 周邊、Manoza Cave | — |
| enemy-057 | 上層世界外海／取得船 | Squidzilla | 上層世界外海、Ghost Ship、Alefgard 海上 | — |
| enemy-058 | Alltrades Abbey、Mur／轉職塔 | Ram Raider | Baharata 周邊、Alltrades Abbey 周邊、Tower of Transcendence | — |
| enemy-059 | Alltrades Abbey、Mur／轉職塔 | Whackanape | Baharata 周邊、Alltrades Abbey 周邊、Tower of Transcendence | — |
| enemy-060 | Alltrades Abbey、Mur／轉職塔 | Metal Slime | Tower of Transcendence、Alltrades Abbey 周邊 | 擊倒跑掉前的金屬怪可順解 Metallic Masher。 |
| enemy-061 | Alltrades Abbey、Mur／轉職塔 | Ursa Minor | Baharata 周邊、Alltrades Abbey 周邊、Mur 周邊 | — |
| enemy-062 | Alltrades Abbey、Mur／轉職塔 | Garuda | Alltrades Abbey 周邊、Tower of Transcendence、Mur 周邊 | — |
| enemy-063 | Alltrades Abbey、Mur／轉職塔 | Beakon | Tower of Transcendence | — |
| enemy-064 | Alltrades Abbey、Mur／轉職塔 | Ethereal Serpent | Alltrades Abbey 周邊、Tower of Transcendence、Mur 周邊 | — |
| enemy-065 | 寶珠巡迴／Grimland、Fifer’s Spire | Lump Shaman | Merchantburg 周邊、Persistence 周邊、Teleportal Shrine 周邊 | — |
| enemy-066 | 寶珠巡迴／Grimland、Fifer’s Spire | Battering Ram | Merchantburg 周邊、Persistence 周邊、Teleportal Shrine 周邊 | — |
| enemy-067 | 寶珠巡迴／Grimland、Fifer’s Spire | Toxic Zombie | Merchantburg 周邊、Persistence 周邊、Teleportal Shrine 周邊 | — |
| enemy-068 | 寶珠巡迴／Grimland、Fifer’s Spire | Belisha Beakon | Merchantburg 周邊、Persistence 周邊、Teleportal Shrine 周邊 | — |
| enemy-069 | 寶珠巡迴／Grimland、Fifer’s Spire | Liquid Metal Slime | Teleportal Shrine 周邊、Fifer’s Spire 周邊、Maw of the Necrogond | 可夜訪神殿周圍，遇到後需實際擊倒。 |
| enemy-070 | 寶珠巡迴／Grimland、Fifer’s Spire | Hoodlum | Fifer’s Spire | — |
| enemy-071 | 寶珠巡迴／Grimland、Fifer’s Spire | Lethal Armour | Fifer’s Spire、Yggdrasil Tree 周邊、Manoza 周邊 | — |
| enemy-072 | 寶珠巡迴／Grimland、Fifer’s Spire | Voodoogooder | Fifer’s Spire、Manoza 周邊、Manoza Cave | — |
| enemy-073 | Alltrades Abbey、Mur／轉職塔 | Imp | Alltrades Abbey 周邊、Mur 周邊、Jipang 周邊 | — |
| enemy-074 | Alltrades Abbey、Mur／轉職塔 | Shell Slime | Alltrades Abbey 周邊、Mur 周邊、Jipang 周邊 | — |
| enemy-075 | 上層世界／龍后城與世界樹 | Heavy Hood | Yggdrasil Tree 周邊、Castle of the Dragon Queen 周邊 | — |
| enemy-076 | 上層世界／龍后城與世界樹 | Rockbomb | Yggdrasil Tree 周邊、Castle of the Dragon Queen 周邊 | — |
| enemy-077 | 上層世界／Edina | Cureslime | Edina 周邊、Manoza Cave、Maw of the Necrogond 外圍 | — |
| enemy-078 | 上層世界／Edina | Vladiator | Mur 周邊、Edina 周邊、Fifer’s Spire | — |
| enemy-079 | 上層世界／Theddon、Lanson | Heedoo Voodoo | Merchantburg 周邊、Theddon 周邊、Lanson 周邊 | — |
| enemy-080 | Lanson、Manoza／寶箱敵人 | Mimic | Gaia’s Navel、Manoza Cave B2、Ghost Ship | Manoza Cave B2 有多個擬態箱，開箱後實際打倒。 |
| enemy-081 | Jipang／Orochi’s Lair | Magmalice | Orochi’s Lair | — |
| enemy-082 | 上層世界／Theddon、Lanson、Edina | Rampage | Theddon 周邊、Lanson 周邊、Baramos’ Lair 周邊 | — |
| enemy-083 | 上層世界／Theddon、Lanson、Edina | Crone | Theddon 周邊、Edina 周邊、Baramos’ Lair 周邊 | — |
| enemy-084 | Alltrades Abbey、Mur／轉職塔 | Weaken Beakon | Mur 周邊、Theddon 周邊、Jipang 周邊 | — |
| enemy-085 | 上層世界／Theddon、Lanson、Edina | Infernal Armour | Theddon 周邊、Edina 周邊、Lozamii 周邊 | — |
| enemy-086 | Manoza 周邊 | Crone Ranger | Manoza 周邊、Yggdrasil Tree 周邊 | — |
| enemy-087 | Manoza 周邊 | Smackanape | Pirate’s Den、Lozamii、Manoza 周邊 | — |
| enemy-088 | Manoza 周邊 | Ursa Major | Yggdrasil Tree 周邊、Manoza 周邊、Castle of the Dragon Queen 周邊 | — |
| enemy-089 | Manoza Cave／幽靈船 | Shadow | Manoza Cave | — |
| enemy-090 | Manoza Cave／幽靈船 | Skeleton Swordsman | Manoza Cave、Ghost Ship | — |
| enemy-091 | 上層世界／冰岸與 Grimland | Firn Fiend | Rimland 周邊、Grimland 周邊、Maw of the Necrogond 外圍 | — |
| enemy-092 | 上層世界／冰岸與 Grimland | Boreal Serpent | Rimland 周邊、Grimland 周邊、Maw of the Necrogond 外圍 | — |
| enemy-093 | Ghost Ship／Necrogond | Minidemon | Yggdrasil Tree 周邊、Ghost Ship、Maw of the Necrogond 外圍 | — |
| enemy-094 | Necrogond 周邊、Baramos 周邊 | Elysium Bird | Yggdrasil Tree 周邊、Maw of the Necrogond 外圍、Baramos’ Lair 周邊 | — |
| enemy-095 | Necrogond／Maw of the Necrogond | Wyrtoise | Maw of the Necrogond 外圍與內部、Craggy Cave | — |
| enemy-096 | Necrogond／Maw of the Necrogond | Troll | Maw of the Necrogond 外圍、Maw of the Necrogond、Baramos’ Lair 周邊 | — |
| enemy-097 | Necrogond／Maw of the Necrogond | Freezing Fog | Maw of the Necrogond 外圍、Maw of the Necrogond、Baramos’ Lair 周邊 | — |
| enemy-098 | Necrogond／Maw of the Necrogond | Goodybag | Maw of the Necrogond、Craggy Cave | — |
| enemy-099 | Necrogond／Maw of the Necrogond | Armful | Maw of the Necrogond、Baramos’ Lair、Tantegel 周邊 | — |
| enemy-100 | Necrogond／Maw of the Necrogond | Silhouette | Maw of the Necrogond、Baramos’ Lair、Alefgard 海上 | — |
| enemy-101 | Necrogond／Maw of the Necrogond | Infanticore | Maw of the Necrogond、Baramos’ Lair | — |
| enemy-102 | Baramos’s Lair | Leger-de-man | Baramos’s Lair | 只為查漏，可在魔王城裡逐層切換遇敵。 |
| enemy-103 | Baramos’s Lair | Living Statue | Baramos’ Lair、Tantegel 周邊、Damdara 周邊 | — |
| enemy-104 | Alefgard／內海外海 | Merking | Alefgard 海上、Cloudsgate Citadel | — |
| enemy-105 | Alefgard／內海外海 | Tentacular | Alefgard 海上 | 刷陸地遇不到，坐船移動觸發海戰。 |
| enemy-106 | Alefgard／Tantegel、北部與 Talontear Tunnel | Infernal Serpent | Tantegel 周邊、Galen’s House 周邊、Tower of Rubiss | — |
| enemy-107 | Alefgard／Tantegel、北部與 Talontear Tunnel | She-Slime | Tantegel 周邊、Galen’s House 周邊、Damdara 周邊 | — |
| enemy-108 | Alefgard／Tantegel、北部與 Talontear Tunnel | Muddy Hand | Tantegel 周邊、Craggy Cave、Cantlin 周邊 | — |
| enemy-109 | Alefgard／Tantegel、北部與 Talontear Tunnel | Ghoul | Tantegel 周邊、Galen’s House 周邊、Cantlin 周邊 | — |
| enemy-110 | Alefgard／Tantegel、北部與 Talontear Tunnel | Hocus-Poker | Tantegel 周邊、Talontear Tunnel、Zoma’s Citadel 周邊 | — |
| enemy-111 | Alefgard／Tantegel、北部與 Talontear Tunnel | Flying Flayer | Kol 周邊、Tower of Rubiss、Talontear Tunnel | — |
| enemy-112 | Alefgard／Tantegel、北部與 Talontear Tunnel | Hydra | Talontear Tunnel、Zoma’s Citadel 周邊 | — |
| enemy-113 | Alefgard／Tantegel、北部與 Talontear Tunnel | Great Troll | Talontear Tunnel、Zoma’s Citadel 周邊、Zoma’s Citadel | — |
| enemy-114 | Alefgard／Craggy Cave、Damdara、Cantlin | Ursa Mega | Craggy Cave、Cantlin 周邊、Kol 周邊 | — |
| enemy-115 | Alefgard／Craggy Cave、Damdara、Cantlin | Umbra | Damdara 周邊、Tower of Rubiss、Rimuldar 周邊 | — |
| enemy-116 | Alefgard／Craggy Cave、Damdara、Cantlin | Chimaera | Damdara 周邊、Cantlin 周邊、Kol 周邊 | — |
| enemy-117 | Alefgard／Craggy Cave、Damdara、Cantlin | Troobloovoodoo | Cantlin 周邊、Tower of Rubiss、Zoma’s Citadel 周邊 | — |
| enemy-118 | Alefgard／Craggy Cave、Damdara、Cantlin | Skelegon | Cantlin 周邊、Kol 周邊、Rimuldar 周邊 | — |
| enemy-119 | Alefgard／Rimuldar、Rubiss | Hocus Chimaera | Cantlin 周邊、Tower of Rubiss | — |
| enemy-120 | Alefgard／Rimuldar、Rubiss | Manticore | Tower of Rubiss | — |
| enemy-121 | Alefgard／Rimuldar、Rubiss | Gold Digger（舊稱 Gold Golem） | Rimuldar／Sanctum 周邊、Cloudsgate Citadel | 舊攻略列 Gold Golem；Rimuldar 周邊較難遇，可留到通關後補。 |
| enemy-122 | Alefgard／Rimuldar、Rubiss | Green Dragon | Tower of Rubiss、Zoma’s Citadel 周邊、Zoma’s Citadel | — |
| enemy-123 | Alefgard／Zoma’s Citadel | Stone Guardian | Zoma’s Citadel、Tantegel 周邊 | 城堡內有戰鬥遇敵，回查以遊戲圖鑑為準。 |
| enemy-124 | Alefgard／Zoma’s Citadel | Soaring Scourger | Zoma’s Citadel、??? 天界迷宮 | — |
| enemy-125 | Alefgard／Zoma’s Citadel | Dragon Zombie | Zoma’s Citadel、??? 天界迷宮 | — |
| enemy-126 | Alefgard／Zoma’s Citadel | Franticore | Zoma’s Citadel、??? 天界迷宮 | — |
| enemy-127 | Alefgard／Zoma’s Citadel | One-Man Army | Zoma’s Citadel | 先查城內 B1 的石像觸發區，缺項再逐區查。 |
| enemy-128 | 破關後／天界迷宮與塔 | Metal Chimaera | ??? 天界迷宮、Citadel Tower | — |
| enemy-129 | 破關後／天界迷宮與塔 | Abracadabrer | ??? 天界迷宮、Citadel Tower | — |
| enemy-130 | 破關後／天界迷宮與塔 | King Crab | ??? 天界迷宮 | 通關後回查天界迷宮各段。 |
| enemy-131 | 破關後／天界迷宮與塔 | Terror Troll | ??? 天界迷宮、Citadel Tower | — |
| enemy-132 | 破關後／天界迷宮與塔 | Grievous Bodily Arm | ??? 天界迷宮、Citadel Tower | — |
| enemy-133 | 破關後／天界迷宮與塔 | Baramonster | ??? 天界迷宮、Citadel Tower | — |
| enemy-134 | 破關後／Citadel Tower | Phoenix | Citadel Tower | — |
| enemy-135 | 破關後／Citadel Tower | Great Keeper | Citadel Tower | — |
| enemy-136 | 破關後／Temple of Trials | Golden Gloom | Temple of Trials | — |
| enemy-137 | 破關後／Temple of Trials | Iron Knight | Temple of Trials | — |
| enemy-138 | 破關後／Temple of Trials | Pandora's Box | Temple of Trials 西北傳送區寶箱及試煉戰 | 確認遊戲圖鑑 #138 已補登。若驅逐戰術獲勝卻沒有登錄，找含 Pandora’s Box 的一個寶箱，直接打倒至少一隻。 |
| enemy-139 | 破關後／Temple of Trials | Ursa Argentum | Temple of Trials | — |
| enemy-140 | 破關後／Temple of Trials | Steely Statue | Temple of Trials | — |
| enemy-141 | 破關後／Temple of Trials | Hardy Hand | Temple of Trials 東北側等試煉區 | 低遇敵率且可能逃跑，先以圖鑑缺項確認。 |
| enemy-142 | 破關後／Temple of Trials | Arcticore | Temple of Trials | — |
| enemy-143 | 破關後／Temple of Trials | Blue Dragon | Temple of Trials | — |
| enemy-144 | 破關後／Temple of Trials | Dread Dragon | Temple of Trials | — |
| enemy-145 | Romaria／BOSS | Robbin’ ’Ood | Skyfell Tower、Kidnapper’s Cave | 分別在塔頂與後續洞窟頭目戰出場。 |
| enemy-146 | Romaria／BOSS | Robbin’ ’Oodlum | Skyfell Tower、Kidnapper’s Cave | 與 Robbin’ ’Ood 一起出現，至少親自打倒一隻。 |
| enemy-147 | Ibis／BOSS | Kylla | Pyramid | 與 Ripper of the Rift 同場。 |
| enemy-148 | Ibis／BOSS | Ripper of the Rift | Pyramid | 金字塔取得 Magic Key 的頭目戰。 |
| enemy-149 | Theddon／BOSS | Phantasm | Theddon | 有 Ultimate Key 後夜訪牢房，與 Dying Fire 同場。 |
| enemy-150 | Theddon／BOSS | Dying Fire | Theddon | 夜訪鎮內牢房的綠色寶珠戰。 |
| enemy-151 | Lanson／BOSS | Madvlad | Gaia’s Navel | 與 Chiromancer 同場。 |
| enemy-152 | Lanson／BOSS | Chiromancer | Gaia’s Navel | 單人藍色寶珠試煉的頭目。 |
| enemy-153 | Jipang／BOSS | Orochi | Orochi’s Lair、Jipang | 洞窟首戰與宮殿第二戰同一圖鑑號。 |
| enemy-154 | Manoza／BOSS | Boss Troll | Manoza Castle | 取得 Ra’s Mirror 後夜入國王寢室；後續 Alefgard 部分野外也可補登。 |
| enemy-155 | Necrogond／BOSS | Garboyle | Mt. Necrogond | 進 Maw of the Necrogond 前打倒。 |
| enemy-156 | Baramos’s Lair／BOSS | Baramos | Baramos’s Lair | 前往上層世界最後的城堡內打倒。 |
| enemy-157 | Alefgard／BOSS | Ashdemon | Tower of Rubiss | 與 Soul of Baramos 同場。 |
| enemy-158 | Alefgard／BOSS | King Hydra | Zoma’s Citadel、??? 天界迷宮 | 終盤連戰開場；天界迷宮也可遇到。 |
| enemy-159 | Alefgard／BOSS | Soul of Baramos | Tower of Rubiss、Zoma’s Citadel | 兩地同一圖鑑號。 |
| enemy-160 | Alefgard／BOSS | Bones of Baramos | Zoma’s Citadel | 主線終盤連戰。 |
| enemy-161 | Alefgard／BOSS | Zoma | Zoma’s Citadel | 主線最終戰。 |
| enemy-162 | 破關後／BOSS | Xenlon | Citadel Tower | 塔頂勝利一次登錄；願望的回合門檻另計。 |
| enemy-163 | 破關後／BOSS | Grand Dragon | Temple of Trials | 五試煉完成後到北方最深處擊敗。 |

來源（2026-11-23 查閱）：[GameFAQs PS5 獎盃圖鑑名單](https://gamefaqs.gamespot.com/ps5/466973-dragon-quest-iii-hd-2d-remake/faqs/81593/mate-of-the-monsters)、[GameFAQs 遇敵區域與敵人資料](https://gamefaqs.gamespot.com/pc/466975-dragon-quest-iii-hd-2d-remake/faqs/81633/bestiary)、[RPG Site 查閱遊戲圖鑑步驟](https://www.rpgsite.net/guide/16544-dragon-quest-iii-hd-2d-remake-how-to-access-bestiary)、[Dayngls 163 敵人索引](https://daynglsgameguides.com/2024/11/14/dragon-quest-iii-hd-2d-monster-list/)、[Gamer Guru 圖鑑影片時間索引](https://www.youtube.com/watch?v=5PknVd8yDRI)。163/163 條目與編號齊全。遭遇機率與詳細樓層未一一實機核實，首選點沒有出現時使用表內替代地區或遊戲圖鑑提示。

### 咒文與特技查漏（`tr-21`）

下列清單涵蓋玩家可習得的 **135 種不同項目（66 咒文、69 特技）**。表格按職業找缺項，跨職重複名稱共用一個 ID，使用不同角色分攤即可。每種項目獨立勾選，階段／職業滿足提示由取得紀錄推算。表內空白角色欄不需硬設為職業完成任務。顯示英文原名，繁中名稱無可靠對照的保留英文。所列等級是規劃參考，智慧與習得判定會讓角色較晚學會。實際以該角色遊戲內咒文／特技欄（包含 `???`）和等級提升提示為準。

| 確認位置 | 類型 | 英文原名（分號分隔，每項獨立記錄） | 練成檢查 |
|---|---|---|---|
| 勇者 | 咒文 | Frizz; Heal; Poof; Evac; Sizz; Kaclang; Snooze; Zin; Zoom; Fizzle; Zap; Midheal; Sizzle; Holy Protection; Zapple; Boom; Zing; Kasizz; Fullheal; Kazap; Omniheal | 主線邊打邊學，最後確認 Omniheal（約 Lv39 起）與其餘空格。 |
| 勇者 | 特技 | Flame Slash; Dodgy Dance; Lightning Slash; Defending Champion; Gust Slash; Meditation; Falcon Slash; Gigaslash | 最終 Gigaslash 約 Lv45。 |
| 戰士 | 特技 | Cop Out; Whipping Boy; Mercurial Thrust; Double-Edged Slash; Pressure Pointer; Forbearance; Sword Dance; Metal Slash; Multislice; Cutting Edge | 最終 Cutting Edge 約 Lv48 起。 |
| 武鬥家 | 特技 | Leg Sweep; Flying Knee; Hawkeye Claw; Wind Sickles; Knuckle Sandwich; Double Up; Roundhouse Kick; Multifists; Ripple of Disruption; Critical Claim | 最終 Critical Claim 約 Lv47 起，可用於刷金屬。 |
| 賢者／僧侶 | 咒文 | Heal; Poof; Dazzle; Woosh; Sap; Squelch; Snooze; Acceleratle; Cock-a-Doodle-Doo; Zin; Fizzle; Midheal; Tingle; Kasap; Magic Barrier; Swoosh; Blasto; Moreheal; Whack; Zing; Thwack; Insulatle; Kaswoosh; Fullheal; Kamikazee; Multiheal; Kazing | 可以一位賢者學完本列和下一列。留意 Kazing 約 Lv37 起。 |
| 賢者／魔法師 | 咒文 | Frizz; Buff; Crack; Sizz; Kabuff; Evac; Deceleratle; Bang; Zoom; Drain Magic; Sizzle; Defizzle; Peep; Frizzle; Safe Passage; Crackle; Oomph; Bounce; Boom; Tick-Tock; Kacrack; Fuddle; Kasizz; Sheen; Fade; Kafrizz; Kacrackle; Click; Morph; Puff!; Kaboom; Hocus Pocus | 最終 Hocus Pocus 約 Lv40 起。 |
| 盜賊 | 咒文 | Snoop | 約 Lv20 起，調查地下藏物時實用。 |
| 盜賊 | 特技 | Sandstorm; Sleepy Slap; Propeller Blade; Shocking Slash; Nose for Treasure; Assassin's Stab; Padfoot; Hypnowhip; Persecutter; Backdraft | 最終 Backdraft 約 Lv33 起。 |
| 商人 | 特技 | Stone's Throw; Muster Strength; Dig; Service Call; Helichopter; Call to Arms | 最終 Call to Arms 約 Lv36 起。另創一名低等商人處理 Merchantburg，主力商人可留隊練技。 |
| 遊人 | 特技 | Sobering Slap; Whistle; Kerplunk Dance; Spooky Aura; Egg On; Harvest Moon; Hustle Dance; Channel Anger | 最終 Channel Anger 約 Lv45 起。Lv20 直轉賢者前，仍有後段特技要由另一角色補，或讓該角色後續回練遊人。 |
| 魔物使 | 特技（等級） | Tongue Lashing; Soothing Song; Animal Instinct; Emergency Groom; Attack Attacker; War Cry; Tongue Bashing; Flame Breath; Boulder Toss; Burning Breath; C-c-cold Breath | 最終 C-c-cold Breath 約 Lv44 起；另有下列 6 隻數門檻。 |
| 魔物使 | 特技（收容） | Call of the Wild; Monster Pile-On; Lashings of Love; Wild Side; Focus Pocus; Fog of War | 隊伍累計收容依序 3／10／30／50／80／100 隻。達門檻後讓該魔物使在隊戰勝，若尚未習得再升一級並回查特技欄。Wild Side 更新後消耗 30 MP。 |

清單實作時分享 `(kind, canonicalKey)`，按已核實的英文原名建立固定鍵。如 `spell:frizz`、`ability:wild-side`，Sage／Mage／Hero 查到的 Frizz 只計一次。咒文類如 Snoop 仍依遊戲分類放入咒文，友善怪物與敵人專用招式、裝備發動效果排除。完成數達理論 135 時提示玩家到主機確認；本頁每項只是站內人工進度，沒有 PS5 存檔或 PSN 自動查詢。

咒文／特技證據（查閱 2026-11-23）：[GameFAQs PS5 咒文／特技對照與變動習得說明](https://gamefaqs.gamespot.com/ps5/466973-dragon-quest-iii-hd-2d-remake/faqs/81633/miscellaneous)、[Realm of Darkness 各職業清單](https://www.realmofdarkness.net/dq/hd2d-dq3-classes/)、[GameWith 日文技能清單](https://gamewith.jp/dq3hd2d/463266)、[魔物使收容門檻](https://dragon-quest.org/wiki/List_of_recruitable_monsters_in_Dragon_Quest_III_HD-2D_Remake)、[GameFAQs PS5 咒文特技獎盃指南](https://gamefaqs.gamespot.com/ps5/466973-dragon-quest-iii-hd-2d-remake/faqs/81593/able-conjurer)、[官方更新公告](https://www.square-enix-games.com/en_GB/documents/dragon-quest-iii-hd-2d-remake-update-notice)。各攻略所報首次學會等級不同時，介面應以角色目前的實機習得狀態為驗收依據。

## 4. PS5 獎盃清單（42 座）

本體單組 `NPWR42614_00`。下表依 PSN 顯示順序，`tr-01` 至 `tr-42` 為本站穩定 ID。等級合計白金 1、金 4、銀 6、銅 31。※ 為 PSN 隱藏獎盃，正式介面仍可顯示名稱和精簡操作，不寫劇情。繁中、英文名稱均採 PSN 名稱，操作為查證後整理。首次進入以未取得篩選，操作只在玩家確認 PS5 已取得後勾選。遊戲條件已滿足時可提示「待確認跳盃」。

| ID | 等級 | 繁中／英文 | 跳盃操作與順路時機 |
|---|---|---|---|
| `tr-01` | 白金 | 羅德的勇者／A Legend Is Born | PS5 確認其餘 41 座後查看白金，再獨立勾選。 |
| `tr-02` | 銅 | 踏上冒險之旅／Adventure Underway | 開局在 Aliahan 組好隊後踏出城鎮。 |
| `tr-03` | 銅 | 遼闊無垠的世界／The World Awaits | 炸開路徑、通過 Shrine of Promise 並離開；順路完成 Monty 的友善怪物教學。 |
| `tr-04` | 銅 | 就饒了我吧！好吧？好吧？／Dishonourable Defeat | 打倒 Skyfell Tower 頂端的 Robbin' 'Ood；撿王冠回 Romaria 順解 `tr-40`。 |
| `tr-05` | 銅 | 搶奪鑰匙的惡魔／Ripper Ripped | 金字塔解開機關後打倒 Ripper of the Rift，拿魔法鑰匙；黃金爪另見 `tr-42`。 |
| `tr-06` | 銅 | 再見了！／Double Defeat | Baharata 東北 Kidnapper's Cave 再打倒 Robbin' 'Ood，接回 Baharata 取得黑胡椒。 |
| `tr-07` | 銅 | 我把船隻賜給你！／Sea Legs | 把黑胡椒交給 Portoga 的國王，取得船。 |
| `tr-08` | 銅 | 食人怪物的真相／Orochi Ousted | Jipang 東側洞穴打倒 Orochi、跟進傳送點再打一場，完成後拿紫色寶珠。 |
| `tr-09` | 銅 | 肚臍深處之戰／Chiromassacre | Lanson 從神殿後方進 Gaia's Navel，帶單人深入並打倒 Chiromancer／Madvlad，領藍色寶珠。 |
| `tr-10` | 銅 | 幸福的亡者樂園／Playing with the Dead | Theddon 夜晚用最後鑰匙開監牢並對話，擊敗 Dying Fires，領綠色寶珠。 |
| `tr-11` | 銅 | 映照真實之鏡／Mirror, Mirror... | 先到 Manoza Cave 取 Ra's Mirror，夜晚在 Manoza Castle 的寢室調查國王、用鏡並打倒 Boss Troll。 |
| `tr-12` | 銅 | 火山的恩怨／Grudge Match | 持 Mountaincleaver 到 Necrogond 火山擊敗 Garboyle，再使用劍開啟路徑。 |
| `tr-13` | 銅 | 時機已至／Everbird Awakened | 集齊六色寶珠，在 Shrine of the Everbird 放置並復活 Ramia。 |
| `tr-14` | 銅 | 魔王討伐／Baramos Bested | 飛到 Baramos's Lair 並打倒 Baramos。 |
| `tr-15` | 銅※ | 阿雷夫加爾德的大地／Deeper Underground | Baramos 後完成 Aliahan 回報，到 Castle of the Dragon Queen 取 Sphere of Light，再前往 Pit of Giaga 抵達 Alefgard。 |
| `tr-16` | 銅※ | 大地的創造者／The Almighty | 帶 Faerie Flute 到 Tower of Rubiss 5F，擊敗守關 Boss 後對石像吹笛。 |
| `tr-17` | 銅※ | 前往魔島／Rainbow, Rainbow | 以 Staff of Rain、Sunstone、Sacred Amulet 換 Rainbow Drop，在 Rimuldar 西北的指定海岸使用。 |
| `tr-18` | 銀 | 然後全新的傳說由此開始……！／Seeds of Salvation | 打倒 Zoma，完成後續返城與結局並保存通關檔。 |
| `tr-19` | 金 | 怪物獵人／Mate of the Monsters | 討伐圖鑑登錄 `001–163`；每種須打倒，含通關後 Xenlon、試煉神殿敵人與 Grand Dragon。用遊戲內討伐清單依編號查缺。 |
| `tr-20` | 金 | 道具收藏家／Item Aficionado | 遊戲內取得道具「種類」達 250；城鎮容器、寶箱、閃光點和商店順路增加種類。回查 Misc／Info 的種類統計。 |
| `tr-21` | 金 | 咒文特技大師／Able Conjurer | 隊伍／登錄角色分攤學會全部不同咒文、特技。賢者可涵蓋法師與僧侶的相同咒文；魔物使還須收容 100 隻並確認 Fog of War 已習得。見咒文特技清單。 |
| `tr-22` | 金 | 這是給你的，收下吧／Grand Designs | 解鎖 Temple of Trials、通過五試煉後，20 回合內打倒 Grand Dragon 拿黃金紀念章。想保留再戰機會就先分檔，10 回合內擊倒後該檔無法再戰。 |
| `tr-23` | 銀 | 那麼……再會了！！／Farewell, Mortal | 通關後在 Citadel Tower 頂端打 Xenlon。依序 35／25／15 回合以內合格，第三次起每次皆 15；一次兌一願，共兌 7 個，最後兌 More Guns 'N' Buns。 |
| `tr-24` | 銀 | 怪物大師／Monster Monitor | 收容 121 隻個體；最後回任一競技場找 Monty 對話及確認獎盃。 |
| `tr-25` | 銀 | 徽章收藏家／Many a Medal | 收 110 枚小徽章，回 Aliahan 井內找徽章伯伯領齊所有獎品。最終獎品為 Exotoga。 |
| `tr-26` | 銀 | 怪物競技冠軍／Monster Champion | 完成各地競技等級，通關後向 Xenlon 許新競技場願望，再到 Jipang 井內擊破第 11 級（SSS）。 |
| `tr-27` | 銀 | 戰鬥大師／Brilliant Battler | 累計勝利 1,000 場。優先在打圖鑑和練職時一起累積，最後再看遊戲 `Battles Won` 補場次。 |
| `tr-28` | 銅 | 閃亮獵人／Sparkle Spotter | 調查 100 處原野閃光點。道路與海上亮點順路撿。 |
| `tr-29` | 銅 | 大富翁／Much Ado about Money | 冒險累計賺取 100,000 G，支出後仍保留累計。依各競技場首次通關、一般戰鬥及探索累積。 |
| `tr-30` | 銅 | 寶箱獵人／Tonnes of Treasure | 累計開 100 個寶箱，主線和收集地城逐一調查實體箱。 |
| `tr-31` | 銅 | 狩獵金屬之路／Metallic Masher | 首次打倒金屬史萊姆或流浪金屬史萊姆；初期在 Tower of Transcendence 可順路嘗試，練功攻略另列補救。 |
| `tr-32` | 銅 | 轉職新鮮人／Juggling Jobs | 非勇者隊員 Lv20 起在 Alltrades Abbey 首次轉職，安排與 `tr-38` 同一趟。 |
| `tr-33` | 銅 | 啊～睡得真香／Wakey-Wakey, Rise and Shiiine | 早期 Norvik 找醒著的老人、造訪 Faerie Village、去 Underground Lake 拿 Dreamstone，回找精靈女王換 Wakey Dust，在 Norvik 使用。可回補。 |
| `tr-34` | 銅※ | 最強的頭盔／Heroic Headwear | 地上 Mur 市場由東側進入、和「！」NPC 對話後找櫃台取 Ortega's Helm；Alefgard 到 Quagmire Cave 找「！」NPC，回 Reeve 東北屋找老人取 Wrecking Ball，到 Gaia's Navel B3 南端炸開取 Zenithium，與頭盔交 Shrine of the Dwarf 的矮人。 |
| `tr-35` | 銅※ | 傳說之劍／Stately Sword | Damdara 馬房撿 Orichalcum、Cantlin 西側屋 2F 拿 Broken Blade、與 Kol 道具店 2F 鐵匠談話，再去 Jipang 西北屋取 Forging Hammer，回 Kol 交齊三件。 |
| `tr-36` | 銅※ | 喔喔！我的朋友！／Rip-Off Merchant | Asham 西北商人選便宜貨，喊價後可連拒絕 3 次再買減少花費。要省下全部額外支出，可先手動存檔，確認跳盃後讀檔。 |
| `tr-37` | 銅※ | 你還真有興致啊／Puffection | 夜晚在 Asham 中西側屋外跟女子說話，把男性外觀隊員排第 1 位，沿對話答應，體驗後離開建築。 |
| `tr-38` | 銅 | 神選之人／Sage Advice | 在 Alltrades Abbey 把 Lv20 非勇者轉賢者：遊人可直轉，其他職使用 Words of Wisdom（Tower of Transcendence 可取）。 |
| `tr-39` | 銅 | 相遇在酒館／Join the Party | Aliahan 到 Patty's Party Planning Place 加入至少一位隊員，與開局配隊併做。 |
| `tr-40` | 銅 | 努力治理這個國家吧／Regal Ruler | Skyfell Tower 贏第一次 Robbin' 'Ood 後拾取王冠拿回 Romaria，接受國王禪讓。之後到當地怪物競技場與原國王說話交還王位才可離城；當場拒絕可回來重談。 |
| `tr-41` | 銅 | 居然會死掉，真是丟人！／Undoing Death | 先手動存檔，切普通難度以上讓全隊戰敗，再選「在教會復活」。確認跳盃後可讀原手動檔回復金幣和隊伍。單人復活服務、從自動存檔繼續，以及 Dracky Quest 不死模式皆不能觸發。 |
| `tr-42` | 銅 | 金字塔的祕寶／Finders Keepers | 建議先過主線拿魔法鑰匙、補草藥並存檔。金字塔左入口下 B1，調查西北房左側壞雕像開密道，沿 B2 到石棺取黃金爪，原路帶出地下。地下不能施咒，取爪後高遇敵，可較晚回補。 |

### 白金收尾檢查

- Xenlon 七願個別記錄。前六項可任選：空白項（開試煉神殿）、新怪物競技場（開 Jipang 井）、強力武器（Rubiss's Sword）、復活 Ortega、成為時髦勇者、取得 Guns 'N' Buns；七個願望中的最後一個為 More Guns 'N' Buns。建議先取空白與新競技場，第三才拿武器，其餘照需要選。要穩定打到 15 回合內再連刷。若攻略對門檻有出入，採多方一致的 35／25／15，以遊戲內 Xenlon 提示為最後判準。
- 競技主線順路打 Romaria 第 1–2 級、Isis 第 3–4 級、Manoza 第 5–7 級、Cantlin 第 8–9 級；通關後 Jipang 第 10–11 級。每次競技突破後才勾該級，最後再確認 PS5 的 SSS 獎盃。
- 第一次到試煉神殿時宜確認東側展示裝備是否齊備，包括王者之劍、光之頭盔；西側交消耗品前先保留 10 份 Elfin Elixir（PS5 1.1.0.0 已下調）。南側門檻 100 隻友善怪物，與習得魔物使最終收容技能同一門檻。Grand Dragon 的擊倒登錄與 20 回合內拿紀念章為兩個條件。擊倒超過 20 回合可再挑戰；需要保留後續重打時先建立獨立遊戲存檔。
- 250 種道具允許不同取得途徑。先用遊戲內計數，差少量時回低階城鎮補購未持有種類、交小徽章和領怪物獎品，再回頭查發亮點與容器。無須為此盃刷滿全部道具或刷每種怪物掉落。

獎盃證據（查閱 2026-11-23）：[PSRay 繁中獎盃](https://psray.net/trophies/29978?lang=zh-Hant)、[PSRay 英文獎盃](https://psray.net/trophies/29978?lang=en)、[PS5 獎盃等級交叉核對](https://trophieshunter.com/games/dragon-quest-iii-hd-2d-remake-ps5)、[GameFAQs PS5 獎盃攻略](https://gamefaqs.gamespot.com/ps5/466973-dragon-quest-iii-hd-2d-remake/faqs/81593)、[Dayngls 獎盃攻略](https://daynglsgameguides.com/2024/11/14/dragon-quest-iii-hd-2d-remake-trophy-guide-roadmap/)、[RPG Site 分段攻略](https://www.rpgsite.net/guide/16522-dragon-quest-iii-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-friendly-monsters-step-by-step-guide)、[Game8 神龍與試煉攻略](https://game8.jp/dq3/146953)、[GameWith 試煉資料](https://gamewith.jp/dq3hd2d/474828)、[小徽章領獎階梯](https://dragon-quest.org/wiki/List_of_mini_medal_locations_in_Dragon_Quest_III_HD-2D_Remake)、[官方更新公告](https://www.square-enix-games.com/en_GB/documents/dragon-quest-iii-hd-2d-remake-update-notice)。

## 5. 建議攻略頁｜配隊、轉職、練等、裝備與後期

這一頁用「我打不過」「我要轉職」「我要練等」「我要找裝備」「我要打試煉」做頁內導覽與深連結。頁首依 Roadmap 已完成的里程碑提示推薦卡片，仍可自由切換階段。每張卡片直接顯示前置、怎麼做、何時離開此練功點，展開才看打法細節與其他選擇。技能名、地名及裝備名以英文做別名搜尋。未跟繁中遊戲畫面核對的名稱保留英文。推薦路線是方案，可不勾選。角色訓練表若使用者需要記錄，僅以本機省事選項儲存「分配給誰」以及「已確認此職業所需技能學完」，獎盃連結讀取同一紀錄。

### 配隊與轉職

| 進度 | 可照做的預設 | 何時進下一段 |
| --- | --- | --- |
| Aliahan 建隊 | 勇者、魔物大師（Monster Wrangler）、盜賊、僧侶。到 Patty's Party Planning Place 二樓自建。勇者用迴旋鏢清雜兵，僧侶專職補血，盜賊找寶，魔物大師留在隊伍便能讓遇到的流浪怪物直接加入；時段及地點條件仍需滿足。 | 開了達瑪神殿才考慮轉職。 |
| 金字塔 | 進禁止咒文的區域前，把回復藥、解異常道具放進各人隨身欄。魔物大師的 Soothing Song、Emergency Groom 是特技，能在限制咒文時維持回復。 | 可以撤退補給再重進；隊伍完整才改職。 |
| 達瑪神殿（Alltrades Abbey） | 等級至少 20 的非勇者可轉職，等級回到 1、能力值約減半、已學咒文及特技繼承。想優先有雙系法術，可用 Words of Wisdom 讓僧侶轉賢者，第一本在 Tower of Transcendence 的箱子。另一做法是讓後排僧侶先維持主補，另外培養玩樂者（Gadabout）再轉賢者，玩樂者可免用書。 | 每次只換一人，其他成員帶練到不會拖累主線。 |
| 船／飛行後 | 優先補流浪怪物數而非全員刷級。魔物大師在 10、50、100 隻對應 Monster Pile-On、Wild Side、Fog of War，達門檻後用魔物大師贏一場再檢查技能。Animal Instinct 用來找附近怪物。盜賊確認有 Nose for Treasure（顯示剩件數）、Snoop（標出藏寶點）後，轉職仍可用這兩招。 | 魔物大師打完等級末招與 100 隻技能才離職，建議留至少一名現職到救滿 121 隻，或另收一名低等專門帶路。 |
| 白金技能補強 | 預設三條分工：盜賊→商人→戰士、僧侶→玩樂者→賢者、魔物大師→武鬥家。僧侶的咒文由賢者補齊，可提早離職；想保留僧侶回復，可先把現役僧侶培養至有日常可靠的補血，再趁後期帶玩樂者。若已用書早轉賢者，後期另練玩樂者或轉回來補；別同時犧牲主補與主輸出。 | 每轉一職前，開 `Spells/Abilities` 核對該職業所有 `???` 消失。合計是勇者加七條必學職系，魔法師、僧侶的咒文都由賢者覆蓋。 |

角色性格只影響累積成長。一般選近戰偏力量／耐力、施法偏智慧，先推主線。想換還有性格書及配件。領要發展 Merchantburg 的商人，另外在酒館登記一名即可；主力或已練成的角色可留在隊中。以上建議依 [TIP-02]、[TIP-03]、[TIP-05]。

| 白金職系 | 末期檢核技能 | 參考等級或門檻 |
| --- | --- | --- |
| Hero | Gigaslash | 約 Lv45 |
| Warrior | Cutting Edge | 約 Lv48–50 |
| Martial Artist | Critical Claim | 約 Lv47–49 |
| Merchant | Call to Arms | 約 Lv36–38 |
| Gadabout | Channel Anger | 約 Lv45–46；探索用 Whistle 可較早拿到 |
| Thief | Backdraft | 約 Lv33–35 |
| Monster Wrangler | C-c-cold Breath；Fog of War | 約 Lv44–46；救援 100 隻並在現職取勝確認。保留救援特技的 3／10／30／50／80／100 門檻提示。Game8、攻略大百科和 DQ Wiki 對 Call of the Wild 的門檻皆為 3 隻。 |
| Sage | Hocus Pocus、Kaboom、Kazing | 約 Lv40 起；實際看到所需咒文全集才轉；已學技能受智慧與習得判定影響。 |
| Priest / Mage | 由 Sage 覆蓋 | 已完整練賢者就可跳過重複培養。 |

職業參考等級供抓練功進度，玩家以實際選單為驗收。逐招清單使用隨規格交付的 135 招技能資料，並將共享能力在獎盃覆蓋統計以同一招計，例如賢者和僧侶的 Heal。勇者有自己的技能欄，玩家在遊戲該職系核對；網站同時提供職系卡、末招檢核及逐招查漏。職業與技能來源見 [TIP-05]、[TIP-06]。

### 練等與金策

| 目前解鎖 | 推薦地點 | 操作與停手條件 |
| --- | --- | --- |
| 達瑪神殿前 | Underground Lake 地下 2F | 解 Norvik 時順手打一輪，利用地城回復點。能穩定打下一區就繼續。 |
| 達瑪神殿／轉職後 | Tower of Transcendence 5F | 找 Metal Slime。用有資格裝備的人持 Poison Needle，其他人補普攻、Assassin's Stab 等，先集火一隻解 Metallic Masher。Whistle 可直接進遭遇戰。轉職角色回到可以在一般遭遇中存活，即可續走。 |
| 下層世界 | Rimuldar 周邊，或 Talontear Tunnel 北方史萊姆區 | 找 Liquid Metal Slime。Kol 買 Falcon Blade 讓可裝備的人打兩次，Cantlin 競技場 Rank 9 的 Metal Wing Boomerang 也能打全體並對金屬系加傷。Puff! 需先變身，下一回合吐息，敵人可能先逃。有現成武鬥家再用單體必定會心 Critical Claim，耗 64 MP，留給目標。 |
| 通關後 | ??? 地下 3F | King Hydra 不會像金屬系那樣逃，但會睡眠吐息且耐打；每人帶 Rousing Ring，能快速打倒單隻再刷三隻組合。把練等目標設定成當前缺的技能、回復力或 Boss 回合數，避免把全體 Lv99 當白金前置。 |

缺金幣時，優先清各地 Monster Arena 首通。Cantlin Rank 8（A）100,000G，Rank 9（S）160,000G。神龍願望解鎖 Jipang 井裡的 Rank 10（SS）300,000G、Rank 11（SSS）395,963G，這些是獎金，入場費另計。Rank 11 回刷需 99,999G 入場，四場全勝的重複獎金總額 133,332G，淨賺 33,333G；想解西側試煉先盤點現有物品與首通獎金，常可免去回刷。金幣獎盃用累計收入。見 [TIP-04]、[TIP-05]、[TIP-09]。

| 競技場目標 | 推薦三格 | 怎麼打 |
| --- | --- | --- |
| Romaria Rank 1（H） | Slime＋Spiked Hare＋Antnibbler | 先拿 Romaria 夜間的 Spiked Hare，三隻用進攻作戰。 |
| Romaria Rank 2（G） | Healslime＋Antnibbler＋Bubble Slime | Healslime 在 Khoryv 黃昏，Bubble Slime 在 Skyfell Tower 2F。保留一格能補血的作戰設定，對手睡眠造成敗場可再挑戰。 |
| Ibis Rank 3–4（F／E） | Restless Armour＋Bubble Slime＋Cumaulus（F）或 Healslime（E） | Asham 周邊夜間補 Restless Armour，Ibis 城堡夜間救第二隻 Bubble Slime 能強化同類；F Rank 讓 Cumaulus 用雷屬性清場。 |
| Jipang Rank 11（SSS）首通 | Metal Slime＋Green Dragon＋Mermaniac | 現在只有 Jipang 願望時，可參照收集表救兩隻 Metal Slime、兩隻 Green Dragon，並補齊 Mermaniac。全員均衡作戰，由 Mermaniac 負責回復；若已到神殿，可替換進 Baramonster、Great Keeper、Xenlon。 |
| Jipang Rank 11（SSS）重刷 | Green Dragon＋Great Keeper＋Baramonster | 三隻都到手且打得穩再切全員進攻，未全勝先保留回復策略，避免重刷門票虧損。 |

競技場同種多救能強化上場個體，優先照收集清單補同種不同地點。見 [TIP-09]、[TIP-10]、[TIP-14]。

### 值得順路找的裝備與道具

| 時機 | 什麼值得拿 | 到哪找／怎麼用 |
| --- | --- | --- |
| Aliahan 周邊 | Boomerang、Thorn Whip、Edged Boomerang | Dreamer's Tower 2F 走東北樓梯至 3F 開箱拿 Boomerang，普攻打全體。小徽章 2 枚可領 Thorn Whip 打一群，8 枚可領 Edged Boomerang，也能在 Skyfell Tower 拿到。能清場就把省下的金幣留給回復或防具。 |
| Khoryv／Mur | Poison Needle | Khoryv 箱子、Mur 商店有。留一把給能裝備的人打金屬系。 |
| 金字塔後／海上探索 | Staff of Resurrection | 小徽章 30 枚獎勵，也可在 Tower of Transcendence 東方飛行限定秘密地點找到。交給兼任支援的角色。 |
| 拿到飛行 | Duplic Hat | 飛到 Manoza 西北被山圍住的開口，撿世界地圖閃光點。可用於法系角色連發咒文；暗處或特殊區域的補給仍要準備隨身道具。PS5 v1.1.0.0 起僧侶也能用。 |
| 下層世界 | Falcon Blade、Sage's Stone、Sword of Kings、Auroral Helm | Falcon Blade 可在 Kol 買，普通攻擊兩次。Sage's Stone 先撿 Zoma's Citadel 的一顆，亦有 Lozamii 與試煉神殿來源；放進角色個人欄，可在戰鬥中重複全隊補約 80–90 HP。後兩件的完整取得步驟走 Roadmap 對應獎盃鏈，也是東試煉前置。 |
| 通關後 | Rubiss's Sword、War Drum、Claws/Boomerangs 與 Axes/Staves | Rubiss's Sword 是 Xenlon 願望獎勵之一，作為道具可放 Kazap。War Drum 在試煉神殿入口區西南側火把附近可摸到，物理隊想強化可以帶上。四人先依神殿入口檢查武器分類，裝備強度低但符合類別也可作為過渡。 |

武器、道具資訊見 [TIP-01]、[TIP-07]、[TIP-08]、[TIP-10]。

### 試煉和 Boss 卡片

- **Xenlon 願望順序**：已能穩定輸出時，建議優先選清單最下方空白（開 Temple of Trials），接著開 Jipang 競技場或拿 Rubiss's Sword。若卡輸出，優先用較寬鬆的首願回合拿 Rubiss's Sword，再解鎖神殿和競技場。願望成績門檻依次 ≤35、≤25、其餘 ≤15 回合。收齊其餘不同願望，再選新出現的 More Guns 'n' Buns；獎盃 Farewell, Mortal 等 PS5 確認。若卡 15 回合，可先用已解鎖的空間補裝備、救怪物再回來。見 [TIP-03]、[TIP-10]。
- **神殿北西／北東**：北西全員用爪／迴旋鏢，北東全員用斧／杖。建議守武器限制，依遊戲裝備類別核對。魔物大師轉職後保留技能，能用符合武器限制且耐打的職業補位；必要時可在酒館換臨時隊員。兩區末端各有兩批 Pandora's Box，無法穩定打倒時，可考慮讓能施法的隊員用 Blasto。盒怪或普通敵人的擊破圖鑑要看實機有無登錄，因此至少正攻打倒一隻 Pandora's Box，不把吹飛等同擊破。北東可順撿更新追加的鞭、Duplic Hat。
- **南／東／西**：南側救援 100 隻達標，121 隻仍須為白金收齊。東側展示 Sword of Kings、Auroral Helm、Gringham Whip、Mod Rod，四件會保留；鞭可找 105 枚徽章獎勵，或先到北東試煉取追加箱；主線用過的 Mod Rod 可於 Cantlin Rank 8（A）的首通獎勵重新取得。西側見下表，需要交出並扣掉物品。獎盃實際跳出前保留確認狀態。見 [TIP-01]、[TIP-10]、[TIP-11]。
- **Grand Dragon**：進最終門後先收 Xenwrong（最後一隻流浪怪物）才進王房。收滿 121 後再用 Wild Side（30 MP）＋Monster Pile-On（3–5 段，防禦再高也能輸出）；打手技能可由魔物大師階段繼承。想讓原本走其他職業的打手也學會，救援門檻是全隊共同進度，轉成魔物大師後贏一場即可檢查當前門檻的救援技能，再練到 Lv20 才能轉回。勇者用 Omniheal／Sage's Stone 做團隊維持，能攻擊時用 Kazap 或使用 Rubiss's Sword。讓支援帶異常解除物及 MP 藥，碰到保證睡眠，由沒睡著的成員用 Cock-a-doodle-doo 喚醒，隊上保留已學角色或能使用 Sunstone 的人補位；優先顧回復及防混亂、麻痺和即死。若有練能施 Snooze 且可裝 Duplic Hat 的人，再用多次施法增加睡眠機會，其他人乘機輸出。Dracky Quest 是可在遊戲選擇的低難度路線，能增加容錯；回合數仍要靠輸出。本作白金路線建議打 **11–20 回合**拿 Grand Medal 並保留再戰，戰前用另一個紀錄槽留存，一旦 ≤10 回合擊倒將無法再戰。21–25 回合的硬上限來源有差異，UI 對該區間提示直接核對 Grand Medal，不根據回合數推定跳盃。回合超標可補裝、練級、再戰。見 [TIP-01]、[TIP-03]、[TIP-10]、[TIP-12]。

| 西試煉交付 ID | 交付物 | 數量 | 購買地 | 每個價格 |
| --- | --- | ---: | --- | ---: |
| `trial-west-hardwood-headwear` | Hardwood Headgear | 4 | Khoryv 道具店 | 350G |
| `trial-west-staff-of-sentencing` | Staff of Sentencing | 4 | Baharata 武器店 | 3,900G |
| `trial-west-epic-apron` | Epic Apron | 4 | Merchantburg 第 4 階段起的道具店 | 10,500G |
| `trial-west-slime-earrings` | Slime Earrings | 4 | Kol 道具店 | 950G |
| `trial-west-magic-water` | Magic Water | 25 | Baharata 道具店 | 600G |
| `trial-west-elfin-elixir` | Elfin Elixir | 10 | Faerie Village 先使用 Mod Rod 變成史萊姆或矮人再進店 | 40,000G |
| `trial-west-flame-armour` | Flame Armour | 4 | Rimuldar 裝備店 | 34,300G |

PS5 套用 2025-05-23 起更新後的全額採買估算是 **615,000G**。先核對現有數和交付剩餘量，避免花 400,000G 買 10 瓶又喝掉。建議用數量與已交付狀態分開記，逐項交付後勾選已驗收，列表剩餘及缺額只估算未交的需求。店價依 HD-2D 來源核對，舊版試煉資料的 Elfin Elixir ×25 不適用更新版。[TIP-01]、[TIP-11]、[TIP-13]。

### 攻略頁來源

查閱日期 2026-11-23。官方明示條目見 TIP-01、TIP-02；其餘為攻略與社群資料，相互印證，未在 PS5 實機重跑所有條件。

- [TIP-01] Square Enix 英文 PS5 1.1.0.0 官方更新及官方日文完整履歷（PS5 1.1.1.0 小修）。https://www.square-enix-games.com/en_GB/documents/dragon-quest-iii-hd-2d-remake-update-notice 、 https://www.dragonquest.jp/roto-trilogy/dq3/update/index.html
- [TIP-02] Square Enix 職業、轉職、賢者及競技場介紹。https://www.square-enix-games.com/en_US/news/dragon-quest-iii-hd-2d-remake
- [TIP-03] RPG Site 職業／隊伍建議與 GameFAQs PS5 挑戰條件。https://www.rpgsite.net/guide/16540-dragon-quest-iii-hd-2d-remake-best-classes-to-set-up-create-your-best-party 、 https://gamefaqs.gamespot.com/ps5/466973-dragon-quest-iii-hd-2d-remake/faqs/81593/able-conjurer 、 https://gamefaqs.gamespot.com/switch/321814-dragon-quest-iii-hd-2d-remake/faqs/81593/farewell-mortal
- [TIP-04] Game8／GameWith 練等位置、招式及戰鬥資料。https://game8.jp/dq3/148196 、 https://gamewith.jp/dq3hd2d/471419
- [TIP-05] Dayngls PS5 獎盃攻略、全職技能與解鎖參考，速度和回合要求有跨來源差異。https://daynglsgameguides.com/2024/11/14/dragon-quest-iii-hd-2d-remake-trophy-guide-roadmap/
- [TIP-06] DQ Wiki 攻略資料，特技、召喚救援門檻及習得規則。https://dragon-quest.org/wiki/List_of_skills_in_Dragon_Quest_III_HD-2D_Remake 、 https://dragon-quest.org/wiki/List_of_recruitable_monsters_in_Dragon_Quest_III_HD-2D_Remake 、 https://game8.jp/dq3/653435 、 https://gamepedia.jp/dq3-hd2d/archives/343
- [TIP-07] DQ Wiki 武器及道具。https://dragon-quest.org/wiki/List_of_weapons_in_Dragon_Quest_III_HD-2D_Remake 、 https://dragon-quest.org/wiki/List_of_items_in_Dragon_Quest_III_HD-2D_Remake
- [TIP-08] Gemelog 劍、武器和徽章獎勵對照。https://gemelog.jp/en/games/dragon-quest-3-hd2d/items/
- [TIP-09] Game8 金策及競技場利益。https://game8.jp/dq3/305535
- [TIP-10] RPG Site 完整攻略的區域物品、Xenlon 願望、試煉動線，末王回合敘述須參照 TIP-12 交叉核對。https://www.rpgsite.net/guide/16522-dragon-quest-iii-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-friendly-monsters-step-by-step-guide
- [TIP-11] Game8、GameWith 與日文 DQ 大辭典的 100 隻／西側試煉／北側武器條件。https://game8.jp/dq3/146953 、 https://gamewith.jp/dq3hd2d/474828 、 https://wikiwiki.jp/dqdic3rd/%E3%80%90%E8%A9%A6%E7%B4%B4%E3%81%AE%E7%A5%9E%E6%AE%BF%E3%80%91
- [TIP-12] Game8 末王戰術、GameWith 20 回合及再戰限制、GameFAQs PS5 末王攻略（出現 25 回合或舊技能版本差異）。https://game8.jp/dq3/654568 、 https://gamewith.jp/dq3hd2d/473253 、 https://gamefaqs.gamespot.com/ps5/466973-dragon-quest-iii-hd-2d-remake/faqs/81593/grand-designs
- [TIP-13] DQ Wiki 裁決之杖重製版定價、Game8 Epic Apron 與商人之鎮的最低階段。https://dragon-quest.org/wiki/Staff_of_sentencing 、 https://game8.jp/dq3/141118
- [TIP-14] Game8 與 GameWith 怪物競技場各階級的怪物、時間、作戰與推薦組合。https://game8.jp/dq3/638960 、 https://gamewith.jp/dq3hd2d/464012 、 https://gamewith.jp/dq3hd2d/473471

### 怪物競技場通關清單

順路先登錄各會場。等收容數上升、準備好入場費再出戰，按級數開放。每級手動勾選一次，可從 Roadmap、攻略和獎盃缺項回到同一列。尾盤差資金時優先打可完成的首次通關，並以遊戲畫面確認領獎。隊伍可用同種個體提高該物種參戰強度。下表只列首次重要獎勵及獎金。

| ID | 地點／級別 | 入場費 | 首通重要獎勵 | 首通獎金 |
| --- | --- | ---: | --- | ---: |
| arena-01 | Romaria／1 | 100 G | Bronze Shield、Magic Water ×3 | 800 G |
| arena-02 | Romaria／2 | 200 G | Cloak of Evasion | 1,600 G |
| arena-03 | Ibis／3 | 300 G | Beastly Bullwhip | 2,400 G |
| arena-04 | Ibis／4 | 500 G | Somatic Staff | 4,000 G |
| arena-05 | Manoza／5 | 2,000 G | Cat Suit、Prayer Ring ×2 | 16,000 G |
| arena-06 | Manoza／6 | 3,500 G | Dragonsbane Claws（北西試煉可備用） | 28,000 G |
| arena-07 | Manoza／7 | 5,000 G | Flowing Dress、性格書 | 40,000 G |
| arena-08 | Cantlin／8 | 13,000 G | Mod Rod（精靈商店和東側試煉會用到） | 100,000 G |
| arena-09 | Cantlin／9 | 20,000 G | Metal Wing Boomerang、Elfin Elixir ×3 | 160,000 G |
| arena-10 | Jipang 井底／10 | 36,000 G | Meteorite Bracer、Godbird Sceptre | 300,000 G |
| arena-11 | Jipang 井底／11 | 99,999 G | Hunter's Moon、Yggdrasil Dress Coat、War Drum | 395,963 G |

Jipang 需先許 Xenlon 的競技場願望。第 11 級通過才檢查 Monster Champion。費用與獎品取自兩份競技場資料交叉核對。[GameFAQs 競技場](https://gamefaqs.gamespot.com/xbox-series-x/466974-dragon-quest-iii-hd-2d-remake/faqs/81601/monster-arena-and-recruitment) · [Realm of Darkness 競技場](https://www.realmofdarkness.net/dq/hd2d-dq3-monster-arenas/)

## 6. 資料契約與持久化

既有 repo 優先。新專案可用 Vue 3、TypeScript、Vite，以可靜態打包的本機瀏覽器應用交付。遊戲資料由文件中的表格轉成版控中的 typed seed 或 JSON，附本機驗證命令。頁面以模組安裝方式存在，提供固定路由。遵循既有路由、UI kit、IndexedDB 與備份契約。獨立專案可採 IndexedDB 保存紀錄，在同一個 write transaction 內比對修訂並寫入。採瀏覽器與來源所屬的資料隔離。啟動說明固定本機來源與 port，說明換 profile、清除站點資料和換埠前如何備份。

| 類別 | 最低欄位與行為 |
| --- | --- |
| `GameCatalog` | `gameId=dragon-quest-iii-hd-2d-remake`、`platform=ps5`、`versionBaseline`、`dataVersion`、`sources`、`phases` 與下列實體。資料集內只有事實與攻略，無個人進度。 |
| `RoadStep` | `id`、`phaseId`、`order`、`label`、地點 ID、`requirements`、`actions`、`doneWhen`、`beforeLeaving`、`warnings`、`recovery`、`relatedIds`、`requiredForRoute`、`sourceIds`。階段和步驟各自穩定，支線順序顯示但不阻斷主線。 |
| `CollectionEntry` | 保留附件表的 `mm-NNN`（徽章）、`fm-NNN`（招募個體）、`enemy-NNN`（討伐圖鑑編號），以表中 ID 為正式鍵。含分類、名稱／英文／已核實別名、出現地點、區域、條件、動作、`firstPracticalStepId`、`returnStepIds`、`sourceIds` 及證據等級。相同場所與物種的不同出現點各保留 ID，未來修正座標或時間也保持 ID。 |
| `Trophy` | PS5 表內的穩定 ID、`trophySetId`（若可查）、繁中及英文題名、等級、分類、操作條件、關聯步驟及收藏、`suggestedCondition`。多條件需全數達標才提示。PS5 的既有空白或歷史跳盃狀態不得由共用資料推估寫入。 |
| `TargetCounter` | `mapSparkles` 100、`chestsOpened` 100、`itemTypes` 250、`battlesWon` 1000、`metalKills` 1、`gold` 100000，另以獎盃表確認遊戲統計口徑與顯示標籤。保留最後更新時間及手動輸入。若獎盃表指出計數無法直接從遊戲介面讀取，標示「手動核對」並提供簡單加減。 |
| `SkillProgress`、`TrialSupply` | 每種能力可透過遊戲職業清單核對與勾選，逐職業線從共用技能記錄推導是否學完，另顯示收容數等獨立門檻。合併重複法術的覆蓋估算，保留其原取得職業。試煉道具儲存需求數、在手數與交付／出示狀態。Hand-in 完成後即使庫存減少，也保留已交付紀錄。 |
| `ProgressRecord` | 鍵為資料集中既有 ID 加作用範圍，如 road step、徽章、招募、討伐、跳盃、願望已選、兌獎已領、供品已交付。單一事實只保存一筆。欄位含值、修訂、最後更新時間。章節閱讀、展開偏好單獨儲存。 |
| `BackupEnvelope` | `format`、`gameId`、`platform`、`schemaVersion`、`dataVersion`、`exportedAt`、進度與可選閱讀偏好。原始資料檔保留。來源版本超過支援或檔案格式錯誤即阻擋。 |

### 寫入、撤銷與匯入

- 操作送出即儲存，完成以資料層提交成功為準。失敗恢復畫面到已保存值，顯示失敗的項目和「重試」，鍵盤焦點保留在原列或就近可操作列。勾選列移出時保留可直接撤銷的訊息。
- 每次寫入紀錄受影響的 ID、原值和提交後修訂。撤銷交易先重讀這些鍵，任一鍵後續有不同修訂時拒絕該次撤銷，保留後寫資料並說明衝突。其他鍵並行更新不影響撤銷。批次變更以一次交易套用。使用 repo 已有跨頁同步方式，否則交易完成用 BroadcastChannel 發送失效通知並重讀。
- 匯出包含完整紀錄與版本，可直接重匯測試。匯入時先解析、驗證 ID、布林／數值、格式與大小，執行已知遷移，列出增減變更和相異值，提供下載現有備份。使用者明確確認後以單一交易套用。預覽後本機修訂有變、匯入檔較舊會覆蓋後寫個人紀錄、驗證失敗或同鍵資料有衝突時停止並要求重新核對。保留舊格式資料在提交前可再次備份。不觸碰 PS5 實際存檔。
- 新版 seed 只更新共用資料。既有 ID 保持不變，必要別名遷移在版本對照表列清楚，未知的舊 ID 不靜默刪除。失敗保持上個可用版本。備份與遷移測試使用隔離 profile／合成資料。
- 通用操作以鍵盤能切頁、搜尋、勾選、撤銷並讀到狀態為標準。即時通知用不搶焦點的可讀狀態區。主要流程不依賴第三方圖片、遠端查詢、PSN 登入或 API。

## 7. 實作階段與驗收

1. **讀 repo 與整備資料**。先核查 `AGENTS.md`、`README`、資料儲存與路由約定、相關模組及若存在的 `docs/UI_PREFERENCES.md`。既有模組優先沿用，清點執行環境、備份格式與 ID。把本文件的資料轉成可驗證的本地資料，保留區域和版本標籤。建置時檢查獨立 ID 數量（42／110／121／163）、獎盃等級分佈（1 白金、4 金、6 銀、31 銅）、135 種咒文／特技去重、11 個競技級別、連結存在、六寶珠、願望、試煉與三類收藏的 Roadmap 錨點。對證據衝突採本文已列口徑，並保留說明。
2. **進度與導航**。先做資料層、跨頁同步、撤銷原子性，建立可選段的 Roadmap 和最小收藏／獎盃視圖。再整合所有已核實地區與實際收藏列，加入深連結和續玩，確保線性階段及可並行區段都能使用。
3. **查漏與建議**。完成各收藏分類、條件獎盃、門檻計數、換職與試煉備料可操作頁，讓回訪從關聯條目跳回正確地點。加入來源與資料狀態；補上已知的獎盃前置警告、版本標籤、來源有出入時的安全目標。
4. **備份、驗證及交付**。完成可預覽匯入、失敗狀態、跨分頁、手機和鍵盤操作。執行 repo 的 lint、型別、測試、build。提供本機啟動方式與驗收紀錄。逐一確認四個主要頁面及資料管理可實際使用。

| 驗收 | 可觀察結果 |
| --- | --- |
| 開新遊玩頁、先讀隱藏迷宮再按「繼續遊玩」 | 回到尚未手動完成的最早主線目標，先讀章節不修改進度。 |
| 從亞里亞罕路線勾一枚小徽章 | 收藏頁未取得少一列，全部分類保留已取得狀態。獎盃狀態不變，徽章計數正確。 |
| 用收藏頁搜尋英文別名、圖鑑 ID 或繁中名稱，再切主功能回來 | 深連結例外可看指定項目。一般導航回來重設搜尋和篩選，於原頁勾選則保留搜尋。 |
| 核對晚間／後期才能招募的怪物 | 首訪提醒不顯示成當下可捕獲，回收階段提供正確方法，兩處都讀同一筆進度。 |
| 六寶珠用不同順序勾選及其餘條件提示 | 不硬鎖建議順序；缺任一必要寶珠，續玩仍定位可取得的缺項。手動確認跳盃前，條件達成只顯示待確認。 |
| 完成 Grand Dragon 及最後願望前閱讀 | 戰前看得到回戰限制與分開存檔提醒，首次必須知道在哪裡找 Xenwrong 及何時領 Grand Medal。 |
| 勾完一列再關頁重開 | 進度正確讀回；閱讀位置可復原；未完成與收合規則仍適用。 |
| 故意使寫入中斷，然後修復再按重試 | 原資料留存、顯示失敗；重試成功才更新，無假成功或重複計數。 |
| 分頁 A 勾一列，分頁 B 改同列，A 撤銷；以及 B 改另一列再測一次 | 同鍵後寫保留且明確回報衝突。不同鍵能各自保存，A 只反轉自己那筆。 |
| 匯出合成紀錄後，預覽匯入、還原以及測試不相容或過期備份 | 差異可核對，未確認無變更；還原結果逐筆相符。遇衝突或不支援時，拒絕寫入。 |
| 360 px 手機與鍵盤查找／續玩 | 可讀步驟及每列限制，可勾選、撤銷、查來源。項目移除後焦點留在相鄰操作，無跳回頁首。 |

## 8. 來源、覆蓋與風險

| 代號 | 來源（皆於 2026-11-23 查閱） | 適用範圍 |
| --- | --- | --- |
| S01 | [PlayStation 台灣](https://www.playstation.com/zh-hant-tw/games/dragon-quest-iii/) | 官方 PS5、畫面語言、繁中名稱與內容範圍。 |
| S02 | [Square Enix 日本版更新履歷](https://www.dragonquest.jp/roto-trilogy/dq3/update/index.html) · [Square Enix 英文版五月更新](https://www.square-enix-games.com/en_GB/documents/dragon-quest-iii-hd-2d-remake-update-notice) | 官方 PS5 1.1.1.0、1.1.0.0 技能、獎盃補判定、試煉道具調整。 |
| S03 | [PSRay 繁中 PS5 獎盃](https://psray.net/trophies/29978?lang=zh-Hant) · [PSN 100% 獎盃](https://psn100.net/game/50425-dragon-quest-iii-hd2d-remake/cstanci) | PS5 公開獎盃資料庫，獎盃清單與等級。 |
| S04 | [GameFAQs PS5 攻略](https://gamefaqs.gamespot.com/ps5/466973-dragon-quest-iii-hd-2d-remake/faqs/81593) · [Dayngls 獎盃攻略](https://daynglsgameguides.com/2024/11/14/dragon-quest-iii-hd-2d-remake-trophy-guide-roadmap/) | 條件及 PS5 證據，早期攻略須比對之後的補丁與回合門檻。 |
| S05 | [RPG Site 主線、收集與破關後路線](https://www.rpgsite.net/guide/16522-dragon-quest-iii-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-friendly-monsters-step-by-step-guide) | 地點順序、解鎖與可回收路徑。另用本文各段列出的日英來源交叉核對。 |
| S06 | [GameFAQs 裝備與物品表](https://gamefaqs.gamespot.com/pc/466975-dragon-quest-iii-hd-2d-remake/faqs/81633/equipment-and-items) · [TrueAchievements 物品條件回報](https://www.trueachievements.com/a456367/item-aficionado-achievement) | 跨平台補量來源，當作裝備、商店與玩家回報參考，不取代 PS5 公告。 |

本文直接收錄白金逐項追蹤所需的獎盃、小徽章、友善個體與討伐條目。覆蓋率以逐列紀錄的張數計，不代表已在 PS5 逐點實測。相異物品、寶箱與世界閃光點提供門檻計數和地區查漏，範圍保留在獎盃需求。來源頁可以核對遇怪條件或位置。未核實繁中譯名、顯示次序、隱藏計數實際更新時點應用遊戲介面複查。早期攻略對活動閾值、重複願望、存檔與部分合資格裝備有分歧時，以 PS5 更新公告和路線中可保證的做法標記。這些文字差異不阻塞進度功能；如果要顯示為官方精確門檻，須以更新後 PS5 實測或同等證據確認。運作期間遇條件達成卻未跳盃，先重核遊戲條件，再從遊戲 Misc. → Info 嘗試觸發補判定；實際跳盃後才勾選。

## 9. Codex 開工指令

> 請在目前已授權的工作區 `<GAME_COMPANION_REPO>` 依 `dragon-quest-iii-hd-2d-remake_GAME_COMPANION_SPEC.md` 實作《勇者鬥惡龍III HD-2D Remake》PS5 本體白金私人控制台。先讀適用的 AGENTS.md、README、架構和進度／模組契約，以及存在時的 docs/UI_PREFERENCES.md，確認目前工作目錄、相關模組和檔案真實存在。既有 repo 路徑未知，請以使用者實際開啟或指定的位置代入。保留其他遊戲、既有資料和已發布 ID。
>
> 交付可依實際遊玩順序操作的 Roadmap，路途中顯示合適的獎盃條件、收藏、前置警示與回收方式。交付收藏清單、PS5 42 盃手動確認頁、練等配隊與裝備建議頁，加上本機持久化、精準撤銷、跨頁同步、備份及差異預覽還原。直接使用本文件查證的逐列資料，先解決關聯驗證，避免要求玩家另到外部攻略才能知道站內下一步。以版本 1.1.1.0 為基準，內容用繁中並保留英文對照。只用步驟描述遊戲進程。
>
> 在授權範圍內連續完成資料整備、功能實作、驗證與修正。更新保護個人紀錄，使用合成資料驗證寫入失敗、撤銷衝突、重啟、還原與版本遷移。交付本機啟動的實際指令、完成度、驗收結果、需確認事項與檔案路徑。維持本地私人用途。
