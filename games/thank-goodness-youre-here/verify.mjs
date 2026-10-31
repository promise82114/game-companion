import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const dir=new URL('./dist/',import.meta.url),guide=JSON.parse(await fs.readFile(new URL('guide.json',dir),'utf8'));
const config=JSON.parse(await fs.readFile(new URL('module.json',import.meta.url),'utf8'));
const steps=guide.stages.flatMap(stage=>stage.steps),stepIds=new Set(steps.map(step=>step.id)),trophyIds=new Set(guide.trophies.map(trophy=>trophy.id)),sourceIds=new Set(guide.sources.map(source=>source.id));
assert.equal(config.gameId,guide.gameId);assert.equal(guide.platform,'PS5');assert.equal(guide.scope,'base');
assert.equal(guide.trophies.length,33);assert.equal(trophyIds.size,33);assert.equal(stepIds.size,steps.length);assert.equal(guide.stages.length,8);
const expected="Barnsworth's Best;In For A Penny;Open For Business;Cream of the Crop;Enough For Everyone;Milk Shy No More;Still at Large;Breakfast In Bed;Thank Goodness it's Over!;Patience is a Virtue;Spill the Beans;Done Up Like a Kipper;Friend of the Forest;No Post on Thuesdays;Bobby Knocker;Cheek to Cheek;The Rat Pack;Mole Supper;A Lovely Pair;Think F.A.S.T.;A Fine Mess;Lights Out;The Beans are on the Windowsill!;The People's Princess;Visit Barnsworth;Everything Must Go;Final Form;Ménage à trois;The Ol' One Two;Tough Tatties;Green Fingers;Shell Shocked;Sick as a Fig".split(';');
assert.deepEqual(guide.trophies.map(trophy=>trophy.officialName),expected);
for(const trophy of guide.trophies)assert.ok(steps.some(step=>step.trophyIds.includes(trophy.id)),trophy.officialName+' 未映射');
for(const [index,stage]of guide.stages.entries()){
 assert.equal(stage.order,index);assert.ok(stage.checkpoint);
 for(const [order,step]of stage.steps.entries()){
  assert.equal(step.order,order+1);
  for(const key of ['location','trigger','action','verification','recovery'])assert.ok(step[key],step.id+' '+key);
  assert.ok(['verified','consensus','unverified'].includes(step.verificationStatus));
  if(step.verificationStatus==='consensus')assert.ok(step.sourceRefs.length>=2,step.id+' 不可將單一來源標成多來源共識');
  assert.ok(step.sourceRefs.length);for(const id of step.sourceRefs)assert.ok(sourceIds.has(id));
  for(const id of step.trophyIds)assert.ok(trophyIds.has(id));
 }
}
for(const tracker of guide.trackers){assert.ok(tracker.stepIds.length);assert.equal(new Set(tracker.stepIds).size,tracker.stepIds.length);for(const id of tracker.stepIds)assert.ok(stepIds.has(id));}
const pos=id=>steps.findIndex(step=>step.id===id);
for(const [first,last]of [['reception-wait','main-run'],['door-reception','leave-reception'],['ronny','first-hole'],['shelves','chimney-first'],['screwdriver','charlie-fence'],['charlie-fence','fish-second'],['polly-paul','fertiliser-bag'],['potato-wait','chips-cow'],['mole-invite','mole-cancel'],['fish-first','fish-second'],['fish-second','fish-final'],['cheek-first','cheek-second'],['cheek-second','cheek-final'],['spill','soup'],['soup','ending']])assert.ok(pos(first)<pos(last),first+' → '+last);
for(const id of ['snail-sue','snail-crops','snail-gate','snail-stone','snail-tree','snail-bench'])assert.ok(pos(id)<pos('snail-well'));
const context={window:{},TextEncoder};vm.createContext(context);
for(const file of ['shared/progress-envelope.js','shared/sync-core.js','model.js'])vm.runInContext(await fs.readFile(new URL(file,dir),'utf8'),context);
const {RoadmapModel:model,SideProjectSync:core}=context.window,base=model.fresh();
assert.equal(Object.values(base.trophyEarned).filter(Boolean).length,0);
const local=model.validate({...base,stepDone:{'mow':true},future:{keep:1},trophyEarned:{'future-trophy':false}}).data;
const remote={...base,trophyEarned:{t18:true},futureRemote:{keep:2}};
const merged=core.resolve(core.merge(base,local,remote),[]);
assert.equal(merged.stepDone.mow,true);assert.equal(merged.trophyEarned.t18,true);assert.equal(merged.future.keep,1);assert.equal(merged.futureRemote.keep,2);
assert.equal(local.trophyEarned.t18,undefined);
const undone=core.resolve(core.merge({...base,stepDone:{mow:true}},{...base,stepDone:{mow:false}},{...base,stepDone:{mow:true}}),[]);assert.equal(undone.stepDone.mow,false);
const imported=core.resolve(model.importPlan({...base,stepDone:{mow:true},futureLocal:{keep:true}},{...base,trophyEarned:{t18:true},futureRemote:{keep:true}}),[]);
assert.equal(imported.stepDone.mow,true);assert.equal(imported.trophyEarned.t18,true);assert.equal(imported.futureLocal.keep,true);assert.equal(imported.futureRemote.keep,true);
for(const wrong of [{gameId:'edf-wb'},{platform:'PS4'},{scope:'dlc'},{schema:2},{stepDone:{mow:'true'}}])assert.throws(()=>model.validate({...base,...wrong}));
assert.equal(model.parse(JSON.stringify({kind:'recoveryBundle',gameId:guide.gameId,localRaw:JSON.stringify(local),sourceRaw:JSON.stringify(remote)})).future.keep,1);
const cloud=await fs.readFile(new URL('cloud-config.js',dir),'utf8');assert.ok(!cloud.includes('edf-wb'));assert.ok(cloud.includes(config.driveFileName));
const adapter=await fs.readFile(new URL('shared/drive-appdata.js',dir),'utf8');assert.ok(adapter.includes("'If-Match':etag"));assert.ok(adapter.includes('!this.verified'));
for(const file of ['shared/drive-appdata.js','shared/google-auth.js','shared/progress-envelope.js'])assert.equal((await fs.readFile(new URL(file,dir),'utf8')).replaceAll('\r\n','\n'),(await fs.readFile(new URL('../edf-wb/dist/'+file,import.meta.url),'utf8')).replaceAll('\r\n','\n'),'重用的安全模組應保持一致：'+file);
const sw=await fs.readFile(new URL('sw.js',dir),'utf8');assert.ok(sw.includes(config.storagePrefix+'assets.'));assert.ok(sw.includes('self.registration.scope'));assert.ok(!sw.includes('caches.match('));
console.log(JSON.stringify({passed:true,module:guide.gameId,trophies:33,mapped:33,steps:steps.length,stages:guide.stages.length,trackers:guide.trackers.length,statuses:Object.fromEntries(['verified','consensus','unverified'].map(status=>[status,steps.filter(step=>step.verificationStatus===status).length]))}));
