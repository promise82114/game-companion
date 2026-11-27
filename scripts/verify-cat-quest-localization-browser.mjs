import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {chromium} from './browser-runtime.mjs';
import {createChineseText} from '../shared/chinese-text.js';
const repo=fileURLToPath(new URL('../',import.meta.url)),slugs=['cat-quest-ii','cat-quest-iii'];
const server=http.createServer(async(req,res)=>{try{let name=new URL(req.url,'http://localhost').pathname.replace(/^\/game-companion\//,'');for(const slug of slugs)if(name.startsWith('games/'+slug+'/'))name=name.replace('games/'+slug+'/','games/'+slug+'/dist/');if(name.endsWith('/'))name+='index.html';const file=path.resolve(repo,name);if(!file.startsWith(repo)||!name.startsWith('shared/')&&!slugs.some(slug=>name.startsWith('games/'+slug+'/dist/')))throw Error();const body=await fs.readFile(file);res.writeHead(200,{'Content-Type':file.endsWith('.js')?'text/javascript':file.endsWith('.json')?'application/json':file.endsWith('.css')?'text/css':'text/html','Cache-Control':'no-store'});res.end(body);}catch{res.writeHead(404);res.end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}/game-companion/`,browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'}),results=[];
await fs.mkdir('outputs/cat-quest-localization',{recursive:true});
const state=p=>p.evaluate(async()=>{const {config,clone}=await import('./model.js'),{createStore}=await import('../../shared/roadmap-store.js'),store=createStore(config,{clone});try{return await store.open();}finally{store.close();}});
try{
 for(const slug of slugs){
  const root=new URL('../games/'+slug+'/',import.meta.url),data=JSON.parse(await fs.readFile(new URL('dist/data.json',root),'utf8')),raw=await fs.readFile(new URL('research/localization.json',root),'utf8'),glossary=JSON.parse(raw),chinese=createChineseText(glossary);
  const built=await import(new URL('dist/localization.js',root));assert.equal(built.localizationSha256,createHash('sha256').update(raw).digest('hex'));assert.deepEqual(built.glossary,glossary);assert.deepEqual(glossary.officialNames,{});
  for(const row of [...data.entities,...data.trophies]){const original=row.name||row.label,primary=chinese.plain(original).replace(/\b[IVX]+\b/g,'');assert.match(primary,/[\u3400-\u9fff]/u,original);assert.doesNotMatch(primary,/[A-Za-z]{2,}/u,original);}
  assert.equal(chinese.plain(slug==='cat-quest-ii'?'cq2-sp-healpaw':'cq3-spell-healpaw'),slug==='cat-quest-ii'?'cq2-sp-healpaw':'cq3-spell-healpaw');assert.equal(chinese.plain('https://example.com/Healpaw'),'https://example.com/Healpaw');
  const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'}),page=await context.newPage(),errors=[];page.setDefaultTimeout(12000);page.on('pageerror',e=>errors.push(e.message));await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  const visit=async(query='')=>{await page.goto(base+'games/'+slug+'/'+query);await page.locator('#main h1').filter({hasText:/遊玩路線|查漏清單|蒐集查漏|獎盃|資料/}).waitFor();};
  await visit();const initial=await state(page);assert.match(await page.locator('.brand').textContent(),/^貓咪鬥惡龍/);assert.ok(await page.locator('#main .name-zh').count()>0);assert.ok(await page.locator('#main .original-name').count()>0);if(slug==='cat-quest-iii')assert.ok(await page.locator('code .name-zh').filter({hasText:'鳥糞'}).count()>0,'inline item names must be translated too');
  for(const kind of [...new Set(data.entities.map(r=>r.kind))]){
   await visit('?view=collections&category='+kind);assert.match(await page.locator('.translation-note').textContent(),/參考譯名/);
   const checks=page.locator('#main > article.row > label.check > input[data-group]');assert.equal(await checks.count(),data.entities.filter(e=>e.kind===kind).length,slug+' '+kind);
   const labels=await checks.evaluateAll(inputs=>inputs.map(input=>{const label=input.closest('label').cloneNode(true);label.querySelectorAll('.original-name').forEach(el=>el.remove());return label.textContent;}));
   for(const label of labels){assert.match(label,/[\u3400-\u9fff]/u);assert.doesNotMatch(label.replace(/\b[IVX]+\b/g,''),/[A-Za-z]{2,}/u);}
  }
  await visit('?view=collections&category=spell');const group=slug==='cat-quest-ii'?'entities':'facts';await page.locator('#search').fill('Healpaw');const englishIds=await page.locator('#main input[data-group]').evaluateAll(xs=>xs.map(x=>x.dataset.id));await page.locator('#search').fill('療癒之爪');const chineseIds=await page.locator('#main input[data-group]').evaluateAll(xs=>xs.map(x=>x.dataset.id));assert.deepEqual(chineseIds,englishIds);assert.equal(chineseIds.length,1);const id=chineseIds[0];
  const name=page.locator('#entry-'+id+' .check').first();assert.match(await name.textContent(),/^療癒之爪（Healpaw）/);const sizes=await name.evaluate(el=>[parseFloat(getComputedStyle(el.querySelector('.name-zh')).fontSize),parseFloat(getComputedStyle(el.querySelector('.original-name')).fontSize)]);assert.equal(sizes[0],14);assert.ok(sizes[1]>=12&&sizes[1]<sizes[0]);
  await page.locator('#main input[data-group]').first().click();await page.waitForFunction(id=>!document.getElementById('entry-'+id),id);assert.equal((await state(page))[group][id].done,true);await page.locator('#undo').click();await page.locator('#entry-'+id).waitFor();assert.equal((await state(page))[group][id]?.done||false,false);
  // Reading the same content after translation must not generate progress writes.
  const beforeReading=await state(page);await visit('?view=trophies');assert.equal(await page.locator('#main input[data-group=trophies]').count(),data.trophies.length);assert.deepEqual(await state(page),beforeReading);await page.locator('.translation-note a').click();await page.locator('#entry-translation-policy').waitFor();assert.match(await page.locator('#entry-translation-policy').textContent(),/沒有已核對的官方中文/);
  await page.evaluate(async()=>{const {createChineseText}=await import('../../shared/chinese-text.js');const box=document.createElement('section');box.innerHTML='<p>Healpaw / Healpaw</p><pre>Healpaw</pre><textarea>Healpaw</textarea>';const helper=createChineseText({terms:{Healpaw:'療癒<script>不可執行</script>'},status:'reference',officialNames:{}});helper.decorate(box);helper.decorate(box);if(box.querySelector('script')||box.querySelectorAll('.original-name').length!==1||box.querySelector('pre').textContent!=='Healpaw'||box.querySelector('textarea').value!=='Healpaw')throw Error('unsafe or repeated localization');});
  for(const width of [320,390,768,1440,1920,2560]){
   await page.setViewportSize({width,height:1000});for(const query of ['', '?view=collections&category=equipment','?view=trophies']){await visit(query);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,slug+' overflow '+width+' '+query);}
   if([390,1440].includes(width)){await visit('?view=collections&category=equipment');await page.screenshot({path:'outputs/cat-quest-localization/'+slug+'-equipment-'+width+'.png'});await page.locator('#main > article.row').first().scrollIntoViewIfNeeded();await page.screenshot({path:'outputs/cat-quest-localization/'+slug+'-names-'+width+'.png'});await visit();await page.screenshot({path:'outputs/cat-quest-localization/'+slug+'-roadmap-'+width+'.png'});}
  }
  assert.deepEqual(errors,[]);await context.close();results.push({slug,entities:data.entities.length,trophies:data.trophies.length,terms:Object.keys(glossary.terms).length});console.log('PASS '+slug);
 }
 console.log(JSON.stringify({passed:true,results,checks:['Chinese primary/original secondary','all catalogue names','Chinese/English search parity','unchanged IDs and stored progress','check/undo','reference provenance','safe text rendering','320-2560px layout']}));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
