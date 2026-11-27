import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const data=JSON.parse(await fs.readFile(new URL('./dist/data.json',import.meta.url),'utf8'));
assert.equal(data.specSha256,createHash('sha256').update(await fs.readFile(new URL('../../cat-quest-ii_GAME_COMPANION_SPEC.md',import.meta.url))).digest('hex'));
for(const [kind,n] of Object.entries({sideQuest:67,dungeon:73,spell:12,equipment:108,goldChest:22,key:5,royalArt:4,location:1}))assert.equal(data.entities.filter(e=>e.kind===kind).length,n,kind);
assert.equal(data.entities.filter(e=>e.kind==='equipment'&&e.scope==='base-reference').length,101);
assert.equal(data.phases.length,6);assert.equal(data.steps.length,19);assert.equal(data.trophies.length,20);
for(const [grade,n] of Object.entries({'白金':1,'金':8,'銀':5,'銅':6}))assert.equal(data.trophies.filter(t=>t.grade===grade).length,n);
const all=[...data.entities,...data.steps,...data.trophies],ids=new Set(all.map(r=>r.id));assert.equal(ids.size,all.length);
const sourceIds=new Set(data.sources.map(r=>r.id));assert.equal(sourceIds.size,33);assert.equal(data.gaps.length,8);
for(const r of all){for(const id of r.relatedEntityIds||[])assert.ok(ids.has(id),id);for(const s of r.sources)assert.ok(sourceIds.has(s),s);}
const model=await import('data:text/javascript;base64,'+Buffer.from(await fs.readFile(new URL('./dist/model.js',import.meta.url))).toString('base64'));
const p=model.fresh();model.validateProgress(p);model.writeRecord(p,'entities','cq2-sp-healpaw',{done:true});assert.equal(model.count(p,'entities',data.entities.filter(e=>e.kind==='spell')),1);assert.deepEqual(p.trophies,{});
for(const value of [-1,1.5,NaN]){const bad=model.fresh();bad.counters.level={value};assert.throws(()=>model.validateProgress(bad));}
const bad=model.envelope(p);bad.gameId='grounded';assert.throws(()=>model.importData(bad));
assert.equal(model.importData(model.envelope(p)).entities['cq2-sp-healpaw'].done,true);
assert.equal(data.steps.find(r=>r.code==='D02').requiredForRoute,false);
console.log('Cat Quest II: catalog, references, thresholds, backup identity and value validation passed.');
