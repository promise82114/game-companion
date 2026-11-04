import {puzzles,puzzleGroups} from '../puzzle-data.js';
import {revealButton,completionBody} from './completion.js';
import {mapLocateButton,regionMaps} from './maps.js';

export {puzzles,puzzleGroups};
export const puzzleProgressId=id=>'puzzle-'+id;
export const puzzlesForStep=id=>puzzles.filter(p=>p.stepId===id);
export function puzzleHtml(puzzle,{escape,progress,showSolutions}){
 const id=puzzleProgressId(puzzle.id),complete=progress.steps[id]?.status==='completed';
 const body=(regionMaps[puzzle.region]?mapLocateButton(id,escape):'')+(showSolutions?`<div class="puzzle-solution" data-solution="${escape(puzzle.id)}">${puzzle.actions.length?'<ol>'+puzzle.actions.map(text=>'<li>'+escape(text)+'</li>').join('')+'</ol>':''}${puzzle.verificationStatus==='unverified'?'<p class="solution-pending">待查證：'+escape(puzzle.pending||'尚未核對完整操作，請先看下方攻略。')+'</p>':''}${puzzle.diagram?diagramHtml(puzzle.diagram):''}${puzzle.diagramCells?gridHtml(puzzle.diagramCells,escape):''}<div class="solution-sources">${puzzle.sources.map(source=>'<a href="'+escape(source.url)+'" target="_blank" rel="noopener noreferrer">'+escape(source.title)+' ↗</a>').join('')}</div></div>`:'');
 return `<article class="puzzle${complete?' puzzle-done':''}" id="${id}" data-puzzle="${escape(puzzle.id)}"><div class="puzzle-heading"><input type="checkbox" id="check-${id}" data-puzzle-complete="${escape(puzzle.id)}" ${complete?'checked':''}><label for="check-${id}"><span class="puzzle-number">${escape(puzzle.label)}</span><strong>${escape(puzzle.title)}</strong>${puzzle.verificationStatus==='unverified'?'<span class="solution-pending">待查證</span>':''}</label>${revealButton(id,complete,escape)}</div>${puzzle.warning?'<p class="puzzle-warning">'+escape(puzzle.warning)+'</p>':''}${completionBody(id,complete,body)}</article>`;
}
function gridHtml(rows,escape){
 const colors=['#dce5d8','#f1ddad','#d7e6ed','#ebcfc3','#dfd9ed'],letters=[...new Set(rows.join(''))];
 const cells=rows.flatMap((row,y)=>[...row].map((letter,x)=>`<rect x="${x*48+8}" y="${y*48+8}" width="48" height="48" fill="${colors[letters.indexOf(letter)%colors.length]}" stroke="#655c4f"/><text x="${x*48+32}" y="${y*48+39}" text-anchor="middle" fill="#302f29" font-size="20">${escape(letter)}</text>`)).join('');
 return `<figure class="solution-diagram arranger-diagram"><svg viewBox="0 0 ${rows[0].length*48+16} ${rows.length*48+16}" role="img" aria-label="拼塊排法，每個字母代表同一塊" xmlns="http://www.w3.org/2000/svg"><title>每個字母代表同一塊</title>${cells}</svg><figcaption>同字母是同一塊。從上到下：${rows.map(escape).join(' / ')}</figcaption></figure>`;
}
export function puzzleListHtml(stepId,options){
 const list=puzzlesForStep(stepId);if(!list.length)return '';
 const completed=list.filter(p=>options.progress.steps[puzzleProgressId(p.id)]?.status==='completed').length;
 return `<section class="puzzle-list" aria-label="${options.escape(puzzleGroups[stepId]?.title||'謎題')}" data-puzzle-list="${stepId}"><div class="puzzle-list-heading"><h3>${options.escape(puzzleGroups[stepId]?.title||'謎題順序')}</h3><span>${completed} / ${list.length}</span></div>${puzzleGroups[stepId]?.intro?'<p class="puzzle-route">'+options.escape(puzzleGroups[stepId].intro)+'</p>':''}${list.map(p=>puzzleHtml(p,options)).join('')}</section>`;
}
function diagramHtml(kind){
 // 原創連線／搬運示意；不模擬未經確認的場地比例或座標。
 const frame=(title,body)=>`<figure class="solution-diagram"><svg class="diagram-wide" viewBox="0 0 640 240" role="img" aria-label="${title}" xmlns="http://www.w3.org/2000/svg"><title>${title}</title>${body}</svg>${compactDiagram(kind,title)}<figcaption>${title} · 連線示意，非場地平面圖</figcaption></figure>`;
 if(kind==='seesaw')return frame('Seesaw：同一根連接器，切換鑽孔讓紅光或藍光通過',`<g fill="none" stroke-width="3"><path stroke="#a14332" d="M90 65H310L540 65"/><path stroke="#286285" stroke-dasharray="8 6" d="M90 175L310 65L540 175"/><path stroke="#655c4f" d="M170 35V95M170 135V215"/></g><g fill="#faf9f3" stroke="#655c4f" stroke-width="2"><circle cx="90" cy="65" r="15"/><circle cx="90" cy="175" r="15"/><path d="M310 42L333 65L310 88L287 65Z"/><rect x="525" y="50" width="30" height="30"/><rect x="525" y="160" width="30" height="30"/></g><g fill="#302f29" font-size="16" text-anchor="middle"><text x="90" y="30">紅光源</text><text x="90" y="225">藍光源</text><text x="310" y="120">同一根連接器</text><text x="540" y="30">紅接收器</text><text x="540" y="225">藍接收器</text><text x="320" y="164">先鑽紅側 → 進內室 → 改鑽藍側</text><text x="320" y="195">另一側的牆會重新封住</text></g>`);
 if(kind==='loop')return frame('Loop：方塊只送一趟，落地後再改鑽另一面牆',`<g fill="none" stroke="#655c4f" stroke-width="2"><rect x="20" y="50" width="120" height="70"/><path d="M140 85H220M220 50V70M220 100V125M220 85H380M380 50V70M380 100V125M380 85H480"/><rect x="480" y="50" width="140" height="70"/><path d="M210 80L220 85L210 90M370 80L380 85L370 90M470 80L480 85L470 90"/></g><g fill="#302f29" font-size="16" text-anchor="middle"><text x="80" y="80">風扇＋方塊</text><text x="80" y="104">踩住壓板</text><text x="220" y="35">右牆低孔</text><text x="380" y="35">方塊落點</text><text x="550" y="80">改鑽左牆</text><text x="550" y="104">拿回方塊</text><text x="320" y="170">方塊停穩後才離開壓板、移動鑽孔器</text><text x="320" y="205">連接器壓終點一板；方塊壓另一板</text></g>`);
 if(kind==='switcheroo')return frame('Switcheroo：先搬設備，最後才接紅光',`<g fill="none" stroke="#655c4f" stroke-width="2"><rect x="35" y="45" width="150" height="65"/><rect x="245" y="45" width="150" height="65"/><rect x="455" y="45" width="150" height="65"/><path d="M185 77H245M395 77H455M235 72L245 77L235 82M445 72L455 77L445 82"/></g><g fill="#302f29" font-size="16" text-anchor="middle"><text x="110" y="72">方塊＋傳送器</text><text x="110" y="97">風扇抬高</text><text x="320" y="72">傳送器移上層</text><text x="320" y="97">再搬連接器</text><text x="530" y="72">人站方塊上</text><text x="530" y="97">傳送器壓風扇板</text><text x="320" y="158">上層拿連接器 → 選紅光源＋紅接收器</text><text x="320" y="195">放到浮空方塊上 → 啟動終端</text><text x="320" y="228">全程一般拾取，不按「保留連線」</text></g>`);
 return '';
}
function compactDiagram(kind,title){
 const box=(y,a,b)=>`<rect x="15" y="${y}" width="290" height="48" fill="none" stroke="#655c4f"/><text x="160" y="${y+20}">${a}</text><text x="160" y="${y+39}">${b}</text>`,arrow=y=>`<path d="M160 ${y}v16m-5-5 5 5 5-5" fill="none" stroke="#655c4f"/>`;
 let body;
 if(kind==='switcheroo')body=box(12,'方塊上放傳送器','風扇抬高 → 傳送上層')+arrow(60)+box(78,'傳送器移到上層邊緣','再把連接器搬上來')+arrow(126)+box(144,'人站方塊上','傳送器改壓風扇板')+arrow(192)+box(210,'回上層才接紅光源、紅接收器','連接器放浮空方塊頂')+'<text x="160" y="293">全程一般拾取，不按保留連線</text>';
 else if(kind==='loop')body=box(12,'方塊放風扇發射位置','鑽右側牆，孔貼地')+arrow(60)+box(78,'自己踩住風扇壓板','方塊撞遠牆停穩才離開')+arrow(126)+box(144,'把鑽孔器改到左側落點','繞過紫屏，隔孔拿回方塊')+arrow(192)+box(210,'連接器壓終點一板','方塊壓另一板，啟動輪盤');
 else body=box(12,'第一階段：紅側開孔','紅光源 → 同一根連接器 → 紅門')+arrow(60)+box(78,'先走進內室','藍光此時仍被牆擋住')+arrow(126)+box(144,'鑽孔器改鑽藍側','紅側封回，紅光停止')+arrow(192)+box(210,'藍光源 → 同一根連接器','→ 藍接收器，終點門打開');
 return `<svg class="diagram-compact" viewBox="0 0 320 310" role="img" aria-label="${title}" xmlns="http://www.w3.org/2000/svg"><title>${title}</title><g fill="#302f29" font-size="16" text-anchor="middle">${body}</g></svg>`;
}
