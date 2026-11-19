// Search aliases preserve existing published names and IDs.
const aliasGroups=[
 ['樹樁晶片','蟻丘晶片','蟻丘漢堡小哥晶片','Stump BURG.L Chip'],
 ['酸蝕利刃','酸味戰斧','酸味戰鬥斧','Acid Edge','Sour Battleaxe','Sour Battle-axe'],
 ['薄荷糖鎚','薄荷糖錘','薄荷錘','Mint Mace','Mint Mallet'],
 ['蜱齒鋸刃','蜱蟲劍','Tick Macuahuitl'],
 ['黑牛甲蟲鎚','黑牛鎚','黑牛錘','Black Ox Hammer'],
 ['木料堆','木堆','Woodpile'],
 ['樹樁','Stump'],
 ['樹籬','Hedge'],
 ['池塘','Pond'],
 ['霧靄','霧霾','Haze'],
 ['紅蟻丘','Red Anthill'],
 ['黑蟻丘','黑螞蟻實驗室','Black Anthill','Black Ant Lab'],
 ['沙坑','沙盒','Sandbox'],
 ['棚下','下棚','棚屋底下','Undershed'],
 ['肌肉男孩桶','黃蜂箱','Brawny Boy Bin'],
 ['魔多克','摩爾多克','Moldorc'],
 ['漢堡小哥','BURG.L','BURGL'],
 ['異變','突變','Mutation'],
 ['標槍手','Javelineer'],
 ['劍術大師','Blademaster']
];
const normalize=value=>String(value??'').normalize('NFKC').toLowerCase()
 .replace(/[’']/g,'').replace(/([a-z\p{Script=Han}])\s*0+(\d)/gu,'$1$2').replace(/\s+/g,' ').trim();

export function matchesSearch(values,query){
 const text=normalize(Array.isArray(values)?values.flat(Infinity).join(' '):values);
 const needle=normalize(query);
 if(!needle)return true;
 if(text.includes(needle))return true;
 return aliasGroups.some(group=>{
  const aliases=group.map(normalize);
  // The short Stump translation is also a suffix of Red Anthill's Chinese name.
  const sourceAliases=aliases.filter(alias=>alias!=='蟻丘晶片');
  return aliases.some(alias=>alias.includes(needle))&&sourceAliases.some(alias=>text.includes(alias));
 });
}
