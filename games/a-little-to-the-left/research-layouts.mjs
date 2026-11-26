// 明確限定五章公開來源；僅手動研究執行，不在 build／verify 中連網。
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {guides} from './layout-guides.mjs';
const cache=new URL('../../outputs/alttl/references/',import.meta.url);
await fs.mkdir(cache,{recursive:true});
const sourceIds=['3472623422','3466683543','3482281198','3483476129','3484131745'];
const needed=new Set(Object.keys(guides));
const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const result=[];
for(let chapter=1;chapter<=5;chapter++){
 const name='c0'+chapter,url='https://steamcommunity.com/sharedfiles/filedetails/?id='+sourceIds[chapter-1];
 let html;try{html=await fs.readFile(new URL(name+'.html',cache),'utf8');}catch{const response=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error('來源讀取失敗 '+response.status);html=await response.text();await fs.writeFile(new URL(name+'.html',cache),html);}
 for(const chunk of html.split(/<div class="subSection detailBox" id="/).slice(1)){
  const sectionId=chunk.match(/^(\d+)"/)?.[1],title=decode(chunk.match(/class="subSectionTitle">([\s\S]*?)<\/div>/)?.[1]?.trim()||'');
  const level=title.match(/^Level (\d+)/);if(!level)continue;
  const key=name+'-p'+level[1].padStart(2,'0');if(!needed.has(key))continue;
  const desc=chunk.match(/class="subSectionDesc">([\s\S]*?)<div style="clear: both">/)?.[1]||'';
  const images=[...desc.matchAll(/<img[^>]+src="(https:\/\/(?:images\.steamusercontent\.com|i\.imgur\.com)\/[^" ]+)"/g)].map((m,i)=>({url:decode(m[1]),index:i+1,preceding:decode(desc.slice(Math.max(0,m.index-1000),m.index).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ')).slice(-350)}));
  result.push({key,title,sectionId,sourceUrl:url+'#'+sectionId,images,text:decode(desc.replace(/<br\s*\/?\s*>/g,'\n').replace(/<hr[^>]*>/g,'\n').replace(/<[^>]*>/g,'').replace(/\n{3,}/g,'\n\n')).trim()});
 }
}
if(process.argv.includes('--download')){
 for(const row of result)for(const image of row.images){
  const name=row.key+'-'+String(image.index).padStart(2,'0');
  const filename=new URL(name+'.reference',cache);let bytes;
  try{bytes=await fs.readFile(filename);}catch{const response=await fetch(image.url,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error('圖片讀取失敗 '+name+' '+response.status);bytes=Buffer.from(await response.arrayBuffer());await fs.writeFile(filename,bytes);}
  image.sha256=createHash('sha256').update(bytes).digest('hex');image.researchFile=name+'.reference';
 }
}
await fs.writeFile(new URL('index.json',cache),JSON.stringify(result,null,2));
console.log(JSON.stringify(result.map(r=>({key:r.key,images:r.images.length,title:r.title})),null,2));
