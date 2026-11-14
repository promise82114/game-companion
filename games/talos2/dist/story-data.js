import {attachMegaBridges} from './bridge-data.js';
// 城市回訪與巨構導覽，2026-11-08。路線順序來自逐段實玩圖文，沒有假定遊戲內座標。
const manor='https://mysterymanor.net/walkthroughs/Talos_Principle_2/';
export const storySources={
 cityMap:{title:'Cognition：三次城市到訪的人物與地標圖',url:'https://steamcommunity.com/sharedfiles/filedetails/?id=3090253536'},
 cityFirst:{title:'Dick Leeuw／Louis Koot：初訪城市與基地',url:manor+'02_New_Jerusalem_1/jerusalem_1_1.htm'},
 citySecond:{title:'Dick Leeuw／Louis Koot：第二次城市到訪',url:manor+'10_Megastructure_North/Structure_North_2/new_jerusalem_2.htm'},
 megaEast1:{title:'Dick Leeuw／Louis Koot：東側入口、綠與紅雷射',url:manor+'06_Megastructure_East/megastructure_east_1.htm'},
 megaEast2:{title:'Dick Leeuw／Louis Koot：東側藍雷射、終端與回程',url:manor+'06_Megastructure_East/megastructure_east_2.htm'},
 megaNorth1:{title:'Dick Leeuw／Louis Koot：北側入口與藍雷射',url:manor+'10_Megastructure_North/Structure_North_1/mega_north_1.htm'},
 megaNorth2:{title:'Dick Leeuw／Louis Koot：北側綠雷射與撤離',url:manor+'10_Megastructure_North/Structure_North_2/mega_north_2.htm'},
 megaSouth1:{title:'Dick Leeuw／Louis Koot：南側入口與插銷 1–3',url:manor+'15_Megastructure_South/megastructure_south_1.htm'},
 megaSouth2:{title:'Dick Leeuw／Louis Koot：插銷 4–5、釋放與離開',url:manor+'15_Megastructure_South/megastructure_south_2.htm'},
 megaWest:{title:'Dick Leeuw／Louis Koot：西側救援與 Act V 回城',url:manor+'19_Megastructure_West/megastructure_west_1.htm'},
 megaFinal:{title:'Dick Leeuw／Louis Koot：最終巨構與 Athena',url:manor+'22_Free_Athena/free_athena_1.htm'},
 finaleWheels:{title:'Gamepressure：雙世界八輪盤',url:'https://www.gamepressure.com/the-talos-principle-2/utopia-and-dystopia/z81114a#NH2_2',checkedAt:'2026-11-14'},
 megaEastWiki:{title:'Talos Wiki：東側終端與中央空間',url:'https://taloswiki.org/wiki/Megastructure_East'},
 megaNorthWiki:{title:'Talos Wiki：北側終端檔案',url:'https://taloswiki.org/wiki/Megastructure_North'},
 megaSouthWiki:{title:'Talos Wiki：南側文字與劇情',url:'https://taloswiki.org/wiki/Megastructure_South'},
 utopiaWiki:{title:'Talos Wiki：Utopia 與 Dystopia 的橋樑互斥',url:'https://taloswiki.org/wiki/Utopia'},
 overloadEarly:{title:'Game of Guides：E2 Schematic_108 後的 Overload',url:'https://video-game-guide-walkthrough.supersoluce.com/solution/the-talos-principle-2-guide-walkthrough/collectibles/tp2-lost-labs/lost-lab-wooded-plateau-east-2/'}
};
for(const[key,source]of Object.entries(storySources))Object.assign(source,{kind:key.endsWith('Wiki')?'wiki':key==='cityMap'?'map-guide':'walkthrough',checkedAt:source.checkedAt||'2026-11-05'});
export const storyWaypoints=[];
function waypoint(stepId,id,title,location,actions,mapKey,sources,extra={}){storyWaypoints.push({stepId,id,title,location,actions,mapKey,sources:sources.map(key=>storySources[key]),verificationStatus:'consensus',...extra});}
waypoint('neutral-route','city1-arrive','初訪：從出生實驗室到塔上簡報','出生實驗室 → 軌道車 → 中央塔',[
 '與 Neith 談完、查看 PDA 後離開實驗室。迎新與演說結束，跟隨劇情乘軌道車到中央塔；這段出生實驗室不在城市廣場示意圖內。',
 '到站與 Josephus（558）交談後，上階梯搭中央電梯。途中停電要等 Melville 修復，不是改找另一條路。',
 '抵達上層，走出電梯沿走廊左轉前往簡報；先處理途中 Doge 的介紹，再做下方 Chicken 的拒絕／繼續流程。城市探索在接受遠征後、登機前進行。'
],'CITY-1',['cityFirst']);
waypoint('museum','city1-museum','博物館：先認三個展示方向','館門 → Cornelius → 左室 Rand',[
 '從中央塔城市層走出來，沿中央步道穿過廣場，正對面的三圓頂建築就是博物館。Schuyler 在館外；入館先找 Cornelius，再找負責左側終端展示的 Rand。',
 '左室的中間電腦是 Rand 要你測試的終端；完成一次測試後回報 Rand。中央三個圓頂是重現謎題，右側另有六面可選拼塊盤。不要把 Rand 測試、展示謎題與拼塊盤當作同一件事。'
],'MUSEUM-1',['cityFirst']);
waypoint('sinner','city2-terminal','第二次回城：先取得 Cornelius 終端資料','博物館入口附近的 Neith → Cornelius 工作電腦',[
 '從 VTOL 經簡報室搭電梯下到城市層，穿廣場到博物館。這次主線是找 Cornelius；他不在時，向 Neith 詢問 Cornelius 的去向，並要求使用他的終端。',
 '取得許可後，操作 Cornelius 工作電腦，閱讀 Notes 並下載 Rec_final_2。這不是 Rand 左室的模擬測試終端。完成後再去下方 Thecla 爭論；先別因主線提示回 VTOL 就立刻離城。'
],'MUSEUM-2',['citySecond']);
waypoint('city-tour','city2-west','城市西側：紀念區與考古花園','以塔出口望向博物館：廣場左側',[
 '先在廣場左側找 Alexandra Drennan Memorial 的大圓形紀念設施，再走到較靠廣場內側的小圓形 Milton’s Rest。Tablets of the Founder 是其下方、靠塔方向的環形階梯／碑文區，Thecla 在此。',
 '考古花園在博物館左側水岸伸出的石牆遺跡群。Purple 初訪在棕櫚樹與短階梯旁，第二次到訪的位置改在館門附近；不要回到初訪的位置硬找。'
],'CITY-2',['cityMap']);
waypoint('city-tour','city2-east','城市東側：涼亭、文字冒險與工地','以塔出口望向博物館：廣場右側及館後',[
 '廣場右側的圓形涼亭是 Friends of New Jerusalem Gazebo；其下方、較靠塔方向的小圓形展館是 Gehenna Memorial Pavilion，三部文字冒險在這裡，不在博物館。',
 'Construction Site／Scaffolding 在三圓頂博物館後方的穹頂施工區。示意圖標出所在方向；繞館進入施工區的精確轉角仍待查證。Helga 在回訪時可於博物館前右側一帶遇到。'
],'CITY-2',['cityMap','citySecond']);
waypoint('city-exit','city2-depart','第二次回城：最後才回塔上簡報與登機','中央塔上層 → 簡報桌 → VTOL',[
 '先完成博物館主線、Sinner、文字冒險、城市探索，以及本頁列出的 Damien／Atal／Malduc 政治對話。返回電梯上樓，在簡報桌核對 Rand 調查線的會議；會議是否出現取決前期旗標。',
 '完成後才去簡報室後的 VTOL。回到島上基地後，下樓搭交通艙前往 S1；不是在城市裡尋找南區入口。'
],'CITY-2',['citySecond']);
waypoint('first-megastructure','east-arrival','先確認：基地不等於巨構內部','E3 交通艙 → Base Camp → VTOL → 室內降落台',[
 'E1、E2、E3 三座塔啟動後，交通艙選 Megastructure 只會把你送到島上 Base Camp。出站上樓，找 VTOL 並依主線提示搭機，才會進入東側巨構。',
 '室內降落後跟著隊友進走廊，第一道大門會自動開。沿通路進入有植物、水池與正面電梯的大廳。'
],'MEGA-E-ENTRY',['megaEast1']);
waypoint('first-megastructure','east-lobby','入口大廳：電梯不能用，先認四個側口','面對正面電梯：左 L1／L2，右 R1／R2',[
 '正面電梯目前沒有前進功能，Yaqut 站在附近。左側較前的 L1 是 Melville 使用中的 NOEMA-01；現在不能操作，回程才讀。',
 '左側另一條 L2 是 Byron 的觀景支線；右側 R1 是水池終端房。真正繼續深入的路在右側另一條 R2。L1／L2／R1／R2 是這份攻略的辨識標記，不是遊戲路牌。'
],'MEGA-E-ENTRY',['megaEast1','megaEastWiki'],{warning:'不要在去程等待 NOEMA-01 或電梯；主路走 R2，終端留回程。'});
waypoint('first-megastructure','east-byron','左側觀景支線：與 Byron 交談後折返','入口大廳左側 L2',[
 '進 L2 沿走廊到觀景處找 Byron，對話後原路回大廳。這是盡頭，不通中央三色門；尚未取得 Team Spirit 時尤其別略過這次對話。'
],'MEGA-E-ENTRY',['megaEast1']);
waypoint('first-megastructure','east-terminal2','右側水池支線：讀 NOEMA-2','入口大廳右側 R1 → 水池中央電腦',[
 '進 R1，走到水池中央操作手掌讀取器，逐份開啟文字／下載檔案。讀完回入口大廳；這個房間也是盡頭，不是主路。'
],'MEGA-E-ENTRY',['megaEast1','megaEastWiki']);
waypoint('first-megastructure','east-door','主路 R2：等 Melville 開門，再連續右轉','大廳右側 R2 → 遠端開啟的大門 → 平台',[
 '進 R2 沿走廊走到關閉的大門，等 Melville 遠端覆寫開門。門未開時先等通訊，不用回頭找開關或解三色雷射。',
 '門後走到大空間邊的平台，直走沒有路；先右轉，再進右手的走廊。沿通道走，會在橋上再次遇到 Yaqut。'
],'MEGA-E-ENTRY',['megaEast1']);
waypoint('first-megastructure','east-yaqut','橋上 Yaqut：談完再沿長廊走','R2 後的橋 → 彎曲走廊 → 第一個金環',[
 '與橋上的 Yaqut 交談，接著過橋、沿彎曲長廊走到底，直到看見金色拼塊環。前方隔著空隙的中央平台才是下一個目的地。'
],'MEGA-E-ENTRY',['megaEast1']);
waypoint('first-megastructure','east-central','中央區：先搭橋，目標是三色大門','第一個金環 → 中央平台',[
 '金環另一側是中央平台，正對面大門有紅、綠、藍三個接收器；要分別解開支線、拉動三座雷射炮的拉桿，才會開門。橋塊已提供，不需再到戶外找題目收拼塊。',
 '本頁走綠 → 紅 → 藍；中央平台面向大門時，綠區在右，藍區在左，紅區在入口較下方。各段搭橋已依行進順序分開列在途中。'
],'MEGA-E-CORE',['megaEast1','megaEastWiki']);
waypoint('first-megastructure','east-terminal3','三色門開後：跟黃色三角到 NOEMA-03','藍炮區出口 → 中央橋 → 三色大門內的水池',[
 '完成前列東橋 5～7，確認已穿過三色大門。沿水池兩側階梯到中央小島，操作 NOEMA-03、逐份開檔。',
 '看完 Athena／Miranda 記憶，等 Act II 開始後再循黃色三角返回。'
],'MEGA-E-CORE',['megaEast2','megaEastWiki']);
waypoint('first-megastructure','east-terminal1','回程補終端：NOEMA-01 現在才可讀','循黃色三角回入口大廳 → 左側 L1',[
 'Act II 開始後循黃色三角原路返回：穿三色門、過中央橋、沿長廊與 R2 回到最初大廳。',
 '現在進 L1，操作先前 Melville 擋住的 NOEMA-01，開啟 Rust。它不在右側水池房；若去程沒有操作提示屬於正常劇情限制。'
],'MEGA-E-ENTRY',['megaEast2','megaEastWiki']);
waypoint('first-megastructure','east-exit','東側收尾：回 VTOL，再搭交通艙去 N1','入口大廳 → 來時走廊 → 室內降落台',[
 '讀完 NOEMA-01，回大廳找黃色三角指向的來時走廊，回降落台搭 VTOL。不要再回三色大門裡繞。',
 '回到 Base Camp 後下樓進交通艙，目的地選 N1 Desolate Island。第一次巨構結束後不是回 New Jerusalem。'
],'MEGA-E-ENTRY',['megaEast2']);
waypoint('north-megastructure','north-door','北側入口：先用終端 Door override 開門','VTOL → 庭院正前階梯 → 門旁終端',[
 'N3 收尾後回基地搭 VTOL。北側降落先與 Alcatraz 交談，走廊盡頭進庭院。左邊階梯頂的大門此時不開；走正前階梯，上去後向左找門旁電腦。',
 '先讀 NoemaProject7，再選 Door override。記憶播完若門仍未開，再操作一次 Door override；之後進門走右側樓梯與走廊。'
],'MEGA-N',['megaNorth1','megaNorthWiki']);
waypoint('north-megastructure','north-byron','北側中央：走重力牆到 Byron，紅光由他啟動','中央雕像左側重力牆 → 門前 Byron',[
 '到中央雕像旁，找左側特殊磁性地磚牆。靠近跳到牆上，沿牆向右，再轉右下到地板；走到另一頭門前等 Byron 開門。',
 'Byron 會啟動紅色雷射。你接下來只需要依序處理藍、綠兩條支線，不必再找紅炮拉桿。'
],'MEGA-N',['megaNorth1']);
waypoint('north-megastructure','north-memory','北側三色門：讀主線終端並準備撤離','綠光完成 → 黃色三角 → 三色大門 → 水池小島',[
 '完成前列北橋 8、9 並穿過三色大門；重力翻轉時以特殊地磚與黃色三角確認前進方向。',
 '進三色門，沿走廊上樓到水池小島。Byron 操作終端後觸發事故；看完劇情便轉為撤離。'
],'MEGA-N',['megaNorth2']);
waypoint('north-megastructure','north-exit-route','北側撤離：跟黃色三角回庭院與 VTOL','主線終端 → 回程樓梯／走廊 → 最初庭院',[
 '事故後先從大門退回樓梯，下樓後不要沿原橋再深入，改走右側回程，持續追蹤黃色三角，經紅色走廊與橋廊返回最初庭院。',
 '撤離通路很長；目前可核對起終點與主要地標，完整逐轉角／樓層圖仍待查證。回到最初庭院後，走對角另一側階梯與來時大門回 VTOL。接著主線會帶你第二次回 New Jerusalem。'
],'MEGA-N',['megaNorth2'],{pending:'北側撤離的所有轉角與樓層尚未逐一對照遊戲畫面；此段以黃色目標為準。'});
waypoint('prometheus-rescue','south-terminal','南側入口：右側先讀終端，別走空電梯井','第一道自動門後的岔路',[
 '南側降落後沿走廊進自動門。岔路左邊是沒有電梯的井，先走右側支線讀電腦；這台終端與南側四份文字檔的逐檔對照仍待查證。',
 '讀完回岔路，轉往可搭乘的電梯。接著過橋、左轉搭纜車，另一頭再過橋上樓搭電梯，直到看見被鎖鏈綁住的 Prometheus。'
],'MEGA-S-ENTRY',['megaSouth1']);
waypoint('prometheus-rescue','south-start','Prometheus 正面：先拉大拉桿，讓五個目標出現','電梯出口 → 正面階梯 → 雙鎖鏈絞盤',[
 '電梯到站轉身，出來沿階梯下行，再上正面絞盤階梯找大拉桿。先拉一次，右上目標會變成拔除插銷 0/5，地圖與畫面出現五個黃色三角。',
 '沿 Prometheus 周圍環道處理下方五根插銷。本頁插銷 1～5 是攻略路線編號，不是遊戲內固定名稱；第 4 根由 Yaqut 協助。'
],'MEGA-S-PINS',['megaSouth1','megaSouth2']);
waypoint('prometheus-rescue','south-exit-route','釋放後：搭電梯與纜車原路回 VTOL','正面大拉桿 → 大階梯 → 電梯 → 纜車',[
 '確認 5/5 後回正面大拉桿再拉一次，觀看劇情並核對 Prometheus Unbound。恢復操作後，轉身上大階梯搭電梯離開。',
 '依序搭纜車、過橋、搭另一部電梯回入口走廊與 VTOL。回基地先處理 Hermanubis／Cryer 的主線對話，再下樓搭交通艙去 W1。'
],'MEGA-S-ENTRY',['megaSouth2']);
waypoint('west-megastructure','west-byron','西側救援：跟 Prometheus 影像到 Byron','VTOL → 橋 → 大門 → 發光影像',[
 '完成西區與所選市長分歧後搭 VTOL 進西側。下機走既有橋進大門；這次救援的來源路線沒有放拼塊的金環，不用到處找形狀清單。跟隨 Prometheus 影像，到看見 Byron 被終端束縛的平台。',
 '跳下到 Byron 所在平台，靠近互動，把他的手從終端拉開。不要把這次救援誤認為最後 Utopia／Dystopia 的八輪盤流程。'
],'MEGA-W',['megaWest']);
waypoint('west-megastructure','west-escape','西側救援後：跟 Byron 看完，再循黃色三角撤退','Byron 平台 → 記憶 → 電流大廳',[
 '等 Byron 恢復，跟他觀看 Athena 等人的記憶。恢復控制後，依黃色三角朝 VTOL 撤退。',
 '到電流大廳會被劇情過載打斷，之後在 Neith 的實驗室醒來；不是要找第三條電流支線才能回去。此處所有樓層的精確平面位置仍待查證，圖只表示主線連接。'
],'MEGA-W',['megaWest']);
waypoint('final-city','city3-wake','第三次回城：先問 Neith 市長與未來方向','出生／醫療實驗室 → 門外同行者 → 軌道車',[
 '先在醒來處問 Neith 城市近況，核對本輪實際當選市長與獎盃，再依你的方向回答救回 Athena、停用或摧毀機器等問題。這會影響同行者，不保證只改這次回答就能重做市長選舉。',
 '離開房間後依主線提示找 Byron 或 Alcatraz，乘軌道車回中央塔，再搭電梯到城市層。實驗室與這段接駁不在市中心廣場的地理圖內，另以路線圖表示。'
],'CITY-3-STORY',['megaWest']);
waypoint('final-city','city3-recruit','城市內：找 Melville 與 Yaqut，再回塔登機','中央塔城市層 → 兩個黃色三角',[
 '走出塔後查看兩個黃色三角，分別與 Melville（142）、Yaqut（764）談是否回島。畫面可辨識 Melville 周圍有花圃、涼亭與圓頂建築；Yaqut 在環形階梯廣場。兩人精確廣場座標仍待查證，不用圖上的流程點當地理座標。',
 '確認還能做的城市探索與文字冒險。Purple 第三次位置在靠塔的廣場一帶；初訪限定請願／Schuyler／Sinner 能否於此補觸發不能保證。最後回中央塔上層、經簡報室到 VTOL。',
 '回島後先補黃金謎題、Miranda、星星與收集；登上「最後一次進巨構」的 VTOL 前再保留最終備份。'
],'CITY-3-STORY',['megaWest','cityMap'],{pending:'Melville／Yaqut 的本次精確地理點，以及早期限定事件能否在 Act V 補拿，仍待查證。'});
waypoint('stars','base-temple','交星星：在基地找 Astronomical Temple，不要搭 VTOL','基地交通站上樓 → 路口 → 星星神殿',[
 'Megastructure 交通目的地是島上基地。出站後沿小路到分岔，找帶星星／紀念碑圖示的 Astronomical Temple；不是進巨構內部。',
 '帶齊 24 顆星星後，到神殿地下的圓形裝置交付並看完幻象。另一條岔路的 Golden Gate 則是 Cornelius／Miranda 路線，兩者不要混淆。'
],'BASE-CAMP',['megaWest']);
waypoint('miranda','base-golden','救 Miranda：在基地的 Golden Gate 找 Cornelius','基地交通站上樓 → 岔路 → Golden Gate',[
 '完成十二區全部黃金謎題後，回基地找 Golden Gate 建築與 Cornelius。它與星星神殿是不同建築，不需要先搭 VTOL 進巨構。',
 '和 Cornelius 談合作、進入機器後，依下方地雷迷宮流程救 Miranda。基地兩棟建築的精確比例未量測，示意圖以岔路關係辨識。'
],'BASE-CAMP',['megaWest']);
waypoint('ending','final-arrival','最後進巨構：入口與兩側世界','基地最終 VTOL → 西側內部 → 光線交換入口',[
 '確認最終備份與收集後才搭這次 VTOL。跟隨主線走到下方「入口・光線交換」題，之後要在 Utopia 與 Dystopia 之間交換光線與設備，完成各四個輪盤。',
 '反烏托邦 2 完成後，帶紅蓄能器回入口送光，先解烏托邦 2，再過橋前往能供應反烏托邦 3 藍光的重力柱。勾選「拒絕謎語」查看接線。'
],'MEGA-FINAL',['megaFinal','finaleWheels']);
waypoint('ending','final-athena','八輪盤後：最後的橋、電梯與 Athena','最後輪盤 → 金環橋 → 塔 → 電梯',[
 '依前列終橋走 Utopia 出口，進塔搭電梯；到頂右轉、走到底左轉再左轉，進門上階梯到 Athena。兩世界的出口橋擇一即可，不必回頭補另一側。',
 '與 Athena 互動並完成最後選擇，再核對 Break the Loop；已救回 Miranda 的同一進度完成結局後，另核對 The Future。'
],'MEGA-FINAL',['megaFinal','utopiaWiki']);

