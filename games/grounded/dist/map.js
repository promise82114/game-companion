import {yardPoints,yardAnchors,mapSource,mappedItems,itemById,collectionTarget,searchReport,reportGroupName,reportItemLink} from './report.js';

const filters=[['all','全部點位'],['molars','普通乳牙'],['mega','巨型乳牙'],['scab','SCA.B 配色'],['docs','庭院資料'],['sites','地標'],['chips','漢堡小哥晶片'],['defense','防守事件'],['bosses','首領及固定生物卡']];
const colors={molars:'#ebd9a6',mega:'#e5a82d',scab:'#b56337',docs:'#407aa5',sites:'#74875e',chips:'#2c6e60',defense:'#a64545',bosses:'#4e3a81',cards:'#4e3a81',meta:'#343832'};
const bwikiMap='https://wiki.biligame.com/grounded/互动地图';
const mapIcons=new Set(['molars','mega','scab','defense','lab','station']);
const symbols={molars:'牙',mega:'巨',scab:'錶',docs:'文',sites:'地',chips:'晶',defense:'守',bosses:'王',cards:'卡',meta:'終'};
const iconKey=item=>item.group==='sites'
 ? (/Field Station/i.test(item.officialName)?'station':/Lab/i.test(item.officialName)?'lab':'sites')
 : item.id==='report-javamatic'?'meta':item.group;
const groupMatch=(i,group)=>group==='all'||i.group===group||(group==='bosses'&&i.group==='cards');
const width=780,height=830;
const origin=[-1.38,1.46],scale=570;
const project=pin=>{
 const [x,y]=yardPoints[pin];
 return [(x-origin[0])*scale,(origin[1]-y)*scale];
};
const rectFor=(pin,zoom)=>{
 if(!pin)return [0,0,width,height];
 const [x,y]=project(pin);
 return [x-width/(2*zoom),y-height/(2*zoom),width/zoom,height/zoom];
};

export function reportMapHtml({filter,select,search,escape,selectedId}){
 const rows=searchReport(mappedItems,filter.search).filter(i=>groupMatch(i,filter.mapGroup));
 const selected=rows.find(i=>i.id===selectedId);
 const byPin=Map.groupBy(rows,i=>i.pin);
 const markerList=[...byPin].sort(([keyA],[keyB])=>Number(keyA===selected?.pin)-Number(keyB===selected?.pin));
 const mapBox=rectFor(selected?.pin,3);
 const pointColor=item=>colors[item.group]||colors.sites;
 const overlay=`<svg id="yard-map" viewBox="${mapBox.join(' ')}" role="group" aria-label="庭院收集點圖，北方朝上" tabindex="0">
  <defs><pattern id="yard-grid" width="61" height="61" patternUnits="userSpaceOnUse"><path d="M61 0H0V61" fill="none" stroke="#d0d9c9"/></pattern></defs>
  <rect x="-1100" y="-830" width="3300" height="2490" fill="#edf1e8"/>
  <rect x="-1100" y="-830" width="3300" height="2490" fill="url(#yard-grid)"/>
  <g aria-hidden="true" class="yard-anchors">${yardAnchors.map(([label,pin])=>{
   const [x,y]=project(pin);return `<text x="${x.toFixed(2)}" y="${(y-16).toFixed(2)}">${escape(label)}</text>`;
  }).join('')}</g>
  ${markerList.map(([pin,items])=>{
   const i=items.find(i=>i.id===selected?.id)||items[0],isSelected=selected?.pin===pin;
   const [x,y]=project(pin),icon=iconKey(i),hasIcon=mapIcons.has(icon);
   return `<g aria-label="${escape(i.name)}${items.length>1?'，同處 '+items.length+' 項':''}" data-map-item="${i.id}" data-yard-pin="${pin}" class="yard-pin ${isSelected?'selected':''}" transform="translate(${x.toFixed(2)} ${y.toFixed(2)})"><title>${escape(items.map(row=>row.name).join('、'))}</title><g class="pin-glyph ${hasIcon?'has-icon':''}">
    <circle class="pin-ring" r="10"/><g class="pin-fallback"><circle r="7" fill="${pointColor(i)}"/><text y=".5">${symbols[i.group]}</text></g>
    ${hasIcon?`<image href="map-icons/${icon}.png" x="-9" y="-9" width="18" height="18"/>`:''}
   </g></g>`;
  }).join('')}
 </svg>`;
 return `<div class="toolbar">${search('collection-search','搜尋名稱、遊戲分類或地區')}${select('category-filter','點位分類',filters,'mapGroup')}
 <a href="${bwikiMap}" target="_blank" rel="noopener noreferrer">另開 BWIKI 原圖 ↗</a></div>
 <p class="muted">依地圖來源的逐點座標繪製，北方朝上。地上、地下與水下可能重疊；選點後可查原圖的路線與畫面。</p>
 <div class="map-layout report-map">
 <div class="map-frame">
  <div class="map-controls" aria-label="地圖操作"><button data-map-control="in" aria-label="放大">＋</button><button data-map-control="out" aria-label="縮小">−</button><button data-map-control="left" aria-label="向左平移">←</button><button data-map-control="up" aria-label="向上平移">↑</button><button data-map-control="down" aria-label="向下平移">↓</button><button data-map-control="right" aria-label="向右平移">→</button><button data-map-control="reset">全圖</button></div>
  <div class="map-viewport">${overlay}</div>
  <p class="map-legend">${filters.slice(1).map(([id,label])=>`<span><i class="legend-glyph" style="background:${colors[id]}">${symbols[id]}</i>${label}</span>`).join('')}</p>
  <details class="yard-basemap" id="yard-basemap"><summary>顯示 BWIKI 原始互動地圖</summary><div id="yard-basemap-frame"></div></details>
 </div>
 <section class="report-map-sidebar" aria-label="點位選擇">
 <div id="map-selection">${mapDetail(selected,rows,escape)}</div>
 <h2>${rows.length} 個核對項目 · ${byPin.size} 個點位</h2>
 <ul class="map-results">${rows.map(i=>`<li><button data-map-list="${i.id}" ${i.id===selected?.id?'aria-current="true"':''}>${escape(i.name)}<small>${escape(i.section||reportGroupName(i.group))}</small></button></li>`).join('')}</ul>
 ${rows.length?'':'<p class="empty">沒有符合條件的地圖點位。</p>'}</section></div>
 <p class="sources"><a href="${mapSource}" target="_blank" rel="noopener noreferrer">逐點座標 MapGenie ↗</a><a href="${bwikiMap}" target="_blank" rel="noopener noreferrer">原圖與點位圖示 BWIKI ↗</a><a href="?view=sources">遊戲圖像與授權</a></p>`;
}

