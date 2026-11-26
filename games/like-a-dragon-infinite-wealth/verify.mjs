import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as model from './dist/model.js';
const root=new URL('./',import.meta.url),read=p=>fs.readFile(new URL(p,root),'utf8');
const data=JSON.parse(await read('dist/data.json')),manifest=JSON.parse(await read('module.json'));
assert.equal(data.sourceSha256,createHash('sha256').update(await fs.readFile(new URL('../../like-a-dragon-infinite-wealth_PLATINUM_GUIDE.md',root))).digest('hex'));
assert.equal(data.gameId,manifest.gameId);assert.equal(manifest.storagePrefix,model.storagePrefix);assert.equal(manifest.cloudWritesEnabled,false);
for(const [key,total] of Object.entries({chapters:14,steps:100,trophies:65,substories:52,counters:16,postgame:5})){assert.equal(data[key].length,total,key);assert.equal(new Set(data[key].map(r=>r.id)).size,total);}
assert.equal(data.objectives.filter(r=>r.category==='羈絆劇場').length,40);assert.equal(data.objectives.filter(r=>r.category==='兩座迷宮').length,8);
assert.equal(data.substories.filter(r=>r.route==='預設40條').length,40);
assert.ok(data.chapters[2].substories.includes('SS19'));assert.equal(data.chapters.at(-1).id,'chapter-finale');
for(const c of data.chapters){assert.ok(c.steps.length);for(const id of c.steps)assert.ok(data.steps.some(s=>s.id===id&&s.chapterId===c.id));for(const id of c.substories)assert.ok(data.substories.some(s=>s.id===id));}
let p=model.fresh();p.future={preserve:1};p.substories.SS01={done:true,unknown:{keep:1}};
assert.deepEqual(model.importData(model.envelope(p)),p);assert.throws(()=>model.importData({...p,gameId:'grounded'}));assert.throws(()=>model.importData({...p,schema:2}));
const next=model.clone(p);next.substories.SS01={done:false,extra:2};next.counters.photos={value:30};next.futureMore={keep:'synthetic'};
const diffs=model.differences(p,next);model.applyDifferences(p,diffs,new Set(diffs.map(r=>r.group+'/'+r.id)));assert.equal(p.substories.SS01.unknown.keep,1);assert.equal(p.counters.photos.value,30);assert.deepEqual(p.trophies,{});assert.equal(p.future.preserve,1);
const old=model.clone(p);old.counters.photos.updatedAt=1;p.counters.photos.updatedAt=2;const rows=model.differences(p,old);assert.throws(()=>model.applyDifferences(p,rows,new Set(['counters/photos'])));
for(const file of ['app.js','index.html','style.css']){const text=await read('dist/'+file);assert.ok(!/accounts\.google\.com|serviceWorker|localStorage\.(clear|removeItem)/.test(text));}
console.log(JSON.stringify({gameId:model.gameId,passed:true,chapters:14,steps:100,trophies:65,substories:52,sourceHash:true}));
