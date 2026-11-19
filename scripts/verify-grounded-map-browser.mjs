import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from './browser-runtime.mjs';

const base=process.env.TEST_BASE_URL||'http://127.0.0.1:4190/game-companion/';
const url=base+'games/grounded/';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'});
const errors=[],external=[];
await context.route('https://**',route=>{external.push(route.request().url());return route.abort();});
const visit=async(page,view)=>{await page.goto(url+'?view='+view);await page.locator('#app h1').waitFor();};
const decodeTiles=page=>page.evaluate(()=>Promise.all([...document.querySelectorAll('[data-basemap-tile]')].map(tile=>new Promise((resolve,reject)=>{
 const image=new Image();image.onload=()=>image.naturalWidth===256&&image.naturalHeight===256?resolve():reject(Error('底圖解析度不符'));
 image.onerror=()=>reject(Error(tile.getAttribute('href')));image.src=tile.getAttribute('href');
}))));
try{
 await fs.mkdir('outputs/grounded',{recursive:true});
 const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
 const checklist=await context.newPage();checklist.on('pageerror',error=>errors.push(error.message));
 await visit(checklist,'collectibles&group=molars');
 await visit(page,'map');
 assert.equal(await page.locator('#map-status-pending').getAttribute('aria-pressed'),'true','初次進入只看尚未取得');
 await visit(page,'map&item=milk-old-anthill');
 await decodeTiles(page);
 assert.equal(await page.locator('[data-basemap-tile]').count(),64);
 assert.equal(await page.locator('iframe').count(),0);
 assert.equal(await page.locator('#basemap-error').isVisible(),false);
 assert.equal(await page.locator('#map-status-all').getAttribute('aria-pressed'),'true','具名連結可顯示已取得目標');
 assert.equal(await page.locator('#yard-selection-label text').textContent(),await page.locator('#map-selection h2').textContent());
 assert.equal(await page.locator('.yard-pin.selected .pin-ring').evaluate(node=>getComputedStyle(node).strokeWidth),'4px');
 assert.match(await page.locator('#map-selection').innerText(),/所在層級[\s\S]*如何抵達/);
 const registration=()=>page.locator('#yard-map').evaluate(svg=>{
  const terrain=svg.querySelector('[data-basemap-tile]'),marker=svg.querySelector('[data-yard-pin="198242"]');
  const matrix=terrain.getScreenCTM(),anchor=marker.getScreenCTM();
  const corner=new DOMPoint(Number(terrain.getAttribute('x')),Number(terrain.getAttribute('y'))).matrixTransform(matrix);
  const size=Number(terrain.getAttribute('width'))*matrix.a;
  return [(anchor.e-corner.x)/size,(anchor.f-corner.y)/size];
 });
 const initial=await registration();
 await page.locator('[data-map-control="in"]').click();
 assert.ok((await registration()).every((value,index)=>Math.abs(value-initial[index])<1e-6),'底圖與標記縮放後仍對位');
 const oldBox=await page.locator('#yard-map').getAttribute('viewBox');
 const rect=await page.locator('#yard-map').boundingBox();
 await page.mouse.move(rect.x+rect.width*.08,rect.y+rect.height*.08);await page.mouse.down();
 await page.mouse.move(rect.x+rect.width*.08+60,rect.y+rect.height*.08+30);await page.mouse.up();
 assert.notEqual(await page.locator('#yard-map').getAttribute('viewBox'),oldBox);
 assert.ok((await registration()).every((value,index)=>Math.abs(value-initial[index])<1e-6),'拖曳後仍對位');
 await page.locator('#map-check-milk-old-anthill').check();
 await checklist.locator('#collect-milk-old-anthill').waitFor({state:'hidden'});
 await page.locator('[data-yard-pin="198242"].obtained').waitFor();
 assert.equal(await page.locator('[data-yard-pin="198242"] image').evaluate(node=>getComputedStyle(node).opacity),'0.3');
 assert.equal(await page.locator('.map-obtained-check').count(),0,'已取得點位不疊勾號');
 await checklist.locator('#collection-status-obtained').click();
 await checklist.locator('#collection-ref-milk-old-anthill').uncheck();
 await page.locator('#map-check-milk-old-anthill:not(:checked)').waitFor();
 assert.equal(await page.locator('[data-yard-pin="198242"].obtained').count(),0);
 await page.locator('#map-status-pending').click();
 await page.locator('#map-check-milk-old-anthill').check();
 await page.locator('[data-yard-pin="198242"]').waitFor({state:'hidden'});
 await page.locator('#undo-last').click();
 await page.locator('[data-yard-pin="198242"]').waitFor();
 await page.locator('[data-map-control="reset"]').click();
 await page.locator('#category-filter').selectOption('molars');
 await page.locator('[data-map-list]').nth(1).click();
 assert.equal(await page.locator('#yard-selection-label text').textContent(),await page.locator('#map-selection h2').textContent(),'點選後同步名稱標籤');
 await page.locator('#map-status-all').click();
 await page.locator('[data-view="equipment"]').click();await page.locator('[data-view="map"]').click();
 assert.equal(await page.locator('#map-status-pending').getAttribute('aria-pressed'),'true','返回地圖重設為尚未取得');
 await page.screenshot({path:'outputs/grounded/map-integrated-desktop.png'});

 await visit(checklist,'collectibles&group=molars');
 await checklist.locator('#collection-status-pending').click();
 const row=checklist.locator('#collect-milk-old-anthill');
 const title=await row.locator('.check-label').boundingBox(),details=await row.locator('.collection-details').boundingBox();
 assert.ok(details.x>=title.x+title.width&&details.width>title.width*2,'桌面路線使用右側寬欄');
 assert.equal(await checklist.locator('.collection-access details').count(),0);
 await checklist.screenshot({path:'outputs/grounded/collection-wide-desktop.png'});
 await visit(checklist,'collectibles&group=defense');
 assert.equal(await checklist.locator('[data-defense-reference]').count(),9);
 assert.match(await checklist.locator('.defense-scope').innerText(),/機器介面上的難度標示尚未逐台核對/);
 await checklist.locator('#collection-search').fill('Green Shield Bug');
 assert.equal(await checklist.locator('.report-list li').count(),1);
 await checklist.getByRole('link',{name:'綠蝽',exact:true}).click();
 assert.equal(await checklist.locator('.creature-matrix tbody tr').count(),1);
 assert.match(await checklist.locator('.creature-matrix tbody tr').innerText(),/Green Shield Bug/);
 await checklist.goBack();await checklist.locator('#collection-search').waitFor();
 assert.equal(await checklist.locator('#collection-search').inputValue(),'');

 for(const width of [1440,1024,768,390,320]){
  await page.setViewportSize({width,height:900});await checklist.setViewportSize({width,height:900});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'map overflow '+width);
  await visit(checklist,'collectibles&group=molars');
  assert.equal(await checklist.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'collection overflow '+width);
  if(width===390){
   const label=await checklist.locator('.report-list .check-label').first().boundingBox();
   const detail=await checklist.locator('.collection-details').first().boundingBox();
   assert.ok(detail.y>=label.y+label.height,'手機改直向閱讀');
   await checklist.screenshot({path:'outputs/grounded/collection-wide-mobile.png'});
   await page.screenshot({path:'outputs/grounded/map-integrated-mobile.png'});
  }
 }
 assert.deepEqual(external,[],'底圖不依賴外站請求');assert.deepEqual(errors,[]);
 console.log('Grounded map/list passed: 64 decoded local tiles, shared zoom/drag projection, cross-tab check/uncheck/undo, pending default, reset filters, selected name/halo, translucent obtained icons without checks, wide collection rows, 9 defense entries, creature links, 5 widths, no external requests or page errors.');
}finally{await context.close();await browser.close();}

const failedBrowser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
try{
 const failed=await failedBrowser.newContext({serviceWorkers:'block'});
 await failed.route('**/map-tiles/1016-1016.png',route=>route.fulfill({status:404,body:''}));
 const page=await failed.newPage();await visit(page,'map&item=milk-old-anthill');
 await page.locator('#basemap-error').waitFor();
 await page.locator('#map-check-milk-old-anthill').check();
 await page.locator('[data-yard-pin="198242"].obtained').waitFor();
 console.log('Missing basemap tile passed: visible error and collection checkbox remains usable.');
 await failed.close();
}finally{await failedBrowser.close();}
