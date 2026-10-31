export const statuses = {not_started:'未開始', completed:'已完成', missed:'已錯過', skipped:'略過', unknown:'不確定'};
export const warnings = {irreversible:'🔴 不可逆', branch:'🟠 分歧', prepare:'🟡 準備', recommended:'🔵 推薦', later:'⚪ 稍後'};
export const verificationLabels = {confirmed:'已確認', consensus:'攻略共識', unverified:'待查證'};
export const statusOf = (progress, id) => progress.steps[id]?.status || 'not_started';
export const done = (progress, id) => statusOf(progress,id) === 'completed';
export function blockers(data, progress, targetStage) {
  const target = data.stages.findIndex(s=>s.id===targetStage);
  return data.steps.filter(s=>data.stages.findIndex(t=>t.id===s.stageId)<target && ['irreversible','branch'].includes(s.warningLevel) && !done(progress,s.id));
}
export function overview(data, progress) {
  const stage = data.stages.some(s=>s.id===progress.settings.currentStage) ? progress.settings.currentStage : data.stages[0].id;
  const pending = data.steps.filter(s=>!done(progress,s.id) && !['missed','skipped'].includes(statusOf(progress,s.id)));
  const start = data.stages.findIndex(s=>s.id===stage);
  const upcoming = pending.filter(s=>data.stages.findIndex(t=>t.id===s.stageId)>=start);
  const base = data.trophies.filter(t=>t.category==='base');
  const backup = data.steps.find(s=>data.stages.findIndex(t=>t.id===s.stageId)>=start && s.backupRecommended && !progress.backups[s.id]?.confirmedAt);
  return {stage, next:upcoming[0], risk:upcoming.find(s=>['irreversible','branch'].includes(s.warningLevel)), backup, earned:base.filter(t=>progress.trophies[t.id]?.earned).length, total:base.length, completed:data.steps.filter(s=>done(progress,s.id)).length};
}
export function matches(step, progress, filter) {
  if(filter==='pending') return !done(progress,step.id);
  if(filter==='missable') return step.missable;
  if(filter==='backup') return step.backupRecommended;
  if(filter==='recommended') return step.warningLevel==='recommended';
  if(filter==='completed') return done(progress,step.id);
  if(filter==='unverified') return step.verificationStatus==='unverified';
  return true;
}
