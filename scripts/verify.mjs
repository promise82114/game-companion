import fs from 'node:fs/promises';
import vm from 'node:vm';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const results=[];
for(const slug of ['edf-wb','edf-wb2']){
 const dir=path.join(root,'games',slug),context={window:{}};vm.createContext(context);
 const scripts=['data','details','translations','acquisition',...(slug==='edf-wb'?['mission-facts']:[]),'missions','recommendations','content','cloud-config','shared/progress-envelope'];
 for(const script of scripts)vm.runInContext(await fs.readFile(path.join(dir,'dist',script+'.js'),'utf8'),context);
 const w=context.window,catalog=w.EDF_CATALOG;
 assert.equal(catalog.items.length,slug==='edf-wb'?864:1208);assert.equal(new Set(catalog.items.map(i=>i.id)).size,catalog.items.length);
 assert.equal(w.EDF_MISSIONS.rows.length,slug==='edf-wb'?71:120);
 context.catalog=catalog;context.ids=new Set(catalog.items.map(i=>i.id));context.missionIds=new Set(w.EDF_MISSIONS.rows.map(m=>m.code));context.contentIds=new Set(w.EDF_CONTENT.options.map(o=>o.id));
 const source=await fs.readFile(path.join(dir,'dist/app.js'),'utf8');
 vm.runInContext(source.slice(source.indexOf('const fresh='),source.indexOf('function snapshots()'))+'\nwindow.audit={fresh,validate};',context);
 const {fresh,validate}=w.audit,raw=fresh(),id=catalog.items[0].id;
 raw.catalogVersion='original-content-version';raw.unknownTop={keep:'synthetic'};raw.entries[id]={owned:false,updatedAt:2,count:7,note:'synthetic'};
 raw.entries['unknown-future-id']={futureShape:[1,2,3]};
 const checked=validate(raw);assert.equal(checked.unknown,1);assert.equal(checked.data.entries[id].count,7);assert.equal(checked.data.entries[id].note,'synthetic');assert.equal(checked.data.entries[id].owned,false);assert.equal(checked.data.entries['unknown-future-id'].futureShape.length,3);assert.equal(checked.data.unknownTop.keep,'synthetic');assert.equal(checked.data.catalogVersion,raw.catalogVersion);
 assert.throws(()=>validate({...raw,gameId:slug==='edf-wb'?'edf-wb2':'edf-wb'}));assert.throws(()=>validate({...raw,app:'another-game'}));
 const legacy={...raw};delete legacy.gameId;delete legacy.favorites;delete legacy.content;delete legacy.missionNotes;
 assert.equal(validate(legacy).data.content,undefined);
 const legacyProject=slug==='edf-wb'?'edfwb-checklist':'edfwb2-checklist';
 assert.equal(validate(w.SideProjectProgress.pack(legacyProject,legacy)).data.app,raw.app);
 assert.equal(validate(w.SideProjectProgress.pack(w.SIDE_PROJECT_CLOUD_CONFIG.projectId,raw)).data.gameId,slug);
 assert.throws(()=>validate(w.SideProjectProgress.pack('another-game',raw)));
 assert.equal(w.SIDE_PROJECT_CLOUD_CONFIG.writesEnabled,true);
 // 直接測 adapter 的最後一道防線，不依賴按鈕 disabled 或 config flag。
 vm.runInContext(await fs.readFile(path.join(dir,'dist/shared/drive-appdata.js'),'utf8'),context);
 const adapter=new w.SideProjectDrive.DriveAppData({token(){throw Error('不應取得 Token');}},w.SIDE_PROJECT_CLOUD_CONFIG.fileName);
 await assert.rejects(adapter.write(raw,null),error=>error.code==='write-disabled');
 const manifest=JSON.parse(await fs.readFile(path.join(dir,'source-manifest.json'),'utf8'));
 const unchanged=manifest.files.filter(file=>file.path.startsWith('dist/')&&!['dist/app.js','dist/index.html','dist/sw.js','dist/cloud-config.js','dist/cloud-sync.js','dist/shared/drive-appdata.js','dist/shared/google-auth.js'].includes(file.path));
 for(const file of unchanged){const data=await fs.readFile(path.join(dir,file.path),'utf8');assert.equal(createHash('sha256').update(data.replace(/\r\n/g,'\n')).digest('hex'),file.sha256LF,'攻略內容／UI 樣式不可變更：'+slug+'/'+file.path);}
 results.push({slug,items:catalog.items.length,missions:w.EDF_MISSIONS.rows.length,immutableFiles:unchanged.length,unknownData:'retained',cloudWrite:'blocked-until-current-grant-proven'});
}
const legacyCheck=spawnSync(process.execPath,['verify.mjs'],{cwd:path.join(root,'games/edf-wb'),encoding:'utf8'});assert.equal(legacyCheck.status,0,legacyCheck.stderr);console.log(legacyCheck.stdout.trim());
const mycopunkCheck=spawnSync(process.execPath,['verify.mjs'],{cwd:path.join(root,'games/mycopunk'),encoding:'utf8'});assert.equal(mycopunkCheck.status,0,mycopunkCheck.stderr);console.log(mycopunkCheck.stdout.trim());
results.push({slug:'mycopunk',items:842,legacyIds:660,equipment:27,hiddenPaths:7,cloudWrite:'not implemented'});
const thankGoodnessCheck=spawnSync(process.execPath,['verify.mjs'],{cwd:path.join(root,'games/thank-goodness-youre-here'),encoding:'utf8'});assert.equal(thankGoodnessCheck.status,0,thankGoodnessCheck.stderr);console.log(thankGoodnessCheck.stdout.trim());
results.push({slug:'thank-goodness-youre-here',trophies:33,roadmap:'independent IndexedDB steps and trophies',cloudWrite:'blocked-until-current-grant-proven'});
console.log(JSON.stringify({passed:true,modules:results}));
