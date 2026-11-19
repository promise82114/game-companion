import {chipCatalog,shopDetails} from './chip-data.js';
import {reportItems} from './report.js';
import {shopSource} from './chip-tech.js';
import {accessHtml} from './access.js';
import {matchesSearch} from './search.js';

export function chipsHtml({filter,search,select,escape}){
 const query=filter.search.trim().toLowerCase();
 const itemsFor=index=>reportItems.filter(item=>item.id.startsWith('shop-bwiki-'+index+'-'));
 const rows=chipCatalog.filter(chip=>(filter.chipKind==='all'||chip.kind===filter.chipKind)
  && matchesSearch([chip.name,chip.alias,chip.location,chip.priority,...itemsFor(chip.shop).map(item=>item.name+' '+(shopDetails[item.id]||''))],query));
 const shopList=items=>`<ul class="chip-unlocks">${items.map(item=>`<li><strong>${escape(item.name)}</strong>${shopDetails[item.id]?`<span>${escape(shopDetails[item.id])}</span>`:''}<small>${escape(item.note)}</small></li>`).join('')}</ul>`;
 return `<p>拿到晶片後交回橡樹實驗室的漢堡小哥，再到 ASL 用原始科學購買各項科技。依 BWIKI 列出第一輪 4 枚超級晶片與 7 枚輔助晶片。</p>
 <div class="toolbar">${search('chip-search','搜尋晶片、位置或解鎖內容')}${select('chip-kind','晶片類別',[['all','全部晶片'],['super','超級晶片'],['aux','輔助晶片']],'chipKind')}</div>
 <p class="muted">顯示 ${rows.length}／${chipCatalog.length} 枚晶片。建築包的形狀變體合併列出。</p>
 ${rows.map(chip=>{
  const item=reportItems.find(row=>row.id===chip.id);
  return `<article class="row chip-reference" id="tech-${chip.id}" data-chip>
   <h2>${escape(chip.name)}</h2><small class="english-name" lang="en">${escape(item.officialName)}</small>
   ${chip.alias?`<p class="muted">${escape(chip.alias)}</p>`:''}
   <p><strong>取得位置</strong> ${escape(chip.location)}</p>
   ${chip.entry?accessHtml(item,escape):''}
   <p class="chip-priority">推進重點 · ${escape(chip.priority)}</p>
   <a href="?view=map&amp;item=${chip.id}">地圖定位</a>
   <h3>交回後可購買</h3>${shopList(itemsFor(chip.shop))}
  </article>`;
 }).join('')}
 ${query||filter.chipKind!=='all'?'':`<section class="row"><h2>開局預設商店</h2><p>救回漢堡小哥後就能購買，鍛造站可先把武防升到 +5。</p>${shopList(itemsFor(0))}</section>
 <section class="row"><h2>奧美能資料磁碟</h2><p>擊敗神秘實驗室的施密克主管取得，解鎖下列配方。這組由擊敗首領取得，無需再花原始科學逐項購買。</p>${shopList(itemsFor(13).map(item=>({...item,note:item.id.endsWith('-3')||item.id.endsWith('-4')?'蟲類配方':'擊敗施密克主管解鎖'})))}</section>`}
 <p class="sources"><a href="${shopSource}" target="_blank" rel="noopener noreferrer">BWIKI 科學商店與晶片解鎖表 ↗</a></p>`;
}
