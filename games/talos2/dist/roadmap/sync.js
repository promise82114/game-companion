// 沿用同一 OAuth client、appDataFolder adapter 與逐次授權驗證；沒有另一套登入流程。
export function setupSync(config, local, core, notify) {
 const $=id=>document.getElementById(id), status=text=>{$('sync-status').textContent=text;};
 let ready=false,busy=false,epoch=0,drive,session,review;
 const auth=new window.SideProjectAuth.GoogleAuth('260923931716-cevi1vcfrfoibmn3i2fdpsn1epg7hr3g.apps.googleusercontent.com',()=>{
   if(!auth.connected){epoch++;drive?.reset();session=null;review=null;$('sync-review').hidden=true;}render();
 });
 drive=new window.SideProjectDrive.DriveAppData(auth,config.driveFileName,{gameId:config.gameId,projectId:config.driveProjectId,writesEnabled:true});
 function render(){
   $('sync-connect').disabled=busy;$('sync-connect').textContent=ready?'連接／切換 Google 帳號':'載入 Google 授權服務';
   $('sync-disconnect').disabled=busy||!auth.connected;$('sync-verify').disabled=busy||!session;
   $('sync-start').disabled=busy||!session||!drive.verified;
   $('sync-confirm').disabled=busy||!review||review.choices.some(c=>!c)||!drive.verified;
 }
 async function run(fn){if(busy)return;busy=true;render();try{await fn();}catch(e){status(e.message);}finally{busy=false;render();}}
 function check(expected){if(epoch!==expected||!auth.connected)throw Error('授權或帳號已變更，請重新比較。');}
 const value=v=>v===undefined?'未記錄':JSON.stringify(v,null,2);
 function show(result){
   if(result.kind==='complete'){review=null;$('sync-review').hidden=true;status((result.recovered?'已核對前次寫入並恢復。':'同步完成。')+(result.dirty?'同步期間的新編輯保留，仍有未同步變更。':'兩端一致。'));notify();return;}
   review={...result,choices:result.plan.conflicts.map(()=>'')};$('sync-rows').replaceChildren();
   $('sync-review-title').textContent=(result.changed?'預覽已過期，已重新比較。':'')+(result.first?'首次帳號／遊戲配對確認':'Base／Local／Remote 衝突');
   result.plan.conflicts.forEach((c,i)=>{
     const row=document.createElement('div');row.className='diff';const title=document.createElement('strong');title.textContent=c.path.join(' / ');row.append(title);
     const values=document.createElement('div');values.className='diff-values';for(const k of ['base','local','remote']){const pre=document.createElement('pre');pre.textContent=k+'\n'+value(c[k]);values.append(pre);}row.append(values);
     const select=document.createElement('select');select.setAttribute('aria-label','同步衝突 '+(i+1));for(const [key,label]of [['','請選擇'],['local','本機'],['remote','雲端']])select.add(new Option(label,key));select.onchange=()=>{review.choices[i]=select.value;render();};row.append(select);$('sync-rows').append(row);
   });$('sync-review').hidden=false;
   status('請確認此帳號的配對及所有差異；'+result.plan.conflicts.length+' 筆需選擇。確認前不寫入進度。');
 }
 async function locked(fn){if(!navigator.locks)throw Error('此瀏覽器缺少跨分頁同步鎖，請使用支援 Web Locks 的瀏覽器。');return navigator.locks.request(config.storagePrefix+'sync.'+session.identity,{ifAvailable:true},lock=>{if(!lock)throw Error('另一個分頁正在同步，請稍後手動重試。');return fn();});}
 $('sync-connect').onclick=()=>{
   if(!ready){run(async()=>{await auth.prepare();ready=true;status('授權服務已就緒，請再按連接。');});return;}
   const grant=auth.connect({selectAccount:true}),expected=epoch;review=null;$('sync-review').hidden=true;
   run(async()=>{await grant;check(expected);const account=await drive.account();check(expected);
     const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(config.driveProjectId+'|'+account.permissionId));check(expected);
     const identity=[...new Uint8Array(bytes)].map(v=>v.toString(16).padStart(2,'0')).join('');
     session=new window.SideProjectSyncSession({drive,local,storage:localStorage,prefix:config.storagePrefix,gameId:config.gameId,projectId:config.driveProjectId,identity,check:()=>check(expected)});
     status('已連接帳號。請先執行獨立合成檔安全驗證，再手動同步。');
   });
 };
 $('sync-disconnect').onclick=()=>{auth.disconnect();drive.reset();session=null;review=null;status('已中斷。進度與各帳號 Base 保留。');render();};
 $('sync-verify').onclick=()=>run(async()=>{const expected=epoch;status('驗證本次授權的合成檔條件寫入；不操作遊戲進度。');const p=await drive.verifySafety();check(expected);status('本次驗證通過：過期 '+p.staleStatus+'；競爭 '+p.parallelStatuses.join(' / ')+'。可手動同步。');});
 $('sync-start').onclick=()=>run(()=>locked(async()=>show(await session.start())));
 $('sync-confirm').onclick=()=>run(()=>locked(async()=>{const current=review;show(await session.confirm(current,current.choices));}));
 for(const [id,choice]of [['sync-local','local'],['sync-remote','remote']])$(id).onclick=()=>{if(!review)return;review.choices.fill(choice);$('sync-rows').querySelectorAll('select').forEach(s=>s.value=choice);render();};
 render();return {open:()=>{$('sync-dialog').showModal();render();}};
}
