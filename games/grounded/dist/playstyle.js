import {armor,weapons} from './gear-data.js';
import {comparisonCell} from './gear.js';
import {mutations,mutationCategories,mutationSource,mutationPatch} from './mutation-data.js';
import {progressionBuilds,mutationBuilds,armorComparison,armorSwapPhases} from './playstyle-data.js';
import {matchesSearch} from './search.js';
import {environmentUpgrades,toolUpgrades,smithingSource} from './equipment-data.js';
import {targetBuilds,targetSource} from './target-build-data.js';

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

export function recommendationsHtml(controls){
 const {filter,escape}=controls;
 const targetTab=filter.recommendationTab==='targets';
 const nav=`<nav class="report-tabs equipment-tabs" aria-label="推薦配裝分類"><a href="?view=recommendations&amp;tab=progression" ${targetTab?'':'aria-current="page"'}>階段配裝與強化</a><a href="?view=recommendations&amp;tab=targets" ${targetTab?'aria-current="page"':''}>三階怪／Boss 對策</a></nav>`;
 if(targetTab)return nav+targetRecommendationsHtml(controls);
 return nav+`<div class="build-guide">
 <p>以第一輪常見的近戰推進、光滑瓢蟲吸血續戰與火蟻輸出為主線，按實際可取得的裝備逐步替換。搭配依裝備效果與社群常見玩法整理。</p>
 <nav class="report-tabs" aria-label="配裝階段">${progressionBuilds.map((row,index)=>`<a href="#build-${index}">${row.stage}</a>`).join('')}<a href="#armor-comparison">三套防具比較</a><a href="#armor-swap-first">第一輪換裝</a><a href="#armor-swap-ngplus">NG+ 換裝</a><a href="#environment-upgrades">環境裝備強化</a><a href="#tool-upgrades">採集工具強化</a></nav>
 ${progressionBuilds.map((row,index)=>`<article class="row" id="build-${index}" data-progression-build>
  <h2>${escape(row.stage)} · ${escape(row.title)}</h2>
  <dl class="build-gear"><dt>武器</dt><dd>${gearLinks(row.weapons,weapons,'weapons',escape)}</dd>
  <dt>防具</dt><dd>${gearLinks(row.armor,armor,'armor',escape)}</dd></dl>
  <p>${escape(row.plan)}</p>
  <dl class="build-detail">${[['取得時機',row.timing],['升級順序',row.upgrade],['實戰使用',row.combat],['替換選擇',row.alternatives],['異變搭配',row.mutationNote]].map(([label,text])=>`<dt>${label}</dt><dd>${escape(text)}</dd>`).join('')}</dl>
 </article>`).join('')}
 <section id="armor-comparison" tabindex="-1"><h2>瓢蟲、西瓜蟲、火蟻：生存與輸出比較</h2>
 <p>瓢蟲偏治療續戰，西瓜蟲偏直接承傷與多人坦克，火蟻偏近戰輸出。下表比較完整三件套、相同等級與鍛造分支；光滑效果從 +6 解鎖，防禦數字不等於實際減傷百分比。</p>
 <div role="table" class="weapon-table tool-advice-table" aria-label="三套防具生存與輸出比較"><div role="row" class="weapon-row weapon-heading">${['防具與數值','生存方式','輸出差異'].map(label=>`<span role="columnheader">${label}</span>`).join('')}</div>
 ${armorComparison.map(row=>`<div role="row" class="weapon-row" data-armor-comparison>${comparisonCell('防具與數值',`${gearLinks([row.gear],armor,'armor',escape)}<p>${escape(row.stats)}</p>`)}${comparisonCell('生存方式',escape(row.survival))}${comparisonCell('輸出差異',escape(row.damage))}</div>`).join('')}</div>
 <p>西瓜蟲基礎防禦比瓢蟲高約 33%，不代表實際少受 33% 傷害；火蟻與西瓜蟲防禦值相同，也不代表同樣耐打。輸出差距取決於命中頻率、觸發覆蓋、敵人防禦與補血停手時間，沒有通用的固定提升百分比。</p>
 ${armorSwapPhases.map(phase=>`<section id="armor-swap-${phase.id}" tabindex="-1"><h3>${escape(phase.title)}</h3><p>${escape(phase.intro)}</p>
 <div role="table" class="weapon-table tool-advice-table" aria-label="${phase.id==='first'?'第一輪':'NG+'}防具換裝時機"><div role="row" class="weapon-row weapon-heading">${['防具','值得保留／換裝的情況','實際做法'].map(label=>`<span role="columnheader">${label}</span>`).join('')}</div>
 ${phase.choices.map(row=>`<div role="row" class="weapon-row" data-armor-swap="${phase.id}">${comparisonCell('防具',gearLinks([row.gear],armor,'armor',escape))}${comparisonCell('值得保留／換裝的情況',escape(row.when))}${comparisonCell('實際做法',escape(row.plan))}</div>`).join('')}</div></section>`).join('')}
 <h3>NG+ 真的會一兩下倒地嗎？</h3>
 <p>有可能，尤其是生命升級不足、強敵連招，或灌注怪本體攻擊再接爆炸／元素效果時；一次動作也可能包含多段傷害，不能只看揮了幾下。這不是每隻 NG+1 怪物的必然結果，也不能保證換三階重甲就能避免。</p>
 <p>先檢查：進 REMIX.R 前是否補足本輪生命與治療乳牙，進入後是否繼續收集新一輪乳牙、維持滿血、強化裝備並辨識敵人灌注效果。乳牙既有加成會保留，新輪迴可再提升；若仍被爆發打倒，優先增加存活空間與處理危險攻擊，能穩定活下來後再換火蟻追輸出。</p>
 <p class="sources"><a href="https://wiki.biligame.com/grounded/护甲" target="_blank" rel="noopener noreferrer">BWIKI 三套防具效果 ↗</a><a href="https://grounded.wiki.gg/wiki/Ladybug_Armor" target="_blank" rel="noopener noreferrer">瓢蟲防禦數值 ↗</a><a href="https://grounded.wiki.gg/wiki/Smithing_Station" target="_blank" rel="noopener noreferrer">鍛造數值 ↗</a><a href="https://grounded.wiki.gg/wiki/New_Game%2B" target="_blank" rel="noopener noreferrer">NG+ 成長 ↗</a><a href="https://grounded.wiki.gg/wiki/Infused_Creatures" target="_blank" rel="noopener noreferrer">灌注能力 ↗</a><a href="https://grounded.wiki.gg/wiki/Milk_Molars_(Grounded)" target="_blank" rel="noopener noreferrer">乳牙繼承 ↗</a></p></section>
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

function targetRecommendationsHtml({filter,select,search,escape}){
 const rows=targetBuilds.filter(row=>(filter.targetKind==='all'||row.kind===filter.targetKind)&&matchesSearch([row.name,row.target,row.weakness,row.tactics,...[...row.single,...row.two].flatMap(pick=>[weapons.find(w=>w.english===pick.weapon)?.name,pick.weapon,pick.branch,pick.note])],filter.search));
 const picksHtml=picks=>picks.map(pick=>`<div class="target-pick">${gearLinks([pick.weapon],weapons,'weapons',escape)}<strong>${escape(pick.branch)}</strong><small>${escape(pick.note)}</small></div>`).join('');
 return `<section class="build-guide"><p>只用第一輪可取得的裝備，包含元素鍛造；不含輪迴商店、入注武器或 NG+ 隨機飾品。按弱點、抗性、出手空檔與武器效果選擇，並非固定 DPS 實測排名。單手與雙手各列有效選擇，不保證兩邊同樣強。</p>
 <p>以主力武器 +7～9、已選對應武器異變為後期比較基準；首遇助理經理則按二階 +5 規劃。單手不一定要拿盾，裝盾會降低造成傷害 20%；能穩定武器招架時可收盾追輸出。雙手也可用武器格擋。火蟻套偏近戰輸出，瓢蟲套偏治療續戰，先選能活著完成連段的組合。</p>
 <p>元素分支不能事後改回；固有元素武器不能再任選元素。酸味與火蟻酸液不同；棍棒的通用也不等於鎚子的粉碎。蘭花鐮刀選元素會失去揮砍類型，不能照強悍分支的雙類型計算。以下先列有效主選，已有高強化備選時不必為每隻怪重做一把。</p>
 <div class="toolbar">${search('target-search','搜尋怪物、武器、元素或打法')}${select('target-kind','對象',[['all','全部對象'],['tier3','三階怪'],['boss','Boss']],'targetKind')}</div>
 <p class="muted">顯示 ${rows.length}／${targetBuilds.length} 組。武器名稱可直達裝備列表，怪物名稱可直達弱抗性矩陣。</p>
 <div role="table" class="weapon-table advice-table target-advice" aria-label="三階怪與 Boss 單雙手特化武器"><div role="row" class="weapon-row weapon-heading">${['目標／弱抗性','單手選擇','雙手選擇','實際效率與準備'].map(label=>`<span role="columnheader">${label}</span>`).join('')}</div>
 ${rows.map(row=>`<div role="row" class="weapon-row" data-target-build="${escape(row.target)}">${comparisonCell('目標／弱抗性',`<a href="?view=creatures&amp;q=${encodeURIComponent(row.target)}">${escape(row.name)}</a><small>${escape(row.weakness)}</small>`)}${comparisonCell('單手選擇',picksHtml(row.single))}${comparisonCell('雙手選擇',picksHtml(row.two))}${comparisonCell('實際效率與準備',`${escape(row.tactics)}<a class="gear-source" href="${targetSource(row.target)}" target="_blank" rel="noopener noreferrer">敵人資料 ↗</a>`)}</div>`).join('')}</div>
 ${rows.length?'':'<p class="empty">沒有符合條件的對策，請清除搜尋或切換對象。</p>'}
 <p class="actions"><a href="?view=mutationBuilds">搭配各場合異變</a><a href="?view=recommendations&amp;tab=progression#armor-comparison">三套防具生存與輸出比較</a></p>
 <p class="sources"><a href="https://wiki.biligame.com/grounded/生物大全" target="_blank" rel="noopener noreferrer">BWIKI 本體怪物資料 ↗</a><a href="${smithingSource}" target="_blank" rel="noopener noreferrer">鍛造與元素分支 ↗</a></p></section>`;
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
