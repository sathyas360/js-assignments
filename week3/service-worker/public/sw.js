// Minimal service worker: receives a push event and forwards it to the page.
// Simulate one from DevTools -> Application -> Service Workers -> Push.

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', (event) => {
  const message = event.data ? event.data.text() : 'New notification'

  const notification = {
    id: Date.now(),
    message,
    timestamp: new Date().toISOString(),
    read: false,
  }

  event.waitUntil(
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => client.postMessage(notification))
    })
  )
})
