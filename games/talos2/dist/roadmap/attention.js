import {waypointProgressId,waypointsForStep,routeItemsForStep,storyWaypoints} from './story.js';
import {puzzleProgressId,puzzlesForStep} from './solutions.js';
import {itemsForRegion,collectionProgressId,collectionTotals} from './collections.js';

export const collectionsForStep=id=>id.startsWith('region-')?itemsForRegion(id.slice(7).toUpperCase()):[];
export const childIds=step=>[...waypointsForStep(step.id).map(w=>waypointProgressId(w.id)),...puzzlesForStep(step.id).map(p=>puzzleProgressId(p.id)),...collectionsForStep(step.id).map(c=>collectionProgressId(c.id))];
export function needsAttention(step,progress){
 if(progress.steps[step.id]?.status!=='completed'||childIds(step).some(id=>progress.steps[id]?.status!=='completed'))return true;
 if(step.id==='collectibles'){const c=collectionTotals(progress);return c.done<c.total||c.text<30||c.artifact<10;}
 return false;
}
// 導引與收合共用同一判斷；主步驟完成不會代勾子項目。
export function nextAction(steps,progress){
 const step=steps.find(s=>needsAttention(s,progress));if(!step)return null;
 const item=routeItemsForStep(step.id).find(item=>progress.steps[storyWaypoints.includes(item)?waypointProgressId(item.id):puzzleProgressId(item.id)]?.status!=='completed');
 if(item)return {step,item,kind:storyWaypoints.includes(item)?'waypoint':'puzzle'};
 const collection=collectionsForStep(step.id).find(item=>progress.steps[collectionProgressId(item.id)]?.status!=='completed');
 return {step,item:collection||step,kind:collection?'collection':'step'};
}
