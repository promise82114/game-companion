import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {basemap,yardTiles,projectYardPoint} from './dist/basemap.js';
import {defenseEvents} from './dist/defense.js';
import {fieldItems,fieldById,fieldRows,harvestAdvice} from './dist/field-map-catalog.js';
assert.equal(fieldItems.filter(r=>r.kind==='creature').length,459);
assert.equal(fieldItems.filter(r=>r.kind==='resource').length,586);
assert.equal(fieldById.size,1045,'參考點位 ID 不重複');
assert.ok(fieldItems.every(r=>r.point.length===2&&r.point.every(Number.isFinite)));
assert.ok(fieldItems.every(r=>{const [x,y]=projectYardPoint(r.point);return x>-100&&x<900&&y>-100&&y<950;}),'新點位使用同一庭院投影');
assert.ok(fieldItems.every(r=>r.category!==1648),'原始科學不重複放入採集地圖');
assert.equal(fieldRows('creature',{fieldType:'Black Widow',search:''}).length,5);
assert.equal(fieldRows('creature',{fieldType:'all',search:'綠椿'}).length,4);
assert.match(harvestAdvice(fieldItems.find(r=>r.type==='Pond Moss')),/黑寡婦匕首/);
assert.ok(fieldRows('resource',{fieldType:'all',search:'Supreme Quartzite'}).length>0);
import {trophies,steps,stages,collectibles,categories,regions,superWinConditions} from './dist/data.js';
import {fresh,validateProgress,world,run,player,setCollection,ngMolarState,setNGMolarState,collectionState,addRun,newPlayer,newWorld,importData,stampActor} from './dist/model.js';
import {stepProgress,completedSteps,nextPendingStep,conditionItems,pendingItems,remixReview} from './dist/roadmap-progress.js';
import {armor,weapons} from './dist/gear-data.js';
import {upgradeLevels,baseMaterials,branchMaterials,smithingUnlocks,ngArmorLevels} from './dist/smithing-data.js';
import {weaponUpgrade,shields,armorShieldPairings,utilityArmorStats,environmentUpgrades,toolUpgrades} from './dist/equipment-data.js';
import {mutations,mutationCategories} from './dist/mutation-data.js';
import {progressionBuilds,mutationBuilds} from './dist/playstyle-data.js';
import {targetBuilds} from './dist/target-build-data.js';
import {fixedWeapons,fixedMatchups} from './dist/fixed-build-data.js';
import {ngMolarItems,ngMolarCoordinates} from './dist/ng-molar-data.js';
import {accessRows,accessEntries} from './dist/access-data.js';
import {itemAccess} from './dist/access.js';
import {chipCatalog,shopDetails} from './dist/chip-data.js';
assert.deepEqual(upgradeLevels.map(r=>r.level),[1,2,3,4,5,6,7,8,9]);
const materialTotal=(key,start,end)=>upgradeLevels.filter(r=>r.level>=start&&r.level<=end).reduce((sum,r)=>sum+r[key],0);
assert.deepEqual([materialTotal('weapon',1,5),materialTotal('weapon',6,7),materialTotal('weapon',8,9)],[30,15,15]);
assert.deepEqual([materialTotal('armor',1,5),materialTotal('armor',6,7),materialTotal('armor',8,9)],[15,6,6]);
assert.equal(upgradeLevels.at(-1).weaponBonus,65);assert.equal(upgradeLevels.at(-1).sleek,45);
assert.equal(baseMaterials.length,6);assert.equal(branchMaterials.length,5);
assert.ok(baseMaterials.every(r=>smithingUnlocks.some(u=>u.name===r.oreUnlock)&&smithingUnlocks.some(u=>u.name===r.renewableUnlock)));
assert.ok(smithingUnlocks.filter(r=>r.chip).every(r=>chipCatalog.some(c=>c.id===r.chip)),'鍛造解鎖連到現有晶片');
assert.deepEqual(ngArmorLevels.map(r=>r.level),[10,11,12,13,14,15]);assert.equal(ngArmorLevels.at(-1).bonus,215);
import {captureProgressEdits,revertProgressEdits} from './dist/progress-edits.js';
import {matchesSearch} from './dist/search.js';
import {preparations} from './dist/preparations.js';
import {groups,reportItems,reportConditionItems,collectionTarget,mappedItems,yardPoints,searchReport} from './dist/report.js';
import {damageColumns,creatureRows} from './dist/creature-data.js';
import {mainTech} from './dist/chip-tech.js';
assert.equal(trophies.length,46);for(const [grade,n]of [['platinum',1],['gold',3],['silver',10],['bronze',32]])assert.equal(trophies.filter(t=>t.grade===grade).length,n,grade);
for(const list of [trophies,steps,stages,collectibles,categories,regions,superWinConditions])assert.equal(new Set(list.map(i=>i.id)).size,list.length);
for(const s of steps){assert.ok(stages.some(v=>v.id===s.stageId));assert.ok(typeof s.experienceNote==='string'&&s.experienceNote.trim(),'完整體驗說明缺失：'+s.id);for(const id of s.prerequisites)assert.ok(steps.some(v=>v.id===id));for(const id of s.trophyIds)assert.ok(trophies.some(v=>v.id===id));for(const id of s.collectibleIds)assert.ok(collectibles.some(v=>v.id===id));}
for(const t of trophies){assert.ok(t.sourceUrls.length);assert.ok(t.condition);if(t.grade!=='platinum')assert.ok(steps.some(s=>s.trophyIds.includes(t.id)),'missing trophy roadmap '+t.id);}
for(const i of collectibles){assert.ok(categories.some(c=>c.id===i.category));assert.ok(regions.some(r=>r.id===i.regionId));assert.ok(!i.mapPoint);assert.equal(i.positionAccuracy,'region-only');for(const id of i.requiredFor)assert.ok(id==='super-win'||trophies.some(t=>t.id===id));assert.ok(i.sourceUrls.length);}
for(const row of [...trophies,...collectibles])assert.match(row.name,/\p{Script=Han}/u,row.id);
for(const [id,route] of Object.entries(preparations)){
 assert.ok(steps.some(step=>step.id===id),id);
 assert.equal(route.length,2);
 assert.ok(route.every(text=>text.trim()),id);
}
for(const stage of stages)assert.ok(steps.some(step=>step.stageId===stage.id&&preparations[step.id]),stage.id);
for(const rows of [weapons,armor]){
 assert.equal(new Set(rows.map(row=>row.english)).size,rows.length);
 assert.ok(rows.every(row=>row.name&&row.english&&[1,2,3].includes(row.tier)));
}
assert.ok(weapons.every(row=>/^\d/.test(row.damage)&&row.damageType&&['yes','no','unknown'].includes(row.underwater)));
assert.equal(shields.length,5);
assert.equal(new Set(shields.map(row=>row.english)).size,5);
assert.equal(shields.filter(row=>row.scope==='第一輪').length,4);
for(const row of shields)assert.ok(row.block>0&&row.effect&&row.unlock&&row.advice&&row.source.startsWith('https://'),row.english);
for(const row of weapons){const upgrade=weaponUpgrade(row);assert.ok(upgrade.path&&upgrade.effect&&upgrade.source.startsWith('https://'),row.english);}
assert.match(weaponUpgrade(weapons.find(row=>row.english==='Mint Mace')).effect,/50 清新/);
assert.match(weaponUpgrade(weapons.find(row=>row.english==='Termite Axe')).elementEffect,/強悍詞條/);
assert.equal(weaponUpgrade(weapons.find(row=>row.english==='Arrow')).path,'不可鍛造');
assert.match(weaponUpgrade(weapons.find(row=>row.english==='Infused Club')).effect,/不繼承/);
assert.ok(armor.filter(row=>!row.defense).every(row=>utilityArmorStats[row.english]?.defense>0));
assert.ok(environmentUpgrades.every(row=>armor.some(gear=>gear.english===row.gear)&&row.level&&row.benefit&&row.tradeoff));
assert.ok(toolUpgrades.every(row=>row.gear.every(name=>weapons.some(gear=>gear.english===name))));
assert.equal(mutations.length,41);
assert.equal(new Set(mutations.map(row=>row.id)).size,mutations.length);
assert.ok(matchesSearch(['Acid Edge'],'酸味戰斧'));
assert.ok(matchesSearch(['Stump BURG.L Chip'],'蟻丘晶片'));
assert.equal(matchesSearch(['紅蟻丘晶片','Red Anthill BURG.L Chip'],'蟻丘漢堡小哥晶片'),false);
assert.ok(matchesSearch(['普通乳牙 01'],'普通乳牙01'));
assert.ok(searchReport(reportItems,'白蟻斧').some(item=>item.id==='yard-210033'));
const undoBefore=fresh(),undoAfter=structuredClone(undoBefore);
setCollection(undoAfter,{id:'synthetic-undo',category:'milk'},'obtained');
const undoChanges=captureProgressEdits(undoBefore,undoAfter);
assert.equal(undoChanges.length,1);
run(undoAfter).steps.other={done:true,note:'later unrelated edit'};
revertProgressEdits(undoAfter,undoChanges);
assert.equal(run(undoAfter).collectibles['synthetic-undo'],undefined);
assert.equal(run(undoAfter).steps.other.note,'later unrelated edit');
const conflict=structuredClone(undoBefore);
setCollection(conflict,{id:'synthetic-undo',category:'milk'},'obtained');
assert.throws(()=>revertProgressEdits(conflict,undoChanges),/之後已被更新/);
const legacyUndo=structuredClone(undoBefore);
run(legacyUndo).steps.legacy={done:false,note:'retain',unknown:{keep:true}};
const editedLegacy=structuredClone(legacyUndo);
run(editedLegacy).steps.legacy={...run(editedLegacy).steps.legacy,done:true,...stampActor(editedLegacy)};
revertProgressEdits(editedLegacy,captureProgressEdits(legacyUndo,editedLegacy));
assert.deepEqual(editedLegacy,legacyUndo);
for(const row of mutations)assert.ok(row.name&&row.effect&&row.unlock&&Object.hasOwn(mutationCategories,row.category),row.english);
for(const build of progressionBuilds){
 assert.ok(build.weapons.every(name=>weapons.some(row=>row.english===name&&row.scope==='第一輪')),build.title);
 assert.ok(build.armor.every(name=>armor.some(row=>row.english===name)),build.title);
}
assert.equal(ngMolarItems.length,219);
assert.equal(ngMolarItems.filter(row=>row.underwater).length,21);
assert.equal(new Set(ngMolarItems.map(row=>row.id)).size,219);
assert.deepEqual(ngMolarItems.map(row=>row.number),Array.from({length:219},(_,i)=>i+1));
assert.ok(ngMolarItems.every(row=>row.access.route&&row.point.every(Number.isFinite)&&!reportItems.some(old=>old.id===row.id)));
const ngSnapshot=JSON.parse(await fs.readFile(new URL('NG_MOLAR_SOURCES.json',import.meta.url),'utf8'));
assert.deepEqual(ngMolarCoordinates,ngSnapshot.coordinates);
const ngSearchProgress=fresh(),ngCandidate=ngMolarItems[0];
assert.equal(ngMolarState(ngSearchProgress,ngCandidate,run(ngSearchProgress)),null);
assert.throws(()=>setNGMolarState(ngSearchProgress,ngCandidate,'absent',run(ngSearchProgress)));
const ngFirst=addRun(ngSearchProgress);setNGMolarState(ngSearchProgress,ngCandidate,'absent',run(ngSearchProgress));
assert.equal(ngMolarState(ngSearchProgress,ngCandidate,run(ngSearchProgress)),'absent');
const restoredNG=importData(JSON.parse(JSON.stringify(ngSearchProgress)));
assert.equal(ngMolarState(restoredNG,ngCandidate,run(restoredNG)),'absent');
const ngAbsenceBefore=structuredClone(ngSearchProgress);setNGMolarState(ngSearchProgress,ngCandidate,'obtained',run(ngSearchProgress));
assert.equal(run(ngSearchProgress).collectibles[ngCandidate.id].ngNotSpawned,false);
revertProgressEdits(ngSearchProgress,captureProgressEdits(ngAbsenceBefore,ngSearchProgress));
assert.deepEqual(ngSearchProgress,ngAbsenceBefore);
addRun(ngSearchProgress);assert.equal(ngMolarState(ngSearchProgress,ngCandidate,run(ngSearchProgress)),'pending');
assert.equal(ngMolarState(ngSearchProgress,ngCandidate,world(ngSearchProgress).runs[ngFirst]),'absent');
for(const value of [null,'true',1]){const invalid=structuredClone(ngSearchProgress);world(invalid).runs[ngFirst].collectibles[ngCandidate.id].ngNotSpawned=value;assert.throws(()=>validateProgress(invalid));}
const conflicting=structuredClone(ngSearchProgress);world(conflicting).runs[ngFirst].collectibles[ngCandidate.id].status='obtained';assert.throws(()=>validateProgress(conflicting));
const legacyNG=structuredClone(ngAbsenceBefore);delete run(legacyNG).collectibles[ngCandidate.id].ngNotSpawned;validateProgress(legacyNG);assert.equal(ngMolarState(legacyNG,ngCandidate,run(legacyNG)),'pending');
assert.equal(new Set(fixedWeapons.map(row=>row.weapon)).size,fixedWeapons.length,'每種武器只配一把');
const fixedById=new Map(fixedWeapons.map(row=>[row.id,row]));
assert.deepEqual(armorShieldPairings.map(p=>[p.armor,p.shield]),[['Ladybug Armor','Fire Ant Shield'],['Fire Ant Armor','Ladybird Shield']]);
for(const p of armorShieldPairings){assert.ok(armor.some(a=>a.english===p.armor));assert.ok(shields.some(s=>s.english===p.shield));assert.ok(p.shortReason&&p.reason);}
assert.deepEqual([...fixedMatchups.map(row=>row.target)].sort(),targetBuilds.map(row=>row.target).sort());
assert.deepEqual(fixedMatchups.map(row=>row.difficulty),fixedMatchups.map(row=>row.difficulty).sort((a,b)=>a-b),'簡單在前');
for(const fixed of fixedWeapons)assert.equal(weapons.find(row=>row.english===fixed.weapon)?.scope,'第一輪');
for(const row of fixedMatchups){
 if(row.difficulty<=2)assert.equal(row.specialized.length,0,'簡單敵人特化留空');
 for(const pick of [...row.specialized,...row.transition]){assert.ok(fixedById.has(pick.id));if(pick.shield){assert.equal(weapons.find(w=>w.english===fixedById.get(pick.id).weapon).hands,'one','雙手武器不能搭盾');if(pick.shield!=='by-armor')assert.ok(shields.some(s=>s.english===pick.shield));}}
 for(const pick of row.specialized){const fixed=fixedById.get(pick.id);assert.ok(!fixed.transitionOnly);assert.ok(!['法杖','弓','弩'].includes(weapons.find(w=>w.english===fixed.weapon).kind));}
}
const assistantShield=fixedMatchups.find(r=>r.target==='Assistant Manager');assert.ok(assistantShield.transition.every(p=>p.shield==='Black Ant Shield'));
for(const row of fixedMatchups.filter(r=>r.target!=='Assistant Manager'))for(const pick of [...row.specialized,...row.transition])if(pick.shield)assert.equal(pick.shield,'by-armor','後期配盾必須依防具，不固定兇猛瓢蟲盾');
for(const [number,pin,limit] of [[2,42703,10],[22,42693,20],[168,210207,15]]){
 const point=projectYardPoint(ngMolarItems.find(row=>row.number===number).point),anchor=projectYardPoint((await import('./dist/report-data.js')).yardPoints[pin]);
 assert.ok(Math.hypot(point[0]-anchor[0],point[1]-anchor[1])<limit,'NG+ map axis / scale '+number);
}
for(const build of targetBuilds){
 for(const [hand,picks] of [['one',build.single],['two',build.two]]){
  assert.ok(picks.length>0,build.target);
  for(const pick of picks){const weapon=weapons.find(row=>row.english===pick.weapon);assert.ok(weapon?.scope==='第一輪'&&weapon.hands===hand,build.target+' '+pick.weapon);}
 }
}
for(const build of mutationBuilds){
 const picks=[...build.core,...build.extras];
 assert.ok(build.core.length>=1&&build.core.length<=3,build.title);
 assert.ok(build.extras.length>=1&&build.extras.length<=5,build.title);
 assert.equal(new Set(picks).size,picks.length,build.title);
 assert.ok(picks.every(name=>mutations.some(row=>row.english===name)),build.title);
 assert.ok(Object.keys(build.notes||{}).every(name=>picks.includes(name)),build.title);
}
assert.ok(weapons.every(row=>['one','two','ammo','thrown'].includes(row.hands)));
assert.equal(weapons.find(row=>row.english==='Salt Morning Star').hands,'one');
assert.equal(weapons.find(row=>row.english==='Mint Mace').hands,'two');
assert.ok(weapons.filter(row=>row.kind==='箭矢').every(row=>row.hands==='ammo'));
for(const name of ['molars','mega','scab','defense','lab','station']){
 const image=await fs.readFile(new URL('dist/map-icons/'+name+'.png',import.meta.url));
 assert.equal(image.subarray(0,8).toString('hex'),'89504e470d0a1a0a',name);
}
assert.equal(armor.filter(row=>row.defense).length,22);
const expectedReportCounts={meta:2,shop:64,chips:11,cards:68,docs:128,sites:108,molars:78,mega:45,scab:51,defense:9,bosses:5};
for(const {id} of groups)assert.equal(reportItems.filter(row=>row.group===id).length,expectedReportCounts[id],id);
assert.equal(new Set(reportItems.map(row=>row.id)).size,reportItems.length);
const lastMolar=reportItems.filter(row=>row.group==='molars').at(-1);
assert.deepEqual(collectionTarget(lastMolar),{group:'molars',hash:'collect-'+lastMolar.id});
assert.equal(new Set(accessRows.map(row=>row[0])).size,accessRows.length);
for(const [pin,layer,route,,entry] of accessRows){
 assert.ok(reportItems.some(item=>item.pin===pin),String(pin));
 assert.ok(layer&&route);
 if(entry)assert.ok(accessEntries[entry],String(pin));
}
for(const item of reportItems.filter(row=>['molars','mega','scab','chips'].includes(row.group)))assert.ok(itemAccess(item),item.id);
assert.equal(chipCatalog.length,11);
assert.equal(new Set(chipCatalog.map(row=>row.shop)).size,11);
for(const chip of chipCatalog){
 assert.ok(reportItems.some(item=>item.id===chip.id&&item.group==='chips'));
 assert.ok(reportItems.some(item=>item.id.startsWith('shop-bwiki-'+chip.shop+'-')));
}
for(const id of Object.keys(shopDetails))assert.ok(reportItems.some(item=>item.id===id),id);
assert.ok(mappedItems.every(row=>yardPoints[row.pin]?.length===2&&yardPoints[row.pin].every(Number.isFinite)));
assert.equal(new Set(mappedItems.map(row=>row.pin)).size,418);
const mapManifest=JSON.parse(await fs.readFile(new URL('MAP_BASEMAP.json',import.meta.url),'utf8'));
assert.equal(mapManifest.mapId,113);assert.equal(mapManifest.tileSetId,basemap.tileSetId);
assert.equal(yardTiles.length,64);assert.equal(mapManifest.tiles.length,64);
for(const tile of yardTiles){
 const source=mapManifest.tiles.find(row=>row.x===tile.tileX&&row.y===tile.tileY);assert.ok(source,tile.path);
 const bytes=await fs.readFile(new URL('dist/'+tile.path,import.meta.url));
 assert.equal(createHash('sha256').update(bytes).digest('hex'),source.sha256,tile.path);
 assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a',tile.path);
 assert.equal(bytes.readUInt32BE(16),256,tile.path);assert.equal(bytes.readUInt32BE(20),256,tile.path);
}
const corner=yardTiles[0],span=corner.size*8;
for(const landmark of mapManifest.landmarks){
 assert.deepEqual(yardPoints[landmark.pin],landmark.coordinate,landmark.name);
 const point=projectYardPoint(yardPoints[landmark.pin]);
 const pixel=point.map((value,index)=>(value-[corner.x,corner.y][index])/span*2048);
 assert.ok(pixel.every((value,index)=>Math.abs(value-landmark.pixel[index])<.001),landmark.name+' 底圖對位');
}
assert.ok(mappedItems.every(row=>{const [x,y]=projectYardPoint(yardPoints[row.pin]);return x>=corner.x&&x<=corner.x+span&&y>=corner.y&&y<=corner.y+span;}),'所有來源點位須落在底圖範圍內');
assert.equal(Object.keys(defenseEvents).length,9);
for(const [id,event] of Object.entries(defenseEvents)){
 assert.ok(reportItems.some(row=>row.id===id&&row.group==='defense'),id);
 assert.ok(event.enemies.every(name=>creatureRows.some(row=>row[1]===name)),id+' 生物對應');
}
assert.deepEqual(reportItems.find(row=>row.id==='chip-hedge').pin,71125);
assert.deepEqual(reportItems.find(row=>row.id==='data-recon-special').pin,212379);
assert.equal(reportConditionItems({id:'molars'},0).length,123);
assert.equal(reportConditionItems({id:'molars'},1).length,45);
assert.equal(new Set(creatureRows.map(row=>row[1])).size,67);
for(const [name,,,values] of creatureRows)for(const [key,value] of Object.entries(values??{})){
 assert.ok(damageColumns.includes(key),name+' '+key);
 assert.ok(value==='?'||Number.isFinite(value)&&value>=-100&&value<=100,name);
}
assert.equal(creatureRows.find(row=>row[1]==='Wolf Spider')[3]['辣味'],50);
assert.ok(Object.keys(mainTech).every(id=>steps.some(step=>step.id===id)));
assert.ok(categories.every(c=>!c.complete));
const reading=fresh(),firstStep=steps.find(s=>s.id==='first-camp'),hedgeStep=steps.find(s=>s.id==='hedge');
assert.deepEqual(stepProgress(reading,firstStep),{goalDone:false,completed:0,total:3,complete:false});
run(reading).steps['first-camp']={done:true,note:'synthetic retained'};
assert.equal(stepProgress(reading,firstStep).complete,false,'目標完成不能代填內部獎盃');
for(const id of firstStep.trophyIds)player(reading).trophies[id]={earned:true};
assert.equal(stepProgress(reading,firstStep).complete,true);assert.equal(completedSteps(reading),1);assert.equal(nextPendingStep(reading).id,'oak-rescue');
run(reading).steps.hedge={done:true};for(const id of hedgeStep.trophyIds)player(reading).trophies[id]={earned:true};
for(const id of hedgeStep.collectibleIds)setCollection(reading,collectibles.find(i=>i.id===id),'obtained');
assert.equal(stepProgress(reading,hedgeStep).complete,true);setCollection(reading,collectibles.find(i=>i.id==='scab-bugjuice'),'unknown');
assert.equal(stepProgress(reading,hedgeStep).complete,false,'待確認不能視為全部完成');
const readingRaw=JSON.stringify(reading);stepProgress(reading,hedgeStep);completedSteps(reading);nextPendingStep(reading);assert.equal(JSON.stringify(reading),readingRaw,'閱讀完成度不得改寫進度');
const audit=fresh(),dataCondition=superWinConditions.find(c=>c.id==='data'),molarCondition=superWinConditions.find(c=>c.id==='molars');
assert.equal(remixReview(audit).baseTrophies.length,43);assert.equal(remixReview(audit).pendingConditions.length,13);
assert.ok(conditionItems(audit,dataCondition).some(i=>i.id==='audio-goodbye-wendell'),'資料查漏不可排除必要性待查證的項目');
const recon=collectibles.find(i=>i.id==='data-recon-special');setCollection(audit,recon,'unknown');assert.ok(pendingItems(audit,conditionItems(audit,dataCondition)).some(i=>i.id===recon.id));
for(const i of collectibles)setCollection(audit,i,'obtained');for(const c of superWinConditions)run(audit).conditions[c.id]={done:true};
assert.equal(pendingItems(audit,conditionItems(audit,dataCondition)).length,0);assert.equal(player(audit).trophies['super-win'],undefined,'清單與條件全勾選不可代填 PSN');
const auditBase=JSON.stringify(run(audit));addRun(audit);assert.ok(conditionItems(audit,molarCondition).every(i=>i.category!=='milk'));assert.equal(remixReview(audit).pendingConditions.length,0,'NG+ 必須讀取第一輪驗收，不可誤用本輪空條件');assert.equal(JSON.stringify(world(audit).runs.base),auditBase);
const auditRaw=JSON.stringify(audit);remixReview(audit);conditionItems(audit,dataCondition);assert.equal(JSON.stringify(audit),auditRaw);
for(const c of superWinConditions){for(const id of c.categoryIds||[])assert.ok(categories.some(row=>row.id===id));if(c.stepId)assert.ok(steps.some(row=>row.id===c.stepId));}
const p=fresh();validateProgress(p);assert.equal(Object.keys(player(p).trophies).length,0);p.unknownTop={keep:'synthetic'};world(p).runs.base.future={retain:true};
run(p).steps.hedge={done:true,note:'synthetic'};const milk=collectibles.find(i=>i.category==='milk'),scab=collectibles.find(i=>i.category==='scab');setCollection(p,milk,'obtained');setCollection(p,scab,'obtained');const baseId=world(p).currentRunId;addRun(p);assert.equal(collectionState(p,milk),'missing');assert.equal(collectionState(p,scab),'obtained');assert.deepEqual(run(p).steps,{});world(p).currentRunId=baseId;assert.equal(run(p).steps.hedge.note,'synthetic');
const first=player(p);first.trophies['science-rules']={earned:true};const second=newPlayer('synthetic second');world(p).players[second.playerId]=second;world(p).currentPlayerId=second.playerId;assert.deepEqual(player(p).trophies,{});
const w=newWorld('synthetic isolated');p.worlds[w.worldId]=w;p.currentWorldId=w.worldId;assert.equal(collectionState(p,scab),'missing');const restored=importData({records:[{key:'progress',value:p}]});assert.equal(restored.unknownTop.keep,'synthetic');assert.throws(()=>validateProgress({...p,schema:2}));assert.throws(()=>validateProgress({...p,gameId:'talos2'}));
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(await fs.readFile(new URL('../talos2/dist/shared/sync-core.js',import.meta.url),'utf8'),ctx);const core=ctx.window.SideProjectSync;const remote=JSON.parse(JSON.stringify(p));remote.unknownFuture={note:'preserved'};const plan=core.merge(null,p,remote,{hasBase:false}),next=core.resolve(plan,plan.conflicts.map(()=>'remote'));validateProgress(next);assert.equal(next.unknownFuture.note,'preserved');
for(const file of ['app.js','data.js','model.js','map.js','field-map.js','field-map-data.js','field-map-catalog.js','basemap.js','defense.js','roadmap-progress.js','gear-data.js','equipment-data.js','smithing-data.js','smithing.js','gear.js','localization.js','preparations.js','report.js','report-data.js','creature-data.js','chip-tech.js','mutation-data.js','playstyle-data.js','playstyle.js','access-data.js','access.js','chip-data.js','chips.js','search.js','progress-edits.js']){const check=spawnSync(process.execPath,['--check',fileURLToPath(new URL('dist/'+file,import.meta.url))],{encoding:'utf8'});assert.equal(check.status,0,check.stderr);}
console.log(JSON.stringify({passed:true,game:'grounded',trophies:trophies.length,stages:stages.length,steps:steps.length,legacyCollectibles:collectibles.length,reportEntries:reportItems.length,mapPins:new Set(mappedItems.map(row=>row.pin)).size,creatures:creatureRows.length,cloud:false}));
