import {checkedAt,sources,trophies,steps,stages,collectibles,regions,superWinConditions,ngRules} from './data.js';
import {config,world,run,player,collectionState,checklistRun,setCollection,ngMolarState,setNGMolarState,stampActor,addRun,runLabel,importData} from './model.js';
import {reportMapHtml,bindReportMap} from './map.js';
import {fieldMapHtml,bindFieldMap} from './field-map.js';
import {fieldById} from './field-map-catalog.js';
import {creaturesHtml,reportReferenceHtml,collectionTarget,defaultReportGroup,groups,reportItems,itemById,reportConditionItems,reportSource,mapSource} from './report.js';
import {mainTech,shopSource} from './chip-tech.js';
import {stepProgress,completedSteps,nextPendingStep,pendingItems,remixReview} from './roadmap-progress.js';
import {preparations} from './preparations.js';
import {weaponsHtml,armorHtml,shieldsHtml} from './gear.js';
import {smithingHtml} from './smithing.js';
import {mutationsHtml,recommendationsHtml,mutationRecommendationsHtml} from './playstyle.js';
import {chipsHtml} from './chips.js';
import {captureProgressEdits,revertProgressEdits} from './progress-edits.js';
import {matchesSearch} from './search.js';
import {ngMolarById} from './ng-molar-data.js';

