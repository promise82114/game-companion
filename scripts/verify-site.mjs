import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../_site/',import.meta.url));
let files=0,links=0;
async function visit(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory()){assert.ok(!['.git','.openai','upstream','outputs'].includes(entry.name));await visit(file);continue;}files++;
 if(file.endsWith('.html')){const html=await fs.readFile(file,'utf8');for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){const url=match[1];if(/^(https?:|#|data:|mailto:)/.test(url))continue;const target=path.resolve(path.dirname(file),url);assert.ok(target.startsWith(path.resolve(root)));await fs.access(target);links++;}}
}}
await visit(root);
for(const slug of ['edf-wb','edf-wb2']){
 const dir=path.join(root,'games',slug),app=await fs.readFile(path.join(dir,'app.js'),'utf8'),sw=await fs.readFile(path.join(dir,'sw.js'),'utf8'),cloud=await fs.readFile(path.join(dir,'cloud-sync.js'),'utf8');
 assert.ok(app.includes('game-companion.'+slug+'.progress.v1'));assert.ok(!app.includes("KEY='edfwb"));
 assert.ok(sw.includes('game-companion.'+slug+'.assets.'));assert.ok(sw.includes('caches.open(CACHE).then(c=>c.match(e.request))'));assert.ok(sw.includes('self.registration.scope'));assert.ok(!/startsWith\('edfwb/.test(sw));
 for(const match of sw.matchAll(/'\.\/([^']*)'/g)){const target=path.join(dir,match[1]);await fs.access(target);}
 assert.ok(!/await drive\.write\(/.test(cloud));assert.ok(!cloud.includes('setInterval('));
 const adapter=await fs.readFile(path.join(dir,'shared/drive-appdata.js'),'utf8');assert.ok(adapter.includes("'If-Match':etag"));assert.ok(adapter.includes('!this.verified'));
 assert.ok((await fs.readFile(path.join(dir,'shared/sync-session.js'),'utf8')).includes('commitSync'));
 assert.ok((await fs.readFile(path.join(dir,'shared/sync-core.js'),'utf8')).includes('preserveConcurrent'));
}
console.log(JSON.stringify({passed:true,files,localLinks:links,basePath:'/game-companion/',modules:2}));
