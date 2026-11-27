import {prepareChineseGlossary} from '../../../scripts/lib/prepare-chinese-glossary.mjs';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {mergeLocations} from './merge-locations.mjs';
const root=new URL('../../../',import.meta.url),spec=await fs.readFile(new URL('cat-quest-ii_GAME_COMPANION_SPEC.md',root),'utf8');
const section=(start,end)=>spec.slice(spec.indexOf(start),end?spec.indexOf(end):undefined);
const rows=text=>text.split(/\r?\n/).filter(l=>/^\| \[ \]/.test(l)).map(l=>l.split('|').slice(1,-1).map(x=>x.trim().replace(/`/g,'')));
const refs=text=>[...new Set([...text.matchAll(/S\d{2}/g)].map(m=>m[0]))];
const data={gameId:'cat-quest-ii',catalogVersion:'2026-11-27.1',specSha256:createHash('sha256').update(spec).digest('hex'),phases:[],steps:[],entities:[],trophies:[],sources:[],gaps:[]};
let phase;
for(const line of section('## 4.','## 5.').split(/\r?\n/)){
 if(line.startsWith('### 階段 ')){phase={id:line.match(/階段 ([A-F])/)[1],label:line.replace('### ',''),steps:[]};data.phases.push(phase);}
 if(line.startsWith('#### ')){const m=line.match(/#### ([A-F]\d+) `([^`]+)`｜(.*)/);const step={id:m[2],code:m[1],phaseId:phase.id,chapterId:phase.id,label:m[3],instructions:[],relatedEntityIds:[],sources:[],requiredForRoute:m[1]!=='D02'};data.steps.push(step);phase.steps.push(step.id);}
 else if(phase&&data.steps.length&&line.trim())data.steps.at(-1).instructions.push(line.replace(/^- (?:\[ \] )?/,''));
}
const add=(id,kind,name,locationText,extra={})=>data.entities.push({id,kind,name,locationText,aliases:[],scope:'base-reference',relatedEntityIds:[],sources:[],dataQuality:{name:'source-stated',location:'source-stated',walkthrough:'index-only'},...extra});
let group='';for(const line of section('## 6.','## 7.').split(/\r?\n/)){if(line.startsWith('### '))group=line.slice(4);if(/^\| \[ \]/.test(line)){const r=rows(line)[0];add(r[3],'sideQuest',r[1],group,{regionId:group,level:r[2],sources:['S02','S03','S09']});}}
for(const r of rows(section('## 7.','## 8.')))add('cq2-sp-'+r[1],'spell',r[2],r[3],{tip:r[4],sources:['S06']});
for(const r of rows(section('## 8.','### 8.1')))add(r[4],'dungeon',r[1],r[3],{suggestedPhaseIds:[...new Set(r[2].match(/[A-F]/g))],sources:['S03','S25'],tip:'位置索引可用，逐房間走法尚未收錄。清敵、開箱後以遊戲 Dungeon Complete 與入口狀態確認。'});
for(const r of rows(section('## 9.','### 9.2')))add(r[4],'equipment',r[1],r[3],{part:r[2],scope:/更新|Infinity/.test(r[3])?'free-update':'base-reference',sources:['S06','S15','S32','S33']});
for(const r of rows(section('## 10.','## 11.')))add(r[3],'goldChest',r[1],r[1],{rewardMode:r[2].includes('隨機')?'pool':'fixed',tip:r[2],sources:['S16']});
for(const [id,name,locationText,kind] of [
 ['cq2-key-hidden','Hidden Key','D02；完成 Founders Island II 的 This Is It!','key'],['cq2-key-golden','Golden Key','D02；Hidden Cave 內擊敗三個 Golden Mimics，實際開一個金箱再確認','key'],['cq2-key-hidden-stash','Hidden Stash Key','F02；Ultimutt Stash 入口第一火炬西南秘密路','key'],['cq2-key-drakoth-south','Drakoth 南島鑰匙','F02；Mewment Shores 南島','key'],['cq2-key-drakoth-west','Drakoth 西島鑰匙','F02；Throne of Lupus 西島群','key'],['cq2-art-rolling','Pawer Rolling','A04；King Lionardo 試煉','royalArt'],['cq2-art-smash','Pawer Smash','B02；翻滾後接攻擊','royalArt'],['cq2-art-water','Water Walking','C02；完成燈塔三任務','royalArt'],['cq2-art-full','Full Royal','D04；主線能力恢復，非 Royal Fur 第四條件','royalArt'],['cq2-loc-trial-first-kings','Trial of the First Kings','D03；劇情地點，不額外計入73洞','location']])add(id,kind,name,locationText,{sources:['S04','S18']});
const aliases={'cq2-eq-cat-soldier-helm':['Cat Soldier Helmet'],'cq2-eq-pawtimate-armor':['Pawtimate'],'cq2-eq-the-hawt-dog':['Hawt Dawg'],'cq2-eq-the-dragonmaker':['The Dragonmaler'],'cq2-sp-purrserk':['Purrzerk'],'cq2-dg-pugger-maze':['Puggy Maze（對應待核實）'],'cq2-dg-furrible-purrison':['Furrible Cave（對應待核實）'],'cq2-dg-duo-s-ruins':['King Duos Ruins（對應待核實）'],'cq2-dg-king-lionardo-s-trial':["King Lionardo’s Ruins"],'cq2-dg-king-woofhauser-s-trial':["King Woofhauser’s Ruins"]};
data.aliases=aliases;for(const e of data.entities)e.aliases=aliases[e.id]||[];
const questTips={
 'cq2-sq-curse-of-the-dogs':['South Pawt 北的卷軸引導進 Catpital Cave，探查洞內居民，出洞回報；後續為 Return of the Cats。','S29'],
 'cq2-sq-return-of-the-cats':['前項完成後找 Not the Head Towncat，沿路護送、擊退兩次埋伏後交付。','S28'],
 'cq2-sq-the-order-of-the-emeowrald':["古代法師指向 Paw’s Cave，處理洞末敵人、拿任務箱回報。",'S30'],
 'cq2-sq-tale-of-a-cat-and-a-dog':['到 Pawful Cave 完成骷髏的身體相關事件，遇墓碑用環境陷阱／Royal Damage，回洞外對話。','S21'],
 'cq2-sq-the-pawsitively-secret-contact':['依指引入 Pawasis Cave，翻滾穿過魔法圈、取箱，送往 Cave of the Lion 附近聯絡人；General’s Mace 為核對獎勵。','S31']
};
for(const e of data.entities)if(e.kind==='sideQuest'){e.tip=questTips[e.id]?.[0]||'具名、區域與參考時機已收錄；個別解謎步驟尚未收錄。完成交付後再核對 NPC／信箱的後續任務。';if(questTips[e.id])e.sources.push(questTips[e.id][1]);}
for(const r of rows(section('## 5.','## 6.'))){const id='cq2-tr-'+r[1],kind=id.includes('kinghood')?'level':id.includes('dungeon')?'dungeon':id.includes('people')?'sideQuest':id.includes('arcane')?'spell':id.includes('fashion')?'equipment':null;data.trophies.push({id,name:r[2],grade:r[3],condition:r[4],kind,target:Number(r[4].match(/\d+/)?.[0])||null,sources:['S01','S27']});}
for(const line of section('## 18.','### 證據使用').split(/\r?\n/)){const m=line.match(/^\| (S\d+) \| \[(.+?)\]\((.+?)\) \| (.*) \|/);if(m)data.sources.push({id:m[1],label:m[2],url:m[3],note:m[4]});}
for(const line of section('## 17.','## 18.').split(/\r?\n/)){const m=line.match(/^\| (G\d+) \| (.*?) \| (.*?) \| (.*?) \|/);if(m)data.gaps.push({id:m[1],label:m[2],research:m[3],blocks:m[4]});}
const norm=s=>s.toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]/g,'');
for(const step of data.steps){const text=step.instructions.join('\n');step.sources=refs(text);step.relatedEntityIds=data.entities.filter(e=>text.includes(e.name)||[step.code].some(c=>e.locationText.includes(c))).map(e=>e.id);}
// Reciprocal links retain independent progress facts.
for(const e of data.entities){e.relatedEntityIds=data.entities.filter(other=>other.id!==e.id&&((e.locationText+' '+e.tip).includes(other.name)||(other.locationText+' '+other.tip).includes(e.name))).map(r=>r.id);if(e.kind==='goldChest'&&e.rewardMode==='fixed'){const reward=data.entities.find(r=>r.kind==='equipment'&&norm(r.name)===norm(e.tip));if(reward&&!e.relatedEntityIds.includes(reward.id))e.relatedEntityIds.push(reward.id);}}
data.advice=section('## 3.','## 4.')+'\n'+section('## 11.','## 12.');
await mergeLocations(data);
await prepareChineseGlossary(new URL('../',import.meta.url),data);
await fs.writeFile(new URL('../dist/data.json',import.meta.url),JSON.stringify(data,null,2)+'\n');
console.log({phases:data.phases.length,steps:data.steps.length,entities:data.entities.length,trophies:data.trophies.length,sources:data.sources.length});
