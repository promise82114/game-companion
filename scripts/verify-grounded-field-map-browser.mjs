import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from './browser-runtime.mjs';
const url=(process.env.TEST_BASE_URL||'http://127.0.0.1:4190/game-companion/')+'games/grounded/';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
const errors=[],external=[];
await fs.mkdir('outputs/grounded',{recursive:true});
try{
 for(const width of [320,390,768,1280,1920]){
  const context=await browser.newContext({viewport:{width,height:950},serviceWorkers:'block'});
  await context.route('https://**',route=>{external.push(route.request().url());return route.abort();});
  const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
  const sidebar=async name=>{if(!await page.locator(`[data-view=${name}]`).isVisible())await page.locator('#nav-toggle').click();await page.locator(`[data-view=${name}]`).click();};
  await page.goto(url+'?view=monsterMap');await page.locator('#yard-map').waitFor();
  assert.equal(await page.locator('[data-map-list]').count(),459);
  assert.equal(await page.locator('[data-basemap-tile]').count(),64);
  assert.equal(await page.locator('#app [data-collect-check],#app [data-ng-absent],#app input[type=checkbox]').count(),0);
  await page.locator('#field-type').selectOption('Black Widow');assert.equal(await page.locator('[data-map-list]').count(),5);
  await page.locator('[data-map-list="field-211340"]').click();
  assert.match(await page.locator('#map-selection').innerText(),/棚下[\s\S]*不重生/);
  assert.equal(await page.locator('[data-yard-pin="211340"].selected').count(),1);
  assert.match(await page.locator('#yard-selection-label').textContent(),/黑寡婦/);
  await page.getByRole('link',{name:'查看弱點與抗性 →'}).click();await page.locator('.creature-matrix tbody tr').first().waitFor();
  assert.match(await page.locator('.creature-matrix tbody tr').first().innerText(),/黑寡婦[\s\S]*Black Widow/);
  await sidebar('monsterMap');assert.equal(await page.locator('#field-type').inputValue(),'all');
  assert.equal(await page.locator('[data-map-list]').count(),459);
  await page.locator('#field-search').fill('綠椿');assert.equal(await page.locator('[data-map-list]').count(),4);
  await page.locator('[data-map-list]').first().click();
  const before=await page.locator('#yard-map').getAttribute('viewBox');
  await page.locator('#yard-map').focus();await page.keyboard.press('+');assert.notEqual(await page.locator('#yard-map').getAttribute('viewBox'),before);
  await page.keyboard.press('Home');assert.equal(await page.locator('#yard-map').getAttribute('viewBox'),'0 0 780 830');
  if(width===1280){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'outputs/grounded/monster-map-desktop.png'});}
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'怪物地圖不溢出 '+width);
  await sidebar('resourceMap');assert.equal(await page.locator('[data-map-list]').count(),586);
  await page.locator('#field-search').fill('毛絮');assert.equal(await page.locator('[data-map-list]').count(),9);
  await page.locator('[data-map-list]').first().click();assert.match(await page.locator('#map-selection').innerText(),/三階白蟻斧/);
  await page.locator('#field-search').fill('not-a-resource');assert.equal(await page.locator('[data-map-list]').count(),0);
  await page.locator('#reset-view').click();assert.equal(await page.locator('[data-map-list]').count(),586);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'採集地圖不溢出 '+width);
  await page.goto(url+'?view=resourceMap&item=field-211155');await page.locator('[data-yard-pin="211155"].selected').waitFor();
  assert.match(await page.locator('#map-selection').innerText(),/煙灰缸[\s\S]*黑牛甲蟲鎚/);
  if(width===390||width===1280){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`outputs/grounded/resource-map-${width}.png`,fullPage:width===390});}
  assert.deepEqual(await page.evaluate(()=>indexedDB.databases()),[],'參考地圖不開啟進度資料庫');
  await context.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 console.log('Field maps passed: 459 creatures / 586 resources, 5 widths, local tiles, filters and aliases, selection labels, deep links, weakness link, keyboard zoom/reset, no progress DB or external requests');
}finally{await browser.close();}
