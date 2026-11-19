// Grounded 本體。效果與鍛造分支對照 BWIKI 個別條目及 Grounded Wiki；不套用 Grounded 2。
export const smithingSource='https://wiki.biligame.com/grounded/锻造站';
export const smithingReference='https://grounded.wiki.gg/wiki/Smithing_Station';
const reference=name=>'https://grounded.wiki.gg/wiki/'+encodeURIComponent(name.replaceAll(' ','_'));
const fixedEffects={
 'Mint Mace':['終結技余震：第三擊追加 50 清新範圍傷害、16 暈眩，減速 20%／5 秒。','https://wiki.biligame.com/grounded/薄荷糖锤'],
 'Salt Morning Star':['終結技流血：第三擊附加每秒 5 傷害，持續 7 秒。', 'https://wiki.biligame.com/grounded/盐钉锤'],
 'Acid Edge':['終結技憤怒：第三擊後攻速 +20%，持續 3 秒。','https://grounded.wiki.gg/wiki/Acid_Edge'],
 'Spicy Coaltana':['終結技招架：第三擊後完美格擋窗口 +15 毫秒／10 秒；期間成功招架使下一擊傷害 +25%。','https://grounded.wiki.gg/wiki/Spicy_Coaltana']
};
const specialMighty={
 'Club of the Mother Demon':'提高毒素傷害；不等於每一擊新增毒素，需搭配施毒來源。',
 "Bard's Bow":'提高暴擊率。'
};
const variantFinales=[
 [['Breathslayer','Pucker Thumper','Sizzle Striker','Tingle Tongue'],'終結技余震：第三擊觸發該武器固有屬性的範圍追加攻擊。'],
 [['Blazing Edge','Fresh Edge','Picklemaul','Wallopeño'],'終結技憤怒：第三擊後暫時提高攻速。'],
 [['Fresh Coldtana','Sour Katanga'],'終結技招架：第三擊後延長招架窗口，成功招架後強化下一擊。'],
 [['Frosted Flake','Pepper Flake'],'終結技耐力湧現：第三擊回復耐力。'],
 [['Salt Chipper'],'終結技流血：第三擊附加持續流血。']
];
export function weaponUpgrade(row){
 if(row.hands==='ammo'||['Bratburst','Splatburst','Kielbasa'].includes(row.english))return {path:'不可鍛造',effect:'消耗型彈藥／炸彈沒有 +6 強化。',source:smithingSource};
 if(row.scope==='入注')return {path:'入注武器',effect:'隨機詞條不繼承原型武器的 +6 特效；依實物詞條查看。',source:'https://wiki.biligame.com/grounded/武器'};
 if(fixedEffects[row.english])return {path:'強悍 +6 起',effect:fixedEffects[row.english][0],source:fixedEffects[row.english][1]};
 const variant=variantFinales.find(([names])=>names.includes(row.english));
 if(variant)return {path:'強悍 +6 起',effect:variant[1]+' 隨機詞條另外判斷。',source:reference(row.english)};
 if(row.english==='Fungnir')return {path:'強悍 +6 起',effect:'終結技傷害：第三擊傷害 +25%；蓄力爆炸為固有效果。',source:reference(row.english)};
 if(row.scope==='輪迴')return {path:'強悍鍛造',effect:'隨機詞條依實物查看；+6 新增專屬效果目前未核實。',source:reference(row.english)};
 if(row.english==='Scythe of Blossoms')return {path:'強悍 +6 起',effect:'暴擊率 +5 個百分點。',elementEffect:'會失去原本的揮砍類型，只保留劈砍；不取得強悍暴擊詞條。',source:reference(row.english)};
 if(specialMighty[row.english])return {path:'強悍 +6 起',effect:specialMighty[row.english],source:reference(row.english)};
 if(row.kind==='細劍'||['Ant Queen Scepter','Blaster of the Moldy Matriarch'].includes(row.english))return {path:'強悍 +6 起',effect:'降低攻擊耐力消耗。'+(row.english==='Blaster of the Moldy Matriarch'?'本武器只能走強悍分支。':''),...(row.english==='Blaster of the Moldy Matriarch'?{}:{elementEffect:'改附加屬性，不取得此強悍詞條。'}),source:reference(row.english)};
 if(row.kind==='匕首')return {path:'強悍 +6 起',effect:'延長完美格擋判定窗口。',elementEffect:'改附加屬性，不取得此強悍詞條。',source:reference(row.english)};
 if(['Pinch Whacker','Prod Smacker'].includes(row.english))return {path:'只能強悍',effect:'提升傷害與耐久；電擊是武器固有效果，不是 +6 才解鎖。',source:reference(row.english)};
 if(row.kind==='鏟')return {path:'只能強悍',effect:'提升傷害與耐久，沒有 +6 新增專屬詞條；不提高挖掘階級。',source:smithingReference};
 if(['斧','鎚','矛','棍棒','單手劍','巨劍'].includes(row.kind))return {path:'強悍 +6 起',effect:'終結技傷害：三連擊第三擊傷害 +25%。',elementEffect:'改附加屬性，不取得此強悍詞條。',source:['斧','鎚'].includes(row.kind)?'https://wiki.biligame.com/grounded/'+(row.kind==='斧'?'白蚁斧':'黑牛甲虫锤'):reference(row.english)};
 return {path:'只能強悍',effect:'提升傷害與耐久；未列有 +6 新增專屬效果。固有元素與法術效果不會到 +6 才出現。',source:smithingReference};
}

