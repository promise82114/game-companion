import {roadmap as data} from './data.js';
import {trophyLabel} from './trophy-names.js';
import {warnings,verificationLabels,done,overview,matches} from './roadmap/model.js';
import {createStore} from './roadmap/store.js';
import {setupSync} from './roadmap/sync.js';
import {dialogueHtml} from './roadmap/evidence.js';
import {puzzles,puzzleProgressId,puzzlesForStep,puzzleListHtml} from './roadmap/solutions.js';
import {collectionRegions,collectionItems,itemsForRegion,collectionProgressId,collectionDone,collectionTotals,counterKey,regionCollectionsHtml,collectionMiniHtml,collectionOverviewHtml,collectionResearchHtml} from './roadmap/collections.js';
import {roadmapSections,sectionsForStage,sectionForStep,resolveSection,sectionUrl,chapterNavigation} from './roadmap/navigation.js';
import {revealedItems,revealButton,isCompact} from './roadmap/completion.js';
import {regionMaps,regionMapHtml,mapNodeTitle,mapSource} from './roadmap/maps.js';
import {trophyDetailHtml,trophyGuides,trophyConditionSource} from './roadmap/trophies.js';
const $=id=>document.getElementById(id),core=window.SideProjectSync;
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let progress,activeStage,activeSection=new URL(location.href).searchParams.get('section'),filter='all',query='',view=new URL(location.href).searchParams.get('view')||'roadmap',importReview,backupTarget,sync,rendering=false,refreshQueued=false,trophyQuery='',trophyFilter='all',mapSelection='',mapContextRegion='',mapObserver;
const currentOverview=()=>overview(data,{...progress,settings:{...progress.settings,currentStage:activeStage||progress.settings.currentStage}});
const currentSection=()=>resolveSection(currentOverview().stage,activeSection),openBranches=new Set();
const mapRegion=()=>currentSection().region||mapContextRegion;
let readingTail=0;
function resetReadingTail(){readingTail=0;$('app').style.removeProperty('--reading-tail');}
const store=createStore(data,core,()=>{void refresh();});
let messageTimer;
function message(text){$('feedback').textContent=text;clearTimeout(messageTimer);messageTimer=setTimeout(()=>$('feedback').textContent='',9000);}
async function action(fn){try{await fn();}catch(e){message(e.message);}}
const sourceLinks=keys=>keys.map(k=>`<a href="${escape(data.sources[k].url)}" target="_blank" rel="noopener noreferrer">${escape(data.sources[k].title)} ↗</a>`).join('');
const evidence=step=>dialogueHtml(step,{escape,sourceLinks,labels:verificationLabels,showSources:false});
const puzzleDone=p=>progress.steps[puzzleProgressId(p.id)]?.status==='completed';
const collectionsForStep=id=>id.startsWith('region-')?itemsForRegion(id.slice(7).toUpperCase()):[];
const needsAttention=step=>!done(progress,step.id)||puzzlesForStep(step.id).some(p=>!puzzleDone(p))||collectionsForStep(step.id).some(item=>!collectionDone(progress,item.id))||(step.id==='collectibles'&&(()=>{const c=collectionTotals(progress);return c.done<c.total||c.text<30||c.artifact<10;})());
const rowLink=s=>s?`<a href="#step-${s.id}" data-step-link="${s.id}">${escape(s.title)}</a>`:'目前沒有待處理項目';
function selectOptions(map,value){return Object.entries(map).map(([id,label])=>`<option value="${id}" ${value===id?'selected':''}>${label}</option>`).join('');}
async function refresh(){
 if(!progress)return;
 if(rendering){refreshQueued=true;return;}rendering=true;
 try{progress=await store.get();render();}catch(e){message(e.message);}finally{rendering=false;if(refreshQueued){refreshQueued=false;void refresh();}}
}
function shell(){
 const o=currentOverview();
 return `<div class="title-row"><div><p class="subtitle">${escape(data.title)} · PS5 本體</p><h1>${{roadmap:'遊玩 Roadmap',branches:'分歧追蹤',trophies:'獎盃清單',collectibles:'收集清單',backup:'來源與查證'}[view]||'遊玩 Roadmap'}</h1></div><span class="save-status">進度儲存在此裝置</span></div>
 <section class="summary-grid" aria-label="目前進度"><div><span>攻略步驟完成</span><strong>${o.completed} <small>/ ${data.steps.length}</small></strong></div><div><span>獎盃實際取得</span><strong id="trophy-count">${o.earned} <small>/ ${o.total}</small></strong></div><div><span>目前瀏覽章節</span><strong class="current">${escape(data.stages.find(s=>s.id===o.stage).title)}</strong></div></section>`;
}
function stepStatusHtml(state){
 return `<div class="step-status"><span class="step-state">${state==='completed'?'完成':'未開始'}</span></div>`;
}
function trophyCheckbox(trophy,context,card=false){
 return `<label class="${card?'trophy-card':'trophy-row'}"><input type="checkbox" data-trophy="${trophy.id}" data-trophy-context="${context}" ${progress.trophies[trophy.id]?.earned?'checked':''}><span class="trophy-name">${escape(trophyLabel(trophy))}</span></label>`;
}
function stepHtml(step){
 const state=done(progress,step.id)?'completed':'not_started',complete=state==='completed',id='step-'+step.id,backup=progress.backups[step.id],trophies=step.trophyRefs.map(id=>data.trophies.find(t=>t.id===id)),children=[...puzzlesForStep(step.id).map(p=>puzzleProgressId(p.id)),...collectionsForStep(step.id).map(c=>collectionProgressId(c.id))],pending=children.filter(id=>progress.steps[id]?.status!=='completed').length;
 return `<article id="step-${step.id}" class="step ${state}" data-step="${step.id}">
 <div class="step-top"><input id="complete-${step.id}" type="checkbox" data-complete="${step.id}" aria-label="完成 ${escape(step.title)}" ${complete?'checked':''}><div><label class="step-title" for="complete-${step.id}">${escape(step.title)}</label><div class="metadata"><span class="${step.warningLevel}">${warnings[step.warningLevel]}</span>${step.verificationStatus==='unverified'?'<span>待查證</span>':''}<span>${escape(step.location)}</span></div>${stepStatusHtml(state)}${complete&&pending?'<span class="child-pending">子項目尚有 '+pending+' 項未勾選</span>':''}</div>${revealButton(id,complete,escape)}</div>
 ${complete&&['irreversible','branch'].includes(step.warningLevel)?'<p class="persistent-warning">'+escape(step.id==='w2-backup'?'W2 實驗室進入前仍須確認 PS5 入口備份；網站勾選不能代替遊戲存檔。':step.warningLevel==='branch'?'分歧選擇與前期條件仍需核對；完成勾選不保證遊戲結果。':'此處有不可逆事件；返回重選前，先核對遊戲存檔與下方詳情。')+'</p>':''}
 <div class="step-body completion-body" id="body-${id}" ${isCompact(id,complete)?'hidden':''}>
 ${step.trigger&&step.trigger!=='抵達上述地點，離開前查看本步驟。'?'<p class="step-trigger">'+escape(step.trigger)+'</p>':''}
 ${step.prerequisites.length?'<p class="step-prerequisites">前置：'+step.prerequisites.map(id=>`<a href="#step-${id}" data-step-link="${id}">${escape(data.steps.find(s=>s.id===id)?.title||id)}</a>`).join('、')+'</p>':''}
 <ol class="instructions">${step.actions.map(s=>'<li>'+escape(s)+'</li>').join('')}</ol>${evidence(step)}
 ${trophies.length?'<div class="step-trophies" role="group" aria-label="'+escape(step.title)+' 獎盃">'+trophies.map(t=>trophyCheckbox(t,step.id,true)).join('')+'</div>':''}
 ${step.id.startsWith('region-')?regionCollectionsHtml(step.id.slice(7).toUpperCase(),{escape,progress}):''}${step.id==='collectibles'?collectionOverviewHtml({escape,progress}):''}
 ${puzzleListHtml(step.id,{escape,progress,showSolutions:progress.settings.showSolutions===true})}
 ${step.id==='field-basics'?'<label class="social-counter">已讀公共貼文<input type="number" min="0" step="1" data-collection-counter="text" data-counter-region="SOCIAL" value="'+(Number.isSafeInteger(progress.settings[counterKey('SOCIAL','text')])?progress.settings[counterKey('SOCIAL','text')]:0)+'"></label>':''}
 ${step.backupRecommended?`<div class="backup-check"><span>${backup?.confirmedAt?'已記錄備份：'+escape(new Date(backup.confirmedAt).toLocaleString('zh-TW'))+(backup.note?' · '+escape(backup.note):''):'此處先備份'}</span><button data-backup="${step.id}">${backup?.confirmedAt?'更新備份紀錄':'記錄 PS5 備份'}</button></div>`:''}
 </div></article>`;
}
function branchHtml(branch){
 const complete=progress.branches[branch.id]?.status==='completed',count=branch.prerequisites.filter(id=>done(progress,id)).length;
 return `<article class="branch-lane"><h3>${escape(branch.name)}</h3><p>${escape(trophyLabel(data.trophies.find(t=>t.officialName===branch.trophy))||branch.trophy)}</p><p>已手動確認前置 ${count} / ${branch.prerequisites.length} · <strong>成功條件待驗證</strong></p><label class="branch-complete"><input type="checkbox" data-branch="${branch.id}" aria-label="${escape(branch.name)} 路線完成" ${complete?'checked':''}><span>${complete?'完成':'未開始'}</span></label><details data-branch-detail="${branch.id}" ${openBranches.has(branch.id)?'open':''}><summary>前置檢查、還原路線與實錄</summary><p>${escape(branch.summary)}</p><p>${escape(branch.evidenceNote||"")}</p><ul>${branch.prerequisites.map(id=>`<li>${done(progress,id)?'✓':'○'} <a href="#step-${id}" data-step-link="${id}">${escape(data.steps.find(s=>s.id===id).title)}</a></li>`).join('')}</ul><p>${escape(branch.restore)}</p><a href="#step-${branch.stepId}" data-step-link="${branch.stepId}">開啟此分歧步驟</a><p><a href="${data.sources.mayors.url}&t=${branch.sourceTime.split(':').reduce((a,v)=>a*60+Number(v),0)}s" target="_blank" rel="noopener noreferrer">市長實錄 ${branch.sourceTime} ↗</a></p></details></article>`; // taste-skill-ignore: 使用者明確要求風險符號與完成檢查記號。
}
function roadmapHtml(){
 const o=currentOverview(),part=currentSection(),current=data.stages.find(s=>s.id===o.stage),local=part.steps.map(id=>data.steps.find(s=>s.id===id)),risk=local.find(s=>!done(progress,s.id)&&['irreversible','branch'].includes(s.warningLevel));
 const searchMatches=step=>JSON.stringify([step,puzzlesForStep(step.id).map(p=>[p.title,p.label]),collectionsForStep(step.id),step.trophyRefs.map(id=>data.trophies.find(t=>t.id===id))]).toLocaleLowerCase().includes(query.toLocaleLowerCase());
 const items=local.filter(step=>matches(step,progress,filter)||(filter==='pending'&&needsAttention(step)));
 const results=query?data.steps.filter(step=>searchMatches(step)&&(matches(step,progress,filter)||(filter==='pending'&&needsAttention(step)))):[];
 const content=query?`<section class="search-results" aria-label="所有章節搜尋結果"><h2>搜尋結果 · ${results.length}</h2>${results.map(step=>`<article><a href="#step-${step.id}" data-step-link="${step.id}">${escape(step.title)}</a><p>${step.stageId} · ${escape(sectionForStep(step.id).label)} · ${escape(step.location)}</p></article>`).join('')||'<p>沒有符合條件的步驟。</p>'}</section>`:`<section class="stage" id="stage-${o.stage}" data-stage-detail="${o.stage}"><header class="stage-heading"><div><p>${o.stage} · ${escape(current.title)}</p><h2>${escape(part.label)}</h2></div><span>${local.filter(step=>done(progress,step.id)).length} / ${local.length}</span></header>${part.region?'<p class="section-preflight">先閱讀沿途提醒與收集位置。私訊／劇情以遊戲提示出現時處理；尚未觸發可先解題，不必等到全部勾完才往下走。</p>':''}${o.stage==='P6'?'<p class="section-preflight">每條路線各自驗收；先核對前期選擇與 W2 入口備份，再照所選路線進行。三條是不同遊戲分歧，不能在同一段遊戲進度依次作答。</p>':''}${items.length?items.map(stepHtml).join(''):'<p class="empty">本片段沒有符合條件的步驟。</p>'}</section>`;
 const index=roadmapSections.indexOf(part),previous=roadmapSections[index-1],next=roadmapSections[index+1];
 return `<div class="solution-toggle"><label for="show-solutions"><input id="show-solutions" type="checkbox" ${progress.settings.showSolutions===true?'checked':''}>拒絕謎語 <span>顯示詳細解法與圖解</span></label><span id="puzzle-count">解題紀錄 ${puzzles.filter(p=>puzzleDone(p)).length} / ${puzzles.length}</span></div>
 <nav class="chapter-picker" aria-label="選擇攻略階段"><label>章節<select id="chapter-select">${data.stages.map(s=>`<option value="${s.id}" ${s.id===o.stage?'selected':''}>${s.id} · ${escape(s.title)}</option>`).join('')}</select></label><label>片段<select id="section-select">${sectionsForStage(o.stage).map(s=>`<option value="${s.id}" ${s.id===part.id?'selected':''}>${escape(s.label)}</option>`).join('')}</select></label><button id="resume-progress">回到遊玩進度</button></nav>
 ${progress.settings.showSolutions===true?'<p class="puzzle-glossary">同類設備依取得順序稱 A、B、C。橋樑拼塊以每段開始時左上形狀由左到右編號；「轉」表示旋轉到預覽與路面相合再放下。</p>':''}${collectionMiniHtml(progress)}
 ${risk?`<section class="checkpoint" aria-label="本章提醒"><div><strong>先留意 · ${escape(part.label)}</strong><p>${escape(risk.title)}</p></div><button data-step-link="${risk.id}">查看提醒</button></section>`:''}
 <div class="toolbar"><label>搜尋所有章節<input id="search" type="search" value="${escape(query)}" placeholder="地點、角色、獎盃名稱…"></label><label>本片段顯示<select id="filter">${selectOptions({all:'全部',pending:'未完成',missable:'容易錯過',backup:'備份節點',recommended:'推薦體驗',completed:'已完成',unverified:'待查證'},filter)}</select></label><button id="continue">繼續下一步</button></div>
 <div class="roadmap-layout${mapRegion()&&!query?' has-region-map':''}"><div class="roadmap-content"><div class="stage-list">${content}</div><nav class="section-pagination" aria-label="前後片段">${previous?`<a href="${sectionUrl(previous)}" data-section="${previous.id}">← ${previous.stage} · ${escape(previous.label)}</a>`:'<span></span>'}${next?`<a href="${sectionUrl(next)}" data-section="${next.id}">${next.stage} · ${escape(next.label)} →</a>`:''}</nav></div>${mapRegion()&&!query?`<aside class="region-map-aside">${regionMapHtml(mapRegion(),{escape,progress,selected:mapSelection})}</aside><button type="button" class="map-floating" data-open-map>${mapRegion()} 地圖</button>`:''}</div>`;
}
function trophiesHtml(){
 const list=data.trophies.filter(t=>{const earned=progress.trophies[t.id]?.earned;if(trophyFilter==='pending'&&earned||trophyFilter==='earned'&&!earned)return false;return !trophyQuery||JSON.stringify([t,trophyGuides[t.id]]).toLocaleLowerCase().includes(trophyQuery.toLocaleLowerCase());});
 return `<h2>本體獎盃 · ${data.baseCount} 個</h2><div class="trophy-toolbar"><label>搜尋名稱或取得條件<input id="trophy-search" type="search" value="${escape(trophyQuery)}" placeholder="例如：錄音、Seesaw、第一件…"></label><label>顯示<select id="trophy-filter">${selectOptions({all:'全部',pending:'尚未取得',earned:'已取得'},trophyFilter)}</select></label></div><p class="trophy-scope">說明取自繁中獎盃清單。下方計數反映攻略紀錄；實際跳盃後再勾選獎盃。${list.length} / 60 項</p><div class="trophy-list trophy-guide-list">${list.map(t=>trophyDetailHtml(t,{data,progress,escape,checkbox:trophyCheckbox})).join('')||'<p>沒有符合條件的獎盃。</p>'}</div>`;
}
function researchHtml(){
 const seen=new Set(),paragraph=text=>{if(!text||seen.has(text))return '';seen.add(text);return '<p>'+escape(text)+'</p>';};
 return `<section class="research-register"><h3>攻略查證紀錄</h3><p>${escape(data.officialIdNote)}</p><p>獎盃名稱來源：${sourceLinks(['psn','psnZhTW'])}</p>${data.steps.map(step=>`<article id="research-${step.id}"><h4>${escape(step.title)}</h4>${paragraph(step.verification)}${paragraph(step.recovery)}<div class="sources">${sourceLinks(step.sources)}</div>${step.dialogue?.length?'<ul>'+step.dialogue.map(row=>'<li>'+escape(row.speaker+' · '+row.context)+'：'+sourceLinks(row.sources)+'</li>').join('')+'</ul>':''}</article>`).join('')}</section>`;
}
function backupHtml(){return `<div class="backup-tools transfer-tools"><section><h3>本機</h3><div class="actions"><button id="export-progress">匯出 JSON</button><button id="import-open">匯入 JSON</button><button id="export-recovery">匯出完整備份</button></div><input id="import-file" type="file" accept="application/json,.json" hidden></section><section><h3>雲端</h3><button id="open-cloud-sync">Google Drive 同步</button></section></div>`;}
function sourcesHtml(){return `<div class="source-tools"><p>攻略查證：${data.checkedAt} · ${data.steps.filter(s=>s.verificationStatus==='confirmed').length} 已確認／${data.steps.filter(s=>s.verificationStatus==='consensus').length} 攻略共識／${data.steps.filter(s=>s.verificationStatus==='unverified').length} 待查證</p><div class="sources">${sourceLinks(Object.keys(data.sources))}</div>${researchHtml()}<section class="research-register"><h3>獎盃條件與區域示意圖 · 2026-11-04</h3><p>60 盃繁中說明依同一 Exophase 連結 ID 配對；攻略操作摘要與計數另外呈現。十二區原創 SVG 僅整理已查證地標與相對位置，未複製來源圖片，非等比例或實機 GPS。</p><div class="sources"><a href="${trophyConditionSource.url}" target="_blank" rel="noopener noreferrer">繁中獎盃說明</a><a href="${mapSource.url}" target="_blank" rel="noopener noreferrer">Cognition 地圖查證來源</a></div></section>${collectionResearchHtml({escape})}<section class="research-register"><h3>謎題解法查證 · 2026-11-03</h3><p>${puzzles.length} 個解題項目；${puzzles.filter(p=>p.verificationStatus==='unverified').length} 項仍有缺漏。操作摘要依逐題來源整理，未在 PS5 實機逐題重現。</p>${puzzles.map(p=>`<article><h4>${escape(p.label+' · '+p.title)}</h4>${p.pending?'<p>待查證：'+escape(p.pending)+'</p>':''}${p.researchNote?'<p>'+escape(p.researchNote)+'</p>':''}<div class="sources">${p.sources.map(s=>'<a href="'+escape(s.url)+'" target="_blank" rel="noopener noreferrer">'+escape(s.title)+(s.revision?' · rev '+escape(s.revision):'')+' ↗</a>').join('')}</div></article>`).join('')}</section></div>`;}
function render(){
 const focus=document.activeElement,attrs=['data-complete','data-trophy','data-branch','data-collection-complete','data-collection-star','data-collection-counter','data-puzzle-complete','data-reveal'],focusAttr=attrs.find(attr=>focus?.hasAttribute(attr)),focusId=focusAttr?focus.getAttribute(focusAttr):null,focusTop=focusAttr?focus.getBoundingClientRect().top:null,solutionFocus=focus?.id==='show-solutions';
 const focusContext=focus?.getAttribute('data-trophy-context'),counterRegion=focus?.getAttribute('data-counter-region'),navScroll=$('handbook-nav').scrollTop;
 $('app').innerHTML=shell()+(view==='trophies'?trophiesHtml():view==='backup'?sourcesHtml():view==='collectibles'?collectionOverviewHtml({escape,progress}):view==='branches'?`<h2>三市長分歧</h2><p>三條路線各自追蹤；清單進度與 PS5 存檔分開。</p><div class="branch-grid">${data.branches.map(branchHtml).join('')}</div>`:roadmapHtml());
 $('roadmap-chapters').hidden=view!=='roadmap';$('roadmap-chapters').innerHTML=view==='roadmap'?chapterNavigation(data,currentOverview().stage,currentSection().id,progress,escape):'';$('handbook-nav').scrollTop=navScroll;
 document.querySelectorAll('[data-view]').forEach(el=>view===el.dataset.view?el.setAttribute('aria-current','page'):el.removeAttribute('aria-current'));
 if(focusId){const selector=`[${focusAttr}="${focusId}"]`+(focusContext?'[data-trophy-context="'+focusContext+'"]':counterRegion?'[data-counter-region="'+counterRegion+'"]':'');const next=document.querySelector(selector);if(next){next.focus({preventScroll:true});if(focusTop>=0&&focusTop<innerHeight){const desired=scrollY+next.getBoundingClientRect().top-focusTop,baseMaximum=document.documentElement.scrollHeight-innerHeight-readingTail;readingTail=Math.max(0,Math.ceil(desired-baseMaximum));$('app').style.setProperty('--reading-tail',readingTail+'px');if(Math.abs(scrollY-desired)>1)window.scrollTo(0,desired);}}}
 if(solutionFocus)$('show-solutions')?.focus({preventScroll:true});
 $('open-sync').onclick=()=>sync.open();$('open-backup').onclick=()=>{$('backup-tools-content').innerHTML=backupHtml();bindBackupTools();$('backup-tools-dialog').showModal();};
 if(view==='roadmap'){
  $('show-solutions').onchange=event=>{const checked=event.target.checked;void action(()=>store.update(p=>{p.settings.showSolutions=checked;return p;}));};
  $('chapter-select').onchange=e=>action(()=>requestStage(e.target.value));
  $('section-select').onchange=e=>action(()=>requestSection(e.target.value));
  $('search').oninput=e=>{const pos=e.target.selectionStart;query=e.target.value;render();$('search').focus();try{$('search').setSelectionRange(pos,pos);}catch{}};
  $('filter').onchange=e=>{filter=e.target.value;render();$('filter').focus();};
  $('continue').onclick=()=>continueFrom(currentSection());
  $('resume-progress').onclick=()=>{const id=progress.settings.playAnchor,owner=ownerStep(id);if(owner)continueFrom(sectionForStep(owner.id),owner.id);else continueFrom(roadmapSections[0]);};
 }
 if(view==='trophies'){
  $('trophy-search').oninput=e=>{const pos=e.target.selectionStart;trophyQuery=e.target.value;render();$('trophy-search').focus();try{$('trophy-search').setSelectionRange(pos,pos);}catch{}};
  $('trophy-filter').onchange=e=>{trophyFilter=e.target.value;render();$('trophy-filter').focus();};
 }
 document.querySelectorAll('[data-branch-detail]').forEach(el=>el.addEventListener('toggle',()=>el.open?openBranches.add(el.dataset.branchDetail):openBranches.delete(el.dataset.branchDetail)));
 bindMapSelection();
}
function ownerStep(anchor){
 if(typeof anchor!=='string')return null;
 if(anchor.startsWith('step-'))return data.steps.find(s=>s.id===anchor.slice(5));
 if(anchor.startsWith('puzzle-')){const p=puzzles.find(p=>puzzleProgressId(p.id)===anchor);return data.steps.find(s=>s.id===p?.stepId);}
 if(anchor.startsWith('collectible-')){const c=collectionItems.find(c=>collectionProgressId(c.id)===anchor);return data.steps.find(s=>s.id==='region-'+c?.region.toLowerCase());}
 return null;
}
function continueFrom(part,stepId){
 const all=roadmapSections.slice(roadmapSections.indexOf(part)).flatMap(s=>s.steps),start=stepId?all.indexOf(stepId):0,next=all.slice(Math.max(0,start)).map(id=>data.steps.find(s=>s.id===id)).find(needsAttention);
 if(!next){message('本片段與後續步驟已完成，可從左列回看。');return;}
 const puzzle=puzzlesForStep(next.id).find(p=>!puzzleDone(p)),item=collectionsForStep(next.id).find(item=>!collectionDone(progress,item.id));
 if(puzzle)goPuzzle(puzzle.id);else if(item)goCollection(item.id);else goStep(next.id);
}
function updateMapSelection(id){
 const map=regionMaps[mapRegion()],node=map?.nodes.find(n=>n.id===id);if(!node)return;mapSelection=id;
 document.querySelectorAll('[data-map-node]').forEach(el=>el.classList.toggle('map-selected',el.dataset.mapNode===id));
 document.querySelectorAll('[data-map-selection]').forEach(el=>el.textContent=mapNodeTitle(node)+(node.description?' · '+node.description:''));
 document.querySelectorAll('[data-map-select]').forEach(el=>el.value=id);
}
function bindMapSelection(){
 mapObserver?.disconnect();if(view!=='roadmap'||!mapRegion()||query)return;
 const map=regionMaps[mapRegion()];mapObserver=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(visible.length){const node=map.nodes.find(n=>n.target===visible[0].target.id);if(node)updateMapSelection(node.id);}},{rootMargin:'-12% 0px -60% 0px',threshold:0});
 document.querySelectorAll('.puzzle,.collection-item').forEach(el=>{if(map.nodes.some(n=>n.target===el.id))mapObserver.observe(el);});
}
function openMap(){const part=currentSection();if(view!=='roadmap'||!mapRegion())return;$('map-dialog-title').textContent=mapRegion()+' 區域地圖';$('map-dialog-content').innerHTML=regionMapHtml(mapRegion(),{escape,progress,selected:mapSelection},{dialog:true});$('map-dialog').showModal();}
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
async function saveStep(id,status){revealedItems.delete(data.steps.some(s=>s.id===id)?'step-'+id:id);await store.update(p=>{p.steps[id]={...p.steps[id],status};p.settings.playAnchor=data.steps.some(s=>s.id===id)?'step-'+id:id;return p;});}
async function requestStage(id){const parts=sectionsForStage(id);if(!parts.length)return;const part=parts.find(s=>s.id===activeSection)||parts.find(s=>s.steps.some(id=>needsAttention(data.steps.find(step=>step.id===id))))||parts[0];await requestSection(part.id);}
async function requestSection(id){const part=roadmapSections.find(s=>s.id===id);if(!part)return;setReadingSection(part);history.pushState(null,'',sectionUrl(part));render();document.querySelector('.chapter-picker')?.scrollIntoView({block:'start'});$('section-select')?.focus({preventScroll:true});await store.update(p=>{p.settings.currentStage=part.stage;p.settings.currentSection=part.id;return p;});}
function setReadingSection(part){resetReadingTail();if(currentSection().id!==part.id)mapSelection='';mapContextRegion='';activeStage=part.stage;activeSection=part.id;view='roadmap';filter='all';query='';}
function goStep(id,regionOverride=''){const step=data.steps.find(s=>s.id===id);if(!step)return false;setReadingSection(sectionForStep(id));mapContextRegion=regionMaps[regionOverride]?regionOverride:'';revealedItems.add('step-'+id);history.replaceState(null,'',sectionUrl(currentSection())+'#step-'+id);render();$('step-'+id)?.scrollIntoView({block:'start'});$('step-'+id)?.querySelector('input')?.focus({preventScroll:true});return true;}
function goPuzzle(id){const puzzle=puzzles.find(p=>p.id===id);if(!puzzle)return false;revealedItems.add(puzzleProgressId(id));goStep(puzzle.stepId,puzzle.region);history.replaceState(null,'',sectionUrl(currentSection())+'#'+puzzleProgressId(id));$(puzzleProgressId(id))?.scrollIntoView({block:'start'});document.querySelector('[data-puzzle-complete="'+id+'"]')?.focus({preventScroll:true});return true;}
function goCollection(id){const item=collectionItems.find(item=>item.id===id);if(!item)return false;revealedItems.add(collectionProgressId(id));goStep('region-'+item.region.toLowerCase());history.replaceState(null,'',sectionUrl(currentSection())+'#'+collectionProgressId(id));$(collectionProgressId(id))?.scrollIntoView({block:'start'});document.querySelector('[data-collection-complete="'+id+'"]')?.focus({preventScroll:true});return true;}
function goCollectionRegion(code){const region=collectionRegions.find(r=>r.code===code);if(!region)return false;goStep(region.stepId);history.replaceState(null,'',sectionUrl(currentSection())+'#collection-region-'+code);$('collection-region-'+code)?.scrollIntoView({block:'start'});$('collection-region-'+code)?.querySelector('input')?.focus({preventScroll:true});return true;}
function goMapTarget(target){if(target.startsWith('puzzle-'))return goPuzzle(target.slice(7));if(target.startsWith('collectible-'))return goCollection(target.slice(12));if(target.startsWith('step-'))return goStep(target.slice(5));if(target.startsWith('artifact-')){const code=mapRegion(),node=regionMaps[code]?.nodes.find(n=>n.target===target);if(node){goStep('region-'+code.toLowerCase());$(target)?.scrollIntoView({block:'start'});$(target)?.querySelector('button')?.focus({preventScroll:true});}}}
function followHash(){if(location.hash.startsWith('#collectible-'))return goCollection(location.hash.slice(13));if(location.hash.startsWith('#collection-region-'))return goCollectionRegion(location.hash.slice(19));if(location.hash.startsWith('#puzzle-'))return goPuzzle(location.hash.slice(8));if(location.hash.startsWith('#step-'))return goStep(location.hash.slice(6));return false;}
document.addEventListener('click',event=>{
 const el=event.target.closest('button,a');if(!el)return;
 if(el.dataset.view){event.preventDefault();resetReadingTail();view=el.dataset.view;history.pushState(null,'',view==='roadmap'?sectionUrl(currentSection()):'?view='+view);render();window.scrollTo(0,0);}
 if(el.dataset.filter){filter=el.dataset.filter;render();}
 if(el.dataset.stage){event.preventDefault();void action(()=>requestStage(el.dataset.stage));}
 if(el.dataset.section){event.preventDefault();void action(()=>requestSection(el.dataset.section));}
 if(el.dataset.reveal){event.preventDefault();if(revealedItems.has(el.dataset.reveal))revealedItems.delete(el.dataset.reveal);else revealedItems.add(el.dataset.reveal);render();}
 if(el.hasAttribute('data-open-map')){event.preventDefault();openMap();}
 if(el.dataset.mapLocate){event.preventDefault();const target=el.dataset.mapLocate,code=puzzles.find(p=>puzzleProgressId(p.id)===target)?.region||collectionItems.find(c=>collectionProgressId(c.id)===target)?.region||mapRegion();if(regionMaps[code]){if(mapRegion()!==code){mapContextRegion=code;render();}const node=regionMaps[code].nodes.find(n=>n.target===target);if(node){updateMapSelection(node.id);if(innerWidth<1280)openMap();}}}
 if(el.dataset.mapNode){event.preventDefault();updateMapSelection(el.dataset.mapNode);if(el.dataset.mapTarget){$('map-dialog').close();goMapTarget(el.dataset.mapTarget);updateMapSelection(el.dataset.mapNode);}}
 if(el.dataset.stepLink){event.preventDefault();goStep(el.dataset.stepLink);}
 if(el.dataset.collectionRegionLink){event.preventDefault();goCollectionRegion(el.dataset.collectionRegionLink);}
 if(el.dataset.puzzleLink){event.preventDefault();goPuzzle(el.dataset.puzzleLink);}
 if(el.dataset.backup){backupTarget=el.dataset.backup;$('backup-node').textContent=data.steps.find(s=>s.id===backupTarget).title;$('backup-note').value=progress.backups[backupTarget]?.note||'';$('backup-ack').checked=false;$('backup-confirm').disabled=true;$('backup-dialog').showModal();}
 if(el.dataset.close)$(el.dataset.close).close();
});
document.addEventListener('change',event=>{const el=event.target;
 if(el.hasAttribute('data-map-fit'))el.closest('.region-map-panel').querySelector('.map-canvas').classList.toggle('map-fit',el.checked);
 if(el.hasAttribute('data-map-select'))updateMapSelection(el.value);
 if(el.dataset.collectionComplete)void action(()=>saveStep(collectionProgressId(el.dataset.collectionComplete),el.checked?'completed':'not_started'));
 if(el.dataset.collectionStar)void action(()=>saveStep(puzzleProgressId(el.dataset.collectionStar),el.checked?'completed':'not_started'));
 if(el.dataset.collectionCounter)void action(async()=>{const kind=el.dataset.collectionCounter,region=el.dataset.counterRegion,value=Number(el.value);if(!['text','artifact'].includes(kind)||!['STORY','SOCIAL',...collectionRegions.map(r=>r.code)].includes(region)||(['STORY','SOCIAL'].includes(region)&&kind!=='text')||!el.value.trim()||!Number.isSafeInteger(value)||value<0)throw Error('請輸入 0 或正整數。');await store.update(p=>{p.settings[counterKey(region,kind)]=value;if(collectionRegions.some(r=>r.code===region))p.settings.playAnchor='step-region-'+region.toLowerCase();else if(region==='SOCIAL')p.settings.playAnchor='step-field-basics';return p;});});
 if(el.dataset.puzzleComplete)void action(()=>saveStep(puzzleProgressId(el.dataset.puzzleComplete),el.checked?'completed':'not_started'));
 if(el.dataset.complete)void action(()=>saveStep(el.dataset.complete,el.checked?'completed':'not_started'));
 if(el.dataset.trophy)void action(()=>store.update(p=>{p.trophies[el.dataset.trophy]={...p.trophies[el.dataset.trophy],earned:el.checked};return p;}));
 if(el.dataset.branch)void action(()=>store.update(p=>{p.branches[el.dataset.branch]={...p.branches[el.dataset.branch],status:el.checked?'completed':'not_started'};return p;}));
});
window.addEventListener('popstate',()=>{resetReadingTail();const url=new URL(location.href);view=url.searchParams.get('view')||'roadmap';activeStage=url.searchParams.get('stage')||progress.settings.currentStage;activeSection=url.searchParams.get('section')||progress.settings.currentSection;mapSelection='';mapContextRegion='';if(!followHash())render();});
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
try{progress=await store.open();const stage=new URL(location.href).searchParams.get('stage');activeStage=data.stages.some(s=>s.id===stage)?stage:progress.settings.currentStage;activeSection=activeSection||progress.settings.currentSection;sync=setupSync(data,store,core,()=>{void refresh();});render();followHash();}
catch(e){$('app').innerHTML='<h1>無法讀取本機進度</h1><p class="error">'+escape(e.message)+'</p><p>沒有重設資料。可先下載原始資料，再處理瀏覽器儲存設定。</p><button id="raw-recovery">下載原始儲存資料</button>';$('raw-recovery').onclick=()=>action(async()=>download(await store.exportAll(),'raw-recovery'));}
