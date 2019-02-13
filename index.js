if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw-worker.js')
      .then(function () { console.log('Service Worker Registered'); })
      .catch(function (error) { console.log('Service worker registration failed, error:', error); });
}