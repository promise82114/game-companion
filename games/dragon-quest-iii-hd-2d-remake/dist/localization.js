// 中文為 HD-2D 攻略對照用名；不冒充已逐項核對的 PS5 台灣官方字串。
// 台灣來源優先。地區版本／社群異名收在 aliases，ID、原名與存檔不變。
export const localizationSources=[
 {id:'zh-locations',label:'巴哈姆特 HD-2D 小徽章／地名表',url:'https://forum.gamer.com.tw/G2.php?bsn=251&sn=4074',accessedAt:'2026-11-23',note:'搜尋索引可核對名稱；全文存取 403，未宣稱完成逐張遊戲畫面核實。'},
 {id:'zh-friendly',label:'皮諾電玩：友善魔物與繁中地名',url:'https://pinogamer.com/18533',accessedAt:'2026-11-23',note:'繁中攻略用名，部分地名與其他版本有差異。'},
 {id:'zh-enemies',label:'3DM／PSN 中文站：163 討伐編號名稱',url:'https://www.3dmgame.com/gl/3953227.html',accessedAt:'2026-11-23',note:'依圖鑑編號對照，簡體用名轉繁體；不等同已核實台灣官方名稱。'},
 {id:'zh-equipment',label:'巴哈姆特 HD-2D 裝備名稱',url:'https://forum.gamer.com.tw/Co.php?bsn=251&sn=107342',accessedAt:'2026-11-23',note:'公開搜尋索引中的裝備與地名對照。'},
 {id:'zh-skills',label:'巴哈姆特：職業與常用技能用名',url:'https://home.gamer.com.tw/artwork.php?sn=6178915',accessedAt:'2026-11-23',note:'只採可核對用名，其餘技能中文為本站說明譯名，原名可切換顯示。'},
 {id:'zh-instinct',label:'巴哈姆特 HD-2D 繁中試玩：馴魔師、野性直覺',url:'https://gnn.gamer.com.tw/detail.php?sn=274392',accessedAt:'2026-11-23',note:'實際試玩報導中的繁中名稱。'}
];
const pairs=text=>text.trim().split('\n').filter(Boolean).map(line=>line.split('|').map(s=>s.trim()));
export const placeTerms=pairs(`
Aliahan|亞里亞罕
Reeve|萊貝
Shrine of the Plains|草原祠堂
Dreamer's Tower|納吉米塔
Little Shrine|小祠堂
Promontory Passage|海角洞窟
Path of Promise|指引洞窟
Shrine of Promise|誘導祠堂
Romaria|羅馬利亞
Khoryv|哈薩布
Skyfell Tower|香檳尼塔
Norvik|挪尼爾
Faerie Village|艾爾芙族隱居鄉里
Underground Lake|地底湖
Asham|安色蘭
Ibis|伊西斯
Pyramid|金字塔
Romarian Outpost|羅馬利亞關卡
Romaria Outpost|羅馬利亞關卡
Portoga|葡托牙
Nordy's Grotto|諾德洞窟
Baharata|波哈勒德
Kidnapper's Cave|綁匪的根據地
Alltrades Abbey|達瑪神殿
Tower of Transcendence|迦樓那塔
Mur|穆奧爾
Merchantburg|商人之町
Immigrant Town|商人之町
Lanson|蘭西爾
Edina|愛丁拜亞
Shallows Shrine|淺灘祠堂
Shallow Shrine|淺灘祠堂
Theddon|田頓
Pirates' Den|海盜的老巢
Pirate's Den|海盜的老巢
Gaia's Navel|地球肚臍
Jipang|扶桑國
Orochi's Lair|遠呂智洞窟
Fifer's Spire|厄普塔
Teleportal Shrine|旅途之門祠堂
Wayfarer's Shrine|旅人祠堂
Wayfarer's Chapel|旅人教會
Manoza Cave|拉之洞窟
Manoza|沙曼奧薩
Grimland|格陵拉德
Rimland|雷亞姆島
Ghost Ship|幽靈船
Olivia's Promontory|奧莉維亞海角
Mt. Necrogond|奈克羅剛鐸火山
Maw of the Necrogond|奈克羅剛鐸洞窟
Necrogond Shrine|奈克羅剛鐸祠堂
Shrine of the Everbird|雷亞姆島祠堂
Baramos's Lair|巴拉莫斯城
Baramos' Lair|巴拉莫斯城
Castle of the Dragon Queen|龍女王之城
Pit of Giaga|吉亞加大洞窟
West Tantegel Harbour|拉達托姆西港
West Tantegel Harbor|拉達托姆西港
Tantegel|拉達托姆
Damdara|多姆多拉
Cantlin|麥爾基德
Shrine of the Spirit|精靈祠堂
Kol|麥拉
Quagmire Cave|沼澤洞窟
Shrine of the Dwarf|矮人祠堂
Tower of Rubiss|露比絲塔
Sanctum|神聖祠堂
Rimuldar|利姆爾達
Zoma's Citadel|索瑪城
Cloudsgate Citadel|傑尼斯城
Citadel Tower|謎之塔
Temple of Trials|考驗神殿
Aliahan Castle|亞里亞罕城
Romaria Castle|羅馬利亞城
Desert Shrine|沙漠祠堂
Ibis Castle|伊西斯城
Ibis Palace|伊西斯城
Wayfarer's Inn|旅人的旅店
Jipang Palace|卑彌呼宅第
Lozamii|魯札米
Persistence|蘇
Portoga Lighthouse|葡托牙燈塔
Manoza Castle|沙曼奧薩城
Shrine of Shackles|祠堂監獄
Galen's House|加雷的家
Tantegel Castle|拉達托姆城
Alefgard|阿雷夫加爾德
Craggy Cave|岩山洞窟
Talontear Tunnel|魔王爪痕
Yggdrasil Tree|世界樹
Mini Medal Manor|小徽章之館
Patty's Party Planning Place|露伊達酒店
Patty's Place|露伊達酒店
Merchantburg 第 4 階段|商人之町第 4 階段
`);
// 第一欄對應本作圖鑑編號；只轉換名稱，不搬入外部攻略敘述或位置。
export const enemyNames=`史萊姆|巨鴉|獨角兔|巨型食蟻獸|人面蝶|巨蛙|泡沫史萊姆|魔法師|蠍尾蜂|霍伊米史萊姆|衝鋒兔|食蟻獸怪|毛蟲怪|劇毒蟾蜍|蝙蝠人|僵屍獸|殺人蜂|軍隊蟹|徬徨甲冑|雲霧怪|妖怪蘑菇|毒青蟲|死亡之翼|墳墓犬|詭影|幻覺菇|吸血鬼|食人蛾|飛貓|凶暴猿猴|地獄大鉗|木乃伊|火焰蜈蚣|大王蛤蟆|笑面口袋|乾屍|食人箱|德魯伊|幻覺菇術士|狩獵蜂|死亡胡狼|幻術士|熱雲怪|食蟻熊|腐爛屍體|蝙蝠貓|殺人鬼|海生史萊姆|麻痺水母|半魚人|大王烏賊|憤怒蟹|達因半魚人|地獄禿鷲|麻痺鳳蝶|龜龍|觸手怪|瘋狂公牛|殺人猩猩|金屬史萊姆|豪傑熊|迦樓羅|大嘴鳥怪|空龍|鬼面道士|巨角|劇毒僵屍|青衣巨喙|流浪金屬史萊姆|處刑人|殺人鎧甲|僵屍操縱者|魔王寶寶|貝殼史萊姆|死亡追蹤者|炸彈岩|貝霍瑪史萊姆|巴納巴斯|薩滿巫師|寶箱怪|熔岩魔人|暴怒山羊|魔女|死亡鳥喙|地獄甲冑|魔法婆婆|巨猿|灰熊怪|陰影|骸骨劍士|冰河魔人|雪龍|迷你惡魔|極樂鳥|龜龍領主|食人魔|霜雲怪|舞蹈寶石|地獄騎士|殘暴鬼魂|獅頭怪|邪惡法師|會動的石像|半魚人王|庫拉貢|沙拉曼達|史萊姆貝斯|泥手|食屍鬼|大法師|輕浮魔王|海德拉|食人魔大王|熊獸人|魔王之影|奇美拉|馬克洛貝塔|骨龍|法師奇美拉|龍翼獅|黃金人|龍|大魔神|巴洛格|屍龍|魔界獅|骸骨守衛|金屬奇美拉|惡魔巫師|殺人蟹|暗黑食人魔|惡魔劍士|邪惡巴拉莫斯|鳳凰|天之守門人|金黃雲霧怪|白鐵騎士|潘多拉盒|白銀狂熊|鋼鐵巨像|金屬手|白獅|藍龍|紅龍|犍陀多|犍陀多小弟|乾屍之眼|尼羅惡魔|幽靈|黃泉看守|蝙蝠|術士|八岐遠呂智|食人魔頭目|亡魂|巴拉莫斯|惡魔友人|大王海德拉|巴拉莫斯二號|殭屍巴拉莫斯|索瑪|神龍|五首金龍`.split('|');
export const friendlyOverrides=pairs(`
Bag O' Laughs|笑面口袋
Mummy|乾屍
Mushroom Mage|幻覺菇術士
Walking Corpse|腐爛屍體
Imp|魔王寶寶
Silhouette|殘暴鬼魂
Armful|地獄騎士
Ursa Major|灰熊怪
She-Slime|史萊姆貝斯
Gold Digger（舊稱 Gold Golem）|黃金魔人
Gold Digger|黃金魔人
Gold Golem|黃金魔人
Xenlon|神龍
Xenwrong|神龍（北門友善個體）
`);
export const itemTerms=pairs(`
Thief's Key|盜賊鑰匙
Magic Key|魔法鑰匙
Ultimate Key|最後鑰匙
Wrecking Ball|魔法炸彈
Golden Crown|金王冠
Dreamstone|夢之石
Wakey Dust|覺醒粉
Night Light|黑夜燈
Bottomless Pot|乾涸之壺
Fading Jenny|隱形草
Ra's Mirror|拉之鏡
Mod Rod|變化之杖
Boatman's Bone|船員之骨
Lovers' Locket|愛之回憶
Mountaincleaver|草薙劍
Royal Missive|國王的親筆信
Black Pepper|黑胡椒
Words of Wisdom|悟道之書
Ortega's Helm|奧爾特加的頭盔
Sphere of Light|光之玉
Sunstone|太陽之石
Staff of Rain|雨雲之杖
Faerie Flute|妖精之笛
Orichalcum|奧利哈爾剛
Broken Blade|斷劍
Forging Hammer|蓋亞之錘
Zenithium|藍色金屬
Sword of Kings|王者之劍
Auroral Helm|光之頭盔
Sacred Amulet|神聖護符
Rainbow Drop|彩虹水滴
Sage's Stone|賢者之石
Rubiss's Sword|露比絲之劍
Grand Medal|黃金紀念章
Golden Claws|黃金爪
Gringham Whip|古林蓋姆鞭
Hardwood Headgear|木帽
Hardwood Headwear|木帽
Staff of Sentencing|裁決之杖
Epic Apron|華麗圍裙
Slime Earrings|史萊姆耳環
Magic Water|魔法聖水
Elfin Elixir|妖精靈藥
Flame Armour|火焰鎧甲
Boomerang|迴旋鏢
Thorn Whip|荊棘鞭
Edged Boomerang|鋒刃迴旋鏢
Poison Needle|毒針
Staff of Resurrection|復活之杖
Duplic Hat|回聲帽
Falcon Blade|隼之劍
War Drum|戰鼓
Guns 'n' Buns|辣妹日記
Guns 'N' Buns|辣妹日記
More Guns 'n' Buns|更多辣妹日記
More Guns 'N' Buns|更多辣妹日記
Meteorite Bracer|流星手環
Auroral Armour|光之鎧甲
Musk|香袋
Rousing Ring|清醒戒指
Heavenly Helm|天界頭盔
Ripper of the Rift|尼羅惡魔
Boss Troll|食人魔頭目
Robbin' 'Ood|犍陀多
Orochi|八岐遠呂智
Ramia|不死鳥拉米亞
Echo Flute|回聲之笛
Pandora's Boxes|潘多拉盒
Elfin Elixirs|妖精靈藥
Headsman's Axe|處刑人之斧
Siren's Sword|誘惑之劍
Lyre of Ire|銀豎琴
Hero's Shield|勇者之盾
Beast Claw|魔獸之爪
Dark Robe|黑暗長袍
Destructiball|破壞鐵球
Elevating Shoes|幸福之靴
Metal Wing Boomerang|金屬之翼
Bronze Shield|青銅盾
Cloak of Evasion|閃避斗篷
Beastly Bullwhip|魔獸皮鞭
Somatic Staff|力量之杖
Cat Suit|貓咪布偶裝
Prayer Ring|祈禱戒指
Dragonsbane Claws|屠龍爪
Flowing Dress|水之羽衣
Godbird Sceptre|神鳥之杖
Hunter's Moon|獵月迴旋鏢
Yggdrasil Dress Coat|世界樹禮服
Leather Dress|皮裙
Garter|吊襪帶
Silver Platter|銀托盤
Strength Ring|力量戒指
Scholar's Specs|博學眼鏡
Weightlifter's Belt|力量腰帶
Agility Ring|敏捷戒指
Agility Gilet|敏捷背心
Dragontail Whip|龍尾鞭
Stealth Suit|忍者裝
Flametang Boomerang|火焰迴旋鏢
Mercury's Bandana|疾風頭巾
Scourge Whip|懲戒鞭
Dragon Claws|龍爪
Astraea's Abacus|正義算盤
Dragon Robe|龍之長袍
Blessed Bikini|神聖比基尼
Goddess Shield|女神之盾
Exotoga|神秘長袍
Dragon Queen|龍女王
Dying Fires|黃泉看守群
Stone Guardians|石像守衛
Alltrades|達瑪神殿
Cloudsgate|傑尼斯城
Claws|爪
Boomerangs|迴旋鏢
Axes|斧
Staves|杖
Roadmap|路線圖
NPC|居民
Baramos|巴拉莫斯
Zoma|索瑪
Ortega|奧爾特加
Monty|魔物收容員
Morgan Minimann|徽章伯伯
Monster Wrangler|馴魔師
Martial Artist|武鬥家
Gadabout|玩樂者
Warrior|戰士
Merchant|商人
Priest|僧侶
Mage|魔法師
Thief|盜賊
Sage|賢者
Hero|勇者
Monster Arena|怪物競技場
Defeated Monster List|討伐魔物清單
Spells/Abilities|咒文／特技
Misc. → Info|其他 → 資訊
Misc → Info|其他 → 資訊
Misc／Info|其他／資訊
Battles Won|戰鬥勝場
Sparkly Spots|原野閃光點
Sparkly Spot|原野閃光點
Sparkle Spots|原野閃光點
Continue From a Church|在教會復活
Dracky Quest|輕鬆難度
Rank|級別
BOSS|頭目
Boss|頭目
`);
// 已有來源的常用技能用名；其餘為幫助讀懂攻略的說明譯名。
export const skillTerms=pairs(`
Frizz|美拉
Heal|霍伊米
Poof|尼弗拉姆
Evac|里雷米特
Sizz|基拉
Kaclang|阿斯特隆
Snooze|拉里霍
Zin|扎奧
Zoom|魯拉
Fizzle|瑪霍頓
Zap|迪恩
Midheal|貝霍伊米
Sizzle|貝基拉瑪
Holy Protection|托黑洛斯
Zapple|萊丁
Boom|伊奧拉
Zing|查歐拉爾
Kasizz|貝基拉剛
Fullheal|貝霍瑪
Kazap|基加迪恩
Omniheal|貝霍瑪曾
Flame Slash|火焰斬
Dodgy Dance|閃避之舞
Lightning Slash|雷光斬
Defending Champion|大防禦
Gust Slash|疾風斬
Meditation|冥想
Falcon Slash|隼斬
Gigaslash|基加斬
Cop Out|逃避攻擊
Whipping Boy|代人受過
Mercurial Thrust|疾風突刺
Double-Edged Slash|雙刃斬
Pressure Pointer|急所突刺
Forbearance|仁王立
Sword Dance|劍舞
Metal Slash|金屬斬
Multislice|橫掃斬
Cutting Edge|全力斬
Leg Sweep|掃堂腿
Flying Knee|飛膝踢
Hawkeye Claw|必中爪擊
Wind Sickles|真空斬
Knuckle Sandwich|正拳突刺
Double Up|捨身
Roundhouse Kick|迴旋踢
Multifists|爆裂拳
Ripple of Disruption|零之洗禮
Critical Claim|會心必中
Dazzle|瑪努撒
Woosh|巴基
Sap|魯卡尼
Squelch|奇亞里
Acceleratle|皮歐里姆
Cock-a-Doodle-Doo|查梅哈
Tingle|奇亞里克
Kasap|魯卡南
Magic Barrier|魔法屏障
Swoosh|巴基瑪
Blasto|巴希魯拉
Moreheal|貝霍伊姆
Whack|查奇
Thwack|查拉奇
Insulatle|弗巴哈
Kaswoosh|巴基克羅斯
Kamikazee|美加恩特
Multiheal|貝霍瑪拉
Kazing|查歐里克
Buff|斯卡拉
Crack|夏德
Kabuff|史庫爾特
Deceleratle|波米奧斯
Bang|伊奧
Drain Magic|瑪霍特拉
Defizzle|瑪霍里
Peep|因帕斯
Frizzle|美拉米
Safe Passage|托拉瑪納
Crackle|夏達爾克
Oomph|拜奇爾特
Bounce|瑪霍坎達
Tick-Tock|拉納魯塔
Kacrack|瑪夏德
Fuddle|美達帕尼
Sheen|夏納克
Fade|萊姆歐爾
Kafrizz|美拉佐瑪
Kacrackle|瑪夏德斯
Click|阿巴卡姆
Morph|摩夏斯
Puff!|多拉格拉姆
Kaboom|伊奧納曾
Hocus Pocus|帕爾朋特
Snoop|雷米拉馬
Sandstorm|揚沙
Sleepy Slap|催眠掌
Propeller Blade|螺旋斬
Shocking Slash|麻痺斬
Nose for Treasure|盜賊的嗅覺
Assassin's Stab|刺客突刺
Padfoot|潛行
Hypnowhip|催眠鞭
Persecutter|睡神狩獵
Backdraft|逆風
Stone's Throw|投石
Muster Strength|蓄力
Dig|挖掘
Service Call|高聲呼喚
Helichopter|迴旋攻擊
Call to Arms|召集軍隊
Sobering Slap|清醒拍打
Whistle|口笛
Kerplunk Dance|捨命之舞
Spooky Aura|詭異之光
Egg On|聲援
Harvest Moon|收割之月
Hustle Dance|活力之舞
Channel Anger|魔力覺醒
Tongue Lashing|舔舐
Soothing Song|安寧之歌
Animal Instinct|野性直覺
Emergency Groom|緊急理毛
Attack Attacker|碎刃
War Cry|戰吼
Tongue Bashing|強力舔舐
Flame Breath|火焰吐息
Boulder Toss|投擲巨石
Burning Breath|灼熱吐息
C-c-cold Breath|冰凍吐息
Call of the Wild|遠嘯
Monster Pile-On|魔物大軍
Lashings of Love|愛之鞭
Wild Side|野獸模式
Focus Pocus|集中精神
Fog of War|戰爭迷霧
`);
export const knownAliases={Portoga:['波爾托加'],Baharata:['巴哈拉塔'],Khoryv:['卡扎布'],Norvik:['諾尼爾'],Asham:['阿薩拉姆','色蘭'],Jipang:['吉潘古'],Manoza:['沙瑪奧薩'],Merchantburg:['移民之鎮','商人城'],"Skyfell Tower":['香帕尼塔'],"Dreamer's Tower":['納吉米之塔'],"Grand Dragon":['巨龍','五首金龍'],"Gold Digger":['黃金人','黃金魔像'],"Monster Wrangler":['馴獸師','魔物使','魔物大師','馴魔師']};
let compiled=[],dictionary=new Map(),pattern;
const normalize=s=>s.replace(/[’‘]/g,"'").toLowerCase();
const escapeRx=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
export function configureLocalization(catalog){dictionary=new Map([...placeTerms,...itemTerms,...skillTerms,...friendlyOverrides].map(([en,zh])=>[normalize(en),zh]));
 for(const row of catalog.collectibles.filter(r=>r.category==='enemy'))dictionary.set(normalize(row.englishName||row.name),enemyNames[Number(row.id.slice(6))-1]);
 for(const [en,zh] of friendlyOverrides)dictionary.set(normalize(en),zh);
 for(const t of catalog.trophies){const [zh,en]=t.label.split('／');if(zh&&en)dictionary.set(normalize(en),zh);}
 for(const {en,zh} of catalog.localization?.evidence?.entries||[])dictionary.set(normalize(en),zh);
 compiled=[...dictionary.keys()].sort((a,b)=>b.length-a.length);
 pattern=new RegExp('(^|[^A-Za-z0-9])('+compiled.map(escapeRx).join('|')+')(?=$|[^A-Za-z0-9])','gi');
}
export function translate(text){if(!text||!pattern)return String(text??'');const value=String(text).replace(/[’‘]/g,"'");return value.split(/(https?:\/\/[^\s]+)/).map(part=>part.startsWith('http')?part:part.replace(pattern,(_m,b,key)=>b+dictionary.get(normalize(key)))).join('');}
export function expandSearch(text){let result=String(text??'')+' '+translate(text);for(const [en,aliases] of Object.entries(knownAliases))if(normalize(text).includes(normalize(en)))result+=' '+aliases.join(' ');return result;}
export function localizeDom(root){const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);for(const node of nodes){if(node.parentElement.closest('code,pre,.original-name,[data-raw],script,style'))continue;node.textContent=translate(node.textContent);}}
