/* 各遊戲獨立 Drive 讀取入口。競爭寫入未驗證，所有雲端寫入維持停用。 */
(function(global){
 'use strict';
 const $=id=>document.getElementById(id),config=global.SIDE_PROJECT_CLOUD_CONFIG,local=global.EDF_CHECKLIST_STORAGE;
 let ready=false,busy=false,session=0;
 const auth=new global.SideProjectAuth.GoogleAuth(config.clientId,render);
 const drive=new global.SideProjectDrive.DriveAppData(auth,config.fileName);
 function message(value){$('cloudStatus').textContent=value;}
 function render(){
  $('cloudQuick').textContent='雲端寫入停用';
  $('cloudUpload').disabled=true;$('cloudUpload').textContent='雲端寫入尚未驗證';
  $('cloudAuto').checked=false;$('cloudAuto').disabled=true;
  $('cloudChoices').hidden=true;
  $('cloudConnect').disabled=busy;$('cloudRead').disabled=busy||!auth.connected;
  $('cloudDisconnect').hidden=!auth.connected;$('cloudDisconnect').disabled=busy;
  $('cloudConnect').textContent=busy?'處理中…':ready?'連接／切換 Google 帳號':'載入 Google 授權服務';
  $('cloudAuthStatus').textContent=auth.connected?'此頁已授權，僅允許手動下載；重整或授權過期後需重新連接。':'Token 僅保留於此頁記憶體；尚未連接或授權已到期。';
 }
 async function run(action){if(busy)return;busy=true;render();try{await action();}catch(error){message(error.message);}finally{busy=false;render();}}
 function open(){
  $('cloudDialog').showModal();
  try{$('cloudLocalSummary').textContent=Object.values(local.get().entries).filter(e=>e?.owned).length+' 項已取得';}catch(error){message(error.message);}
  message('Google Drive 寫入已停用。只會尋找 '+config.fileName+'，不讀取舊站備份。');
  if(!ready)run(async()=>{await auth.prepare();ready=true;message('授權服務已就緒；連接後可手動下載新命名空間的備份。');});
 }
 $('cloudOpen').onclick=open;$('cloudQuick').onclick=open;
 $('cloudConnect').onclick=()=>{
  if(!ready){run(async()=>{await auth.prepare();ready=true;});return;}
  const expected=++session;
  // connect 在 click 的使用者手勢中呼叫，不啟動任何同步或寫入。
  const grant=auth.connect({selectAccount:true});run(async()=>{await grant;if(expected===session)message('已連接。請按下載比較；雲端不會自動變更。');});
 };
 $('cloudDisconnect').onclick=()=>{session++;auth.disconnect();message('已中斷連接；本機與雲端資料都保留。');};
 $('cloudRead').onclick=()=>run(async()=>{
  const expected=session,remote=await drive.read();
  if(expected!==session||!auth.connected)throw Error('帳號連接已變更，請重新下載。');
  if(!remote){$('cloudRemoteSummary').textContent='此遊戲的新命名空間尚無備份';message('沒有新站備份；請由舊站匯出 JSON，再於備份與還原中匯入。');return;}
  global.SideProjectProgress.unpack(remote.value,config.projectId,local.validate);
  $('cloudDialog').close();$('backupDialog').showModal();global.EDF_MIGRATION.preview(remote.value,'Google Drive 手動下載');
 });
 $('cloudExport').onclick=()=>local.export(global.SideProjectProgress.pack(config.projectId,local.get()));
 // 沒有自動同步、online/visibility timer，也沒有呼叫 drive.write 的路徑。
 render();
})(window);
