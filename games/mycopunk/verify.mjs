import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {appId,gameId,moduleVersion,storagePrefix,storageKey,beforeImportKey,importPrefix,corruptPrefix,backupTimeKey,snapshotPrefix,cachePrefix,emptyCollection,parseCollection,makeBackup,mergeCollections} from './dist/model.js';
const root=fileURLToPath(new URL('./',import.meta.url));
const config=JSON.parse(await fs.readFile(path.join(root,'module.json'),'utf8'));
assert.equal(config.gameId,gameId);assert.equal(config.moduleVersion,moduleVersion);assert.equal(config.progressSchema,1);assert.equal(config.storagePrefix,storagePrefix);assert.equal(config.cloudWritesEnabled,false);
for(const key of [storageKey,beforeImportKey,importPrefix,corruptPrefix,backupTimeKey,snapshotPrefix,cachePrefix])assert.ok(key.startsWith('game-companion.mycopunk.'));
const manifest=JSON.parse(await fs.readFile(path.join(root,'source-manifest.json'),'utf8'));
assert.equal(manifest.commit,config.sourceCommit);
const changed=new Set(['dist/model.js','dist/app.js','dist/index.html','package.json','research/collect-wiki-shapes.py','research/collect-wiki-catalogue.py']);
let immutable=0;
for(const file of manifest.files){
 const bytes=await fs.readFile(path.join(root,file.path));
 if(changed.has(file.path)||file.path.startsWith('scripts/'))continue;
 const digest=file.sha256LF?createHash('sha256').update(bytes.toString('utf8').replace(/\r\n/g,'\n')).digest('hex'):createHash('sha256').update(bytes).digest('hex');
 assert.equal(digest,file.sha256LF||file.sha256,'原始資料／資源不應變更：'+file.path);immutable++;
}
const record={collected:false,tracked:true,note:'合成舊筆記',updatedAt:'2026-01-01T00:00:00.000Z',futureField:{preserve:[1,2]}};
const legacy={appId,schemaVersion:1,records:{'cycler:infinity-burn':record,'future:item':{...record,note:'未知 ID'}},futureTop:{keep:true}};
const parsed=parseCollection(JSON.stringify(legacy));
assert.equal(parsed.gameId,gameId);assert.equal(parsed.records['cycler:infinity-burn'].note,record.note);assert.deepEqual(parsed.records['future:item'].futureField,{preserve:[1,2]});
assert.deepEqual(makeBackup(parsed,'synthetic').futureTop,{keep:true});assert.equal(makeBackup(parsed,'synthetic').records['future:item'].tracked,true);
assert.throws(()=>parseCollection(JSON.stringify({...legacy,gameId:'edf-wb'})));
assert.throws(()=>parseCollection(JSON.stringify({...legacy,appId:'another-app'})));
assert.throws(()=>parseCollection(JSON.stringify({...legacy,schemaVersion:2})));
assert.throws(()=>parseCollection(JSON.stringify({...legacy,records:{'future:item':null}})));
const current=emptyCollection();current.records['cycler:infinity-burn']={...record,collected:true};current.currentOnly={keep:'local'};
const merged=mergeCollections(current,parsed).collection;
assert.equal(merged.records['cycler:infinity-burn'].collected,true);assert.equal(merged.records['future:item'].note,'未知 ID');assert.deepEqual(merged.futureTop,{keep:true});assert.deepEqual(merged.currentOnly,{keep:'local'});
const pollution=JSON.parse(JSON.stringify(legacy));Object.defineProperty(pollution,'__proto__',{value:{synthetic:true},enumerable:true});
assert.equal(Object.hasOwn(parseCollection(JSON.stringify(pollution)),'__proto__'),true);assert.equal({}.synthetic,undefined);
for(const name of ['app','model','migration','build-worker']){const check=spawnSync(process.execPath,['--check',path.join(root,'dist',name+'.js')],{encoding:'utf8'});assert.equal(check.status,0,check.stderr);}
const upstream=spawnSync(process.execPath,[path.join(root,'scripts/validate_site.mjs')],{cwd:root,encoding:'utf8'});assert.equal(upstream.status,0,upstream.stderr);console.log(upstream.stdout.trim());
console.log(JSON.stringify({passed:true,slug:gameId,items:842,legacyIds:660,wikiItems:840,equipment:27,hiddenPaths:7,immutableFiles:immutable,checks:['source hashes','legacy import identity','independent storage','unknown fields/IDs','notes/tracking','cross-game rejection','packing/coordinates/source validation']}));
