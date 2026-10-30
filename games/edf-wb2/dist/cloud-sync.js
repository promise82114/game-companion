/* 沿用 GIS / Drive 模組；各遊戲手動同步，沒有背景寫入或自動授權。 */
(function(global){
 'use strict';
 const $=id=>document.getElementById(id),config=global.SIDE_PROJECT_CLOUD_CONFIG,local=global.EDF_CHECKLIST_STORAGE,core=global.SideProjectSync,prefix='game-companion.'+config.gameId+'.';
 let ready=false,busy=false,epoch=0,account=null,session=null,review=null,remote=null,drive=null;
 const auth=new global.SideProjectAuth.GoogleAuth(config.clientId,()=>{
  if(!auth.connected){epoch++;drive?.reset();account=null;session=null;review=null;remote=null;}
  render();
 });
 drive=new global.SideProjectDrive.DriveAppData(auth,config.fileName,config);
 const dialog=$('cloudDialog');
 dialog.insertAdjacentHTML('beforeend','<section class="sync-review"><div class="cloud-actions"><button id="cloudVerify" class="button">驗證 Drive 寫入安全</button></div><p id="cloudSafety" role="status">本次授權尚未驗證條件更新能力。</p><section id="cloudConflicts" hidden><h3 id="cloudConflictTitle">同步差異</h3><p id="cloudConflictSummary"></p><div class="cloud-actions"><button id="cloudAllLocal" class="button">衝突全部使用本機</button><button id="cloudAllRemote" class="button">衝突全部使用雲端</button></div><div class="migration-scroll"><table><thead><tr><th>項目／欄位</th><th>共同 Base</th><th>本機</th><th>雲端</th><th>選擇</th></tr></thead><tbody id="cloudConflictRows"></tbody></table></div><button id="cloudConfirm" class="button primary" disabled>套用選擇並同步</button></section></section>');
 $('cloudAuto').checked=false;$('cloudAuto').disabled=true;$('cloudAuto').closest('label').hidden=true;
 function message(text){$('cloudStatus').textContent=text;}
 function summary(data){return Object.values(data?.entries||{}).filter(e=>e?.owned===true).length+' 項已取得 · '+Object.values(data?.missionNotes||{}).filter(e=>e?.text).length+' 則筆記';}
 function render(){
  const connected=auth.connected&&!!account;let dirty=true;try{dirty=session?.dirty()??true;}catch{}
  $('cloudQuick').textContent=!auth.connected?'雲端未連接':busy?'雲端處理中…':!config.writesEnabled?'雲端測試階段':!drive?.verified?'雲端待安全驗證':dirty?'有未同步變更':'雲端已同步';
  $('cloudConnect').disabled=busy;$('cloudConnect').textContent=busy?'處理中…':ready?'連接／切換 Google 帳號':'載入 Google 授權服務';
  $('cloudDisconnect').hidden=!auth.connected;$('cloudDisconnect').disabled=busy;
  $('cloudRead').disabled=busy||!connected;$('cloudVerify').disabled=busy||!connected;
  $('cloudUpload').disabled=busy||!connected||!config.writesEnabled||!drive?.verified||!!local.externalRaw();$('cloudUpload').textContent='立即同步進度';
  $('cloudChoices').hidden=!remote||!connected;for(const id of ['cloudMerge','cloudReplace'])$(id).disabled=busy;
  $('cloudAuthStatus').textContent=account?'目前帳號：'+(account.emailAddress||'已辨識 Google 帳號')+'。Token 僅留在此頁記憶體；每款遊戲與帳號的 Base 獨立。':'重新整理或授權過期後需重新連接；不自動彈出授權。';
  $('cloudConfirm').disabled=busy||!!local.externalRaw()||!review||review.choices.some(choice=>!choice)||!config.writesEnabled||!drive?.verified;
  $('cloudSafety').textContent=drive?.verified?'本次授權測試通過：過期版本 412、競爭一勝一拒、內容核對一致。':'本次授權尚未驗證條件更新能力；不允許上傳。';
 }
 async function run(action){if(busy)return;busy=true;render();try{await action();}catch(error){message(error.message);if(['expired','cancelled'].includes(error.code)){review=null;$('cloudConflicts').hidden=true;}}finally{busy=false;render();}}
 function check(expected){if(epoch!==expected||!auth.connected)throw Object.assign(Error('帳號或授權已變更，請重新比較。'),{code:'cancelled'});}
 async function identity(id){const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(config.projectId+'|'+id));return [...new Uint8Array(bytes)].map(v=>v.toString(16).padStart(2,'0')).join('');}
 async function locked(action){
  if(!navigator.locks)throw Error('此瀏覽器缺少跨分頁同步鎖，請改用支援 Web Locks 的瀏覽器。');
  return navigator.locks.request(prefix+'sync.'+session.identity,{ifAvailable:true},lock=>{if(!lock)throw Error('另一個分頁正在同步，請稍後手動重試。');return action();});
 }
 function valueText(value){return value===undefined?'未記錄':JSON.stringify(value,null,2);}
 const labels=new Map(global.EDF_CATALOG.items.map(i=>[i.id,i.name+' '+i.variant]));
 function show(result){
  if(result.kind==='complete'){
   review=null;$('cloudConflicts').hidden=true;
   message((result.recovered?'已核對並復原前次同步。':'已完成同步。')+(result.dirty?'同步期間的新編輯已保留，仍有未同步變更。':'本機與雲端一致。'));return;
  }
  review={...result,choices:result.plan.conflicts.map(()=>'')};$('cloudConflictRows').replaceChildren();
  $('cloudConflictTitle').textContent=result.first?'首次同步：確認此帳號的資料配對':'三方同步衝突';
  $('cloudConflictSummary').textContent=(result.changed?'預覽後有新變更，已重新比較，請重新選擇。 ':'')+result.plan.conflicts.length+' 筆需選擇；'+summary(result.start)+'。未選完不會寫入。表格可左右捲動。';
  result.plan.conflicts.forEach((conflict,index)=>{
   const tr=document.createElement('tr');
   for(const text of [(labels.get(conflict.path[1])||conflict.path.join(' / '))+' / '+conflict.path.slice(2).join(' / '),valueText(conflict.base),valueText(conflict.local),valueText(conflict.remote)]){const td=document.createElement('td');td.textContent=text;tr.append(td);}
   const td=document.createElement('td'),select=document.createElement('select');select.setAttribute('aria-label','同步衝突 '+(index+1));
   for(const [value,text]of [['','請選擇'],['local','使用本機'],['remote','使用雲端']])select.add(new Option(text,value));
   select.onchange=()=>{review.choices[index]=select.value;render();};td.append(select);tr.append(td);$('cloudConflictRows').append(tr);
  });
  $('cloudConflicts').hidden=false;message(result.first?'沒有共同 Base，請確認帳號與差異後首次同步。':'有無法自動合併的變更，請逐筆或批次選擇。');render();
 }
 function open(){
  dialog.showModal();try{$('cloudLocalSummary').textContent=summary(local.get());}catch(error){message(error.message);}
  if(!ready)run(async()=>{await auth.prepare();ready=true;message('Google 授權服務已就緒，按連接開始。');});else render();
 }
 $('cloudOpen').onclick=open;$('cloudQuick').onclick=open;
 $('cloudConnect').onclick=()=>{
  if(!ready){run(async()=>{await auth.prepare();ready=true;});return;}
  review=null;remote=null;$('cloudConflicts').hidden=true;
  const grant=auth.connect({selectAccount:true}),expected=epoch;
  run(async()=>{await grant;check(expected);account=await drive.account();check(expected);const binding=await identity(account.permissionId);check(expected);
   session=new global.SideProjectSyncSession({drive,local,storage:localStorage,prefix,gameId:config.gameId,projectId:config.projectId,identity:binding,check:()=>check(expected)});
   message('已連接此帳號。請先驗證安全，再手動同步；不會自動讀寫進度。');
  });
 };
 $('cloudDisconnect').onclick=()=>{epoch++;drive.reset();auth.disconnect();account=null;session=null;review=null;remote=null;$('cloudConflicts').hidden=true;message('已中斷連接。兩端進度與 Base 保留；已送出的請求需下次讀取確認。');render();};
 $('cloudVerify').onclick=()=>run(async()=>{const expected=epoch;message('只以唯一名稱的合成測試檔驗證，不讀寫遊戲進度。');const proof=await drive.verifySafety();check(expected);message('條件寫入測試通過：過期 412；競爭 '+proof.parallelStatuses.join(' / ')+'。可以手動同步。');});
 $('cloudRead').onclick=()=>run(async()=>{remote=await session.remote();$('cloudRemoteSummary').textContent=remote?summary(remote.data):'此遊戲的新命名空間尚無備份';message(remote?'已下載供比較，尚未套用或上傳。':'尚無新備份；舊站請使用 JSON 匯入。');});
 $('cloudUpload').onclick=()=>run(()=>locked(async()=>show(await session.start())));
 $('cloudConfirm').onclick=()=>run(()=>locked(async()=>{const current=review;show(await session.confirm(current,current.choices));}));
 for(const [id,choice]of [['cloudAllLocal','local'],['cloudAllRemote','remote']])$(id).onclick=()=>{if(!review)return;review.choices.fill(choice);$('cloudConflictRows').querySelectorAll('select').forEach(select=>select.value=choice);render();};
 function preview(){if(!remote)return;dialog.close();$('backupDialog').showModal();global.EDF_MIGRATION.preview(remote.value,'Google Drive 手動還原（不會上傳）');}
 $('cloudMerge').onclick=preview;$('cloudReplace').onclick=preview;
 $('cloudExport').onclick=()=>local.export(global.SideProjectProgress.pack(config.projectId,local.get()));
 global.addEventListener('edf-progress-change',render);global.addEventListener('edf-external-progress',render);
 global.addEventListener('storage',event=>{if(event.key?.startsWith(prefix))render();});
 render();
})(window);
