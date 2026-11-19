import {terrainHtml,projectYardPoint,basemap} from './basemap.js';
import {yardAnchors,yardPoints} from './report.js';
import {selectionTag,rectFor,bindReportMap} from './map.js';
import {fieldItems,fieldById,fieldTypes,fieldRows,fieldMapSource,harvestAdvice,fieldNotes} from './field-map-catalog.js';

const byPin=new Map(fieldItems.map(row=>[row.pin,row]));
const project=pin=>projectYardPoint(byPin.get(pin).point);
const color=row=>row.kind==='resource'?'#37674b':row.category===6505?'#963321':/Spider|Widow/i.test(row.type)?'#8c4b23':'#375f83';
const symbol=row=>row.kind==='resource'?'採':row.category===6505?'王':/Spider|Widow/i.test(row.type)?'蛛':'蟲';
const detail=(row,escape)=>row?`<h2>${escape(row.name)}</h2><p class="english-name" lang="en">${escape(row.english)}</p>
 <p><strong>來源位置提示：</strong>${escape(row.layer)}</p>
 ${row.landmarks.length?`<p><strong>關聯地點：</strong>${escape(row.landmarks.join('、'))}</p>`:''}
 <p>${escape(fieldNotes[row.id]||(row.kind==='resource'?harvestAdvice(row):row.category===6505?'首領或特殊個體；召喚、主線觸發與重生條件各不相同，請先確認原點說明。':'生物可能在附近巡邏，標記代表來源收錄的出沒處，並非即時位置。'))}</p>
 ${row.kind==='resource'&&fieldNotes[row.id]?`<p>${escape(harvestAdvice(row))}</p>`:''}
 <p class="muted">俯視座標不等於入口；未註明層級的點請先確認是否在洞穴、實驗室或高處。</p>
 <div class="actions">${row.creature?`<a href="?view=creatures&amp;q=${encodeURIComponent(row.creature)}">查看弱點與抗性 →</a>`:''}<a href="${fieldMapSource}?locationIds=${row.pin}" target="_blank" rel="noopener noreferrer">查看來源點位與說明 ↗</a></div>`:'<p>選地圖標記或清單，查看該點名稱、位置提示與準備需求。</p>';

export function fieldMapHtml(kind,{filter,escape,select,search}){
 const rows=fieldRows(kind,filter),selected=rows.find(row=>row.id===filter.mapItem),total=fieldItems.filter(row=>row.kind===kind).length;
 const title=kind==='creature'?'怪物出沒與首領位置':'採集資源位置';
 const box=filter.mapBox||rectFor(selected?.pin,3,project);
 const ordered=[...rows].sort((a,b)=>Number(a===selected)-Number(b===selected));
 return `<p>${kind==='creature'?'尋找怪物、首領與特殊個體的出沒處。':'查找礦石、糖果、毛絮、趾甲與其他採集資源。'}這張圖供找怪／採集使用，不計入 100% 收集進度。</p>
 <div class="toolbar">${search('field-search','搜尋中文／英文、位置提示或地標')}${select('field-type','種類',[['all','全部種類'],...fieldTypes(kind).map(([value,name])=>[value,`${name}（${fieldItems.filter(row=>row.kind===kind&&row.type===value).length}）`])],'fieldType')}</div>
 <p class="muted">顯示 ${rows.length}／${total} 個來源點位。${kind==='creature'?'怪物會遊走，來源未涵蓋所有生物，也不反映 NG+ 入注或即時重生。':'點位可能代表分布區；不保證已列出每株植物或全部資源節點，原始科學仍屬收集地圖。'}</p>
 <div class="map-layout report-map field-map"><div class="map-frame">
 <div class="map-controls" aria-label="地圖操作">${[['in','＋','放大'],['out','−','縮小'],['left','←','向左平移'],['up','↑','向上平移'],['down','↓','向下平移'],['right','→','向右平移'],['reset','全圖','顯示全圖']].map(([id,text,label])=>`<button data-map-control="${id}" aria-label="${label}">${text}</button>`).join('')}</div>
 <div class="map-viewport"><svg id="yard-map" viewBox="${box.join(' ')}" role="group" tabindex="0" aria-label="${title}，北方朝上"><rect x="-1100" y="-830" width="3300" height="2490" fill="#11120c"/>${terrainHtml()}
 <g class="yard-anchors" aria-hidden="true">${yardAnchors.map(([name,pin])=>{const [x,y]=projectYardPoint(yardPoints[pin]);return `<text x="${x}" y="${y-16}">${escape(name)}</text>`;}).join('')}</g>
 ${ordered.map(row=>{const [x,y]=project(row.pin);return `<g class="yard-pin ${row===selected?'selected':''}" data-map-item="${row.id}" data-yard-pin="${row.pin}" transform="translate(${x} ${y})" aria-label="${escape(row.name)}"><title>${escape(row.name)} · ${row.pin}</title><g class="pin-glyph"><circle class="pin-ring" r="14"/><g class="pin-fallback"><circle r="8" fill="${color(row)}"/><text y=".5">${symbol(row)}</text></g></g></g>`;}).join('')}
 <g id="yard-selection-label" transform="translate(${selected?project(selected.pin).join(' '):'0 0'})" ${selected?'':'style="display:none"'} aria-hidden="true">${selected?selectionTag(selected,escape):''}</g></svg></div>
 <p id="basemap-error" class="warning" role="status" hidden>底圖載入不完整，請重新載入；仍可搜尋點位或另開來源地圖。</p>
 <p class="map-attribution">${escape(basemap.attribution)}</p></div>
 <section class="report-map-sidebar" aria-label="點位選擇"><div id="map-selection" aria-live="polite">${detail(selected,escape)}</div><h2>${rows.length} 個點位</h2>
 <ul class="map-results">${rows.map(row=>`<li><button id="map-item-${row.id}" data-map-list="${row.id}" ${row===selected?'aria-current="true"':''}>${escape(row.name)}<small>${escape(row.layer)} · #${row.pin}</small></button></li>`).join('')}</ul>${rows.length?'':'<p class="empty">沒有符合條件的點位，可重設搜尋與篩選。</p>'}</section></div>
 <p class="sources"><a href="${fieldMapSource}" target="_blank" rel="noopener noreferrer">座標與點位 MapGenie ↗</a><a href="https://wiki.biligame.com/grounded/资源节点" target="_blank" rel="noopener noreferrer">資源節點 BWIKI ↗</a><a href="?view=sources">來源與查證</a></p>`;
}
export function bindFieldMap(kind,{filter,escape,onSelect}){
 bindReportMap({filter,escape,onSelect,onCollection:()=>{},onDetail:()=>{},catalog:{rows:fieldRows(kind,filter),byId:fieldById,project,detailHtml:row=>detail(row,escape)}});
}
