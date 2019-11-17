import express, { Express, json } from 'express'
import morgan from 'morgan'
import { converter } from '../controller/converter'
import { onNotFound } from '../utils/handler'
import { validator } from '../utils/validator'

export function setupServer(): Express {
	const app = express()

	if (process.env.NODE_ENV !== 'test') app.use(morgan(':method :url :status :response-time ms [:date[iso]]'))
	app.use(json())

	app.use('/', express.static('./public/view', { index: 'index.html' }))
	app.use('/:input', validator, converter)
	app.use((req, res, next) => onNotFound(res))

	return app
}
