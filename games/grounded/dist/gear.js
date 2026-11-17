import {armor,weapons} from './gear-data.js';
import {bwiki} from './localization.js';

const unique = (rows,key)=>[...new Set(rows.map(row=>row[key]).filter(Boolean))];
const contains = (row,query)=>Object.values(row).join(' ').toLowerCase().includes(query.trim().toLowerCase());
const tiers = [['all','全部階級'],[1,'一階'],[2,'二階'],[3,'三階']];
const tierLabel = tier=>tiers.find(([value])=>value===tier)[1];
const formatDamage = damage=>damage.replace(/(?<=\d)\/(?=\d)/g,' / ');
const handLabels={one:'單手',two:'雙手',thrown:'投擲',ammo:'彈藥'};
const waterLabels = {yes:'可使用',no:'不可使用',unknown:'待確認'};

export function weaponsHtml({filter,select,search,escape}) {
 const rows = weapons.filter(row=>contains({...row,hands:handLabels[row.hands]},filter.search)
  && (filter.weaponHand==='all'||row.hands===filter.weaponHand)
  && (filter.gearTier==='all'||row.tier===Number(filter.gearTier))
  && (filter.weaponKind==='all'||row.kind===filter.weaponKind)
  && (filter.water==='all'||row.underwater===filter.water)
  && (filter.gearScope==='all'||row.scope===filter.gearScope));
 return `<div class="toolbar gear-toolbar">${search('weapon-search','中文／英文名稱、屬性或特效')}
  ${select('weapon-tier','階級',tiers.map(([id,label])=>[String(id),label]),'gearTier')}
  ${select('weapon-kind','武器類型',[['all','全部類型'],...unique(weapons,'kind').map(kind=>[kind,kind])],'weaponKind')}
  ${select('weapon-hand','持握',[['all','全部持握'],...Object.entries(handLabels)],'weaponHand')}
  ${select('weapon-water','水下',[['all','全部'],...Object.entries(waterLabels)],'water')}
  ${select('weapon-scope','出現範圍',[['all','全部範圍'],['第一輪','第一輪可取得'],['輪迴','次元輪迴'],['入注','入注武器']],'gearScope')}
 </div>
 <p class="muted gear-note">共 ${rows.length}／${weapons.length} 筆。傷害為未強化數值，依陸上連段排列；弓弩依普通箭、羽毛箭、糖果箭、刺箭、爆炸箭排列。</p>
 <div class="weapon-table" role="table" aria-label="武器數值比較">
  <div role="row" class="weapon-row weapon-heading">${['武器','階級／類型','持握','基礎傷害','傷害類型／屬性','水下使用'].map(h=>`<span role="columnheader">${h}</span>`).join('')}</div>
  ${rows.map(w=>`<div role="row" class="weapon-row" data-weapon>
   <div role="cell" class="weapon-name"><strong>${escape(w.name)}</strong><small class="english-name" lang="en">${escape(w.english)}</small>${w.scope==='第一輪'?'':`<small>${w.scope}</small>`}</div>
   <div role="cell"><small class="weapon-mobile-label">階級／類型</small>${tierLabel(w.tier)} · ${w.kind}</div>
   <div role="cell"><small class="weapon-mobile-label">持握</small>${handLabels[w.hands]}</div>
   <div role="cell"><small class="weapon-mobile-label">基礎傷害</small><strong class="weapon-damage">${escape(formatDamage(w.damage))}</strong>${w.stun!==null&&w.stun!==undefined?`<small>暈眩 ${w.stun} · 攻速 ${w.speed??'待確認'}</small>`:''}</div>
   <div role="cell"><small class="weapon-mobile-label">傷害類型／屬性</small>${w.damageType}<small>${[w.element,w.effect].filter(Boolean).join(' · ')||'無固有屬性'}</small></div>
   <div role="cell"><small class="weapon-mobile-label">水下使用</small><span class="${w.underwater==='yes'?'water-yes':''}">${waterLabels[w.underwater]}</span></div>
  </div>`).join('')}
 </div>${rows.length?'':'<p class="empty">沒有符合篩選的武器。</p>'}
 <p class="sources"><a href="${escape(bwiki.weapons)}" target="_blank" rel="noopener noreferrer">BWIKI 武器數值 ↗</a><a href="https://grounded.wiki.gg/wiki/Category:Tools/2-Handed" target="_blank" rel="noopener noreferrer">雙手武器來源 ↗</a><a href="https://grounded.obsidian.net/news/grounded/update-1-3" target="_blank" rel="noopener noreferrer">官方水下武器調整 ↗</a></p>`;
}

export function armorHtml({filter,select,search,escape}) {
 const rows = armor.filter(row=>contains(row,filter.search)
  && (filter.gearTier==='all'||row.tier===Number(filter.gearTier))
  && (filter.armorWeight==='all'||(filter.armorWeight==='散件'?!row.defense:row.weight===filter.armorWeight)));
 return `<div class="toolbar gear-toolbar">${search('armor-search','中文／英文名稱或效果')}
  ${select('armor-tier','階級',tiers.map(([id,label])=>[String(id),label]),'gearTier')}
  ${select('armor-weight','護甲類型',[['all','全部類型'],['輕型','輕型'],['中型','中型'],['重型','重型'],['散件','散件']],'armorWeight')}
 </div>
 <p class="muted gear-note">共 ${rows.length}／${armor.length} 筆。防禦值為未強化數值，傷害減免按整套穿戴列出。</p>
 <div class="armor-grid">${rows.map(a=>`<article class="armor-entry" data-armor>
  <h2>${escape(a.name)} <small class="english-name" lang="en">${escape(a.english)}</small></h2>
  <p class="metadata"><span>${tierLabel(a.tier)} · ${a.weight}</span></p>
  ${a.defense?`<p class="armor-defense">防禦 頭／腿各 ${a.defense[0]}、胸 ${a.defense[1]} · 整套減免 ${a.resistance}% · 耐力消耗 +${a.resistance-5}%</p>`:''}
  <dl class="armor-effects"><dt>單件效果</dt><dd>${escape(a.piece)}</dd>
   ${a.defense?`<dt>套裝效果</dt><dd>${escape(a.bonus)}</dd>`:''}
   <dt>光滑鍛造</dt><dd>${escape(a.sleek)}</dd>
  </dl>
 </article>`).join('')}</div>${rows.length?'':'<p class="empty">沒有符合篩選的防具。</p>'}
 <p class="sources"><a href="${escape(bwiki.armor)}" target="_blank" rel="noopener noreferrer">BWIKI 護甲屬性 ↗</a></p>`;
}
