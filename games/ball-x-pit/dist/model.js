export const clone=value=>value===undefined?undefined:JSON.parse(JSON.stringify(value));
export const groups=['clears','stepDone','blueprintObtained','buildingBuilt','recipeMade','encyclopediaUnlocked','trophyEarned'];
export const storagePrefix='game-companion.ball-x-pit.';
export function fresh(){return {gameId:'ball-x-pit',schema:1,moduleVersion:'1.0.0',dataVersion:'2026-11-09.1',revision:0,updatedAt:Date.now(),...Object.fromEntries(groups.map(k=>[k,{}]))};}
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
let knownIds;
export function configureCatalog(data){knownIds={clears:new Set(data.characters.flatMap(c=>data.levels.map(l=>clearId(c.id,l.id)))),stepDone:new Set(data.roadmapSteps.map(r=>r.id)),blueprintObtained:new Set(data.buildings.map(r=>r.id)),buildingBuilt:new Set(data.buildings.map(r=>r.id)),recipeMade:new Set(data.recipes.map(r=>r.id)),encyclopediaUnlocked:new Set(data.encyclopedia.map(r=>r.id)),trophyEarned:new Set(data.trophies.map(r=>r.id))};}
export function validateProgress(p){
 if(!object(p)||p.gameId!=='ball-x-pit'||p.schema!==1)throw Error('遊戲識別或版本不相容；原文保留，未修改進度。');
 if(!Number.isSafeInteger(p.revision)||p.revision<0||!Number.isFinite(p.updatedAt)||p.updatedAt<0)throw Error('進度修訂／時間損壞；停止寫入。');
 if(!knownIds)throw Error('攻略尚未載入，停止進度寫入。');
 for(const g of groups){if(!object(p[g]))throw Error('進度群組損壞：'+g);for(const [id,v]of Object.entries(p[g]))if(knownIds[g].has(id)&&typeof v!=='boolean')throw Error('完成紀錄必須是布林值：'+g);}
 return p;
}
export const config={gameId:'ball-x-pit',moduleVersion:'1.0.0',storagePrefix,exportSyncState:false,fresh,validateProgress};
export function parseImport(value,side='localRaw',depth=0){
 if(depth>5)throw Error('復原檔巢狀過深，請選原始 JSON。');
 if(value?.gameId!=='ball-x-pit')throw Error('不是 BALL x PIT 備份；未修改資料。');
 if(value.recoveryBundle){if(!['localRaw','sourceRaw'].includes(side))throw Error('復原端無效');return parseImport(JSON.parse(value.recoveryBundle[side]),side,depth+1);}
 return validateProgress(clone(Array.isArray(value.records)?value.records.find(r=>r.key==='progress')?.value:value));
}
export const clearId=(character,level)=>character+':'+level;
export const baseCharacters=data=>data.characters.filter(c=>c.contentSet==='base');
export const levelCount=(p,data,id)=>baseCharacters(data).filter(c=>p.clears[clearId(c.id,id)]).length;
export const characterCount=(p,data,id)=>data.levels.filter(l=>p.clears[clearId(id,l.id)]).length;
export const matrixCount=(p,data)=>baseCharacters(data).reduce((n,c)=>n+characterCount(p,data,c.id),0);
export function condition(p,data,t){
 const level=data.levels.find(l=>t.name===l.name||t.name===l.name+' Conquered');
 if(level){const count=levelCount(p,data,level.id),total=t.name.endsWith(' Conquered')?10:1;return {count,total,possible:count>=total,label:'不同本體角色通關'};}
 const character=data.characters.find(c=>c.trophy===t.name);
 if(character){const count=characterCount(p,data,character.id);return {count,total:8,possible:count===8,label:'本體關卡'};}
 const recipe=data.recipes.find(r=>r.name===t.name);
 if(recipe)return {count:p.recipeMade[recipe.id]?1:0,total:1,possible:!!p.recipeMade[recipe.id],label:'已製作'};
 const named={"Worker's Guild":'workers-guild','Evolution Chamber':'evolution-chamber','Relic Collector':'relic-collector','Bag Maker':'bag-maker','Carpenter':'carpenter'};
 if(named[t.name])return {count:p.buildingBuilt[named[t.name]]?1:0,total:1,possible:!!p.buildingBuilt[named[t.name]],label:'已建造'};
 if(['Trophy','Neighborhood','Monument'].includes(t.name)){
  const rows=data.buildings.filter(b=>b.contentSet==='base'&&(t.name==='Trophy'?b.category==='trophy':t.name==='Neighborhood'?b.category==='housing':/無限/.test(b.effect)));
  const count=rows.filter(b=>p.buildingBuilt[b.id]).length,total=t.name==='Neighborhood'?15:1;
  return {count,total,possible:count>=total,label:t.name==='Neighborhood'?'不同本體住房（遊戲總座數另核對）':'符合條件建築已建造'};
 }
 if(t.name==='Evolution'){const possible=data.recipes.some(r=>r.kind==='evolution'&&p.recipeMade[r.id]);return {count:possible?1:0,total:1,possible,label:'已製作任一戰球 Evolution'};}
 if(t.number===1){const count=data.trophies.filter(r=>r.number!==1&&p.trophyEarned[r.id]).length;return {count,total:63,possible:count===63,label:'其他獎盃已確認'};}
 return {possible:false,label:t.name==='Scholar'?'本體圖鑑總數待查；請以遊戲核對。':'以遊戲顯示與 PS5 跳盃為準；未自動推算。'};
}
// 同一具體事實只讀同一個 map；閱讀與章節切換不寫進度。
export function stageComplete(p,data,level){return !!p.stepDone['review-'+level.id]&&levelCount(p,data,level.id)>0;}
export const unlocked=(p,c)=>c.id==='warrior'||!!p.buildingBuilt[c.housingId];
