(function (global) {
  'use strict';
  // 只裝飾顯示文字；名稱、攻略原文與玩家進度皆不改寫。
  const characters = [
    {id:'mother-megg',name:'Mother Megg',aliases:['Mother Megg']},
    {id:'big-ron',name:'Big Ron',aliases:['Big Ron','Ron']},
    {id:'brigadier',name:'Brigadier',aliases:['Brigadier']},
    {id:'charlie',name:'Charlie',aliases:['Charlie']},
    {id:'jasper',name:'Jasper',aliases:['Jasper']},
    {id:'ronny',name:'Ronny',aliases:['Ronny']},
    {id:'larry',name:'Larry',aliases:['Larry']},
    {id:'nick',name:'Nick',aliases:['Nick']},
    {id:'marge',name:'Marge',aliases:['Marge']},
    {id:'bish',name:'Bish',aliases:['Bish']},
    {id:'sam',name:'Sam',aliases:['Sam']},
    {id:'colin',name:'Colin',aliases:['Colin']},
    {id:'rog',name:'Rog',aliases:['Rog']},
    {id:'polly',name:'Polly',aliases:['Polly']},
    {id:'paul',name:'Paul',aliases:['Paul']},
    {id:'frank',name:'Frank',aliases:['Frank']},
    {id:'graham',name:'Graham',aliases:['Graham']},
    {id:'sue',name:'Sue',aliases:['Sue']},
    {id:'bobby',name:'Bobby',aliases:['Bobby']}
  ];
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const aliases = new Map(characters.flatMap(character => character.aliases.map(alias => [alias, character.id])));
  const names = [...aliases.keys()].sort((a,b) => b.length-a.length).map(name => name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
  const pattern = new RegExp('(?<![A-Za-z])(?:'+names.join('|')+')(?![A-Za-z])','g');
  function html(value) {
    const text = String(value); let result = '', start = 0;
    for (const match of text.matchAll(pattern)) {
      const name = match[0], id = aliases.get(name);
      result += escape(text.slice(start,match.index)) + `<span class="npc-name" data-character="${id}"><svg class="npc-avatar" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><use href="characters.svg#${id}"></use></svg>${escape(name)}</span>`;
      start = match.index + name.length;
    }
    return result + escape(text.slice(start));
  }
  global.RoadmapCharacters = Object.freeze({characters,html});
})(window);
