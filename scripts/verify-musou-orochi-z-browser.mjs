// 使用 Playwright 新 context 與合成資料。
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from './browser-runtime.mjs';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4190/game-companion/';
const url = base + 'games/musou-orochi-z/';
const browser = await chromium.launch({headless: true, channel: process.env.BROWSER_CHANNEL || 'msedge'});
const context = await browser.newContext({acceptDownloads: true, viewport: {width: 1440, height: 900}});
const errors = [];
const remote = [];
const attach = page => {
  page.setDefaultTimeout(9000);
  page.on('pageerror', error => errors.push(error.message));
};
await context.route('**/*', route => {
  const requestUrl = route.request().url();
  // 模擬改版前的快取。入口必須使用新版資源網址。
  if (requestUrl === url + 'app.js') {
    return route.fulfill({contentType: 'text/javascript', body: "document.getElementById('intro').hidden = false;"});
  }
  if (new URL(requestUrl).origin === new URL(base).origin) return route.continue();
  remote.push(requestUrl);
  return route.abort();
});
const page = await context.newPage();
attach(page);
const ready = p => p.waitForFunction(() => document.querySelector('#save-state').textContent.startsWith('已保存'));
const go = async (p, hash = '') => { await p.goto(url + hash); await ready(p); };
const waitText = (locator, text) => locator.filter({hasText: text}).waitFor({state: 'attached', timeout: 5000});
const state = p => p.evaluate(() => new Promise((resolve, reject) => {
  const open = indexedDB.open('game-companion.musou-orochi-z.progress.v1');
  open.onerror = () => reject(open.error);
  open.onsuccess = () => {
    const db = open.result;
    const get = db.transaction('records').objectStore('records').get('progress');
    get.onsuccess = () => { db.close(); resolve(get.result); };
    get.onerror = () => { db.close(); reject(get.error); };
  };
}));
const download = async (p, selector) => {
  const event = p.waitForEvent('download');
  await p.locator(selector).click();
  const result = await event;
  assert.equal(await result.failure(), null);
  return JSON.parse(await fs.readFile(await result.path(), 'utf8'));
};
const upload = async (p, data) => {
  if (!await p.locator('#backup-dialog').isVisible()) await p.locator('#open-backup').click();
  const buffer = Buffer.from(typeof data === 'string' ? data : JSON.stringify(data));
  await p.locator('#import-file').setInputFiles({name: 'synthetic.json', mimeType: 'application/json', buffer});
};
const stat = (p, label) => p.locator('#stats > div').filter({has: p.getByText(label, {exact: true})});
const expectStat = async (p, label, value) => {
  await p.waitForFunction(({label, value}) => [...document.querySelectorAll('#stats > div')].some(row =>
    row.querySelector('span').textContent === label && row.querySelector('strong').textContent === value), {label, value});
  const item = stat(p, label);
  assert.equal(await item.locator('strong').textContent(), value);
  assert.deepEqual(await item.getByRole('progressbar').evaluate(el => [el.value, el.max]), value.split(' / ').map(Number));
};
const filter = (p, key) => p.locator('[data-filter="' + key + '"]');
const faction = (p, name) => p.getByRole('group', {name: '勢力', exact: true}).getByRole('button', {name, exact: true});

