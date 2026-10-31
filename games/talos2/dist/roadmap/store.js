// 各遊戲獨立 IndexedDB；同步演算法沿用既有 core，交易內讀取最新版本。
export function createStore(config, core, onChange=()=>{}) {
  const prefix=config.storagePrefix;
  const fresh=()=>({gameId:config.gameId,schema:1,moduleVersion:config.moduleVersion,revision:0,updatedAt:Date.now(),steps:{},trophies:{},backups:{},branches:{},settings:{}});
  const object=v=>v!==null && typeof v==='object' && !Array.isArray(v);
  function validate(raw) {
    const data=core.clone(raw?.projectId===config.driveProjectId ? raw.data : raw);
    if(!object(data)||data.gameId!==config.gameId||data.schema!==1) throw Error('遊戲識別或進度版本不符；未修改資料。');
    if(!Number.isFinite(data.updatedAt)||data.updatedAt<0||!Number.isSafeInteger(data.revision)||data.revision<0) throw Error('進度時間或修訂欄位損壞；已保留原文。');
    for(const group of ['steps','trophies','backups','branches','settings']) if(!object(data[group])) throw Error('進度欄位損壞：'+group+'；已停止寫入，請匯出原始資料。');
    for(const row of Object.values(data.steps)) if(!object(row)||!['not_started','completed','missed','skipped','unknown'].includes(row.status)) throw Error('步驟狀態不相容；已保留原文。');
    for(const row of Object.values(data.trophies)) if(!object(row)||typeof row.earned!=='boolean') throw Error('獎盃狀態不相容；已保留原文。');
    return {data};
  }
  const channel=typeof BroadcastChannel==='function'?new BroadcastChannel(prefix+'progress'):null;
  channel?.addEventListener('message',()=>onChange());
  let db,sequence=0;
  function transaction(mode, action) {
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('records',mode),records=tx.objectStore('records');let result,error;
      tx.oncomplete=()=>resolve(result);tx.onerror=tx.onabort=()=>reject(error||tx.error||Error('儲存失敗，未套用變更。'));
      const get=records.get('progress');get.onsuccess=()=>{try{result=action(records,get.result);}catch(e){error=e;tx.abort();}};
    });
  }
  const raw=()=>transaction('readonly',(_records,value)=>value);
  const get=async()=>validate(await raw()).data;
  const stamp=async()=>JSON.stringify(await raw());
  async function update(fn, expected) {
    const value=await transaction('readwrite',(records,previous)=>{
      if(expected!==undefined && JSON.stringify(previous)!==expected) throw Error('預覽已過期，請重新比較。');
      const current=validate(previous).data, next=fn(core.clone(current));validate(next);
      next.revision=(current.revision||0)+1;next.updatedAt=Date.now();records.put(next,'progress');return next;
    });
    sequence++;channel?.postMessage('changed');onChange();return value;
  }
  return {validate,get,raw,stamp,sequence:()=>sequence,update,close(){channel?.close();db?.close();},
    async open(){
      db=await new Promise((resolve,reject)=>{const request=indexedDB.open(prefix+'progress.v1',1);request.onupgradeneeded=()=>request.result.createObjectStore('records');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);request.onblocked=()=>reject(Error('其他分頁正在升級資料庫，請關閉後重試。'));});
      db.onversionchange=()=>db.close();
      await transaction('readwrite',(records,value)=>{if(value===undefined)records.put(fresh(),'progress');});return get();
    },
    async checkpoint(label){return transaction('readwrite',(records,value)=>{const key=prefix+'snapshot.'+crypto.randomUUID();records.put({at:new Date().toISOString(),label,raw:core.clone(value)},key);return key;});},
    async archive(bundle){return transaction('readwrite',(records)=>{const key=prefix+'import.raw.'+crypto.randomUUID();records.put(bundle,key);return key;});},
    async exportAll(){return new Promise((resolve,reject)=>{const tx=db.transaction('records','readonly'),s=tx.objectStore('records'),keys=s.getAllKeys(),values=s.getAll();tx.oncomplete=()=>{
      try{const syncState={};for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key?.startsWith(prefix+'sync.'))Object.defineProperty(syncState,key,{value:localStorage.getItem(key),enumerable:true});}
      resolve({gameId:config.gameId,records:keys.result.map((key,i)=>({key,value:values.result[i]})),syncState});}catch(error){reject(error);}
    };tx.onerror=()=>reject(tx.error);});},
    async commitSync(start,merged){return update(current=>core.rebase(start,current,merged));}
  };
}
