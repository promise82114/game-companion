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
const names=JSON.parse(await fs.readFile(new URL('./docs/EXOPHASE_TROPHY_NAMES.json',import.meta.url),'utf8'));
assert.equal(names.entries.length,33);assert.equal(new Set(names.entries.map(value=>value.exophaseId)).size,33);
assert.equal(names.sourceZhTW,guide.sources.find(source=>source.id==='ps5-zh-tw').url);
assert.equal(guide.nameSourceRef,'ps5-zh-tw');assert.equal(guide.namesVerifiedAt,names.accessedAt);
for(const trophy of guide.trophies){
 const name=names.entries.find(entry=>entry.exophaseId===trophy.exophaseId);assert.ok(name,trophy.id+' 繁中對照缺漏');
 assert.equal(trophy.officialName,name.officialName);assert.equal(trophy.nameZhTW,name.nameZhTW);assert.ok(trophy.nameZhTW.trim());
 if(trophy.progress){const progress=trophy.progress;assert.ok(progress.label&&progress.note);assert.ok(progress.stepIds.length>1);assert.equal(new Set(progress.stepIds).size,progress.stepIds.length);for(const id of progress.stepIds)assert.ok(steps.some(step=>step.id===id&&step.trophyIds.includes(trophy.id)),trophy.id+' 計數誤連 '+id);}
}
const progress=id=>guide.trophies.find(trophy=>trophy.id===id).progress;
const sections=guide.stages.flatMap(stage=>stage.sections);
assert.equal(sections.length,28);assert.equal(new Set(sections.map(section=>section.id)).size,sections.length);
for(const stage of guide.stages){
 assert.deepEqual(stage.sections.flatMap(section=>section.stepIds),stage.steps.map(step=>step.id),'段落必須依原順序完整覆蓋本章，不能漏項或重複');
 for(const section of stage.sections){assert.ok(section.title.trim());assert.ok(section.stepIds.length>0&&section.stepIds.length<=7);}
}
assert.equal(guide.trophies.filter(trophy=>trophy.progress).length,12);
assert.equal(progress('t11').stepIds.length,3);assert.equal(progress('t12').stepIds.length,5);assert.ok(progress('t12').stepIds.every(id=>!id.startsWith('worm-')));
assert.equal(progress('t25').stepIds.length,4);assert.ok(!progress('t25').stepIds.includes('spill'));
assert.match(progress('t19').label,/回訪檢查/);assert.match(progress('t28').label,/回訪檢查/);assert.match(progress('t14').label,/路線檢查/);assert.match(progress('t23').note,/不是兩趟/);
assert.equal(guide.trophies[13].nameZhTW,'週餓不送信');assert.equal(guide.trophies[19].nameZhTW,'臉難中打');
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
vm.runInContext(await fs.readFile(new URL('characters.js',dir),'utf8'),context);
const portraits=context.window.RoadmapCharacters,portraitSvg=await fs.readFile(new URL('characters.svg',dir),'utf8');
assert.equal(portraits.characters.length,19);assert.equal(new Set(portraits.characters.map(value=>value.id)).size,19);
for(const character of portraits.characters){
 assert.ok(portraitSvg.includes('<symbol id="'+character.id+'"'));
 for(const alias of character.aliases){assert.ok(portraits.html(alias).includes('data-character="'+character.id+'"'));assert.ok(JSON.stringify(guide).includes(alias),'沒有使用的頭像：'+alias);}
}
assert.equal((portraits.html('Big Ron／Ron／Ronny').match(/data-character="big-ron"/g)||[]).length,2);
assert.equal((portraits.html('Big Ron／Ron／Ronny').match(/data-character="ronny"/g)||[]).length,1);
assert.equal(portraits.html('Ronald Nickname Samson'), 'Ronald Nickname Samson');
assert.ok(portraits.html('<img onerror="x">Rog & Sue').startsWith('&lt;img onerror=&quot;x&quot;&gt;'));
assert.ok(!/<script|\bon\w+=|(?:href|src)="https?:/i.test(portraitSvg),'頭像只能使用本機靜態 SVG');
for(const file of ['shared/progress-envelope.js','shared/sync-core.js','model.js','roadmap.js'])vm.runInContext(await fs.readFile(new URL(file,dir),'utf8'),context);
const {RoadmapModel:model,SideProjectSync:core}=context.window,base=model.fresh();
const roadmap=context.window.RoadmapProgress.create(guide);
assert.equal(roadmap.milestones.length,60);assert.equal(new Set(roadmap.milestones.map(item=>item.id)).size,60);
assert.equal(roadmap.milestones.filter(item=>item.trophyId).length,11);
for(const stage of guide.stages){
 assert.deepEqual(stage.milestones.flatMap(item=>item.stepIds),stage.steps.map(step=>step.id),'成果須依原順序完整覆蓋操作說明');
 for(const item of stage.milestones){assert.ok(item.title.trim());assert.equal(item.id,item.stepIds[0]);if(item.trophyId){assert.ok(trophyIds.has(item.trophyId));assert.ok(item.stepIds.some(id=>steps.find(step=>step.id===id).trophyIds.includes(item.trophyId)));assert.equal(guide.trophies.find(trophy=>trophy.id===item.trophyId).progress,undefined,'跨階段進度不可改用單次跳盃取代');}}
}
const snailResult=roadmap.byStep.get('snail-sue'),gullResult=roadmap.byStep.get('gull-oily');
assert.equal(snailResult,roadmap.byStep.get('snail-bench'));assert.equal(gullResult,roadmap.byStep.get('pub-beans'));assert.equal(gullResult.stepIds.length,7);
const partial={...base,stepDone:{'snail-sue':true,'future-step':true},trophyEarned:{t31:true}};
assert.equal(roadmap.done(snailResult,partial),false);assert.equal(roadmap.recorded(snailResult,partial),1);
const fullSnails={...partial,stepDone:{...partial.stepDone,...Object.fromEntries(snailResult.stepIds.map(id=>[id,true]))},trophyEarned:{}};
assert.equal(roadmap.done(snailResult,fullSnails),true);assert.equal(fullSnails.trophyEarned.t31,undefined);
assert.equal(roadmap.done(roadmap.byStep.get('leave-reception'),{...base,stepDone:{'leave-reception':true}}),false,'舊操作完成不能冒充跳盃');
assert.equal(roadmap.done(roadmap.byStep.get('leave-reception'),{...base,trophyEarned:{t24:true}}),true);
assert.equal(new Set(guide.routeChecks.map(check=>check.id)).size,guide.routeChecks.length);
for(const check of guide.routeChecks){
 assert.ok(stepIds.has(check.beforeStepId));assert.ok(check.risk.trim());assert.ok(['consensus','unverified'].includes(check.verificationStatus));
 if(check.stepIds)for(const id of check.stepIds)assert.ok(stepIds.has(id)&&steps.find(step=>step.id===id).warningLevel==='critical','檢查點只能提醒有風險的既有項目');
 if(check.trophyIds)for(const id of check.trophyIds)assert.equal(guide.trophies.find(trophy=>trophy.id===id).category,'optional');
}
const well=guide.routeChecks.find(check=>check.id==='last-well');assert.equal(roadmap.pending(well,partial).length,5);assert.equal(roadmap.pending(well,fullSnails).length,0);
assert.equal(Object.values(base.trophyEarned).filter(Boolean).length,0);
const local=model.validate({...base,stepDone:{'mow':true},future:{keep:1},trophyEarned:{'future-trophy':false}}).data;
const remote={...base,trophyEarned:{t18:true},futureRemote:{keep:2}};
const merged=core.resolve(core.merge(base,local,remote),[]);
assert.equal(merged.stepDone.mow,true);assert.equal(merged.trophyEarned.t18,true);assert.equal(merged.future.keep,1);assert.equal(merged.futureRemote.keep,2);
assert.equal(local.trophyEarned.t18,undefined);
const undone=core.resolve(core.merge({...base,stepDone:{mow:true}},{...base,stepDone:{mow:false}},{...base,stepDone:{mow:true}}),[]);assert.equal(undone.stepDone.mow,false);
const imported=core.resolve(model.importPlan({...base,stepDone:{mow:true},futureLocal:{keep:true}},{...base,trophyEarned:{t18:true},futureRemote:{keep:true}}),[]);
assert.equal(imported.stepDone.mow,true);assert.equal(imported.trophyEarned.t18,true);assert.equal(imported.futureLocal.keep,true);assert.equal(imported.futureRemote.keep,true);
const completed={...base,stepDone:Object.fromEntries([...stepIds].map(id=>[id,true])),trophyEarned:Object.fromEntries([...trophyIds].map(id=>[id,true])),futureTop:{keep:'synthetic'}};
completed.stepDone['future-step']=true;completed.trophyEarned['future-trophy']=true;
const reset=model.resetData(completed,{stepIds:[...stepIds],trophyIds:[...trophyIds]});
for(const id of stepIds)assert.equal(reset.stepDone[id],false);for(const id of trophyIds)assert.equal(reset.trophyEarned[id],false);
assert.equal(reset.stepDone['future-step'],true);assert.equal(reset.trophyEarned['future-trophy'],true);assert.equal(reset.futureTop.keep,'synthetic');assert.equal(completed.stepDone.mow,true);
assert.equal(reset.revision,completed.revision+1);assert.equal(reset.moduleVersion,config.moduleVersion);
const resetMerged=core.resolve(core.merge(completed,reset,completed),[]);for(const id of stepIds)assert.equal(resetMerged.stepDone[id],false);for(const id of trophyIds)assert.equal(resetMerged.trophyEarned[id],false);
assert.ok(core.merge(null,reset,completed,{hasBase:false}).conflicts.length>0,'沒有 Base 的舊雲端紀錄應要求選擇，不可自動復活');
for(const wrong of [{gameId:'edf-wb'},{platform:'PS4'},{scope:'dlc'},{schema:2},{stepDone:{mow:'true'}}])assert.throws(()=>model.validate({...base,...wrong}));
assert.equal(model.parse(JSON.stringify({kind:'recoveryBundle',gameId:guide.gameId,localRaw:JSON.stringify(local),sourceRaw:JSON.stringify(remote)})).future.keep,1);
const cloud=await fs.readFile(new URL('cloud-config.js',dir),'utf8');assert.ok(!cloud.includes('edf-wb'));assert.ok(cloud.includes(config.driveFileName));
const adapter=await fs.readFile(new URL('shared/drive-appdata.js',dir),'utf8');assert.ok(adapter.includes("'If-Match':etag"));assert.ok(adapter.includes('!this.verified'));
for(const file of ['shared/drive-appdata.js','shared/google-auth.js','shared/progress-envelope.js'])assert.equal((await fs.readFile(new URL(file,dir),'utf8')).replaceAll('\r\n','\n'),(await fs.readFile(new URL('../edf-wb/dist/'+file,import.meta.url),'utf8')).replaceAll('\r\n','\n'),'重用的安全模組應保持一致：'+file);
const sw=await fs.readFile(new URL('sw.js',dir),'utf8');assert.ok(sw.includes(config.storagePrefix+'assets.'));assert.ok(sw.includes('self.registration.scope'));assert.ok(!sw.includes('caches.match('));
for(const file of ['characters.js','characters.svg','roadmap.js'])assert.ok(sw.includes("'./"+file+"'"),'離線需包含資源：'+file);
assert.ok((await fs.readFile(new URL('index.html',dir),'utf8')).indexOf('src="characters.js"')<(await fs.readFile(new URL('index.html',dir),'utf8')).indexOf('src="app.js"'));
console.log(JSON.stringify({passed:true,module:guide.gameId,trophies:33,mapped:33,steps:steps.length,stages:guide.stages.length,trackers:guide.trackers.length,statuses:Object.fromEntries(['verified','consensus','unverified'].map(status=>[status,steps.filter(step=>step.verificationStatus===status).length]))}));
