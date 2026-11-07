import {storySources} from './story-data.js';
import {applyMayorResearch} from './mayor-research.js';
import {trophyNamesZhTW,trophyNameSource} from './trophy-names.js';
import {trophyConditions} from './trophy-guide-data.js';
const localizedTrophies=new Map(trophyNamesZhTW.map(t=>[t.officialName,t]));
// 靜態攻略版本與使用者進度分離；攻略與獎盃名稱各自記錄查證日期。
const trophyNames = [
 'Philosopher','Ab Initio','Wanderers','Not What It Seems','Overload','Grasslands Ring','Wooded Plateau','Eastern Wetlands','Desolate Island','Flooded Valley','Lost Marshes','Southern Coast','Verdant Canyon','Circular Oasis','Western Delta','Anthropic Hills','High Plain','Into the Machine','Prometheus Unbound','Break the Loop','The Future','Puzzle Fiend','Ab Aeterno','Renaissance Robot','Good Citizen','Museum Visitor','Museum Explorer','The Word Endures','Scientia Vincere Tenebras','The Spark','Discovery','The Thief of Fire','The All-Gifted','Mistress of Riddles','The Edge of Forever','Remnants of the Past','The Hard Way','Just One Lap','Single Rod','Persistent','Becoming Smarter','Chasing the Light','Bridge Builder','Team Spirit','Touch Grass',"Trevor's Biographer",'Ecstatic Truth','Gnothi Seauton','A New Beginning','Balance','A New Morality','Sinner','Excellent','Text Adventurer','Chicken','Lord of the Files','Mnemosyne','Archaeologist','Signatory','Your Biggest Fan'
];
const trophyKey=name=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'');
const sources = {
 psnZhTW:{title:'PS5 繁中獎盃名稱（Exophase · 2026-11-03）',url:trophyNameSource.zhTW,kind:'trophy-list'},
 psn:{title:'PS5 獎盃清單（Exophase）',url:'https://www.exophase.com/game/the-talos-principle-2-psn/trophies/',kind:'trophy-list'},
 groups:{title:'PS5 本體／DLC 分組（Platinum Pursuit）',url:'https://platpursuit.com/games/NPWR34440_00/',kind:'trophy-list'},
 list:{title:'PlayStationTrophies 獎盃清單',url:'https://www.playstationtrophies.org/game/the-talos-principle-2/print-list/',kind:'trophy-list'},
 walkthrough:{title:'Necrophage33 全成就流程（Xbox；請勿照搬刪檔操作）',url:'https://www.xboxachievements.com/forum/topic/490227-full-walkthrough-all-achievements-in-one-playthrough/',kind:'walkthrough'},
 guide:{title:'XboxAchievements 成就攻略（可讀搜尋索引；正文 403）',url:'https://www.xboxachievements.com/game/the-talos-principle-2/guide/',kind:'guide'},
 steam:{title:'Hanni：100% Achievements（PC；與 Xbox 流程不同）',url:'https://steamcommunity.com/sharedfiles/filedetails/?id=3069750588',kind:'player-guide'},
 friend:{title:'遊戲訊息逐字稿：Connecting you to a friend',url:'https://taloswiki.org/wiki/Connecting_you_to_a_friend',kind:'transcript'},
 survey:{title:'玩家紀錄：Doge 七題及不同配對',url:'https://steamcommunity.com/app/835960/discussions/0/4030220670872362258/',kind:'player-report'},
 mayors:{title:'BlackTorito：三市長實錄（準備與各路線時間章節）',url:'https://www.youtube.com/watch?v=OdvNsZHDZR4',kind:'video'},
 election:{title:'A New Morality：三市長完整條件（攻略搜尋索引）',url:'https://www.xboxachievements.com/game/the-talos-principle-2/achievement/a-new-morality.html',kind:'guide'},
 ending:{title:'GameSpot：結局與市長影響因素',url:'https://www.gamespot.com/articles/the-talos-principle-2-ending-guide/1100-6519076/',kind:'guide'},
 wiki:{title:'Talos Wiki：本體成就與附註',url:'https://taloswiki.org/wiki/Achievements_(TTP2)',kind:'community-wiki'},
 remnants:{title:'Talos Wiki：過去人物光影的出現時機與碰觸方式',url:'https://taloswiki.org/wiki/Remnants_of_the_past',kind:'community-wiki'},
 purpleLocation:{title:'Hanni：Purple 所在的舊磚牆、棕櫚樹與短階梯（遊戲畫面）',url:'https://images.steamusercontent.com/ugc/2158973210210926694/C333728F9FDA833F84EDDAB95BD96076D8D566BF/',kind:'screenshot'},
 purpleGardens:{title:'FreedSquare4945：考古花園中的 Purple 與聲音建議',url:'https://www.trueachievements.com/a407930/excellent-achievement',kind:'player-guide'},
 manorWest:{title:'Dick Leeuw／Louis Koot：西側巨構到 Act V 的圖文流程',url:'https://mysterymanor.net/walkthroughs/Talos_Principle_2/19_Megastructure_West/megastructure_west_1.htm',kind:'walkthrough'},
 sinner:{title:'Sinner 實測解法',url:'https://www.trueachievements.com/a407929/sinner-achievement',kind:'player-guide'},
 ps5:{title:'PlayStation 官方：PS Plus 雲端存檔與自動同步',url:'https://www.playstation.com/en-ca/support/subscriptions/ps5-ps-plus-cloud-storage/',kind:'official'},
 neoseeker:{title:'Neoseeker 攻略（正文 403；供後續核對）',url:'https://www.neoseeker.com/the-talos-principle-2/walkthrough',kind:'unavailable'}
};
const stages=[
 ['P0','Calibration / New Jerusalem','序章：出發前保護選擇'],
 ['P1','East · E1 → E2 → E3','Doge 配對、特殊解法與遠征隊'],
 ['P2','North · N1 → N2 → N3','Rand 訊息與損壞的 Somnodrome'],
 ['P3','New Jerusalem · 回訪','城市獎盃與政治對話'],
 ['P4','South · S1 → S2 → S3','Switcheroo、考古與私訊'],
 ['P5','West · W1 → W3 → W2','先完成其他區域，再接近 W2 Lost Lab'],
 ['P6','Election · 三市長分歧','獨立追蹤，依早期選擇驗證結果'],
 ['P7','Golden Gate / Finale','黃金謎題、收集與本體白金']
].map(([id,title,description])=>({id,title,description}));
const steps=[];
function add(stageId,id,title,location,actions,extra={}) {
 steps.push({id,stageId,order:steps.filter(s=>s.stageId===stageId).length+1,title,description:title,location,trigger:'抵達上述地點，離開前查看本步驟。',prerequisites:[],actions,verification:'依遊戲畫面與 PS5 獎盃通知手動確認；網站無法讀取遊戲存檔。',trophyIds:[],trophyRefs:[],warningLevel:'recommended',missable:false,recovery:'保留目前進度；若事件已關閉，先核對舊備份，不以網站勾選推斷可補救。',backupRecommended:false,sources:['guide'],verificationStatus:'consensus',...extra});
}
const refs=(...names)=>names.map(trophyKey);
add('P0','calibration','完成 Calibration','Calibration', ['依下方順序完成 12 個教學謎題，拿齊三色拼塊並打開三道門。最後穿過傳送門，醒來進入 New Jerusalem。'],{trophyRefs:refs('Ab Initio'),sources:['wiki'],verificationStatus:'confirmed'});
add('P0','save-safety','先設定 PS5 備份習慣','PS5 · Saved Data (PS5)',[
 '需要 PS Plus。於 Settings → Saved Data and Game/App Settings → Saved Data (PS5) → Sync Saved Data 檢查本遊戲 Auto-Sync。分歧備份期間關閉本遊戲自動同步，避免分支新進度取代保留節點。',
 '手動 Upload to Cloud Storage 會更新雲端副本；Download to Console Storage 會替換主機副本。每次先核對遊戲名稱、方向與時間戳；不確定就停止。',
 '網站 JSON／Google Drive 只保存這份清單，並不是 PS5 遊戲存檔。只有你實際核對主機後，才按「記錄 PS5 備份」。'
],{warningLevel:'prepare',sources:['ps5'],verificationStatus:'confirmed',backupRecommended:true});
add('P0','doge-intro','接受 Doge（666）的介紹','New Jerusalem · 塔內走廊', ['前往簡報室途中，Doge 主動談到朋友時，表示有興趣認識。不要拒絕或結束這條介紹。'],{warningLevel:'irreversible',missable:true,trigger:'序章塔內會議前。',sources:['walkthrough','steam'],recovery:'若已錯過介紹，後期 W2 備份不能補前期旗標；需要較早存檔或重新開始。'});
add('P0','chicken','先拒絕遠征，再讀取繼續','New Jerusalem · 簡報桌 / Hermanubis', ['在是否參加遠征的決定先拒絕，查看短結局與 Chicken 獎盃。','回主選單繼續，重聽簡報後接受遠征。不要為短結局刪除存檔。'],{trophyRefs:refs('Chicken'),warningLevel:'irreversible',missable:true,sources:['walkthrough','wiki'],verificationStatus:'confirmed',recovery:'必須回到序章這次決定；接受後再補需要序章存檔或新遊戲。'});
add('P0','petition','簽署 Damien／Moryana 的請願','New Jerusalem · 電梯外 / Damien（903）、Moryana（801）',['離開電梯後找 Damien（903）與 Moryana（801），聽完請願並提供數位簽名。這次是政治請願，和給粉絲簽名的對話不同。'],{trophyRefs:refs('Signatory'),warningLevel:'irreversible',missable:true,sources:['guide','steam'],verificationStatus:'consensus'});
add('P0','schuyler','Schuyler：人生建議與簽名','New Jerusalem · Museum of the Simulation 前 / Schuyler（923）',['在博物館前找 Schuyler（923），回答他的人生方向問題；他要簽名時可以提供。對話結束後查看 Your Biggest Fan。','出發前先完成。第二次回城能否補拿，攻略說法不一。'],{trophyRefs:refs('Your Biggest Fan','Signatory'),warningLevel:'irreversible',missable:true,sources:['guide','steam'],verificationStatus:'unverified'});
add('P0','museum','Museum：三個展示區與 Rand','New Jerusalem · Museum of the Simulation',['進入博物館，走遍左側終端、中央重現謎題與右側拼塊展示區。','閱讀終端，和 Rand（303）談體驗；出發前查看 Museum Visitor 與 Museum Explorer。需否實際操作展示謎題，攻略仍有分歧。'],{trophyRefs:refs('Museum Visitor','Museum Explorer'),warningLevel:'irreversible',missable:true,sources:['guide','steam'],verificationStatus:'unverified'});
add('P0','purple','Purple：給出聲音建議','New Jerusalem · Archaeological Gardens（考古花園）/ Purple（998）',['以中央塔電梯為起點：下到城市層，走出電梯後往左側一路走，前往城市西側的 Archaeological Gardens（考古花園）。','找爬滿藤蔓、帶拱形開口的舊磚牆遺跡。Purple 站在遺跡旁的短階梯上方、棕櫚樹附近；靠近後確認名字 Purple（998）與紫色身體。','問他的聲音／說話方式，再明確建議「保留」或「更換」聲音，避免中立回答。談完後查看 Excellent。','第一次出城前先做完；完整英文選項與 PS5 回訪補拿條件仍待核對。'],{trophyRefs:refs('Excellent'),warningLevel:'irreversible',missable:true,verificationStatus:'consensus',verification:'位置以實際場景圖核對：藤蔓舊磚牆、拱形開口、棕櫚樹及短階梯上方。中央塔電梯出口向左、城市西側考古花園的方向來自 Xbox 攻略可讀索引；考古花園名稱與明確給保留／更換建議由玩家實測指南支持。未核對 PS5 完整英文與回訪觸發，沒有把圖片當成完整路線實測。',sources:['purpleLocation','purpleGardens','guide','steam']});
add('P0','neutral-route','先選定一套市長準備流程','全流程 · 城市對話／社群',['本 Roadmap 採保守的 XboxAchievements／BlackTorito 準備方向：除已列明的任務外，先不回覆公共社群貼文，避免累積未知政治傾向。閱讀與回覆不同；Doge／Rand 私訊仍須及時處理。','Hanni 另有前期回覆社群、W2 使用機器後備份的完整 PC 路線；不能把兩套做法拼成保證成功的路線。','精確市長配分與所有必要對話尚未完整核實。若以一周目三盃為目標，請先開啟三市長實錄 01:34–08:41 核對，不要猜答。'],{warningLevel:'branch',missable:true,verificationStatus:'unverified',sources:['walkthrough','mayors','steam']});
add('P0','departure-check','出發前檢查','New Jerusalem · 返回 VTOL',['離城前檢查 Doge、請願、Chicken、Schuyler、Purple 與博物館。還沒處理的先回去完成。','返回 VTOL 接受遠征，查看 Wanderers。'],{trophyRefs:refs('Wanderers'),warningLevel:'irreversible',missable:true,prerequisites:['doge-intro','chicken','petition','schuyler','museum','purple']});
add('P1','doge-survey','Doge 七題：逐題記錄，核對配對','E1 Grasslands Ring · PDA 私訊',[
 '先同意 Doge 收集／分享資料。七題主題依序是決策的知識或同情、保密能否說謊、懲罰、機械宇宙、進步或循環、過去與未來、祈禱。',
 '七題順序與答法：①「Knowledge」知識；②「Yes, lying can be okay」保密可說謊；③選包含「bad behavior」的肯定懲罰答覆；④「universe is weird」宇宙怪異且無法完全理解；⑤「Human progress」進步可讓好轉持續；⑥「wisdom」不應忽視先人智慧；⑦「prayer」祈禱不影響世界。英文為辨識片段，完整句請對照來源與遊戲。',
 '玩家紀錄顯示答案可能導向其他人或追加決勝題；七個題目不等於任意回答都能得到 Rand。作答前建議保留可回復節點。'
],{warningLevel:'branch',missable:true,backupRecommended:true,sources:['guide','survey','mayors'],verificationStatus:'consensus',prerequisites:['doge-intro']});
add('P1','doge-match','連接學者 Rand，確認 Not What It Seems','E3 Eastern Wetlands · PDA / Connecting you to a friend',['E3 收到 Doge 配對私訊就開啟；逐字稿把學者列為第二人，對應選項為「The scholar.」，再接受介紹「Yes, please do.」。','確認後續訊息來自 Rand（303），並核對 Not What It Seems。只看到這個獎盃不代表政治前置全部成立。'],{trophyRefs:refs('Not What It Seems'),warningLevel:'branch',missable:true,prerequisites:['doge-survey'],sources:['friend','guide'],verificationStatus:'consensus',recovery:'配錯或拒絕時先查看對話是否可改選；不可改選則需要配對前備份，W2 無法重做。'});
add('P1','team','在 Byron 離隊前完成四位隊友對話','E1–N3 · 遠征隊',['分別與 Byron（7）、Alcatraz（264）、Melville（142）、Yaqut（764）交談並逐一記錄。','尤其在第二次進入 Megastructure 前處理 Byron，確認 Team Spirit。'],{trophyRefs:refs('Team Spirit'),warningLevel:'irreversible',missable:true,sources:['steam','guide'],prerequisites:['departure-check']});
add('P1','chase','第一次 Prometheus 追光前先開通路','E1 Grasslands Ring · Prometheus monument',['先建好第一座 tetromino 橋，熟悉通路再碰追光。連續追到終點、不要讓追逐音樂中斷。','確認 Chasing the Light；已完成的追光不保證能重新觸發，失敗後保留其他地區未完成機會。'],{trophyRefs:refs('Chasing the Light','The Thief of Fire'),warningLevel:'irreversible',missable:true,sources:['steam','guide'],recovery:'若所有可用追光都已失敗／完成，需早期備份或新遊戲；不要把一般謎題重置當作追光重置。'});
add('P1','single-rod','Seesaw：只用一根連接器','E2 Wooded Plateau · 正規 Puzzle 8',['E2 正規第 8 題 Seesaw：只使用入口那根連接器，第二根完全不要拿。詳細擺法在上方 E2 謎題清單。','首次解題就照單根路線完成，再查看 Single Rod；完成後重置能否補拿仍有爭議。'],{trophyRefs:refs('Single Rod'),warningLevel:'irreversible',missable:true,backupRecommended:true,verificationStatus:'unverified',sources:['guide','steam']});
add('P1','one-lap','Loop：單圈條件','E2 Wooded Plateau · Puzzle 8 附近 Lost Puzzle',['E2 的 Lost 謎題 Loop：方塊只送一趟。等它落到遠牆，再改鑽另一面牆拿回來。','上方 E2 清單有完整順序與圖解。完成後查看 Just One Lap；PS5 重置補盃仍待實測。'],{trophyRefs:refs('Just One Lap'),warningLevel:'irreversible',missable:true,verificationStatus:'unverified',sources:['guide','steam']});
add('P1','puzzle-time','留一個未解謎題做時間與重試獎盃','E1 起 · 非 Calibration 謎題',['Persistent：保持遊戲在前景，在未解謎題內停留超過 20 分鐘，等跳盃再完成。','Becoming Smarter：在一題內停留後離開，進另一題再回來完成。精確最短時間不在此保證；優先保留未解謎題與備份。'],{trophyRefs:refs('Persistent','Becoming Smarter'),warningLevel:'prepare',sources:['steam','guide']});
add('P1','field-basics','橋、終端、Spark 與社群閱讀','E1 Grasslands Ring 起',['建造第一座 tetromino 橋，確認 Bridge Builder。探索 Puzzle 3–4 之間的 Prometheus Spark；只收集不等於要用它跳過謎題。','查看橋右側的終端內容，確認 The Word Endures。PDA 累計閱讀十則公共貼文可核對 Touch Grass；閱讀不需要回覆，請保留市長路線策略。'],{trophyRefs:refs('Bridge Builder','The Spark','The Word Endures','Touch Grass'),sources:['steam','wiki'],verificationStatus:'consensus'});
add('P1','first-megastructure','首次進入 Megastructure','E3 收尾 → Megastructure',['東區探索與 Doge 配對驗收後，依主線進入 Megastructure 並核對 Into the Machine。'],{trophyRefs:refs('Into the Machine'),sources:['wiki'],verificationStatus:'confirmed'});
add('P2','rand-north','北區：不要漏接 Rand 私訊','N1–N3 · PDA / Rand（303）',['每次新私訊提示都查看 Rand。確認他請你調查 Somnodrome，保留願意協助的任務方向。','各封私訊的精確發送區域、完整英文選項及是否有時限尚未取得一致證據；遇到不同訊息先記筆記，不用攻略推測取代實際文字。'],{warningLevel:'branch',missable:true,prerequisites:['doge-match'],sources:['walkthrough','mayors'],verificationStatus:'unverified'});
add('P2','broken-somnodrome','N2：嘗試使用損壞的 Somnodrome','N2 Flooded Valley · Lost Lab',['北區收尾前，到 N2 Lost Lab 選擇嘗試使用 Somnodrome，而不是只研究；機器會壞掉。此處不會跳 Gnothi Seauton。','攻略將此事件列為 Rand 後續必要條件；不要用 W2 的正常機器取代前期調查。'],{warningLevel:'branch',missable:true,prerequisites:['rand-north'],sources:['election','steam'],verificationStatus:'consensus'});
add('P2','north-exit','第二次進入 Megastructure 前驗收','N3 → Megastructure',['離開北區前，和 Byron 說完話、嘗試過 N2 的 Somnodrome，並回覆 Rand 私訊。','接著進巨構。若前面的任務沒接上，回城時可能沒有 Somnodrome 簡報。'],{warningLevel:'irreversible',missable:true,prerequisites:['team','broken-somnodrome'],sources:['steam','guide']});
add('P3','sinner','Thecla：第二次回城的爭論','New Jerusalem · Tablets of the Founder / Thecla（862）',['先完成城市主線所需博物館終端互動，再回 Founder 紀念區找 Thecla。','實測攻略列出的回覆為「Have you ever considered that you might be wrong?」接「I don’t want to waste my time talking to idiots.」。核對 Sinner。','若不能對話，先完成博物館主線並重試；不保證所有版本都可在第三次回訪補拿。'],{trophyRefs:refs('Sinner'),warningLevel:'irreversible',missable:true,sources:['sinner'],verificationStatus:'consensus'});
add('P3','text-adventures','Gehenna Pavilion：三部文字冒險','New Jerusalem · Gehenna Memorial Pavilion',['在三台展示終端分別完成 Jefferson Goldboom and the Specter of Modernity、Ghosts of Atlantis、Argument Simulator。','Hanni 要求成功結局，Xbox 攻略稱任何完成都可，最小條件有衝突；保守讓三部都成功結局。可重新開始文字遊戲，未跳盃再開各終端並退出。完整選項鏈請參閱來源。'],{trophyRefs:refs('Text Adventurer'),warningLevel:'irreversible',missable:true,sources:['steam','guide'],verificationStatus:'unverified'});
add('P3','city-tour','回訪時探索完整城市','New Jerusalem · 城市地標',['造訪 Milton’s Rest、Tablets of the Founder、Alexandra Drennan Memorial、Friends of New Jerusalem Gazebo、Gehenna Memorial Pavilion、Museum of the Simulation、博物館後方 Construction Site／Scaffolding；另補走 Helga’s Shop 與 Archeological Gardens。','來源地標清單不完全一致，這裡保留兩者聯集；展館在回訪開放後才可完成 Good Citizen，以實際跳盃驗收。'],{trophyRefs:refs('Good Citizen'),warningLevel:'prepare',sources:['steam','guide'],verificationStatus:'consensus'});
add('P3','city-politics','政治對話與離城簡報：保留分歧能力','New Jerusalem · Damien（903）、Atal（890）、塔內簡報室',['回訪在城中心找 Atal 並表示支持；保留請願與人物回覆筆記。','若有 Somnodrome 簡報，先核對資料來源再答。Rand 路線攻略允許這裡不同意 Rand，但會需要 S1 私訊修補關係。','Hanni 的前期社群與簡報策略另成一套；本版不把兩套混用成成功保證。完整英文簡報選項及 PS5 重現仍待查證。'],{warningLevel:'branch',missable:true,backupRecommended:true,sources:['election','steam','mayors'],verificationStatus:'unverified',prerequisites:['broken-somnodrome']});
add('P3','city-exit','離城前檢查與備份','New Jerusalem · VTOL',['離城前查看 Sinner、Text Adventurer、Good Citizen，並確認已參加簡報、回覆 Rand。','先保留可還原的 PS5 存檔。後期雖可再回城，早期政治選擇無法靠回訪重選。'],{warningLevel:'irreversible',missable:true,backupRecommended:true,prerequisites:['sinner','text-adventures','city-politics']});
add('P4','hard-way','Switcheroo：不用「保留連線」','S1 Southern Coast · 正規 Puzzle 8',['S1 正規第 8 題 Switcheroo：全程使用一般拾取，不按「保留連線」。先搬好設備，最後才選光源。','上方 S1 清單採獎盃專用解法。首次完成後查看 The Hard Way；不要依賴重置補盃。'],{trophyRefs:refs('The Hard Way'),warningLevel:'irreversible',missable:true,backupRecommended:true,verificationStatus:'unverified',sources:['guide','steam']});
add('P4','rand-south','S1：處理 Rand 關係私訊','S1 Southern Coast · PDA / Rand（303）',['若城市簡報沒有站在 Rand 一邊，S1 會有關係私訊；回應你說謊只是為了保護與他的關係。','這個條件已在攻略索引找到；完整英文原句與其他 Rand 私訊的逐封時機仍待核對。'],{warningLevel:'branch',missable:true,prerequisites:['rand-north','broken-somnodrome','city-politics'],sources:['election','mayors'],verificationStatus:'unverified'});
add('P4','artifacts','累計十件古代人類物品','S1–S3 起 · 各地戶外',['探索主線通路、海岸與遺跡，收集古代人類物品並在遊戲內核對進度至十件。','物品可能在預設候選點隨機出現；不把一張固定點位清單當保證。可留到最後自由探索，但進入最終 VTOL 前驗收。'],{trophyRefs:refs('Discovery','Archaeologist'),sources:['guide','steam']});
add('P5','west-arrival','西區入口：Hermanubis 與塔','西區 transport / Hermanubis（452）',['記錄關於幻象是否真實的回覆，再進行西區探索。','先完成 W1、W3，再清 W2 其他內容，將 W2 Lost Lab 留作最後分歧區；精確前期市長對話尚待核對。'],{warningLevel:'branch',missable:true,sources:['steam','walkthrough'],verificationStatus:'unverified'});
add('P5','w2-backup','W2 Lost Lab 前：分歧備份檢查','W2 Anthropic Hills · Lost Lab 入口',['先啟動所有剩餘塔、清理 W2 其他探索，再停在 Lost Lab 入口；此處開始會進入與 Hermanubis／Somnodrome 的關鍵流程。','先核對 Doge→Rand、N2 調查、城市簡報、公共社群策略與 Rand 後續私訊。沒有這些證據，不宣稱單一 W2 備份足以三盃。','依 PS5 官方方法核對 Auto-Sync、關閉遊戲後手動上傳該節點，記下雲端與主機時間；再手動確認備份。不要照搬 Xbox 刪除本機存檔的手法。'],{warningLevel:'irreversible',missable:true,backupRecommended:true,prerequisites:['doge-match','broken-somnodrome','city-politics','rand-south'],sources:['walkthrough','mayors','ps5'],verificationStatus:'unverified',recovery:'優先保留入口備份。若前期條件錯誤，回到相應更早備份；沒有早期備份就須額外周目，無可驗證的固定補跑時數。'});
add('P5','working-somnodrome','W2：使用正常運作的 Somnodrome','W2 Anthropic Hills · Lost Lab / Hermanubis',['先停下查看分歧路線。正常機器由 Hermanubis 守著，使用後可得到 Gnothi Seauton。','Hanni 的 PC 流程是在離開 Somnodrome 後立即備份；本 Roadmap 的入口節點較早。兩者依賴不同前置，不要以後一節點覆蓋唯一的入口備份。','與 Hermanubis 的精確三路線對話及終端選項尚待逐字查證；不確定時維持備份並看三市長實錄 08:41、11:30、14:40。'],{trophyRefs:refs('Gnothi Seauton'),warningLevel:'branch',missable:true,prerequisites:['w2-backup'],sources:['steam','walkthrough','mayors'],verificationStatus:'unverified'});
const branchPrerequisites=['doge-intro','doge-survey','doge-match','petition','rand-north','broken-somnodrome','city-politics','rand-south','w2-backup'];
const branches=[
 {id:'rand',name:'Rand',trophy:'A New Morality',sourceTime:'11:30',summary:'學者配對與調查線是重要前置；只在 W2 偏向 Rand 並不足夠。',actions:[
  '先完成學者配對、博物館 Rand 回報、N2 嘗試使用、Atal 支持與必要的 S1 關係修補。W2 進機器前向 Hermanubis 表示「Rand was right」，再親自使用。',
  '離開後向 Rand 依序表達：睡眠中遇到存在→直覺分辨善惡→道德不能簡化成規則→該存在非道德權威→道德也需同情→判斷前先檢視資料。',
  'Cryer 訪問：主要看到 bugs，將資料交 Rand／學者。VTOL 前對 Hermanubis：理解他的恐懼，但未來不能建立在謊言上。完整英文選項與 PS5 重現仍待查證。'
 ]},
 {id:'byron',name:'Byron',trophy:'A New Beginning',sourceTime:'14:40',summary:'成長／探索立場與公開資料會影響支持；前期傾向過強仍可能鎖定其他結果。',actions:[
  'W2 使用前公共社群：The Theory of Everything 支持 Shmilev；Is there even a future? 選盡力而為；A Warning 支持可避免舊錯誤的成長；The Goal Megathread 表示不欠 Founder。',
  '使用機器後告訴 Hermanubis 自己沒事；與 Rand 選前兩次第一項，不描述所見。接受 Cryer 訪問：看到未來、向公眾分享。VTOL 前反對 Goal 神話扼殺社會。精確英文與門檻待查證。'
 ]},
 {id:'hermanubis',name:'Hermanubis',trophy:'Balance',sourceTime:'08:41',summary:'維持 Goal／保守立場的分支；社群與先前對話仍有影響。',actions:[
  'W2 使用前公共社群：The Theory of Everything 支持 Malduc；Is there even a future? 表達走錯路的憂慮；A Warning 不認為階級形成，認為不成長能平等；The Goal Megathread 選有價值的忠誠。',
  '先問 Hermanubis 想法再使用機器；出來表示不好並詢問怎麼辦。與 Rand 選前兩次第一項、不描述所見；Cryer 訪問延後。VTOL 前維護 Founder 神話。精確英文與 PS5 重現待查證。'
 ]}
].map(b=>({...b,stepId:'mayor-'+b.id,prerequisites:branchPrerequisites,restore:'先核對所保留 PS5 雲端節點的時間與前置。完成一條路線、在 Act V Neith 公告時確認獎盃，再決定是否還原該節點。還原只替換 PS5 遊戲進度；網站三路線紀錄需各自保留。結果不符時回查前期筆記與較早備份，不反覆覆蓋唯一雲端副本。'}));
for(const b of branches) add('P6',b.stepId,b.name+' · '+b.trophy,'W2 → 救援 Byron → Act V New Jerusalem / Neith（33）',[...b.actions,'推進主線救援後，在 Act V 醒來聽 Neith 公告市長；以實際跳盃才記錄成功。另有 Jeremy／無人當選的結果；Jeremy 能否給 Balance 存在來源衝突，不把它當 Hermanubis 成功。'],{trophyRefs:refs(b.trophy),warningLevel:'branch',missable:true,backupRecommended:false,prerequisites:branchPrerequisites,sources:['election','mayors'],verificationStatus:'unverified',recovery:b.restore,branchId:b.id});
add('P7','final-city','西側巨構後回城：離開前巡查','W2 收尾 → 西側巨構 → Act V · New Jerusalem',['三座西區塔啟動後，搭 VTOL 進西側巨構。跟 Prometheus 的影像找到 Byron，把他的手從終端拉開；看完劇情，再沿黃色目標撤回 VTOL。','途中過載後會在 New Jerusalem 醒來。和 Neith 談未來方向，再依黃色標記找同伴；這段會影響回島隊伍，請依選定結局方向回答。','完成仍開放的城市探索、文字遊戲與未完成對話；不要假設早期限定人物仍然有效。','離城回島後，先補完剩餘謎題、探索及黃金謎題，再接近最終 VTOL。'],{warningLevel:'irreversible',missable:true,sources:['steam','manorWest'],trophyRefs:refs('Good Citizen','Text Adventurer')});
add('P7','all-puzzles','全區解題與黃金門','12 個區域 · 一般／Lost／Golden puzzles',['回訪各區，把尚未親自解完的 8 個正規與 2 個 Lost 謎題補齊；使用 Spark 跳過的題目也要重解。','完成下方 12 個黃金謎題，再去交通站附近的 Golden Gate 找 Cornelius。Puzzle Fiend 與 Renaissance Robot 要分別核對。'],{trophyRefs:refs('Puzzle Fiend','Renaissance Robot'),sources:['wiki','steam','guide'],verificationStatus:'consensus'});
add('P7','miranda','Miranda：完成黃金謎題後救回','Golden Gate · Cornelius／Miranda',['完成全部黃金謎題，推進 Golden Gate 後的救回 Miranda 流程。','確認 Ab Aeterno；保留該進度直到完成最後結局，才能核對 The Future。'],{trophyRefs:refs('Ab Aeterno','The Future'),prerequisites:['all-puzzles'],sources:['wiki','ending'],verificationStatus:'consensus'});
add('P7','collectibles','收集驗收：錄音、人物光影與實驗室','全部 12 區域',['進入並探索 12 區各自的 Lost Lab（失落實驗室）；它們是場外建築，與 Lost 謎題不同。','在電腦終端下載 Trevor 與 Lifthrasir 的錄音，各收齊 12 份；另逐份開啟文字檔，累計閱讀 30 份。','從 E3 起，找齊戶外的過去人物光影，走近並碰觸它們，觸發對話。E1、E2 沒有這類光影，不必回去找。','查看對應獎盃是否取得；Xbox 的顯現 bug 記錄不直接套用 PS5。'],{trophyRefs:refs("Trevor's Biographer",'Ecstatic Truth','Mnemosyne','Scientia Vincere Tenebras','Lord of the Files','Remnants of the Past'),sources:['guide','wiki','steam','remnants'],verificationStatus:'consensus'});
add('P7','stars','完成所有 monument 與星星','各區 monument → Megastructure 島上塔',['每區下方都有兩座雕像的星星步驟，逐區補齊 24 顆。','回 Megastructure 島上的 Astronomical Temple，把星星放入圓形裝置並看完幻象，查看 The Edge of Forever。'],{trophyRefs:refs('The Thief of Fire','The All-Gifted','Mistress of Riddles','The Edge of Forever','Renaissance Robot'),sources:['steam','wiki']});
add('P7','final-backup','最終 VTOL 前保留節點','Megastructure · 最後登機前',['登上最終 VTOL 前，完成剩餘謎題、星星、收集與 Miranda，並保留這裡的 PS5 存檔。','PC 攻略提到結局後的隱藏自動存檔，PS5 各版本是否相同仍待確認；請先備份再登機。'],{warningLevel:'irreversible',missable:true,backupRecommended:true,prerequisites:['miranda','collectibles','stars'],sources:['steam','ps5'],verificationStatus:'unverified'});
add('P7','ending','最後選擇與 The Future','Megastructure · 最終選擇',['三種結局方向是使用機器、暫停機器、摧毀機器。Break the Loop 只需完成定義未來的選擇；並非三種結局各有一個 PS5 本體盃。','救回 Miranda 後完成結局再核對 The Future。不要把三種主結局與三市長獎盃混為一談。'],{trophyRefs:refs('Break the Loop','The Future'),prerequisites:['final-backup'],sources:['ending','wiki'],verificationStatus:'confirmed'});
add('P7','platinum-audit','本體白金驗收','PS5 · Trophies / Philosopher',['逐項與 PS5 本體清單比對，網站標記只記錄你的確認。','本體 60（含白金），DLC 9 排除。確認三市長、Miranda、完整探索與解謎後，核對 Philosopher；不以 Roadmap 全勾選自動授予白金。'],{trophyRefs:refs('Philosopher'),sources:['psn','groups','list'],verificationStatus:'confirmed',warningLevel:'later'});
add('P7','story-audit','主線獎盃補核對','Megastructure · 主線跨階段事件',['Overload 與 Prometheus Unbound 分別對應資料流過載與解放 Prometheus 的主線事件。此處是最終驗收，不表示事件發生在 P7。','各事件精確觸發章節尚未獨立核實；如主線已推進卻沒有跳盃，先看來源與 PS5 通知，不把網站記錄當成遊戲觸發證據。'],{trophyRefs:refs('Overload','Prometheus Unbound'),sources:['psn','wiki'],verificationStatus:'unverified',warningLevel:'later'});
add('P4','prometheus-rescue','進入南側巨構，釋放 Prometheus','S3 收尾 → Megastructure South',['南區三座塔啟動後，回基地搭 VTOL 進巨構。先找 Prometheus 正面的拉桿，再沿五個黃色目標解除鎖鏈。','依下方五根插銷的順序完成橋樑與支路，回正面拉桿釋放 Prometheus；返回 VTOL 前往西區。'],{trophyRefs:refs('Prometheus Unbound'),sources:['wiki'],verificationStatus:'consensus',prerequisites:['region-s3']});
const regions=[['P1','E1','Grasslands Ring'],['P1','E2','Wooded Plateau'],['P1','E3','Eastern Wetlands'],['P2','N1','Desolate Island'],['P2','N2','Flooded Valley'],['P2','N3','Lost Marshes'],['P4','S1','Southern Coast'],['P4','S2','Verdant Canyon'],['P4','S3','Circular Oasis'],['P5','W1','Western Delta'],['P5','W3','High Plain'],['P5','W2','Anthropic Hills']];
for(const [stageId,code,name] of regions) add(stageId,'region-'+code.toLowerCase(),code+' · '+name+' 謎題與探索',code+' '+name,[
 '依下方清單解完正規與 Lost 謎題，再搭橋啟動塔。黃金門等 P7 再回來。',
 ...(code==='W2'?['Lost Lab 先不要進入；保留下方入口備份，再繼續市長路線。']:[])
],{trophyRefs:refs(name),sources:['guide','wiki','steam','remnants'],warningLevel:'recommended',verificationStatus:'consensus'});
// 區域帳插在轉場驗收之前；每階段順序明確，不依顯示標題生成 ID。
Object.assign(sources,storySources);
add('P2','north-megastructure','北側巨構：開門、重力區與撤離','N3 後 → Base Camp VTOL → 北側巨構',['先讀下方入口指引：Door override 在正前階梯上，不是左梯關閉的大門。','Byron 啟動紅光後，依路線解藍／綠；主線終端事故後轉撤離，接著才是第二次回城。'],{sources:['megaNorth1','megaNorth2','megaNorthWiki'],verificationStatus:'consensus'});
add('P7','west-megastructure','西側巨構：解救 Byron，再回城','市長路線處理後 → 西側 VTOL',['這次先救 Byron；最終雙世界八輪盤在城市回訪與島上清理後才進行。','跟隨下方地標與黃色三角，撤離途中會由劇情帶回 Neith 實驗室。'],{sources:['megaWest'],verificationStatus:'consensus'});
const flowOrders={
 P0:['calibration','save-safety','neutral-route','doge-intro','chicken','petition','schuyler','museum','purple','departure-check'],
 P1:['doge-survey','team','field-basics','puzzle-time','chase','region-e1','single-rod','one-lap','doge-match','region-e2','region-e3','first-megastructure'],
 P2:['rand-north','region-n1','broken-somnodrome','region-n2','region-n3','north-exit','north-megastructure'],
 P4:['hard-way','rand-south','artifacts','region-s1','region-s2','region-s3','prometheus-rescue'],
 P5:['west-arrival','region-w1','region-w3','w2-backup','region-w2','working-somnodrome'],
 P7:['west-megastructure','final-city','all-puzzles','miranda','collectibles','stars','story-audit','final-backup','ending','platinum-audit']
};
for(const stage of stages){const list=steps.filter(s=>s.stageId===stage.id),order=flowOrders[stage.id];list.sort((a,b)=>order?order.indexOf(a.id)-order.indexOf(b.id):a.order-b.order).forEach((s,i)=>s.order=i+1);}
steps.sort((a,b)=>stages.findIndex(s=>s.id===a.stageId)-stages.findIndex(s=>s.id===b.stageId)||a.order-b.order);
export const roadmap={gameId:'talos2',title:'The Talos Principle II',subtitle:'PS5 · 本體白金 Roadmap',version:'2026.11.08.4',checkedAt:'2026-10-31',storagePrefix:'game-companion.talos2.',moduleVersion:'1.6.1',driveProjectId:'game-companion.talos2',driveFileName:'game-companion.talos2.progress.v1.json',baseCount:60,dlcCount:9,classification:'本體 1 白金／1 金／6 銀／52 銅；DLC 4 銀／5 銅，未納入清單。',officialIdNote:'NPWR34440_00 已有公開分組佐證；逐盃官方數字 ID 尚未取得可靠對照。trophyRefs 為網站穩定名稱鍵，trophyIds 保留空陣列，絕不假冒官方 ID。',stages,steps,branches,sources,trophies:trophyNames.map(name=>({id:trophyKey(name),officialId:null,officialName:name,...localizedTrophies.get(name),nameCheckedAt:trophyNameSource.checkedAt,...trophyConditions.find(t=>t.exophaseId===localizedTrophies.get(name).exophaseId),descriptionCheckedAt:'2026-11-04',category:'base',idVerificationStatus:'unverified',sources:['psn','psnZhTW','list']}))};
applyMayorResearch(roadmap);
// 首次可取得的獎盃放在事件之前；P7 僅保留收尾驗收。
const editStep=(id,patch)=>Object.assign(steps.find(s=>s.id===id),patch);
editStep('region-e1',{trophyRefs:refs('Grasslands Ring','Discovery','The All-Gifted'),actions:['邊解 1–8 題邊完成下方收集：1 座實驗室、兩種錄音各 1、2 顆星星；本區沒有人物光影。','從現在開始辨識人類遺物。第一件即可取得 Discovery，繼續累計 10 件可取得 Archaeologist；不要等到收尾才找。','首次完成 Pandora 雕像即可取得 The All-Gifted。先看下方位置與清單，再開始沿路解題。黃金門等 P7 再回來。']});
editStep('region-e2',{trophyRefs:refs('Wooded Plateau','Mistress of Riddles'),actions:['本區同樣有 1 座實驗室、兩種錄音各 1、2 顆星星，沒有人物光影。先看收集清單，沿路完成。','首次完成 Sphinx 雕像即可取得 Mistress of Riddles；第 8 題 Seesaw 與 Lost Loop 的特殊解法，請先看本區前方警示。']});
editStep('region-e3',{trophyRefs:refs('Eastern Wetlands','Remnants of the Past'),actions:['本區起每區多了 2 個人物光影；加上 1 座實驗室、兩種錄音各 1、2 顆星星，共 7 項固定收集。','最早可在第 2 題前方碰觸 Future Cat；第一個光影就能取得 Remnants of the Past。全部 20 個則對應 Mnemosyne。先看位置，再沿路解題。']});
editStep('region-w2',{trophyRefs:refs('Anthropic Hills','Puzzle Fiend'),actions:['先解本區正規與 Lost 謎題、啟動塔並完成其他探索；Lost Lab 留到最後，回入口時才按前方「W2 Lost Lab 前」的完整順序備份。','如果前十一區正規與 Lost 都已親自解完，本區最後一題完成時就可能取得 Puzzle Fiend：共 120 題。曾用 Spark 跳題的仍須補解；不用等到 P7 才核對。','本區有兩種錄音各 1、2 個人物光影、2 顆星星；實驗室另 1 項。先看下方位置，再沿路完成。']});
for(const id of ['single-rod','one-lap','hard-way']){const step=steps.find(s=>s.id===id);step.actions=step.actions.map(text=>text.replace('上方 E2 謎題清單','本區 E2 謎題清單').replace('上方 E2 清單','本區 E2 清單').replace('上方 S1 清單','本區 S1 清單'));}
editStep('artifacts',{trophyRefs:refs('Archaeologist'),title:'沿路累計人類遺物，目標十件',actions:['E1 起就可以辨識遺物並取得第一件的 Discovery；從各區清單累計到十件，再核對 Archaeologist。','遺物可能有替代出現點，同一物品已在前區取得後，後區可能不再出現。候選位置不保證有物品；找到後勾選該物品，其他區的同一物品與地圖會連動，不必在每區重找。']});
editStep('collectibles',{trophyRefs:refs("Trevor's Biographer",'Ecstatic Truth','Mnemosyne','Scientia Vincere Tenebras','Lord of the Files')});
editStep('stars',{trophyRefs:refs('The Edge of Forever','Renaissance Robot')});
editStep('first-megastructure',{title:'東側巨構：入口支線、三色門與回程',actions:['從 E3 交通艙回 Base Camp，再搭 VTOL 進巨構；不是在基地尋找三色雷射。','照下方順序走入口支線、中央三色門、主線終端及回程 NOEMA-01。行走指引直接顯示；設備解法由「拒絕謎語」開啟。'],sources:['megaEast1','megaEast2','megaEastWiki']});
editStep('north-exit',{title:'N3 離區前：核對收集，再回基地',actions:['離區前核對 N3 收集與塔已啟動，並確認 Byron 對話、N2 嘗試 Somnodrome 與 Rand 私訊已處理；再搭交通艙回 Base Camp。','接著搭 VTOL 進北側巨構；入口、重力區與撤離在下一個片段。']});
editStep('final-city',{title:'Act V 城市回訪：醒來、招募與登機',location:'Neith 實驗室 → 中央塔 → 城市',actions:['西側救援後在 Neith 實驗室醒來，先核對本輪市長。','依下方順序回城市、找 Melville／Yaqut，再登機回島；最終進巨構前仍可處理島上收集。'],sources:['megaWest','cityMap']});
const e2=steps.find(s=>s.id==='region-e2');e2.trophyRefs.push(trophyKey('Overload'));e2.actions.unshift('沿路先找 Lost Lab：第 6 題 Passage 西南方上坡的入口。到最深處第一台終端讀 Schematic_108，看到 Miranda 幻象後核對 Overload；上階梯還有另一台終端。');e2.sources.push('overloadEarly');
editStep('story-audit',{title:'核對沿途取得的主線獎盃',actions:['Prometheus Unbound 在南側巨構釋放 Prometheus 時取得；Overload 在 E2 Lost Lab 讀 Schematic_108 並看 Miranda 幻象後取得。','這裡只補核對 PS5 通知；實際操作已放在相應章節。'],verificationStatus:'consensus',sources:['overloadEarly','megaSouth2']});
