import {attachBridgeVideoEvidence,bridgeVideoSources} from './bridge-video-data.js';
// 各段從去程金環開始編號；不把回走同一座橋算成新的拼塊題。
// r：原圖文要求旋轉，但未給旋轉軸／方向／次數。?：連需轉哪塊也未確定。
const pieces=text=>text.split(' ').map(token=>({number:Number(token.replace(/[r?]/g,'')),rotation:token.endsWith('r')?'required':token.endsWith('?')?'unknown':'as-shown'}));
function bridge(area,index,beforeId,title,location,order,after,sourceKey,mapKey,mapAnchor,extra={}){
 return {id:`bridge-${area}-${String(index).padStart(2,'0')}`,title,stepId:{east:'first-megastructure',north:'north-megastructure',south:'prometheus-rescue',final:'ending'}[area],beforeId,location,actions:[location,after],mapKey,mapAnchor,sourceKeys:[sourceKey],checkedAt:'2026-11-08',bridge:{area,index,pieces:pieces(order),after,...extra}};
}
export const megaBridges=[
 bridge('east',1,'east-central','東橋 1 · 長廊到中央平台',
  '與橋上 Yaqut 談完後，沿彎曲長廊到第一個金環；隔著缺口可見中央平台與三色大門。',
  '1 2 3r','過環登上中央平台；面向三色大門，下一座橋在右手邊，先走綠炮支線。','megaEast1','MEGA-E-CORE','core'),
 bridge('east',2,'MEGA-E-green','東橋 2 · 中央平台右側往綠炮',
  '站在中央平台面向三色大門，走右側金環；這段有 3 塊。',
  '1r 2 3r','過環先左上樓，再右上樓；沿階梯到左右岔路選右，上樓穿紫屏，進有鑽孔器的房間。','megaEast1','MEGA-E-CORE','green'),
 bridge('east',3,'MEGA-E-red','東橋 3 · 長階梯頂往紅炮',
  '啟動綠炮後回題目房、穿紫屏，左下樓回岔路；改直走上長階梯，到能看見右側紅炮的金環。',
  '1 2 3r','過環後，炮的拉桿在前方另一平台；先進左側紫屏，完成紅炮房的連線。','megaEast1','MEGA-E-CORE','red'),
 bridge('east',4,'MEGA-E-blue','東橋 4 · 藍炮房內跨到 RGB 房',
  '紅炮啟動後回房穿紫屏，別回金環；直下階梯，穿過紅柱間階梯與紫屏。紅／綠接收器房右角的金環通往對面 RGB 房。',
  '2r 4 3 1r','過橋穿紫屏，取連接器與 RGB。照下方藍光題接線後，要沿這座已搭好的橋回接收器房；不用另找回程橋。','megaEast2','MEGA-E-CORE','blue',
  {rotationNotes:'4 號的初始朝向在原作者紀錄中有差異，不能保證不轉；若預覽紅色，4 號的方向與次數仍待查證。'}),
 bridge('east',5,'east-terminal3','東橋 5 · 藍炮出口回中央區',
  '三道光全開後，下藍炮階梯、穿紫屏，跟黃色三角左轉到金環；此處有 4 塊。',
  '1 4 2 3','過環後走左側金環，會正對已開啟的三色大門；接著搭東橋 6。','megaEast2','MEGA-E-CORE','core'),
 bridge('east',6,'east-terminal3','東橋 6 · 正對三色大門的第一段',
  '從東橋 5 出環後左轉到金環，確認前方是三色大門；這段有 3 塊。',
  '1 2 3r','直走過橋，前方還有一段缺口；在下一個起點接東橋 7，不要轉回雷射炮支線。','megaEast2','MEGA-E-CORE','door'),
 bridge('east',7,'east-terminal3','東橋 7 · 接到三色大門前',
  '沿東橋 6 直走到下一段 3 塊橋；目的地仍是正前方三色大門。',
  '1 2r 3','穿三色大門；水邊左右階梯都通向中央水池小島，去 NOEMA-03。回程走已完成的橋回入口大廳。','megaEast2','MEGA-E-CORE','door'),
 bridge('north',1,'MEGA-N-blue','北橋 1 · Byron 開紅光後的右側金環',
  'Byron 替你開門並啟動紅光後，過門向右找金環；左上應有 4 塊。',
  '2r 3r 1 4','過環上右側階梯，右轉找右上方特殊地磚。跳上重力牆，再走到天花板，左轉找北橋 2。','megaNorth1','MEGA-N','byron'),
 bridge('north',2,'MEGA-N-blue','北橋 2 · 天花板上向左跨越',
  '爬上北橋 1 後方的重力牆、轉到天花板，面向左側金環；這段有 4 塊。',
  '1 2 3 4','走到底左轉，跳上特殊地磚牆，再落到地板。上右側階梯，在頂端左轉進金環，接北橋 3。','megaNorth1','MEGA-N','blue'),
 bridge('north',3,'MEGA-N-blue','北橋 3 · 風扇前的三塊橋',
  '離開天花板橋、落回地板後，上右側階梯；頂端左轉金環，左上只有 3 塊。',
  '2 1 3','走到風扇，搭風吹上方塊頂，再沿地板到下一個拼塊起點；那是北橋 4。','megaNorth1','MEGA-N','blue'),
 bridge('north',4,'MEGA-N-blue','北橋 4 · 風扇後分兩層放置',
  '由風扇升到方塊頂，沿地板到下一個起點；這段有 2 塊，兩塊不是站在原地連放。',
  '1r 2','放完第二塊後往前穿紫屏，進入有蓄能器與壓板的藍炮房。','megaNorth1','MEGA-N','blue',
  {between:{1:'放完 1 號後，先走左側階梯上樓，再跳上已放置的拼塊，才選 2 號。'}}),
 bridge('north',5,'MEGA-N-green','北橋 5 · 下重力牆後往左的橋',
  '藍炮啟動後穿回紫屏，下到風扇前已完成的橋、回金環。右下樓，直走右轉爬右側重力牆，連轉兩次左落地，前方金環有 4 塊。',
  '3r 2 4 1','橋應通往左側下一個金環；先直走搭北橋 6，右側階梯留到返回三色大門時再用。','megaNorth2','MEGA-N','green',
  {rotationNotes:'3 號的行進目標在左側；「往左」描述目的地，不等於已證實要按向左旋轉。'}),
 bridge('north',6,'MEGA-N-green','北橋 6 · 下一個金環到重力牆',
  '北橋 5 過環後直走到下一個金環，這次有 3 塊；不要先走右側階梯。',
  '1r 2 3','直走跳上特殊地磚牆，在頂端向右轉，再跳回地板；穿金環、跳到起點，接北橋 7。','megaNorth2','MEGA-N','green'),
 bridge('north',7,'MEGA-N-green','北橋 7 · 綠炮紫屏前的四塊橋',
  '由北橋 6 後方重力牆落到地板，穿下一個金環、跳到拼塊起點；左上有 4 塊。',
  '4 1r 2 3r','橋完成後跳上天花板特殊地磚，往右穿紫屏；到有交換台、鑽孔器的綠炮房。','megaNorth2','MEGA-N','green'),
 bridge('north',8,'north-memory','北橋 8 · 綠炮完成後回三色門',
  '綠炮啟動後穿回題目與紫屏，左轉跳上垂直的已建橋，下行穿金環。左轉上牆，再左、左下行落地；過已建橋出環左轉，上左側階梯到新金環。',
  '3r 2r 1r','上樓後再左上樓，走到另一側跳上重力牆；沿牆右轉、再右轉，落回地板，前方是北橋 9。','megaNorth2','MEGA-N','memory'),
 bridge('north',9,'north-memory','北橋 9 · 三色大門前最後一橋',
  '北橋 8 後走重力牆，兩次右轉後落地，進大門前的金環；此處有 4 塊。',
  '1 2r 3r 4','穿已開的三色大門，沿黃色三角走廊、上樓到水池小島找 Byron。事故後不要照這套去程橋順序倒放，走撤離通道。','megaNorth2','MEGA-N','memory'),
 bridge('south',1,'MEGA-S-pins','南橋 1 · 環道第一支路',
  '先拉 Prometheus 正面大拉桿，確認目標 0/5。下樓走向 Prometheus，沿周圍環道向左到第一個金環。',
  '2 3 4r 1r','出環的岔路先左轉、再右轉；沿路到南橋 2。這支路先拿插銷 1，再折回取插銷 2。','megaSouth1','MEGA-S-PINS','pin1'),
 bridge('south',2,'MEGA-S-pins','南橋 2 · 插銷 1 支路的爬升橋',
  '南橋 1 出環後左、右轉，走到下一個金環；這段 4 塊，途中需要爬到側面。',
  '4 2 1 3r','過環上樓；再過兩小段階梯後右轉，找轉角階梯繼續上行，到南橋 3。','megaSouth1','MEGA-S-PINS','pin1',
  {between:{2:'放完 2 號，先跳上去往上走，跳到地板；往左繞到 2 號側面，跳到側面後才繼續放 1 號。'}}),
 bridge('south',3,'MEGA-S-pins','南橋 3 · 插銷 1 前的兩塊橋',
  '沿南橋 2 後方的階梯一路上行，到只有 2 塊的金環。',
  '2r 1r','過環拔出插銷 1。轉身沿已建橋與樓梯下行；回到南橋 2 最後一塊時往左看下方橋面，跳回橋，再上樓到第一岔路。','megaSouth1','MEGA-S-PINS','pin1'),
 bridge('south',4,'MEGA-S-pins','南橋 4 · 轉往插銷 2 的下層橋',
  '回第一岔路後，右側金環通回 Prometheus，先別走。直走下數段階梯，接連右轉下樓，直到下一個兩塊金環。',
  '2 1','過環右轉進走廊，再上樓到下一個金環，接南橋 5。','megaSouth1','MEGA-S-PINS','pin2'),
 bridge('south',5,'MEGA-S-pins','南橋 5 · 插銷 2 前的兩塊橋',
  '南橋 4 後右轉走廊、上樓，下一個金環同樣只有 2 塊。',
  '2 1','過環上樓，頂端右轉過走廊再上樓，拔插銷 2。沿已建橋原路回第一岔路，這次過南橋 1 回 Prometheus 背後環道，再沿環道向左。','megaSouth1','MEGA-S-PINS','pin2'),
 bridge('south',6,'MEGA-S-pins','南橋 6 · 環道下一支路往插銷 3',
  '取完前兩銷、回 Prometheus 背後環道，向左走到下一金環；這段有 3 塊。',
  '1 2r 3','過環直走到緊接著的四塊金環，接南橋 7。','megaSouth1','MEGA-S-PINS','pin3'),
 bridge('south',7,'MEGA-S-pins','南橋 7 · 插銷 3 支路的重力橋',
  '南橋 6 過環後直走到下一金環，左上有 4 塊。',
  '4 3r 1r 2r','跳上最後一塊往上走，右轉上特殊地磚，再右轉落地。左上長樓梯、再上樓，頂端右轉下行；右側樓梯是死路，改左下到三根金柱。','megaSouth1','MEGA-S-PINS','pin3'),
 bridge('south',8,'MEGA-S-pins','南橋 8 · 三根金柱旁往插銷 3',
  '在三根金柱處左轉，藍色發光柱之間有拼塊起點；跳上去，左上有 3 塊。',
  '1 3r 2r','在特殊地磚上先左轉，走到底再左轉，跳到地板。向右走到盡頭再右轉，穿門上樓拔插銷 3；之後沿來路與已建橋回環道，向左找下一金環。','megaSouth1','MEGA-S-PINS','pin3'),
 bridge('south',9,'MEGA-S-pins','南橋 9 · 環道往插銷 4／5 支路',
  '插銷 3 完成後原路回 Prometheus 環道，再向左到下一個金環；左上有 4 塊。',
  '1 3 4 2r','出環右轉下樓，到可左轉／直行的岔路先直行，走到南橋 10。','megaSouth2','MEGA-S-PINS','pin4'),
 bridge('south',10,'MEGA-S-pins','南橋 10 · 通向 Yaqut 的三塊橋',
  '南橋 9 後右下樓，岔路直走的金環有 3 塊；先去 Yaqut，不走左側下樓支線。',
  '2 3 1r','過環穿隧道，沿路到 Yaqut 高台，和他交談；退回金環等待他拔插銷 4，再沿已建橋回剛才岔路左轉。','megaSouth2','MEGA-S-PINS','pin4'),
 bridge('south',11,'MEGA-S-pins','南橋 11 · 天花板往插銷 5',
  '回南橋 10 前岔路左轉，從牆與階梯間一路下到底，再右轉。跳上重力牆往上、再跳天花板，右轉看金環與遠處紫色光柱。',
  '2 3r 1r 4r','過環跳上右側重力牆，往上走再落地，走入紫色光柱升到插銷 5。拔銷後沿已建路線返回正面大拉桿，確認 5/5 再拉。','megaSouth2','MEGA-S-PINS','pin5'),
 bridge('final',1,'final-athena','終橋 · Utopia 出口到 Athena 塔',
  '完成兩個世界全部八個輪盤後，走 Utopia 最後輪盤後方已降下的柵欄，穿玻璃橋廊，到通向塔的金環；左上有 8 塊。',
  '1? 2? 3? 4? 5? 6? 7? 8?','過橋進塔搭電梯；到頂右轉，走到底左轉、再左轉進門，上階梯到 Athena。','megaFinal','MEGA-FINAL','athena',
  {rotationNotes:'八塊的選取順序有原圖文支持；作者只說一至兩塊可能需轉，未指出塊號、旋轉軸、方向與次數，全部待查證。',alternative:'Dystopia 也有替代出口橋；兩側擇一即可，完成一側會停用另一側。此頁沿 Utopia 路線；Dystopia 橋的塊號、順序與旋轉仍待查證，不套用這組八塊順序。'})
];
megaBridges.at(-1).sourceKeys.push('utopiaWiki');
attachBridgeVideoEvidence(megaBridges);

export const bridgeCoverage=[
 {area:'east',label:'東側巨構',count:7},
 {area:'north',label:'北側巨構',count:9},
 {area:'south',label:'南側巨構',count:11},
 {area:'west',label:'西側救 Byron',count:0,note:'已核對原圖文，此次路線經既有橋與走廊，沒有列出需要放置拼塊的金環。'},
 {area:'final',label:'最終巨構',count:1,note:'Utopia／Dystopia 兩出口擇一，兩套八塊順序已對照影片；翻面的按鍵方向／次數仍待查證。'}
];

export function attachMegaBridges(waypoints,routes,sources){
 for(const item of megaBridges){
  const videoKeys=item.bridge.video?[item.bridge.video.source,...(item.bridge.area==='north'?['northExplore']:[]),...(item.bridge.alternatives||[]).map(a=>a.video.source)]:[];
  waypoints.push({...item,sources:[...item.sourceKeys.map(key=>sources[key]),...[...new Set(videoKeys)].map(key=>bridgeVideoSources[key])],verificationStatus:'consensus'});
  const route=routes[item.stepId],index=route.indexOf(item.beforeId);
  if(index<0)throw Error('巨構橋缺少插入位置：'+item.id);
  route.splice(index,0,item.id);
 }
}
