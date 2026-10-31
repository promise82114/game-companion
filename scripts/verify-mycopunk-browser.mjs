import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {chromium} from './browser-runtime.mjs';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:4190/game-companion/',url=base+'games/mycopunk/',key='game-companion.mycopunk.progress.v1';
const catalog=JSON.parse(await fs.readFile(new URL('../games/mycopunk/dist/data/catalogue.json',import.meta.url),'utf8'));
const sample=catalog.upgrades.find(item=>!item.archived),second=catalog.upgrades.find(item=>!item.archived&&item.id!==sample.id);
const record={collected:true,tracked:true,note:'synthetic legacy note',updatedAt:'2026-01-01T00:00:00.000Z',extraRecord:{keep:true}};
const source={appId:'mycopunk-checklist',schemaVersion:1,records:{[sample.id]:{...record,collected:false},'future:item':{...record,note:'unknown synthetic ID'}},futureTop:{keep:'source'},collision:'source'};
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'}),results=[];
await fs.mkdir('outputs/mycopunk',{recursive:true});
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true}),page=await context.newPage(),errors=[],external=[];
 page.on('pageerror',error=>errors.push(error.message));
 const allStorageAccess=[];await context.exposeBinding('__auditStorageKey',(_source,entry)=>allStorageAccess.push(entry));
 await context.route('**/*',route=>{if(new URL(route.request().url()).origin!==new URL(base).origin){external.push(new URL(route.request().url()).hostname);return route.abort();}return route.continue();});
 await context.addInitScript(()=>{
  const sentinels={'mycopunk-checklist:collection:v1':'synthetic old collection','mycopunk-checklist:before-import:v1':'synthetic old import','game-companion.edf-wb.progress.v1':'synthetic EDF WB','game-companion.edf-wb2.progress.v1':'synthetic EDF WB2'};
  for(const [name,value]of Object.entries(sentinels))if(localStorage.getItem(name)===null)localStorage.setItem(name,value);
  const get=Storage.prototype.getItem,set=Storage.prototype.setItem;window.__mycopunkAccess=[];
  Storage.prototype.getItem=function(name){const entry={op:'get',name};window.__mycopunkAccess.push(entry);void window.__auditStorageKey(entry);return get.call(this,name);};
  Storage.prototype.setItem=function(name,value){const entry={op:'set',name};window.__mycopunkAccess.push(entry);void window.__auditStorageKey(entry);return set.call(this,name,value);};
 });
 await page.goto(base);await page.locator('.open-game[href="games/mycopunk/"]').click();await page.locator('.category-card').first().waitFor();
 assert.equal(await page.locator('#app-error').isVisible(),false);
 assert.equal(await page.locator('.page-footer .portal-return').getAttribute('href'),'../../');
 assert.equal(await page.locator('.site-header .primary-nav').count(),0);assert.equal(await page.locator('#sidebar .primary-nav [data-view]').count(),5);
  const navigation=await page.locator('#sidebar .primary-nav [data-view]').evaluateAll(buttons=>buttons.map(button=>{const r=button.getBoundingClientRect();return {x:r.x,y:r.y};}));assert.ok(navigation.every((row,i)=>row.x===navigation[0].x&&(!i||row.y>navigation[i-1].y)),'primary navigation is a vertical left menu');
  await page.setViewportSize({width:768,height:1000});assert.equal(await page.evaluate(()=>document.querySelector('.primary-nav').getBoundingClientRect().bottom<=document.querySelector('.equipment-nav').getBoundingClientRect().top),true,'primary navigation stays above equipment categories on tablet');await page.setViewportSize({width:1440,height:1000});
 // 備份入口不依賴收集頁；語言與來源工具在相同右上工具區。
 await page.locator('#backupOpen').click();await page.locator('#backup-dialog').waitFor();assert.equal(await page.locator('#export-button').isVisible(),true);assert.equal(await page.locator('#import-button').isVisible(),true);await page.locator('[data-close="backup-dialog"]').click();
 await page.locator('.header-tools [data-action="about"]').click();await page.locator('#about-dialog').waitFor();await page.locator('[data-close="about-dialog"]').click();
 await page.locator('#language-toggle').click();assert.equal(await page.locator('#language-toggle').getAttribute('aria-pressed'),'false');await page.locator('#language-toggle').click();
 await page.locator('.primary-nav [data-view="collection"]').click();assert.equal(await page.locator('#upgrade-list [data-collect]').count(),842);
 assert.equal(await page.locator('#upgrade-list [data-collect]:checked').count(),0);
 await page.locator(`[data-collect="${sample.id}"]`).check();
 await page.reload();await page.locator('#upgrade-list [data-collect]').first().waitFor();assert.equal(await page.locator(`[data-collect="${sample.id}"]`).isChecked(),true);
 await page.locator('#search').fill(sample.nameZh);assert.ok(await page.locator('#upgrade-list [data-collect]').count()>0);
 await page.locator('#search').fill('synthetic-no-match-7dfe');assert.equal(await page.locator('.empty-state').isVisible(),true);await page.locator('#clear-filters').click();
 const other=await context.newPage();await other.goto(url+'?view=collection');await other.locator(`[data-collect="${second.id}"]`).check();
 await page.waitForFunction(({key,id})=>JSON.parse(localStorage.getItem(key)).records[id]?.collected,{key,id:second.id});
 await page.waitForFunction(id=>document.querySelector(`[data-collect="${id}"]`)?.checked,second.id);await other.close();
 await page.evaluate(({key})=>{const data=JSON.parse(localStorage.getItem(key));data.currentOnly={keep:'local'};data.collision='local';localStorage.setItem(key,JSON.stringify(data));}, {key});await page.reload();await page.locator('#upgrade-list [data-collect]').first().waitFor();
 const upload=async data=>{await page.locator('#backupOpen').click();const chooser=page.waitForEvent('filechooser');await page.locator('#import-button').click();await (await chooser).setFiles({name:'synthetic-legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});await page.locator('#import-dialog').waitFor();assert.equal(await page.locator('#backup-dialog').isVisible(),false);};
 const backup=async()=>{await page.locator('#import-source').click();const event=page.waitForEvent('download');await page.locator('#import-backup').click();const file=await event;assert.equal(await file.failure(),null);const pathname=await file.path();const bundle=JSON.parse(await fs.readFile(pathname,'utf8'));assert.equal(bundle.recoveryBundle.sourceRaw,JSON.stringify(source));assert.equal(typeof bundle.recoveryBundle.localRaw,'string');await page.locator('#import-ack').check();};
 const before=await page.evaluate(key=>localStorage.getItem(key),key);
 await upload(source);assert.equal(await page.locator('#apply-import').isDisabled(),true);
 await page.locator('#import-source').click();assert.equal(await page.locator('#apply-import').isDisabled(),true);
 assert.equal(await page.evaluate(key=>localStorage.getItem(key),key),before);
 await backup();
 // 同頁以外的新變更會讓預覽失效，不可在確認後重新自動合併。
 await page.evaluate(key=>{const data=JSON.parse(localStorage.getItem(key));data.revision++;data.externalSynthetic=true;localStorage.setItem(key,JSON.stringify(data));},key);
 await page.locator('#apply-import').click();assert.match(await page.locator('#import-feedback').textContent(),/預覽已過期/);
 assert.equal(await page.locator('#apply-import').isDisabled(),true);assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).records['future:item'],key),undefined);
 await page.locator('[data-close="import-dialog"]').first().click();await upload(source);await backup();await page.locator('#apply-import').click();assert.equal(await page.locator('#import-dialog').isVisible(),false);
 const imported=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
 assert.equal(imported.gameId,'mycopunk');assert.equal(imported.records[sample.id].collected,false);assert.equal(imported.records[sample.id].tracked,true);assert.equal(imported.records[sample.id].note,record.note);assert.deepEqual(imported.records[sample.id].extraRecord,{keep:true});
 assert.equal(imported.records[second.id].collected,true);assert.equal(imported.records['future:item'].note,'unknown synthetic ID');assert.deepEqual(imported.futureTop,{keep:'source'});assert.deepEqual(imported.currentOnly,{keep:'local'});assert.equal(imported.collision,'local');assert.equal(imported.importHistory.length,1);
 await page.locator('#backupOpen').click();const exportedEvent=page.waitForEvent('download');await page.locator('#export-button').click();const exported=await exportedEvent;assert.equal(await exported.failure(),null);const exportedData=JSON.parse(await fs.readFile(await exported.path(),'utf8'));await page.locator('[data-close="backup-dialog"]').click();
 assert.equal(exportedData.recoveryArchives.length,1);assert.equal(exportedData.recoveryArchives[0].sourceRaw,JSON.stringify(source));assert.equal(exportedData.records[sample.id].note,record.note);
 const after=await page.evaluate(key=>localStorage.getItem(key),key);
 await page.locator('#import-file').setInputFiles({name:'wrong-game.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...source,gameId:'edf-wb'}))});await page.waitForFunction(()=>document.getElementById('toast').textContent.includes('不是 Mycopunk'));assert.equal(await page.evaluate(key=>localStorage.getItem(key),key),after);
 // 下載 API 失敗時不可啟用確認。
 await upload(source);await page.evaluate(()=>{window.__originalObjectUrl=URL.createObjectURL;URL.createObjectURL=()=>{throw Error('synthetic download failure');};});await page.locator('#import-backup').click();assert.match(await page.locator('#import-feedback').textContent(),/備份失敗/);assert.equal(await page.locator('#import-ack').isDisabled(),true);assert.equal(await page.locator('#apply-import').isDisabled(),true);await page.evaluate(()=>URL.createObjectURL=window.__originalObjectUrl);await page.locator('[data-close="import-dialog"]').first().click();
 // 原有深連結、解鎖圖與 Worker 求解都在新 base path 下運作。
 await page.goto(url+'?owner=mycologist');await page.locator('#upgrade-list [data-collect]').first().waitFor();assert.equal(await page.locator('#upgrade-list [data-collect]').count(),36);await page.reload();await page.locator('#upgrade-list [data-collect]').first().waitFor();
 await page.locator('.primary-nav [data-view="unlocks"]').click();assert.ok(await page.locator('#page-content svg').count()>=7);
 await page.locator('.primary-nav [data-view="recommendations"]').click();await page.locator('#recommendations-view').getByText(/Carson/).first().waitFor();
  await page.goto(url+'?view=planner&owner=cycler');await page.locator('[data-build-add]').first().waitFor();await page.locator('[data-build-stage="10"]').click();await page.locator('[data-build-rotation="30"]').click();await page.locator('[data-build-add="cycler:infinity-burn"]').click();
 await page.waitForFunction(()=>!document.getElementById('build-selected-count').textContent.includes('0 /')&&document.querySelector('[data-build-action="export"]')?.disabled===false);
  assert.equal(await page.locator('#build-selected .build-selected-row').count(),1);assert.equal(await page.locator('#build-output .build-error').count(),0);
  assert.ok(await page.locator('#build-output .build-filled').count()>0);
  const layoutEvent=page.waitForEvent('download');await page.locator('[data-build-action="export"]').click();const layoutFile=await layoutEvent;assert.equal(await layoutFile.failure(),null);const layout=JSON.parse(await fs.readFile(await layoutFile.path(),'utf8'));assert.equal(layout.schemaVersion,2);assert.deepEqual(layout.selected,['cycler:infinity-burn']);assert.equal(layout.result.placements.length,1);
 for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);if(width<=720){await page.locator('#menuOpen').click();await page.locator('#nav-dialog').waitFor();assert.equal(await page.evaluate(()=>!!document.activeElement?.closest('.primary-nav')),true);await page.keyboard.press('Escape');await page.locator('#nav-dialog').waitFor({state:'hidden'});assert.equal(await page.locator('#menuOpen').getAttribute('aria-expanded'),'false');}else assert.equal(await page.locator('#sidebar .primary-nav').isVisible(),true);await page.locator('#backupOpen').click();await page.locator('#backup-dialog').waitFor();await page.locator('[data-close="backup-dialog"]').click();await page.screenshot({path:`outputs/mycopunk/planner-${width}.png`,fullPage:true});}
 await page.goto(url+'?view=collection');await page.locator('#upgrade-list [data-collect]').first().waitFor();
 await page.locator('#import-file').setInputFiles({name:'synthetic-legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(source))});await page.locator('#import-dialog').waitFor();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:'outputs/mycopunk/import-320.png'});await page.locator('[data-close="import-dialog"]').first().click();
 await page.goto(url);await page.locator('.category-card').first().waitFor();for(const width of [1440,768,390]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:`outputs/mycopunk/home-${width}.png`,fullPage:true});}
 await page.locator('#menuOpen').click();await page.locator('.primary-nav [data-view="collection"]').focus();await page.keyboard.press('Enter');await page.locator('#upgrade-list [data-collect]').first().waitFor();assert.equal(await page.locator('#nav-dialog').isVisible(),false);assert.equal(await page.locator('#menuOpen').getAttribute('aria-expanded'),'false');
 await page.setViewportSize({width:1440,height:900});assert.equal(await page.locator('#sidebar .primary-nav').isVisible(),true);assert.equal(await page.locator('#nav-dialog #sidebar').count(),0);
 const accesses=await page.evaluate(()=>window.__mycopunkAccess);assert.ok([...allStorageAccess,...accesses].every(access=>access.name.startsWith('game-companion.mycopunk.')));
 assert.equal(await page.evaluate(()=>localStorage.getItem('mycopunk-checklist:collection:v1')),'synthetic old collection');assert.equal(await page.evaluate(()=>localStorage.getItem('mycopunk-checklist:before-import:v1')),'synthetic old import');assert.equal(await page.evaluate(()=>localStorage.getItem('game-companion.edf-wb.progress.v1')),'synthetic EDF WB');assert.equal(await page.evaluate(()=>localStorage.getItem('game-companion.edf-wb2.progress.v1')),'synthetic EDF WB2');
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);assert.equal(await page.evaluate(async()=>(await navigator.serviceWorker.getRegistrations()).length),0);await context.close();
 results.push('navigation/deep links/reload','selection/search/empty/tracking/notes','cross-tab','raw archive/diffs/download/ack','explicit false/unknown retention','stale preview','download failure','source/EDF storage isolation','Worker packing','320/390/768/1440px','no external services');
 // 原文保存失敗與損壞主存檔都使用另一個全新 context。
 const restricted=await browser.newContext(),blocked=await restricted.newPage();await blocked.goto(url+'?view=collection');await blocked.locator('#upgrade-list [data-collect]').first().waitFor();
 await blocked.evaluate(()=>{const set=Storage.prototype.setItem;Storage.prototype.setItem=function(name,value){if(name.startsWith('game-companion.mycopunk.import.'))throw new DOMException('synthetic quota','QuotaExceededError');return set.call(this,name,value);};});
 await blocked.locator('#import-file').setInputFiles({name:'quota.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(source))});await blocked.waitForFunction(()=>document.getElementById('toast').textContent.includes('synthetic quota'));assert.equal(await blocked.locator('#import-dialog').isVisible(),false);assert.equal(await blocked.evaluate(key=>localStorage.getItem(key),key),null);await restricted.close();
 const corrupt=await browser.newContext(),broken=await corrupt.newPage();await corrupt.addInitScript(key=>localStorage.setItem(key,'synthetic broken JSON'),key);await broken.goto(url+'?view=collection');await broken.locator('#upgrade-list [data-collect]').first().waitFor();assert.equal(await broken.locator('[data-collect]').first().isDisabled(),true);assert.equal(await broken.evaluate(key=>localStorage.getItem(key),key),'synthetic broken JSON');assert.match(await broken.locator('#storage-notice').textContent(),/暫停修改/);const raw=await broken.evaluate(()=>JSON.parse(localStorage.getItem('game-companion.mycopunk.corrupt.v1')).raw);assert.equal(raw,'synthetic broken JSON');
 await broken.locator('#import-file').setInputFiles({name:'repair.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(source))});await broken.locator('#import-dialog').waitFor();
 await broken.locator('#import-source').focus();await broken.keyboard.press('Enter');const repairEvent=broken.waitForEvent('download');await broken.locator('#import-backup').click();const repairFile=await repairEvent;assert.equal(await repairFile.failure(),null);const repairBackup=JSON.parse(await fs.readFile(await repairFile.path(),'utf8'));assert.equal(repairBackup.recoveryBundle.localRaw,'synthetic broken JSON');
 await broken.locator('#import-ack').check();await broken.locator('#apply-import').click();assert.equal(await broken.locator('#import-dialog').isVisible(),false);assert.equal(await broken.locator('#storage-notice').isVisible(),false);assert.equal(await broken.evaluate(({key,id})=>JSON.parse(localStorage.getItem(key)).records[id].note,{key,id:sample.id}),record.note);await corrupt.close();
 results.push('quota blocks import','corrupt data retained/repaired after backup','keyboard import choice');await fs.writeFile('outputs/mycopunk/browser-result.json',JSON.stringify({passed:true,results},null,2));console.log(JSON.stringify({passed:true,results}));
}finally{await browser.close();}
