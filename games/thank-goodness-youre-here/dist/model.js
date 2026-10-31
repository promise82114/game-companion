(function (global) {
  'use strict';
  const gameId = 'thank-goodness-youre-here', prefix = 'game-companion.' + gameId + '.';
  const clone = value => JSON.parse(JSON.stringify(value));
  const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  function fresh() {
    return {app: 'game-companion-roadmap', gameId, platform: 'PS5', scope: 'base', schema: 1, moduleVersion: '1.0.0', revision: 0, updatedAt: Date.now(), stepDone: {}, trophyEarned: {}};
  }
  function validate(raw) {
    if (!object(raw) || raw.app !== 'game-companion-roadmap' || raw.gameId !== gameId || raw.platform !== 'PS5' || raw.scope !== 'base' || raw.schema !== 1) throw Error('不是此遊戲的 PS5 本體進度，或資料版本不相容。');
    for (const group of ['stepDone', 'trophyEarned']) {
      if (!object(raw[group]) || Object.values(raw[group]).some(value => typeof value !== 'boolean')) throw Error('步驟與獎盃進度必須分別為布林值。');
    }
    if (!Number.isSafeInteger(raw.revision) || raw.revision < 0 || !Number.isFinite(raw.updatedAt)) throw Error('進度修訂格式不正確。');
    return {data: clone(raw)};
  }
  function parse(raw, recoverySide = 'localRaw') {
    if (new TextEncoder().encode(raw).length > 5 * 1024 * 1024) throw Error('備份超過 5 MiB，已停止。');
    const value = JSON.parse(raw);
    if (value.kind === 'recoveryBundle' && value.gameId === gameId && ['localRaw', 'sourceRaw'].includes(recoverySide)) return parse(value[recoverySide]);
    if (value.projectId !== undefined) return global.SideProjectProgress.unpack(value, prefix.slice(0, -1), validate).data;
    return validate(value).data;
  }
  function importPlan(local, source) {
    const core = global.SideProjectSync, plan = core.merge(null, local, source, {hasBase: false});
    // A missing import field is not a deletion instruction. Retain one-sided fields
    // automatically; require choices only for explicit values present at both ends.
    const data = core.resolve(plan, plan.conflicts.map(conflict => conflict.local === undefined ? 'remote' : 'local'));
    return {...plan, data, conflicts: plan.conflicts.filter(conflict => conflict.local !== undefined && conflict.remote !== undefined)};
  }
  class ProgressStore {
    constructor() { this.db = null; this.data = null; this.channel = null; }
    async open() {
      this.db = await new Promise((resolve, reject) => {
        const request = indexedDB.open(prefix + 'progress.v1', 1);
        request.onupgradeneeded = () => { request.result.createObjectStore('state'); request.result.createObjectStore('archives', {autoIncrement: true}); };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
        request.onblocked = () => reject(Error('IndexedDB 升級被其他分頁阻擋，請關閉此遊戲的其他分頁後重試。'));
      });
      this.db.onversionchange = () => this.db.close();
      await this.transact(current => current || fresh());
      this.channel = new BroadcastChannel(prefix + 'progress');
      this.channel.onmessage = () => this.refresh().then(() => this.notify()).catch(error => global.dispatchEvent(new CustomEvent('roadmap-error', {detail: error.message})));
      return this;
    }
    async refresh() {
      this.data = await new Promise((resolve, reject) => {
        const tx = this.db.transaction('state'), req = tx.objectStore('state').get('progress');
        req.onsuccess = () => { try { resolve(validate(req.result).data); } catch (error) { reject(error); } };
        req.onerror = () => reject(req.error);
      });
      return this.get();
    }
    get() { return clone(this.data); }
    stamp() { return JSON.stringify(this.data); }
    sequence() { return this.data.revision; }
    validate(raw) { return validate(raw); }
    notify() { global.dispatchEvent(new Event('roadmap-progress-change')); }
    async transact(change, archive) {
      const saved = await new Promise((resolve, reject) => {
        const tx = this.db.transaction(['state', 'archives'], 'readwrite'), store = tx.objectStore('state'), request = store.get('progress');
        let result, failure;
        request.onsuccess = () => {
          try {
            const current = request.result === undefined ? null : validate(request.result).data;
            result = validate(change(current)).data;
            if (archive) tx.objectStore('archives').add(archive(current));
            store.put(result, 'progress');
          } catch (error) { failure = error; tx.abort(); }
        };
        tx.oncomplete = () => resolve(result);
        tx.onabort = () => reject(failure || tx.error || Error('儲存失敗，未套用變更。'));
        tx.onerror = () => {};
      });
      this.data = saved; this.channel?.postMessage('changed'); this.notify(); return this.get();
    }
    async toggle(group, id, value) {
      if (!['stepDone', 'trophyEarned'].includes(group) || typeof value !== 'boolean') throw Error('未知進度欄位。');
      return this.transact(current => ({...current, [group]: {...current[group], [id]: value}, revision: current.revision + 1, updatedAt: Date.now()}));
    }
    async checkpoint(kind) {
      await new Promise((resolve, reject) => {
        const tx = this.db.transaction(['state', 'archives'], 'readwrite'), req = tx.objectStore('state').get('progress');
        req.onsuccess = () => tx.objectStore('archives').add({kind, at: Date.now(), localRaw: JSON.stringify(req.result)});
        tx.oncomplete = resolve; tx.onabort = () => reject(tx.error || Error('備份儲存失敗。')); tx.onerror = () => {};
      });
    }
    async archive(value) {
      await new Promise((resolve, reject) => { const tx = this.db.transaction('archives', 'readwrite'); tx.objectStore('archives').add(value); tx.oncomplete = resolve; tx.onabort = () => reject(tx.error); tx.onerror = () => {}; });
    }
    async archives() {
      return new Promise((resolve, reject) => { const req = this.db.transaction('archives').objectStore('archives').getAll(); req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error); });
    }
    async exportData() {
      await this.refresh();
      // Archives do not recursively contain earlier archives; unknown imported fields remain in state.
      return {...this.get(), recoveryArchives: await this.archives(), syncRecovery: Object.fromEntries(Object.keys(localStorage).filter(key => key.startsWith(prefix + 'sync.')).map(key => [key, localStorage.getItem(key)]))};
    }
    async applyImport(review) {
      return this.transact(current => {
        if (JSON.stringify(current) !== review.stamp) throw Error('預覽已過期，請重新匯入比較。');
        if (!review.downloaded || !review.acknowledged) throw Error('必須先下載備份並確認保存。');
        const result = global.SideProjectSync.resolve(review.plan, review.choices);
        return {...validate(result).data, revision: current.revision + 1, updatedAt: Date.now()};
      }, current => ({kind: 'import', at: Date.now(), sourceRaw: review.sourceRaw, localRaw: JSON.stringify(current)}));
    }
    async commitSync(start, remote) {
      return this.transact(current => ({...validate(global.SideProjectSync.rebase(start, current, remote)).data, revision: current.revision + 1, updatedAt: Date.now()}));
    }
  }
  global.RoadmapModel = {gameId, prefix, fresh, validate, parse, importPlan, ProgressStore};
})(window);
