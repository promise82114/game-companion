/* 依攻略角色名單推算候選版本；候選數不是掉落率。 */
window.EDF_MISSIONS = (() => {
  const catalog=window.EDF_CATALOG, details=window.EDF_DETAILS;
  function slot(c){return c.variant;}
  const characters=catalog.items.filter(i=>i.kind==='characters');
  const rows=[];
  for(const fact of window.EDF_MISSION_FACTS){
    const {extra,number,title}=fact;
    const group=details.groups.find(g=>g.extra===extra&&number>=g.start&&number<=g.end);
    const noRescue=!extra&&details.noRescueMissions.includes(number);
    const candidates=group&&!noRescue?characters.filter(c=>{const meta=details.characters[c.name];return meta&&group.pools[meta.pool]?.includes(slot(c));}):[];
    rows.push({number,extra,title,code:(extra?'EX':'M')+String(number).padStart(2,'0'),known:!!group||noRescue,noRescue,candidates,
      uncertain:group?.uncertain||[],source:fact.source});
  }
  return {rows,slot};
})();