const sharedPath=import.meta.url.includes('/dist/')?'../../../shared/roadmap-store.js':'../../shared/roadmap-store.js';
const {createStore}=await import(new URL(sharedPath,import.meta.url));
const core=window.SideProjectSync,$=id=>document.getElementById(id);
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const names={overview:'庭院總覽',roadmap:'遊玩路線圖',collectibles:'100% 收集清單',map:'100% 點位地圖',monsterMap:'怪物點位地圖',resourceMap:'採集點位地圖',creatures:'怪物弱點與抗性',trophies:'46 項獎盃',equipment:'裝備列表',weapons:'裝備列表',armor:'裝備列表',shields:'裝備列表',smithing:'裝備列表',mutations:'異變列表',recommendations:'推薦配裝',mutationBuilds:'推薦異變',chips:'晶片與解鎖',sources:'來源與查證'};
const warningLabels={critical:'不可逆／易錯過',branch:'分歧／備份',prep:'提前準備',recommended:'推薦體驗',later:'可延後'};
const verificationLabels={verified:'已查證',unverified:'待查證',conflicting:'來源有差異'};
let progress,review,ngBackupStamp,refreshPending=false;
const filterDefaults={search:'',reportGroup:defaultReportGroup,reportStatus:'pending',reportCondition:'',fieldType:'all',mapScope:null,mapRunId:'',mapGroup:'all',mapStatus:'pending',mapItem:'',mapBox:null,creatureKind:'all',damageColumn:'all',damageEffect:'all',trophyCategory:'all',trophyStatus:'pending',weaponHand:'all',weaponDamage:'all',weaponElement:'all',gearTier:'all',weaponKind:'all',water:'all',gearScope:'all',armorWeight:'all',armorTab:'sets',mutationCategory:'all',recommendationTab:'progression',targetKind:'all',buildSituation:'all',chipKind:'all',stage:'start',roadmapStatus:'all',conditionStatus:'all'};
const viewStates=new Map();
let filter,activeView,pendingPosition,lastEquipmentView='weapons',lastDefenseView='armor';
const isEquipment=name=>['weapons','armor','shields','smithing'].includes(name);
const undoStack=[];
const revealedSteps=new Set();
let readingScope='';
const scopeOf=p=>{const w=world(p);return [w.worldId,w.currentRunId,w.currentPlayerId].join(':');};
const usesProgress=()=>['overview','roadmap','collectibles','trophies','map'].includes(view());
const store=createStore(config,core,()=>{if(!progress)return;if(!refreshPending){refreshPending=true;queueMicrotask(async()=>{refreshPending=false;try{progress=await store.get();if(!usesProgress())return;if(view()==='roadmap'&&readingScope===scopeOf(progress)&&document.querySelector('.roadmap-step'))syncRoadmap();else render();}catch(e){message(e.message);}});}});
const date=value=>value?new Date(value).toLocaleString('zh-TW',{hour12:false}):'尚未記錄';
const links=urls=>`<div class="sources">${[...new Set(urls)].map(url=>`<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(Object.values(sources).find(s=>s.url===url)?.label||'資料來源')} ↗</a>`).join('')}</div>`;
const pageParams=()=>new URL(location.href).searchParams;
const view=()=>{
 const requested=pageParams().get('view');
 if(!requested||requested==='ngplus')return 'roadmap';
 if(requested==='equipment')return pageParams().get('kind')==='smithing'?'smithing':pageParams().get('kind')==='armor'?(pageParams().get('tab')==='shields'?'shields':'armor'):'weapons';
 return Object.hasOwn(names,requested)?requested:'overview';
};
function defaultFilters(name){
 return {...filterDefaults,gearScope:['weapons','shields'].includes(name)?'第一輪':'all'};
}
function activateView(name,reset=false){
 if(!viewStates.has(name))viewStates.set(name,{filter:defaultFilters(name),position:null});
 if(reset){
  const state=viewStates.get(name),{stage,armorTab,recommendationTab}=state.filter;
  state.filter={...defaultFilters(name),stage,armorTab,recommendationTab};
  state.position=null;
 }
 activeView=name;
 if(isEquipment(name))lastEquipmentView=name;
 if(['armor','shields'].includes(name))lastDefenseView=name;
 filter=viewStates.get(name).filter;
}
function capturePosition(){
 const rows=[...$('app').querySelectorAll('[id^="collect-"],[id^="trophy-"],[data-step-row],[data-weapon],[data-armor],[data-shield],[data-mutation],[data-chip]')];
 const anchor=rows.find(row=>row.getBoundingClientRect().bottom>0);
 return {scroll:scrollY,anchor:anchor?.id,offset:anchor?.getBoundingClientRect().top,focusId:$('app').contains(document.activeElement)?document.activeElement.id:'',
  openDetails:[...$('app').querySelectorAll('details[id][open]')].map(row=>row.id)};
}
function rememberView(){
 if(!activeView)return;
 viewStates.get(activeView).position=capturePosition();
 const {stage,armorTab,recommendationTab}=filter;
 history.replaceState({groundedView:activeView,navigation:{stage,armorTab,recommendationTab},position:capturePosition()},'',location.href);
}
function restorePosition(position){
 if(!position)return;
 for(const id of position.openDetails||[])if($(id))$(id).open=true;
 const anchor=position.anchor&&$(position.anchor);
 window.scrollTo(0,anchor?scrollY+anchor.getBoundingClientRect().top-position.offset:position.scroll);
}
activateView(view());
if(view()==='map'&&pageParams().has('item'))filter.mapStatus='all';
const stageFromUrl=()=>pageParams().get('view')==='ngplus'?'remix':pageParams().get('stage');
const nameWithEnglish=row=>`${escape(row.name)}${row.officialName&&row.officialName!==row.name?`<small class="english-name" lang="en">${escape(row.officialName)}</small>`:''}`;
const searchInput=(id,label)=>`<label class="search">${label}<input id="${id}" type="search" data-filter="search" value="${escape(filter.search)}"></label>`;
const regionName=id=>regions.find(r=>r.id===id)?.name||'區域待查證';
const options=(rows,current)=>rows.map(([value,label])=>`<option value="${escape(value)}" ${value===current?'selected':''}>${escape(label)}</option>`).join('');
const filterSelect=(id,label,rows,key)=>{
 if(['reportStatus','trophyStatus','targetKind','mapScope','mapStatus','chipKind','roadmapStatus','conditionStatus'].includes(key))return `<div class="filter-buttons" id="${id}" role="group" aria-label="${label}"><span>${label}</span><div>${rows.map(([value,text])=>`<button type="button" id="${id}-${value}" data-filter-choice="${key}" data-value="${value}" aria-pressed="${filter[key]===value}">${text}</button>`).join('')}</div></div>`;
 return `<label>${label}<select id="${id}" data-filter="${key}">${options(rows,filter[key])}</select></label>`;
};
const gearControls={get filter(){return filter;},select:filterSelect,search:searchInput,escape};
const stateOptions=current=>options([['missing','未取得'],['obtained','已取得'],['unknown','待確認']],current);
function message(text){$('feedback').textContent=text;}
async function action(fn){try{await fn();}catch(e){message(e.message);}}
async function update(fn,label='進度已更新'){
 const scope=scopeOf(progress);
 let changes=[];
 try{
  progress=await store.update(p=>{
   if(scopeOf(p)!==scope)throw Error('其他分頁已切換世界、周目或成員，請重新操作。');
   const before=core.clone(p);
   fn(p);
   changes=captureProgressEdits(before,p);
   return p;
  });
  if(changes.length){undoStack.push({changes,scope,label});if(undoStack.length>20)undoStack.shift();renderUndo();}
 }catch(error){
  try{progress=await store.get();}catch{}
  if(usesProgress()){if(view()==='roadmap'&&readingScope===scopeOf(progress))syncRoadmap();else render();}
  throw error;
 }
}
function renderUndo(){
 const entry=undoStack.at(-1);
 $('edit-notice').hidden=!entry;
 $('edit-label').textContent=entry?.label||'';
}
async function undoLast(){
 const entry=undoStack.at(-1);
 if(!entry||$('undo-last').disabled)return;
 $('undo-last').disabled=true;
 try{
  progress=await store.update(p=>{
   if(scopeOf(p)!==entry.scope)throw Error('請先切回原世界、成員及周目，再撤銷。');
   return revertProgressEdits(p,entry.changes);
  });
  const index=undoStack.indexOf(entry);
  if(index>=0)undoStack.splice(index,1);
  renderUndo();message('已撤銷該次操作。');
 }catch(error){message(error.message);}
 finally{$('undo-last').disabled=false;}
}
function go(next,extra={},hash='',patch={},forceReset=false){
 rememberView();
 if(next==='equipment'){
  if(extra.kind==='armor')next=extra.tab==='shields'?'shields':(extra.tab||extra.q?'armor':lastDefenseView);
  else next=['weapons','smithing'].includes(extra.kind)?extra.kind:lastEquipmentView;
 }
 const url=new URL(location.href);
 url.search='';
 url.searchParams.set('view',isEquipment(next)?'equipment':next);
 if(isEquipment(next))url.searchParams.set('kind',['weapons','smithing'].includes(next)?next:'armor');
 if(next==='shields')url.searchParams.set('tab','shields');
 const reset=forceReset||next!==activeView
  ||next==='armor'&&extra.tab&&extra.tab!==filter.armorTab
  ||next==='recommendations'&&extra.tab&&extra.tab!==filter.recommendationTab;
 activateView(next,reset);
 Object.assign(filter,patch);
 if(next==='map'&&['first','ng'].includes(extra.scope)&&filter.mapScope!==extra.scope)Object.assign(filter,{mapScope:extra.scope,mapGroup:'all',mapStatus:'pending',mapItem:'',mapBox:null,search:''});
 if(['monsterMap','resourceMap'].includes(next)&&extra.item)Object.assign(filter,{fieldType:'all',search:'',mapItem:extra.item,mapBox:null});
 if(next==='map'&&extra.item)Object.assign(filter,{mapScope:ngMolarById.has(extra.item)?'ng':'first',mapGroup:'all',mapStatus:'all',search:'',mapItem:extra.item,mapBox:null});
 if(['weapons','armor','shields','creatures'].includes(next)&&extra.q)Object.assign(filter,{...defaultFilters(next),gearScope:'all',search:extra.q});
 if(next==='armor')url.searchParams.set('tab',extra.tab||filter.armorTab);
 if(next==='recommendations'&&hash)filter.recommendationTab='progression';
 if(next==='mutations'&&hash.startsWith('mutation-'))Object.assign(filter,{search:'',mutationCategory:'all'});
 if(next==='chips'&&hash.startsWith('tech-'))Object.assign(filter,{search:'',chipKind:'all'});
 if(next==='roadmap')url.searchParams.set('stage',extra.stage||filter.stage);
 for(const [key,value]of Object.entries(extra))url.searchParams.set(key,value);
 url.hash=hash;
 history.pushState({},'',url);
 applyReferenceUrl();
 pendingPosition=hash?null:viewStates.get(next).position||{scroll:0};
 render();
 if(hash)focusItem(hash);
}
function header(){
 if(view()!=='roadmap')return `<div class="page-heading"><h1>${names[view()]}</h1></div>`;
 const r=run(progress),earned=trophies.filter(t=>player(progress).trophies[t.id]?.earned).length,done=superWinConditions.filter(c=>r.conditions[c.id]?.done).length;
 return `<div class="page-heading"><div><h1>${names[view()]}</h1><p class="scope">Grounded · ${runLabel(r)}</p></div><small>最後更新 <span id="updated-at">${date(progress.updatedAt)}</span></small></div><div class="stats"><button class="stat-link" data-missing-trophies><small>PlayStation 獎盃</small><strong id="trophy-count">${earned} / 46</strong><span class="stat-action">查看缺少獎盃 →</span></button><button class="stat-link" data-pending-roadmap><small>本周目路線圖</small><strong id="roadmap-count">${completedSteps(progress)} / ${steps.length}</strong><span class="stat-action">查看未完成步驟 →</span></button><button class="stat-link" data-pending-conditions><small>超級勝利核對</small><strong id="condition-count">${done} / ${superWinConditions.length}</strong><span class="stat-action">查看未確認條件 →</span></button><button class="stat-link" data-resume><small>下一步所在章節</small><strong id="next-stage-title" style="font-size:17px">${escape(stages.find(s=>s.id===nextStep()?.stageId)?.title||'已完成')}</strong><span class="stat-action">返回遊玩進度 →</span></button></div>`;
}
function overviewHtml(){
 return `<section class="panel overview-next"><h2>從橡樹實驗室到恢復體型</h2><p>七個章節列出主線、出發前裝備和白金需求。</p><button class="primary" data-go="roadmap">開啟遊玩路線圖</button></section><section><h2>收集索引</h2><div class="category-grid">${groups.map(g=>{const items=reportItems.filter(i=>i.group===g.id),done=items.filter(i=>checklistStatus(i)==='obtained').length;return `<div class="list-summary"><a href="?view=collectibles&group=${g.id}" data-category-link="${g.id}">${g.name}</a><button data-group-missing="${g.id}">已取得 ${done}／${items.length} · 缺 ${items.length-done}</button></div>`;}).join('')}</div></section>`;
}
function roadmapHtml(){
 const stage=stages.find(s=>s.id===filter.stage)||stages[0];
 const rows=steps.filter(s=>s.stageId===stage.id)
  .filter(s=>filter.roadmapStatus==='all'||stepProgress(progress,s).complete===(filter.roadmapStatus==='done'))
  .filter(s=>matchesSearch([s.title,s.action,s.experienceNote,preparations[s.id]||[],mainTech[s.id]||[],
   s.trophyIds.map(id=>{const t=trophies.find(t=>t.id===id);return [t.name,t.officialName];})],filter.search));
 return `<div class="roadmap-heading"><h2>${stage.number} · ${escape(stage.title)}</h2>${stage.id==='labs'?'<p class="muted">樹籬、池塘、霧靄區和黑蟻丘可依手邊的裝備安排順序。</p>':''}</div><div class="toolbar"><label class="search">搜尋本章地點／裝備／獎盃<input id="search" data-filter="search" value="${escape(filter.search)}" type="search"></label>${filterSelect('roadmap-status','步驟狀態',[['all','全部'],['pending','未完成'],['done','已完成']],'roadmapStatus')}<button id="resume-progress" ${nextStep()?'':'disabled'}>返回遊玩進度</button>${filter.search?'':stage.id==='audit'?'<a href="#super-win-matrix">前往超級勝利核對</a>':stage.id==='remix'?'<a href="#cycle-panel">切換周目或記錄乳牙</a>':''}</div>${rows.map(s=>{
  const state=stepProgress(progress,s),done=state.complete,compact=done&&!filter.search&&!revealedSteps.has(s.id),requiredItems=s.collectibleIds.filter(id=>collectibles.find(i=>i.id===id).requiredFor.length),optionalItems=s.collectibleIds.filter(id=>!requiredItems.includes(id));
  return `<article class="row roadmap-step ${done?'done':''}" id="step-${s.id}" data-step-row="${s.id}" data-complete="${done}" data-compact="${compact}"><div class="row-heading"><h3><label class="check-label"><input id="step-check-${s.id}" type="checkbox" data-step="${s.id}" aria-label="完成步驟目標：${escape(s.title)}" ${state.goalDone?'checked':''}>${escape(s.title)}</label></h3><div class="step-summary"><small class="step-state">${done?'完成':state.goalDone?'目標已完成':'未開始'}</small><small class="step-count">${state.completed} / ${state.total} 項</small><button type="button" class="step-peek" data-step-peek="${s.id}" aria-controls="body-step-${s.id}" aria-expanded="${!compact}" ${!done||filter.search?'hidden':''}>${compact?'查看詳情':'收起詳情'}</button></div></div><div class="metadata"><span>${regionName(s.regionId)}</span><span class="step-warning ${s.warning}">${warningLabels[s.warning]}</span><span>${verificationLabels[s.verification]}</span></div>${['critical','branch'].includes(s.warning)?`<p class="persistent-warning" ${compact?'':'hidden'}>${escape(s.action)}</p>`:''}<div id="body-step-${s.id}" class="step-content" ${compact?'hidden':''}><section class="step-goal"><h4>步驟目標</h4><p>${escape(s.action)}</p></section>${preparationHtml(s.id)}${chipTechHtml(s.id)}<section class="step-experience"><h4>完整體驗</h4><p>${escape(s.experienceNote)}</p>${s.prerequisites.length?`<p class="muted">前置參考：${s.prerequisites.map(id=>escape(steps.find(t=>t.id===id).title)).join('、')}</p>`:''}${optionalItems.length?collectionChecklist(optionalItems,'experience-'+s.id):''}</section><section class="step-platinum"><h4>白金需求</h4>${s.trophyIds.length?trophyChecklist(s.trophyIds,s.id):`<p class="muted">${s.platinum?'這一步沒有對應的獨立獎盃，依主線及收集需求繼續推進。':'本步為完整體驗建議，沒有獨立獎盃條件。'}</p>`}${requiredItems.length?`<h5>相關收集</h5>${collectionChecklist(requiredItems,s.id)}`:''}</section>${links(s.sourceUrls)}</div></article>`;
 }).join('')||'<p class="empty">沒有符合條件的步驟。</p>'}${filter.search?'':stage.id==='audit'?matrixHtml():stage.id==='remix'?ngHtml():''}`;
}

