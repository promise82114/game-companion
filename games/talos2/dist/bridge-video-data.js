// 公開實玩影片人工對照。at 是原影片秒數，非下載片段時間。
// 動畫角度不等於按鍵次數；null 保留未知，不將一次動畫推定成按一次。
export const bridgeVideoSources={
 east:{title:'GriffinsGamingGuides · 東側巨構實玩',url:'https://www.youtube.com/watch?v=h4DKkIMvln8'},
 south:{title:'Game Guides Channel · 南側巨構實玩',url:'https://www.youtube.com/watch?v=Pku_80x50dk'},
 north:{title:'Trophy Tom · 北側巨構實玩',url:'https://www.youtube.com/watch?v=pHt676Y2fDk'},
 northExplore:{title:'TheSourceError · 北側探索實玩',url:'https://www.youtube.com/watch?v=0KuCtyk7u7Q'},
 utopia:{title:'TheSourceError · Utopia 出口橋',url:'https://www.youtube.com/watch?v=JdovWAkF0Ts'},
 dystopia:{title:'TheSourceError · Dystopia 出口橋',url:'https://www.youtube.com/watch?v=EosBZfNy-Ik'}
};
const pose=(number,at,instruction,rotationDegrees=null,rotationPresses=null)=>({number,at,instruction,rotation:rotationDegrees===180?'required':rotationPresses===0?'as-shown':'unknown',rotationDegrees,rotationPresses,rotationDirection:null});
const audit=(source,start,end,steps,note='')=>({source,start,end,steps,note,checkedAt:'2026-11-08',inputVerified:false});
export const bridgeVideoAudits={
 'bridge-east-01':audit('east',154,165,[pose(1,155,'平放，先把路向左接出去。'),pose(2,157,'橋面保持水平，把路折回右方。'),pose(3,159,'調整到橋面水平、出口接向對岸金環，再放置。')]),
 'bridge-east-02':audit('east',173,185,[pose(1,174,'調整成平面，出口往前延伸。'),pose(2,176,'平放直線塊，往對岸延長。'),pose(3,178,'轉到平面彎道能接回金環的位置。')]),
 'bridge-east-03':audit('east',277,289,[pose(1,277,'平放，先往前伸出。'),pose(2,280,'接成水平右彎。'),pose(3,282,'調整為水平彎道，接到紅炮支線的金環。')]),
 'bridge-east-04':audit('east',381,398,[pose(2,381,'轉成水平左彎，再放置。'),pose(4,385,'調整到平面，不要直接接受紅色預覽；成功後出口在前方。'),pose(3,388,'平放直線塊，接到下一個轉角。'),pose(1,391,'調整成水平彎道，出口接到對面紫屏前的金環。')],'本段採影片完整的 2→4→3→1；4 號有調整朝向，不能寫成保證不用轉。'),
 'bridge-east-06':audit('east',526,538,[pose(1,527,'平放，先把路向左接出去。'),pose(2,529,'保持水平，往正前方延長。'),pose(3,532,'調整成水平彎道，接到下一座金環。')]),
 'bridge-east-07':audit('east',542,553,[pose(1,543,'平放，先往左伸出。'),pose(2,545,'調整成水平右彎，把出口帶回大門方向。'),pose(3,548,'平放直線塊，接到三色門前。')]),
 'bridge-south-01':audit('south',618,634,[pose(3,620,'平放直線塊，朝對岸伸出。'),pose(4,624,'平放短塊，延長到轉角。'),pose(1,626,'轉到水平左彎，往旁邊藍色出口面接。'),pose(2,628,'平放短塊，接到金環。')],'採影片成功路線 3→4→1→2，取代原圖文的另一解。影片先取其他插銷，請按本站章節順序走，不照影片的全章回訪順序。'),
 'bridge-south-02':audit('south',763,810,[pose(4,768,'直線塊平放；先搭到前方，別把紅色、朝牆的預覽放下。'),pose(2,771,'調成往上攀爬的形狀，讓拼塊接到上層。'),pose(3,789,'換到拼塊側面後，調成水平彎道再放置。'),pose(1,800,'平放最後的彎道，接到遠處金環。')],'採影片最後成功的 4→2→3→1；13:18 的拆回重放不是新增的一塊。'),
 'bridge-south-03':audit('south',826,835,[pose(1,827,'平放彎道，先把出口帶向左邊。'),pose(2,829,'接成水平路面，到對岸金環。')],'影片 13:39 先試 2→1，13:44 拆回；本站採 13:47 起成功的 1→2，勿混用前一輪。'),
 'bridge-south-06':audit('south',891,903,[pose(1,892,'平放直線塊，往對岸伸出。'),pose(2,895,'調成水平左彎。'),pose(3,898,'平放彎道，出口接向前方金環。')]),
 'bridge-south-07':audit('south',906,929,[pose(3,907,'平放第一段，往前延長。'),pose(4,911,'調成平面彎道，出口向左。'),pose(1,915,'調整到藍色預覽，接往下一個轉角。'),pose(2,918,'調成向上的末段；放好後跳上拼塊側面，沿重力橋往上走。')],'採影片成功路線 3→4→1→2；不能接用原圖文 4→3→1→2 的旋轉紀錄。'),
 'bridge-south-08':audit('south',951,969,[pose(1,954,'直線塊平放，先穿過窄道。'),pose(2,957,'轉成水平彎道，把出口接到右側。'),pose(3,960,'平放最後的彎道，接到白色發光邊緣前。')],'採影片成功的 1→2→3。過橋後要沿重力地磚轉面，別朝紫光直接跳。'),
 'bridge-south-09':audit('south',308,324,[pose(1,312,'平放彎道，出口接到右側。'),pose(2,315,'接成水平彎道，把路帶回前方。'),pose(3,318,'保持水平，往金環方向延長。'),pose(4,320,'平放短塊，補上金環前最後缺口。')],'採影片成功路線 1→2→3→4，取代原圖文另一解；影片此時尚未取銷，不代表本站插銷編號改變。'),
 'bridge-south-10':audit('south',339,354,[pose(2,340,'調成平面，先往前延長；等預覽變藍再放。'),pose(3,347,'平放彎道，往右邊出口接。'),pose(1,350,'調成水平彎道，接到通往 Yaqut 的金環。')]),
 'bridge-south-11':audit('south',497,514,[pose(2,501,'平放第一個彎道，出口向左。'),pose(3,504,'平放下一個彎道，把路接回前方。'),pose(1,507,'調成平面，沿前方繼續延伸。'),pose(4,510,'平放彎道，接到紫色升降光柱前的金環。')]),
 'bridge-final-01':audit('utopia',24,59,[pose(1,25,'直線橋面平放，朝塔延長。',0,0),pose(2,29,'方形塊平放。',0,0),pose(3,31,'直線橋面平放。',0,0),pose(4,33,'繼續直線平放。',0,0),pose(5,37,'保持水平，彎道伸向左方。',0,0),pose(6,40,'把平面彎道由左翻到右，回到水平後放置。',180),pose(7,43,'保持影片原向平放，繼續往塔前進。',0,0),pose(8,46,'把末段由右翻到左，接上塔前平台；不要留成斜面。',180)])
};
for(const index of [4,5,6,8,9]){
 bridgeVideoAudits[`bridge-north-${String(index).padStart(2,'0')}`]=audit('north',0,331,null,index===8?'Trophy Tom 綠炮後直接剪到返門路線，沒有拍到本段完整選塊；另一支探索影片採不同走法。此組旋轉方向與次數仍待查證。':'已比對 Trophy Tom 與 TheSourceError 實玩；字幕遮住清單，另一支又採不同路線／先建支路，尚不能可靠對齊本站這組塊號。保留原圖文順序；旋轉方向與次數待查證。');
}
bridgeVideoAudits['bridge-north-01']=audit('northExplore',470,537,[pose(1,470,'轉到水平，先向左方伸出。'),pose(4,489,'接成水平彎道，把路帶回前方。'),pose(3,502,'用影片 08:22 重放後的水平彎道，接近金環。'),pose(2,507,'調整最後的折角，直到預覽變藍、接上金環前的平台。')],'採影片最後成功的 1→4→3→2。08:15 先試的 2 號後來拆回，不要照那一輪繼續。已用起點金環、右側亮門與完整四塊清單比對原圖文。');
bridgeVideoAudits['bridge-north-07']=audit('northExplore',940,979,[pose(1,942,'直線塊平放，朝有重力地磚的牆延長。'),pose(4,949,'把向上翹的預覽調成平面，出口接向左方。'),pose(3,961,'平放折角，把出口帶回牆前。'),pose(2,969,'最後接到白色發光邊緣，再跳上重力牆，穿紫屏。')],'採影片成功的 1→4→3→2；由綠色金環先跳上方塊起點。不要混用原圖文的另一套放塊順序。');
export const dystopiaBridge={
 id:'dystopia',label:'Dystopia 出口橋',
 location:'八個輪盤全解完後，留在灰色廢墟的 Dystopia，走到通往塔的金環。起點清單是 L、I、L、L、I、I、折線、I，共八塊，沒有方形塊。',
 after:'接好後穿過遠端金環，沿正前方階梯上樓，進塔內電梯。',
 video:audit('dystopia',20,48,[pose(1,20,'L 塊保持水平。',0,0),pose(2,23,'直線塊平放，向前延長。',0,0),pose(3,25,'將平面彎道由左翻到右；回到水平後放置。',180),pose(4,28,'L 塊保持影片原向，將路帶回左方。',0,0),pose(5,30,'直線塊平放。',0,0),pose(6,32,'下一個直線塊平放。',0,0),pose(7,34,'折線塊由右翻到左，保持橋面水平。',180),pose(8,36,'最後的直線塊平放，接上金環前的平台。',0,0)])
};
export function attachBridgeVideoEvidence(bridges){
 for(const item of bridges){
  const video=bridgeVideoAudits[item.id];if(!video)continue;
  item.bridge.video=video;
  if(video.steps){item.bridge.pieces=video.steps;delete item.bridge.rotationNotes;}
  if(item.id==='bridge-south-02')item.bridge.between={2:'放完 2 號，跳上拼塊往上走，到上層地板；繞到拼塊左側，跳到側面再放 3 號（影片 12:54–13:09）。'};
  if(item.id==='bridge-final-01'){
   item.title='終橋 · Utopia／Dystopia 出口到 Athena 塔';
   item.bridge.alternative='Utopia／Dystopia 出口橋擇一；完成一側會停用另一側。兩套解法共用本項完成紀錄。';
   item.bridge.alternatives=[dystopiaBridge];
  }
 }
}
