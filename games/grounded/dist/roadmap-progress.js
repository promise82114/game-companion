import {steps,collectibles,trophies,superWinConditions} from './data.js';
import {run,world,player,collectionState,collectionVisible} from './model.js';

// 步驟收斂只讀取現有勾選；不代填、合併或另存任何完成狀態。
export function stepProgress(progress,step){
 const goalDone=run(progress).steps[step.id]?.done===true;
 const trophyIds=[...new Set(step.trophyIds)],collectibleIds=[...new Set(step.collectibleIds)];
 const completed=Number(goalDone)+trophyIds.filter(id=>player(progress).trophies[id]?.earned===true).length+collectibleIds.filter(id=>{
  const item=collectibles.find(item=>item.id===id);
  return item&&collectionState(progress,item)==='obtained';
 }).length;
 const total=1+trophyIds.length+collectibleIds.length;
 return {goalDone,completed,total,complete:completed===total};
}
export const completedSteps=progress=>steps.filter(step=>stepProgress(progress,step).complete).length;
export const nextPendingStep=progress=>steps.find(step=>!stepProgress(progress,step).complete);

export const conditionItems=(progress,condition)=>collectibles.filter(item=>collectionVisible(progress,item)&&condition.categoryIds?.includes(item.category));
export const pendingItems=(progress,items)=>items.filter(item=>collectionState(progress,item)!=='obtained');
// 只顯示人工紀錄的缺漏，不推論遊戲開門或 PSN 已跳盃。
export function remixReview(progress){
 const firstRun=Object.values(world(progress).runs).find(r=>r.level===0);
 const baseTrophies=trophies.filter(t=>t.grade!=='platinum'&&t.category!=='ngplus');
 return {firstRun,baseTrophies,pendingTrophies:baseTrophies.filter(t=>!player(progress).trophies[t.id]?.earned),pendingConditions:superWinConditions.filter(c=>!firstRun?.conditions[c.id]?.done)};
}
