export const storagePrefix='game-companion.grounded.';
export const clone=value=>value===undefined?undefined:JSON.parse(JSON.stringify(value));
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const assert=(ok,message)=>{if(!ok)throw Error(message+'；未修改原始進度。');};
export const newRun=level=>({level,storyStage:'start',createdAt:Date.now(),steps:{},collectibles:{},conditions:{},customMarkers:{},notes:'',ngMolars:{status:'unknown',count:0}});
export const newPlayer=name=>({playerId:crypto.randomUUID(),name,trophies:{},upgrades:{},notes:''});
export function newWorld(name){const player=newPlayer('玩家 1');const worldId=crypto.randomUUID();return {worldId,name,createdAt:Date.now(),players:{[player.playerId]:player},currentPlayerId:player.playerId,currentRunId:'base',runs:{base:newRun(0)},inherited:{},notes:''};}
export function fresh(){const w=newWorld('我的庭院');return {gameId:'grounded',schema:1,schemaVersion:1,moduleVersion:'1.1.2',revision:0,updatedAt:Date.now(),currentWorldId:w.worldId,worlds:{[w.worldId]:w},settings:{goal:'experience',currentStage:'start'}};}
const statuses=['obtained','missing','unknown'];
const checkMap=(map,validator,label)=>{assert(object(map),label+' 格式不符');for(const row of Object.values(map))validator(row);};
export function validateProgress(p){
 assert(object(p)&&p.gameId==='grounded'&&p.schema===1&&p.schemaVersion===1,'遊戲識別或 schema 不相容');
 assert(Number.isSafeInteger(p.revision)&&p.revision>=0&&Number.isFinite(p.updatedAt)&&p.updatedAt>=0,'修訂或時間無效');
 assert(object(p.settings)&&object(p.worlds)&&Object.hasOwn(p.worlds,p.currentWorldId),'世界／設定缺失');
 const checkCollection=row=>assert(object(row)&&statuses.includes(row.status),'收集狀態不相容');
 checkMap(p.worlds,w=>{
  assert(object(w)&&typeof w.worldId==='string'&&typeof w.name==='string'&&object(w.players)&&Object.hasOwn(w.players,w.currentPlayerId)&&object(w.runs)&&Object.hasOwn(w.runs,w.currentRunId),'世界／成員／周目格式不符');
  checkMap(w.inherited,checkCollection,'繼承收集');
  checkMap(w.players,player=>{
   assert(object(player)&&typeof player.playerId==='string'&&typeof player.name==='string'&&object(player.upgrades),'成員格式不符');
   checkMap(player.trophies,row=>assert(object(row)&&typeof row.earned==='boolean','獎盃格式不符'),'獎盃');
  },'成員');
  checkMap(w.runs,run=>{
   assert(object(run)&&Number.isSafeInteger(run.level)&&run.level>=0,'周目格式不符');
   checkMap(run.steps,row=>assert(object(row)&&typeof row.done==='boolean','步驟格式不符'),'步驟');
   checkMap(run.collectibles,checkCollection,'收集');
   checkMap(run.conditions,row=>assert(object(row)&&typeof row.done==='boolean','條件格式不符'),'條件');
   checkMap(run.customMarkers,row=>assert(object(row)&&typeof row.name==='string'&&Number.isFinite(row.x)&&row.x>=0&&row.x<=1000&&Number.isFinite(row.y)&&row.y>=0&&row.y<=650&&typeof row.layer==='string','個人標記格式不符'),'個人標記');
   assert(object(run.ngMolars)&&statuses.includes(run.ngMolars.status)&&Number.isSafeInteger(run.ngMolars.count)&&run.ngMolars.count>=0,'NG+ 乳牙格式不符');
  },'周目');
 },'世界');
 for(const [id,w]of Object.entries(p.worlds))assert(id===w.worldId,'worldId 與索引不符');
 for(const w of Object.values(p.worlds))for(const [id,player]of Object.entries(w.players))assert(id===player.playerId,'playerId 與索引不符');
 return p;
}
export const config={gameId:'grounded',moduleVersion:'1.1.2',storagePrefix,driveProjectId:'game-companion.grounded',fresh,validateProgress};
export const world=p=>p.worlds[p.currentWorldId];
export const run=p=>world(p).runs[world(p).currentRunId];
export const player=p=>world(p).players[world(p).currentPlayerId];
export const carryCategories=['mega','scab','creature','recipe'];
export const collectionBucket=(p,item)=>carryCategories.includes(item.category)?world(p).inherited:run(p).collectibles;
export const collectionState=(p,item)=>collectionBucket(p,item)[item.id]?.status||'missing';
export const collectionVisible=(p,item)=>run(p).level===0||item.category!=='milk';
export const stampActor=p=>({updatedAt:Date.now(),completedBy:player(p).playerId,source:'manual'});
export function setCollection(p,item,status){assert(statuses.includes(status),'收集狀態無效');const map=collectionBucket(p,item);map[item.id]={...map[item.id],status,...stampActor(p)};}
export function addRun(p){const w=world(p),level=Math.max(...Object.values(w.runs).map(r=>r.level))+1,id='ng-'+crypto.randomUUID();w.runs[id]=newRun(level);w.currentRunId=id;return id;}
export const runLabel=r=>r.level===0?'第一輪':'NG+'+r.level;
export function importData(raw){
 const data=raw?.recoveryBundle?.localRaw?JSON.parse(raw.recoveryBundle.localRaw):Array.isArray(raw?.records)?raw.records.find(row=>row.key==='progress')?.value:raw;
 return validateProgress(clone(data));
}
