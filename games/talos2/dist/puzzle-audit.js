// 文字初篩與逐步來源覆核分開；這不是實機驗收清單，也不參與玩家進度。
export const auditDate='2026-11-08';
export const textScreenedIds=[
 // BOOT
 ..."BOOT-1 BOOT-2 BOOT-3 BOOT-arranger-Green BOOT-4 BOOT-5 BOOT-6 BOOT-7 BOOT-arranger-Yellow BOOT-8 BOOT-9 BOOT-10 BOOT-11 BOOT-12 BOOT-arranger-Red".split(' '),
 // E1
 ..."E1-main-1 E1-main-2 E1-main-3 E1-main-4 E1-main-5 E1-main-6 E1-main-7 E1-main-8 E1-lost-1 E1-lost-2 E1-bridge E1-star-prometheus E1-star-pandora E1-gold-1".split(' '),
 // E2
 ..."E2-main-1 E2-main-2 E2-main-3 E2-main-4 E2-main-5 E2-main-6 E2-main-7 E2-main-8 E2-lost-1 E2-lost-2 E2-bridge E2-star-sphinx E2-star-pandora E2-gold-1".split(' '),
 // E3
 ..."E3-main-1 E3-main-2 E3-main-3 E3-main-4 E3-main-5 E3-main-6 E3-main-7 E3-main-8 E3-lost-1 E3-lost-2 E3-bridge E3-star-sphinx E3-star-pandora E3-gold-1".split(' '),
 // N1
 ..."N1-main-1 N1-main-2 N1-main-3 N1-main-4 N1-main-5 N1-main-6 N1-main-7 N1-main-8 N1-lost-1 N1-lost-2 N1-bridge N1-star-sphinx N1-star-prometheus N1-gold-1".split(' '),
 // N2
 ..."N2-main-1 N2-main-2 N2-main-3 N2-main-4 N2-main-5 N2-main-6 N2-main-7 N2-main-8 N2-lost-1 N2-lost-2 N2-bridge N2-star-sphinx N2-star-prometheus N2-gold-1".split(' '),
 // N3
 ..."N3-main-1 N3-main-2 N3-main-3 N3-main-4 N3-main-5 N3-main-6 N3-main-7 N3-main-8 N3-lost-1 N3-lost-2 N3-bridge N3-star-pandora N3-star-prometheus N3-gold-1".split(' '),
 // S1
 ..."S1-main-1 S1-main-2 S1-main-3 S1-main-4 S1-main-5 S1-main-6 S1-main-7 S1-main-8 S1-lost-1 S1-lost-2 S1-bridge S1-star-sphinx S1-star-pandora S1-gold-1".split(' '),
 // S2
 ..."S2-main-1 S2-main-2 S2-main-3 S2-main-4 S2-main-5 S2-main-6 S2-main-7 S2-main-8 S2-lost-1 S2-lost-2 S2-bridge S2-star-pandora S2-star-prometheus S2-gold-1".split(' '),
 // S3
 ..."S3-main-1 S3-main-2 S3-main-3 S3-main-4 S3-main-5 S3-main-6 S3-main-7 S3-main-8 S3-lost-1 S3-lost-2 S3-bridge S3-star-sphinx S3-star-pandora S3-gold-1".split(' '),
 // W1
 ..."W1-main-1 W1-main-2 W1-main-3 W1-main-4 W1-main-5 W1-main-6 W1-main-7 W1-main-8 W1-lost-1 W1-lost-2 W1-bridge W1-star-prometheus W1-star-sphinx W1-gold-1".split(' '),
 // W2
 ..."W2-main-1 W2-main-2 W2-main-3 W2-main-4 W2-main-5 W2-main-6 W2-main-7 W2-main-8 W2-lost-1 W2-lost-2 W2-bridge W2-star-pandora W2-star-prometheus W2-gold-1".split(' '),
 // W3
 ..."W3-main-1 W3-main-2 W3-main-3 W3-main-4 W3-main-5 W3-main-6 W3-main-7 W3-main-8 W3-lost-1 W3-lost-2 W3-bridge W3-star-sphinx W3-star-prometheus W3-gold-1".split(' '),
 // STORY
 ..."MEGA-E-green MEGA-E-red MEGA-E-blue MEGA-N-blue MEGA-N-green MEGA-S-pins MIRANDA FINAL-gate FINAL-u1 FINAL-d1 FINAL-d2 FINAL-d3 FINAL-u3 FINAL-d4 FINAL-u2 FINAL-u4 TEXT-goldboom TEXT-atlantis TEXT-argument MUSEUM-exercise".split(' '),
 // MUSEUM
 ..."MUSEUM-ruins MUSEUM-death MUSEUM-faith MUSEUM-arranger-1 MUSEUM-arranger-2 MUSEUM-arranger-3 MUSEUM-arranger-4 MUSEUM-arranger-5 MUSEUM-arranger-6".split(' '),
];
export const sourceComparedIds=[
 "E1-main-8",
 "E2-main-3",
 "E3-main-3",
 "E3-main-6",
 "E3-main-8",
 "N2-main-3",
 "N2-main-6",
 "N2-main-7",
 "N2-main-8",
 "N2-lost-1",
 "N3-main-8",
 "S1-main-3",
 "S1-main-6",
 "S1-lost-1",
 "S2-main-6",
 "S3-main-8",
 "W1-main-8",
 "W2-main-1",
 "W2-main-8",
 "W3-main-6",
 "FINAL-gate",
 "FINAL-u1",
 "FINAL-d1",
 "FINAL-d2",
 "FINAL-d3",
 "FINAL-d4",
 "FINAL-u2",
 "FINAL-u3",
 "FINAL-u4"
];
export const correctedFindings={
 "E3-main-6": "紫屏兩側應沿走廊／藍門繞行；不能把「另一側」當作抱設備穿紫屏。",
 "N2-main-3": "補上分兩趟取回蓄能器與方塊、換色前由內側干擾器接手開門。",
 "N2-main-8": "補上兩座風扇壓板、送出設備後重新開門、轉牆接收器與最後換壓順序。",
 "S1-main-3": "補上兩台傳送器逐一隔孔回收，以及留戶外中繼搬運鑽孔器；改鑽後牆洞會消失。",
 "S1-main-6": "補上三壓板的換物順序、先擺終點傳送器再用方塊上對岸壓板。",
 "S1-lost-1": "舊五句省略扇葉進出藍門與兩個方塊的取回，已按同一作者路線分開搬運。",
 "FINAL-d3": "原摘要把輪盤啟動寫在綠光開門之前；已把綠光、遞連接器與兩身體會合補回本段。",
 "FINAL-d4": "綠光開門改在前一段完成，本段只接續雙身體與托盤疊高，避免輪盤順序混接。",
 "FINAL-u4": "原摘要重複要求 RGB 換反相器，與已完成 Utopia 2／3 的設備狀態矛盾；此段只須移動保留藍光連線的啟動器。"
};
const screened=new Set(textScreenedIds),compared=new Set(sourceComparedIds);
export const puzzleReviewLevel=id=>compared.has(id)?'source_compared':screened.has(id)?'text_screened':'not_reviewed';
export function puzzleReviewCounts(puzzles){return {total:puzzles.length,textScreened:puzzles.filter(p=>screened.has(p.id)).length,sourceCompared:puzzles.filter(p=>compared.has(p.id)).length,pending:puzzles.filter(p=>!compared.has(p.id)).length};}
