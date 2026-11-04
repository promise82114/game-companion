import {humanArtifacts,artifactCandidates,collectionRegions} from '../collection-data.js';
export {humanArtifacts,artifactCandidates};
export const artifactProgressId=id=>'artifact-'+id;
export const artifactDone=(progress,id)=>progress.steps[artifactProgressId(id)]?.status==='completed';
export const artifactForCandidate=id=>humanArtifacts.find(item=>item.id===artifactCandidates.find(site=>site.id===id)?.artifactId);
export function artifactFoundIn(progress,id){
 const region=progress.steps[artifactProgressId(id)]?.foundIn;
 return artifactDone(progress,id)&&collectionRegions.some(item=>item.code===region)?region:'';
}
export function artifactCounts(progress){
 const checked=humanArtifacts.filter(item=>artifactDone(progress,item.id)).length;
 const manual=collectionRegions.reduce((total,region)=>{const value=progress.settings['collection-artifact-'+region.code];return total+(Number.isSafeInteger(value)&&value>=0?value:0);},0);
 // 舊件數沒有物品身分，無法判斷與新勾選的重疊；不相加、不猜測取得項目。
 return {checked,manual,total:Math.max(checked,manual)};
}
