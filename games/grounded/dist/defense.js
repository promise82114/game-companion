import {creatureRows} from './creature-data.js';
export const defenseSource='https://grounded.wiki.gg/wiki/MIX.Rs';
// 敵人依 Grounded 本體來源；難度是準備建議，不冒充機器介面上的難度標示。
export const defenseEvents={
 'mix-grass':{difficulty:'入門',enemies:['Lawn Mite','Red Soldier Ant','Red Worker Ant'],prep:'二階武器、防具即可安排；先圍草牆並準備修理工具。'},
 'mix-hedge':{difficulty:'中等',enemies:['Larva','Orb Weaver','Orb Weaver Jr.'],prep:'先備揮砍武器與分層圍牆；優先攔住接近裝置的蜘蛛。'},
 'mix-north':{difficulty:'中等偏高',enemies:['Black Soldier Ant','Mosquito'],prep:'地面與空中同時來襲，需備弓弩，別只圍地面牆。'},
 'mix-haze':{difficulty:'偏高',enemies:['Infected Mite','Infected Ladybug','Infected Larva','Infected Weevil'],prep:'準備防毒／爆炸對策、清新武器與多層防線；及早攔截會自爆的敵人。'},
 'mix-sandbox':{difficulty:'偏高',enemies:['Antlion'],prep:'蟻獅套與耐熱準備；敵人鑽地出現，提早接戰，別等牠到裝置旁。'},
 'mix-upper':{difficulty:'高',enemies:['Fire Soldier Ant','Fire Worker Ant','Roly Poly'],prep:'三階強化裝備與多層蘑菇牆；優先處理重型敵人及接近機器的火蟻。'},
 'mix-lawnmower':{difficulty:'高',enemies:['Fire Soldier Ant','Fire Worker Ant','Roly Poly'],prep:'三階強化裝備、分層防線與修理工具；利用割草機周圍地形分散來襲路線。'},
 'mix-moldorc':{difficulty:'高',enemies:['Green Shield Bug','Tick','Tiger Mosquito'],prep:'防毒面具、弓弩與多層防線；綠蝽毒氣與虎蚊空襲需同時處理。'},
 'report-javamatic':{difficulty:'高 · 三點防守',enemies:['Fire Worker Ant','Black Ox Beetle','Ladybird','Bombardier Beetle'],enemyPrefix:'O.R.C. 變體：',prep:'主力三階強化裝備、酸味武器與看門狗；三座電容器分別建牆及頂部保護，預留救點和修理動線。',source:'https://grounded.fandom.com/wiki/JavaMatic'}
};
export const defenseSearchValues=item=>{
 const event=defenseEvents[item.id];
 return event?[event.difficulty,event.prep,...event.enemies.flatMap(name=>[name,creatureRows.find(row=>row[1]===name)?.[0]])]:[];
};
export function defenseHtml(item,escape){
 const event=defenseEvents[item.id];
 if(!event)return '';
 return `<div class="defense-reference" data-defense-reference>
 <p><strong>準備難度（攻略評估）</strong> ${escape(event.difficulty)}</p>
 <p><strong>主要來襲</strong> ${escape(event.enemyPrefix||'')}${event.enemies.map(name=>`<a href="?view=creatures&amp;q=${encodeURIComponent(name)}">${escape(creatureRows.find(row=>row[1]===name)?.[0]||name)}</a>`).join('、')}</p>
 <p><strong>準備重點</strong> ${escape(event.prep)}</p>
 <a class="gear-source" href="${escape(event.source||defenseSource)}" target="_blank" rel="noopener noreferrer">防守資料來源 ↗</a></div>`;
}
