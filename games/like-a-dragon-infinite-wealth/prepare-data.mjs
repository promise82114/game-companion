import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const base=new URL('./',import.meta.url),source=new URL('../../like-a-dragon-infinite-wealth_PLATINUM_GUIDE.md',base);
const bytes=await fs.readFile(source),raw=bytes.toString('utf8').replace(/^\uFEFF/,'').replace(/\r\n/g,'\n');
const sections=Object.fromEntries([...raw.matchAll(/^## (\d+)\. (.*?)(?=^## |$(?![\s\S]))/gms)].map(m=>[m[1],m[2]]));
const data={gameId:'like-a-dragon-infinite-wealth',sourceSha256:createHash('sha256').update(bytes).digest('hex'),chapters:[],steps:[],substories:[],trophies:[],objectives:[],counters:[]};
for(const [index,m] of [...sections[3].matchAll(/^### (.+?)\n(.*?)(?=^### |$(?![\s\S]))/gms)].entries()){
 const id=index===13?'chapter-finale':`chapter-${String(index+1).padStart(2,'0')}`,body=m[2],parts=body.split('**章末 checklist**'),intro=parts[0],check=parts[1]||'',steps=[],checks=[];
 for(const flow of intro.matchAll(/\*\*(主要流程|春日線|桐生線)\*\*：([^\n]+)/g))for(const [n,action] of flow[2].trim().replace(/。$/,'').split(' → ').entries()){
  const sid=`${id}-${flow[1]}-${n+1}`;steps.push(sid);data.steps.push({id:sid,chapterId:id,label:action,lane:flow[1]});
 }
 for(const [n,item] of [...check.matchAll(/^- \[ \] (.+)/gm)].entries()){
  const label=item[1];if(/^SS\d{2}/.test(label)&&[...label.matchAll(/SS\d{2}/g)].length===1)continue;
  const oid=`${id}-check-${n+1}`;checks.push(oid);data.objectives.push({id:oid,label,chapterId:id,category:'章末核對'});
 }
 const mentions=[...body.matchAll(/(?:SS|#)(\d{2})/g)].map(m=>'SS'+m[1]);
 for(const range of body.matchAll(/#(\d{2})[–－-](\d{2})/g))for(let n=Number(range[1]);n<=Number(range[2]);n++)mentions.push('SS'+String(n).padStart(2,'0'));
 const substories=[...new Set(mentions)];
 data.chapters.push({id,label:m[1],intro:intro.trim(),steps,checks,substories,notes:check.includes('**資料修正**')?check.slice(check.indexOf('**資料修正**')):''});
}
for(const m of sections[7].matchAll(/^\| \[ \] \| (SS\d+) \| (.*?) \| (.*?) \| (.*?) \|/gm))data.substories.push({id:m[1],label:m[2],condition:m[3],route:m[4]});
for(const m of sections[8].matchAll(/^- \[ \] \*\*(T\d+) (.*?)\*\*：(.+)/gm))data.trophies.push({id:m[1],label:m[2],condition:m[3]});
data.postgame=[...sections[4].matchAll(/^### (P\d+)｜([^\n]+)\n(.*?)(?=^### |$(?![\s\S]))/gms)].map(m=>({id:m[1],label:m[2],body:m[3]}));
for(const m of sections[6].matchAll(/^\| (富澤|千歲|足立|難波|紗榮子|善熙|趙|韓俊基) \| (.*?) \|.*?\| ([^|]+) \|$/gm))for(let n=1;n<=5;n++)data.objectives.push({id:`bond-${m[1]}-${n}`,label:`${m[1]} 羈絆劇場第 ${n} 段`,category:'羈絆劇場',condition:m[2]+'；'+m[3]});
for(const city of ['夏威夷','橫濱'])for(const sector of ['Sector 1','Sector 2','Sector 3','EX'])data.objectives.push({id:`dungeon-${city}-${sector}`,label:`${city}迷宮 ${sector}`,category:'兩座迷宮',condition:'先補裝備、群補與復活手段；教學與第30層不等於EX完成。'});
['春日熱情 MAX','春日自信 MAX','春日開朗 MAX','春日溫柔 MAX','春日知性 MAX','春日時尚 MAX','桐生心技體至少一項 MAX','臨終劇場全部完成','江湖寶貝等級及信賴度 MAX','工坊投資完成','Revolve馬桶取得道具','夏威夷彩虹照片','咚咚島4星','咚咚島故事完成','播出咚咚島電視廣告','Crazy送 Easy','Crazy送 Normal','Crazy送 Hard','Crazy送 Crazy','可疑者抓拍 Aloha Beach','可疑者抓拍 Sunset St.','可疑者抓拍 Night St.'].forEach((label,i)=>data.objectives.push({id:`activity-${i+1}`,label,category:'活動與養成'}));
const counters=[['memoirs','追憶日記',70,'遊戲總量90；依地圖標記收集，未收錄逐點位置。'],['photos','攝影尋寶',30,'遊戲總量110；以遊戲認定的不同照片計數。'],['level','春日等級',70,'角色等級，與職業階級分開。'],['jobs','Rank30的不同職業',7,'跨角色核對七種不同職業。'],['sujidex','敵人圖鑑',200,'遊戲總量317；登錄與捕捉分開。'],['battles','激戰區勝利',20,'春日隊實際戰鬥，不是訓練師對戰。'],['captures','捕捉機會成功',10,'轉蛋不計。'],['diy','DIY不同家具',100,'重複製作不增加種類。'],['guests','島嶼累積遊客',100,'以島內建議箱累計為準。'],['alo','Alo-Happy行程',8,'本體8種行程，不是娛樂10種。'],['cert','不同證照',10,'以通過種類計算。'],['dates','不同對象約會',5,'已見面，不只配對。'],['links','ALOHA Links朋友',50,'不要求摯友。'],['poundmates','外派幫手呼叫',30,'兩主角各自紀錄加總。'],['craft','工坊製作不同裝備',10,'只強化不計。'],['entertainment','不同娛樂種類',10,'同一玩法不同店家不重複。']];
data.counters=counters.map(([id,label,target,tip])=>({id,label,target,tip}));
data.articles=Object.fromEntries([1,2,5,6,9,10].map(i=>[i,sections[i]]));
await fs.mkdir(new URL('dist/',base),{recursive:true});await fs.writeFile(new URL('dist/data.json',base),JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify(Object.fromEntries(['chapters','steps','substories','trophies','objectives','counters'].map(k=>[k,data[k].length]))));
