import {roadmap as data} from './data.js';
import {trophyLabel} from './trophy-names.js';
import {statuses,warnings,verificationLabels,statusOf,done,overview,matches} from './roadmap/model.js';
import {createStore} from './roadmap/store.js';
import {setupSync} from './roadmap/sync.js';
import {dialogueHtml} from './roadmap/evidence.js';
import {puzzles,puzzleProgressId,puzzlesForStep,puzzleListHtml} from './roadmap/solutions.js';
const $=id=>document.getElementById(id),core=window.SideProjectSync;
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let progress,activeStage,branchExpanded=false,filter='all',query='',view=new URL(location.href).searchParams.get('view')||'roadmap',importReview,backupTarget,sync,rendering=false,refreshQueued=false;
const currentOverview=()=>overview(data,{...progress,settings:{...progress.settings,currentStage:activeStage||progress.settings.currentStage}});
const expanded=new Set(['P0']),openBranches=new Set();
const store=createStore(data,core,()=>{void refresh();});
let messageTimer;
function message(text){$('feedback').textContent=text;clearTimeout(messageTimer);messageTimer=setTimeout(()=>$('feedback').textContent='',9000);}
async function action(fn){try{await fn();}catch(e){message(e.message);}}
const sourceLinks=keys=>keys.map(k=>`<a href="${escape(data.sources[k].url)}" target="_blank" rel="noopener noreferrer">${escape(data.sources[k].title)} ↗</a>`).join('');
const evidence=step=>dialogueHtml(step,{escape,sourceLinks,labels:verificationLabels,showSources:false});
const puzzleDone=p=>progress.steps[puzzleProgressId(p.id)]?.status==='completed';
const needsAttention=step=>!done(progress,step.id)||puzzlesForStep(step.id).some(p=>!puzzleDone(p));
const rowLink=s=>s?`<a href="#step-${s.id}" data-step-link="${s.id}">${escape(s.title)}</a>`:'目前沒有待處理項目';
function selectOptions(map,value){return Object.entries(map).map(([id,label])=>`<option value="${id}" ${value===id?'selected':''}>${label}</option>`).join('');}
async function refresh(){
 if(!progress)return;
 if(rendering){refreshQueued=true;return;}rendering=true;
 try{progress=await store.get();render();}catch(e){message(e.message);}finally{rendering=false;if(refreshQueued){refreshQueued=false;void refresh();}}
}
function shell(){
 const o=currentOverview();
 return `<div class="title-row"><div><p class="subtitle">${escape(data.title)} · PS5 本體</p><h1>${{roadmap:'遊玩 Roadmap',branches:'分歧追蹤',trophies:'獎盃清單',backup:'來源與查證'}[view]||'遊玩 Roadmap'}</h1></div><span class="save-status">進度儲存在此裝置</span></div>
 <section class="summary-grid" aria-label="目前進度"><div><span>攻略步驟完成</span><strong>${o.completed} <small>/ ${data.steps.length}</small></strong></div><div><span>獎盃實際取得</span><strong id="trophy-count">${o.earned} <small>/ ${o.total}</small></strong></div><div><span>目前瀏覽章節</span><strong class="current">${escape(data.stages.find(s=>s.id===o.stage).title)}</strong></div></section>`;
}
function stepStatusHtml(step,state){
 return `<div class="step-status" role="group" aria-label="${escape(step.title)} 進度"><span class="step-state">${statuses[state]}</span>${['skipped','unknown','missed'].map(status=>`<button type="button" data-status-action="${step.id}" data-status-value="${status}" aria-pressed="${state===status}">${statuses[status]}</button>`).join('')}</div>`;
}
function trophyCheckbox(trophy,context,card=false){
 return `<label class="${card?'trophy-card':'trophy-row'}"><input type="checkbox" data-trophy="${trophy.id}" data-trophy-context="${context}" ${progress.trophies[trophy.id]?.earned?'checked':''}><span class="trophy-name">${escape(trophyLabel(trophy))}</span></label>`;
}
function stepHtml(step){
 const state=statusOf(progress,step.id),backup=progress.backups[step.id],trophies=step.trophyRefs.map(id=>data.trophies.find(t=>t.id===id));
 return `<article id="step-${step.id}" class="step ${state}" data-step="${step.id}">
 <div class="step-top"><input id="complete-${step.id}" type="checkbox" data-complete="${step.id}" aria-label="完成 ${escape(step.title)}" ${state==='completed'?'checked':''}><div><label class="step-title" for="complete-${step.id}">${escape(step.title)}</label><div class="metadata"><span class="${step.warningLevel}">${warnings[step.warningLevel]}</span>${step.verificationStatus==='unverified'?'<span>待查證</span>':''}<span>${escape(step.location)}</span></div>${stepStatusHtml(step,state)}</div></div>
 <div class="step-body">
 ${step.trigger&&step.trigger!=='抵達上述地點，離開前查看本步驟。'?'<p class="step-trigger">'+escape(step.trigger)+'</p>':''}
 ${step.prerequisites.length?'<p class="step-prerequisites">前置：'+step.prerequisites.map(id=>`<a href="#step-${id}" data-step-link="${id}">${escape(data.steps.find(s=>s.id===id)?.title||id)}</a>`).join('、')+'</p>':''}
 <ol class="instructions">${step.actions.map(s=>'<li>'+escape(s)+'</li>').join('')}</ol>${evidence(step)}
 ${puzzleListHtml(step.id,{escape,progress,showSolutions:progress.settings.showSolutions===true})}
 ${trophies.length?'<div class="step-trophies" role="group" aria-label="'+escape(step.title)+' 獎盃">'+trophies.map(t=>trophyCheckbox(t,step.id,true)).join('')+'</div>':''}
 ${step.backupRecommended?`<div class="backup-check"><span>${backup?.confirmedAt?'已記錄備份：'+escape(new Date(backup.confirmedAt).toLocaleString('zh-TW'))+(backup.note?' · '+escape(backup.note):''):'此處先備份'}</span><button data-backup="${step.id}">${backup?.confirmedAt?'更新備份紀錄':'記錄 PS5 備份'}</button></div>`:''}
 </div></article>`;
}
function branchHtml(branch){
 const state=progress.branches[branch.id]?.status||'not_started',count=branch.prerequisites.filter(id=>done(progress,id)).length;
 return `<article class="branch-lane"><h3>${escape(branch.name)}</h3><p>${escape(trophyLabel(data.trophies.find(t=>t.officialName===branch.trophy))||branch.trophy)}</p><p>已手動確認前置 ${count} / ${branch.prerequisites.length} · <strong>成功條件待驗證</strong></p><label>${escape(branch.name)} 路線紀錄<select data-branch="${branch.id}">${selectOptions(statuses,state)}</select></label><details data-branch-detail="${branch.id}" ${openBranches.has(branch.id)?'open':''}><summary>前置檢查、還原路線與實錄</summary><p>${escape(branch.summary)}</p><p>${escape(branch.evidenceNote||"")}</p><ul>${branch.prerequisites.map(id=>`<li>${done(progress,id)?'✓':'○'} <a href="#step-${id}" data-step-link="${id}">${escape(data.steps.find(s=>s.id===id).title)}</a></li>`).join('')}</ul><p>${escape(branch.restore)}</p><a href="#step-${branch.stepId}" data-step-link="${branch.stepId}">開啟此分歧步驟</a><p><a href="${data.sources.mayors.url}&t=${branch.sourceTime.split(':').reduce((a,v)=>a*60+Number(v),0)}s" target="_blank" rel="noopener noreferrer">市長實錄 ${branch.sourceTime} ↗</a></p></details></article>`; // taste-skill-ignore: 使用者明確要求風險符號與完成檢查記號。
}
function roadmapHtml(){
 const o=currentOverview(),current=data.stages.find(s=>s.id===o.stage),local=data.steps.filter(s=>s.stageId===o.stage),risk=local.find(s=>!done(progress,s.id)&&['irreversible','branch'].includes(s.warningLevel));
 return `<div class="solution-toggle"><label for="show-solutions"><input id="show-solutions" type="checkbox" ${progress.settings.showSolutions===true?'checked':''}>拒絕謎語 <span>顯示詳細解法與圖解</span></label><span id="puzzle-count">解題紀錄 ${puzzles.filter(p=>progress.steps[puzzleProgressId(p.id)]?.status==='completed').length} / ${puzzles.length}</span></div><nav class="chapter-picker" aria-label="選擇攻略階段"><label>直接選章節<select id="chapter-select">${data.stages.map(s=>`<option value="${s.id}" ${s.id===o.stage?'selected':''}>${s.id} · ${escape(s.title)}</option>`).join('')}</select></label><div class="stage-nav">${data.stages.map(s=>`<button data-stage="${s.id}" ${s.id===o.stage?'aria-current="step"':''} aria-label="${escape(s.title)}">${s.id}</button>`).join('')}</div></nav>
 ${progress.settings.showSolutions===true?'<p class="puzzle-glossary">同類設備依取得順序稱 A、B、C。橋樑拼塊以每段開始時左上形狀由左到右編號；「轉」表示旋轉到預覽與路面相合再放下。</p>':''}
 <section class="checkpoint" aria-label="本章提醒"><div><strong>${risk?'本章留意':'本章進度'} · ${escape(current.title)}</strong><p>${risk?escape(risk.title):'可直接從這一章開始，前面章節的狀態會保持原樣。'}</p></div>${risk?`<button data-step-link="${risk.id}">查看提醒</button>`:''}</section>
 <div class="toolbar"><label>搜尋所有章節<input id="search" type="search" value="${escape(query)}" placeholder="地點、角色、獎盃名稱…"></label><label>顯示<select id="filter">${selectOptions({all:'全部',pending:'未完成',missable:'容易錯過',backup:'備份節點',recommended:'推薦體驗',completed:'已完成',unverified:'待查證'},filter)}</select></label><button id="continue">繼續下一步</button></div>
 <div class="stage-list">${data.stages.map(s=>{const all=data.steps.filter(step=>step.stageId===s.id),items=all.filter(step=>(matches(step,progress,filter)||(filter==='pending'&&needsAttention(step)))&&(!query||JSON.stringify([step,puzzlesForStep(step.id).map(p=>[p.title,p.label]),step.trophyRefs.map(id=>trophyLabel(data.trophies.find(t=>t.id===id)))]).toLocaleLowerCase().includes(query.toLocaleLowerCase())));if(!items.length&&(query||filter!=='all'))return '';return `<details class="stage" id="stage-${s.id}" data-stage-detail="${s.id}" ${expanded.has(s.id)||query||filter!=='all'?'open':''}><summary><span>${s.id}</span><strong>${escape(s.title)}</strong><small>${all.filter(step=>done(progress,step.id)).length}/${all.length}</small></summary><p class="stage-description">${escape(s.description)}</p>${items.length?items.map(stepHtml).join(''):'<p class="empty">此階段沒有符合條件的步驟。</p>'}</details>`;}).join('')||'<p class="empty">沒有符合條件的步驟。請清除搜尋或改回「全部」。</p>'}</div>
 <details class="branch-overview" ${branchExpanded?'open':''}><summary>三市長分歧追蹤 · ${data.branches.length} 條路線</summary><p>各自追蹤，不保證單一 W2 備份可全拿。</p><div class="branch-grid">${data.branches.map(branchHtml).join('')}</div></details>`;
}
function trophiesHtml(){return `<h2>本體獎盃 · ${data.baseCount} 個</h2><p>${escape(data.classification)}</p><div class="trophy-list">${data.trophies.filter(t=>t.category==='base').map(t=>trophyCheckbox(t,'list')).join('')}</div>`;}
function researchHtml(){
 const seen=new Set(),paragraph=text=>{if(!text||seen.has(text))return '';seen.add(text);return '<p>'+escape(text)+'</p>';};
 return `<section class="research-register"><h3>攻略查證紀錄</h3><p>${escape(data.officialIdNote)}</p><p>獎盃名稱來源：${sourceLinks(['psn','psnZhTW'])}</p>${data.steps.map(step=>`<article id="research-${step.id}"><h4>${escape(step.title)}</h4>${paragraph(step.verification)}${paragraph(step.recovery)}<div class="sources">${sourceLinks(step.sources)}</div>${step.dialogue?.length?'<ul>'+step.dialogue.map(row=>'<li>'+escape(row.speaker+' · '+row.context)+'：'+sourceLinks(row.sources)+'</li>').join('')+'</ul>':''}</article>`).join('')}</section>`;
}
function backupHtml(){return `<div class="backup-tools transfer-tools"><section><h3>本機</h3><div class="actions"><button id="export-progress">匯出 JSON</button><button id="import-open">匯入 JSON</button><button id="export-recovery">匯出完整備份</button></div><input id="import-file" type="file" accept="application/json,.json" hidden></section><section><h3>雲端</h3><button id="open-cloud-sync">Google Drive 同步</button></section></div>`;}
function sourcesHtml(){return `<div class="source-tools"><p>攻略查證：${data.checkedAt} · ${data.steps.filter(s=>s.verificationStatus==='confirmed').length} 已確認／${data.steps.filter(s=>s.verificationStatus==='consensus').length} 攻略共識／${data.steps.filter(s=>s.verificationStatus==='unverified').length} 待查證</p><div class="sources">${sourceLinks(Object.keys(data.sources))}</div>${researchHtml()}<section class="research-register"><h3>謎題解法查證 · 2026-11-03</h3><p>${puzzles.length} 個解題項目；${puzzles.filter(p=>p.verificationStatus==='unverified').length} 項仍有缺漏。操作摘要依逐題來源整理，未在 PS5 實機逐題重現。</p>${puzzles.map(p=>`<article><h4>${escape(p.label+' · '+p.title)}</h4>${p.pending?'<p>待查證：'+escape(p.pending)+'</p>':''}${p.researchNote?'<p>'+escape(p.researchNote)+'</p>':''}<div class="sources">${p.sources.map(s=>'<a href="'+escape(s.url)+'" target="_blank" rel="noopener noreferrer">'+escape(s.title)+(s.revision?' · rev '+escape(s.revision):'')+' ↗</a>').join('')}</div></article>`).join('')}</section></div>`;}
function render(){
 const focus=document.activeElement,focusId=focus?.getAttribute('data-complete')||focus?.getAttribute('data-status-action')||focus?.getAttribute('data-trophy'),puzzleFocus=focus?.getAttribute('data-puzzle-complete'),solutionFocus=focus?.id==='show-solutions';
 $('app').innerHTML=shell()+(view==='trophies'?trophiesHtml():view==='backup'?sourcesHtml():view==='branches'?`<h2>三市長分歧</h2><p>三條路線各自追蹤；清單進度與 PS5 存檔分開。</p><div class="branch-grid">${data.branches.map(branchHtml).join('')}</div>`:roadmapHtml());
 document.querySelectorAll('[data-view]').forEach(el=>view===el.dataset.view?el.setAttribute('aria-current','page'):el.removeAttribute('aria-current'));
 if(focusId){const attr=focus.hasAttribute('data-complete')?'data-complete':focus.hasAttribute('data-status-action')?'data-status-action':'data-trophy';const value=focus.getAttribute("data-status-value"),selector=`[${attr}="${focusId}"]`+(value?`[data-status-value="${value}"]`:"");const context=focus.getAttribute("data-trophy-context");document.querySelector(selector+(context?'[data-trophy-context="'+context+'"]':''))?.focus({preventScroll:true});}
 if(puzzleFocus)document.querySelector('[data-puzzle-complete="'+puzzleFocus+'"]')?.focus({preventScroll:true});
 if(solutionFocus)$('show-solutions')?.focus({preventScroll:true});
 $('open-sync').onclick=()=>sync.open();$('open-backup').onclick=()=>{
  $('backup-tools-content').innerHTML=backupHtml();bindBackupTools();$('backup-tools-dialog').showModal();
 };
 if(view==='roadmap'){
  $('show-solutions').onchange=event=>{const checked=event.target.checked;void action(()=>store.update(p=>{p.settings.showSolutions=checked;return p;}));};
  $('chapter-select').onchange=e=>action(()=>requestStage(e.target.value));
  $('search').oninput=e=>{const pos=e.target.selectionStart;query=e.target.value;render();$('search').focus();try{$('search').setSelectionRange(pos,pos);}catch{}};
  $('filter').onchange=e=>{filter=e.target.value;render();$('filter').focus();};
  $('continue').onclick=()=>{const stageIndex=data.stages.findIndex(s=>s.id===currentOverview().stage),next=data.steps.find(s=>data.stages.findIndex(t=>t.id===s.stageId)>=stageIndex&&needsAttention(s)&&!['skipped','missed'].includes(statusOf(progress,s.id)));if(next){const puzzle=puzzlesForStep(next.id).find(p=>!puzzleDone(p));if(puzzle)goPuzzle(puzzle.id);else goStep(next.id);}else message('本章與後續步驟已記錄，可從章節選單回看。');};
  document.querySelector('.branch-overview')?.addEventListener('toggle',event=>{branchExpanded=event.target.open;});
 }
 document.querySelectorAll('[data-stage-detail]').forEach(el=>el.addEventListener('toggle',()=>el.open?expanded.add(el.dataset.stageDetail):expanded.delete(el.dataset.stageDetail)));
 document.querySelectorAll('[data-branch-detail]').forEach(el=>el.addEventListener('toggle',()=>el.open?openBranches.add(el.dataset.branchDetail):openBranches.delete(el.dataset.branchDetail)));
}
function bindBackupTools(){
 $('export-progress').onclick=()=>action(exportProgress);
 $('export-recovery').onclick=()=>action(async()=>download(await store.exportAll(),'recovery-archive'));
 $('import-open').onclick=()=>$('import-file').click();
 $('import-file').onchange=event=>{const file=event.target.files[0];if(!file)return;$('backup-tools-dialog').close();void action(()=>previewImport(file));};
 $('open-cloud-sync').onclick=()=>{$('backup-tools-dialog').close();sync.open();};
}
$('backup-tools-dialog').addEventListener('close',()=>$('backup-tools-content').replaceChildren());
function download(value,name){const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=data.gameId+'-'+name+'-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
async function exportProgress(){download(await store.get(),'progress');await store.update(p=>{p.settings.jsonDownloadRequestedAt=new Date().toISOString();return p;});message('已開始下載。');}
async function saveStep(id,status){await store.update(p=>{p.steps[id]={...p.steps[id],status};return p;});}
async function requestStage(id){if(!data.stages.some(s=>s.id===id))return;await store.update(p=>{p.settings.currentStage=id;return p;});activeStage=id;expanded.clear();expanded.add(id);query='';filter='all';history.replaceState(null,'','?view=roadmap&stage='+id);await refresh();document.querySelector('.chapter-picker')?.scrollIntoView({block:'start'});}
function goStep(id){const step=data.steps.find(s=>s.id===id);if(!step)return;activeStage=step.stageId;view='roadmap';filter='all';query='';expanded.add(step.stageId);history.replaceState(null,'','?view=roadmap#step-'+id);render();$('step-'+id)?.scrollIntoView({block:'start'});$('step-'+id)?.querySelector('input')?.focus({preventScroll:true});}
function goPuzzle(id){const puzzle=puzzles.find(p=>p.id===id);if(!puzzle)return;goStep(puzzle.stepId);history.replaceState(null,'','?view=roadmap#'+puzzleProgressId(id));$(puzzleProgressId(id))?.scrollIntoView({block:'start'});document.querySelector('[data-puzzle-complete="'+id+'"]')?.focus({preventScroll:true});}
function followHash(){if(location.hash.startsWith('#puzzle-')){goPuzzle(location.hash.slice(8));return true;}if(location.hash.startsWith('#step-')){goStep(location.hash.slice(6));return true;}return false;}
document.addEventListener('click',event=>{
 const el=event.target.closest('button,a');if(!el)return;
 if(el.dataset.view){event.preventDefault();view=el.dataset.view;history.pushState(null,'','?view='+view);render();}
 if(el.dataset.filter){filter=el.dataset.filter;render();}
 if(el.dataset.statusAction)void action(()=>store.update(p=>{const id=el.dataset.statusAction,status=el.dataset.statusValue;p.steps[id]={...p.steps[id],status:statusOf(p,id)===status?'not_started':status};return p;}));
 if(el.dataset.stage)void action(()=>requestStage(el.dataset.stage));
 if(el.dataset.stepLink){event.preventDefault();goStep(el.dataset.stepLink);}
 if(el.dataset.backup){backupTarget=el.dataset.backup;$('backup-node').textContent=data.steps.find(s=>s.id===backupTarget).title;$('backup-note').value=progress.backups[backupTarget]?.note||'';$('backup-ack').checked=false;$('backup-confirm').disabled=true;$('backup-dialog').showModal();}
 if(el.dataset.close)$(el.dataset.close).close();
});
document.addEventListener('change',event=>{const el=event.target;
 if(el.dataset.puzzleComplete)void action(()=>saveStep(puzzleProgressId(el.dataset.puzzleComplete),el.checked?'completed':'not_started'));
 if(el.dataset.complete)void action(()=>saveStep(el.dataset.complete,el.checked?'completed':'not_started'));
 if(el.dataset.status)void action(()=>saveStep(el.dataset.status,el.value));
 if(el.dataset.trophy)void action(()=>store.update(p=>{p.trophies[el.dataset.trophy]={...p.trophies[el.dataset.trophy],earned:el.checked};return p;}));
 if(el.dataset.branch)void action(()=>store.update(p=>{p.branches[el.dataset.branch]={...p.branches[el.dataset.branch],status:el.value};return p;}));
});
window.addEventListener('popstate',()=>{const url=new URL(location.href);view=url.searchParams.get('view')||'roadmap';const stage=url.searchParams.get('stage');if(data.stages.some(s=>s.id===stage)){activeStage=stage;expanded.clear();expanded.add(stage);}if(!followHash())render();});
window.addEventListener('hashchange',()=>{if(progress)followHash();});
window.addEventListener('focus',()=>{void refresh();});
$('backup-ack').onchange=()=>{$('backup-confirm').disabled=!$('backup-ack').checked;};
$('backup-confirm').onclick=()=>action(async()=>{if(!$('backup-ack').checked)return;await store.update(p=>{p.backups[backupTarget]={...p.backups[backupTarget],confirmedAt:new Date().toISOString(),note:$('backup-note').value,method:'user-confirmed-ps5'};return p;});$('backup-dialog').close();message('已保存你的手動確認；網站沒有驗證 PS5 雲端存檔。');});
async function previewImport(file){
 if(!file)return;const sourceRaw=await file.text(),source=store.validate(JSON.parse(sourceRaw)).data,localRaw=JSON.stringify(await store.raw()),local=store.validate(JSON.parse(localRaw)).data;
 const bundle={gameId:data.gameId,at:new Date().toISOString(),sourceRaw,localRaw};await store.archive(bundle);
 const plan=core.merge(null,local,source,{hasBase:false});importReview={plan,bundle,stamp:localRaw,choices:plan.conflicts.map(()=>''),downloaded:false};
 $('import-status').textContent=plan.conflicts.length+' 筆差異；來源及匯入前原文已存入本遊戲復原區。';$('import-ack').checked=false;$('import-ack').disabled=true;
 renderImport();$('import-dialog').showModal();
}
function renderImport(){
 $('import-rows').replaceChildren();
 const additions=Object.keys(importReview.plan.remote).filter(key=>!Object.hasOwn(importReview.plan.local,key));
 const newRows=Object.entries(importReview.plan.remote.steps||{}).filter(([id])=>!Object.hasOwn(importReview.plan.local.steps,id)).map(([id])=>'steps / '+id);
 const note=document.createElement('p');note.textContent='自動保留的來源新增欄位／步驟：'+([...additions,...newRows].join('、')||'無')+'。原文包含其完整值。';$('import-rows').append(note);
 importReview.plan.conflicts.forEach((c,i)=>{
 const row=document.createElement('div');row.className='diff';const title=document.createElement('strong');title.textContent=c.path.join(' / ');row.append(title);
 const values=document.createElement('div');values.className='diff-values';for(const key of ['local','remote']){const pre=document.createElement('pre');pre.textContent=(key==='local'?'本機':'來源')+'\n'+JSON.stringify(c[key],null,2);values.append(pre);}row.append(values);
 const select=document.createElement('select');select.setAttribute('aria-label','匯入差異 '+(i+1));for(const [key,label]of [['','請選擇'],['local','本機'],['remote','來源']])select.add(new Option(label,key));select.value=importReview.choices[i];select.onchange=()=>{importReview.choices[i]=select.value;importReady();};row.append(select);$('import-rows').append(row);
 });importReady();
}
function importReady(){$('import-apply').disabled=!importReview||importReview.invalid||!importReview.downloaded||!$('import-ack').checked||importReview.choices.some(v=>!v);}
for(const [id,choice]of [['import-local','local'],['import-source','remote']])$(id).onclick=()=>{importReview.choices.fill(choice);renderImport();};
$('import-download').onclick=async()=>{try{if(!importReview||await store.stamp()!==importReview.stamp)throw Error('預覽已過期，請重新比較。');download({recoveryBundle:importReview.bundle},'before-import');importReview.downloaded=true;$('import-ack').disabled=false;$('import-status').textContent='下載已發起，請實際開啟檔案確認保存；瀏覽器不能保證檔案已落盤。';}catch(e){importReview.downloaded=false;$('import-ack').disabled=true;$('import-status').textContent='備份失敗：'+e.message;}importReady();};
$('import-ack').onchange=importReady;
$('import-apply').onclick=async()=>{try{if($('import-apply').disabled)return;const next=store.validate(core.resolve(importReview.plan,importReview.choices)).data;await store.checkpoint('匯入前');await store.update(()=>next,importReview.stamp);$('import-dialog').close();message('匯入完成；未知資料與兩端原文保留。');}catch(e){importReview.invalid=true;$('import-status').textContent=e.message;importReady();}};
try{progress=await store.open();const stage=new URL(location.href).searchParams.get('stage');if(data.stages.some(s=>s.id===stage))await store.update(p=>{p.settings.currentStage=stage;return p;});expanded.clear();expanded.add(overview(data,progress).stage);sync=setupSync(data,store,core,()=>{void refresh();});render();followHash();}
catch(e){$('app').innerHTML='<h1>無法讀取本機進度</h1><p class="error">'+escape(e.message)+'</p><p>沒有重設資料。可先下載原始資料，再處理瀏覽器儲存設定。</p><button id="raw-recovery">下載原始儲存資料</button>';$('raw-recovery').onclick=()=>action(async()=>download(await store.exportAll(),'raw-recovery'));}
