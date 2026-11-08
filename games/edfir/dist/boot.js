// 直接引用既有可配置儲存與安全同步；source / artifact 各自保持相對路徑。
const source=import.meta.url.includes('/dist/');
const talos=new URL(source?'../../talos2/dist/':'../talos2/',import.meta.url);
const base=document.createElement('link');base.rel='stylesheet';base.href=new URL(source?'../../grounded/dist/style.css':'../grounded/style.css',import.meta.url);document.head.prepend(base);
try{
 for(const name of ['sync-core','progress-envelope','google-auth','drive-appdata','sync-session'])await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=new URL('shared/'+name+'.js',talos);script.onload=resolve;script.onerror=()=>reject(Error('共用同步資源載入失敗：'+name));document.head.append(script);});
 await import('./app.js');
}catch(error){document.getElementById('app').textContent='載入失敗：'+error.message;}
