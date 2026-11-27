// Only game facts and our navigation notes; no copied walkthrough prose or third-party maps.
const wiki=(page)=>'https://catquest2.fandom.com/wiki/'+page;
export const sources=[
 ['R01','Famizou：秘密通路地標','https://trozo.hateblo.jp/entry/Catquest2trozo','原頁已開啟；日文地標對照，未視為PS4實機驗收。'],
 ['R02','Milpiri：裝備取得表','https://milpiriblog.com/cat_quest_ii-equipments-parts','原頁已開啟；只採裝備與地點事實。跨語任務對照、金箱差異另外標示。'],
 ['R03','Milpiri：金箱紀錄','https://milpiriblog.com/cat_quest_ii-golden_chests','原頁已開啟；部分箱記載不同獎勵，保留差異，不把單次掉落當固定池。'],
 ['R04','Wiki：King Sigil Ruins',wiki('King_Sigil_Ruins'),'搜尋索引回傳完整掉落表；東側Healing Staff、西側Knight Axe。原頁直接讀取受限。'],
 ['R05','Wiki：King Lionardo’s Ruins',wiki('King_Lionardo%27s_Ruins'),'搜尋索引；Room 4固定兩武器、Room 2秘密箱為兵士三件候選。'],
 ['R06','Wiki：King Woofhauser’s Trial',wiki('King_Woofhauser%E2%80%99s_Trial'),'搜尋索引；兩個東側房間固定物品；正文誤寫Lionardo，不沿用。'],
 ['R07','Wiki：Far-Fetched Cave',wiki('Far-Fetched_Cave'),'搜尋索引；西南秘密箱與各箱候選池。'],
 ['R08','Wiki：Purrcluded Cave',wiki('Purrcluded_Cave'),'搜尋索引；西側伸縮尖刺後方秘密路與兵士三件候選池。'],
 ['R09','Wiki：Unus Ruins',wiki('Unus_Ruins'),'搜尋索引；忍者、遊俠、冒險者及騎士候選池。'],
 ['R10','Wiki：Cave Grotto',wiki('Cave_Grotto'),'搜尋索引；西南／西北兩箱候選池，不作每件固定來源。'],
 ['R11','Wiki：Tomb of the Follower',wiki('Tomb_of_the_Follower'),'搜尋索引；西南箱與怪物箱候選池。'],
 ['R12','Wiki：Wyvern Nest',wiki('Wyvern_Nest'),'搜尋索引；擊敗火龍後傳送第二房間，兩房獎勵池分開。'],
 ['R13','Wiki：Novem Ruins',wiki('Novem_Ruins'),'搜尋索引；Catnip Bravo Jumper固定獎勵；與Milpiri記載相符。'],
 ['R14','Wiki：Septencin Ruins',wiki('Septencin_Ruins'),'搜尋索引；西北秘密箱Chef Vest，另有怪物箱。'],
 ['R15','Wiki：Bone-Raiser',wiki('Bone-Raiser'),'搜尋索引；Cursed Ruins固定箱，另有金箱候選。'],
 ['R16','Wiki：Old Master Head',wiki('Old_Master_Head'),'搜尋索引；Undecim Ruins固定箱，其他位置是隨機池。'],
 ['R17','Wiki：Crimson Edge',wiki('Crimson_Edge'),'搜尋索引；Ruff Cove固定箱；Milpiri另記野外箱，不抹除既有來源。'],
 ['R18','Wiki：Stormbringer',wiki('Stormbringer'),'搜尋索引；Woofhauser試煉固定箱與The Power of the Horde獎勵。'],
 ['R19','Wiki：Arcane Mage Hat',wiki('Arcane_Mage_Hat'),'搜尋索引；Lonely Cave東側海箱為固定來源。'],
 ['R20','Wiki：Arcane Mage Vest',wiki('Arcane_Mage_Vest'),'搜尋索引；Artefact of Water Walking獎勵。'],
 ['R21','Wiki：Cat Soldier Helmet',wiki('Cat_Soldier_Helmet'),'搜尋索引；Fur’s a Crowd獎勵，秘密箱僅兵士池候選。'],
 ['R22','Wiki：Catnip Bravo Mask',wiki('Catnip_Bravo_Mask'),'搜尋索引；Rock, Paper, Scissors!!固定獎勵。'],
 ['R23','Wiki：White Mage Hat',wiki('White_Mage_Hat'),'搜尋索引；Fur the Greater Good獎勵。'],
 ['R24','Wiki：The Pawlatinum Chef',wiki('The_Pawlatinum_Chef'),'搜尋索引；完成Howling Maze任務後回Hotto交付取得Chef Hat。'],
 ['R25','Wiki：Pawtimate Armor',wiki('Pawtimate_Armor'),'搜尋索引；Case of the Missing Piece獎勵。'],
 ['R26','Wiki：Fursaken Cave',wiki('Fursaken_Cave'),'搜尋索引；東西箱為骷髏兩件池，北箱固定Armor；不把Crown列保證。'],
 ['R27','Wiki：Cave of the Lion',wiki('Cave_of_the_Lion'),'搜尋索引；Aelius後開放、三件Purrsecutor固定獎勵；箱型衝突另留。'],
 ['R28','Wiki：Tomb of the Wolf',wiki('Tomb_of_the_Wolf'),'搜尋索引；正文犬國位置與三固定獎勵。Empire欄誤填Felingard，與Pawlonijr單件箱型有衝突。'],
 ['R29','Wiki：Drakoth’s Vault',wiki('Drakoth%E2%80%99s_Vault'),'搜尋索引；兩把專用鑰匙與三固定獎勵。'],
 ['R30','Wiki：Lonely Cave',wiki('Lonely_Cave'),'搜尋索引；三固定獎勵，東Cap／西Suit／北Zero Faith。'],
 ['R31','Wiki：Bat Cove',wiki('Bat_Cove'),'搜尋索引；The Doge Knight開門與三固定獎勵；另有墓碑支路但起點未核實。'],
 ['R32','Wiki：Dark Old Master Set',wiki('Dark_Old_Master_Set'),'搜尋索引；五件僅Infinity Tomb箱；不屬白金必要收齊。'],
 ['R33','玩家整理：Mew World更新與新武器','https://www.reddit.com/r/CatQuest/comments/i5xq0d','玩家直接整理的更新與位置；BamBam／Mystery Meat方向與Milpiri對照，仍待PS4核對。'],
 ['R34','Wiki：Quinque Ruins',wiki('Quinque_Ruins'),'搜尋索引；冰／藍／白法師九件候選池。'],
 ['R35','Wiki：Healing Staff',wiki('Healing_Staff'),'搜尋索引；King Sigil固定箱及Case of the Coded Note獎勵。'],
 ['R36','Wiki：Pawlonijr',wiki('Pawlonijr'),'搜尋索引；此單件頁稱monster chest，與地城表東箱位置衝突，僅採Tomb of the Wolf。'],
 ['R37','Wiki：Zero Courage',wiki('Zero_Courage'),'搜尋索引；Cathulhu金箱固定獎勵。'],
 ['R38','開發者回覆：Ultimutt第一火炬','https://steamcommunity.com/app/914710/discussions/0/3338785229797428286/','原頁與開發者2019-11-16回覆；鑰匙在進洞第一支火炬西南。'],
 ['R39','Wiki：Path to Lupus Tomb',wiki('Path_to_Lupus_Tomb'),'搜尋索引；沙漠三個Unknown入口與內部候選池。'],
 ['R40','Wiki：Barking Cave',wiki('Barking_Cave'),'搜尋索引；南方秘密箱為候選池，沒有保證Pawple裝備。'],
 ['R41','Wiki：Cursed Ruins',wiki('Cursed_Ruins'),'搜尋索引；五波戰鬥及Bone-Raiser固定獎勵。'],
 ['R42','Wiki：The Talented Soldier',wiki('The_Talented_Soldier'),'搜尋索引；The Banished接任務、找回頭盔並交付後Storm Helm。'],
 ['R43','Wiki：Knight Axe',wiki('Knight_Axe'),'搜尋索引；Spell of the Cats獎勵與King Sigil固定箱。'],
 ['R44','Wiki：Knight Armor',wiki('Knight_Armor'),'搜尋索引；Seaside Cove固定箱；頁面分類誤寫Headgear，不沿用。'],
 ['R45','Wiki：Golden Chest',wiki('Golden_Chest'),'本批搜尋索引回傳22個箱的固定／候選表，與初版索引相符；另保留R03不同記載。'],
 ['R46','Wiki：Gift of Water Walking',wiki('Gift_of_Water_Walking'),'搜尋索引；任務獎勵Dumbbell及水行，兩者仍獨立記錄。'],
 ['R47','Wiki：Revenge of Furindelmeow',wiki('Revenge_of_Furindelmeow'),'搜尋索引；Mewlder Wand與Invisibility Fur Coat獎勵。'],
 ['R48','Wiki：Wooftopia',wiki('Wooftopia'),'搜尋索引；Elder Mage Robes獎勵。'],
 ['R49','Wiki：Pundora’s Box',wiki('Pundora%27s_Box'),'搜尋索引；箱子交給Barkthan Drayke後Wraith Armor獎勵。'],
 ['R50','Wiki：The Hawt Dog',wiki('The_Hawt_Dog'),'搜尋索引；Over the Limit獎勵。'],
 ['R51','Wiki：Fire Staff',wiki('Fire_Staff'),'搜尋索引；Ruff Cove固定箱與Fur the Mother獎勵。']
].map(([id,label,url,note])=>({id,label,url,note,checkedAt:'2026-11-27'}));

