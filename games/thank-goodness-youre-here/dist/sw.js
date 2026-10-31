const PREFIX='game-companion.thank-goodness-youre-here.assets.',CACHE=PREFIX+'v1';
const ASSETS=['./','./index.html','./style.css','./guide.json','./model.js','./app.js','./cloud-config.js','./shared/progress-envelope.js','./shared/sync-core.js','./shared/sync-session.js','./shared/google-auth.js','./shared/drive-appdata.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url),scope=new URL(self.registration.scope);
  if(event.request.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
  event.respondWith(fetch(event.request).catch(()=>caches.open(CACHE).then(cache=>cache.match(event.request,{ignoreSearch:true})).then(response=>response||Response.error())));
});
