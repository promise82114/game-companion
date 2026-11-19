// Session-only edit history. Progress remains in each game's existing store.
const copy=value=>value===undefined?undefined:structuredClone(value);
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export function captureEdits(before,after,groups){
 const changes=[];
 for(const group of groups)for(const key of new Set([...Object.keys(before[group]||{}),...Object.keys(after[group]||{})])){
  if(!same(before[group]?.[key],after[group]?.[key]))changes.push({group,key,before:copy(before[group]?.[key]),after:copy(after[group]?.[key])});
 }
 return changes;
}
export function revertEdits(current,entry){
 // Boolean/numeric records lack per-record versions. A newer revision, even if
 // it returns to the same value, must not be silently overwritten (ABA).
 if(current.revision!==entry.revision)throw Error('進度已有後續變更，撤銷已停止；請回清單核對。');
 for(const c of entry.changes)if(!same(current[c.group]?.[c.key],c.after))throw Error('這項紀錄已變更，無法撤銷。');
 for(const c of entry.changes){if(c.before===undefined)delete current[c.group][c.key];else Object.defineProperty(current[c.group],c.key,{value:copy(c.before),enumerable:true,writable:true,configurable:true});}
 return current;
}
export function installUndo(store,{groups,parent,button,onError=()=>{},onSuccess=()=>{}}){
 const history=[],write=store.update.bind(store);
 if(!button){button=document.createElement('button');button.id='undo-last';button.type='button';parent.append(button);}
 button.textContent='撤銷上一步';button.hidden=true;
 const refresh=()=>{button.hidden=!history.length;};
 store.update=async(fn,expected)=>{
  let changes,previousRevision;
  const saved=await write(current=>{previousRevision=current.revision;const before=copy(current),next=fn(current);changes=captureEdits(before,next,groups);return next;},expected);
  if(expected!==undefined||history.length&&history.at(-1).revision!==previousRevision)history.length=0;
  if(expected===undefined&&changes.length){history.push({changes,revision:saved.revision});if(history.length>30)history.shift();}
  else if(expected===undefined&&history.at(-1)?.revision===previousRevision)history.at(-1).revision=saved.revision;
  refresh();return saved;
 };
 button.onclick=async()=>{
  const entry=history.at(-1);if(!entry||button.disabled)return;
  button.disabled=true;
  try{const saved=await write(current=>revertEdits(current,entry));history.pop();if(history.length)history.at(-1).revision=saved.revision;refresh();onSuccess('已撤銷上一步。');}
  catch(error){onError(error);}
  finally{button.disabled=false;}
 };
 return {clear(){history.length=0;refresh();}};
}
