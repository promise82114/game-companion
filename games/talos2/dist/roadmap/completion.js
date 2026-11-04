// 完成只影響呈現；臨時展開不寫入玩家進度。
export const revealedItems=new Set();
export const isRevealed=id=>revealedItems.has(id);
export const isCompact=(id,complete)=>complete&&!isRevealed(id);
export function revealButton(id,complete,escape){return complete?`<button type="button" class="completion-peek" data-reveal="${escape(id)}" aria-expanded="${isRevealed(id)}" aria-controls="body-${escape(id)}">${isRevealed(id)?'收合':'查看詳情'}</button>`:'';}
export function completionBody(id,complete,html){return `<div id="body-${id}" class="completion-body" ${isCompact(id,complete)?'hidden':''}>${html}</div>`;}
