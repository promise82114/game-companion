import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {randomUUID,webcrypto} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {roadmap as data} from './dist/data.js';
import {overview,blockers,matches} from './dist/roadmap/model.js';
import {createStore} from './dist/roadmap/store.js';
import {dialogueHtml} from './dist/roadmap/evidence.js';
import {mockDrive} from '../../scripts/fixtures/drive.mjs';
const config=JSON.parse(await fs.readFile(new URL('module.json',import.meta.url),'utf8'));
assert.equal(data.gameId,config.gameId);assert.equal(data.storagePrefix,config.storagePrefix);assert.equal(data.driveFileName,config.driveFileName);
assert.equal(data.stages.length,8);assert.equal(data.trophies.filter(t=>t.category==='base').length,60);assert.equal(data.dlcCount,9);
const ids=new Set(data.steps.map(s=>s.id)),trophyIds=new Set(data.trophies.map(t=>t.id));assert.equal(ids.size,data.steps.length);assert.equal(trophyIds.size,60);
const mapped=new Set(data.steps.flatMap(s=>s.trophyRefs));assert.ok(data.trophies.every(t=>mapped.has(t.id)),'所有本體獎盃都要有名稱對照');
const publishedStepIds='calibration save-safety doge-intro chicken petition schuyler museum purple neutral-route departure-check region-e1 doge-survey team field-basics chase puzzle-time region-e2 single-rod one-lap region-e3 doge-match first-megastructure region-n1 rand-north region-n2 broken-somnodrome region-n3 north-exit sinner text-adventures city-tour city-politics city-exit region-s1 hard-way rand-south region-s2 region-s3 artifacts west-arrival region-w1 region-w3 region-w2 w2-backup working-somnodrome mayor-rand mayor-byron mayor-hermanubis final-city all-puzzles miranda collectibles stars story-audit final-backup ending platinum-audit'.split(' ');
assert.ok(publishedStepIds.every(id=>ids.has(id)),'已發布的 57 步驟 ID 不得因攻略更新消失');
const survey=data.steps.find(s=>s.id==='doge-survey');assert.equal(survey.dialogue.length,7);assert.equal(survey.dialogue.at(-1).id,'doge-prayer');assert.ok(survey.dialogue.every(row=>typeof row.english==='string'&&row.english.length));
assert.ok(data.steps.find(s=>s.id==='rand-north').location.startsWith('N1 '));
assert.ok(data.steps.find(s=>s.id==='doge-match').location.includes('E2–E3'));
const seenContexts=new Set();
for(const step of data.steps)for(const row of step.dialogue||[]){assert.ok(row.id&&row.speaker&&row.context&&row.meaning);assert.ok(row.sources.length);for(const key of row.sources)assert.ok(data.sources[key]);assert.ok(['confirmed','consensus','unverified'].includes(row.verificationStatus));if(row.english===null)assert.equal(row.verificationStatus,'unverified','缺英文不能假裝已查證');if(row.verificationStatus==='confirmed')assert.ok(row.sources.some(id=>['screenshot','transcript'].includes(data.sources[id].kind)));}
for(const branch of data.branches){const step=data.steps.find(s=>s.id===branch.stepId);assert.ok(step.dialogue.length>=10);assert.ok(step.dialogue.some(row=>row.speaker.includes('Cryer')));assert.ok(step.dialogue.some(row=>row.context.includes('VTOL')));assert.equal(step.verificationStatus,'unverified','未實機驗證不得保證三結果');assert.ok(branch.prerequisites.includes('museum'));assert.match(branch.restore,/Download to Console Storage/);assert.match(branch.restore,/不要.*上傳/);seenContexts.add(branch.id);}
assert.equal(seenContexts.size,3);assert.ok(data.steps.find(s=>s.id==='working-somnodrome').dialogue.some(row=>row.english.includes('somnodrome_v2_final_final.bat')));
const escaped=dialogueHtml({title:'synthetic',dialogue:[{id:'synthetic',speaker:'NPC',context:'test',english:null,meaning:'<script>synthetic</script>',sources:['guide'],verificationStatus:'unverified'}]},{escape:s=>String(s).replaceAll('<','&lt;').replaceAll('>','&gt;'),sourceLinks:()=>'',labels:{unverified:'待查證'}});assert.ok(escaped.includes('英文原文待查證'));assert.ok(escaped.includes('&lt;script&gt;'));assert.ok(!escaped.includes('<script>'));
for(const s of data.steps){
 for(const field of ['id','stageId','order','title','description','location','trigger','prerequisites','actions','verification','trophyIds','warningLevel','missable','recovery','backupRecommended','sources','verificationStatus']) assert.ok(Object.hasOwn(s,field),s.id+' / '+field);
 assert.ok(data.stages.some(t=>t.id===s.stageId));assert.ok(['confirmed','consensus','unverified'].includes(s.verificationStatus));assert.ok(s.actions.length);assert.ok(s.sources.length);
 for(const id of s.prerequisites)assert.ok(ids.has(id),s.id+' dependency '+id);
 for(const id of s.trophyRefs)assert.ok(trophyIds.has(id),id);
 for(const key of s.sources)assert.match(data.sources[key].url,/^https:\/\//);
 // 在官方逐盃 ID 未取得前，禁止把自有名稱鍵或清單排序冒充 PSN 數字 ID。
 assert.deepEqual(s.trophyIds,[]);
}
for(const stage of data.stages)assert.deepEqual(data.steps.filter(s=>s.stageId===stage.id).map(s=>s.order),data.steps.filter(s=>s.stageId===stage.id).map((_,i)=>i+1));
const mock=mockDrive(),ctx={window:{navigator:{locks:{request:async(_name,_opts,fn)=>fn({})}}},crypto:{randomUUID,subtle:webcrypto.subtle},URLSearchParams,TextEncoder,AbortController,setTimeout,clearTimeout,fetch:mock.fetch};vm.createContext(ctx);
for(const file of ['sync-core','progress-envelope','drive-appdata','sync-session'])vm.runInContext(await fs.readFile(new URL('dist/shared/'+file+'.js',import.meta.url),'utf8'),ctx);
const core=ctx.window.SideProjectSync,store=createStore(data,core);store.close();
const seed=()=>({gameId:'talos2',schema:1,moduleVersion:'1.0.0',revision:0,updatedAt:1,steps:{},trophies:{},backups:{},branches:{},settings:{}});
const p=seed();assert.equal(overview(data,p).total,60);assert.equal(overview(data,p).earned,0);p.trophies.chicken={earned:true};assert.equal(overview(data,p).earned,1);assert.equal(p.steps.chicken,undefined);p.trophies['dlc-future']={earned:true};assert.equal(overview(data,p).earned,1);
assert.ok(blockers(data,p,'P1').some(s=>s.id==='doge-intro'));p.steps['doge-intro']={status:'skipped'};assert.ok(blockers(data,p,'P1').some(s=>s.id==='doge-intro'));p.steps['doge-intro'].status='completed';assert.ok(!blockers(data,p,'P1').some(s=>s.id==='doge-intro'));
assert.ok(matches(data.steps.find(s=>s.id==='save-safety'),p,'backup'));p.steps['save-safety']={status:'completed'};assert.equal(overview(data,p).backup.id,'save-safety');p.backups['save-safety']={confirmedAt:'2026-10-31T00:00:00Z'};assert.notEqual(overview(data,p).backup?.id,'save-safety');
const unknown={...seed(),future:{keep:true},steps:{'future-step':{status:'unknown',future:7}},trophies:{'future-trophy':{earned:false,future:1}}};assert.equal(store.validate(unknown).data.future.keep,true);assert.equal(store.validate(unknown).data.steps['future-step'].future,7);assert.throws(()=>store.validate({...seed(),gameId:'edf-wb'}));assert.throws(()=>store.validate({...seed(),schema:2}));assert.throws(()=>store.validate({...seed(),steps:{bad:{status:'invented'}}}));
class MemoryStorage{data=new Map();fail=false;getItem(k){return this.data.get(k)??null;}setItem(k,v){if(this.fail)throw Error('synthetic quota');this.data.set(k,String(v));}removeItem(k){this.data.delete(k);}}
let current=seed(),sequence=0;const local={validate:store.validate,get:async()=>core.clone(current),stamp:async()=>JSON.stringify(current),sequence:()=>sequence,checkpoint:async()=>{if(state.fail)throw Error('synthetic quota');},commitSync:async(start,next)=>{current=core.rebase(start,current,next);sequence++;return core.clone(current);}};
const edit=fn=>{fn(current);current.updatedAt++;sequence++;},state=new MemoryStorage(),auth={connected:true,generation:1,token:()=> 'synthetic-a',invalidate(){this.connected=false;this.generation++;}},drive=new ctx.window.SideProjectDrive.DriveAppData(auth,config.driveFileName,{gameId:data.gameId,projectId:data.driveProjectId,writesEnabled:true});
await assert.rejects(drive.write({},null),e=>e.code==='write-disabled');mock.controls.noHeaderEtag=true;const proof=await drive.verifySafety();assert.equal(proof.staleStatus,412);assert.equal(proof.parallelStatuses.filter(n=>n===412).length,1);
const session=new ctx.window.SideProjectSyncSession({drive,local,storage:state,prefix:data.storagePrefix,gameId:data.gameId,projectId:data.driveProjectId,identity:'synthetic-a'});
let review=await session.start();assert.equal(review.first,true);assert.equal([...mock.files.values()].filter(f=>f.name===config.driveFileName).length,0);await session.confirm(review,[]);assert.equal(await session.dirty(),false);
const remote=[...mock.files.values()].find(f=>f.name===config.driveFileName);
edit(p=>p.steps.chicken={status:'completed',note:'local'});remote.value.data.steps.chicken={status:'missed',note:'remote'};remote.version++;review=await session.start();assert.ok(review.plan.conflicts.length);await assert.rejects(session.confirm(review,[]));
edit(p=>p.steps.calibration={status:'completed'});let result=await session.confirm(review,review.plan.conflicts.map(()=>'remote'));assert.equal(result.changed,true);assert.equal(result.kind,'review');result=await session.confirm(result,result.plan.conflicts.map(()=>'remote'));assert.equal(current.steps.chicken.note,'remote');assert.equal(current.steps.calibration.status,'completed');
edit(p=>p.steps.chicken.note='before-upload');mock.controls.beforePatch=()=>{edit(p=>p.steps['save-safety']={status:'completed',note:'during-upload'});mock.controls.beforePatch=null;};result=await session.start();assert.equal(result.dirty,true);assert.equal(current.steps['save-safety'].note,'during-upload');await session.start();
edit(p=>p.branches.rand={status:'completed'});mock.controls.failAfterPatch=true;await assert.rejects(session.start(),e=>e.code==='uncertain');const patches=mock.requests.filter(r=>r.method==='PATCH').length;result=await session.start();assert.equal(result.recovered,true);assert.equal(mock.requests.filter(r=>r.method==='PATCH').length,patches);
edit(p=>p.steps.calibration.note='blocked by quota');state.fail=true;const before=remote.version;await assert.rejects(session.start(),/quota/);assert.equal(remote.version,before);state.fail=false;
const unsafe=new ctx.window.SideProjectDrive.DriveAppData(auth,config.driveFileName,{gameId:data.gameId,projectId:data.driveProjectId,writesEnabled:true});mock.controls.ignoreConditions=true;await assert.rejects(unsafe.verifySafety(),e=>e.code==='unsafe');assert.equal(unsafe.verified,false);mock.controls.ignoreConditions=false;
auth.generation++;assert.equal(drive.verified,false);await assert.rejects(drive.write({},null),e=>e.code==='write-disabled');
// 未修改三個既有模組的底層同步／身份／格式程式。
for(const file of ['google-auth','drive-appdata','progress-envelope'])assert.equal(await fs.readFile(new URL('dist/shared/'+file+'.js',import.meta.url),'utf8'),await fs.readFile(new URL('../edf-wb/dist/shared/'+file+'.js',import.meta.url),'utf8'));
for(const file of ['app.js','data.js','mayor-research.js','roadmap/model.js','roadmap/evidence.js','roadmap/store.js','roadmap/sync.js','shared/sync-core.js','shared/sync-session.js']){const check=spawnSync(process.execPath,['--check',new URL('dist/'+file,import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1')],{encoding:'utf8'});assert.equal(check.status,0,check.stderr);}
console.log(JSON.stringify({passed:true,gameId:data.gameId,stages:8,steps:data.steps.length,baseTrophies:60,dlcExcluded:9,checks:['schema/source/dependency/ID guards','DLC excluded','trophy/step/backup separation','async three-way merge','first pairing','stale preview','in-flight edit preservation','lost acknowledgement recovery','quota before upload','412/racing CAS','unsafe server/grant rejection','unchanged auth/adapter/envelope','syntax']}));
