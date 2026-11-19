import {fieldPointRows,fieldCategories} from './field-map-data.js';
import {creatureRows} from './creature-data.js';
import {reportRows} from './report-data.js';
import {matchesSearch} from './search.js';

export const fieldMapSource='https://mapgenie.io/grounded/maps/yard';
const aliases={'Larvae':'Larva','Infected Larvae':'Infected Larva','Orb Weaver Spider':'Orb Weaver','Orb Weaver Spiders':'Orb Weaver','Orb Weaver Spiderss':'Orb Weaver','Orb Weaver Jr.':'Orb Weaver Jr.','Orb Weaver':'Orb Weaver','Bombadier Beetle':'Bombardier Beetle','Mosquitos':'Mosquito','Mosquitoes':'Mosquito','Fireflies':'Firefly','Hedge Broodmother Spider':'Hedge Broodmother','RUZ-T':'RUZ.T'};
const resourceNames={
 'Brittle Quartzite Shards':'脆性石英岩碎片','Brittle Quartzite':'脆性石英岩','Sturdy Quartzite':'堅固石英岩','Supreme Quartzite':'至尊石英岩','Quartzite Boulders':'石英岩礦塊','Quartzite':'石英岩',
 'Brittle Marble Shards':'脆性大理石碎片','Brittle Marble Shard':'脆性大理石碎片','Brittle Marble':'脆性大理石','Sturdy Marble':'堅固大理石','Supreme Marble':'至尊大理石','Marble Shard':'大理石碎片','Marble':'大理石',
 'Clay':'黏土','Acorn':'橡果','Berry Tree':'漿果樹','Berry Bushes':'漿果叢','Berries':'漿果','Berry':'漿果','Clovers':'三葉草','Clover Field':'三葉草地','Clover':'三葉草','Dry Grass Field':'乾草地','Nectar':'花蜜','Flower Petals':'花瓣','Flower':'花朵','Thistle':'薊刺','Spiky Burr':'帶刺野草','Grass Seeds':'草籽','Pond Moss':'池塘苔蘚',
 'Widow Web Sacs':'寡婦網囊','Web Sac':'網囊','Rotten Apple':'腐爛蘋果','Apple':'蘋果','Rotten Billy Hog':'腐爛比利熱狗','Billy Hog':'比利熱狗','Candy Corn':'玉米糖','Charcoal':'木炭','Chewed Gum':'嚼過的口香糖','Gum Nugget':'口香糖塊','Cookie Sandwich':'夾心餅乾','Crow Feathers':'烏鴉羽毛','Crow Feather':'烏鴉羽毛','Dandelion':'蒲公英','Hot Chachas Candy':'辣味糖果','Hot Chachas':'辣味糖果','Ice Caps Mint':'清新薄荷糖','Ice Cap Mint':'清新薄荷糖','Mint Shard':'薄荷碎片','Muddy Scale':'泥濘鱗片','Mushroom':'蘑菇','Lint Clump':'毛絮團塊','Pupas':'蛹','Pupa':'蛹','Rotten Donut':'腐爛甜甜圈','Donut':'甜甜圈','Salt Cluster':'鹽簇','Salt Shard':'鹽粒','Sap Clump':'樹液團塊','Splinter':'木刺','Sunken Bone':'沉沒的骨頭','Toadstool':'傘菌','Sour Wormhole':'酸味糖果','Rusty Nails':'生鏽釘子','Rusty Nail':'生鏽釘子','Rust':'鏽','Toenail':'趾甲','Pop Cap':'爆鳴彈','Pinecone':'松果'
};
const creatureNames=new Map(creatureRows.map(([name,english])=>[english,name]));
const extraNames={'O.R.C. Weaver Jr.':'O.R.C. 小織球蛛','Black Ant':'黑螞蟻','Fire Ant':'火蟻','O.R.C. Fire Worker Ant':'O.R.C. 火蟻工蟻','Lawn Mites':'草坪蟎蟲'};
const singular=title=>{
 let value=title.replace(/\b[x×]\s*\d+\b/gi,'').replace(/\(\d+x?\)/gi,'').replace(/Quartizite/g,'Quartzite').trim();
 if(aliases[value])return aliases[value];
 if(creatureNames.has(value)||resourceNames[value]||extraNames[value])return value;
 for(const ending of ['s','es'])if(value.endsWith(ending)){
  const base=value.slice(0,-ending.length);if(creatureNames.has(base)||resourceNames[base]||extraNames[base])return base;
 }
 return value;
};
const translate=value=>{
 const canonical=singular(value);
 if(creatureNames.has(canonical))return creatureNames.get(canonical);
 if(resourceNames[canonical])return resourceNames[canonical];
 if(extraNames[canonical])return extraNames[canonical];
 return canonical.split(/,\s*/).map(part=>resourceNames[singular(part)]||part).join('、');
};
const categories=new Map(fieldCategories.map(([id,kind,title])=>[id,{kind,title}]));
const landmarks=new Map(reportRows.filter(r=>r[1]==='sites').map(r=>[r[5],r[2]]));
export const fieldItems=fieldPointRows.map(([pin,category,english,lng,lat,layer,refs])=>{
 const kind=categories.get(category).kind,type=singular(english),name=translate(english);
 return {id:'field-'+pin,pin,category,kind,type,name,english,point:[lng,lat],layer:layer||'來源未註明層級',
  landmarks:[...new Set(refs.map(id=>landmarks.get(id)).filter(Boolean))],
  creature:kind==='creature'&&creatureNames.has(type)?type:null};
});
export const fieldById=new Map(fieldItems.map(row=>[row.id,row]));
export const fieldTypes=kind=>[...new Map(fieldItems.filter(r=>r.kind===kind).map(r=>[r.type,r.name])).entries()].sort((a,b)=>a[1].localeCompare(b[1],'zh-Hant'));
export const fieldRows=(kind,filter)=>fieldItems.filter(row=>row.kind===kind&&(filter.fieldType==='all'||row.type===filter.fieldType)&&matchesSearch([row.name,row.english,row.layer,...row.landmarks,row.type==='Green Shield Bug'?'綠椿 綠椿象 綠盾蟲':'',row.type==='Scarab'?'聖甲蟲':'',row.name.replaceAll('兇','凶')],filter.search));
export function harvestAdvice(row){
 if(/Shard/i.test(row.english))return '來源標為散落碎片，可拾取；同區若有完整礦塊仍需對應工具。';
 if([1623,1653].includes(row.category))return '礦塊依脆性／堅固／至尊分別需要一／二／三階鎚。鍛造升級不提高採集階級；礦石不會定時重生。';
 if(row.type==='Pond Moss')return '採集需要三階黑寡婦匕首；先準備水下呼吸裝備，再下水找苔蘚。';
 if(row.category===6529)return '毛絮團塊需要三階白蟻斧。';
 if(row.category===6546||row.category===6545||row.category===6548)return '需要三階黑牛甲蟲鎚；請先做好工具再前往。';
 if(row.category===6515)return '需要二階昆蟲鎚；烤架附近有高溫炙烤，準備蟻獅裝與清新防護。';
 if(row.category===1652)return '破壞網囊時留意幼蛛；寡婦網囊所在處可能有黑寡婦幼蛛與成體。';
 return '依資源節點準備對應的斧、鎚或鏟；來源圖的點位可能代表一整片分布區，並非每一個掉落物。';
}
export const fieldNotes={
 'field-211340':'棚下主線洞穴的黑寡婦：從棚下入口進入，沿主線下到洞穴再穿越寡婦巢；入口與巢穴有高低差，勿由地表座標直挖。這隻擊殺後不重生。',
 'field-211337':'工具箱下方洞穴內；從工具箱周圍找洞口，再進入巢穴。',
 'field-211343':'從地表洞口下降進入寡婦巢，先觀察落差並備好撤退方式。',
 'field-211344':'石頭下方巢穴，沿石縫找入口。',
 'field-290169':'肌肉男孩桶內，蜱蟲區左側、倒下書本後方。',
 'field-211155':'上層庭院棚屋平台的髒煙灰缸內；先登上平台，再進入煙灰缸。',
 'field-211157':'舊樹樁高處，沿樹根與木頭逐層上攀，注意落差。',
 'field-212619':'白色管道內；先找外露管口，再進管搜尋。',
 'field-207986':'池塘深處、沉沒暴龍玩具附近；帶鏟子與水下呼吸裝備，下潛後找底泥中的骨頭。'
};
