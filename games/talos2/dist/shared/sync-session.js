/* 各遊戲各帳號自己的 Base / Local / Remote 交易；不包含登入或自動排程。 */
(function(global){
 'use strict';
 const core=global.SideProjectSync;
 class SyncSession{
  constructor({drive,local,storage,prefix,gameId,projectId,identity,check=()=>{}}){Object.assign(this,{drive,local,storage,prefix,gameId,projectId,identity,check});this.baseKey=prefix+'sync.base.'+identity;this.pendingKey=prefix+'sync.pending.'+identity;this.base=this.loadBase();}
  loadBase(){
   const raw=this.storage.getItem(this.baseKey);if(!raw)return null;
   let value;try{value=JSON.parse(raw);}catch{throw Error('同步 Base 損壞，不能假裝首次同步。請先匯出備份。');}
   if(value.gameId!==this.gameId||value.projectId!==this.projectId||value.identity!==this.identity||!value.fileId)throw Error('同步 Base 的遊戲／帳號不符。');
   this.local.validate(value.data);return value;
  }
  async dirty(){return !this.base||core.signature((await this.local.get()))!==core.signature(this.base.data);}
  async remote(){
   const loaded=await this.drive.read();this.check();if(!loaded)return null;
   if(loaded.value.projectId!==this.projectId||loaded.value.data?.gameId!==this.gameId)throw Error('雲端遊戲識別不符，已停止同步。');
   loaded.data=global.SideProjectProgress.unpack(loaded.value,this.projectId,this.local.validate).data;return loaded;
  }
  paired(remote){
   if(this.base&&(!remote||remote.file.id!==this.base.fileId))throw Error('共同 Base 的檔案已刪除或配對改變。保留兩端資料，停止寫入。');
  }
  archive(value,kind){const key=this.prefix+'sync.recovery.'+crypto.randomUUID();this.storage.setItem(key,JSON.stringify({gameId:this.gameId,at:new Date().toISOString(),kind,...value}));return key;}
  async start(){
   if(!this.drive.verified)throw Error('請先驗證本次 Drive 條件寫入能力。');
   this.base=this.loadBase();const sequence=this.local.sequence(),remote=await this.remote();this.paired(remote);
   const pendingRaw=this.storage.getItem(this.pendingKey);
   if(pendingRaw){
    let pending;try{pending=JSON.parse(pendingRaw);}catch{throw Error('未完成同步紀錄損壞，請先匯出備份。');}
    if(pending.gameId!==this.gameId||pending.identity!==this.identity)throw Error('未完成同步的帳號或遊戲不符。');
    if(remote&&pending.upload?.syncRevision===remote.value.syncRevision)return this.complete(pending.start,remote,{recovered:true,sequence});
    this.archive({pending},'結果未知的前次同步');
   }
   return this.plan(remote,{sequence});
  }
  async plan(remote,{sequence=this.local.sequence()}={}){
   const start=await this.local.get(),stamp=JSON.stringify(start),plan=core.merge(this.base?.data||null,start,remote?.data||start,{hasBase:!!this.base});
   const review={kind:'review',plan,start,stamp,remote,sequence,first:!this.base};
   if(review.first||plan.conflicts.length)return review;
   return this.send(review,[]);
  }
  async confirm(review,choices){
   const remote=await this.remote();this.paired(remote);(await this.local.get());
   if((await this.local.stamp())!==review.stamp||remote?.etag!==review.remote?.etag||remote?.file.id!==review.remote?.file.id){return {changed:true,...await this.plan(remote,{sequence:this.local.sequence()})};}
   return this.send({...review,remote},choices);
  }
  async send(review,choices){
   this.check();if(!this.drive.verified)throw Error('授權或條件驗證已失效。');
   (await this.local.get());if((await this.local.stamp())!==review.stamp)return {changed:true,...await this.plan(review.remote)};
   const data=this.local.validate(core.resolve(review.plan,choices)).data;
   if(review.remote&&core.signature(data)===core.signature(review.remote.data))return this.complete(review.start,review.remote,{sequence:review.sequence});
   await this.local.checkpoint('雲端同步前');
   if(review.plan.conflicts.length)this.archive({base:this.base,local:review.start,remote:review.remote?.value},'明確選擇衝突前');
   const syncData=core.clone(data);delete syncData.journalSignature;delete syncData.storageVersion;
   const upload={...review.remote?.value,...global.SideProjectProgress.pack(this.projectId,syncData),gameId:this.gameId,syncRevision:crypto.randomUUID(),baseRevision:review.remote?.value.syncRevision||null};
   const createId=review.remote?undefined:await this.drive.allocate();this.check();
   // pending 在連線寫入前持久化。結果未知時，下一次先下載核對修訂，絕不盲目重送。
   this.storage.setItem(this.pendingKey,JSON.stringify({gameId:this.gameId,identity:this.identity,start:review.start,upload,createId,sequence:review.sequence,remote:review.remote?.value}));
   const acknowledged=await this.drive.write(upload,review.remote,{createId});this.check();
   acknowledged.data=this.local.validate(acknowledged.value.data).data;
   return this.complete(review.start,acknowledged,{sequence:review.sequence});
  }
  async complete(start,remote,{recovered=false,sequence}={}){
   this.check();await this.local.checkpoint('套用已確認雲端資料前');
   // 以「準備上傳時的本機」為 Base 再做一次 rebase；同期間的新本機編輯優先保留。
   const current=await this.local.commitSync(start,remote.data);
   const base={gameId:this.gameId,projectId:this.projectId,identity:this.identity,fileId:remote.file.id,syncRevision:remote.value.syncRevision||null,data:remote.data,savedAt:new Date().toISOString()};
   this.storage.setItem(this.baseKey,JSON.stringify(base));this.base=base;this.storage.removeItem(this.pendingKey);
   return {kind:'complete',dirty:core.signature(current)!==core.signature(base.data),recovered,sequenceStart:sequence,sequenceEnd:this.local.sequence()};
  }
 }
 global.SideProjectSyncSession=SyncSession;
})(window);
