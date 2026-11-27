import {verifyChineseGlossary} from '../../scripts/lib/prepare-chinese-glossary.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as m from './dist/model.js';
const root=new URL('./',import.meta.url),d=JSON.parse(await fs.readFile(new URL('dist/data.json',root))),manifest=JSON.parse(await fs.readFile(new URL('module.json',root)));
await verifyChineseGlossary(root,d);
assert.equal(d.specHash,createHash('sha256').update(await fs.readFile(new URL('../../cat-quest-iii_GAME_COMPANION_SPEC.md',root))).digest('hex'));
assert.equal(d.supplementHash,createHash('sha256').update(JSON.stringify(JSON.parse(await fs.readFile(new URL('research.json',root))))).digest('hex'));
const followup=JSON.parse(await fs.readFile(new URL('followup-research.json',root)));assert.equal(d.followupHash,createHash('sha256').update(JSON.stringify(followup)).digest('hex'));assert.equal(d.reviewedIds.length,20);assert.equal(new Set(d.reviewedIds).size,20);for(const id of d.reviewedIds){const row=d.entities.find(e=>e.id===id);assert.ok(row?.review?.remaining);for(const ref of row.review.sourceIds)assert.ok(d.sources.some(s=>s.id===ref));}
assert.equal(manifest.gameId,m.gameId);assert.equal(manifest.storagePrefix,m.storagePrefix);assert.equal(manifest.cloudWritesEnabled,false);
assert.equal(d.steps.length,19);assert.equal(d.trophies.length,31);assert.equal(d.chapters.length,4);
for(const [kind,n] of Object.entries({equipment:96,puzzle:12,reward:12,secret:6,ripple:8,lost:6,book:3,key:5,spell:10,bounty:22,'ship-passive':13,cannonpaw:4,encounter:3}))assert.equal(d.entities.filter(e=>e.kind===kind).length,n,kind);
for(const [category,n] of [['head',24],['body',24],['melee',17],['ranged',10],['trinket',21]])assert.equal(d.entities.filter(e=>e.category===category).length,n);
const all=[...d.entities,...d.steps,...d.trophies],ids=new Set(all.map(e=>e.id));assert.equal(ids.size,all.length);
for(const e of d.entities){assert.ok(d.steps.some(s=>s.id===e.route),e.id);assert.ok(e.tip);assert.ok(e.sourceIds.length);for(const id of e.sourceIds)assert.ok(d.sources.some(s=>s.id===id),id);}
for(const s of d.steps){assert.ok(d.chapters.some(c=>c.id===s.chapterId));for(const id of s.entityIds)assert.ok(d.entities.some(e=>e.id===id));}
const previousIds=JSON.parse(await fs.readFile(new URL('identity-baseline-1.0.json',root)));
for(const group of ['steps','entities','trophies'])assert.deepEqual(d[group].map(r=>r.id),previousIds[group],group+' ID stability');
const researched=d.entities.filter(e=>['equipment','ship-passive','cannonpaw'].includes(e.kind));
assert.equal(researched.length,113);
for(const row of researched){assert.ok(row.location,row.id);assert.ok(Array.isArray(row.prerequisites));assert.ok(row.instructions.length>=2,row.id);assert.ok(['cross-checked','single-source','conflicting'].includes(row.evidence),row.id);if(row.evidence==='conflicting')assert.ok(row.caveat,row.id);}
for(const [id,pattern] of [['cq3-equip-body-fire-mage-vest',/Lovepurr|Heartpurreak/],['cq3-ship-ship-hull-plus-plus',/Antares/],['cq3-ship-firing-rate-plus-plus',/Heartpurreak/],['cq3-ship-ammo-capacity-plus-plus',/人魚/],['cq3-equip-melee-blade-of-orion',/二樓/]])assert.match(d.entities.find(e=>e.id===id).location+' '+d.entities.find(e=>e.id===id).tip,pattern);
console.log(JSON.stringify({equipmentGuides:96,shipPassives:13,cannonpaws:4,equipmentEvidence:Object.fromEntries(['cross-checked','single-source','conflicting'].map(key=>[key,researched.filter(e=>e.kind==='equipment'&&e.evidence===key).length]))}));
assert.equal(d.entities.find(e=>e.id==='cq3-ship-ship-hull-plus').evidence,'cross-checked');assert.match(d.entities.find(e=>e.id==='cq3-ship-ship-hull-plus').location,/Long Island.*Fort Tail/);assert.match(d.entities.find(e=>e.id==='cq3-ship-ship-hull-plus-plus').prerequisites.join(' '),/不要求/);assert.equal(d.entities.find(e=>e.id==='cq3-ship-ammo-capacity-plus-plus').route,'cq3-r12');assert.equal(d.entities.find(e=>e.id==='cq3-cannonpaw-super-cannonpaw').evidence,'single-source');
const p=m.fresh();m.writeRecord(p,'facts','cq3-book-furrlorn',{done:true});assert.equal(p.facts['cq3-book-furrlorn'].done,true);assert.deepEqual(p.trophies,{});assert.deepEqual(p.steps,{});
assert.deepEqual(m.importData(m.envelope(p)),p);
const oldProgress={...m.fresh(),moduleVersion:'1.0.0',dataVersion:'2026-11-27.1'};oldProgress.facts['cq3-equip-head-pirate-bandana']={done:true,keyRevision:1};oldProgress.facts['unknown-from-old-file']={done:false,custom:'keep'};assert.deepEqual(m.importData(m.envelope(oldProgress)),oldProgress);
for(const bad of [{...p,gameId:'grounded'},{...p,schemaVersion:2},{...p,counters:{chests:{value:-1}}},{...p,facts:{x:{done:'yes'}}},JSON.parse(JSON.stringify(p).replace('"facts":{','"facts":{"__proto__":{},'))])assert.throws(()=>m.validateProgress(bad));
const q=m.clone(p);q.facts.future={done:true,unknown:{keep:1}};const rows=m.differences(p,q);const merged=m.applyDifferences(m.clone(p),rows,new Set(rows.map(r=>r.group+'/'+r.id)));assert.equal(merged.facts.future.unknown.keep,1);
console.log('Cat Quest III: data, references, namespace, validation and unknown preservation passed.');
