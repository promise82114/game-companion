import {createStore} from '../../shared/roadmap-store.js';
import '../../shared/merge-core.js';
import {createModel, gameId, isChecked, planImport, skillKey, wallpaperLevels, weaponLevels} from './model.js?v=20261112-progress';

const core = window.SideProjectSync;
const $ = id => document.getElementById(id);
const workspace = $('workspace');
const views = {characters: '全武將', stages: '全關卡', skills: '全特技', materials: '全鍊成素材', sources: '資料來源與判定'};
const modes = {original: '原版', rebirth: '再臨', drama: '戲劇模式'};
const factions = ['蜀', '魏', '吳', '戰國', '遠呂智'];
const filters = {};
const openedCharacters = new Map();
const normalProficiencyStops = [10, 20, ...wallpaperLevels];
const specialProficiencyStops = [20];
const proficiencyStops = character => character.special ? specialProficiencyStops : normalProficiencyStops;
const esc = text => String(text).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const normalize = value => String(value).normalize('NFKC').trim().toLocaleLowerCase('zh-Hant');
const matches = (query, ...values) => values.some(value => normalize(value).includes(query));
const percent = (count, total) => Math.round(count / total * 100) + '%';
const pad = number => String(number).padStart(2, '0');
const chapters = stage => stage.mode === 'drama' ? pad(stage.chapter) + (stage.isSideStory ? ' 外傳' : '') :
  (stage.chapter === 16 || (stage.chapter === 8 && stage.faction === '遠呂智') ? '終章' : '第 ' + stage.chapter + ' 章') +
  (stage.isSideStory ? ' 外傳' : '');
const stageLabel = stage => (stage.faction ? stage.faction + ' · ' : '') + modes[stage.mode] + ' · ' + chapters(stage);
const stageName = stage => stage.titleZh.replaceAll('覇', '霸');
const note = text => '<p class="muted">' + esc(text) + '</p>';
const option = (value, label) => '<option value="' + esc(value) + '">' + esc(label) + '</option>';
const select = (key, label, options) => '<select data-filter="' + key + '" aria-label="' + label + '">' +
  options.map(([value, text]) => option(value, text)).join('') + '</select>';
const checkboxInput = (group, id, attrs = '') => '<input type="checkbox" data-group="' + group +
  '" data-id="' + id + '" ' + attrs + '>';
const check = (group, id, label, attrs = '', style = '') => '<label class="check ' + style + '">' +
  checkboxInput(group, id, attrs) + '<span>' + esc(label) + '</span></label>';

let catalog, model, store, progress, materialsByStage, references, view, review, undo;
let busy = false;
let ready = false;
let saving = Promise.resolve();
let proficiencyDrag;

function report(message) {
  $('notice').hidden = false;
  $('message').textContent = message;
  $('undo').hidden = !undo;
}

function route() {
  const [requested, target] = location.hash.slice(1).split('/');
  return [Object.hasOwn(views, requested) ? requested : 'characters', target];
}

function sourceLinks(ids) {
  return ids.map(id => {
    const ref = references.get(id);
    return '<a href="' + esc(ref.url) + '" target="_blank" rel="noopener noreferrer">' + esc(ref.label) + '</a>';
  }).join(' · ');
}

function renderStats() {
  const count = model.summarize(progress);
  const roster = catalog.characters.length;
  const normalRoster = catalog.characters.filter(row => !row.special).length;
  const stat = (label, value, total, description = label) =>
    '<div><span>' + label + '</span><strong>' + value + ' / ' + total + '</strong>' +
    '<progress aria-label="' + description + '" value="' + value + '" max="' + total + '"></progress></div>';
  $('stats').innerHTML = [
    ...count.weaponCounts.map((value, i) => stat('Lv.' + (i + 2) + ' 武器', value, roster)),
    stat('武器合計', count.weapons, roster * weaponLevels.length),
    stat('一般武將壁紙', count.wallpaper, normalRoster * 8, '一般武將壁紙（以全武將已取得推算）'),
    stat('武將特技', count.skills, catalog.characterSkills.length),
    stat('激難通關', count.stages, catalog.stages.length),
    stat('鍊成素材', count.materials, catalog.materials.length)
  ].join('');
}

function toolbar() {
  const search = '<input type="search" data-filter="query" aria-label="搜尋名稱" placeholder="搜尋名稱">';
  if (view === 'characters') {
    return search + select('status', '武將進度篩選', [['', '全部進度'], ['skills', '特技未全習得'], ['costumes', '服裝未達標'],
        ['weapons', '武器未收齊'], ['incomplete', '未完成']]);
  }
  if (view === 'stages') {
    return search + select('mode', '劇本模式', [['', '所有模式'], ...Object.entries(modes)]) +
      select('status', '通關進度篩選', [['', '全部進度'], ['incomplete', '未完成']]);
  }
  if (view === 'materials') {
    return search + select('status', '素材進度篩選', [['', '全部進度'], ['incomplete', '未取得']]);
  }
  return view === 'skills' ? search : '';
}

