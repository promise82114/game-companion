import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from './browser-runtime.mjs';

const base=process.env.TEST_BASE_URL||'http://127.0.0.1:4190/game-companion/';
const url=base+'games/grounded/';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
const context=await browser.newContext({acceptDownloads:true,viewport:{width:1440,height:1000},serviceWorkers:'block'});
const errors=[],external=[];
await context.route('https://**',route=>{external.push(route.request().url());return route.abort();});
const visit=async(page,query)=>{await page.goto(url+'?view='+query);await page.locator('#app h1').waitFor();};
const read=page=>page.evaluate(async()=>{
 const db=await new Promise((resolve,reject)=>{const q=indexedDB.open('game-companion.grounded.progress.v1');q.onsuccess=()=>resolve(q.result);q.onerror=()=>reject(q.error);});
 try{return await new Promise((resolve,reject)=>{const q=db.transaction('records').objectStore('records').get('progress');q.onsuccess=()=>resolve(q.result);q.onerror=()=>reject(q.error);});}finally{db.close();}
});
try{
 await fs.mkdir('outputs/grounded',{recursive:true});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await verifyShieldPairings(page);
 await visit(page,'map&scope=ng&item=ng-molar-001');
 assert.equal(await page.locator('[data-map-list]').count(),219);
 assert.equal(await page.locator('#map-check-ng-molar-001').isDisabled(),true);
 assert.equal(await page.locator('#map-absent-ng-molar-001').isDisabled(),true);
 assert.match(await page.locator('#ng-map-count').innerText(),/尚未建立 NG\+/);
 await page.locator('[data-map-types=none]').click();await page.locator('#map-type-underwater').check();assert.equal(await page.locator('[data-map-list]').count(),21);
 await page.locator('[data-map-types=none]').click();await page.locator('#map-type-ground').check();assert.equal(await page.locator('[data-map-list]').count(),198);
 await page.locator('#map-type-underwater').check();assert.equal(await page.locator('[data-map-list]').count(),219,'NG+ 兩種候選可同時顯示');
 await page.locator('#map-type-ground').uncheck();assert.equal(await page.locator('[data-map-list]').count(),21);
 await page.locator('#map-scope-first').click();
 assert.equal(await page.locator('[data-map-list]').count(),433);
 assert.equal(await page.locator('[data-map-list^="ng-molar-"]').count(),0);
 await page.evaluate(async()=>{
  const {newRun}=await import('./model.js');
  const db=await new Promise(resolve=>{const q=indexedDB.open('game-companion.grounded.progress.v1');q.onsuccess=()=>resolve(q.result);});
  try{await new Promise((resolve,reject)=>{const tx=db.transaction('records','readwrite'),store=tx.objectStore('records'),q=store.get('progress');q.onsuccess=()=>{const p=q.result,w=p.worlds[p.currentWorldId];w.runs['ng-one']=newRun(1);w.runs['ng-two']=newRun(2);w.runs['ng-one'].ngMolars={status:'unknown',count:7};p.futureUnknown={keep:true};store.put(p,'progress');};tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}finally{db.close();}
 });
 await visit(page,'map&scope=ng&run=ng-one');
 await page.locator('#map-item-ng-molar-001').click();
 assert.match(await page.locator('#map-selection').innerText(),/如何抵達/);
 const other=await context.newPage();other.on('pageerror',e=>errors.push(e.message));
 await visit(other,'map&scope=ng&run=ng-one&item=ng-molar-001');
 await page.locator('#map-check-ng-molar-001').check();
 await page.locator('#map-item-ng-molar-001').waitFor({state:'hidden'});
 await other.locator('#map-check-ng-molar-001:checked').waitFor();
 assert.equal(await other.locator('[data-yard-pin="ng-molar-001"] image').evaluate(node=>getComputedStyle(node).opacity),'0.3');
 assert.match(await page.locator('#ng-map-count').innerText(),/1／66/);
 let p=await read(page),w=p.worlds[p.currentWorldId];
 assert.equal(w.currentRunId,'base');
 assert.equal(w.runs['ng-one'].collectibles['ng-molar-001'].status,'obtained');
 assert.equal(w.runs['ng-one'].ngMolars.count,7,'不覆寫手動計數');
 assert.deepEqual(w.runs.base.collectibles,{});assert.deepEqual(w.runs['ng-two'].collectibles,{});
 await other.goto(url+'?view=map&scope=ng&run=ng-one&item=ng-molar-002');
 await other.locator('#map-absent-ng-molar-002').waitFor();
 await page.locator('#map-item-ng-molar-002').click();
 await page.locator('#map-absent-ng-molar-002').check();
 await page.locator('#map-item-ng-molar-002').waitFor({state:'hidden'});
 await other.locator('#map-absent-ng-molar-002:checked').waitFor();
 assert.equal(await other.locator('#map-check-ng-molar-002').isChecked(),false);
 assert.match(await page.locator('#ng-map-count').innerText(),/找過但沒生成 1 處/);
 let absent=(await read(page)).worlds[p.currentWorldId].runs['ng-one'].collectibles['ng-molar-002'];
 assert.equal(absent.status,'missing');assert.equal(absent.ngNotSpawned,true);
 await other.locator('#map-check-ng-molar-002').check();
 await other.locator('#map-absent-ng-molar-002:not(:checked)').waitFor();
 await page.waitForFunction(async()=>{const db=await new Promise(resolve=>{const q=indexedDB.open('game-companion.grounded.progress.v1');q.onsuccess=()=>resolve(q.result);});try{return await new Promise(resolve=>{const q=db.transaction('records').objectStore('records').get('progress');q.onsuccess=()=>resolve(q.result.worlds[q.result.currentWorldId].runs['ng-one'].collectibles['ng-molar-002']?.status==='obtained');});}finally{db.close();}});
 await other.locator('#map-check-ng-molar-002').uncheck();
 await page.locator('#map-item-ng-molar-002').waitFor();
 await page.locator('#map-item-ng-molar-002').click();await page.locator('#map-absent-ng-molar-002').check();
 await page.locator('#map-item-ng-molar-002').waitFor({state:'hidden'});
 await page.locator('#undo-last').click();await page.locator('#map-item-ng-molar-002').waitFor();
 await page.locator('#map-item-ng-molar-002').click();await page.locator('#map-absent-ng-molar-002').check();
 await page.locator('#map-item-ng-molar-002').waitFor({state:'hidden'});
 await page.locator('#map-status-absent').click();
 assert.equal(await page.locator('[data-map-list]').count(),1);
 await page.locator('#map-item-ng-molar-002').click();
 assert.equal(await page.locator('[data-yard-pin="ng-molar-002"] image').evaluate(node=>getComputedStyle(node).opacity),'0.2');
 await page.locator('#map-status-pending').click();
 await page.locator('#map-ng-run').selectOption('ng-two');
 assert.equal(await page.locator('#map-item-ng-molar-002').count(),1,'其他周目未生成標記不繼承');
 assert.match(await page.locator('#ng-map-count').innerText(),/找過但沒生成 0 處/);
 await page.locator('#map-item-ng-molar-001').click();await page.locator('#map-check-ng-molar-001').check();
 await page.locator('#map-item-ng-molar-001').waitFor({state:'hidden'});
 await page.locator('#undo-last').click();await page.locator('#map-item-ng-molar-001').waitFor();
 assert.equal((await read(page)).worlds[p.currentWorldId].runs['ng-one'].collectibles['ng-molar-001'].status,'obtained');
 await page.locator('#map-ng-run').selectOption('ng-one');
 assert.equal(await page.locator('#map-item-ng-molar-001').count(),0);
 await page.locator('#map-status-all').click();await page.locator('#map-item-ng-molar-001').click();
 await page.locator('#open-backup').click();
 const event=page.waitForEvent('download');await page.locator('#export-progress').click();const download=await event;
 const exported=JSON.parse(await fs.readFile(await download.path(),'utf8'));
 assert.equal(exported.worlds[p.currentWorldId].runs['ng-one'].collectibles['ng-molar-001'].status,'obtained');
 assert.equal(exported.worlds[p.currentWorldId].runs['ng-one'].collectibles['ng-molar-002'].ngNotSpawned,true);
 assert.equal(exported.futureUnknown.keep,true);
 const restoredContext=await browser.newContext({acceptDownloads:true,serviceWorkers:'block'});
 try{
  const restored=await restoredContext.newPage();await visit(restored,'map');
  await restored.locator('#open-backup').click();
  await restored.locator('#import-file').setInputFiles({name:'synthetic-ng-absence.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});
  await restored.locator('#import-dialog').waitFor({state:'visible'});await restored.locator('#import-source').click();
  const beforeApply=restored.waitForEvent('download');await restored.locator('#import-download').click();assert.equal(await (await beforeApply).failure(),null);
  await restored.locator('#import-ack').check();await restored.locator('#import-apply').click();
  await restored.locator('#import-dialog').waitFor({state:'hidden'});
  await visit(restored,'map&scope=ng&run=ng-one&item=ng-molar-002');
  assert.equal(await restored.locator('#map-absent-ng-molar-002').isChecked(),true);
  assert.equal(await restored.locator('#map-check-ng-molar-002').isChecked(),false);
  assert.equal((await read(restored)).futureUnknown.keep,true);
 }finally{await restoredContext.close();}
 await page.locator('#backup-dialog [data-close]').click();await page.reload();
 await page.locator('#map-check-ng-molar-001:checked').waitFor();
 await visit(page,'map&scope=ng&run=ng-one');
 assert.equal(await page.locator('#map-status-pending').getAttribute('aria-pressed'),'true');
 assert.equal(await page.locator('#map-item-ng-molar-001,#map-item-ng-molar-002').count(),0,'預設結果排除兩種已查明點');
 const before=await read(page);
 for(const width of [1440,1024,768,390,320]){
  await page.setViewportSize({width,height:1000});await visit(page,'map&scope=ng&run=ng-one&item=ng-molar-214');
  assert.match(await page.locator('#map-selection').innerText(),/棚下|棚屋/);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  if([1440,390].includes(width))await page.screenshot({path:`outputs/grounded/ng-molar-map-${width}.png`});
  await visit(page,'recommendations&tab=targets');
  assert.equal(await page.locator('[data-target-build]').count(),24);
  await page.locator('#target-kind-boss').click();assert.equal(await page.locator('[data-target-build]').count(),7);
  await page.locator('#target-search').fill('感染育母');assert.equal(await page.locator('[data-target-build]').count(),1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await visit(page,'recommendations&tab=fixed');
  assert.equal(await page.locator('[data-fixed-build]').count(),24);
  assert.equal(await page.locator('[data-fixed-build][data-difficulty="1"] [data-fixed-specialized] [data-fixed-pick]').count(),0);
  assert.equal(await page.locator('[data-fixed-build][data-difficulty="2"] [data-fixed-specialized] [data-fixed-pick]').count(),0);
  assert.equal(await page.locator('[data-fixed-specialized] [data-fixed-pick="bow"],[data-fixed-specialized] [data-fixed-pick="staff"],[data-fixed-specialized] [data-fixed-pick="acid-axe"],[data-fixed-specialized] [data-fixed-pick="boss-club"]').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  if([1440,390].includes(width))await page.screenshot({path:`outputs/grounded/fixed-builds-${width}.png`});
 }
 assert.deepEqual(await read(page),before,'閱讀對策與地圖不改寫進度');
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 console.log('NG map passed: 219 candidates; obtained/absent exclusive, default pending excludes both, absent-only filter, cross-tab changes, undo, opacity, reload/export/protected import; first-run/two NG runs and manual count isolated; 5 widths; 24 fixed builds, easy specializations empty, optional weapons transition-only.');
}finally{await context.close();await browser.close();}

async function verifyShieldPairings(page){
 await visit(page,'recommendations');const before=await page.evaluate(async()=>({dbs:await indexedDB.databases(),localKeys:Object.keys(localStorage)}));
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:1000});
  for(const tab of ['progression','targets','fixed']){
   await visit(page,'recommendations&tab='+tab);
   assert.match(await page.locator('[data-shield-reason="Ladybug Armor"]').innerText(),/瓢蟲套[\s\S]*火蟻盾[\s\S]*沒有其他同種腐蝕來源/);
   assert.match(await page.locator('[data-shield-reason="Fire Ant Armor"]').innerText(),/火蟻套[\s\S]*凶猛瓢蟲盾[\s\S]*不會再疊/);
   assert.match(await page.locator('#shield-pairing-guide').innerText(),/耐力不足[\s\S]*雙手武器不能配盾/);
   assert.doesNotMatch(await page.locator('#app').innerText(),/單手後期配凶猛瓢蟲盾/);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,tab+' '+width);
   if(tab==='progression')continue;
   const row=page.locator(tab==='fixed'?'[data-fixed-build="Mantis"]':'[data-target-build="Mantis"]');
   assert.match(await row.locator('[data-shield-pairing="Ladybug Armor"]').first().innerText(),/瓢蟲套[\s\S]*火蟻盾[\s\S]*補上腐蝕/);
   assert.match(await row.locator('[data-shield-pairing="Fire Ant Armor"]').first().innerText(),/火蟻套[\s\S]*凶猛瓢蟲盾[\s\S]*省耐/);
   const early=page.locator(tab==='fixed'?'[data-fixed-build="Assistant Manager"]':'[data-target-build="Assistant Manager"]');
   assert.match(await early.innerText(),/黑(?:螞)?蟻盾(?:牌)?/);assert.equal(await early.locator('[data-shield-pairing]').count(),0,'首遇不要求三階盾');
   if(tab==='targets')assert.equal(await row.locator('[role="cell"]').nth(2).locator('[data-shield-pairing]').count(),0,'雙手欄不配盾');
   if([1440,390].includes(width)){await row.scrollIntoViewIfNeeded();await page.screenshot({path:`outputs/grounded/shield-pairings-${tab}-${width}.png`});}
   await row.locator('[data-shield-pairing="Ladybug Armor"]').first().getByRole('link',{name:'火蟻盾',exact:true}).click();
   assert.equal(await page.locator('[data-shield]').count(),1);assert.match(await page.locator('[data-shield]').innerText(),/火蟻盾[\s\S]*瓢蟲套/);
   await visit(page,'recommendations&tab='+tab);await page.locator('#'+(tab==='fixed'?'fixed':'target')+'-search').fill('火蟻盾');
   assert.ok(await page.locator(tab==='fixed'?'[data-fixed-build]':'[data-target-build]').count()>0,'搜尋納入防具／盾牌');
   await page.locator('#'+(tab==='fixed'?'fixed':'target')+'-search').fill('Black Ant Shield');
   assert.equal(await page.locator(tab==='fixed'?'[data-fixed-build]':'[data-target-build]').count(),1);assert.match(await page.locator(tab==='fixed'?'[data-fixed-build]':'[data-target-build]').innerText(),/助理經理/);
  }
 }
 assert.deepEqual(await page.evaluate(async()=>({dbs:await indexedDB.databases(),localKeys:Object.keys(localStorage)})),before,'純參考頁不應開啟或建立進度儲存');
 console.log('Shield pairings passed: Ladybug/Fire Ant, Fire Ant/Ladybird, stamina alternative, early Black Ant, no two-handed shields, search, equipment links, 4 widths, unchanged progress.');
}