export const equipment=[];
const eq=(items,mode,where,related,route,sources,extra={})=>{for(const id of items.split(' '))equipment.push({entityId:'cq2-eq-'+id,mode,where,relatedEntityIds:related,routeCodes:route.split(' ').filter(Boolean),sourceIds:sources.split(' '),...extra});};
const dg=id=>'cq2-dg-'+id,sq=id=>'cq2-sq-'+id,key=id=>'cq2-key-'+id;
// Candidate pools are evidence of possible acquisition, never a guaranteed drop or a respawn claim.
eq('catventurer-hat catventurer-vest catventurer-blade knight-helm knight-armor knight-axe','pool','Cave Grotto 西南箱',[dg('cave-grotto')],'A02','R10');
eq('blue-mage-hat blue-mage-vest lightning-staff white-mage-hat white-mage-robes healing-staff','pool','Cave Grotto 西北箱',[dg('cave-grotto')],'A02','R10');
eq('ninja-hood ninja-shroud ninja-katana ranger-cap ranger-vest ranger-axe','pool','Unus Ruins 通過波次後的獎勵箱',[dg('unus-ruins')],'F01','R09');
eq('ice-mage-hat ice-mage-vest ice-staff','pool','Quinque Ruins 獎勵箱',[dg('quinque-ruins')],'F01','R34');
eq('scout-helmet scout-armor scout-sword dog-soldier-helmet dog-soldier-armor dog-soldier-sword pawple-ninja-hood pawple-ninja-shroud pawple-katana','pool','Far-Fetched Cave 東南箱',[dg('far-fetched-cave')],'B02','R07');
eq('fire-mage-hat fire-mage-vest fire-staff arcane-mage-hat arcane-mage-vest arcane-staff','pool','Far-Fetched Cave 西南秘密箱',[dg('far-fetched-cave')],'B02','R07');
eq('old-master-head old-master-body old-master-mace crimson-helm crimson-armor crimson-edge storm-helm storm-armor stormbringer','pool','Tomb of the Follower 怪物箱',[dg('tomb-of-the-follower')],'D01','R11');
eq('bard-hat bard-vest bard-lute','pool','Wyvern Nest 第一房間怪物箱',[dg('wyvern-nest')],'F02','R12');
eq('cat-soldier-helm cat-soldier-armor cat-soldier-sword','pool','Purrcluded Cave 西側秘密箱',[dg('purrcluded-cave')],'A04','R08');
eq('skeleton-king-crown skeleton-king-armor','pool','Fursaken Cave 東、西兩箱',[dg('fursaken-cave')],'F01','R26');

