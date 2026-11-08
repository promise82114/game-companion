import {starRoutes,starPointId} from '../star-navigation-data.js';

export function starPreparationHtml(puzzle,{escape}){
 if(!['main','lost'].includes(puzzle.kind))return '';
 const anchor=puzzle.kind+'-'+puzzle.number,links=Object.entries(starRoutes).filter(([id])=>id.startsWith(puzzle.region+'-star-pandora')).flatMap(([id,route])=>{const index=route.points.findIndex(point=>point.anchor===anchor);return index<0?[]:[{id,index,point:route.points[index]}];});
 return links.length?'<div class="star-preparation">'+links.map(({id,index,point})=>`<button type="button" class="map-locate" data-map-point="${starPointId(id,index)}" data-map-region="${puzzle.region}">Pandora · ${escape(point.title)} · 看位置</button>`).join('')+'</div>':'';
}

export function starNavigationHtml(puzzle,{escape}){
 const route=starRoutes[puzzle.id];if(!route)return '';
 return `<section class="star-navigation" data-star-navigation="${puzzle.id}" aria-label="${escape(puzzle.title)} 起點與路線"><h4>起點與路線</h4><p>${escape(route.intro)}</p><ol>${route.points.map((point,index)=>`<li><div class="star-location-heading"><strong>P${index+1} · ${escape(point.title)}</strong>${point.anchor?`<button type="button" class="map-locate" data-map-point="${starPointId(puzzle.id,index)}" data-map-region="${puzzle.region}" aria-label="在地圖標出 ${escape(point.title)}">看位置</button>`:'<span class="solution-pending">位置待查證</span>'}</div><p>${escape(point.description)}</p></li>`).join('')}</ol>${route.pending?'<p class="solution-pending">待查證：'+escape(route.pending)+'</p>':''}<div class="solution-sources">${[...puzzle.sources,...(route.sources||[])].filter((s,i,a)=>a.findIndex(t=>t.url===s.url)===i).map(s=>`<a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.title)} ↗</a>`).join('')}</div></section>`;
}
