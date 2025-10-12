const CACHE_NAME = 'wyklady-app-v1'; // Zmieniłem nazwę cache dla porządku
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/ikony/ikona-192.png'
];

// Instalacja Service Workera i zapisanie plików w cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Otwarto cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Pobieranie zasobów z cache, gdy aplikacja jest offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});