import {cf} from './chinese-first.js';
import {count,isDone} from './model.js';
export const collectibleTypes={photos:'攝影尋寶',memoirs:'追憶日記'};
export const collectionRows=(data,type)=>data.collectibles.filter(r=>r.type===type);
export const collectionCount=(data,progress,type)=>count(progress,'objectives',collectionRows(data,type));
export const unitKey=r=>[r.type,r.city,r.region].join('|');
export function routeCollectibles(data,chapterId){
 const n=chapterId==='chapter-finale'?14:chapterId==='P03'?14:Number(chapterId.slice(8));
 if(!Number.isInteger(n))return [];
 const hawaii=[5,6,7,9,11,13,14].includes(n),japan=[8,10,12,14].includes(n);
 return data.collectibles.filter(r=>r.minChapter<=n&&(r.city==='夏威夷'?hawaii:japan));
}
export function collectibleRow(r,{data,progress,esc,link,check,embedded=false}){
 const done=isDone(progress,'objectives',r.id),detailId='collectible-detail-'+r.id;
 const sourceLinks=r.sourceRefs.map(id=>{const s=data.collectibleSources.find(s=>s.id===id);return `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a>`;}).join(' · ');
 const detail=`<p class="location-line"><strong>位置</strong> ${esc(r.location)}</p><p><strong>取得方式</strong> ${esc(r.actions)}</p><p class="unlock"><strong>解鎖</strong> ${esc(r.unlock)}</p><p><strong>時段</strong> ${esc(r.timeOfDay)}</p>${r.caution?'<p class="warning">'+esc(r.caution)+'</p>':''}${r.prerequisites.length?'<p>前置核對：'+r.prerequisites.map(id=>{const item=data.collectibles.find(x=>x.id===id);return item?link('collections',(isDone(progress,'objectives',id)?'已勾選 ':'待核對 ')+item.city+' #'+item.number+' '+item.label,{category:item.type,target:id}):link('collections',id,{category:'substories',target:id});}).join(' · ')+'</p>':''}<p class="source-links">${sourceLinks}</p>`;
 return `<article class="row collectible-row ${done?'done':''}" id="entry-${esc(r.id)}">${check('objectives',r.id,cf.plain(r.label))}<div class="collectible-meta"><span>${esc(r.city+' · '+r.region+' #'+r.number)}</span><span class="original-name">${esc(r.originalName)}</span></div>${done&&embedded?`<details id="${detailId}"><summary>回看位置與解鎖條件</summary>${detail}</details>`:embedded?`<div class="row-body">${detail}</div>`:`<p class="compact-location">${esc(r.location)}</p><details id="${detailId}"><summary>取得方式、解鎖條件與來源</summary>${detail}</details>`}<div class="row-footer">${embedded?link('collections','到查漏清單',{category:r.type,target:r.id}):link('roadmap','到章節路線',{chapter:r.chapterId,target:r.id})}<small>${esc(r.id)}</small></div></article>`;
}
export function collectibleSummary(data,progress,type){const rows=collectionRows(data,type);return {done:collectionCount(data,progress,type),total:rows.length,required:type==='photos'?30:70,legacy:progress.counters[type]?.value??null};}
