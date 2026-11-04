// 單一共用交易實作；source checkout 與 Pages artifact 的 dist 層級不同。
const sourcePath=import.meta.url.includes('/dist/')?'../../../../shared/roadmap-store.js':'../../../shared/roadmap-store.js';
export const {createStore}=await import(new URL(sourcePath,import.meta.url));
