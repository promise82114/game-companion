export const gameId = 'musou-orochi-z';
export const weaponLevels = ['lv2', 'lv3', 'lv4'];
export const wallpaperLevels = [25, 30, 35, 40, 45, 50];
export const skillKey = (characterId, skillId) => characterId + ':' + skillId;
const moduleVersion = '1.0.0';
const schema = 1;
const booleanGroups = ['learnedCharacterSkills', 'extremeStageClears', 'collectedMaterials', 'unlockedCharacters'];
const groups = ['proficiencyByCharacter', 'weaponsByCharacter', ...booleanGroups];
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const isProficiency = value => Number.isInteger(value) && value >= 0 && value <= 50;
export const isChecked = (map, id) => Object.hasOwn(map, id) && map[id] === true;

export function createModel(catalog) {
  const characters = new Map(catalog.characters.map(row => [row.id, row]));
  const skills = new Map(catalog.skills.map(row => [row.id, row]));
  const stages = new Map(catalog.stages.map(row => [row.id, row]));
  const materials = new Map(catalog.materials.map(row => [row.id, row]));
  const skillsByCharacter = new Map(catalog.characters.map(row => [row.id, []]));
  const charactersBySkill = new Map(catalog.skills.map(row => [row.id, []]));
  for (const {characterId, skillId} of catalog.characterSkills) {
    skillsByCharacter.get(characterId).push(skills.get(skillId));
    charactersBySkill.get(skillId).push(characters.get(characterId));
  }
  const skillIds = new Set(catalog.characterSkills.map(row => skillKey(row.characterId, row.skillId)));
  const knownIds = {learnedCharacterSkills: skillIds, extremeStageClears: stages, collectedMaterials: materials, unlockedCharacters: characters};

  function fresh() {
    return {
      gameId, schema, moduleVersion, dataVersion: catalog.version, revision: 0, updatedAt: Date.now(),
      ...Object.fromEntries(groups.map(group => [group, {}]))
    };
  }

  function validateProgress(progress) {
    if (!isObject(progress) || progress.gameId !== gameId || progress.schema !== schema) {
      throw Error('遊戲或進度版本不相容，請選擇《無双OROCHI Z》的 JSON。');
    }
    if (!Number.isSafeInteger(progress.revision) || progress.revision < 0 ||
        !Number.isFinite(progress.updatedAt) || progress.updatedAt < 0) {
      throw Error('進度修訂或時間欄位損壞。');
    }
    for (const group of groups) {
      if (!isObject(progress[group])) throw Error('進度欄位損壞（' + group + '）。');
    }
    for (const [id, value] of Object.entries(progress.proficiencyByCharacter)) {
      if (characters.has(id) && !isProficiency(value)) throw Error('熟練度須為 0–50 的整數。');
    }
    for (const [id, value] of Object.entries(progress.weaponsByCharacter)) {
      if (!characters.has(id)) continue;
      if (!isObject(value) || weaponLevels.some(level => Object.hasOwn(value, level) && typeof value[level] !== 'boolean')) {
        throw Error('武器紀錄格式損壞。');
      }
    }
    for (const group of booleanGroups) {
      for (const [id, value] of Object.entries(progress[group])) {
        if (knownIds[group].has(id) && typeof value !== 'boolean') throw Error('勾選紀錄格式損壞（' + group + '）。');
      }
    }
    return progress;
  }

  function parseImport(value, side, depth = 0) {
    if (value?.gameId !== gameId) throw Error('遊戲識別不符，請選擇《無双OROCHI Z》的備份。');
    if (value.recoveryBundle && !Object.hasOwn(value, 'schema')) {
      if (depth >= 5 || typeof value.recoveryBundle[side] !== 'string') throw Error('復原檔格式不相容。');
      return parseImport(JSON.parse(value.recoveryBundle[side]), side, depth + 1);
    }
    const progress = !Object.hasOwn(value, 'schema') && Array.isArray(value.records)
      ? value.records.find(record => record?.key === 'progress')?.value
      : value;
    return validateProgress(progress);
  }

  function characterStatus(progress, character) {
    const {id, special} = character;
    const proficiency = progress.proficiencyByCharacter[id];
    const assigned = skillsByCharacter.get(id);
    const learned = assigned.filter(skill => isChecked(progress.learnedCharacterSkills, skillKey(id, skill.id))).length;
    const weapons = weaponLevels.filter(level => isChecked(progress.weaponsByCharacter[id] ?? {}, level)).length;
    const costumes = proficiency >= 20;
    const unlocked = isChecked(progress.unlockedCharacters, id);
    const wallpaper = special || !unlocked ? 0 :
      1 + Number(learned === assigned.length) + wallpaperLevels.filter(level => proficiency >= level).length;
    return {
      proficiency, assigned, learned, weapons, costumes, unlocked, wallpaper,
      complete: costumes && weapons === weaponLevels.length && learned === assigned.length &&
        (special || wallpaper === 8)
    };
  }

  function summarize(progress) {
    const weaponCounts = weaponLevels.map(level => catalog.characters.filter(({id}) =>
      isChecked(progress.weaponsByCharacter[id] ?? {}, level)).length);
    return {
      weaponCounts,
      weapons: weaponCounts.reduce((total, count) => total + count, 0),
      wallpaper: catalog.characters.reduce((total, character) => total + characterStatus(progress, character).wallpaper, 0),
      skills: catalog.characterSkills.filter(({characterId, skillId}) =>
        isChecked(progress.learnedCharacterSkills, skillKey(characterId, skillId))).length,
      stages: catalog.stages.filter(({id}) => isChecked(progress.extremeStageClears, id)).length,
      materials: catalog.materials.filter(({id}) => isChecked(progress.collectedMaterials, id)).length
    };
  }

  return {
    config: {gameId, moduleVersion, storagePrefix: 'game-companion.' + gameId + '.', exportSyncState: false, fresh, validateProgress},
    characters, skills, stages, materials, skillsByCharacter, charactersBySkill,
    parseImport, characterStatus, summarize
  };
}

export function planImport(core, local, incoming) {
  const split = ({gameId, schema, revision, updatedAt, moduleVersion, dataVersion, ...records}) => ({
    metadata: {gameId, schema, revision, updatedAt, moduleVersion, dataVersion}, records
  });
  const current = split(local);
  const imported = split(incoming);
  // 將模組欄位置於進度物件內，讓合併器保留名稱與其他模組中繼欄位相同的未知資料。
  const full = core.merge(null, {progress: current.records}, {progress: imported.records}, {hasBase: false});
  const preserved = full.conflicts.filter(row => row.local === undefined || row.remote === undefined);
  const conflicts = full.conflicts.filter(row => row.local !== undefined && row.remote !== undefined);
  const data = core.resolve(full, full.conflicts.map(row => row.local === undefined ? 'remote' : 'local'));
  data.progress = {...data.progress, ...current.metadata};
  return {preserved, plan: {...full, data, conflicts}};
}
