import {config,gameId,clone,isDone,count,nextStep,edit,undoEdit,envelope,importData,differences,applyDifferences} from './model.js';
const source=import.meta.url.includes('/dist/');
const {createStore}=await import(new URL(source?'../../../shared/roadmap-store.js':'../../shared/roadmap-store.js',import.meta.url));
const $=id=>document.getElementById(id),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const names={roadmap:'冒險路線',collections:'支線與活動查漏',trophies:'PS5 獎盃',advice:'養成小訣竅',backup:'來源與範圍'};
const params=()=>new URL(location.href).searchParams,view=()=>Object.hasOwn(names,params().get('view'))?params().get('view'):'roadmap';
let data,progress,ready=false,busy=false,refreshPending=false,review,lastUndo,retry,search='',status='all',category='substories',target='';const peeks=new Set();
const message=s=>$('feedback').textContent=s;
const store=createStore(config,{clone},()=>{if(!ready)return;if(busy){refreshPending=true;return;}refresh().catch(e=>message('更新失敗：'+e.message));});
function drainUpdates(){if(refreshPending){refreshPending=false;refresh().catch(e=>message(e.message));}}
async function refresh(){progress=await store.get();if(review&&JSON.stringify(progress)!==review.stamp){review.expired=true;$('import-status').textContent='預覽已過期，請重新比較。';gate();}render(true);}
const href=(v,extra={})=>'?'+new URLSearchParams({view:v,...extra});
const link=(v,label,extra={})=>`<a data-route href="${esc(href(v,extra))}">${esc(label)}</a>`;
const chapter=()=>data.chapters.find(c=>c.id===params().get('chapter'))||data.postgame.find(c=>c.id===params().get('chapter'))||data.chapters[0];
function inline(text){return esc(text).replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\[S(\d+)\]/g,(_,n)=>link('backup','[S'+n+']',{target:'source-S'+n}));}
function markdown(text){let out='',table=[];const flush=()=>{if(!table.length)return;const h=table[0];out+='<div class="table-wrap"><table><thead><tr>'+h.map(t=>'<th>'+inline(t)+'</th>').join('')+'</tr></thead><tbody>'+table.slice(1).filter(r=>!r.every(c=>/^[-: ]+$/.test(c))).map(r=>'<tr'+(/^S\d+$/.test(r[0])?' id="entry-source-'+r[0]+'"':'')+'>'+r.map(c=>'<td>'+inline(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';table=[];};for(const line of text.split('\n')){if(line.trim().startsWith('|')){table.push(line.trim().slice(1,-1).split('|').map(s=>s.trim()));continue;}flush();if(!line.trim())continue;if(/^#{1,4} /.test(line))out+='<h3>'+inline(line.replace(/^#+ /,''))+'</h3>';else out+='<p>'+inline(line.replace(/^- (?:\[ \] )?/,''))+'</p>';}flush();return out;}
const check=(group,id,label)=>`<label class="check"><input id="${esc(group+'-'+id)}" type="checkbox" data-group="${group}" data-id="${esc(id)}" ${isDone(progress,group,id)?'checked':''}><span>${esc(label)}</span></label>`;
const options=(rows,value)=>rows.map(([id,label])=>`<option value="${esc(id)}" ${id===value?'selected':''}>${esc(label)}</option>`).join('');
const normalize=v=>String(v).toLowerCase().replace(/’/g,"'").replace(/(?:ss|#)0?(\d+)\b/g,(_,n)=>'ss'+String(Number(n)).padStart(2,'0'));
const match=(r,g)=> (!target||target===r.id)&&(!search||normalize(JSON.stringify(r)).includes(normalize(search)))&&(status==='all'||(g==='counters'?(progress.counters[r.id]?.value||0)>=r.target:isDone(progress,g,r.id))===(status==='done'));
function toolbar(){return `<div class="toolbar"><label>搜尋名稱、原文或 ID<input id="search" type="search" value="${esc(search)}" placeholder="例如 SS03、千歲、EX"></label><label>顯示<select id="status">${options([['pending','未完成'],['all','全部'],['done','已完成']],status)}</select></label><button data-reset>重設條件</button></div>`;}
const empty=()=>'<p class="empty">目前條件沒有符合項目。<button data-reset>重設條件</button></p>';
function row(r,g,embedded=false){const done=isDone(progress,g,r.id),expanded=!done||peeks.has(r.id);return `<article class="row ${done?'done':''}" id="entry-${esc(r.id)}">${check(g,r.id,r.label)}${done?`<button class="peek" data-peek="${esc(r.id)}">${expanded?'收合':'回看'}</button>`:''}<div class="row-body" ${expanded?'':'hidden'}>${r.condition?'<p>'+inline(r.condition)+'</p>':''}${r.route?'<small>'+esc(r.route)+'</small>':''}<small>${esc(r.id)}</small>${embedded?'':routeFor(r,g)}</div></article>`;}
function routeFor(r,g){let c;if(g==='substories')c=data.chapters.find(c=>c.substories.includes(r.id));if(g==='steps'||r.chapterId)c=data.chapters.find(c=>c.id===r.chapterId);if(g==='trophies'&&Number(r.id.slice(1))>=2&&Number(r.id.slice(1))<=15)c=data.chapters[Number(r.id.slice(1))-2];return c?link('roadmap','查看章節路線',{chapter:c.id}):'';}
function stats(){const entries=[['trophies','PSN 已確認',count(progress,'trophies',data.trophies),65],['substories','已完成支線',count(progress,'substories',data.substories),52],['bonds','羈絆劇場',count(progress,'objectives',data.objectives.filter(r=>r.category==='羈絆劇場')),40],['photos','攝影白金門檻',progress.counters.photos?.value||0,30],['memoirs','追憶白金門檻',progress.counters.memoirs?.value||0,70]];return '<section class="stats" aria-label="完成度">'+entries.map(([id,label,done,total])=>`<a class="stat-card" data-route href="${esc(href(id==='trophies'?'trophies':'collections',{category:id==='substories'?'substories':id==='bonds'?'羈絆劇場':'counters',...(['photos','memoirs'].includes(id)?{target:id}:{})}))}"><span>${label}</span><strong>${done} <small>/ ${total}</small></strong><span>${Math.min(100,Math.round(done/total*100))}%</span><progress value="${Math.min(done,total)}" max="${total}" aria-label="${label}"></progress></a>`).join('')+'</section>';}
function road(){const c=chapter(),n=nextStep(progress,data);let body=`<div class="page-heading"><div><h1>冒險路線</h1><p>下一步：${n?esc(n.label):'主線已完成，繼續白金查漏。'}</p></div><button class="primary" id="continue">繼續下一步</button></div>${stats()}<h2>${esc(c.label)}</h2><p class="muted">完整劇透 · 自由切章不改進度 · 勾選與 PSN 跳盃分開確認</p>`;
 if(c.id.startsWith('P'))return body+postgame(c);
 body+=`<section class="chapter-guide"><h3>這章怎麼走</h3>${markdown(c.intro)}${markdown(c.notes)}</section>${toolbar()}<h3>主線操作</h3>`;
 body+=data.steps.filter(r=>r.chapterId===c.id&&match(r,'steps')).map(r=>row(r,'steps',true)).join('')||empty();
 const ss=data.substories.filter(r=>c.substories.includes(r.id));body+='<h3>順路支線</h3>'+ss.filter(r=>match(r,'substories')).map(r=>row(r,'substories',true)).join('');
 body+='<h3>章末核對</h3><p class="muted">清單是離開前的提醒，可留待後續補；此處勾選不會代填 PSN。</p>'+data.objectives.filter(r=>c.checks.includes(r.id)&&match(r,'objectives')).map(r=>row(r,'objectives',true)).join('');
 const bonds=data.objectives.filter(r=>r.category==='羈絆劇場'&&r.condition?.includes('第'+(data.chapters.indexOf(c)+1)+'章'));if(bonds.length)body+='<h3>本章開始的羈絆劇場</h3>'+bonds.map(r=>row(r,'objectives',true)).join('');
 const trophy=data.trophies[data.chapters.indexOf(c)+1];body+='<h3>實際跳盃獨立確認</h3>'+row(trophy,'trophies',true);return body;
}
function postgame(c){let rows=[],counters=[],ss=[];
 if(c.id==='P01'){ss=data.substories.filter(r=>Number(r.id.slice(2))>=37&&Number(r.id.slice(2))<=42);rows=data.objectives.filter(r=>r.id==='activity-9');counters=data.counters.filter(r=>['battles','captures'].includes(r.id));}
 if(c.id==='P02'){rows=data.objectives.filter(r=>['activity-13','activity-14','activity-15'].includes(r.id));counters=data.counters.filter(r=>['diy','guests'].includes(r.id));}
 if(c.id==='P03'){rows=data.objectives.filter(r=>r.category==='羈絆劇場'||r.category==='活動與養成'&&!['activity-9','activity-13','activity-14','activity-15'].includes(r.id));counters=data.counters.filter(r=>!['battles','captures','diy','guests','level'].includes(r.id));}
 if(c.id==='P04')rows=data.objectives.filter(r=>r.category==='兩座迷宮');
 if(c.id==='P05')counters=data.counters.filter(r=>['level','jobs'].includes(r.id));
 return '<section class="chapter-guide">'+markdown(c.body.replace(/^- \[ \] .+$/gm,''))+'</section><h3>在此核對，共用同一筆進度</h3>'+ss.map(r=>row(r,'substories',true)).join('')+rows.map(r=>row(r,'objectives',true)).join('')+counters.map(counterRow).join('')+`<p>${link('collections','開啟完整查漏')}</p>`;
}
function counterRow(r){const value=progress.counters[r.id]?.value||0;return `<article class="row" id="entry-${r.id}"><label for="counter-${r.id}">${esc(r.label)} <small>白金需求 ${r.target}</small></label><p>${esc(r.tip)}</p><div class="actions"><input type="number" id="counter-${r.id}" min="0" step="1" value="${value}" data-counter="${r.id}" aria-label="${esc(r.label)}現值"><span>${value>=r.target?'本站門檻已達；PSN另確認':'遊戲內現值，離開欄位即保存'}</span></div></article>`;}
function collections(){const cats=['substories','羈絆劇場','兩座迷宮','活動與養成','counters'];let body=`<h1>支線與活動查漏</h1><p>支線預設40條是遊玩建議；任意40條皆可，聯盟 SS37–42 另必做。</p><label>查漏類別<select id="category">${options(cats.map(id=>[id,id==='substories'?'52 條支線':id==='counters'?'遊戲計數與門檻':id]),category)}</select></label>${toolbar()}`;
 const g=category==='substories'?'substories':category==='counters'?'counters':'objectives',rows=(g==='substories'?data.substories:g==='counters'?data.counters:data.objectives.filter(r=>r.category===category)).filter(r=>match(r,g));
 return body+`<p class="result-count">符合 ${rows.length} 項</p>`+(rows.map(r=>g==='counters'?counterRow(r):row(r,g)).join('')||empty());}
const counterTrophies={T27:['level',10],T28:['level',30],T29:['level',50],T30:['level',70],T34:['memoirs',30],T35:['memoirs',70],T37:['alo',8],T38:['jobs',1],T39:['jobs',3],T40:['jobs',7],T41:['poundmates',30],T42:['craft',10],T44:['sujidex',100],T45:['sujidex',200],T48:['battles',20],T50:['captures',10],T52:['diy',100],T53:['guests',100],T57:['entertainment',10],T58:['cert',10],T61:['photos',30],T62:['links',50],T63:['dates',5]};
function trophies(){return `<h1>PS5 獎盃</h1><p>本體65座（含白金），不含DLC 9座。T01–T65 為攻略參照 ID。達標不會自動勾選。</p>${stats()}${toolbar()}`+(data.trophies.filter(r=>match(r,'trophies')).map(t=>{let extra='',ref=counterTrophies[t.id];if(ref)extra=`<p>本站記錄 ${progress.counters[ref[0]]?.value||0} / ${ref[1]} · ${link('collections','核對遊戲現值',{category:'counters',target:ref[0]})}</p>`;if(['T16','T17','T18'].includes(t.id))extra=`<p>本站支線 ${count(progress,'substories',data.substories)} / ${{T16:10,T17:20,T18:40}[t.id]} · ${link('collections','查看支線缺項')}</p>`;return row({...t,condition:t.condition},'trophies')+extra;}).join('')||empty());}
function advice(){return '<h1>養成小訣竅</h1>'+markdown(data.articles[2])+markdown(data.articles[5])+markdown(data.articles[9]);}
function backup(){return '<h1>來源與範圍</h1><p>攻略基準：2026-11-27。保留原稿的名稱、條件與資料限制；未另行宣稱實機驗收。</p><button data-open-backup>備份與還原</button>'+markdown(data.articles[1])+markdown(data.articles[10]);}
function reset(){search='';status=view()==='roadmap'?'all':'pending';target='';}
function render(preserve=false){const active=document.activeElement,focusId=active?.id,y=scrollY,selection=active?.type==='search'?[active.selectionStart,active.selectionEnd]:null;const old=[...document.querySelectorAll('main article')],anchor=old.find(el=>el.getBoundingClientRect().bottom>0),anchorId=anchor?.id,top=anchor?.getBoundingClientRect().top;
 $('main').innerHTML=({roadmap:road,collections,trophies,advice,backup}[view()])();
 $('phase-navigation').innerHTML=[...data.chapters,...data.postgame].map(c=>`<li><a data-route href="${href('roadmap',{chapter:c.id})}" ${view()==='roadmap'&&chapter().id===c.id?'aria-current="location"':''}>${esc(c.label)}${c.steps?'<small>'+c.steps.filter(id=>isDone(progress,'steps',id)).length+' / '+c.steps.length+' 步驟</small>':''}</a></li>`).join('');
 document.querySelectorAll('[data-view]').forEach(a=>a.setAttribute('aria-current',a.dataset.view===view()?'page':'false'));
 if(target)$('main').insertAdjacentHTML('afterbegin',`<p>正在定位 ${esc(target)} <button data-reset>清除定位</button></p>`);
 if(preserve){const removed=old.findIndex(el=>el.contains(active));const neighbor=old.slice(removed+1).map(el=>$(el.id)).find(Boolean);const next=$(focusId)||(removed>=0?neighbor?.querySelector('input,button,a'):null)||$('main');next.focus({preventScroll:true});if(selection&&next.type==='search')next.setSelectionRange(...selection);const same=anchorId&&$(anchorId);scrollTo(0,same?y+same.getBoundingClientRect().top-top:y);}
}
function navigate(v,extra={}){history.pushState({},'',href(v,extra));reset();category=extra.category||'substories';target=extra.target||'';if(target)status='all';render();if(matchMedia('(max-width:720px)').matches)$('menu').open=false;requestAnimationFrame(()=>{const el=target?$('entry-'+target):null;if(el){el.scrollIntoView();(el.querySelector('input')||el).focus({preventScroll:true});}else{scrollTo(0,0);$('main').focus({preventScroll:true});}});}
async function save(g,id,value){if(busy)return;busy=true;retry=()=>save(g,id,value);try{const result=await edit(store,g,id,value);progress=result.progress;lastUndo=result.undo;$('undo').hidden=false;$('retry').hidden=true;retry=null;message('已保存，可撤銷這一筆。');render(true);}catch(e){message('保存失敗：'+e.message+'；原資料保留，請重試。');$('retry').hidden=false;render(true);}finally{busy=false;drainUpdates();}}
function download(value,name){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'})),a=document.createElement('a');try{a.href=url;a.download=name;a.click();}finally{setTimeout(()=>URL.revokeObjectURL(url),1000);}}
function openBackup(){$('backup-save-state').textContent='進度只保存於此瀏覽器；網站備份不是 PS5 遊戲存檔。';$('backup-dialog').showModal();}
$('backup-dialog').addEventListener('close',()=>$('open-backup').focus());
const safely=fn=>async e=>{try{await fn(e);}catch(error){message(error.message);}};
document.addEventListener('click',safely(async e=>{const a=e.target.closest('[data-route],[data-view]');if(a){e.preventDefault();const u=new URL(a.href);navigate(u.searchParams.get('view')||'roadmap',Object.fromEntries([...u.searchParams].filter(([k])=>k!=='view')));return;}const el=e.target.closest('button');if(!el)return;
 if(el.id==='open-backup'||el.hasAttribute('data-open-backup'))openBackup();
 if(el.id==='backup-close')$('backup-dialog').close();if(el.id==='import-open')$('import-file').click();
 if(el.hasAttribute('data-reset')){reset();render();}
 if(el.dataset.peek){peeks.has(el.dataset.peek)?peeks.delete(el.dataset.peek):peeks.add(el.dataset.peek);render(true);}
 if(el.id==='continue'){const n=nextStep(progress,data);navigate(n?'roadmap':'collections',n?{chapter:n.chapterId,target:n.id}:{});}
 if(el.id==='export-progress')download(envelope(await store.get()),'lad8-progress.json');
 if(el.id==='export-all')download(await store.exportAll(),'lad8-recovery.json');
 if(el.id==='undo'&&lastUndo){busy=true;try{progress=await undoEdit(store,lastUndo);lastUndo=null;el.hidden=true;message('已撤銷該筆，其他紀錄保留。');render(true);}finally{busy=false;drainUpdates();}}
 if(el.id==='retry'&&retry)await retry();
}));
document.addEventListener('change',safely(async e=>{const el=e.target;if(el.dataset.group){await save(el.dataset.group,el.dataset.id,{done:el.checked});return;}if(el.dataset.counter){if(!el.value.trim()||!Number.isSafeInteger(Number(el.value))||Number(el.value)<0){message('計數須為非負整數。');return;}await save('counters',el.dataset.counter,{value:Number(el.value)});return;}
 if(el.id==='status'){status=el.value;render(true);}if(el.id==='category'){category=el.value;reset();render();}
 if(el.id==='import-file'&&el.files[0]){const file=el.files[0];$('backup-dialog').close();try{await preview(file);}finally{el.value='';}}
}));
document.addEventListener('input',e=>{if(e.target.id==='search'){search=e.target.value;render(true);}});
window.addEventListener('popstate',()=>{reset();category=params().get('category')||'substories';target=params().get('target')||'';if(target)status='all';render();});

async function preview(file){
 if(file.size>10*1024*1024)throw Error('檔案超過 10 MB，停止匯入。');const sourceRaw=await file.text(),local=await store.raw(),localRaw=JSON.stringify(local);
 await store.archive({sourceRaw,localRaw,at:new Date().toISOString(),name:file.name});
 const incoming=importData(JSON.parse(sourceRaw));review={sourceRaw,localRaw,stamp:localRaw,rows:differences(local,incoming),downloaded:false,expired:false};
 $('diff-rows').innerHTML=review.rows.map((r,i)=>`<div class="diff-row"><label class="check"><input type="checkbox" data-diff="${i}" ${r.missing?'disabled':''}><span>${esc(r.group+' / '+r.id)}${r.missing?' · 來源缺少，保留本機':r.older?' · 來源較舊，需額外核對':''}</span></label><pre>本機：${esc(JSON.stringify(r.local)??'無紀錄')}\n來源：${esc(JSON.stringify(r.incoming)??'無紀錄')}</pre></div>`).join('')||'<p>兩端紀錄相同。</p>';
 $('import-status').textContent=review.rows.length+' 筆差異，未勾選項目保留本機。';$('import-ack').checked=false;$('import-ack').disabled=true;$('older-ack').checked=false;gate();$('import-dialog').showModal();
}
function gate(){$('import-apply').disabled=!review||review.expired||!review.downloaded||!$('import-ack').checked;}
$('choose-source').onclick=()=>document.querySelectorAll('[data-diff]:not(:disabled)').forEach(x=>x.checked=true);
$('choose-local').onclick=()=>document.querySelectorAll('[data-diff]').forEach(x=>x.checked=false);
$('download-recovery').onclick=async()=>{try{if(review.expired)throw Error('預覽已過期');download({gameId,recoveryBundle:{localRaw:review.localRaw,sourceRaw:review.sourceRaw},progress:JSON.parse(review.localRaw)},'lad8-before-import.json');review.downloaded=true;$('import-ack').disabled=false;$('import-status').textContent='備份已開始下載，請確認檔案保存後勾選。';}catch(e){review.downloaded=false;$('import-ack').checked=false;$('import-ack').disabled=true;$('import-status').textContent='備份失敗：'+e.message;}gate();};
$('import-ack').onchange=gate;
$('import-apply').onclick=async()=>{if(!review||$('import-apply').disabled)return;const selected=new Set([...document.querySelectorAll('[data-diff]:checked')].map(el=>{const r=review.rows[Number(el.dataset.diff)];return r.group+'/'+r.id;}));busy=true;try{await store.checkpoint('匯入前');progress=await store.update(p=>applyDifferences(p,review.rows,selected,$('older-ack').checked),review.stamp);lastUndo=null;$('undo').hidden=true;review=null;$('import-dialog').close();message('已套用選定差異，原文與快照均保留。');render(true);}catch(e){$('import-status').textContent=e.message;if(e.message.includes('過期'))review.expired=true;gate();}finally{busy=false;drainUpdates();}};
$('import-close').onclick=()=>{$('import-dialog').close();review=null;};
$('import-dialog').addEventListener('close',()=>{review=null;$('open-backup').focus();});

try{const response=await fetch('./data.json',{cache:'no-store'});if(!response.ok)throw Error('攻略讀取失敗：'+response.status);data=await response.json();if(data.gameId!==gameId||data.chapters.length!==14||data.trophies.length!==65||data.substories.length!==52)throw Error('攻略資料不完整');progress=await store.open();ready=true;reset();category=params().get('category')||'substories';target=params().get('target')||'';if(target)status='all';$('menu').open=matchMedia('(min-width:721px)').matches;render();message('進度已載入，操作保存於此瀏覽器。');if(target)requestAnimationFrame(()=>$('entry-'+target)?.scrollIntoView());}catch(e){$('main').innerHTML='<h1>無法載入</h1><p>'+esc(e.message)+'</p><p>原有紀錄未歸零，已停止寫入。</p><button id="reload">重新載入</button><button id="raw-export">下載原始封存</button>';$('reload').onclick=()=>location.reload();$('raw-export').onclick=safely(async()=>download(await store.exportAll(),'lad8-unreadable-original.json'));message('載入失敗，請先保存原始資料。');}
