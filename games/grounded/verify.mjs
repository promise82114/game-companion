import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {trophies,steps,stages,collectibles,categories,regions,superWinConditions} from './dist/data.js';
import {fresh,validateProgress,world,run,player,setCollection,collectionState,addRun,newPlayer,newWorld,importData} from './dist/model.js';
assert.equal(trophies.length,46);for(const [grade,n]of [['platinum',1],['gold',3],['silver',10],['bronze',32]])assert.equal(trophies.filter(t=>t.grade===grade).length,n,grade);
for(const list of [trophies,steps,stages,collectibles,categories,regions,superWinConditions])assert.equal(new Set(list.map(i=>i.id)).size,list.length);
for(const s of steps){assert.ok(stages.some(v=>v.id===s.stageId));for(const id of s.prerequisites)assert.ok(steps.some(v=>v.id===id));for(const id of s.trophyIds)assert.ok(trophies.some(v=>v.id===id));for(const id of s.collectibleIds)assert.ok(collectibles.some(v=>v.id===id));}
for(const t of trophies){assert.ok(t.sourceUrls.length);assert.ok(t.condition);if(t.grade!=='platinum')assert.ok(steps.some(s=>s.trophyIds.includes(t.id)),'missing trophy roadmap '+t.id);}
for(const i of collectibles){assert.ok(categories.some(c=>c.id===i.category));assert.ok(regions.some(r=>r.id===i.regionId));assert.ok(!i.mapPoint);assert.equal(i.positionAccuracy,'region-only');for(const id of i.requiredFor)assert.ok(id==='super-win'||trophies.some(t=>t.id===id));assert.ok(i.sourceUrls.length);}
assert.ok(categories.every(c=>!c.complete));
const p=fresh();validateProgress(p);assert.equal(Object.keys(player(p).trophies).length,0);p.unknownTop={keep:'synthetic'};world(p).runs.base.future={retain:true};
run(p).steps.hedge={done:true,note:'synthetic'};const milk=collectibles.find(i=>i.category==='milk'),scab=collectibles.find(i=>i.category==='scab');setCollection(p,milk,'obtained');setCollection(p,scab,'obtained');const baseId=world(p).currentRunId;addRun(p);assert.equal(collectionState(p,milk),'missing');assert.equal(collectionState(p,scab),'obtained');assert.deepEqual(run(p).steps,{});world(p).currentRunId=baseId;assert.equal(run(p).steps.hedge.note,'synthetic');
const first=player(p);first.trophies['science-rules']={earned:true};const second=newPlayer('synthetic second');world(p).players[second.playerId]=second;world(p).currentPlayerId=second.playerId;assert.deepEqual(player(p).trophies,{});
const w=newWorld('synthetic isolated');p.worlds[w.worldId]=w;p.currentWorldId=w.worldId;assert.equal(collectionState(p,scab),'missing');const restored=importData({records:[{key:'progress',value:p}]});assert.equal(restored.unknownTop.keep,'synthetic');assert.throws(()=>validateProgress({...p,schema:2}));assert.throws(()=>validateProgress({...p,gameId:'talos2'}));
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(await fs.readFile(new URL('../talos2/dist/shared/sync-core.js',import.meta.url),'utf8'),ctx);const core=ctx.window.SideProjectSync;const remote=JSON.parse(JSON.stringify(p));remote.unknownFuture={note:'preserved'};const plan=core.merge(null,p,remote,{hasBase:false}),next=core.resolve(plan,plan.conflicts.map(()=>'remote'));validateProgress(next);assert.equal(next.unknownFuture.note,'preserved');
for(const file of ['app.js','data.js','model.js','map.js']){const check=spawnSync(process.execPath,['--check',fileURLToPath(new URL('dist/'+file,import.meta.url))],{encoding:'utf8'});assert.equal(check.status,0,check.stderr);}
console.log(JSON.stringify({passed:true,game:'grounded',trophies:trophies.length,stages:stages.length,steps:steps.length,collectibles:collectibles.length,preciseCoordinates:0,collectionDatabase:'partial',cloud:false}));
