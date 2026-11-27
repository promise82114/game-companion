import {verifyChineseGlossary} from '../../scripts/lib/prepare-chinese-glossary.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const data=JSON.parse(await fs.readFile(new URL('./dist/data.json',import.meta.url),'utf8'));
await verifyChineseGlossary(new URL('./',import.meta.url),data);
assert.equal(data.specSha256,createHash('sha256').update(await fs.readFile(new URL('../../cat-quest-ii_GAME_COMPANION_SPEC.md',import.meta.url))).digest('hex'));
for(const [kind,n] of Object.entries({sideQuest:67,dungeon:73,spell:12,equipment:108,goldChest:22,key:5,royalArt:4,location:1}))assert.equal(data.entities.filter(e=>e.kind===kind).length,n,kind);
assert.equal(data.entities.filter(e=>e.kind==='equipment'&&e.scope==='base-reference').length,101);
assert.equal(data.phases.length,6);assert.equal(data.steps.length,19);assert.equal(data.trophies.length,20);
for(const [grade,n] of Object.entries({'白金':1,'金':8,'銀':5,'銅':6}))assert.equal(data.trophies.filter(t=>t.grade===grade).length,n);
const all=[...data.entities,...data.steps,...data.trophies],ids=new Set(all.map(r=>r.id));assert.equal(ids.size,all.length);
const sourceIds=new Set(data.sources.map(r=>r.id));assert.equal(sourceIds.size,87);assert.equal(data.gaps.length,8);
for(const r of all){for(const id of r.relatedEntityIds||[])assert.ok(ids.has(id),id);for(const s of r.sources)assert.ok(sourceIds.has(s),s);}
const model=await import('data:text/javascript;base64,'+Buffer.from(await fs.readFile(new URL('./dist/model.js',import.meta.url))).toString('base64'));
const p=model.fresh();model.validateProgress(p);model.writeRecord(p,'entities','cq2-sp-healpaw',{done:true});assert.equal(model.count(p,'entities',data.entities.filter(e=>e.kind==='spell')),1);assert.deepEqual(p.trophies,{});
for(const value of [-1,1.5,NaN]){const bad=model.fresh();bad.counters.level={value};assert.throws(()=>model.validateProgress(bad));}
const bad=model.envelope(p);bad.gameId='grounded';assert.throws(()=>model.importData(bad));
assert.equal(model.importData(model.envelope(p)).entities['cq2-sp-healpaw'].done,true);
const legacy=model.fresh();legacy.moduleVersion='1.0.0';legacy.dataVersion='2026-11-27.1';legacy.entities['cq2-eq-chef-vest']={done:true};legacy.entities['future-item']={done:true,unknown:'keep'};assert.equal(model.importData(model.envelope(legacy)).entities['cq2-eq-chef-vest'].done,true);assert.equal(model.importData(model.envelope(legacy)).entities['future-item'].unknown,'keep');
assert.equal(data.steps.find(r=>r.code==='D02').requiredForRoute,false);
assert.equal(data.researchSha256,createHash('sha256').update(await fs.readFile(new URL('./research/locations.mjs',import.meta.url))).digest('hex'));
const equipment=data.entities.filter(e=>e.kind==='equipment'),dungeons=data.entities.filter(e=>e.kind==='dungeon');
assert.deepEqual(data.locationResearch.coverage,{equipment:108,named:72,poolOnly:35,candidateOnly:1,unverified:0,dungeons:73,exploration:26,secretPaths:16});
const byId=id=>data.entities.find(e=>e.id===id);
for(const e of equipment){assert.ok(e.acquisitionRoutes.length);if(!e.acquisitionRoutes.every(r=>r.mode==='optional'))assert.ok(data.steps.some(s=>s.relatedEntityIds.includes(e.id)),'route integration '+e.id);for(const r of e.acquisitionRoutes){assert.equal(r.platformVerified,false);assert.ok(r.where&&r.sourceIds.length);for(const ref of r.sourceIds)assert.ok(sourceIds.has(ref));for(const ref of r.relatedEntityIds)assert.ok(ids.has(ref));}}
for(const e of dungeons.filter(e=>e.exploration)){assert.ok(e.exploration.steps.length);for(const ref of e.exploration.sourceIds)assert.ok(sourceIds.has(ref));assert.equal(e.exploration.platformVerified,false);}
assert.equal(byId('cq2-eq-excalipurr').acquisitionRoutes[0].mode,'candidate');
assert.match(byId('cq2-eq-excalipurr').locationText,/Of Swords and the Worthy（第三段）/);
assert.equal(byId('cq2-eq-chef-vest').acquisitionRoutes[0].relatedEntityIds[0],'cq2-dg-septencin-ruins');
assert.ok(byId('cq2-dg-septencin-ruins').exploration.steps.some(s=>s.includes('左下')));
assert.equal(byId('cq2-dg-fursaken-cave').exploration.walkthroughScope,'source-route');
assert.ok(byId('cq2-dg-fursaken-cave').exploration.steps.some(s=>s.includes('退回兩座島')));
assert.ok(byId('cq2-dg-fursaken-cave').exploration.sourceIds.includes('R52'));
assert.equal(byId('cq2-dg-bat-cove').exploration.type,'secret');
assert.ok(byId('cq2-dg-bat-cove').exploration.uncertainty.includes('入口'));
assert.equal(byId('cq2-eq-excalipurr').acquisitionRoutes[0].relatedEntityIds.length,3);
assert.ok(byId('cq2-dg-ultimutt-stash').exploration.steps.some(s=>s.includes('第一火炬西南')));
assert.ok(byId('cq2-gc-purrsecutor-island').researchConflict.includes('Jester'));
assert.equal(byId('cq2-gc-wall').rewardMode,'pool');
assert.equal(data.steps.some(s=>s.relatedEntityIds.includes('cq2-eq-dark-old-master-staff')),false,'optional Infinity gear stays outside the default route');
// New location rendering and filters never write progress or infer a guaranteed pool reward.
const locationModule=await import('data:text/javascript;base64,'+Buffer.from(await fs.readFile(new URL('./dist/locations.js',import.meta.url))).toString('base64'));
assert.equal(locationModule.matchesResearch(byId('cq2-eq-arcane-staff'),'pool'),true);
assert.equal(locationModule.matchesResearch(byId('cq2-eq-chef-vest'),'named'),true);
assert.equal(locationModule.matchesResearch(byId('cq2-eq-excalipurr'),'uncertain'),true);
assert.equal(locationModule.matchesResearch(byId('cq2-dg-far-fetched-cave'),'secret'),true);
assert.equal(locationModule.matchesResearch(byId('cq2-dg-blue-cave'),'missing'),true);
assert.equal(locationModule.matchesResearch(byId('cq2-dg-bat-cove'),'secret'),true);
assert.equal(locationModule.matchesResearch(byId('cq2-dg-bat-cove'),'uncertain'),true);
console.log('Cat Quest II: catalog, references, thresholds, backup identity and value validation passed.');
