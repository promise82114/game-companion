import {armor,weapons} from './gear-data.js';
import {comparisonCell} from './gear.js';
import {mutations,mutationCategories,mutationSource,mutationPatch} from './mutation-data.js';
import {progressionBuilds,mutationBuilds} from './playstyle-data.js';

const mutationsByName=new Map(mutations.map(row=>[row.english,row]));
const nameCell=(row,escape)=>`<div role="cell" class="weapon-name"><strong>${escape(row.name)}</strong><small lang="en" class="english-name">${escape(row.english)}</small></div>`;

export function mutationsHtml({filter,select,search,escape}) {
 const query=filter.search.trim().toLowerCase();
 const rows=mutations.filter(row=>(filter.mutationCategory==='all'||row.category===filter.mutationCategory)
  && [row.name,row.english,row.effect,row.unlock,mutationCategories[row.category]].join(' ').toLowerCase().includes(query));
 return `<div class="toolbar gear-toolbar">
  ${search('mutation-search','搜尋中／英文、效果或解鎖條件')}
  ${select('mutation-category','用途',[['all','全部用途'],...Object.entries(mutationCategories)],'mutationCategory')}
 </div>
 <p class="muted gear-note">共 ${rows.length}／${mutations.length} 項。斜線依序代表各階段；開局可裝 2 項，用普通乳牙最多加到 5 項。</p>
 <div role="table" class="weapon-table mutation-table" aria-label="異變效果與取得方式">
  <div role="row" class="weapon-row weapon-heading">${['異變','效果','取得方式'].map(label=>`<span role="columnheader">${label}</span>`).join('')}</div>
  ${rows.map(row=>`<div role="row" class="weapon-row" id="mutation-${row.id}" tabindex="-1" data-mutation>
   ${nameCell(row,escape)}
   ${comparisonCell('效果',escape(row.effect))}
   ${comparisonCell('取得方式',escape(row.unlock))}
  </div>`).join('')}
 </div>
 ${rows.length?'':'<p class="empty">沒有符合篩選的異變。</p>'}
 <p class="sources"><a href="${mutationSource}" target="_blank" rel="noopener noreferrer">BWIKI 異變名稱、效果與取得 ↗</a><a href="${mutationPatch}" target="_blank" rel="noopener noreferrer">官方 1.4.7 異變調整 ↗</a></p>`;
}

export function recommendationsHtml({escape}) {
 const gearLinks=(englishNames,rows,view)=>englishNames.map(english=>{
  const row=rows.find(gear=>gear.english===english);
  const tab=view==='armor'&&!row.defense?'&amp;tab=pieces':'';
  return `<a href="?view=${view}${tab}&amp;q=${encodeURIComponent(english)}">${escape(row.name)}</a>`;
 }).join('、');
 const mutationLinks=englishNames=>englishNames.map(english=>{
  const row=mutationsByName.get(english);
  return `<a href="?view=mutations#mutation-${row.id}">${escape(row.name)}</a>`;
 }).join('、');
 return `<div class="build-guide">
 <nav class="report-tabs" aria-label="推薦區段"><a href="#progression-builds">初期到後期配裝</a><a href="#situation-builds">按場合選異變</a></nav>
 <section aria-labelledby="progression-builds">
  <h2 id="progression-builds">初期到後期配裝</h2>
  ${progressionBuilds.map(row=>`<article class="row" data-progression-build>
   <h3>${escape(row.stage)} · ${escape(row.title)}</h3>
   <dl class="build-gear"><dt>武器</dt><dd>${gearLinks(row.weapons,weapons,'weapons')}</dd>
   <dt>防具</dt><dd>${gearLinks(row.armor,armor,'armor')}</dd></dl>
   <p>${escape(row.plan)}</p>
  </article>`).join('')}
  <p><a href="?view=creatures">查怪物弱點與抗性，決定要換哪種武器</a></p>
 </section>
 <section aria-labelledby="situation-builds">
  <h2 id="situation-builds">按場合選異變</h2>
  <p class="muted">只有兩格時，先裝已解鎖的核心異變。用普通乳牙開出更多欄位後，再按需要補上。</p>
  ${mutationBuilds.map(row=>`<article class="row" data-mutation-build>
   <h3>${escape(row.title)}</h3>
   <dl class="build-gear"><dt>核心兩格</dt><dd>${mutationLinks(row.core)}</dd>
   <dt>可加選</dt><dd>${mutationLinks(row.extras)}</dd></dl>
   <p>${escape(row.swap)}</p>
  </article>`).join('')}
 </section>
 <p class="sources"><a href="https://grounded.obsidian.net/news/grounded/update-1-3" target="_blank" rel="noopener noreferrer">官方武器調整與 O.R.C. 酸味弱點 ↗</a></p>
 </div>`;
}
