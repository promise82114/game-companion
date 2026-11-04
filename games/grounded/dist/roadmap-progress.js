import {steps,collectibles} from './data.js';
import {run,player,collectionState} from './model.js';

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
