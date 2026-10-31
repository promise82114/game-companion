// Mycopunk 專用匯入；只讀寫這個模組的新 namespace，不操作舊站 Key。
import { storageKey, beforeImportKey, importPrefix, backupTimeKey, gameId, moduleVersion, maxBackupBytes, parseCollection, makeBackup } from './model.js';

export function createImportReview({getContext, onCommit, getDataset, download}) {
  const $ = id => document.getElementById(id);
  let pending = null, generation = 0;
  const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const clone = value => JSON.parse(JSON.stringify(value));

  function ready() {
    $('apply-import').disabled = !pending || !pending.downloaded || !$('import-ack').checked || pending.rows.some(row => !row.choice);
  }
  function cancel() { generation++; pending = null; ready(); }
  function withRecovery(backup) {
    const archives = [...(Array.isArray(backup.recoveryArchives) ? backup.recoveryArchives : [])];
    for (const record of backup.importHistory || []) {
      if (typeof record?.archiveKey !== 'string' || !record.archiveKey.startsWith(importPrefix)) continue;
      const raw = localStorage.getItem(record.archiveKey);
      if (raw === null) throw new Error('匯入原文紀錄缺少，請保留先前下載的復原備份。');
      archives.push(JSON.parse(raw));
    }
    return {...backup, recoveryArchives: archives};
  }
  async function preview(file) {
    cancel();
    if (!file) return;
    const token = generation;
    if (file.size > maxBackupBytes) throw new Error('檔案超過 10 MB，已停止匯入。');
    const sourceRaw = await file.text();
    if (token !== generation) return;
    const source = parseCollection(sourceRaw), context = getContext();
    const raw = localStorage.getItem(storageKey), memoryRaw = JSON.stringify(context.current);
    const archiveKey = importPrefix + crypto.randomUUID();
    const archive = {gameId, createdAt: new Date().toISOString(), label: file.name, sourceRaw, localRaw: raw, memoryRaw: raw === memoryRaw ? null : memoryRaw};
    const archiveRaw = JSON.stringify(archive);
    // 兩端原文未成功保存，便不顯示可套用的預覽。
    localStorage.setItem(archiveKey, archiveRaw);
    const rows = [];
    for (const id of new Set([...Object.keys(context.current.records), ...Object.keys(source.records)])) {
      const local = context.current.records[id], incoming = source.records[id];
      if (!equal(local, incoming)) rows.push({id, local, incoming, choice: incoming === undefined ? 'local' : ''});
    }
    pending = {source, current: clone(context.current), raw, memoryRaw, archive, archiveKey, archiveRaw, rows, downloaded: false};
    $('import-preview').replaceChildren();
    const summary = document.createElement('p');
    const unknown = Object.keys(source.records).filter(id => !getDataset().upgrades.some(item => item.id === id)).length;
    summary.textContent = `${file.name}：${rows.length} 筆差異；${unknown} 個未對應項目。來源未列出的本機紀錄保留，時間較舊的來源也可明確選用。`;
    const note = document.createElement('p');
    note.textContent = '未知欄位保留；同名頂層欄位以本機為準，碰撞的兩端原文完整存於匯入紀錄及復原備份。';
    const scroll = document.createElement('div');scroll.className = 'migration-scroll';
    const table = document.createElement('table'), head = document.createElement('thead'), heading = document.createElement('tr');
    for (const name of ['項目', '目前本機', '匯入來源', '選擇']) {const th = document.createElement('th');th.textContent = name;heading.append(th);}
    head.append(heading);table.append(head);
    const body = document.createElement('tbody');body.id = 'import-rows';
    const describe = record => record === undefined ? '未記錄（保留本機）' : JSON.stringify(record, null, 2);
    for (const row of rows) {
      const tr = document.createElement('tr');
      const item = getDataset().upgrades.find(item => item.id === row.id);
      for (const text of [item ? `${item.nameEn} / ${item.nameZh}` : row.id + '（未對應項目）', describe(row.local), describe(row.incoming)]) {const td = document.createElement('td');td.textContent = text;tr.append(td);}
      const td = document.createElement('td'), select = document.createElement('select');select.dataset.importId = row.id;select.setAttribute('aria-label', '選擇 '+row.id);
      for (const [value, name] of [['', '請選擇'], ['local', '保留本機'], ['source', '使用來源']]) select.add(new Option(name, value));
      select.value = row.choice;select.disabled = row.incoming === undefined;
      select.addEventListener('change', () => {row.choice = select.value;ready();});td.append(select);tr.append(td);body.append(tr);
    }
    table.append(body);scroll.append(table);$('import-preview').append(summary, note, scroll);
    $('import-ack').checked = false;$('import-ack').disabled = true;
    $('import-feedback').textContent = '兩端原文已獨立保存；請選擇差異並下載復原備份。';
    ready();$('import-dialog').showModal();
  }
  function choose(choice) {
    if (!pending) return;
    for (const row of pending.rows) if (row.incoming !== undefined) row.choice = choice;
    for (const select of $('import-preview').querySelectorAll('select:not(:disabled)')) select.value = choice;
    ready();
  }
  function downloadBackup() {
    if (!pending) return;
    pending.downloaded = false;$('import-ack').checked = false;$('import-ack').disabled = true;ready();
    try {
      const backup = withRecovery(makeBackup(pending.current, getDataset().datasetVersion));
      download(JSON.stringify({...backup, recoveryBundle: pending.archive}, null, 2), 'game-companion.mycopunk.recovery.json');
      localStorage.setItem(backupTimeKey, new Date().toISOString());
      pending.downloaded = true;$('import-ack').disabled = false;
      $('import-feedback').textContent = '已送出下載；請確認檔案已保存，再勾選確認。';
    } catch (error) {$('import-feedback').textContent = '備份失敗，已停止匯入：'+error.message;}
    ready();
  }
  function apply() {
    if (!pending || $('apply-import').disabled) return;
    try {
      const context = getContext();
      if (localStorage.getItem(storageKey) !== pending.raw || JSON.stringify(context.current) !== pending.memoryRaw) throw new Error('預覽已過期，進度有新變更；請重新選檔比較。');
      if (localStorage.getItem(pending.archiveKey) !== pending.archiveRaw) throw new Error('兩端原文備份已變更或遺失；請重新選檔比較。');
      const next = {...pending.source, ...pending.current, gameId, moduleVersion, records: {...pending.current.records}};
      const now = new Date(Math.max(Date.now(), ...Object.values(next.records).map(record => Date.parse(record.updatedAt) || 0))+1).toISOString();
      for (const row of pending.rows) if (row.choice === 'source' && row.incoming !== undefined) Object.defineProperty(next.records, row.id, {value: {...clone(row.incoming), updatedAt: now}, enumerable: true, writable: true, configurable: true});
      next.importHistory = [...(Array.isArray(pending.current.importHistory) ? pending.current.importHistory : []), {archiveKey: pending.archiveKey, createdAt: pending.archive.createdAt}];
      next.revision = Math.max(pending.current.revision ?? 0, pending.source.revision ?? 0)+1;
      const text = JSON.stringify(next);
      // 下一次必須仍可讀／匯出；歷史或未知資料太大時停止，不清理玩家資料。
      parseCollection(text);
      localStorage.setItem(beforeImportKey, JSON.stringify({createdAt: pending.archive.createdAt, raw: pending.raw, archiveKey: pending.archiveKey}));
      localStorage.setItem(storageKey, text);
      onCommit(next, text);pending = null;$('import-dialog').close();
    } catch (error) {
      if (pending) pending.downloaded = false;$('import-ack').checked = false;$('import-ack').disabled = true;
      $('import-feedback').textContent = error.message;ready();
    }
  }
  $('import-local').addEventListener('click', () => choose('local'));
  $('import-source').addEventListener('click', () => choose('source'));
  $('import-backup').addEventListener('click', downloadBackup);
  $('import-ack').addEventListener('change', ready);
  return {preview, apply, cancel, withRecovery};
}
