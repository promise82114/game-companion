import {auditDate,puzzleReviewLevel,puzzleReviewCounts,correctedFindings} from './puzzle-audit.js';
import {safetyChecks} from './ux-safety.js';
import {childIds,collectionsForStep,needsAttention as stepNeedsAttention,nextAction} from './roadmap/attention.js';
import {storyWaypoints,waypointProgressId,waypointsForStep,storyRouteHtml} from './roadmap/story.js';
import {roadmap as data} from './data.js';
import {trophyLabel} from './trophy-names.js';
import {warnings,verificationLabels,done,overview,matches} from './roadmap/model.js';
import {createStore} from './roadmap/store.js';
import {setupSync} from './roadmap/sync.js';
import {dialogueHtml} from './roadmap/evidence.js';
import {puzzles,puzzleProgressId,puzzlesForStep} from './roadmap/solutions.js';
import {collectionRegions,collectionItems,collectionProgressId,collectionTotals,counterKey,regionCollectionsHtml,collectionMiniHtml,collectionOverviewHtml,collectionResearchHtml} from './roadmap/collections.js';
import {roadmapSections,sectionsForStage,sectionForStep,resolveSection,sectionUrl,chapterNavigation} from './roadmap/navigation.js';
import {revealedItems,revealButton,isCompact} from './roadmap/completion.js';
import {regionMaps,regionMapHtml,mapNodeTitle,mapNodeMatches,mapSource,activeStarRoute} from './roadmap/maps.js';
import {humanArtifacts,artifactCandidates,artifactProgressId} from './roadmap/artifacts.js';
import {trophyDetailHtml,trophyGuides,trophyConditionSource,trophyProgress} from './roadmap/trophies.js';
const $=id=>document.getElementById(id),core=window.SideProjectSync;
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let progress,activeStage,activeSection=new URL(location.href).searchParams.get('section'),filter='all',query='',view=new URL(location.href).searchParams.get('view')||'roadmap',importReview,backupTarget,sync,rendering=false,refreshQueued=false,trophyQuery='',trophyFilter='all',mapSelection='',mapContextRegion='',mapObserver;
const currentOverview=()=>overview(data,{...progress,settings:{...progress.settings,currentStage:activeStage||progress.settings.currentStage}});
const currentSection=()=>resolveSection(currentOverview().stage,activeSection),openBranches=new Set();
const mapRegion=()=>mapContextRegion||currentSection().region||currentSection().maps?.[0];
const mapKeys=()=>[...new Set([...(currentSection().maps||[currentSection().region]),...currentSection().steps.flatMap(id=>puzzlesForStep(id).map(p=>p.mapKey||p.region)),mapRegion()].filter(key=>regionMaps[key]))];
const mapOptions=()=>({escape,progress,selected:mapSelection,mapKeys:mapKeys()});
let readingTail=0,mapManualSelection=false,mapFrame=0;
function resetReadingTail(){readingTail=0;$('app').style.removeProperty('--reading-tail');}
const store=createStore(data,core,()=>{void refresh();});
let messageTimer;
function message(text){$('feedback').textContent=text;clearTimeout(messageTimer);messageTimer=setTimeout(()=>$('feedback').textContent='',9000);}
async function action(fn){try{await fn();}catch(e){message(e.message);}}
const sourceLinks=keys=>keys.map(k=>`<a href="${escape(data.sources[k].url)}" target="_blank" rel="noopener noreferrer">${escape(data.sources[k].title)} ↗</a>`).join('');
const evidence=step=>dialogueHtml(step,{escape,sourceLinks,labels:verificationLabels,showSources:false});
const puzzleDone=p=>progress.steps[puzzleProgressId(p.id)]?.status==='completed';
const needsAttention=step=>stepNeedsAttention(step,progress);
const riskLabel=step=>step.warningLevel==='irreversible'&&step.verificationStatus==='unverified'?'可能錯過・待查證':warnings[step.warningLevel];
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
 return `<label class="${card?'trophy-card':'trophy-row'}"><input type="checkbox" data-trophy="${trophy.id}" data-trophy-context="${context}" ${progress.trophies[trophy.id]?.earned?'checked':''}><span class="trophy-name">${escape(trophyLabel(trophy))}${card?trophyProgress(trophy,progress,data).map(c=>`<span class="inline-trophy-progress">${escape(c.label)} (${c.done}/${c.total})</span>`).join(''):''}</span></label>`;
}
function safetyPending(id){
 const check=safetyChecks[id];return check&&(check.items.some(([trophy])=>!progress.trophies[trophy]?.earned)||(check.steps||[]).some(id=>!done(progress,id)));
}
function safetyCheckHtml(id){
 const check=safetyChecks[id];if(!check)return '';
 const missing=check.items.filter(([trophy])=>!progress.trophies[trophy]?.earned),steps=(check.steps||[]).filter(id=>!done(progress,id));
 return `<aside class="safety-check" data-safety-check="${id}"><strong>${escape(check.before)}</strong>${missing.length?'<p>尚未確認獎盃：'+missing.map(([trophy,step])=>`<a href="#step-${step}" data-step-link="${step}">${escape(trophyLabel(data.trophies.find(t=>t.id===trophy)))}</a>`).join('、')+'</p>':''}${steps.length?'<p>尚未勾選前置：'+steps.map(id=>rowLink(data.steps.find(s=>s.id===id))).join('、')+'</p>':''}${safetyPending(id)||!done(progress,id)?'<p>'+escape(check.note)+'</p>':'<p>本節點的操作與獎盃確認已記錄。</p>'}<a href="?view=backup#research-${id}" data-research-link="${id}">查證與補救</a></aside>`;
}
function nextActionHtml(part){
 const future=roadmapSections.slice(roadmapSections.indexOf(part)).flatMap(s=>s.steps).map(id=>data.steps.find(s=>s.id===id)),plan=nextAction(future,progress),risk=future.find(s=>safetyChecks[s.id]?(safetyPending(s.id)||!done(progress,s.id)):['irreversible','branch'].includes(s.warningLevel)&&(!done(progress,s.id)||s.trophyRefs.some(id=>!progress.trophies[id]?.earned))),backup=future.find(s=>s.backupRecommended&&!progress.backups[s.id]?.confirmedAt),remaining=data.steps.filter(s=>s.stageId===part.stage&&needsAttention(s)).length;
 const title=plan?plan.item.title:'本片段與後續操作已完成',instruction=plan?(plan.kind==='puzzle'?(plan.item.kind==='tutorial'?`前往 ${plan.item.label} · ${plan.item.title}，取得教學拼塊後勾選本題。`:`前往 ${plan.item.label} · ${plan.item.title}；完成條件與操作見本題清單，完成後再勾選。`):plan.kind==='collection'?plan.item.location||plan.item.action:plan.item.actions?.[0]||plan.step.actions[0]):'可回看獎盃清單，核對實際取得紀錄。';
 return `<section class="next-action checkpoint" aria-label="下一步導引"><div class="next-action-main"><div><span class="next-location">${part.stage} · ${escape(part.label)} · 本章待完成主步驟 ${remaining} 項（含未完成子項）</span><h2>下一步：${escape(title)}</h2><p>${escape(instruction)}</p></div>${plan?'<button id="continue">繼續下一步</button>':'<a href="?view=trophies" data-view="trophies">核對獎盃</a>'}</div><div class="next-safety"><p><strong>安全檢查</strong> ${risk?rowLink(risk):'後續沒有未確認的危險節點'}</p><p><strong>PS5 備份</strong> ${backup?rowLink(backup):'後續備份節點已有手動紀錄；推進前仍須在主機核對'}</p></div></section>`;
}
function stepHtml(step){
 const state=done(progress,step.id)?'completed':'not_started',complete=state==='completed',compactable=!needsAttention(step),id='step-'+step.id,backup=progress.backups[step.id],trophies=step.trophyRefs.map(id=>data.trophies.find(t=>t.id===id)),pending=childIds(step).filter(id=>progress.steps[id]?.status!=='completed').length;
 return `<article id="step-${step.id}" class="step ${state}" data-step="${step.id}">
 <div class="step-top"><input id="complete-${step.id}" type="checkbox" data-complete="${step.id}" aria-label="完成 ${escape(step.title)}" ${complete?'checked':''}><div><label class="step-title" for="complete-${step.id}">${escape(step.title)}</label><div class="metadata"><span class="${step.warningLevel}">${escape(riskLabel(step))}</span>${step.verificationStatus==='unverified'?'<span>待查證</span>':''}<span>${escape(step.location)}</span></div>${stepStatusHtml(state)}${complete&&pending?'<span class="child-pending">子項目尚有 '+pending+' 項未勾選</span>':''}</div>${revealButton(id,compactable,escape)}</div>
 ${complete&&['irreversible','branch'].includes(step.warningLevel)?'<p class="persistent-warning">'+escape(step.id==='w2-backup'?'W2 實驗室進入前仍須確認 PS5 入口備份；網站勾選不能代替遊戲存檔。':step.verificationStatus==='unverified'?'觸發與補救仍待查證；完成勾選不表示遊戲旗標已驗證。':step.warningLevel==='branch'?'分歧選擇與前期條件仍需核對；完成勾選不保證遊戲結果。':'此處有不可逆事件；返回重選前，先核對遊戲存檔與下方詳情。')+'</p>':''}
 ${trophies.length?'<div class="step-trophies" role="group" aria-label="'+escape(step.title)+' 獎盃">'+trophies.map(t=>trophyCheckbox(t,step.id,true)).join('')+'</div>':''}
 ${safetyCheckHtml(step.id)}
 ${step.backupRecommended?`<div class="backup-check"><span>${backup?.confirmedAt?'PS5 備份・玩家手動紀錄 '+escape(new Date(backup.confirmedAt).toLocaleString('zh-TW'))+(backup.note?' · '+escape(backup.note):''):'PS5 存檔備份・尚未手動確認'}</span><button data-backup="${step.id}">${backup?.confirmedAt?'更新 PS5 紀錄':'記錄 PS5 備份'}</button></div>`:''}
 <div class="step-body completion-body" id="body-${id}" ${isCompact(id,compactable)?'hidden':''}>
 ${step.trigger&&step.trigger!=='抵達上述地點，離開前查看本步驟。'?'<p class="step-trigger">'+escape(step.trigger)+'</p>':''}
 ${step.prerequisites.length?'<p class="step-prerequisites">前置：'+step.prerequisites.map(id=>`<a href="#step-${id}" data-step-link="${id}">${escape(data.steps.find(s=>s.id===id)?.title||id)}</a>`).join('、')+'</p>':''}
 <ol class="instructions">${step.actions.map(s=>'<li>'+escape(s)+'</li>').join('')}</ol>${evidence(step)}
 ${step.dialogue?.length||step.verificationStatus==='unverified'||step.warningLevel==='irreversible'?`<a class="research-link" href="?view=backup#research-${step.id}" data-research-link="${step.id}">${verificationLabels[step.verificationStatus]}・查證與補救</a>`:''}
 ${step.id.startsWith('region-')?regionCollectionsHtml(step.id.slice(7).toUpperCase(),{escape,progress}):''}${step.id==='collectibles'?collectionOverviewHtml({escape,progress}):''}
 ${storyRouteHtml(step.id,{escape,progress,showSolutions:progress.settings.showSolutions===true})}
 ${step.id==='field-basics'?'<label class="social-counter">已讀公共貼文<input type="number" min="0" step="1" data-collection-counter="text" data-counter-region="SOCIAL" value="'+(Number.isSafeInteger(progress.settings[counterKey('SOCIAL','text')])?progress.settings[counterKey('SOCIAL','text')]:0)+'"></label>':''}
 </div>
 </article>`;
}
function branchHtml(branch){
 const complete=progress.branches[branch.id]?.status==='completed',count=branch.prerequisites.filter(id=>done(progress,id)).length,trophy=data.trophies.find(t=>t.officialName===branch.trophy),earned=progress.trophies[trophy.id]?.earned,next=branch.prerequisites.find(id=>!done(progress,id))||branch.stepId;
 return `<article class="branch-lane" data-branch-lane="${branch.id}"><h3>${escape(branch.name)}</h3>${trophyCheckbox(trophy,'branch-'+branch.id,true)}<p class="branch-status">PS5 獎盃：${earned?'已手動確認取得':'尚未確認取得'}<br>前置操作紀錄：${count} / ${branch.prerequisites.length} · <strong>遊戲旗標仍待查證</strong></p><label class="branch-complete"><input type="checkbox" data-branch="${branch.id}" aria-label="${escape(branch.name)} 路線完成" ${complete?'checked':''}><span>路線操作：${complete?'完成':'未開始'}</span></label><p><a href="#step-${next}" data-step-link="${next}">下一步：${escape(data.steps.find(s=>s.id===next).title)}</a></p>${earned?'<p class="branch-restore">換另一條路線前：'+escape(branch.restore)+'</p>':''}<details data-branch-detail="${branch.id}" ${!complete||openBranches.has(branch.id)?'open':''}><summary>前置檢查、還原路線與實錄</summary><p>${escape(branch.summary)}</p><p>${escape(branch.evidenceNote||'')}</p><ul>${branch.prerequisites.map(id=>`<li>${done(progress,id)?'✓':'○'} <a href="#step-${id}" data-step-link="${id}">${escape(data.steps.find(s=>s.id===id).title)}</a></li>`).join('')}</ul>${!earned?'<p>'+escape(branch.restore)+'</p>':''}<a href="#step-${branch.stepId}" data-step-link="${branch.stepId}">開啟此分歧步驟</a><p><a href="${data.sources.mayors.url}&t=${branch.sourceTime.split(':').reduce((a,v)=>a*60+Number(v),0)}s" target="_blank" rel="noopener noreferrer">市長實錄 ${branch.sourceTime} ↗</a></p></details></article>`; // taste-skill-ignore: 使用者明確要求風險符號與完成檢查記號。
}
function roadmapHtml(){
 const o=currentOverview(),part=currentSection(),current=data.stages.find(s=>s.id===o.stage),local=part.steps.map(id=>data.steps.find(s=>s.id===id));
 const searchMatches=step=>JSON.stringify([step,waypointsForStep(step.id),puzzlesForStep(step.id).map(p=>[p.title,p.label]),collectionsForStep(step.id),step.trophyRefs.map(id=>data.trophies.find(t=>t.id===id))]).toLocaleLowerCase().includes(query.toLocaleLowerCase());
 const items=local.filter(step=>matches(step,progress,filter)||(filter==='pending'&&needsAttention(step)));
 const results=query?data.steps.filter(step=>searchMatches(step)&&(matches(step,progress,filter)||(filter==='pending'&&needsAttention(step)))):[];
 const content=query?`<section class="search-results" aria-label="所有章節搜尋結果"><h2>搜尋結果 · ${results.length}</h2>${results.map(step=>`<article><a href="#step-${step.id}" data-step-link="${step.id}">${escape(step.title)}</a><p>${step.stageId} · ${escape(sectionForStep(step.id).label)} · ${escape(step.location)}</p></article>`).join('')||'<p>沒有符合條件的步驟。</p>'}</section>`:`<section class="stage" id="stage-${o.stage}" data-stage-detail="${o.stage}"><header class="stage-heading"><div><p>${o.stage} · ${escape(current.title)}</p><h2>${escape(part.label)}</h2></div><span>${local.filter(step=>done(progress,step.id)).length} / ${local.length}</span></header>${part.region?'<p class="section-preflight">先閱讀沿途提醒與收集位置。私訊／劇情以遊戲提示出現時處理；尚未觸發可先解題，不必等到全部勾完才往下走。</p>':''}${o.stage==='P6'?'<p class="section-preflight">每條路線各自驗收；先核對前期選擇與 W2 入口備份，再照所選路線進行。三條是不同遊戲分歧，不能在同一段遊戲進度依次作答。</p>':''}${items.length?items.map(stepHtml).join(''):'<p class="empty">本片段沒有符合條件的步驟。</p>'}</section>`;
 const index=roadmapSections.indexOf(part),previous=roadmapSections[index-1],next=roadmapSections[index+1];
 return `${nextActionHtml(part)}<div class="solution-toggle"><label for="show-solutions"><input id="show-solutions" type="checkbox" ${progress.settings.showSolutions===true?'checked':''}>拒絕謎語 <span>顯示詳細解法與圖解</span></label><span id="puzzle-count">解題紀錄 ${puzzles.filter(p=>puzzleDone(p)).length} / ${puzzles.length}</span></div>
 <nav class="chapter-picker" aria-label="選擇攻略階段"><label>章節<select id="chapter-select">${data.stages.map(s=>`<option value="${s.id}" ${s.id===o.stage?'selected':''}>${s.id} · ${escape(s.title)}</option>`).join('')}</select></label><label>片段<select id="section-select">${sectionsForStage(o.stage).map(s=>`<option value="${s.id}" ${s.id===part.id?'selected':''}>${escape(s.label)}</option>`).join('')}</select></label><button id="resume-progress">回到遊玩進度</button></nav>
 ${progress.settings.showSolutions===true?'<p class="puzzle-glossary">同類設備依取得順序稱 A、B、C。橋樑拼塊以每段開始時左上形狀由左到右編號；「轉」表示旋轉到預覽與路面相合再放下。</p>':''}${collectionMiniHtml(progress)}
 <div class="toolbar"><label>搜尋所有章節<input id="search" type="search" value="${escape(query)}" placeholder="地點、角色、獎盃名稱…"></label><label>本片段顯示<select id="filter">${selectOptions({all:'全部',pending:'未完成',missable:'容易錯過',backup:'備份節點',recommended:'推薦體驗',completed:'已完成',unverified:'待查證'},filter)}</select></label></div>
 <div class="roadmap-layout${mapRegion()&&!query?' has-region-map':''}"><div class="roadmap-content"><div class="stage-list">${query?content:compactSectionHtml(content,part,local)}</div><nav class="section-pagination" aria-label="前後片段">${previous?`<a href="${sectionUrl(previous)}" data-section="${previous.id}">← ${previous.stage} · ${escape(previous.label)}</a>`:'<span></span>'}${next?`<a href="${sectionUrl(next)}" data-section="${next.id}">${next.stage} · ${escape(next.label)} →</a>`:''}</nav></div>${mapRegion()&&!query?`<aside class="region-map-aside">${regionMapHtml(mapRegion(),mapOptions())}</aside><button type="button" class="map-floating" data-open-map>${escape(regionMaps[mapRegion()].name||mapRegion())} 地圖</button>`:''}</div>`;
}
function compactSectionHtml(html,part,steps){
 const id='section-'+part.id,complete=steps.every(step=>!needsAttention(step)),end=html.indexOf('</header>');
 return html.slice(0,end)+revealButton(id,complete,escape)+html.slice(end,end+9)+`<div id="body-${id}" ${isCompact(id,complete)?'hidden':''}>`+html.slice(end+9,-10)+'</div></section>';
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
function sourcesHtml(){return `<div class="source-tools"><p>攻略查證：${data.checkedAt} · ${data.steps.filter(s=>s.verificationStatus==='confirmed').length} 已確認／${data.steps.filter(s=>s.verificationStatus==='consensus').length} 攻略共識／${data.steps.filter(s=>s.verificationStatus==='unverified').length} 待查證</p><div class="sources">${sourceLinks(Object.keys(data.sources))}</div>${researchHtml()}<section class="research-register"><h3>獎盃條件與區域示意圖 · 2026-11-04</h3><p>60 盃繁中說明依同一 Exophase 連結 ID 配對；攻略操作摘要與計數另外呈現。十二區原創 SVG 僅整理已查證地標與相對位置，未複製來源圖片，非等比例或實機 GPS。</p><div class="sources"><a href="${trophyConditionSource.url}" target="_blank" rel="noopener noreferrer">繁中獎盃說明</a><a href="${mapSource.url}" target="_blank" rel="noopener noreferrer">Cognition 地圖查證來源</a></div></section>${collectionResearchHtml({escape})}<section class="research-register"><h3>謎題解法覆核 · ${auditDate}</h3><p>全表 ${puzzles.length} 項，${puzzleReviewCounts(puzzles).textScreened} 項已做文字風險檢視；${puzzleReviewCounts(puzzles).sourceCompared} 項完成來源逐步對照；${puzzleReviewCounts(puzzles).sourceGaps} 項已覆核但仍缺精確細節，${puzzleReviewCounts(puzzles).pending} 項尚未覆核。來源比對與程式測試不等於 PS5 實機通關，全部未經逐題實機驗收。</p>${puzzles.map(p=>`<article><h4>${escape(p.label+' · '+p.title)}</h4><p>${puzzleReviewLevel(p.id)==='source_compared'?'已與來源逐步對照；未實機驗收。':puzzleReviewLevel(p.id)==='source_gap'?'已覆核，仍有待查證細節。':'有來源摘要，尚待逐步覆核。'}</p>${correctedFindings[p.id]?'<p>'+escape(correctedFindings[p.id])+'</p>':''}${p.pending?'<p>待查證：'+escape(p.pending)+'</p>':''}${p.researchNote?'<p>'+escape(p.researchNote)+'</p>':''}<div class="sources">${p.sources.map(s=>'<a href="'+escape(s.url)+'" target="_blank" rel="noopener noreferrer">'+escape(s.title)+(s.revision?' · rev '+escape(s.revision):'')+' ↗</a>').join('')}</div></article>`).join('')}</section></div>`;}
function render(){
 const manualOpen=[...document.querySelectorAll('.artifact-manual[open]')].map(node=>node.closest('[data-region-collection]').dataset.regionCollection);
 const focus=document.activeElement,attrs=['data-complete','data-trophy','data-branch','data-collection-complete','data-artifact-complete','data-collection-star','data-collection-counter','data-puzzle-complete','data-waypoint-complete','data-reveal'],focusAttr=attrs.find(attr=>focus?.hasAttribute(attr)),focusId=focusAttr?focus.getAttribute(focusAttr):null,focusTop=focusAttr?focus.getBoundingClientRect().top:null,solutionFocus=focus?.id==='show-solutions';
 const focusContext=focus?.getAttribute('data-trophy-context'),counterRegion=focus?.getAttribute('data-counter-region'),navScroll=$('handbook-nav').scrollTop;
 $('app').innerHTML=shell()+(view==='trophies'?trophiesHtml():view==='backup'?sourcesHtml():view==='collectibles'?collectionOverviewHtml({escape,progress}):view==='branches'?`<h2>三市長分歧</h2><p>三條路線各自追蹤；清單進度與 PS5 存檔分開。</p><div class="branch-grid">${data.branches.map(branchHtml).join('')}</div>`:roadmapHtml());
 for(const region of manualOpen){const panel=document.querySelector('[data-region-collection="'+region+'"] .artifact-manual');if(panel)panel.open=true;}
 $('roadmap-chapters').hidden=view!=='roadmap';$('roadmap-chapters').innerHTML=view==='roadmap'?chapterNavigation(data,currentOverview().stage,currentSection().id,progress,escape):'';$('handbook-nav').scrollTop=navScroll;
 document.querySelectorAll('[data-view]').forEach(el=>view===el.dataset.view?el.setAttribute('aria-current','page'):el.removeAttribute('aria-current'));
 if(focusId){const selector=`[${focusAttr}="${focusId}"]`+(focusContext?'[data-trophy-context="'+focusContext+'"]':counterRegion?'[data-counter-region="'+counterRegion+'"]':'');let next=document.querySelector(selector);if(next?.closest('[hidden]'))next=document.querySelector('.stage-heading>.completion-peek')||next.closest('.step')?.querySelector('.step-top input');if(next){next.focus({preventScroll:true});if(focusTop>=0&&focusTop<innerHeight){const desired=scrollY+next.getBoundingClientRect().top-focusTop,baseMaximum=document.documentElement.scrollHeight-innerHeight-readingTail;readingTail=Math.max(0,Math.ceil(desired-baseMaximum));$('app').style.setProperty('--reading-tail',readingTail+'px');if(Math.abs(scrollY-desired)>1)window.scrollTo(0,desired);}}}
 if(solutionFocus)$('show-solutions')?.focus({preventScroll:true});
 $('open-sync').onclick=()=>sync.open();$('open-backup').onclick=()=>{$('backup-tools-content').innerHTML=backupHtml();bindBackupTools();$('backup-tools-dialog').showModal();};
 if(view==='roadmap'){
  $('show-solutions').onchange=event=>{const checked=event.target.checked;void action(()=>store.update(p=>{p.settings.showSolutions=checked;return p;}));};
  $('chapter-select').onchange=e=>action(()=>requestStage(e.target.value));
  $('section-select').onchange=e=>action(()=>requestSection(e.target.value));
  $('search').oninput=e=>{const pos=e.target.selectionStart;query=e.target.value;render();$('search').focus();try{$('search').setSelectionRange(pos,pos);}catch{}};
  $('filter').onchange=e=>{filter=e.target.value;render();$('filter').focus();};
  $('continue')?.addEventListener('click',()=>{pushLocation();continueFrom(currentSection());});
  $('resume-progress').onclick=()=>{pushLocation();const id=progress.settings.playAnchor,owner=ownerStep(id);if(owner)continueFrom(sectionForStep(owner.id),owner.id);else continueFrom(roadmapSections[0]);};
 }
 if(view==='trophies'){
  $('trophy-search').oninput=e=>{const pos=e.target.selectionStart;trophyQuery=e.target.value;render();$('trophy-search').focus();try{$('trophy-search').setSelectionRange(pos,pos);}catch{}};
  $('trophy-filter').onchange=e=>{trophyFilter=e.target.value;render();$('trophy-filter').focus();};
 }
 document.querySelectorAll('[data-branch-detail]').forEach(el=>el.addEventListener('toggle',()=>el.open?openBranches.add(el.dataset.branchDetail):openBranches.delete(el.dataset.branchDetail)));
 if($('map-dialog').open&&mapRegion())$('map-dialog-content').innerHTML=regionMapHtml(mapRegion(),mapOptions(),{dialog:true});
 bindMapSelection();
}
function ownerStep(anchor){
 if(typeof anchor!=='string')return null;
 if(anchor.startsWith('waypoint-')){const w=storyWaypoints.find(w=>waypointProgressId(w.id)===anchor);return data.steps.find(s=>s.id===w?.stepId);}
 if(anchor.startsWith('step-'))return data.steps.find(s=>s.id===anchor.slice(5));
 if(anchor.startsWith('puzzle-')){const p=puzzles.find(p=>puzzleProgressId(p.id)===anchor);return data.steps.find(s=>s.id===p?.stepId);}
 if(anchor.startsWith('collectible-')){const c=collectionItems.find(c=>collectionProgressId(c.id)===anchor);return data.steps.find(s=>s.id==='region-'+c?.region.toLowerCase());}
 return null;
}
function continueFrom(part,stepId){
 const all=roadmapSections.slice(roadmapSections.indexOf(part)).flatMap(s=>s.steps),start=stepId?all.indexOf(stepId):0,plan=nextAction(all.slice(Math.max(0,start)).map(id=>data.steps.find(s=>s.id===id)),progress);
 if(!plan){message('本片段與後續步驟已完成，可從左列回看。');return;}
 if(plan.kind==='waypoint')goWaypoint(plan.item.id);else if(plan.kind==='puzzle')goPuzzle(plan.item.id);else if(plan.kind==='collection')goCollection(plan.item.id);else goStep(plan.step.id);
}
function updateMapSelection(id,manual=false){
 const map=regionMaps[mapRegion()],node=map?.nodes.find(n=>n.id===id);if(!node)return;const previousRoute=activeStarRoute(map,mapSelection);mapSelection=id;
 if(manual)mapManualSelection=true;
 if(previousRoute!==activeStarRoute(map,id))refreshMaps();
 document.querySelectorAll('[data-map-node]').forEach(el=>el.classList.toggle('map-selected',el.dataset.mapNode===id));
 document.querySelectorAll('[data-map-selection]').forEach(el=>el.textContent=mapNodeTitle(node)+(node.description?' · '+node.description:''));
 document.querySelectorAll('[data-map-select]').forEach(el=>el.value=id);
}
function refreshMaps(){
 const code=mapRegion();if(!regionMaps[code])return;
 const aside=document.querySelector('.region-map-aside');if(aside)aside.innerHTML=regionMapHtml(code,mapOptions());
 if($('map-dialog').open){$('map-dialog-title').textContent=(regionMaps[code].name||code)+' 地圖';$('map-dialog-content').innerHTML=regionMapHtml(code,mapOptions(),{dialog:true});}
 const floating=document.querySelector('.map-floating');if(floating)floating.textContent=(regionMaps[code].name||code)+' 地圖';
}
function targetMap(target){const puzzle=puzzles.find(p=>puzzleProgressId(p.id)===target),waypoint=storyWaypoints.find(w=>waypointProgressId(w.id)===target),item=collectionItems.find(c=>collectionProgressId(c.id)===target);return waypoint?.mapKey||puzzle?.mapKey||puzzle?.region||item?.region||mapRegion();}
function syncReadingMap(){
 if(mapManualSelection||view!=='roadmap'||!mapRegion()||query)return;
 const visible=[...document.querySelectorAll('.puzzle,.collection-item,.artifact-item,.waypoint')].map(target=>({target,rect:target.getBoundingClientRect()})).filter(e=>e.rect.height>0&&e.rect.bottom>100&&e.rect.top<innerHeight-80);
 if(!visible.length)return;
 const atEnd=scrollY+innerHeight>=document.documentElement.scrollHeight-4,passed=visible.filter(e=>e.rect.top<=innerHeight*.65),target=(atEnd?visible.at(-1):passed.at(-1)||visible[0]).target.id,code=targetMap(target);
 if(!mapKeys().includes(code)||!regionMaps[code])return;
 if(mapRegion()!==code){mapContextRegion=code;mapSelection='';refreshMaps();}
 const node=regionMaps[code].nodes.find(n=>mapNodeMatches(n,target));if(node&&node.id!==mapSelection)updateMapSelection(node.id);
}
function scheduleReadingMap(){if(!mapFrame)mapFrame=requestAnimationFrame(()=>{mapFrame=0;syncReadingMap();});}
function bindMapSelection(){
 mapObserver?.disconnect();if(view!=='roadmap'||!mapRegion()||query)return;
 mapObserver=new IntersectionObserver(scheduleReadingMap,{rootMargin:'-100px 0px -80px 0px',threshold:0});
 document.querySelectorAll('.puzzle,.collection-item,.artifact-item,.waypoint').forEach(el=>mapObserver.observe(el));
}
function openMap(){if(view!=='roadmap'||!mapRegion())return;$('map-dialog-title').textContent=(regionMaps[mapRegion()].name||mapRegion())+' 地圖';$('map-dialog-content').innerHTML=regionMapHtml(mapRegion(),mapOptions(),{dialog:true});$('map-dialog').showModal();}
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
async function saveStep(id,status){revealedItems.delete(data.steps.some(s=>s.id===id)?'step-'+id:id);await store.update(p=>{p.steps[id]={...p.steps[id],status};p.settings.playAnchor=data.steps.some(s=>s.id===id)?'step-'+id:id;const owner=ownerStep(p.settings.playAnchor),part=owner&&sectionForStep(owner.id);if(owner&&!stepNeedsAttention(owner,p))revealedItems.delete('step-'+owner.id);if(part&&part.steps.every(id=>!stepNeedsAttention(data.steps.find(s=>s.id===id),p)))revealedItems.delete('section-'+part.id);return p;});}
function rememberLocation(){history.replaceState({talosUi:{activeStage,activeSection,query,filter,trophyQuery,trophyFilter,scroll:scrollY,readingTail,mapSelection,mapContextRegion,revealed:[...revealedItems]}},'',location.href);}
function pushLocation(){rememberLocation();history.pushState(null,'',location.href);}
async function requestStage(id){const parts=sectionsForStage(id);if(!parts.length)return;const part=parts.find(s=>s.id===activeSection)||parts.find(s=>s.steps.some(id=>needsAttention(data.steps.find(step=>step.id===id))))||parts[0];await requestSection(part.id);}
async function requestSection(id){const part=roadmapSections.find(s=>s.id===id);if(!part)return;rememberLocation();setReadingSection(part);history.pushState(null,'',sectionUrl(part));render();document.querySelector('.next-action')?.scrollIntoView({block:'start'});$('section-select')?.focus({preventScroll:true});await store.update(p=>{p.settings.currentStage=part.stage;p.settings.currentSection=part.id;return p;});}
function setReadingSection(part){mapManualSelection=false;resetReadingTail();if(currentSection().id!==part.id)mapSelection='';mapContextRegion='';activeStage=part.stage;activeSection=part.id;view='roadmap';filter='all';query='';}
function goStep(id,regionOverride=''){const step=data.steps.find(s=>s.id===id);if(!step)return false;setReadingSection(sectionForStep(id));mapContextRegion=regionMaps[regionOverride]?regionOverride:'';revealedItems.add('section-'+currentSection().id);revealedItems.add('step-'+id);history.replaceState(null,'',sectionUrl(currentSection())+'#step-'+id);render();$('step-'+id)?.scrollIntoView({block:'start'});$('step-'+id)?.querySelector('input')?.focus({preventScroll:true});return true;}
function goResearch(id){view='backup';resetReadingTail();history.replaceState(null,'','?view=backup#research-'+id);render();$('research-'+id)?.scrollIntoView({block:'start'});return true;}
function followLocation(){return location.hash.startsWith('#research-')?goResearch(location.hash.slice(10)):followHash();}
function goPuzzle(id){const puzzle=puzzles.find(p=>p.id===id);if(!puzzle)return false;revealedItems.add(puzzleProgressId(id));goStep(puzzle.stepId,puzzle.mapKey||puzzle.region);history.replaceState(null,'',sectionUrl(currentSection())+'#'+puzzleProgressId(id));$(puzzleProgressId(id))?.scrollIntoView({block:'start'});const node=regionMaps[mapRegion()]?.nodes.find(n=>mapNodeMatches(n,puzzleProgressId(id)));if(node)updateMapSelection(node.id,true);document.querySelector('[data-puzzle-complete="'+id+'"]')?.focus({preventScroll:true});return true;}
function goWaypoint(id){const w=storyWaypoints.find(w=>w.id===id);if(!w)return false;const key=waypointProgressId(id);revealedItems.add(key);goStep(w.stepId,w.mapKey);history.replaceState(null,'',sectionUrl(currentSection())+'#'+key);$(key)?.scrollIntoView({block:'start'});document.querySelector('[data-waypoint-complete="'+id+'"]')?.focus({preventScroll:true});return true;}
function goCollection(id){const item=collectionItems.find(item=>item.id===id);if(!item)return false;revealedItems.add(collectionProgressId(id));goStep('region-'+item.region.toLowerCase());history.replaceState(null,'',sectionUrl(currentSection())+'#'+collectionProgressId(id));$(collectionProgressId(id))?.scrollIntoView({block:'start'});document.querySelector('[data-collection-complete="'+id+'"]')?.focus({preventScroll:true});return true;}
function goCollectionRegion(code){const region=collectionRegions.find(r=>r.code===code);if(!region)return false;goStep(region.stepId);history.replaceState(null,'',sectionUrl(currentSection())+'#collection-region-'+code);$('collection-region-'+code)?.scrollIntoView({block:'start'});$('collection-region-'+code)?.querySelector('input')?.focus({preventScroll:true});return true;}
function goMapTarget(target){if(target.startsWith('waypoint-'))return goWaypoint(target.slice(9));if(target.startsWith('puzzle-'))return goPuzzle(target.slice(7));if(target.startsWith('collectible-'))return goCollection(target.slice(12));if(target.startsWith('step-'))return goStep(target.slice(5));if(target.startsWith('artifact-')){const code=mapRegion(),node=regionMaps[code]?.nodes.find(n=>mapNodeMatches(n,target));if(node){goStep('region-'+code.toLowerCase());$(target)?.scrollIntoView({block:'start'});$(target)?.querySelector('input,button')?.focus({preventScroll:true});}}}
function followHash(){if(location.hash.startsWith('#waypoint-'))return goWaypoint(location.hash.slice(10));if(location.hash.startsWith('#artifact-')){const site=artifactCandidates.find(a=>'artifact-'+a.id===location.hash.slice(1));if(site){goStep('region-'+site.region.toLowerCase());history.replaceState(null,'',sectionUrl(currentSection())+'#artifact-'+site.id);$('artifact-'+site.id)?.scrollIntoView({block:'start'});$('artifact-'+site.id)?.querySelector('input')?.focus({preventScroll:true});return true;}}if(location.hash.startsWith('#collectible-'))return goCollection(location.hash.slice(13));if(location.hash.startsWith('#collection-region-'))return goCollectionRegion(location.hash.slice(19));if(location.hash.startsWith('#puzzle-'))return goPuzzle(location.hash.slice(8));if(location.hash.startsWith('#step-'))return goStep(location.hash.slice(6));return false;}
document.addEventListener('click',event=>{
 const el=event.target.closest('button,a');if(!el)return;
 if(el.dataset.view){event.preventDefault();rememberLocation();resetReadingTail();view=el.dataset.view;history.pushState(null,'',view==='roadmap'?sectionUrl(currentSection()):'?view='+view);render();window.scrollTo(0,0);}
 if(el.dataset.filter){filter=el.dataset.filter;render();}
 if(el.dataset.stage){event.preventDefault();void action(()=>requestStage(el.dataset.stage));}
 if(el.dataset.section){event.preventDefault();void action(()=>requestSection(el.dataset.section));}
 if(el.dataset.reveal){event.preventDefault();if(revealedItems.has(el.dataset.reveal))revealedItems.delete(el.dataset.reveal);else revealedItems.add(el.dataset.reveal);render();}
 if(el.hasAttribute('data-open-map')){event.preventDefault();openMap();}
 if(el.dataset.mapPoint){event.preventDefault();const code=el.dataset.mapRegion,node=regionMaps[code]?.nodes.find(n=>n.id===el.dataset.mapPoint);if(node&&view==='roadmap'&&mapKeys().includes(code)){if(mapRegion()!==code){mapContextRegion=code;mapSelection='';refreshMaps();}updateMapSelection(node.id,true);if(innerWidth<1280)openMap();}}
 if(el.dataset.mapStar){event.preventDefault();updateMapSelection(el.dataset.mapStar,true);}
 if(el.hasAttribute('data-map-star-clear')){event.preventDefault();mapSelection='';mapManualSelection=true;refreshMaps();}
 if(el.dataset.mapLocate){event.preventDefault();const target=el.dataset.mapLocate,code=targetMap(target);if(regionMaps[code]){if(mapRegion()!==code){mapContextRegion=code;mapSelection='';refreshMaps();}const node=regionMaps[code].nodes.find(n=>mapNodeMatches(n,target));if(node){updateMapSelection(node.id,true);if(innerWidth<1280)openMap();}}}
 if(el.dataset.mapNode){event.preventDefault();updateMapSelection(el.dataset.mapNode,true);if(el.dataset.mapTarget){$('map-dialog').close();pushLocation();goMapTarget(el.dataset.mapTarget);updateMapSelection(el.dataset.mapNode,true);}}
 if(el.dataset.stepLink){event.preventDefault();pushLocation();goStep(el.dataset.stepLink);}
 if(el.dataset.collectionRegionLink){event.preventDefault();pushLocation();goCollectionRegion(el.dataset.collectionRegionLink);}
 if(el.dataset.puzzleLink){event.preventDefault();pushLocation();goPuzzle(el.dataset.puzzleLink);}
 if(el.dataset.researchLink){event.preventDefault();pushLocation();goResearch(el.dataset.researchLink);}
 if(el.dataset.backup){backupTarget=el.dataset.backup;$('backup-node').textContent=data.steps.find(s=>s.id===backupTarget).title;$('backup-note').value=progress.backups[backupTarget]?.note||'';$('backup-ack').checked=false;$('backup-confirm').disabled=true;$('backup-dialog').showModal();}
 if(el.dataset.close)$(el.dataset.close).close();
});
document.addEventListener('change',event=>{const el=event.target;
 if(el.hasAttribute('data-map-layer')){if(mapKeys().includes(el.value)){const inDialog=!!el.closest('dialog');mapContextRegion=el.value;mapSelection='';mapManualSelection=true;refreshMaps();document.querySelector(inDialog?'#map-dialog [data-map-layer]':'.region-map-aside [data-map-layer]')?.focus({preventScroll:true});}}
 if(el.hasAttribute('data-map-fit'))el.closest('.region-map-panel').querySelector('.map-canvas').classList.toggle('map-fit',el.checked);
 if(el.hasAttribute('data-map-select'))updateMapSelection(el.value,true);
 if(el.dataset.collectionComplete)void action(()=>saveStep(collectionProgressId(el.dataset.collectionComplete),el.checked?'completed':'not_started'));
 if(el.dataset.artifactComplete)void action(()=>store.update(p=>{const id=el.dataset.artifactComplete,region=el.dataset.artifactRegion;if(!humanArtifacts.some(item=>item.id===id)||!artifactCandidates.some(site=>site.artifactId===id&&site.region===region))throw Error('遺物項目不相容，未寫入。');const key=artifactProgressId(id);p.steps[key]={...p.steps[key],status:el.checked?'completed':'not_started',...(el.checked?{foundIn:region}:{})};p.settings.playAnchor='step-region-'+region.toLowerCase();return p;}));
 if(el.dataset.collectionStar)void action(()=>saveStep(puzzleProgressId(el.dataset.collectionStar),el.checked?'completed':'not_started'));
 if(el.dataset.collectionCounter)void action(async()=>{const kind=el.dataset.collectionCounter,region=el.dataset.counterRegion,value=Number(el.value);if(!['text','artifact'].includes(kind)||!['STORY','SOCIAL',...collectionRegions.map(r=>r.code)].includes(region)||(['STORY','SOCIAL'].includes(region)&&kind!=='text')||!el.value.trim()||!Number.isSafeInteger(value)||value<0)throw Error('請輸入 0 或正整數。');await store.update(p=>{p.settings[counterKey(region,kind)]=value;if(collectionRegions.some(r=>r.code===region))p.settings.playAnchor='step-region-'+region.toLowerCase();else if(region==='SOCIAL')p.settings.playAnchor='step-field-basics';return p;});});
 if(el.dataset.waypointComplete&&storyWaypoints.some(w=>w.id===el.dataset.waypointComplete))void action(()=>saveStep(waypointProgressId(el.dataset.waypointComplete),el.checked?'completed':'not_started'));
 if(el.dataset.puzzleComplete)void action(()=>saveStep(puzzleProgressId(el.dataset.puzzleComplete),el.checked?'completed':'not_started'));
 if(el.dataset.complete)void action(()=>saveStep(el.dataset.complete,el.checked?'completed':'not_started'));
 if(el.dataset.trophy)void action(()=>store.update(p=>{p.trophies[el.dataset.trophy]={...p.trophies[el.dataset.trophy],earned:el.checked};return p;}));
 if(el.dataset.branch){openBranches.delete(el.dataset.branch);void action(()=>store.update(p=>{p.branches[el.dataset.branch]={...p.branches[el.dataset.branch],status:el.checked?'completed':'not_started'};return p;}));}
});
window.addEventListener('popstate',event=>{resetReadingTail();const url=new URL(location.href),saved=event.state?.talosUi;view=url.searchParams.get('view')||'roadmap';activeStage=url.searchParams.get('stage')||saved?.activeStage||progress.settings.currentStage;activeSection=url.searchParams.get('section')||saved?.activeSection||progress.settings.currentSection;mapSelection=saved?.mapSelection||'';mapContextRegion=saved?.mapContextRegion||'';query=saved?.query||'';filter=saved?.filter||'all';trophyQuery=saved?.trophyQuery||'';trophyFilter=saved?.trophyFilter||'all';if(saved){revealedItems.clear();for(const id of saved.revealed||[])revealedItems.add(id);render();requestAnimationFrame(()=>{readingTail=saved.readingTail||0;$('app').style.setProperty('--reading-tail',readingTail+'px');window.scrollTo(0,saved.scroll||0);});}else if(!followLocation())render();});
window.addEventListener('hashchange',()=>{if(progress&&!history.state?.talosUi)followLocation();});
window.addEventListener('focus',()=>{void refresh();});
window.addEventListener('scroll',scheduleReadingMap,{passive:true});
for(const type of ['wheel','touchmove'])window.addEventListener(type,()=>{mapManualSelection=false;},{passive:true});
window.addEventListener('keydown',event=>{if(['PageDown','PageUp','Home','End','ArrowDown','ArrowUp'].includes(event.key)&&!event.target.matches('input,select,textarea'))mapManualSelection=false;});
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
try{progress=await store.open();const stage=new URL(location.href).searchParams.get('stage');activeStage=data.stages.some(s=>s.id===stage)?stage:progress.settings.currentStage;activeSection=activeSection||progress.settings.currentSection;sync=setupSync(data,store,core,()=>{void refresh();});render();followLocation();}
catch(e){$('app').innerHTML='<h1>無法讀取本機進度</h1><p class="error">'+escape(e.message)+'</p><p>沒有重設資料。可先下載原始資料，再處理瀏覽器儲存設定。</p><button id="raw-recovery">下載原始儲存資料</button>';$('raw-recovery').onclick=()=>action(async()=>download(await store.exportAll(),'raw-recovery'));}
