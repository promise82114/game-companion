// 懶人包唯一的武器／分支表。對敵推薦只引用 id，不能為同一武器臨時改元素。
export const fixedWeapons=[
 {id:'fresh-sword',weapon:'Toenail Scimitar',branch:'清新',role:'主力',goal:'優先留給感染育母蜘蛛；感染與劍術大師兼顧生存。'},
 {id:'sour-saw',weapon:'Tick Macuahuitl',branch:'酸味',role:'主力',goal:'留給黑寡婦的單手酸味＋吸血路線；不佔用清新趾甲彎刀。'},
 {id:'sour-hammer',weapon:'Black Ox Hammer',branch:'酸味',role:'主力',goal:'優先處理施密克主管；不再另外做清新／鹹味黑牛鎚。'},
 {id:'salt-star',weapon:'Salt Morning Star',branch:'固有鹹味',role:'主力',goal:'螳螂、黃蜂女王的單手＋盾牌主力。'},
 {id:'spicy-sword',weapon:'Spicy Coaltana',branch:'固有辣味',role:'主力',goal:'留給樹籬育母蜘蛛；打蜱蟲時直接沿用。'},
 {id:'salt-spear',weapon:'Rusty Spear',branch:'鹹味',role:'主力',goal:'留給白蟻王與白蟻巢；不再把同一長矛改成清新。'},
 {id:'fresh-mace',weapon:'Mint Mace',branch:'固有清新',role:'主力',goal:'感染狼蛛與清新近戰需求，簡單敵人沿用。'},
 {id:'fresh-rapier',weapon:'Tiger Mosquito Rapier',branch:'清新',role:'主力',goal:'綠椿的清新穿刺與吸血，兼顧防毒面具換裝後的續戰。'},
 {id:'axe',weapon:'Termite Axe',branch:'強悍',role:'既有工具',goal:'採集工具兼作飛蛾過渡，維持一把，不額外投資元素副本。'},
 {id:'early-hammer',weapon:'Insect Hammer',branch:'強悍／先 +5',role:'既有工具',goal:'首遇助理經理仍用二階粉碎；尚未 +6 時無須預先耗高階材料。'},
 {id:'bow',weapon:'Black Ox Crossbow',branch:'強悍；鹹味箭',role:'過渡限定',transitionOnly:true,goal:'只在空中搆不到時備用，可不製作；鹹味在箭矢上，不是弩的永久元素。'},
 {id:'staff',weapon:'Mint Staff',branch:'固有清新',role:'過渡限定',transitionOnly:true,goal:'已有且願意用法杖時才拿來清幼蟲群，可不製作。'},
 {id:'acid-axe',weapon:'Acid Edge',branch:'固有酸味',role:'過渡限定',transitionOnly:true,goal:'需先擊敗主管解鎖，列為已有時的可選用法，不是懶人包必要投資。'},
 {id:'boss-club',weapon:'Club of the Mother Demon',branch:'鹹味',role:'過渡限定',transitionOnly:true,goal:'需育母素材，已有再用；不要求為螳螂或黃蜂再刷一把。'}
];
const use=(id,note='',shield='')=>({id,note,shield});
const row=(target,difficulty,specialized,transition,reason)=>({target,difficulty,specialized,transition,reason});
export const fixedDifficultyLabels={1:'先練手',2:'三階單體',3:'機制與環境',4:'高壓挑戰',5:'最難目標'};
// 以第一輪單人、一般難度、準備齊全的常見壓力估計；不是主線先後或遊戲官方評級。
export const fixedMatchups=[
 row('Fire Worker Ant',1,[],[use('fresh-mace','沿用清新主力清群。')],'不為工蟻另做武器，躲開酸液即可。'),
 row('Ladybird Larva',1,[],[use('fresh-rapier','沿用綠椿用的清新穿刺。','Ladybird Shield'),use('staff','已有才清群，可跳過。')],'特化欄留空；這裡是共用配置，不為幼蟲再做另一把清新長矛。'),
 row('Tick',1,[],[use('spicy-sword','沿用育母用的辣味炭刃。')],'避免被包圍吸血，辣味主力加減用。'),
 row('Fire Soldier Ant',1,[],[use('fresh-mace','和工蟻共用清新主力。'),use('fresh-rapier','想留盾牌容錯時使用。','Ladybird Shield')],'不把清新趾甲彎刀當首選，兵蟻有揮砍抗性。'),
 row('Termite',1,[],[use('salt-spear','沿用白蟻王的鹹味穿刺。','Ladybird Shield')],'先把白蟻王需要的長矛練好，工蟻直接共用。'),
 row('Termite Soldier',1,[],[use('salt-spear','沿用同一把鹹味長矛。','Ladybird Shield')],'塵霧裡不要貪連刺，退出減速再打。'),
 row('Antlion',2,[],[use('salt-star','沿用螳螂用的鹹味武器。','Ladybird Shield')],'能吃鹹味，但不是最佳揮砍特化；省下另一把鹹味大劍。'),
 row('Ladybird',2,[],[use('fresh-mace','沿用固定清新主力。')],'不是粉碎＋清新雙弱點；黑牛鎚保留酸味給主管，不再改元素。'),
 row('Roly Poly',2,[],[use('fresh-mace','沿用清新棍棒。')],'不是粉碎特化，仍足以作一般刷取；抓滾動後的空檔。'),
 row('Tiger Mosquito',2,[],[use('fresh-sword','沿用感染育母用的清新揮砍。','Ladybird Shield')],'共用已練好的劍，擋住突進再反擊。'),
 row('Moth',2,[],[use('axe','既有強悍白蟻斧過渡，不多做元素斧。','Ladybird Shield'),use('acid-axe','已有主管後武器才用。')],'先引到能近戰的位置；強悍斧少了元素加成，屬省投資的過渡。'),
 row('Black Ox Beetle',2,[],[use('salt-star','沿用螳螂用的鹹味主力。','Ladybird Shield')],'有鹹味、沒有粉碎雙重優勢；不為黑牛另造鹹味黑牛鎚。投石用側移閃。'),
 row('Assistant Manager',3,[],[use('early-hammer','首遇先 +5，按二階進度準備。','Black Ant Shield')],'此處是早期流程，不能要求先取得主管後裝備；機關處理比硬換三階武器重要。'),
 row('Termite King',3,[use('salt-spear','鹹味＋穿刺，固定留給白蟻王。','Ladybird Shield')],[],'血厚且巢道狹窄，單手＋盾保留容錯；先清旁邊白蟻。'),
 row('Green Shield Bug',3,[use('fresh-rapier','清新穿刺＋吸血，搭防毒面具。','Ladybird Shield')],[],'生鏽長矛已分配鹹味，本包用清新虎蚊細劍接手；戴面具會中斷三件套，優先保續戰。'),
 row('Wasp',3,[],[use('salt-star','落地後沿用鹹味主力。','Ladybird Shield'),use('bow','只在空中搆不到時備用，可不做。')],'先處理雄蜂；不愛遠程就引到能近戰的高度，不強迫練弩。'),
 row('Mant',3,[],[use('fresh-sword','沿用後期要用的清新彎刀。','Ladybird Shield'),use('fresh-mace','已有強化時可用。')],'單手較容易保留格擋；此時不要求還沒解鎖的酸蝕利刃。'),
 row('Hedge Broodmother',4,[use('spicy-sword','辣味＋揮砍，第一輪雙手主力。')],[],'先完成碳刃防守取得武器；雙手用武器招架，清小怪再輸出，不靠毒傷。'),
 row('Director Schmector',4,[use('sour-hammer','粉碎＋酸味，固定為主管保留分支。','Ladybird Shield')],[use('sour-saw','已有時可以單手續戰，但物理類型較不利。','Ladybird Shield')],'不能拿打倒他才解鎖的酸蝕利刃當首次對策；盾也不能取代移位避雷射。'),
 row('Infected Wolf Spider',4,[use('fresh-mace','清新高傷與余震。')],[use('fresh-sword','需要單手容錯時共用清新彎刀。','Ladybird Shield')],'爆炸與落點要閃，盾只能處理適用的正面攻擊；不要把普通格擋當全傷害免疫。'),
 row('Black Widow',4,[use('sour-saw','酸味單手＋吸血，保留清新彎刀給最難戰。','Ladybird Shield')],[use('acid-axe','主管後已有時的高效率雙手替代，可不製作。')],'此配置沒有趾甲彎刀的感染，需更注意節奏；先阻止牠吃小蜘蛛，不能只站樁吸血。'),
 row('Wasp Queen',4,[use('salt-star','鹹味單手＋盾處理飛針。','Ladybird Shield')],[use('bow','空中補傷，可跳過。'),use('boss-club','已有育母棍棒才在落地空檔用。')],'先看召喚物與落地空檔，鹹味棍棒與弩都只屬可選過渡。'),
 row('Mantis',4,[use('salt-star','鹹味通用傷害，配盾保留容錯。','Ladybird Shield')],[use('boss-club','已有才用；省下刷育母素材的必要性。')],'跳開難以格擋的範圍招式。特化不用高成本 Boss 武器，穩定存活後再考慮收盾。'),
 row('Infected Broodmother',5,[use('fresh-sword','本包最高優先：清新趾甲彎刀＋劍術大師。','Ladybird Shield')],[],'先把這把升到 +9。感染有助壓低敵人節奏；避免爆炸、鹹味與辣味，補品提早用，不為雙手欄硬塞選項。')
];