function preparationHtml(id){
 const route=preparations[id];
 if(!route)return '';
 return `<section class="route-pair" aria-label="出發前準備與行進路線">
 <div><h4>先取得／準備</h4><p>${escape(route[0])}</p></div>
 <div><h4>再前往</h4><p>${escape(route[1])}</p></div>
 </section>`;
}
function chipTechHtml(stepId){
 const unlocks=mainTech[stepId];
 if(!unlocks)return '';
 return `<section class="chip-tech"><h4>晶片與重點解鎖</h4><dl>${unlocks.map(([name,detail])=>`<dt>${escape(name)}</dt><dd>${escape(detail)}</dd>`).join('')}</dl>
 <a href="${escape(shopSource)}" target="_blank" rel="noopener noreferrer">科學商店解鎖表 ↗</a></section>`;
}

function matrixHtml(){
 const r=run(progress);
 return `<section class="panel" id="super-win-matrix"><h2>超級勝利核對</h2><p>按第一輪遊戲報告卡逐類查漏。金卡無須全收集。</p>
  <div class="toolbar">${filterSelect('condition-status','條件狀態',[['all','全部'],['pending','未完成'],['done','已完成']],'conditionStatus')}</div><div class="matrix">${superWinConditions.filter(c=>filter.conditionStatus==='all'||Boolean(r.conditions[c.id]?.done)===(filter.conditionStatus==='done')).map(c=>{
   const items=reportConditionItems(c,r.level);
   const compact=Boolean(r.conditions[c.id]?.done)&&!pendingItems(progress,items).length;
   return `<div class="row" data-condition-row="${c.id}">
    <label class="check-label"><input id="condition-${c.id}" data-condition="${c.id}" type="checkbox" ${r.conditions[c.id]?.done?'checked':''}>
    <span><strong>${c.title}</strong><small class="check-description">${escape(c.detail)}</small></span></label>
    ${items.length?`<details id="condition-items-${c.id}" data-complete="${compact}" ${compact?'':'open'}><summary data-condition-summary="${c.id}">${conditionSummary(items)}</summary>
     ${collectionChecklist(items.map(i=>i.id),'audit-'+c.id)}</details>`:''}
    ${items.length?`<a href="?view=collectibles&amp;condition=${c.id}" data-missing-condition="${c.id}">查看此條件缺項</a>`:''}${c.stepId?`<button data-step-link="${c.stepId}">前往對應攻略</button>`:''}
    ${c.id==='molars'&&r.level?'<button data-roadmap-jump="remix" data-target="ng-molars">核對本周目隨機乳牙</button>':''}
   </div>`;
  }).join('')}</div>${links([sources.report.url,sources.official.url])}
 </section><details><summary>舊版池塘乳牙紀錄</summary><p>池塘沉木旁的網尚待比對新版點位。</p>${collectionChecklist(['milk-pond-net'],'legacy-audit')}</details><section class="panel" id="platinum-check"><h2>白金獎盃</h2>${trophyChecklist(['gnats-all-folks'],'audit')}</section>`;
}

