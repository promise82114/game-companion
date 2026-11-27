import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createChineseText} from '../../shared/chinese-text.js';

async function glossarySource(moduleRoot,data){
 const raw=await fs.readFile(new URL('research/localization.json',moduleRoot),'utf8'),glossary=JSON.parse(raw);
 assert.equal(glossary.locale,'zh-Hant');assert.equal(glossary.status,'reference');
 for(const [en,zh]of Object.entries(glossary.terms)){assert.ok(en.trim()&&zh.trim());assert.match(zh,/[\u3400-\u9fff]/u,en);}
 // Official labels must carry independently reviewable evidence before promotion.
 for(const [name,evidence]of Object.entries(glossary.officialNames))assert.ok(evidence.url&&evidence.platform&&evidence.version&&glossary.terms[name]);
 const chinese=createChineseText(glossary);
 for(const row of [...data.entities,...data.trophies]){
  const original=row.name||row.label,translated=chinese.plain(original);
  assert.match(translated,/[\u3400-\u9fff]/u,'Missing Chinese: '+original);
  assert.doesNotMatch(translated.replace(/\b[IVX]+\b/g,''),/[A-Za-z]{2,}/u,'Untranslated primary name: '+original);
 }
 return '// Generated from research/localization.json; edit the research source.\nexport const localizationSha256='+JSON.stringify(createHash('sha256').update(raw).digest('hex'))+';\nexport const glossary='+JSON.stringify(glossary,null,2)+';\n';
}
export async function prepareChineseGlossary(moduleRoot,data){
 await fs.writeFile(new URL('dist/localization.js',moduleRoot),await glossarySource(moduleRoot,data));
}
export async function verifyChineseGlossary(moduleRoot,data){
 assert.equal(await fs.readFile(new URL('dist/localization.js',moduleRoot),'utf8'),await glossarySource(moduleRoot,data),'Generated Chinese glossary is stale; run the module prepare-data script.');
}
