import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('./_site/',import.meta.url)),port=Number(process.env.PORT||4190),base='/game-companion/';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8'};
http.createServer(async(req,res)=>{
 try{
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
  const url=new URL(req.url,'http://localhost'),name=decodeURIComponent(url.pathname);
  if(name==='/game-companion'||name==='/'){res.writeHead(302,{Location:base});res.end();return;}
  if(!name.startsWith(base))throw Error();
  let file=path.resolve(root,name.slice(base.length)||'.');
  if(file!==path.resolve(root)&&!file.startsWith(path.resolve(root)+path.sep))throw Error();
  const stat=await fs.stat(file);
  if(stat.isDirectory()){
   if(!name.endsWith('/')){res.writeHead(301,{Location:name+'/'+url.search});res.end();return;}
   file=path.join(file,'index.html');
  }
  const body=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('找不到頁面');}
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}${base}`));
