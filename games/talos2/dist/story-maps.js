import {storySources} from './story-data.js';
import {megaBridges} from './bridge-data.js';
// 原創拓樸圖。城市只借用已核對的相對方位；室內不假造樓層比例或北向。
const w=id=>'waypoint-'+id,s=id=>'step-'+id,p=id=>'puzzle-'+id;
const node=(id,label,x,y,caption,target,description='',kind='story')=>({id,label,x,y,caption,target,description,kind});
const maps={};
function map(key,name,nodes,links,source,orientation,pending=''){
 maps[key]={name,nodes,paths:links.map(ids=>ids.map(id=>{const n=nodes.find(n=>n.id===id);if(!n)throw Error(key+' '+id);return[n.x,n.y];})),north:null,sourceUrl:storySources[source].url,orientation,note:'依公開實玩圖文重畫；點標記可回到對應攻略。',pending,legend:'圓點：路標／人物／終端 · 連線：通路關係\n綠色＋勾號：已完成相應攻略項目'};
}
const cityOrientation='下方是中央塔出口；面向博物館時，左為紀念區／考古花園，右為涼亭／文字冒險。非正北、未按比例。';
for(const visit of [1,2,3]){
 const nodes=[
  node('tower','塔',500,590,'電梯／VTOL',w(visit===1?'city1-arrive':visit===2?'city2-depart':'city3-recruit'),'城市層電梯上樓是簡報室，VTOL 在簡報室後。'),
  node('museum','館',500,225,'三圓頂博物館',w(visit===1?'city1-museum':visit===2?'city2-terminal':'city3-recruit'),'館外人物與館內終端見本次回訪清單。'),
  node('garden','遺',190,185,'考古花園',s(visit===1?'purple':visit===2?'city-tour':'final-city'),'博物館左側水岸石牆遺跡。初訪 Purple 在棕櫚與短階梯旁。'),
  node('memorial','紀',160,370,'Drennan 紀念區',s('city-tour')),
  node('milton','休',360,390,'Milton’s Rest',s('city-tour')),
  node('founder','碑',360,510,'Founder／Thecla',s(visit===2?'sinner':'city-tour'),'小圓形休憩區靠塔方向的環形階梯。'),
  node('gazebo','亭',790,370,'Friends 涼亭',s('city-tour')),
  node('pavilion','文',780,515,'Gehenna 文字冒險',s('text-adventures'),'三部文字冒險在此，不在博物館。'),
  node('construction','工',670,70,'穹頂工地',s('city-tour'),'在博物館後側；精確進入轉角待查證。')
 ];
 if(visit===1)nodes.push(node('purple','P',110,90,'Purple 998',s('purple'),'初訪：考古花園棕櫚樹與短階梯旁。'),node('schuyler','S',500,325,'Schuyler 923',s('schuyler'),'博物館外前方。'),node('rand','R',380,265,'Rand 303',s('museum'),'館前／左側展示室的測試任務。'),node('cornelius','C',620,265,'Cornelius 3',s('museum'),'先入館交談；Rand 測試是另一台終端。'),node('damien','D',330,580,'Damien 903',s('petition'),'靠中央塔出口一帶。'));
 if(visit===2)nodes.push(node('neith','N',610,290,'Neith 33',w('city2-terminal'),'館前找她取得 Cornelius 工作終端許可。'),node('purple','P',500,325,'Purple 998',w('city2-west'),'第二次在館前，不是初訪的水岸位置。'),node('atal','A',500,470,'Atal 890',s('city-politics')),node('damien','D',650,380,'Damien 903',s('city-politics')),node('malduc','M',710,580,'Malduc 970',s('city-politics'),'靠中央塔出口一帶。'));
 if(visit===3)nodes.push(node('purple','P',500,490,'Purple 998',w('city3-recruit'),'第三次靠塔的廣場一帶。'),node('damien','D',330,580,'Damien 903',s('final-city')));
 map('CITY-'+visit,'城市・'+['','初訪','北側後回城','Act V 回城'][visit],nodes,[['tower','museum','construction'],['tower','founder','milton','memorial','garden','museum'],['tower','pavilion','gazebo','museum']],'cityMap',cityOrientation,visit===3?'Melville／Yaqut 依黃色三角尋找；目前只核對花圃涼亭與環形階梯畫面，精確城市座標待查證，沒有在此任意落點。':'工地的進入轉角待查證。NPC 位置依到訪次數區分；對話選項仍以本輪路線為準。');
}
for(const visit of [1,2])map('MUSEUM-'+visit,'博物館・'+(visit===1?'初訪':'第二次'),[
 node('entry','入',500,560,'館門／Schuyler',s(visit===1?'schuyler':'sinner')),
 node('host','C',500,440,visit===1?'Cornelius':'Neith 許可',w(visit===1?'city1-museum':'city2-terminal')),
 node('rand','R',180,270,'左室 Rand 測試',s('museum'),'中間的模擬測試終端；不是 Cornelius 工作電腦。'),
 node('domes','3',500,180,'中央三個重現謎題',s('museum')),
 node('arrangers','6',820,270,'右側六面拼塊盤',s('museum')),
 ],[['entry','host','domes'],['rand','host','arrangers']],'city'+(visit===1?'First':'Second'),'從館門向內看：左為 Rand 展示室，中間三個重現謎題，右為六面拼塊盤。只畫房間連接。',visit===2?'Cornelius 工作電腦的精確房內座位待查證，圖上沒有臆測座位落點。':'');
