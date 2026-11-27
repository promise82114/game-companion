import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('./',import.meta.url),raw=await fs.readFile(new URL('../../cat-quest-iii_GAME_COMPANION_SPEC.md',root),'utf8');
const slug=s=>s.toLowerCase().replace(/[’']/g,'').replace(/\+\+/g,' plus plus').replace(/\+/g,' plus').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const section=n=>raw.split(new RegExp('^## '+n+'\\.','m'))[1]?.split(/^## /m)[0]||'';
const sub=n=>raw.split(new RegExp('^### '+n.replace('.','\\.')+' ','m'))[1]?.split(/^### |^## /m)[0]||'';
const lines=s=>s.split('\n').map(x=>x.trim());
const table=s=>lines(s).filter(x=>x.startsWith('|')).map(x=>x.slice(1,-1).split('|').map(x=>x.trim())).filter(x=>!x.every(y=>/^[-: ]+$/.test(y))).slice(1);
const chapters=[['stage-1','開局與 Purvanna 周邊'],['stage-2','主線遺跡與南部支線'],['stage-3','主線開路與北部工具'],['stage-4','集中結清與終章']].map(([id,label])=>({id,label}));
let stage=-1;const steps=[];
for(const part of section(4).split(/(?=^### |^#### )/m)){
 if(part.startsWith('### ')){stage++;continue;}
 const m=part.match(/^#### (cq3-r[\w-]+) · (.+)/);if(!m)continue;
 steps.push({id:m[1],chapterId:chapters[stage].id,label:m[2].trim(),body:part.split('\n').slice(1).join('\n').trim(),entityIds:[]});
}
const entities=[];
function add(id,kind,label,tip,route,extra={}){entities.push({id,kind,label,tip,route,sourceIds:[],scope:'base',evidence:'spec-reviewed',...extra});}
const r=n=>'cq3-r'+String(n).padStart(2,'0');
const puzzleRoutes=[3,5,4,4,3,3,9,9,9,12,12,17];
for(const [i,row] of table(sub('5.1')).entries()){add('cq3-puzzle-'+row[1],'puzzle',row[2],row[3],r(puzzleRoutes[i]),{sourceIds:['S06','S02']});add('cq3-puzzle-'+row[1]+'-reward','reward',row[2]+' · 獎勵箱','解謎後開啟出現的寶箱，確認獎勵入手。',r(puzzleRoutes[i]),{sourceIds:['S06']});}
for(const [prefix,kind,sec,routes] of [['cq3-secret-','secret','5.2',[2,4,3,7,14,15]],['cq3-ripple-','ripple','5.3',[12,2,1,6,14,13,7,4]]]){
 const entries=[...sub(sec).matchAll(/^- \[ \] `(cq3-[^`]+)`：(.+)/gm)];
 entries.forEach((m,i)=>add(m[1],m[1].startsWith(prefix)?kind:'quest',m[2].replace(/。$/,''),kind==='ripple'?'先取得 Shell Phone，下船靠近漣漪使用；結尾回人魚。':'攻擊所述場景物，開啟隱藏獎勵箱並確認入手。',r(routes[i]||17),{sourceIds:kind==='ripple'?['S12']:['S01','S02']}));
}
const fixedRoutes=[2,6,12,4,6,8,4,4,13,12,14,6];
for(const [i,row] of table(sub('5.4')).entries())for(const id of [...row[1].matchAll(/`([^`]+)`/g)].map(m=>m[1])){
 const kind=id.includes('-lost-')?'lost':id.includes('-book-')?'book':id.includes('-key-')?'key':'encounter';
 const suffix=id.endsWith('-found')?' · 已取得':id.endsWith('-returned')?' · 已歸還':id.includes('aelius')?' · '+id.split('-').at(-1):'';
 const route=id==='cq3-aelius-furtigua'?7:id==='cq3-aelius-sunset'?12:fixedRoutes[i];
 add(id,kind,row[0]+suffix,row[2],r(route),{sourceIds:kind==='key'?['S11']:kind==='encounter'?['S10','S07']:['S07']});
}
const spellRoutes=[1,2,8,11,0,7,5,12,12,13];
table(sub('5.5')).forEach((row,i)=>add('cq3-spell-'+row[1],'spell',row[2],row[3],i===4?'cq3-r08-antares':r(spellRoutes[i]),{sourceIds:['S09']}));
const bountyRoutes=[4,5,6,8,12,15,13,10,18,14,16];
table(sub('5.6')).forEach((row,i)=>{for(const action of ['defeated','claimed'])add('cq3-bounty-'+slug(row[2])+'-'+action,'bounty',row[2]+(action==='defeated'?' · 已擊倒':' · 已領賞'),row[3]+(action==='claimed'?' 返回 Pawt Purvanna 酒館，逐張海報互動領賞。':''),r(bountyRoutes[i]),{action,sourceIds:['S08']});});
for(const m of sub('5.7').matchAll(/^- \[ \] (.+)/gm))add('cq3-ship-'+slug(m[1]),'ship-passive',m[1].trim(),'已知被動名稱；逐項位置與 PS5 金盃集合待核對，不能以13作白金分母。',r(16),{sourceIds:['S04'],evidence:'pending',scope:'unresolved'});
for(const [name,route,tip] of [['Super Cannonpaw',1,'初始船炮彈'],['Magma Cannonpaw',4,'Boar King'],['Electric Cannonpaw',10,'演唱會外 Meowtallicurse 海戰'],['Cursed Cannonpaw',14,'北岸 The Undying 海戰']])add('cq3-cannonpaw-'+slug(name),'cannonpaw',name,tip+'；炮彈與被動分開，不自動判定金盃。',r(route),{sourceIds:['S16']});
const equipment=section(6).split(/(?=^### )/m).filter(s=>/^### (頭部|身體|近戰|遠程|飾品)/.test(s));
const categories=['head','body','melee','ranged','trinket'];
equipment.forEach((part,i)=>{for(const m of part.matchAll(/^- \[ \] (.+)/gm))add('cq3-equip-'+categories[i]+'-'+slug(m[1]),'equipment',m[1].trim(),'精確位置待核對；先核對背包獨特種類。此為原版名稱清單，不是現版裝備總量。',r(18),{category:categories[i],sourceIds:['S03','S04'],evidence:'pending'});});
// 僅對規格已明載的獎勵建立確定路線；不把推測變成精確位置。
const known=[[/Bird Poop/,1,'攻擊存檔休息點鸚鵡數次，拾取掉落。'],[/Warrior/,3,'Furst Cave 檢查寶箱。'],[/Dragonbone/,14,'Dragon Bone 交給 Kidd Cat，確認領取鍛造獎勵。'],[/Weird Mushroom/,11,'Infinity Tower 的 Boss 獎勵箱；隨機掉落，沒有已核實掉率。'],[/Gentlebro/,17,'從 Furggy 以南世界邊界缺口出海，沿淺色水路尋找 NPC；談話並收三份稿紙後領獎。']];
for(const e of entities.filter(e=>e.kind==='equipment')){const k=known.find(([re])=>re.test(e.label));if(k){e.route=r(k[1]);e.tip=k[2];e.evidence='spec-reviewed';}}
const trophies=table(section(7)).map(row=>({id:'cq3-trophy-'+slug(row[2]),label:row[2],condition:row[3],sourceIds:['S05'],route:r(18)}));
const trophyRoutes=[18,16,10,14,16,18,2,17,3,18,18,1,16,16,3,18,18,3,17,15,15,8,2,17,13,14,13,16,17,12,18];
trophies.forEach((t,i)=>t.route=r(trophyRoutes[i]));
const sources=table(section(13)).map(row=>({id:row[0],body:row[1],note:row[2]}));
const extraQuests=[['shell-phone',12,'取得 Shell Phone','Sunset 人魚池北側用船炮清木柵，與人魚交談確認電話入手。'],['milka-return',16,'Mama Milka · Cathulhu 後回報','完成請求並擊倒 Cathulhu 後回酒館談話、領獎。'],['kidd-return',14,'Kidd Cat · 鍛造結案','先還鐵鎚，再交 Dragon Bone，確認獎勵入手。'],['bonny-return',13,'Bonny · 尋書結案','Twin Castle Manors 取 Necropawmicon，回 Magic Bone 交書領獎。'],['clawford-return',8,'Clawford · Boss 後回報','三章各取獎，走城堡後門打倒 Clawford，再回入口交談領獎。'],['fishercat-start',5,'接取漁夫請求','北端清漁夫旁敵船後，回漁夫談話。'],['fishercat-return',17,'漁夫 · 釣魚結案','魚需趕往可捕捉岸邊；全魚精確位置待核，完成後回報。']];
for(const [id,route,label,tip] of extraQuests)add('cq3-quest-'+id,'quest',label,tip,r(route),{sourceIds:['S07','S12']});
for(let i=1;i<=3;i++)add('cq3-quest-lovepurr-chapter-'+i,'quest','戀愛故事第'+i+'章 · 領取獎勵','依三書選擇提示走完本章，開啟章末獎勵箱。',r(8),{sourceIds:['S07','S08']});
const landmarks={twilight:'Twilight 西側開關塔附近通道',furtigua:'Furtigua 的 Orion Ruins 西南沙灘',sunset:'Sunset 主島中北側三鎖門入口西側'};
for(const e of entities.filter(e=>e.kind==='encounter'))e.tip=landmarks[e.id.split('-').at(-1)]+'；完整對話後再勾選，終章前核對。';
const lostTips={milk:'Purrier Beach 提示石周邊沙灘找牛奶；歸還 Mama Milka。',hammer:'Twilight 北部提示石與休息點附近地面找 Smithy Hammer；歸還 Kidd Cat。',doll:'Sunset 星塔／紅灌木小島找 Voodoo Doll；歸還 Bonny。'};
for(const e of entities.filter(e=>e.kind==='lost'))e.tip=lostTips[e.id.split('-')[2]];
const supplement=JSON.parse(await fs.readFile(new URL('research.json',root),'utf8'));
sources.push(...supplement.sources);
for(const row of supplement.rows){const e=entities.find(e=>e.id===row.id);if(!e)throw Error('補充ID失聯：'+row.id);Object.assign(e,row);}
const followup=JSON.parse(await fs.readFile(new URL('followup-research.json',root),'utf8'));sources.push(...followup.sources);for(const row of followup.rows){const e=entities.find(e=>e.id===row.id);if(!e)throw Error('補查ID失聯：'+row.id);Object.assign(e,row);}
for(const step of steps){step.entityIds=entities.filter(e=>e.route===step.id).map(e=>e.id);}
const coverage=table(section(3));coverage.find(r=>r[0].includes('原版裝備'))[2]='96筆均有取得提示、來源與路線；單源及衝突可見，未PS5實機驗證。';coverage.find(r=>r[0].includes('船藍圖'))[2]='13被動與4炮彈均有查漏攻略；名稱、階級與金盃集合仍有來源差異，不作白金分母。';
const gaps=table(section(11));gaps.find(r=>r[0]==='U02')[1]='96件已有取得提示與來源；部分精確箱、固定／隨機說法及中文對照待核。';gaps.find(r=>r[0]==='U02')[3]='不阻塞查漏；不宣稱全數位置已實機證實。';gaps.find(r=>r[0]==='U03')[1]='13被動與4炮彈已有逐項流程；++階級、固定箱／掉落及PS5金盃集合仍有差異。';
const data={gameId:'cat-quest-iii',version:'2026-11-27.3',specHash:createHash('sha256').update(raw).digest('hex'),supplementHash:createHash('sha256').update(JSON.stringify(supplement)).digest('hex'),followupHash:createHash('sha256').update(JSON.stringify(followup)).digest('hex'),reviewedIds:followup.rows.map(r=>r.id),chapters,steps,entities,trophies,sources,gaps,coverage,bookGuide:sub('5.4').split('**戀愛書選擇提示**：')[1]?.trim(),scope:section(3).split('\n\n').at(-1)};
await fs.mkdir(new URL('dist/',root),{recursive:true});await fs.writeFile(new URL('dist/data.json',root),JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify({steps:steps.length,entities:entities.length,trophies:trophies.length}));
