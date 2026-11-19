import {yardPoints,yardAnchors,mapSource,mappedItems,itemById,collectionTarget,searchReport,reportGroupName,reportItemLink} from './report.js';
import {accessHtml,itemAccess} from './access.js';
import {basemap,yardViewport,projectYardPoint,terrainHtml} from './basemap.js';
import {defenseHtml} from './defense.js';

const filters=[['all','全部點位'],['molars','普通乳牙'],['mega','巨型乳牙'],['scab','SCA.B 配色'],['docs','庭院資料'],['sites','地標'],['chips','漢堡小哥晶片'],['defense','防守事件'],['bosses','首領及固定生物卡']];
const colors={molars:'#ebd9a6',mega:'#e5a82d',scab:'#b56337',docs:'#407aa5',sites:'#74875e',chips:'#2c6e60',defense:'#a64545',bosses:'#4e3a81',cards:'#4e3a81',meta:'#343832'};
const bwikiMap='https://wiki.biligame.com/grounded/互动地图';
const mapIcons=new Set(['molars','mega','scab','defense','lab','station']);
const symbols={molars:'牙',mega:'巨',scab:'錶',docs:'文',sites:'地',chips:'晶',defense:'守',bosses:'王',cards:'卡',meta:'終'};
const iconKey=item=>item.group==='sites'
 ? (/Field Station/i.test(item.officialName)?'station':/Lab/i.test(item.officialName)?'lab':'sites')
 : item.id==='report-javamatic'?'meta':item.group;
const groupMatch=(i,group)=>group==='all'||i.group===group||(group==='bosses'&&i.group==='cards');
const {width,height}=yardViewport;
const project=pin=>projectYardPoint(yardPoints[pin]);
const selectionTag=(item,escape)=>{
 const name=Array.from(item.name).slice(0,18).join('')+(Array.from(item.name).length>18?'…':'');
 const tagWidth=Math.max(74,Array.from(name).reduce((sum,char)=>sum+(char.charCodeAt(0)<128?6.5:12),0)+18);
 return `<g class="pin-glyph map-selection-tag"><path d="M-5 -22H5L0 -15Z"/><rect x="${-tagWidth/2}" y="-44" width="${tagWidth}" height="23" rx="4"/><text x="0" y="-28">${escape(name)}</text></g>`;
};
const rectFor=(pin,zoom)=>{
 if(!pin)return [0,0,width,height];
 const [x,y]=project(pin);
 return [x-width/(2*zoom),y-height/(2*zoom),width/zoom,height/zoom];
};

const statusMatches=(item,filter,statusOf)=>filter.mapStatus==='all'
 || (statusOf(item)==='obtained')===(filter.mapStatus==='obtained');
