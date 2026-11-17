import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {trophies,steps,stages,collectibles,categories,regions,superWinConditions} from './dist/data.js';
import {fresh,validateProgress,world,run,player,setCollection,collectionState,addRun,newPlayer,newWorld,importData} from './dist/model.js';
import {stepProgress,completedSteps,nextPendingStep,conditionItems,pendingItems,remixReview} from './dist/roadmap-progress.js';
import {armor,weapons} from './dist/gear-data.js';
import {mutations,mutationCategories} from './dist/mutation-data.js';
import {progressionBuilds,mutationBuilds} from './dist/playstyle-data.js';
import {preparations} from './dist/preparations.js';
import {groups,reportItems,reportConditionItems,collectionTarget,mappedItems,yardPoints} from './dist/report.js';
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
assert.equal(mutations.length,41);
assert.equal(new Set(mutations.map(row=>row.id)).size,mutations.length);
for(const row of mutations)assert.ok(row.name&&row.effect&&row.unlock&&Object.hasOwn(mutationCategories,row.category),row.english);
for(const build of progressionBuilds){
 assert.ok(build.weapons.every(name=>weapons.some(row=>row.english===name&&row.scope==='第一輪')),build.title);
 assert.ok(build.armor.every(name=>armor.some(row=>row.english===name)),build.title);
}
for(const build of mutationBuilds){
 const picks=[...build.core,...build.extras];
 assert.equal(build.core.length,2,build.title);
 assert.ok(picks.length<=5&&new Set(picks).size===picks.length,build.title);
 assert.ok(picks.every(name=>mutations.some(row=>row.english===name)),build.title);
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
assert.deepEqual(collectionTarget(lastMolar),{group:'molars',page:4,hash:'collect-'+lastMolar.id});
assert.ok(mappedItems.every(row=>yardPoints[row.pin]?.length===2&&yardPoints[row.pin].every(Number.isFinite)));
assert.equal(new Set(mappedItems.map(row=>row.pin)).size,418);
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
for(const file of ['app.js','data.js','model.js','map.js','roadmap-progress.js','gear-data.js','gear.js','localization.js','preparations.js','report.js','report-data.js','creature-data.js','chip-tech.js','mutation-data.js','playstyle-data.js','playstyle.js']){const check=spawnSync(process.execPath,['--check',fileURLToPath(new URL('dist/'+file,import.meta.url))],{encoding:'utf8'});assert.equal(check.status,0,check.stderr);}
console.log(JSON.stringify({passed:true,game:'grounded',trophies:trophies.length,stages:stages.length,steps:steps.length,legacyCollectibles:collectibles.length,reportEntries:reportItems.length,mapPins:new Set(mappedItems.map(row=>row.pin)).size,creatures:creatureRows.length,cloud:false}));
