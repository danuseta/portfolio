export function registerServiceWorker() {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(function(registration) {
            console.log('ServiceWorker registration successful');
          })
          .catch(function(error) {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
    }
  }