try {
  const portal = await page.goto(base);
  assert.equal(portal.status(), 200);
  assert.equal(await page.locator('.game[data-kind=checklist] .open-game[href="games/musou-orochi-z/"]').count(), 1);
  await page.locator('.open-game[href="games/musou-orochi-z/"]').click();
  await ready(page);
  assert.equal(await page.locator('.character').count(), 96);
  assert.equal(await page.locator('[data-level]').count(), 288);
  assert.equal(await page.locator('[data-group="learnedCharacterSkills"]').count(), 325);
  await expectStat(page, '一般武將壁紙', '93 / 744');
  assert.equal(await page.locator('.character-grid').first().evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length), 1);
  assert.equal(await page.locator('[data-group="unlockedCharacters"]').count(), 0);
  const pristine = await state(page);
  assert.deepEqual(pristine.unlockedCharacters, {});

  await page.evaluate(() => new Promise((resolve, reject) => {
    localStorage.setItem('game-companion.ball-x-pit.synthetic', 'keep');
    localStorage.setItem('edfwb-checklist', 'legacy-synthetic');
    const request = indexedDB.open('game-companion.ball-x-pit.progress.v1', 1);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => request.result.createObjectStore('records').put({sentinel: 'keep'}, 'progress');
    request.onsuccess = () => { request.result.close(); resolve(); };
  }));

  assert.deepEqual(await page.locator('.faction-tabs button').allTextContents(),
    ['全部', '蜀', '魏', '吳', '其他一', '其他二', '戰國一', '戰國二', '戰國三']);
  assert.equal(await faction(page, '全部').getAttribute('aria-pressed'), 'true');
  await faction(page, '魏').click();
  assert.equal(await faction(page, '魏').getAttribute('aria-pressed'), 'true');
  assert.equal(await page.locator('.character:visible').count(), 13);
  await filter(page, 'query').fill('張コウ');
  assert.equal(await page.locator('.character:visible strong').textContent(), '張郃');
  assert.deepEqual(await state(page), pristine);

  await go(page, '#characters/char-01');
  const character = page.locator('#char-01');
  const number = character.locator('input[type=number]');
  const slider = character.locator('input[type=range]');
  assert.deepEqual(await character.locator('[data-stop]').allTextContents(), ['10', '20', '25', '30', '35', '40', '45', '50']);
  assert.deepEqual(await page.getByRole('checkbox', {name: /真・遠呂智 Lv.2 武器/}).locator('xpath=ancestor::details[1]')
    .locator('[data-stop]').allTextContents(), ['20']);
  const [training, weapons, skills] = await character.locator('.character-controls > div').evaluateAll(elements =>
    elements.map(element => ({x: element.getBoundingClientRect().left, y: element.getBoundingClientRect().top})));
  assert.ok(training.x < weapons.x && weapons.x < skills.x);
  assert.equal(training.y, weapons.y);
  assert.equal(await number.inputValue(), '0');
  assert.equal(await slider.inputValue(), '0');
  assert.equal((await state(page)).proficiencyByCharacter['char-01'], undefined);
  assert.equal(await page.locator('[lang="ja"]').count(), 0);
  await number.fill('20');
  assert.equal(await slider.inputValue(), '20');
  assert.match(await character.locator('.costume').textContent(), /4 套/);
  await number.press('Tab');
  assert.equal((await state(page)).proficiencyByCharacter['char-01'], 20);
  await expectStat(page, '一般武將壁紙', '93 / 744');
  await slider.press('ArrowLeft');
  assert.equal((await state(page)).proficiencyByCharacter['char-01'], 19);
  assert.equal(await number.inputValue(), '19');
  assert.match(await character.locator('.costume').textContent(), /3 套/);
  await number.fill('');
  assert.equal(await slider.inputValue(), '19');
  await number.fill('51');
  await number.press('Tab');
  await waitText(page.locator('#message'), '0–50');
  assert.equal(await number.inputValue(), '19');

  await slider.scrollIntoViewIfNeeded();
  const bounds = await slider.boundingBox();
  const radius = await slider.evaluate(el => parseFloat(getComputedStyle(el).getPropertyValue('--proficiency-thumb')) / 2);
  const x = value => bounds.x + radius + (bounds.width - radius * 2) * value / 50;
  const y = bounds.y + bounds.height / 2;
  await page.mouse.move(x(19), y);
  await page.mouse.down();
  await page.mouse.move(x(24.2), y);
  assert.equal(await slider.inputValue(), '25');
  assert.equal(await number.inputValue(), '25');
  assert.equal(await character.locator('.is-snapped').textContent(), '25');
  await page.mouse.move(x(26.6), y);
  assert.equal(await slider.inputValue(), '25');
  await page.mouse.move(x(27.7), y);
  assert.equal(await slider.inputValue(), '28');
  await page.mouse.move(x(24.2), y);
  assert.equal((await state(page)).proficiencyByCharacter['char-01'], 19);
  await page.mouse.up();
  await expectStat(page, '一般武將壁紙', '94 / 744');
  assert.equal((await state(page)).proficiencyByCharacter['char-01'], 25);
  await slider.press('ArrowLeft');
  await expectStat(page, '一般武將壁紙', '93 / 744');
  assert.equal(await number.inputValue(), '24');
  const stop20 = character.getByRole('button', {name: '趙雲 熟練度 20', exact: true});
  await stop20.press('Enter');
  assert.equal(await stop20.getAttribute('aria-current'), 'true');
  assert.equal(await number.inputValue(), '20');
  assert.equal((await state(page)).proficiencyByCharacter['char-01'], 20);

  const weaponBulk = character.locator('[data-bulk=weapons]');
  const skillBulk = character.locator('[data-bulk=skills]');
  await weaponBulk.click();
  for (const level of [2, 3, 4]) await expectStat(page, 'Lv.' + level + ' 武器', '1 / 96');
  await expectStat(page, '武器合計', '3 / 288');
  assert.deepEqual((await state(page)).weaponsByCharacter, {'char-01': {lv2: true, lv3: true, lv4: true}});
  await weaponBulk.click();
  await expectStat(page, '武器合計', '0 / 288');
  await page.locator('#undo').click();
  await expectStat(page, '武器合計', '3 / 288');
  assert.deepEqual((await state(page)).learnedCharacterSkills, {});

  const health = character.getByRole('checkbox', {name: '趙雲 體力增加'});
  const chipFace = character.locator('.chip').filter({has: page.getByRole('checkbox', {name: '趙雲 體力增加'})}).locator('span');
  const unfilled = await chipFace.evaluate(el => getComputedStyle(el).backgroundColor);
  await health.press('Space');
  await expectStat(page, '武將特技', '1 / 325');
  assert.notEqual(await chipFace.evaluate(el => getComputedStyle(el).backgroundColor), unfilled);
  await page.locator('#navigation a[href="#skills"]').click();
  assert.equal(await page.locator('.skill').count(), 18);
  const skill = page.locator('#skill-health');
  await skill.locator('summary').click();
  assert.equal(await skill.locator('.skill-count').textContent(), '1 / 20');
  assert.equal(await skill.locator('summary').evaluate(el => el.style.getPropertyValue('--filled')), '5%');
  assert.equal(await skill.getByRole('link', {name: '趙雲'}).count(), 0);
  await skill.getByRole('link', {name: '關羽'}).click();
  assert.equal(await page.locator('#char-02').getAttribute('open'), '');
  await page.goBack();
  await page.locator('#skill-health summary').click();
  assert.equal(await page.locator('#skill-health .skill-count').textContent(), '1 / 20');

  await go(page, '#characters/char-01');
  await skillBulk.click();
  await expectStat(page, '武將特技', '4 / 325');
  await skillBulk.click();
  await expectStat(page, '武將特技', '0 / 325');
  await page.locator('#undo').click();
  await expectStat(page, '武將特技', '4 / 325');
  await expectStat(page, '一般武將壁紙', '94 / 744');
  assert.deepEqual((await state(page)).unlockedCharacters, {});
  await number.fill('50');
  await number.press('Tab');
  await expectStat(page, '一般武將壁紙', '100 / 744');
  await page.waitForFunction(() => !document.querySelector('#char-01').open);
  await character.locator('summary').click();
  await character.getByRole('checkbox', {name: '趙雲 Lv.2 武器'}).uncheck();
  await expectStat(page, '武器合計', '2 / 288');
  await page.reload();
  await ready(page);
  assert.equal(await number.inputValue(), '50');
  assert.equal(await character.getByRole('checkbox', {name: '趙雲 Lv.3 武器'}).isChecked(), true);

  await go(page, '#stages');
  assert.equal(await page.locator('.record').count(), 140);
  assert.deepEqual(await page.locator('.faction-tabs button').allTextContents(), ['全部', '蜀', '魏', '吳', '戰國', '遠呂智']);
  assert.deepEqual(await page.locator('#stage-original-shu-02').locator('..').locator('article').evaluateAll(rows =>
    rows.map(row => row.id)), ['stage-original-shu-02', 'stage-original-shu-02-side']);
  await faction(page, '魏').click();
  assert.equal(await page.locator('.record:visible').count(), 23);
  await filter(page, 'mode').selectOption('drama');
  assert.equal(await faction(page, '全部').getAttribute('aria-pressed'), 'true');
  assert.equal(await page.locator('.record:visible').count(), 40);
  await faction(page, '遠呂智').click();
  assert.equal(await filter(page, 'mode').inputValue(), '');
  assert.equal(await page.locator('.record:visible').count(), 8);
  await filter(page, 'mode').selectOption('drama');
  await filter(page, 'query').fill('古志城');
  const finalStage = page.locator('#stage-drama-40');
  const condition = finalStage.getByRole('button', {name: /開啟條件/});
  assert.equal(await condition.innerText(), '條件');
  await condition.click();
  await waitText(page.locator('#stage-dialog .pending'), '待查');
  assert.equal(await page.locator('#stage-dialog a[href^="https:"]').count(), 0);
  await page.locator('#stage-dialog').press('Escape');
  assert.equal(await finalStage.getByRole('checkbox').isChecked(), false);
  const stageFace = finalStage.locator('.stage-face');
  const stageOutline = await stageFace.evaluate(el => getComputedStyle(el).backgroundColor);
  await finalStage.getByRole('checkbox').check();
  await expectStat(page, '激難通關', '1 / 140');
  assert.notEqual(await stageFace.evaluate(el => getComputedStyle(el).backgroundColor), stageOutline);
  await filter(page, 'status').selectOption('incomplete');
  assert.equal(await page.locator('.record:visible').count(), 0);
  await go(page, '#stages/stage-original-sengoku-02');
  await page.getByRole('link', {name: '黑曜石', exact: true}).click();
  const obsidian = page.locator('#material-01');
  assert.equal(await page.locator('.material details[open]').count(), 30);
  await waitText(obsidian.locator('.material-body'), '5 分鐘');
  assert.equal(await obsidian.locator('a[href^="https:"]').count(), 0);
  await obsidian.getByRole('checkbox').check();
  await expectStat(page, '鍊成素材', '1 / 30');
  assert.equal(await obsidian.locator('details').getAttribute('open'), null);
  await obsidian.getByRole('checkbox').uncheck();
  await expectStat(page, '鍊成素材', '0 / 30');
  assert.equal(await obsidian.locator('details').getAttribute('open'), '');
  await obsidian.getByRole('checkbox').check();
  await expectStat(page, '鍊成素材', '1 / 30');
  await expectStat(page, '激難通關', '1 / 140');
  await filter(page, 'status').selectOption('incomplete');
  assert.equal(await page.locator('.record:visible').count(), 29);
  await go(page, '#materials');
  await go(page, '#materials/material-01');
  await obsidian.locator('.material-stage').click();
  assert.match(page.url(), /#stages\/stage-original-sengoku-02$/);
  await page.locator('#stage-dialog').getByRole('button', {name: '關閉'}).click();
  assert.deepEqual((await state(page)).extremeStageClears, {'stage-drama-40': true});

  await upload(page, '{synthetic-damaged');
  await waitText(page.locator('#backup-status'), 'JSON 無法解析');
  const envelope = await download(page, '#export');
  const original = envelope.records.find(record => record.key === 'progress').value;
  assert.ok(envelope.records.some(record => record.value.sourceRaw === '{synthetic-damaged'));
  assert.equal(Object.keys(envelope.syncState).length, 0);
  await upload(page, {...original, gameId: 'ball-x-pit'});
  await waitText(page.locator('#backup-status'), '遊戲識別不符');
  assert.deepEqual(await state(page), original);

  // 模擬本機原文 archive 寫入失敗。
  await page.evaluate(() => {
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function(value, key) {
      if (String(key).includes('.import.raw.')) throw new DOMException('synthetic archive failure', 'QuotaExceededError');
      return put.call(this, value, key);
    };
    window.restorePut = () => { IDBObjectStore.prototype.put = put; };
  });
  await upload(page, original);
  await waitText(page.locator('#backup-status'), 'synthetic archive failure');
  assert.equal(await page.locator('#import-dialog').isVisible(), false);
  assert.deepEqual(await state(page), original);
  await page.evaluate(() => window.restorePut());

  const incoming = structuredClone(original);
  incoming.proficiencyByCharacter['char-01'] = 31;
  incoming.collectedMaterials['material-30'] = true;
  incoming.future = {note: 'synthetic-unknown'};
  await upload(page, incoming);
  await waitText(page.locator('#import-summary'), '1 筆雙端差異');
  assert.equal(await page.locator('#import-apply').isDisabled(), true);
  await page.locator('#import-source').click();
  // 模擬 Blob 下載建立失敗，確認即使選完差異也不能套用。
  await page.evaluate(() => {
    window.originalObjectURL = URL.createObjectURL;
    URL.createObjectURL = () => { throw Error('synthetic download failure'); };
  });
  await page.locator('#import-download').click();
  await waitText(page.locator('#import-status'), '下載備份失敗');
  assert.equal(await page.locator('#import-ack').isDisabled(), true);
  assert.equal(await page.locator('#import-apply').isDisabled(), true);
  await page.evaluate(() => { URL.createObjectURL = window.originalObjectURL; });
  const recovery = await download(page, '#import-download');
  assert.deepEqual(JSON.parse(recovery.recoveryBundle.sourceRaw), incoming);
  assert.deepEqual(JSON.parse(recovery.recoveryBundle.localRaw), original);
  await page.locator('#import-ack').check();

  const second = await context.newPage();
  attach(second);
  await go(second, '#materials/material-02');
  await second.locator('#material-02 input').check();
  await expectStat(second, '鍊成素材', '2 / 30');
  await waitText(page.locator('#import-status'), '預覽已過期');
  assert.equal(await page.locator('#import-apply').isDisabled(), true);
  await page.getByRole('button', {name: '取消', exact: true}).click();
  await upload(page, incoming);
  await waitText(page.locator('#import-summary'), '1 筆雙端差異');
  await page.locator('#import-source').click();
  await download(page, '#import-download');
  await page.locator('#import-ack').check();
  await page.locator('#import-apply').click();
  await waitText(page.locator('#message'), '已套用');
  const restored = await state(page);
  assert.deepEqual(restored.future, {note: 'synthetic-unknown'});
  assert.equal(restored.proficiencyByCharacter['char-01'], 31);
  assert.equal(restored.collectedMaterials['material-02'], true);
  assert.equal(restored.collectedMaterials['material-30'], true);
  assert.equal(restored.extremeStageClears['stage-drama-40'], true);
  await expectStat(second, '鍊成素材', '3 / 30');

  // 靜默變更模擬來不及收到跨分頁通知，交易內仍須拒絕過期預覽。
  await upload(page, {...restored, proficiencyByCharacter: {'char-01': 32}});
  await waitText(page.locator('#import-summary'), '1 筆雙端差異');
  await page.locator('#import-source').click();
  await download(page, '#import-download');
  await page.locator('#import-ack').check();
  await second.evaluate(() => new Promise((resolve, reject) => {
    const open = indexedDB.open('game-companion.musou-orochi-z.progress.v1');
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const db = open.result;
      const transaction = db.transaction('records', 'readwrite');
      const records = transaction.objectStore('records');
      const request = records.get('progress');
      request.onsuccess = () => {
        const value = request.result;
        value.revision++;
        value.proficiencyByCharacter['char-01'] = 33;
        records.put(value, 'progress');
      };
      transaction.oncomplete = () => { db.close(); resolve(); };
      transaction.onabort = () => { db.close(); reject(transaction.error); };
    };
  }));
  await page.locator('#import-apply').click();
  await waitText(page.locator('#import-status'), '預覽已過期');
  assert.equal((await state(page)).proficiencyByCharacter['char-01'], 33);
  await page.getByRole('button', {name: '取消', exact: true}).click();
  await second.close();

  const isolation = await page.evaluate(() => new Promise(resolve => {
    const open = indexedDB.open('game-companion.ball-x-pit.progress.v1');
    open.onsuccess = () => {
      const db = open.result;
      const request = db.transaction('records').objectStore('records').get('progress');
      request.onsuccess = () => {
        db.close();
        resolve([localStorage.getItem('game-companion.ball-x-pit.synthetic'), localStorage.getItem('edfwb-checklist'), request.result.sentinel]);
      };
    };
  }));
  assert.deepEqual(isolation, ['keep', 'legacy-synthetic', 'keep']);
  assert.equal(await page.evaluate(async () => (await navigator.serviceWorker.getRegistrations()).length), 0);
  assert.deepEqual(remote, []);
  assert.deepEqual(errors, []);

  const screenshots = process.env.OROCHI_SCREENSHOTS;
  if (screenshots) {
    await fs.mkdir(screenshots, {recursive: true});
    await go(page, '#characters');
    await page.screenshot({path: screenshots + '/desktop.png'});
    await go(page, '#stages');
    await page.screenshot({path: screenshots + '/desktop-stages.png'});
    await go(page, '#materials');
    await page.screenshot({path: screenshots + '/desktop-materials.png'});
    await page.setViewportSize({width: 768, height: 1024});
    await go(page, '#skills');
    await page.locator('#skill-health summary').click();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({path: screenshots + '/tablet-skills.png'});
  }
  const mobile = await browser.newContext({viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true});
  const phone = await mobile.newPage();
  attach(phone);
  for (const tab of ['characters', 'stages', 'skills', 'materials', 'sources']) {
    await go(phone, '#' + tab);
    assert.ok(await phone.evaluate(() => document.documentElement.scrollWidth <= innerWidth), tab);
  }
  await go(phone, '#characters');
  assert.equal(await phone.locator('.character-grid').first().evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length), 1);
  await faction(phone, '蜀').tap();
  assert.equal(await phone.locator('.character:visible').count(), 13);
  await faction(phone, '全部').tap();
  assert.equal(await phone.locator('.character:visible').count(), 96);
  await phone.locator('#char-01').getByRole('checkbox', {name: '趙雲 Lv.2 武器'}).tap();
  await expectStat(phone, '武器合計', '1 / 288');
  assert.equal((await state(page)).weaponsByCharacter['char-01'].lv2, false);
  const phoneSlider = phone.locator('#char-01 input[type=range]');
  const phoneTrack = phone.locator('#char-01 .proficiency-track');
  await phone.locator('#char-01').getByRole('button', {name: '趙雲 熟練度 20', exact: true}).tap();
  assert.equal(await phoneSlider.inputValue(), '20');
  assert.equal((await state(phone)).proficiencyByCharacter['char-01'], 20);
  await phone.reload();
  await ready(phone);
  assert.equal(await phoneSlider.inputValue(), '20');
  assert.equal((await state(phone)).proficiencyByCharacter['char-01'], 20);
  await phoneTrack.scrollIntoViewIfNeeded();
  const touchBounds = await phoneTrack.boundingBox();
  const touchX = value => 8 + (touchBounds.width - 16) * value / 50;
  const touchY = touchBounds.height / 2;
  const touch = await mobile.newCDPSession(phone);
  const touchPoint = value => [{x: touchBounds.x + touchX(value), y: touchBounds.y + touchY}];
  await touch.send('Input.dispatchTouchEvent', {type: 'touchStart', touchPoints: touchPoint(20)});
  await touch.send('Input.dispatchTouchEvent', {type: 'touchMove', touchPoints: touchPoint(24.5)});
  assert.equal(await phoneSlider.inputValue(), '25');
  await touch.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
  await expectStat(phone, '一般武將壁紙', '94 / 744');
  assert.equal((await state(phone)).proficiencyByCharacter['char-01'], 25);
  if (screenshots) {
    await phone.evaluate(() => window.scrollTo(0, 0));
    await phone.screenshot({path: screenshots + '/mobile.png'});
    await go(phone, '#stages');
    await phone.screenshot({path: screenshots + '/mobile-stages.png'});
    await go(phone, '#materials');
    await phone.screenshot({path: screenshots + '/mobile-materials.png'});
  }
  await mobile.close();
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({passed: true, characters: 96, stages: 140, skills: 18, materials: 30,
    tested: ['filters', 'keyboard and touch', 'derived counts', 'cross-links', 'reload', 'bulk undo', 'import archive',
      'failed archive and download', 'expired preview', 'unknown fields', 'cross-tab updates', 'storage isolation']}));
} finally {
  await browser.close();
}
