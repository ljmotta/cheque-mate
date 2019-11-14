import express, { Express, json } from 'express'
import morgan from 'morgan'
import { translator } from '../controller/translator'
import { onNotFound } from '../utils/handler'
import { validator } from '../utils/validator'

export function setupServer(): Express {
	const app = express()

	app.use(morgan(':method :url :status :response-time ms [:date[iso]]'))
	app.use(json())

	app.use('/:input', validator, translator)
	app.use((req, res, next) => onNotFound(res))

	return app
}
