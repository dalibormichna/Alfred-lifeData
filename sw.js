self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('second-brain-cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
                'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
