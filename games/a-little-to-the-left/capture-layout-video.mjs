// 僅在手動重建研究素材時連線；限定公開花瓶影片的八個時間點。
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {chromium} from '../../scripts/browser-runtime.mjs';
const folder=new URL('../../outputs/alttl/references/vase-video/',import.meta.url),times=[14,20,26,32,38,44,50,56];
await fs.mkdir(folder,{recursive:true});
const existing=await Promise.all(times.map(t=>fs.access(new URL(t+'.png',folder)).then(()=>true,()=>false)));
if(existing.every(Boolean)){console.log(JSON.stringify({reused:8,source:'GameStockFootage / cxHiLjN9jVs'}));process.exit(0);}
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
try{
 const context=await browser.newContext({viewport:{width:1280,height:900}}),page=await context.newPage();
 await page.goto('https://www.youtube.com/watch?v=cxHiLjN9jVs',{waitUntil:'domcontentloaded',timeout:30000});
 await page.waitForSelector('video',{timeout:15000});
 await page.locator('video').evaluate(async video=>{video.muted=true;await video.play();});
 await page.waitForFunction(()=>document.querySelector('video')?.readyState>=2,{},{timeout:20000});
 await page.locator('video').evaluate(video=>video.pause());
 const duration=await page.locator('video').evaluate(v=>v.duration);
 if(!Number.isFinite(duration)||duration<56||duration>90)throw Error('公開影片範圍與已查證版本不同，停止擷取。');
 await fs.writeFile(new URL('metadata.json',folder),JSON.stringify({sourceUrl:'https://www.youtube.com/watch?v=cxHiLjN9jVs',author:'GameStockFootage',duration,times,checkedAt:'2026-11-27'},null,2));
 for(const [i,time] of times.entries()){
  if(existing[i])continue;
  await page.locator('video').evaluate(async(video,time)=>{await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(Error('影片 seek 逾時，停止擷取')),10000);video.addEventListener('seeked',()=>{clearTimeout(timeout);resolve();},{once:true});video.currentTime=time;});await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));},time);
  await page.locator('video').screenshot({path:fileURLToPath(new URL(time+'.png',folder))});
 }
 await context.close();console.log(JSON.stringify({captured:8,author:'GameStockFootage',duration}));
}finally{await browser.close();}