function conditionSummary(items){
 return `展開明細 · 待核對 ${pendingItems(progress,items).length}／${items.length}`;
}
function trophyHtml(){
 const earned=t=>player(progress).trophies[t.id]?.earned===true;
 const earnedCount=trophies.filter(earned).length;
 const rows=trophies.filter(t=>(filter.trophyCategory==='all'||t.category===filter.trophyCategory)
  && (filter.trophyStatus==='all'||earned(t)===(filter.trophyStatus==='earned'))
  && matchesSearch([t.name,t.officialName,t.condition],filter.search));
 return `<div class="trophy-summary" aria-live="polite"><button data-trophy-status="earned">已取得 ${earnedCount}／${trophies.length}</button><button data-trophy-status="pending">缺 ${trophies.length-earnedCount} 個</button></div>
 <div class="toolbar">${searchInput('trophy-search','搜尋中／英文名稱或條件')}
 ${filterSelect('trophy-status','取得狀態',[['all','全部'],['pending','尚未取得'],['earned','已取得']],'trophyStatus')}
 ${filterSelect('trophy-category','分類',[['all','全部分類'],['story','故事'],['combat','戰鬥'],['craft','製作／基地'],['explore','探索'],['collection','收集'],['ngplus','NG+'],['meta','白金']],'trophyCategory')}</div>
 ${rows.map(t=>{
  const step=steps.find(s=>s.trophyIds.includes(t.id));
  return `<article id="trophy-${t.id}" class="row"><div class="row-heading"><h2><label class="check-label"><input id="trophy-ref-${t.id}" type="checkbox" data-trophy="${t.id}" ${earned(t)?'checked':''}><span>${nameWithEnglish(t)}</span></label></h2>
   <small>${{platinum:'白金',gold:'金',silver:'銀',bronze:'銅'}[t.grade]} · ${verificationLabels[t.verification]}</small></div>
   <p>${escape(t.condition)}</p>${t.risk?`<p class="risk">${escape(t.risk)}</p>`:''}
   ${['super-win','gnats-all-folks'].includes(t.id)?'<p><a href="?view=collectibles" data-go="collectibles">查看 100% 通關清單</a></p>':''}
   ${step?`<button data-step-link="${step.id}">前往路線圖 · ${escape(step.title)}</button>`:'<button data-roadmap-jump="audit" data-target="platinum-check">前往路線圖 · 白金</button>'}
  </article>`;
 }).join('')||'<p class="empty">沒有符合的獎盃。</p>'}${links([sources.bwikiTrophies.url,sources.ps.url])}`;
}
function remixPendingHtml(){
 const review=remixReview(progress);
 return `<div id="remix-pending"><h3>第一輪未確認事項</h3><p>這是本站人工紀錄，不代表遊戲 REMIX.R 已可啟動。只有 PSN 實際跳盃才能勾選個人獎盃。</p><p>${review.firstRun?'第一輪 超級勝利 分類尚未確認：'+review.pendingConditions.length+' / '+superWinConditions.length:'找不到第一輪紀錄，請回原存檔核對。'}</p><p>${review.pendingConditions.map(c=>escape(c.title)).join('、')||'分類皆已人工勾選；資料庫仍未齊，請確認遊戲實際評分。'}</p><p>第一輪個人獎盃尚未確認：${review.pendingTrophies.length} / ${review.baseTrophies.length}（不含白金與兩個 NG+ 盃）。</p><p>${review.pendingTrophies.map(t=>escape(t.name)).join('、')||'第一輪個人獎盃已手動確認。'}</p><button data-roadmap-jump="audit" data-target="super-win-matrix">前往 100% 查漏</button></div>`;
}
function ngHtml(){const w=world(progress),r=run(progress);return `<div class="toolbar" id="cycle-panel"><label>瀏覽周目<select id="run-select">${options(Object.entries(w.runs).map(([id,r])=>[id,runLabel(r)]),w.currentRunId)}</select></label></div><section class="panel"><h2>REMIX.R 前驗收</h2><p>這裡只建立網站清單，不操作遊戲存檔。舊周目完整保留，可隨時切回查看。</p>${['broodmother','mantis','wasp-queen','javamatic'].map(id=>`<p><span data-remix-step="${id}">${r.steps[id]?.done?'目標已手動記錄':'目標未手動記錄'}</span> · ${escape(steps.find(s=>s.id===id).title)}</p>`).join('')}<div class="warning">先在遊戲保留可辨識的存檔。確認第一輪超級勝利後再啟動 REMIX.R，能減少新周目的收集負擔。</div>${remixPendingHtml()}<button id="ng-backup">下載網站周目切換前備份</button><label class="check-label"><input id="ng-ack" type="checkbox">我已保存下載檔，並已在遊戲啟動 REMIX.R，現在要建立下一周目清單</label><button id="ng-create" disabled>建立下一個 NG+ 清單</button></section><section><h2>繼承／重置規則</h2>${ngRules.map(rule=>`<article class="row"><h3>${rule.title}</h3><p>${rule.detail}</p>${links([sources[rule.source].url])}</article>`).join('')}</section><section class="panel" id="ng-molars"><h2>本周目隨機乳牙記錄</h2><p>社群資料為每輪 66 顆、從 219 個候選位置中選出；候選不是必收數量。地圖已提供 219 個候選點，可依 NG+ 周目分開勾選。下方保留遊戲內核對的手動總數，不會被地圖勾選覆寫。</p>${r.level?`<div class="form-grid"><label>已核對取得數<input id="ng-molar-count" type="number" min="0" max="999" step="1" value="${r.ngMolars.count}"></label><label>核對狀態<select id="ng-molar-status">${stateOptions(r.ngMolars.status)}</select></label></div>`:'<p>目前是第一輪；普通乳牙請在本路線圖的 100% 查漏逐項記錄。進入 NG+ 後才啟用此獨立計數。</p>'}<p><a href="?view=map&amp;scope=ng">開啟 NG+ 乳牙候選地圖</a></p>${links([sources.ng.url])}</section>`;}
function sourcesHtml(){
 return `<section class="definition"><h2>資料基準 · ${checkedAt}</h2>
 <p>PS4／PS5 獎盃來自公開 46 盃清單。第一輪報告卡索引、生物抗性和晶片科技以 BWIKI 為主。地圖採 MapGenie 逐點座標。</p>
 <p>NG+ 乳牙候選序號、圖上位置與路線事實來自 Grounded Wiki 的 NG+ 乳牙地圖（修訂 50346），經公開 GroundedMolar 指南轉錄核對；本站重述為繁中並補共用入口。與 BWIKI 序號不同。來源圖點位是概略定位，未宣稱遊戲 XYZ 或洞穴入口已逐點實測。</p>
 <div class="sources"><a href="https://grounded.fandom.com/wiki/Map:Ng_plus_molar?oldid=50346">Grounded Wiki NG+ 原圖</a><a href="https://github.com/gcaraman/GroundedMolar/blob/main/docs/MOLAR_GUIDE_AUDIT.md">GroundedMolar 轉錄查證</a><a href="https://www.fandom.com/licensing">原 Wiki 文字與本頁相應改寫：CC BY-SA</a></div>
 <p>地標、收集與防守可能共用點位，資料頁各自核對。遊戲內的 100% 報告卡是完成依據。部分劇情獎勵、沒有固定點位的生物及購買項目在清單查閱。PS5 跳盃待實機確認。</p>
 <p>本機使用 Grounded 獨立 IndexedDB，完整備份包含未知資料、快照及匯入兩端原文。</p>
 <p>Grounded © Microsoft Corporation。Game Companion 是依 Microsoft 遊戲內容使用規則使用 Grounded 素材的非官方玩家工具。Grounded、Obsidian Entertainment 及相關標誌為 Obsidian Entertainment, Inc. 的商標或註冊商標。本站內容由玩家社群整理，與 Microsoft、Obsidian Entertainment 及 Grounded 製作團隊無隸屬或認可關係，也不代表其觀點。</p>
 <div class="sources"><a href="https://www.xbox.com/en-us/developers/rules">Microsoft 遊戲內容使用規則</a><a href="https://www.obsidian.net/legal/ip-use">Obsidian 玩家創作規範</a><a href="https://wiki.biligame.com/grounded/互动地图">BWIKI 互動地圖與原圖示</a></div>
 <div class="sources"><a href="${reportSource}">BWIKI 報告卡</a><a href="${shopSource}">BWIKI 科學商店</a><a href="${mapSource}">MapGenie 點位</a></div>
 </section><section>${Object.values(sources).map(s=>`<article class="row"><h3>${escape(s.label)}</h3><a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">開啟來源 ↗</a></article>`).join('')}</section>`;
}
function collectiblesHtml(){
 const activeRun=run(progress);
 const hasFirstRun=Object.values(world(progress).runs).some(r=>r.level===0);
 const scopeLabel=!['all','molars'].includes(filter.reportGroup)?runLabel(activeRun)
  :hasFirstRun?'普通乳牙勾選記在第一輪':'此世界沒有第一輪紀錄';
 return reportReferenceHtml({...gearControls,scopeLabel,statusOf:item=>{
  const selectedRun=checklistRun(progress,item);
  return selectedRun?collectionState(progress,item,selectedRun):null;
 }});
}

