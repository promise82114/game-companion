(async function () {
  'use strict';
  const $ = id => document.getElementById(id), model = window.RoadmapModel;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const characterText = window.RoadmapCharacters?.html || escape;
  const statusNames = {verified:'資料已核對',consensus:'多來源共識',unverified:'待查證'};
  let guide, store, view = new URL(location.href).searchParams.get('view') || 'roadmap', activeStage, importReview, busyImport = false, resetReview = null, busyReset = false;
  function fatal(error) { $('fatal').hidden = false; $('fatal').textContent = '無法保存或讀取：' + error.message + ' 原資料保留。請重試或先匯出原文。'; $('saveStatus').textContent = '儲存失敗'; }
  function message(text) { $('saveStatus').textContent = text; }
  window.addEventListener('roadmap-error', event => fatal(Error(event.detail)));
  for (const button of document.querySelectorAll('[data-close]')) button.onclick = () => $(button.dataset.close).close();
  try {
    const response = await fetch('guide.json'); if (!response.ok) throw Error('攻略資料載入失敗。'); guide = await response.json();
    store = new model.ProgressStore(); await store.open();
  } catch (error) {
    fatal(error); $('content').textContent = '進度未初始化，沒有重設資料。重新整理可再試一次。';
    // Even incompatible/corrupt state can be exported byte-for-byte from the database.
    $('backupOpen').onclick = () => $('backupDialog').showModal();
    $('export').onclick = async () => {
      try {
        if (!store?.db) throw Error('IndexedDB 無法開啟，請使用瀏覽器儲存工具匯出。');
        const raw = await new Promise((resolve,reject) => {const req=store.db.transaction('state').objectStore('state').get('progress');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});
        download({kind:'raw-recovery',gameId:model.gameId,raw},'raw-recovery.json');
      } catch (error) { $('backup-status').textContent = error.message; }
    };
    $('import-file').disabled = true; return;
  }
  const steps = guide.stages.flatMap(stage => stage.steps), trophyMap = new Map(guide.trophies.map(trophy => [trophy.id, trophy]));
  const roadmap = window.RoadmapProgress.create(guide), milestones = roadmap.milestones;
  const milestoneMap = new Map(milestones.map(item => [item.id, item]));
  // Expanded details are reading state only. Old IDs still resolve to their result.
  const expandedSteps = new Set();
  let readingAnchor = null;
  const done = item => roadmap.done(item, store.data);
  const stageChecks = stage => guide.routeChecks.filter(check=>stage.steps.some(step=>step.id===check.beforeStepId));
  const pendingChecks = stage => stageChecks(stage).filter(check=>roadmap.pending(check,store.data).length);
  const stageDone = stage => roadmap.forStage(stage.id).every(done) && !pendingChecks(stage).length;
  activeStage = guide.stages.find(stage => stage.id === location.hash.slice(1))?.id || guide.stages.find(stage => !stageDone(stage))?.id || guide.stages[0].id;
  function sourceLinks(refs) { return refs.map(id => {const source = guide.sources.find(value => value.id === id); return '<a href="'+escape(source.url)+'" target="_blank" rel="noopener">'+escape(source.title)+'</a>';}).join(' · '); }
  function trophyNameHtml(trophy) { return '<span class="trophy-name-en">'+escape(trophy.officialName)+'</span><span class="trophy-name-zh" lang="zh-Hant">｜'+escape(trophy.nameZhTW)+'</span>'; }
  function trophyProgressText(trophy) { const progress=trophy.progress;return progress.label+' ('+progress.stepIds.filter(id=>store.data.stepDone[id]===true).length+'/'+progress.stepIds.length+')'; }
  function trophyProgressHtml(trophy) { return trophy.progress ? '<span class="trophy-progress" data-trophy-progress="'+trophy.id+'" title="'+escape(trophy.progress.note)+'">'+escape(trophyProgressText(trophy))+'</span>' : ''; }
  function trophyInput(id) { const trophy=trophyMap.get(id);return '<label><input type="checkbox" data-group="trophyEarned" data-id="'+id+'" '+(store.data.trophyEarned[id] ? 'checked' : '')+'><span>已跳盃：'+trophyNameHtml(trophy)+' '+trophyProgressHtml(trophy)+'</span></label>'; }
  function pendingRisks(stage) {
    return roadmap.forStage(stage.id).filter(item => !done(item) && item.steps.some(step => step.warningLevel === 'critical' && step.missable && !store.data.stepDone[step.id]));
  }
  function routeCheckHtml(check) {
    const pending=roadmap.pending(check,store.data);if(!pending.length)return '';
    const targets=check.trophyIds ? pending.map(id=>({id:steps.find(step=>step.trophyIds.includes(id)).id,title:trophyMap.get(id).nameZhTW})) : [...new Set(pending.map(id=>roadmap.byStep.get(id)))].map(item=>({id:item.id,title:item.title}));
    return '<aside class="route-check" aria-label="'+escape(check.title)+'"><strong>'+escape(check.title)+(check.verificationStatus==='unverified'?' · 回補風險待查證':'')+'</strong><p>'+escape(check.risk)+'</p><div class="links">'+targets.map(target=>'<button data-jump="'+target.id+'">'+characterText(target.title)+'</button>').join('')+'</div></aside>';
  }
  function instructionHtml(step) {
    return '<div class="instruction" data-instruction="'+step.id+'"><p class="instruction-location">'+characterText(step.location)+'</p><p class="step-action">'+characterText(step.action)+'</p><p class="step-trigger"><span>時機：</span>'+characterText(step.trigger)+'</p>'+(step.verificationStatus==='unverified'?'<p class="instruction-caution">待查證：此處位置或操作尚未完成實機核對。</p>':'')+(step.verification.startsWith('核對畫面互動已結束')?'':'<p class="instruction-success">判定：'+characterText(step.verification)+'</p>')+'</div>';
  }
  function warningText(item) {
    const pending=item.steps.filter(step=>!store.data.stepDone[step.id]);
    return [pending.some(step=>step.warningLevel==='critical'&&step.missable)?'容易錯過／留意推進順序':'',pending.some(step=>step.verificationStatus==='unverified')?'含待查證內容':''].filter(Boolean).join(' · ');
  }
  function stepHtml(item, compact = false) {
    const complete=done(item),open=!complete||expandedSteps.has(item.id),rowId=(compact?'track-':'step-')+item.id;
    const trophyIds=[...new Set(item.steps.flatMap(step=>step.trophyIds))];
    const checks=guide.routeChecks.filter(check=>item.stepIds.includes(check.beforeStepId)).map(check=>'<div data-route-check="'+check.id+'">'+routeCheckHtml(check)+'</div>').join('');
    const control='<input type="checkbox" data-group="stepDone" data-id="'+item.id+'" '+(complete?'checked':'')+'>';
    return '<article class="step '+(complete?'done':'')+'" data-step-row="'+item.id+'" data-done="'+complete+'" id="'+rowId+'"><div class="step-head"><label>'+control+'<span class="step-order">第 '+item.steps[0].order+' 步</span><span class="step-location">'+characterText(item.title)+'</span></label><button class="step-reveal" data-step-details="'+item.id+'" aria-controls="'+rowId+'-body" aria-expanded="'+open+'" '+(complete?'':'hidden')+'>'+(open?'收起詳情':'查看已完成細節')+'</button></div><p class="warning critical" '+(!complete&&warningText(item)?'':'hidden')+'>'+escape(warningText(item))+'</p>'+checks+'<div class="step-body" id="'+rowId+'-body" '+(open?'':'hidden')+'>'+item.steps.map(instructionHtml).join('')+(item.steps.some(step=>step.warningLevel==='critical'&&step.missable)?'<p class="milestone-recovery">錯過後：'+characterText(item.steps.find(step=>step.warningLevel==='critical'&&step.missable).recovery)+'</p>':'')+(trophyIds.length?'<div class="trophy-inline">'+trophyIds.map(trophyInput).join('')+'</div>':'')+'</div></article>';
  }
  function preserveReadingPosition(update) {
    const focus=document.activeElement;let anchor=readingAnchor||focus?.closest('.step-head, summary');const fromEdit=!!readingAnchor;readingAnchor=null;
    if(!anchor||!anchor.closest('#content'))anchor=[...$('content').querySelectorAll('.step-head, summary')].find(node=>{const closed=node.closest('details:not([open])');if(closed&&node!==closed.querySelector(':scope > summary'))return false;const rect=node.getBoundingClientRect();return rect.height&&rect.top>=0&&rect.top<innerHeight;});
    const top=anchor?.getBoundingClientRect().top;update();if(!anchor)return;
    for(let parent=anchor.parentElement;parent&&parent!==$('content');parent=parent.parentElement)if(parent.matches('details:not([open])'))anchor=parent.querySelector(':scope > summary');
    if((focus&&!focus.getClientRects().length)||(fromEdit&&anchor.tagName==='SUMMARY'))anchor.focus({preventScroll:true});
    window.scrollBy({top:anchor.getBoundingClientRect().top-top,behavior:'instant'});
  }
  function converge() {
    document.querySelectorAll('[data-step-row]').forEach(row=>{
      const item=milestoneMap.get(row.dataset.stepRow),complete=done(item);if(row.dataset.done!==String(complete))expandedSteps.delete(item.id);
      row.dataset.done=String(complete);row.classList.toggle('done',complete);
      const open=!complete||expandedSteps.has(item.id),button=row.querySelector('[data-step-details]');
      row.querySelector('.step-body').hidden=!open;button.hidden=!complete;button.setAttribute('aria-expanded',String(open));button.textContent=open?'收起詳情':'查看已完成細節';
      row.querySelector('.step-head input').checked=complete;
      const warning=row.querySelector('.warning');warning.textContent=warningText(item);warning.hidden=complete||!warning.textContent;
    });
    document.querySelectorAll('[data-stage-panel]').forEach(panel=>{const complete=stageDone(guide.stages.find(stage=>stage.id===panel.dataset.stagePanel));if(panel.dataset.complete!==String(complete))panel.open=!complete;panel.dataset.complete=String(complete);});
    document.querySelectorAll('[data-route-check]').forEach(node=>node.innerHTML=routeCheckHtml(guide.routeChecks.find(check=>check.id===node.dataset.routeCheck)));
  }
  function sourceAuditHtml() {
    return '<details class="source-audit"><summary>逐步查證紀錄（'+steps.length+' 項）</summary>'+guide.stages.map(stage=>'<section class="source-audit-stage"><h3>'+escape(stage.title)+'</h3>'+stage.steps.map(step=>'<article class="source-step" data-source-step="'+step.id+'"><h4>'+characterText(step.action)+'</h4><p class="meta">'+characterText(step.location)+' · '+statusNames[step.verificationStatus]+'</p><dl><dt>驗證方式</dt><dd>'+characterText(step.verification)+'</dd><dt>錯過後</dt><dd>'+characterText(step.recovery)+'</dd><dt>來源</dt><dd>'+sourceLinks(step.sourceRefs)+'</dd></dl></article>').join('')+'</section>').join('')+'</details>';
  }
  function matches(item, group) {
    const query=$('search').value.trim().toLocaleLowerCase(),filter=$('filter').value;
    const refs=item.steps?item.steps.flatMap(step=>step.trophyIds):item.trophyIds||[];
    const text=JSON.stringify(item)+refs.map(id=>trophyMap.get(id).officialName+' '+trophyMap.get(id).nameZhTW).join(' ');
    if(query&&!text.toLocaleLowerCase().includes(query))return false;
    const complete=group==='milestone'?done(item):store.data[group][item.id];
    if(filter==='pending'&&complete)return false;if(filter==='completed'&&!complete)return false;
    if(filter==='unverified'&&!(item.steps?item.steps.some(step=>step.verificationStatus==='unverified'):item.verificationStatus==='unverified'))return false;
    if(filter==='risk'&&!(item.steps?item.steps.some(step=>step.missable||step.warningLevel==='critical'):item.missable||item.category==='optional'))return false;
    return true;
  }
  function stats() {
    const data=store.data,count=milestones.filter(done).length,earned=guide.trophies.filter(trophy=>data.trophyEarned[trophy.id]).length,current=guide.stages.find(stage=>stage.id===activeStage);
    $('summary').innerHTML='<div><span>攻略步驟完成</span><strong>'+count+' <small>/ '+milestones.length+'</small></strong></div><div><span>獎盃實際取得</span><strong>'+earned+' <small>/ '+guide.trophies.length+'</small></strong></div><div><span>目前瀏覽章節</span><strong class="current">'+escape(current.title)+'</strong></div>';
    $('nav-trophies').textContent=earned+'/33';
    const checks=pendingChecks(current),next=roadmap.forStage(current.id).find(item=>!done(item))||roadmap.byStep.get(checks[0]?.beforeStepId),risks=pendingRisks(current);
    $('checkpoint').innerHTML='<div><strong>'+escape(current.title)+' · '+(next?'接下來：'+characterText(next.title):'本章步驟已記錄')+'</strong><p>'+(risks.length?'尚有 '+risks.length+' 個高風險步驟待核對；具體離開前提醒列在路線推進處。':checks.length?'尚有離開前核對未完成，請查看路線提醒。':'沒有未記錄的高風險步驟；實際獎盃仍以 PS5 為準。')+'</p></div>'+(next?'<button data-jump="'+next.id+'">回到此處</button>':'');
    document.querySelectorAll('[data-stage-count]').forEach(node=>{const items=roadmap.forStage(node.dataset.stageCount);node.textContent=items.filter(done).length+'/'+items.length;});
    document.querySelectorAll('[data-stage-risk]').forEach(node=>{const stage=guide.stages.find(stage=>stage.id===node.dataset.stageRisk),risks=pendingRisks(stage),checks=pendingChecks(stage);node.textContent=risks.length?'高風險待核對 '+risks.length:checks.length?'離開前待核對 '+checks.reduce((sum,check)=>sum+roadmap.pending(check,store.data).length,0):'';node.hidden=!node.textContent;});
    document.querySelectorAll('[data-tracker-count]').forEach(node=>{const tracker=guide.trackers.find(value=>value.id===node.dataset.trackerCount);node.textContent=tracker.stepIds.filter(id=>data.stepDone[id]).length+'/'+tracker.stepIds.length;});
    document.querySelectorAll('[data-trophy-progress]').forEach(node=>node.textContent=trophyProgressText(trophyMap.get(node.dataset.trophyProgress)));
  }
  function render() {
    expandedSteps.clear();
    document.querySelectorAll('[data-view]').forEach(button=>{if(button.dataset.view===view)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
    $('view-title').textContent={roadmap:'遊玩 Roadmap',trackers:'跨階段追蹤',trophies:'獎盃清單',sources:'來源與查證'}[view];
    $('chapter-picker').hidden=view!=='roadmap';$('checkpoint').hidden=view!=='roadmap';$('search').closest('.toolbar').hidden=view==='sources';$('continue').hidden=view!=='roadmap';
    $('chapter-select').innerHTML=guide.stages.map(stage=>'<option value="'+stage.id+'" '+(activeStage===stage.id?'selected':'')+'>'+escape(stage.title)+'</option>').join('');
    $('section-select').innerHTML='<option value="">本章步驟…</option>'+roadmap.forStage(activeStage).map(item=>'<option value="'+item.id+'">'+escape(item.title)+'</option>').join('');
    $('stage-nav').innerHTML=guide.stages.map(stage=>'<button data-stage="'+stage.id+'" aria-label="'+escape(stage.title)+'" '+(activeStage===stage.id?'aria-current="step"':'')+'>'+stage.title.slice(0,2)+'</button>').join('');
    const reveal=$('search').value.trim()||$('filter').value!=='all';
    if(reveal)milestones.filter(item=>matches(item,'milestone')&&done(item)).forEach(item=>expandedSteps.add(item.id));
    if(view==='roadmap'){
      $('content').innerHTML=guide.stages.map(stage=>{
        const visible=roadmap.forStage(stage.id).filter(item=>matches(item,'milestone'));if(!visible.length)return '';
        const complete=stageDone(stage);
        return '<details class="stage" data-stage-panel="'+stage.id+'" data-complete="'+complete+'" '+(reveal||(!complete&&activeStage===stage.id)?'open':'')+'><summary><span class="number">'+stage.title.slice(0,2)+'</span><strong>'+characterText(stage.title.slice(3))+'</strong><span class="stage-risk" data-stage-risk="'+stage.id+'"></span><span class="count" data-stage-count="'+stage.id+'"></span></summary><div class="stage-body"><p class="stage-description">'+characterText(stage.description)+'</p>'+visible.map(item=>stepHtml(item)).join('')+'</div></details>';
      }).join('');
    }else if(view==='trackers'){
      $('content').innerHTML=guide.trackers.map(tracker=>{
        const visible=[...new Set(tracker.stepIds.map(id=>roadmap.byStep.get(id)))].filter(item=>matches(item,'milestone'));if(!visible.length)return '';
        return '<details class="tracker"><summary><strong>'+characterText(tracker.title)+'</strong><span class="count" data-tracker-count="'+tracker.id+'"></span></summary><div class="tracker-body"><p class="meta">'+characterText(tracker.note)+'</p>'+visible.map(item=>stepHtml(item,true)).join('')+'</div></details>';
      }).join('');
    }else if(view==='trophies'){
      $('content').innerHTML='<p class="meta">攻略步驟與獎盃分別記錄；勾完步驟不會自動勾選獎盃，白金也需手動確認。</p>'+guide.trophies.filter(trophy=>matches(trophy,'trophyEarned')).map(trophy=>'<article class="trophy-row"><input id="trophy-'+trophy.id+'" type="checkbox" data-group="trophyEarned" data-id="'+trophy.id+'" '+(store.data.trophyEarned[trophy.id]?'checked':'')+'><div><label for="trophy-'+trophy.id+'">'+trophyNameHtml(trophy)+' '+trophyProgressHtml(trophy)+'</label>'+(trophy.progress?'<p class="trophy-progress-note">'+escape(trophy.progress.note)+'</p>':'')+'<p>'+characterText(trophy.description)+'</p><div class="links">'+[...new Set(steps.filter(step=>step.trophyIds.includes(trophy.id)).map(step=>roadmap.byStep.get(step.id)))].map(item=>'<button data-jump="'+item.id+'">'+characterText(item.title)+'</button>').join('')+'</div></div><small>'+{platinum:'白金',story:'主線',optional:'支線／收集'}[trophy.category]+'</small></article>').join('');
    }else{
      $('content').innerHTML='<h2>資料查證範圍</h2><p>'+escape(guide.verificationNote)+'</p><p>'+escape(guide.estimatedTime)+'</p><p>九扇門、每門三下、17 塊肉、七隻蝸牛的位置與固定回訪次數，都不能視為本工具已實測。動物以五組來源共識列出；蚯蚓另保留提醒。未宣稱「22 個可錯過」為確定總數。</p><p>工具資料備份與主機遊戲存檔不同；本工具不提供遊戲內回溯。</p>'+guide.sources.map(source=>'<article class="source"><a href="'+escape(source.url)+'" target="_blank" rel="noopener">'+escape(source.title)+' ↗</a><p>'+escape(source.limitation)+'</p><small>查閱 '+source.accessedAt+'</small></article>').join('')+sourceAuditHtml();
    }
    if(!$('content').children.length)$('content').innerHTML='<p class="empty">沒有符合條件的項目。請清除搜尋或改回「全部」。</p>';
    if(view!=='sources'&&!$('content').querySelector('.empty'))$('content').insertAdjacentHTML('afterbegin','<p class="trophy-progress-hint">每個步驟各自勾選；攻略完成與實際跳盃分別記錄。回訪／路線計數滿格不代表已跳盃。</p>');
    converge();stats();
  }
  function syncUi() {
    preserveReadingPosition(()=>{document.querySelectorAll('input[data-group]').forEach(input=>input.checked=!!store.data[input.dataset.group][input.dataset.id]);converge();stats();message('已儲存在此裝置');});
  }
  function jump(id) {
    const item=roadmap.byStep.get(id);if(!item)return;view='roadmap';activeStage=item.stageId;$('search').value='';$('filter').value='all';history.replaceState(null,'','?view=roadmap#'+activeStage);render();
    const row=$('step-'+item.id);row.closest('.stage').open=true;if(done(item))expandedSteps.add(item.id);converge();row.scrollIntoView({block:'center'});row.querySelector('input').focus({preventScroll:true});
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button.dataset.view){view=button.dataset.view;history.pushState(null,'','?view='+view+'#'+activeStage);render();}
    if(button.dataset.jump)jump(button.dataset.jump);if(button.dataset.stage)selectStage(button.dataset.stage);
    if(button.dataset.stepDetails)preserveReadingPosition(()=>{const id=button.dataset.stepDetails;if(expandedSteps.has(id))expandedSteps.delete(id);else expandedSteps.add(id);converge();});
  });
  document.addEventListener('change',async event=>{
    const input=event.target;if(!input.matches('input[data-group]'))return;
    const hadFocus=document.activeElement===input;readingAnchor=input.closest('.step-head');input.disabled=true;message('儲存中…');
    try{await store.toggle(input.dataset.group,input.dataset.id,input.checked);}catch(error){syncUi();fatal(error);}finally{input.disabled=false;readingAnchor=null;if(hadFocus&&input.getClientRects().length)input.focus({preventScroll:true});}
  });
  window.addEventListener('roadmap-progress-change',()=>{syncUi();cloudRender();});
  window.addEventListener('focus',()=>store.refresh().then(syncUi).catch(fatal));
  $('search').oninput=render;$('filter').onchange=render;
  function selectStage(id){activeStage=id;view='roadmap';$('search').value='';$('filter').value='all';history.replaceState(null,'','?view=roadmap#'+id);render();const panel=document.querySelector('[data-stage-panel="'+id+'"]');panel.open=true;const heading=panel.querySelector('summary');heading.scrollIntoView({block:'start'});heading.focus({preventScroll:true});}
  $('chapter-select').onchange=event=>selectStage(event.target.value);
  $('section-select').onchange=event=>{const id=event.target.value;if(id){jump(id);$('section-select').value=id;}};
  $('resume-progress').onclick=()=>{const next=milestones.find(item=>!done(item))||roadmap.byStep.get(guide.routeChecks.find(check=>roadmap.pending(check,store.data).length)?.beforeStepId);if(next)jump(next.id);else message('所有攻略步驟已記錄，可展開標題回看；獎盃仍以 PS5 為準。');};
  $('continue').onclick=()=>{const start=guide.stages.findIndex(stage=>stage.id===activeStage),remaining=guide.stages.slice(start),next=remaining.flatMap(stage=>roadmap.forStage(stage.id)).find(item=>!done(item))||roadmap.byStep.get(remaining.flatMap(stage=>pendingChecks(stage))[0]?.beforeStepId);if(next)jump(next.id);else message('本章與後續步驟已記錄，可從章節選單回看。');};
  window.addEventListener('popstate',()=>{view=new URL(location.href).searchParams.get('view')||'roadmap';activeStage=guide.stages.find(stage=>stage.id===location.hash.slice(1))?.id||activeStage;render();});
  $('platinum-name').innerHTML=trophyNameHtml(trophyMap.get('t00'));
  $('guide-version').textContent='攻略 v'+guide.guideVersion+' · 文獻核對 '+guide.lastVerifiedAt;
  function download(value,name) {
    const href=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'})),link=document.createElement('a');
    try{link.href=href;link.download=name;document.body.append(link);link.click();}finally{link.remove();setTimeout(()=>URL.revokeObjectURL(href),10000);}
  }
  $('backupOpen').onclick=()=>$('backupDialog').showModal();
  $('export').onclick=async()=>{try{download(await store.exportData(),'thank-goodness-progress.json');$('backup-status').textContent='已要求下載；請確認檔案已保存。';}catch(error){$('backup-status').textContent=error.message;}};
  function differences(container,plan,choices,onChange) {
    container.replaceChildren();
    plan.conflicts.forEach((conflict,index)=>{
      const row=document.createElement('section');row.className='difference';
      const name=document.createElement('strong');name.textContent=conflict.path.join(' / ');row.append(name);
      const values=document.createElement('div');values.className='difference-values';
      for(const [key,label]of [['base','共同 Base'],['local','本機'],['remote','匯入／雲端']]){const pre=document.createElement('pre');pre.textContent=label+'\n'+(conflict[key]===undefined?'未記錄':JSON.stringify(conflict[key],null,2));values.append(pre);}row.append(values);
      const select=document.createElement('select');select.setAttribute('aria-label','差異 '+(index+1));
      for(const [value,label]of [['','請選擇'],['local','使用本機'],['remote','使用匯入／雲端']])select.add(new Option(label,value));
      select.onchange=()=>{choices[index]=select.value;onChange();};row.append(select);container.append(row);
    });
    if(!plan.conflicts.length)container.textContent='沒有衝突欄位；仍需確認資料配對。';
  }
  function importRender() { $('import-apply').disabled=busyImport||!importReview||!importReview.downloaded||!importReview.acknowledged||importReview.choices.some(value=>!value); resetRender(); }
  $('import-file').onchange=async event=>{
    const file=event.target.files[0];event.target.value='';if(!file)return;
    try{
      if(file.size>5*1024*1024)throw Error('備份超過 5 MiB。');
      const sourceRaw=await file.text(),data=model.parse(sourceRaw,$('recovery-side').value);await store.refresh();
      const local=store.get(),stamp=store.stamp();
      // Durable recovery is a precondition to even showing an import preview.
      await store.archive({kind:'import-preview',at:Date.now(),sourceRaw,localRaw:stamp});
      const plan=model.importPlan(local,data);
      importReview={sourceRaw,localRaw:stamp,stamp,plan,choices:plan.conflicts.map(()=>''),downloaded:false,acknowledged:false};
      $('import-summary').textContent=`來源 ${Object.values(data.stepDone).filter(Boolean).length} 步／${Object.values(data.trophyEarned).filter(Boolean).length} 盃；${plan.conflicts.length} 筆差異。兩端原文已保存在本遊戲 IndexedDB。`;
      differences($('import-rows'),plan,importReview.choices,importRender);$('import-ack').checked=false;$('import-ack').disabled=true;$('import-status').textContent='';importRender();$('backupDialog').close();$('importDialog').showModal();
    }catch(error){$('backup-status').textContent=error.message;}
  };
  for(const [id,value]of [['import-local','local'],['import-source','remote']])$(id).onclick=()=>{if(!importReview)return;importReview.choices.fill(value);$('import-rows').querySelectorAll('select').forEach(select=>select.value=value);importRender();};
  $('import-backup').onclick=()=>{
    if(!importReview)return;importReview.downloaded=false;importReview.acknowledged=false;$('import-ack').checked=false;$('import-ack').disabled=true;
    try{download({gameId:model.gameId,kind:'recoveryBundle',sourceRaw:importReview.sourceRaw,localRaw:importReview.localRaw},'thank-goodness-before-import.json');importReview.downloaded=true;$('import-ack').disabled=false;$('import-status').textContent='請確認下載的復原檔已保存，再勾選確認。';}catch(error){$('import-status').textContent='備份失敗：'+error.message;}importRender();
  };
  $('import-ack').onchange=()=>{if(importReview)importReview.acknowledged=$('import-ack').checked;importRender();};
  $('import-apply').onclick=async()=>{
    if(!importReview||busyImport)return;busyImport=true;importRender();
    try{await store.applyImport(importReview);$('importDialog').close();importReview=null;syncUi();}catch(error){$('import-status').textContent=error.message;importReview.downloaded=false;importReview.acknowledged=false;$('import-ack').checked=false;$('import-ack').disabled=true;}finally{busyImport=false;importRender();}
  };
  const config=window.SIDE_PROJECT_CLOUD_CONFIG;
  let ready=false,busy=false,epoch=0,account=null,session=null,cloudReview=null,drive;
  const auth=new window.SideProjectAuth.GoogleAuth(config.clientId,()=>{if(!auth.connected){epoch++;drive?.reset();account=null;session=null;cloudReview=null;$('cloud-review').hidden=true;}cloudRender();});
  drive=new window.SideProjectDrive.DriveAppData(auth,config.fileName,config);
  function cloudRender() {
    if(!drive)return;
    $('cloudConnect').disabled=busy||busyReset;$('cloudConnect').textContent=ready?'連接／切換 Google 帳號':'載入 Google 授權服務';
    $('cloudDisconnect').disabled=busy||busyReset||!auth.connected;$('cloudVerify').disabled=busy||busyReset||!account||!auth.connected;
    $('cloudUpload').disabled=busy||busyReset||!session||!drive.verified;
    $('cloudConfirm').disabled=busy||busyReset||!session||!drive.verified||!cloudReview||cloudReview.choices.some(value=>!value);
    $('cloudAccount').textContent=account?'目前帳號：'+(account.emailAddress||'已辨識帳號'):'重新整理後需重新連接；Token 僅存在本頁記憶體。';
    $('cloudSafety').textContent=drive.verified?'本次授權：過期版本 412、競爭一勝一拒已通過（尚非實機攻略驗收）。':'本次授權尚未驗證，無法上傳。';
    resetRender();
  }
  async function cloudRun(action) {if(busy||busyReset)return;busy=true;cloudRender();try{await action();}catch(error){$('cloudStatus').textContent=error.message;}finally{busy=false;cloudRender();}}
  function check(expected) {if(expected!==epoch||!auth.connected)throw Object.assign(Error('帳號或授權已變更，請重新連接比較。'),{code:'cancelled'});}
  async function locked(action) {
    if(!navigator.locks)throw Error('此瀏覽器不支援同步鎖，無法安全同步。');
    return navigator.locks.request(model.prefix+'sync.'+session.identity,{ifAvailable:true},lock=>{if(!lock)throw Error('另一分頁正在同步，請稍後重試。');return action();});
  }
  function cloudShow(result) {
    if(result.kind==='complete'){cloudReview=null;$('cloud-review').hidden=true;$('cloudStatus').textContent=(result.recovered?'已核對並復原前次同步。':'已完成同步。')+(result.dirty?'期間的新編輯已保留，仍有未同步變更。':'本機與雲端一致。');syncUi();return;}
    cloudReview={...result,choices:result.plan.conflicts.map(()=>'')};$('cloud-review-title').textContent=result.first?'首次配對：確認帳號與資料':'Base／本機／雲端衝突';
    $('cloudStatus').textContent=(result.changed?'預覽後資料有變動，請重新選擇。':'')+`${result.plan.conflicts.length} 筆差異。未確認前不寫入。`;
    differences($('cloud-rows'),result.plan,cloudReview.choices,cloudRender);$('cloud-review').hidden=false;
  }
  $('cloudOpen').onclick=()=>{$('cloudDialog').showModal();cloudRender();};
  $('cloudConnect').onclick=()=>{
    if(!ready){cloudRun(async()=>{await auth.prepare();ready=true;$('cloudStatus').textContent='授權服務已就緒，請按連接。';});return;}
    if(busy||busyReset)return;
    const grant=auth.connect({selectAccount:true}),expected=epoch;
    cloudRun(async()=>{await grant;check(expected);const user=await drive.account();check(expected);
      const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(config.projectId+'|'+user.permissionId));check(expected);
      // taste-skill-ignore: SHA-256 帳號隔離使用兩位十六進位編碼，不是介面編號。
      const identity=[...new Uint8Array(bytes)].map(value=>value.toString(16).padStart(2,'0')).join(''); // taste-skill-ignore: 帳號 hash 的十六進位編碼。
      const bound=new window.SideProjectSyncSession({drive,local:store,storage:localStorage,prefix:model.prefix,gameId:model.gameId,projectId:config.projectId,identity,check:()=>check(expected)});
      account=user;session=bound;$('cloudStatus').textContent='已連接。先驗證本次授權的 Drive 寫入安全，再手動同步。';
    });
  };
  $('cloudDisconnect').onclick=()=>{auth.disconnect();$('cloudStatus').textContent='已中斷；兩端資料保留。';cloudRender();};
  $('cloudVerify').onclick=()=>cloudRun(async()=>{const expected=epoch;$('cloudStatus').textContent='驗證獨立合成檔，不操作遊戲備份…';await drive.verifySafety();check(expected);$('cloudStatus').textContent='條件寫入安全測試通過，可手動同步。';});
  $('cloudUpload').onclick=()=>cloudRun(()=>locked(async()=>cloudShow(await session.start())));
  $('cloudConfirm').onclick=()=>cloudRun(()=>locked(async()=>{const review=cloudReview;cloudShow(await session.confirm(review,review.choices));}));
  for(const [id,value]of [['cloud-local','local'],['cloud-remote','remote']])$(id).onclick=()=>{if(!cloudReview)return;cloudReview.choices.fill(value);$('cloud-rows').querySelectorAll('select').forEach(select=>select.value=value);cloudRender();};
  function resetRender() {
    $('resetOpen').disabled=busy||busyImport||busyReset;
    $('reset-backup').disabled=busyReset||!resetReview;
    $('reset-ack').disabled=busyReset||!resetReview?.downloaded;
    $('reset-confirm').disabled=busyReset||!resetReview?.downloaded||!resetReview?.acknowledged;
    $('resetDialog').querySelector('[data-close]').disabled=busyReset;
  }
  $('resetOpen').onclick=async()=>{
    if(busy||busyImport||busyReset)return;
    busyReset=true;resetReview=null;cloudRender();
    try{
      await store.refresh();const stamp=store.stamp(),snapshot=store.get(),backup=await store.exportData();
      if(store.stamp()!==stamp)throw Error('紀錄正在變更，請重新開啟初始化紀錄。');
      if(!$('backupDialog').open)return;
      resetReview={stamp,backup,downloaded:false,acknowledged:false};
      $('reset-summary').textContent=`目前已完成 ${milestones.filter(item=>roadmap.done(item,snapshot)).length}/${milestones.length} 步驟、${guide.trophies.filter(trophy=>snapshot.trophyEarned[trophy.id]).length}/${guide.trophies.length} 獎盃。初始化後顯示 0/${milestones.length}、0/${guide.trophies.length}。`;
      $('reset-ack').checked=false;$('reset-status').textContent='';$('backupDialog').close();$('resetDialog').showModal();
    }catch(error){$('backup-status').textContent='無法準備初始化：'+error.message;}finally{busyReset=false;cloudRender();}
  };
  $('reset-backup').onclick=()=>{
    if(!resetReview||busyReset)return;
    resetReview.downloaded=false;resetReview.acknowledged=false;$('reset-ack').checked=false;
    try{download(resetReview.backup,'thank-goodness-before-reset-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json');resetReview.downloaded=true;$('reset-status').textContent='請確認備份已下載並保存，再勾選確認。';}catch(error){$('reset-status').textContent='備份失敗，未初始化：'+error.message;}resetRender();
  };
  $('reset-ack').onchange=()=>{if(resetReview)resetReview.acknowledged=$('reset-ack').checked;resetRender();};
  $('reset-confirm').onclick=async()=>{
    if(busy||busyImport||busyReset||!resetReview?.downloaded||!resetReview.acknowledged)return;
    busyReset=true;cloudRender();
    try{
      await store.resetProgress(resetReview,{stepIds:steps.map(step=>step.id),trophyIds:guide.trophies.map(trophy=>trophy.id)});
      importReview=null;cloudReview=null;$('cloud-review').hidden=true;resetReview=null;$('resetDialog').close();
      selectStage(guide.stages[0].id);
      $('backup-status').textContent='已初始化紀錄。第一輪可由剛下載的 JSON 經差異預覽還原。';
      $('cloudStatus').textContent='本機已初始化，雲端尚未更新。請手動同步，再由其他裝置同步接收。';
      message('已初始化：可以從第一章重新開始。');
    }catch(error){$('reset-status').textContent='未初始化：'+error.message;if(resetReview){resetReview.downloaded=false;resetReview.acknowledged=false;}$('reset-ack').checked=false;}finally{busyReset=false;cloudRender();}
  };
  $('resetDialog').addEventListener('cancel',event=>{if(busyReset)event.preventDefault();});
  $('resetDialog').addEventListener('close',()=>{resetReview=null;$('backupOpen').focus({preventScroll:true});});
  // Exposed contract for isolated regression tests and module integration; no token is exposed.
  window.ROADMAP_APP={store,guide,jump};
  render();message('已儲存在此裝置');cloudRender();
  if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js',{scope:'./'}).catch(error=>message('離線快取尚未就緒：'+error.message));
})();
