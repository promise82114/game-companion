import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {chromium} from './browser-runtime.mjs';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:4190/game-companion/';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
await fs.mkdir('outputs/integration',{recursive:true});
const results=[];
try{
 const portalContext=await browser.newContext(),portal=await portalContext.newPage();
 await portal.goto(base);assert.equal(await portal.locator('.open-game').count(),3);
 assert.equal(await portal.locator('.open-game[href="games/mycopunk/"]').count(),1);
 for(const width of [1440,768,390]){await portal.setViewportSize({width,height:900});assert.equal(await portal.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await portal.screenshot({path:`outputs/integration/portal-${width}.png`,fullPage:true});}
 await portal.locator('.open-game').first().click();assert.match(portal.url(),/games\/edf-wb\/$/);await portalContext.close();
 for(const slug of ['edf-wb','edf-wb2']){
  console.log('START '+slug);
  const url=base+'games/'+slug+'/',key='game-companion.'+slug+'.progress.v1';
  const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true}),page=await context.newPage(),errors=[],writes=[];
  page.on('pageerror',error=>errors.push(error.message));
  await context.addInitScript(()=>{
   for(const key of ['edfwb-progress-v1','edfwb2-progress-v1','edfwb-snapshots-v1','edfwb2-snapshots-v1','edfwb-backup-time','edfwb2-backup-time'])if(!localStorage.getItem(key))localStorage.setItem(key,'synthetic legacy sentinel');
  });
  await context.route('https://accounts.google.com/gsi/client',route=>route.fulfill({contentType:'application/javascript',body:`window.google={accounts:{oauth2:{hasGrantedAllScopes:()=>true,initTokenClient:o=>({requestAccessToken:()=>o.callback({access_token:'synthetic-test-token',expires_in:3600})})}}};`}));
  await context.route('https://www.googleapis.com/**',route=>{
   const request=route.request();if(request.method()!=='GET'){writes.push(request.method());return route.abort();}
   assert.match(new URL(request.url()).searchParams.get('q')||'',new RegExp('game-companion\\.'+slug.replace('-','\\-')+'\\.progress\\.v1\\.json'));
   return route.fulfill({json:{files:[]}});
  });
  await page.goto(url);await page.locator('#list tr').first().waitFor();
  const counts=await page.evaluate(()=>({items:catalog.items.length,weapons:catalog.items.filter(i=>i.kind==='weapons'&&!i.extra).length,characters:catalog.items.filter(i=>i.kind==='characters'&&!i.extra).length,accessories:catalog.items.filter(i=>i.kind==='accessories').length,missions:missionCatalog.rows.length}));
  assert.equal(await page.locator('#list tr').count(),counts.weapons);
  await page.evaluate(async()=>{for(const cache of ['edfwb-field-log-v3','edfwb2-field-log-v23']){const c=await caches.open(cache);await c.put('/synthetic-old-cache',new Response('legacy'));}});
  const firstId=await page.locator('.item-check').first().getAttribute('data-id');
  await page.locator('.item-check').first().click();assert.equal(await page.locator('#list tr').count(),counts.weapons-1);await page.locator('#undo').click();assert.equal(await page.locator('#list tr').count(),counts.weapons);
  await page.locator('.item-check').first().click();await page.reload();assert.equal(await page.locator('#list tr').count(),counts.weapons-1);
  await page.locator('[data-filter="all"]').click();assert.equal(await page.locator(`.item-check[data-id="${firstId}"]`).isChecked(),true);
  await page.locator('#search').fill('フューリアス');assert.ok(await page.locator('#list tr').count()>0);
  await page.locator('[data-tab="characters"]').click();assert.equal(await page.locator('#list tr').count(),counts.characters);
  if(slug==='edf-wb2'){
   await page.locator('[data-character-accessory-filter="foot"]').check();assert.ok(await page.locator('#list tr').count()<counts.characters);await page.locator('#clearCharacterAccessories').click();assert.equal(await page.locator('#list tr').count(),counts.characters);
  }
  await page.locator('[data-tab="accessories"]').click();assert.equal(await page.locator('#list tr').count(),counts.accessories);
  await page.locator('#settingsOpen').click();await page.locator('#seasonPass').check();await page.locator('#settingsDialog .settings-done button').click();assert.equal(await page.locator('[data-tab="dlcWeapons"]').isVisible(),true);
  await page.locator('[data-tab="missions"]').click();assert.ok(await page.locator('#missionList tr').count()>0);
  await page.locator('[data-favorite-mission="M02"]').first().click();await page.locator('[data-mission-tab="favorites"]').click();
  await page.locator('[data-mission-note="M02"]').fill('隔離測試筆記');await page.reload();
  assert.equal(await page.evaluate(()=>state.missionNotes.M02.text),'隔離測試筆記');
  // 另一分頁進度更新；兩個遊戲的 Key 皆不與舊站共用。
  const page2=await context.newPage();await page2.goto(url);
  const secondId=await page2.locator('.item-check').first().getAttribute('data-id');await page2.locator('.item-check').first().click();
  await page.waitForFunction(id=>state.entries[id]?.owned===true,secondId);await page2.close();
  await page.locator('#backupOpen').click();
  const source=await page.evaluate(id=>{const data=window.EDF_CHECKLIST_STORAGE.get();delete data.gameId;data.entries[id]={owned:false,updatedAt:1,count:7,custom:'keep extra field'};data.entries['future-item']={futureShape:[1,2,3]};data.entries['future-null']=null;data.unknownTop={keep:'source extension'};data.missionNotes.M02={text:'來源筆記',updatedAt:1};return data;},firstId);
  Object.defineProperty(source.entries,'__proto__',{value:{keep:'prototype key'},enumerable:true});
  const before=await page.evaluate(key=>localStorage.getItem(key),key);
  const upload=async data=>page.locator('#importFile').setInputFiles({name:'synthetic-legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
  await upload(source);await page.locator('#migrationRows tr').first().waitFor();assert.equal(await page.locator('#merge').isDisabled(),true);assert.equal(await page.evaluate(key=>localStorage.getItem(key),key),before);
  await page.locator('#migrationSource').click();assert.equal(await page.locator('#merge').isDisabled(),true);
  const backupEvent=page.waitForEvent('download');await page.locator('#migrationBackup').click();const backup=await backupEvent;await backup.saveAs('outputs/integration/'+slug+'-recovery.json');
  const recovery=JSON.parse(await fs.readFile('outputs/integration/'+slug+'-recovery.json','utf8'));assert.equal(recovery.recoveryBundle.source.unknownTop.keep,'source extension');
  await page.locator('#migrationAck').check();await page.locator('#merge').click();
  assert.equal(await page.evaluate(id=>state.entries[id].owned,firstId),false);
  assert.equal(await page.evaluate(id=>state.entries[id].count,firstId),7);
  assert.equal(await page.evaluate(()=>state.entries['future-item'].futureShape.length),3);assert.equal(await page.evaluate(()=>state.entries['future-null']),null);assert.equal(await page.evaluate(()=>Object.hasOwn(state.entries,'__proto__')&&state.entries.__proto__.keep==='prototype key'),true);
  assert.equal(await page.evaluate(()=>state.importHistory.at(-1).source.unknownTop.keep),'source extension');
  assert.equal(await page.evaluate(()=>state.missionNotes.M02.text),'來源筆記');
  // 預覽後的新編輯必須阻擋舊預覽；匯入不能蓋掉這段期間的變更。
  await upload(source);await page.locator('#migrationSource').click();const nextBackup=page.waitForEvent('download');await page.locator('#migrationBackup').click();await nextBackup;await page.locator('#migrationAck').check();
  await page.evaluate(id=>change([catalog.items.find(i=>i.id===id)],true),firstId);
  await page.locator('#merge').click();assert.match(await page.locator('#migrationMessage').textContent(),/已有變更/);assert.equal(await page.evaluate(id=>state.entries[id].owned,firstId),true);
  // 其他遊戲的 raw/envelope 與損壞輸入不套用。
  await upload({...source,app:'wrong-game'});assert.equal(await page.locator('#importPreview').isVisible(),false);assert.match(await page.locator('#backupMessage').textContent(),/不是/);
  await page.locator('#backupDialog .close').click();
  await page.locator('#cloudQuick').click();await page.waitForFunction(()=>document.getElementById('cloudConnect').textContent.includes('連接／'));
  assert.equal(await page.locator('#cloudUpload').isDisabled(),true);assert.equal(await page.locator('#cloudAuto').isChecked(),false);
  await page.evaluate(async()=>{const c=window.SIDE_PROJECT_CLOUD_CONFIG;try{await new window.SideProjectDrive.DriveAppData({token:()=>{throw Error('token must not be used');}},c.fileName).write({},null);throw Error('write must reject');}catch(error){if(error.code!=='write-disabled')throw error;}});
  assert.deepEqual(writes,[]);await page.locator('#cloudDialog .close').click();
  await page.reload();await page.evaluate(()=>navigator.serviceWorker.ready);await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await context.setOffline(true);await page.reload();await page.locator('#list tr').first().waitFor();await context.setOffline(false);
  for(const width of [1440,390]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:`outputs/integration/${slug}-${width}.png`,fullPage:true});}
  assert.equal(await page.evaluate(()=>['edfwb-progress-v1','edfwb2-progress-v1','edfwb-snapshots-v1','edfwb2-snapshots-v1','edfwb-backup-time','edfwb2-backup-time'].every(key=>localStorage.getItem(key)==='synthetic legacy sentinel')),true);
  assert.equal(await page.evaluate(async()=>{const names=await caches.keys();return names.includes('edfwb-field-log-v3')&&names.includes('edfwb2-field-log-v23');}),true);
  assert.deepEqual(errors,[]);await context.close();
  // 配額不足時來源備份失敗必須停止；只覆寫隔離 context 的 Storage prototype。
  const restricted=await browser.newContext({serviceWorkers:'block'}),blocked=await restricted.newPage();await blocked.goto(url);
  await blocked.locator('#backupOpen').click();await blocked.evaluate(()=>{const set=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key.includes('.import.'))throw new DOMException('Synthetic quota','QuotaExceededError');return set.call(this,key,value);};});
  await blocked.locator('#importFile').setInputFiles({name:'quota.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(source))});assert.equal(await blocked.locator('#importPreview').isVisible(),false);assert.match(await blocked.locator('#backupMessage').textContent(),/quota/i);await restricted.close();
  results.push({slug,counts,checks:['selection/undo/reload','search/filter','DLC','accessory qualifications','favorites/notes','cross-tab','protected import/differences','unknown retention','stale preview blocked','quota blocks import','unverified grant write blocked','offline','390px','old keys/caches untouched']});
 }
 const together=await browser.newContext(),one=await together.newPage(),two=await together.newPage();
 await one.goto(base+'games/edf-wb/');await one.locator('.item-check').first().click();
 const wbBefore=await one.evaluate(()=>localStorage.getItem('game-companion.edf-wb.progress.v1'));
 await two.goto(base+'games/edf-wb2/');await two.locator('.item-check').first().click();
 assert.equal(await two.evaluate(()=>localStorage.getItem('game-companion.edf-wb.progress.v1')),wbBefore);
 assert.equal(await one.evaluate(()=>Object.values(state.entries).filter(e=>e?.owned).length),1);await together.close();
 console.log(JSON.stringify({passed:true,crossGameSameOrigin:'PASS',results}));await fs.writeFile('outputs/integration/browser-result.json',JSON.stringify({passed:true,results},null,2)+'\n');
}finally{await browser.close();}
