importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
    console.log('Yay! Workbox is loaded');
} else {
    console.log('Boo! Workbox did not load');
}

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  // Cache image files     (regex not working)
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst(
  //  {
  //    // Use a custom cache name
  //    cacheName: 'image-cache',
  //    plugins: [
  //      new workbox.expiration.Plugin({
  //          // Cache only 20 images
  //          maxEntries: 20,
  //          // Cache for a maximum of a week
  //          maxAgeSeconds: 7 * 24 * 60 * 60,
  //      })
  //    ],
  //}
  )
);

workbox.precaching.precacheAndRoute([
    '/app/css/style.css',
    '/app/css/form.css',
    '/app/Scripts/angular.min.js',
     '/app/Scripts/angular-route.min.js',
     '/app/Scripts/Module/Module.js',
      '/app/Scripts/Services/LeaveServices.js',
       '/app/Scripts/Services/EmployeeServices.js',
     '/app/Scripts/Controller/LeaveController.js',
      '/app/Scripts/Controller/EmployeeController.js',
      '/app/images/icons/icon-512x512.png',
     '/manifest.json',
     { url: '/', revision: '383675' },
      { url: '/index.html', revision: '383676' }//,
    //{ url: '/index.html', revision: '383676' }
    // { url: 'app/home.html', revision: '383677' }

]);


//workbox.routing.registerRoute(
//   { url: 'app/LeaveList.html', revision: '383678' },
//      { url: 'app/LeaveDetails.html', revision: '383679' },
//      { url: '/index.html#!/list', revision: '383680' },
//       { url: 'http://localhost:17351/api/Leave/GetList?id=1', revision: '383681' },
//  workbox.strategies.networkFirst({
//      // Use a custom cache name
//      cacheName: 'cache-dynamic',
//  })
//);

//workbox.routing.registerRoute(
//      { url: '/index.html', revision: '383677' },
//       //{ url: '/index.html#!/leavedetails', revision: '383680' },
//       //{ url: 'http://localhost:17351/api/Leave/GetList?id=1', revision: '383681' },
//  workbox.strategies.networkFirst()
//);

workbox.routing.registerRoute(
  new RegExp('.*(/#!/)(?:list)'),
  //new RegExp('.*(/#!/)(?:list|employee|leave)|(.*html)'),
  //new RegExp('http://localhost:17351/api/Leave/GetList.*'),
  workbox.strategies.networkFirst({
      //      // Use a custom cache name
      cacheName: 'cache-dynamic',
  })
);

//workbox.routing.registerRoute(
//  new RegExp('.*\.js'),
//  workbox.strategies.cacheFirst()
//);

self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.open('cache-dynamic').then(function (cache) {
          return cache.match(event.request).then(function (response) {
              return response || fetch(event.request).then(function (response) {
                  cache.put(event.request, response.clone());
                  return response;
              });
          });
      })
    );
});