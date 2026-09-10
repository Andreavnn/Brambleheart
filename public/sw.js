const CACHE='brambleheart-shell-v0.26'
const SHELL=['/','/assets/Logo.png','/icons/favicon-64.png','/icons/icon-192.png','/icons/icon-512.png','/icons/icon-maskable-512.png','/icons/apple-touch-icon.png','/manifest.webmanifest','/audio/brambleheart-launch.wav']
const CACHEABLE_DESTINATIONS=new Set(['script','style','image','font','manifest','worker','audio'])

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).catch(()=>undefined))
  self.skipWaiting()
})
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))))
  self.clients.claim()
})
self.addEventListener('fetch',event=>{
  const request=event.request
  if(request.method!=='GET')return
  const url=new URL(request.url)
  if(url.origin!==self.location.origin)return

  if(request.mode==='navigate'){
    event.respondWith(
      fetch(request).then(response=>response).catch(async()=>{
        const shell=await caches.match('/')
        return shell||Response.error()
      })
    )
    return
  }

  if(!CACHEABLE_DESTINATIONS.has(request.destination))return
  event.respondWith(
    fetch(request).then(response=>{
      if(response.ok){
        const copy=response.clone()
        event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>undefined))
      }
      return response
    }).catch(async()=>{
      const cached=await caches.match(request)
      return cached||Response.error()
    })
  )
})
