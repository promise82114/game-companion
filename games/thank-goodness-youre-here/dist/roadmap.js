(function (global) {
  'use strict';
  // A presentation index over the existing records, never a second progress store.
  function create(guide) {
    const steps = new Map(guide.stages.flatMap(stage => stage.steps).map(step => [step.id, step]));
    const milestones = guide.stages.flatMap(stage => stage.milestones.map(item => ({...item, stageId: stage.id, steps: item.stepIds.map(id => steps.get(id))})));
    const byStep = new Map(milestones.flatMap(item => item.stepIds.map(id => [id, item])));
    const done = (item, data) => item.trophyId ? data.trophyEarned[item.trophyId] === true : item.stepIds.every(id => data.stepDone[id] === true);
    const recorded = (item, data) => item.stepIds.filter(id => data.stepDone[id] === true).length;
    const forStage = id => milestones.filter(item => item.stageId === id);
    const pending = (check, data) => check.trophyIds ? check.trophyIds.filter(id => data.trophyEarned[id] !== true) : check.stepIds.filter(id => data.stepDone[id] !== true);
    return {milestones, byStep, done, recorded, forStage, pending};
  }
  global.RoadmapProgress = {create};
})(window);
