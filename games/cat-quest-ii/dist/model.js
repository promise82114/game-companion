export const gameId='cat-quest-ii';
export const storagePrefix='game-companion.'+gameId+'.';
export const groups=['steps','entities','trophies','counters','settings'];
export const clone=value=>value===undefined?undefined:JSON.parse(JSON.stringify(value));
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const safe=id=>!['__proto__','prototype','constructor'].includes(id);
export function fresh(){return {gameId,platform:'ps4-on-ps5',schema:1,schemaVersion:1,moduleVersion:'1.1.1',dataVersion:'2026-11-27.3',revision:0,updatedAt:Date.now(),...Object.fromEntries(groups.map(g=>[g,{}]))};}
export function validateProgress(p){
 if(!object(p)||p.gameId!==gameId||p.platform!=='ps4-on-ps5'||p.schema!==1||p.schemaVersion!==1)throw Error('遊戲識別、平台或進度版本不符，已停止寫入。');
 if(!Number.isSafeInteger(p.revision)||p.revision<0||!Number.isFinite(p.updatedAt)||p.updatedAt<0)throw Error('修訂或時間欄位損壞。');
 for(const group of groups){if(!object(p[group]))throw Error('缺少進度欄位：'+group);for(const [id,row] of Object.entries(p[group])){
  if(!safe(id)||!object(row))throw Error('無效紀錄：'+id);
  if(group==='settings'){if(typeof row.value!=='string')throw Error('閱讀偏好無效');}
  else if(group==='counters'){if(!Number.isSafeInteger(row.value)||row.value<0)throw Error('計數須為非負安全整數');}
  else if(group==='supplies'){if(!Number.isSafeInteger(row.quantity)||row.quantity<0||typeof row.done!=='boolean')throw Error('備料數量或交付紀錄無效');}
  else if(typeof row.done!=='boolean')throw Error('完成狀態無效：'+id);
  if(row.keyRevision!==undefined&&(!Number.isSafeInteger(row.keyRevision)||row.keyRevision<0))throw Error('項目修訂無效');
  if(row.updatedAt!==undefined&&(!Number.isFinite(row.updatedAt)||row.updatedAt<0))throw Error('項目時間無效');
 }}return p;
}
export const config={gameId,moduleVersion:'1.1.1',storagePrefix,driveProjectId:'game-companion.'+gameId,exportSyncState:false,fresh,validateProgress};
export const isDone=(p,group,id)=>p[group]?.[id]?.done===true;
export const count=(p,group,rows)=>rows.filter(r=>isDone(p,group,r.id)).length;
export const nextStep=(p,d)=>d.steps.find(s=>s.requiredForRoute&&!isDone(p,'steps',s.id))||d.steps.find(s=>!isDone(p,'steps',s.id));
export function writeRecord(p,group,id,value){
 if(!groups.includes(group)||!safe(id))throw Error('無效項目');
 p[group][id]={...p[group][id],...clone(value),keyRevision:p.revision+1,updatedAt:Date.now()};return p;
}
export async function edit(store,group,id,value,expectedRevision){let undo;const p=await store.update(p=>{if(expectedRevision!==undefined&&(p[group][id]?.keyRevision||0)!==expectedRevision)throw Error('此項目已被另一分頁更新，請重新核對。');undo={group,id,before:clone(p[group][id]),revision:p.revision+1};return writeRecord(p,group,id,value);});return {progress:p,undo};}
export async function undoEdit(store,op){return store.update(p=>{const row=p[op.group]?.[op.id];if(row?.keyRevision!==op.revision)throw Error('此項目已有後續變更，撤銷已停止；保留較新的紀錄。');
 // 保留 tombstone 的新修訂，防止值恢復相同後錯誤接受舊撤銷。
 const blank=op.group==='settings'?{value:''}:op.group==='counters'?{value:0}:op.group==='supplies'?{quantity:0,done:false}:{done:false};
 p[op.group][op.id]={...clone(op.before||blank),keyRevision:p.revision+1,updatedAt:Date.now()};return p;});}
export function envelope(p){return {format:'game-companion-backup',gameId,platform:'ps4-on-ps5',schemaVersion:1,dataVersion:p.dataVersion,exportedAt:new Date().toISOString(),progress:clone(p)};}
export function importData(value){
 let p=value;if(value?.recoveryBundle?.localRaw){if(value.gameId!==gameId)throw Error('遊戲識別不符');p=JSON.parse(value.recoveryBundle.localRaw);}
 else if(value?.format){if(value.format!=='game-companion-backup'||value.gameId!==gameId||value.platform!=='ps4-on-ps5'||value.schemaVersion!==1)throw Error('備份格式或版本不支援');p=value.progress;}
 else if(Array.isArray(value?.records)){if(value.gameId!==gameId)throw Error('遊戲識別不符');p=value.records.find(r=>r.key==='progress')?.value;}
 return validateProgress(clone(p));
}
export function differences(local,incoming){const rows=[];
 for(const group of groups)for(const id of new Set([...Object.keys(local[group]),...Object.keys(incoming[group])])){
  const a=local[group][id],b=incoming[group][id];if(JSON.stringify(a)!==JSON.stringify(b))rows.push({group,id,local:clone(a),incoming:clone(b),missing:b===undefined,older:b?.updatedAt!==undefined&&a?.updatedAt!==undefined&&b.updatedAt<a.updatedAt});
 }
 for(const id of new Set([...Object.keys(local),...Object.keys(incoming)]))if(!groups.includes(id)&&!['gameId','platform','schema','schemaVersion','moduleVersion','dataVersion','revision','updatedAt'].includes(id)&&JSON.stringify(local[id])!==JSON.stringify(incoming[id]))rows.push({group:'metadata',id,local:clone(local[id]),incoming:clone(incoming[id]),missing:incoming[id]===undefined});
 return rows;
}
export function applyDifferences(p,rows,selected,allowOlder=false){for(const row of rows){if(!selected.has(row.group+'/'+row.id)||row.missing)continue;if(row.older&&!allowOlder)throw Error('來源較舊；請先核對舊紀錄再重新確認。');if(!safe(row.id))throw Error('無效鍵');if(row.group==='metadata')p[row.id]=clone(row.incoming);else p[row.group][row.id]={...p[row.group][row.id],...clone(row.incoming),keyRevision:p.revision+1,updatedAt:Date.now()};}validateProgress(p);return p;}
