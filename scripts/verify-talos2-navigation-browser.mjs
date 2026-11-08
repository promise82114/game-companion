import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {chromium} from './browser-runtime.mjs';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:4197/game-companion/',url=base+'games/talos2/';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'}),page=await context.newPage(),errors=[];
page.on('pageerror',error=>errors.push(error.message));
await context.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin?route.continue():route.abort());
await fs.mkdir('outputs/talos2/story',{recursive:true});
const state=()=>page.evaluate(async()=>{const {roadmap}=await import('./data.js'),{createStore}=await import('./roadmap/store.js'),store=createStore(roadmap,window.SideProjectSync);try{return await store.open();}finally{store.close();}});
const open=async query=>{await page.goto(url+query);await page.locator('#section-select').waitFor();};
const noOverflow=async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'page overflow');
try{
 // 24 顆星星的找路內容不依賴解法開關，定位只讀資料、沿用同一星星進度。
 const starCases=[],bridgeCases=[];
 await open('?stage=P1&section=E1');
 const starRoutes=await page.evaluate(async()=>{const {starRoutes}=await import('./star-navigation-data.js');return Object.entries(starRoutes).map(([id,r])=>({id,points:r.points}));});
 await fs.mkdir('outputs/talos2/stars',{recursive:true});
 const desktopPage=page;
 for(const width of [1440,390]){
  const mobileContext=width===390?await browser.newContext({viewport:{width,height:1000},hasTouch:true,isMobile:true,serviceWorkers:'block'}):null;
  if(mobileContext)await mobileContext.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin?route.continue():route.abort());
  const page=mobileContext?await mobileContext.newPage():desktopPage;
  if(mobileContext)page.on('pageerror',error=>errors.push(error.message));
  const open=async query=>{await page.goto(url+query);await page.locator('#section-select').waitFor();};
  const state=()=>page.evaluate(async()=>{const {roadmap}=await import('./data.js'),{createStore}=await import('./roadmap/store.js'),store=createStore(roadmap,window.SideProjectSync);try{return await store.open();}finally{store.close();}});
  const noOverflow=async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'star page overflow');
  await page.setViewportSize({width,height:1000});
  await open('?stage=P1&section=E1');await page.locator('#puzzle-E1-star-pandora').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('.region-map-aside .map-selected')?.getAttribute('data-map-target')==='puzzle-E1-star-pandora');
  await open('?view=roadmap#puzzle-N3-main-2');const prep=page.locator('#puzzle-N3-main-2 .star-preparation [data-map-point]');assert.equal(await prep.count(),1);if(mobileContext)await prep.tap();else await prep.click();
  const prepMap=page.locator(mobileContext?'#map-dialog':'.region-map-aside');assert.match(await prepMap.locator('.map-selection').textContent(),/2 號高台/);assert.equal(await prepMap.locator('[data-map-target="puzzle-N3-star-pandora"].map-selected').count(),1);
  await prepMap.locator('[data-map-target="puzzle-N3-star-pandora"].map-selected').click();await page.locator('[data-star-navigation="N3-star-pandora"]').waitFor();await page.goBack();await page.waitForFunction(()=>location.hash==='#puzzle-N3-main-2');
  for(const {id,points} of starRoutes){
   await open('?view=roadmap#puzzle-'+id);const guide=page.locator('[data-star-navigation="'+id+'"]');await guide.waitFor({state:'visible'});
   await page.waitForFunction(id=>document.querySelector('.region-map-aside .map-selected')?.getAttribute('data-map-target')==='puzzle-'+id,id,{timeout:5000}).catch(async error=>{await page.screenshot({path:'outputs/talos2/stars/auto-focus-failure.png'});throw Error(id+' @ '+width+' auto focus: '+await page.locator('.region-map-aside .map-selected').getAttribute('data-map-target').catch(()=>null)+'; '+error.message);});
   assert.equal(await page.locator('#show-solutions').isChecked(),false);assert.equal(await page.locator('[data-solution]').count(),0);assert.equal(await guide.locator('li').count(),points.length);
   const before=await state(),mapped=points.filter(p=>p.anchor).length;
   for(const button of await guide.locator('[data-map-point]').all()){
    const pointId=await button.getAttribute('data-map-point');if(mobileContext)await button.tap();else await button.click();
    const surface=page.locator(width<1280?'#map-dialog':'.region-map-aside');await surface.waitFor({state:'visible'});
    assert.equal(await surface.locator('.map-star-point').count(),mapped,id+' mapped route');assert.equal(await surface.locator('[data-map-node="'+pointId+'"].map-selected').count(),1);
    assert.equal(await surface.locator('.map-optional,.map-artifact').count(),0);assert.match(await surface.locator('.map-selection').textContent(),/ · /);
    if(mobileContext)await surface.locator('[data-close="map-dialog"]').tap();
   }
   assert.deepEqual(await state(),before,id+' map browsing must not write progress');await noOverflow();
   if(['E2-star-pandora','N2-star-prometheus','N2-star-sphinx','N3-star-pandora'].includes(id)){
    const first=guide.locator('[data-map-point]').first();if(mobileContext)await first.tap();else await first.click();await page.screenshot({path:`outputs/talos2/stars/${id}-${width}.png`});if(mobileContext)await page.locator('#map-dialog [data-close="map-dialog"]').tap();
   }
   starCases.push({width,id,points:points.length,mapped,passed:true});
  }
  {
  const bridgeContext=await browser.newContext({viewport:{width,height:1000},hasTouch:width===390,isMobile:width===390,serviceWorkers:'block'});await bridgeContext.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin?route.continue():route.abort());const page=await bridgeContext.newPage();page.on('pageerror',error=>errors.push(error.message));
  const open=async query=>{await page.goto(url+query);await page.locator('#section-select').waitFor();},state=()=>page.evaluate(async()=>{const {roadmap}=await import('./data.js'),{createStore}=await import('./roadmap/store.js'),store=createStore(roadmap,window.SideProjectSync);try{return await store.open();}finally{store.close();}}),noOverflow=async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'bridge overflow');
  await open('?view=roadmap#waypoint-bridge-east-01');
  const bridges=await page.evaluate(async()=>{const {megaBridges}=await import('./bridge-data.js');return megaBridges.map(b=>({id:b.id,mapKey:b.mapKey,stepId:b.stepId,pieces:b.bridge.pieces.map(p=>p.number)}));});
  for(const bridge of bridges){
   await open('?view=roadmap#waypoint-'+bridge.id);const row=page.locator('#waypoint-'+bridge.id),body=page.locator('#body-waypoint-'+bridge.id);
   await body.waitFor({state:'visible'});assert.ok((await row.locator('.waypoint-location').textContent()).length>10);assert.ok((await row.locator('.bridge-after').textContent()).length>15);
   assert.equal(await page.evaluate(async id=>{const {regionMaps,mapNodeMatches}=await import('./roadmap/maps.js');const panel=document.querySelector('.region-map-aside [data-map-region]'),selected=panel?.querySelector('.map-selected')?.getAttribute('data-map-node');return Boolean(regionMaps[panel?.dataset.mapRegion]?.nodes.some(n=>n.id===selected&&mapNodeMatches(n,'waypoint-'+id)));},bridge.id),true,'bridge deep link must select its landmark');
   if(!await page.locator('#show-solutions').isChecked()){assert.equal(await page.locator('[data-bridge-solution]').count(),0);await page.locator('#show-solutions').check();await row.locator('[data-bridge-solution]').waitFor();}
   assert.deepEqual(await row.locator('.bridge-pieces strong').allTextContents(),bridge.pieces.map(n=>n+' 號'));assert.ok(await row.locator('.solution-sources a').count()>0);await noOverflow();
   const before=await state(),locate=row.locator('[data-map-locate]');if(mobileContext)await locate.tap();else await locate.click();
   const map=page.locator(mobileContext?'#map-dialog':'.region-map-aside');assert.equal(await map.locator('[data-map-region]').getAttribute('data-map-region'),bridge.mapKey);assert.equal(await map.locator('.map-selected').count(),1);
   if(mobileContext)await page.locator('#map-dialog [data-close="map-dialog"]').tap();assert.deepEqual((await state()).steps,before.steps,'bridge locator must not write progress');
   if(['bridge-east-04','bridge-north-04','bridge-south-02','bridge-final-01'].includes(bridge.id)){await row.scrollIntoViewIfNeeded();await page.screenshot({path:`outputs/talos2/stars/${bridge.id}-${width}.png`});}
   const checkbox=row.locator('[data-waypoint-complete]');if(mobileContext)await checkbox.tap();else await checkbox.check();await page.waitForFunction(id=>document.getElementById('body-waypoint-'+id)?.hidden,bridge.id);
   assert.equal((await state()).steps['waypoint-'+bridge.id].status,'completed');assert.equal(await checkbox.evaluate(el=>document.activeElement===el),true);
   await open('?view=roadmap&stage='+({'first-megastructure':'P1','north-megastructure':'P2','prometheus-rescue':'P4',ending:'P7'}[bridge.stepId])+'&section='+({'first-megastructure':'east-megastructure','north-megastructure':'north-megastructure','prometheus-rescue':'south-megastructure',ending:'finale'}[bridge.stepId]));
   await page.waitForFunction(id=>document.getElementById('body-waypoint-'+id)?.hidden,bridge.id);const restored=page.locator('[data-waypoint-complete="'+bridge.id+'"]');if(mobileContext)await restored.tap();else await restored.uncheck();await page.waitForFunction(id=>!document.getElementById('body-waypoint-'+id)?.hidden,bridge.id);
   bridgeCases.push({width,id:bridge.id,passed:true});
  }
  await page.locator('#show-solutions').uncheck();
  await bridgeContext.close();
  }
  if(mobileContext)await mobileContext.close();
 }
 await fs.writeFile('outputs/talos2/stars/result.json',JSON.stringify({passed:true,cases:starCases},null,2));
 await fs.writeFile('outputs/talos2/story/bridge-result.json',JSON.stringify({passed:true,cases:bridgeCases},null,2));
 await page.setViewportSize({width:1440,height:1000});
 await open('?view=roadmap&stage=P1&section=east-megastructure');
 assert.equal(await page.locator('#show-solutions').isChecked(),false);
 assert.equal(await page.locator('.puzzle-solution').count(),0);
 assert.equal(await page.locator('[data-waypoint]').count(),17);
 assert.equal(await page.locator('.puzzle-navigation').count(),3);
 assert.match(await page.locator('#waypoint-east-lobby').textContent(),/NOEMA-01/);
 assert.ok((await page.locator('.region-map-aside').boundingBox()).width>=440);
 await page.locator('.stage-heading').scrollIntoViewIfNeeded();
 await page.screenshot({path:'outputs/talos2/story/east-1440.png',fullPage:false});
 // 閱讀不等於完成，導航內容不受解法開關遮住；完成後收合並保留焦點。
 const before=await state();assert.deepEqual(before.steps,{});
 const first=page.locator('[data-waypoint-complete="east-arrival"]');await first.check();
 await page.waitForFunction(()=>document.querySelector('#body-waypoint-east-arrival')?.hidden);
 assert.equal(await first.evaluate(el=>document.activeElement===el),true);
 assert.equal((await state()).steps['waypoint-east-arrival'].status,'completed');
 assert.deepEqual((await state()).trophies,{});
 await page.locator('#continue').click();assert.equal(new URL(page.url()).hash,'#waypoint-east-lobby');
 await page.locator('[data-waypoint-complete="east-arrival"]').uncheck();
 await page.waitForFunction(()=>!document.querySelector('#body-waypoint-east-arrival').hidden);
 // 每個目標都能定位；中央區定位自動切圖，手動選範圍不被觀察器立刻搶回。
 await page.locator('#puzzle-MEGA-E-green [data-map-locate]').click();
 await page.waitForFunction(()=>document.querySelector('.region-map-aside [data-map-region]')?.dataset.mapRegion==='MEGA-E-CORE');
 assert.equal(await page.locator('.region-map-aside [data-map-node="green"]').evaluate(el=>el.classList.contains('map-selected')),true);
 await page.locator('.region-map-aside [data-map-layer]').selectOption('MEGA-E-ENTRY');
 await page.waitForFunction(()=>document.querySelector('.region-map-aside [data-map-region]')?.dataset.mapRegion==='MEGA-E-ENTRY');
 await page.locator('#waypoint-east-exit [data-map-locate]').click();
 assert.equal(await page.locator('.region-map-aside [data-map-node="vtol"]').evaluate(el=>el.classList.contains('map-selected')),true);
 await page.reload();await page.locator('[data-waypoint-complete="east-arrival"]').waitFor();
 assert.equal((await state()).steps['waypoint-east-arrival'].status,'not_started');
 // 三色題全部完成後還要做終端與回程，下一步不可直接跳 N1。
 await page.evaluate(async()=>{const {roadmap}=await import('./data.js'),{createStore}=await import('./roadmap/store.js'),{storyRoutes}=await import('./story-data.js'),store=createStore(roadmap,window.SideProjectSync);try{await store.open();await store.update(p=>{const route=storyRoutes['first-megastructure'];for(const id of route.slice(0,route.indexOf('east-terminal3')))p.steps[(id.startsWith('MEGA-')?'puzzle-':'waypoint-')+id]={status:'completed'};p.steps['first-megastructure']={status:'completed'};p.settings.syntheticFuture={keep:true};return p;});}finally{store.close();}});
 await page.reload();await page.locator('#continue').click();assert.equal(new URL(page.url()).hash,'#waypoint-east-terminal3');
 assert.equal((await state()).settings.syntheticFuture.keep,true);
 // 已發布的北側題目深連結，仍到同一題，現在改由北側巨構片段承接。
 await open('?view=roadmap#puzzle-MEGA-N-blue');
 assert.equal(await page.locator('#section-select').inputValue(),'north-megastructure');
 assert.equal(await page.locator('.region-map-aside [data-map-region]').getAttribute('data-map-region'),'MEGA-N');
 // 每次城市回訪顯示本次人物，未知位置不落假點。
 await open('?stage=P0&section=city');
 assert.equal(await page.locator('.region-map-aside [data-map-node="purple"]').count(),1);
 assert.equal(await page.locator('.region-map-aside [data-map-node="neith"]').count(),0);
 await page.locator('.stage-heading').scrollIntoViewIfNeeded();await page.screenshot({path:'outputs/talos2/story/city-1440.png'});
 await open('?stage=P3&section=revisit');
 assert.equal(await page.locator('.region-map-aside [data-map-node="neith"]').count(),1);
 await open('?stage=P7&section=last-city');
 await page.locator('.region-map-aside [data-map-layer]').selectOption('CITY-3');
 assert.match(await page.locator('.region-map-aside .map-pending').textContent(),/精確城市座標待查證/);
 assert.equal(await page.locator('.region-map-aside [data-map-node="melville"]').count(),0);
 // 每張圖無裁切標籤，點選／跳轉目標有效；只在已知原創 SVG 中量測。
 const shapes=await page.evaluate(async()=>{const {regionMaps,mapSvg}=await import('./roadmap/maps.js');return Object.entries(regionMaps).filter(([,map])=>map.name).map(([code])=>[code,mapSvg(code,{escape:s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;'),progress:{steps:{},settings:{}}})]);});
 for(const[code,svg]of shapes){const clipped=await page.evaluate(svg=>{const box=document.createElement('div');box.innerHTML=svg;document.body.append(box);const bad=[...box.querySelectorAll('.map-caption')].filter(el=>{const b=el.getBBox();return b.x<0||b.y<0||b.x+b.width>1000||b.y+b.height>650;}).map(el=>el.textContent);box.remove();return bad;},svg);assert.deepEqual(clipped,[],code+' clipped captions');}
 for(const width of [1440,1280,1024,768,390,320]){
  await page.setViewportSize({width,height:1000});await open('?stage=P1&section=E1');await noOverflow();
  assert.ok(await page.locator('.region-map-aside').isVisible(),width+' default map visible');
  const box=await page.locator('.region-map-aside .region-map-svg').boundingBox();assert.ok(box.width>=(width>=1280?399:width>=1024?600:width>=768?400:width-50),width+' larger default map');
  if([1440,768,390].includes(width)){await page.locator('.region-map-aside').scrollIntoViewIfNeeded();await page.screenshot({path:'outputs/talos2/story/e1-'+width+'.png'});}
  await open('?stage=P1&section=east-megastructure');await noOverflow();
  if(width===390){await open('?stage=P1&section=east-megastructure#waypoint-east-door');await page.locator('#waypoint-east-door [data-map-locate]').click();assert.ok(await page.locator('#map-dialog').isVisible());assert.match(await page.locator('#map-dialog .map-selection').textContent(),/Melville/);await page.locator('#map-dialog [data-map-layer]').selectOption('MEGA-E-CORE');assert.equal(await page.locator('#map-dialog [data-map-layer]').evaluate(el=>document.activeElement===el),true);await page.keyboard.press('Escape');await page.locator('.region-map-aside').scrollIntoViewIfNeeded();await page.screenshot({path:'outputs/talos2/story/east-390.png'});}
 }
 assert.deepEqual(errors,[]);
 await fs.writeFile('outputs/talos2/story/navigation-result.json',JSON.stringify({passed:true,checks:['visible wayfinding with spoilers off','waypoint completion/folding/focus/reload/unknown field retention','ordered next step before return terminals','legacy North deep link','visit-specific city NPCs and pending positions','14 story SVG caption bounds','larger default maps at six widths','mobile dialog and Escape'],pageErrors:errors},null,2));
 console.log(JSON.stringify({passed:true,storyMaps:14,waypoints:59,widths:[1440,1280,1024,768,390,320]}));
}finally{await context.close();await browser.close();}
