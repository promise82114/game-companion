// Grounded 1；不要混入 Grounded 2 同名頁面的 +4 分支規則。
export const smithingSources={
 bwiki:'https://wiki.biligame.com/grounded/锻造站',
 station:'https://grounded.wiki.gg/wiki/Smithing_Station',
 resources:'https://grounded.wiki.gg/wiki/Resources_(Grounded)',
 brittle:'https://grounded.wiki.gg/wiki/Brittle_Whetstone',
 plating:'https://grounded.wiki.gg/wiki/Supreme_Plating',
 shop:'https://grounded.wiki.gg/wiki/BURG.L',
 glue:'https://grounded.wiki.gg/wiki/Glue_Masher',
 yoking:'https://grounded.wiki.gg/wiki/Yoking_Station',
 patch:'https://grounded.obsidian.net/news/grounded/grounded-patch-147'
};
export const upgradeLevels=[
 {level:1,weapon:2,armor:1,material:'脆性',weaponBonus:5,bulky:5,sleek:5},
 {level:2,weapon:4,armor:2,material:'脆性',weaponBonus:10,bulky:10,sleek:10},
 {level:3,weapon:6,armor:3,material:'脆性',weaponBonus:15,bulky:15,sleek:15},
 {level:4,weapon:8,armor:4,material:'脆性',weaponBonus:20,bulky:20,sleek:20},
 {level:5,weapon:10,armor:5,material:'脆性',weaponBonus:25,bulky:25,sleek:25},
 {level:6,weapon:5,armor:2,material:'堅固',weaponBonus:35,bulky:35,sleek:30},
 {level:7,weapon:10,armor:4,material:'堅固',weaponBonus:45,bulky:45,sleek:35},
 {level:8,weapon:5,armor:2,material:'至尊',weaponBonus:55,bulky:55,sleek:40},
 {level:9,weapon:10,armor:4,material:'至尊',weaponBonus:65,bulky:65,sleek:45}
];
export const baseMaterials=[
 {name:'脆性磨刀石',english:'Brittle Whetstone',ore:'脆性石英岩碎片 ×1',renewable:'樹液 ×1 ＋ 幼蟲尖刺 ×1',oreUnlock:'開局預設商店',renewableUnlock:'黑螞蟻超級晶片',use:'武器 +1～+5'},
 {name:'脆性外殼',english:'Brittle Plating',ore:'脆性大理石碎片 ×1',renewable:'樹液 ×1 ＋ 蠐螬皮 ×1',oreUnlock:'開局預設商店',renewableUnlock:'黑螞蟻超級晶片',use:'防具 +1～+5'},
 {name:'堅固磨刀石',english:'Sturdy Whetstone',ore:'堅固石英岩碎片 ×1',renewable:'樹液 ×1 ＋ 蜘蛛牙 ×1',oreUnlock:'黑螞蟻超級晶片',renewableUnlock:'樹樁晶片',use:'製作 +6／+7 的球類'},
 {name:'堅固外殼',english:'Sturdy Plating',ore:'堅固大理石碎片 ×1',renewable:'樹液 ×1 ＋ 瓢蟲部位 ×1',oreUnlock:'黑螞蟻超級晶片',renewableUnlock:'樹樁晶片',use:'防具 +6／+7'},
 {name:'至尊磨刀石',english:'Supreme Whetstone',ore:'至尊石英岩碎片 ×1',renewable:'樹液 ×1 ＋ 黑牛甲蟲角 ×1',oreUnlock:'樹樁晶片',renewableUnlock:'奧美能資料磁碟',use:'製作 +8／+9 的糖球'},
 {name:'至尊外殼',english:'Supreme Plating',ore:'至尊大理石碎片 ×1',renewable:'樹液 ×1 ＋ 凶猛瓢蟲甲殼 ×1',oreUnlock:'樹樁晶片',renewableUnlock:'奧美能資料磁碟',use:'防具 +8／+9'}
];
export const branchMaterials=[
 {path:'光滑 Mighty',glob:'巨球',globRecipe:'堅固磨刀石 ×1',jewel:'巨型糖球',jewelRecipe:'至尊磨刀石 ×1 ＋ 閃亮甲殼 ×1',globUnlock:'黑螞蟻超級晶片'},
 {path:'清新 Fresh',glob:'薄荷球',globRecipe:'堅固磨刀石 ×1 ＋ 薄荷碎片 ×2',jewel:'薄荷糖球',jewelRecipe:'至尊磨刀石 ×1 ＋ 薄荷碎片 ×2 ＋ 閃亮甲殼 ×1',globUnlock:'沙坑晶片'},
 {path:'辣味 Spicy',glob:'辣味球',globRecipe:'堅固磨刀石 ×1 ＋ 辣味碎片 ×2',jewel:'辣味糖球',jewelRecipe:'至尊磨刀石 ×1 ＋ 辣味碎片 ×2 ＋ 閃亮甲殼 ×1',globUnlock:'沙坑晶片'},
 {path:'鹹味 Salty',glob:'鹹味球',globRecipe:'堅固磨刀石 ×1 ＋ 鹽粒 ×3',jewel:'鹹味糖球',jewelRecipe:'至尊磨刀石 ×1 ＋ 鹽粒 ×3 ＋ 閃亮甲殼 ×1',globUnlock:'沙坑晶片'},
 {path:'酸味 Sour',glob:'酸味球',globRecipe:'堅固磨刀石 ×1 ＋ 酸味糖塊 ×2',jewel:'酸寶石',jewelRecipe:'至尊磨刀石 ×1 ＋ 酸味糖塊 ×2 ＋ 閃亮甲殼 ×1',globUnlock:'沙坑晶片'}
];
export const smithingUnlocks=[
 {name:'開局預設商店',chip:'',where:'橡樹實驗室救回漢堡小哥，使用 ASL 商店。',unlocks:'購買鍛造站科技：鍛造站、脆性磨刀石／外殼的礦石配方，可升到 +5。'},
 {name:'霧靄超級晶片',chip:'chip-haze',where:'進入霧靄實驗室，通過感染瓢蟲戰，取得晶片並交回。',unlocks:'購買「進階生產建築」取得熔爐。武器球／糖球要用熔爐，單有配方還不能製作。'},
 {name:'黑螞蟻超級晶片',chip:'chip-black-ant',where:'黑蟻丘實驗室擊敗助理主管後取得並交回。',unlocks:'分別購買巨球科技（巨球＋堅固武防礦石配方）、脆性升級蟲料配方、膠水搗碎器科技。武器光滑、防具可升 +7；脆性材料可持續製作。'},
 {name:'沙坑晶片',chip:'chip-sandbox',where:'沙坑中央實驗室前哨站，用助理主管門禁卡開門取得並交回。',unlocks:'購買進階鍛造屬性球配方，解鎖清新／辣味／鹹味／酸味 +6、+7；仍需堅固磨刀石與熔爐。'},
 {name:'樹樁晶片',chip:'yard-211331',where:'先用助理主管門禁卡進池塘前哨站按鈕開啟樹樁入口，再前往上層庭院樹樁實驗室取得並交回。',unlocks:'分別購買巨型糖球（含至尊武防礦石配方）、屬性糖球、堅固升級蟲料配方。武防可升到 +9，堅固材料可持續製作。'},
 {name:'奧美能資料磁碟',chip:'',where:'帶溫德爾前往城堡下方的神秘實驗室，擊敗施密克主管取得。',unlocks:'直接解鎖至尊磨刀石／外殼的蟲料配方，無需再到 ASL 逐項購買；可持續製作 +8、+9 所需材料。'}
];
// 1.4.7 官方確認的防具累計加成；不沿用 wiki 尚有版本差異的 NG+ 消耗量。
export const ngArmorLevels=[90,115,140,165,190,215].map((bonus,index)=>({level:10+index,bonus}));