function factionTabs() {
  if (view !== 'characters' && view !== 'stages') return '';
  const names = view === 'characters' ? [...new Set(catalog.characters.map(row => row.faction))] : factions;
  return '<div class="faction-tabs" role="group" aria-label="勢力">' + ['', ...names].map(name =>
    '<button type="button" data-faction="' + esc(name) + '">' + esc(name || '全部') + '</button>').join('') + '</div>';
}

function characterRow(character) {
  const {id, nameZh, special} = character;
  const name = esc(nameZh);
  const skills = model.skillsByCharacter.get(id);
  const status = model.characterStatus(progress, character);
  const open = openedCharacters.get(id) ?? !status.complete;
  const ticks = proficiencyStops(character).map(stop =>
    '<button type="button" data-stop="' + stop + '" style="--stop:' + stop * 2 +
    '%" aria-label="' + name + ' 熟練度 ' + stop + '">' + stop + '</button>').join('');
  const checkbox = (group, key, label, style) => check(group, key, label, 'aria-label="' + name + ' ' + esc(label) + '"', style);
  return '<details class="character card" data-row="' + id + '" id="' + id + '"' + (open ? ' open' : '') + '>' +
    '<summary><span class="character-heading"><strong>' + name + '</strong>' +
    (special ? '' : '<span class="wallpaper-count"></span>') +
    '</span><span class="row-meta"></span></summary><div class="character-controls">' +
    '<div class="training"><label>熟練度 <input type="number" min="0" max="50" step="1" inputmode="numeric"' +
    ' aria-label="' + name + ' 熟練度" data-prof="' + id + '"></label><span class="costume"></span>' +
    '<div class="proficiency-scale"><div class="proficiency-track"><input type="range" min="0" max="50" step="1" aria-label="' +
    name + ' 熟練度滑桿" data-prof="' + id + '"></div><div class="proficiency-stops">' + ticks + '</div></div>' +
    '</div><div class="track-group"><div class="track-head"><span class="track-title">武器</span>' +
    '<button class="bulk" type="button" data-bulk="weapons" data-id="' + id + '"></button></div><div class="chips weapon-chips">' +
    weaponLevels.map((level, i) => check('weaponsByCharacter', id, 'Lv.' + (i + 2),
      'data-level="' + level + '" aria-label="' + name + ' Lv.' + (i + 2) + ' 武器"', 'chip')).join('') +
    '</div></div><div class="track-group"><div class="track-head"><span class="track-title">特技</span>' +
    (skills.length ? '<button class="bulk" type="button" data-bulk="skills" data-id="' + id + '"></button></div><div class="chips">' +
      skills.map(skill => checkbox('learnedCharacterSkills', skillKey(id, skill.id), skill.nameZh, 'chip')).join('') +
      '</div>' : '</div><span class="muted">無可習得特技</span>') +
    '</div></div></details>';
}

function stageTile(stage) {
  const {id, evidenceNote} = stage;
  const name = esc(stageName(stage));
  const chapter = stage.mode !== 'drama' && stage.isSideStory ? stage.chapter + ' 章外傳' : chapters(stage);
  return '<article class="stage-tile record' + (stage.isSideStory ? ' side-stage' : '') + '" id="' + id + '" data-row="' + id + '">' +
    '<label class="stage-toggle">' + checkboxInput('extremeStageClears', id,
      'aria-label="' + name + ' ' + esc(stageLabel(stage)) + ' 激難已通關"') +
    '<span class="stage-face"><small>' + esc(chapter) + '</small><strong>' + name + '</strong></span></label>' +
    '<button class="stage-info" type="button" data-stage="' + id + '" aria-label="' + name + ' ' + esc(stageLabel(stage)) +
      (evidenceNote ? ' 開啟條件（待查）' : ' 開啟條件') + '">條件' +
      (evidenceNote ? '<span class="pending-dot" aria-hidden="true"></span>' : '') + '</button></article>';
}

function showStage(id) {
  const stage = model.stages.get(id);
  const {unlockText, evidenceNote, recommendedCharacterIds} = stage;
  const associated = materialsByStage.get(id) ?? [];
  $('stage-title').textContent = stageName(stage);
  $('stage-chapter').textContent = stageLabel(stage);
  $('stage-description').innerHTML = note(unlockText) +
    (recommendedCharacterIds ? note('指定武將：' + recommendedCharacterIds.map(key => model.characters.get(key).nameZh).join('、')) : '') +
    (evidenceNote ? '<p class="pending">待查 · ' + esc(evidenceNote) + '</p>' : '') +
    (associated.length ? '<p>素材 ' + associated.map(row => '<a href="#materials/' + row.id + '">' + esc(row.nameZh) + '</a>').join('、') + '</p>' : '');
  $('stage-dialog').showModal();
}

