import {reportRows,yardPoints,yardAnchors} from './report-data.js';
import {creatureRows,damageColumns} from './creature-data.js';
import {collectibles} from './data.js';

export const mapSource='https://mapgenie.io/grounded/maps/yard';
const wiki='https://wiki.biligame.com/grounded/';
export const reportSource=wiki+'游戏报告卡';
export const groups=[
 ['meta','結局與腦力','依遊戲報告卡與資源分析儀確認。','游戏报告卡'],
 ['shop','科學商店','在 ASL 核對購買紀錄。每月特供與次元商品不計。','科学商店'],
 ['chips','漢堡小哥晶片','交回 4 枚超級晶片與 7 枚輔助晶片。科技仍要在商店購買。','数据页'],
 ['cards','生物卡','包含三位蟻后、烏鴉等。金卡、蟻寶寶和感染蟻的卡片另屬其他目標。','生物卡牌'],
 ['docs','庭院資料','依遊戲資料分類找錄音、筆記、鑰匙、配方、複製機磁碟與雕像。','数据页'],
 ['sites','地標','走進遊戲內各地標，直到出現發現通知。','地标'],
 ['molars','普通乳牙','第一輪固定點。地圖序號供本站對照。','游戏报告卡'],
 ['mega','巨型乳牙','地圖序號供本站對照。','游戏报告卡'],
 ['scab','SCA.B 配色','四個預設配色隨開局取得，其餘 51 個逐點確認。','数据页#SCA.B列表'],
 ['defense','防守事件','五台普通 MIX.R、三台超級 MIX.R 及咖啡機防守。','游戏报告卡'],
 ['bosses','首領','這五場需確認本周目戰鬥完成，另在生物卡核對掃描。','游戏报告卡']
].map(([id,name,hint,path])=>({id,name,hint,source:wiki+path}));

