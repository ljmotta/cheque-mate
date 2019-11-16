import { NextFunction, Request, Response } from 'express'
import { MAX_INPUT, MIN_INPUT } from './constants'
import { invalidInputType, invalidInputValue } from './errors'
import { onBadRequest } from './handler'

/**
 * Validate the 'input' param
 * @param req
 * @param res
 * @param next
 */
export function validator(req: Request, res: Response, next: NextFunction) {
	const { input } = req.params
	const numberInput = parseInt(input, 10)
	if (Number.isNaN(numberInput)) {
		return onBadRequest(res, invalidInputType(input))
	}
	if (numberInput > MAX_INPUT) {
		return onBadRequest(res, invalidInputValue(numberInput))
	}
	if (numberInput < MIN_INPUT) {
		return onBadRequest(res, invalidInputValue(numberInput))
	}
	next()
}
