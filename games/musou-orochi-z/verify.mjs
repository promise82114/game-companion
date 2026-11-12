import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createModel, gameId, planImport, skillKey, weaponLevels} from './dist/model.js';
const browserGlobal = {};
globalThis.window = browserGlobal;
await import('../talos2/dist/shared/sync-core.js');
delete globalThis.window;

const read = async file => JSON.parse(await fs.readFile(new URL(file, import.meta.url), 'utf8'));
const data = await read('./dist/catalog.json');
const manifest = await read('./module.json');
const model = createModel(data);
const {characters, skills, characterSkills, stages, materials, references} = data;
const unique = (rows, count, pattern) => {
  assert.equal(rows.length, count);
  assert.equal(new Set(rows.map(row => row.id)).size, count);
  for (const row of rows) assert.match(row.id, pattern);
};
unique(characters, 96, /^char-\d{2}$/);
unique(skills, 18, /^skill-[a-z-]+$/);
unique(stages, 140, /^stage-(?:(?:original|rebirth)-(?:shu|wei|wu|sengoku|orochi)-\d{2}(?:-side)?|drama-\d{2})$/);
unique(materials, 30, /^material-\d{2}$/);
unique(references, references.length, /^[a-z0-9-]+$/);
assert.equal(weaponLevels.length * characters.length, 288);
assert.deepEqual(characters.filter(row => row.special).map(row => row.nameZh), ['真・遠呂智', '百百目鬼', '牛鬼']);
assert.deepEqual(Object.fromEntries([...Map.groupBy(characters, row => row.faction)].map(([key, rows]) => [key, rows.length])),
  {蜀: 13, 魏: 13, 吳: 14, 其他一: 8, 其他二: 14, 戰國一: 12, 戰國二: 11, 戰國三: 11});
assert.equal(characterSkills.length, 325);
assert.equal(new Set(characterSkills.map(row => skillKey(row.characterId, row.skillId))).size, 325);
for (const row of characterSkills) {
  assert.ok(model.characters.has(row.characterId));
  assert.ok(model.skills.has(row.skillId));
}
for (const character of characters) {
  const orders = characterSkills.filter(row => row.characterId === character.id).map(row => row.order);
  assert.ok(character.special ? orders.length === 0 : orders.length >= 2 && orders.length <= 4);
  assert.deepEqual(orders, orders.map((_, i) => i + 1));
  assert.ok(character.nameJa && character.nameZh);
}
assert.deepEqual(skills.map(skill => model.charactersBySkill.get(skill.id).length),
  [20, 20, 20, 20, 20, 15, 15, 20, 20, 20, 20, 20, 20, 15, 15, 15, 15, 15]);
const evidenceIds = new Set(references.map(ref => ref.id));
const checkEvidence = ids => assert.ok(ids.length && ids.every(id => evidenceIds.has(id)));
const stageGroups = Map.groupBy(stages, row => row.mode);
assert.deepEqual([...stageGroups].map(([key, rows]) => [key, rows.length]), [['original', 60], ['rebirth', 40], ['drama', 40]]);
for (const faction of ['蜀', '魏', '吳', '戰國']) {
  const entries = stages.filter(row => row.faction === faction);
  assert.equal(entries.length, 23);
  assert.deepEqual(entries.filter(row => row.isSideStory).map(row => row.chapter), [2, 3, 4, 5, 6, 7, 8]);
  assert.deepEqual(entries.filter(row => !row.isSideStory).map(row => row.chapter), Array.from({length: 16}, (_, i) => i + 1));
}
assert.deepEqual(stages.filter(row => row.faction === '遠呂智').map(row => row.chapter), [1, 2, 3, 4, 5, 6, 7, 8]);
assert.deepEqual(stageGroups.get('drama').map(row => row.chapter), Array.from({length: 40}, (_, i) => i + 1));
for (const stage of stages) {
  assert.ok(stage.titleZh && stage.titleJa && stage.unlockText);
  assert.ok(['web', 'pending'].includes(stage.verifiedStatus));
  if (stage.verifiedStatus === 'pending') assert.ok(stage.evidenceNote);
  checkEvidence(stage.unlockEvidence);
  if (stage.mode === 'drama') {
    assert.equal(stage.recommendedCharacterIds.length, 3);
    assert.equal(new Set(stage.recommendedCharacterIds).size, 3);
    assert.ok(stage.recommendedCharacterIds.every(id => model.characters.has(id)));
  }
}
for (const material of materials) {
  assert.ok(model.stages.has(material.stageId) && model.stages.get(material.stageId).mode !== 'drama');
  assert.ok(material.nameZh && material.nameJa && material.condition);
  assert.ok(['web', 'pending'].includes(material.verifiedStatus));
  checkEvidence(material.evidence);
}
assert.equal(model.stages.get('stage-drama-03').unlockText.includes('12'), true);
assert.equal(model.stages.get('stage-drama-40').verifiedStatus, 'pending');
assert.equal(model.materials.get('material-16').stageId, 'stage-rebirth-wu-10');
assert.equal(manifest.gameId, gameId);
assert.equal(manifest.storagePrefix, model.config.storagePrefix);
assert.equal(manifest.moduleVersion, model.config.moduleVersion);
assert.equal(manifest.cloudWritesEnabled, false);
assert.equal(model.config.fresh().schema, manifest.progressSchema);