map('CITY-3-STORY','Act V・醒來到登機',[
 node('lab','1',130,150,'Neith 實驗室',w('city3-wake'),'詢問市長與城市近況，再回答未來方向。'),node('ride','2',410,150,'門外同伴／軌道車',w('city3-wake'),'Byron 或 Alcatraz 依劇情分歧。'),node('tower','3',740,150,'中央塔電梯',w('city3-recruit')),
 node('melville','M',380,370,'Melville・黃色三角',w('city3-recruit'),'花圃、涼亭與圓頂建築；精確城市座標待查證。'),node('yaqut','Y',740,370,'Yaqut・黃色三角',w('city3-recruit'),'環形階梯廣場；精確城市座標待查證。'),node('vtol','4',570,570,'回塔上層 → VTOL',w('city3-recruit'))
 ],[['lab','ride','tower','melville','vtol'],['tower','yaqut','vtol']],'megaWest','這是任務順序圖，實驗室不在市中心廣場內。人物點表示先後關係，不表示城市座標。','兩名招募人物以遊戲黃色三角定位；是否願意同行取決本輪對話與選擇。');
map('MEGA-E-ENTRY','東側巨構・入口與回程',[
 node('vtol','機',500,580,'VTOL／來時走廊',w('east-arrival')),node('hall','廳',500,370,'入口大廳',w('east-lobby')),node('lift','Y',500,130,'不能用的電梯／Yaqut',w('east-lobby')),
 node('l1','L1',190,350,'NOEMA-01・回程讀',w('east-terminal1'),'去程 Melville 使用中；回程讀 Rust。'),node('l2','L2',180,140,'Byron・觀景盡頭',w('east-byron')),
 node('r1','R1',800,350,'水池 NOEMA-2・盡頭',w('east-terminal2')),node('r2','R2',800,140,'主路・等開門',w('east-door')),
 node('bridge','橋',800,520,'右轉兩次 → Yaqut',w('east-yaqut'),'長廊盡頭金環通往中央三色門區。')
 ],[['vtol','hall','lift'],['hall','l1'],['hall','l2'],['hall','r1'],['hall','r2','bridge']],'megaEast1','面向正面電梯辨認左 L1／L2、右 R1／R2。R2 才是深入主路；右轉後連到中央區，圖上連線不代表走廊長度。');
map('MEGA-E-CORE','東側巨構・三色門',[
 node('entry','入',500,570,'長廊／第一金環',w('east-central')),node('core','中',500,340,'中央平台',w('east-central')),
 node('green','綠',820,340,'① 綠炮・鑽孔器',p('MEGA-E-green')),node('red','紅',260,510,'② 紅炮',p('MEGA-E-red')),node('blue','藍',180,240,'③ 藍炮',p('MEGA-E-blue')),
 node('door','門',500,140,'三色接收器大門',w('east-terminal3')),node('memory','電',500,40,'NOEMA-03／記憶',w('east-terminal3'))
 ],[['entry','core','door','memory'],['core','green','red','blue','core']],'megaEast2','中央平台面向大門：綠右、藍左、紅在入口側。攻略順序綠 → 紅 → 藍；完成後循黃色三角進門，回程讀入口 L1。');
