import {textScreenedIds,sourceComparedIds,puzzleReviewLevel,puzzleReviewCounts,correctedFindings,sourceGapIds,reviewedIds} from './dist/puzzle-audit.js';
import {storyMaps} from './dist/story-maps.js';
import {storySources,storyRoutes} from './dist/story-data.js';
import {megaBridges,bridgeCoverage} from './dist/bridge-data.js';
import {bridgeHtml} from './dist/roadmap/bridges.js';
import {storyWaypoints,waypointProgressId,routeItemsForStep,storyRouteHtml} from './dist/roadmap/story.js';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {randomUUID,webcrypto} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {roadmap as data} from './dist/data.js';
import {safetyChecks} from './dist/ux-safety.js';
import {childIds,needsAttention,nextAction} from './dist/roadmap/attention.js';
import {overview,blockers,matches} from './dist/roadmap/model.js';
import {createStore} from './dist/roadmap/store.js';
import {dialogueHtml} from './dist/roadmap/evidence.js';
import {trophyNamesZhTW,trophyNameSource,trophyLabel} from './dist/trophy-names.js';
import {puzzles,puzzleGroups,puzzleProgressId,puzzleHtml} from './dist/roadmap/solutions.js';
import {collectionRegions,collectionItems,artifactCandidates,collectionProgressId,collectionTotals,regionCounts,counterKey,readCounter} from './dist/roadmap/collections.js';
import {humanArtifacts,artifactProgressId,artifactDone,artifactCounts} from './dist/roadmap/artifacts.js';
import {roadmapSections,sectionForStep} from './dist/roadmap/navigation.js';
import {regionMaps,mapSvg} from './dist/roadmap/maps.js';
import {starRoutes,starPointId} from './dist/star-navigation-data.js';
import {starNavigationHtml} from './dist/roadmap/stars.js';
import {trophyGuides,trophyProgress} from './dist/roadmap/trophies.js';
import {trophyConditions} from './dist/trophy-guide-data.js';
import {mockDrive} from '../../scripts/fixtures/drive.mjs';
const config=JSON.parse(await fs.readFile(new URL('module.json',import.meta.url),'utf8'));
assert.equal(data.gameId,config.gameId);assert.equal(data.storagePrefix,config.storagePrefix);assert.equal(data.driveFileName,config.driveFileName);
assert.equal(data.moduleVersion,config.moduleVersion);
assert.equal(trophyNamesZhTW.length,60);assert.equal(new Set(trophyNamesZhTW.map(t=>t.exophaseId)).size,60);
assert.equal(new Set(trophyNamesZhTW.map(t=>t.officialName)).size,60);
for(const t of data.trophies){const localized=trophyNamesZhTW.find(row=>row.officialName===t.officialName);assert.ok(localized,t.officialName);assert.equal(t.nameZhTW,localized.nameZhTW);assert.match(t.nameZhTW,/\p{Script=Han}/u);assert.equal(t.exophaseId,localized.exophaseId);assert.equal(t.nameCheckedAt,trophyNameSource.checkedAt);assert.equal(t.officialId,null);assert.equal(t.id,t.officialName.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,''));}
assert.equal(trophyLabel(data.trophies.find(t=>t.id==='chicken')),'Chicken（膽小鬼）');
assert.equal(data.stages.length,8);assert.equal(data.trophies.filter(t=>t.category==='base').length,60);assert.equal(data.dlcCount,9);
const ids=new Set(data.steps.map(s=>s.id)),trophyIds=new Set(data.trophies.map(t=>t.id));assert.equal(ids.size,data.steps.length);assert.equal(trophyIds.size,60);
assert.equal(Object.keys(starRoutes).length,24);
for(const puzzle of puzzles.filter(p=>p.kind==='star')){
 const route=starRoutes[puzzle.id],map=regionMaps[puzzle.region];assert.ok(route?.points.length>=2,puzzle.id);
 route.points.forEach((point,index)=>{const node=map.nodes.find(n=>n.id===starPointId(puzzle.id,index));if(!point.anchor){assert.equal(node,undefined,'未知落點不可生成假標記');return;}assert.ok(node,puzzle.id+' '+point.title);assert.equal(node.target,puzzleProgressId(puzzle.id));assert.equal(node.routeId,puzzle.id);assert.ok(node.anchorX>=0&&node.anchorX<=1000&&node.anchorY>=0&&node.anchorY<=650);});
 const html=starNavigationHtml(puzzle,{escape:s=>String(s).replaceAll('<','&lt;')});assert.match(html,/data-map-point/);assert.ok(!html.includes('data-puzzle-complete'),'定位不建立另一份收集進度');
 const selected=map.nodes.find(n=>n.kind==='star'&&n.target===puzzleProgressId(puzzle.id)).id,svg=mapSvg(puzzle.region,{escape:s=>s,progress:{steps:{}},selected});
 assert.equal((svg.match(/class="map-node map-star-point/g)||[]).length,route.points.filter(p=>p.anchor).length);assert.ok(!svg.includes('map-optional'),'星星路線不混入跳題 Spark');assert.ok(!svg.includes('map-artifact'));
}
assert.match(starRoutes['N2-star-prometheus'].intro,/金色圓環/);assert.match(starRoutes['N3-star-pandora'].points[0].description,/紅光源上方/);
assert.ok(regionMaps.S2.nodes.find(n=>n.id==='lost-1').x>regionMaps.S2.nodes.find(n=>n.id==='lost-2').x,'S2 Question Block 在 Pandora 一側，Stowaway 在另一岸');
for(const[id,check]of Object.entries(safetyChecks)){assert.ok(ids.has(id));for(const[trophy,step]of check.items){assert.ok(trophyIds.has(trophy),trophy);assert.ok(ids.has(step),step);}for(const step of check.steps||[])assert.ok(ids.has(step),step);}
for(const id of ['single-rod','one-lap','hard-way']){const step=data.steps.find(s=>s.id===id);assert.equal(step.warningLevel,'prepare');assert.equal(step.missable,false);assert.ok(step.sources.includes('ps5Guide'));assert.match(step.recovery,/終端重試/);}
const uxFixture={steps:{calibration:{status:'completed',legacyExtra:'keep'}},settings:{},trophies:{},backups:{},branches:{}},calibration=data.steps.find(s=>s.id==='calibration');
assert.equal(needsAttention(calibration,uxFixture),true,'父項完成不能略過未完成子項');assert.equal(nextAction(data.steps,uxFixture).item.id,'BOOT-1');
for(const id of childIds(calibration))uxFixture.steps[id]={status:'completed'};
assert.equal(needsAttention(calibration,uxFixture),false);assert.equal(nextAction(data.steps,uxFixture).step.id,'save-safety');assert.equal(uxFixture.steps.calibration.legacyExtra,'keep');assert.deepEqual(uxFixture.trophies,{});assert.deepEqual(uxFixture.backups,{});
const mapped=new Set(data.steps.flatMap(s=>s.trophyRefs));assert.ok(data.trophies.every(t=>mapped.has(t.id)),'所有本體獎盃都要有名稱對照');
const publishedStepIds='calibration save-safety doge-intro chicken petition schuyler museum purple neutral-route departure-check region-e1 doge-survey team field-basics chase puzzle-time region-e2 single-rod one-lap region-e3 doge-match first-megastructure region-n1 rand-north region-n2 broken-somnodrome region-n3 north-exit sinner text-adventures city-tour city-politics city-exit region-s1 hard-way rand-south region-s2 region-s3 artifacts west-arrival region-w1 region-w3 region-w2 w2-backup working-somnodrome mayor-rand mayor-byron mayor-hermanubis final-city all-puzzles miranda collectibles stars story-audit final-backup ending platinum-audit'.split(' ');
assert.ok(publishedStepIds.every(id=>ids.has(id)),'已發布的 57 步驟 ID 不得因攻略更新消失');
const sectionSteps=roadmapSections.flatMap(s=>s.steps);assert.equal(new Set(sectionSteps).size,data.steps.length);assert.equal(sectionSteps.length,data.steps.length,'主步驟只屬於一個閱讀片段');
for(const section of roadmapSections)for(const id of section.steps){assert.ok(ids.has(id));assert.equal(data.steps.find(s=>s.id===id).stageId,section.stage);}
for(const[before,after]of [['single-rod','region-e2'],['one-lap','region-e2'],['hard-way','region-s1'],['broken-somnodrome','region-n2'],['w2-backup','region-w2']]){const section=sectionForStep(before);assert.ok(section.steps.indexOf(before)<section.steps.indexOf(after));assert.ok(data.steps.indexOf(data.steps.find(s=>s.id===before))<data.steps.indexOf(data.steps.find(s=>s.id===after)));}
for(const[step,trophy]of [['region-e1','discovery'],['region-e1','the-all-gifted'],['region-e2','mistress-of-riddles'],['region-e3','remnants-of-the-past'],['region-e2','overload']])assert.ok(data.steps.find(s=>s.id===step).trophyRefs.includes(trophy));
assert.equal(trophyConditions.length,60);assert.equal(Object.keys(trophyGuides).length,60);assert.equal(data.trophies.filter(t=>t.grade==='silver').length,6);assert.equal(data.trophies.filter(t=>t.grade==='gold').length,1);
for(const trophy of data.trophies){assert.ok(trophy.descriptionZhTW.length>4);assert.equal(trophy.descriptionCheckedAt,'2026-11-04');const guide=trophyGuides[trophy.id];assert.ok(guide.steps.every(id=>ids.has(id)));if(guide.puzzle)assert.ok(puzzles.some(p=>p.id===guide.puzzle));}
assert.equal(new Set(textScreenedIds).size,textScreenedIds.length);assert.equal(new Set(sourceComparedIds).size,sourceComparedIds.length);
for(const id of [...textScreenedIds,...sourceComparedIds,...Object.keys(correctedFindings),...reviewedIds,...sourceGapIds])assert.ok(puzzles.some(p=>p.id===id),'覆核紀錄必須對應既有題目：'+id);
assert.ok(sourceComparedIds.every(id=>textScreenedIds.includes(id)));assert.ok(Object.keys(correctedFindings).every(id=>reviewedIds.includes(id)));
const reviewCounts=puzzleReviewCounts(puzzles);assert.equal(reviewCounts.total,212);assert.equal(reviewCounts.textScreened,212);assert.equal(reviewCounts.sourceCompared+reviewCounts.sourceGaps+reviewCounts.pending,212);assert.equal(reviewCounts.sourceCompared,sourceComparedIds.length,'覆核計數須依明列紀錄，不能從有來源或文字檢視推定');
assert.equal(new Set(reviewedIds).size,reviewedIds.length);assert.equal(reviewCounts.pending,0);assert.ok(sourceGapIds.every(id=>puzzles.find(p=>p.id===id)?.verificationStatus==='unverified'));assert.ok(sourceGapIds.every(id=>puzzles.find(p=>p.id===id)?.pending));
assert.equal(puzzleReviewLevel('future-synthetic-puzzle'),'not_reviewed');assert.deepEqual(puzzleReviewCounts([{id:'future-synthetic-puzzle'}]),{total:1,textScreened:0,sourceCompared:0,sourceGaps:0,pending:1});
assert.equal(puzzles.length,212);assert.equal(new Set(puzzles.map(p=>p.id)).size,puzzles.length);
assert.equal(collectionRegions.length,12);assert.equal(collectionItems.length,56);assert.equal(new Set(collectionItems.map(item=>item.id)).size,56);assert.equal(new Set(collectionItems.map(item=>item.imageUrl)).size,56);assert.equal(artifactCandidates.length,19);
assert.equal(humanArtifacts.length,14);assert.equal(new Set(humanArtifacts.map(item=>item.id)).size,14);
for(const item of humanArtifacts){assert.ok(item.nameZhTW&&item.title);assert.ok(artifactCandidates.some(site=>site.artifactId===item.id));assert.ok(!ids.has(artifactProgressId(item.id)));}
for(const site of artifactCandidates)assert.ok(humanArtifacts.some(item=>item.id===site.artifactId));
for(const [a,b]of [[1,5],[2,3],[8,10],[9,12],[13,15]])assert.equal(artifactCandidates[a].artifactId,artifactCandidates[b].artifactId,'同物品的替代點必須共用身分');
const artifactState={steps:{[artifactProgressId('unknown-machine')]:{status:'completed',foundIn:'E1'}},settings:{},trophies:{}};
assert.equal(artifactDone(artifactState,artifactCandidates[3].artifactId),true);assert.deepEqual(artifactCounts(artifactState),{checked:1,manual:0,total:1});
for(const region of ['E1','E2']){const html=mapSvg(region,{escape:s=>s,progress:artifactState});assert.match(html,/map-artifact map-done/);assert.match(html,/已取得/);}
artifactState.settings[counterKey('E1','artifact')]=4;assert.deepEqual(artifactCounts(artifactState),{checked:1,manual:4,total:4});
artifactState.steps[artifactProgressId('unknown-machine')].status='not_started';assert.equal(artifactDone(artifactState,'unknown-machine'),false);assert.equal(artifactCounts(artifactState).total,4,'取消具名取得不刪除舊手動件數');
assert.ok(!mapSvg('E2',{escape:s=>s,progress:artifactState}).includes('map-artifact map-done'));
for(const region of collectionRegions){assert.ok(ids.has(region.stepId));const list=collectionItems.filter(item=>item.region===region.code);for(const kind of ['lab','trevor','lifthrasir'])assert.equal(list.filter(item=>item.kind===kind).length,1);assert.equal(list.filter(item=>item.kind==='remnant').length,['E1','E2'].includes(region.code)?0:2);}
for(const item of [...collectionItems,...artifactCandidates]){assert.ok(item.location.length>5);assert.ok(collectionRegions.some(r=>r.code===item.region));assert.equal(new URL(item.sourceUrl).protocol,'https:');assert.equal(new URL(item.imageUrl).hostname,'images.steamusercontent.com');assert.ok(!ids.has(collectionProgressId(item.id)));assert.ok(!puzzles.some(p=>puzzleProgressId(p.id)===collectionProgressId(item.id)));}
const collectionState={steps:{'region-e1':{status:'completed'}},settings:{},trophies:{}};assert.equal(collectionTotals(collectionState).total,80);assert.equal(collectionTotals(collectionState).done,0,'舊區域完成不代填新清單');
for(const item of collectionItems.filter(item=>item.region==='E1'))collectionState.steps[collectionProgressId(item.id)]={status:'completed'};
collectionState.steps[puzzleProgressId('E1-star-prometheus')]={status:'completed'};assert.equal(regionCounts(collectionState,'E1').done,4);collectionState.steps[puzzleProgressId('E1-star-pandora')]={status:'completed'};assert.equal(regionCounts(collectionState,'E1').complete,true);assert.equal(collectionTotals(collectionState).regions,1);
collectionState.settings[counterKey('E1','text')]=3;collectionState.settings[counterKey('STORY','text')]=2;collectionState.settings[counterKey('E1','artifact')]=4;assert.equal(collectionTotals(collectionState).text,5);assert.equal(collectionTotals(collectionState).artifact,4);assert.equal(collectionTotals(collectionState).done,5,'文字與遺物目標不混入固定總量');assert.deepEqual(collectionState.trophies,{});assert.equal(readCounter({settings:{[counterKey('E1','text')]:-1}},'E1','text'),0);
assert.equal(trophyProgress({id:'trevor-s-biographer'},collectionState,data)[0].done,1);assert.equal(trophyProgress({id:'discovery'},collectionState,data)[0].done,1);assert.equal(trophyProgress({id:'archaeologist'},collectionState,data)[0].done,4);assert.equal(trophyProgress({id:'lord-of-the-files'},collectionState,data)[0].done,5);
collectionState.settings[counterKey('SOCIAL','text')]=8;assert.equal(collectionTotals(collectionState).text,5,'社群閱讀不混入終端文字');assert.equal(trophyProgress({id:'touch-grass'},collectionState,data)[0].done,8);
const puzzleAll={steps:Object.fromEntries(puzzles.map(p=>[puzzleProgressId(p.id),{status:'completed'}])),settings:{},trophies:{}};assert.deepEqual(trophyProgress({id:'renaissance-robot'},puzzleAll,data).map(c=>[c.done,c.total]),[[120,120],[12,12],[24,24]]);assert.equal(trophyProgress({id:'text-adventurer'},puzzleAll,data)[0].done,3);
assert.equal(Object.keys(regionMaps).length,26);
assert.equal(Object.keys(storyMaps).length,14);
for(const[code,map]of Object.entries(regionMaps)){if(!storyMaps[code]){assert.equal(map.nodes.filter(n=>n.kind==='puzzle').length,8);assert.equal(map.nodes.filter(n=>n.kind==='lost').length,2);}assert.equal(new Set(map.nodes.map(n=>n.id)).size,map.nodes.length);for(const n of map.nodes){assert.ok(n.x>=0&&n.x<=1000&&n.y>=0&&n.y<=650);if(n.target)assert.ok(storyWaypoints.some(w=>waypointProgressId(w.id)===n.target)||ids.has(n.target.replace(/^step-/,''))||puzzles.some(p=>puzzleProgressId(p.id)===n.target)||collectionItems.some(c=>collectionProgressId(c.id)===n.target)||artifactCandidates.some(a=>'artifact-'+a.id===n.target),code+' '+n.target);}for(const item of collectionItems.filter(c=>c.region===code))assert.ok(map.nodes.some(n=>n.target===collectionProgressId(item.id)));assert.ok(!mapSvg(code,{escape:s=>s,progress:collectionState}).includes('<image'));}
for(const region of 'E1 E2 E3 N1 N2 N3 S1 S2 S3 W1 W2 W3'.split(' ')){
 for(const [kind,count]of [['main',8],['lost',2],['gold',1],['bridge',1],['star',2]])assert.equal(puzzles.filter(p=>p.region===region&&p.kind===kind).length,count,region+' '+kind);
}
assert.equal(puzzles.filter(p=>p.kind==='tutorial').length,12);assert.equal(puzzles.filter(p=>p.kind==='arranger').length,9);
for(const puzzle of puzzles){assert.ok(ids.has(puzzle.stepId),puzzle.id+' owner');assert.ok(puzzle.actions.length||puzzle.pending,puzzle.id+' content');assert.ok(puzzle.sources.length);for(const source of puzzle.sources)assert.ok(new URL(source.url).protocol==='https:');if(puzzle.verificationStatus==='unverified')assert.ok(puzzle.pending,puzzle.id+' uncertainty');assert.ok(puzzleGroups[puzzle.stepId]);assert.ok(!ids.has(puzzleProgressId(puzzle.id)),'子謎題不覆蓋原步驟');}
assert.equal(new Set(storyWaypoints.map(w=>w.id)).size,59);
assert.equal(megaBridges.length,28);assert.deepEqual(bridgeCoverage.map(c=>c.count),[7,9,11,0,1]);
for(const item of megaBridges){
 const b=item.bridge,route=storyRoutes[item.stepId];assert.ok(route.indexOf(item.id)<route.indexOf(item.beforeId));assert.ok(item.location&&b.after);assert.equal(new Set(b.pieces.map(p=>p.number)).size,b.pieces.length);assert.deepEqual([...b.pieces.map(p=>p.number)].sort((a,b)=>a-b),Array.from({length:b.pieces.length},(_,i)=>i+1));
 const waypoint=storyWaypoints.find(w=>w.id===item.id),hidden=bridgeHtml(waypoint,{escape:s=>s,showSolutions:false}),shown=bridgeHtml(waypoint,{escape:s=>s,showSolutions:true});assert.ok(!hidden.includes('data-bridge-solution'));assert.ok(hidden.includes(b.after));assert.equal((shown.match(/<strong>\d+ 號<\/strong>/g)||[]).length,b.pieces.length);if(b.pieces.some(p=>p.rotation!=='as-shown'))assert.match(shown,/待查證/);assert.ok(!shown.includes('<img'));
}
assert.deepEqual(megaBridges.find(b=>b.id==='bridge-north-01').bridge.pieces.map(p=>p.number),[2,3,1,4]);
assert.deepEqual(megaBridges.find(b=>b.id==='bridge-east-04').bridge.pieces.map(p=>p.number),[2,4,3,1]);
assert.match(megaBridges.find(b=>b.id==='bridge-north-04').bridge.between[1],/上樓/);
assert.match(megaBridges.find(b=>b.id==='bridge-south-02').bridge.between[2],/側面/);
assert.match(megaBridges.find(b=>b.id==='bridge-south-08').bridge.after,/先左轉.*再左轉/);
assert.match(megaBridges.at(-1).bridge.alternative,/Dystopia.*待查證/);
for(const w of storyWaypoints){assert.ok(ids.has(w.stepId));assert.ok(storyMaps[w.mapKey]);assert.ok(w.actions.length);assert.ok(w.sources.length);assert.ok(routeItemsForStep(w.stepId).includes(w));assert.ok(storyMaps[w.mapKey].nodes.some(n=>n.target===waypointProgressId(w.id)||n.alsoTargets?.includes(waypointProgressId(w.id))),w.id+' map locator');}
for(const[stepId,route]of Object.entries(storyRoutes)){assert.ok(ids.has(stepId));const items=routeItemsForStep(stepId);assert.ok(items.every(Boolean),stepId);assert.equal(new Set(items).size,items.length);assert.ok(items.every(i=>i.stepId===stepId));assert.ok(puzzles.filter(p=>p.stepId===stepId).every(p=>items.includes(p)));assert.equal(items.length,route.length+puzzles.filter(p=>p.stepId===stepId&&!route.includes(p.id)).length);}
assert.deepEqual(routeItemsForStep('first-megastructure').map(i=>i.id),storyRoutes['first-megastructure']);
assert.ok(storyMaps['MEGA-E-ENTRY'].nodes.find(n=>n.id==='l1').description.includes('回程'));
assert.equal(puzzles.find(p=>p.id==='MEGA-N-blue').stepId,'north-megastructure');
assert.equal(sectionForStep('north-megastructure').id,'north-megastructure');
assert.ok(storyMaps['CITY-3'].pending.includes('待查證'));
assert.ok(!storyMaps['CITY-1'].nodes.some(n=>n.id==='neith'));assert.ok(storyMaps['CITY-2'].nodes.some(n=>n.id==='neith'));
const navHtml=storyRouteHtml('first-megastructure',{escape:s=>s,progress:{steps:{}},showSolutions:false});assert.ok(navHtml.includes('等 Melville'));assert.ok(navHtml.includes('puzzle-navigation'));assert.ok(!navHtml.includes('data-solution='));
const solutionEscape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const syntheticPuzzle={...puzzles[0],title:'<script>synthetic</script>',actions:['secret <script>synthetic</script>']},solutionState={steps:{}};
assert.ok(!puzzleHtml(syntheticPuzzle,{escape:solutionEscape,progress:solutionState,showSolutions:false}).includes('secret'));
const visibleSolution=puzzleHtml(syntheticPuzzle,{escape:solutionEscape,progress:solutionState,showSolutions:true});assert.ok(visibleSolution.includes('secret &lt;script&gt;'));assert.ok(!visibleSolution.includes('<script>'));
// 拼門圖必須完整鋪滿、每塊四格且邊連通；尺寸與來源解圖另由人工核對。
for(const p of puzzles.filter(p=>p.diagramCells)){
 const rows=p.diagramCells;assert.ok(rows.every(row=>row.length===rows[0].length));const letters=[...new Set(rows.join(''))];assert.equal(letters.length,rows.length*rows[0].length/4);
 for(const letter of letters){const cells=rows.flatMap((row,y)=>[...row].map((v,x)=>v===letter?[x,y]:null).filter(Boolean));assert.equal(cells.length,4);const seen=new Set([cells[0].join(',')]);for(let i=0;i<4;i++)for(const[x,y]of cells)if([[x-1,y],[x+1,y],[x,y-1],[x,y+1]].some(c=>seen.has(c.join(','))))seen.add([x,y].join(','));assert.equal(seen.size,4);}
}
assert.match(puzzles.find(p=>p.id==='E2-main-8').warning,/另一根不要碰/);assert.match(puzzles.find(p=>p.id==='E2-lost-2').warning,/只送一趟/);assert.ok(puzzles.find(p=>p.id==='S1-main-8').sources.some(s=>s.url.includes('switcheroo')));
const atlantis=puzzles.find(p=>p.id==='TEXT-atlantis');assert.equal(atlantis.verificationStatus,'confirmed');assert.equal(atlantis.pending,undefined);assert.ok(atlantis.actions.some(text=>text.includes('Then find another way to witness the Sublime without being annihilated.')));assert.ok(atlantis.sources.some(source=>source.url==='https://www.youtube.com/watch?v=pB1VTo02kB4&t=239s'));
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
for(const status of ['missed','skipped','unknown']){const legacy={...seed(),steps:Object.fromEntries(data.steps.map(s=>[s.id,{status:'completed'}]))};legacy.steps.chicken={status,legacyExtra:'keep'};assert.equal(overview(data,legacy).next.id,'chicken');assert.equal(matches(data.steps.find(s=>s.id==='chicken'),legacy,'pending'),true);assert.equal(store.validate(legacy).data.steps.chicken.legacyExtra,'keep');}
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
edit(p=>{p.steps['artifact-unknown-machine']={status:'completed',foundIn:'E1',futureArtifact:{keep:true}};p.settings[counterKey('E1','artifact')]=2;});await session.start();
assert.equal(remote.value.data.steps['artifact-unknown-machine'].status,'completed');assert.equal(remote.value.data.steps['artifact-unknown-machine'].foundIn,'E1');
edit(p=>{p.steps['artifact-unknown-machine'].status='not_started';});await session.start();
assert.equal(remote.value.data.steps['artifact-unknown-machine'].status,'not_started');assert.equal(remote.value.data.steps['artifact-unknown-machine'].futureArtifact.keep,true);assert.equal(remote.value.data.settings[counterKey('E1','artifact')],2);
edit(p=>p.steps.chicken={status:'completed',note:'local'});remote.value.data.steps.chicken={status:'missed',note:'remote'};remote.version++;review=await session.start();assert.ok(review.plan.conflicts.length);await assert.rejects(session.confirm(review,[]));
edit(p=>p.steps.calibration={status:'completed'});let result=await session.confirm(review,review.plan.conflicts.map(()=>'remote'));assert.equal(result.changed,true);assert.equal(result.kind,'review');result=await session.confirm(result,result.plan.conflicts.map(()=>'remote'));assert.equal(current.steps.chicken.note,'remote');assert.equal(current.steps.calibration.status,'completed');
edit(p=>p.steps.chicken.note='before-upload');mock.controls.beforePatch=()=>{edit(p=>p.steps['save-safety']={status:'completed',note:'during-upload'});mock.controls.beforePatch=null;};result=await session.start();assert.equal(result.dirty,true);assert.equal(current.steps['save-safety'].note,'during-upload');await session.start();
edit(p=>p.branches.rand={status:'completed'});mock.controls.failAfterPatch=true;await assert.rejects(session.start(),e=>e.code==='uncertain');const patches=mock.requests.filter(r=>r.method==='PATCH').length;result=await session.start();assert.equal(result.recovered,true);assert.equal(mock.requests.filter(r=>r.method==='PATCH').length,patches);
edit(p=>p.steps.calibration.note='blocked by quota');state.fail=true;const before=remote.version;await assert.rejects(session.start(),/quota/);assert.equal(remote.version,before);state.fail=false;
const unsafe=new ctx.window.SideProjectDrive.DriveAppData(auth,config.driveFileName,{gameId:data.gameId,projectId:data.driveProjectId,writesEnabled:true});mock.controls.ignoreConditions=true;await assert.rejects(unsafe.verifySafety(),e=>e.code==='unsafe');assert.equal(unsafe.verified,false);mock.controls.ignoreConditions=false;
auth.generation++;assert.equal(drive.verified,false);await assert.rejects(drive.write({},null),e=>e.code==='write-disabled');
// 未修改三個既有模組的底層同步／身份／格式程式。
for(const file of ['google-auth','drive-appdata','progress-envelope'])assert.equal(await fs.readFile(new URL('dist/shared/'+file+'.js',import.meta.url),'utf8'),await fs.readFile(new URL('../edf-wb/dist/shared/'+file+'.js',import.meta.url),'utf8'));
for(const file of ['app.js','puzzle-audit.js','story-data.js','story-maps.js','roadmap/story.js','data.js','puzzle-data.js','region-maps.js','trophy-guide-data.js','roadmap/navigation.js','roadmap/completion.js','roadmap/maps.js','roadmap/trophies.js','collection-data.js','trophy-names.js','mayor-research.js','roadmap/model.js','roadmap/evidence.js','roadmap/solutions.js','roadmap/collections.js','roadmap/artifacts.js','roadmap/store.js','roadmap/sync.js','shared/sync-core.js','shared/sync-session.js']){const check=spawnSync(process.execPath,['--check',new URL('dist/'+file,import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1')],{encoding:'utf8'});assert.equal(check.status,0,check.stderr);}
console.log(JSON.stringify({passed:true,gameId:data.gameId,stages:8,steps:data.steps.length,puzzleItems:puzzles.length,puzzleReview:puzzleReviewCounts(puzzles),puzzlePending:puzzles.filter(p=>p.verificationStatus==='unverified').length,baseTrophies:60,dlcExcluded:9,checks:['schema/source/dependency/ID guards','132 regional puzzles/212 route items','spoiler DOM exclusion/escaping','nine arranger tilings/connected tetrominoes','DLC excluded','trophy/step/backup separation','async three-way merge','first pairing','stale preview','in-flight edit preservation','lost acknowledgement recovery','quota before upload','412/racing CAS','unsafe server/grant rejection','unchanged auth/adapter/envelope','syntax']}));
