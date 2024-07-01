<script setup lang="ts">
import { ref } from 'vue'

const requestResult = ref('')
async function requestNotificationPermission() {
	if (!('Notification' in window)) {
		requestResult.value = 'Browser does not support notifications'
	}

	const permission = await Notification.requestPermission()

	if (permission !== 'granted') {
		requestResult.value = 'Permission not granted'
		throw new Error('Permission not granted')
	} else {
		requestResult.value = 'Permission granted'
		new Notification('Permission granted')
	}
}
</script>

<template>
	<div>pwa-notification</div>
	<div>
		<button @click="requestNotificationPermission">Enable Notification</button>
		<div>{{ requestResult }}</div>
	</div>
</template>

<style scoped></style>
