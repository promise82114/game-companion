import {armor,weapons} from './gear-data.js';
import {comparisonCell} from './gear.js';
import {mutations,mutationCategories,mutationSource,mutationPatch} from './mutation-data.js';
import {progressionBuilds,mutationBuilds} from './playstyle-data.js';
import {matchesSearch} from './search.js';
import {environmentUpgrades,toolUpgrades,smithingSource} from './equipment-data.js';

const nameCell=(row,escape)=>`<div role="cell" class="weapon-name"><strong>${escape(row.name)}</strong><small lang="en" class="english-name">${escape(row.english)}</small></div>`;

export function mutationsHtml({filter,select,search,escape}) {
 const rows=mutations.filter(row=>(filter.mutationCategory==='all'||row.category===filter.mutationCategory)
  && matchesSearch([row.name,row.english,row.effect,row.unlock,mutationCategories[row.category]],filter.search));
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

function gearLinks(englishNames,rows,view,escape){
 return englishNames.map(english=>{
  const row=rows.find(gear=>gear.english===english);
  const tab=view==='armor'&&!row.defense?'&amp;tab=pieces':'';
  return `<a href="?view=${view}${tab}&amp;q=${encodeURIComponent(english)}">${escape(row.name)}</a>`;
 }).join('、');
}

export function recommendationsHtml({escape}){
 return `<div class="build-guide">
 <p>以第一輪常見的近戰推進、光滑瓢蟲吸血續戰與火蟻輸出為主線，按實際可取得的裝備逐步替換。搭配依裝備效果與社群常見玩法整理。</p>
 <nav class="report-tabs" aria-label="配裝階段">${progressionBuilds.map((row,index)=>`<a href="#build-${index}">${row.stage}</a>`).join('')}<a href="#environment-upgrades">環境裝備強化</a><a href="#tool-upgrades">採集工具強化</a></nav>
 ${progressionBuilds.map((row,index)=>`<article class="row" id="build-${index}" data-progression-build>
  <h2>${escape(row.stage)} · ${escape(row.title)}</h2>
  <dl class="build-gear"><dt>武器</dt><dd>${gearLinks(row.weapons,weapons,'weapons',escape)}</dd>
  <dt>防具</dt><dd>${gearLinks(row.armor,armor,'armor',escape)}</dd></dl>
  <p>${escape(row.plan)}</p>
  <dl class="build-detail">${[['取得時機',row.timing],['升級順序',row.upgrade],['實戰使用',row.combat],['替換選擇',row.alternatives],['異變搭配',row.mutationNote]].map(([label,text])=>`<dt>${label}</dt><dd>${escape(text)}</dd>`).join('')}</dl>
 </article>`).join('')}
 <section id="environment-upgrades" tabindex="-1"><h2>環境裝備：先保命，再補強化</h2>
 <p>下表的升級順序是資源分配建議；原有效果與光滑新增效果分開列出。必要的防毒、照明、氧氣、游速及耐熱功能，不必升到 +6 才能使用。</p>
 <p>換一件就會中斷三件套，但其他兩件的單件與光滑效果仍保留。例如瓢蟲頭盔換成防毒面具，會少一件治療增益與整套格擋回血，且單件抗傷由 7.5% 降到 2.5%。強化能提高防禦與耐久，無法恢復失去的套裝效果，也不會把輕甲變成重甲。</p>
 <div role="table" class="weapon-table advice-table" aria-label="環境裝備強化建議"><div role="row" class="weapon-row weapon-heading">${['裝備','建議強化','取得的效益','換裝代價與使用方式'].map(label=>`<span role="columnheader">${label}</span>`).join('')}</div>
 ${environmentUpgrades.map(row=>`<div role="row" class="weapon-row" data-environment-upgrade>${comparisonCell('裝備',gearLinks([row.gear],armor,'armor',escape))}${comparisonCell('建議強化',escape(row.level))}${comparisonCell('取得的效益',escape(row.benefit))}${comparisonCell('換裝代價與使用方式',`${escape(row.tradeoff)} <a class="gear-source" href="${escape(row.source)}" target="_blank" rel="noopener noreferrer">效果來源 ↗</a>`)}</div>`).join('')}</div>
 <p class="muted">短程穿越先 +5 即可；常駐使用、需要光滑效果才升 +6，再依受擊壓力到 +7～9。資源不足時先顧主力武器與胸甲；NG+ 仍需同步提高生命、治療與敵人對策，不能只靠環境散件的鍛造等級。</p></section>
 <section id="tool-upgrades" tabindex="-1"><h2>採集工具：階級門檻與鍛造等級分開</h2>
 <p>一階工具升到 +9 仍是一階，不能突破二、三階採集門檻；需要先換正確階級的斧、鎚或匕首。鍛造提高可強化工具的傷害與耐久，不提高資源掉落量。採集效率先看工具階級、適用異變及是否能少敲一次，不承諾所有節點等比例加速。</p>
 <div role="table" class="weapon-table tool-advice-table" aria-label="採集工具強化建議"><div role="row" class="weapon-row weapon-heading">${['工具','建議投資','理由與限制'].map(label=>`<span role="columnheader">${label}</span>`).join('')}</div>
 ${toolUpgrades.map(row=>`<div role="row" class="weapon-row" data-tool-upgrade>${comparisonCell('工具',gearLinks(row.gear,weapons,'weapons',escape))}${comparisonCell('建議投資',escape(row.level))}${comparisonCell('理由與限制',escape(row.reason))}</div>`).join('')}</div>
 <p>持續採石可搭光滑螢火蟲頭燈與碎石者；砍草改用割草大師。工具也能當武器：白蟻斧可以兼作單手劈砍主力，黑牛鎚則按敵人的粉碎抗性選用；+6 是否取得專屬詞條，請對照武器列表。</p>
 <p class="sources"><a href="${smithingSource}" target="_blank" rel="noopener noreferrer">BWIKI 鍛造與分支規則 ↗</a><a href="?view=weapons">武器的 +6 專屬效果</a><a href="?view=shields">盾牌不提供鍛造</a></p></section>
 <p class="actions"><a href="?view=mutationBuilds">對照各場合的異變矩陣</a><a href="?view=creatures">查怪物弱點與抗性</a><a href="?view=chips">查晶片與解鎖前置</a></p>
 <p class="sources"><a href="https://www.youtube.com/watch?v=GDejYajfGow" target="_blank" rel="noopener noreferrer">社群常見第一輪配裝 ↗</a><a href="https://www.youtube.com/watch?v=VHfa4MF_0JM" target="_blank" rel="noopener noreferrer">瓢蟲吸血配裝示範 ↗</a><a href="https://grounded.obsidian.net/news/grounded/update-1-3" target="_blank" rel="noopener noreferrer">官方裝備調整與 O.R.C. 酸味弱點 ↗</a></p>
 </div>`;
}

export function mutationRecommendationsHtml({filter,select,escape}){
 const situations=mutationBuilds.filter((row,index)=>filter.buildSituation==='all'||String(index)===filter.buildSituation);
 const recommendedCells=(names,kind,build)=>Array.from({length:kind==='core'?3:5},(_,index)=>{
  const mutation=mutations.find(row=>row.english===names[index]);
  const label=kind==='core'?'優先':'候選';
  const note=mutation&&build.notes?.[mutation.english];
  return `<td class="${kind==='option'&&index===0?'build-divider ':''}${mutation?(kind==='core'?'build-core':'build-option'):''}" aria-label="${escape(build.title)}，${label} ${index+1}">${mutation?`<a href="?view=mutations#mutation-${mutation.id}">${escape(mutation.name)}</a>${note?`<small class="build-pick-note">${escape(note)}</small>`:''}`:'—'}</td>`;
 }).join('');
 return `<p class="mutation-build-intro">由左到右依重要性排列：優先最多三項，候選最多五項，依條件替換、無需全帶；實際最多裝備五個異變，未升滿異變欄位前依可用格數選擇。點名稱查效果與取得方式。</p>
 <div class="toolbar mutation-build-toolbar">${select('build-situation','場合',[['all','全部場合'],...mutationBuilds.map((row,index)=>[String(index),row.title])],'buildSituation')}</div>
 <div class="mutation-build-scroll" tabindex="0" role="region" aria-label="依場合推薦異變，可橫向捲動">
 <table class="mutation-build-matrix">
 <caption class="sr-only">每個使用場合的優先異變與候選異變，按重要性由左到右排列</caption>
 <colgroup><col class="build-situation-column"><col span="3"><col span="5"></colgroup>
 <thead><tr><th scope="col" rowspan="2">使用場合</th><th scope="colgroup" colspan="3">優先</th><th scope="colgroup" colspan="5" class="build-divider">候選 · 依條件替換</th></tr>
 <tr>${['優先','候選'].flatMap(group=>Array.from({length:group==='優先'?3:5},(_,index)=>`<th scope="col"${group==='候選'&&index===0?' class="build-divider"':''}><span class="sr-only">${group}</span>${index+1}</th>`)).join('')}</tr></thead>
 <tbody>${situations.map(row=>`<tr data-mutation-build><th scope="row">${escape(row.title)}</th>${recommendedCells(row.core,'core',row)}${recommendedCells(row.extras,'option',row)}</tr>`).join('')}</tbody>
 </table></div>
 <p class="muted mutation-build-intro">一般戰鬥先選武器專精與有氧運動愛好者，肺部增益再補耐力上限；能穩定招架回耐時才替換。有氧滿階加快回耐 30%，仍需留攻擊空檔與格擋餘裕。辣味防護依穿刺／粉碎攻擊壓力選用。</p>
 <section class="build-situation-notes"><h2>各場合的換法</h2>${situations.map(row=>`<details><summary>${escape(row.title)}</summary><p>${escape(row.swap)}</p></details>`).join('')}</section>
 <p><a href="?view=recommendations">回推薦配裝</a></p>
 <p class="sources"><a href="${mutationSource}" target="_blank" rel="noopener noreferrer">BWIKI 異變效果與取得方式 ↗</a><a href="${mutationPatch}" target="_blank" rel="noopener noreferrer">官方 1.4.7 異變調整 ↗</a></p>`;
}
