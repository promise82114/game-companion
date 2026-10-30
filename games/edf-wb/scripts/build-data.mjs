// 一代日文事實資料獨立保存，中文來源與參考翻譯分開維護；不連外。
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const readJson=async file=>JSON.parse(await fs.readFile(new URL('../data/'+file,import.meta.url),'utf8'));
const facts=await readJson('wiki-facts.json'),reference=await readJson('localization-reference.json'),fallback=await readJson('localization-fallback.json');
const write=async (file,key,value)=>fs.writeFile(new URL('../dist/'+file,import.meta.url),'// 由 scripts/build-data.mjs 產生；資料與中文來源見 data/。\nwindow.'+key+' = '+JSON.stringify(value,null,2)+';\n');
const idFor=(kind,...keys)=>'wb1-'+kind[0]+'-'+createHash('sha256').update(JSON.stringify(keys)).digest('hex').slice(0,16);
const names=Object.fromEntries(Object.entries(reference.entries).map(([n,v])=>[n,v.zh]));
const provenance=Object.fromEntries(Object.entries(reference.entries).map(([n,v])=>[n,{...v,origin:'wb2'}]));
for(const [n,zh]of Object.entries(fallback)){if(names[n])throw Error('參考翻譯不可覆蓋二代名稱：'+n);names[n]=zh;provenance[n]={origin:'reference',method:'translation'};}
for(const [n,composition]of Object.entries(reference.compositions||{})){
 if(fallback[n]!==composition.zh||composition.parts.map(p=>p.zh).join('')!==composition.zh)throw Error('組合譯名與參考翻譯不一致：'+n);
 for(const part of composition.parts)if(part.sourceName&&(!part.sourceName.includes(part.ja)||!part.sourceZh.includes(part.zh.trim())))throw Error('組合詞段與來源不一致：'+n);
 provenance[n]={origin:'reference',method:'composition',parts:composition.parts,note:composition.note};
}
const items=[],weaponFamilies={},characters={},options=[],requirements={},acquisition={};
const categoryOf=name=>/EDF[12]|EDF2PV/.test(name)?'EDF1&2':/EDF[34]/.test(name)?'EDF3&4':/EDF5/.test(name)?'EDF5':/EDF:I[AR]/.test(name)?'EDF:IA&IR':'ご当地';
const fixedNotes={
 'レンジャー(EDF5)':'α 為初始角色。',
 'ウイングダイバー(EDF4)':'α 於教學加入，跳過教學仍取得。',
 'タコスブラザー':'α 為 M01 首次遊玩的固定救出角色。',
 'ロイヤルブラザー':'α 為 M01 首次遊玩的固定救出角色。',
 'チューリップシスター':'α 為 M01 首次遊玩的固定救出角色；角色總表該段誤寫ブラザー，依角色頁名整理。',
 'カウボーイブラザー':'α 於 M03 首次通關加入。',
 'ニンジャブラザー':'α 於 M06 首次通關加入。',
 'テンシンシスター':'α 於 M15 首次通關加入。',
 'メイドシスター':'α 於 M25 首次通關加入；隨機救出自 M25 起。',
 'ファラオシスター':'α 於 M30 首次通關加入。'
};
const alternateNames=facts.characters.filter(c=>c.menuId>=128).map(c=>c.name);
for(const c of facts.characters){
 const variants=alternateNames.includes(c.name)?['無印','V01']:c.variants;
 characters[c.name]={pool:c.name,variants,source:c.source,note:fixedNotes[c.name]||(c.extra?'需導入對應 DLC／特典；高階武器可透過再次救出取得。詳細早期分布未記載，列入 M38 起與追加任務的候選參考。':'')};
 const contentId='character-'+c.menuId;
 if(c.extra)options.push({id:contentId,name:c.name,group:c.extra==='DLC'?'season':'bonus',characters:[c.name]});
 for(const variant of variants){
  const item={kind:'characters',name:c.name,family:c.name,variant,category:categoryOf(c.name),extra:variant==='V01'?'別Ver DLC':c.extra,source:c.source,id:idFor('characters',c.name,variant)};
  items.push(item);if(item.extra)requirements[item.id]=variant==='V01'?'alternate-set':contentId;
 }
}
options.push({id:'alternate-set',name:'特典角色別Ver套組（5 名 V01）',group:'season',characters:alternateNames});
options.push({id:'mission-pack',name:'追加任務包「新たなるシカク」',group:'season',characters:[]});
for(const f of facts.weaponFamilies){
 weaponFamilies[f.name]={owners:f.owners,note:f.extra==='任務包'?'追加任務武器箱；出處角色為裝備加成參考。':'',source:f.source};
 for(const w of f.weapons){
  const item={kind:'weapons',name:w.name,family:f.name,variant:'Lv.'+w.level,category:f.category,extra:f.extra,source:f.source,id:idFor('weapons',w.name,w.level),sourceLine:w.sourceLine};
  items.push(item);
  if(f.extra==='任務包'){
   requirements[item.id]='mission-pack';acquisition[item.id]={method:'box',source:f.source,note:'追加任務武器箱；需回收並通關。攻略未提供此型號的逐關／難度表，不推定由加成角色救出取得。'};
  }else if(f.extra){
   const owner=facts.characters.find(c=>c.name===f.owners[0]);if(!owner)throw Error('額外武器缺角色：'+w.name);
   requirements[item.id]=alternateNames.includes(owner.name)?['character-'+owner.menuId,'alternate-set']:'character-'+owner.menuId;
   // DLC 與特典的 LV1 由導入附贈，高階武器透過救出；避免套用二代通關數獎勵。
   acquisition[item.id]={method:'rescue',source:'https://w.atwiki.jp/edfwb/pages/5.html',note:'需導入對應角色；救出後通關可取得高階武器，等級依難度。'};
  }
 }
}
const typeLabels={'通常型':'通常型','新型':'新型','赤色':'紅色','緑色':'綠色','黄色':'黃色'};
for(const a of facts.accessories)for(const {level,sourceLine}of a.levels)items.push({kind:'accessories',name:a.name,family:a.name,variant:'Lv.'+level+' · '+a.type,level,type:a.type,category:a.category,extra:'',source:a.source,sourceLine,id:idFor('accessories',a.name,level,a.type)});
const allNames=[...new Set(items.map(i=>i.name).concat(facts.weaponFamilies.map(f=>f.name)))];
for(const name of allNames)if(!names[name])throw Error('缺中文參考：'+name);
if(new Set(items.map(i=>i.id)).size!==items.length)throw Error('重複 ID');
const groups=[];
function addGroup(start,end,names,extra=false){groups.push({start,end,extra,pools:Object.fromEntries(names.map(n=>[n,characters[n].variants])),uncertain:[]});}
for(const d of facts.distribution){
 if(d.start===22){addGroup(22,24,d.names.filter(n=>n!=='メイドシスター'));addGroup(25,29,d.names);}
 else addGroup(d.start,d.end,d.names);
}
addGroup(38,59,Object.keys(characters));addGroup(1,11,Object.keys(characters),true);
const details={version:facts.checkedAt,distributionSource:'https://w.atwiki.jp/edfwb/pages/198.html',characters,weaponFamilies,groups,noRescueMissions:[60]};
await write('data.js','EDF_CATALOG',{version:facts.checkedAt,game:'edfwb',items});
await write('details.js','EDF_DETAILS',details);
await write('translations.js','EDF_TRANSLATIONS',{names,families:names,provenance,accessories:{types:typeLabels},versionlessCharacters:[]});
await write('content.js','EDF_CONTENT',{options,requirements,excluded:[]});
await write('acquisition.js','EDF_ACQUISITION',{weapons:acquisition});
await write('character-accessories.js','EDF_CHARACTER_ACCESSORIES',{categories:[],slots:{}});
await write('mission-facts.js','EDF_MISSION_FACTS',facts.missions);
const recommendationReasons={
 M02:'敵種單純，以黑蟻與巢穴為主；適合早期救出。',M05:'兩波目標清楚；過場前先完成救援。',M07:'開場對話期間可先救援；海灘救援點需留意後續敵群。',M08:'僅有飛行敵；準備追蹤或狙擊武器。',M10:'敵人為海克托；巡迴擊破時可一併救援。',M18:'可用洞穴掩護處理蜂群；先完成救援。',M22:'波次單純，可用戰車輔助。',M27:'農場視野開闊，適合範圍攻擊；缺少掩體。',M33:'敵人少且初始待機，可利用獅身人面像掩護。',M42:'HARD 用於 LV2 武器；地圖與救援點較集中。',M44:'INFERNO 可救出全角色候選，兼收 LV3–4 武器與高階配件。',M46:'INFERNO 適合護甲與角色救出；熟練後通關較快。',M47:'INFERNO 可兼顧護甲與救援；需先減少敵人再回收。',M49:'INFERNO 可兼收武器與角色，需準備相應裝備。',M59:'INFERNO 適合護甲與角色救出，屬後期全角色候選。',EX01:'INFERNO 可回收武器箱並救援；需高護甲與適合的掩護。',EX03:'INFERNO 兼顧武器箱、救援與護甲；需高火力與機動角色。',EX08:'INFERNO／ARMAGEDDON 可用低威力爆炸武器擊落百足；回收時間有限。'
};
await write('recommendations.js','EDF_RECOMMENDATIONS',{source:details.distributionSource,checkedAt:facts.checkedAt,rows:facts.missions.filter(m=>recommendationReasons[(m.extra?'EX':'M')+String(m.number).padStart(2,'0')]).map(m=>({...m,code:(m.extra?'EX':'M')+String(m.number).padStart(2,'0'),reason:recommendationReasons[(m.extra?'EX':'M')+String(m.number).padStart(2,'0')]}))});
console.log(JSON.stringify({items:items.length,weapons:items.filter(i=>i.kind==='weapons').length,characters:items.filter(i=>i.kind==='characters').length,accessories:items.filter(i=>i.kind==='accessories').length,missions:facts.missions.length}));
