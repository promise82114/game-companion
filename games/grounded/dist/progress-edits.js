import {clone} from './model.js';

const same=(left,right)=>JSON.stringify(left)===JSON.stringify(right);
const read=(value,path)=>path.reduce((row,key)=>row?.[key],value);

// Each change represents one independently edited record, including its actor stamp.
export function captureProgressEdits(before,after){
 const changes=[];
 const capture=(path)=>{
  const previous=read(before,path),next=read(after,path);
  if(!same(previous,next))changes.push({path,before:clone(previous),after:clone(next)});
 };
 const captureMap=path=>{
  const keys=new Set([...Object.keys(read(before,path)||{}),...Object.keys(read(after,path)||{})]);
  for(const key of keys)capture([...path,key]);
 };
 const worldId=before.currentWorldId;
 const base=['worlds',worldId];
 const oldWorld=before.worlds[worldId],newWorld=after.worlds[worldId];
 if(!newWorld)return changes;
 captureMap([...base,'inherited']);
 for(const id of Object.keys(oldWorld.runs)){
  if(!newWorld.runs[id])continue;
  for(const group of ['steps','collectibles','conditions'])captureMap([...base,'runs',id,group]);
  capture([...base,'runs',id,'ngMolars']);
 }
 for(const id of Object.keys(oldWorld.players)){
  if(newWorld.players[id])captureMap([...base,'players',id,'trophies']);
 }
 return changes;
}

export function revertProgressEdits(progress,changes){
 for(const change of changes){
  if(!same(read(progress,change.path),change.after))throw Error('這項紀錄之後已被更新，無法撤銷。請回清單核對。');
 }
 for(const change of changes){
  const parent=read(progress,change.path.slice(0,-1));
  if(!parent)throw Error('原紀錄已不存在，請回清單核對。');
  const key=change.path.at(-1);
  if(change.before===undefined)delete parent[key];
  else Object.defineProperty(parent,key,{value:clone(change.before),enumerable:true,writable:true,configurable:true});
 }
 return progress;
}
