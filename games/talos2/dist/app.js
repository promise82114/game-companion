import {roadmap as data} from './data.js';
import {statuses,warnings,verificationLabels,statusOf,done,blockers,overview,matches} from './roadmap/model.js';
import {createStore} from './roadmap/store.js';
import {setupSync} from './roadmap/sync.js';
import {dialogueHtml} from './roadmap/evidence.js';
const $=id=>document.getElementById(id),core=window.SideProjectSync;
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let progress,filter='all',view=new URL(location.href).searchParams.get('view')||'roadmap',importReview,stageTarget,stageStamp,backupTarget,sync,rendering=false,refreshQueued=false;
const expanded=new Set(['P0']),openSteps=new Set(),openBranches=new Set(),draftNotes=new Map();
const store=createStore(data,core,()=>{void refresh();});
let messageTimer;
function message(text){$('feedback').textContent=text;clearTimeout(messageTimer);messageTimer=setTimeout(()=>$('feedback').textContent='',9000);}
async function action(fn){try{await fn();}catch(e){message(e.message);}}
const sourceLinks=keys=>keys.map(k=>`<a href="${escape(data.sources[k].url)}" target="_blank" rel="noopener noreferrer">${escape(data.sources[k].title)} ↗</a>`).join('');
const evidence=step=>dialogueHtml(step,{escape,sourceLinks,labels:verificationLabels});
const rowLink=s=>s?`<a href="#step-${s.id}" data-step-link="${s.id}">${escape(s.title)}</a>`:'目前沒有待處理項目';
function selectOptions(map,value){return Object.entries(map).map(([id,label])=>`<option value="${id}" ${value===id?'selected':''}>${label}</option>`).join('');}
async function refresh(){
 if(!progress)return;
 if(rendering){refreshQueued=true;return;}rendering=true;
 try{progress=await store.get();render();}catch(e){message(e.message);}finally{rendering=false;if(refreshQueued){refreshQueued=false;void refresh();}}
}
function shell(){
 const o=overview(data,progress);
 return `<div class="title-row"><div><h1>${escape(data.title)}</h1><p class="subtitle">${escape(data.subtitle)} · 完整劇透</p></div><div class="actions"><button id="open-sync">Google Drive</button><button id="quick-export">下載清單備份</button></div></div>
 <nav class="nav" aria-label="遊戲詳情"><a href="?view=roadmap" data-view="roadmap" ${view==='roadmap'?'aria-current="page"':''}>Roadmap</a><a href="?view=trophies" data-view="trophies" ${view==='trophies'?'aria-current="page"':''}>本體獎盃</a><a href="?view=backup" data-view="backup" ${view==='backup'?'aria-current="page"':''}>備份與查證</a></nav>
 <section class="summary-grid" aria-label="目前進度"><div class="progress-panel"><p>本體白金 · 手動確認</p><div class="progress-number" id="trophy-count">${o.earned} <small>/ ${o.total}</small></div><progress max="${o.total}" value="${o.earned}" aria-label="本體獎盃進度"></progress><small>${Math.floor(o.earned/o.total*100)}% · DLC ${data.dlcCount} 個不計入<br>步驟 ${o.completed} / ${data.steps.length}，與獎盃分開</small></div><div class="focus-panel"><p>目前 ${escape(o.stage)} · 下一步</p><h2>${rowLink(o.next)}</h2><div class="focus-links"><div class="risk"><p>下一個不可逆／分歧</p>${rowLink(o.risk)}</div><div class="backup"><p>下一個建議備份點</p>${rowLink(o.backup)}</div></div></div></section>`;
}
function stepHtml(step){
 const state=statusOf(progress,step.id),backup=progress.backups[step.id],trophies=step.trophyRefs.map(id=>data.trophies.find(t=>t.id===id));
 return `<article id="step-${step.id}" class="step ${state}" data-step="${step.id}"><div class="step-top"><input type="checkbox" data-complete="${step.id}" aria-label="完成 ${escape(step.title)}" ${state==='completed'?'checked':''}><div><p class="step-title">${escape(step.title)}</p><div class="metadata"><span class="${step.warningLevel}">${warnings[step.warningLevel]}</span><span>${verificationLabels[step.verificationStatus]}</span><span>${escape(step.location)}</span></div></div><select data-status="${step.id}" aria-label="${escape(step.title)} 狀態">${selectOptions(statuses,state)}</select></div><details data-detail="${step.id}" ${openSteps.has(step.id)?'open':''}><summary>操作、前置與來源${step.backupRecommended?' · 備份':''}</summary>${step.verificationStatus==='unverified'?'<p class="research-note">此步驟有待查證細節或來源衝突。請核對下方限制，勿視為已驗證選項鏈。</p>':''}<ol class="instructions">${step.actions.map(s=>`<li>${escape(s)}</li>`).join('')}</ol>${evidence(step)}<dl class="detail-info"><dt>觸發</dt><dd>${escape(step.trigger)}</dd><dt>前置</dt><dd>${step.prerequisites.length?step.prerequisites.map(id=>`<a href="#step-${id}" data-step-link="${id}">${done(progress,id)?'✓':'○'} ${escape(data.steps.find(s=>s.id===id)?.title||id)}</a>`).join('<br>'):'無特定步驟依賴'}</dd><dt>完成確認</dt><dd>${escape(step.verification)}</dd><dt>錯過／復原</dt><dd>${escape(step.recovery)}</dd><dt>獎盃對照</dt><dd>${trophies.length?trophies.map(t=>`${progress.trophies[t.id]?.earned?'✓':'○'} ${escape(t.officialName)}`).join(' · '):'此步驟沒有獎盃對照'}${trophies.length?'<br><small>以名稱對照；官方數字 ID 待核實。取得獎盃不會自動勾選此步驟。</small>':''}</dd></dl>${step.backupRecommended?`<p class="research-note">${backup?.confirmedAt?'手動確認時間：'+escape(new Date(backup.confirmedAt).toLocaleString('zh-TW'))+'<br>'+escape(backup.note):'建議備份，尚未手動確認。勾選步驟完成不等於已備份。'}<br><button data-backup="${step.id}">${backup?.confirmedAt?'更新 PS5 備份確認':'手動確認此節點已備份'}</button></p>`:''}<label>本步驟筆記<textarea data-note="${step.id}" maxlength="5000">${escape(draftNotes.get(step.id)??progress.steps[step.id]?.note??'')}</textarea></label><div class="sources">${sourceLinks(step.sources)}</div></details></article>`;
}
function branchHtml(branch){
 const state=progress.branches[branch.id]?.status||'not_started',count=branch.prerequisites.filter(id=>done(progress,id)).length;
 return `<article class="branch-lane"><h3>${escape(branch.name)}</h3><p>${escape(branch.trophy)}</p><p>已手動確認前置 ${count} / ${branch.prerequisites.length} · <strong>成功條件待驗證</strong></p><label>${escape(branch.name)} 路線紀錄<select data-branch="${branch.id}">${selectOptions(statuses,state)}</select></label><details data-branch-detail="${branch.id}" ${openBranches.has(branch.id)?'open':''}><summary>前置檢查、還原路線與實錄</summary><p>${escape(branch.summary)}</p><p>${escape(branch.evidenceNote||"")}</p><ul>${branch.prerequisites.map(id=>`<li>${done(progress,id)?'✓':'○'} <a href="#step-${id}" data-step-link="${id}">${escape(data.steps.find(s=>s.id===id).title)}</a></li>`).join('')}</ul><p>${escape(branch.restore)}</p><a href="#step-${branch.stepId}" data-step-link="${branch.stepId}">開啟此分歧步驟</a><p><a href="${data.sources.mayors.url}&t=${branch.sourceTime.split(':').reduce((a,v)=>a*60+Number(v),0)}s" target="_blank" rel="noopener noreferrer">市長實錄 ${branch.sourceTime} ↗</a></p></details></article>`; // taste-skill-ignore: 使用者明確要求風險符號與完成檢查記號。
}
function roadmapHtml(){
 return `<section aria-labelledby="branches-title"><div class="section-heading"><h2 id="branches-title">三市長分歧</h2><small>各自追蹤 · 不保證單一 W2 備份可全拿</small></div><div class="branch-grid">${data.branches.map(branchHtml).join('')}</div></section><div class="layout"><aside class="stage-nav" aria-label="目前階段">${data.stages.map(s=>`<button data-stage="${s.id}" ${overview(data,progress).stage===s.id?'aria-current="step"':''}>${s.id} ${escape(s.title.split(' · ')[0])}<small>${escape(s.description)}</small></button>`).join('')}</aside><section><div class="section-heading"><h2>階段與步驟</h2><small>${data.version}</small></div><div class="filters" aria-label="步驟篩選">${Object.entries({all:'全部',pending:'未完成',missable:'易錯過',backup:'備份',recommended:'推薦',completed:'已完成'}).map(([id,label])=>`<button data-filter="${id}" aria-pressed="${filter===id}">${label}</button>`).join('')}</div><p class="muted">🔴 離開前處理　🟠 選擇影響分歧　🟡 先準備　🔵 推薦　⚪ 稍後</p>${data.stages.map(s=>{const all=data.steps.filter(step=>step.stageId===s.id),items=all.filter(step=>matches(step,progress,filter));return `<details class="stage" id="stage-${s.id}" data-stage-detail="${s.id}" ${expanded.has(s.id)?'open':''}><summary>${s.id} · ${escape(s.title)}<small>${escape(s.description)} · ${all.filter(step=>done(progress,step.id)).length}/${all.length} 完成</small></summary>${items.length?items.map(stepHtml).join(''):'<p class="empty">此階段沒有符合篩選的步驟。</p>'}</details>`;}).join('')}</section></div>`; // taste-skill-ignore: 使用者明確要求風險符號與完成檢查記號。
}
function trophiesHtml(){return `<h2>本體獎盃 · ${data.baseCount} 個</h2><p>${escape(data.classification)}</p><p class="research-note">${escape(data.officialIdNote)}<br>這是手動清單，不連接 PSN。Roadmap、PS5 備份與獎盃狀態互不自動代填。</p><div class="trophy-list">${data.trophies.filter(t=>t.category==='base').map(t=>`<label class="trophy-row"><input type="checkbox" data-trophy="${t.id}" ${progress.trophies[t.id]?.earned?'checked':''}>${escape(t.officialName)}</label>`).join('')}</div>`;}
function backupHtml(){return `<div class="backup-tools"><h2>備份與查證</h2><section><h3>清單資料保護</h3><p>IndexedDB 保存此遊戲的獨立進度；未知欄位／ID 隨 JSON 保留。瀏覽器資料可被清除，請下載備份。匯入需比較差異、下載復原包並確認。</p><p>清單備份提醒：${progress.settings.jsonDownloadRequestedAt?"最後發起下載 "+escape(new Date(progress.settings.jsonDownloadRequestedAt).toLocaleString("zh-TW"))+"，請確認檔案已保存。":"尚未發起清單 JSON 下載，建議現在保存一份。"}</p><div class="actions"><button id="export-progress">下載清單 JSON</button><button id="export-recovery">匯出全部復原原文／快照</button></div><label>選擇此遊戲的清單 JSON<input id="import-file" type="file" accept="application/json,.json"></label></section><section><h3>PS5 遊戲存檔</h3><p>此站無法備份 PS5 遊戲存檔。PS Plus 自動同步與上傳／下載都可能替換原副本；每條分支前先在主機核對方向與時間。不要套用 Xbox 刪檔手法，也不要以 Google Drive 同步成功推斷 PS5 已備份。</p>${sourceLinks(['ps5'])}</section><section><h3>攻略查證 · ${data.checkedAt}</h3><p>${data.steps.filter(s=>s.verificationStatus==='confirmed').length} 已確認／${data.steps.filter(s=>s.verificationStatus==='consensus').length} 攻略共識／${data.steps.filter(s=>s.verificationStatus==='unverified').length} 待查證步驟。共識是來源敘述，不代表本機遊戲實測。</p><p>三市長已逐項列出可核對英文、中文方向與來源；仍有英文選項／適用性、Rand 精確觸發旗標、PS5 還原後三結果與官方逐盃數字 ID 待查證。Museum／Schuyler 時機、特殊解法重試存在來源衝突，已就地標示。</p><div class="sources">${sourceLinks(Object.keys(data.sources))}</div></section></div>`;}
function render(){
 const focus=document.activeElement,focusId=focus?.getAttribute('data-complete')||focus?.getAttribute('data-status')||focus?.getAttribute('data-trophy');
 $('app').innerHTML=shell()+(view==='trophies'?trophiesHtml():view==='backup'?backupHtml():roadmapHtml())+`<p class="footer">${data.checkedAt} 查證 · 進度與內容分離 · 本機保存後請定期下載 JSON</p>`;
 if(focusId){const attr=focus.hasAttribute('data-complete')?'data-complete':focus.hasAttribute('data-status')?'data-status':'data-trophy';document.querySelector(`[${attr}="${focusId}"]`)?.focus({preventScroll:true});}
 $('open-sync').onclick=()=>sync.open();$('quick-export').onclick=()=>action(exportProgress);
 if(view==='backup'){$('export-progress').onclick=()=>action(exportProgress);$('export-recovery').onclick=()=>action(async()=>download(await store.exportAll(),'recovery-archive'));$('import-file').onchange=event=>action(()=>previewImport(event.target.files[0]));}
 document.querySelectorAll('[data-stage-detail]').forEach(el=>el.addEventListener('toggle',()=>el.open?expanded.add(el.dataset.stageDetail):expanded.delete(el.dataset.stageDetail)));
 document.querySelectorAll('[data-detail]').forEach(el=>el.addEventListener('toggle',()=>el.open?openSteps.add(el.dataset.detail):openSteps.delete(el.dataset.detail)));
 document.querySelectorAll('[data-branch-detail]').forEach(el=>el.addEventListener('toggle',()=>el.open?openBranches.add(el.dataset.branchDetail):openBranches.delete(el.dataset.branchDetail)));
}
function download(value,name){const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=data.gameId+'-'+name+'-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
async function exportProgress(){download(await store.get(),'progress');await store.update(p=>{p.settings.jsonDownloadRequestedAt=new Date().toISOString();return p;});message('已發起清單下載，請自行確認檔案已保存。這不包含 PS5 遊戲存檔。');}
async function saveStep(id,status){await store.update(p=>{p.steps[id]={...p.steps[id],status};return p;});}
async function setStage(id,acknowledged=[],expected){await store.update(p=>{p.settings.currentStage=id;p.settings.stageAcknowledgements={...p.settings.stageAcknowledgements,[id]:{at:new Date().toISOString(),steps:acknowledged}};return p;},expected);expanded.add(id);await refresh();$('stage-'+id)?.scrollIntoView({block:'start'});}
async function requestStage(id){const current=await store.get(),risks=blockers(data,current,id);stageStamp=JSON.stringify(current);if(risks.length){stageTarget=id;$('stage-warning').innerHTML='<p>下列早期不可逆／分歧事項尚未確認完成：</p><ul>'+risks.map(s=>`<li>${warnings[s.warningLevel]} ${escape(s.title)} · ${statuses[statusOf(current,s.id)]}</li>`).join('')+'</ul>';$('stage-ack').checked=false;$('stage-confirm').disabled=true;if(!$('stage-dialog').open)$('stage-dialog').showModal();}else await setStage(id,[],stageStamp);}
function goStep(id){const step=data.steps.find(s=>s.id===id);if(!step)return;view='roadmap';filter='all';expanded.add(step.stageId);openSteps.add(id);history.replaceState(null,'','?view=roadmap#step-'+id);render();$('step-'+id)?.scrollIntoView({block:'start'});}
document.addEventListener('click',event=>{
 const el=event.target.closest('button,a');if(!el)return;
 if(el.dataset.view){event.preventDefault();view=el.dataset.view;history.pushState(null,'','?view='+view);render();}
 if(el.dataset.filter){filter=el.dataset.filter;render();}
 if(el.dataset.stage)void action(()=>requestStage(el.dataset.stage));
 if(el.dataset.stepLink){event.preventDefault();goStep(el.dataset.stepLink);}
 if(el.dataset.backup){backupTarget=el.dataset.backup;$('backup-node').textContent=data.steps.find(s=>s.id===backupTarget).title;$('backup-note').value=progress.backups[backupTarget]?.note||'';$('backup-ack').checked=false;$('backup-confirm').disabled=true;$('backup-dialog').showModal();}
 if(el.dataset.close)$(el.dataset.close).close();
});
document.addEventListener('input',event=>{if(event.target.dataset.note)draftNotes.set(event.target.dataset.note,event.target.value);});
document.addEventListener('change',event=>{const el=event.target;
 if(el.dataset.complete)void action(()=>saveStep(el.dataset.complete,el.checked?'completed':'not_started'));
 if(el.dataset.status)void action(()=>saveStep(el.dataset.status,el.value));
 if(el.dataset.trophy)void action(()=>store.update(p=>{p.trophies[el.dataset.trophy]={...p.trophies[el.dataset.trophy],earned:el.checked};return p;}));
 if(el.dataset.branch)void action(()=>store.update(p=>{p.branches[el.dataset.branch]={...p.branches[el.dataset.branch],status:el.value};return p;}));
 if(el.dataset.note){const id=el.dataset.note,note=el.value;void action(async()=>{await store.update(p=>{p.steps[id]={status:'not_started',...p.steps[id],note};return p;});if(draftNotes.get(id)===note)draftNotes.delete(id);});}
});
window.addEventListener('popstate',()=>{view=new URL(location.href).searchParams.get('view')||'roadmap';render();});
window.addEventListener('hashchange',()=>{if(progress&&location.hash.startsWith('#step-'))goStep(location.hash.slice(6));});
window.addEventListener('focus',()=>{void refresh();});
$('stage-ack').onchange=()=>{$('stage-confirm').disabled=!$('stage-ack').checked;};$('stage-cancel').onclick=()=>$('stage-dialog').close();
$('stage-confirm').onclick=()=>action(async()=>{if(!$('stage-ack').checked)return;const current=await store.get();if(JSON.stringify(current)!==stageStamp){await requestStage(stageTarget);message('階段預覽已過期，請重新閱讀風險。');return;}const risks=blockers(data,current,stageTarget);await setStage(stageTarget,risks.map(s=>s.id),stageStamp);$('stage-dialog').close();});
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
try{progress=await store.open();expanded.add(overview(data,progress).stage);sync=setupSync(data,store,core,()=>{void refresh();});render();if(location.hash.startsWith('#step-'))goStep(location.hash.slice(6));}
catch(e){$('app').innerHTML='<h1>無法讀取本機進度</h1><p class="error">'+escape(e.message)+'</p><p>沒有重設資料。可先下載原始資料，再處理瀏覽器儲存設定。</p><button id="raw-recovery">下載原始儲存資料</button>';$('raw-recovery').onclick=()=>action(async()=>download(await store.exportAll(),'raw-recovery'));}
