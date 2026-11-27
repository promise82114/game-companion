const {createChineseFirst,prioritizeBilingual}=await import(new URL(import.meta.url.includes('/dist/')?'../../../shared/chinese-first.js':'../../shared/chinese-first.js',import.meta.url));
const cf=createChineseFirst({planner:'配裝模擬',unlocks:'隱藏解鎖',recommendations:'分級搭配',collection:'收集清單',library:'裝備資料庫'});
export const nameHtml=cf.name;
export function chineseView(root){prioritizeBilingual(root);cf.decorate(root);}