export const shields=[
 {name:'火蟻盾',english:'Fire Ant Shield',tier:3,scope:'第一輪',block:75,effect:'格擋有 20% 機率使攻擊者受到腐蝕，承受傷害 +15%，持續 10 秒。',unlock:'分析火蟻頭；上庭院火蟻區。',advice:'瓢蟲套單手續戰、沒有其他腐蝕來源且耐力足夠時優先，補上增傷；已靠火蟻護甲施加同種腐蝕時，不會再疊一份增傷。',source:'https://wiki.biligame.com/grounded/火蚁盾牌'},
 {name:'凶猛瓢蟲盾',english:'Ladybird Shield',tier:3,scope:'第一輪',block:75,effect:'格擋有 25% 機率使近戰攻擊在 5 秒內不消耗耐力。',unlock:'分析凶猛瓢蟲殼；上庭院凶猛瓢蟲。',advice:'火蟻護甲已有腐蝕時搭配省耐效果；瓢蟲套常缺耐力或已有其他腐蝕來源時也可改用。兩面三階盾的基礎格擋量相同。',source:'https://grounded.wiki.gg/wiki/Ladybird_Shield'},
 {name:'被感染的螞蟻盾',english:'Infected Ant Shield',tier:3,scope:'輪迴',block:75,effect:'格擋時額外抵抗爆炸傷害；精確比例來源有差異，依遊戲當前詞條確認。',unlock:'分析被感染的螞蟻部位；需前一輪感染蟻后，進入後續 NG+ 取得感染螞蟻素材。',advice:'特殊爆炸對策，不是第一輪通用盾。',source:'https://grounded.wiki.gg/wiki/Infected_Ant_Shield'},
 {name:'黑螞蟻盾牌',english:'Black Ant Shield',tier:2,scope:'第一輪',block:50,effect:'提高格擋強度；沒有額外觸發效果。',unlock:'分析黑螞蟻部位，或腦力值 LV.10；黑蟻丘與垃圾堆周圍。',advice:'中期取代象鼻蟲盾，減少格擋條被打滿。',source:'https://wiki.biligame.com/grounded/黑蚂蚁盾牌'},
 {name:'象鼻蟲盾牌',english:'Weevil Shield',tier:1,scope:'第一輪',block:25,effect:'提高格擋強度；沒有額外觸發效果。',unlock:'分析生象鼻蟲肉；下庭院即可取得。',advice:'開局盾，搭單手矛或劍學習格擋。',source:'https://wiki.biligame.com/grounded/象鼻虫盾牌'}
];

