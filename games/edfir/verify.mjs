import {equipmentNeeds,ownFarmTotals,routeWeapons,adviceHtml,weaponAdviceHtml} from './dist/advice.js';
import {freshWeaponFilters,filterWeapons,sortWeapons} from './dist/weapons.js';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {fresh,clone,validateProgress,migrate,parseImport,setMission,setDifficulty,setDrone,setTrophy,setWeapon,missionDone,droneDone,nextMission,resourcePlan,estimateRuns} from './dist/model.js';
import {itemName,missionGuideHtml,droneAuditHtml} from './dist/guide.js';
const read=async file=>JSON.parse(await fs.readFile(new URL(file,import.meta.url),'utf8'));
const [catalog,droneData,equipment,module]=await Promise.all(['dist/data/catalog.json','dist/data/drones.json','dist/data/equipment.json','module.json'].map(read));
const {missions,trophies}=catalog,{drones}=droneData,{weapons}=equipment;
assert.equal(missions.length,52);assert.equal(trophies.length,44);assert.equal(drones.length,55);
const unique=rows=>assert.equal(new Set(rows.map(row=>row.id)).size,rows.length);
for(const rows of [missions,trophies,drones,weapons])unique(rows);
for(const [grade,count]of Object.entries({platinum:1,gold:4,silver:7,bronze:32}))assert.equal(trophies.filter(t=>t.grade.toLowerCase()===grade).length,count);
assert.deepEqual(missions.map(m=>m.number),Array.from({length:52},(_,i)=>i+1));
assert.equal(drones.filter(d=>!d.missionId).length,3);
const sourceIds=new Set([...catalog.sources,...droneData.sources,...equipment.sources].map(s=>s.id));
for(const rows of [missions,trophies,drones,weapons,...['items','cosmetics','paGear','mercenary','challenges'].map(key=>equipment[key])])for(const row of rows){assert.ok(row.sourceIds.length>0);for(const id of row.sourceIds)assert.ok(sourceIds.has(id),'未知來源 '+id);}
for(const m of missions){assert.ok(m.officialName);assert.equal(drones.filter(d=>d.missionId===m.id).length,1);assert.equal(m.droneId,drones.find(d=>d.missionId===m.id).id);for(const id of m.weaponIds)assert.ok(weapons.find(w=>w.id===id).missionIds.includes(m.id));}
for(const d of drones)for(const key of ['route','direction','landmark','recommendedGear'])assert.ok(d[key]?.length>0,'位置欄缺漏 '+d.id+' '+key);
for(const t of trophies){assert.ok(t.officialName&&t.officialDescription&&t.howTo.length);for(const id of t.missionIds)assert.ok(missions.some(m=>m.id===id));for(const id of t.weaponIds)assert.ok(weapons.find(w=>w.id===id).trophyIds.includes(t.id));}
for(const w of weapons){assert.ok(w.baseGame);assert.ok(w.unlockCondition);for(const key of ['credits','red','blue','yellow'])assert.ok(w.price[key]===null||Number.isSafeInteger(w.price[key])&&w.price[key]>=0);}
// 逐關詳情不再以通用步驟代替；未實機／未核英文與隔離獎勵必須保留。
assert.equal(catalog.coverage.missionDetails,52);assert.equal(catalog.coverage.enemyLists,52);
assert.ok(catalog.coverage.rewardRows>=600);assert.ok(catalog.coverage.excludedRewardRows>=16);
assert.ok(weapons.length>=52);assert.equal(new Set(weapons.map(w=>w.type)).size,14);assert.ok(equipment.items.length>=20);assert.ok(equipment.cosmetics.length>=13);
for(const m of missions){
 assert.ok(m.enemies.length&&m.tactics.length>=3&&m.strategyScope&&m.fieldVerification);
 assert.ok(['none-listed','listed','unverified'].includes(m.bossStatus));
 assert.ok(m.pendingFields.length,'來源查證不得冒充實機完整驗證');
 for(const reward of [...m.unlockRewards,...m.excludedRewards]){assert.ok(reward.displayName&&reward.difficulty&&reward.sourceIds.length);for(const id of reward.sourceIds)assert.ok(sourceIds.has(id),m.id+' 獎勵未知來源 '+id);}
 for(const reward of m.unlockRewards){assert.notEqual(reward.baseGame,false);assert.doesNotMatch(itemName(reward),/銀鷲|Golden Storm/i);if(reward.weaponId)assert.ok(weapons.find(w=>w.id===reward.weaponId).missionIds.includes(m.id));}
}
assert.equal(drones.filter(d=>d.verification==='source-reconciled').length,6);assert.equal(droneData.audit.reviewed.length,7);
assert.deepEqual(droneData.audit.unresolved,['drone-m32']);assert.equal(drones.find(d=>d.id==='drone-m32').candidateRoutes.length,2);
for(const d of drones.filter(d=>d.resolution))for(const row of d.resolution.evidence)assert.ok(sourceIds.has(row.sourceId));
const htmlEscape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const synthetic=clone(missions[0]);synthetic.tactics[0]='<img src=x onerror=alert(1)>';synthetic.unlockRewards[0]={...synthetic.unlockRewards[0],officialName:null,displayName:null,nameJa:'<script>synthetic</script>'};
const rendered=missionGuideHtml(synthetic,{escape:htmlEscape,sourceLinks:()=>''});assert.doesNotMatch(rendered,/<script>|<img|\[object Object\]/);assert.match(rendered,/&lt;script&gt;synthetic/);assert.match(rendered,/英名待核/);
assert.match(droneAuditHtml(drones.find(d=>d.id==='drone-m32'),{escape:htmlEscape,sourceLinks:()=>''}),/保留候選位置/);
// 既有穩定 ID 與人工進度語意不能因擴庫改變。
const original=await read('research/equipment-research.json');for(const row of original.weapons)assert.equal(weapons.find(w=>w.id===row.id).officialName,row.officialName);
const p=fresh();p.futureTop={keep:'synthetic'};p.drones['future-drone']={futureShape:[1,2]};p.missions['future-mission']={futureShape:'keep'};p.trophies['future-trophy']={futureShape:23};validateProgress(p);assert.equal(p.settings.goal,'platinum');
setDifficulty(p,'m25','Hard',true);assert.ok(missionDone(p,'m25'));assert.equal(p.missions.m01,undefined);setMission(p,'m25',false);assert.equal(missionDone(p,'m25'),false);
setDrone(p,'drone-m25','confirmed');assert.ok(droneDone(p,'drone-m25'));assert.equal(missionDone(p,'m25'),false);assert.equal(p.trophies.t38,undefined);
setTrophy(p,'t38',true);for(const d of drones)setDrone(p,d.id,'confirmed');setDrone(p,'drone-m25','unknown');assert.equal(p.trophies.t38.earned,true);assert.equal(droneDone(p,'drone-m25'),false);
setWeapon(p,weapons[0].id,'unlocked',true);assert.equal(p.weapons[weapons[0].id].purchased,false);setWeapon(p,weapons[0].id,'purchased',true);validateProgress(p);
assert.equal(nextMission(p,missions).id,'m01');p.settings.currentMission='m25';assert.equal(nextMission(p,missions).id,'m25');
assert.deepEqual(parseImport(JSON.parse(JSON.stringify(p))),p);
assert.deepEqual(parseImport({gameId:'edfir',records:[{key:'progress',value:p}]}),p);
const recovery={gameId:'edfir',recoveryBundle:{localRaw:JSON.stringify(p),sourceRaw:JSON.stringify(fresh())}};assert.deepEqual(parseImport(recovery),p);assert.deepEqual(parseImport(recovery,'sourceRaw'),parseImport(JSON.parse(recovery.recoveryBundle.sourceRaw)));
for(const corrupt of [{...p,gameId:'grounded'},{...p,schema:99},{...p,scope:'dlc'},{...p,resources:{...p.resources,credits:-1}},{...p,missions:{m01:{done:true,difficulties:[]}}}])assert.throws(()=>parseImport(corrupt));
const old=clone(p);old.schema=0;delete old.schemaVersion;delete old.equipment;delete old.farmRuns;delete old.resources;assert.equal(migrate(old).schemaVersion,1);assert.equal(migrate(old).futureTop.keep,'synthetic');
const plan=fresh(),priced=weapons.find(w=>Object.values(w.price).every(Number.isSafeInteger));plan.weapons[priced.id]={unlocked:true,purchased:false,target:true};plan.resources.credits=10;const need=resourcePlan(plan,weapons);assert.equal(need.total.credits,priced.price.credits);assert.equal(need.missing.credits,Math.max(0,priced.price.credits-10));plan.weapons[priced.id].purchased=true;assert.equal(resourcePlan(plan,weapons).total.credits,0);
assert.equal(estimateRuns({runs:2,yield:{credits:100,red:10,blue:10,yellow:0}},{credits:120,red:1,blue:0,yellow:0}),3);assert.equal(estimateRuns({runs:1,yield:{credits:100,red:0,blue:0,yellow:0}},{credits:0,red:1,blue:0,yellow:0}),null);
// 最終 adapter 防線使用既有程式與本模組識別；未驗證 grant 不能寫入。
const context={window:{}};vm.createContext(context);vm.runInContext(await fs.readFile(new URL('../talos2/dist/shared/drive-appdata.js',import.meta.url),'utf8'),context);
const drive=new context.window.SideProjectDrive.DriveAppData({token(){throw Error('不能取得 Token');}},module.driveFileName,{gameId:module.gameId,projectId:module.driveProjectId,writesEnabled:true});
await assert.rejects(drive.write(p,null),error=>error.code==='write-disabled');
// 本模組資料形狀通過既有非同步三方 session；只使用合成 remote 與記憶體 storage。
context.crypto=crypto;
for(const name of ['sync-core','progress-envelope','sync-session'])vm.runInContext(await fs.readFile(new URL('../talos2/dist/shared/'+name+'.js',import.meta.url),'utf8'),context);
const core=context.window.SideProjectSync,envelope=context.window.SideProjectProgress;
let state=fresh(),sequence=0,remote=null,writes=0,failWrite=false,inFlight;
const memory=new Map(),storage={getItem:key=>memory.get(key)||null,setItem:(key,value)=>memory.set(key,value),removeItem:key=>memory.delete(key)};
const local={get:async()=>clone(state),stamp:async()=>JSON.stringify(state),sequence:()=>sequence,validate:value=>({data:validateProgress(clone(value))}),checkpoint:async()=>{},commitSync:async(start,merged)=>{state=validateProgress(core.rebase(start,state,merged));state.revision++;sequence++;return clone(state);}};
const fakeDrive={verified:true,read:async()=>clone(remote),allocate:async()=>'synthetic-edfir',write:async(value,previous)=>{writes++;if(failWrite)throw Object.assign(Error('synthetic 412'),{code:'conflict'});if(previous&&previous.etag!==remote?.etag)throw Error('stale etag');if(inFlight)inFlight();remote={file:{id:'synthetic-edfir'},etag:'"'+writes+'"',value:clone(value)};return clone(remote);}};
const session=new context.window.SideProjectSyncSession({drive:fakeDrive,local,storage,prefix:module.storagePrefix,gameId:'edfir',projectId:module.driveProjectId,identity:'synthetic',check(){}});
let syncReview=await session.start();assert.equal(syncReview.first,true);assert.equal(writes,0);assert.equal((await session.confirm(syncReview,[])).kind,'complete');
state.drones['drone-m01']={status:'confirmed'};state.trophies.t38={earned:true};sequence++;
// 在上傳期間的另一分頁編輯優先保留，不能被較舊的 merged 覆蓋。
inFlight=()=>{state.missions.m02={done:true,difficulties:{}};state.trophies.t38.earned=false;sequence++;};
assert.equal((await session.start()).dirty,true);assert.equal(state.missions.m02.done,true);assert.equal(state.trophies.t38.earned,false);inFlight=null;
assert.equal((await session.start()).kind,'complete');
// Local / Remote 同欄位衝突需明確選擇，選完再次讀取；過期預覽不能寫。
state.resources.credits=100;sequence++;remote.value.data.resources.credits=200;remote.etag='"external"';syncReview=await session.start();assert.ok(syncReview.plan.conflicts.length);assert.equal(syncReview.kind,'review');
state.resources.red=1;sequence++;const beforeWrite=writes,changed=await session.confirm(syncReview,syncReview.plan.conflicts.map(()=>'local'));assert.equal(changed.changed,true);assert.equal(writes,beforeWrite);
failWrite=true;await assert.rejects(session.confirm(changed,changed.plan.conflicts.map(()=>'local')),/412/);assert.ok(memory.has(module.storagePrefix+'sync.pending.synthetic'));assert.equal(state.resources.credits,100);
failWrite=false;
// pending 上次失敗仍先讀取核對；使用者再確認後才會寫入。
syncReview=await session.start();assert.equal(syncReview.kind,'review');assert.equal((await session.confirm(syncReview,syncReview.plan.conflicts.map(()=>'local'))).kind,'complete');assert.equal(state.resources.credits,100);assert.equal(state.trophies.t38.earned,false);
assert.ok([...memory.keys()].every(key=>key.startsWith(module.storagePrefix+'sync.')));
console.log(JSON.stringify({passed:true,module:'edfir',missions:52,drones:55,trophiesIncludingPlatinum:44,weapons:weapons.length,weaponCoverage:'partial',checks:['IDs and source integrity','bidirectional relations','independent trophy confirmation','difficulty and Drone state','schema0 import migration','cross-game rejection','resource gaps and player estimates','unverified Drive writes blocked']}));

