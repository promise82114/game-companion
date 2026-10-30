// 無第三方套件、無網路、無使用者存檔寫入；驗證一代資料與備份契約。
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
const context={window:{}};
vm.createContext(context);
for(const f of ['data','details','translations','acquisition','mission-facts','missions','recommendations','content','cloud-config','shared/progress-envelope'])vm.runInContext(await fs.readFile('dist/'+f+'.js','utf8'),context);
const w=context.window,items=w.EDF_CATALOG.items;
assert.equal(items.length,864);assert.equal(new Set(items.map(i=>i.id)).size,items.length);
assert.equal(items.filter(i=>i.kind==='weapons').length,455);
assert.equal(items.filter(i=>i.kind==='weapons'&&!i.extra).length,310);
assert.equal(items.filter(i=>i.kind==='characters').length,209);
assert.equal(items.filter(i=>i.kind==='characters'&&!i.extra).length,186);
assert.equal(items.filter(i=>i.kind==='accessories').length,200);
assert.ok(items.every(i=>i.source.startsWith('https://w.atwiki.jp/edfwb/')));
assert.ok(items.every(i=>w.EDF_TRANSLATIONS.names[i.name]&&w.EDF_TRANSLATIONS.provenance[i.name]));
assert.ok(items.every(i=>i.id.startsWith('wb1-')));
assert.equal(Object.keys(w.EDF_DETAILS.weaponFamilies).length,91);
for(const family of Object.values(w.EDF_DETAILS.weaponFamilies)){
 assert.equal(family.owners.length,1);assert.ok(w.EDF_DETAILS.characters[family.owners[0]]);
}
assert.equal(w.EDF_MISSIONS.rows.length,71);assert.equal(new Set(w.EDF_MISSIONS.rows.map(m=>m.code)).size,71);
assert.equal(w.EDF_MISSIONS.rows.find(m=>m.code==='M60').candidates.length,0);
assert.equal(w.EDF_RECOMMENDATIONS.rows.length,18);
for(const m of w.EDF_RECOMMENDATIONS.rows)assert.ok(w.EDF_MISSIONS.rows.some(x=>x.code===m.code));
const m24=w.EDF_MISSIONS.rows.find(m=>m.code==='M24'),m25=w.EDF_MISSIONS.rows.find(m=>m.code==='M25');
assert.equal(m24.candidates.some(c=>c.name==='メイドシスター'),false);assert.equal(m25.candidates.filter(c=>c.name==='メイドシスター').length,3);
assert.equal(items.filter(i=>i.variant==='V01').length,5);
const content=w.EDF_CONTENT,optionIds=new Set(content.options.map(o=>o.id));
for(const item of items)if(item.extra){const required=content.requirements[item.id];assert.ok(required);for(const id of [required].flat())assert.ok(optionIds.has(id));}
const rescueWeapons=items.filter(i=>i.kind==='weapons'&&w.EDF_ACQUISITION.weapons[i.id]?.method==='rescue');
assert.equal(rescueWeapons.length,90);
assert.equal(Object.values(w.EDF_ACQUISITION.weapons).filter(a=>a.method==='box').length,55);
assert.equal(Object.values(w.EDF_ACQUISITION.weapons).some(a=>a.method==='clear'),false);
// 共用武器只佔一筆；任一角色導入來源可解鎖，原特典與 V01 各自保留角色進度。
assert.equal(items.filter(i=>i.name==='零式レーザーライフル').length,1);
const weapon=items.find(i=>i.name==='零式レーザーライフル');assert.deepEqual(Array.from(content.requirements[weapon.id]),['character-128','alternate-set']);
assert.equal(w.EDF_TRANSLATIONS.names['フューリアス'],'狂怒');
assert.equal(w.EDF_TRANSLATIONS.names['ブルーレイピア'],'蒼藍刺劍');
assert.equal(w.EDF_TRANSLATIONS.provenance['ブルーレイピア'].origin,'reference');
// 放寬對照只採已審核的別名；詞段組合仍屬參考翻譯，避免當成完整名稱已核對。
assert.equal(w.EDF_TRANSLATIONS.names['ファイブカード'],'梭哈');
assert.equal(w.EDF_TRANSLATIONS.names['ファイブカードPF'],'梭哈PF');
assert.equal(w.EDF_TRANSLATIONS.provenance['ファイブカード'].sourceName,'ファイブガード');
assert.equal(w.EDF_TRANSLATIONS.provenance['ファイブカード'].origin,'wb2');
assert.equal(w.EDF_TRANSLATIONS.names['オングストロームΦ'],'埃格斯特朗Phi');
assert.equal(w.EDF_TRANSLATIONS.provenance['ブルーレイピア'].method,'composition');
assert.equal(w.EDF_TRANSLATIONS.names['サンダースナイパーA'],'閃電狙擊槍A');
assert.equal(w.EDF_TRANSLATIONS.names['エレファント・ジャケット'],'大象夾克');
assert.equal(w.EDF_TRANSLATIONS.names['ライノサラス・コート'],'犀牛外套');
assert.equal(w.EDF_TRANSLATIONS.provenance['グリズリー・ナックル'].origin,'reference');
assert.equal(w.EDF_TRANSLATIONS.provenance['狂虎:穢れレベル1'].method,'translation');
const localizationReference=JSON.parse(await fs.readFile('data/localization-reference.json','utf8'));
for(const [name,composition]of Object.entries(localizationReference.compositions)){
 assert.equal(composition.parts.map(p=>p.zh).join(''),w.EDF_TRANSLATIONS.names[name]);
 assert.equal(w.EDF_TRANSLATIONS.provenance[name].origin,'reference');
}
assert.ok(!items.some(i=>i.kind==='accessories'&&i.name==='ライオン・グローブ'&&i.type==='赤色'&&i.level===2));
// 執行應用程式真正使用的 fresh/validate，而非另一份備份驗證器。
context.catalog=w.EDF_CATALOG;context.ids=new Set(items.map(i=>i.id));context.missionIds=new Set(w.EDF_MISSIONS.rows.map(m=>m.code));context.contentIds=optionIds;
const source=await fs.readFile('dist/app.js','utf8');
vm.runInContext(source.slice(source.indexOf('const fresh='),source.indexOf('function snapshots()'))+'\nwindow.testBackup={fresh,validate};',context);
const {fresh,validate}=w.testBackup,backup=fresh();backup.entries[weapon.id]={owned:true,updatedAt:1};backup.favorites.M02={favorite:true,updatedAt:1};backup.missionNotes.M02={text:'測試筆記',updatedAt:1};
assert.equal(validate(backup).data.entries[weapon.id].owned,true);
assert.throws(()=>validate({...backup,app:'edfwb2-collection'}));
assert.throws(()=>validate({...backup,entries:{[weapon.id]:{owned:'yes',updatedAt:1}}}));
const envelope=w.SideProjectProgress.pack('edfwb-checklist',backup);assert.equal(validate(envelope).data.app,'edfwb-collection');
assert.throws(()=>validate({...envelope,projectId:'edfwb2-checklist'}));
const legacy={...backup};delete legacy.favorites;delete legacy.content;delete legacy.missionNotes;assert.equal(validate(legacy).data.favorites,undefined);
assert.equal(w.SIDE_PROJECT_CLOUD_CONFIG.fileName,'game-companion.edf-wb.progress.v1.json');
const manifest=await fs.readFile('dist/sw.js','utf8');assert.ok(manifest.includes('./mission-facts.js'));assert.ok(!source.includes('edfwb2'));
console.log(JSON.stringify({passed:true,items:items.length,weapons:455,characters:209,accessories:200,missions:71,recommended:18,checks:['unique IDs','first-game sources','owner mapping','localization provenance','mission distributions','DLC OR requirements','V01 separation','accessory blank rows','backup validation','cross-game isolation']}));
