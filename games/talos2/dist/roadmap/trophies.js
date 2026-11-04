import {trophyGuides,trophyConditionSource} from '../trophy-guide-data.js';
import {trophyLabel} from '../trophy-names.js';
import {collectionTotals,collectionRegions,regionCounts,readCounter} from './collections.js';
import {puzzles,puzzleProgressId} from './solutions.js';
export {trophyGuides,trophyConditionSource};
const completed=(progress,id)=>progress.steps[id]?.status==='completed';
export function trophyProgress(trophy,progress,data){
 const track=trophyGuides[trophy.id]?.track,c=collectionTotals(progress),count=list=>list.filter(p=>completed(progress,puzzleProgressId(p.id))).length;
 const row=(label,done,total)=>({label,done,total});
 if(['lab','trevor','lifthrasir','remnant','text','artifact'].includes(track))return [row({lab:'實驗室',trevor:'Trevor 錄音',lifthrasir:'Lifthrasir 錄音',remnant:'人物光影',text:'已讀文字',artifact:'已辨識遺物'}[track],c[track],{lab:12,trevor:12,lifthrasir:12,remnant:20,text:30,artifact:10}[track])];
 if(track==='artifact-first')return [row('第一件遺物',Math.min(c.artifact,1),1)];
 if(track==='remnant-first')return [row('第一個光影',Math.min(c.remnant,1),1)];
 if(['prometheus','pandora','sphinx','bridge'].includes(track)){const list=puzzles.filter(p=>track==='bridge'?p.kind==='bridge':p.kind==='star'&&p.id.endsWith('-'+track));return [row('完成第一座'+(track==='bridge'?'橋':'雕像'),Math.min(count(list),1),1)];}
 if(track==='stars')return [row('星星',c.star,24)];
 if(track==='regular')return [row('正規＋Lost',count(puzzles.filter(p=>['main','lost'].includes(p.kind))),120)];
 if(track==='renaissance')return [row('正規＋Lost',count(puzzles.filter(p=>['main','lost'].includes(p.kind))),120),row('黃金謎題',count(puzzles.filter(p=>p.kind==='gold')),12),row('星星',c.star,24)];
 if(track==='gold'||track==='future')return [row('黃金謎題',count(puzzles.filter(p=>p.kind==='gold')),12),row('救回 Miranda',Number(completed(progress,'miranda')),1),...(track==='future'?[row('完成結局',Number(completed(progress,'ending')),1)]:[])];
 if(track==='text-adventures')return [row('文字冒險',count(puzzles.filter(p=>p.kind==='text')),3)];
 if(track==='social')return [row('已讀公共貼文',readCounter(progress,'SOCIAL','text'),10)];
 if(track==='platinum')return [row('其餘本體獎盃',data.trophies.filter(t=>t.id!=='philosopher'&&progress.trophies[t.id]?.earned).length,59)];
 return [];
}
export function trophyDetailHtml(trophy,{data,progress,escape,checkbox}){
 const guide=trophyGuides[trophy.id],steps=guide.steps.map(id=>data.steps.find(s=>s.id===id)),instructions=[...(guide.summary||steps.flatMap(s=>s.actions)),...(['the-hard-way','just-one-lap','single-rod'].includes(trophy.id)?puzzles.find(p=>p.id===guide.puzzle).actions:[])],counts=trophyProgress(trophy,progress,data),track=guide.track;
 const regionTrack=['lab','trevor','lifthrasir','remnant'].includes(track),remaining=regionTrack?collectionRegions.filter(r=>regionCounts(progress,r.code)[track].done<regionCounts(progress,r.code)[track].total):[];
 return `<article class="trophy-detail" id="trophy-${trophy.id}" data-trophy-detail="${trophy.id}">${checkbox(trophy,'list')}<p class="trophy-description">${escape(trophy.descriptionZhTW)}</p>${counts.length?'<div class="trophy-progress" aria-label="'+escape(trophyLabel(trophy))+' 攻略紀錄">'+counts.map(c=>'<span data-trophy-progress="'+trophy.id+'">'+escape(c.label)+' <strong>'+c.done+' / '+c.total+'</strong></span>').join('')+'</div>':''}<ol class="trophy-instructions">${instructions.map(text=>'<li>'+escape(text)+'</li>').join('')}</ol>${track==='social'?'<label class="social-counter">已讀公共貼文<input type="number" min="0" step="1" inputmode="numeric" data-collection-counter="text" data-counter-region="SOCIAL" value="'+readCounter(progress,'SOCIAL','text')+'"></label>':''}${steps.some(s=>s.verificationStatus==='unverified')?'<p class="trophy-caution">部分觸發細節仍待查證，請查看對應路線的警示。</p>':''}${remaining.length?'<p class="trophy-remaining">尚未收齊：'+remaining.map(r=>`<a href="#collection-region-${r.code}" data-collection-region-link="${r.code}">${r.code}</a>`).join('、')+'</p>':''}<div class="trophy-guide-links">${guide.puzzle?'<a href="#puzzle-'+guide.puzzle+'" data-puzzle-link="'+guide.puzzle+'">逐步解法</a>':''}${steps.map(s=>`<a href="#step-${s.id}" data-step-link="${s.id}">${escape(s.title)}</a>`).join('')}</div></article>`;
}
