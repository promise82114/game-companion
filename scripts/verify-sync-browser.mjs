import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {chromium} from './browser-runtime.mjs';
import {mockDrive} from './fixtures/drive.mjs';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:4174/game-companion/';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'}),results=[];
await fs.mkdir('outputs/sync',{recursive:true});
try{
 for(const slug of ['edf-wb','edf-wb2']){
  console.log('SYNC '+slug);
  const mock=mockDrive(),context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  const config=await fs.readFile(new URL('../games/'+slug+'/dist/cloud-config.js',import.meta.url),'utf8');
  await context.route('**/cloud-config.js',route=>route.fulfill({contentType:'application/javascript',body:config.replace('writesEnabled: false','writesEnabled: true')}));
  await context.route('https://accounts.google.com/gsi/client',route=>route.fulfill({contentType:'application/javascript',body:`window.syntheticAccount='synthetic-a';window.google={accounts:{oauth2:{hasGrantedAllScopes:()=>true,initTokenClient:o=>({requestAccessToken:()=>o.callback({access_token:window.syntheticAccount,expires_in:3600})})}}};`}));
  await context.route('https://www.googleapis.com/**',async route=>{
   const req=route.request(),cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Authorization, Content-Type, If-Match','Access-Control-Allow-Methods':'GET, POST, PATCH, OPTIONS','Access-Control-Expose-Headers':'ETag'};
   if(req.method()==='OPTIONS'){await route.fulfill({status:204,headers:cors});return;}
   try{const result=await mock.fetch(req.url(),{method:req.method(),headers:req.headers(),body:req.postData()});await route.fulfill({status:result.status,body:await result.text(),headers:{...Object.fromEntries(result.headers),...cors}});}catch{await route.abort('failed');}
  });
  await page.goto(base+'games/'+slug+'/');await page.locator('#list tr').first().waitFor();
  const ids=await page.evaluate(()=>catalog.items.filter(i=>i.kind==='weapons'&&!i.extra).slice(0,4).map(i=>i.id));
  const edit=(index,owned)=>page.evaluate(({id,owned})=>change([catalog.items.find(i=>i.id===id)],owned),{id:ids[index],owned});
  const note=text=>page.evaluate(text=>{if(!favorite('M02'))toggleFavorite('M02');state.missionNotes.M02={text,updatedAt:Date.now()};persist();},text);
  const cloud=async()=>{if(!await page.locator('#cloudDialog').isVisible())await page.locator('#cloudQuick').click();};
  const settled=()=>page.waitForFunction(()=>!document.getElementById('cloudConnect').disabled);
  const synced=()=>page.waitForFunction(()=>document.getElementById('cloudQuick').textContent==='雲端已同步');
  await edit(0,true);await note('base-note');await cloud();await page.waitForFunction(()=>document.getElementById('cloudConnect').textContent.includes('連接／'));
  await page.locator('#cloudConnect').click();await page.waitForFunction(()=>!document.getElementById('cloudVerify').disabled);
  assert.equal(await page.locator('#cloudUpload').isDisabled(),true);
  await page.locator('#cloudVerify').click();await page.waitForFunction(()=>document.getElementById('cloudSafety').textContent.includes('測試通過'));
  await page.locator('#cloudUpload').click();await page.locator('#cloudConflicts').waitFor();assert.match(await page.locator('#cloudConflictTitle').textContent(),/首次同步/);
  assert.equal([...mock.files.values()].filter(f=>f.name==='game-companion.'+slug+'.progress.v1.json').length,0);
  await page.locator('#cloudConfirm').click();await synced();
  const progress=[...mock.files.values()].find(f=>f.name==='game-companion.'+slug+'.progress.v1.json');assert.ok(progress);assert.equal(progress.value.data.entries[ids[0]].owned,true);
  // 真正 Base / Local / Remote 衝突：先不選擇，確認按鈕必須停用。
  await note('local-note');progress.value.data.missionNotes.M02={text:'remote-note',updatedAt:Date.now()+1000};progress.version++;
  await page.locator('#cloudUpload').click();await page.locator('#cloudConflictRows tr').first().waitFor();assert.equal(await page.locator('#cloudConfirm').isDisabled(),true);
  assert.match(await page.locator('#cloudConflictRows').textContent(),/base-note/);assert.match(await page.locator('#cloudConflictRows').textContent(),/local-note/);assert.match(await page.locator('#cloudConflictRows').textContent(),/remote-note/);
  await page.locator('#cloudConflictRows select').first().selectOption('local');assert.equal(await page.locator('#cloudConfirm').isDisabled(),false);
  await page.setViewportSize({width:390,height:844});await page.locator('#cloudConflicts').scrollIntoViewIfNeeded();assert.equal(await page.locator('#cloudDialog').evaluate(el=>el.scrollWidth>el.clientWidth),false);await page.screenshot({path:'outputs/sync/'+slug+'-three-way-mobile.png'});await page.setViewportSize({width:1440,height:1000});
  await page.locator('#cloudAllRemote').click();
  // 選完衝突後繼續編輯，舊選擇必須失效並重比，不可蓋掉新項目。
  await edit(1,true);await page.locator('#cloudConfirm').click();await page.waitForFunction(()=>document.getElementById('cloudConflictSummary').textContent.includes('重新比較'));
  assert.equal(await page.locator('#cloudConfirm').isDisabled(),true);await page.locator('#cloudAllRemote').click();await page.locator('#cloudConfirm').click();await synced();
  assert.equal(await page.evaluate(()=>state.missionNotes.M02.text),'remote-note');assert.equal(await page.evaluate(id=>state.entries[id].owned,ids[1]),true);
  // 上傳期間另一分頁編輯；延後該次 PATCH，確認 Base 不帶走新本機變更。
  const other=await context.newPage();await other.goto(base+'games/'+slug+'/');await edit(0,false);
  let release,arrived;const reached=new Promise(resolve=>arrived=resolve),hold=new Promise(resolve=>release=resolve);
  mock.controls.beforePatch=async()=>{arrived();await hold;mock.controls.beforePatch=null;};
  await page.locator('#cloudUpload').click();await reached;
  await other.evaluate(id=>change([catalog.items.find(i=>i.id===id)],true),ids[2]);release();await settled();
  assert.equal(await page.evaluate(id=>state.entries[id].owned,ids[2]),true);assert.equal(progress.value.data.entries[ids[2]]?.owned===true,false);
  assert.match(await page.locator('#cloudQuick').textContent(),/未同步/);await page.locator('#cloudUpload').click();await synced();assert.equal(progress.value.data.entries[ids[2]].owned,true);await other.close();
  // 回應遺失後下一次只下載核對，不盲目再 PATCH。
  await edit(3,true);mock.controls.failAfterPatch=true;await page.locator('#cloudUpload').click();await settled();assert.match(await page.locator('#cloudStatus').textContent(),/結果未知/);
  const patchCount=mock.requests.filter(r=>r.method==='PATCH').length;await page.locator('#cloudUpload').click();await synced();assert.equal(mock.requests.filter(r=>r.method==='PATCH').length,patchCount);
  // 同名檔不能自動挑選，舊份與新份都保持完整。
  mock.files.set('synthetic-duplicate',{...progress,id:'synthetic-duplicate'});await page.locator('#cloudUpload').click();await settled();assert.match(await page.locator('#cloudStatus').textContent(),/多份同名/);mock.files.delete('synthetic-duplicate');
  // 授權失效後不再允許寫入；同本機資料切換另一帳號仍需重新驗證與首次配對。
  mock.controls.failStatus=401;await page.locator('#cloudRead').click();await settled();assert.equal(await page.locator('#cloudUpload').isDisabled(),true);
  await page.evaluate(()=>window.syntheticAccount='synthetic-b');await page.locator('#cloudConnect').click();await page.waitForFunction(()=>!document.getElementById('cloudVerify').disabled);await page.locator('#cloudVerify').click();await page.waitForFunction(()=>document.getElementById('cloudSafety').textContent.includes('測試通過'));
  await page.locator('#cloudUpload').click();await page.locator('#cloudConflicts').waitFor();assert.match(await page.locator('#cloudConflictTitle').textContent(),/首次同步/);
  assert.equal([...mock.files.values()].filter(f=>f.owner==='synthetic-b'&&f.name===progress.name).length,0);
  // 關閉舊版本分頁前留下的新主 Key 寫入，必須保存原文並阻擋雲端。
  await page.locator('#cloudDialog .close').click();
  await page.evaluate(()=>{const key='game-companion.'+SIDE_PROJECT_CLOUD_CONFIG.gameId+'.progress.v1',raw=JSON.parse(localStorage.getItem(key));raw.missionNotes.M02.text='synthetic-old-tab';localStorage.setItem(key,JSON.stringify(raw));EDF_CHECKLIST_STORAGE.get();});
  await page.locator('#backupOpen').click();await page.locator('#migrationExternal').waitFor();assert.equal(await page.locator('#migrationExternal').isVisible(),true);await page.locator('#migrationExternal').click();assert.match(await page.locator('#migrationRows').textContent(),/synthetic-old-tab/);
  await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:'outputs/sync/'+slug+'-import-mobile.png'});
  await page.locator('#backupDialog .close').click();await cloud();await page.screenshot({path:'outputs/sync/'+slug+'-conflicts-mobile.png'});assert.equal(await page.locator('#cloudDialog').evaluate(el=>el.scrollWidth>el.clientWidth),false);
  assert.equal(await page.locator('#cloudUpload').isDisabled(),true);
  // 舊分頁原文備份遇配額失敗，不得再改寫該主 Key。
  await page.evaluate(id=>{const key='game-companion.'+SIDE_PROJECT_CLOUD_CONFIG.gameId+'.progress.v1',raw=JSON.parse(localStorage.getItem(key));raw.missionNotes.M02.text='synthetic-old-tab-quota';const original=JSON.stringify(raw);localStorage.setItem(key,original);const set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.includes('.journal.external.archive.'))throw new DOMException('Synthetic quota','QuotaExceededError');return set.call(this,k,v);};try{change([catalog.items.find(i=>i.id===id)],false);if(localStorage.getItem(key)!==original)throw Error('舊分頁原文在備份失敗後被改寫');}finally{Storage.prototype.setItem=set;}},ids[1]);
  assert.deepEqual(errors,[]);await context.close();results.push({slug,passed:true,checks:['runtime CAS probe','first pairing','Base/Local/Remote differences','batch conflict selection','stale choices invalidated','cross-tab in-flight edit journal','uncertain result recovery','duplicate stop','expired grant/account isolation','legacy writer preserved','mobile']});
 }
 await fs.writeFile('outputs/sync/browser-result.json',JSON.stringify({passed:true,results},null,2)+'\n');console.log(JSON.stringify({passed:true,results}));
}finally{await browser.close();}
