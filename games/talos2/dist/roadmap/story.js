import {storyWaypoints,storyRoutes} from '../story-data.js';
import {puzzles,puzzleHtml,puzzlesForStep,puzzleProgressId,puzzleListHtml} from './solutions.js';
import {completionBody,revealButton} from './completion.js';
import {mapLocateButton} from './maps.js';
export {storyWaypoints};
export const waypointProgressId=id=>'waypoint-'+id;
export const waypointsForStep=id=>storyWaypoints.filter(w=>w.stepId===id);
export function routeItemsForStep(stepId){
 const ordered=(storyRoutes[stepId]||[]).map(id=>storyWaypoints.find(w=>w.id===id)||puzzles.find(p=>p.id===id));
 return [...ordered,...puzzlesForStep(stepId).filter(p=>!ordered.includes(p))];
}
export function storyRouteHtml(stepId,options){
 if(!storyRoutes[stepId])return puzzleListHtml(stepId,options);
 const {escape,progress}=options,list=routeItemsForStep(stepId),key=item=>item.mapKey&&storyWaypoints.includes(item)?waypointProgressId(item.id):puzzleProgressId(item.id);
 return `<section class="story-route" aria-label="沿路目標"><div class="puzzle-list-heading"><h3>沿路目標</h3><span>${list.filter(i=>progress.steps[key(i)]?.status==='completed').length} / ${list.length}</span></div>${list.map(item=>{
  if(!storyWaypoints.includes(item))return puzzleHtml(item,options);
  const id=waypointProgressId(item.id),complete=progress.steps[id]?.status==='completed';
  const body=`<p class="waypoint-location">${escape(item.location)}</p>${mapLocateButton(id,escape)}<ol class="instructions">${item.actions.map(a=>'<li>'+escape(a)+'</li>').join('')}</ol>`;
  return `<article class="waypoint${complete?' waypoint-done':''}" id="${id}" data-waypoint="${item.id}"><div class="puzzle-heading"><input type="checkbox" id="check-${id}" data-waypoint-complete="${item.id}" ${complete?'checked':''}><label for="check-${id}"><strong>${escape(item.title)}</strong></label>${revealButton(id,complete,escape)}</div>${item.warning?'<p class="puzzle-warning">'+escape(item.warning)+'</p>':''}${item.pending?'<p class="solution-pending">待查證：'+escape(item.pending)+'</p>':''}${completionBody(id,complete,body)}</article>`;
 }).join('')}</section>`;
}
