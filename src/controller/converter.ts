import { Request, Response } from 'express'
import { negative, positive } from '../locale/pt-br/converter'
import { onError, onSuccess } from '../utils/handler'

/**
 * Convert a number input into words.
 *
 * @param req {Request}
 * @param res {Response}
 */
export function converter(req: Request, res: Response) {
	try {
		const { input } = req.params

		// Handle -0 = 0
		const integerInput = (parseInt(input, 10) === 0) ? 0 : parseInt(input, 10)
		const extenso = (integerInput >= 0)
			? positive(integerInput.toString())
			: negative(integerInput.toString())

		return onSuccess(res, extenso)
	} catch (error) {
		return onError(res, error)
	}
}