function render(){
 if(progress&&view()==='map'){
  filter.mapScope ||= run(progress).level?'ng':'first';
  const runs=mapRuns();
  if(!runs.some(([id])=>id===filter.mapRunId))filter.mapRunId=runs.some(([id])=>id===world(progress).currentRunId)?world(progress).currentRunId:runs.at(-1)?.[0]||'';
 }
 if(!progress&&usesProgress()){
  if(progressError){renderProgressError();return;}
  $('app').innerHTML='<p role="status">正在讀取本機進度…</p>';
  void loadProgress().then(()=>{if(usesProgress())render();});
  return;
 }
 if(view()==='roadmap'&&readingScope!==scopeOf(progress)){revealedSteps.clear();readingScope=scopeOf(progress);}
 if(view()==='roadmap')for(const step of steps)if(!stepProgress(progress,step).complete)revealedSteps.delete(step.id);
 const active=document.activeElement,focusId=active?.id,selection=typeof active?.selectionStart==='number'?[active.selectionStart,active.selectionEnd]:null;
 const position=capturePosition(),activeTop=active?.getBoundingClientRect().top;
 const controls=[...$('app').querySelectorAll('[data-collect-check],[data-ng-absent],[data-trophy],[data-step],[data-condition],[data-map-list]')];
 const controlIndex=controls.indexOf(active);
 const neighborIds=controlIndex<0?[]:[...controls.slice(controlIndex+1),...controls.slice(0,controlIndex).reverse()].map(node=>node.id).filter(Boolean);
 $('app').innerHTML=header()+({overview:overviewHtml,roadmap:roadmapHtml,collectibles:collectiblesHtml,map:()=>reportMapHtml({...gearControls,selectedId:filter.mapItem,statusOf:mapStatus,ngRuns:mapRuns()}),monsterMap:()=>fieldMapHtml('creature',gearControls),resourceMap:()=>fieldMapHtml('resource',gearControls),creatures:()=>creaturesHtml(gearControls),trophies:trophyHtml,weapons:()=>weaponsHtml(gearControls),armor:()=>armorHtml(gearControls),shields:()=>shieldsHtml(gearControls),smithing:smithingHtml,mutations:()=>mutationsHtml(gearControls),recommendations:()=>recommendationsHtml(gearControls),mutationBuilds:()=>mutationRecommendationsHtml(gearControls),chips:()=>chipsHtml(gearControls),sources:sourcesHtml}[view()]());
 if(!['overview','sources','smithing'].includes(view())&&(view()!=='recommendations'||['targets','fixed'].includes(filter.recommendationTab)))$('app').insertAdjacentHTML('afterbegin',`<div class="view-actions"><button id="reset-view">重設搜尋與篩選</button></div>`);
 document.querySelectorAll('[data-view]').forEach(a=>{if(a.dataset.view===view()||(a.dataset.view==='equipment'&&isEquipment(view())))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 document.querySelectorAll('[data-stage]').forEach(a=>{if(view()==='roadmap'&&a.dataset.stage===filter.stage)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});
 if(focusId&&$(focusId)){$(focusId).focus({preventScroll:true});if(selection&&$(focusId).setSelectionRange)try{$(focusId).setSelectionRange(...selection);}catch{}}
 else if(controlIndex>=0){
  const fallback=neighborIds.map(id=>$(id)).find(Boolean)||$('collection-results')||$('app');
  fallback.focus({preventScroll:true});
  const anchor=fallback.closest('li,article,[data-map-list]')||fallback;
  position.anchor=anchor.id;position.offset=activeTop??position.offset;
 }
 restorePosition(position);
 updateChapterCounts();bindControls();if(view()==='map')bindReportMap({
  filter,escape,statusOf:mapStatus,onDetail:bindControls,onSelect:id=>{
   filter.mapItem=id;
   const url=new URL(location.href);url.searchParams.set('item',id);history.replaceState({},'',url);
  },onCollection:id=>{
   const {group,hash}=collectionTarget(itemById(id));
   go('collectibles',{group},hash,{reportGroup:group,reportStatus:'all',reportCondition:'',search:''});
  }
 });
 if(['monsterMap','resourceMap'].includes(view()))bindFieldMap(view()==='monsterMap'?'creature':'resource',{filter,escape,onSelect:id=>{filter.mapItem=id;const url=new URL(location.href);url.searchParams.set('item',id);history.replaceState({},'',url);}});
 if(pendingPosition){
  const target=pendingPosition;
  pendingPosition=null;
  requestAnimationFrame(()=>{
   restorePosition(target);
   (target.focusId&&$(target.focusId)||$('app')).focus({preventScroll:true});
  });
 }
}
function checklistStatus(item){
 const selectedRun=checklistRun(progress,item);
 return selectedRun?collectionState(progress,item,selectedRun):null;
}
function mapRuns(){return Object.entries(world(progress).runs).filter(([,r])=>r.level>0).sort((a,b)=>a[1].level-b[1].level).map(([id,r])=>[id,runLabel(r)]);}
function mapStatus(item){
 if(item.category!=='ng-milk')return checklistStatus(item);
 const selectedRun=world(progress).runs[filter.mapRunId];
 return ngMolarState(progress,item,selectedRun);
}
function focusItem(id){
 const scrollToItem=()=>requestAnimationFrame(()=>{
  const target=$(id);
  if(!target)return;
  target.scrollIntoView({block:['app','super-win-matrix','platinum-check','ng-molars','collection-results'].includes(id)?'start':'center'});
  const focus=target.querySelector('[data-condition],[data-collect-check],[data-trophy],[data-step]')
   ||target.querySelector('input,select,button,a');
  (focus??target).focus({preventScroll:true});
 });
 if(usesProgress()&&!progress)void loadProgress().then(scrollToItem);
 else scrollToItem();
}
function updateChapterCounts(){
 document.querySelectorAll('[data-stage-count]').forEach(label=>{
  const items=steps.filter(step=>step.stageId===label.dataset.stageCount);
  label.textContent=view()==='roadmap'&&progress?items.filter(step=>stepProgress(progress,step).complete).length+' / '+items.length:'';
 });
}
function syncRoadmap(){
 if(filter.roadmapStatus!=='all'||filter.stage==='audit'&&filter.conditionStatus!=='all'){render();return;}
 // 保留原位 DOM 與焦點；全完成時才收斂，不自動捲至下一步。
 const active=document.activeElement,activeRow=active?.closest('.roadmap-step,[data-condition-row]'),rect=active?.getBoundingClientRect();
 let anchor=activeRow&&rect.top>=0&&rect.bottom<=innerHeight?active:[...document.querySelectorAll('.roadmap-step')].find(row=>{const box=row.getBoundingClientRect();return box.bottom>0&&box.top<innerHeight;});
 const top=anchor?.getBoundingClientRect().top;
 document.querySelectorAll('[data-step-row]').forEach(row=>{
  const step=steps.find(step=>step.id===row.dataset.stepRow),state=stepProgress(progress,step);
  if(!state.complete)revealedSteps.delete(step.id);
  const compact=state.complete&&!filter.search&&!revealedSteps.has(step.id);
  row.dataset.complete=String(state.complete);row.dataset.compact=String(compact);row.classList.toggle('done',state.complete);
  row.querySelector('[data-step]').checked=state.goalDone;
  row.querySelector('.step-state').textContent=state.complete?'完成':state.goalDone?'目標已完成':'未開始';
  row.querySelector('.step-count').textContent=state.completed+' / '+state.total+' 項';
  const peek=row.querySelector('[data-step-peek]');peek.hidden=!state.complete||!!filter.search;peek.textContent=compact?'查看詳情':'收起詳情';peek.setAttribute('aria-expanded',String(!compact));
  row.querySelector('.step-content').hidden=compact;
  const warning=row.querySelector('.persistent-warning');if(warning)warning.hidden=!compact;
 });
 document.querySelectorAll('[data-trophy]').forEach(input=>input.checked=player(progress).trophies[input.dataset.trophy]?.earned===true);
 document.querySelectorAll('[data-collect-check]').forEach(input=>input.checked=collectionState(progress,itemById(input.dataset.collectCheck))==='obtained');
 document.querySelectorAll('[data-collection-pending]').forEach(label=>label.hidden=collectionState(progress,itemById(label.dataset.collectionPending))!=='unknown');
 $('trophy-count').textContent=trophies.filter(t=>player(progress).trophies[t.id]?.earned).length+' / 46';
 $('roadmap-count').textContent=completedSteps(progress)+' / '+steps.length;
 $('condition-count').textContent=superWinConditions.filter(c=>run(progress).conditions[c.id]?.done).length+' / '+superWinConditions.length;
 $('next-stage-title').textContent=stages.find(stage=>stage.id===nextStep()?.stageId)?.title||'已完成';
 $('updated-at').textContent=date(progress.updatedAt);$('resume-progress').disabled=!nextStep();updateChapterCounts();
 document.querySelectorAll('[data-condition]').forEach(input=>input.checked=run(progress).conditions[input.dataset.condition]?.done===true);
 document.querySelectorAll('[data-condition-summary]').forEach(label=>{
  const condition=superWinConditions.find(c=>c.id===label.dataset.conditionSummary);
  label.textContent=conditionSummary(reportConditionItems(condition,run(progress).level));
  const rows=reportConditionItems(condition,run(progress).level);
  const details=label.closest('details');
  const complete=Boolean(run(progress).conditions[condition.id]?.done)&&!pendingItems(progress,rows).length;
  if(complete)details.open=false;
  else if(details.dataset.complete==='true')details.open=true;
  details.dataset.complete=String(complete);
 });
 const currentRun=run(progress);
 if($('ng-molar-count'))$('ng-molar-count').value=currentRun.ngMolars.count;
 if($('ng-molar-status'))$('ng-molar-status').value=currentRun.ngMolars.status;
 document.querySelectorAll('[data-remix-step]').forEach(label=>label.textContent=currentRun.steps[label.dataset.remixStep]?.done?'目標已手動記錄':'目標未手動記錄');
 const pending=$('remix-pending');
 if(pending){pending.outerHTML=remixPendingHtml();bindRoadmapJumps($('remix-pending'));}
 if(activeRow&&!active.getClientRects().length){const fallback=activeRow.querySelector('[data-step],[data-condition]');fallback.focus({preventScroll:true});if(anchor===active)anchor=fallback;}
 if(anchor&&top!==undefined)window.scrollBy(0,anchor.getBoundingClientRect().top-top);
}
function bindRoadmapJumps(root=document){
 root.querySelectorAll('[data-roadmap-jump]').forEach(button=>button.onclick=()=>{
  go('roadmap',{stage:button.dataset.roadmapJump},button.dataset.target,{search:'',roadmapStatus:'all',conditionStatus:'all'});
 });
}

function bindControls(){
 bindRoadmapJumps();
 document.querySelectorAll('[data-clear-condition]').forEach(button=>button.onclick=()=>{
  filter.reportCondition='';const url=new URL(location.href);url.searchParams.delete('condition');history.replaceState({},'',url);render();
 });
 if($('reset-view'))$('reset-view').onclick=()=>{
  Object.assign(filter,{...defaultFilters(activeView),stage:filter.stage,armorTab:filter.armorTab,mapScope:filter.mapScope,mapRunId:filter.mapRunId,recommendationTab:filter.recommendationTab});
  const url=new URL(location.href);url.search='';url.searchParams.set('view',activeView);url.hash='';
  if(activeView==='roadmap')url.searchParams.set('stage',filter.stage);
  if(activeView==='recommendations')url.searchParams.set('tab',filter.recommendationTab);
  if(activeView==='map'){url.searchParams.set('scope',filter.mapScope);if(filter.mapRunId)url.searchParams.set('run',filter.mapRunId);}
  history.replaceState({},'',url);render();
 };
 document.querySelectorAll('[data-missing-trophies]').forEach(button=>button.onclick=()=>go('trophies',{},'',{trophyStatus:'pending',trophyCategory:'all',search:''}));
 document.querySelectorAll('[data-pending-roadmap]').forEach(button=>button.onclick=()=>{
  const next=nextStep();
  go('roadmap',{stage:next?.stageId||filter.stage},'',{roadmapStatus:'pending',search:''});
 });
 document.querySelectorAll('[data-pending-conditions]').forEach(button=>button.onclick=()=>go('roadmap',{stage:'audit'},'super-win-matrix',{conditionStatus:'pending',search:''}));
 document.querySelectorAll('[data-resume]').forEach(button=>button.onclick=resumeProgress);
 document.querySelectorAll('[data-trophy-status]').forEach(button=>button.onclick=()=>{filter.trophyStatus=button.dataset.trophyStatus;render();});
 document.querySelectorAll('[data-report-status]').forEach(button=>button.onclick=()=>{filter.reportStatus=button.dataset.reportStatus;render();});
 document.querySelectorAll('[data-group-missing]').forEach(button=>button.onclick=()=>go('collectibles',{group:button.dataset.groupMissing},'',{reportStatus:'pending',reportCondition:'',search:''}));
 document.querySelectorAll('[data-missing-condition]').forEach(link=>link.onclick=e=>{
  e.preventDefault();go('collectibles',{condition:link.dataset.missingCondition},'',{reportCondition:link.dataset.missingCondition,reportGroup:'all',reportStatus:'pending',search:''});
 });
 document.querySelectorAll('[data-step-peek]').forEach(button=>button.onclick=()=>{const id=button.dataset.stepPeek;if(revealedSteps.has(id))revealedSteps.delete(id);else revealedSteps.add(id);syncRoadmap();});
 if($('resume-progress'))$('resume-progress').onclick=resumeProgress;
 document.querySelectorAll('[data-filter]').forEach(input=>input.addEventListener(input.tagName==='INPUT'?'input':'change',()=>{filter[input.dataset.filter]=input.value;if(['monsterMap','resourceMap'].includes(view())){filter.mapItem='';filter.mapBox=null;const url=new URL(location.href);url.searchParams.delete('item');history.replaceState({},'',url);}if(input.dataset.filter==='mapRunId'){filter.mapItem='';filter.mapBox=null;const url=new URL(location.href);url.searchParams.set('run',input.value);url.searchParams.delete('item');history.replaceState({},'',url);}if(view()==='collectibles'){const url=new URL(location.href);url.searchParams.delete('page');url.hash='';history.replaceState({},'',url);}render();}));
 document.querySelectorAll('[data-filter-choice]').forEach(button=>button.onclick=()=>{
  filter[button.dataset.filterChoice]=button.dataset.value;
  if(button.dataset.filterChoice==='mapScope'){
   Object.assign(filter,{mapGroup:'all',mapItem:'',mapBox:null,search:'',mapStatus:'pending'});
   const url=new URL(location.href);url.searchParams.set('scope',filter.mapScope);url.searchParams.delete('item');history.replaceState({},'',url);
  }
  if(view()==='collectibles'){const url=new URL(location.href);url.hash='';history.replaceState({},'',url);}
  render();
 });
 document.querySelectorAll('[data-go]').forEach(b=>b.onclick=e=>{e.preventDefault();go(b.dataset.go);});
 document.querySelectorAll('[data-step-link]').forEach(b=>b.onclick=()=>{const s=steps.find(s=>s.id===b.dataset.stepLink);go('roadmap',{stage:s.stageId},'step-'+s.id,{search:'',roadmapStatus:'all'});});
 document.querySelectorAll('[data-audit]').forEach(link=>link.onclick=e=>{
  e.preventDefault();go('roadmap',{stage:'audit'},'super-win-matrix',{search:'',roadmapStatus:'all',conditionStatus:'all'});
 });
 document.querySelectorAll('[data-category-link]').forEach(link=>link.onclick=e=>{
  e.preventDefault();go('collectibles',{group:link.dataset.categoryLink},'',{reportCondition:''});
 });
 document.querySelectorAll('[data-equipment-tab]').forEach(link=>link.onclick=e=>{
  if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  e.preventDefault();go('equipment',{kind:link.dataset.equipmentTab});
 });
 document.querySelectorAll('[data-armor-tab]').forEach(link=>link.onclick=e=>{
  if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  e.preventDefault();go(link.dataset.armorTab==='shields'?'shields':'armor',{tab:link.dataset.armorTab},'',{armorWeight:'all'});
 });
 document.querySelectorAll('[data-locate]').forEach(link=>link.onclick=e=>{
  e.preventDefault();go('map',{item:link.dataset.locate},'',{mapItem:link.dataset.locate,mapGroup:'all',mapStatus:'all',search:'',mapBox:null});
 });
 document.querySelectorAll('[data-step]').forEach(input=>input.onchange=()=>{const done=input.checked,id=input.dataset.step;void action(()=>update(p=>{const rows=run(p).steps;rows[id]={...rows[id],done,completedAt:done?Date.now():null,...stampActor(p)};},(done?'完成目標 · ':'取消目標 · ')+steps.find(row=>row.id===id).title));});
 document.querySelectorAll('[data-trophy]').forEach(input=>input.onchange=()=>{const earned=input.checked,id=input.dataset.trophy;void action(()=>update(p=>{const rows=player(p).trophies;rows[id]={...rows[id],earned,...stampActor(p)};},(earned?'取得獎盃 · ':'取消獎盃 · ')+trophies.find(row=>row.id===id).name));});
 document.querySelectorAll('[data-collect-check]').forEach(input=>input.onchange=()=>{const status=input.checked?'obtained':'missing',item=itemById(input.dataset.collectCheck);const fromReference=['collectibles','map'].includes(view()),mapRunId=filter.mapRunId;
  void action(()=>update(p=>{
    const selectedRun=item.category==='ng-milk'?world(p).runs[mapRunId]:fromReference?checklistRun(p,item):run(p);
    if(item.category==='ng-milk'&&!selectedRun?.level)throw Error('請先建立並選擇 NG+ 周目');
    if(!selectedRun)throw Error('找不到第一輪紀錄');
    if(item.category==='ng-milk')setNGMolarState(p,item,status==='obtained'?'obtained':'pending',selectedRun);
    else setCollection(p,item,status,selectedRun);
   },(status==='obtained'?'已取得 · ':'取消取得 · ')+item.name));});
 document.querySelectorAll('[data-ng-absent]').forEach(input=>input.onchange=()=>{
  const item=itemById(input.dataset.ngAbsent),absent=input.checked,mapRunId=filter.mapRunId;
  void action(()=>update(p=>setNGMolarState(p,item,absent?'absent':'pending',world(p).runs[mapRunId]),(absent?'找過但沒生成 · ':'恢復尚未查明 · ')+item.name));
 });
 document.querySelectorAll('[data-condition]').forEach(input=>input.onchange=()=>{const done=input.checked,id=input.dataset.condition;void action(()=>update(p=>{const rows=run(p).conditions;rows[id]={...rows[id],done,...stampActor(p)};}));});
 for(const [id,key,group]of [['run-select','currentRunId','runs']])if($(id))$(id).onchange=e=>{const value=e.target.value;void action(()=>update(p=>{const w=world(p);if(!Object.hasOwn(w[group],value))throw Error('找不到記錄');w[key]=value;}));};
 if($('ng-backup'))$('ng-backup').onclick=()=>void action(async()=>{const raw=await store.stamp();download(JSON.parse(raw),'before-ng');ngBackupStamp=raw;message('下載已發起；請開啟檔案確認保存，再建立周目。');});
 if($('ng-ack'))$('ng-ack').onchange=()=>{$('ng-create').disabled=!$('ng-ack').checked||!ngBackupStamp;};
 if($('ng-create'))$('ng-create').onclick=()=>void action(async()=>{if(!$('ng-ack').checked||!ngBackupStamp)throw Error('請先備份並確認');await store.checkpoint('新增 NG+ 前');await store.update(p=>{addRun(p);return p;},ngBackupStamp);ngBackupStamp=null;message('新周目已建立；第一輪原始記錄保留。');});
 for(const [id,key]of [['ng-molar-count','count'],['ng-molar-status','status']])if($(id))$(id).onchange=e=>{const value=key==='count'?Number(e.target.value):e.target.value;void action(()=>update(p=>{if(key==='count'&&(!Number.isSafeInteger(value)||value<0||value>999))throw Error('請輸入 0–999 的整數');run(p).ngMolars[key]=value;run(p).ngMolars.editId=crypto.randomUUID();},'已更新 NG+ 乳牙紀錄'));};
}
function resumeProgress(){
 const next=nextStep();
 if(next)go('roadmap',{stage:next.stageId},'step-'+next.id,{search:'',roadmapStatus:'all'});
}
function download(data,label){const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='game-companion.grounded.'+label+'.'+Date.now()+'.json';document.body.append(a);try{a.click();}finally{a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}}
async function preview(file){if(file.size>20*1024*1024)throw Error('匯入檔超過 20 MB，已停止；原始檔保留');const sourceRaw=await file.text(),localRaw=await store.stamp();await store.archive({sourceRaw,localRaw,at:Date.now(),label:'匯入兩端原文'});const source=importData(JSON.parse(sourceRaw)),local=JSON.parse(localRaw),plan=core.merge(null,local,source,{hasBase:false});review={plan,bundle:{sourceRaw,localRaw,at:Date.now()},stamp:localRaw,choices:plan.conflicts.map(()=>''),downloaded:false,invalid:false};$('import-ack').checked=false;$('import-ack').disabled=true;$('import-status').textContent=plan.conflicts.length+' 筆差異；兩端原文已保存在本遊戲復原區。';renderReview();$('backup-dialog').close();$('import-dialog').showModal();}
function renderReview(){$('import-rows').innerHTML=review.plan.conflicts.map((c,i)=>`<div class="diff"><strong>${escape(c.path.join(' / '))}</strong><div class="diff-values"><pre>本機\n${escape(JSON.stringify(c.local,null,2)??'未記錄')}</pre><pre>來源\n${escape(JSON.stringify(c.remote,null,2)??'未記錄')}</pre></div><select data-diff="${i}" aria-label="匯入差異 ${i+1}">${options([['','請選擇'],['local','本機'],['remote','來源']],review.choices[i])}</select></div>`).join('')||'<p>沒有進度差異；仍須下載兩端原文復原包並確認。</p>';$('import-rows').querySelectorAll('[data-diff]').forEach(s=>s.onchange=()=>{review.choices[Number(s.dataset.diff)]=s.value;importReady();});importReady();}
function importReady(){$('import-apply').disabled=!review||review.invalid||!review.downloaded||!$('import-ack').checked||review.choices.some(c=>!c);}
$('open-backup').onclick=()=>void action(async()=>{await loadProgress();$('backup-dialog').showModal();});
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
$('export-progress').onclick=()=>void action(async()=>download(await store.raw(),'progress'));
$('export-recovery').onclick=()=>void action(async()=>download(await store.exportAll(),'recovery'));
$('import-file').onchange=e=>{const file=e.target.files[0];e.target.value='';if(file)void action(()=>preview(file));};
for(const [id,choice]of [['import-local','local'],['import-source','remote']])$(id).onclick=()=>{review.choices.fill(choice);renderReview();};
$('import-download').onclick=()=>void action(async()=>{try{if(await store.stamp()!==review.stamp)throw Error('預覽已過期，請重新比較');download({recoveryBundle:review.bundle},'before-import');review.downloaded=true;$('import-ack').disabled=false;$('import-status').textContent='下載已發起；請開啟檔案確認已保存，瀏覽器不能保證落盤。';}catch(e){review.downloaded=false;$('import-ack').disabled=true;$('import-status').textContent='備份失敗：'+e.message;}importReady();});
$('import-ack').onchange=importReady;
$('import-apply').onclick=()=>void action(async()=>{if($('import-apply').disabled)return;try{const next=store.validate(core.resolve(review.plan,review.choices)).data;await store.checkpoint('匯入前');await store.update(()=>next,review.stamp);$('import-dialog').close();review=null;undoStack.length=0;renderUndo();message('匯入完成；兩端原文與未知資料已保留。');}catch(e){review.invalid=true;$('import-status').textContent=e.message;importReady();}});
$('roadmap-chapters').innerHTML=stages.map(stage=>`<a href="?view=roadmap&stage=${stage.id}" data-stage="${stage.id}"><span>${stage.number}</span><span class="chapter-name">${escape(stage.title)}</span><small data-stage-count="${stage.id}"></small></a>`).join('');
document.querySelectorAll('[data-stage]').forEach(a=>a.onclick=e=>{e.preventDefault();go('roadmap',{stage:a.dataset.stage},'app');$('handbook-nav').classList.remove('open');$('nav-toggle').setAttribute('aria-expanded','false');});
document.querySelectorAll('[data-view]').forEach(a=>a.onclick=e=>{e.preventDefault();go(a.dataset.view,{},'',{},true);$('handbook-nav').classList.remove('open');$('nav-toggle').setAttribute('aria-expanded','false');});
$('nav-toggle').onclick=()=>{const open=$('handbook-nav').classList.toggle('open');$('nav-toggle').setAttribute('aria-expanded',String(open));};
history.scrollRestoration='manual';
window.addEventListener('popstate',event=>{
 if(activeView)viewStates.get(activeView).position=capturePosition();
 activateView(view(),true);
 if(event.state?.groundedView===view())Object.assign(filter,event.state.navigation);
 applyReferenceUrl();
 pendingPosition={scroll:0};
 render();
});
$('app').addEventListener('click',event=>{
 if(event.defaultPrevented||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;
 const link=event.target.closest('a[href]');
 if(!link||link.target==='_blank')return;
 const url=new URL(link.href);
 if(url.origin!==location.origin||url.pathname!==location.pathname||!url.searchParams.has('view'))return;
 const requested=url.searchParams.get('view');
 const next=requested==='ngplus'?'roadmap':requested;
 if(!Object.hasOwn(names,next))return;
 event.preventDefault();
 const extra=Object.fromEntries([...url.searchParams].filter(([key])=>key!=='view'));
 if(requested==='ngplus')extra.stage='remix';
 go(next,extra,url.hash.slice(1));
});
$('undo-last').onclick=()=>void undoLast();
window.addEventListener('pagehide',()=>store.close(),{once:true});
$('app').tabIndex=-1;
let progressError='';
function renderProgressError(){
 $('app').innerHTML=`<h1>進度無法讀取</h1><p class="error">${escape(progressError)}</p><p>可使用右上角完整復原備份保存原文。</p>`;
 document.querySelectorAll('[data-stage-count]').forEach(label=>label.textContent='');
}
let openingProgress;
async function loadProgress(){
 if(progress)return;
 openingProgress ||= store.open().then(value=>{progress=value;}).catch(error=>{progressError=error.message;}).finally(()=>{openingProgress=null;});
 await openingProgress;
}
if(usesProgress())await loadProgress();
filter.stage=stageFromUrl()||(progress&&run(progress).storyStage)||'start';
function applyReferenceUrl(){
 const params=pageParams();
 if(view()==='recommendations'){
  if(params.has('tab'))filter.recommendationTab=['targets','fixed'].includes(params.get('tab'))?params.get('tab'):'progression';
  else if(location.hash)filter.recommendationTab='progression';
 }
 if(view()==='roadmap'&&stages.some(row=>row.id===stageFromUrl()))filter.stage=stageFromUrl();
 if(view()==='map'){
  if(['first','ng'].includes(params.get('scope')))filter.mapScope=params.get('scope');
  if(params.has('run'))filter.mapRunId=params.get('run');
  if(params.has('item')){filter.mapItem=params.get('item');filter.mapScope=ngMolarById.has(filter.mapItem)?'ng':'first';}
 }
 if(['monsterMap','resourceMap'].includes(view())&&params.has('item')){
  const row=fieldById.get(params.get('item'));
  if(row?.kind===(view()==='monsterMap'?'creature':'resource'))filter.mapItem=row.id;
 }
 if(view()==='armor'&&params.has('tab'))filter.armorTab=params.get('tab')==='pieces'?'pieces':'sets';
 if(['armor','weapons','shields','creatures'].includes(view())&&params.has('q'))filter.search=params.get('q');
 if(view()!=='collectibles')return;
 if(params.has('condition')){
  filter.reportCondition=params.get('condition');
  filter.reportGroup='all';filter.reportStatus='pending';
 }
 const group=params.get('group');
 if(group==='all'||groups.some(g=>g.id===group))filter.reportGroup=group;
 const itemId=location.hash.startsWith('#collect-')?location.hash.slice(9):'';
 if(itemId&&reportItems.some(item=>item.id===itemId)){
  const target=collectionTarget(itemById(itemId));
  filter.reportGroup=target.group;filter.reportStatus='all';
 }
}
applyReferenceUrl();
render();
if(view()==='collectibles'&&location.hash.startsWith('#collect-'))focusItem(location.hash.slice(1));
if(view()==='mutations'&&location.hash.startsWith('#mutation-'))focusItem(location.hash.slice(1));

function nextStep(){
 return nextPendingStep(progress);
}

function trophyChecklist(ids,context){
 return `<div class="related-checklist">${ids.map(id=>{const t=trophies.find(t=>t.id===id);return `<label class="related-item" for="trophy-${context}-${t.id}"><input id="trophy-${context}-${t.id}" data-trophy="${t.id}" type="checkbox" ${player(progress).trophies[t.id]?.earned?'checked':''}><span><strong>${nameWithEnglish(t)}</strong><span class="check-description">${escape(t.condition)}</span>${t.verification==='conflicting'?'<small class="risk">來源有差異</small>':''}${t.risk?`<small class="risk">${escape(t.risk)}</small>`:''}</span></label>`;}).join('')}</div>`;
}

function collectionChecklist(ids,context){
 return `<div class="related-checklist">${ids.map(id=>{const i=itemById(id),status=collectionState(progress,i);return `<label class="related-item" for="collection-${context}-${i.id}"><input id="collection-${context}-${i.id}" data-collect-check="${i.id}" type="checkbox" ${status==='obtained'?'checked':''}><span><strong>${nameWithEnglish(i)}</strong><span class="check-description">${escape(i.locationDescription)}</span><small data-collection-pending="${i.id}" ${status==='unknown'?'':'hidden'}>待確認</small></span></label>`;}).join('')}</div>`;
}
