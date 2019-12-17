import { NextFunction, Request, Response } from 'express'
import { getMaxInput, getMinInput } from './constants'
import { invalidInputType, invalidInputValue, invalidQuery } from './errors'
import { onBadRequest } from './handler'

/**
 * Middleware to verify the 'input' param.
 * Input should be a number between MIN_INPUT and MAX_INPUT,
 * if 'input' doesn't fit into this rules will be throw a BadRequest error
 *
 * @param req
 * @param res
 * @param next
 */
export function validator(req: Request, res: Response, next: NextFunction) {
	const { input } = req.params
	const { query } = req

	if (Object.entries(query).length !== 0) return onBadRequest(res, invalidQuery(Object.keys(query)))

	const toValidate = (input.slice(0, 1) === '-') ? input.slice(1, input.length) : input
	if (toValidate.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/]|[a-zA-Z]/)) {
		return onBadRequest(res, invalidInputType(input))
	}

	const numberInput = parseFloat(input)
	if (!Number.isInteger(numberInput)) {
		return onBadRequest(res, invalidInputType(input))
	}
	if (numberInput > getMaxInput()) {
		return onBadRequest(res, invalidInputValue(numberInput))
	}
	if (numberInput < getMinInput()) {
		return onBadRequest(res, invalidInputValue(numberInput))
	}
	next()
}
