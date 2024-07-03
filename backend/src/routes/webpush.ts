import { Express } from 'express'
import webpush, { PushSubscription } from 'web-push'
import { logger } from '../config'

const subDatabase: PushSubscription[] = []

export default (app: Express) => {
	app.post('/save-subscription', (req, res) => {
		try {
			subDatabase.push(req.body)
			logger.info(`Subscription saved! ${subDatabase.length - 1}`)
			res.json({ status: 'Success', message: 'Subscription saved!' })
		} catch (e) {
			logger.error('Subscription failed!', e)
			res.json({ status: 'Error', message: 'Subscription failed!' })
		}
	})

	app.get('/send-notification', (req, res) => {
		try {
			if (subDatabase.length === 0) {
				throw new Error('No subscription found!')
			}
			webpush.sendNotification(subDatabase[0], 'Hello, Web Push Notification!')
			logger.info('Notification sent!')
			res.json({ status: 'Success', message: 'Notification sent!' })
		} catch (e) {
			logger.error('Notification failed!', e)
			res.json({ status: 'Error', message: 'Notification failed!' })
		}
	})
}