// Short factual routes. These do not add new progress flags.
eq('healing-staff','fixed','King Sigil 東側道路寶箱；或 Kit Cat 信箱 Case of the Coded Note',[dg('king-sigil'),sq('case-of-the-coded-note')],'A03 A02','R04 R35');
eq('knight-axe','fixed','King Sigil 西側道路寶箱；或 South Pawt 的 Spell of the Cats',[dg('king-sigil'),sq('spell-of-the-cats')],'A03 A02','R04 R43');
eq('knight-armor','fixed','Seaside Cove 的固定寶箱',[dg('seaside-cove')],'A02','R44');
eq('ice-staff ninja-katana','fixed','King Lionardo 試煉第四房間；分別在西、南兩箱',[dg('king-lionardo-s-trial')],'A04','R05',{note:'西箱 Ice Staff；南箱 Ninja Katana。另有第二房間秘密箱，兩者不要混算。'});
eq('pawple-ninja-hood','fixed','King Woofhauser 試煉：第一傳送點的東側房間箱',[dg('king-woofhauser-s-trial')],'B02','R06');
eq('stormbringer','fixed','King Woofhauser 試煉：第二傳送點的東側房間箱；或 The Power of the Horde',[dg('king-woofhauser-s-trial'),sq('the-power-of-the-horde')],'B02 E01','R06 R18');
eq('catnip-bravo-jumper','fixed','Novem Ruins 波次戰後獎勵箱',[dg('novem-ruins')],'A04','R13 R02');
eq('catnip-bravo-mask','quest','Catnip Farm 完成 Rock, Paper, Scissors! 並交付',[sq('rock-paper-scissors')],'A04','R22');
eq('chef-vest','fixed','Septencin Ruins 西北秘密箱',[dg('septencin-ruins')],'B02','R14 R02');
eq('chef-hat','quest','Pawasis 的 Hotto信箱：The Pawlatinum Chef，完成 Howling Maze 目標後回交',[sq('the-pawlatinum-chef'),dg('howling-maze')],'E01','R24');
eq('bone-raiser','fixed','Deep Forest 的 Cursed Ruins，五波戰鬥後取獎勵',[dg('cursed-ruins')],'F01','R15 R41 R02');
eq('old-master-head','fixed','Undecim Ruins 波次戰後寶箱',[dg('undecim-ruins')],'B01','R16 R02');
eq('old-master-mace','fixed','Devigni Ruins 波次戰後寶箱',[dg('devigni-ruins')],'B02','R02');
eq('crimson-edge','fixed','Ruff Cove 的固定寶箱',[dg('ruff-cove')],'B01','R17',{note:'另有隨機池記錄；Milpiri只列野外箱，不影響此固定來源記載。'});
eq('arcane-mage-hat','fixed','Lonely Cave 東側海面的普通箱',[dg('lonely-cave')],'F01','R19',{note:'海面箱與洞內三件固定獎勵分開；需要水行，海箱精確起點仍待實機核對。'});
eq('arcane-mage-vest','quest','Pawt Bay Lighthouse：Artefact of Water Walking 交付獎勵',[sq('artefact-of-water-walking')],'C02','R20 R02');
eq('cat-soldier-helm','quest','Catpital：Fur’s a Crowd 交付獎勵',[sq('fur-s-a-crowd')],'C01','R21');
eq('white-mage-hat','quest','Whiskerest：Fur the Greater Good 交付獎勵',[sq('fur-the-greater-good')],'A04','R23');
eq('pawtimate-armor','quest','Kit Cat 信箱第五任務：Case of the Missing Piece',[sq('case-of-the-missing-piece')],'A04','R25');
// A Japanese quest table supplies candidate correspondences. The English quest IDs follow the same series/order,
// but the reward pairing has not been independently checked in PS4 footage.
const questCandidates=[
 ['blue-mage-vest','case-of-the-missing-blueprint','A02'],['blue-mage-hat','the-ancient-realm','A04'],
 ['white-mage-robes','the-order-of-the-emeowrald','A04'],['invisibility-fur-coat mewlder-wand','revenge-of-furindelmeow','A04'],
 ['ranger-vest','meat-meat','A02'],['ice-mage-vest','the-spirit-in-the-lake','C01'],['excalipurr','of-swords-and-the-worthy','C01'],
 ['bard-vest','the-second-movement','B01'],['bard-lute','coda','B01'],['fire-staff','fur-the-mother','B02'],['crimson-armor','fur-the-furmily','B02'],
 ['fire-mage-vest','bad-doggos','E01'],['pawple-katana','the-true-weapon','E01'],['dog-soldier-sword','rescuing-purr-rivate-mewan','E01'],
 ['dog-soldier-helmet','finding-purr-rivate-mewan','E01'],['cat-soldier-armor','tracking-purr-rivate-mewan','E01'],['cat-soldier-sword','the-epic-staredown','E01'],
 ['dumbbell','gift-of-water-walking','C02'],['scout-sword','tale-of-a-cat-and-a-dog','B01'],['wraith-armor','pundora-s-box','E01'],
 ['old-master-body','the-powerful-one','E01'],['scout-armor','the-magic-user','E01'],['elder-mage-robes','wooftopia','E01'],
 ['storm-armor','bad-consequences','E01'],['the-hawt-dog','over-the-limit','E01']
];
for(const [items,quest,route] of questCandidates)eq(items,'candidate','日文裝備表記載的任務獎勵；對照 '+quest,[sq(quest)],route,'R02',{note:'任務系列／順序可對照；英文獎勵對應仍待PS4核實，先作優先查找候選，不保證交付即得。'});
eq('storm-helm','quest','The Banished：The Talented Soldier，取回頭盔後回報並開獎勵箱',[sq('the-talented-soldier')],'E01','R42');
eq('general-s-mace','quest','Throne of Lupus：The Pawsitively Secret Contact，交付任務物品後領獎',[sq('the-pawsitively-secret-contact')],'E01','S31 R02');
eq('gentle-suit','quest','Founders Island II：完成 This Is It! 後對話領取',[sq('this-is-it'),key('hidden')],'D02','S07 R02');
eq('gentle-monocle','fixed','Founders Island II 金箱；先完成 Golden Key 鏈',[key('golden'),'cq2-gc-founders'],'D02','S07 R02');
eq('the-architect','fixed','Hidden Cave 前段金箱；打完三 Mimics 取 Golden Key 再回開箱',[dg('hidden-cave'),key('golden')],'D02','S07 R02');
eq('drakoth-armor drakoth-helmet the-dragonmaker','fixed','Drakoth’s Vault 的三個獎勵箱；收齊南、西兩把專用鑰匙',[dg('drakoth-s-vault'),key('drakoth-south'),key('drakoth-west')],'F02','R29');
eq('doge-knight-armor doge-knight-cowl the-bataxe','fixed','Bat Cove 的北、東、南三箱；先完成 The Doge Knight 開門',[dg('bat-cove'),sq('the-doge-knight')],'E01','R31',{note:'北箱Armor／東箱Cowl／南箱Bataxe。'});
eq('skeleton-king-armor','fixed','Fursaken Cave 北側固定箱；東西兩箱另為候選池',[dg('fursaken-cave')],'F01','R26',{note:'Milpiri把Armor寫在犬國秘密洞，與Wiki地城表不同；優先核對這個具名固定箱，其他來源仍待核。'});
eq('purrsecutor-armor purrsecutor-helm purrsecution','fixed','Cave of the Lion 的三個獎勵箱；擊敗 Aelius 後開放',[dg('cave-of-the-lion')],'F03','R27 R02',{note:'三件歸屬相符；個別箱型仍有衝突，沒有指定一定是怪物箱。'});
eq('labrathor-vest labrathor-helm pawlonijr','fixed','Tomb of the Wolf 的三個獎勵箱；擊敗 Aelius 後開放',[dg('tomb-of-the-wolf')],'F03','R28 R36 R02',{note:'Pawlonijr單件頁稱怪物箱，地城表稱東箱；整洞三箱都核對，不把箱型當已確認。'});
eq('jester-bee-cap jester-bee-suit zero-faith','fixed','Lonely Cave 三個獎勵箱：東Cap、西Suit、北Zero Faith',[dg('lonely-cave')],'F03','R30 R02');
eq('the-kingsblade','story','The Eye of Eternity 的 Aelius 戰鬥事件；取得後核對背包',[],'E03','S04 R02');
eq('zero-willpower','fixed','Cactus Cave 末端 Mother of Cacti 後方金箱',[dg('cactus-cave'),'cq2-gc-cactus',key('golden')],'F02','S16 R03');
eq('zero-courage','fixed','Cathulhu 海域金箱；脫離戰鬥後才能開箱',['cq2-gc-cathulu',key('golden')],'F02','R37');
eq('cat-rags dog-rags','fixed','Brave Cave 開場寶箱',[dg('brave-cave')],'A01','R02');
eq('wraith-helm','pool','金箱候選獎勵；沒有核實特定哪一箱固定掉落',[key('golden')],'F01','S32',{note:'只核對到取得類型，不能把任何一個金箱當保證獎勵，也不保證重進能刷新箱。'});
eq('dumbbell','quest','Pawt Bay Lighthouse：Gift of Water Walking 交付獎勵',[sq('gift-of-water-walking')],'C02','R46 R02');
eq('invisibility-fur-coat mewlder-wand','quest','Cat-Face Outlook古代法師系列最後任務：Revenge of Furindelmeow，戰鬥後領取兩件獎勵',[sq('revenge-of-furindelmeow')],'A04','R47 R02');
eq('elder-mage-robes','quest','The Pawasis：完成Wooftopia後領取',[sq('wooftopia')],'E01','R48 R02');
eq('wraith-armor','quest','Pundora’s Box：把箱子交給Barkthan Drayke後領獎',[sq('pundora-s-box')],'E01','R49 R02');
eq('the-hawt-dog','quest','Hotto Doggo信箱系列：Over the Limit交付獎勵',[sq('over-the-limit')],'E01','R50 R02');
eq('fire-staff','fixed','Ruff Cove固定寶箱；另可完成Fur the Mother取得',[dg('ruff-cove'),sq('fur-the-mother')],'B01 B02','R51');
const golden=[['dragonfire','quinque-west','F01'],['dragonfrost','catpital-northeast','F01'],['dragonvoid','barkara','F02'],['elder-mage-beard','barkara-north','F02'],['elder-stick','arcane-south','F01'],['jester-aee-cap','kings-paw-west','F01'],['jester-aee-mace','pawt-north','F01'],['jester-aee-suit','saxim','F01'],['jester-bee-mace','purrsecutor-island','F01'],['wraith-mace','excavation','F02'],['skeleton-king-crown','deep-forest','F01'],['crimson-helm','catnip','F01']];
for(const [item,chest,route] of golden)eq(item,'fixed','金箱索引：'+chest+'；先取得Golden Key',['cq2-gc-'+chest,key('golden')],route,'R45',{note:'Wiki表記固定獎勵，PS4實機未驗；若該箱另有來源衝突，請一併看關聯金箱提醒。'});
eq('wraith-helm wraith-armor wraith-mace elder-mage-beard elder-mage-robes elder-stick skeleton-king-crown skeleton-king-armor bone-raiser','pool','Purrmaha Beach、Felingard Lake、Whiskerest等傳說池金箱',['cq2-gc-purrmaha','cq2-gc-felingard-lake','cq2-gc-whiskerest',key('golden')],'F01','R45',{note:'是候選池，不保證出特定裝備；沒有依據表示已開箱會重新刷新。'});
// Remove only a superseded research candidate when the exact same quest pairing now has a named English source.
for(let i=equipment.length-1;i>=0;i--){const r=equipment[i];if(r.mode==='candidate'&&equipment.some(other=>other!==r&&other.entityId===r.entityId&&other.mode==='quest'&&other.relatedEntityIds.some(id=>r.relatedEntityIds.includes(id))))equipment.splice(i,1);}
// Exact chest IDs are resolved explicitly in the generator; never rename published entities.
eq('bam-bam-hammer','fixed','Mewment Shores 南方 Drakoth 第一鑰匙島附近普通箱，向鑰匙位置西側找',[key('drakoth-south')],'F02','R33 R02',{note:'不需把它當金箱；玩家更新整理與日文表方向相符，PS4版本位置仍待核對。'});
eq('mystery-meat','fixed','犬國西北海面：找縱向金幣列，往其頂端普通箱走',[],'F02','R33 R02',{note:'需水行；不新增精確座標，PS4版本位置仍待核對。'});
eq('dark-old-master-axe dark-old-master-body dark-old-master-head dark-old-master-mace dark-old-master-staff','optional','Infinity Tomb 內挑戰獎勵箱；五件更新裝備',[],'','R32 R02',{note:'選讀更新內容，非白金必要；沒有把額外挑戰塞進主要路線。'});

