// 單步驟內逐項呈現原文與適用性，沒有遊戲專屬判斷或額外進度欄位。
export function dialogueHtml(step,{escape,sourceLinks,labels,showSources=true}) {
 if(!step.dialogue?.length)return '';
 return `<section class="dialogue-guide" aria-label="${escape(step.title)} 選項查證"><h3>選項順序</h3><ol class="dialogue-list">${step.dialogue.map(row=>`<li data-dialogue="${escape(row.id)}"><div class="metadata"><strong>${escape(row.speaker)} · ${escape(row.context)}</strong><span class="${row.verificationStatus==='unverified'?'branch':''}">${escape(labels[row.verificationStatus])}</span></div>${row.english?`<p class="dialogue-option" lang="en">${escape(row.english)}</p>`:'<p class="dialogue-missing">英文原文待查證</p>'}<p>${escape(row.meaning)}</p>${row.note?`<p class="muted">${escape(row.note)}</p>`:''}${showSources?`<div class="sources">${sourceLinks(row.sources)}</div>`:''}</li>`).join('')}</ol></section>`;
}