export function reportMapHtml({filter,select,search,escape,selectedId,statusOf}){
 const rows=searchReport(mappedItems,filter.search).filter(i=>groupMatch(i,filter.mapGroup)&&statusMatches(i,filter,statusOf));
 const selected=rows.find(i=>i.id===selectedId);
 const byPin=Map.groupBy(rows,i=>i.pin);
 const markerList=[...byPin].sort(([keyA],[keyB])=>Number(keyA===selected?.pin)-Number(keyB===selected?.pin));
 const mapBox=filter.mapBox||rectFor(selected?.pin,3);
 const pointColor=item=>colors[item.group]||colors.sites;
 const overlay=`<svg id="yard-map" viewBox="${mapBox.join(' ')}" role="group" aria-label="庭院地形與收集點位，北方朝上" tabindex="0">
  <rect x="-1100" y="-830" width="3300" height="2490" fill="#11120c"/>
  ${terrainHtml()}
  <g aria-hidden="true" class="yard-anchors">${yardAnchors.map(([label,pin])=>{
   const [x,y]=project(pin);return `<text x="${x.toFixed(2)}" y="${(y-16).toFixed(2)}">${escape(label)}</text>`;
  }).join('')}</g>
  ${markerList.map(([pin,items])=>{
   const i=items.find(i=>i.id===selected?.id)||items[0],isSelected=selected?.pin===pin;
   const [x,y]=project(pin),icon=iconKey(i),hasIcon=mapIcons.has(icon);
   const obtained=items.every(item=>statusOf(item)==='obtained');
   return `<g aria-label="${escape(i.name)}${obtained?'，已取得':'，尚未全部取得'}${items.length>1?'，同處 '+items.length+' 項':''}" data-map-item="${i.id}" data-yard-pin="${pin}" class="yard-pin ${obtained?'obtained':''} ${isSelected?'selected':''}" transform="translate(${x.toFixed(2)} ${y.toFixed(2)})"><title>${escape(items.map(row=>row.name).join('、'))}</title><g class="pin-glyph ${hasIcon?'has-icon':''}">
    <circle class="pin-ring" r="14"/><g class="pin-fallback"><circle r="7" fill="${pointColor(i)}"/><text y=".5">${symbols[i.group]}</text></g>
    ${hasIcon?`<image href="map-icons/${icon}.png" x="-9" y="-9" width="18" height="18"/>`:''}
   </g></g>`;
  }).join('')}
  <g id="yard-selection-label" pointer-events="none" aria-hidden="true" ${selected?`transform="translate(${project(selected.pin).join(' ')})"`:'style="display:none"'}>${selected?selectionTag(selected,escape):''}</g>
 </svg>`;
 return `<div class="toolbar">${search('collection-search','搜尋名稱、遊戲分類或地區')}${select('category-filter','點位分類',filters,'mapGroup')}
 ${select('map-status','取得狀態',[['all','全部'],['pending','尚未取得'],['obtained','已取得']],'mapStatus')}
 <a href="${bwikiMap}" target="_blank" rel="noopener noreferrer">另開 BWIKI 原圖 ↗</a></div>
 <p class="muted">庭院地形與本站點位一起縮放、拖曳，北方朝上。地圖是俯視位置，地下、水下及高處請對照選點後的入口與抵達路線。</p>
 <div class="map-layout report-map">
 <div class="map-frame">
  <div class="map-controls" aria-label="地圖操作"><button data-map-control="in" aria-label="放大">＋</button><button data-map-control="out" aria-label="縮小">−</button><button data-map-control="left" aria-label="向左平移">←</button><button data-map-control="up" aria-label="向上平移">↑</button><button data-map-control="down" aria-label="向下平移">↓</button><button data-map-control="right" aria-label="向右平移">→</button><button data-map-control="reset">全圖</button></div>
  <div class="map-viewport">${overlay}</div>
  <p id="basemap-error" class="warning" role="status" hidden>底圖載入不完整，請重新載入頁面；點位與收集勾選仍可使用，也可另開來源地圖對照。</p>
  <p class="map-legend">${filters.slice(1).map(([id,label])=>`<span><i class="legend-glyph" style="background:${colors[id]}">${symbols[id]}</i>${label}</span>`).join('')}</p>
  <p class="map-attribution">${escape(basemap.attribution)}</p>
 </div>
 <section class="report-map-sidebar" aria-label="點位選擇">
 <div id="map-selection">${mapDetail(selected,rows,escape,statusOf)}</div>
 <h2>${rows.length} 個核對項目 · ${byPin.size} 個點位</h2>
 <ul class="map-results">${rows.map(i=>`<li><button id="map-item-${i.id}" data-map-list="${i.id}" ${i.id===selected?.id?'aria-current="true"':''}>${escape(i.name)}<small>${escape(i.section||reportGroupName(i.group))} · ${statusOf(i)==='obtained'?'已取得':'尚未取得'}</small></button></li>`).join('')}</ul>
 ${rows.length?'':'<p class="empty">沒有符合條件的地圖點位。</p>'}</section></div>
 <p class="sources"><a href="${mapSource}" target="_blank" rel="noopener noreferrer">逐點座標 MapGenie ↗</a><a href="${bwikiMap}" target="_blank" rel="noopener noreferrer">原圖與點位圖示 BWIKI ↗</a><a href="?view=sources">遊戲圖像與授權</a></p>`;
}

function mapDetail(item,rows,escape,statusOf){
 if(!item)return '<p class="muted">選地圖標記或右側清單查看點位。</p>';
 const same=rows.filter(i=>i.pin===item.pin&&i.id!==item.id);
 const access=itemAccess(item);
 const {group,hash}=collectionTarget(item);
 return `<h2>${escape(item.name)}</h2>
 <label class="check-label"><input id="map-check-${item.id}" type="checkbox" data-collect-check="${item.id}" ${statusOf(item)==='obtained'?'checked':''} ${statusOf(item)===null?'disabled':''}>已取得</label>
 <p class="map-location-layer"><strong>所在層級</strong> ${escape(access?.layer||'未逐項核對；請依位置說明確認地上、地下或水下')}</p>
 <p>${escape(item.section||reportGroupName(item.group))}${item.note?' · '+escape(item.note):''}</p>
 <div class="actions"><a href="${reportItemLink(item)}" target="_blank" rel="noopener noreferrer">查看底圖與點位說明 ↗</a>
 <a href="?view=collectibles&amp;group=${group}#${hash}" data-collection-link="${item.id}">回 100% 清單</a></div>
 ${accessHtml(item,escape)}
 ${defenseHtml(item,escape)}
 ${same.length?`<p class="muted">同一點位另有 ${same.map(i=>escape(i.name)).join('、')}</p>`:''}`;
}

