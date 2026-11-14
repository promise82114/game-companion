import {bridgeCoverage} from '../bridge-data.js';
import {bridgeVideoAudits,bridgeVideoSources} from '../bridge-video-data.js';
const time=seconds=>`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`; // taste-skill-ignore: 影片時間使用 mm:ss，補零供玩家比對播放器。
function videoLink(video,at,label,escape){
 const source=bridgeVideoSources[video.source];
 return `<a href="${escape(source.url+'&t='+at+'s')}" target="_blank" rel="noopener noreferrer">${escape(label)} ↗</a>`;
}
function piecesHtml(route,escape,routeId){
 const showTimestamps=route.video?.steps&&!route.video.alternateOrder;
 return `<ol class="bridge-pieces" data-bridge-route="${escape(routeId)}">${route.pieces.map((piece,index)=>{
  const label=piece.instruction?(piece.rotationPresses===0?'不旋轉 · 0 次':piece.rotationDegrees===180?'翻面 180°':'對照目標朝向'):(piece.rotation==='required'?'需旋轉':piece.rotation==='unknown'?'旋轉待查證':'依圖文原向放置');
  return `<li><div><strong>${piece.number} 號</strong><span>${label}</span></div>${piece.instruction?'<p>'+escape(piece.instruction)+'</p>':''}${route.between?.[index+1]?'<p>'+escape(route.between[index+1])+'</p>':''}${showTimestamps?videoLink(route.video,piece.at,`看 ${piece.number} 號 · ${time(piece.at)}`,escape):''}</li>`;
 }).join('')}</ol>`;
}
function solutionHtml(b,escape,routeId='main'){
 const rotated=b.pieces.filter(p=>p.rotation==='required').map(p=>p.number);
 const pending=b.video?.steps&&!b.video.alternateOrder?(b.pieces.some(p=>p.rotationDegrees===180)?'待查證：翻面塊的旋轉按鍵方向與次數。180° 是畫面中的翻面角度，不能推定要按一次或兩次。':'待查證：各塊從選取朝向轉到目標朝向的按鍵方向與次數。'):rotated.length?'待查證：'+rotated.join('、')+' 號的旋轉軸、方向與次數。來源只寫需轉，不能解讀成固定按一次。':'';
 const note=b.video?.note?'<p>'+escape(b.video.note)+(b.video.alternateOrder?' '+videoLink(b.video,b.video.start,'看影片走法',escape):'')+'</p>':'';
 return `${b.video?.alternateOrder?'':note}<h4>放塊順序 · ${b.pieces.length} 塊</h4>${pending?'<p class="solution-pending">'+escape(pending)+'</p>':''}${b.rotationNotes?'<p class="solution-pending">'+escape(b.rotationNotes)+'</p>':''}${piecesHtml(b,escape,routeId)}${b.video?.alternateOrder?note:''}`;
}
export function bridgeHtml(item,{escape,showSolutions}){
 const b=item.bridge;if(!b)return '';
 const alternatives=(b.alternatives||[]).map(a=>`<section class="bridge-route-alternative"><h4>${escape(a.label)}</h4><p>${escape(a.location)}</p>${solutionHtml({pieces:a.video.steps,video:a.video},escape,a.id)}<p class="bridge-after"><strong>過橋後：</strong>${escape(a.after)}</p></section>`).join('');
 const details=showSolutions?`<div class="bridge-solution" data-bridge-solution="${escape(item.id)}">${b.alternatives?.length?'<h4>Utopia 出口橋</h4>':''}${solutionHtml(b,escape)}${alternatives}<div class="solution-sources">${item.sources.map(source=>'<a href="'+escape(source.url)+'" target="_blank" rel="noopener noreferrer">'+escape(source.title)+' ↗</a>').join('')}</div></div>`:'';
 return `${b.index===1?'<p class="bridge-numbering">每座橋從起點看左上完整清單，由左至右固定編號；放掉一塊後不重編號。左右以站在當前拼塊入口、面向前方為準。「0 次」限影片選取時的朝向，已自行轉過就先對照預覽。</p>':''}${b.alternative?'<p class="bridge-alternative">'+escape(b.alternative)+'</p>':''}${details}<p class="bridge-after"><strong>過橋後：</strong>${escape(b.after)}</p>`;
}

export function bridgeResearchHtml(waypoints,{escape}){
 const items=waypoints.filter(w=>w.bridge),audited=items.filter(w=>bridgeVideoAudits[w.id]),matched=audited.filter(w=>w.bridge.video.steps),sources=[...new Map(items.flatMap(w=>w.sources).map(s=>[s.url,s])).values()];
 const results=audited.map(w=>{
  const video=w.bridge.video;
  const range=time(video.start)+'–'+time(video.end);
  const link=video.steps?' '+videoLink(video,video.start,range,escape):'';
  const status=video.alternateOrder?'主解依圖文，影片採另一種順序。':video.steps?'已核對順序與目標朝向。旋轉按鍵細節待查證。':'影片逐塊配對、旋轉方向與次數待查證。';
  return `<li><a href="?view=roadmap#waypoint-${escape(w.id)}">${escape(w.title)}</a> · ${status}${link}</li>`;
 }).join('');
 return `<section class="research-register"><h3>巨構沿路搭橋 · 2026-11-11</h3><p>主路線 ${items.length} 段，另含 Dystopia 替代出口。原先缺細節的 ${audited.length} 段已進行影片比對，其中 ${matched.length} 段有完整成功放塊畫面。另有 ${audited.length-matched.length} 段北橋尚待配對。Dystopia 有完整八塊影片。旋轉按鍵的方向與非零次數仍待查證。</p><ul>${bridgeCoverage.map(c=>'<li>'+escape(c.label)+'：'+c.count+' 段'+(c.note?'；'+escape(c.note):'')+'</li>').join('')}</ul><ul>${results}</ul><div class="sources">${sources.map(s=>'<a href="'+escape(s.url)+'" target="_blank" rel="noopener noreferrer">'+escape(s.title)+' ↗</a>').join('')}</div></section>`;
}
