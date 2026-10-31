/* appDataFolder；本次授權的條件更新探測通過後，才允許寫入遊戲備份。 */
(function(global){
 'use strict';
 const api='https://www.googleapis.com/drive/v3/',upload='https://www.googleapis.com/upload/drive/v3/';
 const strong=value=>typeof value==='string'&&/^"[^"\r\n]+"$/.test(value)&&value!=='"*"';
 class DriveError extends Error{constructor(message,code='drive'){super(message);this.code=code;}}
 class DriveAppData{
  #proof=null;#generation=0;
  constructor(auth,fileName,options={}){this.auth=auth;this.fileName=fileName;this.options=options;}
  reset(){this.#generation++;this.#proof=null;}
  get verified(){return !!this.#proof&&this.#proof.authGeneration===this.auth.generation&&this.auth.connected;}
  get proof(){return this.verified?{...this.#proof}:null;}
  async request(url,options={}){if(options.method&&options.method!=='GET')throw new DriveError('請使用已驗證的條件寫入介面。','write-disabled');return this.#request(url,options);}
  async #request(url,options={}){
   if(!url.startsWith(api)&&!url.startsWith(upload)&&!url.startsWith('https://www.googleapis.com/drive/v2/'))throw new DriveError('不支援的 Drive 位址。','invalid');
   const generation=this.#generation,authGeneration=this.auth.generation,token=this.auth.token();
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000),writing=!!options.method&&options.method!=='GET';
   try{
    const response=await fetch(url,{...options,cache:'no-store',signal:controller.signal,headers:{...options.headers,Authorization:'Bearer '+token}}),text=await response.text();
    if(generation!==this.#generation||authGeneration!==this.auth.generation)throw new DriveError('帳號連接已變更；已送出的請求須重新讀取確認。','cancelled');
    if(response.status===401){this.reset();this.auth.invalidate('rejected');throw new DriveError('Google 授權已失效，請重新連接。','expired');}
    if(response.status===412)throw new DriveError('雲端版本已變更，未覆寫；請重新比較。','conflict');
    if(response.status===409)throw new DriveError('指定檔案已建立，請重新讀取確認。','conflict');
    if(!response.ok)throw new DriveError(response.status===403?'Drive 權限不足。':response.status===429?'Drive 限流，請稍後手動重試。':'Drive 請求失敗（'+response.status+'）。',response.status===403?'permission':'drive');
    return {text,etag:response.headers.get('ETag'),status:response.status};
   }catch(error){if(error.code)throw error;throw new DriveError(writing?'寫入結果未知，請重新下載確認；不會盲目重送。':'無法讀取 Drive，請確認網路後重試。',writing?'uncertain':'drive');}finally{clearTimeout(timer);}
  }
  json(result){try{return JSON.parse(result.text);}catch{throw new DriveError('雲端不是有效 JSON。','invalid');}}
  async account(){const data=this.json(await this.request(api+'about?fields=user(permissionId,emailAddress)'));if(!data.user?.permissionId)throw new DriveError('無法辨識 Google 帳號，已停止同步。','invalid');return data.user;}
  async find(){
   const files=[];let token;const q="name = '"+this.fileName.replace(/\\/g,'\\\\').replace(/'/g,"\\'")+"' and trashed = false";
   do{const params=new URLSearchParams({spaces:'appDataFolder',q,fields:'nextPageToken,files(id,name,version,size,appProperties)',pageSize:'100'});if(token)params.set('pageToken',token);
    const data=this.json(await this.request(api+'files?'+params));if(!Array.isArray(data.files))throw new DriveError('Drive 清單格式不正確。','invalid');files.push(...data.files);token=data.nextPageToken;
   }while(token);
   if(files.length>1)throw new DriveError('有多份同名備份，已停止同步；各份檔案均保留。','duplicate');return files[0]||null;
  }
  async metadata(id){
   const result=await this.request(api+'files/'+encodeURIComponent(id)+'?fields=id,name,version,size,appProperties'),file=this.json(result);let etag=result.etag,etagSource='v3-header';
   if(!strong(etag)){
    const v2=this.json(await this.request('https://www.googleapis.com/drive/v2/files/'+encodeURIComponent(id)+'?fields=id,etag,version'));
    if(v2.id!==id||v2.version!==undefined&&String(v2.version)!==String(file.version))throw new DriveError('讀取版本條件期間雲端已變更。','conflict');etag=v2.etag;etagSource='v2-json';
   }
   return {file,etag:strong(etag)?etag:null,etagSource};
  }
  async readId(id){
   const before=await this.metadata(id);if(Number(before.file.size)>5*1024*1024)throw new DriveError('備份超過 5 MiB。','invalid');
   const media=await this.request(api+'files/'+encodeURIComponent(id)+'?alt=media');if(new TextEncoder().encode(media.text).byteLength>5*1024*1024)throw new DriveError('備份超過 5 MiB。','invalid');
   const after=await this.metadata(id);if(String(before.file.version)!==String(after.file.version)||before.etag!==after.etag)throw new DriveError('下載期間版本已變更，請重試。','conflict');
   return {...after,value:this.json(media)};
  }
  #belongs(file){if(file.name!==this.fileName||file.appProperties?.projectId!==this.options.projectId||file.appProperties?.gameId!==this.options.gameId)throw new DriveError('備份的來源識別不符，不會寫入。','invalid');}
  async read(){const file=await this.find();if(!file)return null;this.#belongs(file);const loaded=await this.readId(file.id);this.#belongs(loaded.file);return loaded;}
  async allocate(){const data=this.json(await this.request(api+'files/generateIds?count=1&space=appDataFolder&type=files'));if(!data.ids?.[0])throw new DriveError('無法配置新備份 ID。');return data.ids[0];}
  async #create(id,name,value,appProperties){
   const boundary='gc_'+crypto.randomUUID().replaceAll('-',''),metadata={id,name,mimeType:'application/json',parents:['appDataFolder'],appProperties};
   const body=`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(value)}\r\n--${boundary}--`;
   return this.#request(upload+'files?uploadType=multipart&fields=id,name,version,appProperties',{method:'POST',headers:{'Content-Type':'multipart/related; boundary='+boundary},body});
  }
  async #patch(id,value,etag){if(!strong(etag))throw new DriveError('沒有可用的強 ETag，已停止寫入。','unsafe');return this.#request(upload+'files/'+encodeURIComponent(id)+'?uploadType=media',{method:'PATCH',headers:{'Content-Type':'application/json','If-Match':etag},body:JSON.stringify(value)});}
  async verifySafety(){
   this.#proof=null;const generation=this.#generation,authGeneration=this.auth.generation,id=await this.allocate(),probeId=crypto.randomUUID();
   const name='game-companion.'+this.options.gameId+'.sync-safety-test.'+probeId+'.json',value=marker=>({app:'game-companion-sync-safety-test',synthetic:true,probeId,marker});
   await this.#create(id,name,value('initial'),{purpose:'sync-safety-test',gameId:this.options.gameId});
   const first=await this.readId(id);if(!strong(first.etag))throw new DriveError('測試檔沒有強 ETag，雲端寫入維持停用。','unsafe');
   await this.#patch(id,value('newer'),first.etag);let staleStatus=0;
   try{await this.#patch(id,value('stale-must-not-win'),first.etag);}catch(error){if(error.code==='conflict')staleStatus=412;else throw error;}
   if(staleStatus!==412)throw new DriveError('Drive 接受過期版本，雲端寫入維持停用。','unsafe');
   const second=await this.readId(id);if(second.value.marker!=='newer')throw new DriveError('過期寫入改變測試內容，已停止。','unsafe');
   const contenders=['parallel-a','parallel-b'],outcomes=await Promise.all(contenders.map(async marker=>{try{await this.#patch(id,value(marker),second.etag);return 200;}catch(error){if(error.code==='conflict')return 412;throw error;}}));
   if(outcomes.filter(s=>s===200).length!==1||outcomes.filter(s=>s===412).length!==1)throw new DriveError('競爭更新沒有恰好一勝一拒，雲端寫入維持停用。','unsafe');
   const final=await this.readId(id);if(final.value.marker!==contenders[outcomes.indexOf(200)])throw new DriveError('競爭結果與儲存內容不一致。','unsafe');
   if(generation!==this.#generation||authGeneration!==this.auth.generation)throw new DriveError('驗證期間授權變更。','cancelled');
   this.#proof={authGeneration,probeId,checkedAt:new Date().toISOString(),staleStatus,parallelStatuses:outcomes,etagSource:first.etagSource};return {...this.#proof};
  }
  async write(value,expected,{createId}={}){
   if(!this.options.writesEnabled||!this.verified)throw new DriveError('本次授權尚未通過遠端競爭驗證，雲端寫入停用。','write-disabled');
   if(this.fileName!=='game-companion.'+this.options.gameId+'.progress.v1.json')throw new DriveError('不能寫入舊站或其他名稱的備份。','invalid');
   if(value?.projectId!==this.options.projectId||value?.data?.gameId!==this.options.gameId||typeof value.syncRevision!=='string')throw new DriveError('上傳遊戲或修訂識別不符。','invalid');
   if(new TextEncoder().encode(JSON.stringify(value)).byteLength>5*1024*1024)throw new DriveError('上傳超過 5 MiB，已停止。','invalid');
   const permitGeneration=this.#generation,permitAuth=this.auth.generation,current=await this.find();
   if(permitGeneration!==this.#generation||permitAuth!==this.auth.generation||!this.verified)throw new DriveError('授權在寫入前已變更。','cancelled');
   if(expected){
    if(!current||current.id!==expected.file.id)throw new DriveError('備份配對已變更。','conflict');this.#belongs(current);
    if(!strong(expected.etag))throw new DriveError('沒有強 ETag，不會降級為無條件寫入。','unsafe');await this.#patch(current.id,value,expected.etag);
   }else{if(current)throw new DriveError('其他裝置已建立備份，請重新比較。','conflict');if(!createId)throw new DriveError('缺少已保存的新檔 ID。','invalid');await this.#create(createId,this.fileName,value,{projectId:this.options.projectId,gameId:this.options.gameId});}
   const loaded=await this.read();if(!loaded||loaded.value.syncRevision!==value.syncRevision)throw new DriveError('寫入後遠端已有新修訂；本機不覆寫，請重新比較。','conflict');return loaded;
  }
 }
 global.SideProjectDrive={DriveAppData,DriveError,strong};
})(window);
