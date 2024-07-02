/// <reference lib="webworker" />

console.log('New service worker is installing...')

declare const self: ServiceWorkerGlobalScope

// To force the new service worker to activate immediately
self.addEventListener('install', () => void self.skipWaiting())

self.addEventListener('activate', () => {
	self.registration.showNotification('Service worker is activated')
})
