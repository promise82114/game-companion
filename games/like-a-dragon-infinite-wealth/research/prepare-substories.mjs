// 編輯用的事實整理；僅產生本目錄 substories.json，不連網、不改進度。
import fs from 'node:fs/promises';
const date='2026-11-27',faq='https://gamefaqs.gamespot.com/ps5/409974-like-a-dragon-infinite-wealth/faqs/81106/';
const sources=[
 ['SSRC01','PowerPyx：52條支線總覽','https://www.powerpyx.com/like-a-dragon-infinite-wealth-substories-guide/'],
 ['SSRC02','CyricZ：第3章支線',faq+'chapter-3-substories'],
 ['SSRC03','CyricZ：第4章支線',faq+'chapter-4-substories'],
 ['SSRC04','CyricZ：關係支線',faq+'romance-substories'],
 ['SSRC05','CyricZ：第1章支線',faq+'chapter-1-substories'],
 ['SSRC06','CyricZ：第2章支線',faq+'chapter-2-substories'],
 ['SSRC07','CyricZ：第5章支線',faq+'chapter-5-substories'],
 ['SSRC08','NightlyGamingBinge：SS38道館位置','https://nightlygamingbinge.com/like-a-dragon-infinite-wealth-the-ceo-of-suji-substory/'],
 ['SSRC09','NightlyGamingBinge：SS40道館位置','https://nightlygamingbinge.com/like-a-dragon-infinite-wealth-a-true-gym-battle-substory/'],
 ['SSRC10','GamerGuides：SS52送禮與結局','https://www.gamerguides.com/like-a-dragon-infinite-wealth/guide/substories/relationship/substory-52-guide-surviving-paradise-like-a-dragon-infinite-wealth'],
 ['SSRC11','玩家實測回報：關係對話人格門檻（社群）','https://steamcommunity.com/app/2072450/discussions/0/797837596195618549/'],
 ['SSRC12','RPG Site：支線流程交叉核對','https://www.rpgsite.net/guide/15392-like-a-dragon-infinite-wealth-substories-guide-walkthroughs-for-every-substory'],
 ['SSRC13','CyricZ：第6章支線',faq+'chapter-6-substories'],
 ['SSRC14','CyricZ：第9章支線',faq+'chapter-9-substories'],
 ['SSRC15','CyricZ：四天王',faq+'the-discreet-four'],
 ['SSRC16','CyricZ：江湖寶貝競技場',faq+'sujimon-stadium'],
 ['SSRC18','Neoseeker：主線教學及第6章事件','https://www.neoseeker.com/like-a-dragon-infinite-wealth/walkthrough/Substories4'],
 ['SSRC19','Neoseeker：第1～10條支線','https://www.neoseeker.com/like-a-dragon-infinite-wealth/walkthrough/Substories1'],
 ['SSRC20','CyricZ：第5章主線與迷宮入口',faq+'chapter-5-suspicious-minds'],
 ['SSRC17','Sirus Gaming：SS04觸發街角','https://sirusgaming.com/like-a-dragon-infinite-wealth-substory-4-busted-guide/']
].map(([id,label,url])=>({id,label,url,checkedAt:date}));
const rows=[];
function add(n,nameZh,minChapter,region,location,unlock,prerequisites,steps,completion,tips=[],refs=[]){rows.push({id:'SS'+String(n).padStart(2,'0'),nameZh,minChapter,chapterId:'chapter-'+String(minChapter).padStart(2,'0'),city:n<3?'異人町':'夏威夷',region,location,unlock,prerequisites:prerequisites.map(n=>'SS'+String(n).padStart(2,'0')),timeOfDay:'依現場事件圖示；若沒有下一段標記，離開區域後返回。',steps,completion,tips,sourceRefs:['SSRC01',...refs],checkedAt:date});}
add(1,'街頭電台與播放清單',1,'主線教學','異人町遊民村外的必經街道；第1章帶酒去找村長的主線途中。','第1章主線自動觸發，無額外支線前置。',[],['帶著酒沿主線往遊民村走，介入電台主持人被搭訕的事件。','打贏事件戰鬥，與電台主持人完成對話。'],'事件結束、手機新增 Playlist 播放清單功能。',[],['SSRC05','SSRC19']);
add(2,'江湖寶貝圖鑑再啟動',2,'主線教學','異人町；春日背上赴夏威夷行囊後，從住處下到街道的主線途中。','第2章出發準備劇情，自動觸發。',[],['出門後處理街頭戰鬥。','觀看博士重新安裝 Sujidex 的事件。'],'手機可使用敵人圖鑑。',['先前一般遇敵不會因此全部補登；圖鑑與捕捉是不同系統。'],['SSRC06']);
add(3,'瘋狂外送初體驗',3,'主線教學','西威基基 Jeff’s Tacos 餐車；跟著第3章賺取生活費的主線標記。','第3章主線自動觸發。',[],['與餐車旁的外送員交談並接受教學。','騎車拾取餐點、送到指定客人，完成首次 Crazy Delivery。','結算後回到對話，取得主線要求的生活費。'],'第一次外送教學與結算對話完成。',['PowerPyx總表把本條寫作第2章；採CyricZ第3章分類，與主線路線一致。'],['SSRC02']);
add(4,'外派幫手回歸',3,'主線教學','Waikiki St. 與Kaku Ave. 轉角、Jeff’s Taco Truck附近；第3章找Jeff打聽千歲的主線途中。','第3章主線自動觸發。',[],['跟隨主線觀看外派幫手事件。','在教學戰鬥依提示呼叫 Poundmates。','完成戰鬥及後續對話。'],'解鎖戰鬥中的外派幫手功能。',[],['SSRC02','SSRC17']);
add(5,'ALOHA交友教學',3,'主線教學','Revolve 酒吧門口；在酒吧過第一晚後外出。','第3章首次在Revolve休息後的主線事件。',[],['離開酒吧，與 Kei 交談。','按教學向路人打招呼，認識 ALOHA Links。','看完交友教學的收尾對話。'],'ALOHA Links 開放；不是交到50位朋友才算支線完成。',[],['SSRC02']);
add(6,'街頭滑板車',3,'威基基街區','Aloha St. 的 Pigeon Family Market 店外，找 Oka。','第3章可自由探索夏威夷後。',[],['接近Oka並答應試乘 Street Surfer。','依提示完成試乘。','打倒來找麻煩的人，再與Oka交談。'],'取得並解鎖 Street Surfer。',[],['SSRC02']);
add(7,'配對約會教學',3,'威基基街區','Seaside Ave. 與 Waikiki St. 交會的三角公園，海豚雕像附近；之後到 Cream & Berry。','第3章自由探索。',[],['走近雕像觸發Machiko的介紹，答應嘗試配對。','到Cream & Berry建立個人檔案，選擇對象並開始聊天。','依對方興趣選回覆、輸入訊息，完成首次配對教學及收尾。'],'Miss Match 小遊戲正式開放。',['本條是入門教學；SS49則要求10位不同對象的約會，勿與5位約會獎盃混用。'],['SSRC02']);
add(8,'電車抓拍教學',3,'阿羅哈海灘','Aloha Beach 的電車站，搭乘會啟動抓拍玩法的觀光電車。','第3章可搭乘電車。',[],['在海灘電車站上車，觀看攝影師的介紹。','照提示找出並拍攝可疑人物，完成第一趟課程。','看完結算對話。'],'Sicko Snap／可疑者抓拍開放。',[],['SSRC02']);
add(9,'檸檬水與初戀',3,'威基基街區','Waikiki St. 東端的小公園；East Waikiki 的 ABC Store 北側，Tony 的檸檬水攤。','第3章自由探索。',[],['答應幫Tony派發試飲，找說口渴或很熱的人；首輪交4杯。','離開再回攤位，分別完成6杯、8杯的後續兩輪。','再次回攤位推進活動事件，沿標記到Fuji St. 處理Tony叔叔的戰鬥。','最後到Morning Joe’s 西側標記，觀看Tony的後續事件。'],'最後的檸檬水／告白事件播放完。',['派發時避開行人、車輛；逾時或被撞可重試，不是永久失敗。'],['SSRC02']);
add(10,'龍蝦與寄居蟹',3,'阿羅哈海灘','Aloha Beach，L形混凝土堤北側；在Aloha Beach計程車點東南方附近。','第3章且外派幫手已開放。',[4],['靠近海灘標記觀看Nancy與Olivia事件；離開再回來，調查地上的蟹。','到Momo St. 北端的標記採花，再帶回海灘。','拋出Nancy嚇退男孩；一般／中等力道可拿人格加成。','到Resort Blvd. 的Mocha Mahalo附近聽兩人的對話，再返回海灘。','擊敗抓蟹的人並看完收尾。'],'救回Olivia並完成海灘最後對話。',[],['SSRC02']);
add(11,'餐廳代班備忘',3,'威基基街區','Sakura St. 的餐廳支線標記，與老闆 Obispo 交談。','第3章自由探索。',[],['答應代班；迎賓依序用親切、正式、親切的招呼。','記住訂單：黑衣客是Acai Bowl＋Lau Lau；開朗客是Ahi Poke＋3份Haupia；優雅客是Mahi Mahi。','家庭桌端菜：先選左側Lau Lau，再選中央Kalua Pig。','最後回答老闆名字Obispo，領取代班報酬。'],'整段代班結束並領報酬，即使回答失誤仍可完成。',['上述為較佳答法；全對影響人格與報酬，不是支線完成的必要條件。'],['SSRC02']);
add(12,'善意與花環女孩',3,'威基基街區','Makani Ave. 計程車點對面；找跪在地上的 Sawai。','第3章自由探索。',[],['與Sawai交談，離開再回原處。','第二次談話提到花環女孩（lei girl）可獲人格加成。','之後再離開、返回同一處三次，逐段看完事件。','新標記出現後到Ayame St. 附近，打贏最後戰鬥並看完對話。'],'Ayame St. 的戰鬥與收尾完成。',[],['SSRC02']);
add(13,'搖滾祈雨儀式',3,'阿羅哈海灘','Aloha Beach Juicery 正南方的海灘，找被人搧風的 Kazami。','第3章且完成外派幫手教學。',[4],['與Kazami交談，前往Julia’s Brilliant Design西南側、Aloha St. 上的標記。','詢問儀式時選向神靈求暴風雨可拿人格加成。','回海灘再找Kazami；跟著春日動作轉動左搖桿，速度隨演出加快。','完成整場祈雨演出與最後對話。'],'祈雨演出成功結束。',[],['SSRC02']);
add(14,'沙中尋人送情書',3,'阿羅哈海灘','Kana’s Coconut Juice Stand 東側；衝浪板後方的女孩。','第3章自由探索。',[],['接受送信委託；確認收件人是Tanabe。','到埋在沙中的男孩群，先與所有可交談的男孩對話，收齊線索。','依短髮、眼鏡與面向相鄰男孩等線索找到Tanabe，再交信。','觀看送信後的事件。'],'情書交到Tanabe並播完後續。',['若以面向海洋的排列判讀，來源定位為右起移4格再下1格、面向右鄰者；先核對外觀及對話，避免視角方向混淆。'],['SSRC02']);
add(15,'外國節目的日本武士',3,'阿羅哈海灘','Ocean Boys 餐廳南方、海灘小船旁。','第3章且完成外派幫手教學。',[4],['走近船邊，先擊敗兩名敵人。','答應Nathan協助拍攝節目，依序參加訪問及街頭拍攝。','想拿人格加成可選Rice and Millet、帽子等迎合節目印象的回答。','完成飛鏢段落，再擊敗來搗亂的一群人。'],'最後戰鬥及節目收尾完成。',['對話影響加成；不是必須全選特定答案。'],['SSRC02']);
add(16,'救生員：派水',3,'阿羅哈海灘','地圖 Aloha Beach 字樣正南方海邊／淺水處，找 Raymond。','第3章自由探索。',[],['靠近水邊標記，答應協助Raymond。','在海灘找頭暈、視線模糊等缺水症狀的人交水；小地圖藍點是候選人物。','把要求的水全數派完，再完成結束對話。'],'派水任務結算。',['問錯人只耗時間；以對話症狀判斷，不是每個藍點都要給水。'],['SSRC02']);
add(17,'救生員：走失兒童',3,'阿羅哈海灘','回到第一次遇見Raymond的海灘位置。','完成SS16。',[16],['與正被遊客責難的Raymond交談。','找紅泳衣、戴藍緞帶草帽的小女孩；在搜尋區最東北、樹旁。','接著找白短褲、橘色棒球帽的小男孩；位於海灘最西側。','把兩位孩子找回後看完對話。'],'兩名走失兒童都找到。',[],['SSRC02']);
add(18,'救生員：沙灘英雄',3,'阿羅哈海灘','Raymond所在的救生塔旁；最後往西側海灘。','完成SS17。',[17],['與救生塔旁Raymond交談，開始追小偷。','照QTE提示追上並抓住小偷。','事後到更西側海灘找Raymond，擊敗先前滋事的人。'],'西側戰鬥與救生員收尾完成。',['沿途野生敵人等級可能高於支線敵人；早期可繞開路上戰鬥。'],['SSRC02']);
add(19,'鳥兒回家',3,'阿羅哈海灘','Aloha Beach 最西端附近，調查空躺椅。','第3章且完成外派幫手教學。',[4],['坐上空躺椅觸發鳥巢事件。','按標記在限時內前往商店買鳥飼料；路上避開行人。','完成送飼料後的事件，再擊敗兩名找麻煩的人。'],'最後兩人戰鬥結束。',[],['SSRC02']);
add(20,'武器工坊教學',4,'主線教學','Julie’s Gearworks 主店，Hula Ave.／Resort Blvd. 一帶，跟隨主線標記。','第4章主線帶往工坊時自動開始。',[],['與Julie交談了解製作、強化武器。','依教學製作／強化春日的球棒。','看完工坊教學收尾。'],'工坊武器功能開放。',[],['SSRC03']);
add(21,'職業學校入門考試',4,'港區與商場','Harbor St. 的 Ounabara Vocational School 店外，Anaconda Shopping Center 西側。','第4章自由探索。',[],['靠近學校外人群看事件，與Ikari重逢。','聽取學校說明，參加免費體驗考試。','在限時內答題並通過體驗考試；失敗則重新考。'],'體驗考試通過，學校正式開放。',['本條只需入門考；SS47要全部21種證照，獎盃只需10種。'],['SSRC03']);
add(22,'咖啡館與記者',4,'港區與商場','Cafe SORAMAME 店外，Anaconda Blvd. 北側、Diamond Head 附近。','第4章自由探索。',[],['介入店外兩人與店員的爭執，擊敗兩名Lv13敵人。','離開再回咖啡館，觀看塗鴉事件。','到Twilight Dr.、Hyper Ecstasy附近標記，擊敗記者等四名Lv19敵人。','回答Sorata可拿人格加成；看完咖啡館收尾。'],'記者事件解決，咖啡館恢復營業。',['攝影點 photo-dc-05 也需要此支線完成。'],['SSRC03']);
add(23,'藍色雞蛋花',4,'港區與市中心','先調查Sunset Park涼亭旁及Harbor Park池塘西側兩棵花樹；真正委託在Momo St. 南端附近。','第4章；兩處花樹事件都看過才出現後續。',[],['先到Sunset Park涼亭、Harbor Park池塘西側，兩個標記都要靠近看春日評論。','到Momo St. 與Waikiki St. 一帶旁聽情侶對話，跟隨東邊標記找女孩Aina並答應幫忙。','到Harbor St. 花樹處推進事件，擊敗兩名Lv17相撲敵人。','回Sunset Park原先的樹採藍色雞蛋花。','到Art Walls標記把花交給Aina。'],'Art Walls交花及最後對話完成。',['兩棵樹不是無效標記。Art Walls沿途敵人較強，可避戰前往交花。'],['SSRC03']);
add(24,'夏威夷飄雪',4,'威基基街區','Aloha St. 的 Mohala Shave Ice 店前；後續走Momo St.、Anaconda商場1F及Seaside Ave.。','第4章自由探索。',[],['在刨冰店看製雪事件，往北到Momo St. 標記與男子交談。','到Anaconda Shopping Center 1F中央事件，追上滑走的嬰兒車。','擊敗三名Lv17敵人。','到Seaside Ave.、桐生旅館對面的標記，看最後演出。'],'飄雪結局看完，解鎖権田原的外派幫手。',[],['SSRC03']);
add(25,'音樂人的真心',4,'港區與商場','Anaconda Shopping Center 2F中央中庭，找彈烏克麗麗的 Matt Tropico。','第4章自由探索。',[],['聽Matt演奏後，到WW Market Village西北側看簽名事件。','回商場2F，打倒三名Lv12皮衣男子。','到River St.、Aloha Bridge南側Fancy Cookies附近，看孩子與母親及長椅事件。','到地圖西北Chinatown的Treasure Select Pawn找Matt。','回Aloha Beach Juicery附近找Pete，答應安排演出，觀看最後音樂會。'],'音樂會與Matt的故事收尾。',[],['SSRC03']);
add(26,'商場逃脫節目',4,'港區與商場','Anaconda Shopping Center 2F，找穿藍衣的節目工作人員。','第4章自由探索。',[],['答應參加6分鐘商場逃脫節目。','起點灰門旁筆電：回答Treasure Select Pawn位於2F為True／正確。到中央廣場北側筆電，回答Thorstone是帽子店，取得密碼8931。','用8931打開中央廣場南側紅箱；沿東側走道找木椅下的藍鑰匙，再到東區南端開藍箱。','若被抓就戰鬥；勝利扣20秒，戰敗扣40秒。','收集完再到出口下手扶梯結算；提前下樓會結束節目。'],'節目結束並結算即可；不要求滿分或全寶箱。',['答題、容器與剩餘時間影響獎勵；追求支線完成時先保住到出口的時間。'],['SSRC03']);
add(27,'追求真實的電影',4,'港區與商場','Anaconda Shopping Center 東南角，Riverside Walk／River St. 橋邊。','第4章自由探索。',[],['走近拍攝現場，先打倒兩名敵人。','答應導演參與電影拍攝。','在拍攝段落閃避來車；向前加速、向後減速，調整路線避免碰撞。','完成拍攝並觀看結算事件。'],'電影拍攝結束、導演完成對話。',['閃避表現影響報酬，不必零碰撞才算支線完成。'],['SSRC03']);
add(28,'真正的大場面',4,'港區與市中心','Sunset Park 的Makani Coffee附近長椅，找金髮男子。','完成SS15與SS27。',[15,27],['與長椅男子交談；提到Bony Kashiwa可取得人格加成。','答應拍片；可當場出發或稍後回標記開始。','完成再一段閃車拍攝，注意速度與左右路線。','看完片場最後事件與報酬結算。'],'大場面拍攝與最後對話完成。',[],['SSRC03']);
add(29,'掃地機器人再暴走',4,'港區與市中心','Sunset St. 南側、Harbor Line電車站附近綠色店面前的博士；後續到Docks。','第4章；準備可投資的現金與能應付Lv27的隊伍。',[],['與博士交談，累積投資US$3,000；可分次支付。','等收到聯絡後到Docks標記，參加垃圾辨識測試。','10題依序：垃圾、垃圾、非垃圾、垃圾、垃圾、非垃圾、垃圾、垃圾、垃圾、非垃圾。','離開再回出現的新標記，迎戰Sojimaru V2.1（Lv27）。','先處理兩側裝置：左模組弱冰、右發射器弱電，主體弱火；維持補血後打倒主體。'],'Sojimaru V2.1戰鬥與事件結束。',['US$3,000是啟動投資，不是建議等級。Lv27是敵方等級；可以較晚回來打。'],['SSRC03']);
add(30,'夜空中的飛行怪客',5,'威基基街區','Kaku Ave. 北端與River St. 一帶，找對警察說UFO的女子；後續到WW Market Village北入口附近長椅。','完成SS29，且能在真正夜間回訪。',[29],['旁聽女子向警察報案，再到WW Market Village找她，答應協助。','於夜間返回約定標記；黃昏不算。','使用火箭筒時選第三項、對準中間目標。','迎戰飛行Sojimaru（Lv29），先破壞旁邊的電池充電裝置，再集中槍擊本體。'],'飛行Sojimaru被擊敗，最後事件完成。',['早期可在第5章巡邏後夜間嘗試；若主線時段不符，留到後續夜間或通關自由切時段再做。'],['SSRC03']);
add(31,'Alo-Happy轉職教學',5,'主線教學','WW Market Village 的 Alo-Happy Tours 旅行社。','第5章主線自動帶往旅行社。',[],['與Elizabeth交談，參加首次免費潛水行程。','完成行程解鎖Aquanaut／水上活動職業。','使用Alo-Happy Room並完成轉職教學。'],'轉職系統正式開放。',[],['SSRC07']);
add(32,'攝影尋寶入門',5,'主線教學','WW Market Village 的Alo-Happy店外人形看板與店內櫃台。','完成SS31後離開店面，主線自動觸發。',[31],['離開旅行社，看攝影尋寶介紹。','以手機拍攝店外指定看板（逐點庫photo-wk-05），讓遊戲判定成功。','回店內回報並看完教學。'],'Photo Rally功能開放；不必先拍30張。',[],['SSRC07']);
add(33,'前往咚咚島',6,'主線教學','Aloha Beach 的島嶼事件標記；由海灘前往Dondoko Island。','第6章主線抵達海灘事件。',[],['在海灘擊退欺負海龜的人，觀看前往島嶼、認識島上吉祥物的事件。','翌日與千歲通話後，依教學用球棒打掉10堆垃圾。','擊敗來島上倒垃圾的兩名Washbucklers，看完收尾，確認支線完成提示。'],'清理10堆垃圾、擊退兩名入侵者，完成島嶼入門事件。',['支線結算後仍有強制島嶼教學：收集木材與石材各5個，找Matayoshi製作／擺放家具，完成Day1、調查家中日曆休息，繼續Day2任務後才可搭海豚回夏威夷。','此條不要求咚咚島5星或整個島嶼故事完成；後者是另一條養成與獎盃路線。'],['SSRC13','SSRC18']);
add(34,'夏威夷迷宮教學',5,'主線教學','Riverside Walk 河畔步道的Hawaiian Haunt入口，Aloha Bridge與Harbor St. 之間；第5章巡邏主線帶往此處。','第5章主線自動觸發。',[],['依主線與迷宮入口的人交談；可選給US$10小費取得自信加成，再進入Hawaiian Haunt。','在每層找電梯，往地下第3層前進；先用回復點、存檔點，再打倒頭目救出受困者。','救援後取得Jet Surfboard並返回地面，觀看收尾。'],'夏威夷迷宮正式開放。',['只開放及完成教學不等於30層或EX完成；迷宮進度另外核對。'],['SSRC07','SSRC18','SSRC20']);
add(35,'夜巷的愛與懲罰',6,'夜街與藝術牆','Night St. 計程車點對面的巷子，找 Marian；後續Pearl Ave.、Harbor Park與Art Walls。','第6章完成大道寺據點的主線事件後可開始；後半還要等白天。',[],['到Night St. 巷內答應Marian，推進晚間事件；劇情會損失現金，先準備。','到Pearl Ave. 計程車點附近巷子再見她，打倒男子。','等後續白天（通常第7章再續），到Anaconda一帶的Harbor Park找Zack。','最後回Pearl Ave.、Bullet Hell軍火店附近的Art Walls巷內找Marian，完成最後戰鬥與對話。'],'Art Walls的事件正式收尾。',['第6章可開始，不代表第6章一定能連做完；標記受主線與日夜影響，可留後補。'],['SSRC12','SSRC13']);
add(36,'昔日機械怪獸',9,'阿羅哈海灘','Aloha Beach 西端，兩台挖土機旁。','第9章夏威夷側可自由行動後。',[],['靠近兩台挖土機看事件。','往東找戴高帽的Yasuda交談。','離開區域再回，跟著新的事件標記。','擊敗兩台Lv31挖土機，利用火屬性弱點並注意範圍攻擊。'],'兩台挖土機戰鬥及結尾完成。',[],['SSRC14']);
add(37,'江湖寶貝訓練師啟程',4,'江湖寶貝聯盟','Anaconda Shopping Center 的Sujigami PC Shop／地下競技場，主線自動帶入。','第4章主線抵達商場的江湖寶貝教學。',[],['跟隨博士進入江湖寶貝系統教學。','按指示完成捕捉／訓練師戰鬥並選初始江湖寶貝。','完成介紹與離場對話。'],'訓練師戰、捕捉與聯盟挑戰開放。',[],['SSRC03']);
add(38,'四天王：Jack',4,'江湖寶貝聯盟','Regal Jack Resort；西威基基Aloha St.，Aloha Bridge東側附近的道館。','完成SS37，訓練師Rank達10後收到聯絡。',[37],['用訓練師戰把Rank升到10，讀完挑戰訊息。','到Regal Jack Resort道館，先打兩名門下訓練師。','最後打倒Jack；以等級接近10的隊伍、克制其光屬性的配置準備。','完成道館收尾。'],'Jack敗北，江湖寶貝等級上限開至20。',[],['SSRC08','SSRC15']);
add(39,'四天王：Queen',4,'江湖寶貝聯盟','Aloha Beach 西端封鎖區的Queen道館。','完成SS38，訓練師Rank20的聯絡。',[38],['持續打訓練師升Rank20，再到西側海灘道館。','從海中往最西側游，再上岸進道館；先過兩名中間訓練師的對戰。','以接近20級的隊伍挑戰Queen；準備自然屬性對付冰屬性。','打贏並看道館結尾。'],'Queen敗北，江湖寶貝等級上限開至30。',[],['SSRC15']);
add(40,'四天王：Ace',4,'江湖寶貝聯盟','Little Japan，Fuji St. 東側、Makani Ave. 附近草地旁的公寓道館。','完成SS39，訓練師Rank30的聯絡。',[39],['Rank升30後讀訊息，前往Little Japan道館。','先擊敗兩名門下弟子。','用接近30級、屬性分散的隊伍對戰Ace；留意火、自然、光的混合配置。','打贏並看完道館事件。'],'Ace敗北，江湖寶貝等級上限開至40。',[],['SSRC09','SSRC15']);
add(41,'Sodachi與Joker道館',4,'江湖寶貝聯盟','先回Ace道館看Sodachi事件；後續到碼頭Joker道館。','完成SS40；Rank35只開前半，Rank40才開後半挑戰。',[40],['Rank35收到訊息後回Ace道館，看Sodachi離隊的事件。','繼續升Rank40；再接聯絡回去，取得Super Sodachi。','到Joker道館，連打三名訓練師；途中無法一般休整，先把隊伍補滿。','接著擊敗以暗屬性為主的Joker。','最後還有Kuraki、Yokawa的普通RPG戰鬥（Lv11），打贏並看收尾。'],'Joker及後續普通戰鬥都完成，Sodachi事件收尾。',['Rank35不是本條完成門檻；別在第一封訊息後就勾完。'],['SSRC15']);
add(42,'聯盟冠軍King',4,'江湖寶貝聯盟','從Anaconda Shopping Center的Sujigami PC Shop進入地下競技場，向櫃台選King挑戰。','完成SS41、取得四天王的挑戰資格。',[41],['建議把主力江湖寶貝養到50級附近，再到競技場櫃台報名King。','準備多屬性隊伍；可額外配置冰屬性應對其隊伍。','擊敗King的江湖寶貝隊伍。','隨後還有Lv31的普通RPG戰鬥，打贏並看完聯盟結局。'],'江湖寶貝決賽與普通戰鬥皆勝利，聯盟故事結束。',['50級是隊伍建議，不是春日角色等級硬門檻；實際冠軍獎盃另在PSN頁確認。'],['SSRC15']);
add(43,'朝倉：初戰',4,'朝倉修練','Aloha Bridge／River St. 與西Aloha St. 一帶轉角，找Asakura。','第4章自由探索。',[],['與Asakura交談並接受單挑。','由春日一人迎戰Lv12朝倉；準備回復道具，必要時使用外派幫手。','勝利後完成對話，學習Merciless Melee。'],'首次單挑勝利並學會技能。',[],['SSRC03']);
add(44,'朝倉：再度切磋',4,'朝倉修練','Docks碼頭；完成前戰後依Asakura訊息前往。','完成SS43並收到後續訊息。',[43],['讀朝倉訊息，到碼頭標記交談。','準備春日單人裝備與補品，接受Lv26單挑。','打贏並完成戰後對話。'],'Lv26朝倉單挑勝利。',['輸了可整備再挑；碼頭周邊敵人也較強，可留到後面補。'],['SSRC03']);
add(45,'朝倉：最後訓練',4,'朝倉修練','同一Docks碼頭的Asakura標記。','完成SS44並收到新訊息。',[44],['到碼頭觀看朝倉遭人找麻煩的事件。','依對話接受下一次切磋。','由春日一人打贏Lv33朝倉，完成戰後對話。'],'Lv33朝倉單挑與後續事件結束。',[],['SSRC03']);
add(46,'朝倉：並肩迎戰',4,'朝倉修練','Docks碼頭，讀完SS45之後的新聯絡再去。','完成SS45；能應付Lv43敵人的連戰。',[45],['讀訊息回碼頭，與朝倉準備迎敵。','與NPC朝倉並肩打三波Lv43敵人；春日是可控角色，先保住自己的血量。','連戰前帶足補品，逐波清掉敵人並處理最後一戰。','看完戰後對話與技能／外派幫手解鎖。'],'三波敵人全數擊敗、朝倉故事結束。',['Lv43是敵方等級，不是春日角色的硬性解鎖條件。'],['SSRC03']);
const gifts={
 abc:['ABC禮物組／ABC Store Gift Set','ABC Store（East Waikiki）'],cosmetic:['夏威夷化妝品／Hawaiian Cosmetics','Seaworthy Treasures'],plumeria:['雞蛋花花束／Plumeria Bouquet','Melia’s Leis and Flowers'],hibiscus:['扶桑花花束／Hibiscus Bouquet','Melia’s Leis and Flowers'],shave:['松本刨冰禮物組／Matsumoto Shave Ice Gift Set','Matsumoto Shave Ice'],tobacco:['菸草禮物組／Tobacco Assortment','Cigars in Heaven（Night St.）'],postcards:['明信片組／Postcard Assortment','Bluebird Gallery'],dimsum:['點心組／Dim Sum Assortment','Liang’s Bakery'],beer:['啤酒禮物組／ALOHABEER Gift Set','Loco Fiesta Liquor'],coffee:['咖啡禮物組／Coffee Assortment','Cafe Trip（Anaconda Shopping Center）']
};
function romance(n,name,chapter,location,unlock,pre,trait,keys,extra,completion){
 add(n,name,chapter,'關係支線',location,unlock+'；最後一段關係對話需'+trait+'7。',pre,[...extra,'選Chat／聊天推進關係；依對話要求購買並交付三種禮物，缺人格時先提升再回來。','三次送禮與專屬前置全部滿足後，再次聊天，觀看最後事件。'],completion,['人格分段門檻3／5／7採玩家實測回報；本頁以7作完成準備，若對話未開放以遊戲提示為準。','送禮依當下NPC要求，不是持有禮物或送一次就完成。'],['SSRC04','SSRC11']);
 const r=rows.at(-1);r.personality={trait,finalLevel:7,evidence:'SSRC11'};r.gifts=keys.map(k=>({item:gifts[k][0],shop:gifts[k][1]}));
}
romance(47,'學校櫃台Laura',4,'Ounabara Vocational School櫃台，找Laura Maeda。','SS21之後，通過全部21種證照',[21],'知性',['abc','cosmetic','plumeria'],['先考齊21種證照，包含最終綜合考試；10種證照獎盃門檻不足以完成本條。'],'全部證照、三份禮物與Laura最後事件完成。');
romance(48,'旅行社Elizabeth',5,'WW Market Village的Alo-Happy旅行社櫃台，找Elizabeth。','SS31之後，完成本體全部8種Alo-Happy行程',[31],'開朗',['shave','tobacco','postcards'],['把本體8種Alo-Happy行程全數完成；不要求DLC行程。'],'8種行程、三份禮物與Elizabeth最後事件完成。');
romance(49,'配對顧問Machiko',3,'Waikiki的Cream & Berry，Seaside Ave. 一帶。','SS07之後，與10位不同配對對象成功見面約會',[7],'時尚',['dimsum','beer','tobacco'],['完成所有10位不同對象的約會；只是配對或重複同一人不算，5人獎盃門檻也不足。'],'10位約會、三份禮物與Machiko最後事件完成。');
romance(50,'外派幫手Chitose',3,'Makani Ave. 與Aloha St. 交會附近的Oahu Burger，找Chitose Buster Holmes。','SS04之後，外派幫手使用／消費達Silver（Rank2）並接到關係聯絡',[4],'熱情',['hibiscus','shave','cosmetic'],['先呼叫外派幫手累積消費，把Poundmates升至Silver，再依電話與地圖事件找Chitose。'],'Silver資格、三份禮物與Chitose最後事件完成。');
rows.at(-1).tips.push('這位是Chitose Buster Holmes，不是隊友不二宮千歲；30次外派幫手獎盃與此門檻分開。');
romance(51,'工坊技師Julie',4,'Julie’s Gearworks主店，Hula Ave.，找Julie。','SS20之後，把工坊設施投資等級升到4',[20],'溫柔',['hibiscus','plumeria','cosmetic'],['透過製作、強化或投資把工坊設施升到Level4；以工坊畫面顯示為準。'],'工坊Level4、三份禮物與Julie最後事件完成。');
romance(52,'Revolve的最後關係事件',5,'Revolve酒吧，與酒保聊天；最後回酒吧觸發事件。','完成SS47～SS51五條關係支線',[47,48,49,50,51],'自信',['tobacco','coffee','beer'],['先把其餘五人的關係支線全部完成，再準備酒保需要的三份禮物。','依酒保實際索取的品項送禮；來源對咖啡與啤酒的順序記載不一致，不要按表列順序盲送。'],'五條前置、酒保三份禮物與Revolve最後事件都完成。');
rows.at(-1).steps.push('送禮後離開再返回Revolve，於可觸發的白天看完最後群體事件；尚未出現就核對五條前置及人格。');rows.at(-1).sourceRefs.push('SSRC10');
rows.find(r=>r.id==='SS30').timeOfDay='必須夜間，黃昏不算；主線時段不符可稍後回來。';
rows.find(r=>r.id==='SS35').timeOfDay='前段晚間、後段白天；第6章可開始，通常第7章再續。';
rows.find(r=>r.id==='SS52').timeOfDay='送禮對話依酒保提示；最後離開再回酒吧，白天觸發。';
await fs.writeFile(new URL('substories.json',import.meta.url),JSON.stringify({version:'2026-11-27.3',sources,rows},null,2)+'\n');