export const paths=[];
const path=(id,type,steps,route,sourceIds,extra={})=>paths.push({entityId:dg(id),type,steps,routeCodes:route.split(' '),sourceIds:sourceIds.split(' '),...extra});
path('tombstone-cave','secret',['到洞內東側邊緣，向東探入看不見的分支。','墓碑敵人另用場景陷阱／Royal Damage；普通武器無效不代表等級不足。'],'F02','R01 S20',{uncertainty:'洞口等級來源衝突；此處不指定等級或精確格點。'});
path('furrest-cave','secret',['以東側火炬為起點，朝北跨過河面。','越過小島後還有延伸路段，繼續核對箱子。'],'A04','R01',{uncertainty:'忍者藏身處另需Case of the Hidden Grudge；普通清洞與任務入口分開。'});
path('riverside-cove','secret',['到西南陷阱群，在陷阱間向南走出可見地面。'],'A04','R01');
path('king-lionardo-s-trial','secret',['第一次傳送後找西南側邊緣；在燈光之間越過平台，通往第二房間秘密箱。'],'A04','R01 R05',{uncertainty:'箱子是Cat Soldier三件候選池，不保證一次取得全套。'});
path('purrcluded-cave','secret',['找西側唯一的伸縮尖刺格，抓尖刺收回時機往西越過，進隱藏分支。'],'A04','R01 R08');
path('pawful-cave','secret',['在中央偏南的兩座火柱之間往南走，找秘密寶箱分支。'],'B01','R01',{uncertainty:'這是普通秘密箱；任務中的墓碑／骷髏事件仍需啟用Tale of a Cat and a Dog。'});
path('puss-cave','secret',['入口往南越過尖刺區，到緊接其後的火炬之間找分支。'],'A04','R01');
path('winding-cave','secret',['沿洞內第二條橫向通道走到最左端，繼續往可見邊緣外找路。'],'B01','R01');
path('empty-hole','secret',['先到南方淺水邊，再朝中央小島前進。'],'B01','R01');
path('barking-cave','secret',['在南邊兩支火炬的間隙試走，延伸至南方秘密箱。'],'B01','R01 R40');
path('septencin-ruins','secret',['由中央碑文往左下方找隱藏起點。','沿路抵達西北秘密箱，核對Chef Vest；怪物箱是另一份獎勵。'],'B02','R01 R14');
path('king-woofhauser-s-trial','secret',['入口傳送後先走左側傳送路線，到T字路口的火炬之間找隱藏分支。'],'B02','R01 R06');
path('far-fetched-cave','secret',['從洞內西南火柱往南走，找西南秘密箱。','Forcewoofer石碑在洞內另一處，開箱不代替讀石碑。'],'B02','R01 R07');
path('pawt-cave','entrance',['先清大陸入口能到的敵人，讓怪物箱解除鎖定。','取得水行後，查看大陸入口西邊離島上的另外三個洞口。','找到只通往怪物箱小房間的第四入口，再開箱；不要在室內硬找連通道。'],'C01 F01','S02 S19',{uncertainty:'同一洞保留一筆清洞紀錄，沒有把四入口新增成四個已核實分母。'});
path('ultimutt-stash','secret',['進洞後先記住第一支火炬的位置。','向東找三塊石頭，再向南至狗與箱子的支路；回到第一火炬。','鑰匙支路在第一火炬西南，另行確認實際拾起Hidden Stash Key。'],'F02','R01 R38',{uncertainty:'清洞訊息不能替代拿鑰匙；鑰匙分支逐個轉折仍待PS4核對。'});
path('hidden-stash','gated',['先從Ultimutt Stash取得專用鑰匙。','至Throne of Lupus東南／Dog Barracks附近開內門，打敗Skeleton King並開獎勵箱。'],'F02','S10 S12',{uncertainty:'此鑰匙與Hidden Key／Golden Key不同。'});
path('drakoth-s-vault','gated',['水行到Mewment Shores南島與Throne of Lupus西島群，分別完成兩個鑰匙試煉。','帶兩把Drakoth專用鑰匙回寶物庫，開內門並取完三個固定裝備箱。'],'F02','R29 S14');
path('bat-cove','gated',['完成The Doge Knight取任務開門條件，再回Throne of Lupus西側Bat Cove。','分別核對東、北、南三個固定裝備箱。'],'E01','R31',{uncertainty:'另有Pawmas／Mafang墓碑秘密支路，但入口起點未核實；不寫假方向。'});
path('wyvern-nest','entrance',['清第一房間並擊敗Red (Fire) Dragon。','使用傳送台進第二房間，另開第二房間箱；只拿第一房怪物箱不足。'],'F02','R12');
path('path-to-lupus-tomb','entrance',['在Barkara Desert找三個標示Unknown的入口。','依主線走側路通道，從中途出口進墓區；內部箱子與主線互動各自核對。'],'D04','R39 R01');
path('fursaken-cave','secret',['Deep Forest內依岩島間看不見的連接路逐段前進；先核對東、西、北三箱。'],'F01','R01 R26',{uncertainty:'已核對島嶼式路線與三箱配置；完整起點及逐轉彎方向仍待核實，不套用未證實的南→東順序。'});
path('hidden-cave','gated',['Founders Island II任務後拿Hidden Key，回洞開內門。','擊敗三個Golden Mimics，拾起Golden Key，再回前段金箱拿The Architect。'],'D02','S07 S08');
path('cave-of-the-lion','reward',['先擊敗Aelius，再以Continue回同一存檔。','完成洞內挑戰後開完三個Purrsecutor獎勵箱，逐件核對背包。'],'F03','R27',{uncertainty:'未收錄全戰鬥逐秒操作；沒有假設特定計時條件。'});
path('tomb-of-the-wolf','reward',['先擊敗Aelius，再以Continue回同一存檔。','完成Dark Wolfen挑戰後核對Labrathor兩件與Pawlonijr，三箱都檢查。'],'F03','R28 R36',{uncertainty:'Pawlonijr箱型有來源衝突，不固定稱東箱或怪物箱。'});
path('lonely-cave','reward',['挑戰前存檔、補血並升級常用裝備；高等刺蝟不要求先練至200。','勝利後核對東側Cap、西側Suit、北側Zero Faith三箱。'],'F03','R30');
path('troll-cave','gated',['先取得Golden Key，再回離島洞內開完三個金箱。'],'F02','S13 R03',{uncertainty:'獎勵是金錢；只見無敵人不能當作清洞。三箱金額可能因更新不同。'});
