<script setup lang="ts">
import { ref } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { API_URL } from './config'

const error = ref('')
const requestResult = ref('')

async function requestNotificationPermission() {
	try {
		if (!('Notification' in window)) {
			requestResult.value = 'Browser does not support notifications'
			throw new Error('Browser does not support notifications')
		}

		const permission = await Notification.requestPermission()

		if (permission !== 'granted') {
			requestResult.value = 'Permission not granted'
			throw new Error('Permission not granted')
		} else {
			requestResult.value = 'Permission granted'

			// const registration = await navigator.serviceWorker.ready

			// const subscription = await registration.pushManager.subscribe({
			// 	userVisibleOnly: true,
			// 	applicationServerKey:
			// 		'BOjJnBcfbMeP71027aYwti0pyjbmqYlSMfHdwcavFKO9AfY-T8_cJZCxEXmjQ48hmfKqeTueyJ4f4B-0cxo2zrs',
			// })

			// const response = await saveSubscription(subscription)
			// console.log('Subscription saved', response)
		}
	} catch (e: any) {
		error.value = e
	}
}

const swActivated = ref(false)
const swRegistrationError = ref('')

useRegisterSW({
	onRegisterError(err) {
		swRegistrationError.value = err
	},
	async onRegisteredSW(_swUrl, _registration) {
		swActivated.value = true
	},
})

async function saveSubscription(subscription: PushSubscription) {
	const response = await fetch(`${API_URL}/save-subscription`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(subscription),
	})
	return response.json()
}

const counter = ref(0)

function showNotification() {
	try {
		counter.value++
		new Notification('showNotification')
	} catch (e: any) {
		error.value = e
	}
}

function reload() {
	location.reload()
}
</script>

<template>
	<div>pwa-notification</div>
	<div>
		<button @click="requestNotificationPermission">Enable Notification</button>
		<div>Notification Permission: {{ requestResult }}</div>

		<div>SW Activated: {{ swActivated }}</div>
		<div>SW Registration Error: {{ swRegistrationError }}</div>

		<div>General Error: {{ error }}</div>
	</div>

	<div style="margin-top: 20px">
		<button @click="showNotification">Show Notification</button>
		<div>Counter: {{ counter }}</div>
	</div>

	<div style="position: absolute; bottom: 20px">
		<button @click="reload">Reload page</button>
	</div>
</template>

<style scoped></style>
