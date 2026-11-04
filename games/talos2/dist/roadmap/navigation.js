// 每個已發布主步驟只屬於一個閱讀片段。網址與深連結不改進度 ID。
export const roadmapSections=[
 {id:'calibration',stage:'P0',label:'校準與備份',steps:['calibration','save-safety']},
 {id:'city',stage:'P0',label:'城市・出發前',maps:['CITY-1','MUSEUM-1'],steps:['neutral-route','doge-intro','chicken','petition','schuyler','museum','purple','departure-check']},
 {id:'E1',stage:'P1',label:'E1 草原環',region:'E1',steps:['doge-survey','team','field-basics','puzzle-time','chase','region-e1']},
 {id:'E2',stage:'P1',label:'E2 高原樹林',region:'E2',steps:['single-rod','one-lap','doge-match','region-e2']},
 {id:'E3',stage:'P1',label:'E3 東部濕地',region:'E3',steps:['region-e3']},
 {id:'east-megastructure',stage:'P1',label:'東側巨構',maps:['MEGA-E-ENTRY','MEGA-E-CORE'],steps:['first-megastructure']},
 {id:'N1',stage:'P2',label:'N1 荒島',region:'N1',steps:['rand-north','region-n1']},
 {id:'N2',stage:'P2',label:'N2 被淹沒的山谷',region:'N2',steps:['broken-somnodrome','region-n2']},
 {id:'N3',stage:'P2',label:'N3 消失的沼澤',region:'N3',steps:['region-n3','north-exit']},
 {id:'north-megastructure',stage:'P2',label:'北側巨構',maps:['MEGA-N'],steps:['north-megastructure']},
 {id:'revisit',stage:'P3',label:'城市回訪',maps:['CITY-2','MUSEUM-2'],steps:['sinner','text-adventures','city-tour','city-politics','city-exit']},
 {id:'S1',stage:'P4',label:'S1 南海岸',region:'S1',steps:['hard-way','rand-south','artifacts','region-s1']},
 {id:'S2',stage:'P4',label:'S2 青翠峽谷',region:'S2',steps:['region-s2']},
 {id:'S3',stage:'P4',label:'S3 圓形綠洲',region:'S3',steps:['region-s3']},
 {id:'south-megastructure',stage:'P4',label:'南側巨構',maps:['MEGA-S-ENTRY','MEGA-S-PINS'],steps:['prometheus-rescue']},
 {id:'W1',stage:'P5',label:'W1 西三角洲',region:'W1',steps:['west-arrival','region-w1']},
 {id:'W3',stage:'P5',label:'W3 高地平原',region:'W3',steps:['region-w3']},
 {id:'W2',stage:'P5',label:'W2 人造山丘',region:'W2',steps:['w2-backup','region-w2','working-somnodrome']},
 {id:'rand',stage:'P6',label:'Rand 路線',steps:['mayor-rand']},
 {id:'byron',stage:'P6',label:'Byron 路線',steps:['mayor-byron']},
 {id:'hermanubis',stage:'P6',label:'Hermanubis 路線',steps:['mayor-hermanubis']},
 {id:'west-megastructure',stage:'P7',label:'西側巨構・救援',maps:['MEGA-W'],steps:['west-megastructure']},
 {id:'last-city',stage:'P7',label:'Act V 城市回訪',maps:['CITY-3-STORY','CITY-3'],steps:['final-city']},
 {id:'gold',stage:'P7',label:'黃金謎題與 Miranda',maps:['BASE-CAMP'],steps:['all-puzzles','miranda']},
 {id:'audit',stage:'P7',label:'收集與主線驗收',maps:['BASE-CAMP'],steps:['collectibles','stars','story-audit']},
 {id:'finale',stage:'P7',label:'最終登機與結局',maps:['MEGA-FINAL','BASE-CAMP'],steps:['final-backup','ending','platinum-audit']}
];
export const sectionsForStage=stage=>roadmapSections.filter(s=>s.stage===stage);
export const sectionForStep=id=>roadmapSections.find(s=>s.steps.includes(id));
export function resolveSection(stage,id){return roadmapSections.find(s=>s.stage===stage&&s.id===id)||sectionsForStage(stage)[0];}
export const sectionUrl=s=>`?view=roadmap&stage=${s.stage}&section=${s.id}`;
export function chapterNavigation(data,stage,sectionId,progress,escape){return data.stages.map(s=>{
 const list=data.steps.filter(step=>step.stageId===s.id),count=list.filter(step=>progress.steps[step.id]?.status==='completed').length;
 const label={P0:'校準與城市',P1:'東區',P2:'北區',P3:'城市回訪',P4:'南區',P5:'西區',P6:'三市長分歧',P7:'收尾與結局'}[s.id];
 return `<div class="chapter-nav-group"><a class="chapter-link" href="?view=roadmap&stage=${s.id}" data-stage="${s.id}" ${stage===s.id?'aria-current="true"':''}><span>${s.id} · ${label}</span><small>${count}/${list.length}</small></a>${stage===s.id?'<div class="section-nav">'+sectionsForStage(s.id).map(part=>`<a href="${sectionUrl(part)}" data-section="${part.id}" ${sectionId===part.id?'aria-current="location"':''}>${escape(part.label)}</a>`).join('')+'</div>':''}</div>`;
}).join('');}
