// Read-only presentation of sourced locations; completion stays in the existing entity records.
export const acquisitionModes={fixed:'固定寶箱來源',quest:'任務交付獎勵',story:'主線事件取得',optional:'額外挑戰來源',pool:'隨機候選池',candidate:'對應待核實',unverified:'位置待查證'};
export function hasNamedSource(e){return e.acquisitionRoutes?.some(r=>['fixed','quest','story','optional'].includes(r.mode))||false;}
export function matchesResearch(e,value){
 if(!value)return true;
 if(value==='named')return hasNamedSource(e);
 if(value==='pool')return !hasNamedSource(e)&&e.acquisitionRoutes?.some(r=>r.mode==='pool');
 if(value==='uncertain')return e.acquisitionRoutes?.some(r=>['candidate','unverified'].includes(r.mode))||!!e.researchConflict||!!e.exploration?.uncertainty;
 if(value==='secret')return e.exploration?.type==='secret';
 if(value==='explored')return !!e.exploration;
 if(value==='missing')return e.kind==='dungeon'&&!e.exploration;
 return false;
}
export function researchLabel(e){if(e.kind==='equipment')return hasNamedSource(e)?'具名來源 · 未實機':e.acquisitionRoutes?.some(r=>r.mode==='pool')?'僅候選池 · 非保證':'取得對應待核實';if(e.kind==='dungeon')return e.exploration?(e.exploration.type==='secret'?'秘密路徑':'入口／回收提醒')+' · 來源記載':'逐房間走法待查';return '';}
export function locationDetails(e,{data,esc,inline,link,sources,check,suffix=''}){
 let html='';
 if(e.acquisitionRoutes){html+='<section class="location-guide" aria-label="取得來源"><h4>取得來源</h4><p class="muted">來源記載，未經 PS4 實機驗收；開箱、清洞與取得各自確認。</p><ul class="acquisition-list">';
 for(const r of e.acquisitionRoutes){html+=`<li><strong>${esc(acquisitionModes[r.mode])}</strong><p>${inline(r.where)}</p>${r.mode==='pool'?'<p class="uncertainty">只能確認這個箱子有機會出；不保證取得此件，也不代表箱子能刷新。</p>':''}${r.note?'<p class="uncertainty">'+inline(r.note)+'</p>':''}<div class="related">${r.relatedEntityIds.map(id=>{const target=data.entities.find(x=>x.id===id);return link('collections',target.name,{category:target.kind,target:id});}).join('')}</div>${sources(r.sourceIds)}</li>`;}
 html+='</ul></section>';}
 if(e.exploration){const p=e.exploration;html+=`<section class="location-guide" aria-label="通路與回收"><h4>${p.type==='secret'?'秘密路徑與漏箱':'入口與回收順序'}</h4><p class="muted">${p.walkthroughScope==='source-route'?'已收錄來源記載的完整行進順序；PS4實機與逐箱配對仍待核實。':'已收錄特定提醒，完整逐房間導航仍未驗收。'}</p><ol>${p.steps.map(s=>'<li>'+inline(s)+'</li>').join('')}</ol>${p.uncertainty?'<p class="uncertainty">待核實／注意：'+inline(p.uncertainty)+'</p>':''}${sources(p.sourceIds)}</section>`;}
 if(e.researchConflict)html+='<p class="uncertainty">來源衝突：'+inline(e.researchConflict)+'</p>';
 if(e.kind==='dungeon'){
 const rewards=data.entities.filter(item=>item.kind==='equipment'&&item.acquisitionRoutes?.some(r=>r.relatedEntityIds.includes(e.id)));
 if(rewards.length)html+='<section class="related-rewards" aria-label="相關裝備核對"><h4>相關裝備 · 背包取得另勾</h4>'+rewards.map(item=>`<div>${check('entities',item.id,item.name,suffix+'--'+e.id+'--reward')}<small>${item.acquisitionRoutes.filter(r=>r.relatedEntityIds.includes(e.id)).map(r=>acquisitionModes[r.mode]).join('／')}</small> ${link('collections','看取得詳情',{category:'equipment',target:item.id})}</div>`).join('')+'</section>';
 }
 return html;
}
export function researchSummary(data,category){const c=data.locationResearch?.coverage;if(!c)return '';if(category==='equipment')return `收錄 ${c.equipment} 件：${c.named} 件有具名來源、${c.poolOnly} 件僅候選池、${c.candidateOnly+c.unverified} 件僅有待核對應。具名來源含5件額外挑戰裝備，非白金必須；其他替代取得點仍可能待核實。`;if(category==='dungeon')return `基準 ${c.dungeons} 個地城：${c.exploration} 個有通路／入口／回收提醒，其中 ${c.secretPaths} 個涉及秘密路徑；其餘 ${c.dungeons-c.exploration} 個未補逐房間走法。`;return '';}