function stageRoutes() {
  const groups = Map.groupBy(catalog.stages, row => row.faction ? row.faction + ' · ' + modes[row.mode] : modes.drama);
  return [...groups].map(([label, stages]) => {
    const isDrama = stages[0].mode === 'drama';
    const chapterStops = [...Map.groupBy(stages, stage => stage.chapter).values()];
    return '<section class="listing stage-route"><h3>' + esc(label) + '</h3><div class="stage-grid">' +
      (isDrama ? stages.map(stageTile).join('') : chapterStops.map(stop =>
        '<div class="stage-stop">' + stop.map(stageTile).join('') + '</div>').join('')) + '</div></section>';
  }).join('');
}

function materialRow(material) {
  const {id, nameZh, stageId, condition} = material;
  const stage = model.stages.get(stageId);
  const collected = isChecked(progress.collectedMaterials, id);
  return '<article class="material card record" id="' + id + '" data-row="' + id + '" data-collected="' + collected + '">' +
    '<label class="material-toggle">' + checkboxInput('collectedMaterials', id, 'aria-label="' + esc(nameZh) + ' 已取得"') + '</label>' +
    '<details' + (collected ? '' : ' open') + '><summary><strong>' + esc(nameZh) + '</strong></summary><div class="material-body">' +
    '<a class="material-stage" href="#stages/' + stageId + '"><small>' + esc(stageLabel(stage)) + '</small>' +
    '<strong>' + esc(stageName(stage)) + '</strong></a><p>' + esc(condition) + '</p>' +
    (material.evidenceNote ? '<p class="pending">待查 · ' + esc(material.evidenceNote) + '</p>' : '') +
    '</div></details></article>';
}

function skillRow(skill) {
  return '<details class="skill" data-row="' + skill.id + '" id="' + skill.id + '"><summary><strong>' + esc(skill.nameZh) +
    '</strong><span class="skill-count"></span></summary><div class="skill-missing"></div></details>';
}

function characterGroups() {
  const groups = Map.groupBy(catalog.characters, character => character.faction);
  return [...groups].map(([label, rows]) => '<section class="listing"><h3>' + esc(label) + '</h3><div class="card-grid character-grid">' +
    rows.map(characterRow).join('') + '</div></section>').join('');
}

function sourceView() {
  return '<div class="source-content"><h3>記錄與推算</h3>' +
    '<p>武器記錄 Lv.2、Lv.3、Lv.4，初始 Lv.1 免記。一般武將初始兩套服裝，熟練度 10 與 20 分別解鎖第 3、4 套。' +
    '真・遠呂智、百百目鬼、牛鬼沒有額外服裝。PS3 獎盃攻略仍列三人熟練度需達 20，因此「服裝未達標」保留這項門檻。</p>' +
    '<p>壁紙以全武將已取得推算。一般武將先計 1 張，全特技再計 1 張，熟練度達 ' + wallpaperLevels.join('、') +
    ' 各計 1 張。特殊三人沒有一般壁紙。</p>' +
    '<p>故事模式全通、戲劇模式全通各有一張特殊壁紙。兩模式全部劇本在所有難度通關另有一張。本站只記激難，特殊壁紙另以遊戲為準。</p>' +
    '<p>開啟條件依《Z》攻略整理，分歧逐關標「待查」。素材勾選只計收集。PS3 版獎盃觸發、更新版本行為與繁中選單用字仍待實機確認。</p>' +
    '<h3>查閱來源</h3><ul>' + catalog.references.map(ref => '<li>' + sourceLinks([ref.id]) + '</li>').join('') + '</ul></div>';
}

