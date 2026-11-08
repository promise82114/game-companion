import {bridgeCoverage} from '../bridge-data.js';
export function bridgeHtml(item,{escape,showSolutions}){
 const b=item.bridge;if(!b)return '';
 const rotated=b.pieces.filter(p=>p.rotation==='required').map(p=>p.number);
 const details=showSolutions?`<div class="bridge-solution" data-bridge-solution="${escape(item.id)}"><h4>放塊順序 · ${b.pieces.length} 塊</h4><ol class="bridge-pieces">${b.pieces.map((piece,index)=>`<li><div><strong>${piece.number} 號</strong><span>${piece.rotation==='required'?'需旋轉':piece.rotation==='unknown'?'旋轉待查證':'依來源原向放置'}</span></div>${b.between?.[index+1]?'<p>'+escape(b.between[index+1])+'</p>':''}</li>`).join('')}</ol>${rotated.length?'<p class="solution-pending">待查證：'+rotated.join('、')+' 號的旋轉軸、方向與次數。來源只寫需轉，不能解讀成固定按一次。</p>':''}${b.rotationNotes?'<p class="solution-pending">'+escape(b.rotationNotes)+'</p>':''}<div class="solution-sources">${item.sources.map(source=>'<a href="'+escape(source.url)+'" target="_blank" rel="noopener noreferrer">'+escape(source.title)+' ↗</a>').join('')}</div></div>`:'';
 return `${b.index===1?'<p class="bridge-numbering">本章每座橋都從起點看左上完整清單，由左至右固定編號；放掉一塊後不重編號。若已自行轉過拼塊，不能把「原向」當作目前朝向。旋轉是否必要依來源記錄，方向不足處保留待查證。</p>':''}${details}<p class="bridge-after"><strong>過橋後：</strong>${escape(b.after)}</p>${b.alternative?'<p class="bridge-alternative">'+escape(b.alternative)+'</p>':''}`;
}

export function bridgeResearchHtml(waypoints,{escape}){
 const items=waypoints.filter(w=>w.bridge),gaps=items.filter(w=>w.bridge.rotationNotes||w.bridge.pieces.some(p=>p.rotation!=='as-shown')),sources=[...new Map(items.flatMap(w=>w.sources).map(s=>[s.url,s])).values()];
 return `<section class="research-register"><h3>巨構沿路搭橋 · 2026-11-08</h3><p>另列 ${items.length} 段搭橋，未混入原有 212 項解題覆核數。位置、選塊與過橋去向已對照圖文；${gaps.length} 段仍缺旋轉方向等細節，沒有宣稱已完整解決。未經 PS5 逐橋實機驗收。</p><ul>${bridgeCoverage.map(c=>'<li>'+escape(c.label)+'：'+c.count+' 段'+(c.note?'；'+escape(c.note):'')+'</li>').join('')}</ul><div class="sources">${sources.map(s=>'<a href="'+escape(s.url)+'" target="_blank" rel="noopener noreferrer">'+escape(s.title)+' ↗</a>').join('')}</div></section>`;
}
