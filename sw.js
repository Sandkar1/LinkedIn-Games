var CACHE_NAME='puzzle-games-v6-stars';
var APP_SHELL_URLS=[
  'assets/app.css',
  'assets/app.js',
  'assets/stars-core.js',
  'assets/stars.js',
  'sw.js'
];
var OFFLINE_URLS=[
  './',
  'index.html',
  'patches.html',
  'minisudoku.html',
  'sudoku.html',
  'queens.html',
  'stars.html',
  'wend.html',
  'zip.html',
  'tango.html',
  'pinpoint.html',
  'crossclimb.html',
  'assets/app.css?v=20260802-1',
  'assets/app.js?v=20260802-1',
  'assets/stars-core.js?v=20260802-1',
  'assets/stars.js?v=20260802-1'
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
  function fetchAndCache(){
    return fetch(request).then(function(response){
      if(response&&response.ok){
        var copy=response.clone();
        return caches.open(CACHE_NAME).then(function(cache){
          return cache.put(request,copy);
        }).catch(function(){}).then(function(){return response;});
      }
      return response;
    });
  }
  if(request.mode==='navigate'||APP_SHELL_URLS.indexOf(path)>=0){
    event.respondWith(
      fetchAndCache().catch(function(){
        return caches.match(request,{ignoreSearch:true}).then(function(cached){
          if(cached)return cached;
          if(request.mode==='navigate')return caches.match('index.html');
          return caches.match(request,{ignoreSearch:true});
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