function render() {
  if (!ready) return;
  if (proficiencyDrag) finishProficiencyDrag(false);
  if ($('stage-dialog').open) $('stage-dialog').close();
  const [nextView, target] = route();
  view = nextView;
  if (target) filters[view] = {};
  for (const link of document.querySelectorAll('#navigation a, .source-link')) {
    if (link.hash === '#' + view) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  const content = {
    characters: characterGroups,
    stages: () => '<p class="route-hint"><span class="legend-box"></span> 未記錄 <span class="legend-box filled"></span> 激難已通關</p>' +
      stageRoutes(),
    skills: () => '<div class="skill-grid">' + catalog.skills.map(skillRow).join('') + '</div>',
    materials: () => note('可在任意難度完成取得條件並通關。') + '<div class="card-grid material-grid">' + catalog.materials.map(materialRow).join('') + '</div>',
    sources: sourceView
  };
  const tools = toolbar();
  workspace.innerHTML = '<div class="view-header"><h2 tabindex="-1" id="view-title">' + views[view] + '</h2>' +
    (tools ? '<div class="toolbar">' + tools + '</div>' : '') + '</div>' + factionTabs() + content[view]() +
    (tools ? '<p id="no-results" class="empty" hidden>沒有符合條件的項目。</p>' : '');
  const activeFilters = filters[view] ?? {};
  for (const input of workspace.querySelectorAll('[data-filter]')) input.value = activeFilters[input.dataset.filter] ?? '';
  refresh();
  const destination = target && $(target);
  if (destination?.matches('[data-row]')) {
    destination.scrollIntoView({block: 'start'});
    if (view === 'stages') {
      destination.querySelector('.stage-info').focus({preventScroll: true});
      showStage(target);
    } else {
      const details = destination.matches('details') ? destination : destination.querySelector('details');
      details.open = true;
      details.querySelector('summary').focus({preventScroll: true});
    }
  } else if (location.hash) {
    $('view-title').focus({preventScroll: true});
    window.scrollTo({top: 0});
  }
}

function costumeText(character, proficiency) {
  if (character.special) return proficiency >= 20 ? '獎盃門檻 20 已達' : '無額外服裝 · 獎盃門檻 20';
  return proficiency >= 20 ? '服裝 4 套' : proficiency >= 10 ? '服裝 3 套 · 下階 20' : '服裝門檻 10／20';
}

function showProficiency(scale, value) {
  scale.style.setProperty('--proficiency-progress', value * 2 + '%');
  const current = scale.querySelector('[aria-current]');
  if (current?.dataset.stop === String(value)) return;
  current?.removeAttribute('aria-current');
  scale.querySelector('[data-stop="' + value + '"]')?.setAttribute('aria-current', 'true');
}

function refreshCharacter(row) {
  const character = model.characters.get(row.dataset.row);
  const status = model.characterStatus(progress, character);
  row.querySelector('.row-meta').textContent = [
    ...(status.complete ? ['熟練度 ' + (status.proficiency ?? 0)] : []),
    '武器 ' + status.weapons + '/3',
    '特技 ' + status.learned + '/' + status.assigned.length,
    ...(status.complete ? ['已完成'] : [])
  ].join(' · ');
  if (!row.querySelector('[data-editing="true"]')) {
    for (const input of row.querySelectorAll('[data-prof]')) {
      input.value = status.proficiency ?? 0;
    }
    showProficiency(row.querySelector('.proficiency-scale'), status.proficiency ?? 0);
    row.querySelector('.costume').textContent = costumeText(character, status.proficiency);
  }
  const wallpaper = row.querySelector('.wallpaper-count');
  if (wallpaper) wallpaper.textContent = '壁紙 ' + status.wallpaper + ' / 8';
  for (const button of row.querySelectorAll('[data-bulk]')) {
    const weapons = button.dataset.bulk === 'weapons';
    const all = weapons ? status.weapons === weaponLevels.length : status.learned === status.assigned.length;
    const label = (weapons ? '武器' : '特技') + (all ? '全取消' : '全勾');
    button.textContent = all ? '全取消' : '全勾';
    button.setAttribute('aria-label', character.nameZh + ' ' + label);
  }
  // 只在完成狀態改變時自動收合／展開，平時維持玩家的閱讀位置。
  if (row.dataset.complete !== undefined && row.dataset.complete !== String(status.complete)) {
    const active = document.activeElement;
    if (status.complete && row.contains(active)) row.querySelector('summary').focus();
    row.open = !status.complete;
    openedCharacters.set(character.id, row.open);
  }
  row.dataset.complete = status.complete;
}

function refreshSkill(row) {
  const id = row.dataset.row;
  const eligible = model.charactersBySkill.get(id);
  const missing = eligible.filter(character => !isChecked(progress.learnedCharacterSkills, skillKey(character.id, id)));
  const learned = eligible.length - missing.length;
  const summary = row.querySelector('summary');
  summary.style.setProperty('--filled', percent(learned, eligible.length));
  row.querySelector('.skill-count').textContent = learned + ' / ' + eligible.length;
  const list = row.querySelector('.skill-missing');
  const keys = missing.map(character => character.id).join(' ');
  if (list.dataset.keys === keys) return;
  list.dataset.keys = keys;
  list.innerHTML = missing.length ? '<p>尚未記錄習得的武將</p><ul>' + missing.map(character =>
    '<li><a href="#characters/' + character.id + '">' + esc(character.nameZh) + '</a></li>').join('') + '</ul>' : note('所有對應武將均已記錄。');
}

function applyFilters() {
  const {query = '', faction = '', mode, status} = filters[view] ?? {};
  for (const tab of workspace.querySelectorAll('[data-faction]')) {
    tab.setAttribute('aria-pressed', String(tab.dataset.faction === faction));
  }
  const q = normalize(query);
  let visible = 0;
  for (const row of workspace.querySelectorAll('[data-row]')) {
    const id = row.dataset.row;
    let show;
    if (view === 'characters') {
      const character = model.characters.get(id);
      const summary = model.characterStatus(progress, character);
      const statuses = {
        skills: summary.learned < summary.assigned.length, costumes: !summary.costumes,
        weapons: summary.weapons < weaponLevels.length, incomplete: !summary.complete
      };
      show = matches(q, character.nameZh, character.nameJa) && (!faction || character.faction === faction) && (!status || statuses[status]);
    } else if (view === 'stages') {
      const stage = model.stages.get(id);
      show = matches(q, stageName(stage), stage.titleZh, stage.titleJa, stageLabel(stage)) &&
        (!faction || stage.faction === faction) && (!mode || stage.mode === mode) &&
        (!status || !isChecked(progress.extremeStageClears, id));
    } else if (view === 'materials') {
      const item = model.materials.get(id);
      const stage = model.stages.get(item.stageId);
      show = matches(q, item.nameZh, item.nameJa, stageName(stage), stage.titleJa, stageLabel(stage)) &&
        (!status || !isChecked(progress.collectedMaterials, id));
    } else {
      const skill = model.skills.get(id);
      show = matches(q, skill.nameZh, skill.nameJa);
    }
    row.hidden = !show;
    if (show) visible++;
  }
  for (const list of workspace.querySelectorAll('section.listing, .stage-stop')) list.hidden = !list.querySelector('[data-row]:not([hidden])');
  if ($('no-results')) $('no-results').hidden = visible > 0;
}

function refresh() {
  renderStats();
  for (const row of workspace.querySelectorAll('.character')) refreshCharacter(row);
  for (const row of workspace.querySelectorAll('.skill')) refreshSkill(row);
  for (const row of workspace.querySelectorAll('.material')) {
    const collected = String(isChecked(progress.collectedMaterials, row.dataset.row));
    if (row.dataset.collected === collected) continue;
    const details = row.querySelector('details');
    if (collected === 'true' && details.contains(document.activeElement)) details.querySelector('summary').focus();
    details.open = collected === 'false';
    row.dataset.collected = collected;
  }
  for (const input of workspace.querySelectorAll('input[data-group]')) {
    const {group, id, level} = input.dataset;
    input.checked = level ? isChecked(progress[group][id] ?? {}, level) : isChecked(progress[group], id);
  }
  applyFilters();
}

function update(mutator) {
  saving = saving.then(async () => {
    $('save-state').textContent = '保存中';
    try {
      progress = await store.update(mutator);
      refresh();
      $('save-state').textContent = '已保存於此瀏覽器';
      return true;
    } catch (error) {
      refresh();
      $('save-state').textContent = '保存失敗';
      report(error.message || '進度保存失敗，請重試。');
      return false;
    }
  });
  return saving;
}

workspace.addEventListener('toggle', event => {
  const row = event.target;
  if (row.matches('.character')) openedCharacters.set(row.id, row.open);
}, true);

function previewProficiencyDrag(clientX) {
  const drag = proficiencyDrag;
  const position = Math.max(0, Math.min(50, (clientX - drag.start - drag.offset) * 50 / drag.width));
  const previousStop = drag.stop;
  // 進入與離開門檻使用不同距離，慢慢拖過刻度時可穩定停住。
  drag.stop = previousStop !== undefined && Math.abs(position - previousStop) < 2
    ? previousStop : drag.stops.find(stop => Math.abs(position - stop) <= 1.25);
  if (previousStop !== drag.stop) {
    const scale = drag.track.parentElement;
    scale.querySelector('.is-snapped')?.classList.remove('is-snapped');
    scale.querySelector('[data-stop="' + drag.stop + '"]')?.classList.add('is-snapped');
  }
  const value = drag.stop ?? Math.round(position);
  if (value === drag.input.valueAsNumber) return;
  drag.input.value = value;
  drag.input.dispatchEvent(new Event('input', {bubbles: true}));
}

function finishProficiencyDrag(save) {
  const {input, track, pointerId, initialValue} = proficiencyDrag;
  proficiencyDrag = undefined;
  track.parentElement.querySelector('.is-snapped')?.classList.remove('is-snapped');
  if (track.hasPointerCapture(pointerId)) track.releasePointerCapture(pointerId);
  if (save && input.value !== initialValue) {
    input.dispatchEvent(new Event('change', {bubbles: true}));
  } else {
    delete input.dataset.editing;
    refreshCharacter(input.closest('.character'));
  }
}

workspace.addEventListener('pointerdown', event => {
  const track = event.target.closest('.proficiency-track');
  if (proficiencyDrag || !event.isPrimary || event.button !== 0 || !track) return;
  event.preventDefault();
  const input = track.querySelector('input');
  input.focus({preventScroll: true});
  const bounds = input.getBoundingClientRect();
  const radius = parseFloat(getComputedStyle(input).getPropertyValue('--proficiency-thumb')) / 2;
  const width = bounds.width - radius * 2;
  const start = bounds.left + radius;
  const offset = event.clientX - (start + input.valueAsNumber * width / 50);
  const onThumb = Math.abs(offset) <= radius;
  proficiencyDrag = {
    input, track, pointerId: event.pointerId, initialValue: input.value, start, width,
    offset: onThumb ? offset : 0, stops: proficiencyStops(model.characters.get(input.dataset.prof))
  };
  track.setPointerCapture(event.pointerId);
  if (!onThumb) previewProficiencyDrag(event.clientX);
});

workspace.addEventListener('pointermove', event => {
  if (proficiencyDrag?.pointerId === event.pointerId) previewProficiencyDrag(event.clientX);
});

for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
  workspace.addEventListener(type, event => {
    if (proficiencyDrag?.pointerId === event.pointerId) finishProficiencyDrag(type === 'pointerup');
  });
}