export function bindReportMap({filter,escape,onSelect,onCollection,statusOf,onDetail}){
 const svg=document.getElementById('yard-map');
 if(!svg)return;
 const results=searchReport(mappedItems,filter.search).filter(i=>groupMatch(i,filter.mapGroup)&&statusMatches(i,filter,statusOf));
 const detail=document.getElementById('map-selection');
 for(const tile of svg.querySelectorAll('[data-basemap-tile]'))tile.addEventListener('error',()=>{document.getElementById('basemap-error').hidden=false;});
 detail.onclick=event=>{
  const target=event.target.closest('[data-collection-link]');
  if(target){event.preventDefault();onCollection(target.dataset.collectionLink);}
 };
 let box=svg.getAttribute('viewBox').split(' ').map(Number),drag,suppressClick=false;
 const apply=()=>{
  filter.mapBox=[...box];
  svg.setAttribute('viewBox',box.join(' '));
  svg.style.setProperty('--yard-marker-scale',String(Math.sqrt(box[2]/width)));
 };
 apply();
 const zoom=factor=>{
  const w=Math.max(width/9,Math.min(2*width,box[2]*factor)),h=w*height/width;
  box=[box[0]+(box[2]-w)/2,box[1]+(box[3]-h)/2,w,h];apply();
 };
 const pan=(dx,dy)=>{box[0]+=dx;box[1]+=dy;apply();};
 const select=id=>{
  const row=itemById(id);
  if(!row?.pin)return;
  onSelect(id);
  const original=svg.querySelector('.yard-pin.selected');
  original?.classList.remove('selected');
  const marker=svg.querySelector(`[data-yard-pin="${row.pin}"]`);
  if(marker){marker.classList.add('selected');svg.append(marker);}
  const label=svg.querySelector('#yard-selection-label');
  label.innerHTML=selectionTag(row,escape);label.style.display='';
  label.setAttribute('transform',`translate(${project(row.pin).join(' ')})`);svg.append(label);
  document.querySelector('[data-map-list][aria-current]')?.removeAttribute('aria-current');
  document.querySelector(`[data-map-list="${CSS.escape(id)}"]`)?.setAttribute('aria-current','true');
  detail.innerHTML=mapDetail(row,results,escape,statusOf);
  onDetail();
  box=rectFor(row.pin,Math.max(2.5,width/box[2]));apply();
 };
 const reset=()=>{box=rectFor(0,1);apply();};
 const move={
  in:()=>zoom(.8),out:()=>zoom(1.25),left:()=>pan(-box[2]*.1,0),right:()=>pan(box[2]*.1,0),
  up:()=>pan(0,-box[3]*.1),down:()=>pan(0,box[3]*.1),reset
 };
 const keyMap={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down','+':'in','=':'in','-':'out',Home:'reset'};
 for(const button of document.querySelectorAll('[data-map-control]'))button.onclick=move[button.dataset.mapControl];
 for(const button of document.querySelectorAll('[data-map-list]'))button.onclick=()=>select(button.dataset.mapList);
 svg.onclick=event=>{
  if(suppressClick){suppressClick=false;return;}
  const marker=event.target.closest('[data-map-item]');
  if(marker)select(marker.dataset.mapItem);
 };
 svg.onkeydown=event=>{const action=keyMap[event.key];if(action){event.preventDefault();move[action]();}};
 svg.onpointerdown=event=>{
  if(event.target.closest('[data-map-item]'))return;
  drag={x:event.clientX,y:event.clientY,box:[...box]};
  svg.setPointerCapture(event.pointerId);
 };
 svg.onpointermove=event=>{
  if(!drag||!svg.hasPointerCapture(event.pointerId))return;
  const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
  const rect=svg.getBoundingClientRect();
  suppressClick=Math.abs(dx)+Math.abs(dy)>5;
  box=[drag.box[0]-dx*drag.box[2]/rect.width,drag.box[1]-dy*drag.box[2]/rect.width,...drag.box.slice(2)];apply();
 };
 svg.onpointerup=svg.onpointercancel=()=>{drag=null;};
}
