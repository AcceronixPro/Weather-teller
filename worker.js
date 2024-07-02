if (!('serviceWorker' in navigator)) {
  // service workers not supported 😣
  return
}

window.addEventListener('load', () => {
  if (!('serviceWorker' in navigator)) {
    // service workers not supported 😣
    return
  }

  navigator.serviceWorker.register('/worker.js').then(
    () => {
      // registered! 👍🏼
    },
    err => {
      console.error('SW registration failed! 😱', err)
    }
  )
})
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(' https://acceronixpro.github.io/PADX/')
      .then(cache =>
        cache.addAll([
          'favicon.ico',
          'index.html',
          'styles.css',
          'script.js',
          'worker. js', 
          'https://fonts.googleapis.com/css?family=Inconsolata:400,700'
        ])
      )
  )
})
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        //we found an entry in the cache!
        return response
      }
      return fetch(event.request)
    })
  )
})