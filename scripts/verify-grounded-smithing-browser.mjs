import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from './browser-runtime.mjs';
const url=(process.env.TEST_BASE_URL||'http://127.0.0.1:4190/game-companion/')+'games/grounded/';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
const errors=[];
await fs.mkdir('outputs/grounded',{recursive:true});
try{
 for(const width of [375,768,1280,1920]){
  const context=await browser.newContext({viewport:{width,height:950},serviceWorkers:'block'});
  await context.route('https://**',route=>route.abort());
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  const sidebar=async name=>{
   if(!await page.locator(`[data-view=${name}]`).isVisible())await page.locator('#nav-toggle').click();
   await page.locator(`[data-view=${name}]`).click();
  };
  await page.goto(url+'?view=equipment&kind=smithing');
  await page.locator('#smithing-materials').waitFor();
  assert.equal(await page.locator('.equipment-tabs a').count(),3);
  assert.equal(await page.locator('.equipment-tabs [aria-current=page]').getAttribute('data-equipment-tab'),'smithing');
  assert.equal(await page.locator('[data-armor-tab],#reset-view,#app details').count(),0);
  assert.equal(await page.locator('[data-view=equipment]').getAttribute('aria-current'),'page');
  assert.equal(await page.locator('#app [role=table]').count(),8);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'鍛造說明不能溢出視窗');
  await page.getByRole('link',{name:'製作解鎖',exact:true}).click();
  assert.equal(new URL(page.url()).hash,'#smithing-unlocks');
  await page.screenshot({path:`outputs/grounded/smithing-${width}.png`,fullPage:true});
  if(width===1280){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'outputs/grounded/smithing-desktop.png'});}
  await page.locator('[data-equipment-tab=weapons]').click();
  await page.locator('#weapon-search').fill('Black Ox Hammer');
  const count=await page.locator('[data-weapon]').count();assert.ok(count>0);
  await page.locator('[data-equipment-tab=smithing]').click();
  await page.locator('[data-equipment-tab=armor]').click();
  await page.locator('[data-armor-tab=shields]').click();await page.locator('[data-shield]').first().waitFor();
  await page.locator('[data-equipment-tab=smithing]').click();
  await sidebar('chips');await page.locator('#chip-search').fill('不存在的合成搜尋');
  assert.equal(await page.locator('[data-chip]').count(),0);
  await sidebar('equipment');await page.locator('#smithing-unlocks').waitFor();
  await page.locator('#smithing-unlocks a[href$="tech-chip-black-ant"]').click();
  await page.locator('#tech-chip-black-ant').waitFor();
  assert.equal(await page.locator('#chip-search').inputValue(),'','晶片深連結清除會隱藏目標的搜尋');
  await sidebar('equipment');await page.locator('#smithing-materials').waitFor();
  await page.locator('[data-equipment-tab=weapons]').click();
  assert.equal(await page.locator('#weapon-search').inputValue(),'');
  assert.equal(await page.locator('[data-weapon]').count(),61);
  assert.deepEqual(await page.evaluate(()=>indexedDB.databases()),[],'純資料分頁不得建立或改寫玩家進度');
  if(width===1280){
   await sidebar('collectibles');await page.locator('#collection-status-all').click();
   await page.locator('#collection-search').fill('synthetic-no-match');
   await page.locator('[data-category-link=molars]').click();
   assert.equal(await page.locator('#collection-search').inputValue(),'synthetic-no-match','同一清單內可組合搜尋與分類');
   assert.equal(await page.locator('#collection-status-all').getAttribute('aria-pressed'),'true');
   await sidebar('chips');await sidebar('collectibles');
   assert.equal(await page.locator('#collection-search').inputValue(),'');
   assert.equal(await page.locator('#collection-status-pending').getAttribute('aria-pressed'),'true');
   await sidebar('trophies');await page.locator('#trophy-status-all').click();
   await page.locator('#trophy-category').selectOption('story');
   await sidebar('chips');await sidebar('trophies');
   assert.equal(await page.locator('#trophy-status-pending').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('#trophy-category').inputValue(),'all');
  }
  await context.close();
 }
 assert.deepEqual(errors,[]);console.log('Smithing passed: 4 widths, tab routing, chapter anchors, filter reset, chip deep links, no overflow, no progress DB');
}finally{await browser.close();}
