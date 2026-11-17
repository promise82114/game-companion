export const mutationSource='https://wiki.biligame.com/grounded/突变';
export const mutationPatch='https://grounded.obsidian.net/news/grounded/grounded-patch-147';

export const mutationCategories={weapon:'武器專精',combat:'戰鬥與防護',explore:'探索與採集',boss:'首領與防守',team:'多人與召喚'};
const weaponKills=weapon=>`用${weapon}擊殺 40／100／200 隻非無害生物。`;

export const mutations=[
 ['Lil Fist','小拳頭','weapon','徒手命中逐次增加傷害，最多 100 層。受傷、脫戰或換武器時重置。III 階追加第二拳。',weaponKills('拳頭')],
 ['Chopper','砍伐者','weapon','斧頭削弱目標的粉碎、揮砍與穿刺抗性 10／15／20%。III 階在耐力未耗盡時消除斧頭攻擊後的回復延遲。',weaponKills('斧頭')],
 ['Smasher','粉碎者','weapon','鎚擊降低敵人攻速 10／20／30%。III 階提高鎚擊暈眩值 50%。',weaponKills('鎚子')],
 ['Javelineer','標槍手','weapon','長矛投擲增傷 10／20／30%，持矛時反彈所受傷害。III 階長矛蓄力攻擊增傷 30%。',weaponKills('長矛')],
 ['Assassin','刺客','weapon','匕首命中會使敵人流血，5 秒共 30／50／75 點。III 階降低目標流血抗性。',weaponKills('匕首')],
 ['Sharpshooter','神射手','weapon','弓弩暴擊率增加 10／15／20 個百分點。III 階的辣味、清新、酸味箭另有燃燒、緩速、暈眩效果。',weaponKills('弓或弩')],
 ['Barbarian','野蠻人','weapon','棍棒攻擊可觸發狂暴，棍棒增傷 15／20／25%，完美格擋判定窗口縮短。III 階狂暴時每秒回復 1 點生命。',weaponKills('棍棒')],
 ['Blademaster','劍術大師','weapon','劍類命中使敵人攻擊傷害降低 10／20／30%。III 階縮短耐力耗盡後的恢復時間 90%。',weaponKills('劍類')],
 ['Whittle Wizard','木削小巫師','weapon','薄荷杖附緩速、酸味杖加暈眩、辣味杖附燃燒。III 階法杖攻擊可觸發耐力消耗減半，蟻后法杖適用此精通效果。',weaponKills('法杖')],
 ['Parry Master','招架大師','combat','完美格擋回復 25／50／100 點耐力。','完美格擋 20／60／100 次。'],
 ['Meat Shield','肉盾','combat','生命上限增加 50。','在 ASL 科學商店用 3,000 原始科學購買。'],
 ['Buff Lungs','肺部增益','combat','耐力上限增加 50。','交回紅蟻丘晶片後，在 ASL 用 3,000 原始科學購買。'],
 ['Daredevil','冒失鬼','explore','墜落傷害減半。','交回樹籬超級晶片後，在 ASL 用 3,000 原始科學購買。'],
 ['Grass Master','割草大師','explore','提高砍伐效率，收割時回復耐力。適用草、乾草、野草等。','砍倒草、乾草或野草等，累計 50／200／500 次。'],
 ['Rock Cracker','碎石者','explore','敲碎適用資源的效率提高 25／50／100%，例如石英岩、大理石、鹽、木炭。糖果不受此效果影響。','擊碎適用的資源節點 25／60／105 次。'],
 ['Hauling Hero','搬運英雄','explore','草板、雜草莖等搬運上限增加 5／10／15。','基地舒適度達到 2／3／4 級。'],
 ['Coup de Grass','四葉草強運','combat','暴擊率增加 2.5／5 個百分點。','在東側淹水區的水下洞穴找到四葉草，再到野餐桌米諾陶迷宮把二十面骰打到 20 朝上。兩項可交換順序。'],
 ['Trapper PEEP.R','陷阱獵人','combat','暴擊傷害提高 20／40／60%。','取得 20／40／60 張金色生物卡。'],
 ['Dissection Expert','解剖專家','explore','戰利品幸運提高 10%。','交回被遺忘的漢堡小哥晶片（黃蜂箱）後，在 ASL 用 3,000 原始科學購買。'],
 ['Rascal Rogue','流氓遊俠','explore','近戰有 2／5／10% 機率立即偷取戰利品；每個目標每場戰鬥限一次。','找到 1／4／7 個雕像藝術品。'],
 ['Juicy','多汁','explore','口渴值消耗速度減半。','發現 5 處飲料盒地標。'],
 ['Natural Explorer','天生的探索者','explore','非戰鬥時移速增加 20／35／50%，戰鬥結束後立即恢復加成。','發現 20／50／80 個地標。'],
 ['Merteen','小美人魚','explore','水下呼吸時間增加 10%，游速增加 15%。','發現 5 個水下地標。'],
 ['Cardio Fan','有氧運動愛好者','combat','耐力回復加快 15／20／30%，且縮短耐力耗盡後的恢復時間。','把耐力耗到零 100／250／500 次。'],
 ['Reliable Friend','可靠的朋友','team','扶起隊友的速度增加 25／50／75%。','復活倒地隊友 5／15／30 次。'],
 ['Fresh Defense','清新防禦','combat','降低毒氣、燃燒傷害與灼熱累積；III 階灼熱累積速度降低 75%。','吃下 1／5／10 塊薄荷糖片。'],
 ['Spicy Safety','辣味防護','combat','受到的穿刺與粉碎傷害降低 25／50%。','吃下 1／4 塊辣味碎片。'],
 ['Sour Sensation','酸味感','combat','受到攻擊時向攻擊者反彈 50／100／150% 的所受傷害。','吃下 1／5／10 塊酸味塊。'],
 ['Ant-nihilator','螞蟻剋星','combat','對螞蟻與人蟻增傷 5／15／25%。III 階減免 10% 螞蟻傷害。','擊殺 15／45／100 隻紅蟻、黑蟻或火蟻；白蟻不計。'],
 ['Mom Genes','母系基因','team','攻擊有 10% 機率召喚友方幼蛛，並提高 50% 毒素傷害。','擊敗樹籬育母蜘蛛。'],
 ['Mithridatism','抗毒性','combat','毒素抗性提高 25／50／75%。猛毒屬於另一種效果。','擊殺 1／5／10 隻狼蛛。'],
 ['Truffle Tussle','松露之力','boss','徒手攻擊有 10% 機率引發真菌爆炸，造成 75 點範圍傷害，可能波及隊友或寵物。','擊敗霧靄實驗室內的感染瓢蟲。'],
 ['Mantsterious Stranger','人蟻秘客','team','攻擊時有 2% 機率召喚人蟻協戰。','擊敗棚屋底下的人蟻。'],
 ['Apex Predator','頂級掠食者','boss','指定首領武器可觸發猛毒、攻速、召喚或感染水等專屬效果；1.4.7 亦支援入注首領武器。','擊敗蘭花螳螂。'],
 ['Corporate Kickback','公司回扣','boss','格擋有 5% 機率讓接下來 5 秒內的攻擊獲得 100% 吸血。','擊敗施密克主管。'],
 ['Shocking Dismissal','令人震驚的解僱','boss','格擋有 20% 機率讓下一擊釋放電流脈衝，對周圍敵人造成傷害與暈眩。','擊敗黑螞蟻實驗室的助理經理。'],
 ['Bardic Inspiration','吟遊詩人的鼓舞','team','弓弩射擊有機會為附近玩家提供暴擊率、攻擊傷害或減傷；戴吟遊詩人帽時另可觸發治療。','擊敗黃蜂女王。'],
 ['Guard Dog','看門狗','boss','防守與復仇事件中，對事件生成的生物增傷 10／25／50%。','完成 1／4／9 場防守事件。MIX.R、碳刃與 Javamatic 防守計入；復仇突襲不計。'],
 ['Spore Lord','孢子之王','boss','炸傷敵人可疊加隨機增益，包含移速、回血、爆炸增傷或爆炸抗性，持續到脫戰。','擊敗感染育母蜘蛛。'],
 ['Battle Buddies','戰鬥夥伴','team','自己造成與受到的友軍傷害降低 75%。','交回池塘超級晶片後，在 ASL 用 3,000 原始科學購買。'],
 ['Antbassador','螞蟻大使','explore','I 階讓紅蟻視你為同類，II 階再加棚屋周圍的黑蟻，III 階再加火蟻。','分別和 1／2／3 位不同的蟻后交好。']
].map(([english,name,category,effect,unlock])=>({
 id:english.toLowerCase().replace(/[^a-z0-9]+/g,'-'),
 english,name,category,effect,unlock
}));
