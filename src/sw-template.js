/* eslint-disable no-undef */
if (workbox) {
  // eslint-disable-next-line
  console.log(`Workbox is loaded 🎉`);
} else {
  // eslint-disable-next-line
  console.log(`Workbox didn't load `);
}
// eslint-disable-next-line
workbox.precaching.precacheAndRoute(self.__precacheManifest);
// eslint-disable-next-line
self.addEventListener('install', (event) =>
  event.waitUntil(self.skipWaiting()),
);
// eslint-disable-next-line
self.addEventListener('activate', (event) =>
  event.waitUntil(self.clients.claim()),
);
// app-shell
workbox.routing.registerRoute('/', new workbox.strategies.NetworkFirst());
// Cache cdn files and external links
workbox.routing.registerRoute(
  // eslint-disable-next-line
  new RegExp('https:.*.(css|js|json|)'),
  new workbox.strategies.NetworkFirst({ cacheName: 'external-cache' }),
);