map('MEGA-N','北側巨構・重力與撤離',[
 node('vtol','機',150,560,'VTOL',w('north-door')),node('court','庭',150,370,'入口庭院',w('north-door')),node('closed','×',100,160,'左梯門・未開',w('north-door')),
 node('override','電',390,160,'Door override',w('north-door')),node('byron','B',650,160,'Byron 啟動紅光',w('north-byron')),
 node('blue','藍',850,330,'藍炮／重力翻轉',p('MEGA-N-blue')),node('green','綠',600,390,'綠炮／重力翻轉',p('MEGA-N-green')),node('memory','電',650,570,'三色門／Byron 終端',w('north-memory')),node('exit','返',360,560,'黃色三角撤離',w('north-exit-route'))
 ],[['vtol','court','closed'],['court','override','byron','blue','green','memory','exit','vtol']],'megaNorth1','路線圖，重力區不共用一個水平地板。紅光由 Byron 處理，玩家解藍／綠。事故後轉撤離，不再向終端深處走。','撤離所有樓層與逐轉角尚未完整核對，跟黃色三角；圖不提供未查證的捷徑。');
map('MEGA-S-ENTRY','南側巨構・入口與交通',[
 node('vtol','機',140,550,'VTOL／自動門',w('south-terminal')),node('fork','岔',140,300,'第一個岔路',w('south-terminal')),node('empty','×',100,110,'左・空電梯井',w('south-terminal')),node('terminal','電',420,110,'右・文字終端',w('south-terminal')),
 node('lift','梯',420,300,'可用電梯',w('south-terminal')),node('car','纜',700,300,'橋左側纜車',w('south-terminal')),node('lift2','梯',850,490,'第二電梯',w('south-terminal')),node('prometheus','P',560,560,'Prometheus 正面',w('south-start'))
 ],[['vtol','fork','empty'],['fork','terminal'],['fork','lift','car','lift2','prometheus']],'megaSouth1','先讀右支線終端，再搭可用電梯。釋放後逆序搭電梯、纜車與電梯回 VTOL。','南側其餘文字檔與各台終端的逐一位置對照待查證；不能把四份文字當成四台已定位電腦。');
map('MEGA-S-PINS','南側巨構・五根插銷',[
 node('lever','拉',500,560,'開始／5⁄5 後再拉',w('south-start')),node('ring','環',500,370,'Prometheus 周圍環道',p('MEGA-S-pins')),
 node('pin1','1',160,320,'第一支路・插銷 1',p('MEGA-S-pins')),node('pin2','2',160,130,'同支路・插銷 2',p('MEGA-S-pins')),node('pin3','3',500,100,'下一支路・插銷 3',p('MEGA-S-pins')),node('pin4','4',840,130,'Yaqut 操作',p('MEGA-S-pins')),node('pin5','5',840,320,'同支路・插銷 5',p('MEGA-S-pins'))
 ],[['lever','ring','pin1','pin2'],['ring','pin3'],['ring','pin5','pin4']],'megaSouth2','插銷 1–5 是攻略編號；先拉正面拉桿出現 0/5，再依黃色三角處理。4 要交給 Yaqut 並離開高台，5/5 後回正面再拉。');
map('MEGA-W','西側巨構・救援 Byron',[
 node('vtol','機',160,530,'VTOL',w('west-byron')),node('ghost','影',160,260,'過橋／大門／Prometheus',w('west-byron')),node('byron','B',500,130,'跳下平台解救 Byron',w('west-byron')),node('memory','憶',820,260,'跟隨記憶',w('west-escape')),node('exit','返',820,530,'黃三角／過載劇情',w('west-escape')),node('city','城',500,530,'Neith 實驗室／Act V',w('city3-wake'))
 ],[['vtol','ghost','byron','memory','exit','city']],'megaWest','此為西側第一次救援，不是最後八輪盤。過載後由劇情切換回城市；無需在電流大廳找另一條解謎支路。','室內逐層平面位置待查證；只表示主要地標與劇情順序。');