function mapDetail(item,rows,escape){
 if(!item)return '<p class="muted">選地圖標記或右側清單查看點位。</p>';
 const same=rows.filter(i=>i.pin===item.pin&&i.id!==item.id);
 const {group,page,hash}=collectionTarget(item);
 return `<h2>${escape(item.name)}</h2><p>${escape(item.section||reportGroupName(item.group))}${item.note?' · '+escape(item.note):''}</p>
 <div class="actions"><a href="${reportItemLink(item)}" target="_blank" rel="noopener noreferrer">查看底圖與點位說明 ↗</a>
 <a href="?view=collectibles&amp;group=${group}&amp;page=${page}#${hash}" data-collection-link="${item.id}">回 100% 清單</a></div>
 ${same.length?`<p class="muted">同一點位另有 ${same.map(i=>escape(i.name)).join('、')}</p>`:''}`;
}

export function bindReportMap({filter,escape,onSelect,onCollection}){
 const svg=document.getElementById('yard-map');
 if(!svg)return;
 const results=searchReport(mappedItems,filter.search).filter(i=>groupMatch(i,filter.mapGroup));
 const detail=document.getElementById('map-selection');
 const basemap=document.getElementById('yard-basemap');
 const frame=document.getElementById('yard-basemap-frame');
 basemap.ontoggle=()=>{
  if(!basemap.open||frame.firstElementChild)return;
  const iframe=document.createElement('iframe');
  iframe.title='BWIKI Grounded 原始互動地圖';
  iframe.src=bwikiMap;
  iframe.referrerPolicy='strict-origin-when-cross-origin';
  frame.append(iframe);
 };
 detail.onclick=event=>{
  const target=event.target.closest('[data-collection-link]');
  if(target){event.preventDefault();onCollection(target.dataset.collectionLink);}
 };
 let box=svg.getAttribute('viewBox').split(' ').map(Number),drag,suppressClick=false;
 const apply=()=>{
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
  document.querySelector('[data-map-list][aria-current]')?.removeAttribute('aria-current');
  document.querySelector(`[data-map-list="${CSS.escape(id)}"]`)?.setAttribute('aria-current','true');
  detail.innerHTML=mapDetail(row,results,escape);
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
