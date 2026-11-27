import {equipment,paths,sources} from '../research/locations.mjs';
import {createHash} from 'node:crypto';
import fs from 'node:fs/promises';
export async function mergeLocations(data){
 const byId=new Map(data.entities.map(e=>[e.id,e])),byCode=new Map(data.steps.map(s=>[s.code,s]));
 const raw=await fs.readFile(new URL('../research/locations.mjs',import.meta.url));
 data.researchSha256=createHash('sha256').update(raw).digest('hex');data.catalogVersion='2026-11-27.2';
 data.sources.push(...sources);
 const sourceIds=new Set(data.sources.map(s=>s.id));
 function validate(r){if(!byId.has(r.entityId))throw Error('Unknown researched ID '+r.entityId);for(const id of r.relatedEntityIds||[])if(!byId.has(id))throw Error('Unknown related ID '+id);for(const id of r.sourceIds)if(!sourceIds.has(id))throw Error('Unknown source '+id);for(const code of r.routeCodes)if(!byCode.has(code))throw Error('Unknown route '+code);}
 function attach(r){validate(r);const e=byId.get(r.entityId);e.sources=[...new Set([...e.sources,...r.sourceIds])];for(const code of r.routeCodes){const step=byCode.get(code);step.relatedEntityIds=[...new Set([...step.relatedEntityIds,e.id])];}for(const id of r.relatedEntityIds||[]){e.relatedEntityIds=[...new Set([...e.relatedEntityIds,id])];const other=byId.get(id);other.relatedEntityIds=[...new Set([...other.relatedEntityIds,e.id])];}}
 for(const e of data.entities)if(e.kind==='equipment'){e.legacyLocationText=e.locationText;e.acquisitionRoutes=[];}
 for(const r of equipment){attach(r);const resolved={...r};if(r.where.startsWith('金箱索引：'))resolved.where=byId.get(r.relatedEntityIds.find(id=>id.startsWith('cq2-gc-'))).name+'金箱；先取得Golden Key';if(r.mode==='candidate'){const quest=byId.get(r.relatedEntityIds.find(id=>id.startsWith('cq2-sq-')));if(quest)resolved.where=quest.locationText+'：'+quest.name+'（日文表對應候選）';}byId.get(r.entityId).acquisitionRoutes.push({...resolved,evidence:'source-stated',checkedAt:'2026-11-27',platformVerified:false});}
 const rank={fixed:0,quest:0,story:0,optional:1,pool:2,candidate:3,unverified:4};
 for(const e of data.entities)if(e.kind==='equipment'){
  if(!e.acquisitionRoutes.length){const named=!/未逐件核實|精確取得點待查/.test(e.locationText);e.acquisitionRoutes.push({entityId:e.id,mode:named?'candidate':'unverified',where:e.locationText,relatedEntityIds:[],routeCodes:[],sourceIds:e.sources,evidence:named?'source-stated':'unverified',checkedAt:'2026-11-27',platformVerified:false,note:named?'初版來源記載；本批未逐箱複核，精確位置與固定性仍待核實。':'目前未核實取得位置，保留背包名稱對照與來源入口。'});}
  e.acquisitionRoutes.sort((a,b)=>rank[a.mode]-rank[b.mode]);
  e.locationText=e.acquisitionRoutes[0].where;e.dataQuality.location=e.acquisitionRoutes[0].mode==='unverified'?'unverified':'source-stated';
 }
 for(const r of paths){attach(r);const e=byId.get(r.entityId);e.exploration={...r,evidence:'source-stated',checkedAt:'2026-11-27',platformVerified:false};e.dataQuality.walkthrough='source-stated';e.tip='已補以下特定通路／回收提醒；仍不是整洞逐房間導航。';}
 const c={equipment:data.entities.filter(e=>e.kind==='equipment').length,named:0,poolOnly:0,candidateOnly:0,unverified:0,dungeons:data.entities.filter(e=>e.kind==='dungeon').length,exploration:paths.length,secretPaths:paths.filter(p=>p.type==='secret').length};
 for(const e of data.entities.filter(e=>e.kind==='equipment')){const modes=e.acquisitionRoutes.map(r=>r.mode);if(modes.some(m=>['fixed','quest','story','optional'].includes(m)))c.named++;else if(modes.includes('pool'))c.poolOnly++;else if(modes.includes('candidate'))c.candidateOnly++;else c.unverified++;}
 data.locationResearch={checkedAt:'2026-11-27',coverage:c,note:'具名來源／候選池與資料缺口分開；來源記載不等於PS4實機驗收。'};
 for(const gap of data.gaps)if(['G03','G05','G07'].includes(gap.id)){gap.originalLabel=gap.label;gap.label=(gap.id==='G03'?'裝備已補具名來源與候選池，但單一來源、跨語任務配對及部分固定箱仍待核實。':gap.id==='G05'?'已補特定秘密路徑與入口提醒；其餘地城及Fursaken完整逐轉彎走法仍未核實。':'金箱各來源部分獎勵不同，保留衝突；精確坐標與世界金箱總量仍未核實。');}
 // The golden-chest comparison table is an observed playthrough, not proof that the old fixed rewards moved.
 const conflicts={
  'cq2-gc-purrsecutor-island':'初版索引列Jester Bee Mace；R03南方離島記Jester Aee Mace。保留兩者差異，未核實是否相同箱。',
  'cq2-gc-kings-paw-west':'初版為King’s Paw西側Jester Aee Cap；R03寫右方離島。方位有衝突，不新增精確點。',
  'cq2-gc-catnip':'初版索引Crimson Helm；R03在另一個Catpital Lake東北地標亦記此物，不據此認定位置移動。',
  'cq2-gc-wall':'初版為傳說候選池；R03此區箱記Bone-Raiser，視為候選，非保證。',
  'cq2-gc-barracks':'初版為傳說候選池；R03此區箱記Wraith Mace，視為候選，非保證。',
  'cq2-gc-felingard-lake':'R03此區箱記其他裝備，原表有名稱／部位不一致；維持候選池。',
  'cq2-gc-purrmaha':'R03此區箱記Elder Mage Beard；視為候選，非每次保證。',
  'cq2-gc-whiskerest':'R03此區箱記Elder Mage Beard；視為候選，非每次保證。'
 };
 for(const [id,note] of Object.entries(conflicts)){const e=byId.get(id);e.researchConflict=note;e.sources=[...new Set([...e.sources,'R03'])];}
 return data;
}
