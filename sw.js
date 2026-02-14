const CACHE_NAME = 'nss-camp-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './packing-list.html',
    './styles.css',
    './script.js',
    './nss.jpg',
    './song.mp3',
    './nss_logo.svg',
    './consent-form.pdf',
    './rulebook.pdf',
    './packing-list.pdf'
];

// Install Event - Cache Files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event - Clean Up Old Caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch Event - Serve Cached Files
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if found, else fetch from network
            return response || fetch(event.request);
        })
    );
});
