/// <reference lib="webworker" />

console.log('New service worker is installing...')

declare const self: ServiceWorkerGlobalScope

// To force the new service worker to activate immediately
self.addEventListener('install', () => void self.skipWaiting())

async function saveSubscription(subscription: PushSubscription) {
	const response = await fetch('http://localhost:3000/save-subscription', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(subscription),
	})
	return response.json()
}

self.addEventListener('activate', async () => {
	self.registration.showNotification('Service worker is activated')

	const subscription = await self.registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: 'BOjJnBcfbMeP71027aYwti0pyjbmqYlSMfHdwcavFKO9AfY-T8_cJZCxEXmjQ48hmfKqeTueyJ4f4B-0cxo2zrs',
	})

	const response = await saveSubscription(subscription)
	console.log(response)
})

self.addEventListener('push', event => {
	self.registration.showNotification('New message', { body: event.data?.text() })
})