const progress = model.config.fresh();
const [character] = characters;
const special = characters.find(row => row.special);
assert.deepEqual(model.summarize(progress), {weaponCounts: [0, 0, 0], weapons: 0, wallpaper: 0, skills: 0, stages: 0, materials: 0});
progress.proficiencyByCharacter[character.id] = 19;
assert.equal(model.characterStatus(progress, character).costumes, false);
progress.proficiencyByCharacter[character.id] = 20;
assert.equal(model.characterStatus(progress, character).costumes, true);
progress.proficiencyByCharacter[character.id] = 50;
progress.proficiencyByCharacter[special.id] = 50;
progress.unlockedCharacters[special.id] = true;
assert.equal(model.summarize(progress).wallpaper, 0);
progress.unlockedCharacters[character.id] = true;
assert.equal(model.summarize(progress).wallpaper, 7);
for (const skill of model.skillsByCharacter.get(character.id)) progress.learnedCharacterSkills[skillKey(character.id, skill.id)] = true;
assert.equal(model.summarize(progress).wallpaper, 8);
assert.equal(model.characterStatus(progress, character).complete, false);
progress.weaponsByCharacter[character.id] = {lv2: true, lv3: true, lv4: true, unknown: {notes: 'local'}};
assert.equal(model.characterStatus(progress, character).complete, true);
const remote = model.config.fresh();
remote.weaponsByCharacter[character.id] = {lv2: false, unknownRemote: {notes: 'remote'}};
remote.proficiencyByCharacter['future-id'] = 'unknown payload';
remote.journalSignature = {unknown: true};
Object.defineProperty(remote, '__proto__', {value: {notPolluted: true}, enumerable: true});
const core = browserGlobal.SideProjectSync;
const {plan, preserved} = planImport(core, progress, remote);
assert.ok(preserved.length);
assert.equal(plan.conflicts.length, 1);
const merged = core.resolve(plan, ['remote']).progress;
assert.equal(merged.weaponsByCharacter[character.id].lv2, false);
assert.deepEqual(merged.weaponsByCharacter[character.id].unknown, {notes: 'local'});
assert.deepEqual(merged.weaponsByCharacter[character.id].unknownRemote, {notes: 'remote'});
assert.equal(merged.proficiencyByCharacter['future-id'], 'unknown payload');
assert.deepEqual(merged.journalSignature, {unknown: true});
assert.ok(Object.hasOwn(merged, '__proto__'));
assert.equal({}.notPolluted, undefined);
assert.throws(() => model.parseImport({...remote, gameId: 'grounded'}), /遊戲識別不符/);
assert.throws(() => model.parseImport({...remote, proficiencyByCharacter: {[character.id]: 51}}), /熟練度/);
assert.throws(() => model.parseImport({...remote, weaponsByCharacter: {[character.id]: {lv3: 'true'}}}), /武器/);
assert.equal(model.parseImport({gameId, recoveryBundle: {localRaw: JSON.stringify(merged)}}, 'localRaw').gameId, gameId);
console.log(JSON.stringify({gameId, characters: 96, weaponSlots: 288, skills: 18, characterSkills: 325,
  story: 100, dramatic: 40, dramaticPending: stages.filter(row => row.verifiedStatus === 'pending').length,
  materials: 30, regularWallpapers: 744, passed: true}));
