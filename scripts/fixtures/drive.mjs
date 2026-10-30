/* 合成 Drive；僅供 Node / 隔離瀏覽器測試，不會連線。 */
export function mockDrive(){
 const files=new Map(),requests=[];let serial=0;
 const controls={ignoreConditions:false,noHeaderEtag:false,noEtag:false,failAfterPatch:false,beforePatch:null,failStatus:0};
 const etag=file=>'"'+file.id+'-'+file.version+'"';
 const metadata=file=>({id:file.id,name:file.name,version:String(file.version),size:String(Buffer.byteLength(JSON.stringify(file.value))),appProperties:file.appProperties});
 function reply(status,value,headers={}){return new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json',...headers}});}
 async function fetch(url,options={}){
  const u=new URL(url),method=options.method||'GET',headers=new Headers(options.headers),owner=(headers.get('authorization')||'Bearer synthetic-a').replace('Bearer ','');
  requests.push({method,path:u.pathname,ifMatch:headers.get('if-match')});
  if(controls.failStatus){const status=controls.failStatus;controls.failStatus=0;return reply(status,{error:'synthetic'});}
  if(u.pathname.endsWith('/about'))return reply(200,{user:{permissionId:owner,emailAddress:owner+'@example.invalid'}});
  if(u.pathname.endsWith('/generateIds'))return reply(200,{ids:['synthetic-file-'+(++serial)]});
  if(method==='GET'&&u.pathname==='/drive/v3/files'){
   const name=u.searchParams.get('q')?.match(/^name = '([^']+)'/)?.[1];return reply(200,{files:[...files.values()].filter(f=>f.owner===owner&&f.name===name).map(metadata)});
  }
  if(method==='POST'){
   const parts=options.body.split('\r\n\r\n'),meta=JSON.parse(parts[1].split('\r\n--')[0]),value=JSON.parse(parts[2].split('\r\n--')[0]);
   if(files.has(meta.id))return reply(409,{error:'exists'});
   const file={...meta,value,owner,version:1};files.set(meta.id,file);return reply(200,metadata(file));
  }
  const id=u.pathname.split('/').at(-1),file=files.get(id);
  if(!file||file.owner!==owner)return reply(404,{error:'not found'});
  if(method==='PATCH'){
   if(controls.beforePatch&&file.appProperties?.purpose!=='sync-safety-test')await controls.beforePatch(file);
   if(!controls.ignoreConditions&&headers.get('if-match')!==etag(file))return reply(412,{error:'stale'});
   file.value=JSON.parse(options.body);file.version++;
   if(controls.failAfterPatch){controls.failAfterPatch=false;throw new TypeError('Synthetic lost acknowledgement');}
   return reply(200,metadata(file));
  }
  if(u.pathname.startsWith('/drive/v2/'))return reply(200,{id,version:String(file.version),...(controls.noEtag?{}:{etag:etag(file)})});
  if(u.searchParams.get('alt')==='media')return reply(200,file.value);
  return reply(200,metadata(file),controls.noHeaderEtag||controls.noEtag?{}:{ETag:etag(file)});
 }
 return {fetch,files,requests,controls,etag,metadata};
}
