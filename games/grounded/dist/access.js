import {accessByPin,accessEntries} from './access-data.js';
import {chipCatalog} from './chip-data.js';

export function itemAccess(item){
 const chip=chipCatalog.find(row=>row.id===item.id);
 if(chip)return {layer:chip.kind==='super'?'主線實驗室':'輔助晶片',route:chip.location,entry:chip.entry,prep:'',source:'https://wiki.biligame.com/grounded/科学商店'};
 return ['molars','mega','scab','docs'].includes(item.group)?accessByPin.get(item.pin):null;
}
export function accessSearchValues(item){
 const access=itemAccess(item);
 const entry=accessEntries[access?.entry];
 return [access?.layer,access?.route,access?.prep,entry?.name,entry?.prep,entry?.route];
}

export function accessHtml(item,escape){
 const access=itemAccess(item);
 if(!access)return '';
 const entry=accessEntries[access.entry];
 const prep=[...new Set([access.prep,entry?.prep].filter(Boolean))].join('、');
 return `<div class="collection-access">
 <span>${escape(access.layer)}${prep?' · '+escape(prep):''}</span>
 <div id="access-${item.id}"><strong>如何抵達${entry?' · '+escape(entry.name):''}</strong>
 <p>${escape(access.route)}</p>
 ${entry?`<p><strong>入口與前置</strong> ${escape(entry.route)}</p><a href="${entry.source}" target="_blank" rel="noopener noreferrer">入口資料 ↗</a>`:''}
 <a class="access-source" href="${access.source||'https://mapgenie.io/grounded/maps/yard?locationIds='+item.pin}" target="_blank" rel="noopener noreferrer">位置圖與來源 ↗</a>
 </div></div>`;
}
