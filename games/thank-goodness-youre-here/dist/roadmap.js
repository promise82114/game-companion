(function (global) {
  'use strict';
  // A presentation index over the existing records, never a second progress store.
  function create(guide) {
    // Keep the published step IDs one-to-one, including records made by v1.4 groups.
    const milestones = guide.stages.flatMap(stage => stage.steps.map(step => ({id: step.id, title: step.location, stageId: stage.id, stepIds: [step.id], steps: [step]})));
    const byStep = new Map(milestones.flatMap(item => item.stepIds.map(id => [id, item])));
    const done = (item, data) => data.stepDone[item.id] === true;
    const recorded = (item, data) => item.stepIds.filter(id => data.stepDone[id] === true).length;
    const forStage = id => milestones.filter(item => item.stageId === id);
    const pending = (check, data) => check.trophyIds ? check.trophyIds.filter(id => data.trophyEarned[id] !== true) : check.stepIds.filter(id => data.stepDone[id] !== true);
    return {milestones, byStep, done, recorded, forStage, pending};
  }
  global.RoadmapProgress = {create};
})(window);
