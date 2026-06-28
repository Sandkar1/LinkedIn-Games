var CACHE_NAME='puzzle-games-v2';
var NETWORK_FIRST_URLS=[
  'assets/app.css',
  'assets/app.js',
  'sw.js'
];
var OFFLINE_URLS=[
  './',
  'index.html',
  'patches.html',
  'minisudoku.html',
  'sudoku.html',
  'queens.html',
  'wend.html',
  'zip.html',
  'tango.html',
  'pinpoint.html',
  'crossclimb.html',
  'assets/app.css',
  'assets/app.js'
];

self.addEventListener('install',function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(OFFLINE_URLS);
    }).then(function(){
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate',function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(key){
        if(key!==CACHE_NAME)return caches.delete(key);
      }));
    }).then(function(){
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch',function(event){
  var request=event.request;
  if(request.method!=='GET')return;
  var url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  var path=url.pathname.replace(self.registration.scope.replace(url.origin,''),'').replace(/^\/+/,'');
  if(NETWORK_FIRST_URLS.indexOf(path)>=0){
    event.respondWith(
      fetch(request).then(function(response){
        if(response&&response.ok){
          var copy=response.clone();
          caches.open(CACHE_NAME).then(function(cache){cache.put(request,copy);});
        }
        return response;
      }).catch(function(){
        return caches.match(request);
      })
    );
    return;
  }
  if(request.mode==='navigate'){
    event.respondWith(
      fetch(request).then(function(response){
        var copy=response.clone();
        caches.open(CACHE_NAME).then(function(cache){cache.put(request,copy);});
        return response;
      }).catch(function(){
        return caches.match(request).then(function(cached){
          return cached||caches.match('index.html');
        });
      })
    );
    return;
  }
  event.respondWith(
    caches.match(request).then(function(cached){
      if(cached)return cached;
      return fetch(request).then(function(response){
        if(response&&response.ok){
          var copy=response.clone();
          caches.open(CACHE_NAME).then(function(cache){cache.put(request,copy);});
        }
        return response;
      });
    })
  );
});
