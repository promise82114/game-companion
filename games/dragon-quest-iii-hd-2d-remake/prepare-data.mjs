import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {configureLocalization,expandSearch,translate,localizationSources} from './dist/localization.js';
const root=new URL('./',import.meta.url);
const raw=await fs.readFile(new URL('../../dragon-quest-iii-hd-2d-remake_GAME_COMPANION_SPEC.md',root),'utf8');
const clean=s=>s.trim().replace(/`|\*\*/g,'');
const lines=raw.split(/\r?\n/);
const cells=line=>line.trim().slice(1,-1).split('|').map(clean);
const tableRows=(a,b)=>lines.slice(a,b).filter(l=>/^\|/.test(l)&&!/^\|\s*[-:]/.test(l)).map(cells);
const heading=text=>lines.findIndex(l=>l.startsWith(text));
const section=(a,b)=>lines.slice(heading(a)+1,heading(b)).join('\n');
const phases=['三把鑰匙之前｜Aliahan 到船','船與六顆寶珠｜可並行海路','Baramos 到 Zoma｜鍛造與主線','通關後｜七願、競技與試煉'].map((label,i)=>({id:'phase-'+(i+1),label}));
const readingUnits=[[1,1,4,'Aliahan 出發與傳送門'],[1,5,9,'Romaria、Norvik 與金字塔'],[1,10,12,'黑胡椒、取得船與轉職'],[2,13,14,'啟動商人城與最後鑰匙'],[2,15,21,'寶珠巡迴與拉之鏡'],[2,22,24,'幽靈船、銀珠與不死鳥'],[3,25,27,'Baramos 與下層世界巡遊'],[3,28,31,'鍛造、Rubiss 與 Zoma'],[4,32,34,'天界、謎語與七願'],[4,35,37,'競技場、五試煉與 Grand Dragon'],[4,38,38,'白金收尾查漏']].map(([p,start,end,label],i)=>({id:'unit-'+(i+1),phaseId:'phase-'+p,start,end,label}));
const steps=[];let phase=0;
for(const l of lines.slice(heading('### 一、'),heading('### Roadmap 的完成'))){
 if(/^### [一二三四]、/.test(l))phase++;
 if(!/^\| dq3-r/.test(l))continue;
 const [first,actions,doneWhen]=cells(l),[id,label]=first.split(' · ');
 steps.push({id,phaseId:'phase-'+phase,order:steps.length+1,label,actions,doneWhen,beforeLeaving:doneWhen,requirements:[],warnings:[],recovery:doneWhen,relatedIds:[],requiredForRoute:!['02','06','07','09','12','19','28','29','33','35','38'].includes(id.slice(5,7)),sourceIds:['S05'],locationIds:[]});
}
const byNumber=n=>steps.find(s=>s.order===n).id;
const assign=(groups,prefix)=>{
 const result=new Map();for(const [n,ranges] of groups)for(const r of ranges.split(',')){const [a,b=a]=r.split('-').map(Number);for(let i=a;i<=b;i++)result.set(prefix+'-'+String(i).padStart(3,'0'),byNumber(n));}return result;
};
const medalAnchors=assign([[1,'1-2'],[3,'3-5'],[4,'6'],[5,'7-8,10-13'],[6,'14-17'],[7,'18'],[8,'19-28'],[10,'9,29-31'],[11,'32-34'],[12,'35-40'],[13,'41,54,58'],[14,'44-45,48-52'],[15,'42-43'],[16,'55-57'],[17,'63'],[18,'46-47,64'],[19,'61-62'],[20,'65-69'],[22,'59-60,70-71'],[23,'72-73'],[24,'53,74-77'],[25,'78-79'],[26,'80-81'],[27,'82-96,100'],[29,'97'],[30,'98-99'],[31,'101-102'],[32,'103-106'],[34,'107-108'],[36,'109-110']],'mm');
const friendAnchors=assign([[4,'1'],[5,'2-4,6-8'],[6,'5,9-10'],[7,'11-12'],[8,'13-15'],[10,'16-18'],[11,'19-22'],[12,'23-27'],[13,'28-30,32-33,35-38,49-50'],[14,'31,34,42-44,47-48'],[15,'39-41'],[16,'51-52'],[17,'57-58'],[18,'45-46,59'],[19,'54-56'],[20,'60-73,85'],[21,'84'],[22,'53,74-75'],[23,'76-79'],[24,'80-83'],[25,'86'],[26,'87-89'],[27,'90-104,109'],[29,'105'],[30,'106-108'],[31,'110-112'],[32,'113-116'],[34,'117'],[36,'118-120'],[37,'121']],'fm');
const norm=s=>s.toLowerCase().replace(/[’]/g,"'").replace(/shallows? shrine/g,'shallows shrine').replace(/immigrant town/g,'merchantburg');
const locations=[];
function location(name){const canonical=norm(name.trim());let l=locations.find(l=>l.canonical===canonical);if(!l){l={id:'loc-'+String(locations.length+1).padStart(3,'0'),name:name.trim(),canonical,aliases:canonical.includes('merchantburg')?['Merchantburg','Immigrant Town']:canonical.includes('shallows shrine')?['Shallow Shrine','Shallows Shrine']:[]};locations.push(l);}return l.id;}
for(const s of steps)s.locationIds=s.label.split('／').map(location);
function enemyAnchor(row){
 const region=row[1],places=norm(row[3]);
 if(row[0]==='enemy-163')return byNumber(37);
 const candidates=steps.filter(s=>s.label.split('／').some(part=>places.includes(norm(part.replace(/ 可選.*| 地下白金支線.*| 早期可選白金支線.*/,'')))));
 if(candidates.length)return candidates[0].id;
 const regions=[['Alefgard',27],['Aliahan',1],['Romaria',5],['Ibis',8],['Baharata',11],['Alltrades',12],['Theddon',15],['Lanson',17],['Jipang',18],['Manoza',20],['Necrogond',23],['Ramia',24],['Baramos',25],['Zoma',31],['Cloudsgate',32],['天界',32],['通關後',32],['試煉',36],['海',13]];
 return byNumber(regions.find(([term])=>region.includes(term))?.[1]||13);
}
const collectibles=[];
for(const l of lines){if(!/^\| (mm-|fm-|enemy-)/.test(l))continue;const r=cells(l),[id,region]=r;const type=id.split('-')[0];
 const row={id,category:type,region,name:type==='mm'?'小徽章 '+id.slice(3):r[2],englishName:type==='mm'?'Mini Medal':r[2],aliases:type==='fm'?[r[3],...(r[2]==='Monster Wrangler'?['馴獸師','魔物使','魔物大師']:[])]:[],location:type==='mm'?r[2]:type==='fm'?r[4]:r[3],actions:type==='mm'?r[3]:type==='fm'?r[5]:r[4],conditions:type==='fm'?r[6]:type==='mm'?r[3]:r[4],firstPracticalStepId:type==='mm'?medalAnchors.get(id):type==='fm'?friendAnchors.get(id):enemyAnchor(r),returnStepIds:[],sourceIds:['S05'],evidence:'規格逐列來源；未於 PS5 逐點實測'};
 row.locationId=location(row.location);if(type==='mm'&&id==='mm-109')row.substepId='trial-northwest';if(type==='mm'&&id==='mm-110')row.substepId='trial-northeast';
 collectibles.push(row);
}
// 綽號受收服順序影響：搜尋任何例名都能查到該物種全部候選。
for(const r of collectibles.filter(r=>r.category==='fm'))r.aliases=[...new Set(collectibles.filter(x=>x.category==='fm'&&x.name===r.name).flatMap(x=>x.aliases))];
const skills=[];
for(const r of tableRows(heading('### 咒文與特技查漏'),heading('## 4.')).slice(1)){
 const [vocation,kind,names,notes]=r;if(!names||!kind.startsWith('咒文')&&!kind.startsWith('特技'))continue;
 for(const name of names.split(';').map(s=>s.trim())){const type=kind==='咒文'?'spell':'ability',id=type+':'+name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'');let s=skills.find(x=>x.id===id);if(!s){s={id,name,kind:type,vocations:[],notes:[],sourceIds:['S04'],firstPracticalStepId:byNumber(12)};skills.push(s);}s.vocations.push(vocation);s.notes.push(notes);}
}
const trophyMap=[[1,[2,39]],[2,[41]],[4,[3]],[5,[4,40]],[6,[33]],[7,[36,37]],[8,[5]],[9,[42]],[11,[6,7]],[12,[31,32,38]],[15,[10]],[17,[9]],[18,[8]],[20,[11]],[23,[12]],[24,[13]],[25,[14]],[26,[15]],[28,[35]],[29,[34]],[30,[16]],[31,[17,18]],[34,[23]],[35,[26]],[37,[22]],[38,[1,19,20,21,24,25,27,28,29,30]]];
const trophies=lines.filter(l=>/^\| `tr-/.test(l)).map(l=>{const [id,grade,label,actions]=cells(l);const n=Number(id.slice(3)),step=trophyMap.find(([,ids])=>ids.includes(n))?.[0]||38;return {id,grade:grade.replace('※',''),hidden:grade.includes('※'),label,actions,trophySetId:'NPWR42614_00',stepId:byNumber(step),category:n<=18?'主線':n>=22&&n<=26?'通關後':[19,20,21,27,28,29,30].includes(n)?'收藏':'條件',sourceIds:['S03','S04']};});
const rewards=tableRows(heading('### 小徽章'),heading('### 友善魔物')).filter(r=>/^\d+$/.test(r[0])).map(([n,name])=>({id:'reward-'+n,target:Number(n),name}));
const arena=lines.filter(l=>/^\| arena-/.test(l)).map(l=>{const [id,label,fee,reward,prize]=cells(l);return {id,label,fee,reward,prize,stepId:byNumber(35)};});
const supplies=lines.filter(l=>/^\| `trial-west-/.test(l)).map(l=>{const [id,name,n,shop,price]=cells(l);return {id,name,required:Number(n),shop,price:Number(price.replace(/[^\d]/g,''))};});
const wishes=[['trials','空白願望｜開啟 Temple of Trials'],['arena','開啟 Jipang 競技場'],['sword',"Rubiss's Sword"],['ortega','復活 Ortega'],['style','時髦勇者'],['book',"Guns 'n' Buns"],['book-final',"More Guns 'n' Buns（其餘六願完成後）"]].map(([id,label])=>({id:'wish-'+id,label,stepId:byNumber(34)}));
const trials=[['south','南｜救援 100 隻，與 121 隻全收集分開'],['east','東｜出示 Sword of Kings、Auroral Helm、Gringham Whip、Mod Rod'],['west','西｜交齊七類供品，交付會扣除物品'],['northwest','西北｜全員爪／迴旋鏢；兩批 Pandora’s Boxes'],['northeast','東北｜全員斧／杖；兩批 Pandora’s Boxes']].map(([id,label])=>({id:'trial-'+id,label,stepId:byNumber(36)}));
const objectives=[...wishes,...trials,...arena.map(a=>({id:a.id,label:a.label+'｜'+a.reward,stepId:a.stepId})),...rewards.map(r=>({id:r.id,label:r.target+' 枚兌獎｜'+r.name,stepId:byNumber(38)})),{id:'grand-medal',label:'已取得 Grand Medal（不從回合數自動推定）',stepId:byNumber(37)},{id:'zoma-bridge',label:'已用 Rainbow Drop 造橋',stepId:byNumber(31)},{id:'ending-save',label:'已看完結局並保存通關檔',stepId:byNumber(31)}];
const counters=[['mapSparkles','原野閃光點（手動核對）',100],['chestsOpened','開啟寶箱',100],['itemTypes','相異物品種類',250],['battlesWon','戰鬥勝場',1000],['metalKills','金屬怪擊倒（手動核對）',1],['gold','累計收入 G（手動核對）',100000]].map(([id,label,target])=>({id,label,target}));
for(const s of steps){s.relatedIds=[...collectibles.filter(c=>c.firstPracticalStepId===s.id).map(c=>c.id),...objectives.filter(o=>o.stepId===s.id).map(o=>o.id),...trophies.filter(t=>t.stepId===s.id).map(t=>t.id)];}
for(const s of steps){s.returnIds=collectibles.filter(r=>r.category!=='enemy'&&steps.find(x=>x.id===r.firstPracticalStepId).order>s.order&&s.label.split('／').some(part=>norm(r.location).includes(norm(part)))).map(r=>r.id);}
const requireSteps=(n,ns)=>steps[n-1].requirements=ns.map(byNumber);
for(const n of [15,17,20])requireSteps(n,[11,14]);requireSteps(21,[13,20]);requireSteps(22,[20]);requireSteps(23,[22]);requireSteps(24,[15,16,17,18,21,23]);requireSteps(25,[24]);requireSteps(26,[25]);requireSteps(28,[27]);requireSteps(29,[12,26]);requireSteps(30,[27]);requireSteps(31,[30]);requireSteps(32,[31]);requireSteps(34,[32]);requireSteps(36,[34]);requireSteps(37,[36]);
steps[21].warnings.push('交換 Mod Rod 前先決定是否到 Faerie Village 購物；Cantlin Rank 8 可再取得。');
steps[33].warnings.push('合格回合依次為 35／25／15；第三願起皆 15。最後一本需其餘六願。');
steps[35].warnings.push('西側會收走供品；更新版 Elfin Elixir 是 10 瓶。北西爪／迴旋鏢、北東斧／杖。');
steps[36].warnings.push('先收北門 Xenwrong，再分開手動存檔。11–20 回合可拿 Grand Medal 並保留再戰；≤10 回合該檔停止再戰。21–25 回合來源有差異，直接核對紀念章。');
steps[35].navigation=section('### Roadmap 的完成','## 3.').split('\n').filter(l=>/^  - \*\*/.test(l)).join('\n');
const adviceText=section('## 5.','## 6.');
const advice=adviceText.split(/(?=^### )/m).filter(t=>t.trim()).map((text,i)=>({id:'advice-'+i,title:text.match(/^### (.+)/)?.[1]||'依目前進度選擇建議',markdown:text.replace(/^### .+\n/,''),sourceIds:['S02','S04','S05']}));
const sources=[...raw.matchAll(/\[([^\]\n]+)\]\((https?:\/\/[^)]+)\)/g)].map((m,i)=>({id:'link-'+i,label:m[1],url:m[2],accessedAt:'2026-11-23'}));
const aliases=[['S01','PlayStation 台灣','https://www.playstation.com/zh-hant-tw/games/dragon-quest-iii/'],['S02','Square Enix 更新履歷','https://www.dragonquest.jp/roto-trilogy/dq3/update/index.html'],['S03','PSRay PS5 獎盃','https://psray.net/trophies/29978?lang=zh-Hant'],['S04','GameFAQs PS5 攻略','https://gamefaqs.gamespot.com/ps5/466973-dragon-quest-iii-hd-2d-remake/faqs/81593'],['S05','RPG Site HD-2D 路線','https://www.rpgsite.net/guide/16522-dragon-quest-iii-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-friendly-monsters-step-by-step-guide']];
sources.unshift(...aliases.map(([id,label,url])=>({id,label,url,accessedAt:'2026-11-23'})));
const catalog={gameId:'dragon-quest-iii-hd-2d-remake',platform:'ps5',versionBaseline:'1.1.1.0',dataVersion:'2026-11-23.1',specSha256:createHash('sha256').update(raw).digest('hex'),phases,readingUnits,steps,locations,collectibles,skills,trophies,rewards,wishes,trials,arena,supplies,objectives,counters,advice,sources,collectionGuidance:section('### 友善魔物','### 擊敗魔物'),counterGuidance:section('### 門檻補量攻略','## 2.'),routeGuidance:section('### Roadmap 的完成','## 3.')};
catalog.dataVersion='2026-11-23.2';catalog.localization={locale:'zh-Hant',monsterCoverage:163,friendlySpecies:57,skillNames:'中文對照／說明譯名，未逐項實機核對台灣官方字串',sources:localizationSources,evidence:JSON.parse(await fs.readFile(new URL('research/translation-evidence.json',root),'utf8'))};
configureLocalization(catalog);
for(const row of [...steps,...collectibles,...skills,...trophies,...supplies,...objectives]){row.localizedSearch=expandSearch(JSON.stringify(row));if(row.name)row.displayName=translate(row.name);}
await fs.mkdir(new URL('dist/',root),{recursive:true});await fs.writeFile(new URL('dist/data.json',root),JSON.stringify(catalog,null,2)+'\n');
console.log(JSON.stringify({steps:steps.length,collectibles:collectibles.length,skills:skills.length,trophies:trophies.length,rewards:rewards.length,arena:arena.length}));
