// 文獻查證，不代表 PS5 實機成功；null 英文不可用翻譯回填成「原文」。
export function applyMayorResearch(roadmap) {
 const {sources,steps,branches}=roadmap;
 const checkedAt='2026-10-31';
 Object.assign(sources,{
  dogeTranscript:{title:'Doge 問卷逐字稿（第七題為追加）',url:'https://taloswiki.org/wiki/Permission_to_share_your_personal_data',kind:'transcript'},
  ps5Guide:{title:'FK-corporation PS5 2.04 實測攻略（法文；含歧異）',url:'https://www.psthc.fr/unjeu/the-talos-principle2-ps5/guide-trophees.htm',kind:'player-guide'},
  psnGuide:{title:'BlackTorito PSNProfiles 原指南（403，未讀取正文）',url:'https://psnprofiles.com/guide/17976-the-talos-principle-ii-trophy-guide',kind:'unavailable'},
  manorCity:{title:'城市回訪實錄（另一配對：Helga）',url:'https://mysterymanor.net/walkthroughs/Talos_Principle_2/10_Megastructure_North/Structure_North_2/new_jerusalem_2.htm',kind:'player-guide'},
  manorW2:{title:'W2 實錄（Helga 路線，不作 Rand 結果保證）',url:'https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_3/west_2_3.htm',kind:'player-guide'},
  w2Plug:{title:'遊戲截圖：入機選項',url:'https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_3/Talos_2_2776b.jpg',kind:'screenshot'},
  w2Wake:{title:'遊戲截圖：甦醒後 Hermanubis 三選項',url:'https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_3/Talos_2_2776i.jpg',kind:'screenshot'},
  w2Contact:{title:'遊戲截圖：對 Helga 的公開／隱瞞選項',url:'https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_3/Talos_2_2777b.jpg',kind:'screenshot'},
  w2Interview:{title:'遊戲截圖：Cryer 訪問準備選項',url:'https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_3/Talos_2_2777c.jpg',kind:'screenshot'},
  w2Terminal:{title:'遊戲截圖：/rm 與實際批次檔名',url:'https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_3/Talos_2_2776e.jpg',kind:'screenshot'},
  randReport:{title:'另一玩家的 Rand 條件紀錄（自動翻譯，不作英文原文）',url:'https://trophieshunter.com/games/the-talos-principle-2-steam/achievements/a-new-morality',kind:'player-report'},
  oldSteamMirror:{title:'Hanni 舊版轉載（分支與新版相反，勿混用）',url:'https://gamepretty.com/the-talos-principle-2-100-achievement-guide/',kind:'historical-guide'}
 });
 const find=id=>steps.find(s=>s.id===id);
 const patch=(id,value)=>Object.assign(find(id),value);
 function choice(id,speaker,context,english,meaning,sourceIds,note='',verificationStatus=english?'consensus':'unverified'){
  return {id,speaker,context,english,meaning,sources:sourceIds,note,verificationStatus,checkedAt};
 }
 const survey=[
  ['knowledge','Knowledge.','知識優先',['guide']],
  ['lying','Yes, lying can be okay.','說謊可以接受',['guide']],
  ['punishment','Yes, bad behavior deserves to be punished.','不當行為應受懲罰',['guide']],
  ['universe',"The universe is weird, we'll never fully understand it.",'宇宙怪異，我們無法完全理解',['survey']],
  ['progress','Human progress shows things can get better and stay that way.','人類進步能讓改善持續',['dogeTranscript']],
  ['wisdom','We should not disregard the wisdom which brought us here.','不應忽視先人智慧',['survey']],
  ['prayer','No, prayer has no effect on the world.','祈禱不影響世界',['dogeTranscript']]
 ];
 patch('doge-survey',{
  trigger:'E1 Grasslands Ring 的 PDA 私訊；先接受資料分享，再依序回答六題與追加第七題。',
  actions:['先同意分享資料，再依下方七題順序選答。這是已發布 Rand 配對路線的答法，不是任意選都有效。','逐字稿先稱六題，之後追加祈禱題；不要漏掉第七題。宇宙題逐字稿有 full／fully 拼字差異，保留玩家紀錄與攻略的 fully，對照遊戲文字辨識。','法文 PS5 指南漏列懲罰題，不能將其六行清單當完整問卷。備份與配對結果仍須自行核對。'],
  dialogue:survey.map(([id,english,meaning,refs],i)=>choice('doge-'+id,'Doge（666）','第 '+(i+1)+' 題',english,meaning,refs,i===3?'Wiki 轉錄 full／fully 不一致；PS5 畫面字形仍待核對。':'')),
  sources:['dogeTranscript','guide','survey','ps5Guide'],verificationStatus:'consensus'
 });
 patch('doge-match',{
  location:'東區 E2–E3 · PDA / Connecting you to a friend',
  trigger:'Doge 第二封配對私訊出現時立即處理；不同指南分別放在 E2 或 E3，不等到固定區域才查看。',
  actions:['配對時以學者／Rand（303）身份核對，接受介紹並確認後續私訊署名。Not What It Seems 跳盃只代表介紹完成。','英文逐字稿把學者放第二位；法文 PS5 指南寫第五位且放在 E2，Xbox 流程放 E3。這些是實際來源矛盾，不能照固定第幾項或只等 E3。'],
  sources:['friend','walkthrough','ps5Guide'],verificationStatus:'unverified'
 });
 patch('museum',{
  actions:[...find('museum').actions,'三市長共用準備另核對：左室與 Rand 交談→完成他請你測試的中央終端 exercise→回報測試結果。進博物館或拿 Museum Explorer 都不能代替這段回報。'],
  sources:['guide','steam','election','ps5Guide']
 });
 patch('rand-north',{
  title:'N1：接受 Rand 的組織邀請',location:'N1 Desolate Island · PDA / Rand（303）',
  trigger:'Xbox 流程定位在 N1 遊玩途中，約該區中段；不是已驗證的固定解題數觸發。',
  actions:['收到 Rand（303）的首次私訊時接受合作／加入組織，繼續追查 Somnodrome。先確認署名確實是 Rand。','N1 是文獻定位；精確觸發謎題數、訊息標題與完整英文選項仍未取得逐字稿。不要將「約中途」改寫成第幾題必定發信。'],
  dialogue:[choice('rand-invitation','Rand（303）','N1 初次邀請',null,'接受合作與組織邀請',['walkthrough','randReport'],'中文方向有玩家紀錄；英文原文及精確觸發旗標待查證。')],
  sources:['walkthrough','randReport','ps5Guide'],verificationStatus:'unverified'
 });
 patch('broken-somnodrome',{
  actions:['N2 Lost Lab：選擇親自嘗試使用 Somnodrome；不要只研究或停用。使用後故障不等於任務失敗，也不會跳正常機器的 Gnothi Seauton。','這是保留本頁 Rand／共用備份路線的保守做法；不宣稱其他市長或所有存檔都硬性需要這個選擇。'],
  sources:['election','steam','randReport','ps5Guide']
 });
 patch('city-politics',{
  actions:['回訪時依序核對 Damien（博物館右側）的支持、城中心 Atal 的演說回應，再回塔前找 Malduc；這三人不能省成一個「政治對話」。','Malduc：詢問 Athena 名字與樂觀小說的關係，再表示會考慮他的看法。這是原路線的平衡答法，不等於隨便支持任一陣營。','塔內原簡報桌：依下表回答島上科技、善用機會、追問原因、向公眾分享。若未出現，先回查 N2 與前期介紹，不假設這段可跳過。','第二項在兩份指南有 good on／good of 文句差異；目前僅中文意義可確定，不將其中一個拼法冒充 PS5 官方逐字原文。'],
  dialogue:[
   choice('city-damien','Damien（903）','博物館右側',null,'明確表示支持',['walkthrough','ps5Guide']),
   choice('city-atal','Atal（890）','城中心／聽演說後',null,'支持他的立場',['election','ps5Guide']),
   choice('city-malduc','Malduc（202）','返回塔／VTOL 途中',null,'詢問小說名字，表示可能有道理、會考慮',['walkthrough','ps5Guide']),
   choice('brief-technology','塔內簡報','島上科技',"The island has technology we can't afford to ignore.",'島上科技不能忽視',['walkthrough']),
   choice('brief-trust','塔內簡報','如何看待機會',null,'相信我們能善用機會',['walkthrough','steam'],'good on／good of 不一致，完整英文待 PS5 畫面核對。'),
   choice('brief-why','塔內簡報','追問','How? Why?','怎麼做？為什麼？',['walkthrough']),
   choice('brief-share','塔內簡報','如何處理資料','I would share it with the people.','與人民分享',['walkthrough'])
  ],sources:['walkthrough','election','steam','ps5Guide'],verificationStatus:'unverified'
 });
 patch('rand-south',{
  trigger:'本頁簡報答法不站 Rand 一邊時，Xbox 流程在 S1 遊玩中收到關係訊息；PS5 指南僅記城市簡報後／更晚。',
  actions:['查看 Rand 關係私訊，回應說謊是為了維護與他的關係；不要把已讀訊息當作答覆完成。','N1 邀請與此封關係私訊是兩件事，兩者皆應在筆記留下實際畫面／回覆。英文逐字、所有條件分支及最晚期限仍待查證。'],
  dialogue:[choice('rand-relationship','Rand（303）','簡報後的關係私訊',null,'我說謊是為了保護我們的關係',['walkthrough','election','ps5Guide'],'S1／更晚的時機有歧異；沒有英文原文就不反向翻譯填入。')],sources:['walkthrough','election','ps5Guide'],verificationStatus:'unverified'
 });
 patch('west-arrival',{
  actions:['西區開始與 Hermanubis 談幻象時，PS5 路線記錄採尚未決定的中立回應；Hanni 流程採肯定幻象真實，兩者屬不同準備法。','本頁使用入口備份的路線，先核對中立方向的實際選項並記錄。未取得此處英文截圖，不提供自創英文。接著完成 W1、W3、W2 其他內容，W2 Lost Lab 留最後。'],
  dialogue:[choice('west-hermanubis','Hermanubis（452）','西區交通系統',null,'本頁路線採尚未作決定的中立方向',['ps5Guide','steam'],'另一套流程使用肯定幻象；不可當成通用必要條件。')],sources:['ps5Guide','steam'],verificationStatus:'unverified'
 });
 patch('w2-backup',{
  actions:[
   '節點 A：全部西區塔與其他探索完成後，停在 W2 Lost Lab 入口，尚未開始 Hermanubis／Somnodrome／Cryer 的分歧答覆。核對下方共用準備清單與實際對話紀錄。',
   '先在 PS5 的 Saved Data (PS5) → Sync Saved Data → Auto-Sync Saved Data 關閉本遊戲自動同步，再確認入口附近的遊戲儲存指示已結束並關閉遊戲。',
   '手動 Upload to Cloud Storage：選 The Talos Principle 2，核對主機來源與雲端目標時間。上傳會替換雲端副本；A 只是你的筆記名稱，不是另一個雲端存檔槽。若現有雲端是唯一早期備份，無法安全保留兩者就先停止，勿直接覆蓋。',
   '上傳完成後在 PS5 檢查同步狀態與雲端時間，記錄「A／W2 入口／前置筆記／時間」。網站僅保存你的手動確認，不能驗證檔案可還原。',
   '建議測試順序：Rand → 還原 A → Hermanubis → 還原 A → Byron 並續玩。這是讓高前置風險先暴露的建議順序；來源沒有要求固定獎盃先後。每條路線詳情末尾都有還原步驟。',
   '完成前兩條分支後，不要把分支新存檔上傳取代 A。先確認獎盃與清單紀錄、關閉遊戲，從雲端 Download to Console Storage 還原 A，核對時間與載入位置後再選下一條。',
   '最後一條與續玩進度確認後，才決定是否更新雲端及恢復 Auto-Sync。沒有正確前期旗標時，一份 W2 備份不能保證三結果；需更早節點或額外周目。'
  ],sources:['ps5','walkthrough','ps5Guide'],verificationStatus:'unverified',
  recovery:'雲端 A 必須仍是入口版本；若被新分支取代，停止還原，查較早的已知安全副本。不要刪除本機／雲端資料來模仿 Xbox 手法。PS5 目前版本三結果未經本工具實測。'
 });
 const terminal=choice('somnodrome-command','Somnodrome 終端','進入熱帶島嶼後的 MILTON terminal','/rm → Force run somnodrome_v2_final_final.bat','開啟 emergency root menu，再強制執行畫面上的批次檔',['w2Terminal'],'僅為遊戲內選單／指令，不是要在電腦終端執行。','confirmed');
 patch('working-somnodrome',{
  actions:['先決定本次市長路線，查看 P6 的「入機前」與公共社群選項，再進行本步驟。不要先做完共同劇情才讀分歧。','親自入機後到熱帶島嶼 MILTON 終端開 emergency root menu，依下列畫面原文執行，與 Miltohim 對話後離開。原攻略寫 final.final 是簡述，不能當精確檔名。','Miltohim 的大哉問在攻略中被記作不影響這條選舉路線；目前沒有窮舉驗證，先依你的路線筆記保留。回來後對 Hermanubis、配對聯絡人、Cryer 的回答仍會分歧。','Hanni 備份點在出機後，與本頁 A 的入口點及前期社群策略不同；不要用後面的節點覆蓋唯一 A，再期待能重選先前對話。'],
  dialogue:[choice('somnodrome-plug','Hermanubis（452）','決定親自使用',"I'm going to plug in and find out for myself.",'我要親自接入並確認',['w2Plug'],'畫面原文已核對；入機前第一輪回應須另看該市長路線。','confirmed'),terminal],
  sources:['w2Plug','w2Terminal','manorW2','walkthrough','steam'],verificationStatus:'consensus'
 });
 const contactNote='實際截圖的配對人物是 Helga；英文選項確實存在，但 Rand 路線是否逐字相同仍待其畫面核對。';
 const ready=()=>choice('interview-ready','Cryer（656）','接受訪問',"I'm ready.",'接受現在訪問',['w2Interview'],'畫面已核對。','confirmed');
 const hidden=()=>choice('contact-hide','配對聯絡人（本路線應為 Rand）','不描述所見',"I don't know what you're talking about.",'隱瞞 Somnodrome 所見',['w2Contact','election'],contactNote,'unverified');
 const restore='先確認 Act V Neith 公告與 PS5 獎盃，記錄本分支並下載清單 JSON；這份 JSON 不是遊戲存檔。若還要另一結果，保持本遊戲 Auto-Sync 關閉，關閉遊戲→核對雲端 A 的入口時間→Download to Console Storage（雲端→主機）→確認載入回 W2 入口。不要把剛完成分支上傳取代 A。若 A 時間或位置不符，停止，查早期副本。最後一條才決定續玩與恢復自動同步。';
 const branchData={
  rand:{actions:['前期：博物館回報、Doge 配對、N1 邀請、N2 嘗試使用、三個城市 NPC 與簡報、S1 關係修補；入機前向 Hermanubis 表示 Rand 可能是對的，再親自使用。','本頁 Rand 主路線不套用另一攻略的公共貼文組合。W2 回覆順序如下；六次道德回應的中文方向有多份玩家紀錄，但缺英文畫面，仍標待查證。','完成後進入 Megastructure 救援 Byron，Act V 聽 Neith 公告並核對 A New Morality。若不是 Rand，不覆蓋 A，回查前期旗標。'],dialogue:[
   choice('rand-before','Hermanubis（452）','入機前第一輪',null,'表示 Rand 可能是對的',['election','walkthrough'],'既有 Rand was right 是攻略摘要，沒有截圖就不當完整英文選項。'),
   choice('rand-plug','Hermanubis（452）','親自使用',"I'm going to plug in and find out for myself.",'親自入機',['w2Plug'],'入機選項畫面核對；先完成上一輪對話。','confirmed'),
   choice('rand-wake','Hermanubis（452）','甦醒後','I think so.','回覆自己沒事',['w2Wake','election'],'修正先前摘要的 I am fine；實際畫面是 I think so。','confirmed'),
   choice('rand-curious','Hermanubis（452）','甦醒後追問',null,'反問他是否也好奇',['election','ps5Guide']),
   choice('rand-sleep','Rand（303）','道德回應 1','I went into Sleep Mode and spoke to... something.','說出睡眠中遇到某個存在',['w2Contact','election'],contactNote,'unverified'),
   choice('rand-intuition','Rand（303）','道德回應 2',null,'直覺上連結著善與惡',['election','randReport','ps5Guide']),
   choice('rand-complexity','Rand（303）','道德回應 3',null,'道德太複雜，不能寫成簡單規則',['election','randReport','ps5Guide']),
   choice('rand-authority','Rand（303）','道德回應 4',null,'遇到的存在或許不是所尋道德權威',['election','randReport','ps5Guide']),
   choice('rand-compassion','Rand（303）','道德回應 5',null,'道德仰賴同情，不只是理性',['election','randReport','ps5Guide']),
   choice('rand-judgment','Rand（303）','道德回應 6',null,'先建立自己的判斷，再公開資料',['election','randReport','ps5Guide']),
   ready(),choice('rand-bugs','Cryer（656）','描述所見','Bugs, mostly.','主要是 bugs',['guide','oldSteamMirror'],'英文短選項有文字來源；不同準備路線共用措辭不代表其餘選項可混用。'),
   choice('rand-send','Cryer（656）','資料交付',"I'm transmitting the data to Rand. Only our scholars could make sense of what I saw.",'資料交給 Rand／學者',['steam'],'英文見 Hanni；主路線中文交付對象另有 Xbox 與 PS5 攻略佐證，PS5 字形未實測。'),
   choice('rand-vtol','Hermanubis（452）','VTOL 前最後對話',null,'理解你的恐懼，但未來不能建立在謊言上',['election','randReport','ps5Guide'],'與 Hanni 的扼殺物種答覆不同，不替換。')
  ]},
  hermanubis:{actions:['還原 A 後，先處理下方公共社群，再進 Lost Lab。若選項不存在，不另猜一個近似答案；記下實際可選項。','這裡使用完整入機路線；原作者另有不入機、不回社群、最後維護神話的個人成功紀錄，不能當任意存檔保證。','訪問延後後，進 Megastructure 救援 Byron，Act V 核對 Hermanubis 與 Balance，再依還原順序處理下一條。'],dialogue:[
   choice('herman-theory','公共社群','The Theory of Everything',null,'同意 Malduc',['election','walkthrough']),
   choice('herman-future','公共社群','Is there even a future?',null,'憂慮目前正在走錯方向',['election','walkthrough'],'有其他攻略提供不同替代，適用門檻仍未核實。'),
   choice('herman-warning','公共社群','A Warning',null,'不認為階級形成；不成長的社會可平等平衡',['election','walkthrough']),
   choice('herman-goal','公共社群','The Goal Megathread',null,'選忠誠，並肯定值得贏得的忠誠有價值',['election','walkthrough'],'貼文標題／實際分支請對照當下 PDA，不只依畫面位置。'),
   choice('herman-before','Hermanubis（452）','入機前',null,'先詢問他的想法，再選親自接入',['election']),terminal,
   choice('herman-wake','Hermanubis（452）','甦醒後','Know. I mean... no. I think I might be a little overloaded.','表示自己不好／有些過載',['w2Wake','election'],'保留截圖上的 Know 字樣；不同版本實際拼字仍待 PS5 核對。','confirmed'),
   choice('herman-advice','Hermanubis（452）','甦醒後追問',null,'詢問接下來該怎麼做',['election']),hidden(),
   choice('herman-contact-followup','Rand（303）','第二次隱瞞',null,'第二次仍不透露所見',['election'],'不能只給固定第一項；完整英文與上下文仍待查證。'),
   choice('herman-delay','Cryer（656）','訪問邀請','I need more time to think.','延後訪問',['w2Interview'],'已核對畫面原文。','confirmed'),
   choice('herman-vtol','Hermanubis（452）','VTOL 前最後對話','The myth must be preserved to prevent us from repeating the mistakes of our ancestors.','維護神話以避免重蹈祖先錯誤',['oldSteamMirror'],'只用以核對英文；舊版轉載的市長標籤有相反之處，不採其結果配對。')
  ]},
  byron:{actions:['還原 A 後，公共社群採支持成長的回覆，再走下列入機／訪問流程；若只處理社群卻仍得到 Hermanubis，原作者建議加做完整 Somnodrome 公開資料路線。','資料交給公眾，與 Rand 路線的交付對象相反。最後是否扼殺物種仍要和本路線準備配對，不與 Rand 最後的「恐懼與謊言」答覆交換。','推進救援後在 Act V 核對 A New Beginning。若作為最後一條，確認要續玩的進度後才更新雲端或恢復自動同步。'],dialogue:[
   choice('byron-theory','公共社群','The Theory of Everything',null,'同意 Shmilev',['election','walkthrough'],'有玩家回報 Shmilev 回覆未出現；沒有已驗證的通用替代。'),
   choice('byron-future','公共社群','Is there even a future?',null,'盡力而為／做自己能做的最好選擇',['election','walkthrough']),
   choice('byron-warning','公共社群','A Warning',null,'可以成長擴張，同時避免重複過去錯誤',['election','walkthrough']),
   choice('byron-founder','公共社群','Founder／Goal Megathread（標題有歧異）',null,'不虧欠 Athena／Founder',['election','walkthrough'],'兩份同作者頁面的貼文標題不同，精確題名仍待查證。'),
   choice('byron-before','Hermanubis（452）','入機前',null,'親自使用；第一輪回應沒有嚴格要求的說法僅為攻略經驗',['election']),terminal,
   choice('byron-wake','Hermanubis（452）','甦醒後','I think so.','回覆自己沒事',['w2Wake','election'],'截圖英文與攻略語意相符。','confirmed'),hidden(),
   choice('byron-contact-followup','Rand（303）','第二次隱瞞',null,'仍不透露所見',['election']),ready(),
   choice('byron-future-interview','Cryer（656）','描述所見',null,'告訴人民你看見未來',['election'],'完整英文原句未核實，不以反向翻譯填補。'),
   choice('byron-send','Cryer（656）','資料交付',"I'm transmitting the data to everyone.",'資料交給所有人',['manorW2','steam'],'畫面所屬其他配對也有此英文；當選結果仍取決前置。'),
   choice('byron-vtol','Hermanubis（452）','VTOL 前最後對話','Your myth is strangling our entire species, Herman.','神話正在扼殺整個物種',['oldSteamMirror','election'],'英文文字可核對，不代表舊版轉載的所有社群路由正確。')
  ]}
 };
 for(const branch of branches){
  const content=branchData[branch.id];branch.restore=restore;
  branch.prerequisites=[...new Set([...branch.prerequisites,'museum','west-arrival'])];
  branch.evidenceNote='共用入口備份路線的準備清單；不是此市長在所有玩法下的硬性條件。英文、中文方向與 PS5 重現分開看。';
  patch(branch.stepId,{actions:[...content.actions,restore],dialogue:content.dialogue,prerequisites:branch.prerequisites,recovery:restore,sources:[...new Set(content.dialogue.flatMap(row=>row.sources))],verificationStatus:'unverified'});
 }
 patch('w2-backup',{prerequisites:branches[0].prerequisites.filter(id=>id!=='w2-backup')});
 roadmap.version='2026.10.31.2';roadmap.moduleVersion='1.0.1';
 roadmap.mayorResearch={checkedAt,route:'W2 入口 A／XboxAchievements 分支；不混用 Hanni 出機後備份法',transcriptionNote:'已核對的英文有逐項來源；英文空白與人物適用性未證實者均標待查證。影片僅讀取頁面與章節，未取得可播放影格，不算逐字驗證。',ps5Acceptance:'未在 PS5 實機還原三結果，不保證一份備份可補救錯誤前置。'};
}