export const storyRoutes={
 'neutral-route':['city1-arrive'],museum:['city1-museum'],sinner:['city2-terminal'],'city-tour':['city2-west','city2-east'],'city-exit':['city2-depart'],
 'first-megastructure':['east-arrival','east-lobby','east-byron','east-terminal2','east-door','east-yaqut','east-central','MEGA-E-green','MEGA-E-red','MEGA-E-blue','east-terminal3','east-terminal1','east-exit'],
 'north-megastructure':['north-door','north-byron','MEGA-N-blue','MEGA-N-green','north-memory','north-exit-route'],
 'prometheus-rescue':['south-terminal','south-start','MEGA-S-pins','south-exit-route'],
 'west-megastructure':['west-byron','west-escape'],'final-city':['city3-wake','city3-recruit'],stars:['base-temple'],miranda:['base-golden'],
 ending:['final-arrival','FINAL-gate','FINAL-u1','FINAL-d1','FINAL-d2','FINAL-u2','FINAL-d3','FINAL-u3','FINAL-d4','FINAL-u4','final-athena']
};
export const storyPuzzleDetails={
 'MEGA-E-green':{mapKey:'MEGA-E-CORE',navigation:['完成前列東橋 2，沿階梯到右側紫屏內；看到鑽孔器與銅牆，就是綠光題。','解完不是直接折返：穿兩道已開門下樓，沿地上電線找到拉桿，拉下確認綠光命中大門。']},
 'MEGA-E-red':{mapKey:'MEGA-E-CORE',navigation:['完成前列東橋 3，到紅炮平台後進左側紫屏解題。','解完走到炮旁拉桿，確認紅光命中大門。這裡的紅炮在較低的入口側，圖用上下關係辨識，不代表北方。']},
 'MEGA-E-blue':{mapKey:'MEGA-E-CORE',navigation:['完成前列東橋 4，從紅／綠接收器房跨到對面 RGB 房，再開始下方連線。','開啟綠接收器旁的通路後，上樓沿炮的電線找拉桿。藍光打中大門後，接著走東橋 5～7 去主線終端。']},
 'MEGA-N-blue':{stepId:'north-megastructure',mapKey:'MEGA-N',navigation:['依前列北橋 1～4，經天花板與風扇穿到紫屏內。','認壓板與蓄能器房，解完必須拉下藍炮拉桿；回程沿已建橋下到風扇前。']},
 'MEGA-N-green':{stepId:'north-megastructure',mapKey:'MEGA-N',navigation:['完成前列北橋 5～7，從天花板向右穿紫屏，進有交換台與鑽孔器的綠炮題。','拉綠炮後三色門會開；接著依北橋 8、9 回三色門內的主線終端。']},
 'MEGA-S-pins':{mapKey:'MEGA-S-PINS',navigation:['前列南橋 1～11 已依序帶到五根插銷；現在核對右上是否 5/5。','未滿時查看黃色三角與對應插銷段落。已滿便回正面大拉桿再拉一次，不會自動解放。']},
 MIRANDA:{mapKey:'BASE-CAMP'},'FINAL-gate':{mapKey:'MEGA-FINAL'},
 ...Object.fromEntries(['FINAL-u1','FINAL-u2','FINAL-u3','FINAL-u4','FINAL-d1','FINAL-d2','FINAL-d3','FINAL-d4'].map(id=>[id,{mapKey:'MEGA-FINAL'}])),
 'FINAL-d2':{mapKey:'MEGA-FINAL',navigation:['按完輪盤後，下一站是烏托邦 2。先保留這裡的紅蓄能器，照下一段搬回反烏托邦入口。']},
 'FINAL-d3':{mapKey:'MEGA-FINAL',navigation:['先完成烏托邦 2，再從輪盤旁過橋到重力柱。此處供藍的反相器在柱頂。']}
};
attachMegaBridges(storyWaypoints,storyRoutes,storySources);
