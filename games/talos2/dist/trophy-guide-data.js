// 2026-11-04 以 Exophase 相同連結 ID 核對繁中獎盃說明。描述原文與自有攻略摘要分開。
export const trophyConditionSource={checkedAt:'2026-11-04',url:'https://www.exophase.com/game/the-talos-principle-2-psn/trophies/zh-TW/'};
const descriptions=[
 '解鎖全部獎盃','完成校準程序。','展開探險。','參與幕後工作。','經歷資料串流超載。',
 '啟動草原環的高塔。','啟動高原樹林的高塔。','啟動東部濕地的高塔。','啟動荒島的高塔。','啟動被淹沒的山谷的高塔。','啟動消失的沼澤的高塔。','啟動南海岸的高塔。','啟動青翠峽谷的高塔。','啟動圓形綠洲的高塔。','啟動西三角洲的高塔。','啟動人造山丘的高塔。','啟動高地平原的高塔。',
 '進入巨構體。','解開普羅米修斯的鎖鍊。','做出會決定未來的選擇。','超越自我以改變未來。','解開所有標準謎題。','抵抗死亡。','解決所有謎題和紀念碑。','探索新耶路撒冷全貌。','探訪新耶路撒冷的擬界博物館。','探索擬界博物館全貌。','探索失落終端上的內容。','探索所有失落的實驗室。','找到一個普羅米修斯火花。','找到 1 個古代人類文物。','解決一個普羅米修斯紀念碑。','解決一個潘朵拉紀念碑。','解決一個斯芬克斯紀念碑。','發現一個未來的預象。','發現島上過往事件的線索。','不使用「保持連線」選項解決「驟變」。','不用繞好幾圈就解決「迴圈」。','只撿起一個連接器就解決「蹺蹺板」謎題。','解一道謎超過 20 分鐘。','回到謎題進行第二次嘗試。','在不打斷追逐火花的音樂的情況下啟動普羅米修斯紀念碑。','建好一座橋樑。','與你團隊裡的每個成員交談。','閱讀 10 條社群媒體條目。','收集崔佛的全部 12 個音檔。','收集利弗瑞瑟的全部 12 個音檔。','使用運作中的索諾卓姆。','幫助拜倫選上市長。','暫時保持新耶路撒冷的現狀。','幫助蘭德選上市長。','和德克拉激烈爭論。','告訴阿紫該怎麼調整他的聲音。','完成展覽中的全部三個文字冒險。','拒絕參與探索。','在終端機閱讀 30 段文字。','找到所有過去的顯現。','找到 10 個古代人類文物。','向某人提供你的數位簽章。','告訴舒維勒該怎麼規劃人生……或者不要。'
];
const silver=new Set([657172,657180,657197,657198,657200,657208]);
export const trophyConditions=descriptions.map((descriptionZhTW,i)=>({exophaseId:657152+i,descriptionZhTW,grade:i===0?'platinum':657152+i===657175?'gold':silver.has(657152+i)?'silver':'bronze'}));
// 沿用已查證的主步驟／逐題解法，避免另建一套互相矛盾的攻略。
export const trophyGuides={
 'philosopher':{steps:['platinum-audit'],summary:['取得其餘 59 個本體獎盃；DLC 不計入白金。'],track:'platinum'},
 'ab-initio':{steps:['calibration'],summary:['依序完成 Calibration 的 12 個教學謎題，拿齊三色拼塊並打開三道門。','最後穿過傳送門，在 New Jerusalem 醒來。']},'wanderers':{steps:['departure-check'],summary:['序章簡報接受遠征；先完成城市裡的限定對話與請願。','返回 VTOL，隨遠征隊出發。']},'not-what-it-seems':{steps:['doge-intro','doge-survey','doge-match']},
 'overload':{steps:['final-city'],summary:['在西側巨構救援 Byron 後，依黃色目標撤回 VTOL。','隨主線經歷過載、於 Act V 在城市醒來；核對跳盃。']},
 'into-the-machine':{steps:['first-megastructure']},'prometheus-unbound':{steps:['prometheus-rescue']},'break-the-loop':{steps:['final-backup','ending']},
 'the-future':{steps:['all-puzzles','miranda','ending'],summary:['親自完成全部 12 個黃金謎題，在 Golden Gate 後救回 Miranda。','保留救回她的同一份遊戲進度，再完成主結局。'],track:'future'},
 'puzzle-fiend':{steps:['all-puzzles'],summary:['親自解完每區 8 個正規與 2 個 Lost 謎題，共 120 題。','曾用 Spark 跳過的題目也要回去親自解；本網站勾選只記錄你的確認。'],track:'regular'},
 'ab-aeterno':{steps:['all-puzzles','miranda'],track:'gold'},
 'renaissance-robot':{steps:['all-puzzles','stars'],summary:['親自解完 96 個正規、24 個 Lost、12 個黃金謎題。','解完十二區的兩座雕像，共取得 24 顆星星。'],track:'renaissance'},
 'good-citizen':{steps:['city-tour']},'museum-visitor':{steps:['museum'],summary:['第一次出發前走進 Museum of the Simulation（擬界博物館）。']},
 'museum-explorer':{steps:['museum'],summary:['出發前走遍博物館左右終端、中央展示謎題與拼塊展示區。','保守做法是實際操作展品並與 Rand 交談；最小觸發條件仍待查證。']},
 'the-word-endures':{steps:['field-basics'],summary:['E1 起找到戶外的電腦終端，操作後開啟其中的文字內容。','只靠近終端不算閱讀；錄音下載與文字閱讀是不同操作。']},
 'scientia-vincere-tenebras':{steps:['region-e1','collectibles'],summary:['每區進入一次 Lost Lab，共 12 座；它們與 Lost 謎題不同。','W2 實驗室先保留入口備份，才繼續進入。'],track:'lab'},
 'the-spark':{steps:['field-basics'],summary:['E1 第 3／4 題之間可找到橘色 Prometheus Spark。','靠近拾取即可；不必用來跳過謎題。']},
 'discovery':{steps:['region-e1'],summary:['從 E1 開始找戶外人類遺物，靠近並完成遊戲中的辨識。','找到第一件即可跳盃；往後累計 10 件取得 Archaeologist。'],track:'artifact-first'},
 'the-thief-of-fire':{steps:['chase'],puzzle:'E1-star-prometheus',track:'prometheus'},
 'the-all-gifted':{steps:['region-e1'],puzzle:'E1-star-pandora',summary:['最早可在 E1 完成 Pandora 雕像。','依雕像紅／藍接收器需求接通光線，拿走產生的星星。'],track:'pandora'},
 'mistress-of-riddles':{steps:['region-e2'],puzzle:'E2-star-sphinx',summary:['最早可在 E2 完成 Sphinx 雕像。','依刻圖找對本區開關並完成雕像，再拿走星星。'],track:'sphinx'},
 'the-edge-of-forever':{steps:['stars'],summary:['先解完各區雕像並取得 24 顆星星。','回巨構島上的 Astronomical Temple，將星星交給裝置，觀看幻象。'],track:'stars'},
 'remnants-of-the-past':{steps:['region-e3'],summary:['E3 第 2 題前方可以遇到第一個人物光影 Future Cat。','走近並碰觸，讓過去的對話播放；這一盃只需第一個，不用等到收齊 20 個。'],track:'remnant-first'},
 'the-hard-way':{steps:['hard-way'],puzzle:'S1-main-8'},'just-one-lap':{steps:['one-lap'],puzzle:'E2-lost-2'},'single-rod':{steps:['single-rod'],puzzle:'E2-main-8'},
 'persistent':{steps:['puzzle-time'],summary:['E1 起保留一道尚未解完、不是 Calibration 的謎題。','保持遊戲在前景並在謎題內停留超過 20 分鐘，跳盃後再解完；暫停時間不保證計入。']},
 'becoming-smarter':{steps:['puzzle-time'],summary:['先在一道未解謎題內嘗試，再離開並進入另一道謎題。','回到原題解完；來源沒有一致最短停留秒數，故不填固定秒數。']},
 'chasing-the-light':{steps:['chase'],puzzle:'E1-star-prometheus'},'bridge-builder':{steps:['field-basics'],puzzle:'E1-bridge',track:'bridge'},
 'team-spirit':{steps:['team']},'touch-grass':{steps:['field-basics'],summary:['PDA 開啟十則不同公共社群貼文，逐則閱讀。','閱讀不必回覆；準備三市長分歧時，依路線處理回覆。'],track:'social'},
 'trevor-s-biographer':{steps:['collectibles'],summary:['十二區各下載一份 Trevor 錄音，共 12 份。','要在電腦選單下載音檔，僅讀文字不算。'],track:'trevor'},
 'ecstatic-truth':{steps:['collectibles'],summary:['十二區各下載一份 Lifthrasir 錄音，共 12 份。','每區位置在收集清單；編號可能隨取得順序變化，請以人物姓名辨識。'],track:'lifthrasir'},
 'gnothi-seauton':{steps:['w2-backup','working-somnodrome'],summary:['W2 Lost Lab 入口先保留分歧備份，再依選定市長路線與 Hermanubis 交談，選擇親自接入。','進入機器後，在熱帶島嶼的 MILTON 終端開啟緊急管理選單（/rm），強制執行 somnodrome_v2_final_final.bat，和 Miltohim 談完後離開。','這是遊戲內終端選項；N2 那台損壞的機器不會給這個獎盃。']},
 'a-new-beginning':{steps:['neutral-route','w2-backup','mayor-byron'],summary:['從序章開始保留市長分歧前置，W2 入口先備份。','走成長／探索立場、對公眾公開資料的 Byron 路線，詳見逐項對話。','完成西側巨構後回城，等 Neith 公告結果；前期選擇會影響成功，不能保證只靠 W2 改選。']},
 'balance':{steps:['neutral-route','w2-backup','mayor-hermanubis'],summary:['從前期維持 Goal／保守立場，W2 入口先備份。','依 Hermanubis 路線處理公共社群、機器後對話與 Cryer 訪問。','回城聽 Neith 公告；Jeremy／無人當選能否同樣給盃仍有來源衝突，先以 Hermanubis 結果驗收。']},
 'a-new-morality':{steps:['doge-intro','doge-survey','doge-match','rand-north','broken-somnodrome','city-politics','rand-south','w2-backup','mayor-rand'],summary:['先接 Doge 介紹、完成七題並配對學者 Rand；接受 N1 私訊調查，在 N2 嘗試損壞的 Somnodrome。','處理城市支持與簡報、S1 關係私訊，再保留 W2 入口備份。','依 Rand 路線處理正常機器後的道德對話、Cryer 及 VTOL 前回覆；回城等 Neith 公告。精確分數門檻與 PS5 重現仍待查證。']},
 'sinner':{steps:['sinner']},'excellent':{steps:['purple']},'text-adventurer':{steps:['text-adventures'],track:'text-adventures'},'chicken':{steps:['chicken']},
 'lord-of-the-files':{steps:['field-basics','collectibles'],summary:['在電腦終端逐份開啟不同文字檔，累計 30 份。','各區及城市／巨構的實讀數量會加總；30 是獎盃目標，每區總量仍待查證。'],track:'text'},
 'mnemosyne':{steps:['region-e3','collectibles'],summary:['E1／E2 沒有一般人物光影。從 E3 開始，其餘十區各找兩個，共 20 個。','走近碰觸並播放對話；地圖以 M1／M2 標示。'],track:'remnant'},
 'archaeologist':{steps:['region-e1','artifacts'],summary:['從 E1 起辨識不同人類遺物，累計 10 件。','同一物品可能在不同區域有替代出現點，已在前區辨識後，後區可能不再出現。不要把候選點當作十件獨立物品。'],track:'artifact'},
 'signatory':{steps:['petition'],summary:['序章電梯外找 Damien／Moryana，聽完請願後提供數位簽章。','第一次可以簽名時就做完；給粉絲的簽名屬於另一段對話。']},'your-biggest-fan':{steps:['schuyler']}
};
const towers=[['grasslands-ring','e1'],['wooded-plateau','e2'],['eastern-wetlands','e3'],['desolate-island','n1'],['flooded-valley','n2'],['lost-marshes','n3'],['southern-coast','s1'],['verdant-canyon','s2'],['circular-oasis','s3'],['western-delta','w1'],['anthropic-hills','w2'],['high-plain','w3']];
for(const[id,code]of towers)trophyGuides[id]={steps:['region-'+code],summary:['取得本區主線需要的 8 個謎題火花，完成通往塔的拼塊橋。','進塔操作終端啟動高塔。完整解題與收集分開記錄；只勾選謎題不等於已啟動塔。']};
