<script setup lang="ts">
import { ref } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { API_URL } from './config'

const error = ref('')
const requestResult = ref('')
const isSubscribed = ref(false)

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

			requestResult.value = 'Permission granted'

			const registration = await navigator.serviceWorker.ready
			if (!registration) {
				throw new Error('Registration not found')
			}

			const subscription = await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey:
					'BOjJnBcfbMeP71027aYwti0pyjbmqYlSMfHdwcavFKO9AfY-T8_cJZCxEXmjQ48hmfKqeTueyJ4f4B-0cxo2zrs',
			})

			try {
				const response = await saveSubscription(subscription)

				if (response.status === 'Success') {
					isSubscribed.value = true
				}

				alert('over')
			} catch (e) {
				throw new Error('Failed to save subscription: ' + e)
			}
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
	try {
		console.log('Starting fetch request')
		const response = await fetch(`${API_URL}/save-subscription`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(subscription),
		})

		console.log('Fetch request completed')
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}

		const responseData = await response.json()
		console.log('Response data:', responseData)
		return responseData
	} catch (error) {
		console.error('Failed to save subscription:', error)
		throw error
	}
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

async function testPost() {
	try {
		const response = await fetch(`${API_URL}/webpush/test-post`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error('Network response was not ok')
		}

		const responseData = await response.json()
		console.log('Response data:', responseData)

		alert(responseData.status)
		return responseData
	} catch (error) {
		console.error('Failed to save subscription:', error)
		throw error
	}
}

async function testGet() {
	try {
		const response = await fetch(`${API_URL}/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error('Network response was not ok')
		}

		const responseData = await response.json()
		console.log('Response data:', responseData)

		alert(responseData.message)

		return responseData
	} catch (error) {
		console.error('Failed to save subscription:', error)
		throw error
	}
}
</script>

<template>
	<div>pwa-notification</div>
	<div>
		<button @click="requestNotificationPermission">Enable Notification</button>
		<div>Notification Permission: {{ requestResult }}</div>

		<div>SW Activated: {{ swActivated }}</div>
		<div>SW Registration Error: {{ swRegistrationError }}</div>

		<div>Is Subscribed: {{ isSubscribed }}</div>

		<div>General Error: {{ error }}</div>
	</div>

	<div style="margin-top: 20px">
		<button @click="showNotification">Show Notification</button>
		<div>Counter: {{ counter }}</div>

		<button @click="testPost">Test Post</button>

		<button @click="testGet">Test Get</button>
	</div>

	<div style="position: absolute; bottom: 20px">
		<button @click="reload">Reload page</button>
	</div>
</template>

<style scoped></style>
