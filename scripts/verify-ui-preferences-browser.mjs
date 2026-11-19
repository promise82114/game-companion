import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from './browser-runtime.mjs';
import {captureEdits,revertEdits,installUndo} from '../shared/progress-undo.js';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:4190/game-companion/';
const before={revision:1,items:{a:false},unknown:{keep:true}},after={...before,revision:2,items:{a:true}};
const entry={changes:captureEdits(before,after,['items']),revision:2};
assert.equal(revertEdits(structuredClone(after),entry).items.a,false);
assert.throws(()=>revertEdits({...after,revision:4},entry),/後續變更/);
assert.equal((await fs.readFile(new URL('../games/thank-goodness-youre-here/dist/progress-undo.js',import.meta.url),'utf8')),(await fs.readFile(new URL('../shared/progress-undo.js',import.meta.url),'utf8')));
// Discard older undo history when a new local edit follows an external write.
let simulated={revision:0,items:{a:false,b:false},future:{keep:true}};
const undoButton={},undoErrors=[];
const simulatedStore={update:async change=>{const current=structuredClone(simulated),next=change(current);next.revision=simulated.revision+1;simulated=next;return structuredClone(next);}};
installUndo(simulatedStore,{groups:['items'],button:undoButton,onError:e=>undoErrors.push(e.message)});
await simulatedStore.update(p=>{p.items.a=true;return p;});
simulated.revision+=2; // external false -> true (same final value, newer edit)
await simulatedStore.update(p=>{p.items.b=true;return p;});
await undoButton.onclick();assert.equal(simulated.items.a,true);assert.equal(simulated.items.b,false);assert.equal(undoButton.hidden,true);assert.deepEqual(simulated.future,{keep:true});assert.deepEqual(undoErrors,[]);
await simulatedStore.update(p=>{p.items.b=true;return p;});await simulatedStore.update(p=>p);await undoButton.onclick();assert.equal(simulated.items.b,false);
await assert.rejects(()=>simulatedStore.update(()=>{throw Error('synthetic write failure');}),/synthetic/);assert.equal(undoButton.hidden,true);
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'}),results=[];
await fs.mkdir('outputs/ui-alignment',{recursive:true});
const read=(page,slug,store='records')=>page.evaluate(async({slug,store})=>{
 const db=await new Promise((resolve,reject)=>{const r=indexedDB.open('game-companion.'+slug+'.progress.v1');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});
 try{return await new Promise((resolve,reject)=>{const tx=db.transaction(store),r=tx.objectStore(store).get('progress');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}finally{db.close();}
},{slug,store});
async function check(slug,run){if(process.env.UI_MODULE&&!process.env.UI_MODULE.split(',').includes(slug))return;console.log('CHECK '+slug);const context=await browser.newContext({viewport:{width:1440,height:900},serviceWorkers:'block'}),errors=[],page=await context.newPage();page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));await context.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin?route.continue():route.abort());try{await run(page,context);for(const width of [390,320]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,slug+' overflow '+width);if(width===390)await page.screenshot({path:'outputs/ui-alignment/'+slug+'-mobile.png'});}assert.deepEqual(errors,[],slug+' page errors');results.push(slug);console.log('PASS '+slug);}catch(e){console.log('ERRORS',errors);await page.screenshot({path:'outputs/ui-alignment/'+slug+'-failure.png'});throw e;}finally{await context.close();}}
try{
for(const slug of ['edf-wb','edf-wb2'])await check(slug,async(page,context)=>{
 await page.goto(base+'games/'+slug+'/');await page.locator('#list .item-check').first().waitFor();const id=await page.locator('#list .item-check').first().getAttribute('data-id');
 await page.locator('#list .item-check').first().click();await page.locator('#undo').click();await page.locator('#list .item-check[data-id="'+id+'"]').waitFor();
 await page.locator('#list .item-check[data-id="'+id+'"]').click();const other=await context.newPage();await other.goto(base+'games/'+slug+'/');await other.locator('#filter [data-filter=all]').click();await other.locator('#list .item-check[data-id="'+id+'"]').click();await other.locator('#list .item-check[data-id="'+id+'"]').click();
 await page.locator('#undo').click();assert.match(await page.locator('#toast').innerText(),/撤銷已停止/);assert.equal(await other.evaluate(({slug,id})=>JSON.parse(localStorage.getItem('game-companion.'+slug+'.progress.v1')).entries[id].owned,{slug,id}),true);
});
await check('edfir',async page=>{
 await page.goto(base+'games/edfir/?view=weapons');await page.locator('#weapon-results .weapon-row').first().waitFor();const input=page.locator('#weapon-results input[data-key=purchased]').first(),id=await input.getAttribute('data-weapon');await input.click();await page.locator('#weapon-'+id).waitFor({state:'detached'});await page.locator('#undo-last').click();await page.locator('#weapon-'+id).waitFor();
 await page.locator('[data-view=drones]').click();assert.equal(await page.locator('#status-filter').inputValue(),'pending');await page.locator('[data-drone]').first().click();await page.waitForFunction(()=>document.querySelectorAll('[data-drone]').length===54);await page.locator('#undo-last').click();await page.waitForFunction(()=>document.querySelectorAll('[data-drone]').length===55);
 await page.locator('[data-stat-view=trophies]').click();assert.equal(await page.locator('#status-filter').inputValue(),'pending');await page.locator('[data-trophy]').first().click();await page.waitForFunction(()=>document.querySelectorAll('[data-trophy]').length===43);
});
await check('mycopunk',async page=>{
 await page.goto(base+'games/mycopunk/?view=collection');await page.locator('#upgrade-list [data-collect]').first().waitFor();assert.equal(await page.locator('#status-filter').inputValue(),'missing');const input=page.locator('#upgrade-list [data-collect]').first(),id=await input.getAttribute('data-collect');await input.click();await page.locator('#upgrade-list [data-collect="'+id+'"]').waitFor({state:'detached'});await page.locator('#undo-last').click();await page.locator('#upgrade-list [data-collect="'+id+'"]').waitFor();await page.locator('[data-action=collection-missing]').click();assert.equal(await page.locator('#status-filter').inputValue(),'missing');await page.locator('[data-collection-category=weapons]').click();await page.locator('[data-action=collection-missing]').click();assert.equal(await page.locator('[data-collection-category=weapons]').getAttribute('aria-pressed'),'true');
});
await check('talos2',async page=>{
 await page.goto(base+'games/talos2/?view=trophies');await page.locator('#trophy-filter').waitFor();assert.equal(await page.locator('#trophy-filter').inputValue(),'pending');const count=await page.locator('input[data-trophy]').count();await page.locator('input[data-trophy]').first().click();await page.waitForFunction(n=>document.querySelectorAll('input[data-trophy]').length===n-1,count);assert.notEqual(await page.evaluate(()=>document.activeElement.tagName),'BODY');await page.locator('#undo-last').click();await page.waitForFunction(n=>document.querySelectorAll('input[data-trophy]').length===n,count);
 await page.locator('[data-view=collectibles]').click();assert.equal(await page.locator('#collection-filter').inputValue(),'pending');
});
await check('thank-goodness-youre-here',async page=>{
 await page.goto(base+'games/thank-goodness-youre-here/');await page.locator('[data-step-row]').first().waitFor();assert.equal(await page.locator('#filter').inputValue(),'pending');const first=page.locator('input[data-group=stepDone]').first(),id=await first.getAttribute('data-id');await first.click();await page.locator('[data-step-row="'+id+'"]').waitFor({state:'detached'});await page.locator('#undo-last').click();await page.locator('[data-step-row="'+id+'"]').first().waitFor();
 await page.locator('#search').fill('synthetic no result');await page.locator('[data-view=trophies]').click();assert.equal(await page.locator('#search').inputValue(),'');assert.equal(await page.locator('#filter').inputValue(),'pending');
 await page.locator('[data-view=trackers]').click();assert.ok(await page.locator('details.tracker[open]').count()>0);
 await page.locator('[data-view=roadmap]').click();await page.locator('#filter').selectOption('all');const risky=page.locator('[data-step-row]').filter({has:page.locator('.warning:not([hidden])')}).first();const riskId=await risky.getAttribute('data-step-row');await risky.locator('input[data-group=stepDone]').click();assert.equal(await page.locator('[data-step-row="'+riskId+'"] .warning').isVisible(),true);
});
await check('ball-x-pit',async page=>{
 await page.goto(base+'games/ball-x-pit/?view=buildings');await page.locator('[data-group=buildingBuilt]').first().waitFor();assert.equal(await page.locator('#filter-status').inputValue(),'pending');const box=page.locator('[data-group=buildingBuilt]').first(),id=await box.getAttribute('id');await box.click();await page.locator('[id="'+id+'"]').waitFor({state:'detached'});assert.notEqual(await page.evaluate(()=>document.activeElement.tagName),'BODY');await page.locator('#undo-last').click();await page.locator('[id="'+id+'"]').waitFor();await page.locator('[id="'+id+'"]').click();await page.locator('[id="'+id+'"]').waitFor({state:'detached'});
 await page.evaluate(async()=>{const db=await new Promise(resolve=>{const r=indexedDB.open('game-companion.ball-x-pit.progress.v1');r.onsuccess=()=>resolve(r.result);});await new Promise((resolve,reject)=>{const tx=db.transaction('records','readwrite'),store=tx.objectStore('records'),r=store.get('progress');r.onsuccess=()=>{const value=r.result;value.revision++;value.futureTop={keep:'synthetic concurrent edit'};store.put(value,'progress');};tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});db.close();});
 await page.locator('#undo-last').click();await page.waitForFunction(()=>document.querySelector('#message').textContent.includes('後續變更'));assert.match(await page.locator('#message').innerText(),/後續變更/);assert.equal((await read(page,'ball-x-pit')).futureTop.keep,'synthetic concurrent edit');await page.goto(base+'games/ball-x-pit/?view=roadmap');await page.locator('.step details[open]').first().waitFor();await page.goto(base+'games/ball-x-pit/');await page.locator('.stats a[data-route]').first().waitFor();assert.equal(await page.locator('.stats a[data-route]').count(),4);await page.locator('.stats a[href*=matrix]').click();assert.equal(await page.locator('#filter-set').inputValue(),'base');
});
await check('musou-orochi-z',async page=>{
 await page.goto(base+'games/musou-orochi-z/#materials');await page.locator('[data-group=collectedMaterials]').first().waitFor();assert.equal(await page.locator('[data-filter=status]').inputValue(),'incomplete');const input=page.locator('[data-group=collectedMaterials]').first(),id=await input.getAttribute('data-id');await input.click();await page.locator('[data-row="'+id+'"]').waitFor({state:'hidden'});await page.locator('#undo').click();await page.locator('[data-row="'+id+'"]').waitFor({state:'visible'});await page.locator('[data-filter=status]').selectOption('complete');assert.equal(await page.locator('[data-row]:visible').count(),0);
 await page.locator('[data-stat-label="武器合計"]').click();const number=page.locator('input[type=number][data-prof]').first(),prof=await number.getAttribute('data-prof');await number.fill('20');await number.dispatchEvent('change');await page.waitForFunction(()=>document.querySelector('#save-state').textContent.includes('已保存'));await page.locator('#undo').click();await page.waitForFunction(p=>document.querySelector('input[type=number][data-prof="'+p+'"]').value==='0',prof);
 await page.locator('[data-stat-label="Lv.2 武器"]').click();assert.equal(await page.locator('[data-filter=status]').inputValue(),'lv2');await page.locator('[data-stat-label="一般武將壁紙"]').click();assert.equal(await page.locator('[data-filter=status]').inputValue(),'wallpapers');await page.setViewportSize({width:390,height:844});await page.locator('#nav-toggle').click();assert.equal(await page.locator('#navigation').isVisible(),true);await page.keyboard.press('Escape');assert.equal(await page.locator('#navigation').isVisible(),false);assert.equal(await page.locator('.masthead #open-backup').count(),1);await page.screenshot({path:'outputs/ui-alignment/orochi-mobile.png'});
});
console.log(JSON.stringify({passed:true,modules:results,scope:'synthetic isolated contexts; no Google/PSN writes'}));
}finally{await browser.close();}
