import {equipmentNav,comparisonCell} from './gear.js';
import {upgradeLevels,baseMaterials,branchMaterials,smithingUnlocks,ngArmorLevels,smithingSources} from './smithing-data.js';

const table=(label,head,rows)=>`<div class="weapon-table ${head.length===3?'tool-advice-table':'advice-table'}" role="table" aria-label="${label}"><div role="row" class="weapon-row weapon-heading">${head.map(h=>`<div role="columnheader">${h}</div>`).join('')}</div>${rows.map(row=>`<div role="row" class="weapon-row">${row.map((cell,i)=>comparisonCell(head[i],cell)).join('')}</div>`).join('')}</div>`;
const source=(key,label)=>`<a href="${smithingSources[key]}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
export function smithingHtml(){
 return `${equipmentNav('smithing')}<p>Grounded 本體的鍛造查表。第一輪鍛造站最高 +9；NG+ 的 +10～+15 另列在下方。表中百分比都是相對於未升級的<strong>累計加成</strong>，不是每級再乘一次。</p>
 <nav class="report-tabs" aria-label="鍛造章節">${[['weapons','武器效果'],['armor','防具效果'],['materials','材料配方'],['unlocks','製作解鎖'],['repair','維修'],['ng','NG+ 軛站']].map(([id,label])=>`<a href="#smithing-${id}">${label}</a>`).join('')}</nav>
 <section class="row"><h2>先升 +5，選好分支再升 +6</h2><ul>
 <li><strong>+6 選定後不能改分支或退回。</strong>同一把武器只練一把時，先看<a href="?view=recommendations&amp;tab=fixed">固定武器懶人包</a>分配附加屬性；已投入的材料不能退還。</li>
 <li>鍛造提高數值與耐久，不會把二階裝備變三階，也不會提高工具的採集階級。升過的昆蟲鎚仍不能敲三階礦物。</li>
 <li>盾牌不能鍛造；工具只要出現在鍛造站清單內就能升級。一般彈藥、投擲消耗品也不走這套升級。</li>
 </ul></section>
 <section class="row" id="smithing-weapons"><h2>武器：傷害、耐久與附加屬性</h2>
 <p>+1～+5 共用脆性磨刀石。+6 起選<strong>光滑（Mighty）</strong>或清新／辣味／鹹味／酸味，第一輪各分支的基礎傷害與耐久加成相同。</p>
 ${table('武器逐級鍛造',['升到等級','這一次消耗','累計傷害／耐久'],upgradeLevels.map(r=>['+'+r.level,r.level<=5?`脆性磨刀石 ×${r.weapon}`:`${r.level<=7?'對應分支的球（Glob）':'對應分支的糖球／寶石（Jewel）'} ×${r.weapon}`,`+${r.weaponBonus}%`]))}
 <p><strong>一把從 +0 升到 +9：</strong>脆性磨刀石 ×30 ＋ 所選分支的球 ×15 ＋ 同分支糖球／寶石 ×15。</p>
 ${table('武器分支差異',['分支','+6 起的效果','選擇方式'],[
 ['光滑 Mighty','保留原有傷害屬性；部分武器取得專屬連段、格擋或耐力特效。','常用於泛用武器或保留固有元素；不是一律額外增加同一種特效。'],
 ['四種附加屬性','把該武器的屬性設為清新／辣味／鹹味／酸味，依敵人的弱點與抗性計算；不是多一段獨立元素傷害。','通常仍保留劈砍、刺擊、猛擊等物理傷害類型；花朵鐮刀走元素分支會失去劈砍部分，是例外。'],
 ['固有元素／特殊武器','本來就帶元素的薄荷錘、辣味武士刀等只能走光滑，不能任意換糖球。','弓弩、部分特殊或腐朽武器也有限制；以各武器列出的可用分支為準。']
 ])}
 <p><a href="?view=equipment&amp;kind=weapons">查看每把武器的 +6 特效與可用分支 →</a></p><p class="sources">${source('bwiki','BWIKI 鍛造站')} · ${source('station','Grounded 1 鍛造規則')}</p></section>
 <section class="row" id="smithing-armor"><h2>防具：厚實或光滑</h2>
 <p>+6 起選<strong>厚實（Bulky；BWIKI 巨大）</strong>或<strong>光滑（Sleek）</strong>，兩邊材料用量相同。厚實提高更多基礎防禦與耐久；光滑犧牲部分數值，換取該件防具的光滑特效。光滑特效從 +6 就啟用。</p>
 ${table('防具逐級鍛造',['升到等級','這一次消耗／單件','厚實：防禦／耐久','光滑：防禦／耐久'],upgradeLevels.map(r=>['+'+r.level,`${r.material}外殼 ×${r.armor}`,`+${r.bulky}%`,`+${r.sleek}%${r.level>=6?'<small>另有該件光滑特效</small>':''}`]))}
 <p><strong>單件 +0→+9：</strong>脆性外殼 ×15、堅固外殼 ×6、至尊外殼 ×6。<strong>三件整套：</strong>分別 ×45、×18、×18。</p>
 <p>鍛造增加的是防禦數值與耐久，並非把「重甲 30% 減免」再加 65 個百分點；也不會減輕重甲的耐力消耗。瓢蟲套的光滑治療加成等，常比厚實多出的基礎防禦更有用；每件可獨立選分支，套裝效果仍需穿齊。</p>
 <p><a href="?view=equipment&amp;kind=armor&amp;tab=sets">查看各套裝的光滑特效 →</a> · <a href="?view=equipment&amp;kind=armor&amp;tab=pieces">查看功能散裝 →</a></p></section>
 <section class="row" id="smithing-materials"><h2>材料配方：先分清礦石與蟲料</h2>
 <p>下列配方每次產出 <strong>1 個</strong>，在<strong>工作台</strong>製作。礦石與蟲料是兩種替代配方，並非同時投入。庭院礦石不會定時重生；解鎖蟲料配方後才有穩定的再製來源。</p>
 ${table('磨刀石與外殼材料',['成品／用途','礦石配方','可再製的蟲料配方'],baseMaterials.map(r=>[`<strong>${r.name}</strong><small lang="en">${r.english}</small><small>${r.use}</small>`,`${r.ore}<small>解鎖：${r.oreUnlock}</small>`,`${r.renewable}<small>解鎖：${r.renewableUnlock}</small>`]))}
 <h3>武器 +6～+9：在熔爐加工</h3><p>每次產出 <strong>1 個</strong>。+6／+7 用球，+8／+9 用糖球或寶石；<strong>糖球直接用至尊磨刀石製作，不需要先做球再合成。</strong>閃亮甲殼主要來自上層庭院的聖甲蟲。</p>
 ${table('武器各分支熔爐配方',['分支','+6／+7：球 Glob','+8／+9：糖球／寶石 Jewel'],branchMaterials.map(r=>[r.path,`<strong>${r.glob}</strong><small>${r.globRecipe}</small><small>解鎖：${r.globUnlock}</small>`,`<strong>${r.jewel}</strong><small>${r.jewelRecipe}</small><small>解鎖：樹樁晶片</small>`]))}
 <p class="sources">${source('resources','材料與熔爐配方')} · ${source('brittle','脆性材料解鎖')} · ${source('plating','至尊外殼解鎖')}</p></section>
 <section class="row" id="smithing-unlocks"><h2>製作解鎖順序：晶片拿到後還要買科技</h2>
 <p>除最後的資料磁碟外，晶片需交給漢堡小哥，再到 ASL 商店用原始科學購買對應項目。能做鍛造站，不代表已解鎖所有材料配方。</p>
 ${table('鍛造科技解鎖',['階段／晶片','如何取得','解鎖內容'],smithingUnlocks.map(r=>[r.chip?`<a href="?view=chips#tech-${r.chip}">${r.name} →</a>`:r.name,r.where,r.unlocks]))}
 <p class="sources">${source('shop','科學商店解鎖')} · <a href="?view=chips">本站晶片位置與完整解鎖內容 →</a></p></section>
 <section class="row" id="smithing-repair"><h2>維修：+6 起改用維修膠</h2>
 <p>鍛造升一級會補滿耐久。升到 +6 後，武器與防具的一般維修改用<strong>維修膠 ×1</strong>，不再消耗原裝備的製作材料；不要只為省一次維修，就倉促選定不可逆分支。</p>
 <p>黑螞蟻超級晶片交回後，購買膠水搗碎器科技並建造。常用替代配方：<strong>白蟻部位 ×4</strong>，或<strong>西瓜蟲部位 ×2</strong>，或<strong>黑牛甲蟲部位 ×2</strong>，或<strong>蜘蛛塊 ×8</strong>，各可製作維修膠 ×1；擇一即可，不是全部一起放。</p>
 <p class="sources">${source('glue','膠水搗碎器與維修膠配方')}</p></section>
 <section class="row" id="smithing-ng"><h2>NG+：用軛站繼續到 +15</h2>
 <p>進入 NG+ 後購買軛站（Yoking Station）科技。建造需要<strong>至尊磨刀石 ×5、至尊外殼 ×5、飾品果凍 ×5、育母蜘蛛入注漿液 ×1</strong>，因此還要擊敗 NG+ 育母蜘蛛，並非一進周目就能立刻蓋好。</p>
 <p>武器與防具的 +10～+15 改用<strong>融合水晶（Fusion Crystal）</strong>。防具上限 +15 為官方 1.4.7 開放；以下列出該版確認的防具加成。逐級水晶用量以遊戲內軛站顯示為準。</p>
 ${table('NG+ 防具效果',['升到等級','累計防禦／耐久','材料'],ngArmorLevels.map(r=>['+'+r.level,`+${r.bonus}%`,'融合水晶']))}
 <h3>融合水晶：工作台的替代配方</h3>
 <p>分析對應的入注漿液解鎖配方，每組產出 1 顆水晶。入注漿液來自 NG+ 的入注生物或對應首領；飾品果凍由超級複製機分解飾品等取得，分解會消耗原物品。</p>
 ${table('融合水晶配方',['漿液來源','一顆所需漿液','另需飾品果凍'],[
 ['一般入注生物','入注漿液 ×10','×5'],['育母蜘蛛','育母蜘蛛入注漿液 ×3','×3'],['螳螂','螳螂入注漿液 ×2','×3'],['黃蜂女王','黃蜂女王入注漿液 ×2','×3'],['感染育母蜘蛛','感染育母蜘蛛入注漿液 ×1','×3']
 ])}
 <p>以上配方擇一即可，不必先打齊全部首領。+9 前選定的分支與特效仍需在 +6 時決定，軛站不能幫既有裝備重選分支。</p>
 <p class="sources">${source('yoking','軛站與升級')} · ${source('resources','融合水晶配方')} · ${source('patch','官方 1.4.7 防具升級更新')}</p></section>`;
}
