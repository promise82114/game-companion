// 靜態攻略與人工紀錄分離；推導條件不寫回 PSN 獎盃。
export const clone=value=>value===undefined?undefined:JSON.parse(JSON.stringify(value));
export const storagePrefix='game-companion.edfir.';
export const difficulties=['Easy','Normal','Hard','Hardest','Disaster'];
// 舊存檔目標只作相容驗證；目前介面一律以白金推薦，不遷移或刪除原值。
export const goals={story:'主線畢業',experience:'完整體驗畢業',platinum:'白金畢業'};
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const assert=(condition,text)=>{if(!condition)throw Error(text+'；未修改進度。');};
const finite=v=>Number.isSafeInteger(v)&&v>=0;
export function fresh(){return {gameId:'edfir',scope:'base',schema:1,schemaVersion:1,moduleVersion:'1.4.0',revision:0,updatedAt:Date.now(),missions:{},drones:{},trophies:{},weapons:{},equipment:{},resources:{credits:0,red:0,blue:0,yellow:0},farmRuns:{},settings:{goal:'platinum',currentMission:'m01'}};}
export function validateProgress(p){
 assert(object(p)&&p.gameId==='edfir'&&p.scope==='base'&&p.schema===1&&p.schemaVersion===1,'遊戲識別或版本不相容');
 assert(finite(p.revision)&&Number.isFinite(p.updatedAt)&&p.updatedAt>=0,'修訂或時間無效');
 for(const key of ['missions','drones','trophies','weapons','equipment','resources','farmRuns','settings'])assert(object(p[key]),'欄位格式無效：'+key);
 for(const [id,row]of Object.entries(p.missions)){if(!/^m(?:0[1-9]|[1-4][0-9]|5[0-2])$/.test(id))continue;assert(object(row)&&typeof row.done==='boolean'&&object(row.difficulties),'任務紀錄無效');for(const key of difficulties)if(Object.hasOwn(row.difficulties,key))assert(typeof row.difficulties[key]==='boolean','難度紀錄無效');}
 for(const [id,row]of Object.entries(p.drones))if(/^drone-(?:m(?:0[1-9]|[1-4][0-9]|5[0-2])|practice-[1-3])$/.test(id))assert(object(row)&&['confirmed','missing','unknown'].includes(row.status),'Drone 紀錄無效');
 for(const [id,row]of Object.entries(p.trophies))if(/^t(?:0[0-9]|[1-3][0-9]|4[0-3])$/.test(id))assert(object(row)&&typeof row.earned==='boolean','獎盃紀錄無效');
 for(const row of Object.values(p.weapons))assert(object(row)&&typeof row.unlocked==='boolean'&&typeof row.purchased==='boolean','武器紀錄無效');
 for(const row of Object.values(p.equipment))assert(object(row)&&typeof row.obtained==='boolean','裝備紀錄無效');
 for(const key of ['credits','red','blue','yellow'])assert(finite(p.resources[key]),'資源必須是非負整數');
 for(const row of Object.values(p.farmRuns)){assert(object(row)&&typeof row.missionId==='string'&&typeof row.difficulty==='string'&&Number.isFinite(row.minutes)&&row.minutes>0&&finite(row.runs)&&row.runs>0&&object(row.yield),'實測紀錄無效');for(const key of ['credits','red','blue','yellow'])assert(finite(row.yield[key]),'實測收益無效');}
 assert(Object.hasOwn(goals,p.settings.goal)&&/^m(?:0[1-9]|[1-4][0-9]|5[0-2])$/.test(p.settings.currentMission),'目標或目前任務無效');
 return p;
}
export const config={gameId:'edfir',moduleVersion:'1.4.0',storagePrefix,driveProjectId:'game-companion.edfir',driveFileName:'game-companion.edfir.progress.v1.json',fresh,validateProgress};
export function migrate(data){
 const p=clone(data);
 // 本模組的 schema0 交換草案只缺新增群組；不接受其他遊戲或未來版本。
 if(p?.gameId==='edfir'&&p.scope==='base'&&p.schema===0){p.schema=p.schemaVersion=1;for(const key of ['equipment','farmRuns'])if(p[key]===undefined)p[key]={};if(p.resources===undefined)p.resources={credits:0,red:0,blue:0,yellow:0};}
 return validateProgress(p);
}
export function parseImport(value,side='localRaw'){
 if(value?.gameId!=='edfir')throw Error('不是 EDFIR 備份；未修改其他遊戲資料。');
 if(value.recoveryBundle){assert(['localRaw','sourceRaw'].includes(side),'復原端無效');return parseImport(JSON.parse(value.recoveryBundle[side]),side);}
 if(Array.isArray(value.records))return migrate(value.records.find(row=>row.key==='progress')?.value);
 return migrate(value);
}
const stamp=()=>({source:'manual',updatedAt:Date.now()});
export const missionDone=(p,id)=>p.missions[id]?.done===true||difficulties.some(key=>p.missions[id]?.difficulties?.[key]===true);
export const droneDone=(p,id)=>p.drones[id]?.status==='confirmed';
export function setMission(p,id,done){assert(/^m(?:0[1-9]|[1-4][0-9]|5[0-2])$/.test(id),'任務 ID 無效');const row=p.missions[id]||{done:false,difficulties:{}};p.missions[id]={...row,done,difficulties:done?row.difficulties:Object.fromEntries(Object.keys(row.difficulties).map(key=>[key,false])),...stamp()};}
export function setDifficulty(p,id,key,value){assert(difficulties.includes(key),'難度無效');const row=p.missions[id]||{done:false,difficulties:{}};p.missions[id]={...row,difficulties:{...row.difficulties,[key]:value},...stamp()};}
export function setDrone(p,id,status){assert(/^drone-(?:m(?:0[1-9]|[1-4][0-9]|5[0-2])|practice-[1-3])$/.test(id)&&['confirmed','missing','unknown'].includes(status),'Drone 狀態無效');p.drones[id]={...p.drones[id],status,...stamp()};}
export function setTrophy(p,id,earned){assert(/^t(?:0[0-9]|[1-3][0-9]|4[0-3])$/.test(id),'獎盃 ID 無效');p.trophies[id]={...p.trophies[id],earned,...stamp()};}
export function setWeapon(p,id,key,value){assert(['unlocked','purchased'].includes(key),'武器狀態無效');p.weapons[id]={unlocked:false,purchased:false,...p.weapons[id],[key]:value,...stamp()};}
export function nextMission(p,missions){const at=Math.max(0,missions.findIndex(m=>m.id===p.settings.currentMission));return [...missions.slice(at),...missions.slice(0,at)].find(m=>!missionDone(p,m.id));}
export function resourcePlan(p,weapons){
 const targets=weapons.filter(w=>p.weapons[w.id]?.target&&!p.weapons[w.id]?.purchased),total={credits:0,red:0,blue:0,yellow:0},unknown=[];
 for(const w of targets){if(!w.price||Object.keys(total).some(k=>!finite(w.price[k]))){unknown.push(w.id);continue;}for(const key of Object.keys(total))total[key]+=w.price[key];}
 return {targets,total,unknown,missing:Object.fromEntries(Object.keys(total).map(k=>[k,Math.max(0,total[k]-p.resources[k])]))};
}
export function estimateRuns(record,missing){const needs=Object.keys(missing).filter(k=>missing[k]>0);return needs.some(k=>record.yield[k]===0)?null:Math.max(0,...needs.map(k=>Math.ceil(missing[k]/(record.yield[k]/record.runs))));}

// 本體清單條件只讀 purchased；DLC／特典與 PSN earned 各自獨立。
export function arsenalProgress(p,weapons){const required=weapons.filter(w=>w.platinumRequired===true);return {owned:required.filter(w=>p.weapons[w.id]?.purchased===true).length,total:required.length};}
