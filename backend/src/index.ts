import path from 'path'
import fs from 'fs'
import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { logger } from './config'
import webpush from 'web-push'

async function main() {
	logger.info('Starting server...')

	const app = express()
	const port = process.env.PORT ?? 8000

	app.use(express.json())
	app.use(cors())

	webpush.setVapidDetails(
		'mailto:chnejohnson@gmail.com',
		process.env.PUBLIC_VAPID_KEY!,
		process.env.PRIVATE_VAPID_KEY!,
	)

	const httpServer = createServer(app)

	httpServer.listen(port, () => logger.info(`Listening on port ${port}`))

	// import all non-index files from this folder
	const routeDir = path.join(__dirname, 'routes')
	const routes = await fs.promises.readdir(routeDir)
	for (const routeFile of routes) {
		const { default: route } = await import(path.join(routeDir, routeFile))
		route(app)
	}
}

main().catch(err => {
	logger.error(`Uncaught error: ${err}`)
	process.exit(1)
})
