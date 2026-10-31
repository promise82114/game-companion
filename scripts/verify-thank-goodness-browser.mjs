import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {chromium} from './browser-runtime.mjs';
import {mockDrive} from './fixtures/drive.mjs';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:4193/game-companion/',slug='thank-goodness-youre-here',url=base+'games/'+slug+'/',prefix='game-companion.'+slug+'.';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
await fs.mkdir('outputs/thank-goodness',{recursive:true});
const errors=[],checks=[];
async function ready(page){await page.waitForFunction(()=>!!window.ROADMAP_APP);}
async function state(page){return page.evaluate(()=>ROADMAP_APP.store.refresh());}
async function edit(page,group,id,value){await page.evaluate(({group,id,value})=>ROADMAP_APP.store.toggle(group,id,value),{group,id,value});}
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true}),page=await context.newPage();
 page.on('pageerror',error=>errors.push(error.message));
 await context.addInitScript(()=>{
  for(const name of ['game-companion.edf-wb.progress.v1','game-companion.edf-wb2.progress.v1','game-companion.mycopunk.progress.v1','game-companion.talos2.progress.v1','edfwb-checklist','edfwb2-checklist'])if(localStorage.getItem(name)===null)localStorage.setItem(name,'synthetic untouched');
  window.__access=[];const get=Storage.prototype.getItem,set=Storage.prototype.setItem;
  Storage.prototype.getItem=function(name){window.__access.push(name);return get.call(this,name);};
  Storage.prototype.setItem=function(name,value){window.__access.push(name);return set.call(this,name,value);};
  const open=indexedDB.open.bind(indexedDB);window.__dbAccess=[];indexedDB.open=function(name,...args){window.__dbAccess.push(name);return open(name,...args);};
 });
 await page.goto(base);await page.locator(`.open-game[href="games/${slug}/"]`).click();await ready(page);
 assert.equal(Object.values((await state(page)).trophyEarned).filter(Boolean).length,0);
 await page.locator('[data-group="stepDone"][data-id="reception-wait"]').check();
 await page.waitForFunction(()=>ROADMAP_APP.store.data.stepDone['reception-wait']===true);
 assert.equal((await state(page)).trophyEarned.t09,undefined);
 await page.locator('[data-group="trophyEarned"][data-id="t09"]').check();
 await page.reload();await ready(page);assert.equal((await state(page)).stepDone['reception-wait'],true);assert.equal((await state(page)).trophyEarned.t09,true);assert.equal((await state(page)).stepDone['leave-reception'],undefined);
 await page.locator('[data-group="trophyEarned"][data-id="t09"]').uncheck();await page.waitForFunction(()=>ROADMAP_APP.store.data.trophyEarned.t09===false);
 assert.equal((await state(page)).stepDone['reception-wait'],true);checks.push('步驟與獎盃獨立、重整與取消勾選');
 await page.locator('#search').fill('synthetic-no-match-834');assert.equal(await page.locator('.empty').isVisible(),true);await page.locator('#search').fill('');
 await page.locator('[data-view="trackers"]').click();assert.equal(await page.locator('.tracker').count(),13);await page.locator('.tracker summary').first().click();assert.equal(await page.locator('.tracker').first().locator('[data-group="stepDone"]').count(),3);
 await page.locator('[data-view="trophies"]').click();assert.equal(await page.locator('.trophy-row').count(),33);await page.locator('#trophy-t18').check();assert.equal((await state(page)).stepDone.mow,undefined);
 await page.locator('[data-view="sources"]').click();assert.equal(await page.locator('.source').count(),10);
 await page.locator('[data-view="roadmap"]').click();
 const lastStage=await page.evaluate(()=>ROADMAP_APP.guide.stages.at(-1).id),lastStep=await page.evaluate(()=>ROADMAP_APP.guide.stages.at(-1).steps[0].id);
 const beforeChapter=await state(page);await page.locator('#chapter-select').selectOption(lastStage);assert.equal(await page.locator('dialog[open]').count(),0);assert.deepEqual(await state(page),beforeChapter);
 await page.locator('#continue').click();assert.match(page.url(),new RegExp('#'+lastStage+'$'));assert.equal(await page.locator('[data-group="stepDone"][data-id="'+lastStep+'"]').isVisible(),true);assert.deepEqual(await state(page),beforeChapter);
 await page.reload();await ready(page);assert.equal(await page.locator('#chapter-select').inputValue(),lastStage);await page.locator('#chapter-select').selectOption(await page.evaluate(()=>ROADMAP_APP.guide.stages[0].id));checks.push('直接切到後期章節、下一步依所選章節、重整保留章節、早期進度不代填');
 const other=await context.newPage();await other.goto(url);await ready(other);
 await Promise.all([edit(page,'stepDone','mow',true),edit(other,'stepDone','stoat',true)]);
 await page.waitForFunction(()=>ROADMAP_APP.store.data.stepDone.stoat===true);const joined=await state(page);assert.equal(joined.stepDone.mow,true);assert.equal(joined.stepDone.stoat,true);checks.push('IndexedDB 跨分頁不同項目不互蓋');
 const source=await page.evaluate(()=>({...RoadmapModel.fresh(),stepDone:{'reception-wait':false,'future-step':true},trophyEarned:{t18:false},futureTop:{synthetic:true}}));
 const sourceRaw=JSON.stringify(source);
 async function upload(){if(!await page.locator('#backupDialog').isVisible())await page.locator('#backupOpen').click();await page.locator('#import-file').setInputFiles({name:'synthetic.json',mimeType:'application/json',buffer:Buffer.from(sourceRaw)});await page.locator('#importDialog').waitFor();}
 async function backup(){await page.locator('#import-source').click();const pending=page.waitForEvent('download');await page.locator('#import-backup').click();const result=await pending;assert.equal(await result.failure(),null);const data=JSON.parse(await fs.readFile(await result.path(),'utf8'));assert.equal(data.sourceRaw,sourceRaw);assert.ok(data.localRaw);await page.locator('#import-ack').check();return data;}
 await upload();assert.equal(await page.locator('#import-apply').isDisabled(),true);await backup();await edit(other,'stepDone','ronny',true);await page.locator('#import-apply').click();await page.waitForFunction(()=>document.getElementById('import-status').textContent.includes('預覽已過期'));assert.equal((await state(page)).stepDone['future-step'],undefined);
 await page.locator('[data-close="importDialog"]').click();await upload();
 await page.evaluate(()=>{window.__url=URL.createObjectURL;URL.createObjectURL=()=>{throw Error('synthetic download failure');};});await page.locator('#import-backup').click();assert.equal(await page.locator('#import-apply').isDisabled(),true);assert.match(await page.locator('#import-status').textContent(),/備份失敗/);await page.evaluate(()=>URL.createObjectURL=window.__url);
 const recovery=await backup();await page.locator('#import-apply').click();await page.locator('#importDialog').waitFor({state:'hidden'});
 const imported=await state(page);assert.equal(imported.stepDone['future-step'],true);assert.equal(imported.stepDone['reception-wait'],false);assert.equal(imported.stepDone.ronny,true);assert.equal(imported.trophyEarned.t18,false);assert.equal(imported.futureTop.synthetic,true);
 await page.locator('#backupOpen').click();const pending=page.waitForEvent('download');await page.locator('#export').click();const exported=await pending;const exportedData=JSON.parse(await fs.readFile(await exported.path(),'utf8'));assert.ok(exportedData.recoveryArchives.some(archive=>archive.sourceRaw===sourceRaw));
 const beforeWrong=await state(page);await page.locator('#import-file').setInputFiles({name:'wrong-game.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...source,gameId:'edf-wb'}))});await page.waitForFunction(()=>document.getElementById('backup-status').textContent.includes('不是此遊戲'));assert.deepEqual(await state(page),beforeWrong);
 // The downloaded two-ended recovery bundle itself is an accepted restore source.
 await page.locator('#import-file').setInputFiles({name:'recovery.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(recovery))});await page.locator('#importDialog').waitFor();assert.match(await page.locator('#import-summary').textContent(),/來源/);await page.locator('[data-close="importDialog"]').click();
 checks.push('保護原文、差異選擇、過期預覽與下載失敗停止、未知項目、備份可還原、跨遊戲拒絕');
 // Transaction failures must not leave a visually checked but unsaved step.
 const beforeFailure=await state(page);await page.evaluate(()=>{window.__put=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(...args){if(this.name==='state')throw new DOMException('synthetic quota','QuotaExceededError');return window.__put.apply(this,args);};});
 await page.evaluate(()=>ROADMAP_APP.jump('main-run'));await page.locator('[data-group="stepDone"][data-id="main-run"]').check();await page.locator('#fatal').waitFor();await page.evaluate(()=>IDBObjectStore.prototype.put=window.__put);assert.deepEqual(await state(page),beforeFailure);assert.equal(await page.locator('[data-group="stepDone"][data-id="main-run"]').isChecked(),false);await page.reload();await ready(page);
 checks.push('IndexedDB 儲存失敗交易回復');
 for(const width of [1440,768,390]){await page.setViewportSize({width,height:width===390?844:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:`outputs/thank-goodness/roadmap-${width}.png`,fullPage:true});}
 // Keyboard can focus and toggle a checkbox; native details remain operable.
 const checkbox=page.locator('[data-group="stepDone"][data-id="main-run"]');await checkbox.focus();await page.keyboard.press('Space');await page.waitForFunction(()=>ROADMAP_APP.store.data.stepDone['main-run']===true);checks.push('390/768/1440 響應式與鍵盤操作');
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));});
 await context.setOffline(true);await page.reload();await ready(page);assert.equal((await state(page)).stepDone['main-run'],true);await context.setOffline(false);checks.push('Service Worker 離線重整');
 const accessed=await page.evaluate(()=>({keys:window.__access,dbs:window.__dbAccess}));assert.ok(accessed.keys.every(key=>key.startsWith('game-companion.thank-goodness-youre-here.')));assert.deepEqual(accessed.dbs,[prefix+'progress.v1']);
 assert.equal(await page.evaluate(()=>localStorage.getItem('game-companion.mycopunk.progress.v1')),'synthetic untouched');await other.close();await context.close();checks.push('其他遊戲儲存隔離');
 // Real module OAuth, adapter and session, with network replaced by synthetic fixtures.
 const mock=mockDrive(),syncContext=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'}),syncPage=await syncContext.newPage();syncPage.on('pageerror',error=>errors.push(error.message));
 await syncContext.route('https://accounts.google.com/gsi/client',route=>route.fulfill({contentType:'application/javascript',body:`window.syntheticAccount='synthetic-a';window.google={accounts:{oauth2:{hasGrantedAllScopes:()=>true,initTokenClient:o=>({requestAccessToken:()=>o.callback({access_token:window.syntheticAccount,expires_in:3600})})}}};`}));
 await syncContext.route('https://www.googleapis.com/**',async route=>{
  const req=route.request(),cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Authorization, Content-Type, If-Match','Access-Control-Allow-Methods':'GET, POST, PATCH, OPTIONS','Access-Control-Expose-Headers':'ETag'};
  if(req.method()==='OPTIONS')return route.fulfill({status:204,headers:cors});
  try{const result=await mock.fetch(req.url(),{method:req.method(),headers:req.headers(),body:req.postData()});await route.fulfill({status:result.status,body:await result.text(),headers:{...Object.fromEntries(result.headers),...cors}});}catch{await route.abort('failed');}
 });
 await syncPage.goto(url);await ready(syncPage);await edit(syncPage,'stepDone','mow',true);await syncPage.locator('#cloudOpen').click();await syncPage.locator('#cloudConnect').click();await syncPage.waitForFunction(()=>document.getElementById('cloudConnect').textContent.includes('連接／'));await syncPage.locator('#cloudConnect').click();await syncPage.waitForFunction(()=>!document.getElementById('cloudVerify').disabled);assert.equal(await syncPage.locator('#cloudUpload').isDisabled(),true);
 const settled=()=>syncPage.waitForFunction(()=>!document.getElementById('cloudConnect').disabled);
 const synced=()=>syncPage.waitForFunction(()=>document.getElementById('cloudStatus').textContent.includes('已完成同步')||document.getElementById('cloudStatus').textContent.includes('已核對並復原'));
 mock.controls.noHeaderEtag=true;mock.controls.noEtag=true;
 await syncPage.locator('#cloudVerify').click();await settled();assert.equal(await syncPage.locator('#cloudUpload').isDisabled(),true);assert.match(await syncPage.locator('#cloudStatus').textContent(),/強 ETag/);
 mock.controls.noEtag=false;mock.controls.ignoreConditions=true;
 await syncPage.locator('#cloudVerify').click();await settled();assert.equal(await syncPage.locator('#cloudUpload').isDisabled(),true);assert.match(await syncPage.locator('#cloudStatus').textContent(),/過期版本/);
 mock.controls.ignoreConditions=false;
 await syncPage.locator('#cloudVerify').click();await syncPage.waitForFunction(()=>!document.getElementById('cloudUpload').disabled);assert.equal([...mock.files.values()].filter(file=>file.name===prefix+'progress.v1.json').length,0);
 await syncPage.locator('#cloudUpload').click();await syncPage.locator('#cloud-review').waitFor();await syncPage.locator('#cloudConfirm').click();await settled();await synced();
 const progress=[...mock.files.values()].find(file=>file.name===prefix+'progress.v1.json');assert.ok(progress);assert.equal(progress.value.data.stepDone.mow,true);assert.deepEqual(progress.value.data.trophyEarned,{});
 // Unknown future field conflict exercises the exact generic Base / Local / Remote path.
 await syncPage.evaluate(()=>ROADMAP_APP.store.transact(data=>({...data,note:'base',revision:data.revision+1})));await syncPage.locator('#cloudUpload').click();await settled();
 await syncPage.evaluate(()=>ROADMAP_APP.store.transact(data=>({...data,note:'local',revision:data.revision+1})));progress.value.data.note='remote';progress.version++;
 await syncPage.locator('#cloudUpload').click();await syncPage.locator('#cloud-rows select').first().waitFor();assert.equal(await syncPage.locator('#cloudConfirm').isDisabled(),true);assert.match(await syncPage.locator('#cloud-rows').textContent(),/base/);await syncPage.locator('#cloud-remote').click();
 await edit(syncPage,'trophyEarned','t18',true);await syncPage.locator('#cloudConfirm').click();await settled();assert.match(await syncPage.locator('#cloudStatus').textContent(),/重新選擇/);assert.equal(await syncPage.locator('#cloudConfirm').isDisabled(),true);await syncPage.locator('#cloud-remote').click();await syncPage.locator('#cloudConfirm').click();await settled();assert.equal((await state(syncPage)).note,'remote');assert.equal((await state(syncPage)).trophyEarned.t18,true);
 const syncOther=await syncContext.newPage();await syncOther.goto(url);await ready(syncOther);await edit(syncPage,'stepDone','mow',false);
 let release,arrived;const reached=new Promise(resolve=>arrived=resolve),hold=new Promise(resolve=>release=resolve);mock.controls.beforePatch=async()=>{arrived();await hold;mock.controls.beforePatch=null;};
 await syncPage.locator('#cloudUpload').click();await reached;await edit(syncOther,'stepDone','mow',true);await edit(syncOther,'stepDone','stoat',true);release();await settled();assert.equal((await state(syncPage)).stepDone.mow,true);assert.equal((await state(syncPage)).stepDone.stoat,true);assert.equal(progress.value.data.stepDone.mow,false);assert.equal(progress.value.data.stepDone.stoat,undefined);assert.match(await syncPage.locator('#cloudStatus').textContent(),/新編輯已保留/);
 await syncPage.locator('#cloudUpload').click();await settled();assert.equal(progress.value.data.stepDone.stoat,true);
 await edit(syncPage,'stepDone','ronny',true);mock.controls.failAfterPatch=true;await syncPage.locator('#cloudUpload').click();await settled();assert.match(await syncPage.locator('#cloudStatus').textContent(),/結果未知/);const patches=mock.requests.filter(req=>req.method==='PATCH').length;await syncPage.locator('#cloudUpload').click();await settled();assert.match(await syncPage.locator('#cloudStatus').textContent(),/已核對並復原/);assert.equal(mock.requests.filter(req=>req.method==='PATCH').length,patches);
 mock.files.set('synthetic-duplicate',{...progress,id:'synthetic-duplicate'});await syncPage.locator('#cloudUpload').click();await settled();assert.match(await syncPage.locator('#cloudStatus').textContent(),/多份同名/);mock.files.delete('synthetic-duplicate');
 mock.controls.failStatus=401;await syncPage.locator('#cloudUpload').click();await settled();assert.equal(await syncPage.locator('#cloudUpload').isDisabled(),true);
 await syncPage.evaluate(()=>window.syntheticAccount='synthetic-b');await syncPage.locator('#cloudConnect').click();await settled();assert.equal(await syncPage.locator('#cloudUpload').isDisabled(),true);await syncPage.locator('#cloudVerify').click();await settled();await syncPage.locator('#cloudUpload').click();await settled();assert.match(await syncPage.locator('#cloud-review-title').textContent(),/首次配對/);assert.equal([...mock.files.values()].filter(file=>file.owner==='synthetic-b'&&file.name===progress.name).length,0);
 assert.ok(mock.requests.filter(req=>req.method==='PATCH').every(req=>req.ifMatch));checks.push('Drive 合成：逐次授權條件寫入／412／競爭、首次配對、三方衝突、過期選擇、同步中跨頁編輯、未知結果復原、同名檔停止、帳號隔離');
 await syncContext.close();checks.push('缺 ETag／不遵守條件寫入的伺服器拒絕進度上傳');
 const corruptContext=await browser.newContext({acceptDownloads:true,serviceWorkers:'block'}),corruptPage=await corruptContext.newPage();corruptPage.on('pageerror',error=>errors.push(error.message));
 await corruptPage.goto(base);
 await corruptPage.evaluate(async dbName=>{
  await new Promise((resolve,reject)=>{const req=indexedDB.open(dbName,1);req.onupgradeneeded=()=>{req.result.createObjectStore('state');req.result.createObjectStore('archives',{autoIncrement:true});};req.onerror=()=>reject(req.error);req.onsuccess=()=>{const db=req.result,tx=db.transaction('state','readwrite');tx.objectStore('state').put({syntheticCorrupt:'keep raw'},'progress');tx.oncomplete=()=>{db.close();resolve();};};});
 },prefix+'progress.v1');
 await corruptPage.goto(url);await corruptPage.locator('#fatal').waitFor();await corruptPage.locator('#backupOpen').click();const corruptDownload=corruptPage.waitForEvent('download');await corruptPage.locator('#export').click();const rawDownload=await corruptDownload;const rawData=JSON.parse(await fs.readFile(await rawDownload.path(),'utf8'));assert.equal(rawData.raw.syntheticCorrupt,'keep raw');assert.equal(await corruptPage.locator('#import-file').isDisabled(),true);await corruptContext.close();checks.push('損壞進度停止初始化且原文可下載');assert.deepEqual(errors,[]);
 await fs.writeFile('outputs/thank-goodness/browser-result.json',JSON.stringify({passed:true,checks,errors},null,2)+'\n');console.log(JSON.stringify({passed:true,checks,errors}));
}finally{await browser.close();}
