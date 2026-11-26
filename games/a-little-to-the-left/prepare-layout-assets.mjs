// 離線處理已限定下載的研究圖片；只需既有工具環境的 sharp，不新增產品依賴。
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {require} from '../../scripts/browser-runtime.mjs';
import {guides} from './layout-guides.mjs';
const sharp=require('sharp'),cache=new URL('../../outputs/alttl/references/',import.meta.url),out=new URL('dist/layouts/',import.meta.url);
await fs.mkdir(out,{recursive:true});
const refs=JSON.parse(await fs.readFile(new URL('index.json',cache),'utf8')),manifest={checkedAt:'2026-11-27',author:'Abbilieve',assets:[]};
const extras=JSON.parse(await fs.readFile(new URL('extra-layout-references.json',import.meta.url),'utf8'));
const extraOnly=process.argv.includes('--extra-only');
if(extraOnly)manifest.assets=JSON.parse(await fs.readFile(new URL('layout-assets.json',import.meta.url),'utf8')).assets.filter(a=>a.sourceIndex<100);
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
for(const [key,guide] of Object.entries(guides)){
 const row=refs.find(r=>r.key===key);if(!row)throw Error('缺少原始來源 '+key);
 const indexes=new Set([...guide.figures.map(f=>f.sourceIndex),...(guide.stickerIcons||[])]);
 for(const index of indexes){
  if(extraOnly&&index<100)continue;
  const image=row.images.find(i=>i.index===index)||extras.find(i=>i.puzzleKey===key&&i.index===index);if(!image)throw Error('缺圖 '+key+' '+index);
  const bytes=await fs.readFile(image.originalFile?new URL(image.originalFile,import.meta.url):new URL(image.researchFile,cache)),meta=await sharp(bytes,{animated:true}).metadata(),frames=meta.pages||1;
  const stem=key+'-'+String(index).padStart(2,'0'),file='layouts/'+stem+'.webp';
  // 動態示範預設顯示末幀；使用者按播放才載入動畫，避免自動閃動。
  const staticBytes=await sharp(bytes,{page:frames-1,pages:1}).webp({quality:94}).toBuffer();
  await fs.writeFile(new URL(stem+'.webp',out),staticBytes);
  const asset={id:stem,puzzleKey:key,sourceIndex:index,file,width:meta.width,height:meta.pageHeight||meta.height,sourceUrl:image.originalFile?image.url:row.sourceUrl,originalUrl:image.url,originalSha256:hash(bytes),sha256:hash(staticBytes),author:image.author||'Abbilieve',checkedAt:'2026-11-27',frames,...(image.captureSeconds!==undefined?{captureSeconds:image.captureSeconds,evidenceType:'video-frame'}:{evidenceType:'guide-image'})};
  if(frames>1){const animation=await sharp(bytes,{animated:true}).webp({quality:85,effort:3,loop:0}).toBuffer();asset.animationFile='layouts/'+stem+'-motion.webp';asset.animationSha256=hash(animation);await fs.writeFile(new URL(stem+'-motion.webp',out),animation);}
  manifest.assets.push(asset);
 }
}
delete manifest.author;manifest.authors=[...new Set(manifest.assets.map(a=>a.author))];
await fs.writeFile(new URL('layout-assets.json',import.meta.url),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({puzzles:Object.keys(guides).length,images:manifest.assets.length,animations:manifest.assets.filter(a=>a.animationFile).length}));
