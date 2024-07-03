import { Express } from 'express'
import webpush, { PushSubscription } from 'web-push'

const subDatabase: PushSubscription[] = []

export default (app: Express) => {
	app.post('/save-subscription', (req, res) => {
		subDatabase.push(req.body)
		res.json({ status: 'Success', message: 'Subscription saved!' })
	})

	app.get('/send-notification', (req, res) => {
		try {
			if (subDatabase.length === 0) {
				throw new Error('No subscription found!')
			}
			webpush.sendNotification(subDatabase[0], 'Hello, Web Push Notification!')
			res.json({ status: 'Success', message: 'Notification sent!' })
		} catch (e) {
			res.json({ status: 'Error', message: 'Notification failed!' })
		}
	})
}
