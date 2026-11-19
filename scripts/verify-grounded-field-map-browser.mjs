import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from './browser-runtime.mjs';
const url=(process.env.TEST_BASE_URL||'http://127.0.0.1:4190/game-companion/')+'games/grounded/';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
const errors=[],external=[];
await fs.mkdir('outputs/grounded',{recursive:true});
try{
 for(const width of [320,390,768,1050,1051,1101,1280,1920]){
  const context=await browser.newContext({viewport:{width,height:950},serviceWorkers:'block'});
  await context.route('https://**',route=>{external.push(route.request().url());return route.abort();});
  const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
  const sidebar=async name=>{if(!await page.locator(`[data-view=${name}]`).isVisible())await page.locator('#nav-toggle').click();await page.locator(`[data-view=${name}]`).click();};
  await page.goto(url+'?view=monsterMap');await page.locator('#yard-map').waitFor();
  assert.equal(await page.locator('[data-map-list]').count(),459);
  assert.equal(await page.locator('[data-basemap-tile]').count(),64);
  assert.equal(await page.locator('select#field-type').count(),0);
  assert.ok(await page.locator('input[name=field-type]').count()>50);
  const radioBox=await page.locator('input[name=field-type]').first().boundingBox();
  assert.ok(radioBox.width<=20&&radioBox.height<=20,'單選圓鈕不能套用文字輸入框的寬高');
  const checkLayout=async()=>{
   const typePanel=await page.locator('.field-type-panel').boundingBox(),mapPanel=await page.locator('.map-frame').boundingBox(),detailPanel=await page.locator('.report-map-sidebar').boundingBox();
   if(width>1050){
    assert.ok(typePanel.x+typePanel.width<=mapPanel.x&&mapPanel.x+mapPanel.width<=detailPanel.x,'桌面由左至右：種類、地圖、位置說明');
    assert.ok(mapPanel.width>typePanel.width*2&&mapPanel.width>detailPanel.width*2,'兩側窄欄不擠壓主地圖');
    assert.ok(Math.abs(typePanel.width-detailPanel.width)<2,'兩側各分配原說明欄約一半寬');
   }else assert.ok(typePanel.y+typePanel.height<=mapPanel.y&&mapPanel.y+mapPanel.height<=detailPanel.y,'窄螢幕依種類、地圖、位置說明排列');
   assert.ok((await page.locator('.field-type-choice>span').first().boundingBox()).width>85,'種類名稱保留橫向閱讀空間');
  };
  await checkLayout();
  if(width===390||width===1280)await page.screenshot({path:`outputs/grounded/type-list-${width}.png`,fullPage:width===390});
  assert.equal(await page.locator('#app [data-collect-check],#app [data-ng-absent],#app input[type=checkbox]').count(),0);
  await page.locator('input[name=field-type][value="Black Widow"]').check();assert.equal(await page.locator('[data-map-list]').count(),5);
  assert.equal(await page.locator('input[name=field-type]:checked').count(),1);
  const listScroll=await page.locator('#field-type-options').evaluate(node=>node.scrollTop);
  assert.ok(listScroll>0,'可直接選取清單下方的種類');
  await page.locator('input[name=field-type]:checked').press('ArrowDown');
  assert.notEqual(await page.locator('input[name=field-type]:checked').inputValue(),'Black Widow');
  assert.ok(Math.abs(await page.locator('#field-type-options').evaluate(node=>node.scrollTop)-listScroll)<50,'切換種類保持列表位置');
  await page.locator('input[name=field-type][value="Black Widow"]').check();
  await page.locator('[data-map-list="field-211340"]').click();
  assert.match(await page.locator('#map-selection').innerText(),/棚下[\s\S]*不重生/);
  assert.equal(await page.locator('[data-yard-pin="211340"].selected').count(),1);
  assert.match(await page.locator('#yard-selection-label').textContent(),/黑寡婦/);
  await page.getByRole('link',{name:'查看弱點與抗性 →'}).click();await page.locator('.creature-matrix tbody tr').first().waitFor();
  assert.match(await page.locator('.creature-matrix tbody tr').first().innerText(),/黑寡婦[\s\S]*Black Widow/);
  await sidebar('monsterMap');assert.equal(await page.locator('input[name=field-type]:checked').inputValue(),'all');
  assert.equal(await page.locator('[data-map-list]').count(),459);
  await page.locator('#field-search').fill('綠椿');assert.equal(await page.locator('[data-map-list]').count(),4);
  assert.equal(await page.locator('input[name=field-type]').count(),2,'搜尋同步縮小種類列表');
  await page.locator('[data-map-list]').first().click();
  const before=await page.locator('#yard-map').getAttribute('viewBox');
  await page.locator('#yard-map').focus();await page.keyboard.press('+');assert.notEqual(await page.locator('#yard-map').getAttribute('viewBox'),before);
  await page.keyboard.press('Home');assert.equal(await page.locator('#yard-map').getAttribute('viewBox'),'0 0 780 830');
  if(width===1280){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'outputs/grounded/monster-map-desktop.png'});}
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'怪物地圖不溢出 '+width);
  await sidebar('resourceMap');assert.equal(await page.locator('[data-map-list]').count(),586);
  await page.locator('#field-search').fill('毛絮');assert.equal(await page.locator('[data-map-list]').count(),9);
  await page.locator('input[name=field-type][value="Lint Clump"]').check();
  assert.equal(await page.locator('input[name=field-type]:checked').count(),1);
  await page.locator('[data-map-list]').first().click();assert.match(await page.locator('#map-selection').innerText(),/三階白蟻斧/);
  await page.locator('#field-search').fill('not-a-resource');assert.equal(await page.locator('[data-map-list]').count(),0);
  await page.locator('#reset-view').click();assert.equal(await page.locator('[data-map-list]').count(),586);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'採集地圖不溢出 '+width);
  await page.goto(url+'?view=resourceMap&item=field-211155');await page.locator('[data-yard-pin="211155"].selected').waitFor();
  assert.match(await page.locator('#map-selection').innerText(),/煙灰缸[\s\S]*黑牛甲蟲鎚/);
  await checkLayout();
  if(width===390||width===1280){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`outputs/grounded/resource-map-${width}.png`,fullPage:width===390});}
  assert.deepEqual(await page.evaluate(()=>indexedDB.databases()),[],'參考地圖不開啟進度資料庫');
  await context.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 console.log('Field maps passed: 459 creatures / 586 resources, 8 widths, desktop types/map/detail columns, narrow-screen stacking, local tiles, single-select type list, retained list scroll, keyboard choice, filters and aliases, selection labels, deep links, weakness link, keyboard zoom/reset, no progress DB or external requests');
}finally{await browser.close();}