map('BASE-CAMP','島上基地・交通與兩座建築',[
 node('pod','站',500,560,'各區交通艙',w('base-golden')),node('fork','岔',500,360,'基地步道分岔',w('base-golden')),node('vtol','機',800,500,'上樓 VTOL／巨構',s('final-backup')),
 node('gold','金',190,180,'Golden Gate／Cornelius',w('base-golden'),'全部十二區黃金謎題後走 Miranda 線。'),node('temple','星',800,180,'Astronomical Temple',w('base-temple'),'24 顆星星交付處；與 Golden Gate 不同。'),node('lab','實',500,150,'基地實驗室',s('field-basics'),'初抵島上取得 Schematic_558 的主線實驗室。')
 ],[['pod','fork','gold'],['fork','temple'],['fork','lab'],['pod','vtol']],'cityFirst','交通艙的 Megastructure 目的地是基地；要進巨構才搭 VTOL。此圖標示目的地關係，不是測量步道的每一個轉角。');
const finalNodes=[node('entry','入',500,590,'光線交換入口',p('FINAL-gate'))];
for(const world of ['u','d'])for(let i=1;i<=4;i++)finalNodes.push(node(world+i,world.toUpperCase()+i,world==='u'?220:780,520-(i-1)*125,(world==='u'?'Utopia':'Dystopia')+' 輪盤 '+i,p('FINAL-'+world+i)));
finalNodes.push(node('athena','終',500,60,'最後橋 → 電梯 → Athena',w('final-athena')));
map('MEGA-FINAL','最終巨構・雙世界八輪盤',finalNodes,[['entry','u1','u2','u3','u4','athena'],['entry','d1','d2','d3','d4','athena']],'megaFinal','兩列表示世界內的解題區段，不能當作樓層座標。閱讀順序依下方逐題攻略，途中多次交換世界與光線。','雙世界的完整逐層平面圖待查證；此圖提供八輪盤分區與終點。');
// 同一實體路標可在去程與回程各對應一項，定位共用，完成判定需全部完成。
// R2 深入主路繞圖邊，避免線段穿過 R1，誤讀成水池房能穿行。
maps['MEGA-E-ENTRY'].paths[4]=[[500,370],[800,140],[950,140],[950,520],[800,520]];
Object.assign(maps['CITY-1'].nodes.find(n=>n.id==='milton'),{caption:'Milton／Atal 890',target:s('petition'),description:'初訪 Atal 在 Milton’s Rest 附近；與其交談支持請願。'});
Object.assign(maps['CITY-1'].nodes.find(n=>n.id==='damien'),{x:260,caption:'Damien／Moryana',description:'初訪離開中央塔後，在出口一帶與 Damien／Moryana 處理請願。'});
maps['CITY-2'].nodes.push(node('helga','H',820,240,'Helga',w('city2-east'),'第二次回城，博物館前右側一帶；個別對話依本輪 Doge 配對。'));
for(const visit of [1,2,3])maps['CITY-'+visit].nodes.find(n=>n.id==='gazebo').captionDy=-42;
maps['CITY-2'].nodes.find(n=>n.id==='gazebo').target=w('city2-east');
for(const[key,id,alias]of [['MEGA-E-ENTRY','vtol','east-exit'],['MEGA-S-ENTRY','vtol','south-exit-route'],['MEGA-FINAL','entry','final-arrival']])maps[key].nodes.find(n=>n.id===id).alsoTargets=[w(alias)];
export const storyMaps=maps;
// 沿用既有地標做定位，不將多樓層橋梁硬畫成未測量的平面座標。
for(const bridge of megaBridges){const anchor=maps[bridge.mapKey].nodes.find(n=>n.id===bridge.mapAnchor);if(!anchor)throw Error('巨構橋缺少地標：'+bridge.id);anchor.alsoTargets=[...(anchor.alsoTargets||[]),w(bridge.id)];}
