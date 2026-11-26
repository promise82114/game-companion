import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as model from './dist/model.js';
const data=JSON.parse(await fs.readFile(new URL('dist/data.json',import.meta.url),'utf8'));
const layoutManifest=JSON.parse(await fs.readFile(new URL('layout-assets.json',import.meta.url),'utf8'));
const spec=await fs.readFile(new URL('../../a-little-to-the-left_GAME_COMPANION_SPEC.md',import.meta.url),'utf8');
assert.equal(data.specSha256,createHash('sha256').update(spec).digest('hex'));
assert.equal(data.puzzles.length,79);assert.equal(data.trophies.length,48);assert.equal(data.solutions.length,108);assert.equal(data.steps.length,200);
assert.deepEqual(data.chapters.map(c=>data.puzzles.filter(p=>p.chapterId===c.id).length),[20,16,16,15,12]);
for(const group of ['puzzles','solutions','steps','trophies'])assert.equal(new Set(data[group].map(r=>r.id)).size,data[group].length);
const puzzleIds=new Set(data.puzzles.map(p=>p.id)),solutionIds=new Set(data.solutions.map(s=>s.id)),sourceIds=new Set(data.sources.map(s=>s.id));
for(const p of data.puzzles){assert.equal(p.id,'alttl:base:'+p.key);assert.deepEqual(p.solutionIds,p.solutionIds.map((_,i)=>p.id+':s'+String(i+1).padStart(2,'0')));assert.deepEqual(p.stepIds,p.stepIds.map((_,i)=>p.id+':part'+String(i+1).padStart(2,'0')));assert.ok(p.solutionIds.every(id=>solutionIds.has(id)));assert.ok(p.sourceIds.every(id=>sourceIds.has(id)));assert.ok(p.aliases.length>1);assert.ok(p.body.length>20);}
for(const s of data.solutions)assert.ok(puzzleIds.has(s.puzzleId));for(const t of data.trophies)if(t.puzzleId)assert.ok(puzzleIds.has(t.puzzleId));
assert.equal(data.layoutCoverage.required,39);assert.equal(data.layoutCoverage.complete,39);assert.equal(data.layoutCoverage.figures,104);assert.equal(data.layoutCoverage.animations,15);
assert.equal(data.puzzles.filter(p=>p.preciseLayoutStatus==='needed').length,0);
const layouts=data.puzzles.filter(p=>p.layout);assert.equal(layouts.length,39);
const figureIds=new Set();
for(const p of layouts){assert.equal(p.layout.ps5Tested,false);assert.equal(p.preciseLayoutStatus,'verified');assert.ok(p.layout.tables.length&&p.layout.figures.length);assert.ok(p.layout.tables.every(t=>t.rows.length&&t.rows.every(r=>r.length===t.headers.length)));for(const f of p.layout.figures){assert.ok(!figureIds.has(f.figureId));figureIds.add(f.figureId);assert.match(f.sourceUrl,/^https:\/\/(?:steamcommunity.com\/sharedfiles\/filedetails\/\?id=\d+#\d+|www.youtube.com\/watch\?v=cxHiLjN9jVs&t=\d+s)$/);assert.ok(['shared','normal','assist'].includes(f.mode));assert.ok(f.caption.trim());assert.ok(f.width>0&&f.height>0);}}
for(const asset of layoutManifest.assets){assert.match(asset.file,/^layouts\/[a-z0-9-]+\.webp$/);assert.match(asset.originalSha256,/^[0-9a-f]{64}$/);const bytes=await fs.readFile(new URL('dist/'+asset.file,import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WEBP');if(asset.animationFile){const motion=await fs.readFile(new URL('dist/'+asset.animationFile,import.meta.url));assert.equal(createHash('sha256').update(motion).digest('hex'),asset.animationSha256);}}
// 十步移動表以原始九罐局面獨立重放，防止錯抄來源箭頭或少算整段移動。
const cat=layouts.find(p=>p.key==='c02-p13').layout,stacks=structuredClone(cat.initialStacks);
for(const [from,to,n] of cat.moves){assert.ok(stacks[from].length>=n);const moving=stacks[from].splice(-n);assert.ok(moving.every(type=>type===moving[0]));stacks[to].push(...moving);}
assert.deepEqual(stacks,[['pig','pig','pig'],['chicken','chicken','chicken'],['fish','fish','fish']]);
const calendar=layouts.find(p=>p.key==='c01-p12').layout;assert.equal(calendar.stickerIcons.length,8);assert.match(calendar.tables[0].rows[0][1],/10、28/);
assert.equal(layouts.find(p=>p.key==='c04-p12').layout.markers.length,17);assert.equal(layouts.find(p=>p.key==='c05-p11').layout.tables[1].rows.length,7);
const fresh=model.fresh();const legacy=structuredClone(fresh);legacy.moduleVersion='1.0.0';legacy.dataVersion='2026-11-27.1';legacy.solutions['alttl:base:c01-p01:s01']={done:true};assert.deepEqual(model.importData(model.envelope(legacy)),legacy);assert.deepEqual(model.importData(model.envelope(fresh)),fresh);
assert.throws(()=>model.importData({...fresh,gameId:'grounded'}));assert.throws(()=>model.importData({...fresh,schemaVersion:2}));
assert.throws(()=>model.importData({...fresh,counters:{stars:{value:-1}}}));assert.throws(()=>model.importData({...fresh,settings:{consoleDate:{value:'2026-02-30'}}}));
model.validateProgress({...fresh,counters:{stars:{value:null}}});
let p=model.clone(fresh);const store={async update(fn){const next=fn(model.clone(p));model.validateProgress(next);next.revision=p.revision+1;next.updatedAt=Date.now();p=next;return model.clone(next);}};
const a=await model.edit(store,'solutions',data.solutions[0].id,{done:true});await model.edit(store,'trophies',data.trophies[0].id,{done:true});await model.undoEdit(store,a.undo);assert.equal(p.solutions[data.solutions[0].id].done,false);assert.equal(p.trophies[data.trophies[0].id].done,true);
const b=await model.edit(store,'solutions',data.solutions[0].id,{done:true});await model.edit(store,'solutions',data.solutions[0].id,{done:false});await assert.rejects(model.undoEdit(store,b.undo),/後續變更/);
const incoming=model.clone(p);incoming.future={keep:'synthetic'};incoming.solutions['future-id']={done:true,extension:{keep:1}};
const diff=model.differences(p,incoming),merged=model.applyDifferences(model.clone(p),diff,new Set(diff.map(r=>r.group+'/'+r.id)));
assert.equal(merged.future.keep,'synthetic');assert.equal(merged.solutions['future-id'].extension.keep,1);
assert.deepEqual(model.importData(model.envelope(merged)),merged);
assert.equal(model.config.storagePrefix,'game-companion.alttl.');assert.equal(model.config.exportSyncState,false);
console.log(JSON.stringify({passed:true,slug:'a-little-to-the-left',puzzles:79,solutions:108,steps:200,trophies:48,layoutGuides:layouts.length,localFigures:figureIds.size,animations:15,layoutGaps:0}));
