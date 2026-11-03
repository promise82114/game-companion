import {collectionRegions,collectionItems,artifactCandidates} from '../collection-data.js';
import {puzzles,puzzleProgressId} from './solutions.js';

export {collectionRegions,collectionItems,artifactCandidates};
export const collectionProgressId=id=>'collectible-'+id;
export const itemsForRegion=code=>collectionItems.filter(item=>item.region===code);
export const starsForRegion=code=>puzzles.filter(p=>p.region===code&&p.kind==='star');
export const collectionDone=(progress,id)=>progress.steps[collectionProgressId(id)]?.status==='completed';
export const counterKey=(region,kind)=>'collection-'+kind+'-'+region;
export function readCounter(progress,region,kind){const value=progress.settings[counterKey(region,kind)];return Number.isSafeInteger(value)&&value>=0?value:0;}
export function regionCounts(progress,code){
 const list=itemsForRegion(code),stars=starsForRegion(code),counts={};
 for(const kind of ['lab','trevor','lifthrasir','remnant']){const items=list.filter(item=>item.kind===kind);counts[kind]={done:items.filter(item=>collectionDone(progress,item.id)).length,total:items.length};}
 counts.star={done:stars.filter(p=>progress.steps[puzzleProgressId(p.id)]?.status==='completed').length,total:stars.length};
 counts.done=Object.values(counts).reduce((n,c)=>n+c.done,0);counts.total=list.length+stars.length;counts.complete=counts.done===counts.total;
 return counts;
}
export function collectionTotals(progress){
 const counts={done:0,total:0,regions:0,lab:0,trevor:0,lifthrasir:0,remnant:0,star:0,text:readCounter(progress,'STORY','text'),artifact:0};
 for(const r of collectionRegions){const c=regionCounts(progress,r.code);counts.done+=c.done;counts.total+=c.total;counts.regions+=Number(c.complete);for(const kind of ['lab','trevor','lifthrasir','remnant','star'])counts[kind]+=c[kind].done;counts.text+=readCounter(progress,r.code,'text');counts.artifact+=readCounter(progress,r.code,'artifact');}
 return counts;
}
const labels={lab:'實驗室',trevor:'Trevor 錄音',lifthrasir:'Lifthrasir 錄音',remnant:'人物光影',star:'星星'};
const imageLink=(item,escape)=>`<a href="${escape(item.imageUrl)}" target="_blank" rel="noopener noreferrer">位置圖 ↗</a>`;
function counterHtml(region,kind,label,progress){return `<label>${label}<input type="number" min="0" step="1" inputmode="numeric" data-collection-counter="${kind}" data-counter-region="${region}" aria-label="${region} ${label}" value="${readCounter(progress,region,kind)}"></label>`;}
export function regionCollectionsHtml(code,{escape,progress}){
 const region=collectionRegions.find(r=>r.code===code);if(!region)return '';
 const c=regionCounts(progress,code),list=itemsForRegion(code),stars=starsForRegion(code),candidates=artifactCandidates.filter(item=>item.region===code);
 return `<section class="region-collections" id="collection-region-${code}" data-region-collection="${code}"><div class="collection-heading"><h3>本區收集</h3><strong data-region-total="${code}">${c.done} / ${c.total} · ${c.complete?'已收齊':'未收齊'}</strong></div><dl class="collection-counts">${Object.entries(labels).map(([kind,label])=>`<div><dt>${label}</dt><dd data-region-count="${code}-${kind}">${c[kind].total?c[kind].done+' / '+c[kind].total:'無'}</dd></div>`).join('')}</dl>
 ${list.map(item=>`<article class="collection-item${collectionDone(progress,item.id)?' collection-done':''}" id="${collectionProgressId(item.id)}"><label><input type="checkbox" data-collection-complete="${item.id}" ${collectionDone(progress,item.id)?'checked':''}><strong>${escape(item.title)}</strong></label>${item.warning?'<p class="puzzle-warning">'+escape(item.warning)+'</p>':''}<p class="collection-location">${escape(item.location)}</p><p class="collection-action">${escape(item.action)} ${imageLink(item,escape)}</p></article>`).join('')}
 <div class="collection-stars">${stars.map(p=>`<div><label><input type="checkbox" data-collection-star="${p.id}" ${progress.steps[puzzleProgressId(p.id)]?.status==='completed'?'checked':''}><span>${escape(p.title)}</span></label><a href="#puzzle-${p.id}" data-puzzle-link="${p.id}">前往雕像題目</a></div>`).join('')}</div>
 <div class="collection-counters">${counterHtml(code,'text','本區已讀文字',progress)}${counterHtml(code,'artifact','本區已發現遺物',progress)}</div>
 <div class="artifact-candidates"><h4>遺物候選位置</h4><p>出現點可能變動；找到並完成遊戲中的辨識後，再記入上方數量。</p>${candidates.length?'<ul>'+candidates.map(item=>'<li>'+escape(item.location)+' '+imageLink(item,escape)+'</li>').join('')+'</ul>':'<p class="solution-pending">本區的遺物位置待查證，不能當成沒有遺物；找到後仍可記數。</p>'}</div></section>`;
}
export function collectionMiniHtml(progress){const c=collectionTotals(progress);return `<p class="collection-mini"><a href="?view=collectibles" data-view="collectibles">收集 ${c.done} / ${c.total} · ${c.regions} / 12 區已收齊</a></p>`;}
export function collectionOverviewHtml({escape,progress}){
 const c=collectionTotals(progress);
 return `<section class="collection-overview" aria-label="全遊戲收集"><h2>固定收集 ${c.done} / ${c.total} · ${c.regions} / 12 區已收齊</h2><dl class="collection-counts collection-global">${[['lab',12],['trevor',12],['lifthrasir',12],['remnant',20],['star',24]].map(([kind,total])=>'<div><dt>'+labels[kind]+'</dt><dd data-global-count="'+kind+'">'+c[kind]+' / '+total+'</dd></div>').join('')}<div><dt>文字獎盃目標</dt><dd data-global-count="text">${c.text} / 30</dd></div><div><dt>遺物獎盃目標</dt><dd data-global-count="artifact">${c.artifact} / 10</dd></div></dl>
 <p class="collection-note">星星與原本的解題勾選共用進度。文字與遺物另外記數，不計入固定 80 項；30／10 是全遊戲獎盃目標，並非全部物件總數。每區文字總量未統計，遺物位置可能變動。</p>
 <table class="collection-table"><caption>每區收集確認；點區域名稱查看位置與勾選清單</caption><thead><tr><th scope="col">區域</th>${Object.values(labels).map(label=>'<th scope="col">'+label+'</th>').join('')}<th scope="col">收集確認</th></tr></thead><tbody>${collectionRegions.map(r=>{const row=regionCounts(progress,r.code);return `<tr data-collection-row="${r.code}"><th scope="row"><a href="#step-${r.stepId}" data-collection-region-link="${r.code}">${r.code} · ${escape(r.name)}</a></th>${Object.entries(labels).map(([kind,label])=>`<td data-label="${label}">${row[kind].total?row[kind].done+' / '+row[kind].total:'無'}</td>`).join('')}<td data-label="收集確認">${row.complete?'已收齊':row.done+' / '+row.total}</td></tr>`;}).join('')}</tbody></table>
 <div class="collection-counters">${counterHtml('STORY','text','城市／巨構已讀文字',progress)}</div><p class="collection-note">各區已讀文字與遺物數量，在該區清單底部輸入。錄音要下載，文字要逐份開啟；不自動勾選獎盃。</p></section>`;
}
export function collectionResearchHtml({escape}){return `<section class="research-register"><h3>區域收集位置查證 · 2026-11-04</h3><p>56 個固定項目與 19 個遺物候選點，依 Hanni 圖文位置整理；位置圖為來源連結，未逐張核實所有轉角或在 PS5 逐點重現。N1、W3 遺物位置仍待查證。</p>${collectionItems.map(item=>`<article><h4>${item.region} · ${escape(item.title)}</h4><p>${escape(item.location)}</p><div class="sources"><a href="${escape(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">Hanni 收集指南 ↗</a>${imageLink(item,escape)}</div></article>`).join('')}</section>`;}
