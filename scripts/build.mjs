import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../',import.meta.url));
const output=path.join(root,'_site');
// 唯一可清除的產物為 repo 內 _site；不接受外部傳入的刪除路徑。
assert.equal(path.dirname(output),path.resolve(root));
await fs.rm(output,{recursive:true,force:true});await fs.mkdir(output,{recursive:true});
const modules=[];
for(const item of await fs.readdir(path.join(root,'games'),{withFileTypes:true})){
 if(!item.isDirectory())continue;
 const moduleRoot=path.join(root,'games',item.name);
 const config=JSON.parse(await fs.readFile(path.join(moduleRoot,'module.json'),'utf8'));
 assert.equal(config.slug,item.name);assert.match(config.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
 assert.equal(config.publicPath,'games/'+config.slug+'/');assert.equal(config.entry,'dist/index.html');
 assert.equal(config.cloudWritesEnabled,false,'目前發布必須保持雲端寫入停用');
 await fs.access(path.join(moduleRoot,config.entry));
 await fs.cp(path.join(moduleRoot,'dist'),path.join(output,'games',config.slug),{recursive:true});modules.push(config);
}
assert.ok(modules.length>0);assert.equal(new Set(modules.map(m=>m.gameId)).size,modules.length);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let html=await fs.readFile(path.join(root,'portal/index.html'),'utf8');
html=html.replace('<!--GAME_COUNT-->',String(modules.length)).replace('<!--GAME_LIST-->',modules.map(m=>`<article class="game"><div><h3>${escape(m.title)}</h3><p>武器、角色、配件與關卡收集手帳</p>${m.legacyUrl?`<a class="original" href="${escape(m.legacyUrl)}">開啟舊站 ↗</a>`:''}</div><a class="open-game" href="${m.publicPath}">開啟收集手帳 <span aria-hidden="true">→</span></a></article>`).join('\n'));
await fs.writeFile(path.join(output,'index.html'),html);await fs.copyFile(path.join(root,'portal/portal.css'),path.join(output,'portal.css'));await fs.writeFile(path.join(output,'.nojekyll'),'');
console.log(JSON.stringify({built:true,directory:'_site',modules:modules.map(m=>m.slug)}));