// 舊目標與多態紀錄仍可讀；只在明確勾選時變更。
for(const goal of ['story','experience','platinum']){const old=fresh();old.settings.goal=goal;old.drones['drone-m01']={status:'unknown',note:'keep'};validateProgress(old);assert.equal(old.drones['drone-m01'].status,'unknown');assert.equal(old.settings.goal,goal);}
const wf=freshWeaponFilters(),wp=fresh();
assert.equal(filterWeapons(weapons,wp,wf).length,weapons.length);
Object.assign(wf,{search:'Ｍ２ Outrage',type:'Assault Rifle',rank:'E',kind:'mission',mission:'m02',unpurchased:true,locked:true});
assert.deepEqual(filterWeapons(weapons,wp,wf).map(w=>w.id),['weapon-aw-outrage']);
setWeapon(wp,'weapon-aw-outrage','purchased',true);assert.equal(filterWeapons(weapons,wp,wf).length,0);assert.equal(filterWeapons(weapons,wp,wf,{ignoreChecks:true}).length,1);assert.equal(wp.weapons['weapon-aw-outrage'].unlocked,false);
assert.equal(sortWeapons(weapons,'credits').at(-1).price.credits,null);
console.log('EDFIR platinum UI compatibility and intersecting checklist filters passed');

const advice=await read('dist/data/advice.json'),adviceSources=new Set([...sourceIds,...advice.sources.map(s=>s.id)]);
for(const rows of [advice.earlyRoutes,advice.farms]){unique(rows);for(const row of rows){assert.ok(row.steps.length>=2&&row.caution&&row.basis);for(const id of row.sourceIds)assert.ok(adviceSources.has(id));for(const id of row.weaponIds)assert.ok(weapons.some(w=>w.id===id));for(const id of row.missionIds||[row.missionId])assert.ok(missions.some(m=>m.id===id));}}
for(const row of advice.weaponNotes){assert.ok(weapons.some(w=>w.id===row.weaponId));for(const id of row.sourceIds)assert.ok(adviceSources.has(id));assert.ok(row.good&&row.avoid);}
assert.equal(advice.farms.length,5);assert.equal(advice.earlyRoutes.length,4);assert.equal(weapons.length,55);assert.ok(missions.every(m=>equipmentNeeds(m).length>0));
const empty=fresh(),before=JSON.stringify(empty);assert.equal(routeWeapons(advice.earlyRoutes[2],weapons).length,2);assert.deepEqual(ownFarmTotals(empty,'m46','Disaster'),{runs:0,minutes:0,credits:0});assert.equal(JSON.stringify(empty),before);
empty.farmRuns.a={missionId:'m46',difficulty:'Disaster',runs:2,minutes:10,yield:{credits:20000}};empty.farmRuns.b={missionId:'m46',difficulty:'Normal',runs:1,minutes:5,yield:{credits:99999}};assert.deepEqual(ownFarmTotals(empty,'m46','Disaster'),{runs:2,minutes:10,credits:20000});
const pt=weapons.find(w=>w.id==='weapon-pt-linked-energy-blaster');assert.equal(pt.price.red,null);empty.weapons[pt.id]={unlocked:false,purchased:false,target:true};assert.deepEqual(resourcePlan(empty,weapons).unknown,[pt.id]);
assert.doesNotMatch(weapons.map(w=>w.recommendedUse).join(' '),/先在 Practice 試射再決定購買/);
console.log('EDFIR sourced early routes, farming prerequisites, own-sample isolation and partial PT budget passed');

const hostile='<img src=x onerror=alert(1)>',safe=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;'),safeAdvice=adviceHtml({data:{...advice,principles:[{title:hostile,text:hostile}],earlyRoutes:[],farms:[],exclusions:[]},mission:{...missions[0],enemies:[hostile],recommendedEquipment:[hostile],warnings:[hostile]},missions:[missions[0]],weapons,progress:fresh(),escape:safe,option:()=>'',button:()=>'',sourceLinks:()=>''});assert.ok(safeAdvice.includes('&lt;img'));assert.ok(!safeAdvice.includes(hostile));
