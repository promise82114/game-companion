// 規格中的已確認表格為初始來源；額外研究以具來源的 JSON 疊加，不連網建置。
import fs from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const spec=await fs.readFile(new URL('../../ball-x-pit_GAME_COMPANION_SPEC.md',root),'utf8');
export const slug=s=>s.toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const meta=(sourceIds,contentSet='base',verification='source_checked')=>({sourceIds,contentSet,verification});
const rows=section=>section.split('\n').filter(s=>/^\|/.test(s)).map(s=>s.split('|').slice(1,-1).map(s=>s.trim()));
const between=(a,b)=>spec.split(a)[1].split(b)[0];
const levels=[...between('## 2.','## 3.').matchAll(/### R(\d) (\S+)\r?\n([\s\S]*?)(?=\r?\n###|$)/g)].map(([,n,name,body])=>({id:slug(name),name,order:+n,...meta(['S3','S4']),location:body.match(/時機\/地點\*\*：([^\r\n]+)/)?.[1],action:body.match(/行動\*\*：([^\r\n]+)/)?.[1],check:body.match(/離開前確認\*\*：([^\r\n]+)/)?.[1],recovery:body.match(/風險\/補救\*\*：([^\r\n]+)/)?.[1],boss:'待查：逐關 Boss／敵群策略與精確 Gear 門檻未核實。'}));
const characters=rows(between('## 3.','## 4.')).filter(r=>r[0]?.startsWith('The ')).map(([name,trophy,housing])=>({id:slug(name.replace('The ','')),name,trophy,housing,...meta(['S1','S4','S5'])}));
const updates=[['regal',['The Falconer','The Carouser'],['Falconry Hut','Party House']],['shadow',['The Tunneller','The Tiptoer'],['Stone Domain','Hidden Temple']],['naturalist',['The Ballbearer','The Hoary Hoarder'],['Ball House','Unstable Tower']]];
for(const [set,names,homes]of updates)names.forEach((name,i)=>characters.push({id:slug(name.replace('The ','')),name,housing:homes[i],...meta(['S4',set==='regal'?'S6':set==='shadow'?'S7':'S8'],set)}));
const trophies=rows(between('## 4.','## 5.')).filter(r=>/^\d+$/.test(r[0])).map(([n,name,condition])=>({id:slug(name),number:+n,name,condition,platinumRequired:true,...meta(['S1','S2'],'base','multi_source')}));
const buildings=rows(between('## 5.','## 6.')).filter(r=>levels.some(l=>l.name===r[0])).flatMap(([level,names])=>names.split(';').map(name=>({id:slug(name.trim()),name:name.trim(),blueprintLevel:levels.find(l=>l.name===level).id,...meta(['S3','S5','S9'])})));
for(const b of buildings){const character=characters.find(c=>slug(c.housing.split(' / ')[0])===b.id);if(character){b.category='housing';b.effect='解鎖 '+character.name;b.characterId=character.id;character.housingId=b.id;character.housingLevel=b.blueprintLevel;}else if(/Farm|Lumberyard|Mine$|Bank$|Market$/.test(b.name)){b.category='economy';b.effect='資源／經濟用途；精確倍率與成本待查。';}else if(/Trophy$/.test(b.name)){b.category='trophy';b.effect='關卡首通紀念建築；以遊戲授予及建造狀態為準。';}else{b.category='function';b.effect='效果、成本與精確解鎖條件待查。';}b.effectVerification=character?'source_checked':'pending';b.cost=null;}
const recipes=rows(between('### 已核對的 Regal 更新配方','### 特殊白金目標')).filter(r=>r[2]?.includes('Evolved')||r[2]?.includes('Evolution combo')).map(([name,materials,category])=>({id:slug(name),name,kind:category.includes('Passive')?'evolved-passive':'evolution',ingredients:materials.replace(/[()]/g,'').split(' + ').map(s=>s.split(' 或 ').map(s=>slug(s))),...meta(['S11'],'regal'),note:'規格表題指 Regal；原 S8 為 Naturalist 公告，配方來源改指 S11 更新索引。'}));
for(const name of ['Nosferatu','Nuclear Bomb','Satan','Soul Reaver',"Deadeye's Cross"])recipes.push({id:slug(name),name,kind:name==="Deadeye's Cross"?'evolved-passive':'evolution',ingredients:[],...meta(['S1'],'base','pending'),note:'尚未核實完整前置鏈；不是不存在。'});
const sourceRefs=[...spec.matchAll(/- \*\*(S\d+)\*\* ([^：]+)：(https:\/\/\S+) ([^\r\n]+)/g)].map(([,id,label,url,note])=>({id,label,url,note,checkedAt:'2026-11-09',access:'spec_reference'}));
sourceRefs.push({id:'SPEC',label:'本次已確認需求與來源整理',url:'../../../ball-x-pit_GAME_COMPANION_SPEC.md',checkedAt:'2026-11-09',access:'local_spec'});
let supplement={};try{supplement=JSON.parse(await fs.readFile(new URL('research/catalog-supplement.json',root),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
for(const row of supplement.buildings||[]){if(row.entryType==='resource-plot')continue;const at=buildings.findIndex(b=>b.id===row.id);if(at>=0)buildings[at]={...buildings[at],...row};else buildings.push(row);}
for(const c of characters){const b=buildings.find(b=>b.characterId===c.id);if(b){c.housingId=b.id;c.housingLevel=b.blueprintLevel;}}
for(const l of levels){l.sourceIds.push('W-LEVELS');l.gearRule=supplement.notes?.gearRule||'精確 Gear 規則待查';}
for(const row of supplement.recipes||[]){const at=recipes.findIndex(r=>r.id===row.id);if(at>=0)recipes[at]={...recipes[at],...row};else recipes.push(row);}
const advice=JSON.parse(await fs.readFile(new URL('research/character-advice.json',root),'utf8'));
const balls=supplement.balls||[],passives=supplement.passives||[];
const encyclopedia=[...balls,...passives].filter(r=>r.encyclopedia!==false).map(r=>({...r,id:r.kind+':'+r.id,itemId:r.id}));
const roadmapSteps=levels.map(l=>({id:'review-'+l.id,levelId:l.id,name:'完成本層基地／裝備檢查',...meta(['S3','S4']),detail:l.check}));
const data={version:'2026-11-09.1',checkedAt:'2026-11-09',levels,characters,trophies,buildings,balls,passives,recipes,encyclopedia,roadmapSteps,notes:supplement.notes||{},advice,resourcePlots:(supplement.buildings||[]).filter(b=>b.entryType==='resource-plot'),sourceRefs:[...new Map([...sourceRefs,...(supplement.sourceRefs||[]),...advice.sourceRefs].map(r=>[r.id,r])).values()],coverage:{trophies:64,baseCharacters:16,baseMatrix:128,levelCount:8,catalogComplete:false,encyclopediaTotal:null,buildingTotal:null,limitations:['建築已補齊本次來源索引；成本、倍率與 PS5 版本仍待核實。','配方與圖鑑按已收錄項目計數，未知總量不表示遊戲 100%。','PS5 更新角色是否計入 Conquered、War Room 與 NG+ 例外待實機。','Boss、敵群、精確 Gear 門檻、建築成本與技能數值待查。',...(supplement.limitations||[])]}};
await fs.mkdir(new URL('dist/data/',root),{recursive:true});await fs.writeFile(new URL('dist/data/catalog.json',root),JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify(Object.fromEntries(Object.entries(data).filter(([,v])=>Array.isArray(v)).map(([k,v])=>[k,v.length]))));
