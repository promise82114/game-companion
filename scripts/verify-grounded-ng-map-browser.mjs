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
 await visit(page,'map&scope=ng&item=ng-molar-001');
 assert.equal(await page.locator('[data-map-list]').count(),219);
 assert.equal(await page.locator('#map-check-ng-molar-001').isDisabled(),true);
 assert.match(await page.locator('#ng-map-count').innerText(),/尚未建立 NG\+/);
 await page.locator('#category-filter').selectOption('underwater');assert.equal(await page.locator('[data-map-list]').count(),21);
 await page.locator('#category-filter').selectOption('ground');assert.equal(await page.locator('[data-map-list]').count(),198);
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
 await page.locator('#map-ng-run').selectOption('ng-two');
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
 assert.equal(exported.futureUnknown.keep,true);
 await page.locator('#backup-dialog [data-close]').click();await page.reload();
 await page.locator('#map-check-ng-molar-001:checked').waitFor();
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
 }
 assert.deepEqual(await read(page),before,'閱讀對策與地圖不改寫進度');
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 console.log('NG map passed: 219 candidates / 198 shelled / 21 underwater; preview guard; first-run and two NG runs isolated; cross-tab check, pending removal, opacity, undo, reload, export/unknown retention, manual count preserved; 5 widths and 24 first-run target builds.');
}finally{await context.close();await browser.close();}
