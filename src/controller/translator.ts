import { Request, Response } from 'express'
import { negative, positive } from '../locale/translator.pt-br'
import { onError, onSuccess } from '../utils/handler'

export function translator(req: Request, res: Response) {
	try {
		const { input } = req.params

		const integerInput = parseInt(input, 10)
		const extenso = (integerInput >= 0) ? positive(input) : negative(input)

		return onSuccess(res, extenso)
	} catch (error) {
		return onError(res, error)
	}
}
