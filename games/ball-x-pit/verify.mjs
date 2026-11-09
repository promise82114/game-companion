import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {configureCatalog,config,clone,fresh,validateProgress,parseImport,condition,matrixCount,clearId,stageComplete} from './dist/model.js';
import {createStore} from '../../shared/roadmap-store.js';
const root=new URL('./',import.meta.url),url=new URL('dist/data/catalog.json',root);
const before=await fs.readFile(url,'utf8');
const gen=spawnSync(process.execPath,['scripts/prepare-data.mjs'],{cwd:root,encoding:'utf8'});assert.equal(gen.status,0,gen.stderr);assert.equal(await fs.readFile(url,'utf8'),before,'研究來源與產出必須一致');
const d=JSON.parse(before);configureCatalog(d);
// 無 Drive ID 的純本機模組不能被誤判成雲端封裝；原封裝契約仍相容。
for(const driveProjectId of [undefined,'synthetic-project']){const store=createStore({...config,driveProjectId},{clone});try{assert.equal(store.validate(fresh()).data.gameId,'ball-x-pit');if(driveProjectId)assert.equal(store.validate({projectId:driveProjectId,data:fresh()}).data.gameId,'ball-x-pit');}finally{store.close();}}
assert.equal(d.levels.length,8);assert.equal(d.characters.filter(c=>c.contentSet==='base').length,16);assert.equal(d.characters.length,22);assert.equal(d.trophies.length,64);
for(const key of ['levels','characters','trophies','buildings','balls','passives','recipes','encyclopedia','roadmapSteps','sourceRefs'])assert.equal(new Set(d[key].map(r=>r.id)).size,d[key].length,key+' duplicate IDs');
for(const key of ['levels','characters','trophies','buildings','balls','passives','recipes','encyclopedia','roadmapSteps'])for(const row of d[key]){assert.ok(row.sourceIds.length,key+row.id);assert.ok(row.sourceIds.every(id=>d.sourceRefs.some(s=>s.id===id)));assert.ok(['source_checked','multi_source','pending','conflict'].includes(row.verification));assert.ok(['base','regal','shadow','naturalist','unknown'].includes(row.contentSet));}
const ids=new Set([...d.balls,...d.passives].map(r=>r.id));
for(const recipe of d.recipes)for(const group of recipe.ingredients){assert.ok(group.length);for(const id of group)assert.ok(ids.has(id),'missing ingredient '+id);}
function visit(id,path=[]){assert.ok(!path.includes(id),'recipe cycle '+id);const recipe=d.recipes.find(r=>r.id===id);if(recipe)recipe.ingredients.flat().forEach(next=>visit(next,[...path,id]));}d.recipes.forEach(r=>visit(r.id));
assert.equal(d.recipes.length,86);assert.equal(d.balls.length,90);assert.equal(d.passives.length,71);assert.equal(d.encyclopedia.length,161);
assert.deepEqual(Object.fromEntries(['base','regal','shadow','naturalist'].map(s=>[s,d.encyclopedia.filter(r=>r.contentSet===s).length])),{base:119,regal:11,shadow:15,naturalist:16});
assert.ok(d.recipes.some(r=>r.ingredients.some(g=>g.length>1)));assert.equal(d.recipes.find(r=>r.id==='nosferatu').ingredients.length,3);assert.equal(d.recipes.find(r=>r.id==='deadeyes-cross').ingredients.length,4);
assert.equal(d.buildings.length,78);assert.equal(d.resourcePlots.length,6);assert.ok(d.buildings.every(b=>b.entryType!=='resource-plot'));assert.equal(d.advice.characters.length,22);assert.equal(new Set(d.advice.characters.map(c=>c.id)).size,22);
for(const r of [...d.advice.characters,...d.advice.generalTips])assert.ok(r.sourceIds.every(id=>d.sourceRefs.some(s=>s.id===id)));
const p=fresh(),warrior=d.trophies.find(t=>t.name==='True Warrior'),conquered=d.trophies.find(t=>t.name==='BONExYARD Conquered');
for(const l of d.levels)p.clears[clearId('warrior',l.id)]=true;
assert.equal(matrixCount(p,d),8);assert.equal(condition(p,d,warrior).possible,true);assert.deepEqual(p.trophyEarned,{});
for(const c of d.characters.filter(c=>c.contentSet==='base').slice(0,10))p.clears[clearId(c.id,d.levels[0].id)]=true;
assert.equal(condition(p,d,conquered).possible,true);p.trophyEarned[warrior.id]=true;p.clears['warrior:bonexyard']=false;assert.equal(condition(p,d,warrior).possible,false);assert.equal(p.trophyEarned[warrior.id],true);
const scholar=d.trophies.find(t=>t.name==='Scholar');for(const row of d.encyclopedia)p.encyclopediaUnlocked[row.id]=true;assert.equal(condition(p,d,scholar).possible,false);
p.futureTop={raw:'synthetic'};p.clears.future={nested:['retained']};assert.deepEqual(parseImport(p).clears.future,p.clears.future);assert.deepEqual(parseImport({gameId:'ball-x-pit',records:[{key:'progress',value:p}]}).futureTop,p.futureTop);
assert.throws(()=>validateProgress({...p,gameId:'grounded'}));assert.throws(()=>validateProgress({...p,schema:99}));assert.throws(()=>validateProgress({...p,clears:{'warrior:bonexyard':'yes'}}));
assert.equal(stageComplete(p,d,d.levels[0]),false);p.stepDone['review-bonexyard']=true;assert.equal(stageComplete(p,d,d.levels[0]),true);
console.log(JSON.stringify({passed:true,module:'ball-x-pit',levels:8,baseMatrix:128,trophies:64,buildings:d.buildings.length,balls:90,passives:71,recipes:86,encyclopedia:161,checks:['reproducible offline catalog','unique IDs and references','recipe branches and acyclic chains','independent PSN flags','base/update isolation','unknown data preservation','invalid schema rejection']}));
