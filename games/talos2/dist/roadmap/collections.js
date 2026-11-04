import {collectionRegions,collectionItems,artifactCandidates} from '../collection-data.js';
import {puzzles,puzzleProgressId} from './solutions.js';
import {revealButton,completionBody} from './completion.js';
import {mapLocateButton} from './maps.js';
import {humanArtifacts,artifactDone,artifactFoundIn,artifactCounts} from './artifacts.js';

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
 for(const r of collectionRegions){const c=regionCounts(progress,r.code);counts.done+=c.done;counts.total+=c.total;counts.regions+=Number(c.complete);for(const kind of ['lab','trevor','lifthrasir','remnant','star'])counts[kind]+=c[kind].done;counts.text+=readCounter(progress,r.code,'text');}
 const artifacts=artifactCounts(progress);counts.artifact=artifacts.total;counts.artifactChecked=artifacts.checked;counts.artifactManual=artifacts.manual;
 return counts;
}
const labels={lab:'實驗室',trevor:'Trevor 錄音',lifthrasir:'Lifthrasir 錄音',remnant:'人物光影',star:'星星'};
const imageLink=(item,escape)=>`<a href="${escape(item.imageUrl)}" target="_blank" rel="noopener noreferrer">位置圖 ↗</a>`;
function counterHtml(region,kind,label,progress){return `<label>${label}<input type="number" min="0" step="1" inputmode="numeric" data-collection-counter="${kind}" data-counter-region="${region}" aria-label="${region} ${label}" value="${readCounter(progress,region,kind)}"></label>`;}
function artifactCountNote(progress){const c=artifactCounts(progress);return `<p class="artifact-count-note">已勾選 ${c.checked} 種遺物；手動紀錄 ${c.manual} 件。目標進度取兩者較大值，不相加，避免把同一件算兩次。舊件數無法推定是哪一種物品，請依遊戲內實際取得逐項核對。</p>`;}
function artifactHtml(site,{escape,progress}){
 const item=humanArtifacts.find(item=>item.id===site.artifactId),complete=artifactDone(progress,item.id),found=artifactFoundIn(progress,item.id),regions=[...new Set(artifactCandidates.filter(other=>other.artifactId===item.id).map(other=>other.region))];
 return `<article class="artifact-item${complete?' artifact-done':''}" id="artifact-${site.id}" data-artifact-site="${site.id}"><label><input type="checkbox" data-artifact-complete="${item.id}" data-artifact-region="${site.region}" ${complete?'checked':''}><strong>${escape(item.title)}｜${escape(item.nameZhTW)}</strong><span class="artifact-status">${complete?'已取得（全區共用）':'尚未記錄取得'}</span></label><p class="artifact-shared">${complete?(found?'已在 '+escape(found)+' 記錄取得；此處不用再找。':'已記錄取得；此處不用再找。'):'可能出現於 '+regions.join('、')+'；這些是同一物品的候選位置，不是每處各一件。'}</p><p class="artifact-location">${escape(site.location)} ${imageLink(site,escape)} ${mapLocateButton('artifact-'+site.id,escape)}</p></article>`;
}
export function regionCollectionsHtml(code,{escape,progress}){
 const region=collectionRegions.find(r=>r.code===code);if(!region)return '';
 const c=regionCounts(progress,code),list=itemsForRegion(code),stars=starsForRegion(code),candidates=artifactCandidates.filter(item=>item.region===code);
 return `<section class="region-collections" id="collection-region-${code}" data-region-collection="${code}"><div class="collection-heading"><h3>本區收集</h3><strong data-region-total="${code}">${c.done} / ${c.total} · ${c.complete?'已收齊':'未收齊'}</strong></div><dl class="collection-counts">${Object.entries(labels).map(([kind,label])=>`<div><dt>${label}</dt><dd data-region-count="${code}-${kind}">${c[kind].total?c[kind].done+' / '+c[kind].total:'無'}</dd></div>`).join('')}</dl>
 <p class="collection-preflight">開始本區謎題前先看位置，沿路順手完成；錄音需下載，光影需碰觸，電腦文字需逐份開啟。${['E1','E2'].includes(code)?'本區沒有一般人物光影。':'本區有 2 個人物光影。'}</p>
 ${list.map(item=>{const id=collectionProgressId(item.id),complete=collectionDone(progress,item.id);return `<article class="collection-item${complete?' collection-done':''}" id="${id}"><div class="collection-item-heading"><label><input type="checkbox" data-collection-complete="${item.id}" ${complete?'checked':''}><strong>${escape(item.title)}</strong></label>${revealButton(id,complete,escape)}</div>${item.warning?'<p class="puzzle-warning">'+escape(item.warning)+'</p>':''}${completionBody(id,complete,`<p class="collection-location">${escape(item.location)}</p><p class="collection-action">${escape(item.action)} ${imageLink(item,escape)} ${mapLocateButton(id,escape)}</p>`)}</article>`;}).join('')}
 <div class="collection-stars">${stars.map(p=>`<div><label><input type="checkbox" data-collection-star="${p.id}" ${progress.steps[puzzleProgressId(p.id)]?.status==='completed'?'checked':''}><span>${escape(p.title)}</span></label><a href="#puzzle-${p.id}" data-puzzle-link="${p.id}">前往雕像題目</a></div>`).join('')}</div>
 <div class="collection-counters">${counterHtml(code,'text','本區已讀文字',progress)}</div>
 <div class="artifact-candidates"><h4>遺物 · 全區共用取得紀錄</h4><p class="artifact-warning">候選位置不保證有物品。已在其他區取得的同一遺物會一起勾選，這裡不用再找；沒看到物品時，先核對其他候選位置，不必在此處找齊整份清單。</p>${candidates.length?candidates.map(site=>artifactHtml(site,{escape,progress})).join(''):'<p class="solution-pending">本區的遺物位置待查證，不能當成沒有遺物；找到清單外物品可用下方手動紀錄。</p>'}${artifactCountNote(progress)}<details class="artifact-manual"><summary>手動紀錄（舊進度／清單外物品）</summary><p>記錄本區實際取得的總件數，包含已勾選者。原有數字會保留，不會自動改寫，也不會再與勾選數相加。</p><div class="collection-counters">${counterHtml(code,'artifact','本區手動遺物總數',progress)}</div></details></div></section>`;
}
export function collectionMiniHtml(progress){const c=collectionTotals(progress);return `<p class="collection-mini"><a href="?view=collectibles" data-view="collectibles">收集 ${c.done} / ${c.total} · ${c.regions} / 12 區已收齊</a></p>`;}
export function collectionOverviewHtml({escape,progress}){
 const c=collectionTotals(progress);
 return `<section class="collection-overview" aria-label="全遊戲收集"><h2>固定收集 ${c.done} / ${c.total} · ${c.regions} / 12 區已收齊</h2><dl class="collection-counts collection-global">${[['lab',12],['trevor',12],['lifthrasir',12],['remnant',20],['star',24]].map(([kind,total])=>'<div><dt>'+labels[kind]+'</dt><dd data-global-count="'+kind+'">'+c[kind]+' / '+total+'</dd></div>').join('')}<div><dt>文字獎盃目標</dt><dd data-global-count="text">${c.text} / 30</dd></div><div><dt>遺物獎盃目標</dt><dd data-global-count="artifact">${c.artifact} / 10</dd></div></dl>
 <p class="collection-note">星星與原本的解題勾選共用進度。遺物依物品勾選，各區同一物品連動，只計一次；文字與遺物不計入固定 80 項，30／10 是獎盃目標，並非全部物件總數。候選位置不保證有物品。</p>${artifactCountNote(progress)}
 <table class="collection-table"><caption>每區收集確認；點區域名稱查看位置與勾選清單</caption><thead><tr><th scope="col">區域</th>${Object.values(labels).map(label=>'<th scope="col">'+label+'</th>').join('')}<th scope="col">收集確認</th></tr></thead><tbody>${collectionRegions.map(r=>{const row=regionCounts(progress,r.code);return `<tr data-collection-row="${r.code}"><th scope="row"><a href="#step-${r.stepId}" data-collection-region-link="${r.code}">${r.code} · ${escape(r.name)}</a></th>${Object.entries(labels).map(([kind,label])=>`<td data-label="${label}">${row[kind].total?row[kind].done+' / '+row[kind].total:'無'}</td>`).join('')}<td data-label="收集確認">${row.complete?'已收齊':row.done+' / '+row.total}</td></tr>`;}).join('')}</tbody></table>
 <div class="collection-counters">${counterHtml('STORY','text','城市／巨構已讀文字',progress)}</div><p class="collection-note">各區遺物可直接勾選；先前手動數字保留在該區清單底部。錄音要下載，文字要逐份開啟；不自動勾選獎盃。</p></section>`;
}
export function collectionResearchHtml({escape}){return `<section class="research-register"><h3>區域收集位置查證 · 2026-11-04</h3><p>56 個固定項目與 19 個遺物候選點，依 Hanni 圖文位置整理；位置圖為來源連結，未逐張核實所有轉角或在 PS5 逐點重現。N1、W3 遺物位置仍待查證。</p>${collectionItems.map(item=>`<article><h4>${item.region} · ${escape(item.title)}</h4><p>${escape(item.location)}</p><div class="sources"><a href="${escape(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">Hanni 收集指南 ↗</a>${imageLink(item,escape)}</div></article>`).join('')}</section>`;}
