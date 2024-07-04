import winston, { transport } from 'winston'
import dotenv from 'dotenv'
import * as packageJson from '../package.json'

const version = packageJson.version // get version from package.json

// Configure to read .env files
dotenv.config()

const storeLogs = process.env.STORE_LOGS === 'true'

const transports: transport[] = [new winston.transports.Console()]

if (storeLogs) {
	transports.push(
		new winston.transports.File({
			filename: `logs/error_v${version}.log`,
			level: 'error',
		}),
		new winston.transports.File({ filename: `logs/all_v${version}.log` }),
	)
}

export const LOG_LEVEL = (process.env.LOG_LEVEL as string) || undefined

export const logger = winston.createLogger({
	level: LOG_LEVEL,
	format: winston.format.combine(
		winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		winston.format.printf(info => {
			return `${info.timestamp} ${info.level}: ${info.message}`
		}),
	),
	transports: transports,
})
