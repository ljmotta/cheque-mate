import express, { Express, json } from 'express'
import morgan from 'morgan'

export function setupServer(): Express {
	const app = express()

	app.use(morgan(':method :url :status :response-time ms [:date[iso]]'))
	app.use(json())

	app.use((req, res, next) => res.status(404).json({ data: 'NotFound '}))

	return app
}
