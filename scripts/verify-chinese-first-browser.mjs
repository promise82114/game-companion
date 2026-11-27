import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {chromium} from './browser-runtime.mjs';
const site=fileURLToPath(new URL('../_site/',import.meta.url));
const server=http.createServer(async(req,res)=>{try{let name=new URL(req.url,'http://localhost').pathname.replace(/^\/game-companion\//,'');if(name.endsWith('/'))name+='index.html';const file=path.resolve(site,name);if(!file.startsWith(site))throw Error();res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.json')?'application/json':file.endsWith('.svg')?'image/svg+xml':'text/html');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}/game-companion/`,browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'}),results=[];
await fs.mkdir('outputs/chinese-first',{recursive:true});
const cases=[
 {slug:'ball-x-pit',views:['roadmap','matrix','trophies','buildings','recipes','encyclopedia'],sample:'白骨墓園',search:['Clinic','診所'],searchView:'buildings'},
 {slug:'edfir',views:['roadmap','weapons','trophies','equipment','advice'],sample:'指令：爆破小隊',search:['AE-2032 Ghost YL','AE-2032 幽靈 YL'],searchView:'weapons'},
 {slug:'a-little-to-the-left',views:['roadmap','missing','trophies','daily'],sample:'甜蜜的家',search:["The Cat's Pajamas",'貓界極品'],searchView:'trophies'},
 {slug:'talos2',views:['roadmap','trophies','branches','collectibles'],sample:'方塊階梯',search:['Philosopher','哲學家'],searchView:'trophies'},
 {slug:'thank-goodness-youre-here',views:['roadmap','trackers','trophies'],sample:'查理',search:["Barnsworth's Best",'巴恩茲沃最強之人'],searchView:'trophies'},
 {slug:'dragon-quest-iii-hd-2d-remake',views:['roadmap','collections','trophies','advice'],sample:'亞里亞罕'},
 {slug:'like-a-dragon-infinite-wealth',views:['roadmap','collections','trophies','advice'],sample:'冒險路線',search:['Mr. Crazy','瘋狂先生'],searchView:'trophies'},
 {slug:'edf-wb',views:[''],sample:'狂怒'},
 {slug:'edf-wb2',views:[''],sample:'狂怒'},
 {slug:'mycopunk',views:[''],sample:'裝備'}
];
try{
 for(const c of cases){
  const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  const visit=async(view='')=>{await page.goto(base+'games/'+c.slug+'/'+(view?'?view='+view:''));await page.waitForFunction(()=>{const text=(document.querySelector('main')||document.body).innerText;return text.length>100&&!/正在載入攻略|正在載入攻略與 IndexedDB|正在載入資料/.test(text);},{},{timeout:15000});if(c.slug==='mycopunk')await page.locator('.category-card').first().waitFor();else if(c.slug.startsWith('edf-wb'))await page.locator('.item-name').first().waitFor();else await page.locator('.cf-notice').first().waitFor();};
  await visit();await page.waitForFunction(sample=>document.body.innerText.includes(sample),c.sample);
  for(const view of c.views){await visit(view);assert.deepEqual(errors,[],c.slug+' '+view);}
  if(c.search){
   await visit(c.searchView);const search=page.locator('main input[type=search],#search').first();await search.fill(c.search[0]);await page.waitForTimeout(120);
   const ids=()=>page.locator('main input[type=checkbox][data-id],main input[type=checkbox][data-weapon],main input[type=checkbox][data-trophy],#content input[data-id],#app input[data-group]').evaluateAll(xs=>xs.map(x=>x.dataset.id||x.dataset.weapon||x.dataset.trophy||x.getAttribute('data-group')).filter(Boolean));
   const original=await ids();assert.ok(original.length,c.slug+' original search');await search.fill(c.search[1]);await page.waitForTimeout(120);assert.deepEqual(await ids(),original,c.slug+' search parity');
  }
  if(c.slug.startsWith('edf-wb')){
   await visit();const primary=page.locator('.item-name').first(),original=page.locator('.item-translation').first();assert.match(await primary.textContent(),/狂怒/);assert.match(await original.textContent(),/フューリアス/);
   assert.ok(await primary.evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>await original.evaluate(el=>parseFloat(getComputedStyle(el).fontSize)));
   await page.locator('#search').fill('フューリアス');const raw=await page.locator('#list input[data-id]').evaluateAll(xs=>xs.map(x=>x.dataset.id));await page.locator('#search').fill('狂怒');assert.deepEqual(await page.locator('#list input[data-id]').evaluateAll(xs=>xs.map(x=>x.dataset.id)),raw);
  }
  if(c.slug==='mycopunk'){
   await page.locator('.primary-nav [data-view="collection"]').click();const item=page.locator('#upgrade-list input[data-collect]').first(),id=await item.getAttribute('data-collect');await item.check();await page.waitForFunction(id=>JSON.parse(localStorage.getItem('game-companion.mycopunk.progress.v1'))?.records[id]?.collected,id);await page.locator('#upgrade-list input[data-collect="'+id+'"]').waitFor({state:'detached'});await page.locator('#undo-last').click();await page.locator('#upgrade-list input[data-collect="'+id+'"]').waitFor();
   for(const view of ['collection','recommendations','unlocks','planner']){await page.locator('.primary-nav [data-view="'+view+'"]').click();await page.waitForTimeout(350);assert.match(await page.locator('#page-title').textContent(),/[\u3400-\u9fff]/u);assert.ok(await page.locator('#page-title .cf-zh').count());}
   await page.locator('#build-options .build-option').first().waitFor();assert.ok(await page.locator('#build-options .cf-zh').count());
   await page.locator('#language-toggle').click();assert.equal(await page.locator('#page-title .cf-zh').first().isVisible(),true);assert.equal(await page.locator('#page-title .cf-original').first().isVisible(),false);await page.locator('#language-toggle').click();assert.equal(await page.locator('#page-title .cf-original').first().isVisible(),true);
   await visit();const count=page.locator('.category-card .card-top>span').nth(1);assert.match(await count.locator('.cf-zh').textContent(),/5\s*項/);assert.ok(await page.locator('#page-title .cf-zh').first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>=22);
  }
  if(c.slug==='dragon-quest-iii-hd-2d-remake'){
   await visit('roadmap');assert.equal(await page.locator('#english-toggle').getAttribute('aria-pressed'),'true');await page.locator('#english-toggle').click();assert.equal(await page.locator('.original-name').first().isVisible(),false);await page.locator('#english-toggle').click();assert.equal(await page.locator('.original-name').first().isVisible(),true);
   const data=JSON.parse(await fs.readFile(new URL('../games/'+c.slug+'/dist/data.json',import.meta.url),'utf8')),row=data.collectibles.find(r=>r.category==='mm'&&r.region==='Necrogond／最後寶珠');assert.ok(row);await visit('collections');for(const query of ['Necrogond／最後寶珠','奈克羅剛鐸／最後寶珠']){await page.locator('#search').fill(query);await page.locator('[data-group="collectibles"][data-id="'+row.id+'"]').waitFor();}
  }
  if(c.slug==='like-a-dragon-infinite-wealth'){
   const data=JSON.parse(await fs.readFile(new URL('../games/'+c.slug+'/dist/data.json',import.meta.url),'utf8')),row=data.collectibles.find(r=>r.label==='Bar Moderne');assert.ok(row);await visit('collections&category=photos');for(const query of ['Bar Moderne','摩登酒吧']){await page.locator('#search').fill(query);await page.locator('[data-group="objectives"][data-id="'+row.id+'"]').waitFor();}assert.equal(await page.locator('#entry-'+row.id+' .original-name').textContent(),row.originalName);
  }
  if(c.slug==='talos2'){
   await visit('roadmap#step-save-safety');await page.locator('[data-backup="save-safety"]').click();await page.locator('#backup-note').fill('Balance / Settings');await page.locator('#backup-ack').check();await page.locator('#backup-confirm').click();await page.locator('#backup-dialog').waitFor({state:'hidden'});assert.equal(await page.locator('#step-save-safety .backup-check [data-preserve-original]').textContent(),'Balance / Settings');
  }
  for(const width of [320,390,768,1440,1920,2560]){
   await page.setViewportSize({width,height:1000});await visit(c.views[0]);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,c.slug+' overflow '+width);
   const margins=await page.locator('.cf-name>.cf-original').evaluateAll(xs=>xs.map(el=>getComputedStyle(el).marginLeft));assert.ok(margins.every(x=>x==='0px'),c.slug+' original-name indentation');
   if([390,1440].includes(width))await page.screenshot({path:'outputs/chinese-first/'+c.slug+'-'+width+'.png'});
  }
  assert.deepEqual(errors,[],c.slug);await context.close();results.push(c.slug);console.log('PASS '+c.slug);
 }
 console.log(JSON.stringify({passed:true,modules:results,checks:['Chinese primary','original secondary','bilingual search','functional pages','original visibility toggles','no page errors','320-2560px overflow','no inherited original indentation']}));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
