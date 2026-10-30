import fs from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const cwd=fileURLToPath(new URL('../games/edf-wb2/',import.meta.url));
const tests=process.argv.slice(2);
if(!tests.length)tests.push('verify-localization.mjs','verify-weapon-localization.mjs','verify-accessory-localization.mjs','verify-character-accessories.mjs','verify-content.mjs','verify-separated.mjs','verify-mission-modes.mjs','verify-linked-collection.mjs','verify-mission-tabs.mjs','verify-favorites.mjs','verify.mjs','verify-cloud.mjs');
const results=[];
for(const test of tests){
 console.log('RUN '+test);
 const result=spawnSync(process.execPath,[test],{cwd,encoding:'utf8',timeout:90000,env:{...process.env,TEST_URL:process.env.TEST_URL||'http://127.0.0.1:4190/game-companion/games/edf-wb2/'}});
 const passed=result.status===0;results.push({test,passed,stdout:result.stdout?.trim(),error:passed?undefined:(result.error?.message||result.stderr?.slice(0,2200))});
 console.log((passed?'PASS ':'FAIL ')+test);if(!passed)console.log(results.at(-1).error);
}
await fs.mkdir(new URL('../outputs/integration/',import.meta.url),{recursive:true});await fs.writeFile(new URL('../outputs/integration/upstream-result.json',import.meta.url),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify({passed:results.every(r=>r.passed),tests:results.length,failed:results.filter(r=>!r.passed).map(r=>r.test)}));if(results.some(r=>!r.passed))process.exitCode=1;
