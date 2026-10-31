(async function () {
  'use strict';
  const $ = id => document.getElementById(id), model = window.RoadmapModel, core = window.SideProjectSync;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const statusNames = {verified:'資料已核對',consensus:'多來源共識',unverified:'待查證'};
  const warningNames = {critical:'容易錯過／不可逆',branch:'分歧／待核對',prepare:'提前準備',experience:'推薦體驗',later:'可延後'};
  let guide, store, view = new URL(location.href).searchParams.get('view') || 'roadmap', activeStage, importReview, busyImport = false;
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
  const steps = guide.stages.flatMap(stage => stage.steps), stepMap = new Map(steps.map(step => [step.id, step])), trophyMap = new Map(guide.trophies.map(trophy => [trophy.id, trophy]));
  const stageFor = id => guide.stages.find(stage => stage.steps.some(step => step.id === id));
  activeStage = guide.stages.find(stage => stage.id === location.hash.slice(1))?.id || guide.stages.find(stage => stage.steps.some(step => !store.data.stepDone[step.id]))?.id || guide.stages[0].id;
  function sourceLinks(refs) { return refs.map(id => {const source = guide.sources.find(value => value.id === id); return `<a href="${escape(source.url)}" target="_blank" rel="noopener">${escape(source.title)}</a>`;}).join(' · '); }
  function trophyInput(id) { return `<label><input type="checkbox" data-group="trophyEarned" data-id="${id}" ${store.data.trophyEarned[id] ? 'checked' : ''}>已跳盃：${escape(trophyMap.get(id).officialName)}</label>`; }
  // taste-skill-ignore: 保留原攻略指定的紅／橙風險符號，與文字一起說明不可逆事項。
  function stepHtml(step, compact = false) {
    return `<article class="step ${store.data.stepDone[step.id] ? 'done' : ''}" data-step-row="${step.id}" id="${compact ? 'track-' : 'step-'}${step.id}"><div class="step-head"><label><input type="checkbox" data-group="stepDone" data-id="${step.id}" ${store.data.stepDone[step.id] ? 'checked' : ''}><span>${escape(step.action)}</span></label></div><p class="step-location">${escape(step.location)} · ${statusNames[step.verificationStatus]}</p>${step.warningLevel === 'critical' || step.verificationStatus === 'unverified' ? `<span class="warning ${step.warningLevel === 'critical' ? 'critical' : 'branch'}">${step.warningLevel === 'critical' ? '🔴 ' : '🟠 '}${warningNames[step.warningLevel]}${step.verificationStatus === 'unverified' ? ' · 待查證' : ''}</span>` : ''}<details class="step-details"><summary>時機、驗證與來源</summary><dl><dt>觸發時機</dt><dd>${escape(step.trigger)}</dd><dt>驗證方式</dt><dd>${escape(step.verification)}</dd><dt>錯過後</dt><dd>${escape(step.recovery)}</dd><dt>來源 · ${statusNames[step.verificationStatus]}</dt><dd>${sourceLinks(step.sourceRefs)}</dd></dl></details>${step.trophyIds.length ? `<div class="trophy-inline">${step.trophyIds.map(trophyInput).join('')}</div>` : ''}</article>`; // taste-skill-ignore: 既有攻略使用紅／橙風險符號。
  }
  function matches(item, group) {
    const query = $('search').value.trim().toLocaleLowerCase(), filter = $('filter').value;
    const text = JSON.stringify(item) + (item.trophyIds || []).map(id => trophyMap.get(id).officialName).join(' ');
    if (query && !text.toLocaleLowerCase().includes(query)) return false;
    if (filter === 'pending' && store.data[group][item.id]) return false;
    if (filter === 'completed' && !store.data[group][item.id]) return false;
    if (filter === 'unverified' && item.verificationStatus !== 'unverified') return false;
    if (filter === 'risk' && !(item.missable || item.warningLevel === 'critical' || item.category === 'optional')) return false;
    return true;
  }
  function stats() {
    const data = store.data, count = steps.filter(step => data.stepDone[step.id]).length, earned = guide.trophies.filter(trophy => data.trophyEarned[trophy.id]).length;
    const current = guide.stages.find(stage => stage.id === activeStage);
    $('summary').innerHTML = `<div><span>攻略步驟完成</span><strong>${count} <small>/ ${steps.length}</small></strong></div><div><span>獎盃實際取得</span><strong>${earned} <small>/ ${guide.trophies.length}</small></strong></div><div><span>目前瀏覽章節</span><strong class="current">${escape(current.title)}</strong></div>`;
    $('nav-trophies').textContent = earned + '/33';
    const checkpoint = current.steps.find(step => step.checkpoint && !data.stepDone[step.id]);
    $('checkpoint').innerHTML = checkpoint ? `<div><strong>本章留意 · ${escape(current.title)}</strong><p>${escape(checkpoint.trigger)}</p></div><button data-jump="${checkpoint.id}">查看提醒</button>` : '<div><strong>本章進度</strong><p>本章檢查點已記錄；可直接切換章節繼續攻略。</p></div>';
    document.querySelectorAll('[data-stage-count]').forEach(node => {const stage=guide.stages.find(value=>value.id===node.dataset.stageCount);node.textContent=stage.steps.filter(step=>data.stepDone[step.id]).length+'/'+stage.steps.length;});
    document.querySelectorAll('[data-tracker-count]').forEach(node => {const tracker=guide.trackers.find(value=>value.id===node.dataset.trackerCount);node.textContent=tracker.stepIds.filter(id=>data.stepDone[id]).length+'/'+tracker.stepIds.length;});
  }
  function render() {
    document.querySelectorAll('[data-view]').forEach(button => {if(button.dataset.view===view)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
    $('view-title').textContent = {roadmap:'遊玩 Roadmap',trackers:'跨階段追蹤',trophies:'獎盃清單',sources:'來源與查證'}[view];
    $('chapter-picker').hidden = view !== 'roadmap'; $('checkpoint').hidden = view !== 'roadmap'; $('search').closest('.toolbar').hidden = view === 'sources';$('continue').hidden = view !== 'roadmap';
    $('chapter-select').innerHTML = guide.stages.map(stage=>`<option value="${stage.id}" ${activeStage===stage.id?'selected':''}>${escape(stage.title)}</option>`).join('');
    $('stage-nav').innerHTML = guide.stages.map(stage => `<button data-stage="${stage.id}" aria-label="${escape(stage.title)}" ${activeStage===stage.id?'aria-current="step"':''}>${stage.title.slice(0,2)}</button>`).join('');
    if (view === 'roadmap') {
      $('content').innerHTML = guide.stages.map(stage => {
        const visible = stage.steps.filter(step=>matches(step,'stepDone')); if(!visible.length)return '';
        return `<details class="stage" data-stage-panel="${stage.id}" ${activeStage===stage.id || $('search').value || $('filter').value!=='all'?'open':''}><summary><span class="number">${stage.title.slice(0,2)}</span><strong>${escape(stage.title.slice(3))}</strong><span class="count" data-stage-count="${stage.id}"></span></summary><div class="stage-body"><p class="stage-description">${escape(stage.description)}</p><details class="stage-reminder"><summary>離開本章前的提醒</summary><p>${escape(stage.checkpoint)}</p></details>${visible.map(step=>stepHtml(step)).join('')}</div></details>`;
      }).join('');
    } else if (view === 'trackers') {
      $('content').innerHTML = guide.trackers.map(tracker=>{
        const visible=tracker.stepIds.map(id=>stepMap.get(id)).filter(step=>matches(step,'stepDone'));if(!visible.length)return '';
        return `<details class="tracker"><summary><strong>${escape(tracker.title)}</strong><span class="count" data-tracker-count="${tracker.id}"></span></summary><div class="tracker-body"><p class="meta">${escape(tracker.note)}</p>${visible.map(step=>stepHtml(step,true)).join('')}</div></details>`;
      }).join('');
    } else if (view === 'trophies') {
      $('content').innerHTML = '<p class="meta">33 個獎盃均有流程映射；勾步驟不會自動勾獎盃。白金也需手動確認。</p>' + guide.trophies.filter(trophy=>matches(trophy,'trophyEarned')).map(trophy=>`<article class="trophy-row"><input id="trophy-${trophy.id}" type="checkbox" data-group="trophyEarned" data-id="${trophy.id}" ${store.data.trophyEarned[trophy.id]?'checked':''}><div><label for="trophy-${trophy.id}">${escape(trophy.officialName)}</label><p>${escape(trophy.description)}</p><div class="links">${steps.filter(step=>step.trophyIds.includes(trophy.id)).map(step=>`<button data-jump="${step.id}">${escape(step.location)}</button>`).join('')}</div></div><small>${{platinum:'白金',story:'主線',optional:'支線／收集'}[trophy.category]}</small></article>`).join('');
    } else {
      $('content').innerHTML = `<h2>資料查證範圍</h2><p>${escape(guide.verificationNote)}</p><p>${escape(guide.estimatedTime)}</p><p>九扇門、每門三下、17 塊肉、七隻蝸牛的位置與固定回訪次數，都不能視為本工具已實測。動物以五組來源共識列出；蚯蚓另保留提醒。未宣稱「22 個可錯過」為確定總數。</p><p>工具資料備份與主機遊戲存檔不同；本工具不提供遊戲內回溯。</p>${guide.sources.map(source=>`<article class="source"><a href="${escape(source.url)}" target="_blank" rel="noopener">${escape(source.title)} ↗</a><p>${escape(source.limitation)}</p><small>查閱 ${source.accessedAt}</small></article>`).join('')}`;
    }
    if(!$('content').children.length)$('content').innerHTML='<p class="empty">沒有符合條件的項目。請清除搜尋或改回「全部」。</p>';
    stats();
  }
  function syncUi() {
    document.querySelectorAll('input[data-group]').forEach(input=>input.checked=!!store.data[input.dataset.group][input.dataset.id]);
    document.querySelectorAll('[data-step-row]').forEach(row=>row.classList.toggle('done',!!store.data.stepDone[row.dataset.stepRow]));
    stats(); message('已儲存在此裝置');
  }
  function jump(id) {
    const stage=stageFor(id);if(!stage)return;view='roadmap';activeStage=stage.id;$('search').value='';$('filter').value='all';history.replaceState(null,'','#'+stage.id);render();
    const row=$('step-'+id);row.scrollIntoView({block:'center'});row.querySelector('input').focus({preventScroll:true});
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button.dataset.view){view=button.dataset.view;history.pushState(null,'','?view='+view+'#'+activeStage);render();}
    if(button.dataset.jump)jump(button.dataset.jump);
    if(button.dataset.stage)selectStage(button.dataset.stage);
  });
  document.addEventListener('change',async event=>{
    const input=event.target;if(!input.matches('input[data-group]'))return;
    input.disabled=true;message('儲存中…');try{await store.toggle(input.dataset.group,input.dataset.id,input.checked);syncUi();}catch(error){syncUi();fatal(error);}finally{input.disabled=false;}
  });
  window.addEventListener('roadmap-progress-change',()=>{syncUi();cloudRender();});
  window.addEventListener('focus',()=>store.refresh().then(syncUi).catch(fatal));
  $('search').oninput=render;$('filter').onchange=render;
  function selectStage(id){activeStage=id;view='roadmap';$('search').value='';$('filter').value='all';history.replaceState(null,'','?view=roadmap#'+id);render();$('chapter-picker').scrollIntoView({block:'start'});}
  $('chapter-select').onchange=event=>selectStage(event.target.value);
  $('continue').onclick=()=>{const start=guide.stages.findIndex(stage=>stage.id===activeStage),next=guide.stages.slice(start).flatMap(stage=>stage.steps).find(step=>!store.data.stepDone[step.id]);if(next)jump(next.id);else message('本章與後續步驟已記錄，可從章節選單回看。');};
  window.addEventListener('popstate',()=>{view=new URL(location.href).searchParams.get('view')||'roadmap';activeStage=guide.stages.find(stage=>stage.id===location.hash.slice(1))?.id||activeStage;render();});
  $('guide-version').textContent=`攻略 v${guide.guideVersion} · 文獻核對 ${guide.lastVerifiedAt}`;
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
  function importRender() { $('import-apply').disabled=busyImport||!importReview||!importReview.downloaded||!importReview.acknowledged||importReview.choices.some(value=>!value); }
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
    $('cloudConnect').disabled=busy;$('cloudConnect').textContent=ready?'連接／切換 Google 帳號':'載入 Google 授權服務';
    $('cloudDisconnect').disabled=busy||!auth.connected;$('cloudVerify').disabled=busy||!account||!auth.connected;
    $('cloudUpload').disabled=busy||!session||!drive.verified;
    $('cloudConfirm').disabled=busy||!session||!drive.verified||!cloudReview||cloudReview.choices.some(value=>!value);
    $('cloudAccount').textContent=account?'目前帳號：'+(account.emailAddress||'已辨識帳號'):'重新整理後需重新連接；Token 僅存在本頁記憶體。';
    $('cloudSafety').textContent=drive.verified?'本次授權：過期版本 412、競爭一勝一拒已通過（尚非實機攻略驗收）。':'本次授權尚未驗證，無法上傳。';
  }
  async function cloudRun(action) {if(busy)return;busy=true;cloudRender();try{await action();}catch(error){$('cloudStatus').textContent=error.message;}finally{busy=false;cloudRender();}}
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
    if(busy)return;
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
  // Exposed contract for isolated regression tests and module integration; no token is exposed.
  window.ROADMAP_APP={store,guide,jump};
  render();message('已儲存在此裝置');cloudRender();
  if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js',{scope:'./'}).catch(error=>message('離線快取尚未就緒：'+error.message));
})();