const legacyById=new Map(collectibles.map(item=>[item.id,item]));
const typeByGroup={molars:'milk',mega:'mega',scab:'scab',chips:'chip',cards:'creature',docs:'document',sites:'landmark',defense:'mix',shop:'shop',bosses:'boss',meta:'objective'};
export const reportItems=reportRows.map(([id,group,name,officialName,section,pin,note])=>{
 const legacy=legacyById.get(id);
 const category=legacy?.category??typeByGroup[group];
 const locationDescription=note||((group==='scab'||group==='molars'||group==='mega')?legacy?.locationDescription:'')||'';
 return {id,group,name,officialName,section,pin,note:locationDescription,locationDescription,category};
});
const reportById=new Map(reportItems.map(item=>[item.id,item]));
export const itemById=id=>reportById.get(id)||legacyById.get(id);
export const reportGroupName=id=>groups.find(g=>g.id===id)?.name||'';
const bossByStep={broodmother:'hedge-broodmother',schmector:'director-schmector',mantis:'mantis','wasp-queen':'wasp-queen','infected-broodmother':'infected-broodmother'};
const groupedConditions={shop:['shop','chips'],cards:['cards'],data:['docs'],sites:['sites'],molars:['molars','mega'],mix:['defense'],scab:['scab'],brain:['meta']};
export function reportConditionItems(condition,runLevel){
 const lists=groupedConditions[condition.id]||[];
 const boss=bossByStep[condition.stepId];
 return reportItems.filter(item=>
  (lists.includes(item.group)||(boss&&item.id==='report-boss-'+boss))
  && (!runLevel||item.group!=='molars'));
}
export function reportItemLink(item){
 return item.pin ? mapSource+'?locationIds='+item.pin : groups.find(group=>group.id===item.group)?.source;
}
export const searchReport=(items,query)=>items.filter(i=>[i.id,i.name,i.officialName,i.section,i.note,reportGroupName(i.group)].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
export function reportReferenceHtml({filter,select,search,escape}){
 const rows=searchReport(reportItems,filter.search);
 const sections=groups.filter(g=>filter.reportGroup==='all'||filter.reportGroup===g.id).map(g=>{
  const items=rows.filter(i=>i.group===g.id);
  return {g,items};
 }).filter(({items})=>items.length);
 const count=sections.reduce((total,{items})=>total+items.length,0);
 return `<div class="report-intro"><strong>白金條件之一 · 超級勝利</strong><p>以第一輪的 100% 報告卡逐項確認。取得後可到路線圖的「100% 查漏」勾選。</p></div>
 <div class="toolbar">${search('collection-search','搜尋名稱、遊戲分類或地區')}
 ${select('category-filter','收集分類',[['all','全部分類'],...groups.map(g=>[g.id,g.name])],'reportGroup')}
 <a href="?view=roadmap&stage=audit" data-audit>前往路線圖核對</a></div>
 <p class="muted">顯示 ${count}／${reportItems.length} 個核對列</p>
 ${sections.map(({g,items})=>`<section class="report-section"><div class="report-section-title"><h2>${g.name}</h2><small>${items.length} 項</small></div><p>${g.hint}</p>
 <ul class="report-list">${items.map(i=>`<li id="collect-${i.id}"><div><strong>${escape(i.name)}</strong>
 ${i.officialName&&i.officialName!==i.name?`<small lang="en" class="english-name">${escape(i.officialName)}</small>`:''}
 ${i.section?`<small class="muted">${escape(i.section)}</small>`:''}${i.note?`<small class="report-note">${escape(i.note)}</small>`:''}</div>
 ${i.pin?`<a href="?view=map&item=${i.id}" data-locate="${i.id}">地圖定位</a>`:`<a href="${escape(g.source)}" target="_blank" rel="noopener noreferrer">查來源 ↗</a>`}</li>`).join('')}</ul></section>`).join('')||'<p class="empty">沒有符合條件的項目。</p>'}
 <p class="sources"><a href="${escape(reportSource)}" target="_blank" rel="noopener noreferrer">BWIKI 遊戲報告卡 ↗</a><a href="https://grounded.wiki.gg/wiki/Game_Report_Card" target="_blank" rel="noopener noreferrer">Grounded Wiki 條件對照 ↗</a></p>`;
}

export const mappedItems=reportItems.filter(i=>i.pin);
export {yardPoints,yardAnchors};

export function creaturesHtml({filter,select,search,escape}){
 const kindOptions=[...new Set(creatureRows.map(row=>row[2]))];
 const cols=filter.damageColumn==='all'?damageColumns:[filter.damageColumn];
 const rows=creatureRows.filter(([name,en,kind,values])=>[name,en].join(' ').toLowerCase().includes(filter.search.trim().toLowerCase())
  && (filter.creatureKind==='all'||kind===filter.creatureKind)
  && (filter.damageEffect==='all'||cols.some(col=>filter.damageEffect==='weak' ? values?.[col]>0 : values?.[col]<0)));
 const cell=value=>{
  if(value===null||value==='?')return ['unknown','？','待查證'];
  if(value===-100)return ['immune','免疫','免疫'];
  if(value>0)return ['weak','+'+value+'%','弱點，增加 '+value+'%'];
  if(value<0)return ['resist',value+'%','抗性，減少 '+Math.abs(value)+'%'];
  return ['neutral','—','來源未列傷害修正'];
 };
 return `<div class="toolbar">${search('creature-search','搜尋怪物中文或英文名稱')}
 ${select('creature-kind','生物類型',[['all','所有生物'],...kindOptions.map(k=>[k,k])],'creatureKind')}
 ${select('damage-column','傷害欄',[['all','全部傷害'],...damageColumns.map(c=>[c,c])],'damageColumn')}
 ${select('damage-effect','篩選結果',[['all','全部'],['weak','有弱點'],['resist','有抗性／免疫']],'damageEffect')}</div>
 <p class="matrix-legend"><span class="damage-weak">+ 弱點</span><span class="damage-resist">− 抗性</span><span class="damage-immune">免疫</span><span>— 未列修正</span><span>？待查證</span></p>
 <p class="muted">顯示 ${rows.length}／${creatureRows.length} 種。手機可橫滑比對，或選單一傷害欄查詢。</p>
 <div class="creature-scroll" tabindex="0" aria-label="可橫向捲動的怪物弱點與抗性表">
 <table class="creature-matrix"><thead><tr><th scope="col">怪物</th>${cols.map(col=>`<th scope="col">${escape(col)}</th>`).join('')}</tr></thead>
 <tbody>${rows.map(([name,en,kind,values])=>`<tr><th scope="row">${escape(name)}<small class="english-name" lang="en">${escape(en)}</small></th>${cols.map(col=>{
  const [className,label,desc]=cell(values===null?null:values[col]);
  return `<td class="damage-${className}" aria-label="${escape(desc)}" title="${escape(desc)}">${label}</td>`;
 }).join('')}</tr>`).join('')}</tbody></table></div>
 ${rows.length?'':'<p class="empty">沒有符合條件的怪物。</p>'}
 <p class="muted">這張表列各傷害類型的單獨修正。混合傷害、弱點部位及首領階段會另外影響實際輸出。</p>
 <p class="sources"><a href="${wiki}生物" target="_blank" rel="noopener noreferrer">BWIKI 生物數值 ↗</a></p>`;
}
