// 2026-11-08 UX 健檢：只修正可查證的警示，不把網站勾選當作遊戲旗標。
export function applyUxSafety(data){
 const step=id=>data.steps.find(s=>s.id===id);
 step('neutral-route').warningLevel='prepare'; // 閱讀路線限制，不是遊戲內的不可逆作答。
 for(const id of ['single-rod','one-lap','hard-way']){
  const s=step(id);s.warningLevel='prepare';s.missable=false;s.verificationStatus='consensus';
  s.actions[s.actions.length-1]='照本區謎題清單的獎盃專用解法完成，再查看 PS5 獎盃。若已解過，可用題目旁的 Prometheus 終端重試；PS5 攻略與 Steam 攻略皆有記載，本站未實機驗收。';
  s.recovery='已解過可用題目旁的 Prometheus 終端重試，重新符合特殊條件後核對獎盃；不必直接重開整輪。實際 PS5 版本的跳盃仍須玩家確認。';
  s.verification='2026-11-08：PSTHC PS5 攻略（作者版本 2.04）與 Hanni Steam 攻略均記載可在題目旁終端重試；不再標為只能首次取得。';
  s.sources=[...new Set([...s.sources,'ps5Guide','steam'])];
 }
 step('purple').warningLevel='prepare';
 step('purple').sources=[...new Set([...step('purple').sources,'ps5Guide','steam'])];
 step('purple').verification+=' 2026-11-08：PSTHC 建議序章完成，Hanni 記載第一或第二次城市皆可；不是已確認只能序章取得。';
 step('purple').recovery='先在序章完成。Hanni 記載第二次城市也可取得；PS5 各版本最晚時機仍待查證，不以離開序章判定已錯過。';
 step('schuyler').verification='2026-11-08：PSTHC PS5 攻略列在序章、提醒不可回應他是怪物；Hanni Steam 攻略卻寫僅第二次城市。觸發回訪與平台差異待查證，維持先在序章尋找，不保證序章一定出現。';
 step('schuyler').trigger='序章先找 Schuyler；若當下沒有相關對話，第二次回城再確認。不要選他是怪物的回應。';
 step('schuyler').sources=[...new Set([...step('schuyler').sources,'ps5Guide','steam'])];
 step('text-adventures').warningLevel='prepare';
 step('text-adventures').recovery='終端中的失敗結局可以重新開始；三台都需達成完成結局。先在第二次回城完成，整個展區的最晚可用時機仍待查證。';
 step('text-adventures').verification='2026-11-08：PSTHC 與 Hanni 均要求完成結局而非 Game Over；終端內選錯可重試，不能把一次選錯標為不可逆。';
 step('text-adventures').sources=[...new Set([...step('text-adventures').sources,'ps5Guide','steam'])];
 step('sinner').actions=step('sinner').actions.map(text=>text.replace('實測攻略列出的回覆','攻略列出的回覆'));
 for(const id of ['chicken','petition','sinner','team','city-tour'])step(id).sources=[...new Set([...step(id).sources,'ps5Guide','steam'])];
 step('working-somnodrome').verification='2026-11-08：PSTHC 的 Gnothi Seauton 段落把可用裝置寫在 N2，與其市長段落及 Hanni 的 W2 記載不一致；維持 N2 損壞、W2 可用，精確平台差異仍待查證。';
 step('w2-backup').verification='2026-11-08：PSTHC 採 W2 實驗室前備份，Hanni 採使用 Somnodrome 後備份，兩者有不同前期社群策略。不可混搭或據此保證任一存檔能切三市長。';
 step('w2-backup').sources=[...new Set([...step('w2-backup').sources,'ps5Guide','steam','ps5'])];
}

// 提醒放在危險節點之前；只顯示尚未手動確認的獎盃，不推斷已錯過。
export const safetyChecks={
 'departure-check':{before:'首次登上 VTOL 前',items:[['chicken','chicken'],['signatory','petition'],['your-biggest-fan','schuyler'],['excellent','purple'],['museum-explorer','museum']],note:'Chicken 只在首次簡報拒絕時觸發；現在未確認取得，先核對 PS5 通知。Schuyler 的回訪時機有來源衝突，詳見查證。'},
 'north-exit':{before:'進北側巨構前',items:[['team-spirit','team'],['not-what-it-seems','doge-match']],note:'先與四位隊友交談，並核對 Doge 配對與 Rand 私訊；關鍵角色離隊後，網站勾選不能補回遊戲對話。'},
 'city-exit':{before:'第二次回城、再登上 VTOL 前',items:[['sinner','sinner'],['text-adventurer','text-adventures'],['good-citizen','city-tour'],['your-biggest-fan','schuyler'],['excellent','purple']],note:'先處理城市對話與展覽，再離城。Sinner 的關閉時機與 Schuyler 的回訪有來源差異；保留早期存檔，不把未勾選當成已錯過。'},
 'w2-backup':{before:'進 W2 Lost Lab／選擇 Somnodrome 路線前',items:[],steps:['doge-intro','petition','doge-survey','doge-match','rand-north','broken-somnodrome','city-politics','rand-south','region-w1','region-w3','region-w2'],note:'先核對前期選擇、所有西區塔與可辨識的 PS5 入口備份。來源採不同備份點與社群策略；W2 備份不能補做早期旗標，也不保證三市長全成功。'},
 'final-backup':{before:'最終登上 VTOL、進巨構前',items:[['renaissance-robot','all-puzzles'],['ab-aeterno','miranda'],['the-edge-of-forever','stars']],note:'最後登機前完成島上清理並保留 PS5 存檔。還原遊戲存檔不會回復網站清單；請分別保存。'}
};
