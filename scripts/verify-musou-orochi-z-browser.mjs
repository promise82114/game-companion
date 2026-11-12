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
  if (new URL(route.request().url()).origin === new URL(base).origin) return route.continue();
  remote.push(route.request().url());
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
const stat = (p, label) => p.locator('#stats > div').filter({has: p.getByText(label, {exact: true})}).locator('strong');
const expectStat = async (p, label, value) => {
  await p.waitForFunction(({label, value}) => [...document.querySelectorAll('#stats > div')].some(row =>
    row.querySelector('span').textContent === label && row.querySelector('strong').textContent === value), {label, value});
  assert.equal(await stat(p, label).textContent(), value);
};
const filter = (p, key) => p.locator('[data-filter="' + key + '"]');

try {
  const portal = await page.goto(base);
  assert.equal(portal.status(), 200);
  assert.equal(await page.locator('.game[data-kind=checklist] .open-game[href="games/musou-orochi-z/"]').count(), 1);
  await page.locator('.open-game[href="games/musou-orochi-z/"]').click();
  await ready(page);
  assert.equal(await page.locator('.character').count(), 96);
  assert.equal(await page.locator('[data-level]').count(), 288);
  assert.equal(await page.locator('[data-group="learnedCharacterSkills"]').count(), 325);
  await expectStat(page, '一般武將壁紙', '0 / 744');
  const pristine = await state(page);

  await page.evaluate(() => new Promise((resolve, reject) => {
    localStorage.setItem('game-companion.ball-x-pit.synthetic', 'keep');
    localStorage.setItem('edfwb-checklist', 'legacy-synthetic');
    const request = indexedDB.open('game-companion.ball-x-pit.progress.v1', 1);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => request.result.createObjectStore('records').put({sentinel: 'keep'}, 'progress');
    request.onsuccess = () => { request.result.close(); resolve(); };
  }));

  await filter(page, 'faction').selectOption('魏');
  assert.equal(await page.locator('.character:visible').count(), 13);
  await filter(page, 'query').fill('張コウ');
  assert.equal(await page.locator('.character:visible strong').textContent(), '張郃');
  assert.deepEqual(await state(page), pristine);

  await go(page, '#characters/char-01');
  const character = page.locator('#char-01');
  const number = character.locator('input[type=number]');
  const slider = character.locator('input[type=range]');
  await number.fill('20');
  assert.equal(await slider.inputValue(), '20');
  assert.match(await character.locator('.costume').textContent(), /4 套/);
  await number.press('Tab');
  await page.waitForFunction(() => document.querySelector('#char-01 .row-meta').textContent.includes('熟練度 20'));
  await expectStat(page, '一般武將壁紙', '0 / 744');
  await slider.press('ArrowLeft');
  await page.waitForFunction(() => document.querySelector('#char-01 .row-meta').textContent.includes('熟練度 19'));
  assert.equal(await number.inputValue(), '19');
  assert.match(await character.locator('.costume').textContent(), /3 套/);
  await number.fill('');
  assert.equal(await slider.inputValue(), '19');
  await number.fill('51');
  await number.press('Tab');
  await waitText(page.locator('#message'), '0–50');
  assert.equal(await number.inputValue(), '19');

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

  await character.getByRole('checkbox', {name: '趙雲 體力增加'}).check();
  await expectStat(page, '武將特技', '1 / 325');
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
  await character.getByRole('checkbox', {name: '趙雲 已可操作'}).check();
  await expectStat(page, '一般武將壁紙', '2 / 744');
  await number.fill('50');
  await number.press('Tab');
  await expectStat(page, '一般武將壁紙', '8 / 744');
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
  await filter(page, 'mode').selectOption('drama');
  assert.equal(await page.locator('.record:visible').count(), 40);
  await filter(page, 'query').fill('古志城');
  await page.locator('#stage-drama-40 summary').click();
  await waitText(page.locator('#stage-drama-40 .pending'), '待查');
  await page.locator('#stage-drama-40 input').check();
  await expectStat(page, '激難通關', '1 / 140');
  await filter(page, 'status').selectOption('incomplete');
  assert.equal(await page.locator('.record:visible').count(), 0);
  await go(page, '#stages/stage-original-sengoku-02');
  await page.getByRole('link', {name: '黑曜石', exact: true}).click();
  const obsidian = page.locator('#material-01');
  await waitText(obsidian.locator('.row-detail'), '5 分鐘');
  await obsidian.getByRole('checkbox').check();
  await expectStat(page, '鍊成素材', '1 / 30');
  await expectStat(page, '激難通關', '1 / 140');
  await filter(page, 'status').selectOption('incomplete');
  assert.equal(await page.locator('.record:visible').count(), 29);
  await go(page, '#materials');
  await go(page, '#materials/material-01');
  await obsidian.getByRole('link', {name: '查看出處關卡'}).click();
  assert.match(page.url(), /#stages\/stage-original-sengoku-02$/);
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
  await phone.locator('#char-01').getByText('Lv.2', {exact: true}).tap();
  await expectStat(phone, '武器合計', '1 / 288');
  assert.equal((await state(page)).weaponsByCharacter['char-01'].lv2, false);
  if (screenshots) {
    await phone.evaluate(() => window.scrollTo(0, 0));
    await phone.screenshot({path: screenshots + '/mobile.png'});
  }
  await mobile.close();
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({passed: true, characters: 96, stages: 140, skills: 18, materials: 30,
    tested: ['filters', 'keyboard and touch', 'derived counts', 'cross-links', 'reload', 'bulk undo', 'import archive',
      'failed archive and download', 'expired preview', 'unknown fields', 'cross-tab updates', 'storage isolation']}));
} finally {
  await browser.close();
}