// 推薦配裝與兩份對敵表共用；僅為閱讀資料，不保存防具或盾牌選擇。
export const armorShieldPairings=[
 {armor:'Ladybug Armor',shield:'Fire Ant Shield',shortReason:'補上腐蝕增傷；需沒有其他同種來源。',reason:'保留瓢蟲套的治療續戰，讓盾補上防具沒有的腐蝕增傷。耐力足夠且沒有其他同種腐蝕來源時優先；增傷需格擋觸發，不是常駐。'},
 {armor:'Fire Ant Armor',shield:'Ladybird Shield',shortReason:'護甲已有腐蝕，改取格擋省耐。',reason:'火蟻護甲的近戰已能施加腐蝕，同種效果不會再疊一份增傷。改用凶猛瓢蟲盾的格擋觸發省耐效果，幫助維持出刀節奏。'}
];
export const shieldPairingAlternative='瓢蟲套若常因耐力不足停手，或隊友／其他裝備已穩定提供同種腐蝕，也可換凶猛瓢蟲盾；依實際缺耐情況取捨，不因打 Boss 就固定換盾。';
// 散件另記實際防禦與抗傷，不用套裝階級公式估算。
export const utilityArmorStats={
 'Gas Mask':{defense:3,resistance:2.5},'Gill Tube':{defense:6,resistance:2.5},
 'Bubble Helmet':{defense:9,resistance:2.5},'Firefly Head Lamp':{defense:9,resistance:7.5},
 'Fin Flops':{defense:6,resistance:2.5},'Termite Armor':{defense:17,resistance:5}
};
export const environmentUpgrades=[
 {gear:'Gas Mask',level:'常用先 +5；霧靄戰鬥選光滑 +6，長期使用再 +7～9。',benefit:'光滑增加爆炸抗性；防毒氣是未強化就有的功能，並不防所有毒素／猛毒。',tradeoff:'會中斷原本三件套；本身防禦低，保留高強化胸甲與腿甲。',source:'https://grounded.wiki.gg/wiki/Gas_Mask'},
 {gear:'Firefly Head Lamp',level:'洞穴常用值得 +5；採石用途建議光滑 +6。',benefit:'頭燈能空出雙手；光滑增加 25% 石類資源採集效率，不是所有資源都加速。',tradeoff:'它是重甲頭件，抗傷未必比原頭盔差；變弱也可能來自失去三件套或光滑治療加成。',source:'https://wiki.biligame.com/grounded/萤火虫头灯'},
 {gear:'Bubble Helmet',level:'池塘長期探索值得光滑 +6；頻繁水下作戰再 +7～9。',benefit:'光滑提高耐力回復 20%；氧氣功能本來就有，升級不會再額外延長氧氣。',tradeoff:'輕甲頭件取代重甲會降低抗傷；胸甲保留主力、搭可下水武器，預留補氧路線。',source:'https://wiki.biligame.com/grounded/泡泡头盔'},
 {gear:'Fin Flops',level:'常下水先 +5；長距離游泳可選光滑 +6，優先度低於主力與泡泡頭盔。',benefit:'光滑降低衝刺耐力消耗 10%；原本游速 +30%，強化不會繼續疊高游速。',tradeoff:'鰭足換掉主力腿甲會中斷套裝。以快速通過與採集為主，別穿整套環境裝備硬打陸戰。',source:'https://wiki.biligame.com/grounded/水虫鳍足'},
 {gear:'Antlion Armor',level:'碳刃防守前整套至少 +5；常去灼熱區再 +6～7，專門主力才 +9。',benefit:'耐熱來自單件原有效果，並非鍛造等級。光滑減緩口渴；要增加正面防禦可選巨大。',tradeoff:'蟻獅本身是三階中甲，能戰鬥，但沒有瓢蟲治療或火蟻腐蝕。仍搭清新防禦、合適武器與補品。',source:'https://wiki.biligame.com/grounded/蚁狮套'}
];
export const toolUpgrades=[
 {gear:['Pebblet Axe','Pebblet Hammer'],level:'過渡工具不用追高，常用或快壞時升 +1～3 即可。',reason:'強化提高傷害與耐久並補滿耐久；不會把一階變成二階，也無法採更高階資源。'},
 {gear:['Insect Axe','Insect Hammer'],level:'會用很久可 +3～5；即將換三階就保留高階強化資源。',reason:'兼作武器時，+6 強悍的第三擊增傷有用；純採集先以工具階級和耐久為主。'},
 {gear:['Termite Axe','Black Ox Hammer'],level:'長期工具值得 +5；常用可到強悍 +6～7，兼主武器才優先 +9。',reason:'傷害與耐久都提高；採集是否少敲一擊取決於節點門檻，不保證按面板百分比等比例加速。強悍第三擊增傷是戰鬥詞條，不當成採集速度保證。'},
 {gear:['Black Ant Shovel'],level:'可強化提高傷害與耐久，但純挖掘優先度低，不必為了採集追 +9。',reason:'沒有 +6 專屬戰鬥詞條；升級不增加挖掘階級、掉落量或尋寶範圍。'},
 {gear:['Widow Dagger'],level:'採池塘苔蘚只要求三階匕首；兼水下作戰才依主武器投資到 +6～9。',reason:'+6 強悍增加招架窗口；元素分支對應作戰弱點。採集門檻看三階，不看鍛造 +6。'}
];
