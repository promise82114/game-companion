// 將已查證研究資料整理為網站資料；保留原始來源、空值與差異，不生成假內容。
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),read=async name=>JSON.parse(await fs.readFile(new URL('research/'+name,root),'utf8'));
const catalog=await read('catalog-research.json'),drones=await read('drone-research.json'),equipment=await read('equipment-research.json');
const [early,late,expansion,audit]=await Promise.all(['missions-01-26.json','missions-27-52.json','equipment-expansion.json','drone-audit.json'].map(read));
const mergeSources=(...lists)=>{const byId=new Map();for(const row of lists.flat()){if(byId.has(row.id))assert.equal(byId.get(row.id).url,row.url,'同一來源 ID 不可指向不同網址');else byId.set(row.id,row);}return [...byId.values()];};
catalog.sources=mergeSources(catalog.sources,early.sources,late.sources);
equipment.sources=mergeSources(equipment.sources,expansion.sources);
drones.sources=mergeSources(drones.sources,audit.sources);
const facts=[...early.missions,...late.missions];assert.equal(facts.length,52);assert.equal(new Set(facts.map(m=>m.id)).size,52);
for(const m of catalog.missions){const fact=facts.find(row=>row.id===m.id);assert.ok(fact,'缺少關卡詳情 '+m.id);const identity={id:m.id,number:m.number,officialName:m.officialName};const sourceIds=[...new Set([...m.sourceIds,...fact.sourceIds])];Object.assign(m,fact,identity,{sourceIds});}
// 只沿用前26關已由D3官方索引核對、同一日文名稱的對照；不推定變體。
const enemyAliases=new Map();for(const m of early.missions){assert.equal(m.enemyNamesJa.length,m.enemies.length);m.enemyNamesJa.forEach((ja,i)=>{if(/^[A-Za-z]/.test(m.enemies[i])){if(enemyAliases.has(ja))assert.equal(enemyAliases.get(ja),m.enemies[i]);enemyAliases.set(ja,m.enemies[i]);}});}
for(const m of catalog.missions){
 if(!m.enemyNamesJa)m.enemyNamesJa=[...m.enemies];m.bossNamesSource=[...m.bosses];
 const mapped=m.enemies.some(name=>enemyAliases.has(name))||m.bosses.some(name=>enemyAliases.has(name));
 m.enemies=m.enemies.map(name=>enemyAliases.get(name)||name);m.bosses=m.bosses.map(name=>enemyAliases.get(name)||name);
 if(mapped&&!m.sourceIds.includes('official-enemy-names'))m.sourceIds.push('official-enemy-names');
}
for(const group of ['weapons','items','appearance']){const oldIds=new Set(equipment[group].map(row=>row.id));for(const row of expansion[group])assert.ok(!oldIds.has(row.id),'擴充資料重複 ID '+row.id);equipment[group].push(...expansion[group]);}
for(const patch of expansion.updates||[]){const row=equipment.weapons.find(row=>row.id===patch.id)||equipment.items.find(row=>row.id===patch.id)||equipment.appearance.find(row=>row.id===patch.id);assert.ok(row,'更新未知裝備 '+patch.id);Object.assign(row,patch);}
equipment.issues=[...(equipment.issues||[]),...expansion.issues];
equipment.coverage={...equipment.coverage,weaponCount:equipment.weapons.length,weaponTypes:new Set(equipment.weapons.map(w=>w.type)).size,items:'partial',appearance:'partial'};
for(const patch of audit.updates){const row=drones.drones.find(row=>row.id===patch.id);assert.ok(row,'核對未知 Drone '+patch.id);Object.assign(row,patch);row.checkedAt=audit.checkedAt;}
drones.audit={checkedAt:audit.checkedAt,method:audit.method,reviewed:audit.updates.map(d=>d.id),landmarkReconciled:audit.updates.filter(d=>d.verification==='source-reconciled').length,unresolved:audit.updates.filter(d=>d.verification==='conflict').map(d=>d.id)};
catalog.contentVersion=equipment.contentVersion='1.3.0';drones.contentVersion='1.1.0';
const categories={'主線':'story','順路':'incidental','特殊挑戰':'challenge','收集':'collection','作業':'grind','線上／多人':'online','高難度':'difficulty'};
const normalize=text=>String(text).replace(/[’‘]/g,"'");
const nameKey=value=>normalize(value||'').replace(/\s/g,'').toLocaleLowerCase();
const displayName=row=>row.officialName||row.nameJa||row.name||row.title;
function unlockText(u){if(!u)return '解鎖條件待查證。';if(u.kind==='initial')return '初始裝備；以遊戲內庫存確認。';if(u.kind==='mission')return `${u.missionId.toUpperCase()} · ${u.reportedDifficulty||u.minimumDifficulty||'難度待查'} 完成（來源列出的充分條件，未推定最低限制）`;if(u.kind==='drone-count')return `確認回收 ${u.droneCount} 架 M.I.A. Drone 後解鎖購買資格。`;if(u.kind==='enemy-kills')return `累計擊倒 ${u.killCount} 隻 ${u.enemy}，並成功完成任務。`;return '解鎖條件待查證。';}
for(const t of catalog.trophies)t.category=categories[t.category]||t.category;
for(const w of equipment.weapons){
 const u=w.unlock;w.displayName=displayName(w);assert.ok(w.displayName,'裝備名稱不可空白');
 w.price=w.cost;
 w.missionIds=[...new Set([...(w.relatedMissionIds||[]),...(w.farmMissionIds||[])])];
 w.recommendedUse=[w.recommendation,w.warning].filter(Boolean).join(' ');
 w.unlockCondition=unlockText(u);
 w.trophyIds=catalog.trophies.filter(t=>w.trophyNames.some(n=>normalize(n)===normalize(t.officialName))).map(t=>t.id);
}
for(const t of catalog.trophies)t.weaponIds=equipment.weapons.filter(w=>w.trophyIds.includes(t.id)).map(w=>w.id);
for(const m of catalog.missions){
 m.droneId=drones.drones.find(d=>d.missionId===m.id).id;
 m.excludedRewards=m.excludedRewards||[];
 m.unlockRewards=(m.unlockRewards||[]).filter(reward=>{if(reward.baseGame===false||reward.dlcStatus&& !['base','base-game','confirmed-base'].includes(reward.dlcStatus)||/銀鷲|Golden Storm/i.test([reward.officialName,reward.nameJa,reward.name].filter(Boolean).join(' '))){m.excludedRewards.push(reward);return false;}return true;});
 for(const reward of [...m.unlockRewards,...m.excludedRewards]){
  reward.displayName=displayName(reward)||'名稱待查證';
  reward.sourceIds=reward.sourceIds||[reward.sourceId].filter(Boolean);if(!reward.sourceIds.length)reward.sourceIds=m.sourceIds;
  const found=equipment.weapons.find(w=>[w.officialName,w.nameJa,...w.aliases||[]].filter(Boolean).some(name=>[reward.officialName,reward.nameJa,reward.name].filter(Boolean).some(n=>nameKey(n)===nameKey(name))));
  if(found&&m.unlockRewards.includes(reward)){reward.weaponId=found.id;if(!found.missionIds.includes(m.id))found.missionIds.push(m.id);}
 }
 m.weaponIds=equipment.weapons.filter(w=>w.missionIds.includes(m.id)).map(w=>w.id);
}
equipment.cosmetics=equipment.appearance;
for(const key of ['paGear','items','cosmetics','mercenary','challenges'])for(const row of equipment[key]||[]){
 row.displayName=displayName(row);row.title=row.displayName;row.unlockCondition=unlockText(row.unlock);
 row.description=[row.description,row.effect,row.recommendation,row.warning,...row.steps||[]].filter(Boolean).join(' ');
}
catalog.coverage={missionDetails:missionsCount(m=>m.tactics?.length>0),enemyLists:missionsCount(m=>m.enemies.length>0),rewardRows:catalog.missions.reduce((n,m)=>n+m.unlockRewards.length,0),excludedRewardRows:catalog.missions.reduce((n,m)=>n+m.excludedRewards.length,0),bossLists:missionsCount(m=>m.bossStatus==='listed'),pendingFields:catalog.missions.filter(m=>m.pendingFields?.length).map(m=>({id:m.id,fields:m.pendingFields}))};
function missionsCount(predicate){return catalog.missions.filter(predicate).length;}
await fs.mkdir(new URL('dist/data/',root),{recursive:true});
for(const [name,data]of [['catalog',catalog],['drones',drones],['equipment',equipment]])await fs.writeFile(new URL('dist/data/'+name+'.json',root),JSON.stringify(data,null,2)+'\n');
await fs.writeFile(new URL('dist/data/advice.json',root),JSON.stringify(await read('advice-research.json'),null,2)+'\n');
console.log(JSON.stringify({prepared:true,missions:catalog.missions.length,trophies:catalog.trophies.length,drones:drones.drones.length,weapons:equipment.weapons.length}));
