import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
for(const slug of ['edf-wb','edf-wb2']){
 const context={window:{},fetch(){throw Error('測試不得發出網路請求');}};vm.createContext(context);
 vm.runInContext(await fs.readFile(new URL('../games/'+slug+'/dist/shared/drive-appdata.js',import.meta.url),'utf8'),context);
 const adapter=new context.window.SideProjectDrive.DriveAppData({token(){throw Error('測試不得取得 Token');}},'synthetic.json');
 await assert.rejects(adapter.write({},null),error=>error.code==='write-disabled');
 await assert.rejects(adapter.request('https://example.invalid',{method:'PATCH'}),error=>error.code==='write-disabled');
}
console.log('PASS: both Drive adapters reject writes before Token retrieval or network access');
