const CACHE='brambleheart-shell-v0.07'
const SHELL=['/','/assets/Logo.png','/icons/favicon-64.png','/icons/icon-192.png','/icons/icon-512.png','/icons/icon-maskable-512.png','/icons/apple-touch-icon.png','/manifest.webmanifest']

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).catch(()=>undefined))
  self.skipWaiting()
})
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))))
  self.clients.claim()
})
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return
  event.respondWith(fetch(event.request).then(response=>{
    const copy=response.clone()
    caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>undefined)
    return response
  }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('/'))))
})