workspace.addEventListener('input', event => {
  const input = event.target;
  if (input.dataset.filter) {
    const values = filters[view] ??= {};
    values[input.dataset.filter] = input.value;
    if (input.dataset.filter === 'mode' && input.value === 'drama') values.faction = '';
    applyFilters();
  }
  const id = input.dataset.prof;
  if (!id) return;
  input.dataset.editing = 'true';
  const value = input.valueAsNumber;
  if (!input.validity.valid || !Number.isFinite(value)) return;
  const row = $(id);
  row.querySelector(input.type === 'range' ? 'input[type="number"]' : 'input[type="range"]').value = value;
  showProficiency(row.querySelector('.proficiency-scale'), value);
  row.querySelector('.costume').textContent = costumeText(model.characters.get(id), value);
});

workspace.addEventListener('focusout', event => {
  const input = event.target;
  if (!input.dataset.prof || input.dataset.editing !== 'true') return;
  delete input.dataset.editing;
  refreshCharacter($(input.dataset.prof));
});

workspace.addEventListener('change', event => {
  const input = event.target;
  const {group, id, level, prof} = input.dataset;
  if (prof) {
    delete input.dataset.editing;
    const value = input.valueAsNumber;
    if (input.validity.badInput || (input.value !== '' && !input.validity.valid)) {
      refreshCharacter($(prof));
      report('熟練度須為 0–50 的整數。');
      return;
    }
    void update(data => {
      if (input.type === 'number' && Number.isNaN(value)) delete data.proficiencyByCharacter[prof];
      else data.proficiencyByCharacter[prof] = value;
      return data;
    });
  } else if (group) {
    const value = input.checked;
    void update(data => {
      const target = level ? (data[group][id] ??= {}) : data[group];
      target[level ?? id] = value;
      return data;
    });
  }
});

