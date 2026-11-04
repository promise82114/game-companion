import {regions} from './data.js';
// 原創概念區域圖。anchor 只排版區域群組，不是任何收集品座標。
export function mapSvg(groups,selected,escape){return `<svg id="yard-map" viewBox="0 0 1000 650" role="group" aria-label="庭院概念示意圖；區域群組並非精確座標" tabindex="0">
 <title>Grounded 原創庭院示意圖</title><desc>非等比例、非導航地圖；每個群組僅表示區域，沒有核實的收集品精確點位。使用方向鍵平移，加減鍵縮放，Home 還原。</desc>
 <rect width="1000" height="650" fill="#e8ede4"/><path d="M50 45Q490 15 945 55L960 575Q580 635 55 605Z" fill="#dde5d7" stroke="#8b9b82" stroke-width="3"/>
 <path d="M65 120Q420 145 925 130L945 55Q510 25 50 45Z" fill="#cad5bc"/>
 <path d="M330 195Q455 135 650 178Q740 235 620 270Q420 285 330 235Z" fill="#abc8cf" stroke="#668e99" stroke-width="2"/>
 <path d="M645 490Q810 450 930 500L935 585Q790 610 670 570Z" fill="#b0c29e"/>
 <path d="M85 345H215V475H85Z" fill="#d9cba7" stroke="#b3a379" stroke-width="2"/>
 <path d="M210 400Q300 350 365 430L330 535L200 525Z" fill="#c6c7ac" stroke="#a5a78d" stroke-dasharray="8 6"/>
 <path d="M80 210H220V290H80ZM100 195V305M200 195V305" fill="#c1ad94" stroke="#927c63" stroke-width="8"/>
 <path d="M480 375V305M480 340L450 320M480 350L510 325" stroke="#88785f" stroke-width="12" fill="none"/><circle cx="480" cy="310" r="43" fill="#a5ba91"/>
 <path d="M55 595H950" stroke="#a7aa9a" stroke-width="9"/><text x="500" y="630" text-anchor="middle">房屋側 · 概念區域示意</text>
 ${regions.map(r=>{const g=groups.find(g=>g.id===r.id),count=g?.count||0;return `<g class="map-region ${selected===r.id?'selected':''}" data-map-region="${r.id}" role="button" tabindex="0" aria-label="${escape(r.name)}，${count} 個符合項目" transform="translate(${r.anchor.x} ${r.anchor.y})"><rect x="-100" y="-28" width="200" height="64" rx="4"/><text text-anchor="middle" y="-2">${escape(r.name)}</text><text text-anchor="middle" y="25">${g?.done||0} / ${count} · 區域群組</text></g>`;}).join('')}
</svg>`;}
export function bindMap({selectRegion}){
 const svg=document.getElementById('yard-map');if(!svg)return;
 let box=[0,0,1000,650],drag,suppressClick=false;
 const apply=()=>svg.setAttribute('viewBox',box.join(' '));
 function zoom(factor){const width=Math.max(250,Math.min(2000,box[2]*factor)),height=width*.65;box=[box[0]+(box[2]-width)/2,box[1]+(box[3]-height)/2,width,height];apply();}
 function pan(x,y){box[0]+=x;box[1]+=y;apply();}
 const activate=event=>{const region=event.target.closest('[data-map-region]');if(region)selectRegion(region.dataset.mapRegion);};
 svg.addEventListener('click',event=>{if(suppressClick){suppressClick=false;return;}activate(event);});
 svg.addEventListener('keydown',event=>{
  if(['Enter',' '].includes(event.key)&&event.target!==svg){event.preventDefault();activate(event);return;}
  const amount=box[2]*.07;
  const keys={ArrowLeft:()=>pan(-amount,0),ArrowRight:()=>pan(amount,0),ArrowUp:()=>pan(0,-amount),ArrowDown:()=>pan(0,amount),'+':()=>zoom(.8),'=':()=>zoom(.8),'-':()=>zoom(1.25),Home:()=>{box=[0,0,1000,650];apply();}};
  if(keys[event.key]){event.preventDefault();keys[event.key]();}
 });
 svg.addEventListener('pointerdown',event=>{if(event.target.closest('[data-map-region]'))return;drag={x:event.clientX,y:event.clientY,box:[...box],moved:false};svg.setPointerCapture(event.pointerId);});
 svg.addEventListener('pointermove',event=>{if(!drag||!svg.hasPointerCapture(event.pointerId))return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>5)drag.moved=true;const rect=svg.getBoundingClientRect();box=[drag.box[0]-dx*drag.box[2]/rect.width,drag.box[1]-dy*drag.box[3]/rect.height,...drag.box.slice(2)];apply();});
 svg.addEventListener('pointerup',()=>{suppressClick=!!drag?.moved;drag=null;});
 svg.addEventListener('pointercancel',()=>{drag=null;suppressClick=false;});
 document.querySelectorAll('[data-map-control]').forEach(button=>button.onclick=()=>{const k=button.dataset.mapControl;if(k==='in')zoom(.8);if(k==='out')zoom(1.25);if(k==='reset'){box=[0,0,1000,650];apply();}if(k==='left')pan(-box[2]*.1,0);if(k==='right')pan(box[2]*.1,0);if(k==='up')pan(0,-box[3]*.1);if(k==='down')pan(0,box[3]*.1);});
}
