import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {guides} from './layout-guides.mjs';
const specUrl=new URL('../../a-little-to-the-left_GAME_COMPANION_SPEC.md',import.meta.url);
const raw=await fs.readFile(specUrl,'utf8'),text=raw.replace(/\r/g,'');
const research=JSON.parse(await fs.readFile(new URL('research.json',import.meta.url),'utf8'));
const layoutAssets=JSON.parse(await fs.readFile(new URL('layout-assets.json',import.meta.url),'utf8'));
const blocks=[...text.matchAll(/^### (c\d{2}-p\d{2}|credits|cleanup-[a-z]+)｜([^\n]+)\n([\s\S]*?)(?=^##|$(?![\s\S]))/gm)];
const chapters=['Home Sweet Home','Lost Recipe','Nitty Gritty','Inner Nature','Near Earth Organizer'].map((title,i)=>({id:'c0'+(i+1),title,order:i+1,sourceId:'S0'+(i+3)}));
const multi={
 'c01-p07':['書高','書脊厚度'],'c01-p13':['中央最矮、兩側對稱','金色紋路相接'],'c01-p16':['筆尖尖銳程度','橡皮擦長度','紅橙黃綠藍色序'],'c01-p18':['書脊斜線接續','顏色漸變'],'c01-p19':['鉛筆長度','筆身刻紋'],
 'c02-p01':['番茄朝前','完整橫向標籤'],'c02-p02':['罐子高度','液面高度','黃至綠漸變'],'c02-p03':['尺寸排一列','大匙套疊小匙'],'c02-p04':['裂紋銜接','裝飾環紋銜接'],'c02-p05':['顏色漸變','內容斜面接成坡線'],'c02-p08':['全部撕除貼紙','只保留對應水果貼紙'],
 'c03-p03':['面積排一列','大底小頂堆疊','多邊形邊數'],'c03-p07':['滴漆接續','跨罐大三角形'],'c03-p08':['洞數／顏色分類（待版本核對）','表面紋理（待版本核對）'],'c03-p09':['鑰匙全長','握柄洞數 1–7','齒端數字形狀 1–7'],'c03-p13':['全部擦亮','全部弄暗','左起暗度 5、4、3、2、1、0'],'c03-p14':['用途分箱','紅藍白綠分箱'],'c03-p15':['完整箭頭','兩個膠帶矩形'],
 'c04-p04':['顏色漸變','葉緣齒數','葉片洞口相接'],'c04-p06':['顏色／紋理接續','端部輪廓相嵌','切面數排序'],'c04-p11':['純色四角、混色四邊','純色四邊、混色四角'],'c05-p07':['全部等高','逐漸遞減高度']
};
const puzzles=blocks.filter(b=>b[1].startsWith('c0')).map(b=>{
 const key=b[1],id='alttl:base:'+key,body=b[3].trim();
 const layoutNeeded=/需.*(?:圖|配置|清單|表)|待補|需兩種完成圖|各需一張/.test(body);
 return {id,key,chapterId:key.slice(0,3),order:Number(key.slice(-2)),titleZh:b[2].split('；')[0],aliases:[key],sourceNumberAliases:[{sourceId:'spec',label:key}],sourceIds:[chapters.find(c=>c.id===key.slice(0,3)).sourceId],evidenceStatus:'source-explicit',preciseLayoutStatus:layoutNeeded?'needed':'not-needed',body,
 solutionIds:(multi[key]||['本題流程']).map((_,i)=>id+':s'+String(i+1).padStart(2,'0')),
 stepIds:[...body.matchAll(/^\d+\. (.+)$/gm)].map((_,i)=>id+':part'+String(i+1).padStart(2,'0'))};
});
const solutions=puzzles.flatMap(p=>(multi[p.key]||['本題流程']).map((titleZh,i)=>({id:p.solutionIds[i],puzzleId:p.id,titleZh,completionCheck:'正常重玩取得此規則的成功動畫，核對遊戲星槽後再勾選。此處是本站解法紀錄，不是已核實總星數。',sourceIds:p.sourceIds})));
for(const p of puzzles){
 p.aliases.push(research.englishAliases[p.chapterId][p.order-1]);p.supplement=research.supplements[p.key]||null;
 const guide=guides[p.key];if(!guide)continue;
 if(p.preciseLayoutStatus!=='needed')throw Error('配置覆蓋範圍與原規格不符 '+p.key);
 const assets=layoutAssets.assets.filter(a=>a.puzzleKey===p.key);
 p.layout={...guide,figures:guide.figures.map((f,i)=>{const asset=assets.find(a=>a.sourceIndex===f.sourceIndex);if(!asset)throw Error('缺少已核對圖片 '+p.key);return {...f,...asset,number:i+1,figureId:p.key+'-figure-'+(i+1)};}),stickerIcons:(guide.stickerIcons||[]).map(index=>assets.find(a=>a.sourceIndex===index))};
 p.body=p.body.replace(/^(\d+)\. (.+)$/gm,(line,n)=>guide.stepReplacements[n]?n+'. '+guide.stepReplacements[n]:line).replace(/^其中旋向與玩具落點需補逐幕圖[^\n]*$/gm,'十一幕的旋向、落點與操作可參照下方本機圖序。');
 p.preciseLayoutStatus='verified';p.evidenceStatus='source-explicit';
 // 已有完整圖序的題不再重複舊版補查段落。
 p.supplement=null;
}
const steps=puzzles.flatMap(p=>[...p.body.matchAll(/^\d+\. (.+)$/gm)].map((m,i)=>({id:p.stepIds[i],puzzleId:p.id,titleZh:m[1]})));
const trophies=[...text.matchAll(/^\| (\d{2}) \| (.+?)／([a-z-]+) \| (.+?) \|$/gm)].map(m=>{
 const n=Number(m[1]),puzzleKey=m[4].match(/c\d{2}-p\d{2}/)?.[0];
 const category=n>=38?'每日整理':n>=34?'整理累積':[15,16,17,19,20].includes(n)?'提示跳關':n>=22?'特殊條件':n>=8&&n<=14?'全解':'主線';
 const routeKey=puzzleKey||({2:'c01-p20',3:'c02-p16',4:'c03-p16',5:'c04-p15',6:'c05-p12',7:'c05-p12',8:'c01-p20',9:'c02-p16',10:'c03-p16',11:'c04-p15',12:'c05-p12',13:'c05-p12',18:'c05-p12',21:'c05-p12',31:'c05-p12'}[n]);
 return {id:'alttl:t:'+m[3],name:m[2],slug:m[3],guide:m[4],category,puzzleId:routeKey?'alttl:base:'+routeKey:null,sourceIds:['S01','S02']};
});
const sources=[...text.matchAll(/^\| (S\d{2}) \| (.+?) \| (.+?) \|$/gm)].map(m=>({id:m[1],links:[...m[2].matchAll(/\[([^\]]+)\]\((https:[^)]+)\)/g)].map(x=>({label:x[1],url:x[2]})),note:m[3],checkedAt:'2026-11-26'}));
const section=(start,end)=>text.slice(text.indexOf(start)+start.length,text.indexOf(end)).trim();
const dailyTypes=[...section('### 11.3','## 12.').matchAll(/^\| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/gm)].slice(2).map(m=>({title:m[1].trim(),rule:m[2].trim(),references:m[3].trim()}));
const data={gameId:'alttl',datasetVersion:'2026-11-27.2',specSha256:createHash('sha256').update(raw).digest('hex'),layoutCoverage:{required:Object.keys(guides).length,complete:puzzles.filter(p=>p.layout&&p.preciseLayoutStatus==='verified').length,figures:puzzles.reduce((n,p)=>n+(p.layout?.figures.length||0),0),images:layoutAssets.assets.length,animations:layoutAssets.assets.filter(a=>a.animationFile).length,checkedAt:layoutAssets.checkedAt,ps5Tested:false},chapters,puzzles,solutions,steps,trophies,sources,dailyTypes,
 credits:blocks.find(b=>b[1]==='credits')[3].trim(),cleanup:blocks.filter(b=>b[1].startsWith('cleanup')).map(b=>({id:b[1],title:b[2],body:b[3].trim()})),
 dailyNatural:section('### 11.1 自然日期路線','### 11.2'),dailyAccelerated:section('### 11.2 選用調日期加速','### 11.3'),gaps:section('## 16. 缺口、影響與補查','## 17.')};
if(puzzles.length!==79||trophies.length!==48)throw Error('規格解析數量不符');
await fs.mkdir(new URL('dist/',import.meta.url),{recursive:true});
await fs.writeFile(new URL('dist/data.json',import.meta.url),JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify({puzzles:puzzles.length,solutions:solutions.length,steps:steps.length,trophies:trophies.length,layoutGaps:puzzles.filter(p=>p.preciseLayoutStatus==='needed').length}));
