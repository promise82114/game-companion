import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {chromium} from './browser-runtime.mjs';
import {mockDrive} from './fixtures/drive.mjs';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:4197/game-companion/',url=base+'games/talos2/';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
await fs.mkdir('outputs/talos2',{recursive:true});
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true}),page=await context.newPage(),errors=[],accesses=[],mock=mockDrive();
 page.on('pageerror',e=>errors.push(e.message));
 await context.exposeBinding('__storageAudit',(_source,entry)=>accesses.push(entry));
 await context.addInitScript(()=>{
  const sentinels={'edfwb-checklist':'synthetic-old','game-companion.edf-wb.progress.v1':'synthetic-wb','game-companion.edf-wb2.progress.v1':'synthetic-wb2','game-companion.mycopunk.progress.v1':'synthetic-mycopunk'};
  for(const [k,v]of Object.entries(sentinels))if(localStorage.getItem(k)===null)localStorage.setItem(k,v);
  const get=Storage.prototype.getItem,set=Storage.prototype.setItem,open=IDBFactory.prototype.open;
  Storage.prototype.getItem=function(k){void window.__storageAudit({op:'get',key:k});return get.call(this,k);};Storage.prototype.setItem=function(k,v){void window.__storageAudit({op:'set',key:k});return set.call(this,k,v);};
  IDBFactory.prototype.open=function(name,version){void window.__storageAudit({op:'idb',key:name});return open.call(this,name,version);};
 });
 await context.route('**/*',async route=>{
  const req=route.request(),u=new URL(req.url());
  if(u.origin===new URL(base).origin)return route.continue();
  if(u.href==='https://accounts.google.com/gsi/client')return route.fulfill({contentType:'application/javascript',body:`window.syntheticAccount='synthetic-a';window.google={accounts:{oauth2:{hasGrantedAllScopes:()=>true,initTokenClient:o=>({requestAccessToken:()=>o.callback({access_token:window.syntheticAccount,expires_in:3600})})}}};`});
  if(u.hostname==='www.googleapis.com'){
   const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Authorization, Content-Type, If-Match','Access-Control-Allow-Methods':'GET, POST, PATCH, OPTIONS','Access-Control-Expose-Headers':'ETag'};
   if(req.method()==='OPTIONS')return route.fulfill({status:204,headers:cors});
   try{const result=await mock.fetch(req.url(),{method:req.method(),headers:req.headers(),body:req.postData()});return route.fulfill({status:result.status,body:await result.text(),headers:{...Object.fromEntries(result.headers),...cors}});}catch{return route.abort('failed');}
  }return route.abort();
 });
 await page.goto(base);await page.locator('.open-game[href="games/talos2/"]').click();await page.locator('#trophy-count').waitFor();
 assert.match(await page.locator('#trophy-count').textContent(),/0\s*\/\s*60/);
 assert.equal(await page.locator('.branch-lane').count(),3);assert.equal(await page.locator('.stage').count(),8);
 await page.screenshot({path:'outputs/talos2/desktop.png',fullPage:false});
 await page.locator('[data-complete="calibration"]').check();await page.reload();await page.locator('[data-complete="calibration"]:checked').waitFor();
 assert.match(await page.locator('#trophy-count').textContent(),/0\s*\/\s*60/);
 await page.locator('[data-view="trophies"]').click();await page.locator('[data-trophy="chicken"]').check();await page.waitForFunction(()=>document.getElementById('trophy-count').textContent.includes('1 '));
 await page.locator('[data-view="roadmap"]').click();assert.equal(await page.locator('[data-complete="chicken"]').isChecked(),false);
 await page.locator('[data-stage="P1"]').click();await page.locator('#stage-dialog').waitFor();assert.match(await page.locator('#stage-warning').textContent(),/Doge/);assert.equal(await page.locator('#stage-confirm').isDisabled(),true);await page.locator('#stage-cancel').click();
 await page.locator('[data-stage="P1"]').click();await page.locator('#stage-ack').check();await page.locator('#stage-confirm').click();await page.waitForFunction(()=>document.querySelector('[data-stage="P1"]').getAttribute('aria-current')==='step');
 assert.equal(await page.locator('[data-complete="chicken"]').isChecked(),false);
 await page.locator('[data-branch="rand"]').selectOption('completed');await page.waitForFunction(()=>document.querySelector('[data-branch="rand"]').value==='completed');assert.equal(await page.locator('[data-branch="byron"]').inputValue(),'not_started');
 await page.locator('[data-filter="backup"]').click();assert.ok(await page.locator('.step').count()>0);await page.locator('[data-filter="all"]').click();
 await page.locator('[data-detail="save-safety"] summary').click();await page.locator('[data-backup="save-safety"]').click();await page.locator('#backup-ack').check();await page.locator('#backup-note').fill('synthetic PS5 timestamp only');await page.locator('#backup-confirm').click();await page.waitForFunction(()=>document.getElementById('step-save-safety').textContent.includes('synthetic PS5 timestamp only'));
 assert.equal(await page.locator('[data-complete="save-safety"]').isChecked(),false);
 // IDB 兩分頁讀取最新值再交易，不會用舊畫面整包覆蓋。
 const other=await context.newPage();await other.goto(url);await other.locator('#trophy-count').waitFor();
 await Promise.all([page.locator('[data-complete="chicken"]').check(),other.locator('[data-complete="petition"]').check()]);
 const getData=async target=>target.evaluate(async()=>{const {roadmap}=await import('./data.js');const {createStore}=await import('./roadmap/store.js');const store=createStore(roadmap,window.SideProjectSync);try{return await store.open();}finally{store.close();}});
 await page.waitForFunction(async()=>{const {roadmap}=await import('./data.js');const {createStore}=await import('./roadmap/store.js');const s=createStore(roadmap,window.SideProjectSync);try{const p=await s.open();return p.steps.chicken?.status==='completed'&&p.steps.petition?.status==='completed';}finally{s.close();}});
 await other.close();
 const local=await getData(page),source={...local,steps:{...local.steps,chicken:{status:'missed',note:'synthetic imported note'},'future-step':{status:'unknown',extra:{keep:true}}},futureTop:{keep:'synthetic'}};
 await page.locator('[data-view="backup"]').click();
 const upload=async obj=>{await page.locator('#import-file').setInputFiles({name:'synthetic.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(obj))});await page.locator('#import-dialog').waitFor();};
 await upload(source);assert.equal(await page.locator('#import-apply').isDisabled(),true);await page.locator('#import-source').click();assert.equal(await page.locator('#import-apply').isDisabled(),true);
 const backup=async()=>{const event=page.waitForEvent('download');await page.locator('#import-download').click();const file=await event;assert.equal(await file.failure(),null);const bundle=JSON.parse(await fs.readFile(await file.path(),'utf8'));assert.equal(bundle.recoveryBundle.sourceRaw,JSON.stringify(source));await page.locator('#import-ack').check();};
 await backup();
 // 預覽過期：以新 IDB 交易加入進度，舊預覽必須停止。
 await page.evaluate(async()=>{const {roadmap}=await import('./data.js');const {createStore}=await import('./roadmap/store.js');const s=createStore(roadmap,window.SideProjectSync);await s.open();await s.update(p=>{p.steps.calibration.note='synthetic changed during preview';return p;});s.close();});
 await page.locator('#import-apply').click();await page.waitForFunction(()=>document.getElementById('import-status').textContent.includes('預覽已過期'));assert.equal(await page.locator('#import-apply').isDisabled(),true);
 await page.locator('[data-close="import-dialog"]').click();await upload(source);await page.locator('#import-source').click();await backup();await page.locator('#import-apply').click();await page.locator('#import-dialog').waitFor({state:'hidden'});
 const imported=await getData(page);assert.equal(imported.steps.chicken.status,'missed');assert.equal(imported.futureTop.keep,'synthetic');assert.equal(imported.steps['future-step'].extra.keep,true);assert.ok(imported.backups['save-safety'].confirmedAt);
 // 下載失敗不准套用。
 await upload(source);await page.evaluate(()=>{window.originalURL=URL.createObjectURL;URL.createObjectURL=()=>{throw Error('synthetic download failed');};});await page.locator('#import-download').click();await page.waitForFunction(()=>document.getElementById('import-status').textContent.includes('備份失敗'));assert.equal(await page.locator('#import-ack').isDisabled(),true);assert.equal(await page.locator('#import-apply').isDisabled(),true);await page.evaluate(()=>URL.createObjectURL=window.originalURL);await page.locator('[data-close="import-dialog"]').click();
 const beforeWrong=JSON.stringify(await getData(page));await page.locator('#import-file').setInputFiles({name:'wrong.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...source,gameId:'edf-wb'}))});await page.waitForFunction(()=>document.getElementById('feedback').textContent.includes('識別'));assert.equal(JSON.stringify(await getData(page)),beforeWrong);
 // 模擬 Google：正式帳號與現有 profile 全未使用。
 await page.locator('#open-sync').click();await page.locator('#sync-connect').click();await page.waitForFunction(()=>document.getElementById('sync-connect').textContent.includes('連接／'));await page.locator('#sync-connect').click();await page.waitForFunction(()=>!document.getElementById('sync-verify').disabled);assert.equal(await page.locator('#sync-start').isDisabled(),true);
 await page.locator('#sync-verify').click();await page.waitForFunction(()=>!document.getElementById('sync-start').disabled);await page.locator('#sync-start').click();await page.locator('#sync-review').waitFor();assert.equal([...mock.files.values()].filter(f=>f.name==='game-companion.talos2.progress.v1.json').length,0);
 await page.locator('#sync-confirm').click();await page.waitForFunction(()=>document.getElementById('sync-status').textContent.includes('同步完成'));
 const remote=[...mock.files.values()].find(f=>f.name==='game-companion.talos2.progress.v1.json');assert.equal(remote.value.data.steps['future-step'].extra.keep,true);
 // 三方衝突與同步期間編輯。
 await page.evaluate(async()=>{const {roadmap}=await import('./data.js');const {createStore}=await import('./roadmap/store.js');const s=createStore(roadmap,window.SideProjectSync);await s.open();await s.update(p=>{p.steps.chicken.note='synthetic local conflict';return p;});s.close();});remote.value.data.steps.chicken.note='synthetic remote conflict';remote.version++;
 await page.locator('#sync-start').click();await page.locator('#sync-rows select').first().waitFor();assert.equal(await page.locator('#sync-confirm').isDisabled(),true);assert.match(await page.locator('#sync-rows').textContent(),/synthetic local conflict/);assert.match(await page.locator('#sync-rows').textContent(),/synthetic remote conflict/);await page.locator('#sync-remote').click();await page.locator('#sync-confirm').click();await page.waitForFunction(()=>document.getElementById('sync-status').textContent.includes('同步完成'));assert.equal((await getData(page)).steps.chicken.note,'synthetic remote conflict');
 // 真實 IDB 交易 rebase：PATCH 已送出後的新編輯必須保留，下一次再上傳。
 const editLocal=note=>page.evaluate(async note=>{const {roadmap}=await import('./data.js');const {createStore}=await import('./roadmap/store.js');const s=createStore(roadmap,window.SideProjectSync);await s.open();await s.update(p=>{p.steps.chicken.note=note;return p;});s.close();},note);
 await editLocal('synthetic before PATCH');let release,arrived;const reached=new Promise(resolve=>arrived=resolve),hold=new Promise(resolve=>release=resolve);
 mock.controls.beforePatch=async()=>{arrived();await hold;mock.controls.beforePatch=null;};await page.locator('#sync-start').click();await reached;await editLocal('synthetic during PATCH');release();await page.waitForFunction(()=>!document.getElementById('sync-start').disabled);assert.equal((await getData(page)).steps.chicken.note,'synthetic during PATCH');assert.equal(remote.value.data.steps.chicken.note,'synthetic before PATCH');assert.match(await page.locator('#sync-status').textContent(),/未同步/);await page.locator('#sync-start').click();await page.waitForFunction(()=>!document.getElementById('sync-start').disabled);assert.equal(remote.value.data.steps.chicken.note,'synthetic during PATCH');
 await editLocal('synthetic lost acknowledgement');mock.controls.failAfterPatch=true;await page.locator('#sync-start').click();await page.waitForFunction(()=>document.getElementById('sync-status').textContent.includes('結果未知'));const patchCount=mock.requests.filter(r=>r.method==='PATCH').length;await page.locator('#sync-start').click();await page.waitForFunction(()=>document.getElementById('sync-status').textContent.includes('恢復'));assert.equal(mock.requests.filter(r=>r.method==='PATCH').length,patchCount);
 await page.locator('#sync-disconnect').click();assert.equal(await page.locator('#sync-start').isDisabled(),true);await page.locator('[data-close="sync-dialog"]').click();
 await page.locator('[data-view="roadmap"]').click();
 for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'overflow '+width);await page.screenshot({path:'outputs/talos2/'+width+'.png',fullPage:false});}
 await page.locator('[data-branch-detail="rand"] summary').click();await page.screenshot({path:'outputs/talos2/mobile-branch.png'});
 // 閉合階段中的深連結仍會展開目標；點擊下一步也可開啟未顯示篩選的步驟。
 await page.goto(url+'?view=roadmap#step-w2-backup');await page.waitForFunction(()=>document.querySelector('[data-detail="w2-backup"]')?.open===true);
 // 配額／IDB put 失敗時不重設，也不偷偷回退至他遊戲儲存。
 const beforeQuota=await getData(page);await page.evaluate(()=>{window.originalPut=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(){throw new DOMException('synthetic quota','QuotaExceededError');};});
 await page.locator('[data-complete="w2-backup"]').check();await page.waitForFunction(()=>document.getElementById('feedback').textContent.includes('synthetic quota'));await page.evaluate(()=>IDBObjectStore.prototype.put=window.originalPut);assert.deepEqual(await getData(page),beforeQuota);
 // 不相容資料不得用 fresh 重設；原文仍能從錯誤畫面下載。
 await page.evaluate(async()=>{const db=await new Promise((resolve,reject)=>{const r=indexedDB.open('game-companion.talos2.progress.v1',1);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});await new Promise((resolve,reject)=>{const tx=db.transaction('records','readwrite'),s=tx.objectStore('records'),r=s.get('progress');r.onsuccess=()=>s.put({...r.result,schema:999,syntheticCorruptMarker:'retain-original'},'progress');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});db.close();});await page.reload();await page.locator('#raw-recovery').waitFor();assert.match(await page.locator('#app').textContent(),/沒有重設/);const rawEvent=page.waitForEvent('download');await page.locator('#raw-recovery').click();const rawFile=await rawEvent,rawBundle=JSON.parse(await fs.readFile(await rawFile.path(),'utf8'));const rawProgress=rawBundle.records.find(r=>r.key==='progress').value;assert.equal(rawProgress.schema,999);assert.equal(rawProgress.syntheticCorruptMarker,'retain-original');assert.ok(Object.keys(rawBundle.syncState).every(key=>key.startsWith('game-companion.talos2.sync.')));
 assert.deepEqual(errors,[]);
 const forbidden=accesses.filter(a=>!a.key.startsWith('game-companion.talos2.'));assert.deepEqual(forbidden,[]);
 await fs.writeFile('outputs/talos2/browser-result.json',JSON.stringify({passed:true,checks:['portal/direct-route/reload','60 base/9 DLC excluded','independent trophies/steps/backups/branches','stage warning and acknowledgement','filters and deep links','IDB cross-tab transactions','unknown fields/raw archives','import stale preview/download failure/wrong game','synthetic OAuth/CAS gate/first pairing/three-way conflict','IDB in-flight edits/rebase','lost acknowledgement read-before-retry','corrupt/newer schema preserved and raw export','1440/768/390/320 no overflow','quota stops without reset','storage namespace isolation'],pageErrors:errors,storageAccesses:accesses.length},null,2));
 console.log(JSON.stringify({passed:true,gameId:'talos2',storageAccesses:accesses.length,screenshots:'outputs/talos2/'}));await context.close();
}finally{await browser.close();}