workspace.addEventListener('click', event => {
  const factionTab = event.target.closest('[data-faction]');
  if (factionTab) {
    const values = filters[view] ??= {};
    values.faction = factionTab.dataset.faction;
    if (values.faction && values.mode === 'drama') {
      values.mode = '';
      workspace.querySelector('[data-filter="mode"]').value = '';
    }
    applyFilters();
    return;
  }
  const stop = event.target.closest('[data-stop]');
  if (stop) {
    const input = stop.closest('.proficiency-scale').querySelector('input[type="range"]');
    if (input.value === stop.dataset.stop) return;
    input.value = stop.dataset.stop;
    input.dispatchEvent(new Event('input', {bubbles: true}));
    input.dispatchEvent(new Event('change', {bubbles: true}));
    return;
  }
  const stageButton = event.target.closest('[data-stage]');
  if (stageButton) {
    showStage(stageButton.dataset.stage);
    return;
  }
  const button = event.target.closest('[data-bulk]');
  if (!button) return;
  const {id, bulk} = button.dataset;
  const isWeapon = bulk === 'weapons';
  const ids = isWeapon ? weaponLevels : model.skillsByCharacter.get(id).map(skill => skillKey(id, skill.id));
  const get = data => isWeapon ? (data.weaponsByCharacter[id] ??= {}) : data.learnedCharacterSkills;
  let operation;
  void update(data => {
    const map = get(data);
    const next = !ids.every(key => isChecked(map, key));
    const before = ids.map(key => [key, map[key]]);
    for (const key of ids) map[key] = next;
    operation = {get, next, before};
    return data;
  }).then(saved => {
    if (!saved) return;
    undo = operation;
    report(model.characters.get(id).nameZh + ' · ' + (isWeapon ? '武器' : '特技') + (undo.next ? '已全勾' : '已全取消'));
  });
});

