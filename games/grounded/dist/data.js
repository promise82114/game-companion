// 事實資料與進度分離。位置文字為自行整理；沒有第三方座標或底圖。
export const checkedAt='2026-11-04';
export const sources={
 ps:{label:'PlayStation 公開 46 項清單',url:'https://www.playstationtrophies.org/game/grounded/print-list/'},
 ps4:{label:'PS4 對照清單',url:'https://www.playstationtrophies.org/game/grounded-v2/print-list/'},
 gg:{label:'PS 獎盃交叉對照',url:'https://www.gamerguides.com/grounded/psn-trophies/overview'},
 official:{label:'官方 Fully Yoked 1.4',url:'https://grounded.obsidian.net/news/grounded/fully-yoked'},
 patch:{label:'官方修補 1.4.7.4815',url:'https://grounded.obsidian.net/news/grounded/grounded-patch-1471'},
 report:{label:'社群 Report Card 條件',url:'https://grounded.wiki.gg/wiki/Game_Report_Card'},
 ng:{label:'社群 NG+ 規則',url:'https://grounded.wiki.gg/wiki/New_Game%2B'},
 molar:{label:'乳牙名稱／位置文字',url:'https://grounded.wiki.gg/wiki/Milk_Molars_%28Grounded%29'},
 scab:{label:'SCA.B 名稱／位置文字',url:'https://grounded.wiki.gg/wiki/SCA.B_Flavor_Schemes'},
 chip:{label:'BURG.L Chip',url:'https://grounded.wiki.gg/wiki/BURG.L'},
 haze:{label:'Haze Lab 物品',url:'https://grounded.wiki.gg/wiki/Haze_Lab'},
 mix:{label:'Grounded MIX.R',url:'https://grounded.wiki.gg/wiki/MIX.Rs'},
 cards:{label:'Grounded Creature Cards',url:'https://grounded.wiki.gg/wiki/Creature_Cards_%28Grounded%29'},
 research:{label:'Grounded 研究筆記與配方',url:'https://grounded.wiki.gg/wiki/Data_Items_%28Grounded%29'},
 shared:{label:'官方 Shared Worlds 說明',url:'https://grounded.obsidian.net/game'},
 crossplay:{label:'官方跨平台說明',url:'https://grounded.obsidian.net/cross-platform-support'}
};
// 本站 ID，不是 PSN 數字 ID。條件為自行撰寫的繁中摘要，非官方繁中譯名。
const trophyRows=[
 ['gnats-all-folks',"Gnat's All Folks!",'取得其餘 Grounded 獎盃。','platinum','meta'],
 ['science-rules','Science Rules','在 ASL 商店首次購買升級。舊來源寫 BURG.L，介面版本有差異。','bronze','craft'],
 ['growing-pains','Growing Pains','首次取得 Mutation。','bronze','explore'],
 ['resourceful','Resourceful','分析 15 種資源。','bronze','craft'],
 ['from-downtown','From Downtown','從超過 40 cm 外將球投入 Basketball Hoop。','bronze','craft'],
 ['lounging-around','Lounging Around','坐在椅子上休息。','bronze','craft'],
 ['block-buster','Block Buster','連續成功完美格擋 10 次。','bronze','combat'],
 ['exoskeleton','Exoskeleton','穿上同一套 Tier 2 護甲。','bronze','craft'],
 ['beefing-up','Beefing Up','首次製作 Tier 3 物品。','bronze','craft'],
 ['flavorful','Flavorful','取得 10 種新的 SCA.B 配色。','bronze','collection'],
 ['protein-shake','Protein Shake','飲用 5 杯採已知配方調製的 Beefy Smoothie。','bronze','craft'],
 ['fortified','Fortified','首次建造 Mushroom Brick 建築。','bronze','craft'],
 ['snoopy','Snoopy','發現地圖上的 20 個地點。','bronze','explore'],
 ['face-your-fears','Face Your Fears','首次擊敗 Wolf Spider。','bronze','combat'],
 ['web-master','Web Master','滑過玩家建造、長於 100 cm 的 Zipline。','bronze','craft'],
 ['friends-in-low-places','Friends in Low Places','馴養一隻昆蟲寵物。','bronze','explore'],
 ['get-yoked','Get Yoked','使用 20 顆普通乳牙強化自己。','bronze','collection'],
 ['shrinky-and-the-brain','Shrinky and the Brain','Brainpower 達到等級 10。','bronze','craft'],
 ['glob-job','Glob Job','在 Smithing Station 將 Tier 3 物品升到最高等級。','bronze','craft'],
 ['aim-small','Aim Small','用箭擊殺距離超過 30 cm 的飛行昆蟲。','bronze','combat'],
 ['underexposed','Underexposed','進入 Photo Mode；另一來源寫拍照，建議進入後再拍攝。','bronze','explore'],
 ['splinter-master','Splinter Master','製作 Tier 3 箭矢。','bronze','craft'],
 ['gotta-peep-them-all','Gotta Peep Them All','解鎖全部 Creature Cards；不要與 Gold Cards 混為一談。','bronze','collection'],
 ['mini-mix-a-lot','Mini Mix-a-lot','完成全部 MIX.R 與 Super MIX.R 防守。','bronze','collection'],
 ['go-big','Go Big','完成恢復正常體型的結局。','silver','story'],
 ['super-win','Super Win','恢復正常體型，且結局 Report Card 達到 100%。','gold','collection'],
 ['super-dupe','Super Dupe','使用 Super Duper 複製一件物品。','bronze','craft'],
 ['chillax','Chillax','在舒適度最高的基地休息。','bronze','craft'],
 ['no-more-homework','No More Homework!','完成 BURG.L 的任務清單。','silver','collection'],
 ['burgl-flipper','BURG.L Flipper','Oak Tree Lab 爆炸後救起 BURG.L。','bronze','story'],
 ['hedge-lab','Hedge Lab','完成 Hedge Lab。','bronze','story'],
 ['pond-lab','Pond Lab','完成 Pond Lab。','bronze','story'],
 ['fine-dining','Fine Dining','在 Roasting Spit 烹調昆蟲。','bronze','craft'],
 ['mom-genes','Mom Genes','擊敗 Broodmother。','silver','combat'],
 ['sticky-hands','Sticky Hands','封住 Haze 的毒氣罐。會改變庭院環境，先備份。','bronze','explore'],
 ['black-ant-hill-lab','Black Ant Hill Lab','完成 Black Ant Hill Lab。','bronze','story'],
 ['raisin-man','Raisin Man','找到 Dr. Wendell Tully。','bronze','story'],
 ['tighty-whities','Tighty Whities','擊敗 Mant。','silver','story'],
 ['assassin-assassin','Assassin Assassin','擊敗 Mantis。','silver','combat'],
 ['best-part-of-waking-up','The Best Part of Waking Up','成功調製 Embiggening Cocktail。','silver','story'],
 ['ominent-schmominent','Ominent Schmominent','挫敗 Director Schmector。','silver','combat'],
 ['a-muse-sting','A Muse Sting','擊敗 Wasp Queen。','silver','combat'],
 ['creepy-crawler','Creepy Crawler','擊敗 Infected Broodmother。','gold','combat'],
 ['royal-arrangements','Royal Arrangements','處理全部 Ant Queens；選擇會影響後續，先保留備份。','silver','explore'],
 ['did-i-do-that','Did I Do That?','啟動 REMIX.R。','silver','ngplus'],
 ['go-big-again','Go Big Again','啟動 REMIX.R 後再次完成恢復體型結局。','gold','ngplus']
];
export const trophies=trophyRows.map(([id,officialName,condition,grade,category])=>({id,officialName,condition,grade,category,verification:id==='underexposed'?'conflicting':'verified',sourceUrls:[sources.ps.url,sources.gg.url],remedy:'手動記錄實際 PSN 跳盃；世界完成不代表每位玩家已取得。版本／補跳機制未實機驗證。'}));
export const regions=[
 ['grass','草地起點',500,490],['oak','橡樹／Oak Lab',480,330],['hedge','樹籬／Hedge',760,555],['pond','池塘／Pond',510,210],['haze','霧區／Haze',280,460],['black-ant','黑蟻丘',180,550],['sandbox','沙盒',120,410],['picnic','野餐桌',135,260],['upper','上層庭院',640,95],['undershed','棚下／Undershed',330,90],['moldorc','Moldorc 城堡',815,280]
].map(([id,name,x,y])=>({id,name,anchor:{x,y},precision:'schematic'}));
export const stages=[['start','01','Oak Lab 起步'],['labs','02','四大實驗室'],['upper','03','Upper Yard 與棚下'],['boss','04','隱藏 Boss 與蟻后'],['ending','05','JavaMatic 與結局'],['audit','06','100% 查漏'],['remix','07','REMIX.R 與 NG+']].map(([id,number,title])=>({id,number,title}));
// 本站的探索順序與閱讀建議；不新增遊戲達成條件或虛構收集數量。
const experienceNotes={
 'first-camp':'先把營地當成探索起點，沿途認識資源、食物與飲水來源；不用為了趕主線跳過開場的生存操作。',
 'oak-rescue':'讀完 BURG.L 的對話與任務提示，再查看實驗室和商店，了解後續要回收晶片的目標。',
 'field-habits':'探索時順手查看生物、文件、錄音與配色；以遊戲 Data 頁確認新發現，避免最後才一次補找。',
 hedge:'沿樹枝路線探索實驗室與周邊小站，留意配色和研究筆記；跳躍前先確認可安全落腳的位置。',
 pond:'先熟悉水下的呼吸與返回路線，再探索實驗室及支線空間；不要只拿到主線物品就忽略周邊。',
 haze:'探索實驗室時閱讀研究資料。完成實驗室與封住毒氣罐是不同事項，封罐留到確認環境變化後再決定。',
 'black-ant':'取得新權限後回看先前無法進入的實驗室區段，並確認晶片是否已回交 BURG.L。',
 'haze-choice':'先探索目前的庭院環境，再作封罐選擇；重要變化前保留能辨識的遊戲存檔。',
 'tier-three':'開拓新區域時建立穩定的補給與返回路線，依新取得的材料試作裝備，不必把探索壓縮成直衝任務點。',
 undershed:'沿主線探索棚下與實驗室，閱讀研究資料和 Wendell 的對話，完成這段故事後再整理後續目標。',
 broodmother:'先閱讀召喚研究筆記，再準備材料與補給；保留探索樹籬及體驗 Boss 戰的完整過程。',
 mantis:'把 Stump Lab 的探索與召喚配方一起完成，備好材料後再挑戰 Mantis，避免來回補跑。',
 'wasp-queen':'依遊戲提示探索 Brawny Boy Bin，確認召喚物與補給後再進入挑戰，不把開啟區域當成擊敗 Boss。',
 schmector:'與 Wendell 推進隱藏實驗室劇情，閱讀對話與研究內容，將這條故事線和一般主線一起體驗。',
 'infected-broodmother':'把這場戰鬥留作後期挑戰，先整理已解鎖的裝備、召喚物和補給，再進行嘗試。',
 'ant-queens':'閱讀每位蟻后提供的選項再作決定；完整體驗不代表同一輪要把互斥的選擇全部做完。',
 javamatic:'把基地建造與防守準備帶進主線事件，先巡查裝置周邊的防線與補給，再啟動防守。',
 ending:'閱讀結局與 Report Card 提示，保留結局前存檔，方便回到庭院補看尚未體驗的內容。',
 'mix-audit':'逐區體驗普通 MIX.R 和 Super MIX.R 的防守；先修築防禦，再挑戰尚未完成的裝置。',
 'collect-audit':'依分類回訪已探索的區域，對照遊戲 Data 頁查漏；本站只有部分清單，不能代替遊戲內的完整核對。',
 'burgl-quests':'隨探索進度查看 BURG.L 的任務清單，確認還有哪些任務未完成，不用把日常任務數量當作結束條件。',
 'personal-audit':'把製作、基地、格擋、遠距攻擊與照片模式穿插在探索中體驗；下方清單直接列出尚需確認的獎盃。',
 'super-win':'依遊戲提示完成最後查漏後，再回到結局檢查評分；保留第一輪的完整成果後才考慮下一周目。',
 'remix-check':'完成第一輪想體驗的探索與故事，再檢查 REMIX.R 的進入條件。網站備份和遊戲存檔都要分別保存。',
 'ng-ending':'在新周目重新體驗主線與挑戰，普通乳牙使用本周目的獨立記錄，不沿用第一輪固定位置的取得狀態。'
};
const step=(id,stageId,title,regionId,action,prerequisites,trophyIds,warning='prep',options={})=>({id,stageId,title,regionId,action,experienceNote:experienceNotes[id],prerequisites,trophyIds,warning,collectibleIds:[],gear:'依遊戲配方準備當前最高可用裝備、治療與撤退路線。',sourceUrls:[sources.ps.url,sources.official.url],verification:'verified',platinum:true,spoiler:!['start','labs'].includes(stageId),...options});
export const steps=[
 step('first-camp','start','建立第一個營地','grass','完成開場引導；設置重生點、飲水和食物，分析遇到的新資源。',[],['resourceful','fine-dining'],'prep'),
 step('oak-rescue','start','調查爆炸並救起 BURG.L','oak','跟隨主線前往 Oak Lab，救起 BURG.L；確認任務與 ASL 商店。',['first-camp'],['burgl-flipper','science-rules']),
 step('field-habits','start','建立收集習慣','grass','使用 PEEP.R 記錄生物，看到文件、錄音、乳牙及 SCA.B 就記下區域。不要追求 Gold Cards 才開始主線。',['oak-rescue'],['growing-pains','snoopy'],'recommended',{platinum:false}),
 step('hedge','labs','Hedge Lab 與 Super Chip','hedge','從樹籬探索路線前往實驗室，收集密碼片段、使用終端並帶回 Super Chip。',['oak-rescue'],['hedge-lab'],'prep',{gear:'備妥滑翔用 Dandelion Tuft、補給與應對蜘蛛的裝備。',collectibleIds:['chip-hedge','scab-bugjuice','scab-supreme']}),
 step('pond','labs','Pond Lab 水下探索','pond','準備水下呼吸及照明裝備，探索 Pond Depths，完成實驗室並帶回 Super Chip。',['oak-rescue'],['pond-lab'],'prep',{gear:'先確認水下呼吸、照明與能在水中使用的工具。',collectibleIds:['chip-pond','scab-holidazzle']}),
 step('haze','labs','Haze Lab','haze','穿越霧區前先準備防毒裝備；完成實驗室並回交 Haze Super Chip。這個實驗室沒有同名獎盃。',['oak-rescue'],[],'prep',{sourceUrls:[sources.haze.url],collectibleIds:['chip-haze']}),
 step('black-ant','labs','Black Ant Hill Lab','black-ant','探索黑蟻丘實驗室，完成 Assistant Manager 戰鬥，取得權限並回交 Super Chip。',['oak-rescue'],['black-ant-hill-lab'],'prep',{collectibleIds:['chip-black-ant']}),
 step('haze-choice','labs','封住 Haze 前保留存檔','haze','封罐會改變庭院的感染分布。先保留可辨識的遊戲存檔，再決定何時封罐。網站 JSON 不是遊戲存檔。',[],['sticky-hands'],'critical'),
 step('tier-three','upper','上層庭院整備','upper','開拓 Upper Yard，準備 Tier 3 工具、裝備及升級素材；建立補給和返回基地的路線。',['hedge','pond','haze','black-ant'],['beefing-up','splinter-master','glob-job']),
 step('undershed','upper','Undershed、Mant 與 Wendell','undershed','跟隨主線 SCA.B 引導探索棚下實驗室，擊敗 Mant 並尋找 Wendell。',['tier-three'],['tighty-whities','raisin-man'],'prep',{collectibleIds:['scab-tully']}),
 step('broodmother','boss','Hedge Broodmother','hedge','在樹籬外側 Lab Outpost 取得 Broodmother Research Notes，解鎖 Broodmother BLT；準備召喚物及裝備後挑戰。',['tier-three'],['mom-genes'],'prep',{sourceUrls:[sources.ps.url,sources.research.url],collectibleIds:['recipe-broodmother']}),
 step('mantis','boss','Mantis','upper','在 Stump Lab Outpost 第一個跑酷房間取得 Mantis Research Notes，解鎖 Orchid Mantis Kebab；以遊戲配方備妥召喚物後挑戰。',['broodmother'],['assassin-assassin'],'prep',{sourceUrls:[sources.ps.url,sources.research.url],collectibleIds:['recipe-mantis']}),
 step('wasp-queen','boss','Wasp Queen','upper','依遊戲提示開啟 Brawny Boy Bin 的探索路線，準備召喚材料後挑戰 Wasp Queen。',['tier-three'],['a-muse-sting']),
 step('schmector','boss','Director Schmector','moldorc','與 Wendell 推進 Moldorc 下的隱藏實驗室劇情並挑戰 Director Schmector。',['undershed'],['ominent-schmominent']),
 step('infected-broodmother','boss','Infected Broodmother','haze','準備對應召喚材料及後期裝備，挑戰感染育母蜘蛛；此戰包含在 46 盃內。',['haze-choice','tier-three'],['creepy-crawler'],'prep'),
 step('ant-queens','boss','三位 Ant Queens 的選擇','black-ant','每位蟻后做選擇前先保存遊戲存檔並閱讀遊戲提示。選擇有跨周目後果，不把全部選項當作同輪都能完成。',[],['royal-arrangements'],'branch'),
 step('javamatic','ending','JavaMatic 防守','upper','依主線準備 Embiggening Cocktail，在裝置周圍修築防禦、帶足修理與戰鬥物資，再啟動事件。',['undershed'],['best-part-of-waking-up']),
 step('ending','ending','返回 SPAC.R 完成結局','grass','保留結局前存檔；完成恢復體型流程，閱讀 Report Card 的查漏提示。獎盃請另按 PSN 實際結果勾選。',['javamatic'],['go-big'],'branch'),
 step('mix-audit','audit','完成所有 MIX.R 防守','grass','從普通 MIX.R 開始；各區提前建造防禦。逐一核對普通與 Super MIX.R，不能以 JavaMatic 代替。',[],['mini-mix-a-lot']),
 step('collect-audit','audit','逐類核對 Report Card','oak','在收集頁確認乳牙、SCA.B、資料、地標、生物卡、商店、Brainpower 與 Boss 條件。資料庫不齊時以遊戲 Data 頁補核。',[],['super-win','flavorful','get-yoked','gotta-peep-them-all'],'prep'),
 step('burgl-quests','audit','完成 BURG.L 任務清單','oak','在遊戲中核對 BURG.L 任務清單；不要把日常任務計數冒充所有必要任務。',[],['no-more-homework']),
 step('personal-audit','audit','補齊製作與個人挑戰','grass','打開獎盃頁，依未取得條件補齊格擋、遠距攻擊、基地舒適度、滑索、寵物與拍照等項目。',[],['block-buster','aim-small','exoskeleton','from-downtown','protein-shake','fortified','web-master','super-dupe','chillax','underexposed','shrinky-and-the-brain','friends-in-low-places','face-your-fears','lounging-around']),
 step('super-win','audit','確認 100% 再完成結局','grass','以遊戲顯示的 Report Card 為準；網站條件勾選只是核對紀錄，不會計算遊戲的實際百分比。',['ending','collect-audit'],['super-win'],'branch'),
 step('remix-check','remix','REMIX.R 啟動前驗收','upper','官方要求 Broodmother、Mantis、Wasp Queen 與 JavaMatic。先備份遊戲及網站進度；建議先在第一輪取得 Super Win，避免新增隨機乳牙負擔。',['broodmother','mantis','wasp-queen','javamatic'],['did-i-do-that'],'critical'),
 step('ng-ending','remix','NG+ 再次恢復體型','grass','遊戲中啟動 REMIX.R 後，在網站建立獨立 NG+ 周目；重新完成主線和結局並確認 Go Big Again。',['remix-check'],['go-big-again'],'prep')
];
export const categories=[
 ['milk','普通乳牙',78,'base','molar'],['mega','巨型乳牙',45,'both','molar'],['scab','SCA.B 配色',51,'both','scab'],['chip','BURG.L 晶片',null,'both','chip'],['document','資料文件',null,'base','haze'],['audio','錄音',null,'base','haze'],['recipe','特殊配方',null,'both','report'],['landmark','地標',null,'base','report'],['creature','Creature Cards',null,'both','report'],['mix','MIX.R 防守',null,'base','mix']
].map(([id,name,referenceTotal,worldScope,source])=>({id,name,referenceTotal,worldScope,complete:false,sourceUrls:[sources[source].url],verification:'verified',totalNote:'來源參考總量；本站逐項資料庫未齊，不能據此宣稱 100%。'}));
const item=(id,category,officialName,regionId,layer,locationDescription,source,options={})=>({id,category,officialName,regionId,layer,locationDescription,worldScope:categories.find(c=>c.id===category).worldScope,spawnRule:'fixed',requiredFor:['super-win'],sourceUrls:[sources[source].url],verification:'verified',positionAccuracy:'region-only',...options});
export const collectibles=[
 item('milk-old-anthill','milk','Milk Molar · Old Anthill','oak','underground','Oak Lab 通往舊蟻丘的洞穴段。','molar'),
 item('milk-red-anthill','milk','Milk Molar · Red Anthill entrance','grass','underground','紅蟻丘入口附近，主洞室土台下。','molar'),
 item('milk-hedge-wreckage','milk','Milk Molar · Hedge wreckage','hedge','ground','Hedge Lab 後方實驗室殘骸。','molar'),
 item('milk-hedge-juice','milk','Milk Molar · Apricop Punch-O','hedge','high','Apricop Punch-O 上方。','molar'),
 item('milk-hedge-roof','milk','Milk Molar · Hedge storage roof','hedge','high','Hedge Lab 儲藏室屋頂。','molar'),
 item('milk-pond-net','milk','Milk Molar · Pond net','pond','underwater','池塘沉木旁的網子下方。','molar'),
 item('mega-oak-battery','mega','Mega Milk Molar · Oak battery room','oak','underground','Oak Lab 電池房左側中段狹道。','molar'),
 item('mega-oak-rock','mega','Mega Milk Molar · Oak interior','oak','underground','橡樹內部可炸開岩石後。','molar'),
 item('mega-hedge-branch','mega','Mega Milk Molar · Hedge branch','hedge','high','Hedge Lab 附近樹枝。','molar'),
 item('mega-birdbath','mega','Mega Milk Molar · Bird Bath','hedge','high','鳥浴盆區角落。','molar'),
 item('mega-sunken-chest','mega','Mega Milk Molar · Sunken Outpost chest','pond','underwater','有 Sunken Outpost Chip 的寶箱內，需 Mossy Key。','molar'),
 ...[['bugjuice','Bugjuice','hedge','high','Small Outpost A 的櫃子上。'],['supreme','Supreme','hedge','high','樹籬 Flingman Flying Disc 上。'],['hedgeberry','Hedgeberry','hedge','high','鳥浴盆的頂層。'],['legend','Legend','hedge','ground','樹籬後角 Fizzam Can 內。'],['holidazzle','Holidazzle','pond','underwater','連接 Pond Depths 的 Turbine Outpost，入口附近架上。'],['tully','Tully','undershed','underground','棚下實驗室最後房間，Wendell 旁桌子。'],['javamatic','JavaMatic','upper','high','JavaMatic 咖啡罐頂部。'],['dog-loaf','Dog Loaf','picnic','high','野餐桌東北邊，盤子下塑膠刀上。']].map(([id,name,r,l,loc])=>item('scab-'+id,'scab',name,r,l,loc,'scab',{requiredFor:['super-win','flavorful']})),
 ...[['hedge','Hedge BURG.L Chip','hedge','high','完成樹籬實驗室後核對 Super Chip。'],['pond','Pond BURG.L Chip','pond','underwater','Pond Lab 最後的圓頂房間。'],['haze','Haze BURG.L Chip','haze','underground','Haze Lab 最後房間。'],['black-ant','Black Anthill BURG.L Chip','black-ant','underground','完成黑蟻丘實驗室後核對 Super Chip。'],['sunken','Sunken Outpost BURG.L Chip','pond','underwater','Pond Depths 上鎖寶箱，需 Mossy Key。'],['sandbox','Sandbox BURG.L Chip','sandbox','ground','塑膠鏟後方的 Sandbox Lab Outpost，需 Assistant Manager 權限。']].map(([id,name,r,l,loc])=>item('chip-'+id,'chip',name,r,l,loc,id==='haze'?'haze':'chip')),
 ...[['big-brain','Big Brain Time'],['blazed-earth','Blazed Earth Protocol'],['phase-three','Phase III Results'],['recon-special','Recon Journal: Special Forces'],['snapshot-3','Suspicious Snapshot 3']].map(([id,name])=>item('data-'+id,'document',name,'haze','underground','來源確認位於 Haze Lab；房內精確位置待查證。','haze')),
 ...[['goodbye-wendell','Goodbye Wendell'],['trudy-blues','Trudy Blues']].map(([id,name])=>item('audio-'+id,'audio',name,'haze','underground','來源列於 Haze Lab 資料；精確位置待查證。','haze',{verification:'unverified',requiredFor:[]})),
 ...[['grass','Grasslands MIX.R','grass'],['hedge','Hedge MIX.R','hedge'],['haze','Haze MIX.R','haze'],['sandbox','Sandbox MIX.R','sandbox'],['north','Northern Grasslands MIX.R','picnic'],['lawnmower','Lawnmower Super MIX.R','upper'],['upper','Upper Grasslands Super MIX.R','upper'],['moldorc','Moldorc Super MIX.R','moldorc']].map(([id,name,r])=>item('mix-'+id,'mix',name,r,'ground','區域已知；啟動前修築防禦。區域中心不是裝置座標。','mix',{requiredFor:['super-win','mini-mix-a-lot']})),
 ...[['oak','Oak Lab','oak','underground'],['hedge','Hedge Lab','hedge','high'],['pond','Pond Lab','pond','underwater'],['haze','Haze Lab','haze','underground']].map(([id,name,r,l])=>item('landmark-'+id,'landmark',name,r,l,'進入區域並以遊戲 Data 地標頁確認發現狀態。',id==='haze'?'haze':'chip')),
 item('recipe-broodmother','recipe','Broodmother Research Notes · Broodmother BLT','hedge','high','樹籬外側、Hedge Lab 附近的 Lab Outpost；筆記解鎖召喚配方。','research'),
 item('recipe-mantis','recipe','Mantis Research Notes · Orchid Mantis Kebab','upper','underground','Stump Lab Outpost 第一個跑酷房間，底部藍色光柱上方。','research'),
 ...[['broodmother','Hedge Broodmother','hedge','high'],['mantis','Mantis','upper','high'],['wasp-queen','Wasp Queen','upper','ground'],['infected-broodmother','Infected Broodmother','haze','underground'],['schmector','Director Schmector','moldorc','underground'],['mant','Mant','undershed','underground'],['assistant-manager','Assistant Manager','black-ant','underground']].map(([id,name,r,l])=>item('card-'+id,'creature',name+' · Creature Card',r,l,'以遊戲 Creature Cards 頁確認此卡已解鎖；這是 Boss 所在概念區域，不是固定收集物座標。','cards',{spawnRule:'unknown',requiredFor:['super-win','gotta-peep-them-all']}))
];
export const superWinConditions=[
 ['shop','商店解鎖','核對 BURG.L Science Shop；社群列月度限定為例外。'],['cards','Creature Cards','核對一般卡片；Gold Cards 不必要。寶寶蟻與 Dimensional Anomalies 例外依周目／版本待實機確認。'],['data','全部資料','核對 Data 頁文件、錄音及配方；感染三明治配方例外依版本確認。'],['sites','全部地標','以遊戲 Data 地標清單核對。'],['molars','乳牙','普通及巨型分開核對；NG+ 普通乳牙另記。'],['mix','全部 MIX.R','包含 Super MIX.R，與 JavaMatic 分開。'],['scab','SCA.B 配色','野外配色與預設配色分開。'],['brain','最高 Brainpower','與獎盃等級 10 的門檻分開核對。'],['schmector','Director Schmector','確認本周目戰鬥紀錄。'],['broodmother','Hedge Broodmother','確認本周目戰鬥紀錄。'],['mantis','Mantis','確認本周目戰鬥紀錄。'],['wasp','Wasp Queen','確認本周目戰鬥紀錄。'],['infected','Infected Broodmother','確認本周目戰鬥紀錄。']
].map(([id,title,detail])=>({id,title,detail,sourceUrls:[sources.report.url],verification:'verified'}));
export const ngRules=[
 {title:'可繼承：基地、物品與配方',detail:'官方確認基地、既有物品與已解鎖配方可帶入。',source:'official',verification:'verified'},
 {title:'重新進行：故事與普通乳牙',detail:'故事進度重新開始；普通乳牙位置隨機化。本站不提供未核實候選座標，也不把候選數當作必收數。',source:'ng',verification:'verified'},
 {title:'卡片、SCA.B、巨型乳牙',detail:'社群記載保留；本站周目切換只對已核對繼承類別沿用勾選，其餘隔離。',source:'ng',verification:'verified'},
 {title:'角色強化',detail:'普通乳牙既有加成保留、可購買等級重開；巨型乳牙不重設。網站僅保存各成員備註，不模擬遊戲數值。',source:'molar',verification:'verified'}
];
