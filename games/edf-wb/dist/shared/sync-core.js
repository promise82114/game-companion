/* 遊戲模組內的純三方合併與本機操作日誌；沒有 OAuth 或跨遊戲存取。 */
(function(global){
 'use strict';
 const groups=['entries','favorites','content','missionNotes'];
 const metadata=new Set(['updatedAt','revision','moduleVersion','exportedAt','journalSignature','storageVersion']);
 const clone=value=>value===undefined?undefined:JSON.parse(JSON.stringify(value));
 const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
 const put=(target,key,value)=>Object.defineProperty(target,key,{value,enumerable:true,configurable:true,writable:true});
 function ignored(path,key){return path.length===0&&metadata.has(key)||path.length===2&&groups.includes(path[0])&&['updatedAt','changeId'].includes(key);}
 function normalized(value,path=[]){
  if(Array.isArray(value))return value.map((v,i)=>normalized(v,[...path,String(i)]));
  if(!object(value))return value;
  const out={};for(const key of Object.keys(value).sort())if(!ignored(path,key))put(out,key,normalized(value[key],[...path,key]));return out;
 }
 const signature=value=>JSON.stringify(normalized(value));
 // 僅辨識舊分頁意外改寫，不作密碼學／雲端身份驗證；避免把整份進度重複嵌入備份。
 function fingerprint(value){const text=signature(value);let a=2166136261,b=5381;for(let i=0;i<text.length;i++){const n=text.charCodeAt(i);a=Math.imul(a^n,16777619);b=Math.imul(b,33)^n;}return text.length+':'+(a>>>0).toString(16)+':'+(b>>>0).toString(16);}
 const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function merge(base,local,remote,{hasBase=base!==null&&base!==undefined}={}){
  const conflicts=[];
  function visit(b,l,r,path){
   if(equal(l,r))return clone(l);
   if(hasBase&&equal(l,b))return clone(r);
   if(hasBase&&equal(r,b))return clone(l);
   if(object(l)&&object(r)&&(b===undefined||object(b))){
    const out={};for(const key of new Set([...Object.keys(b||{}),...Object.keys(l),...Object.keys(r)])){
     const value=visit(Object.hasOwn(b||{},key)?b[key]:undefined,Object.hasOwn(l,key)?l[key]:undefined,Object.hasOwn(r,key)?r[key]:undefined,[...path,key]);
     if(value!==undefined)put(out,key,value);
    }return out;
   }
   conflicts.push({path,base:clone(b),local:clone(l),remote:clone(r)});return clone(l);
  }
  return {data:visit(normalized(base||{}),normalized(local),normalized(remote),[]),conflicts,local:clone(local),remote:clone(remote),base:clone(base),hasBase};
 }
 function resolve(plan,choices){
  const out=clone(plan.data);
  plan.conflicts.forEach((conflict,index)=>{
   const choice=choices[index];if(!['local','remote'].includes(choice))throw Error('仍有未選擇的衝突。');
   let target=out;for(const key of conflict.path.slice(0,-1)){if(!Object.hasOwn(target,key)||!object(target[key]))put(target,key,{});target=target[key];}
   const key=conflict.path.at(-1),value=conflict[choice];if(value===undefined)delete target[key];else put(target,key,clone(value));
  });
  for(const key of metadata)if(Object.hasOwn(plan.local,key))put(out,key,clone(plan.local[key]));
  for(const group of groups)for(const [id,record]of Object.entries(out[group]||{}))if(object(record)){
   const originals=[plan.local?.[group]?.[id],plan.remote?.[group]?.[id],plan.base?.[group]?.[id]];
   if(originals.some(v=>Object.hasOwn(v||{},'updatedAt')))record.updatedAt=Math.max(0,...originals.map(v=>Number.isFinite(v?.updatedAt)?v.updatedAt:0));
  }
  return out;
 }
 function rebase(start,current,merged){const plan=merge(start,current,merged);return resolve(plan,plan.conflicts.map(()=>'local'));}
 const later=(a,b)=>!b||a.clock>b.clock||a.clock===b.clock&&a.id>b.id;
 class Journal{
  constructor(prefix,storage,seed){
   this.prefix=prefix;this.storage=storage;this.checkpoint=prefix+'journal.checkpoint.v1';this.opPrefix=prefix+'journal.op.';
   if(!storage.getItem(this.checkpoint))storage.setItem(this.checkpoint,JSON.stringify({id:crypto.randomUUID(),clock:0,data:clone(seed),versions:{}}));
  }
  operations(){const out=[];for(let i=0;i<this.storage.length;i++){const key=this.storage.key(i);if(key?.startsWith(this.opPrefix)){const raw=this.storage.getItem(key);if(raw)out.push({key,raw,op:JSON.parse(raw)});}}return out;}
  fold(entries=this.operations()){
   const saved=JSON.parse(this.storage.getItem(this.checkpoint));if(!saved?.data||!object(saved.versions))throw Error('本機操作日誌損壞，已停止同步；請先匯出備份。');
   const out=clone(saved);entries.sort((a,b)=>a.op.clock-b.op.clock||a.op.id.localeCompare(b.op.id));
   for(const {op}of entries){
    if(!Number.isSafeInteger(op.clock)||!Array.isArray(op.changes))throw Error('本機操作日誌格式不相容。');
    for(const change of op.changes){const slot=JSON.stringify(change.path);if(!later(op,out.versions[slot]))continue;
     let target=out.data;for(const key of change.path.slice(0,-1)){if(!Object.hasOwn(target,key)||!object(target[key]))put(target,key,{});target=target[key];}
     const key=change.path.at(-1);if(op.conditional&&!equal(Object.hasOwn(target,key)?target[key]:undefined,change.expected))continue;if(change.deleted)delete target[key];else put(target,key,clone(change.value));put(out.versions,slot,{clock:op.clock,id:op.id});
    }
    out.data.revision=(Number.isSafeInteger(out.data.revision)?out.data.revision:0)+1;out.clock=Math.max(out.clock,op.clock);out.data.updatedAt=Math.max(out.data.updatedAt||0,op.clock);
   }
   return out;
  }
  read(){return this.fold().data;}
  stamp(){const folded=this.fold();return JSON.stringify(normalized({data:normalized(folded.data),versions:folded.versions}));}
  write(previous,next,{preserveConcurrent=false}={}){
   const current=this.fold(),clock=Math.max(Date.now(),current.clock)+1,id=crypto.randomUUID(),changes=[];
   const add=(path,before,after)=>{if(equal(before,after))return;const value=clone(after);if(path.length===2&&object(value)){value.updatedAt=clock;value.changeId=id;}changes.push({path,deleted:after===undefined,value,...(preserveConcurrent?{expected:clone(before)}:{})});};
   for(const group of groups)for(const key of new Set([...Object.keys(previous[group]||{}),...Object.keys(next[group]||{})]))add([group,key],previous[group]?.[key],next[group]?.[key]);
   for(const key of new Set([...Object.keys(previous),...Object.keys(next)]))if(!groups.includes(key)&&!metadata.has(key))add([key],previous[key],next[key]);
   if(!changes.length)return current.data;
   this.storage.setItem(this.opPrefix+id,JSON.stringify({id,clock,changes,conditional:preserveConcurrent}));
   return this.read();
  }
  async compact(){
   if(!global.navigator?.locks)return;
   await global.navigator.locks.request(this.prefix+'journal.compact',{ifAvailable:true},lock=>{
    if(!lock)return;const entries=this.operations();if(entries.length<64&&entries.reduce((n,e)=>n+e.raw.length,0)<262144)return;
    const saved=this.fold(entries);saved.id=crypto.randomUUID();this.storage.setItem(this.checkpoint,JSON.stringify(saved));
    for(const entry of entries)if(this.storage.getItem(entry.key)===entry.raw)this.storage.removeItem(entry.key);
   });
  }
 }
 global.SideProjectSync={groups,clone,normalized,signature,fingerprint,merge,resolve,rebase,Journal};
})(window);
