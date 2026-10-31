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
 if(config.cloudWritesEnabled)assert.equal(config.cloudSafety,'per-grant-conditional-probe','寫入必須有逐次授權條件驗證閘門');
 await fs.access(path.join(moduleRoot,config.entry));
 await fs.cp(path.join(moduleRoot,'dist'),path.join(output,'games',config.slug),{recursive:true});modules.push(config);
}
await fs.cp(path.join(root,'tools/sync-safety'),path.join(output,'sync-safety'),{recursive:true});
assert.ok(modules.length>0);assert.equal(new Set(modules.map(m=>m.gameId)).size,modules.length);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let html=await fs.readFile(path.join(root,'portal/index.html'),'utf8');
const presentation={
 'edf-wb':{kind:'checklist',features:['武器與角色','配件收集','手動 Drive 同步']},
 'edf-wb2':{kind:'checklist',features:['救出分布','關卡筆記','手動 Drive 同步']},
 mycopunk:{kind:'checklist',features:['雙語裝備攻略','隱藏解鎖','配裝模擬']},
 talos2:{kind:'roadmap',features:['60 個本體獎盃','8 階段','三市長分歧']},
 'thank-goodness-youre-here':{kind:'roadmap',features:['33 個本體獎盃','8 階段','跨階段追蹤']}
};
html=html.replace('<!--GAME_COUNT-->',String(modules.length)).replace('<!--GAME_LIST-->',modules.map(m=>{
 const info=presentation[m.slug]||{kind:'checklist',features:[]};
 return `<article class="game" data-kind="${info.kind}"><a class="game-cover" href="${m.publicPath}" tabindex="-1" aria-hidden="true"><img src="covers/${m.slug}.svg" alt="" width="600" height="360"></a><div class="game-body"><h3>${escape(m.title)}</h3><p>${escape(m.description||'武器、角色、配件與關卡收集手帳')}</p><ul class="game-features">${info.features.map(label=>`<li>${escape(label)}</li>`).join('')}</ul><div class="game-footer"><a class="open-game" href="${m.publicPath}">${info.kind==='roadmap'?'開啟白金攻略':'開啟收集手帳'} <span aria-hidden="true">→</span></a>${m.legacyUrl?`<a class="original" href="${escape(m.legacyUrl)}">舊站 ↗</a>`:''}</div></div></article>`;
}).join('\n'));
await fs.cp(path.join(root,'portal/covers'),path.join(output,'covers'),{recursive:true});
await fs.copyFile(path.join(root,'portal/catalogue.js'),path.join(output,'catalogue.js'));
await fs.writeFile(path.join(output,'index.html'),html);await fs.copyFile(path.join(root,'portal/portal.css'),path.join(output,'portal.css'));await fs.writeFile(path.join(output,'.nojekyll'),'');
console.log(JSON.stringify({built:true,directory:'_site',modules:modules.map(m=>m.slug)}));
