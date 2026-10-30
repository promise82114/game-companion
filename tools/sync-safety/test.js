(function(){
 'use strict';
 const $=id=>document.getElementById(id);let ready=false,busy=false,result=null;
 const auth=new SideProjectAuth.GoogleAuth(SIDE_PROJECT_CLOUD_CONFIG.clientId,render);
 function render(){$('connect').disabled=busy;$('connect').textContent=ready?'連接／切換 Google 帳號':'載入 Google 授權服務';$('verify').disabled=busy||!auth.connected;$('game').disabled=busy;}
 $('connect').onclick=async()=>{
  try{if(!ready){busy=true;render();await auth.prepare();ready=true;$('status').textContent='服務已就緒，請再次按連接以完成 Google 授權。';return;}
   const grant=auth.connect({selectAccount:true});busy=true;render();await grant;$('status').textContent='已授權。下一步只建立此遊戲的合成測試檔。';
  }catch(error){$('status').textContent=error.message;}finally{busy=false;render();}
 };
 $('verify').onclick=async()=>{
  busy=true;render();$('status').textContent='測試中：正確版本更新、過期版本拒絕、兩個請求競爭與內容核對。';
  const gameId=$('game').value,drive=new SideProjectDrive.DriveAppData(auth,'game-companion.'+gameId+'.progress.v1.json',{gameId,projectId:'game-companion.'+gameId,writesEnabled:false});
  try{const proof=await drive.verifySafety();result={gameId,passed:true,checkedAt:proof.checkedAt,probeId:proof.probeId,etagSource:proof.etagSource,staleStatus:proof.staleStatus,parallelStatuses:proof.parallelStatuses};$('status').textContent='PASS：過期寫入被拒絕，競爭恰好一個成功、一個 412，內容一致。';}
  catch(error){result={gameId,passed:false,code:error.code||'error',message:error.message};$('status').textContent='未通過；遊戲雲端寫入不得啟用。';}
  finally{$('result').textContent=JSON.stringify(result,null,2);$('export').disabled=false;busy=false;render();}
 };
 $('export').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(result,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='game-companion-sync-safety.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 render();
})();
