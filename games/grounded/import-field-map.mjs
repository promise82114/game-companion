// 離線轉錄公開 MapGenie map 113 資料；只保留名稱、座標、位置關鍵字及來源連結 ID。
// node games/grounded/import-field-map.mjs <mapData.json> <locations.json>
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const read=async path=>JSON.parse((await fs.readFile(path,'utf8')).replace(/^\uFEFF/,''));
const config=await read(process.argv[2]),data=await read(process.argv[3]);
if(data.map?.id!==113)throw Error('僅接受 Grounded Yard map 113');
const rows=data.locations.filter(r=>[382,383].includes(config.categories[r.category_id]?.group_id)&&r.category_id!==1648).sort((a,b)=>a.id-b.id).map(r=>{
 const description=r.description||'';
 const hints=[[/underwater|sunken|depths|pond floor/i,'水下'],[/cave|tunnel|anthill|lair|den|burrow|underground|undershed/i,'地下／洞穴'],[/lab/i,'實驗室'],[/high up|on top|atop|climb|hanging/i,'高處']].filter(([pattern])=>pattern.test(description)).map(([,label])=>label);
 const refs=[...description.matchAll(/locationIds=(\d+)/g)].map(m=>Number(m[1]));
 const point=[Number(r.longitude),Number(r.latitude)];if(!point.every(Number.isFinite))throw Error('無效座標 '+r.id);
 return [r.id,r.category_id,r.title,...point,hints.join('、'),[...new Set(refs)]];
});
const categories=Object.values(config.categories).filter(c=>rows.some(r=>r[1]===c.id)).map(c=>[c.id,c.group_id===383?'creature':'resource',c.title]);
const output='// 公開點位事實摘要；更新方式見 import-field-map.mjs。不是即時生態或重生清單。\nexport const fieldCategories='+JSON.stringify(categories)+';\nexport const fieldPointRows=[\n'+rows.map(r=>' '+JSON.stringify(r)).join(',\n')+'\n];\n';
await fs.writeFile(new URL('dist/field-map-data.js',import.meta.url),output);
await fs.writeFile(new URL('FIELD_MAP_SOURCES.json',import.meta.url),JSON.stringify({checkedAt:'2026-11-19',mapId:113,source:'https://mapgenie.io/grounded/maps/yard',publicData:'https://mapgenie.io/api/v1/maps/113/data',creatures:rows.filter(r=>config.categories[r[1]].group_id===383).length,resources:rows.filter(r=>config.categories[r[1]].group_id===382).length,excludedCategory:1648,excludedReason:'Raw Science 屬於收集用途，不混入採集資源頁',dataSha256:createHash('sha256').update(output).digest('hex'),notes:'僅轉錄公開名稱、座標與關聯 ID。層級提示從來源位置關鍵字推導，未提及不表示一定在地面；不轉錄來源攻略全文。'},null,2)+'\n');
console.log({points:rows.length,categories:categories.length});
