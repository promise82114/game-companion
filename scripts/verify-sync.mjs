import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {webcrypto,randomUUID} from 'node:crypto';
import {mockDrive} from './fixtures/drive.mjs';
class MemoryStorage{
 data=new Map();fail=false;
 get length(){return this.data.size;}key(i){return [...this.data.keys()][i]??null;}
 getItem(key){return this.data.get(key)??null;}setItem(key,value){if(this.fail)throw Error('Synthetic quota');this.data.set(key,String(value));}removeItem(key){this.data.delete(key);}
}
const results=[];
for(const slug of ['edf-wb','edf-wb2']){
 const mock=mockDrive(),ctx={window:{},crypto:{randomUUID,subtle:webcrypto.subtle},URLSearchParams,TextEncoder,AbortController,setTimeout,clearTimeout,fetch:mock.fetch};
 vm.createContext(ctx);ctx.window.navigator={locks:{request:async(_name,_options,action)=>action({})}};
 const dir=new URL('../games/'+slug+'/dist/',import.meta.url);
 for(const f of ['data','details',...(slug==='edf-wb'?['mission-facts']:[]),'missions','content','cloud-config','shared/progress-envelope','shared/sync-core','shared/drive-appdata','shared/sync-session'])vm.runInContext(await fs.readFile(new URL(f+'.js',dir),'utf8'),ctx);
 ctx.catalog=ctx.window.EDF_CATALOG;ctx.ids=new Set(ctx.catalog.items.map(i=>i.id));ctx.missionIds=new Set(ctx.window.EDF_MISSIONS.rows.map(m=>m.code));ctx.contentIds=new Set(ctx.window.EDF_CONTENT.options.map(o=>o.id));
 const source=await fs.readFile(new URL('app.js',dir),'utf8');vm.runInContext(source.slice(source.indexOf('const fresh='),source.indexOf('function snapshots()'))+'\nwindow.audit={fresh,validate};',ctx);
 const w=ctx.window,c=w.SideProjectSync,{fresh,validate}=w.audit,id=ctx.catalog.items[0].id,id2=ctx.catalog.items[1].id;
 const data=(owned,text='base')=>({...fresh(),entries:{[id]:{owned,updatedAt:1}},missionNotes:{M02:{text,updatedAt:1}}});
 const base=data(true),local=data(false),remote=data(true);let plan=c.merge(base,local,remote);assert.equal(plan.conflicts.length,0);assert.equal(c.resolve(plan,[]).entries[id].owned,false);
 plan=c.merge(base,data(true,'local'),data(true,'remote'));assert.equal(plan.conflicts.length,1);assert.equal(c.resolve(plan,['remote']).missionNotes.M02.text,'remote');assert.throws(()=>c.resolve(plan,[]));
 plan=c.merge(null,local,remote,{hasBase:false});assert.ok(plan.conflicts.length>0);
 const a={...data(true),custom:{a:1}},b={...data(true),custom:{a:1,left:2}},r={...data(true),custom:{a:1,right:3}};plan=c.merge(a,b,r);assert.equal(plan.conflicts.length,0);assert.equal(c.resolve(plan,[]).custom.right,3);
 assert.equal(c.rebase(base,data(true,'during'),data(false,'remote')).missionNotes.M02.text,'during');
 const js=new MemoryStorage(),j1=new c.Journal('test.',js,data(false)),j2=new c.Journal('test.',js,data(false));
 const before1=j1.read(),before2=j2.read();j1.write(before1,{...before1,entries:{...before1.entries,[id]:{owned:true,updatedAt:2}}});j2.write(before2,{...before2,entries:{...before2.entries,[id2]:{owned:true,updatedAt:2}}});assert.equal(j1.read().entries[id].owned,true);assert.equal(j1.read().entries[id2].owned,true);
 // 同步套用時，即使其他分頁在最後一刻寫入，同步 patch 也不能蓋掉該編輯。
 const captured=j1.read();j2.write(captured,{...captured,missionNotes:{M02:{text:'other-tab',updatedAt:3}}});j1.write(captured,{...captured,missionNotes:{M02:{text:'sync-result',updatedAt:4}}},{preserveConcurrent:true});assert.equal(j1.read().missionNotes.M02.text,'other-tab');
 for(let n=0;n<70;n++){const now=j1.read();j1.write(now,{...now,missionNotes:{M02:{text:String(n),updatedAt:n+10}}});}const beforeCompaction=j1.stamp();await j1.compact();assert.equal(j1.stamp(),beforeCompaction);assert.equal(j2.read().missionNotes.M02.text,'69');assert.equal(j1.operations().length,0);
 const auth={connected:true,generation:1,token:()=> 'synthetic-a',invalidate(){this.connected=false;this.generation++;}},config={gameId:slug,projectId:'game-companion.'+slug,writesEnabled:true};
 const drive=new w.SideProjectDrive.DriveAppData(auth,config.projectId+'.progress.v1.json',config);
 await assert.rejects(drive.write({},null),e=>e.code==='write-disabled');
 mock.controls.noHeaderEtag=true;let proof=await drive.verifySafety();assert.equal(proof.etagSource,'v2-json');assert.equal(proof.staleStatus,412);assert.equal(proof.parallelStatuses.filter(s=>s===412).length,1);
 function makeLocal(seed,store=new MemoryStorage()){
  const journal=new c.Journal('progress.',store,seed);let sequence=0;
  return {validate,get:()=>validate(journal.read()).data,sequence:()=>sequence,stamp:()=>journal.stamp(),checkpoint(){if(store.fail)throw Error('Synthetic quota');},commitSync(start,merged){const current=this.get();journal.write(current,c.rebase(start,current,merged),{preserveConcurrent:true});sequence++;return this.get();},edit(fn){const current=this.get(),next=c.clone(current);fn(next);journal.write(current,next);sequence++;},store,journal};
 }
 const state=new MemoryStorage(),l=makeLocal(data(false));const session=new w.SideProjectSyncSession({drive,local:l,storage:state,prefix:'sync.',gameId:slug,projectId:config.projectId,identity:'account-a'});
 let review=await session.start();assert.equal(review.kind,'review');assert.equal(review.first,true);let outcome=await session.confirm(review,[]);assert.equal(outcome.kind,'complete');assert.equal(session.dirty(),false);
 l.edit(d=>d.entries[id].owned=true);mock.controls.beforePatch=()=>{l.edit(d=>d.missionNotes.M02.text='edited-during-upload');mock.controls.beforePatch=null;};
 outcome=await session.start();assert.equal(outcome.kind,'complete');assert.equal(outcome.dirty,true);assert.equal(l.get().missionNotes.M02.text,'edited-during-upload');await session.start();assert.equal(session.dirty(),false);
 // 真正三方衝突與過期預覽：本機在選擇前新增變更，必須重新比較。
 l.edit(d=>d.missionNotes.M02.text='local-conflict');const progress=[...mock.files.values()].find(f=>f.name===drive.fileName);progress.value.data.missionNotes.M02.text='remote-conflict';progress.version++;
 review=await session.start();assert.equal(review.kind,'review');assert.ok(review.plan.conflicts.length>0);
 l.edit(d=>d.entries[id2]={owned:true,updatedAt:5});outcome=await session.confirm(review,review.plan.conflicts.map(()=>'remote'));assert.equal(outcome.changed,true);assert.equal(outcome.kind,'review');outcome=await session.confirm(outcome,outcome.plan.conflicts.map(()=>'remote'));assert.equal(l.get().missionNotes.M02.text,'remote-conflict');assert.equal(l.get().entries[id2].owned,true);
 // 伺服器已寫成功、回應遺失：下一次只能先讀修訂恢復，不重送。
 l.edit(d=>d.missionNotes.M02.text='lost-ack');mock.controls.failAfterPatch=true;await assert.rejects(session.start(),e=>e.code==='uncertain');assert.ok(state.getItem(session.pendingKey));const writes=mock.requests.filter(q=>q.method==='PATCH').length;outcome=await session.start();assert.equal(outcome.recovered,true);assert.equal(mock.requests.filter(q=>q.method==='PATCH').length,writes);
 l.edit(d=>d.entries[id].owned=false);const previous=progress.value.syncRevision;state.fail=true;await assert.rejects(session.start(),/quota/);assert.equal(progress.value.syncRevision,previous);state.fail=false;
 const unsafe=new w.SideProjectDrive.DriveAppData(auth,drive.fileName,config);mock.controls.ignoreConditions=true;await assert.rejects(unsafe.verifySafety(),e=>e.code==='unsafe');assert.equal(unsafe.verified,false);mock.controls.ignoreConditions=false;
 auth.generation++;assert.equal(drive.verified,false);await assert.rejects(drive.write({},null),e=>e.code==='write-disabled');
 results.push({slug,passed:true,checks:['three-way cancel/note/unknown','first pairing','batch conflicts/stale review','two-tab journal/compaction','in-flight edits','lost acknowledgement recovery','quota before write','v2 ETag fallback','stale 412/parallel CAS','unsafe server rejected','account grant invalidation']});
}
console.log(JSON.stringify({passed:true,results}));
