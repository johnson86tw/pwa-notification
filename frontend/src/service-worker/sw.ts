/// <reference lib="webworker" />

console.log('New service worker is installing...')

declare const self: ServiceWorkerGlobalScope

// To force the new service worker to activate immediately
self.addEventListener('install', () => void self.skipWaiting())

self.addEventListener('activate', async () => {
	self.registration.showNotification('Service worker is activated')
})

self.addEventListener('push', event => {
	self.registration.showNotification('New message', { body: event.data?.text() })
})
