import {bwiki, trophyNames, collectibleNames} from './localization.js';

// 事實資料與進度分離。位置文字為自行整理；沒有第三方座標或底圖。
export const checkedAt='2026-11-17';
export const sources={
 bwiki:{label:'BWIKI 禁閉求生',url:bwiki.home},
 bwikiNames:{label:'BWIKI 遊戲名稱對照',url:bwiki.translation},
 bwikiTrophies:{label:'BWIKI 成就系統',url:bwiki.achievements},
 bwikiStory:{label:'BWIKI 故事模式',url:bwiki.story},
 bwikiWeapons:{label:'BWIKI 武器數值',url:bwiki.weapons},
 bwikiArmor:{label:'BWIKI 護甲屬性',url:bwiki.armor},
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
sources.quests={label:'BURG.L Apprentice／Daily 任務',url:'https://grounded.wiki.gg/wiki/BURG.L_Quests'};
sources.bin={label:'Brawny Boy Bin 入口',url:'https://grounded.wiki.gg/wiki/Brawny_Boy_Bin'};
sources.psGuide={label:'PS5 蟻后與白金路線（版本差異留意）',url:'https://www.psthc.fr/unjeu/grounded-ps5/guide-trophees.htm'};
sources.baby={label:'蟻寶寶卡與友好供品',url:'https://grounded.wiki.gg/wiki/Baby_Fire_Ant'};
// 本站 ID，不是 PSN 數字 ID。條件為自行撰寫的繁中摘要，非官方繁中譯名。
const trophyRows=[
 ['gnats-all-folks',"Gnat's All Folks!",'取得其餘 Grounded 獎盃。','platinum','meta'],
 ['science-rules','Science Rules','在 ASL 商店首次購買升級。舊來源寫漢堡小哥，介面版本有差異。','bronze','craft'],
 ['growing-pains','Growing Pains','首次取得突變。','bronze','explore'],
 ['resourceful','Resourceful','分析 15 種資源。','bronze','craft'],
 ['from-downtown','From Downtown','從超過 40 cm 外將球投入籃框。','bronze','craft'],
 ['lounging-around','Lounging Around','坐在椅子上休息。','bronze','craft'],
 ['block-buster','Block Buster','連續成功完美格擋 10 次。','bronze','combat'],
 ['exoskeleton','Exoskeleton','穿上同一套二階護甲。','bronze','craft'],
 ['beefing-up','Beefing Up','首次製作三階物品。','bronze','craft'],
 ['flavorful','Flavorful','取得 10 種新的 SCA.B 配色。','bronze','collection'],
 ['protein-shake','Protein Shake','飲用 5 杯採已知配方調製的強力飲品。','bronze','craft'],
 ['fortified','Fortified','首次建造蘑菇磚建築。','bronze','craft'],
 ['snoopy','Snoopy','發現地圖上的 20 個地點。','bronze','explore'],
 ['face-your-fears','Face Your Fears','首次擊敗狼蛛。','bronze','combat'],
 ['web-master','Web Master','滑過玩家建造、長於 100 cm 的滑索。','bronze','craft'],
 ['friends-in-low-places','Friends in Low Places','馴養一隻昆蟲寵物。','bronze','explore'],
 ['get-yoked','Get Yoked','使用 20 顆普通乳牙強化自己。','bronze','collection'],
 ['shrinky-and-the-brain','Shrinky and the Brain','腦力值達到等級 10。','bronze','craft'],
 ['glob-job','Glob Job','在鍛造站將三階物品升到最高等級。','bronze','craft'],
 ['aim-small','Aim Small','用箭擊殺距離超過 30 cm 的飛行昆蟲。','bronze','combat'],
 ['underexposed','Underexposed','進入拍照模式；另一來源寫拍照，建議進入後再拍攝。','bronze','explore'],
 ['splinter-master','Splinter Master','製作三階箭矢。','bronze','craft'],
 ['gotta-peep-them-all','Gotta Peep Them All','解鎖全部生物卡；不要與金卡混為一談。','bronze','collection'],
 ['mini-mix-a-lot','Mini Mix-a-lot','完成全部 MIX.R 與超級 MIX.R 防守。','bronze','collection'],
 ['go-big','Go Big','完成恢復正常體型的結局。','silver','story'],
 ['super-win','Super Win','恢復正常體型，且結局遊戲報告卡達到 100%。','gold','collection'],
 ['super-dupe','Super Dupe','使用超能複製機複製一件物品。','bronze','craft'],
 ['chillax','Chillax','在舒適度最高的基地休息。','bronze','craft'],
 ['no-more-homework','No More Homework!','完成漢堡小哥的任務清單。','silver','collection'],
 ['burgl-flipper','BURG.L Flipper','橡樹實驗室爆炸後救起漢堡小哥。','bronze','story'],
 ['hedge-lab','Hedge Lab','完成樹籬實驗室。','bronze','story'],
 ['pond-lab','Pond Lab','完成池塘實驗室。','bronze','story'],
 ['fine-dining','Fine Dining','在燒烤架烹調昆蟲。','bronze','craft'],
 ['mom-genes','Mom Genes','擊敗育母蜘蛛。','silver','combat'],
 ['sticky-hands','Sticky Hands','封住霧靄區的毒氣罐。會改變庭院環境，先備份。','bronze','explore'],
 ['black-ant-hill-lab','Black Ant Hill Lab','完成黑蟻丘實驗室。','bronze','story'],
 ['raisin-man','Raisin Man','找到溫德爾・塔利博士。','bronze','story'],
 ['tighty-whities','Tighty Whities','擊敗人蟻。','silver','story'],
 ['assassin-assassin','Assassin Assassin','擊敗螳螂。','silver','combat'],
 ['best-part-of-waking-up','The Best Part of Waking Up','成功調製巨化雞尾酒。','silver','story'],
 ['ominent-schmominent','Ominent Schmominent','挫敗施密克主管。','silver','combat'],
 ['a-muse-sting','A Muse Sting','擊敗黃蜂女王。','silver','combat'],
 ['creepy-crawler','Creepy Crawler','擊敗感染育母蜘蛛。','gold','combat'],
 ['royal-arrangements','Royal Arrangements','處理全部蟻后；選擇會影響後續，先保留備份。','silver','explore'],
 ['did-i-do-that','Did I Do That?','啟動 REMIX.R。','silver','ngplus'],
 ['go-big-again','Go Big Again','啟動 REMIX.R 後再次完成恢復體型結局。','gold','ngplus']
];
export const trophies=trophyRows.map(([id,officialName,condition,grade,category])=>({id,officialName,name:trophyNames[id],condition,grade,category,verification:['science-rules','underexposed'].includes(id)?'conflicting':'verified',sourceUrls:[sources.ps.url,sources.gg.url,bwiki.achievements],remedy:'手動記錄實際 PSN 跳盃；世界完成不代表每位玩家已取得。版本／補跳機制未實機驗證。'}));
for(const id of ['gotta-peep-them-all','royal-arrangements']){
 const trophy=trophies.find(t=>t.id===id);
 trophy.risk='首次白金建議友好三位蟻后，取得並確認三種蟻寶寶卡，再考慮毒害／感染。超級勝利的卡片例外不能當成得全瞧一眼的免查條件；PS5 當前版本補救與跳盃待實機驗證。';
 trophy.sourceUrls.push(sources.psGuide.url,sources.baby.url);
}
trophies.find(t=>t.id==='no-more-homework').condition='完成漢堡小哥的 100 個學徒任務；不是可重複的每日任務。以 ASL 任務清單及實際 PSN 跳盃確認。';
trophies.find(t=>t.id==='no-more-homework').sourceUrls.push(sources.quests.url);
export const regions=[
 ['grass','草地起點',500,490],['oak','橡樹與實驗室',480,330],['hedge','樹籬',760,555],['pond','池塘',510,210],['haze','霧靄區',280,460],['black-ant','黑蟻丘',180,550],['sandbox','沙盒',120,410],['picnic','野餐桌',135,260],['upper','上層庭院',640,95],['undershed','棚下',330,90],['moldorc','魔多克城堡',815,280]
].map(([id,name,x,y])=>({id,name,anchor:{x,y},precision:'schematic'}));
export const stages=[['start','01','橡樹實驗室與開局'],['labs','02','四大實驗室'],['upper','03','上層庭院與棚下'],['boss','04','隱藏首領與蟻后'],['ending','05','咖啡機防守與結局'],['audit','06','100% 查漏'],['remix','07','REMIX.R 與 NG+']].map(([id,number,title])=>({id,number,title}));
// 本站的探索順序與閱讀建議；不新增遊戲達成條件或虛構收集數量。
const experienceNotes={
 'first-camp':'先把營地當成探索起點，沿途認識資源、食物與飲水來源；不用為了趕主線跳過開場的生存操作。',
 'oak-rescue':'讀完漢堡小哥的對話與任務提示，再查看實驗室和商店，了解後續要回收晶片的目標。',
 'field-habits':'探索時順手查看生物、文件、錄音與配色；以遊戲資料頁確認新發現，避免最後才一次補找。',
 hedge:'沿樹枝路線探索實驗室與周邊小站，留意配色和研究筆記；跳躍前先確認可安全落腳的位置。',
 pond:'先熟悉水下的呼吸與返回路線，再探索實驗室及支線空間；不要只拿到主線物品就忽略周邊。',
 haze:'探索實驗室時閱讀研究資料。完成實驗室與封住毒氣罐是不同事項，封罐留到確認環境變化後再決定。',
 'black-ant':'取得新權限後回看先前無法進入的實驗室區段，並確認晶片是否已回交漢堡小哥。',
 'haze-choice':'先探索目前的庭院環境，再作封罐選擇；重要變化前保留能辨識的遊戲存檔。',
 'tier-three':'開拓新區域時建立穩定的補給與返回路線，依新取得的材料試作裝備，不必把探索壓縮成直衝任務點。',
 undershed:'沿主線探索棚下與實驗室，閱讀研究資料和溫德爾的對話，完成這段故事後再整理後續目標。',
 broodmother:'先閱讀召喚研究筆記，再準備材料與補給；保留探索樹籬及體驗首領戰的完整過程。',
 mantis:'把 Stump Lab 的探索與召喚配方一起完成，備好材料後再挑戰螳螂，避免來回補跑。',
 'wasp-queen':'依遊戲提示探索壯漢玩具箱，確認召喚物與補給後再進入挑戰，不把開啟區域當成擊敗首領。',
 schmector:'與溫德爾推進隱藏實驗室劇情，閱讀對話與研究內容，將這條故事線和一般主線一起體驗。',
 'infected-broodmother':'把這場戰鬥留作後期挑戰，先整理已解鎖的裝備、召喚物和補給，再進行嘗試。',
 'ant-queens':'閱讀每位蟻后提供的選項再作決定；完整體驗不代表同一輪要把互斥的選擇全部做完。',
 javamatic:'把基地建造與防守準備帶進主線事件，先巡查裝置周邊的防線與補給，再啟動防守。',
 ending:'閱讀結局與遊戲報告卡提示，保留結局前存檔，方便回到庭院補看尚未體驗的內容。',
 'mix-audit':'逐區體驗普通 MIX.R 和超級 MIX.R 的防守；先修築防禦，再挑戰尚未完成的裝置。',
 'collect-audit':'依分類回訪已探索的區域，對照遊戲資料頁查漏；本站只有部分清單，不能代替遊戲內的完整核對。',
 'burgl-quests':'隨探索進度查看漢堡小哥的任務清單，確認還有哪些任務未完成，不用把日常任務數量當作結束條件。',
 'personal-audit':'把製作、基地、格擋、遠距攻擊與照片模式穿插在探索中體驗；下方清單直接列出尚需確認的獎盃。',
 'super-win':'依遊戲提示完成最後查漏後，再回到結局檢查評分；保留第一輪的完整成果後才考慮下一周目。',
 'remix-check':'完成第一輪想體驗的探索與故事，再檢查 REMIX.R 的進入條件。網站備份和遊戲存檔都要分別保存。',
 'ng-ending':'在新周目重新體驗主線與挑戰，普通乳牙使用本周目的獨立記錄，不沿用第一輪固定位置的取得狀態。'
};
const step=(id,stageId,title,regionId,action,prerequisites,trophyIds,warning='prep',options={})=>({id,stageId,title,regionId,action,experienceNote:experienceNotes[id],prerequisites,trophyIds,warning,collectibleIds:[],sourceUrls:[sources.bwikiStory.url,sources.official.url],verification:'verified',platinum:true,spoiler:!['start','labs'].includes(stageId),...options});
export const steps=[
 step('first-camp','start','建立第一個營地','grass','先使用可取得獎盃的生存存檔；建立或變更模式前閱讀遊戲的獎盃停用提示。完成開場引導，設置重生點、飲水和食物，分析新資源。',[],['resourceful','fine-dining'],'prep'),
 step('oak-rescue','start','調查爆炸並救起漢堡小哥','oak','跟隨主線前往橡樹實驗室，救起漢堡小哥；確認任務與 ASL 商店。',['first-camp'],['burgl-flipper','science-rules']),
 step('field-habits','start','建立收集習慣','grass','使用 PEEP.R 記錄生物，看到文件、錄音、乳牙及 SCA.B 就記下區域。不要追求金卡才開始主線。',['oak-rescue'],['growing-pains','snoopy'],'recommended',{platinum:false}),
 step('hedge','labs','樹籬實驗室與超級晶片','hedge','從樹籬探索路線前往實驗室，收集密碼片段、使用終端並帶回超級晶片。',['oak-rescue'],['hedge-lab'],'prep',{collectibleIds:['chip-hedge','scab-bugjuice','scab-supreme']}),
 step('pond','labs','池塘實驗室水下探索','pond','準備水下呼吸及照明裝備，探索池塘深處，完成實驗室並帶回超級晶片。',['oak-rescue'],['pond-lab'],'prep',{collectibleIds:['chip-pond','scab-holidazzle']}),
 step('haze','labs','霧靄區實驗室','haze','地表主入口需防毒與香腸炸彈／噴射炸彈炸開破門。進入後啟動掃描器、拉桿，經水路至開啟的門；準備感染瓢蟲戰，再取回超級晶片交漢堡小哥。完成實驗室不等於收齊文件，也不必先封毒氣罐。此處無同名獎盃。',['oak-rescue'],[],'prep',{sourceUrls:[sources.haze.url],collectibleIds:['chip-haze','data-big-brain','data-blazed-earth','data-phase-three','data-recon-special','data-snapshot-3','audio-goodbye-wendell','audio-trudy-blues']}),
 step('black-ant','labs','黑蟻丘實驗室','black-ant','探索黑蟻丘實驗室，完成助理經理戰鬥，取得權限並回交超級晶片。',['oak-rescue'],['black-ant-hill-lab'],'prep',{collectibleIds:['chip-black-ant']}),
 step('haze-choice','labs','封住霧靄區前保留存檔','haze','封罐會改變庭院的感染分布。先保留可辨識的遊戲存檔，再決定何時封罐。網站 JSON 不是遊戲存檔。',[],['sticky-hands'],'critical'),
 step('tier-three','upper','上層庭院整備','upper','開拓上層庭院，準備三階工具、裝備及升級素材；建立補給和返回基地的路線。',['hedge','pond','haze','black-ant'],['beefing-up','splinter-master','glob-job']),
 step('undershed','upper','棚下、人蟻與溫德爾','undershed','先回交四枚超級晶片，向漢堡小哥取得 SCA.B 替換保險絲。依主線到棚上全尺寸 SCA.B 修復後進棚下，探索實驗室、擊敗人蟻並尋找溫德爾。棚下完整洞穴路線仍待補。',['tier-three'],['tighty-whities','raisin-man'],'prep',{collectibleIds:['scab-tully'],sourceUrls:[sources.research.url],verification:'unverified'}),
 step('broodmother','boss','樹籬育母蜘蛛','hedge','在樹籬外側實驗室前哨站取得育母蜘蛛研究筆記，解鎖育母蜘蛛三明治；準備召喚物及裝備後挑戰。',['tier-three'],['mom-genes'],'prep',{sourceUrls:[sources.ps.url,sources.research.url],collectibleIds:['recipe-broodmother']}),
 step('mantis','boss','螳螂','upper','在樹樁實驗室前哨站第一個跑酷房間取得螳螂研究筆記，解鎖蘭花螳螂烤串；以遊戲配方備妥召喚物後挑戰。',['broodmother'],['assassin-assassin'],'prep',{sourceUrls:[sources.ps.url,sources.research.url],collectibleIds:['recipe-mantis']}),
 step('wasp-queen','boss','黃蜂女王','upper','破壞上層庭院的小蜂巢，直到出現蜂巢遭擾動的提示；睡眠觸發動畫後，從壯漢玩具箱前方新開的洞口進入。開箱會擴散蜂群，行動前保存遊戲存檔。箱內召喚配方與完整路線仍待查證，確認遊戲配方後再挑戰黃蜂女王。',['tier-three'],['a-muse-sting'],'branch',{sourceUrls:[sources.bin.url],verification:'unverified'}),
 step('schmector','boss','施密克主管','moldorc','與溫德爾推進魔多克城堡下的隱藏實驗室劇情並挑戰施密克主管。',['undershed'],['ominent-schmominent']),
 step('infected-broodmother','boss','感染育母蜘蛛','haze','準備對應召喚材料及後期裝備，挑戰感染育母蜘蛛；此戰包含在 46 盃內。召喚配方、入口與打法細節仍待查證。',['haze-choice','tier-three'],['creepy-crawler'],'prep',{verification:'unverified'}),
 step('ant-queens','boss','三位蟻后的選擇','black-ant','三位蟻后分別位於紅、黑、火蟻丘。首次白金建議選友好供品，取得並確認各自的蟻寶寶卡後，再考慮毒害／感染；選擇前保留遊戲存檔。皇家安排是處理三位蟻后，不要求殺死她們。卡片獎盃與超級勝利的例外不同，PS5 補跳機制待實機確認。',[],['royal-arrangements'],'branch',{sourceUrls:[sources.official.url,sources.psGuide.url,sources.baby.url]}),
 step('javamatic','ending','JavaMatic 咖啡機防守','upper','依主線準備巨化雞尾酒，在裝置周圍修築防禦、帶足修理與戰鬥物資，再啟動事件。',['undershed'],['best-part-of-waking-up']),
 step('ending','ending','返回 SPAC.R 完成結局','grass','保留結局前存檔；完成恢復體型流程，閱讀遊戲報告卡的查漏提示。獎盃請另按 PSN 實際結果勾選。',['javamatic'],['go-big'],'branch'),
 step('mix-audit','audit','完成所有 MIX.R 防守','grass','從普通 MIX.R 開始；各區提前建造防禦。逐一核對普通與超級 MIX.R，不能以 JavaMatic 代替。',[],['mini-mix-a-lot']),
 step('collect-audit','audit','逐類核對遊戲報告卡','oak','在收集頁確認乳牙、SCA.B、資料、地標、生物卡、商店、腦力值與首領條件。資料庫不齊時以遊戲資料頁補核。',[],['super-win','flavorful','get-yoked','gotta-peep-them-all'],'prep'),
 step('burgl-quests','audit','完成漢堡小哥任務清單','oak','到 ASL 核對 100 個學徒任務，完成後續解鎖的任務；每日任務可重複，不是再也沒有家庭作業啦的目標。本網站未收錄完整逐任務清單，請逐項對照遊戲與來源。',[],['no-more-homework'],'prep',{sourceUrls:[sources.quests.url]}),
 step('personal-audit','audit','補齊製作與個人挑戰','grass','打開獎盃頁，依未取得條件補齊格擋、遠距攻擊、基地舒適度、滑索、寵物與拍照等項目。',[],['block-buster','aim-small','exoskeleton','from-downtown','protein-shake','fortified','web-master','super-dupe','chillax','underexposed','shrinky-and-the-brain','friends-in-low-places','face-your-fears','lounging-around']),
 step('super-win','audit','確認 100% 再完成結局','grass','以遊戲顯示的遊戲報告卡為準；網站條件勾選只是核對紀錄，不會計算遊戲的實際百分比。',['ending','collect-audit'],['super-win'],'branch'),
 step('remix-check','remix','REMIX.R 啟動前驗收','upper','官方要求育母蜘蛛、螳螂、黃蜂女王與 JavaMatic。先備份遊戲及網站進度；建議先在第一輪取得超級勝利，避免新增隨機乳牙負擔。',['broodmother','mantis','wasp-queen','javamatic'],['did-i-do-that'],'critical'),
 step('ng-ending','remix','NG+ 再次恢復體型','grass','遊戲中啟動 REMIX.R 後，在網站建立獨立 NG+ 周目；重新完成主線和結局並確認再次變大。',['remix-check'],['go-big-again'],'prep')
];
export const categories=[
 ['milk','普通乳牙',78,'base','molar'],['mega','巨型乳牙',45,'both','molar'],['scab','SCA.B 配色',51,'both','scab'],['chip','漢堡小哥晶片',null,'both','chip'],['document','資料文件',null,'base','haze'],['audio','錄音',null,'base','haze'],['recipe','特殊配方',null,'both','report'],['landmark','地標',null,'base','report'],['creature','生物卡',null,'both','report'],['mix','MIX.R 防守',null,'base','mix']
].map(([id,name,referenceTotal,worldScope,source])=>({id,name,referenceTotal,worldScope,complete:false,sourceUrls:[sources[source].url],verification:'verified',totalNote:'來源參考總量；本站逐項資料庫未齊，不能據此宣稱 100%。'}));
const item=(id,category,officialName,regionId,layer,locationDescription,source,options={})=>({id,category,officialName,name:collectibleNames[id],regionId,layer,locationDescription,worldScope:categories.find(c=>c.id===category).worldScope,spawnRule:'fixed',requiredFor:['super-win'],sourceUrls:[sources[source].url],verification:'verified',positionAccuracy:'region-only',...options});
export const collectibles=[
 item('milk-old-anthill','milk','Milk Molar · Old Anthill','oak','underground','橡樹實驗室通往舊蟻丘的洞穴段。','molar'),
 item('milk-red-anthill','milk','Milk Molar · Red Anthill entrance','grass','underground','紅蟻丘入口附近，主洞室土台下。','molar'),
 item('milk-hedge-wreckage','milk','Milk Molar · Hedge wreckage','hedge','ground','樹籬實驗室後方實驗室殘骸。','molar'),
 item('milk-hedge-juice','milk','Milk Molar · Apricop Punch-O','hedge','high','杏桃果汁盒上方。','molar'),
 item('milk-hedge-roof','milk','Milk Molar · Hedge storage roof','hedge','high','樹籬實驗室儲藏室屋頂。','molar'),
 item('milk-pond-net','milk','Milk Molar · Pond net','pond','underwater','池塘沉木旁的網子下方。','molar'),
 item('mega-oak-battery','mega','Mega Milk Molar · Oak battery room','oak','underground','橡樹實驗室電池房左側中段狹道。','molar'),
 item('mega-oak-rock','mega','Mega Milk Molar · Oak interior','oak','underground','橡樹內部可炸開岩石後。','molar'),
 item('mega-hedge-branch','mega','Mega Milk Molar · Hedge branch','hedge','high','樹籬實驗室附近樹枝。','molar'),
 item('mega-birdbath','mega','Mega Milk Molar · Bird Bath','hedge','high','鳥浴盆區角落。','molar'),
 item('mega-sunken-chest','mega','Mega Milk Molar · Sunken Outpost chest','pond','underwater','有沉沒前哨站晶片的寶箱內，需苔蘚鑰匙。','molar'),
 ...[['bugjuice','Bugjuice','hedge','high','小型前哨站 A 的櫃子上。'],['supreme','Supreme','hedge','high','樹籬飛盤上。'],['hedgeberry','Hedgeberry','hedge','high','鳥浴盆的頂層。'],['legend','Legend','hedge','ground','樹籬後角汽水罐內。'],['holidazzle','Holidazzle','pond','underwater','連接池塘深處的渦輪前哨站，入口附近架上。'],['tully','Tully','undershed','underground','棚下實驗室最後房間，溫德爾旁桌子。'],['javamatic','JavaMatic','upper','high','JavaMatic 咖啡罐頂部。'],['dog-loaf','Dog Loaf','picnic','high','野餐桌東北邊，盤子下塑膠刀上。']].map(([id,name,r,l,loc])=>item('scab-'+id,'scab',name,r,l,loc,'scab',{requiredFor:['super-win','flavorful']})),
 ...[['hedge','Hedge BURG.L Chip','hedge','high','完成樹籬實驗室後核對超級晶片。'],['pond','Pond BURG.L Chip','pond','underwater','池塘實驗室最後的圓頂房間。'],['haze','Haze BURG.L Chip','haze','underground','霧靄區實驗室最後房間。'],['black-ant','Black Anthill BURG.L Chip','black-ant','underground','完成黑蟻丘實驗室後核對超級晶片。'],['sunken','Sunken Outpost BURG.L Chip','pond','underwater','池塘深處上鎖寶箱，需苔蘚鑰匙。'],['sandbox','Sandbox BURG.L Chip','sandbox','ground','塑膠鏟後方的沙盒實驗室前哨站，需助理經理權限。']].map(([id,name,r,l,loc])=>item('chip-'+id,'chip',name,r,l,loc,id==='haze'?'haze':'chip')),
 ...[['big-brain','Big Brain Time'],['blazed-earth','Blazed Earth Protocol'],['phase-three','Phase III Results'],['recon-special','Recon Journal: Special Forces'],['snapshot-3','Suspicious Snapshot 3']].map(([id,name])=>item('data-'+id,'document',name,'haze','underground','來源確認位於霧靄區實驗室；房內精確位置待查證。','haze')),
 ...[['goodbye-wendell','Goodbye Wendell'],['trudy-blues','Trudy Blues']].map(([id,name])=>item('audio-'+id,'audio',name,'haze','underground','來源列於霧靄區實驗室資料；精確位置待查證。','haze',{verification:'unverified',requiredFor:[]})),
 ...[['grass','Grasslands MIX.R','grass'],['hedge','Hedge MIX.R','hedge'],['haze','Haze MIX.R','haze'],['sandbox','Sandbox MIX.R','sandbox'],['north','Northern Grasslands MIX.R','picnic'],['lawnmower','Lawnmower Super MIX.R','upper'],['upper','Upper Grasslands Super MIX.R','upper'],['moldorc','Moldorc Super MIX.R','moldorc']].map(([id,name,r])=>item('mix-'+id,'mix',name,r,'ground','區域已知；啟動前修築防禦。區域中心不是裝置座標。','mix',{requiredFor:['super-win','mini-mix-a-lot']})),
 ...[['oak','Oak Lab','oak','underground'],['hedge','Hedge Lab','hedge','high'],['pond','Pond Lab','pond','underwater'],['haze','Haze Lab','haze','underground']].map(([id,name,r,l])=>item('landmark-'+id,'landmark',name,r,l,'進入區域並以遊戲 Data 地標頁確認發現狀態。',id==='haze'?'haze':'chip')),
 item('recipe-broodmother','recipe','Broodmother Research Notes · Broodmother BLT','hedge','high','樹籬外側、樹籬實驗室附近的實驗室前哨站；筆記解鎖召喚配方。','research'),
 item('recipe-mantis','recipe','Mantis Research Notes · Orchid Mantis Kebab','upper','underground','樹樁實驗室前哨站第一個跑酷房間，底部藍色光柱上方。','research'),
 ...[['broodmother','Hedge Broodmother','hedge','high'],['mantis','Mantis','upper','high'],['wasp-queen','Wasp Queen','upper','ground'],['infected-broodmother','Infected Broodmother','haze','underground'],['schmector','Director Schmector','moldorc','underground'],['mant','Mant','undershed','underground'],['assistant-manager','Assistant Manager','black-ant','underground']].map(([id,name,r,l])=>item('card-'+id,'creature',name+' · Creature Card',r,l,'以遊戲生物卡頁確認此卡已解鎖；這是首領所在概念區域，不是固定收集物座標。','cards',{spawnRule:'unknown',requiredFor:['super-win','gotta-peep-them-all']}))
];
// 僅補已核對的現有 ID；沒有改動玩家進度或推測遊戲內排序。
for(const id of ['data-recon-special','data-snapshot-3']){
 const row=collectibles.find(i=>i.id===id);
 row.dataGroup='Ominent';
 row.locationDescription='霧靄區實驗室內感染象鼻蟲洞穴後方的骷髏處；由實驗室通往水管入口的洞穴段查找。地圖僅標霧區群組，不是物品座標。';
 row.sourceUrls=[sources.research.url,sources.haze.url];
}
const trudy=collectibles.find(i=>i.id==='audio-trudy-blues');
Object.assign(trudy,{dataGroup:'Wendell',locationDescription:'從地表主入口進霧靄區實驗室，第一間房的桌上。',requiredFor:['super-win'],verification:'verified',sourceUrls:[sources.research.url]});
export const superWinConditions=[
 ['shop','商店解鎖','到 ASL 核對商品；每月限定不要求，NG+ 的次元異常商品另核對。晶片清單只是解鎖前置，不代表商品已買齊。'],['cards','生物卡','官方確認金卡不必要；社群另排除蟻寶寶與次元異常卡。這是超級勝利例外，不等於個人卡片獎盃免查，PS5 版本待實機確認。'],['data','全部資料','對照遊戲 Data 各分頁；社群排除感染黑蟻／火蟻供品筆記。本站只收錄少量文件，必要性待查證項也不能直接略過。'],['sites','全部地標','以遊戲 Data 地標清單核對。'],['molars','乳牙','普通及巨型分開核對；NG+ 普通乳牙另記。'],['mix','全部 MIX.R','5 個普通與 3 個超級 MIX.R，和 JavaMatic 分開；本站 8 個名稱已列，入口路線仍待補。'],['scab','SCA.B 配色','野外配色與預設配色分開。'],['brain','最高腦力值','與獎盃等級 10 的門檻分開核對；到遊戲腦力值頁確認，本站沒有逐資源查漏表。'],['schmector','施密克主管','確認本周目戰鬥紀錄，不能以永久卡片或個人獎盃代替。'],['broodmother','樹籬育母蜘蛛','確認本周目戰鬥紀錄。'],['mantis','螳螂','確認本周目戰鬥紀錄。'],['wasp','黃蜂女王','確認本周目戰鬥紀錄。'],['infected','感染育母蜘蛛','確認本周目戰鬥紀錄。']
].map(([id,title,detail])=>({id,title,detail,sourceUrls:[sources.report.url],verification:'verified'}));
const conditionLookups={shop:{categoryIds:['chip']},cards:{categoryIds:['creature']},data:{categoryIds:['document','audio','recipe']},sites:{categoryIds:['landmark']},molars:{categoryIds:['milk','mega']},mix:{categoryIds:['mix']},scab:{categoryIds:['scab']},schmector:{stepId:'schmector'},broodmother:{stepId:'broodmother'},mantis:{stepId:'mantis'},wasp:{stepId:'wasp-queen'},infected:{stepId:'infected-broodmother'}};
for(const c of superWinConditions)Object.assign(c,conditionLookups[c.id]||{});
export const ngRules=[
 {title:'可繼承：基地、物品與配方',detail:'官方確認基地、既有物品與已解鎖配方可帶入。',source:'official',verification:'verified'},
 {title:'重新進行：故事、事件與普通乳牙',detail:'故事與多數世界事件重新開始（含封霧、開蜂箱及蟻后選擇；感染蟻后另有後果）。普通乳牙改為當輪隨機位置，第一輪未收的普通乳牙不能原位續找；先保留遊戲存檔。',source:'ng',verification:'verified'},
 {title:'卡片、SCA.B、巨型乳牙',detail:'社群記載保留；本站周目切換只對已核對繼承類別沿用勾選，其餘隔離。',source:'ng',verification:'verified'},
 {title:'角色強化',detail:'普通乳牙既有加成保留、可購買等級重開；巨型乳牙不重設。網站不模擬遊戲角色數值。',source:'molar',verification:'verified'}
];
