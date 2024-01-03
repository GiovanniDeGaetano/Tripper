let cacheName = 'tripper';
let filesToCache = [
    '../templates/index.html',
    '/css/home.css',
    '/css/navbar.css',
    'main.js',
    '/Images/_logo_.png',
    '/Images/cloud.mp4',
    '/js/navbar.js'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
