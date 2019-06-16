const cacheName = 'dev-portfolio';
const cacheFiles = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/main.js',
  '/img/github-icon.svg',
  '/img/logo.jpg',
  '/img/twitter-icon.svg',
  '/img/portrait.jpg',
  '/img/rustyabbott.com-screenshot.png',
  '/img/arcade-game-screenshot.png',
  '/img/bubble-sort.png',
  '/img/feedreader-screenshot.png',
  '/img/github-white-logo.svg',
  '/img/restaurant-reviews-screenshot.png',
  '/img/react-myreads-screenshot.png',
];

self.addEventListener('install', event => {
  console.log('Service Worker installing');
  event.waitUntil(caches.open(cacheName).then(cache => {
      return cache
      .addAll(cacheFiles)
      .catch(error => {
        console.log('Caches.open failed with error: ' + error);
      })
    })
  )
})

self.addEventListener('activate', event => {
  console.log('Service Worker activating');
})

self.addEventListener('fetch', event => {
  if (event.request.method != 'GET') return;
  event.respondWith(async function() {
    const cache = await caches.open('retaurant-reviews-app');
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      event.waitUntil(cache.add(event.request));
      return cachedResponse;
    }
    return fetch(event.request);
  }());
});
