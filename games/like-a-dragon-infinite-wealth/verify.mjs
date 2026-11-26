import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as model from './dist/model.js';
import {collectionCount,routeCollectibles,collectibleSummary} from './dist/collectibles.js';
const root=new URL('./',import.meta.url),read=p=>fs.readFile(new URL(p,root),'utf8');
const data=JSON.parse(await read('dist/data.json')),manifest=JSON.parse(await read('module.json'));
assert.equal(data.sourceSha256,createHash('sha256').update(await fs.readFile(new URL('../../like-a-dragon-infinite-wealth_PLATINUM_GUIDE.md',root))).digest('hex'));
assert.equal(data.gameId,manifest.gameId);assert.equal(manifest.storagePrefix,model.storagePrefix);assert.equal(manifest.cloudWritesEnabled,false);
assert.equal(data.collectiblesSha256,createHash('sha256').update(await fs.readFile(new URL('research/collectibles.json',root))).digest('hex'));
assert.equal(data.collectibles.length,200);assert.equal(new Set(data.collectibles.map(r=>r.id)).size,200);
for(const [type,total] of [['photos',110],['memoirs',90]])assert.equal(data.collectibles.filter(r=>r.type===type).length,total);
assert.equal(data.collectibles.filter(r=>r.type==='photos'&&r.city==='夏威夷').length,70);
assert.equal(data.collectibles.filter(r=>r.type==='photos'&&r.city==='異人町').length,40);
assert.equal(data.collectibles.filter(r=>r.type==='memoirs'&&r.city==='異人町').length,50);
assert.equal(data.collectibles.filter(r=>r.type==='memoirs'&&r.city==='神室町').length,40);
const ids=new Set([...data.collectibles,...data.substories].map(r=>r.id));
for(const r of data.collectibles){for(const key of ['label','originalName','location','actions','unlock','timeOfDay','checkedAt'])assert.ok(typeof r[key]==='string'&&r[key].trim(),r.id+' '+key);assert.ok(data.chapters.some(c=>c.id===r.chapterId));assert.ok(r.sourceRefs.length>=2);for(const id of r.sourceRefs)assert.ok(data.collectibleSources.some(s=>s.id===id));for(const id of r.prerequisites)assert.ok(ids.has(id),id);}
for(const set of data.photoSets)assert.equal(data.collectibles.filter(r=>r.type==='photos'&&r.setId===set.id).length,set.total);
const records=Object.fromEntries(data.collectibles.map(r=>[r.id,r]));
assert.equal(records['memoir-kamurocho-35'].minChapter,8);assert.equal(records['memoir-kamurocho-38'].minChapter,8);
assert.deepEqual(records['memoir-kamurocho-40'].prerequisites,['memoir-kamurocho-39','memoir-ijincho-36']);
assert.equal(records['memoir-ijincho-37'].chapterId,'chapter-finale');assert.equal(records['memoir-kamurocho-06'].minChapter,14);
assert.equal(records['memoir-ijincho-49'].awakeningAll,9);assert.ok(records['photo-dc-05'].prerequisites.includes('SS22'));
assert.equal(routeCollectibles(data,'chapter-04').length,0);assert.equal(routeCollectibles(data,'chapter-05').length,70);assert.equal(routeCollectibles(data,'chapter-finale').length,200);
assert.ok(!routeCollectibles(data,'chapter-08').some(r=>r.id==='memoir-ijincho-37'));
for(const [key,total] of Object.entries({chapters:14,steps:100,trophies:65,substories:52,counters:16,postgame:5})){assert.equal(data[key].length,total,key);assert.equal(new Set(data[key].map(r=>r.id)).size,total);}
assert.equal(data.objectives.filter(r=>r.category==='羈絆劇場').length,40);assert.equal(data.objectives.filter(r=>r.category==='兩座迷宮').length,8);
assert.equal(data.substories.filter(r=>r.route==='預設40條').length,40);
assert.ok(data.chapters[2].substories.includes('SS19'));assert.equal(data.chapters.at(-1).id,'chapter-finale');
for(const c of data.chapters){assert.ok(c.steps.length);for(const id of c.steps)assert.ok(data.steps.some(s=>s.id===id&&s.chapterId===c.id));for(const id of c.substories)assert.ok(data.substories.some(s=>s.id===id));}
let p=model.fresh();p.future={preserve:1};p.substories.SS01={done:true,unknown:{keep:1}};
// 舊版只有總數；不猜測地點，不相加，不改PSN。新逐點紀錄使用既有objectives及同一交易／撤銷契約。
p.counters.photos={value:30};p.counters.memoirs={value:70};assert.equal(collectionCount(data,p,'photos'),0);assert.equal(collectionCount(data,p,'memoirs'),0);
model.writeRecord(p,'objectives','photo-lj-01',{done:true});assert.equal(collectibleSummary(data,p,'photos').done,1);assert.equal(collectibleSummary(data,p,'photos').legacy,30);assert.equal(collectibleSummary(data,p,'photos').total,110);assert.deepEqual(p.trophies,{});
const oldBackup=model.clone(p);delete oldBackup.objectives['photo-lj-01'];const oldDiffs=model.differences(p,oldBackup);model.applyDifferences(p,oldDiffs,new Set(oldDiffs.map(r=>r.group+'/'+r.id)));assert.equal(p.objectives['photo-lj-01'].done,true);
assert.deepEqual(model.importData(model.envelope(p)),p);assert.throws(()=>model.importData({...p,gameId:'grounded'}));assert.throws(()=>model.importData({...p,schema:2}));
const next=model.clone(p);next.substories.SS01={done:false,extra:2};next.counters.photos={value:30};next.futureMore={keep:'synthetic'};
const diffs=model.differences(p,next);model.applyDifferences(p,diffs,new Set(diffs.map(r=>r.group+'/'+r.id)));assert.equal(p.substories.SS01.unknown.keep,1);assert.equal(p.counters.photos.value,30);assert.deepEqual(p.trophies,{});assert.equal(p.future.preserve,1);
const old=model.clone(p);old.counters.photos.updatedAt=1;p.counters.photos.updatedAt=2;const rows=model.differences(p,old);assert.throws(()=>model.applyDifferences(p,rows,new Set(['counters/photos'])));
for(const file of ['app.js','index.html','style.css']){const text=await read('dist/'+file);assert.ok(!/accounts\.google\.com|serviceWorker|localStorage\.(clear|removeItem)/.test(text));}
console.log(JSON.stringify({gameId:model.gameId,passed:true,chapters:14,steps:100,trophies:65,substories:52,photos:110,memoirs:90,sourceHash:true,legacyCounters:'retained-separate'}));