$('undo').onclick = () => {
  if (!undo) return;
  const operation = undo;
  undo = undefined;
  $('undo').hidden = true;
  void update(data => {
    const map = operation.get(data);
    if (operation.before.some(([key]) => map[key] !== operation.next)) throw Error('紀錄已有後續修改，撤銷已停止。');
    for (const [key, value] of operation.before) {
      if (value === undefined) delete map[key];
      else map[key] = value;
    }
    return data;
  }).then(saved => { if (saved) report('已撤銷全勾操作。'); });
};

workspace.addEventListener('keydown', event => {
  if (event.key === 'Enter' && event.target.matches('input[type="number"][data-prof]')) event.target.blur();
});
window.addEventListener('hashchange', render);

function download(value, kind) {
  const blob = new Blob([JSON.stringify(value, null, 2) + '\n'], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  try {
    link.href = url;
    link.download = gameId + '-' + kind + '-' + new Date().toISOString().replace(/[:.]/g, '-') + '.json';
    document.body.append(link);
    link.click();
  } finally {
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
}

function importControls() {
  const enabled = Boolean(review?.downloaded && !review.stale && !busy);
  $('import-ack').disabled = !enabled;
  $('import-apply').disabled = !enabled || !$('import-ack').checked || review.choices.includes('');
  for (const id of ['import-download', 'import-local', 'import-source']) $(id).disabled = !review || review.stale || busy;
}

const groupLabels = {
  proficiencyByCharacter: '熟練度', weaponsByCharacter: '武器', learnedCharacterSkills: '特技',
  extremeStageClears: '激難通關', collectedMaterials: '鍊成素材', unlockedCharacters: '武將可操作'
};
function diffLabel(path) {
  const [group, key, level] = path.slice(1);
  if (!Object.hasOwn(groupLabels, group) || !key) return path.slice(1).join(' / ');
  if (group === 'learnedCharacterSkills') {
    const [character, skill] = key.split(':');
    const name = model.characters.get(character)?.nameZh;
    const ability = model.skills.get(skill)?.nameZh;
    return [groupLabels[group], name && ability ? name + ' · ' + ability : key].join(' / ');
  }
  const item = model.characters.get(key) ?? model.stages.get(key) ?? model.materials.get(key);
  const title = item?.nameZh ?? (item?.titleZh ? stageLabel(item) + ' · ' + item.titleZh : key);
  return [groupLabels[group], title, level].filter(Boolean).join(' / ');
}

function renderDiffs() {
  const container = $('import-rows');
  container.replaceChildren();
  const diffRow = (difference, index) => {
    const row = document.createElement('section');
    row.className = 'difference';
    const title = document.createElement('h3');
    title.textContent = diffLabel(difference.path);
    row.append(title);
    const values = document.createElement('div');
    values.className = 'diff-values';
    for (const [side, label] of [['local', '本機'], ['remote', '匯入']]) {
      const value = document.createElement('pre');
      value.textContent = label + '\n' + (JSON.stringify(difference[side], null, 2) ?? '（無紀錄）');
      values.append(value);
    }
    row.append(values);
    if (index !== undefined) {
      const choice = document.createElement('select');
      choice.setAttribute('aria-label', title.textContent + '的匯入選擇');
      choice.append(new Option('請選擇', ''), new Option('保留本機', 'local'), new Option('使用匯入', 'remote'));
      choice.value = review.choices[index];
      choice.onchange = () => { review.choices[index] = choice.value; importControls(); };
      row.append(choice);
    }
    return row;
  };
  review.plan.conflicts.forEach((difference, index) => container.append(diffRow(difference, index)));
  review.preserved.forEach(difference => container.append(diffRow(difference)));
}

$('open-backup').onclick = () => {
  $('backup-status').textContent = '';
  $('backup-dialog').showModal();
};
$('export').onclick = async () => {
  try {
    await saving;
    download(await store.exportAll(), 'backup');
    $('backup-status').textContent = '已送出下載，請確認檔案已保存。';
  } catch (error) {
    $('backup-status').textContent = '備份失敗 · ' + error.message;
  }
};
$('import-file').onchange = async event => {
  const input = event.target;
  const file = input.files[0];
  input.value = '';
  if (!file || busy) return;
  busy = true;
  input.disabled = true;
  $('backup-status').textContent = '保存兩端原文並比較中';
  try {
    await saving;
    const sourceRaw = await file.text();
    const localRaw = await store.stamp();
    await store.archive({kind: 'import-raw', at: Date.now(), sourceRaw, localRaw});
    const incoming = model.parseImport(JSON.parse(sourceRaw), $('recovery-side').value);
    const local = model.config.validateProgress(JSON.parse(localRaw));
    const {preserved, plan} = planImport(core, local, incoming);
    if (!$('backup-dialog').open) return;
    review = {sourceRaw, localRaw, preserved, plan, choices: plan.conflicts.map(() => ''), stale: false, downloaded: false};
    $('import-summary').textContent = plan.conflicts.length + ' 筆雙端差異需選擇，' + preserved.length +
      ' 筆單端項目會保留或新增。';
    $('import-bulk').hidden = plan.conflicts.length === 0;
    $('import-ack').checked = false;
    $('import-status').textContent = '請下載兩端原文，確認保存後再套用。';
    renderDiffs();
    $('backup-dialog').close();
    $('import-dialog').showModal();
    if (await store.stamp() !== localRaw) markStale();
  } catch (error) {
    $('backup-status').textContent = '匯入已停止 · ' + (error instanceof SyntaxError ? 'JSON 無法解析，原文已保留。' : error.message);
  } finally {
    busy = false;
    input.disabled = false;
    importControls();
  }
};

for (const [id, choice] of [['import-local', 'local'], ['import-source', 'remote']]) {
  $(id).onclick = () => {
    review.choices.fill(choice);
    renderDiffs();
    importControls();
  };
}

$('import-download').onclick = () => {
  review.downloaded = false;
  $('import-ack').checked = false;
  try {
    const {sourceRaw, localRaw} = review;
    download({gameId, recoveryBundle: {sourceRaw, localRaw}, at: Date.now()}, 'before-import');
    review.downloaded = true;
    $('import-status').textContent = '已送出下載，請確認檔案已保存。';
  } catch (error) {
    $('import-status').textContent = '下載備份失敗 · ' + error.message;
  }
  importControls();
};
$('import-ack').onchange = importControls;

function markStale() {
  if (!review) return;
  review.stale = true;
  $('import-status').textContent = '預覽已過期，請取消後重新比較。';
  importControls();
}

$('import-apply').onclick = async () => {
  if ($('import-apply').disabled) return;
  const currentReview = review;
  busy = true;
  importControls();
  try {
    await saving;
    progress = await store.update(() => core.resolve(currentReview.plan, currentReview.choices).progress, currentReview.localRaw);
    undo = undefined;
    refresh();
    $('import-dialog').close();
    $('save-state').textContent = '已保存於此瀏覽器';
    report('已套用匯入選擇，兩端原文可由備份匯出。');
  } catch (error) {
    markStale();
    $('import-status').textContent = error.message;
  } finally {
    busy = false;
    importControls();
  }
};
$('import-dialog').addEventListener('close', () => {
  review = undefined;
  $('open-backup').focus();
});
$('import-dialog').addEventListener('cancel', event => {
  if (busy) event.preventDefault();
});
$('import-dialog').querySelector('form').addEventListener('submit', event => {
  if (busy) event.preventDefault();
});

function syncDisplay() {
  saving = saving.then(async () => {
    if (!ready) return;
    try {
      progress = await store.get();
      if (review && JSON.stringify(progress) !== review.localRaw) markStale();
      refresh();
    } catch (error) {
      $('save-state').textContent = '讀取失敗';
      report(error.message);
    }
  });
}

try {
  const response = await fetch('./catalog.json');
  if (!response.ok) throw Error('資料檔載入失敗（HTTP ' + response.status + '）。');
  catalog = await response.json();
  model = createModel(catalog);
  materialsByStage = Map.groupBy(catalog.materials, row => row.stageId);
  references = new Map(catalog.references.map(row => [row.id, row]));
  store = createStore(model.config, core, syncDisplay);
  progress = await store.open();
  ready = true;
  $('open-backup').disabled = false;
  $('save-state').textContent = '已保存於此瀏覽器';
  render();
} catch (error) {
  $('save-state').textContent = '讀取失敗';
  $('open-backup').disabled = !store;
  $('import-file').disabled = true;
  workspace.innerHTML = '<h2 id="view-title">無法開啟進度</h2>' + note(error.message) +
    note('請重新整理。若本機仍可讀取，可由備份匯出原始資料。');
}
