/* 此模組的明確匯入流程；不讀取舊站 Key、不連線、不操作其他遊戲。 */
(function(global){
 'use strict';
 const storage=global.EDF_CHECKLIST_STORAGE,config=global.SIDE_PROJECT_CLOUD_CONFIG,$=id=>document.getElementById(id);
 const fields={entries:'owned',favorites:'favorite',content:'enabled',missionNotes:'text'};
 const known={entries:new Set(global.EDF_CATALOG.items.map(i=>i.id)),favorites:new Set(global.EDF_MISSIONS.rows.map(m=>m.code)),content:new Set(global.EDF_CONTENT.options.map(o=>o.id)),missionNotes:new Set(global.EDF_MISSIONS.rows.map(m=>m.code))};
 const names=new Map([...global.EDF_CATALOG.items.map(i=>[i.id,i.name+' '+i.variant]),...global.EDF_CONTENT.options.map(o=>[o.id,o.name])]);
 const clone=value=>JSON.parse(JSON.stringify(value));
 const put=(map,id,value)=>Object.defineProperty(map,id,{value,enumerable:true,writable:true,configurable:true});
 let pending=null;
 const panel=$('importPreview');
 const externalButton=document.createElement('button');externalButton.id='migrationExternal';externalButton.className='button';externalButton.textContent='比較舊分頁另存的進度';$('backupDialog').append(externalButton);
 function externalState(){externalButton.hidden=!storage.externalRaw();}
 externalButton.onclick=()=>{const raw=storage.externalRaw();if(raw)preview(raw,'舊分頁的獨立原文備份');};
 global.addEventListener('edf-external-progress',externalState);global.addEventListener('storage',externalState);global.addEventListener('edf-progress-change',externalState);externalState();
 $('merge').textContent='套用已選差異';
 panel.insertAdjacentHTML('beforeend','<section class="migration-review" aria-label="匯入差異"><p id="migrationSummary"></p><p>原始檔、未知欄位與無法對應項目會完整保留在匯入紀錄及備份中。來源檔不會被修改。</p><div class="cloud-actions"><button type="button" id="migrationLocal">差異全部保留本機</button><button type="button" id="migrationSource">差異全部使用來源</button></div><div class="migration-scroll"><table><thead><tr><th>項目</th><th>目前本機</th><th>匯入來源</th><th>選擇</th></tr></thead><tbody id="migrationRows"></tbody></table></div><button type="button" id="migrationBackup" class="button">下載來源與匯入前進度備份</button><label class="migration-ack"><input type="checkbox" id="migrationAck" disabled> 我已保留下載的備份</label><p id="migrationMessage" role="status"></p></section>');
 const rowValue=(record,key)=>{
  if(record===undefined)return {[fields[key]]:key==='missionNotes'?'':false};
  if(!record||typeof record!=='object')return record;
  return Object.fromEntries(Object.entries(record).filter(([field])=>!['updatedAt','changeId'].includes(field)));
 };
 const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function showValue(record,key){
  if(record===undefined)return '未記錄';
  const value=record?.[fields[key]];
  const extra=record&&typeof record==='object'?Object.fromEntries(Object.entries(record).filter(([field])=>![fields[key],'updatedAt','changeId'].includes(field))):{};
  const suffix=Object.keys(extra).length?'\n附加欄位：'+JSON.stringify(extra):'';
  if(key==='missionNotes'&&typeof value==='string')return (value||'（空白）')+suffix;
  if(typeof value==='boolean')return (value?'是':'否')+suffix;
  return JSON.stringify(record);
 }
 function controls(){
  const ready=pending&&$('migrationAck').checked&&pending.rows.every(row=>row.choice);
  $('merge').disabled=!ready;$('replace').disabled=!ready;
 }
 function preview(raw,label='JSON 備份'){
  pending=null;$('importPreview').hidden=true;
  const checked=storage.validate(raw),current=storage.get(),source=checked.data;
  const stamp=storage.stamp(),archiveKey='game-companion.'+config.gameId+'.import.'+crypto.randomUUID();
  const archive={gameId:config.gameId,createdAt:new Date().toISOString(),label,source:clone(raw),current:clone(current)};
  // 未成功保存兩端原文便不開放套用；不因快照或配額失敗而繼續。
  localStorage.setItem(archiveKey,JSON.stringify(archive));
  const rows=[];
  for(const key of Object.keys(fields))for(const id of new Set([...Object.keys(current[key]||{}),...Object.keys(source[key]||{})])){
   if(source[key]===undefined)continue;
   const local=Object.hasOwn(current[key]||{},id)?current[key][id]:undefined,incoming=Object.hasOwn(source[key]||{},id)?source[key][id]:undefined;
   const isKnown=known[key].has(id);
   if(!equal(isKnown?rowValue(local,key):local,isKnown?rowValue(incoming,key):incoming))rows.push({key,id,local,incoming,choice:''});
  }
  pending={current,source,raw:clone(raw),stamp,archiveKey,archive,rows};
  $('migrationRows').replaceChildren();
  for(const [index,row]of rows.entries()){
   const tr=document.createElement('tr');
   for(const text of [(names.get(row.id)||row.id)+(known[row.key].has(row.id)?'':'（未知項目，保留原文）'),showValue(row.local,row.key),showValue(row.incoming,row.key)]){const td=document.createElement('td');td.textContent=text;tr.append(td);}
   const td=document.createElement('td'),select=document.createElement('select');
   select.setAttribute('aria-label','選擇 '+(names.get(row.id)||row.id));select.dataset.migrationRow=String(index);
   for(const [value,text]of [['','請選擇'],['local','保留本機'],['source','使用來源']])select.add(new Option(text,value));
   select.onchange=()=>{row.choice=select.value;controls();};td.append(select);tr.append(td);$('migrationRows').append(tr);
  }
  const owned=data=>Object.values(data.entries||{}).filter(e=>e?.owned===true).length;
  $('importDescription').textContent=label+'：本機 '+owned(current)+' 項已取得，來源 '+owned(source)+' 項已取得。';
  $('migrationSummary').textContent=rows.length+' 筆差異；'+checked.unknown+' 個無法對應項目。請逐筆選擇，或使用批次選擇。';
  $('migrationAck').checked=false;$('migrationAck').disabled=true;$('migrationMessage').textContent='兩端原文已保存在此遊戲的獨立匯入紀錄；請再下載備份。';
  $('backupMessage').textContent='';$('importPreview').hidden=false;controls();
  return rows.length;
 }
 for(const [button,choice]of [['migrationLocal','local'],['migrationSource','source']])$(button).onclick=()=>{if(!pending)return;pending.rows.forEach(row=>row.choice=choice);$('migrationRows').querySelectorAll('select').forEach(select=>select.value=choice);controls();};
 $('migrationAck').onchange=controls;
 $('migrationBackup').onclick=()=>{
  if(!pending)return;
  storage.export({...pending.current,recoveryBundle:pending.archive});
  $('migrationAck').disabled=false;$('migrationMessage').textContent='已送出下載；請確認檔案已保存，再勾選確認。';
 };
 function commit(mode){
  if(!pending||!$('migrationAck').checked||pending.rows.some(row=>!row.choice))return;
  try{
   if(mode==='replace'&&!confirm('將依已選差異還原進度？未提供的舊版欄位會保留，兩端原文已有備份。'))return;
   const {current,source,rows}=pending,next=clone(current);
   // 合併保留目前群組，還原將來源未列出的已知項目設為明確 false／空值。
   const now=Math.max(Date.now(),...Object.keys(fields).flatMap(key=>Object.values(current[key]||{}).map(e=>Number(e?.updatedAt)||0)))+1;
   for(const key of Object.keys(fields)){
    if(source[key]===undefined)continue;
    next[key]??={};
    for(const [id,value]of Object.entries(source[key]))if(!Object.hasOwn(next[key],id))put(next[key],id,clone(value));
    if(mode==='replace')for(const id of known[key])if(source[key][id]===undefined)next[key][id]={...next[key][id],[fields[key]]:key==='missionNotes'?'':false,updatedAt:now};
   }
   for(const row of rows){
    const selected=row.choice==='source'?row.incoming:row.local;
    if(selected===undefined){
     if(known[row.key].has(row.id))next[row.key][row.id]={...next[row.key][row.id],[fields[row.key]]:row.key==='missionNotes'?'':false,updatedAt:now};
     // 未知項目不因另一端缺少而刪除。
    }else put(next[row.key],row.id,known[row.key].has(row.id)?{...clone(selected),updatedAt:now}:clone(selected));
   }
   // 原始 envelope 及碰撞的未知欄位一併保存在可匯出的資料中。
   const previousHistory=Array.isArray(current.importHistory)?current.importHistory:[];
   const record=clone(pending.archive);
   // 匯入前的歷史已在主陣列保留，避免每次把整份歷史再巢狀複製一遍。
   if(Array.isArray(record.current.importHistory)){record.currentHistoryLength=record.current.importHistory.length;delete record.current.importHistory;}
   record.archiveKey=pending.archiveKey;
   next.importHistory=[...previousHistory,record];
   next.gameId=config.gameId;
   storage.applyReviewed(next,pending.stamp);externalState();
   pending=null;$('importPreview').hidden=true;$('backupMessage').textContent='已依差異選擇匯入；來源與匯入前進度已保留。雲端未變更。';
  }catch(error){$('migrationMessage').textContent=error.message;}
 }
 $('merge').onclick=()=>commit('merge');$('replace').onclick=()=>commit('replace');
 $('importFile').onchange=async event=>{
  pending=null;panel.hidden=true;
  try{const file=event.target.files[0];if(!file)return;if(file.size>5*1024*1024)throw Error('備份超過 5 MiB，已停止匯入。');preview(JSON.parse(await file.text()),file.name);}catch(error){$('backupMessage').textContent=error.message;}finally{event.target.value='';}
 };
 $('restoreSnapshot').onclick=()=>{
  try{const list=JSON.parse(localStorage.getItem('game-companion.'+config.gameId+'.snapshots.v1')||'[]');const selected=list[Number($('snapshots').value)];if(selected)preview(selected.data,'本機快照 '+new Date(selected.at).toLocaleString('zh-TW'));}catch(error){$('backupMessage').textContent=error.message;}
 };
 global.EDF_MIGRATION={preview};
})(window);
